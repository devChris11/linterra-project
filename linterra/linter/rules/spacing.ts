import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import type { Rule, Violation } from '../types';

/**
 * Helper function to detect if a string value represents a spacing value.
 * 
 * This function uses regex patterns to identify common spacing formats:
 * - Pixel values (10px, 20px, etc.)
 * - Rem values (1rem, 1.5rem, 0.5rem, etc.)
 * - Em values (1em, 2.5em, 0.25em, etc.)
 * 
 * @param value - The string value to test
 * @returns True if the value matches a spacing pattern, false otherwise
 */
function isSpacing(value: string): boolean {
  const pixelPattern = /\d+px/;
  const remPattern = /\d+\.?\d*rem/;
  const emPattern = /\d+\.?\d*em/;
  
  return pixelPattern.test(value) || remPattern.test(value) || emPattern.test(value);
}

/**
 * Linter rule that detects hardcoded spacing values in React inline styles.
 * 
 * This rule enforces design system consistency by preventing developers from using
 * hardcoded spacing values (px, rem, em) directly in margin and padding properties.
 * Instead, spacing should be referenced from a centralized theme or design token system.
 * 
 * **Why this is important:**
 * - Hardcoded spacing values break the design system's spacing scale, leading to inconsistent layouts
 * - Makes it extremely difficult to maintain responsive design across different screen sizes
 * - Prevents proper spacing tokenization where 8px, 16px, 24px scales are enforced
 * - Scattered spacing values make global design updates nearly impossible
 * - Design tokens ensure all components follow the same spatial rhythm and hierarchy
 * - Centralized spacing enables consistent padding/margin patterns across the entire application
 * 
 * **Violations detected:**
 * - `<div style={{ margin: '10px' }}>` - Hardcoded pixel margin
 * - `<div style={{ paddingTop: '1.5rem' }}>` - Hardcoded rem padding
 * - `<div style={{ marginLeft: '2em' }}>` - Hardcoded em margin
 * - Any property containing 'margin' or 'padding' with px/rem/em values
 * 
 * **Valid examples:**
 * - `<div style={{ margin: theme.spacing.md }}>` - Using theme spacing tokens
 * - `<div className="p-4 m-2">` - Using Tailwind spacing utility classes
 * - `<div style={{ margin: '0 auto' }}>` - Using CSS keywords (not detected as hardcoded)
 * 
 * @see https://www.designsystems.com/spacing-scales-for-consistency/
 */
export const spacingRule: Rule = {
  name: 'hardcoded-spacing',
  description: 'Detects hardcoded spacing values (px, rem, em) in margin and padding properties',
  
  check: (code: string): Violation[] => {
    const violations: Violation[] = [];
    
    try {
      // Parse the code into an Abstract Syntax Tree (AST)
      const ast = parse(code, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
      });
      
      // Traverse the AST to find JSX attributes
      traverse(ast, {
        JSXAttribute(path) {
          // Check if this is a 'style' attribute
          if (
            path.node.name.type === 'JSXIdentifier' &&
            path.node.name.name === 'style'
          ) {
            const attributeValue = path.node.value;
            
            // Check if the style value is a JSX expression container
            if (
              attributeValue &&
              attributeValue.type === 'JSXExpressionContainer'
            ) {
              const expression = attributeValue.expression;
              
              // Check if the expression is an object expression (inline style object)
              if (expression.type === 'ObjectExpression') {
                // Loop through all properties in the style object
                for (const property of expression.properties) {
                  // We only care about ObjectProperty nodes (not SpreadElement)
                  if (property.type === 'ObjectProperty') {
                    const propertyValue = property.value;
                    
                    // Check if the value is a string literal
                    if (propertyValue.type === 'StringLiteral') {
                      const value = propertyValue.value;
                      
                      // Get the property name to check if it's a spacing property
                      let propertyName = '';
                      if (property.key.type === 'Identifier') {
                        propertyName = property.key.name;
                      } else if (property.key.type === 'StringLiteral') {
                        propertyName = property.key.value;
                      }
                      
                      // Check if this is a margin or padding property (case-insensitive)
                      const lowerPropertyName = propertyName.toLowerCase();
                      const isSpacingProperty = lowerPropertyName.includes('margin') || 
                                               lowerPropertyName.includes('padding');
                      
                      // Test if this string is a spacing value
                      if (isSpacingProperty && isSpacing(value)) {
                        // Create a violation for this hardcoded spacing
                        if (propertyValue.loc) {
                          violations.push({
                            rule: 'hardcoded-spacing',
                            severity: 'warning',
                            line: propertyValue.loc.start.line,
                            column: propertyValue.loc.start.column + 1, // +1 for 1-indexed columns
                            message: `Hardcoded spacing '${value}' in '${propertyName}'`,
                            suggestion: 'Use theme.spacing.* or Tailwind spacing classes (p-4, m-2, etc.)',
                          });
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
      });
    } catch (error) {
      // Handle syntax errors gracefully - return empty array
      // This allows other rules to continue even if this code has parse errors
      return [];
    }
    
    return violations;
  },
};

