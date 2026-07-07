import { useEffect, useState } from 'react'
import { data } from '../data'

export function TypewriterTagline() {
  const taglines = data.profile.taglines
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = taglines[taglineIndex]
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (text.length < current.length) {
            setText(current.slice(0, text.length + 1))
          } else {
            setTimeout(() => setDeleting(true), 2000)
          }
        } else {
          if (text.length > 0) {
            setText(text.slice(0, -1))
          } else {
            setDeleting(false)
            setTaglineIndex((i) => (i + 1) % taglines.length)
          }
        }
      },
      deleting ? 40 : 80,
    )
    return () => clearTimeout(timeout)
  }, [text, deleting, taglineIndex, taglines])

  return (
    <p className="font-terminal text-sm uppercase tracking-[0.3em] text-terminal md:text-base">
      {text}
      <span className="animate-[blink_1s_step-end_infinite]">|</span>
    </p>
  )
}
