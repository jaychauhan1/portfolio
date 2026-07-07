import { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import { initGame } from './config'

interface GameCanvasProps {
  active: boolean
}

export function GameCanvas({ active }: GameCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (!active || !containerRef.current) return
    if (gameRef.current) return

    gameRef.current = initGame(containerRef.current)

    const handleResize = () => {
      if (gameRef.current && containerRef.current) {
        gameRef.current.scale.resize(
          containerRef.current.clientWidth,
          containerRef.current.clientHeight,
        )
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
      }
    }
  }, [active])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      aria-label="Interactive Houston night map"
    />
  )
}
