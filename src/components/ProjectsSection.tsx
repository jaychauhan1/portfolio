import { useState } from 'react'
import { data } from '../data'

export function ProjectsSection() {
  const [index, setIndex] = useState(0)
  const projects = data.projects
  const project = projects[index]

  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length)
  const next = () => setIndex((i) => (i + 1) % projects.length)

  return (
    <section
      id="projects"
      className="snap-section relative z-10 flex min-h-[100dvh] flex-col justify-center px-6 py-20 pt-32 md:px-20 md:pt-36 lg:px-32"
    >
      <div className="mx-auto max-w-3xl">
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-accent">Projects</p>
        <p className="mt-4 font-serif text-3xl font-light md:text-4xl">Selected work</p>

        <div className="mt-12 border border-text/10 bg-cream p-10 md:p-14">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="block transition hover:opacity-80"
          >
            <h3 className="font-serif text-2xl md:text-3xl">{project.name}</h3>
            <p className="mt-4 leading-relaxed text-muted">{project.description}</p>
            <p className="mt-6 font-sans text-xs tracking-widest text-accent uppercase">
              {project.tech.join(' · ')}
            </p>
          </a>

          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous project"
              className="font-serif text-sm text-muted transition hover:text-text"
            >
              ← Prev
            </button>
            <div className="flex gap-2">
              {projects.map((p, i) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to ${p.name}`}
                  className={`h-1 w-6 transition ${
                    i === index ? 'bg-accent' : 'bg-text/15'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Next project"
              className="font-serif text-sm text-muted transition hover:text-text"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
