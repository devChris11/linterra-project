"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
// Import individual rule implementations
const alt_text_1 = require("./alt-text");
const colors_1 = require("./colors");
const spacing_1 = require("./spacing");
const form_label_1 = require("./form-label");
const contrast_1 = require("./contrast");
/**
 * Array of all available linter rules.
 * Each rule implements the Rule interface and checks for specific design system violations.
 */
exports.rules = [
    alt_text_1.altTextRule,
    colors_1.colorRule,
    spacing_1.spacingRule,
    form_label_1.formLabelRule,
    contrast_1.contrastRule,
];
//# sourceMappingURL=index.js.map