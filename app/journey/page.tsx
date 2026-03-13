import { genPageMetadata } from 'app/seo'
import AnimatedTitle from '@/components/AnimatedTitle'
import JourneyTabs from '@/components/JourneyTabs'

export const metadata = genPageMetadata({
  title: 'My Journey',
  description: 'My path through tech — work, projects, competitions, and everything in between',
  path: '/journey',
})

export default function Journey() {
  return (
    <div>
      <AnimatedTitle
        title="My Journey"
        description="My path through tech — work, projects, competitions, and everything in between"
      />
      <div className="py-8">
        <JourneyTabs />
      </div>
    </div>
  )
}
