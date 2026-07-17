# Design: Sticky post sidebar (author + tags + prev/next)

**Date:** 2026-07-17
**Status:** Approved

## Goal

While reading a blog post on desktop, keep the left column — author picture, post tags, previous/next article, and back-to-blog — visible for the whole scroll. Today it scrolls away and leaves an empty gutter beside the article.

## Context

- `layouts/PostLayout.tsx` renders the post body. Its grid (line 60) is `xl:grid xl:grid-cols-4 xl:gap-x-6` with `grid-rows-[auto_1fr]`.
- The left column is **two separate grid children**, not one:
  - the author `<dl>` (line 61) auto-places into column 1 / row 1,
  - the `<footer>` (line 109) with tags + prev/next + back-to-blog auto-places into column 1 / row 2.
  - the article `<div>` (line 98) spans `xl:col-span-3 xl:row-span-2`, i.e. columns 2–4, rows 1–2.
- Because they are different cells, they cannot be pinned as a unit. Row 1 is `auto`-sized and short, so a sticky author block there would have no distance to travel.
- The `<footer>`'s inner div (line 110) carries `xl:col-start-1 xl:row-start-2`, but those classes are inert — the grid item is the `<footer>`, not that child.
- `siteMetadata.stickyNav` is `false`, so the header scrolls away; the column may pin near the viewport top.
- `components/ReadingProgress.tsx` is a `fixed inset-x-0 top-0 z-50 h-0.5` bar. A small top offset keeps the column clear of it.
- No ancestor clips the sidebar: the only `overflow` rules in `css/tailwind.css` are scoped to `.katex-display` (line 163) and `.btn-shine` (line 255), both inside the article. `LayoutWrapper`'s `h-screen` does not clip, so sticky resolves against the viewport.
- The "All Posts + tags" navigation lives in `layouts/ListLayoutWithTags.tsx` (line 98) and is used only by `/blog` and `/tags/[tag]`. It is **not** part of this change.

## Design

### 1. `components/AuthorCard.tsx` (new)

Extract the author block currently inlined at `PostLayout.tsx:64-95` into a component taking `authorDetails: CoreContent<Authors>[]` and an optional `className`. Renders the avatar, name, and Twitter link — same markup and styles as today.

### 2. `layouts/PostLayout.tsx`

- The existing author `<dl>` keeps its current position and gains `xl:hidden`. It remains the mobile byline under the title.
- The `<footer>` becomes the single sticky column:
  - on the `<footer>` itself: `xl:col-start-1 xl:row-start-1 xl:row-span-2` — its cell now spans the article's full height and acts as the travel track.
  - an inner wrapper: `xl:sticky xl:top-6` — this is what pins.
  - overflow guard on the wrapper: `xl:max-h-[calc(100vh-3rem)] xl:overflow-y-auto` plus the existing `no-scrollbar` utility (`css/tailwind.css:149`), so long prev/next titles scroll inside the column rather than clip.
- A `hidden xl:block` `AuthorCard` goes at the top of the sticky wrapper, above the tags, with a bottom divider matching the column's existing `xl:divide-y` treatment.
- The inert `xl:col-start-1 xl:row-start-2` on the footer's inner div is removed.

### 3. Why the avatar is rendered twice

One shared `<aside>` would force a mobile regression: either tags and prev/next move above the article, or the byline drops to the bottom. Two renders avoid this. Each is `display: none` at the other's breakpoint, so exactly one is in the accessibility tree at any viewport — no duplicate announcement.

## Out of scope

- `layouts/ListLayoutWithTags.tsx` and the `/blog` sidebar (which is also non-sticky) are untouched.
- The full-width post header (date + title) keeps its current layout; the sticky column starts beneath it.
- No change to any layout below the `xl` breakpoint.

## Verification

- `yarn build` passes.
- On a post at `xl` width: scrolling past the header pins the column; avatar, tags, prev/next, and back-to-blog stay visible to the end of the article. The gutter is never empty.
- The pinned column sits clear of the reading-progress bar.
- On a short viewport, a column taller than the screen scrolls internally instead of clipping the back-to-blog link.
- Below `xl`: byline under the title, tags and prev/next below the article — identical to today.
- A post with no prev (first) or no next (last) still renders correctly.
