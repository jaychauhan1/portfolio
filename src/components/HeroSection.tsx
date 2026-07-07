import { data } from '../data'
import { CandleHero } from './CandleHero'
import { RotatingRoles } from './RotatingRoles'

interface HeroSectionProps {
  onContact: () => void
}

export function HeroSection({ onContact }: HeroSectionProps) {
  const { profile, education } = data

  return (
    <section
      id="about"
      className="snap-section relative z-10 min-h-[100dvh] px-6 pb-24 pt-32 md:px-20 md:pt-36 lg:px-32"
    >
      <div className="flex min-h-[75dvh] flex-col items-center justify-center text-center">
        <CandleHero firstName="Jyotiradityasinh" lastName="Chauhan" />

        <h1 className="mt-8 font-serif text-3xl font-light tracking-wide text-text md:text-4xl lg:text-5xl">
          Jyotiradityasinh Chauhan
        </h1>

        <div className="mt-3">
          <RotatingRoles />
        </div>

        <p className="mt-8 max-w-md text-sm leading-relaxed text-muted md:max-w-lg md:text-base">
          {profile.bio}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onContact}
            className="border border-text bg-text px-8 py-3 font-sans text-sm tracking-wide text-cream transition hover:bg-transparent hover:text-text"
          >
            Contact
          </button>
          <a
            href="#about-details"
            className="border border-text/30 px-8 py-3 font-sans text-sm tracking-wide text-text transition hover:border-text"
          >
            About
          </a>
        </div>
      </div>

      <div id="about-details" className="mx-auto max-w-2xl pb-24 text-center md:text-left">
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-accent">About</p>
        <p className="mt-4 font-serif text-2xl font-light md:text-3xl">{profile.title}</p>

        <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted md:text-base">
          {profile.bioExtended.map((p) => (
            <p key={p.slice(0, 30)}>{p}</p>
          ))}
        </div>

        <div className="mt-10 border border-text/10 bg-cream p-8">
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-accent">Education</p>
          <p className="mt-3 font-serif text-xl">{education.school}</p>
          <p className="mt-1 text-muted">
            {education.degree} · GPA {education.gpa}
          </p>
          <p className="text-sm text-muted/80">{education.dates}</p>
        </div>
      </div>
    </section>
  )
}
