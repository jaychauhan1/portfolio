import { useCallback, useEffect, useState } from 'react'
import { GameCanvas } from './game/GameCanvas'
import { onZoneEnter, onZoneExit } from './game/events'
import type { GameZoneEvent, SectionId } from './types/resume'
import { ContentPanel } from './components/ContentPanel'
import { ControlsHint, RotatePrompt } from './components/RotatePrompt'
import { LoadingScreen } from './components/LoadingScreen'
import { MobileFallback } from './components/MobileFallback'
import { MusicPlayer } from './components/MusicPlayer'
import { useIsMobilePortrait } from './hooks/useMediaQuery'

export function AppShell() {
  const isMobilePortrait = useIsMobilePortrait()
  const [loaded, setLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState<SectionId | null>(null)
  const [zoneLabel, setZoneLabel] = useState<string>('')

  const handleClose = useCallback(() => {
    setActiveSection(null)
    setZoneLabel('')
  }, [])

  useEffect(() => {
    const unsubEnter = onZoneEnter((detail: GameZoneEvent) => {
      setActiveSection(detail.section)
      setZoneLabel(detail.label)
    })
    const unsubExit = onZoneExit(handleClose)

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKey)

    return () => {
      unsubEnter()
      unsubExit()
      window.removeEventListener('keydown', handleKey)
    }
  }, [handleClose])

  if (isMobilePortrait) {
    return <MobileFallback />
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[var(--color-bg-dark)]">
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <GameCanvas active={true} />
      {loaded && (
        <>
          <MusicPlayer />
          <ControlsHint />
          <RotatePrompt />
        </>
      )}
      <ContentPanel section={activeSection} zoneLabel={zoneLabel} onClose={handleClose} />
    </div>
  )
}
