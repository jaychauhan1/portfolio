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
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className="snap-section relative z-10 flex min-h-[100dvh] flex-col justify-center px-6 py-20 md:px-20 lg:px-32"
    >
      <div className="mx-auto max-w-lg">
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-accent">Contact</p>
        <p className="mt-4 font-serif text-3xl font-light md:text-4xl">Get in touch</p>

        <div className="mt-8 flex flex-col gap-2 font-sans text-sm text-muted">
          <a href={`mailto:${profile.email}`} className="transition hover:text-text">
            {profile.email}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-text">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="transition hover:text-text">
            GitHub
          </a>
        </div>

        <form onSubmit={handleSubmit} className="mt-12 space-y-6">
          <div>
            <label htmlFor="email" className="font-serif text-xs uppercase tracking-widest text-muted">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 w-full border-b border-text/20 bg-transparent py-2 text-text outline-none transition focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="subject" className="font-serif text-xs uppercase tracking-widest text-muted">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              className="mt-2 w-full border-b border-text/20 bg-transparent py-2 text-text outline-none transition focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="message" className="font-serif text-xs uppercase tracking-widest text-muted">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="mt-2 w-full resize-none border-b border-text/20 bg-transparent py-2 text-text outline-none transition focus:border-accent"
            />
          </div>
          <button
            type="submit"
            className="border border-text bg-text px-8 py-3 font-sans text-sm tracking-wide text-cream transition hover:bg-transparent hover:text-text"
          >
            Send
          </button>
          {submitted && (
            <p className="text-sm text-muted">Opening your email client…</p>
          )}
        </form>
      </div>

      <footer className="mx-auto mt-20 max-w-lg text-center font-sans text-xs text-muted/60">
        © {new Date().getFullYear()} Jyotiradityasinh Chauhan
      </footer>
    </section>
  )
}
