# Motion Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the portfolio feel alive with a coherent, terminal-identity-driven motion system: a header path that types itself on navigation, a theme switch that wipes in with a circular reveal, scroll-drawn timelines, a hero with per-word blur reveals, and full `prefers-reduced-motion` support (currently absent).

**Architecture:** All motion builds on the site's existing terminal identity (the `~/path` + blinking cursor header). CSS keyframes handle ambient loops (caret, orb drift, glow); framer-motion (already installed) handles choreography, scroll-linked effects, and shared-layout transitions; the View Transitions API handles the theme reveal as progressive enhancement. Reduced motion is enforced three ways: `MotionConfig reducedMotion="user"` app-wide, a CSS `@media (prefers-reduced-motion: reduce)` block for CSS animations, and explicit `useReducedMotion()` guards on scroll-driven values.

**Tech Stack:** Next.js 15 App Router, framer-motion 12, Tailwind CSS v4, View Transitions API. Package manager is **yarn** (`yarn build`, `yarn lint` — same scripts the Docker image runs). NEVER substitute `npx next build`; it skips the postbuild RSS script.

## Global Constraints

- **Motion-only changes.** No color, spacing, typography, or copy changes. Existing classNames stay intact except where a step explicitly shows an addition/replacement.
- **Reduced motion is non-negotiable.** Every animation added must be covered by one of: `MotionConfig reducedMotion="user"` (Task 1), the CSS reduced-motion block (Task 1), or an explicit `useReducedMotion()` guard (scroll-driven values, typing effect).
- **Animate only transform, opacity, filter, and clip-path.** Never `width`/`height`/`top`/`left`/margins.
- **No bounce or elastic easing.** Use the ease-out tokens from Task 1 or framer springs with damping ≥ 30.
- Working directory for all commands: repo root `/Users/ahmedmrabet/Desktop/Personal Workspace/MyPortfolio-V3` (quote the path — it contains a space).
- There is no test suite; each task's test cycle is `yarn lint` + `yarn build` (both must exit 0) plus any checks given in the steps.
- Commit at the end of each task with `git add` of the named files only (never `git add -A`).

---

### Task 1: Motion foundation — easing tokens, keyframes, reduced-motion config

**Files:**
- Modify: `css/tailwind.css` (add easing tokens to `@theme`; add motion-system block before the highlight-gradient section)
- Modify: `app/theme-providers.tsx` (wrap children in `MotionConfig`)

**Interfaces:**
- Produces: CSS utility classes `animate-caret`, `animate-orb`, `animate-glow`, `btn-shine` and CSS vars `--ease-out-quart/quint/expo` consumed by Tasks 2, 4. View-transition CSS consumed by Task 3. App-wide `MotionConfig reducedMotion="user"` covering all framer-motion animations.

- [ ] **Step 1: Add easing tokens to the `@theme` block in `css/tailwind.css`**

Directly above the `/* Line heights */` comment (line 39), insert:

```css
  /* Easing curves — natural deceleration, no bounce */
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

```

- [ ] **Step 2: Add the motion-system block to `css/tailwind.css`**

Directly above the `/* Custom highlight gradient classes */` comment (line 177), insert:

```css
/* ---------- Motion system ---------- */

/* Terminal caret — steps() so it snaps like a real terminal */
@keyframes caret-blink {
  0%,
  49% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}

.animate-caret {
  animation: caret-blink 1.1s steps(1) infinite;
}

.animate-caret[data-typing='true'] {
  animation: none;
  opacity: 1;
}

/* Hero gradient orb — slow atmospheric drift */
@keyframes orb-drift {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
  33% {
    transform: translate(-44%, -55%) scale(1.08);
  }
  66% {
    transform: translate(-56%, -46%) scale(0.95);
  }
}

.animate-orb {
  animation: orb-drift 18s ease-in-out infinite;
}

/* Avatar halo — barely-there breathing */
@keyframes glow-breathe {
  0%,
  100% {
    opacity: 0.65;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.06);
  }
}

.animate-glow {
  animation: glow-breathe 7s ease-in-out infinite;
}

/* Primary CTA — light sweep on hover */
@keyframes shine-sweep {
  from {
    transform: translateX(-150%) skewX(-18deg);
  }
  to {
    transform: translateX(220%) skewX(-18deg);
  }
}

.btn-shine {
  position: relative;
  overflow: hidden;
}

.btn-shine::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 40%;
  background: linear-gradient(
    105deg,
    transparent,
    color-mix(in srgb, white 35%, transparent),
    transparent
  );
  transform: translateX(-150%) skewX(-18deg);
  pointer-events: none;
}

.btn-shine:hover::after {
  animation: shine-sweep 0.8s var(--ease-out-quart) forwards;
}

/* Theme switch — circular reveal drives the transition, disable defaults */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

@media (prefers-reduced-motion: reduce) {
  .animate-caret,
  .animate-orb,
  .animate-glow {
    animation: none;
  }
  .btn-shine:hover::after {
    animation: none;
  }
  html {
    scroll-behavior: auto;
  }
}

```

- [ ] **Step 3: Wrap the app in `MotionConfig` — replace the whole of `app/theme-providers.tsx` with:**

```tsx
'use client'

import { ThemeProvider } from 'next-themes'
import { MotionConfig } from 'framer-motion'
import siteMetadata from '@/data/siteMetadata'

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableSystem>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  )
}
```

- [ ] **Step 4: Lint and build**

```bash
yarn lint
yarn build
```
Expected: both exit 0 (build prints "RSS feed generated").

- [ ] **Step 5: Commit**

```bash
git add css/tailwind.css app/theme-providers.tsx
git commit -m "feat: add motion foundation with easing tokens and reduced-motion support"
```

---

### Task 2: Living terminal header — typed path, CSS caret, sliding nav underline

**Files:**
- Modify: `components/Header.tsx` (whole file)

**Interfaces:**
- Consumes: `.animate-caret` + `[data-typing]` CSS from Task 1.
- Produces: final header behavior. Nothing downstream depends on this task.

- [ ] **Step 1: Replace the whole of `components/Header.tsx` with:**

```tsx
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
            const isActive =
              link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
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
```

Behavior notes (all intentional, do not "fix"):
- On first page load the path renders fully — typing only plays on client-side navigation (matches server HTML, no hydration flash).
- The caret is solid while typing (`data-typing='true'` pauses the blink) and blinks when idle, like a real terminal.
- The `layoutId="nav-underline"` span makes the underline slide between nav items on navigation; the header stays mounted in the root layout so the shared-layout animation works.
- On `/tags/*` routes no nav link is active — no underline renders. That is correct.

- [ ] **Step 2: Lint and build**

```bash
yarn lint
yarn build
```
Expected: both exit 0.

- [ ] **Step 3: Commit**

```bash
git add components/Header.tsx
git commit -m "feat: animate terminal header with typed path and sliding nav underline"
```

---

### Task 3: Theme switch circular reveal via View Transitions

**Files:**
- Modify: `components/ThemeSwitch.tsx` (imports, one ref, one handler, two attribute changes)

**Interfaces:**
- Consumes: `::view-transition-old/new(root)` CSS from Task 1.
- Produces: final theme-switch behavior. Nothing downstream depends on this task.

- [ ] **Step 1: Update imports in `components/ThemeSwitch.tsx`**

```tsx
// line 3, before
import { Fragment, useEffect, useState } from 'react'
// after
import { Fragment, useEffect, useRef, useState } from 'react'
```

Directly below the react import, add:

```tsx
import { flushSync } from 'react-dom'
```

- [ ] **Step 2: Add the ref and reveal handler inside the `ThemeSwitch` component**

After the line `const { theme, setTheme, resolvedTheme } = useTheme()`, add:

```tsx
  const buttonWrapperRef = useRef<HTMLDivElement>(null)

  const handleThemeChange = (newTheme: string) => {
    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => { ready: Promise<void> }
    }
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!doc.startViewTransition || prefersReducedMotion) {
      setTheme(newTheme)
      return
    }

    const transition = doc.startViewTransition(() => {
      flushSync(() => setTheme(newTheme))
    })

    transition.ready.then(() => {
      const rect = buttonWrapperRef.current?.getBoundingClientRect()
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth
      const y = rect ? rect.top + rect.height / 2 : 0
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: 550,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    })
  }
```

- [ ] **Step 3: Wire up the ref and handler**

```tsx
// before
        <div className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center justify-center">
// after
        <div
          ref={buttonWrapperRef}
          className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center justify-center"
        >
```

```tsx
// before
            <RadioGroup value={theme} onChange={setTheme}>
// after
            <RadioGroup value={theme} onChange={handleThemeChange}>
```

Nothing else in the file changes. Browsers without `startViewTransition` (Firefox ≤ 130, older Safari) and reduced-motion users fall back to the instant switch — that is the point of the guard.

- [ ] **Step 4: Lint and build**

```bash
yarn lint
yarn build
```
Expected: both exit 0.

- [ ] **Step 5: Commit**

```bash
git add components/ThemeSwitch.tsx
git commit -m "feat: add circular reveal to theme switch via view transitions"
```

---

### Task 4: Hero choreography + AnimatedTitle word reveal

**Files:**
- Modify: `app/Main.tsx` (orb class, glow class, name h1 block, two CTA classNames)
- Modify: `components/AnimatedTitle.tsx` (whole file)

**Interfaces:**
- Consumes: `.animate-orb`, `.animate-glow`, `.btn-shine` from Task 1.
- Produces: final home-hero and page-title behavior. Nothing downstream depends on this task.

- [ ] **Step 1: Animate the orb in `app/Main.tsx`**

```tsx
// line 24, before
          <div className="bg-primary-400/[0.07] dark:bg-primary-500/[0.04] absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />
// after
          <div className="bg-primary-400/[0.07] dark:bg-primary-500/[0.04] animate-orb absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />
```

(The translate classes stay — they position the orb when the animation is disabled by reduced motion.)

- [ ] **Step 2: Make the avatar glow breathe**

```tsx
// line 36, before
              <div className="from-primary-300/25 to-primary-500/25 absolute -inset-3 rounded-full bg-gradient-to-tr blur-2xl" />
// after
              <div className="from-primary-300/25 to-primary-500/25 animate-glow absolute -inset-3 rounded-full bg-gradient-to-tr blur-2xl" />
```

- [ ] **Step 3: Replace the name heading (lines 50–57) with a per-word blur reveal**

```tsx
// before
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100"
            >
              {name}
            </motion.h1>
// after
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
              {name.split(' ').map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.55, delay: 0.15 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  className="mr-[0.3em] inline-block last:mr-0"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
```

- [ ] **Step 4: CTA press feedback and shine**

Primary button (the `<Link href="/blog">` at line 102): in its className, replace the leading `group ` with `group btn-shine active:scale-[0.98] `.

Secondary button (the `<Link href="/about">` at line 117): in its className, replace the leading `group ` with `group active:scale-[0.98] `.

No other part of either className changes.

- [ ] **Step 5: Replace the whole of `components/AnimatedTitle.tsx` with:**

```tsx
'use client'

import { motion } from 'framer-motion'

interface AnimatedTitleProps {
  title: string
  description?: string
}

const AnimatedTitle = ({ title, description }: AnimatedTitleProps) => {
  return (
    <div className="space-y-3 pt-8 pb-10 md:space-y-4">
      <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
        {title.split(' ').map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mr-[0.3em] inline-block last:mr-0"
          >
            {word}
          </motion.span>
        ))}
      </h1>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl text-lg leading-relaxed text-gray-500 dark:text-gray-400"
        >
          {description}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="from-primary-400 h-px w-16 origin-left bg-gradient-to-r to-transparent"
      />
    </div>
  )
}

export default AnimatedTitle
```

- [ ] **Step 6: Lint and build**

```bash
yarn lint
yarn build
```
Expected: both exit 0.

- [ ] **Step 7: Commit**

```bash
git add app/Main.tsx components/AnimatedTitle.tsx
git commit -m "feat: choreograph hero with word reveals, drifting orb, and CTA feedback"
```

---

### Task 5: About page — scroll-drawn timelines + in-view cards

**Files:**
- Modify: `components/JourneySections.tsx` (whole file)
- Modify: `components/JourneyCard.tsx` (whole file)
- Modify: `components/PortfolioBento.tsx` (two `whileHover` additions)

**Interfaces:**
- Consumes: nothing from other tasks (framer-motion only).
- Produces: final About-page behavior. Nothing downstream depends on this task.

- [ ] **Step 1: Replace the whole of `components/JourneySections.tsx` with:**

```tsx
'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import journeyData from '@/data/journeyData'
import JourneyCard from './JourneyCard'

interface TimelineSectionProps {
  heading: string
  lineClass: string
  items: typeof journeyData
}

function TimelineSection({ heading, lineClass, items }: TimelineSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.6'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 180, damping: 34 })

  return (
    <section>
      <div className="mb-8 flex items-center gap-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{heading}</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-800" />
      </div>

      <div ref={ref} className="relative">
        {/* Faint static track; the colored line draws over it with scroll */}
        <div className="absolute top-3 bottom-3 left-[11px] w-px bg-gray-200/70 dark:bg-gray-800/70" />
        <motion.div
          style={prefersReducedMotion ? undefined : { scaleY }}
          className={`absolute top-3 bottom-3 left-[11px] w-px origin-top ${lineClass}`}
        />

        <div className="space-y-6">
          {items.map((item, index) => (
            <JourneyCard
              key={`${item.type}-${item.organization}-${item.date}`}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function JourneySections() {
  const workItems = journeyData.filter((item) => item.type === 'work')
  const educationItems = journeyData.filter((item) => item.type === 'education')

  return (
    <div className="space-y-16">
      <TimelineSection
        heading="Work Experience"
        lineClass="bg-gradient-to-b from-teal-300 via-teal-200 to-teal-100 dark:from-teal-700 dark:via-teal-800 dark:to-teal-900"
        items={workItems}
      />
      <TimelineSection
        heading="Education"
        lineClass="bg-gradient-to-b from-purple-300 via-purple-200 to-purple-100 dark:from-purple-700 dark:via-purple-800 dark:to-purple-900"
        items={educationItems}
      />
    </div>
  )
}
```

(The old top-level `motion.div` fade wrapper is intentionally dropped — the page title already animates, and the timelines now carry the motion.)

- [ ] **Step 2: Replace the whole of `components/JourneyCard.tsx` with:**

```tsx
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
  const staggerDelay = Math.min(index, 3) * 0.07

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: staggerDelay, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-8 sm:pl-10"
    >
      {/* Timeline dot pops in as the card reveals */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.35, delay: staggerDelay + 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute top-7 left-[6px] h-[11px] w-[11px] rounded-full border-[2.5px] bg-white ${config.dot} dark:bg-gray-950`}
      />

      {/* Card */}
      <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6 dark:bg-gray-900/70 dark:ring-gray-800/60">
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
```

Intentional changes from the old file (do not "restore" them):
- Cards reveal with `whileInView` when actually scrolled into view, instead of animating on mount while still off-screen.
- The per-chip technology stagger is removed — the chips are plain spans now (the card-level reveal covers them; per-chip motion was animation fatigue).
- The stagger delay is capped at 3 × 0.07s so deep timelines don't accumulate delay.

- [ ] **Step 3: Add hover lift to both portfolio cards in `components/PortfolioBento.tsx`**

In `FeaturedCard`, add a `whileHover` prop to the outer `motion.div`:

```tsx
// before
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' }}
// after
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' }}
```

In `PortfolioCard`, same addition on its outer `motion.div`:

```tsx
// before
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' }}
    >
// after
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' }}
    >
```

(`whileHover` is used instead of a Tailwind hover class because framer-motion owns these elements' inline transform.)

- [ ] **Step 4: Lint and build**

```bash
yarn lint
yarn build
```
Expected: both exit 0.

- [ ] **Step 5: Commit**

```bash
git add components/JourneySections.tsx components/JourneyCard.tsx components/PortfolioBento.tsx
git commit -m "feat: draw about-page timelines with scroll and reveal cards in view"
```

---

### Task 6: Blog — reading progress bar + scroll-top entrance

**Files:**
- Create: `components/ReadingProgress.tsx`
- Modify: `layouts/PostLayout.tsx`, `layouts/PostSimple.tsx`, `layouts/PostBanner.tsx` (one import + one element each)
- Modify: `components/ScrollTopAndComment.tsx` (whole file)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: final blog-post behavior. Nothing downstream depends on this task.

- [ ] **Step 1: Create `components/ReadingProgress.tsx`:**

```tsx
'use client'

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) return null

  return (
    <motion.div
      style={{ scaleX }}
      className="from-primary-500 via-primary-400 to-primary-500 fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-gradient-to-r"
      aria-hidden="true"
    />
  )
}
```

- [ ] **Step 2: Add the bar to all three post layouts**

In each of `layouts/PostLayout.tsx`, `layouts/PostSimple.tsx`, `layouts/PostBanner.tsx`:

Add the import next to the existing ScrollTopAndComment import:

```tsx
import ReadingProgress from '@/components/ReadingProgress'
```

Add the element directly before `<ScrollTopAndComment />`:

```tsx
      <ReadingProgress />
```

- [ ] **Step 3: Replace the whole of `components/ScrollTopAndComment.tsx` with:**

```tsx
'use client'

import siteMetadata from '@/data/siteMetadata'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const ScrollTopAndComment = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', handleWindowScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0 })
  }
  const handleScrollToComment = () => {
    document.getElementById('comment')?.scrollIntoView()
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 10 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-8 bottom-8 z-50 hidden flex-col gap-3 md:flex"
        >
          {siteMetadata.comments?.provider && (
            <button
              aria-label="Scroll To Comment"
              onClick={handleScrollToComment}
              className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 active:scale-95 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
          <button
            aria-label="Scroll To Top"
            onClick={handleScrollTop}
            className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 active:scale-95 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ScrollTopAndComment
```

Intentional changes: `AnimatePresence` replaces the old `md:flex`/`md:hidden` toggle so the buttons fade+scale in and out; `z-50` added so the buttons layer consistently; scroll listener is passive; buttons get `active:scale-95` press feedback.

- [ ] **Step 4: Lint and build**

```bash
yarn lint
yarn build
```
Expected: both exit 0.

- [ ] **Step 5: Verify the progress bar is wired into all three layouts**

```bash
grep -l "ReadingProgress" layouts/PostLayout.tsx layouts/PostSimple.tsx layouts/PostBanner.tsx | wc -l
```
Expected output: `3`

- [ ] **Step 6: Commit**

```bash
git add components/ReadingProgress.tsx components/ScrollTopAndComment.tsx layouts/PostLayout.tsx layouts/PostSimple.tsx layouts/PostBanner.tsx
git commit -m "feat: add reading progress bar and animated scroll-to-top on posts"
```
