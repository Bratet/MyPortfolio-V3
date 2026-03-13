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
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg transition-transform hover:scale-110 dark:bg-gray-800 dark:text-gray-200"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
        />
      </motion.div>
    </motion.div>
  )
}

const typeConfig: Record<
  PortfolioItemType,
  { label: string; color: string; accent: string; glow: string }
> = {
  publication: {
    label: 'Publication',
    color:
      'bg-rose-50 text-rose-700 ring-1 ring-rose-200/60 dark:bg-rose-950/40 dark:text-rose-300 dark:ring-rose-800/40',
    accent: 'from-rose-400 to-rose-500',
    glow: 'group-hover:shadow-rose-200/40 dark:group-hover:shadow-rose-900/20',
  },
  project: {
    label: 'Project',
    color:
      'bg-blue-50 text-blue-700 ring-1 ring-blue-200/60 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-800/40',
    accent: 'from-blue-400 to-blue-500',
    glow: 'group-hover:shadow-blue-200/40 dark:group-hover:shadow-blue-900/20',
  },
  award: {
    label: 'Award',
    color:
      'bg-amber-50 text-amber-700 ring-1 ring-amber-200/60 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-800/40',
    accent: 'from-amber-400 to-amber-500',
    glow: 'group-hover:shadow-amber-200/40 dark:group-hover:shadow-amber-900/20',
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
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' }}
        className={`group relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200/60 transition-all duration-300 hover:shadow-xl md:col-span-2 ${config.glow} dark:bg-gray-900/70 dark:ring-gray-800/60`}
      >
        {/* Top accent gradient */}
        <div className={`h-1 w-full bg-gradient-to-r ${config.accent}`} />

        <div className="flex flex-col p-4 sm:p-6 md:flex-row md:gap-8">
          {item.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.15 }}
              className="mb-5 flex-shrink-0 md:mb-0 md:w-2/5"
            >
              <button
                onClick={() => setShowModal(true)}
                className="focus:ring-primary-500 group/img relative w-full cursor-pointer overflow-hidden rounded-lg focus:ring-2 focus:ring-offset-2 focus:outline-none"
                aria-label={`View ${item.title} certificate`}
              >
                <Image
                  alt={item.title}
                  src={item.image}
                  className="rounded-lg object-cover transition-transform duration-500 group-hover/img:scale-105"
                  width={480}
                  height={320}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover/img:bg-black/15">
                  <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-800 opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-300 group-hover/img:opacity-100">
                    Click to view
                  </span>
                </div>
              </button>
            </motion.div>
          )}
          <div className="flex-1">
            <span
              className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${config.color}`}
            >
              {config.label}
            </span>
            <h3 className="mt-3 text-lg leading-snug font-bold text-gray-900 dark:text-gray-100">
              {item.title}
            </h3>
            {item.subtitle && (
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600 italic dark:text-gray-400">
                {item.subtitle}
              </p>
            )}
            <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
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
              <span className="mx-1.5 text-gray-300 dark:text-gray-600">·</span>
              {item.date}
              {item.location && (
                <>
                  <span className="mx-1.5 text-gray-300 dark:text-gray-600">·</span>
                  {item.location}
                </>
              )}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {item.description}
            </p>
            {item.technologies && item.technologies.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400"
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
      {/* Top accent gradient */}
      <div className={`h-1 w-full bg-gradient-to-r ${config.accent}`} />
      <div className="p-4 sm:p-6">
        <span
          className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${config.color}`}
        >
          {config.label}
        </span>
        <h3 className="mt-3 text-lg leading-snug font-bold text-gray-900 dark:text-gray-100">
          {item.title}
        </h3>
        <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          {item.organization}
          <span className="mx-1.5 text-gray-300 dark:text-gray-600">·</span>
          {item.date}
          {item.location && (
            <>
              <span className="mx-1.5 text-gray-300 dark:text-gray-600">·</span>
              {item.location}
            </>
          )}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {item.description}
        </p>
        {item.badge && (
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-200/60 dark:bg-amber-950/30 dark:text-amber-300 dark:ring-amber-800/40">
            <span>&#127942;</span>
            {item.badge}
          </div>
        )}
        {item.technologies && item.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  )

  const cardClasses = `group relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200/60 transition-all duration-300 hover:shadow-lg ${config.glow} dark:bg-gray-900/70 dark:ring-gray-800/60 ${item.link ? 'cursor-pointer hover:ring-primary-200/60 dark:hover:ring-primary-800/40' : ''}`

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' }}
    >
      {item.link ? (
        <Link href={item.link} className={cardClasses}>
          {cardContent}
        </Link>
      ) : (
        <div className={cardClasses}>{cardContent}</div>
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
    <div className="space-y-14">
      {grouped.map((section) => (
        <section key={section.type}>
          <div className="mb-6 flex items-center gap-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{section.label}</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-800" />
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
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
