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
    <div>
      <AnimatedTitle title="Portfolio" description="Publications, projects, and achievements" />
      <div className="py-8">
        <PortfolioBento />
      </div>
    </div>
  )
}
