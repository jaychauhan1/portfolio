import { useEffect, useState } from 'react'
import { SECTIONS, type SectionId } from '../types/resume'

interface HeaderProps {
  activeSection: SectionId
  onNavigate: (id: SectionId) => void
}

const NAV_ITEMS = [
  ...SECTIONS,
  { id: 'resume' as const, label: 'Resume', index: 5, external: '/resume.pdf' },
]

export function Header({ activeSection, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop nav */}
      <header className="fixed left-0 top-0 z-40 hidden w-full border-b border-text/10 bg-background/95 backdrop-blur-md md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-5 lg:px-10">
          <nav aria-label="Main navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 font-serif text-sm tracking-wide lg:text-[15px]">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.id} className="flex items-center">
                  {'external' in item && item.external ? (
                    <a
                      href={item.external}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-baseline gap-1.5 px-2 py-1 text-text/80 transition hover:text-text"
                    >
                      <span className="text-accent">{item.index}.</span>
                      <span>{item.label}</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onNavigate(item.id as SectionId)}
                      className={`flex items-baseline gap-1.5 px-2 py-1 transition ${
                        activeSection === item.id
                          ? 'text-text'
                          : 'text-text/70 hover:text-text'
                      }`}
                    >
                      <span className="text-accent">{item.index}.</span>
                      <span>{item.label}</span>
                    </button>
                  )}
                  {i < NAV_ITEMS.length - 1 && (
                    <span className="mx-1 text-text/25 select-none" aria-hidden="true">
                      |
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile nav */}
      <header className="fixed left-0 top-0 z-40 flex w-full items-center justify-between border-b border-text/10 bg-background/95 px-5 py-4 backdrop-blur-md md:hidden">
        <span className="font-serif text-base italic text-text">Portfolio</span>
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="font-serif text-sm text-text"
          aria-expanded={menuOpen}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </header>

      {menuOpen && (
        <nav
          className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-6 bg-background md:hidden"
          aria-label="Mobile navigation"
        >
          {NAV_ITEMS.map((item) =>
            'external' in item && item.external ? (
              <a
                key={item.id}
                href={item.external}
                target="_blank"
                rel="noreferrer"
                className="font-serif text-2xl font-light text-text"
                onClick={() => setMenuOpen(false)}
              >
                <span className="text-accent">{item.index}.</span> {item.label}
              </a>
            ) : (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.id as SectionId)
                  setMenuOpen(false)
                }}
                className={`font-serif text-2xl font-light ${
                  activeSection === item.id ? 'text-text' : 'text-text/70'
                }`}
              >
                <span className="text-accent">{item.index}.</span> {item.label}
              </button>
            ),
          )}
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
      className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-4 lg:flex xl:right-10"
      aria-label="Section navigation"
    >
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          type="button"
          onClick={() => onNavigate(section.id)}
          aria-label={`Go to ${section.label}`}
          aria-current={activeSection === section.id ? 'true' : undefined}
          className={`group flex items-center justify-end gap-2 font-serif text-xs transition ${
            activeSection === section.id ? 'text-text' : 'text-text/40 hover:text-text/70'
          }`}
        >
          <span
            className={`opacity-0 transition group-hover:opacity-100 ${
              activeSection === section.id ? 'opacity-100' : ''
            }`}
          >
            {section.label}
          </span>
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] ${
              activeSection === section.id
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-text/20'
            }`}
          >
            {section.index}
          </span>
        </button>
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
