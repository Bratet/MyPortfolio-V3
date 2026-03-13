'use client'

import { motion } from 'framer-motion'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'

interface AnimatedLatestPostProps {
  post: {
    slug: string
    date: string
    title: string
    summary: string
    tags: string[]
  }
  index: number
}

const AnimatedLatestPost = ({ post, index }: AnimatedLatestPostProps) => {
  const { slug, date, title, summary, tags } = post

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group list-none py-10"
    >
      <article>
        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-sm font-medium tracking-wide text-gray-400 uppercase dark:text-gray-500">
              <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
            </dd>
          </dl>
          <div className="space-y-3 xl:col-span-3">
            <div>
              <h3 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-200 dark:text-gray-100">
                <Link href={`/blog/${slug}`}>{title}</Link>
              </h3>
              <div className="mt-2 flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
            </div>
            <p className="leading-relaxed text-gray-500 dark:text-gray-400">{summary}</p>
            <div>
              <Link
                href={`/blog/${slug}`}
                className="group/link text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 inline-flex items-center text-sm font-semibold"
                aria-label={`Read more: "${title}"`}
              >
                Read more
                <svg
                  className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </motion.li>
  )
}

export default AnimatedLatestPost
