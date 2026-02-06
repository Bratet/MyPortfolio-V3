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
      className="space-y-10"
    >
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
          Work Experience
        </h2>
        <div className="space-y-4">
          {workItems.map((item, index) => (
            <JourneyCard
              key={`${item.type}-${item.organization}-${item.date}`}
              item={item}
              index={index}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">Education</h2>
        <div className="space-y-4">
          {educationItems.map((item, index) => (
            <JourneyCard
              key={`${item.type}-${item.organization}-${item.date}`}
              item={item}
              index={index}
            />
          ))}
        </div>
      </section>
    </motion.div>
  )
}
