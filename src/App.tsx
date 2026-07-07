import { useCallback, useRef, useState } from 'react'
import { HeroSection } from './components/HeroSection'
import { BlobBackground } from './components/BlobBackground'
import { BootSequence } from './components/BootSequence'
import { ContactSection } from './components/ContactSection'
import { Header, SectionDots, useActiveSection } from './components/Header'
import { ProjectsSection } from './components/ProjectsSection'
import { SkillsSection } from './components/SkillsSection'
import { WorkSection } from './components/WorkSection'
import type { SectionId } from './types/resume'

export function AppShell() {
  const [booted, setBooted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const activeSection = useActiveSection(containerRef)

  const navigate = useCallback((id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      {booted && (
        <>
          <BlobBackground />
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
      )}
    </>
  )
}
