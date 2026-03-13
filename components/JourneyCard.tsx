'use client'

import { motion } from 'framer-motion'
import Link from './Link'
import Image from './Image'
import { JourneyItem, JourneyItemType } from '@/data/journeyData'

const typeConfig: Record<JourneyItemType, { label: string; color: string; dot: string }> = {
  work: {
    label: 'Work',
    color:
      'bg-teal-50 text-teal-700 ring-1 ring-teal-200/60 dark:bg-teal-950/40 dark:text-teal-300 dark:ring-teal-800/40',
    dot: 'border-teal-400 dark:border-teal-500',
  },
  education: {
    label: 'Education',
    color:
      'bg-purple-50 text-purple-700 ring-1 ring-purple-200/60 dark:bg-purple-950/40 dark:text-purple-300 dark:ring-purple-800/40',
    dot: 'border-purple-400 dark:border-purple-500',
  },
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
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      className="relative pl-8 sm:pl-10"
    >
      {/* Timeline dot */}
      <div
        className={`absolute top-7 left-[6px] h-[11px] w-[11px] rounded-full border-[2.5px] bg-white ${config.dot} dark:bg-gray-950`}
      />

      {/* Card */}
      <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200/60 transition-all duration-300 hover:shadow-md sm:p-6 dark:bg-gray-900/70 dark:ring-gray-800/60">
        {/* Badge + Date row */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${config.color}`}
          >
            {config.label}
          </span>
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
            {item.date}
            {item.location && (
              <>
                <span className="mx-1.5 text-gray-300 dark:text-gray-600">·</span>
                {item.location}
              </>
            )}
          </span>
        </div>

        {/* Header: logo + title + org */}
        <div className="mt-4 flex items-center gap-3">
          {item.logo && (
            <Image
              alt={item.organization}
              src={item.logo}
              className="rounded-full ring-1 ring-gray-200/60 dark:ring-gray-700/60"
              width={32}
              height={32}
            />
          )}
          <div>
            <h3 className="text-lg leading-snug font-bold text-gray-900 dark:text-gray-100">
              {item.title}
            </h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
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
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {item.description}
        </p>

        {/* Highlights */}
        {item.highlights && item.highlights.length > 0 && (
          <ul className="mt-4 space-y-2">
            {item.highlights.map((h, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400"
              >
                <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400 dark:bg-gray-500" />
                <span className="leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Technologies */}
        {item.technologies && item.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.technologies.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.1 + i * 0.02 }}
                className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        )}

        {/* Collaborators */}
        {item.collaborators && item.collaborators.length > 0 && (
          <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
            With {item.collaborators.join(', ')}
          </p>
        )}
      </div>
    </motion.div>
  )
}
