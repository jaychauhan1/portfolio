import { data } from '../data'

export function WorkSection() {
  return (
    <section
      id="work"
      className="snap-section relative z-10 flex min-h-[100dvh] flex-col justify-center px-6 py-20 md:px-20 lg:px-32"
    >
      <div className="mx-auto max-w-4xl">
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-accent">Work</p>
        <p className="mt-4 font-serif text-3xl font-light md:text-4xl">Experience</p>

        <div className="mt-12 space-y-10">
          {data.experience.map((job) => (
            <article key={`${job.company}-${job.title}`} className="border-b border-text/10 pb-10 last:border-0">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-serif text-xl md:text-2xl">{job.title}</h3>
                <p className="font-sans text-xs tracking-wide text-muted">{job.dates}</p>
              </div>
              <p className="mt-1 text-sm text-accent">{job.company} · {job.location}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{job.description}</p>
              <ul className="mt-4 space-y-2">
                {job.highlights.map((h) => (
                  <li key={h} className="text-sm text-text/75 before:mr-2 before:text-accent before:content-['—']">
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
