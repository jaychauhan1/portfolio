import { useState } from 'react'
import { data } from '../data'

export function ProjectsSection() {
  const [index, setIndex] = useState(0)
  const projects = data.projects

  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length)
  const next = () => setIndex((i) => (i + 1) % projects.length)

  const project = projects[index]

  return (
    <section
      id="projects"
      className="snap-section relative z-10 flex min-h-[100dvh] flex-col justify-center px-6 py-20 md:px-20 lg:px-32"
    >
      <div className="max-w-4xl">
        <h2 className="font-terminal text-sm uppercase tracking-[0.3em] text-secondary">
          3. Projects
        </h2>
        <p className="mt-4 text-2xl font-semibold md:text-3xl">Things I've built</p>

        <div className="relative mt-10 overflow-hidden rounded-2xl border border-text/10 bg-surface/80 p-8 backdrop-blur-sm md:p-12">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="block transition hover:opacity-90"
          >
            <h3 className="text-2xl font-bold md:text-3xl">{project.name}</h3>
            <p className="mt-4 max-w-xl text-text/80">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-secondary/40 px-3 py-1 font-terminal text-xs text-secondary"
                >
                  {t}
                </span>
              ))}
            </div>
          </a>

          <div className="mt-8 flex items-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous project"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-text/30 transition hover:border-secondary hover:text-secondary"
            >
              ←
            </button>
            <div className="flex gap-2">
              {projects.map((p, i) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to ${p.name}`}
                  className={`h-2 w-2 rounded-full transition ${
                    i === index ? 'bg-secondary' : 'bg-text/30'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Next project"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-text/30 transition hover:border-secondary hover:text-secondary"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
