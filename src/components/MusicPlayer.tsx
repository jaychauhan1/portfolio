import { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'portfolio-music-enabled'

/** Generative ambient pad — Frank Ocean night-drive mood, no copyrighted audio */
function createAmbientEngine() {
  let ctx: AudioContext | null = null
  let nodes: OscillatorNode[] = []
  let gain: GainNode | null = null
  let lfo: OscillatorNode | null = null

  const start = async () => {
    if (ctx) return
    ctx = new AudioContext()
    gain = ctx.createGain()
    gain.gain.value = 0
    gain.connect(ctx.destination)

    const freqs = [110, 164.81, 220, 329.63]
    nodes = freqs.map((freq, i) => {
      const osc = ctx!.createOscillator()
      const filter = ctx!.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 400 + i * 120
      osc.type = i % 2 === 0 ? 'sine' : 'triangle'
      osc.frequency.value = freq
      const oscGain = ctx!.createGain()
      oscGain.gain.value = 0.06 - i * 0.01
      osc.connect(filter)
      filter.connect(oscGain)
      oscGain.connect(gain!)
      osc.start()
      return osc
    })

    lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.value = 0.08
    lfoGain.gain.value = 0.015
    lfo.connect(lfoGain)
    lfoGain.connect(gain.gain)
    lfo.start()

    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 2)
  }

  const stop = () => {
    if (!ctx || !gain) return
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1)
    setTimeout(() => {
      nodes.forEach((n) => {
        try {
          n.stop()
        } catch {
          /* already stopped */
        }
      })
      lfo?.stop()
      ctx?.close()
      ctx = null
      nodes = []
      gain = null
      lfo = null
    }, 1100)
  }

  return { start, stop }
}

export function MusicPlayer() {
  const engineRef = useRef<ReturnType<typeof createAmbientEngine> | null>(null)
  const [playing, setPlaying] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    engineRef.current = createAmbientEngine()
    if (playing) {
      void engineRef.current.start()
    }
    return () => {
      engineRef.current?.stop()
    }
  }, [])

  useEffect(() => {
    if (!engineRef.current) return
    if (playing) {
      void engineRef.current.start()
    } else {
      engineRef.current.stop()
      engineRef.current = createAmbientEngine()
    }
    try {
      localStorage.setItem(STORAGE_KEY, String(playing))
    } catch {
      /* ignore */
    }
  }, [playing])

  return (
    <button
      type="button"
      onClick={() => setPlaying((p) => !p)}
      className="fixed top-4 right-4 z-50 border border-[var(--color-tag-muted)] bg-[var(--color-bg-dark)]/80 px-4 py-2 font-serif text-sm tracking-[0.2em] text-[var(--color-panel-cream)] backdrop-blur-sm transition hover:border-[var(--color-accent-warm)]"
      aria-label={playing ? 'Pause ambient music' : 'Play ambient music'}
    >
      {playing ? 'PAUSE' : 'PLAY'}
    </button>
  )
}
