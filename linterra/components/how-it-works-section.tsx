"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Image from "next/image"

const steps = [
  {
    number: "01",
    title: "Install GitHub Action",
    description:
      "Add our workflow file to .github/workflows/. Takes 30 seconds.",
  },
  {
    number: "02",
    title: "Open a Pull Request",
    description:
      "Make changes to your components. Open a PR. The checker runs automatically.",
  },
  {
    number: "03",
    title: "Get Instant Feedback",
    description:
      "Violations appear as PR comments with line numbers, severity levels, and suggestions to fix. Merge with confidence.  ",
  },
]

export function HowItWorksSection() {
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
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How It Works</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Three simple steps. One workflow file. Automatic enforcement on every pull request
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Animated illustration */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center order-2 lg:order-1"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="w-full max-w-3xl relative"
          >
            <DotLottieReact
              src="https://lottie.host/63c7c6a7-49ac-4ba0-9ec4-9958559d0f30/wUkEWDZ2TF.lottie"
              height={500}
              width={600}
              loop
              autoplay
            />
          </motion.div>
        </motion.div>

        {/* Right side - Steps */}
        <div className="flex flex-col gap-6 order-1 lg:order-2">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ x: 8, transition: { duration: 0.3 } }}
    >
      <Card className="bg-card border-border hover:border-secondary transition-all duration-300 group">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <span className="text-5xl font-bold text-secondary group-hover:text-primary transition-colors">
                {step.number}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-card-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
