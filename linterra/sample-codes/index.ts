import type { CodeExample } from './types';

// Import all sample code files as raw strings
import goodExampleCode from './beginner/good-example.tsx?raw';
import badButtonCode from './beginner/bad-button.tsx?raw';
import badCardCode from './intermediate/bad-card.tsx?raw';
import badLayoutCode from './intermediate/bad-layout.tsx?raw';
import badFormCode from './advanced/bad-form.tsx?raw';
import kitchenSinkCode from './advanced/kitchen-sink.tsx?raw';

/**
 * Collection of code examples for the linter demo.
 * 
 * This array contains sample React components that demonstrate various
 * design system and accessibility violations (and one good example showing
 * best practices). Each example is categorized by difficulty level and
 * includes expected violation counts for validation.
 * 
 * **Organization:**
 * - **Beginner**: Simple, single-concept examples (good practices and basic violations)
 * - **Intermediate**: Multi-issue examples with moderate complexity
 * - **Advanced**: Complex, real-world scenarios with numerous violations
 * 
 * **Usage in Demo:**
 * ```typescript
 * import { EXAMPLES } from '@/sample-codes';
 * 
 * // Filter by difficulty
 * const beginnerExamples = EXAMPLES.filter(ex => ex.difficulty === 'beginner');
 * 
 * // Find by ID
 * const example = EXAMPLES.find(ex => ex.id === 'bad-button');
 * 
 * // Get code for linting
 * const codeToLint = example?.code;
 * ```
 * 
 * @see CodeExample for the structure of each example object
 */
export const EXAMPLES: CodeExample[] = [
  // BEGINNER EXAMPLES
  {
    id: 'good-example',
    name: 'Good Example (Clean Code)',
    difficulty: 'beginner',
    description: 'A well-structured component using Tailwind classes. Shows best practices: proper alt text, design tokens via classes, good contrast, and accessible form labels.',
    code: goodExampleCode,
    expectedViolations: {
      errors: 0,
      warnings: 0
    },
    tags: ['best-practices', 'accessible', 'tailwind']
  },
  {
    id: 'bad-button',
    name: 'Bad Button',
    difficulty: 'beginner',
    description: 'Uses hardcoded colors and spacing in inline styles. Should use design tokens or Tailwind classes instead.',
    code: badButtonCode,
    expectedViolations: {
      errors: 0,
      warnings: 3
    },
    tags: ['colors', 'spacing']
  },

  // INTERMEDIATE EXAMPLES
  {
    id: 'bad-card',
    name: 'Bad Card',
    difficulty: 'intermediate',
    description: 'Multiple accessibility issues: missing alt text on image, low contrast text colors, and hardcoded style values.',
    code: badCardCode,
    expectedViolations: {
      errors: 2,
      warnings: 4
    },
    tags: ['alt-text', 'contrast', 'colors', 'spacing']
  },
  {
    id: 'bad-layout',
    name: 'Bad Layout',
    difficulty: 'intermediate',
    description: 'Extensive use of hardcoded spacing values (px, rem) throughout the layout. Should use a consistent spacing scale.',
    code: badLayoutCode,
    expectedViolations: {
      errors: 0,
      warnings: 7
    },
    tags: ['spacing']
  },

  // ADVANCED EXAMPLES
  {
    id: 'bad-form',
    name: 'Bad Form',
    difficulty: 'advanced',
    description: 'Form with multiple accessibility violations: inputs without labels, missing alt text, and hardcoded colors/spacing throughout.',
    code: badFormCode,
    expectedViolations: {
      errors: 3,
      warnings: 8
    },
    tags: ['form-labels', 'alt-text', 'colors', 'spacing']
  },
  {
    id: 'kitchen-sink',
    name: 'Kitchen Sink (Everything Wrong)',
    difficulty: 'advanced',
    description: 'The worst possible code - violates every rule. A stress test showing what happens when all best practices are ignored.',
    code: kitchenSinkCode,
    expectedViolations: {
      errors: 5,
      warnings: 12
    },
    tags: ['alt-text', 'colors', 'spacing', 'contrast', 'form-labels']
  }
];

