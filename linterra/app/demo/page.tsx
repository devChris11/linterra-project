import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DemoContent } from "@/components/demo-content"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <DemoContent />
      </main>
      <Footer />
    </div>
  )
}
