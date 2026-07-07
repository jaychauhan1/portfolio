import { data } from '../data'

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="snap-section relative z-10 flex min-h-[100dvh] flex-col justify-center px-6 py-20 pt-32 md:px-20 md:pt-36 lg:px-32"
    >
      <div className="mx-auto max-w-4xl">
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-accent">Skills</p>
        <p className="mt-4 font-serif text-3xl font-light md:text-4xl">Technologies</p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {data.skills.map((group) => (
            <div key={group.category} className="border border-text/10 bg-cream p-8">
              <h3 className="font-serif text-xs uppercase tracking-[0.25em] text-accent">
                {group.category}
              </h3>
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                {group.items.map((skill) => (
                  <span key={skill} className="text-sm text-text/80">
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
