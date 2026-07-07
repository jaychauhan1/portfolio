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
      <header className="fixed left-0 top-0 z-30 hidden w-full items-center justify-between px-6 py-6 md:flex lg:px-20 lg:pt-10">
        <span className="font-serif text-sm italic text-muted">Portfolio</span>
        <nav>
          <ul className="flex gap-6 font-sans text-xs uppercase tracking-[0.2em] lg:gap-8">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(section.id)}
                  className={`transition-colors hover:text-accent ${
                    activeSection === section.id ? 'text-accent' : 'text-text/70'
                  }`}
                >
                  {section.label}
                </button>
              </li>
            ))}
            <li>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-text/70 transition-colors hover:text-accent"
              >
                Resume
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <header className="fixed left-0 top-0 z-30 flex w-full items-center justify-between bg-background/90 px-4 py-4 backdrop-blur-sm md:hidden">
        <span className="font-serif text-sm italic">JC</span>
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="font-sans text-xs uppercase tracking-widest text-text"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </header>

      {menuOpen && (
        <nav className="fixed inset-0 z-20 flex flex-col items-center justify-center gap-8 bg-background/98 md:hidden">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => {
                onNavigate(section.id)
                setMenuOpen(false)
              }}
              className="font-serif text-2xl font-light"
            >
              {section.label}
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
      className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 md:flex"
      aria-label="Section navigation"
    >
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          type="button"
          onClick={() => onNavigate(section.id)}
          aria-label={`Go to ${section.label}`}
          className={`h-1.5 w-1.5 rounded-full transition-all ${
            activeSection === section.id
              ? 'scale-150 bg-accent'
              : 'bg-text/25 hover:bg-text/50'
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
