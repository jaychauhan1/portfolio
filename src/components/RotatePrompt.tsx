import { useIsMobile, useIsMobilePortrait } from '../hooks/useMediaQuery'

export function RotatePrompt() {
  const isMobile = useIsMobile()
  const isPortrait = useMediaQueryPortrait()

  if (!isMobile || !isPortrait) return null

  return (
    <div className="fixed bottom-4 left-1/2 z-30 -translate-x-1/2 border border-[var(--color-accent-warm)]/40 bg-[var(--color-bg-dark)]/90 px-4 py-2 font-sans text-[10px] tracking-[0.2em] text-[var(--color-panel-cream)] backdrop-blur-sm">
      ROTATE FOR MAP · SCROLL VIEW AVAILABLE
    </div>
  )
}

function useMediaQueryPortrait() {
  return useIsMobilePortrait()
}

export function ControlsHint() {
  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-30 font-sans text-[10px] tracking-[0.15em] text-[var(--color-panel-cream)]/60">
      WASD / ARROWS · E TO INTERACT · ESC TO CLOSE
    </div>
  )
}
