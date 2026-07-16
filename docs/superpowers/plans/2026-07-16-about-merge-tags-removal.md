# About Merge + Tags Removal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Collapse the site's five top-level pages into three by merging `/journey` and `/portfolio` into a new `/about` page and removing the redundant `/tags` index page, with permanent redirects preserving SEO.

**Architecture:** The new `/about` page composes the two existing section components (journey timelines + portfolio bento grids) unchanged. Old routes are deleted and replaced by `permanent: true` redirects in `next.config.js`. Nav, home-hero CTAs, and the sitemap are updated to match.

**Tech Stack:** Next.js 15 App Router, Contentlayer, Tailwind CSS, framer-motion. Package manager is **yarn** (`yarn build`, `yarn lint` — same scripts the Docker image runs).

**Spec:** `docs/superpowers/specs/2026-07-16-about-merge-tags-removal-design.md`

## Global Constraints

- Keep `app/tags/[tag]/` and `app/tags/[tag]/page/[page]/` — these are the blog's tag-filter pages and must keep working.
- Do NOT modify `components/JourneyCard.tsx`, `components/PortfolioBento.tsx` internals, `data/journeyData.ts`, or `data/portfolioData.ts` — components are reused as-is.
- All redirects use `permanent: true`.
- `data/siteMetadata.js` stays unchanged (its "portfolio, and journey" wording is prose, not links).
- There is no test suite in this repo; each task's test cycle is `yarn build` (must exit 0) plus the route checks given in the steps.
- Working directory for all commands: repo root `/Users/ahmedmrabet/Desktop/Personal Workspace/MyPortfolio-V3` (quote the path — it contains a space).

---

### Task 1: Rename JourneyTabs → JourneySections and create the /about page

**Files:**
- Rename: `components/JourneyTabs.tsx` → `components/JourneySections.tsx`
- Modify: `app/journey/page.tsx:3,19` (import + usage; page is deleted in Task 2 but must keep building until then)
- Create: `app/about/page.tsx`

**Interfaces:**
- Consumes: `JourneySections` (default export, no props), `PortfolioBento` (default export, no props), `AnimatedTitle` (default export, props `{ title: string; description?: string }`), `genPageMetadata` from `app/seo`.
- Produces: route `/about` (statically generated). Task 3's nav/CTA links depend on this route existing.

- [ ] **Step 1: Rename the component file with git mv**

```bash
cd "/Users/ahmedmrabet/Desktop/Personal Workspace/MyPortfolio-V3"
git mv components/JourneyTabs.tsx components/JourneySections.tsx
```

- [ ] **Step 2: Rename the component function inside the file**

In `components/JourneySections.tsx`, change line 7:

```tsx
// before
export default function JourneyTabs() {
// after
export default function JourneySections() {
```

Nothing else in the file changes.

- [ ] **Step 3: Update the import in app/journey/page.tsx**

```tsx
// line 3, before
import JourneyTabs from '@/components/JourneyTabs'
// after
import JourneySections from '@/components/JourneySections'
```

```tsx
// line 19, before
        <JourneyTabs />
// after
        <JourneySections />
```

- [ ] **Step 4: Confirm no other file references JourneyTabs**

Run:
```bash
grep -rn "JourneyTabs" app components layouts data
```
Expected: no output. If anything matches, update that reference the same way before continuing.

- [ ] **Step 5: Create app/about/page.tsx**

```tsx
import { genPageMetadata } from 'app/seo'
import AnimatedTitle from '@/components/AnimatedTitle'
import JourneySections from '@/components/JourneySections'
import PortfolioBento from '@/components/PortfolioBento'

export const metadata = genPageMetadata({
  title: 'About',
  description:
    'My path through tech — work experience, education, publications, projects, and awards',
  path: '/about',
})

export default function About() {
  return (
    <div>
      <AnimatedTitle
        title="About Me"
        description="My path through tech — work experience, education, publications, projects, and awards"
      />
      <div className="space-y-16 py-8">
        <JourneySections />
        <PortfolioBento />
      </div>
    </div>
  )
}
```

Section order this produces top-to-bottom: Work Experience → Education (from `JourneySections`) → Publications → Projects → Awards (from `PortfolioBento`). This matches the spec.

- [ ] **Step 6: Build to verify**

Run:
```bash
yarn build
```
Expected: exit code 0, and the route table printed at the end includes `○ /about` as well as the still-existing `○ /journey` and `○ /portfolio`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add /about page composing journey and portfolio sections"
```

---

### Task 2: Delete old pages and add permanent redirects

**Files:**
- Delete: `app/journey/page.tsx`, `app/portfolio/page.tsx`, `app/tags/page.tsx`, `components/AnimatedTags.tsx`
- Modify: `next.config.js` (add `redirects()` next to the existing `rewrites()`)

**Interfaces:**
- Consumes: route `/about` from Task 1 (redirect destination).
- Produces: permanent redirects `/journey → /about`, `/portfolio → /about`, `/tags → /blog`. Routes `/tags/[tag]` remain untouched.

- [ ] **Step 1: Delete the old pages and the orphaned component**

```bash
cd "/Users/ahmedmrabet/Desktop/Personal Workspace/MyPortfolio-V3"
git rm app/journey/page.tsx app/portfolio/page.tsx app/tags/page.tsx components/AnimatedTags.tsx
```

Note: this removes `app/journey/` and `app/portfolio/` entirely (each contains only `page.tsx`), but `app/tags/[tag]/` MUST remain — only the index `app/tags/page.tsx` is deleted.

- [ ] **Step 2: Verify nothing still imports the deleted component**

```bash
grep -rn "AnimatedTags" app components layouts
```
Expected: no output.

- [ ] **Step 3: Add redirects() to next.config.js**

In `next.config.js`, directly above the existing `async rewrites() {` line (line 85), insert:

```js
    async redirects() {
      return [
        {
          source: '/journey',
          destination: '/about',
          permanent: true,
        },
        {
          source: '/portfolio',
          destination: '/about',
          permanent: true,
        },
        {
          source: '/tags',
          destination: '/blog',
          permanent: true,
        },
      ]
    },
```

`source: '/tags'` matches only the exact path, so `/tags/machine-learning` etc. still resolve to the filter pages.

- [ ] **Step 4: Build to verify**

Run:
```bash
yarn build
```
Expected: exit 0. Route table no longer lists `/journey`, `/portfolio`, or a bare `/tags` page, but still lists `● /tags/[tag]`.

- [ ] **Step 5: Verify redirects against a running server**

Run as ONE shell invocation (the server PID must stay in scope):

```bash
yarn serve & SERVER_PID=$!
sleep 3
curl -sI http://localhost:3000/journey | grep -iE "^HTTP|^location"
curl -sI http://localhost:3000/portfolio | grep -iE "^HTTP|^location"
curl -sI http://localhost:3000/tags | grep -iE "^HTTP|^location"
curl -sI http://localhost:3000/tags/algorithms | grep -iE "^HTTP"
kill $SERVER_PID
```
Expected:
- `/journey` → `HTTP/1.1 308` with `location: /about`
- `/portfolio` → `HTTP/1.1 308` with `location: /about`
- `/tags` → `HTTP/1.1 308` with `location: /blog`
- `/tags/algorithms` → `HTTP/1.1 200` (filter page untouched)

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: remove journey, portfolio, and tags index pages with permanent redirects"
```

---

### Task 3: Update navigation, home hero CTAs, and sitemap

**Files:**
- Modify: `data/headerNavLinks.ts` (whole file)
- Modify: `app/Main.tsx:96-147` (CTA button block)
- Modify: `app/sitemap.ts:20-51` (routes array)

**Interfaces:**
- Consumes: route `/about` from Task 1.
- Produces: final user-facing navigation. Nothing downstream depends on this task.

- [ ] **Step 1: Replace data/headerNavLinks.ts contents**

```ts
const headerNavLinks = [
  { href: '/', title: 'Home' },
  { href: '/blog', title: 'Blog' },
  { href: '/about', title: 'About' },
]

export default headerNavLinks
```

- [ ] **Step 2: Collapse the two secondary hero CTAs in app/Main.tsx into one "About Me" button**

Inside the `{/* CTA Buttons */}` `motion.div` (lines 96–147), keep the first `<Link href="/blog">…Read My Blog…</Link>` block unchanged, and replace BOTH the `<Link href="/portfolio">` block (lines 117–131) and the `<Link href="/journey">` block (lines 132–146) with this single block:

```tsx
              <Link
                href="/about"
                className="group hover:border-primary-300 hover:bg-primary-50/50 hover:text-primary-600 dark:hover:border-primary-700 dark:hover:bg-primary-950/30 dark:hover:text-primary-400 inline-flex items-center rounded-full border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 dark:border-gray-700 dark:text-gray-300"
              >
                About Me
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
```

The result: exactly two CTA buttons — "Read My Blog" (primary) and "About Me" (secondary).

- [ ] **Step 3: Update the static routes array in app/sitemap.ts**

Replace the whole `routes` declaration (lines 20–51) with:

```ts
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
```

(`/tags`, `/journey`, `/portfolio` entries are gone; `/about` added at priority 0.8.)

- [ ] **Step 4: Lint and build**

```bash
yarn lint
yarn build
```
Expected: both exit 0.

- [ ] **Step 5: End-to-end route verification**

Run as ONE shell invocation (the server PID must stay in scope):

```bash
yarn serve & SERVER_PID=$!
sleep 3
for heading in "Work Experience" "Education" "Publications" "Projects" "Awards"; do
  curl -s http://localhost:3000/about | grep -c "$heading"
done
curl -s http://localhost:3000/ | grep -o "About Me" | head -1
curl -s http://localhost:3000/ | grep -o "My Journey" | head -1
curl -s http://localhost:3000/sitemap.xml | grep -oE "(/about|/journey|/portfolio|/tags)<"
kill $SERVER_PID
```
Expected:
- The five heading greps each print a count ≥ 1 (all five section headings present in `/about` HTML).
- `About Me` printed (hero CTA present).
- No `My Journey` output (old button gone).
- Sitemap grep prints only `/about<` — no `/journey`, `/portfolio`, or bare `/tags` entries.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: point nav, hero CTAs, and sitemap at the new about page"
```
