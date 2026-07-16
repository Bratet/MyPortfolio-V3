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
