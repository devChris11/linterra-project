"use client"

import { useState } from "react"
import { CodeEditor } from "./code-editor"
import { ResultsPanel } from "./results-panel"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DemoContent() {
  const [language, setLanguage] = useState("javascript")
  const [code, setCode] = useState("")
  const [results, setResults] = useState<any>(null)
  const [isChecking, setIsChecking] = useState(false)

  const handleCheckCode = async () => {
    setIsChecking(true)
    // Simulate code checking
    setTimeout(() => {
      setResults({
        violations: [
          { line: 2, message: "Unexpected var, use let or const instead", severity: "error" },
          { line: 5, message: "Missing semicolon", severity: "warning" },
        ],
        summary: {
          errors: 1,
          warnings: 1,
        },
      })
      setIsChecking(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
        {/* Left Section - Editor */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[200px] bg-card border-border text-card-foreground">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="javascript" className="text-popover-foreground focus:bg-accent focus:text-accent-foreground">
                  JavaScript
                </SelectItem>
                <SelectItem value="typescript" className="text-popover-foreground focus:bg-accent focus:text-accent-foreground">
                  TypeScript
                </SelectItem>
                <SelectItem value="python" className="text-popover-foreground focus:bg-accent focus:text-accent-foreground">
                  Python
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 border border-border rounded-lg overflow-hidden">
            <CodeEditor language={language} value={code} onChange={setCode} />
          </div>

          <Button
            onClick={handleCheckCode}
            disabled={isChecking || !code}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            {isChecking ? "Checking..." : "Check Code"}
          </Button>
        </div>

        {/* Right Section - Results */}
        <div className="flex flex-col">
          <ResultsPanel results={results} />
        </div>
      </div>
    </div>
  )
}
