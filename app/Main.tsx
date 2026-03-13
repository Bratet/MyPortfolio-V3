'use client'

import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { motion } from 'framer-motion'
import AnimatedLatestPost from '@/components/AnimatedLatestPost'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { MDXLayoutRenderer } from 'pliny/mdx-components'

const MAX_DISPLAY = 5

export default function Home({ posts, authorContent, authorBodyCode }) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } =
    authorContent

  return (
    <>
      {/* Hero Section */}
      <div className="relative py-10 sm:py-14 md:py-20">
        {/* Atmospheric gradient orb */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="bg-primary-400/[0.07] dark:bg-primary-500/[0.04] absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />
        </div>

        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-14">
          {/* Avatar with glow ring */}
          {avatar && (
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative flex-shrink-0"
            >
              <div className="from-primary-300/25 to-primary-500/25 absolute -inset-3 rounded-full bg-gradient-to-tr blur-2xl" />
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="relative h-36 w-36 rounded-full ring-2 ring-white/80 sm:h-44 sm:w-44 dark:ring-gray-800/80"
              />
            </motion.div>
          )}

          {/* Text content */}
          <div className="text-center md:text-left">
            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100"
            >
              {name}
            </motion.h1>

            {/* Role */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="mt-3 text-lg text-gray-500 dark:text-gray-400"
            >
              {occupation}
              <span className="mx-2 text-gray-300 dark:text-gray-600">·</span>
              {company}
            </motion.p>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="prose dark:prose-invert mt-5 max-w-2xl"
            >
              <MDXLayoutRenderer code={authorBodyCode} />
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="mt-6 flex justify-center space-x-4 md:justify-start"
            >
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="x" href={twitter} />
              <SocialIcon kind="bluesky" href={bluesky} />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start"
            >
              <Link
                href="/blog"
                className="group hover:bg-primary-600 hover:shadow-primary-500/20 dark:hover:bg-primary-400 dark:hover:shadow-primary-400/20 inline-flex items-center rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg dark:bg-gray-100 dark:text-gray-900 dark:hover:text-white"
              >
                Read My Blog
                <svg
                  className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/portfolio"
                className="group hover:border-primary-300 hover:bg-primary-50/50 hover:text-primary-600 dark:hover:border-primary-700 dark:hover:bg-primary-950/30 dark:hover:text-primary-400 inline-flex items-center rounded-full border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 dark:border-gray-700 dark:text-gray-300"
              >
                Portfolio
                <svg
                  className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/journey"
                className="group hover:border-primary-300 hover:bg-primary-50/50 hover:text-primary-600 dark:hover:border-primary-700 dark:hover:bg-primary-950/30 dark:hover:text-primary-400 inline-flex items-center rounded-full border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 dark:border-gray-700 dark:text-gray-300"
              >
                My Journey
                <svg
                  className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Latest Posts Section */}
      <div className="border-t border-gray-200/60 dark:border-gray-800/60">
        <div className="pt-12 pb-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl dark:text-gray-100"
          >
            Latest
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-gray-500 dark:text-gray-400"
          >
            {siteMetadata.description}
          </motion.p>
        </div>
        <div className="divide-y divide-gray-200/60 dark:divide-gray-800/60">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post, index) => (
            <AnimatedLatestPost key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>

      {posts.length > MAX_DISPLAY && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 flex justify-end"
        >
          <Link
            href="/blog"
            className="group text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 inline-flex items-center text-sm font-semibold"
          >
            All Posts
            <svg
              className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      )}

      {siteMetadata.newsletter?.provider && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center pt-8"
        >
          <NewsletterForm />
        </motion.div>
      )}
    </>
  )
}
