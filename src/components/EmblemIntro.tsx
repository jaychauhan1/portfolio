import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const OUTER_OVAL = 'M 42 130 A 118 88 0 1 0 278 130 A 118 88 0 1 0 42 130'
const INNER_OVAL = 'M 60 130 A 100 72 0 1 0 260 130 A 100 72 0 1 0 60 130'

/** Intentional, unhurried pacing (~5s total) */
const T = {
  outerDraw: 0.9,
  innerDelay: 0.85,
  innerDraw: 0.65,
  botanicalDelay: 1.55,
  botanicalFade: 0.55,
  monogramDelay: 2.0,
  monogramFade: 0.7,
  firstNameDelay: 2.35,
  lastNameDelay: 2.65,
  nameFade: 0.75,
  wickDelay: 3.2,
  wickFade: 0.35,
  flameAt: 3600,
  fadeAt: 4600,
  exitFade: 1.0,
  glowFade: 1200,
} as const

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1]

interface EmblemIntroProps {
  onComplete: () => void
}

function AnimatedEmblem({ lit }: { lit: boolean }) {
  return (
    <svg viewBox="0 0 320 260" className="h-auto w-72 md:w-96" aria-label="Jyotiradityasinh Chauhan">
      <defs>
        <path id="intro-top" d="M 70 82 A 118 88 0 0 1 250 82" fill="none" />
        <path id="intro-bottom" d="M 250 178 A 118 88 0 0 1 70 178" fill="none" />
      </defs>

      <motion.path
        d={OUTER_OVAL}
        fill="#faf8f5"
        stroke="#2c2c2c"
        strokeWidth={1.2}
        initial={{ pathLength: 0, fillOpacity: 0 }}
        animate={{ pathLength: 1, fillOpacity: 1 }}
        transition={{ duration: T.outerDraw, ease: EASE }}
      />

      <motion.path
        d={INNER_OVAL}
        fill="none"
        stroke="#2c2c2c"
        strokeWidth={0.6}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.35 }}
        transition={{ duration: T.innerDraw, delay: T.innerDelay, ease: EASE }}
      />

      <motion.g
        stroke="#8b7355"
        strokeWidth={0.8}
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ duration: T.botanicalFade, delay: T.botanicalDelay, ease: EASE }}
      >
        <path d="M 160 138 Q 146 146 142 154 Q 156 150 160 158 Q 164 150 178 154 Q 174 146 160 138" />
        <line x1="160" y1="138" x2="160" y2="158" />
      </motion.g>

      <motion.text
        x="160"
        y="124"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="26"
        fontStyle="italic"
        fill="#8b7355"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ duration: T.monogramFade, delay: T.monogramDelay, ease: EASE }}
      >
        JC
      </motion.text>

      <motion.text
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="13"
        letterSpacing="3"
        fill="#2c2c2c"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: T.nameFade, delay: T.firstNameDelay, ease: EASE }}
      >
        <textPath href="#intro-top" startOffset="50%" textAnchor="middle">
          JYOTIRADITYASINH
        </textPath>
      </motion.text>

      <motion.text
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="14"
        letterSpacing="5"
        fill="#2c2c2c"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: T.nameFade, delay: T.lastNameDelay, ease: EASE }}
      >
        <textPath href="#intro-bottom" startOffset="50%" textAnchor="middle">
          CHAUHAN
        </textPath>
      </motion.text>

      <motion.line
        x1="160"
        y1="218"
        x2="160"
        y2="232"
        stroke="#2c2c2c"
        strokeWidth={1.2}
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: T.wickFade, delay: T.wickDelay, ease: EASE }}
      />

      {lit && (
        <g className="flame" style={{ transformOrigin: '160px 232px' }}>
          <ellipse cx="160" cy="244" rx="9" ry="14" fill="#e8a849" opacity="0.9" />
          <ellipse cx="160" cy="246" rx="4.5" ry="8" fill="#fff4d6" opacity="0.95" />
        </g>
      )}
    </svg>
  )
}

export function EmblemIntro({ onComplete }: EmblemIntroProps) {
  const [visible, setVisible] = useState(true)
  const [lit, setLit] = useState(false)

  useEffect(() => {
    const flameTimer = setTimeout(() => setLit(true), T.flameAt)
    const fadeTimer = setTimeout(() => {
      try {
        localStorage.setItem('intro-seen', '1')
      } catch {
        /* ignore */
      }
      onComplete()
      setVisible(false)
    }, T.fadeAt)
    return () => {
      clearTimeout(flameTimer)
      clearTimeout(fadeTimer)
    }
  }, [onComplete])

  const finish = () => {
    try {
      localStorage.setItem('intro-seen', '1')
    } catch {
      /* ignore */
    }
    onComplete()
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="emblem-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: T.exitFade, ease: EASE }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <button
            type="button"
            onClick={finish}
            className="absolute right-6 top-6 font-sans text-xs tracking-widest text-muted transition hover:text-text md:right-12 md:top-10"
          >
            Skip
          </button>

          <div className="relative">
            <div
              className={`candle-glow absolute inset-0 m-auto h-48 w-48 rounded-full blur-3xl transition-opacity ${
                lit ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transitionDuration: `${T.glowFade}ms`,
                background: 'radial-gradient(circle, #e8a84944 0%, #c4a88218 45%, transparent 70%)',
              }}
              aria-hidden="true"
            />
            <AnimatedEmblem lit={lit} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function shouldSkipIntro(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
  try {
    return localStorage.getItem('intro-seen') === '1'
  } catch {
    return false
  }
}
