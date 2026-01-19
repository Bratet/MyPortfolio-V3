import { genPageMetadata } from 'app/seo'
import tagData from 'app/tag-data.json'
import AnimatedTags from '@/components/AnimatedTags'

export const metadata = genPageMetadata({
  title: 'Tags',
  description: 'Things I blog about',
  path: '/tags',
})

export default function Tags() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <AnimatedTags tags={tagData} />
        </div>
      </div>
    </>
  )
}
