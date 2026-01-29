export type JobType = 'Full-time' | 'Part-time' | 'Remote';

export type Company = {
  id: string;
  name: string;
  industry: string;
  location: string;
  size: string;
  founded: string;
  website: string;
  logoUrl: string;
  heroImageUrl: string;

  // REQUIRED BY PAGES
  openPositions: number;
  about: string;

  blurb: string;
  tags: string[];
  culture: string[];
  benefits: string[];
};

export type Job = {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  location: string;
  jobType: JobType;
  pay: string;
  postedAgo: string;
  deadline: string;
  category: string;
  tags: string[];
  description: string;
  responsibilities: string[];
  qualifications: string[];
};

/* =========================
   COMPANIES
========================= */

export const companies: Company[] = [
  {
    id: 'techcorp',
    name: 'TechCorp',
    industry: 'Technology',
    location: 'San Francisco, CA',
    size: '1000–5000',
    founded: '2015',
    website: 'https://example.com',
    logoUrl: 'https://placehold.co/120x120?text=TC',
    heroImageUrl: 'https://placehold.co/1600x500?text=TechCorp',
    openPositions: 3,
    about:
      'TechCorp builds modern software products used by millions worldwide. Interns work directly with senior engineers on production systems and ship real features.',
    blurb:
      'TechCorp is a leading technology company building innovative software solutions for the modern world.',
    tags: ['Engineering', 'Product', 'Design'],
    culture: [
      'Innovation-driven environment',
      'Strong mentorship',
      'Work-life balance',
      'Inclusive culture',
    ],
    benefits: [
      'Competitive compensation',
      'Health insurance',
      'Flexible work hours',
      'Professional growth budget',
    ],
  },
  {
    id: 'designhub',
    name: 'DesignHub',
    industry: 'Design',
    location: 'Remote',
    size: '100–500',
    founded: '2018',
    website: 'https://example.com',
    logoUrl: 'https://placehold.co/120x120?text=DH',
    heroImageUrl: 'https://placehold.co/1600x500?text=DesignHub',
    openPositions: 2,
    about:
      'DesignHub is a remote-first UX and product design studio. Interns collaborate with senior designers and work on real client projects.',
    blurb:
      'Creative agency specializing in user experience and brand design for startups and enterprise teams.',
    tags: ['Design', 'UX', 'Brand'],
    culture: ['Remote-first', 'Ownership', 'Craftsmanship'],
    benefits: ['Remote stipend', 'Flexible hours', 'Learning budget'],
  },
  {
    id: 'dataflow',
    name: 'DataFlow',
    industry: 'Technology',
    location: 'New York, NY',
    size: '500–1000',
    founded: '2012',
    website: 'https://example.com',
    logoUrl: 'https://placehold.co/120x120?text=DF',
    heroImageUrl: 'https://placehold.co/1600x500?text=DataFlow',
    openPositions: 4,
    about:
      'DataFlow builds analytics and ML platforms for enterprise teams. Interns learn production data engineering and applied machine learning.',
    blurb:
      'Data analytics platform helping businesses make data-driven decisions.',
    tags: ['Data', 'ML', 'Analytics'],
    culture: ['Impact-driven', 'Mentorship', 'Strong engineering'],
    benefits: ['401k', 'Hybrid work', 'Conference budget'],
  },
  {
    id: 'brandworks',
    name: 'BrandWorks',
    industry: 'Marketing',
    location: 'Los Angeles, CA',
    size: '50–100',
    founded: '2019',
    website: 'https://example.com',
    logoUrl: 'https://placehold.co/120x120?text=BW',
    heroImageUrl: 'https://placehold.co/1600x500?text=BrandWorks',
    openPositions: 3,
    about:
      'BrandWorks is a modern marketing agency focused on growth campaigns, content strategy, and performance marketing.',
    blurb:
      'Full-service marketing agency creating compelling brand experiences.',
    tags: ['Marketing', 'Content', 'Social'],
    culture: ['Creative', 'Fast-paced', 'Client-focused'],
    benefits: ['Flexible schedule', 'Team events'],
  },
];

/* =========================
   JOBS
========================= */

export const jobs: Job[] = [
  {
    id: 'se-intern',
    title: 'Software Engineering Intern',
    companyId: 'techcorp',
    companyName: 'TechCorp',
    location: 'San Francisco, CA',
    jobType: 'Full-time',
    pay: '$25–35/hr',
    postedAgo: '2 days ago',
    deadline: 'March 15, 2025',
    category: 'Engineering',
    tags: ['React', 'TypeScript', 'Node.js'],
    description:
      'Work on production software systems alongside experienced engineers.',
    responsibilities: [
      'Develop web applications',
      'Participate in code reviews',
      'Collaborate with cross-functional teams',
    ],
    qualifications: [
      'Computer Science student',
      'JavaScript/TypeScript experience',
      'Problem-solving skills',
    ],
  },
  {
    id: 'fe-intern',
    title: 'Frontend Developer Intern',
    companyId: 'techcorp',
    companyName: 'TechCorp',
    location: 'Remote',
    jobType: 'Remote',
    pay: '$20–28/hr',
    postedAgo: '6 days ago',
    deadline: 'April 20, 2025',
    category: 'Engineering',
    tags: ['Angular', 'CSS', 'UI'],
    description:
      'Build polished UI components and improve frontend performance.',
    responsibilities: [
      'Implement UI features',
      'Improve accessibility',
      'Collaborate with designers',
    ],
    qualifications: [
      'HTML/CSS/TS basics',
      'Angular or React familiarity',
    ],
  },
  {
    id: 'pd-intern',
    title: 'Product Design Intern',
    companyId: 'designhub',
    companyName: 'DesignHub',
    location: 'Remote',
    jobType: 'Part-time',
    pay: '$20–30/hr',
    postedAgo: '1 week ago',
    deadline: 'April 2, 2025',
    category: 'Design',
    tags: ['Figma', 'UI/UX'],
    description:
      'Help design intuitive user experiences for real products.',
    responsibilities: [
      'Create wireframes',
      'Prototype designs',
      'Collaborate with engineers',
    ],
    qualifications: [
      'Design portfolio',
      'Figma knowledge',
    ],
  },
  {
    id: 'ux-intern',
    title: 'UX Research Intern',
    companyId: 'designhub',
    companyName: 'DesignHub',
    location: 'Remote',
    jobType: 'Part-time',
    pay: '$18–24/hr',
    postedAgo: '2 weeks ago',
    deadline: 'May 1, 2025',
    category: 'Design',
    tags: ['Research', 'User Interviews'],
    description:
      'Conduct research and turn insights into actionable findings.',
    responsibilities: [
      'Run interviews',
      'Analyze feedback',
    ],
    qualifications: [
      'Strong communication',
      'Analytical thinking',
    ],
  },
  {
    id: 'ds-intern',
    title: 'Data Science Intern',
    companyId: 'dataflow',
    companyName: 'DataFlow',
    location: 'New York, NY',
    jobType: 'Full-time',
    pay: '$30–40/hr',
    postedAgo: '3 days ago',
    deadline: 'March 30, 2025',
    category: 'Data',
    tags: ['Python', 'SQL', 'ML'],
    description:
      'Build analytics models and extract insights from data.',
    responsibilities: [
      'Analyze datasets',
      'Build ML models',
    ],
    qualifications: [
      'Python proficiency',
      'Statistics basics',
    ],
  },
  {
    id: 'mkt-intern',
    title: 'Marketing Intern',
    companyId: 'brandworks',
    companyName: 'BrandWorks',
    location: 'Los Angeles, CA',
    jobType: 'Full-time',
    pay: '$18–25/hr',
    postedAgo: '5 days ago',
    deadline: 'April 12, 2025',
    category: 'Marketing',
    tags: ['Content', 'Social Media'],
    description:
      'Support marketing campaigns and content initiatives.',
    responsibilities: [
      'Create social posts',
      'Analyze engagement',
    ],
    qualifications: [
      'Strong writing',
      'Interest in marketing',
    ],
  },
];
