import { useState } from 'react'
import { data } from '../data'

export function ContactSection() {
  const { profile } = data
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const subject = encodeURIComponent(String(fd.get('subject') ?? 'Portfolio Contact'))
    const body = encodeURIComponent(String(fd.get('message') ?? ''))
    const email = encodeURIComponent(profile.email)
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className="snap-section relative z-10 flex min-h-[100dvh] flex-col justify-center px-6 py-20 md:px-20 lg:px-32"
    >
      <div className="max-w-2xl">
        <h2 className="font-terminal text-sm uppercase tracking-[0.3em] text-secondary">
          4. Contact
        </h2>
        <p className="mt-4 text-2xl font-semibold md:text-3xl">Get in touch</p>

        <div className="mt-6 flex flex-wrap gap-4 font-terminal text-sm">
          <a href={profile.github} target="_blank" rel="noreferrer" className="text-secondary hover:underline">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-secondary hover:underline">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="text-secondary hover:underline">
            {profile.email}
          </a>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
          <div>
            <label htmlFor="email" className="font-terminal text-xs uppercase tracking-widest text-muted">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-lg border border-text/20 bg-surface px-4 py-3 text-text outline-none transition focus:border-secondary"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label htmlFor="subject" className="font-terminal text-xs uppercase tracking-widest text-muted">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              className="mt-2 w-full rounded-lg border border-text/20 bg-surface px-4 py-3 text-text outline-none transition focus:border-secondary"
              placeholder="Hello!"
            />
          </div>
          <div>
            <label htmlFor="message" className="font-terminal text-xs uppercase tracking-widest text-muted">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="mt-2 w-full resize-none rounded-lg border border-text/20 bg-surface px-4 py-3 text-text outline-none transition focus:border-secondary"
              placeholder="Your message..."
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-secondary px-8 py-3 font-semibold text-background transition hover:brightness-110"
          >
            Submit
          </button>
          {submitted && (
            <p className="font-terminal text-sm text-terminal">Opening your email client...</p>
          )}
        </form>
      </div>

      <footer className="mt-16 font-terminal text-xs text-muted">
        © {new Date().getFullYear()} {profile.displayName} Chauhan
      </footer>
    </section>
  )
}
