# Linterra - Design System Linter for VS Code

Linterra is a powerful VS Code extension that helps you catch design system violations while coding React and Next.js components. Keep your codebase consistent and accessible by getting real-time feedback on design system compliance.

## Features

- **Real-time Linting**: Get instant feedback on design system violations as you type
- **Automatic Checking**: Runs automatically on file open and save (configurable)
- **Manual Checking**: Use the command palette to check files on demand
- **React/Next.js Support**: Works with `.tsx` and `.jsx` files
- **Design System Rules**:
  - Missing `alt` text on images
  - Hardcoded colors (should use design tokens)
  - Inline styles (discouraged in design systems)
  - Spacing violations
  - Color contrast issues
  - Form accessibility

## Installation

### From VSIX Package

1. Download the latest `.vsix` file from releases
2. Open VS Code
3. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
4. Click the "..." menu at the top right
5. Select "Install from VSIX..."
6. Choose the downloaded `.vsix` file

### From Source

1. Clone the repository
2. Navigate to the `vscode-extension` directory
3. Run `npm install`
4. Run `npm run compile`
5. Press F5 to open a new VS Code window with the extension loaded

## Usage

### Automatic Linting

By default, Linterra will automatically check your React/Next.js files when you:
- Open a file
- Save a file
- Edit a file (with debouncing)

Violations will appear in the Problems panel and will be underlined in your code.

### Manual Linting

You can manually trigger a check using the Command Palette:

1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
2. Type "Linterra: Check Current File"
3. Press Enter

## Settings

Configure Linterra in your VS Code settings:

### `linterra.runOnSave`
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Run Linterra checks automatically when a file is saved

```json
{
  "linterra.runOnSave": true
}
```

### `linterra.runOnOpen`
- **Type**: `boolean`
- **Default**: `true`
- **Description**: Run Linterra checks automatically when a file is opened

```json
{
  "linterra.runOnOpen": true
}
```

## Linting Rules

### Alt Text Check
Ensures all `<img>` tags have an `alt` attribute for accessibility.

**Severity**: Warning

### Hardcoded Colors
Detects hardcoded hex, rgb, or rgba colors and suggests using design tokens instead.

**Severity**: Warning

### Inline Styles
Discourages the use of inline styles in favor of design system classes or components.

**Severity**: Information

## Development

### Building the Extension

```bash
npm run compile
```

### Watching for Changes

```bash
npm run watch
```

### Packaging the Extension

```bash
npm run package
```

This will create a `.vsix` file that can be installed in VS Code.

## Requirements

- VS Code version 1.80.0 or higher
- React or Next.js project with `.tsx` or `.jsx` files

## Known Issues

- Currently implements basic rules; more comprehensive design system checks coming soon
- Parser limitations with complex JSX structures

## Roadmap

- [ ] Integration with Linterra core linting engine
- [ ] Custom rule configuration
- [ ] Quick fixes for common violations
- [ ] Design system token suggestions
- [ ] Configuration file support (`.linterra.yml`)
- [ ] Multi-workspace support
- [ ] Performance optimizations for large files

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Support

If you encounter any issues or have suggestions, please file an issue on the [GitHub repository](https://github.com/devChris11/linterra).

---

**Enjoy coding with Linterra!** 🎨✨

