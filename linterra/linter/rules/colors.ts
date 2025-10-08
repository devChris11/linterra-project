import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import type { Rule, Violation } from '../types';

/**
 * Helper function to detect if a string value represents a color.
 * 
 * This function uses regex patterns to identify common color formats:
 * - Hexadecimal colors (#fff, #ffffff, #FFF, etc.)
 * - RGB/RGBA colors (rgb(255, 0, 0), rgba(255, 0, 0, 0.5))
 * - HSL/HSLA colors (hsl(120, 100%, 50%), hsla(120, 100%, 50%, 0.5))
 * 
 * @param value - The string value to test
 * @returns True if the value matches a color pattern, false otherwise
 */
function isColor(value: string): boolean {
  const hexPattern = /#[0-9A-Fa-f]{3,6}/;
  const rgbPattern = /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+/;
  const hslPattern = /hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%/;
  
  return hexPattern.test(value) || rgbPattern.test(value) || hslPattern.test(value);
}

/**
 * Linter rule that detects hardcoded color values in React inline styles.
 * 
 * This rule enforces design system consistency by preventing developers from using
 * hardcoded color values directly in JSX style attributes. Instead, colors should
 * be referenced from a centralized theme or design token system.
 * 
 * **Why this is important:**
 * - Hardcoded colors create maintenance nightmares when design systems evolve
 * - Scattered color values make it impossible to enforce brand consistency
 * - Theming and dark mode support become extremely difficult or impossible
 * - Design tokens ensure all components use approved, accessible color combinations
 * - Centralized colors enable global updates without hunting through code
 * 
 * **Violations detected:**
 * - `<div style={{ color: '#fff' }}>` - Hex color in inline style
 * - `<div style={{ backgroundColor: 'rgb(255, 0, 0)' }}>` - RGB color
 * - `<div style={{ borderColor: 'hsl(120, 100%, 50%)' }}>` - HSL color
 * 
 * **Valid examples:**
 * - `<div style={{ color: theme.colors.primary }}>` - Using theme tokens
 * - `<div className="text-primary">` - Using Tailwind utility classes
 * - `<div style={{ color: 'inherit' }}>` - Using CSS keywords (not detected as hardcoded)
 * 
 * @see https://www.designsystems.com/design-tokens-for-dummies/
 */
export const colorRule: Rule = {
  name: 'hardcoded-colors',
  description: 'Detects hardcoded color values in inline styles',
  
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
                      
                      // Test if this string is a color value
                      if (isColor(value)) {
                        // Get the property name for the error message
                        let propertyName = 'unknown';
                        if (property.key.type === 'Identifier') {
                          propertyName = property.key.name;
                        } else if (property.key.type === 'StringLiteral') {
                          propertyName = property.key.value;
                        }
                        
                        // Create a violation for this hardcoded color
                        if (propertyValue.loc) {
                          violations.push({
                            rule: 'hardcoded-colors',
                            severity: 'warning',
                            line: propertyValue.loc.start.line,
                            column: propertyValue.loc.start.column + 1, // +1 for 1-indexed columns
                            message: `Hardcoded color '${value}' in '${propertyName}'`,
                            suggestion: 'Use theme.colors.* or Tailwind classes',
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
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `colorRule: Could not parse code - ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }
      return [];
    }
    
    return violations;
  },
};

