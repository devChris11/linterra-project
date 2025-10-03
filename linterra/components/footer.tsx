import Link from "next/link"
import { Github, Instagram, Linkedin, Origami as Prism } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-secondary/10 via-primary/10 to-secondary/10 border-t border-primary/20 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <Prism className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold text-white">Linterra</span>
            </Link>
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="text-sm text-muted-foreground">
                Created by <span className="text-foreground font-semibold">Your Name</span>
              </p>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} Linterra. All rights reserved.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </Link>
          </div>

          <Link href="/demo">
            <Button className="bg-primary text-[#222222] hover:bg-primary/90 font-semibold shadow-lg shadow-primary/20">
              Try Demo
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  )
}
