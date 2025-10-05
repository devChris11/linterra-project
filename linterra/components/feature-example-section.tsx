"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

const examples = [
  {
    title: "Before Linting",
    code: `function example() {
  var x = 10;
  console.log(x)
  return x
}`,
    violations: [
      { line: 2, message: "Unexpected var, use let or const instead" },
      { line: 3, message: "Missing semicolon" },
      { line: 4, message: "Missing semicolon" },
    ],
  },
  {
    title: "After Linting",
    code: `function example() {
  const x = 10;
  console.log(x);
  return x;
}`,
    violations: [{ line: 0, message: "No violations found! ✓" }],
  },
]

export function FeatureExampleSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="container mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">See It In Action</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {examples.map((example, index) => (
          <ExampleCard key={index} example={example} index={index} />
        ))}
      </div>
    </section>
  )
}

function ExampleCard({ example, index }: { example: (typeof examples)[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="flex flex-col gap-4"
    >
      <h3 className="text-2xl font-bold text-foreground">{example.title}</h3>

      {/* Code snippet */}
      <Card className="bg-background border-border overflow-hidden">
        <CardContent className="p-0">
          <pre className="p-6 overflow-x-auto">
            <code className="text-sm text-foreground font-mono leading-relaxed">{example.code}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Violations card */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-primary" />
            <h4 className="text-lg font-semibold text-card-foreground">Violations</h4>
          </div>
          <div className="space-y-2">
            {example.violations.map((violation, idx) => (
              <div
                key={idx}
                className={`text-sm ${violation.line === 0 ? "text-primary" : "text-muted-foreground"} flex gap-2`}
              >
                {violation.line > 0 && <span className="text-secondary font-mono">Line {violation.line}:</span>}
                <span>{violation.message}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
