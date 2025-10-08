/**
 * Represents the difficulty level of a code example.
 * Used to categorize examples by complexity for progressive learning.
 */
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

/**
 * Represents the expected number of linting violations in a code example.
 * Used to validate that the linter correctly identifies issues.
 */
export interface ExpectedViolations {
  /**
   * The number of critical errors expected to be found by the linter.
   * Errors typically represent serious accessibility or design system violations.
   */
  errors: number;

  /**
   * The number of warnings expected to be found by the linter.
   * Warnings typically represent best practice suggestions or minor issues.
   */
  warnings: number;
}

/**
 * Represents a single code example used in the linter demo.
 * 
 * Code examples demonstrate various design system and accessibility violations
 * that the linter can detect. Each example includes the problematic code,
 * metadata about what's wrong, and the expected linting results.
 * 
 * @example
 * ```typescript
 * const badButtonExample: CodeExample = {
 *   id: 'bad-button',
 *   name: 'Bad Button',
 *   difficulty: 'beginner',
 *   description: 'A button using hard-coded color values instead of design tokens, with insufficient contrast and non-standard spacing.',
 *   code: `export default function BadButton() {
 *     return (
 *       <button style={{ backgroundColor: '#FF5733', color: '#FFFFFF', padding: '7px' }}>
 *         Click Me
 *       </button>
 *     );
 *   }`,
 *   expectedViolations: {
 *     errors: 2,
 *     warnings: 1
 *   },
 *   tags: ['colors', 'spacing', 'contrast']
 * };
 * ```
 */
export interface CodeExample {
  /**
   * Unique identifier for the code example.
   * Should be kebab-case and descriptive (e.g., 'bad-button', 'missing-alt-text').
   * Used for programmatic access and routing.
   */
  id: string;

  /**
   * Human-readable display name for the code example.
   * Shown in the UI as the title of the example (e.g., 'Bad Button', 'Missing Alt Text').
   */
  name: string;

  /**
   * The difficulty level of the code example.
   * Determines the complexity and audience for this example:
   * - 'beginner': Simple, single-issue examples for learning basics
   * - 'intermediate': Multi-issue examples with moderate complexity
   * - 'advanced': Complex, real-world scenarios with multiple violations
   */
  difficulty: DifficultyLevel;

  /**
   * A clear explanation of what design system or accessibility violations
   * are present in this code example. Should be educational and help users
   * understand what to look for.
   */
  description: string;

  /**
   * The actual React component code as a string.
   * Should be valid TypeScript/JSX that demonstrates one or more
   * design system or accessibility violations.
   */
  code: string;

  /**
   * The expected number of errors and warnings the linter should find
   * in this code example. Used to validate linter accuracy and show
   * users what to expect.
   */
  expectedViolations: ExpectedViolations;

  /**
   * Array of tags categorizing the types of violations in this example.
   * Common tags include: 'colors', 'spacing', 'contrast', 'accessibility',
   * 'typography', 'form-labels', 'alt-text'.
   * Used for filtering and organizing examples.
   */
  tags: string[];
}

