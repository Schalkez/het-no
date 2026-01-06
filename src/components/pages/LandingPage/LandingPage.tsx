import { LandingFooter } from './components/LandingFooter/LandingFooter'
import { HeroSection } from './organisms/HeroSection'
import { FeaturesSection } from './organisms/FeaturesSection'
import { TestimonialsSection } from './organisms/TestimonialsSection'

export function LandingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col group/design-root bg-paper-texture font-sans text-text-main selection:bg-accent/30 selection:text-primary">
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
      </main>

      <LandingFooter />
    </div>
  )
}
