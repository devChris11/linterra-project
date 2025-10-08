"use client"

import { useState } from "react"
import { CodeEditor } from "./code-editor"
import { ResultsPanel } from "./results-panel"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { checkCode } from "@/linter"
import type { CheckResult } from "@/linter/types"
import { EXAMPLES } from "@/sample-codes"
import type { CodeExample } from "@/sample-codes/types"
import { X } from "lucide-react"

export function DemoContent() {
  const [code, setCode] = useState("")
  const [results, setResults] = useState<CheckResult | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [selectedExample, setSelectedExample] = useState<CodeExample | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string>("")

  const handleCheckCode = async () => {
    setIsChecking(true)
    
    // Run the actual linter
    try {
      const linterResults = checkCode(code)
      setResults(linterResults)
    } catch (error) {
      console.error("Error checking code:", error)
      // Set empty results on error
      setResults({
        violations: [],
        summary: {
          errors: 0,
          warnings: 0,
        },
      })
    } finally {
      setIsChecking(false)
    }
  }

  const handleExampleSelect = (exampleId: string) => {
    const example = EXAMPLES.find((ex) => ex.id === exampleId)
    if (example) {
      setSelectedExample(example)
      setSelectedValue(exampleId)
      setIsPopupOpen(true)
    }
  }

  const handleAddToEditor = () => {
    if (selectedExample) {
      setCode(selectedExample.code)
      setResults(null)
      setIsPopupOpen(false)
    }
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
  }

  const formatViolationText = (errors: number, warnings: number) => {
    if (errors === 0 && warnings === 0) {
      return "0 violations"
    }
    const parts = []
    if (errors > 0) {
      parts.push(`${errors} ${errors === 1 ? 'error' : 'errors'}`)
    }
    if (warnings > 0) {
      parts.push(`${warnings} ${warnings === 1 ? 'warning' : 'warnings'}`)
    }
    return parts.join(', ')
  }

  return (
    <div className="container mx-auto px-6 pt-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Section - Editor */}
        <div className="flex flex-col gap-4">
          <Select value={selectedValue} onValueChange={handleExampleSelect}>
            <SelectTrigger className="w-full bg-zinc-900/80 border-zinc-800 text-zinc-100 hover:bg-zinc-900 hover:border-zinc-700 transition-colors">
              <SelectValue placeholder="Select a code example..." />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800">
              {EXAMPLES.map((example) => (
                <SelectItem 
                  key={example.id} 
                  value={example.id}
                  className="text-zinc-100 focus:bg-zinc-800 focus:text-zinc-50 cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full gap-4">
                    <span className="font-medium">{example.name}</span>
                    <span className="text-xs text-zinc-500">
                      {formatViolationText(example.expectedViolations.errors, example.expectedViolations.warnings)}
                      {example.expectedViolations.errors === 0 && example.expectedViolations.warnings === 0 ? ' ✓' : ''}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="h-[600px] border border-border rounded-lg overflow-hidden">
            <CodeEditor language="typescript" value={code} onChange={setCode} />
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleCheckCode}
              disabled={isChecking || !code}
              className="flex-1 bg-primary text-md py-6 text-primary-foreground hover:bg-primary/90 font-semibold h-[56px]"
            >
              {isChecking ? "Checking..." : "Check Code"}
            </Button>
            <Button
              onClick={() => {
                setCode("")
                setResults(null)
                setSelectedValue("")
              }}
              disabled={!code}
              variant="outline"
              className="flex-1 border-2 border-secondary text-md py-6 text-secondary font-semibold transition-transform duration-300 hover:scale-[1.02] hover:bg-transparent hover:text-secondary active:scale-95 h-[56px]"
            >
              Clear Code Editor
            </Button>
          </div>
        </div>

        {/* Right Section - Results */}
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-card-foreground">Results</h3>
          <ResultsPanel results={results} />
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && selectedExample && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleClosePopup}
        >
          <div 
            className="bg-card border border-border rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <Button
              onClick={handleClosePopup}
              variant="ghost"
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-muted-foreground hover:text-card-foreground" />
            </Button>

            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="pr-8">
                <h2 className="text-2xl font-bold text-card-foreground mb-2">
                  {selectedExample.name}
                </h2>
                <p className="text-muted-foreground">
                  {selectedExample.description}
                </p>
              </div>

              {/* Expected Violations */}
              <div>
                <h3 className="text-sm font-semibold text-card-foreground mb-2">Expected Violations:</h3>
                <div className="flex gap-2 flex-wrap">
                  {selectedExample.expectedViolations.errors > 0 && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-500/10 text-red-500 border border-red-500/20">
                      {selectedExample.expectedViolations.errors} {selectedExample.expectedViolations.errors === 1 ? 'error' : 'errors'}
                    </span>
                  )}
                  {selectedExample.expectedViolations.warnings > 0 && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                      {selectedExample.expectedViolations.warnings} {selectedExample.expectedViolations.warnings === 1 ? 'warning' : 'warnings'}
                    </span>
                  )}
                  {selectedExample.expectedViolations.errors === 0 && selectedExample.expectedViolations.warnings === 0 && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                      No violations ✓
                    </span>
                  )}
                </div>
              </div>

              {/* Tags */}
              {selectedExample.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-card-foreground mb-2">Tags:</h3>
                  <div className="flex gap-2 flex-wrap">
                    {selectedExample.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Button */}
              <div className="pt-4">
                <Button
                  onClick={handleAddToEditor}
                  variant="outline"
                  className="w-full border-2 border-secondary text-secondary py-6 text-md font-semibold transition-transform duration-300 hover:scale-[1.02] hover:bg-transparent hover:text-secondary active:scale-95"
                >
                  Add Code to Editor
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
