import { useEffect, useState } from 'react'
import { onGameReady, onLoadingProgress } from '../game/events'

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const unsubProgress = onLoadingProgress(setProgress)
    const unsubReady = onGameReady(() => {
      setProgress(100)
      setTimeout(() => {
        setVisible(false)
        onComplete()
      }, 600)
    })

    return () => {
      unsubProgress()
      unsubReady()
    }
  }, [onComplete])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--color-panel-cream)]">
      {/* Pixel character */}
      <div className="mb-6" style={{ imageRendering: 'pixelated' }}>
        <svg width="32" height="48" viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="4" width="6" height="6" fill="#d4a574" />
          <rect x="4" y="5" width="1" height="4" fill="#1a1a1a" />
          <rect x="11" y="5" width="1" height="4" fill="#1a1a1a" />
          <rect x="5" y="3" width="6" height="2" fill="#1a1a1a" />
          <rect x="4" y="10" width="8" height="7" fill="#2c2c2c" />
          <rect x="3" y="11" width="1" height="5" fill="#2c2c2c" />
          <rect x="12" y="11" width="1" height="5" fill="#2c2c2c" />
          <rect x="5" y="17" width="2" height="6" fill="#1a1a1a" />
          <rect x="9" y="17" width="2" height="6" fill="#1a1a1a" />
        </svg>
      </div>

      {/* Progress bar */}
      <div className="mb-3 h-1 w-48 bg-[var(--color-border)]">
        <div
          className="h-full bg-[var(--color-text-primary)] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="font-serif text-2xl tracking-widest text-[var(--color-text-primary)]">
        {progress}%
      </p>

      <p className="mt-4 font-sans text-xs tracking-[0.3em] text-[var(--color-tag-muted)]">
        HOUSTON AT NIGHT
      </p>
    </div>
  )
}
