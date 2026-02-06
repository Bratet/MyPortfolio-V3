import { genPageMetadata } from 'app/seo'
import AnimatedTitle from '@/components/AnimatedTitle'
import PortfolioBento from '@/components/PortfolioBento'

export const metadata = genPageMetadata({
  title: 'Portfolio',
  description: 'Publications, projects, and achievements',
  path: '/portfolio',
})

export default function Portfolio() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <AnimatedTitle title="Portfolio" description="Publications, projects, and achievements" />
      <div className="container py-12">
        <PortfolioBento />
      </div>
    </div>
  )
}
