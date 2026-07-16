'use client'

import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const Header = () => {
  const pathname = usePathname()
  const currentPath = pathname === '/' ? '~' : `~${pathname}`
  const prefersReducedMotion = useReducedMotion()
  const [displayPath, setDisplayPath] = useState(currentPath)
  const [isTyping, setIsTyping] = useState(false)
  const previousPath = useRef(currentPath)

  useEffect(() => {
    if (previousPath.current === currentPath) return
    previousPath.current = currentPath

    if (prefersReducedMotion) {
      setDisplayPath(currentPath)
      return
    }

    // Retype the new path from `~`, like a fresh cd. Cap total duration
    // so long blog slugs don't take seconds to finish.
    setIsTyping(true)
    setDisplayPath('~')
    const perChar = Math.min(45, 450 / currentPath.length)
    let index = 1
    const interval = setInterval(() => {
      index += 1
      setDisplayPath(currentPath.slice(0, index))
      if (index >= currentPath.length) {
        clearInterval(interval)
        setIsTyping(false)
      }
    }, perChar)

    return () => clearInterval(interval)
  }, [currentPath, prefersReducedMotion])

  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center">
          <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
            <span>{displayPath}</span>
            <span aria-hidden="true" data-typing={isTyping} className="animate-caret ml-0.5">
              |
            </span>
          </div>
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
        <div className="no-scrollbar hidden max-w-96 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-[32rem] lg:max-w-[40rem]">
          {headerNavLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.title}
                href={link.href}
                className={`relative m-1 font-medium transition-colors ${
                  isActive
                    ? 'text-primary-500 dark:text-primary-400'
                    : 'hover:text-primary-500 dark:hover:text-primary-400 text-gray-900 dark:text-gray-100'
                }`}
              >
                {link.title}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="bg-primary-500 dark:bg-primary-400 absolute right-0 -bottom-1 left-0 h-px"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
              </Link>
            )
          })}
        </div>
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
