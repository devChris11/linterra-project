import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { FeatureExampleSection } from "@/components/feature-example-section"
import { CTASection } from "@/components/cta-section"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#222222]">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <FeatureExampleSection />
        <CTASection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
