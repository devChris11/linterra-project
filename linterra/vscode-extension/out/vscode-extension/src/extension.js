"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const linter_1 = require("../../linter");
/**
 * This method is called when the extension is activated.
 * Activation happens when a React/JSX file is opened.
 */
function activate(context) {
    console.log('Linterra activated');
    // Get configuration
    const config = vscode.workspace.getConfiguration('linterra');
    const runOnSave = config.get('runOnSave', true);
    const runOnOpen = config.get('runOnOpen', true);
    // Create a diagnostic collection for Linterra
    const diagnosticCollection = vscode.languages.createDiagnosticCollection('linterra');
    context.subscriptions.push(diagnosticCollection);
    // Register the command to manually check the current file
    const checkFileCommand = vscode.commands.registerCommand('linterra.checkFile', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            checkDocument(editor.document, diagnosticCollection);
            vscode.window.showInformationMessage('Linterra: File checked!');
        }
        else {
            vscode.window.showWarningMessage('Linterra: No active editor found');
        }
    });
    context.subscriptions.push(checkFileCommand);
    // Run on file open
    if (runOnOpen) {
        vscode.workspace.onDidOpenTextDocument((document) => {
            if (isReactDocument(document)) {
                checkDocument(document, diagnosticCollection);
            }
        }, null, context.subscriptions);
        // Check already open documents
        vscode.window.visibleTextEditors.forEach((editor) => {
            if (isReactDocument(editor.document)) {
                checkDocument(editor.document, diagnosticCollection);
            }
        });
    }
    // Run on file save
    if (runOnSave) {
        vscode.workspace.onDidSaveTextDocument((document) => {
            if (isReactDocument(document)) {
                checkDocument(document, diagnosticCollection);
            }
        }, null, context.subscriptions);
    }
    // Run on text change (with debouncing)
    let timeout;
    vscode.workspace.onDidChangeTextDocument((event) => {
        if (isReactDocument(event.document)) {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                checkDocument(event.document, diagnosticCollection);
            }, 500); // Debounce for 500ms
        }
    }, null, context.subscriptions);
    // Clear diagnostics when a document is closed
    vscode.workspace.onDidCloseTextDocument((document) => {
        diagnosticCollection.delete(document.uri);
    }, null, context.subscriptions);
    vscode.window.showInformationMessage('Linterra is now active!');
}
/**
 * Check if a document is a React/JSX file
 */
function isReactDocument(document) {
    return document.languageId === 'typescriptreact' ||
        document.languageId === 'javascriptreact';
}
/**
 * Main function to check a document for design system violations
 *
 * Integrates with the Linterra linter to analyze React/JSX code and
 * convert violations into VS Code diagnostics that appear in the editor.
 */
function checkDocument(document, diagnosticCollection) {
    const diagnostics = [];
    try {
        // Get the document text and run the linter
        const text = document.getText();
        const result = (0, linter_1.checkCode)(text);
        // Convert each violation to a VS Code diagnostic
        for (const violation of result.violations) {
            // Convert 1-indexed line/column to 0-indexed position
            // The linter returns 1-indexed, but VS Code uses 0-indexed
            const line = Math.max(0, violation.line - 1);
            const column = Math.max(0, violation.column - 1);
            // Create the range for the diagnostic
            // For now, we'll highlight from the column position to the end of the word/token
            // You can adjust this based on your needs
            const lineText = document.lineAt(line).text;
            const endColumn = findEndOfToken(lineText, column);
            const range = new vscode.Range(new vscode.Position(line, column), new vscode.Position(line, endColumn));
            // Map severity from linter to VS Code diagnostic severity
            const severity = violation.severity === 'error'
                ? vscode.DiagnosticSeverity.Error
                : vscode.DiagnosticSeverity.Warning;
            // Create the diagnostic
            const diagnostic = new vscode.Diagnostic(range, violation.message, severity);
            // Set the source and code
            diagnostic.source = 'Linterra';
            diagnostic.code = violation.rule;
            // Add suggestion as related information if available
            if (violation.suggestion) {
                diagnostic.relatedInformation = [
                    new vscode.DiagnosticRelatedInformation(new vscode.Location(document.uri, range), `Suggestion: ${violation.suggestion}`)
                ];
            }
            diagnostics.push(diagnostic);
        }
    }
    catch (error) {
        // Log the error and show a notification
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('Linterra: Error checking document:', errorMessage);
        // Optionally show a warning to the user (you can comment this out if it's too noisy)
        vscode.window.showErrorMessage(`Linterra: Failed to check document - ${errorMessage}`);
    }
    // Set the diagnostics for this document
    diagnosticCollection.set(document.uri, diagnostics);
}
/**
 * Helper function to find the end of a token starting at a given column
 * This helps create better diagnostic ranges that highlight the entire problematic token
 */
function findEndOfToken(lineText, startColumn) {
    // If we're beyond the line length, return the line length
    if (startColumn >= lineText.length) {
        return lineText.length;
    }
    // Find the end of the current token (word boundary or special character)
    let endColumn = startColumn;
    // Skip whitespace at the start
    while (endColumn < lineText.length && /\s/.test(lineText[endColumn])) {
        endColumn++;
    }
    // If we found a tag or special character, highlight it
    if (lineText[endColumn] === '<') {
        // Highlight the opening tag
        while (endColumn < lineText.length && lineText[endColumn] !== '>' && lineText[endColumn] !== ' ') {
            endColumn++;
        }
        return endColumn;
    }
    // Otherwise, find the end of the word/identifier
    while (endColumn < lineText.length && /[\w-]/.test(lineText[endColumn])) {
        endColumn++;
    }
    // If we didn't advance, at least highlight one character
    if (endColumn === startColumn) {
        endColumn = Math.min(startColumn + 1, lineText.length);
    }
    return endColumn;
}
/**
 * This method is called when the extension is deactivated
 */
function deactivate() {
    console.log('Linterra deactivated');
}
//# sourceMappingURL=extension.js.map