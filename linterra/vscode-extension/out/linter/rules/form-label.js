"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formLabelRule = void 0;
const parser_1 = require("@babel/parser");
const traverse_1 = __importDefault(require("@babel/traverse"));
/**
 * Linter rule that detects form inputs without proper accessibility labels.
 *
 * This rule enforces WCAG 2.1 Success Criterion 3.3.2 (Labels or Instructions) by ensuring
 * that all form input elements have accessible labels that screen readers can announce.
 *
 * **Why this is important:**
 * - Screen readers cannot identify the purpose of an unlabeled form field
 * - Users with visual impairments rely on programmatic labels to understand what data to enter
 * - WCAG 2.1 Level A compliance requires labels for all form inputs
 * - Unlabeled inputs create inaccessible forms that exclude users with disabilities
 * - Proper labels improve usability for all users, not just those using assistive technology
 * - Search engines and automated testing tools also depend on proper form labeling
 *
 * **What this rule checks:**
 * Form elements (input, textarea, select) must have at least ONE of:
 * 1. `aria-label` attribute - directly provides the accessible name
 * 2. `aria-labelledby` attribute - references another element containing the label text
 * 3. `id` attribute - allows association with a `<label htmlFor="id">` element
 *
 * **Violations detected:**
 * - `<input type="text" />` - No label mechanism
 * - `<textarea />` - No label mechanism
 * - `<select><option>...</option></select>` - No label mechanism
 *
 * **Valid examples:**
 * - `<input type="text" aria-label="First name" />`
 * - `<input type="text" aria-labelledby="nameLabel" />`
 * - `<input type="text" id="firstName" />` (with `<label htmlFor="firstName">Name</label>`)
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html
 * @see https://www.w3.org/WAI/tutorials/forms/labels/
 */
exports.formLabelRule = {
    name: 'missing-form-label',
    description: 'Ensures form inputs have associated labels for accessibility',
    check: (code) => {
        const violations = [];
        try {
            // Parse the code into an Abstract Syntax Tree (AST)
            const ast = (0, parser_1.parse)(code, {
                sourceType: 'module',
                plugins: ['jsx', 'typescript'],
            });
            // Traverse the AST to find JSX elements
            (0, traverse_1.default)(ast, {
                JSXElement(path) {
                    const openingElement = path.node.openingElement;
                    // Check if this is a form element (input, textarea, or select)
                    if (openingElement.name.type === 'JSXIdentifier') {
                        const elementName = openingElement.name.name;
                        // Only check form input elements
                        if (elementName === 'input' || elementName === 'textarea' || elementName === 'select') {
                            // Check if the element has any of the required label attributes
                            const attributes = openingElement.attributes;
                            let hasAriaLabel = false;
                            let hasAriaLabelledBy = false;
                            let hasId = false;
                            // Check all attributes on the element
                            for (const attribute of attributes) {
                                if (attribute.type === 'JSXAttribute' && attribute.name.type === 'JSXIdentifier') {
                                    const attrName = attribute.name.name;
                                    if (attrName === 'aria-label') {
                                        hasAriaLabel = true;
                                    }
                                    else if (attrName === 'aria-labelledby') {
                                        hasAriaLabelledBy = true;
                                    }
                                    else if (attrName === 'id') {
                                        hasId = true;
                                    }
                                }
                            }
                            // If none of the label mechanisms are present, create a violation
                            if (!hasAriaLabel && !hasAriaLabelledBy && !hasId) {
                                if (openingElement.loc) {
                                    violations.push({
                                        rule: 'missing-form-label',
                                        severity: 'error',
                                        line: openingElement.loc.start.line,
                                        column: openingElement.loc.start.column + 1, // +1 for 1-indexed columns
                                        message: `${elementName} element is missing accessibility label`,
                                        suggestion: 'Add aria-label="description" or associate with a <label> element using id/htmlFor',
                                    });
                                }
                            }
                        }
                    }
                },
            });
        }
        catch (error) {
            // Handle syntax errors gracefully - return empty array
            // This allows other rules to continue even if this code has parse errors
            return [];
        }
        return violations;
    },
};
//# sourceMappingURL=form-label.js.map