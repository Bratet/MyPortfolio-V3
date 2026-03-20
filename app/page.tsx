import { sortPosts, allCoreContent, coreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allAuthors, Authors } from 'contentlayer/generated'
import Main from './Main'
import { PersonJsonLd, WebsiteJsonLd } from '@/components/JsonLd'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const authorContent = coreContent(author)
  return (
    <>
      <PersonJsonLd />
      <WebsiteJsonLd />
      <Main posts={posts} authorContent={authorContent} authorBodyCode={author.body.code} />
    </>
  )
}
