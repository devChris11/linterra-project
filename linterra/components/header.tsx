import Link from "next/link"
import { Pyramid as Prism } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-b border-primary/20">
      <div className="container mx-auto px-36 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Prism className="w-8 h-8 text-secondary" />
          <span className="text-2xl font-bold text-white">Linterra</span>
        </Link>

        <Link href="/demo">
          <Button className="bg-primary text-background hover:bg-primary/90 font-semibold px-6 btn-shine">Try Demo</Button>
        </Link>
      </div>
    </header>
  )
}
