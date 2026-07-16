'use client'

import { ThemeProvider } from 'next-themes'
import { MotionConfig } from 'framer-motion'
import siteMetadata from '@/data/siteMetadata'

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableSystem>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  )
}
