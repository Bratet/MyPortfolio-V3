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
      <div className="pt-6 pb-10 lg:grid lg:grid-cols-[auto_1fr_auto]">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col items-center pb-8 lg:pt-4 lg:pb-0"
        >
          {avatar && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-36 w-36 rounded-full sm:h-48 sm:w-48"
              />
            </motion.div>
          )}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="pt-4 pb-2 text-2xl leading-8 font-bold tracking-tight"
          >
            {name}
          </motion.h3>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="text-gray-500 dark:text-gray-400"
          >
            {occupation}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="text-gray-500 dark:text-gray-400"
          >
            {company}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="flex space-x-3 pt-6"
          >
            <SocialIcon kind="mail" href={`mailto:${email}`} />
            <SocialIcon kind="github" href={github} />
            <SocialIcon kind="linkedin" href={linkedin} />
            <SocialIcon kind="x" href={twitter} />
            <SocialIcon kind="bluesky" href={bluesky} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          className="prose dark:prose-invert max-w-none pb-8 lg:px-12 lg:pb-0"
        >
          <MDXLayoutRenderer code={authorBodyCode} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-row flex-wrap justify-center gap-3 lg:min-w-[180px] lg:flex-col lg:justify-start lg:pt-4"
        >
          <Link
            href="/blog"
            className="hover:bg-primary-500 dark:hover:bg-primary-500 flex-1 rounded-lg bg-gray-100 px-6 py-2.5 text-center font-medium text-gray-900 transition-all duration-200 hover:text-white sm:flex-none dark:bg-gray-800 dark:text-gray-100"
          >
            Read My Blog
          </Link>
          <Link
            href="/portfolio"
            className="hover:bg-primary-500 dark:hover:bg-primary-500 flex-1 rounded-lg bg-gray-100 px-6 py-2.5 text-center font-medium text-gray-900 transition-all duration-200 hover:text-white sm:flex-none dark:bg-gray-800 dark:text-gray-100"
          >
            Portfolio
          </Link>
          <Link
            href="/journey"
            className="hover:bg-primary-500 dark:hover:bg-primary-500 flex-1 rounded-lg bg-gray-100 px-6 py-2.5 text-center font-medium text-gray-900 transition-all duration-200 hover:text-white sm:flex-none dark:bg-gray-800 dark:text-gray-100"
          >
            My Journey
          </Link>
        </motion.div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100"
          >
            Latest
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg leading-7 text-gray-500 dark:text-gray-400"
          >
            {siteMetadata.description}
          </motion.p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post, index) => (
            <AnimatedLatestPost key={post.slug} post={post} index={index} />
          ))}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-end text-base leading-6 font-medium"
        >
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </motion.div>
      )}
      {siteMetadata.newsletter?.provider && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center pt-4"
        >
          <NewsletterForm />
        </motion.div>
      )}
    </>
  )
}
