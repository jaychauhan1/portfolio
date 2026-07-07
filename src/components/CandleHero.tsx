import { useEffect, useState } from 'react'

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
      {/* Warm ambient glow when lit */}
      <div
        className={`candle-glow absolute top-16 h-48 w-48 rounded-full blur-3xl transition-opacity duration-1000 md:h-64 md:w-64 ${
          lit ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle, #e8a84955 0%, #c4a88222 40%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 320 420"
        className="relative h-auto w-64 md:w-80"
        aria-label={`${firstName} ${lastName}`}
      >
        {/* Oval label — Diptyque-inspired, original design */}
        <ellipse cx="160" cy="130" rx="118" ry="88" fill="#faf8f5" stroke="#2c2c2c" strokeWidth="1.2" />

        {/* Inner oval border */}
        <ellipse cx="160" cy="130" rx="100" ry="72" fill="none" stroke="#2c2c2c" strokeWidth="0.6" opacity="0.4" />

        {/* Top arc — first name */}
        <defs>
          <path
            id="topArc"
            d="M 52 130 A 108 78 0 0 1 268 130"
            fill="none"
          />
          <path
            id="bottomArc"
            d="M 268 132 A 108 78 0 0 1 52 132"
            fill="none"
          />
        </defs>

        <text
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="15"
          letterSpacing="4"
          fill="#2c2c2c"
          textAnchor="middle"
        >
          <textPath href="#topArc" startOffset="50%">
            {firstName.toUpperCase()}
          </textPath>
        </text>

        {/* Center monogram — original, not Diptyque logo */}
        <text
          x="160"
          y="128"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="28"
          fontStyle="italic"
          fill="#8b7355"
          opacity="0.85"
        >
          JC
        </text>

        {/* Minimal botanical line — inspired by apothecary labels */}
        <g stroke="#8b7355" strokeWidth="0.8" fill="none" opacity="0.5">
          <path d="M 160 148 Q 145 158 140 168 Q 155 162 160 172 Q 165 162 180 168 Q 175 158 160 148" />
          <line x1="160" y1="148" x2="160" y2="172" />
        </g>

        <text
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="15"
          letterSpacing="5"
          fill="#2c2c2c"
          textAnchor="middle"
        >
          <textPath href="#bottomArc" startOffset="50%">
            {lastName.toUpperCase()}
          </textPath>
        </text>

        {/* Candle body */}
        <rect x="130" y="218" width="60" height="140" rx="2" fill="#faf8f5" stroke="#2c2c2c" strokeWidth="0.8" />
        {/* Wax drip texture */}
        <path
          d="M 130 260 Q 128 270 130 278 M 190 290 Q 192 300 190 308"
          stroke="#efede8"
          strokeWidth="2"
          fill="none"
        />

        {/* Wick */}
        <line x1="160" y1="218" x2="160" y2="200" stroke="#2c2c2c" strokeWidth="1.5" strokeLinecap="round" />

        {/* Flame */}
        {lit && (
          <g className="flame" style={{ transformOrigin: '160px 200px' }}>
            <ellipse cx="160" cy="188" rx="10" ry="16" fill="#e8a849" opacity="0.9" />
            <ellipse cx="160" cy="190" rx="5" ry="9" fill="#fff4d6" opacity="0.95" />
          </g>
        )}
      </svg>
    </div>
  )
}
