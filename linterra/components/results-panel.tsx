"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FileCode, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ResultsPanelProps {
  results: any
}

export function ResultsPanel({ results }: ResultsPanelProps) {
  if (!results) {
    return (
      <Card className="bg-[#2A2A2A] border-[#3A3A3A] h-full flex items-center justify-center">
        <CardContent className="flex flex-col items-center justify-center gap-4 p-12 text-center">
          <FileCode className="w-16 h-16 text-[#3A3A3A]" />
          <div>
            <h3 className="text-xl font-semibold text-[#FEFEFE] mb-2">No Results Yet</h3>
            <p className="text-[#FEFEFE]/60">
              Write some code in the editor and click "Check Code" to see the linting results.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="results"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        <Card className="bg-[#2A2A2A] border-[#3A3A3A] h-full flex flex-col">
          <CardContent className="p-6 flex-1 overflow-auto">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-[#FEFEFE] mb-4">Results</h3>

              {/* Summary */}
              <div className="flex gap-4 mb-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-[#FEFEFE] font-semibold">{results.summary.errors} Errors</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                  <span className="text-[#FEFEFE] font-semibold">{results.summary.warnings} Warnings</span>
                </div>
              </div>

              {/* Violations */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-[#FEFEFE] mb-3">Violations</h4>
                {results.violations.map((violation: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border ${
                      violation.severity === "error"
                        ? "bg-red-500/5 border-red-500/30"
                        : "bg-yellow-500/5 border-yellow-500/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          violation.severity === "error" ? "text-red-500" : "text-yellow-500"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[#1DC7A8] font-mono text-sm">Line {violation.line}</span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded ${
                              violation.severity === "error"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {violation.severity}
                          </span>
                        </div>
                        <p className="text-[#FEFEFE]/80 text-sm">{violation.message}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
