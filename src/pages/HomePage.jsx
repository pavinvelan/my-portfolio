import HeroSection from '@/components/homepage/HeroSection'
import AboutSection from '@/components/homepage/AboutSection'
import Experience from '@/components/homepage/Experience'
import Skills from '@/components/homepage/Skills'
import Projects from '@/components/homepage/Projects'
import Education from '@/components/homepage/Education'
import ContactSection from '@/components/homepage/ContactSection'

function HomePage() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <ContactSection />
    </div>
  )
}

export default HomePage
