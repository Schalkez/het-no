import { HeroContent } from '../components/HeroContent/HeroContent'
import { MockupPhone } from '../components/MockupPhone/MockupPhone'

export function HeroSection() {
  return (
    <section className="relative pt-16 pb-20 md:pt-28 md:pb-36 px-4 md:px-10 lg:px-40 overflow-hidden">
      {/* Decor: Triangle */}
      <div className="absolute top-20 left-10 text-primary/20 transform rotate-12 animate-pulse hidden lg:block">
        <svg
          fill="none"
          height="100"
          viewBox="0 0 100 100"
          width="100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 0L61.2257 38.7743L100 50L61.2257 61.2257L50 100L38.7743 61.2257L0 50L38.7743 38.7743L50 0Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      {/* Decor: Circle */}
      <div className="absolute bottom-40 right-10 text-secondary/20 transform -rotate-12 hidden lg:block">
        <svg
          fill="none"
          height="80"
          viewBox="0 0 100 100"
          width="80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" fill="currentColor" r="50"></circle>
        </svg>
      </div>

      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center gap-12 lg:gap-24 relative z-10 w-full">
        <HeroContent />
        <MockupPhone />
      </div>
    </section>
  )
}
