'use client'

import { motion } from 'framer-motion'
import journeyData from '@/data/journeyData'
import JourneyCard from './JourneyCard'

export default function JourneyTabs() {
  const workItems = journeyData.filter((item) => item.type === 'work')
  const educationItems = journeyData.filter((item) => item.type === 'education')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-16"
    >
      {/* Work Experience */}
      <section>
        <div className="mb-8 flex items-center gap-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Work Experience</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-800" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute top-3 bottom-3 left-[11px] w-px bg-gradient-to-b from-teal-300 via-teal-200 to-teal-100 dark:from-teal-700 dark:via-teal-800 dark:to-teal-900" />

          <div className="space-y-6">
            {workItems.map((item, index) => (
              <JourneyCard
                key={`${item.type}-${item.organization}-${item.date}`}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section>
        <div className="mb-8 flex items-center gap-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Education</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-800" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute top-3 bottom-3 left-[11px] w-px bg-gradient-to-b from-purple-300 via-purple-200 to-purple-100 dark:from-purple-700 dark:via-purple-800 dark:to-purple-900" />

          <div className="space-y-6">
            {educationItems.map((item, index) => (
              <JourneyCard
                key={`${item.type}-${item.organization}-${item.date}`}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
