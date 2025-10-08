import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import type { Rule, Violation } from '../types';

/**
 * Converts a hex color string to RGB values.
 * 
 * Supports both 3-digit (#fff) and 6-digit (#ffffff) hex color formats.
 * The function handles various edge cases including uppercase, lowercase,
 * and mixed case hex values.
 * 
 * @param hex - The hex color string (e.g., "#fff" or "#ffffff")
 * @returns An object with r, g, b values (0-255) or null if invalid
 * 
 * @example
 * hexToRgb("#fff")     // { r: 255, g: 255, b: 255 }
 * hexToRgb("#ff0000")  // { r: 255, g: 0, b: 0 }
 * hexToRgb("invalid")  // null
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Remove # if present
  const cleanHex = hex.replace(/^#/, '');
  
  // Validate hex format (3 or 6 characters, 0-9 A-F only)
  if (!/^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
    return null;
  }
  
  let r: number, g: number, b: number;
  
  if (cleanHex.length === 3) {
    // Handle 3-digit hex (#fff -> #ffffff)
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else {
    // Handle 6-digit hex
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  }
  
  return { r, g, b };
}

/**
 * Calculates the relative luminance of a color according to WCAG specifications.
 * 
 * This implements the WCAG 2.1 relative luminance formula, which is crucial for
 * determining color contrast ratios. The calculation converts RGB values to sRGB,
 * applies gamma correction, and computes the weighted sum based on human perception.
 * 
 * **WCAG Formula:**
 * 1. Convert RGB (0-255) to sRGB (0-1): value / 255
 * 2. Apply gamma correction to each channel:
 *    - If sRGB ≤ 0.03928: sRGB / 12.92
 *    - Otherwise: ((sRGB + 0.055) / 1.055) ^ 2.4
 * 3. Calculate luminance: 0.2126 × R + 0.7152 × G + 0.0722 × B
 * 
 * @param r - Red channel value (0-255)
 * @param g - Green channel value (0-255)
 * @param b - Blue channel value (0-255)
 * @returns The relative luminance value (0-1)
 * 
 * @see https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
function getLuminance(r: number, g: number, b: number): number {
  // Convert RGB (0-255) to sRGB (0-1)
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;
  
  // Apply gamma correction for each channel
  const rLinear = rsRGB <= 0.03928 
    ? rsRGB / 12.92 
    : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
    
  const gLinear = gsRGB <= 0.03928 
    ? gsRGB / 12.92 
    : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
    
  const bLinear = bsRGB <= 0.03928 
    ? bsRGB / 12.92 
    : Math.pow((bsRGB + 0.055) / 1.055, 2.4);
  
  // Calculate relative luminance using weighted sum
  // Weights are based on human perception sensitivity to different colors
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Calculates the contrast ratio between two colors.
 * 
 * The contrast ratio is calculated according to WCAG 2.1 specifications:
 * (L1 + 0.05) / (L2 + 0.05), where L1 is the lighter color's luminance
 * and L2 is the darker color's luminance.
 * 
 * @param color1 - First color as hex string (e.g., "#ffffff")
 * @param color2 - Second color as hex string (e.g., "#000000")
 * @returns The contrast ratio (1-21) or null if colors can't be parsed
 * 
 * @example
 * getContrastRatio("#ffffff", "#000000")  // 21 (maximum contrast)
 * getContrastRatio("#fff", "#000")        // 21
 * getContrastRatio("#777", "#fff")        // 4.47
 */
function getContrastRatio(color1: string, color2: string): number | null {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) {
    return null;
  }
  
  const luminance1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const luminance2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  // Ensure the lighter color is in the numerator
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  // WCAG contrast ratio formula
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Linter rule that checks color contrast ratios between text and background colors.
 * 
 * This rule enforces WCAG (Web Content Accessibility Guidelines) AA standards for
 * color contrast to ensure text is readable for all users, including those with
 * visual impairments, color blindness, or viewing content in poor lighting conditions.
 * 
 * **Why WCAG Contrast Matters:**
 * - **Accessibility:** 1 in 12 men and 1 in 200 women have some form of color blindness
 * - **Readability:** Low contrast causes eye strain and makes content difficult to read
 * - **Legal Compliance:** WCAG AA is required by many accessibility laws (ADA, Section 508)
 * - **User Experience:** Good contrast improves readability for everyone, especially in bright sunlight
 * - **SEO & Rankings:** Search engines favor accessible websites
 * 
 * **WCAG AA Requirements:**
 * - Normal text: Minimum contrast ratio of 4.5:1
 * - Large text (18pt+ or 14pt+ bold): Minimum contrast ratio of 3:1
 * - AAA standard (higher): 7:1 for normal text, 4.5:1 for large text
 * 
 * **Violations detected:**
 * - `<div style={{ color: '#777', backgroundColor: '#fff' }}>` - May fail if ratio < 4.5:1
 * - `<p style={{ color: '#999', background: '#fff' }}>` - Checks background property too
 * 
 * **Valid examples:**
 * - `<div style={{ color: '#000', backgroundColor: '#fff' }}>` - 21:1 ratio (excellent)
 * - `<div style={{ color: '#595959', backgroundColor: '#fff' }}>` - 7:1 ratio (AAA)
 * - `<div style={{ color: '#767676', backgroundColor: '#fff' }}>` - 4.54:1 ratio (AA)
 * 
 * **Current limitations (MVP):**
 * - Only checks hex colors (#fff, #ffffff)
 * - Does not check rgb(), hsl(), or named colors
 * - Only checks inline styles, not CSS classes
 * - Assumes normal text (4.5:1 threshold)
 * 
 * @see https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 * @see https://webaim.org/resources/contrastchecker/
 */
export const contrastRule: Rule = {
  name: 'low-contrast',
  description: 'Checks color contrast ratios meet WCAG AA standards',
  
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
                let textColor: string | null = null;
                let bgColor: string | null = null;
                let textColorLoc: { line: number; column: number } | null = null;
                
                // Loop through all properties in the style object
                for (const property of expression.properties) {
                  // We only care about ObjectProperty nodes (not SpreadElement)
                  if (property.type === 'ObjectProperty') {
                    // Get the property name
                    let propertyName = '';
                    if (property.key.type === 'Identifier') {
                      propertyName = property.key.name;
                    } else if (property.key.type === 'StringLiteral') {
                      propertyName = property.key.value;
                    }
                    
                    // Check if the value is a string literal
                    if (property.value.type === 'StringLiteral') {
                      const value = property.value.value;
                      
                      // Store color values
                      if (propertyName === 'color') {
                        textColor = value;
                        if (property.value.loc) {
                          textColorLoc = {
                            line: property.value.loc.start.line,
                            column: property.value.loc.start.column + 1, // +1 for 1-indexed columns
                          };
                        }
                      } else if (propertyName === 'backgroundColor' || propertyName === 'background') {
                        bgColor = value;
                      }
                    }
                  }
                }
                
                // If both color and background are found, check contrast
                if (textColor && bgColor && textColorLoc) {
                  const ratio = getContrastRatio(textColor, bgColor);
                  
                  // Check if ratio is below WCAG AA threshold (4.5:1)
                  if (ratio !== null && ratio < 4.5) {
                    violations.push({
                      rule: 'low-contrast',
                      severity: 'error',
                      line: textColorLoc.line,
                      column: textColorLoc.column,
                      message: `Text color contrast ratio ${ratio.toFixed(2)}:1 is below WCAG AA requirement (4.5:1)`,
                      suggestion: 'Increase contrast by using a darker text color or lighter background',
                    });
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
          `contrastRule: Could not parse code - ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }
      return [];
    }
    
    return violations;
  },
};

