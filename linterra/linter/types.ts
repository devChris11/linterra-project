/**
 * Represents a single code violation found by a linter rule.
 * Each violation indicates a specific issue in the code that doesn't comply
 * with design system guidelines.
 */
export interface Violation {
  /** The unique identifier of the rule that detected this violation (e.g., "hardcoded-colors") */
  rule: string;
  
  /** The severity level of the violation */
  severity: "error" | "warning";
  
  /** The line number where the violation was found (1-indexed) */
  line: number;
  
  /** The column number where the violation starts (1-indexed) */
  column: number;
  
  /** A human-readable description of what went wrong */
  message: string;
  
  /** An optional suggestion on how to fix the violation */
  suggestion?: string;
}

/**
 * The result returned by the main linter check function.
 * Contains all violations found and a summary of their severities.
 */
export interface CheckResult {
  /** Array of all violations detected during the lint check */
  violations: Violation[];
  
  /** Summary statistics about the violations found */
  summary: {
    /** Total number of error-severity violations */
    errors: number;
    
    /** Total number of warning-severity violations */
    warnings: number;
  };
}

/**
 * Interface that every linter rule checker must implement.
 * Rules are responsible for detecting specific types of violations
 * in the provided code.
 */
export interface Rule {
  /** Unique identifier for this rule (e.g., "alt-text", "hardcoded-colors") */
  name: string;
  
  /** Optional human-readable description of what this rule checks for */
  description?: string;
  
  /**
   * Function that analyzes code and returns any violations found.
   * @param code - The source code to check
   * @returns An array of violations found (empty if none)
   */
  check: (code: string) => Violation[];
}

