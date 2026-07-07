import { useEffect, useState } from 'react'
import { SECTIONS, type SectionId } from '../types/resume'

interface HeaderProps {
  activeSection: SectionId
  onNavigate: (id: SectionId) => void
}

export function Header({ activeSection, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed left-0 top-0 z-30 hidden w-full items-center justify-between px-6 py-4 md:flex lg:px-20 lg:pt-8">
        <span className="font-terminal text-xs uppercase tracking-widest text-muted">
          Drag anywhere
        </span>
        <nav>
          <ul className="flex gap-4 font-terminal text-xs uppercase lg:gap-6 lg:text-sm">
            {SECTIONS.map((section) => (
              <li
                key={section.id}
                className="border-r border-text/30 pr-4 transition-colors last:border-0 hover:text-secondary lg:pr-6"
              >
                <button
                  type="button"
                  onClick={() => onNavigate(section.id)}
                  className={`flex gap-2 ${activeSection === section.id ? 'text-secondary' : ''}`}
                >
                  <span className="text-secondary">{section.index}.</span>
                  <span>{section.label}</span>
                </button>
              </li>
            ))}
            <li className="pl-2">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex gap-2 transition-colors hover:text-secondary"
              >
                <span className="text-secondary">5.</span>
                <span>Resume</span>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Mobile header */}
      <header className="fixed left-0 top-0 z-30 flex w-full items-center justify-between bg-background/80 px-4 py-3 backdrop-blur-sm md:hidden">
        <span className="font-terminal text-xs text-secondary">JC</span>
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="font-terminal text-xs uppercase text-text"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </header>

      {menuOpen && (
        <nav className="fixed inset-0 z-20 flex flex-col items-center justify-center gap-6 bg-background/95 md:hidden">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => {
                onNavigate(section.id)
                setMenuOpen(false)
              }}
              className="font-terminal text-lg uppercase"
            >
              <span className="text-secondary">{section.index}.</span> {section.label}
            </button>
          ))}
        </nav>
      )}
    </>
  )
}

interface SectionDotsProps {
  activeSection: SectionId
  onNavigate: (id: SectionId) => void
}

export function SectionDots({ activeSection, onNavigate }: SectionDotsProps) {
  return (
    <nav
      className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 md:flex lg:right-8"
      aria-label="Section navigation"
    >
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          type="button"
          onClick={() => onNavigate(section.id)}
          aria-label={`Go to ${section.label}`}
          className={`h-2 w-2 rounded-full transition-all ${
            activeSection === section.id
              ? 'scale-125 bg-secondary'
              : 'bg-text/40 hover:bg-text/70'
          }`}
        />
      ))}
    </nav>
  )
}

export function useActiveSection(containerRef: React.RefObject<HTMLElement | null>) {
  const [active, setActive] = useState<SectionId>('about')

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) {
          setActive(visible[0].target.id as SectionId)
        }
      },
      { root: container, threshold: 0.4 },
    )

    sections.forEach((el) => observer.observe(el!))
    return () => observer.disconnect()
  }, [containerRef])

  return active
}
