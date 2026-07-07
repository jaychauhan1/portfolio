import { data } from '../data'

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="snap-section relative z-10 flex min-h-[100dvh] flex-col justify-center px-6 py-20 md:px-20 lg:px-32"
    >
      <div className="max-w-4xl">
        <h2 className="font-terminal text-sm uppercase tracking-[0.3em] text-secondary">
          1. Skills
        </h2>
        <p className="mt-4 text-2xl font-semibold md:text-3xl">Technologies I work with</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {data.skills.map((group) => (
            <div
              key={group.category}
              className="rounded-xl border border-text/10 bg-surface/80 p-6 backdrop-blur-sm transition hover:border-secondary/30"
            >
              <h3 className="font-terminal text-xs uppercase tracking-widest text-secondary">
                {group.category}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-text/20 px-3 py-1 text-sm text-text/90 transition hover:border-secondary hover:text-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
