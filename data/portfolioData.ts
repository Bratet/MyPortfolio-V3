export type PortfolioItemType = 'project' | 'publication' | 'award'

export interface PortfolioItem {
  type: PortfolioItemType
  title: string
  subtitle?: string
  organization: string
  date: string
  location?: string
  description: string
  image?: string
  link?: string
  badge?: string
  technologies?: string[]
  featured?: boolean
}

const portfolioData: PortfolioItem[] = [
  {
    type: 'publication',
    title: "ICSMAI'25 Paper",
    subtitle:
      'Enhanced AI-Powered Energy Management Diagnostics: Expert System Integration with LLM for Predictive Maintenance',
    organization: "Springer · ICSMAI'25",
    date: 'Oct 2025',
    location: 'Saidia, Morocco',
    description:
      "Published research paper at ICSMAI'25, contributing to the intersection of statistical methods and artificial intelligence.",
    image: '/static/images/portfolio/icsmai-certificate.png',
    link: 'https://icsmai.com',
    featured: true,
  },
  {
    type: 'project',
    title: 'Pronesis',
    organization: 'Co-founded',
    date: '2024',
    description:
      'Co-founded Pronesis, an AI-powered career platform helping users navigate career paths with personalized guidance and intelligent recommendations.',
    link: 'https://pronesis.pro',
  },
  {
    type: 'award',
    title: 'BCG Platinion Hackathon',
    organization: 'BCG Platinion',
    date: '2023',
    description:
      'Competed in the BCG Platinion Hackathon, achieving top placement both nationally and internationally.',
    badge: '1st Place Nationally, 2nd Internationally',
  },
  {
    type: 'award',
    title: 'National & International Math Olympiad Preparation',
    organization: 'NaMO / IMO',
    date: 'Jan 2019 – Mar 2020',
    description:
      'Selected among the top math students in Morocco for the International Mathematical Olympiad preparation program.',
    badge: 'Top 12 Nationally',
  },
]

export default portfolioData
