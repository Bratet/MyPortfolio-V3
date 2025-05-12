interface Experience {
  company: string
  position: string
  duration: string
  location: string
  description: string
  achievements: string[]
  technologies: string[]
  logo?: string
  website?: string
}

const experiencesData: Experience[] = [
  {
    company: 'Example Company',
    position: 'Senior Software Engineer',
    duration: 'Jan 2022 - Present',
    location: 'Remote',
    description: 'Led the development of critical features and mentored junior developers.',
    achievements: [
      'Improved application performance by 40% through code optimization',
      'Implemented CI/CD pipeline reducing deployment time by 60%',
      'Led a team of 5 developers in delivering major features',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'AWS'],
    logo: '/static/images/company-logo.png',
    website: 'https://example.com',
  },
  {
    company: 'Previous Company',
    position: 'Software Engineer',
    duration: 'Jun 2020 - Dec 2021',
    location: 'New York, NY',
    description: 'Developed and maintained web applications using modern technologies.',
    achievements: [
      'Built responsive web applications serving 100k+ users',
      'Reduced bug reports by 30% through improved testing',
      'Collaborated with UX team to implement new features',
    ],
    technologies: ['JavaScript', 'React', 'Python', 'Docker'],
    logo: '/static/images/previous-company-logo.png',
    website: 'https://previous-company.com',
  },
]

export default experiencesData
