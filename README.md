# Linterra - Design System Linter

A modern, automated design system linter that catches violations while you code. Built for React, Next.js, and TypeScript projects.

## Features

- **Automated Checking**: Runs on every pull request automatically
- **Design System + Accessibility**: Enforces color contrast ratios and semantic HTML for WCAG compliance
- **Zero Configuration**: Add one GitHub Action file to your repo
- **Interactive Demo**: Test your components in our live demo

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) to see the demo

## VS Code Extension

The project includes a VS Code extension for real-time linting:

1. Navigate to `vscode-extension/`
2. Install dependencies: `npm install`
3. Compile: `npm run compile`
4. Package: `npm run package`

## Linter Rules

- **Alt Text**: Ensures images have proper alt attributes
- **Colors**: Detects hardcoded colors and suggests design tokens
- **Contrast**: Validates color contrast ratios for accessibility
- **Form Labels**: Ensures form inputs have proper labels
- **Spacing**: Detects inconsistent spacing values

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Linting**: Custom AST-based linter with Babel parser
- **Editor**: Monaco Editor for code editing
- **Animations**: Lottie animations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details
