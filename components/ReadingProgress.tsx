'use client'

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) return null

  return (
    <motion.div
      style={{ scaleX }}
      className="from-primary-500 via-primary-400 to-primary-500 fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r"
      aria-hidden="true"
    />
  )
}
