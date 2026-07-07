import { data } from '../data'

export function WorkSection() {
  return (
    <section
      id="work"
      className="snap-section relative z-10 flex min-h-[100dvh] flex-col justify-center px-6 py-20 md:px-20 lg:px-32"
    >
      <div className="max-w-4xl">
        <h2 className="font-terminal text-sm uppercase tracking-[0.3em] text-secondary">
          2. Work
        </h2>
        <p className="mt-4 text-2xl font-semibold md:text-3xl">Experience</p>

        <div className="mt-10 space-y-6">
          {data.experience.map((job) => (
            <article
              key={`${job.company}-${job.title}`}
              className="group rounded-xl border border-text/10 bg-surface/80 p-6 backdrop-blur-sm transition hover:border-secondary/30"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="text-secondary">{job.company}</p>
                </div>
                <div className="text-right font-terminal text-xs text-muted">
                  <p>{job.dates}</p>
                  <p>{job.location}</p>
                </div>
              </div>
              <p className="mt-3 text-text/80">{job.description}</p>
              <ul className="mt-3 space-y-1">
                {job.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-text/70">
                    <span className="text-secondary">→</span>
                    {h}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
