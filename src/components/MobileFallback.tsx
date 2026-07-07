import resume from '../data/resume.json'
import type { ResumeData } from '../types/resume'
import { MusicPlayer } from './MusicPlayer'

const data = resume as ResumeData

const SECTIONS = [
  { id: 'contact', number: '01', title: 'Contact' },
  { id: 'about', number: '00', title: 'About' },
  { id: 'education', number: '02', title: 'Education' },
  { id: 'experience', number: '03', title: 'Experience' },
  { id: 'projects', number: '04', title: 'Projects' },
  { id: 'skills', number: '05', title: 'Skills' },
] as const

export function MobileFallback() {
  return (
    <div className="h-full overflow-y-auto bg-[var(--color-panel-cream)]">
      <MusicPlayer />

      <header className="border-b border-[var(--color-border)] px-6 py-10">
        <p className="font-sans text-xs tracking-[0.3em] text-[var(--color-tag-muted)]">
          HOUSTON AT NIGHT
        </p>
        <h1 className="mt-2 font-serif text-4xl font-light text-[var(--color-text-primary)]">
          {data.profile.name}
        </h1>
        <p className="mt-3 font-serif text-lg italic text-[var(--color-text-primary)]/80">
          {data.profile.tagline}
        </p>
        <p className="mt-4 font-sans text-xs text-[var(--color-accent-warm)]">
          Rotate to landscape for the walkable map experience.
        </p>
      </header>

      {SECTIONS.map(({ id, number, title }) => (
        <section key={id} className="border-b border-[var(--color-border)] px-6 py-8">
          <p className="font-sans text-xs tracking-[0.25em] text-[var(--color-tag-muted)]">
            {number}
          </p>
          <h2 className="font-serif text-2xl text-[var(--color-text-primary)]">{title}</h2>
          <div className="mt-4">
            <MobileSectionContent section={id} />
          </div>
        </section>
      ))}

      <footer className="px-6 py-8 font-sans text-xs text-[var(--color-tag-muted)]">
        Agora · Margiela · Diptyque · Built with Phaser + React
      </footer>
    </div>
  )
}

function MobileSectionContent({ section }: { section: (typeof SECTIONS)[number]['id'] }) {
  switch (section) {
    case 'contact':
      return (
        <ul className="space-y-2 font-sans text-sm">
          <li>
            <a href={`mailto:${data.profile.email}`}>{data.profile.email}</a>
          </li>
          <li>{data.profile.phone}</li>
          <li>
            <a href={data.profile.linkedin}>LinkedIn</a>
          </li>
          <li>
            <a href={data.profile.github}>GitHub</a>
          </li>
        </ul>
      )
    case 'about':
      return (
        <div className="space-y-3 font-sans text-sm">
          {data.about.paragraphs.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
      )
    case 'education':
      return (
        <div className="font-sans text-sm">
          {data.education.map((e) => (
            <p key={e.school}>
              <strong>{e.school}</strong> — {e.degree}, GPA {e.gpa}
            </p>
          ))}
        </div>
      )
    case 'experience':
      return (
        <div className="space-y-4 font-sans text-sm">
          {data.experience.map((e) => (
            <div key={e.company}>
              <strong>{e.title}</strong> @ {e.company}
              <ul className="mt-1 list-inside list-disc">
                {e.bullets.map((b) => (
                  <li key={b.slice(0, 20)}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )
    case 'projects':
      return (
        <div className="space-y-4 font-sans text-sm">
          {data.projects.map((p) => (
            <div key={p.name}>
              <strong>{p.name}</strong>
              <ul className="mt-1 list-inside list-disc">
                {p.bullets.map((b) => (
                  <li key={b.slice(0, 20)}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )
    case 'skills':
      return (
        <dl className="space-y-2 font-sans text-sm">
          {Object.entries(data.skills).map(([k, v]) => (
            <div key={k}>
              <dt className="font-serif text-base">{k}</dt>
              <dd className="text-[var(--color-text-primary)]/85">{v}</dd>
            </div>
          ))}
        </dl>
      )
  }
}
