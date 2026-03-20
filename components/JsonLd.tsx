import siteMetadata from '@/data/siteMetadata'

export function WebsiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteMetadata.title,
    url: siteMetadata.siteUrl,
    description: siteMetadata.description,
    author: {
      '@type': 'Person',
      name: siteMetadata.author,
      url: siteMetadata.siteUrl,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function PersonJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteMetadata.author,
    url: siteMetadata.siteUrl,
    jobTitle: 'Data Scientist',
    worksFor: {
      '@type': 'Organization',
      name: 'Artefact',
    },
    sameAs: [
      siteMetadata.github,
      siteMetadata.linkedin,
      siteMetadata.x,
      siteMetadata.medium,
    ].filter(Boolean),
    image: `${siteMetadata.siteUrl}/static/images/avatar.png`,
    email: siteMetadata.email,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
