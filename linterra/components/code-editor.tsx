"use client"
import Editor from "@monaco-editor/react"
import type { Monaco } from "@monaco-editor/react"

interface CodeEditorProps {
  language: string
  value: string
  onChange: (value: string) => void
}

export function CodeEditor({ language, value, onChange }: CodeEditorProps) {
  const handleEditorWillMount = (monaco: Monaco) => {
    // Disable all built-in validation and diagnostics
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
      noSuggestionDiagnostics: true,
    })
    
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
      noSuggestionDiagnostics: true,
    })
  }

  // Show placeholder when editor is empty
  const displayValue = value || "// Paste your React/JSX code here or select a code snippet from the dropdown above...\n\n"

  return (
    <Editor
      height="100%"
      language={language}
      value={displayValue}
      onChange={(value) => onChange(value || "")}
      theme="vs-dark"
      beforeMount={handleEditorWillMount}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        wordWrap: "on",
        padding: { top: 16, bottom: 16 },
      }}
    />
  )
}
