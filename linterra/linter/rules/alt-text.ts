import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import type { Rule, Violation } from '../types';

/**
 * Linter rule that checks for missing or empty alt attributes on img elements.
 * 
 * This rule enforces WCAG 2.1 Level A accessibility requirements (Success Criterion 1.1.1)
 * which mandates that all non-text content must have a text alternative that serves 
 * the equivalent purpose.
 * 
 * **Why this is important:**
 * - Screen readers rely on alt text to describe images to visually impaired users
 * - Alt text provides context when images fail to load
 * - Search engines use alt text for image indexing and SEO
 * 
 * **Violations detected:**
 * - `<img src="photo.jpg">` - No alt attribute
 * - `<img src="photo.jpg" alt="">` - Empty alt attribute (unless decorative)
 * - `<img src="photo.jpg" alt={null}>` - Null alt value
 * 
 * **Valid examples:**
 * - `<img src="photo.jpg" alt="Team photo at annual conference">` - Descriptive alt text
 * - `<img src="icon.svg" alt="">` - Empty alt for decorative images (intentional)
 * 
 * @see https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html
 */
export const altTextRule: Rule = {
  name: 'missing-alt-text',
  description: 'Ensures all img elements have meaningful alt attributes for accessibility',
  
  check: (code: string): Violation[] => {
    const violations: Violation[] = [];
    
    try {
      // Parse the code into an Abstract Syntax Tree (AST)
      const ast = parse(code, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
      });
      
      // Traverse the AST to find JSX elements
      traverse(ast, {
        JSXElement(path) {
          // Check if this is an img element
          const openingElement = path.node.openingElement;
          
          if (
            openingElement.name.type === 'JSXIdentifier' &&
            openingElement.name.name === 'img'
          ) {
            // Look for the alt attribute
            const altAttribute = openingElement.attributes.find(
              (attr) =>
                attr.type === 'JSXAttribute' &&
                attr.name.type === 'JSXIdentifier' &&
                attr.name.name === 'alt'
            );
            
            let hasViolation = false;
            let violationMessage = '';
            
            if (!altAttribute) {
              // Case 1: No alt attribute at all
              hasViolation = true;
              violationMessage = 'img element is missing an alt attribute';
            } else if (altAttribute.type === 'JSXAttribute') {
              // Check the value of the alt attribute
              const altValue = altAttribute.value;
              
              if (altValue === null) {
                // Case 2: alt attribute exists but value is null (e.g., <img alt />)
                hasViolation = true;
                violationMessage = 'img element has an alt attribute with no value';
              } else if (
                altValue?.type === 'StringLiteral' &&
                altValue.value === ''
              ) {
                // Case 3: alt attribute exists but is an empty string
                // Note: Empty alt is valid for decorative images, but we warn about it
                hasViolation = true;
                violationMessage = 
                  'img element has an empty alt attribute. If the image is decorative, this is acceptable. Otherwise, provide descriptive alt text';
              } else if (
                altValue?.type === 'JSXExpressionContainer' &&
                altValue.expression.type === 'NullLiteral'
              ) {
                // Case 4: alt={null}
                hasViolation = true;
                violationMessage = 'img element has alt={null}. Provide descriptive alt text or use alt="" for decorative images';
              } else if (
                altValue?.type === 'JSXExpressionContainer' &&
                altValue.expression.type === 'StringLiteral' &&
                altValue.expression.value === ''
              ) {
                // Case 5: alt={""}
                hasViolation = true;
                violationMessage = 
                  'img element has an empty alt attribute. If the image is decorative, this is acceptable. Otherwise, provide descriptive alt text';
              }
            }
            
            if (hasViolation && path.node.loc) {
              violations.push({
                rule: 'missing-alt-text',
                severity: 'error',
                line: path.node.loc.start.line,
                column: path.node.loc.start.column + 1, // +1 for 1-indexed columns
                message: violationMessage,
                suggestion: 'Add descriptive alt text: alt="description of image"',
              });
            }
          }
        },
      });
    } catch (error) {
      // Handle syntax errors gracefully - return empty array
      // This allows other rules to continue even if this code has parse errors
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `altTextRule: Could not parse code - ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }
      return [];
    }
    
    return violations;
  },
};

