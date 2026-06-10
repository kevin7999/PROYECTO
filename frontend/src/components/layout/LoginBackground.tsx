import { useEffect, useState, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

type LoginBackgroundProps = {
  children: ReactNode
}

export function LoginBackground({ children }: LoginBackgroundProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })
  const orb1X = useTransform(springX, (v) => v * 0.03)
  const orb1Y = useTransform(springY, (v) => v * 0.03)
  const orb2X = useTransform(springX, (v) => v * -0.02)
  const orb2Y = useTransform(springY, (v) => v * -0.02)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop) return
    const { innerWidth, innerHeight } = window
    mouseX.set(e.clientX - innerWidth / 2)
    mouseY.set(e.clientY - innerHeight / 2)
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden mesh-bg"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        style={{ x: orb1X, y: orb1Y }}
        className="orb-float pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-ruta-blue-400/20 blur-3xl"
      />
      <motion.div
        style={{ x: orb2X, y: orb2Y }}
        className="orb-float-delayed pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-ruta-orange-500/15 blur-3xl"
      />
      <motion.div className="orb-float pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-ruta-blue-600/10 blur-3xl" />

      <svg
        className="swoosh-watermark pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M280 40 C360 40 380 200 320 320 C260 380 120 360 80 240 C40 120 160 40 280 40"
          stroke="#2563eb"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M300 60 C350 60 360 180 310 280 C260 340 160 330 130 230"
          stroke="#f97316"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  )
}
