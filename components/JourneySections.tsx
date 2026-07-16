'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import journeyData from '@/data/journeyData'
import JourneyCard from './JourneyCard'

interface TimelineSectionProps {
  heading: string
  lineClass: string
  items: typeof journeyData
}

function TimelineSection({ heading, lineClass, items }: TimelineSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.6'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 180, damping: 34 })

  return (
    <section>
      <div className="mb-8 flex items-center gap-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{heading}</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-800" />
      </div>

      <div ref={ref} className="relative">
        {/* Faint static track; the colored line draws over it with scroll */}
        <div className="absolute top-3 bottom-3 left-[11px] w-px bg-gray-200/70 dark:bg-gray-800/70" />
        <motion.div
          style={prefersReducedMotion ? undefined : { scaleY }}
          className={`absolute top-3 bottom-3 left-[11px] w-px origin-top ${lineClass}`}
        />

        <div className="space-y-6">
          {items.map((item, index) => (
            <JourneyCard
              key={`${item.type}-${item.organization}-${item.date}`}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function JourneySections() {
  const workItems = journeyData.filter((item) => item.type === 'work')
  const educationItems = journeyData.filter((item) => item.type === 'education')

  return (
    <div className="space-y-16">
      <TimelineSection
        heading="Work Experience"
        lineClass="bg-gradient-to-b from-teal-300 via-teal-200 to-teal-100 dark:from-teal-700 dark:via-teal-800 dark:to-teal-900"
        items={workItems}
      />
      <TimelineSection
        heading="Education"
        lineClass="bg-gradient-to-b from-purple-300 via-purple-200 to-purple-100 dark:from-purple-700 dark:via-purple-800 dark:to-purple-900"
        items={educationItems}
      />
    </div>
  )
}
