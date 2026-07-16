# Design: Merge Journey + Portfolio into About, remove the Tags page

**Date:** 2026-07-16
**Status:** Approved

## Goal

Simplify the site's structure from five top-level pages (Home, Blog, Tags, Portfolio, Journey) to three (Home, Blog, About):

1. Remove the `/tags` index page — it duplicates the tag sidebar already present on `/blog`.
2. Merge `/journey` and `/portfolio` into a single long-scroll `/about` page.

## Context

- The site is a Next.js (App Router) + Contentlayer blog based on the Tailwind Next.js starter template, deployed via Docker (standalone output), so `next.config.js` `redirects()` works.
- `/blog` uses `layouts/ListLayoutWithTags.tsx`, which renders every tag with post counts in a desktop sidebar linking to `/tags/[tag]` filter pages.
- The `/tags` index page (`app/tags/page.tsx`) renders `components/AnimatedTags.tsx` — a tag cloud of the same data. `AnimatedTags` has no other consumers.
- `/journey` renders `components/JourneyTabs.tsx`: Work Experience and Education timeline sections (6 items from `data/journeyData.ts`).
- `/portfolio` renders `components/PortfolioBento.tsx`: Publications, Projects, Awards card sections (5 items from `data/portfolioData.ts`).
- Both components share the same section-header style (bold label + gradient divider).
- The home hero (`app/Main.tsx`) has three CTA buttons: "Read My Blog" (primary), "Portfolio", "My Journey".

## Design

### 1. New `/about` page

Create `app/about/page.tsx` following the existing page pattern:

- `genPageMetadata` with title "About", path `/about`, description: "My path through tech — work experience, education, publications, projects, and awards".
- Renders `AnimatedTitle` (title "About Me"), then the journey sections, then the portfolio sections, wrapped with the same `py-8` spacing used by the current pages.
- Section order on the page: Work Experience → Education → Publications → Projects → Awards.
- Rename `components/JourneyTabs.tsx` → `components/JourneySections.tsx` (component `JourneyTabs` → `JourneySections`); it renders plain sections, not tabs, and the old name would be confusing inside About.

### 2. Deletions and redirects

- Delete `app/journey/`, `app/portfolio/`, `app/tags/page.tsx`, `components/AnimatedTags.tsx`.
- Keep `app/tags/[tag]/` (and its nested `page/[page]/`) — these are the blog's tag filter pages, linked from the blog sidebar and post tag chips.
- Add `redirects()` to `next.config.js`:
  - `/journey` → `/about`, permanent
  - `/portfolio` → `/about`, permanent
  - `/tags` → `/blog`, permanent (exact match only; `/tags/[tag]` unaffected)

### 3. Navigation and internal links

- `data/headerNavLinks.ts`: Home / Blog / About.
- `app/Main.tsx` hero CTAs: replace the "Portfolio" and "My Journey" secondary buttons with a single secondary "About Me" button linking to `/about`. "Read My Blog" stays primary.

### 4. SEO

- `app/sitemap.ts`: remove the `/tags`, `/journey`, `/portfolio` entries; add `/about` (priority 0.8, changeFrequency monthly).
- `data/siteMetadata.js` description mentions "portfolio, and journey" as prose, not links — left unchanged.

## Out of scope

- No visual redesign of the journey/portfolio components — they are reused as-is.
- No mobile tag-browsing replacement for the removed `/tags` page (tag chips on post cards still link to filter pages).

## Verification

- `yarn build` passes (the same script the Docker image runs).
- `/about` renders all five sections in order.
- `/journey`, `/portfolio` redirect to `/about`; `/tags` redirects to `/blog`.
- `/tags/algorithms` still renders the filtered post list.
- Header nav shows Home / Blog / About on desktop and mobile.
- Home hero shows two CTAs: "Read My Blog" and "About Me".
