export type JourneyItemType = 'work' | 'education'

export interface JourneyItem {
  type: JourneyItemType
  title: string
  organization: string
  date: string
  location?: string
  description: string
  highlights?: string[]
  technologies?: string[]
  collaborators?: string[]
  link?: string
  logo?: string
}

const journeyData: JourneyItem[] = [
  {
    type: 'work',
    title: 'Data Scientist',
    organization: 'Artefact',
    date: 'May 2024 – Present',
    location: 'Casablanca, Morocco',
    description:
      'I developed and delivered data products to clients while consulting on their data needs.',
    highlights: [
      'Built automated document processing service that reduced verification costs and to protect over 120 MDH through signature validation',
      'Created 86.23% accurate client scoring model for Bank of Africa to identify high-potential inactive users for targeted engagement',
      'Implemented GenAI-powered FAQ generation system for Orange using customer chat data and unsupervised learning to enhance support efficiency',
      'Designed 93.29% accurate customer request classification model for Orange, optimizing support routing and staff allocation',
    ],
    technologies: [
      'Python',
      'SQL',
      'Scikit-learn',
      'Pandas',
      'Langchain',
      'Streamlit',
      'FastAPI',
      'Docker',
      'Git',
      'GCP',
      'AWS',
    ],
    logo: '/static/images/experiences/artefact.png',
    link: 'https://www.artefact.com/',
  },
  {
    type: 'work',
    title: 'Data Scientist Intern',
    organization: 'Artefact',
    date: 'Feb 2024 – May 2024',
    location: 'Casablanca, Morocco',
    description:
      'Developed a natural language interface for complex database querying through comparative AI agent architecture analysis, enabling intuitive data access for non-technical users.',
    highlights: [
      'Created a natural language interface for database querying by analyzing multiple AI agent architectures, making data accessible to non-technical users',
      'Benchmarked parameter-efficient fine-tuning techniques (QLoRA) across StarCoder and Llama v3 models for Text-to-SQL generation, optimizing hyperparameters',
    ],
    technologies: [
      'Python',
      'Pytorch',
      'Transformers',
      'SQL',
      'Langchain',
      'LLMS',
      'QLoRA',
      'AI Agents',
    ],
    logo: '/static/images/experiences/artefact.png',
    link: 'https://www.artefact.com/',
  },
  {
    type: 'education',
    title: 'Engineering Degree',
    organization: 'ENSIAS – National School of Computer Science and Systems Analysis',
    date: '2021 – 2024',
    location: 'Rabat, Morocco',
    description:
      'Studied Computer Science and Engineering with a focus on data science, machine learning, and software engineering.',
  },
  {
    type: 'work',
    title: 'Machine Learning Engineer Intern',
    organization: 'Yakeey',
    date: 'Jun 2023 – Aug 2023',
    location: 'Casablanca, Morocco',
    description:
      'Built an end-to-end pipeline for extracting building footprints from satellite imagery through evaluation of deep learning segmentation models.',
    highlights: [
      'Engineered a pipeline extracting building footprints from satellite imagery',
      'Benchmarked multiple deep learning segmentation models (U-Net, Mask R-CNN, DeepLabv3+)',
      'Applied various image processing techniques to enhance performance',
    ],
    technologies: [
      'Python',
      'GeoPandas',
      'Pytorch',
      'GeoTorch',
      'OpenCV',
      'FastAPI',
      'Docker',
      'Qgis',
    ],
    logo: '/static/images/experiences/yakeey.png',
    link: 'https://yakeey.com',
  },
  {
    type: 'work',
    title: 'Algorithm & Backend Engineer Intern',
    organization: 'KubicBits',
    date: 'Jun 2021 – Sep 2021',
    location: 'Casablanca, Morocco',
    description:
      'Developed an optimized vehicle routing algorithm handling multiple configurations and constraints for production use.',
    highlights: [
      'Delivered 30% improvements in both processing speed and solution quality through algorithm optimization techniques',
    ],
    technologies: [
      'Optimization',
      'Django rest framework',
      'SQL',
      'Docker',
      'PostgreSQL',
      'PostGIS',
      'Google Maps API',
      'Git',
    ],
    logo: '/static/images/experiences/kubicbits.png',
    link: 'https://www.kubicbits.com/',
  },
]

export default journeyData
