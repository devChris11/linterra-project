import type { CheckResult, Violation, Rule } from './types';
import { rules } from './rules';

/**
 * Main linter orchestrator function that checks code against all available rules.
 * 
 * This function coordinates the execution of all linter rules, collecting violations
 * from each rule and aggregating them into a comprehensive result. Individual rule
 * failures are logged but don't prevent other rules from running.
 * 
 * @param code - The source code to check for design system violations
 * @returns CheckResult containing all violations found and a summary of errors/warnings
 * 
 * @example
 * ```typescript
 * const result = checkCode('<img src="photo.jpg">');
 * console.log(`Found ${result.summary.errors} errors and ${result.summary.warnings} warnings`);
 * ```
 */
export function checkCode(code: string): CheckResult {
  // Handle edge case: empty code string
  if (!code || code.trim() === '') {
    return {
      violations: [],
      summary: {
        errors: 0,
        warnings: 0,
      },
    };
  }

  // Handle edge case: no rules available
  if (!rules || rules.length === 0) {
    return {
      violations: [],
      summary: {
        errors: 0,
        warnings: 0,
      },
    };
  }

  // Initialize collection for all violations
  const allViolations: Violation[] = [];

  // Execute each rule and collect violations
  for (const rule of rules) {
    try {
      // Call the rule's check function
      const ruleViolations = rule.check(code);
      
      // Add the violations to our collection
      if (Array.isArray(ruleViolations) && ruleViolations.length > 0) {
        allViolations.push(...ruleViolations);
      }
    } catch (error) {
      // Log the error but continue processing other rules
      console.error(
        `Error executing rule "${rule.name}":`,
        error instanceof Error ? error.message : String(error)
      );
      
      // Optionally log the full error in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Full error details:', error);
      }
    }
  }

  // Calculate summary statistics
  const errors = allViolations.filter(v => v.severity === 'error').length;
  const warnings = allViolations.filter(v => v.severity === 'warning').length;

  // Return the complete check result
  return {
    violations: allViolations,
    summary: {
      errors,
      warnings,
    },
  };
}

