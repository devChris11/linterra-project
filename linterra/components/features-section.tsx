"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Zap, Shield, Code, Eye, Cog } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Automated Checking",
    description: "Runs on every pull request automatically. No manual code review needed—violations are caught before merge, with line-by-line feedback and suggested fixes.",
  },
  {
    icon: Eye,
    title: "Design System + Accessibility",
    description: "Goes beyond design tokens—also enforces color contrast ratios and semantic HTML for WCAG compliance. Ship accessible UIs by default.",
  },
  {
    icon: Cog,
    title: "Zero Configuration",
    description: "Add one GitHub Action file to your repo. That's it. Works with React, Next.js, and TypeScript out of the box. No complex setup or dependencies.",
  },
]

export function FeaturesSection() {
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
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why Design System Checker?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Automated enforcement that fits into your existing workflow—no process changes required.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} index={index} />
        ))}
      </div>
    </section>
  )
}

function FeatureCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <Card className="bg-card border-border hover:border-primary transition-all duration-300 h-full group">
        <CardContent className="p-8">
          <div className="mb-6 inline-block p-4 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <feature.icon className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-card-foreground mb-4">{feature.title}</h3>
          <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
