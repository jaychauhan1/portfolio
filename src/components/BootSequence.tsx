import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BootSequenceProps {
  onComplete: () => void
}

const COMMANDS = [
  { prompt: 'jchauhan@houston:~$', command: 'pwd', output: '/home/jchauhan/Documents' },
  { prompt: 'jchauhan@houston:~$', command: 'cd portfolio', output: '' },
  { prompt: 'jchauhan@houston:~/portfolio$', command: 'ls', output: 'node_modules/  public/  src/  index.html  package.json  vite.config.ts' },
  { prompt: 'jchauhan@houston:~/portfolio$', command: 'npm run dev', output: '' },
]

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [step, setStep] = useState(0)
  const [typed, setTyped] = useState('')
  const [showOutput, setShowOutput] = useState(false)
  const [serverLines, setServerLines] = useState<string[]>([])
  const [done, setDone] = useState(false)

  const current = COMMANDS[step]

  useEffect(() => {
    if (!current) return

    const cmd = current.command
    let i = 0
    setTyped('')
    setShowOutput(false)

    const typeInterval = setInterval(() => {
      i++
      setTyped(cmd.slice(0, i))
      if (i >= cmd.length) {
        clearInterval(typeInterval)
        setTimeout(() => {
          setShowOutput(true)
          if (step === COMMANDS.length - 1) {
            setTimeout(() => setServerLines(['Server starting...']), 400)
            setTimeout(() => setServerLines(['Server starting...', 'Server listening on http://localhost:5173']), 1200)
            setTimeout(() => {
              setDone(true)
              setTimeout(onComplete, 800)
            }, 2200)
          } else {
            setTimeout(() => setStep((s) => s + 1), 600)
          }
        }, 300)
      }
    }, 60)

    return () => clearInterval(typeInterval)
  }, [step, current, onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.section
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex flex-col justify-center bg-background px-6 font-terminal text-terminal md:px-20"
        >
          <button
            type="button"
            onClick={onComplete}
            className="absolute bottom-12 right-6 flex items-center gap-2 text-sm text-text/70 transition hover:text-secondary md:bottom-auto md:right-20 md:top-20"
          >
            Skip Animation →
          </button>

          <div className="flex max-w-3xl flex-col gap-3 text-sm md:text-base">
            {COMMANDS.slice(0, step).map((cmd) => (
              <div key={cmd.command}>
                <div className="flex gap-4">
                  <span className="shrink-0 font-bold text-text">{cmd.prompt}</span>
                  <span>{cmd.command}</span>
                </div>
                {cmd.output && <div className="text-text/80">{cmd.output}</div>}
              </div>
            ))}

            {current && (
              <div>
                <div className="flex gap-4">
                  <span className="shrink-0 font-bold text-text">{current.prompt}</span>
                  <span>
                    {typed}
                    <span className="animate-[blink_1s_step-end_infinite] text-terminal">|</span>
                  </span>
                </div>
                {showOutput && current.output && (
                  <div className="text-text/80">{current.output}</div>
                )}
              </div>
            )}

            {serverLines.map((line) => (
              <div key={line} className="text-text/80">
                {line}
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
