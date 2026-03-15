# Ahmed Mrabet - Personal Portfolio & Blog

My personal portfolio website and blog built with Next.js, Tailwind CSS, and Contentlayer.

**Live:** [ahmedmrabet.me](https://ahmedmrabet.me)

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Content:** [Contentlayer 2](https://contentlayer.dev/) + MDX
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Analytics:** [PostHog](https://posthog.com/)
- **Comments:** [Giscus](https://giscus.app/) (GitHub Discussions)
- **Newsletter:** [EmailOctopus](https://emailoctopus.com/)
- **Search:** [Kbar](https://kbar.vercel.app/)

## Features

- MDX blog with syntax highlighting, math (KaTeX), citations, and reading time
- Portfolio page with bento grid layout (publications, projects, awards)
- Journey timeline (work experience & education)
- Dark/light theme
- Full-text search via command palette
- RSS feed generation
- SEO optimized (Open Graph, Twitter cards, structured data, sitemap)
- Responsive design
- Docker support

## Getting Started

### Prerequisites

- Node.js 20+
- Yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/Bratet/MyPortfolio-V3.git
cd MyPortfolio-V3

# Install dependencies
yarn install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com

# Giscus Comments (https://giscus.app)
NEXT_PUBLIC_GISCUS_REPO=your_github_username/your_repo
NEXT_PUBLIC_GISCUS_REPOSITORY_ID=your_repo_id
NEXT_PUBLIC_GISCUS_CATEGORY=General
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your_category_id

# EmailOctopus Newsletter
EMAILOCTOPUS_API_KEY=your_api_key
EMAILOCTOPUS_LIST_ID=your_list_id
```

### Development

```bash
yarn dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

### Build

```bash
yarn build
yarn serve
```

### Docker

```bash
docker compose up -d
```

This builds the app with Next.js standalone output and serves it on port 3000.

## Project Structure

```
.
├── app/                  # Next.js App Router pages & providers
├── components/           # Reusable React components
├── css/                  # Tailwind CSS styles
├── data/
│   ├── blog/             # Blog posts (MDX)
│   ├── authors/          # Author profiles (MDX)
│   ├── siteMetadata.js   # Site configuration
│   ├── headerNavLinks.ts # Navigation links
│   ├── portfolioData.ts  # Portfolio items
│   └── journeyData.ts    # Career timeline entries
├── layouts/              # Page layout templates
├── public/               # Static assets (images, favicons)
└── scripts/              # Build scripts (RSS generation)
```

## Writing Blog Posts

Create a new `.mdx` file in `data/blog/`:

```mdx
---
title: 'My Post Title'
date: '2026-01-01'
tags: ['tag1', 'tag2']
draft: false
summary: 'A short summary of the post.'
---

Your content here in MDX format.
```

Supported frontmatter fields: `title`, `date`, `tags`, `draft`, `summary`, `images`, `authors`, `layout`, `bibliography`, `canonicalUrl`.

## Customization

- **Site metadata:** Edit `data/siteMetadata.js` (title, author, social links, providers)
- **Navigation:** Edit `data/headerNavLinks.ts`
- **Portfolio items:** Edit `data/portfolioData.ts`
- **Journey timeline:** Edit `data/journeyData.ts`
- **Styling:** Edit `css/tailwind.css` and Tailwind config

## Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Production build + RSS generation |
| `yarn serve` | Serve production build |
| `yarn lint` | Run ESLint with auto-fix |
| `yarn analyze` | Analyze bundle size |

## License

MIT
