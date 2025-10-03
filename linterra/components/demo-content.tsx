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
              <SelectTrigger className="w-[200px] bg-[#2A2A2A] border-[#3A3A3A] text-[#FEFEFE]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-[#2A2A2A] border-[#3A3A3A]">
                <SelectItem value="javascript" className="text-[#FEFEFE] focus:bg-[#3A3A3A] focus:text-[#FEFEFE]">
                  JavaScript
                </SelectItem>
                <SelectItem value="typescript" className="text-[#FEFEFE] focus:bg-[#3A3A3A] focus:text-[#FEFEFE]">
                  TypeScript
                </SelectItem>
                <SelectItem value="python" className="text-[#FEFEFE] focus:bg-[#3A3A3A] focus:text-[#FEFEFE]">
                  Python
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 border border-[#3A3A3A] rounded-lg overflow-hidden">
            <CodeEditor language={language} value={code} onChange={setCode} />
          </div>

          <Button
            onClick={handleCheckCode}
            disabled={isChecking || !code}
            className="bg-[#21C759] text-[#FEFEFE] hover:bg-[#21C759]/90 font-semibold"
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
