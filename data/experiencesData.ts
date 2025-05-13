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
    company: 'Artefact',
    position: 'Data Scientist',
    duration: 'Jun 2024 - Present',
    location: 'Casablanca, Morocco',
    description:
      'I developed and delivered data products to clients while consulting on their data needs.',
    achievements: [
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
    website: 'https://www.artefact.com/',
  },
  {
    company: 'Artefact',
    position: 'Machine Learning Engineer Intern',
    duration: 'Feb 2024 - Jun 2024',
    location: 'Casablanca, Morocco',
    description:
      'Developed a natural language interface for complex database querying through comparative AI agent architecture analysis, enabling intuitive data access for non-technical users.',
    achievements: [
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
    website: 'https://www.artefact.com/',
  },
  {
    company: 'Yakeey',
    position: 'Machine Learning Engineer Intern',
    duration: 'Jun 2023 - Sep 2023',
    location: 'Casablanca, Morocco',
    description:
      'Built an end-to-end pipeline for extracting building footprints from satellite imagery through evaluation of deep learning segmentation models.',
    achievements: [
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
    website: 'https://yakeey.com',
  },
  {
    company: 'KubicBits',
    position: 'Algorithm & Backend Engineer Intern',
    duration: 'Jun 2022 - Sep 2022',
    location: 'Casablanca, Morocco',
    description:
      'Developed an optimized vehicle routing algorithm handling multiple configurations and constraints for production use.',
    achievements: [
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
    website: 'https://www.kubicbits.com/',
  },
]

export default experiencesData
