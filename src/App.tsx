import { useCallback, useRef, useState } from 'react'
import { HeroSection } from './components/HeroSection'
import { IntroOverlay } from './components/IntroOverlay'
import { ContactSection } from './components/ContactSection'
import { Header, SectionDots, useActiveSection } from './components/Header'
import { ProjectsSection } from './components/ProjectsSection'
import { SkillsSection } from './components/SkillsSection'
import { WorkSection } from './components/WorkSection'
import type { SectionId } from './types/resume'

export function AppShell() {
  const [introDone, setIntroDone] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const activeSection = useActiveSection(containerRef)

  const navigate = useCallback((id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      {!introDone && <IntroOverlay onComplete={() => setIntroDone(true)} />}

      <Header activeSection={activeSection} onNavigate={navigate} />
      <SectionDots activeSection={activeSection} onNavigate={navigate} />

      <div ref={containerRef} className="snap-container relative z-10">
        <HeroSection onContact={() => navigate('contact')} />
        <SkillsSection />
        <WorkSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </>
  )
}
