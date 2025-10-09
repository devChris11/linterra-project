"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Download } from "lucide-react"
import { motion } from "framer-motion"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"

export function HeroSection() {
  return (
    <section className="container mx-auto px-8 md:px-16 lg:px-36  py-40 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* Left side - Text content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}  
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
          Lint Your Design Tokens. Enforce Accessibility. Ship Consistent UIs.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
          Automated linting for React/Next.js components. Catches hardcoded colors, spacing violations, and accessibility issues before code review.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Link href="/demo">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-8 py-6 shadow-lg shadow-primary/20 btn-shine"
              >
                Try Linterra
              </Button>
            </Link>
            <Link href="https://github.com/devChris11/linterra-project" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-secondary text-secondary hover:bg-secondary/10 font-semibold text-lg px-8 py-6 bg-transparent"
              >
                <Github className="w-5 h-5 mr-2" />
                View on Github
              </Button>
            </Link>
            {/*
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-secondary text-secondary hover:bg-secondary/10 font-semibold text-lg px-8 py-6 bg-transparent"
              onClick={() => {
                const link = document.createElement('a')
                link.href = '/linterra.yml'
                link.download = 'linterra.yml'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              }}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Linterra.yml
            </Button>
            */}
          </div>
        </motion.div>

        {/* Right side - Animated illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="w-full max-w-lg relative"
          >
            <DotLottieReact
              src="https://lottie.host/26905a43-f159-43b2-b074-6a75c4d4fc9b/9eSFCBiejq.lottie"
              height={700}
              width={700}
              loop
              autoplay
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
