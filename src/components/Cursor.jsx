import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef(null)
  const glowRef = useRef(null)
  const mouse   = useRef({ x: -200, y: -200 })
  const glow    = useRef({ x: -200, y: -200 })
  const rafRef  = useRef(null)

  useEffect(() => {
    const onMove = e => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      glow.current.x = lerp(glow.current.x, mouse.current.x, 0.08)
      glow.current.y = lerp(glow.current.y, mouse.current.y, 0.08)
      if (glowRef.current) {
        glowRef.current.style.transform =
          `translate(${glow.current.x}px, ${glow.current.y}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Sharp dot — snaps to cursor instantly */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          background: '#1a1d23',
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      />
      {/* Glow orb — follows with smooth lag */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full"
        style={{
          width: 48,
          height: 48,
          marginLeft: -24,
          marginTop: -24,
          background:
            'radial-gradient(circle, rgba(99,102,241,0.5) 0%, rgba(59,130,246,0.25) 45%, transparent 70%)',
          filter: 'blur(6px)',
          willChange: 'transform',
        }}
      />
    </>
  )
}
