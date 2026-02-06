'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from './Image'
import Link from './Link'
import portfolioData, { PortfolioItem, PortfolioItemType } from '@/data/portfolioData'

function ImageModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -right-3 -top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg transition-transform hover:scale-110 dark:bg-gray-800 dark:text-gray-200"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img
          src={src}
          alt={alt}
          className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
        />
      </motion.div>
    </motion.div>
  )
}

const typeConfig: Record<PortfolioItemType, { label: string; color: string; border: string }> = {
  publication: {
    label: 'Publication',
    color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
    border: 'border-l-rose-500',
  },
  project: {
    label: 'Project',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
    border: 'border-l-blue-500',
  },
  award: {
    label: 'Award',
    color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    border: 'border-l-amber-500',
  },
}

function FeaturedCard({ item, index }: { item: PortfolioItem; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const config = typeConfig[item.type]
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <AnimatePresence>
        {showModal && item.image && (
          <ImageModal src={item.image} alt={item.title} onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className={`md:col-span-2 rounded-lg border border-gray-200/80 border-l-4 ${config.border} bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700/60 dark:bg-gray-800/80`}
      >
        <div className="flex flex-col md:flex-row md:gap-6">
          {item.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.15 }}
              className="mb-4 md:mb-0 md:w-2/5 flex-shrink-0"
            >
              <button
                onClick={() => setShowModal(true)}
                className="group relative w-full cursor-pointer overflow-hidden rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label={`View ${item.title} certificate`}
              >
                <Image
                  alt={item.title}
                  src={item.image}
                  className="rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
                  width={480}
                  height={320}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                  <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-800 opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                    Click to view
                  </span>
                </div>
              </button>
            </motion.div>
          )}
        <div className="flex-1">
          <span
            className={`mb-3 inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${config.color}`}
          >
            {config.label}
          </span>
          <h3 className="text-lg font-bold leading-snug text-gray-900 dark:text-gray-100">
            {item.title}
          </h3>
          {item.subtitle && (
            <p className="mt-1 text-sm italic text-gray-600 dark:text-gray-300">{item.subtitle}</p>
          )}
          <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
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
          <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {item.description}
          </p>
          {item.technologies && item.technologies.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
    </>
  )
}

function PortfolioCard({ item, index }: { item: PortfolioItem; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const config = typeConfig[item.type]

  const cardContent = (
    <>
      <span
        className={`mb-3 inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${config.color}`}
      >
        {config.label}
      </span>
      <h3 className="text-lg font-bold leading-snug text-gray-900 dark:text-gray-100">
        {item.title}
      </h3>
      <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
        {item.organization}
      </p>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {item.date}
        {item.location && ` · ${item.location}`}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {item.description}
      </p>
      {item.badge && (
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200/60 dark:bg-amber-900/20 dark:text-amber-300 dark:ring-amber-700/40">
          <span>&#127942;</span>
          {item.badge}
        </div>
      )}
      {item.technologies && item.technologies.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </>
  )

  const cardClasses = `block rounded-lg border border-gray-200/80 border-l-4 ${config.border} bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-700/60 dark:bg-gray-800/80 ${item.link ? 'cursor-pointer hover:scale-[1.02]' : ''}`

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {item.link ? (
        <Link href={item.link} className={cardClasses}>
          {cardContent}
        </Link>
      ) : (
        <div className={cardClasses}>
          {cardContent}
        </div>
      )}
    </motion.div>
  )
}

const sectionOrder: { type: PortfolioItemType; label: string }[] = [
  { type: 'publication', label: 'Publications' },
  { type: 'project', label: 'Projects' },
  { type: 'award', label: 'Awards' },
]

export default function PortfolioBento() {
  const grouped = sectionOrder
    .map((section) => ({
      ...section,
      items: portfolioData.filter((item) => item.type === section.type),
    }))
    .filter((section) => section.items.length > 0)

  return (
    <div className="space-y-10">
      {grouped.map((section) => (
        <section key={section.type}>
          <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
            {section.label}
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {section.items.map((item, index) =>
              item.featured ? (
                <FeaturedCard key={item.title} item={item} index={index} />
              ) : (
                <PortfolioCard key={item.title} item={item} index={index} />
              )
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
