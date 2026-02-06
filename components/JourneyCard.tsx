'use client'

import { motion } from 'framer-motion'
import Link from './Link'
import Image from './Image'
import { JourneyItem, JourneyItemType } from '@/data/journeyData'

const typeConfig: Record<JourneyItemType, { label: string; color: string }> = {
  work: {
    label: 'Work',
    color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300',
  },
  education: {
    label: 'Education',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  },
}

const borderColor: Record<JourneyItemType, string> = {
  work: 'border-l-teal-500',
  education: 'border-l-purple-500',
}

interface JourneyCardProps {
  item: JourneyItem
  index: number
}

export default function JourneyCard({ item, index }: JourneyCardProps) {
  const config = typeConfig[item.type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className={`rounded-lg border border-l-4 border-gray-200/80 ${borderColor[item.type]} bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700/60 dark:bg-gray-800/80`}
    >
      {/* Type badge */}
      <span
        className={`mb-3 inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${config.color}`}
      >
        {config.label}
      </span>

      {/* Header: logo + title + org */}
      <div className="mb-1 flex items-center gap-3">
        {item.logo && (
          <Image
            alt={item.organization}
            src={item.logo}
            className="rounded-full"
            width={28}
            height={28}
          />
        )}
        <h3 className="text-lg leading-snug font-bold text-gray-900 dark:text-gray-100">
          {item.title}
        </h3>
      </div>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
        {item.link ? (
          <Link
            href={item.link}
            className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
          >
            {item.organization}
          </Link>
        ) : (
          item.organization
        )}
      </p>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {item.date}
        {item.location && ` · ${item.location}`}
      </p>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {item.description}
      </p>

      {/* Highlights */}
      {item.highlights && item.highlights.length > 0 && (
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-400">
          {item.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      )}

      {/* Technologies */}
      {item.technologies && item.technologies.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.technologies.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.1 + i * 0.02 }}
              className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      )}

      {/* Collaborators */}
      {item.collaborators && item.collaborators.length > 0 && (
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          With {item.collaborators.join(', ')}
        </p>
      )}
    </motion.div>
  )
}
