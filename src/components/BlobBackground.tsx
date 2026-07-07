import { useEffect, useRef } from 'react'

export function BlobBackground() {
  const blobRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const blob = blobRef.current
    if (!blob) return

    const onMouseDown = (e: MouseEvent) => {
      dragging.current = true
      offset.current = { x: e.clientX - pos.current.x, y: e.clientY - pos.current.y }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return
      pos.current = {
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      }
      blob.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
    }

    const onMouseUp = () => {
      dragging.current = false
    }

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      dragging.current = true
      offset.current = { x: touch.clientX - pos.current.x, y: touch.clientY - pos.current.y }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return
      const touch = e.touches[0]
      pos.current = {
        x: touch.clientX - offset.current.x,
        y: touch.clientY - offset.current.y,
      }
      blob.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
    }

    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('touchstart', onTouchStart)
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('touchend', onMouseUp)

    return () => {
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onMouseUp)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        ref={blobRef}
        className="pointer-events-auto absolute -right-32 top-1/4 h-[500px] w-[500px] cursor-grab active:cursor-grabbing md:-right-16 md:h-[700px] md:w-[700px]"
        aria-hidden="true"
      >
        <div
          className="h-full w-full rounded-full opacity-60 blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 40% 40%, #89ff69 0%, #3d5a20 30%, #d4ff00 50%, #1a2a10 70%, transparent 80%)',
          }}
        />
      </div>
    </div>
  )
}
