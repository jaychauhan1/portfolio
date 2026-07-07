import { useEffect, useState } from 'react'

const ROLES = ['SWE', 'Cybersecurity']

export function RotatingRoles() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % ROLES.length)
        setVisible(true)
      }, 400)
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-8 overflow-hidden">
      <p
        className={`font-serif text-lg italic tracking-wide text-accent transition-all duration-500 md:text-xl ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        {ROLES[index]}
      </p>
    </div>
  )
}
