"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

const examples = [
  {
    title: "❌ Before: Design System Violations",
    code: `export default function Button() {
  return (
    <button
      style={{
        backgroundColor: '#3B82F6',
        color: '#FFFFFF',
        padding: '12px 24px',
        borderRadius: '8px'
      }}
    >
      Click Me
    </button>
  );
}`,
    violations: [
      '⚠️  2 hardcoded colors detected',
      '⚠️  3 hardcoded spacing values'
    ],
  },
  {
    title: "✅ After: Design System Compliant",
    code: `export default function Button() {
  return (
    <button
      className="bg-primary text-white px-6 py-3 rounded-lg"
    >
      Click Me
    </button>
  );
}`,
    violations: ['✓ No violations found!'],
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
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Before & After</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          See how the checker catches violations and suggests design token replacements
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
      <Card className="bg-[#1e1e1e] border-border overflow-hidden">
        <CardContent className="p-0">
          <SyntaxHighlighter
            language="tsx"
            style={vscDarkPlus}
            showLineNumbers={true}
            customStyle={{
              margin: 0,
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              lineHeight: '1.5',
            }}
            lineNumberStyle={{
              minWidth: '3em',
              paddingRight: '1em',
              color: '#858585',
              userSelect: 'none',
            }}
          >
            {example.code}
          </SyntaxHighlighter>
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
                className="text-sm text-muted-foreground"
              >
                {violation}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
