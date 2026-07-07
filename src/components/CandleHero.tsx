import { useEffect, useState } from 'react'

interface OvalEmblemProps {
  firstName: string
  lastName: string
  showFlame?: boolean
  lit?: boolean
  className?: string
  idPrefix?: string
}

/** Diptyque-inspired oval label — original design, shared across hero & icons */
export function OvalEmblem({
  firstName,
  lastName,
  showFlame = false,
  lit = true,
  className = 'h-auto w-64 md:w-80',
  idPrefix = 'emblem',
}: OvalEmblemProps) {
  const topArcId = `${idPrefix}-top`
  const bottomArcId = `${idPrefix}-bottom`

  return (
    <svg
      viewBox="0 0 320 260"
      className={className}
      aria-hidden={!showFlame}
      aria-label={showFlame ? `${firstName} ${lastName}` : undefined}
    >
      <defs>
        <path id={topArcId} d="M 70 82 A 118 88 0 0 1 250 82" fill="none" />
        <path id={bottomArcId} d="M 250 178 A 118 88 0 0 1 70 178" fill="none" />
      </defs>

      <ellipse cx="160" cy="130" rx="118" ry="88" fill="#faf8f5" stroke="#2c2c2c" strokeWidth="1.2" />
      <ellipse cx="160" cy="130" rx="100" ry="72" fill="none" stroke="#2c2c2c" strokeWidth="0.6" opacity="0.35" />

      <text
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="13"
        letterSpacing="3"
        fill="#2c2c2c"
      >
        <textPath href={`#${topArcId}`} startOffset="50%" textAnchor="middle">
          {firstName.toUpperCase()}
        </textPath>
      </text>

      <text
        x="160"
        y="124"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="26"
        fontStyle="italic"
        fill="#8b7355"
        opacity="0.85"
      >
        JC
      </text>

      <g stroke="#8b7355" strokeWidth="0.8" fill="none" opacity="0.45">
        <path d="M 160 138 Q 146 146 142 154 Q 156 150 160 158 Q 164 150 178 154 Q 174 146 160 138" />
        <line x1="160" y1="138" x2="160" y2="158" />
      </g>

      <text
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="14"
        letterSpacing="5"
        fill="#2c2c2c"
      >
        <textPath href={`#${bottomArcId}`} startOffset="50%" textAnchor="middle">
          {lastName.toUpperCase()}
        </textPath>
      </text>

      {showFlame && (
        <>
          <line x1="160" y1="218" x2="160" y2="232" stroke="#2c2c2c" strokeWidth="1.2" strokeLinecap="round" />
          {lit && (
            <g className="flame" style={{ transformOrigin: '160px 232px' }}>
              <ellipse cx="160" cy="244" rx="9" ry="14" fill="#e8a849" opacity="0.9" />
              <ellipse cx="160" cy="246" rx="4.5" ry="8" fill="#fff4d6" opacity="0.95" />
            </g>
          )}
        </>
      )}
    </svg>
  )
}

interface CandleHeroProps {
  firstName: string
  lastName: string
}

export function CandleHero({ firstName, lastName }: CandleHeroProps) {
  const [lit, setLit] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLit(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative flex flex-col items-center">
      <div
        className={`candle-glow absolute top-8 h-40 w-40 rounded-full blur-3xl transition-opacity duration-1000 md:h-52 md:w-52 ${
          lit ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle, #e8a84944 0%, #c4a88218 45%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <OvalEmblem firstName={firstName} lastName={lastName} showFlame lit={lit} idPrefix="hero" />
    </div>
  )
}

export function EmblemMark({ className = 'h-8 w-10' }: { className?: string }) {
  return (
    <OvalEmblem
      firstName="Jyotiradityasinh"
      lastName="Chauhan"
      showFlame
      lit
      idPrefix="mark"
      className={className}
    />
  )
}
