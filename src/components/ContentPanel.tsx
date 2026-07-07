import resume from '../data/resume.json'
import type { ResumeData, SectionId } from '../types/resume'
import { Divider, OverlayPanel, SectionBlock } from './OverlayPanel'

const data = resume as ResumeData

const SECTION_META: Record<
  SectionId,
  { number: string; title: string; subtitle?: string }
> = {
  about: { number: '00', title: 'About', subtitle: 'Rooftop Lookout' },
  contact: { number: '01', title: 'Contact', subtitle: 'Agora Coffee' },
  education: { number: '02', title: 'Education', subtitle: 'UH Campus' },
  experience: { number: '03', title: 'Experience', subtitle: 'Work District' },
  projects: { number: '04', title: 'Projects', subtitle: 'Project Lab' },
  skills: { number: '05', title: 'Skills', subtitle: 'Box Score' },
}

interface ContentPanelProps {
  section: SectionId | null
  zoneLabel?: string
  onClose: () => void
}

export function ContentPanel({ section, zoneLabel, onClose }: ContentPanelProps) {
  if (!section) return null

  const meta = SECTION_META[section]

  return (
    <OverlayPanel
      open={!!section}
      onClose={onClose}
      number={meta.number}
      title={meta.title}
      subtitle={zoneLabel ?? meta.subtitle}
    >
      {section === 'about' && <AboutContent />}
      {section === 'contact' && <ContactContent />}
      {section === 'education' && <EducationContent />}
      {section === 'experience' && <ExperienceContent />}
      {section === 'projects' && <ProjectsContent />}
      {section === 'skills' && <SkillsContent />}
    </OverlayPanel>
  )
}

function AboutContent() {
  return (
    <div>
      <p className="font-serif text-xl italic text-[var(--color-text-primary)]">
        {data.profile.tagline}
      </p>
      <Divider />
      {data.about.paragraphs.map((p) => (
        <p key={p.slice(0, 24)} className="mb-4 font-sans text-sm leading-relaxed text-[var(--color-text-primary)]/90">
          {p}
        </p>
      ))}
      <SectionBlock label="Certification">
        <p className="font-sans text-sm">{data.skills.Certifications}</p>
      </SectionBlock>
    </div>
  )
}

function ContactContent() {
  const { profile } = data
  return (
    <div>
      <p className="font-serif text-2xl text-[var(--color-text-primary)]">{profile.name}</p>
      <p className="mt-2 font-sans text-sm italic text-[var(--color-accent-warm)]">
        Currently at Agora — pull up a chair.
      </p>
      <Divider />
      <ul className="space-y-3 font-sans text-sm">
        <li>
          <span className="text-[var(--color-tag-muted)]">Email </span>
          <a href={`mailto:${profile.email}`} className="underline decoration-[var(--color-accent-warm)]/40 hover:decoration-[var(--color-accent-warm)]">
            {profile.email}
          </a>
        </li>
        <li>
          <span className="text-[var(--color-tag-muted)]">Phone </span>
          {profile.phone}
        </li>
        <li>
          <span className="text-[var(--color-tag-muted)]">LinkedIn </span>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="underline decoration-[var(--color-accent-warm)]/40 hover:decoration-[var(--color-accent-warm)]">
            {profile.linkedin.replace('https://', '')}
          </a>
        </li>
        <li>
          <span className="text-[var(--color-tag-muted)]">GitHub </span>
          <a href={profile.github} target="_blank" rel="noreferrer" className="underline decoration-[var(--color-accent-warm)]/40 hover:decoration-[var(--color-accent-warm)]">
            {profile.github.replace('https://', '')}
          </a>
        </li>
      </ul>
    </div>
  )
}

function EducationContent() {
  return (
    <div>
      {data.education.map((edu) => (
        <div key={edu.school} className="mb-6">
          <h3 className="font-serif text-xl text-[var(--color-text-primary)]">{edu.school}</h3>
          <p className="font-sans text-sm text-[var(--color-accent-cool)]">
            {edu.degree} · GPA {edu.gpa}
          </p>
          <p className="font-sans text-xs text-[var(--color-tag-muted)]">
            {edu.dates} · {edu.location}
          </p>
        </div>
      ))}
      <Divider />
      <SectionBlock label="CougarCS">
        {data.extracurriculars.map((ext) => (
          <div key={ext.title} className="mb-4">
            <h4 className="font-serif text-lg">{ext.title}</h4>
            <p className="font-sans text-xs text-[var(--color-tag-muted)]">{ext.org} · {ext.dates}</p>
            <ul className="mt-2 list-inside list-disc space-y-1 font-sans text-sm">
              {ext.bullets.map((b) => (
                <li key={b.slice(0, 30)}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </SectionBlock>
      <SectionBlock label="Teaching">
        {data.experience
          .filter((e) => e.title === 'Teaching Assistant')
          .map((exp) => (
            <ul key={exp.title} className="list-inside list-disc space-y-1 font-sans text-sm">
              {exp.bullets.map((b) => (
                <li key={b.slice(0, 30)}>{b}</li>
              ))}
            </ul>
          ))}
      </SectionBlock>
    </div>
  )
}

function ExperienceContent() {
  return (
    <div className="space-y-8">
      {data.experience.map((exp) => (
        <article key={`${exp.company}-${exp.title}`}>
          <h3 className="font-serif text-xl text-[var(--color-text-primary)]">{exp.title}</h3>
          <p className="font-sans text-sm text-[var(--color-accent-cool)]">
            {exp.company} · {exp.location}
          </p>
          <p className="font-sans text-xs text-[var(--color-tag-muted)]">{exp.dates}</p>
          <ul className="mt-3 list-inside list-disc space-y-2 font-sans text-sm leading-relaxed">
            {exp.bullets.map((b) => (
              <li key={b.slice(0, 40)}>{b}</li>
            ))}
          </ul>
          <div className="mt-2 flex flex-wrap gap-1">
            {exp.tags.map((tag) => (
              <span
                key={tag}
                className="border border-[var(--color-border)] px-2 py-0.5 font-sans text-[10px] tracking-wider text-[var(--color-tag-muted)] uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}

function ProjectsContent() {
  return (
    <div className="space-y-8">
      {data.projects.map((proj) => (
        <article key={proj.name}>
          <h3 className="font-serif text-xl text-[var(--color-text-primary)]">{proj.name}</h3>
          <p className="font-sans text-xs text-[var(--color-tag-muted)]">
            {proj.dates} · {proj.tech}
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2 font-sans text-sm leading-relaxed">
            {proj.bullets.map((b) => (
              <li key={b.slice(0, 40)}>{b}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}

function SkillsContent() {
  const entries = Object.entries(data.skills)

  return (
    <div>
      <p className="mb-6 font-serif text-lg italic text-[var(--color-accent-warm)]">
        Box score — quiet fundamentals, loud impact.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse font-sans text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th className="py-2 pr-4 text-left text-[10px] tracking-[0.2em] text-[var(--color-tag-muted)] uppercase">
                Category
              </th>
              <th className="py-2 text-left text-[10px] tracking-[0.2em] text-[var(--color-tag-muted)] uppercase">
                Stack
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([category, value]) => (
              <tr key={category} className="border-b border-[var(--color-border)]/60">
                <td className="py-3 pr-4 align-top font-serif text-base text-[var(--color-text-primary)]">
                  {category}
                </td>
                <td className="py-3 align-top text-[var(--color-text-primary)]/85">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 font-sans text-xs text-[var(--color-tag-muted)]">
        🏀 Easter egg unlocked — you found the court.
      </p>
    </div>
  )
}
