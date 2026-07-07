import { data } from '../data'
import { TypewriterTagline } from './TypewriterTagline'

interface HeroSectionProps {
  onContact: () => void
}

export function HeroSection({ onContact }: HeroSectionProps) {
  const { profile, education } = data

  return (
    <section
      id="about"
      className="snap-section relative z-10 min-h-[100dvh] px-6 py-20 md:px-20 lg:px-32"
    >
      <div className="flex min-h-[70dvh] flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="glow-text text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
            {profile.shortName}
          </h1>

          <div className="mt-4">
            <TypewriterTagline />
          </div>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-text/80 md:text-lg">
            {profile.bio}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={onContact}
              className="rounded-full bg-secondary px-8 py-3 font-semibold text-background transition hover:brightness-110"
            >
              Contact Me
            </button>
            <a
              href="#about-details"
              className="flex items-center gap-2 rounded-full border border-secondary px-8 py-3 font-semibold text-secondary transition hover:bg-secondary/10"
            >
              Learn More <span>→</span>
            </a>
          </div>
        </div>
      </div>

      <div id="about-details" className="max-w-3xl pb-20">
        <h2 className="font-terminal text-sm uppercase tracking-[0.3em] text-secondary">
          0. About
        </h2>
        <p className="mt-4 text-2xl font-semibold md:text-3xl">{profile.title}</p>

        <div className="mt-8 space-y-4 text-base leading-relaxed text-text/80">
          {profile.bioExtended.map((p) => (
            <p key={p.slice(0, 30)}>{p}</p>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-text/10 bg-surface p-6">
          <p className="font-terminal text-xs uppercase tracking-widest text-secondary">Education</p>
          <p className="mt-2 text-lg font-semibold">{education.school}</p>
          <p className="text-text/70">
            {education.degree} · GPA {education.gpa}
          </p>
          <p className="text-sm text-muted">{education.dates}</p>
        </div>
      </div>
    </section>
  )
}
