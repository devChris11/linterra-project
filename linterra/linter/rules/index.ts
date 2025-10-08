import type { Rule } from '../types';

// Import individual rule implementations
import { altTextRule } from './alt-text';
import { colorRule } from './colors';
import { spacingRule } from './spacing';
import { formLabelRule } from './form-label';
import { contrastRule } from './contrast';

/**
 * Array of all available linter rules.
 * Each rule implements the Rule interface and checks for specific design system violations.
 */
export const rules: Rule[] = [
  altTextRule,
  colorRule,
  spacingRule,
  formLabelRule,
  contrastRule,
];

