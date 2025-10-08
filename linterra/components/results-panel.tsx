"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FileCode, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { CheckResult } from "@/linter/types"

interface ResultsPanelProps {
  results: CheckResult | null
}

export function ResultsPanel({ results }: ResultsPanelProps) {
  if (!results) {
    return (
      <Card className="bg-card border-border h-[670px] flex items-center justify-center">
        <CardContent className="flex flex-col items-center justify-center gap-4 p-12 text-center">
          <FileCode className="w-16 h-16 text-muted-foreground" />
          <div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">No Results Yet</h3>
            <p className="text-muted-foreground">
              Write some code in the editor and click "Check Code" to see the linting results.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Sort violations: errors first, then warnings
  const sortedViolations = [...results.violations].sort((a, b) => {
    if (a.severity === 'error' && b.severity === 'warning') return -1;
    if (a.severity === 'warning' && b.severity === 'error') return 1;
    return 0;
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="results"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="h-[670px]"
      >
        <Card className="bg-card border-border h-full flex flex-col">
          <CardContent className="p-6 flex-1 overflow-auto">
            <div>
              {/* Summary */}
              <div className="flex gap-4 mb-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-card-foreground font-semibold">{results.summary.errors} Errors</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                  <span className="text-card-foreground font-semibold">{results.summary.warnings} Warnings</span>
                </div>
              </div>

              {/* Violations */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-card-foreground mb-3">Violations</h4>
                {sortedViolations.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    <p>✨ No violations found! Your code looks great.</p>
                  </div>
                ) : (
                  sortedViolations.map((violation, index) => (
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
                            <span className="text-secondary font-mono text-sm">
                              Line {violation.line}:{violation.column}
                            </span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded font-medium ${
                                violation.severity === "error"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                              }`}
                            >
                              {violation.severity}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded font-medium bg-secondary/20 text-secondary">
                              {violation.rule}
                            </span>
                          </div>
                          <p className="text-card-foreground text-sm mb-1">{violation.message}</p>
                          {violation.suggestion && (
                            <p className="text-sm text-primary mt-2">
                              💡 Suggestion: {violation.suggestion}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
