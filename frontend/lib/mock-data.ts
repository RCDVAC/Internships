export interface Job {
  id: string
  title: string
  company: string
  companyId: string
  location: string
  type: string
  salary: string
  description: string
  logo: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  postedDate: string
  deadline: string
  category: string
}

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Software Engineering Intern",
    company: "TechCorp",
    companyId: "1",
    location: "San Francisco, CA",
    type: "Internship",
    salary: "$25-35/hour",
    description:
      "Join our engineering team to build scalable web applications using modern technologies. You'll work alongside experienced engineers on real-world projects that impact millions of users.",
    logo: "/tech-company-logo.jpg",
    requirements: [
      "Currently pursuing a degree in Computer Science or related field",
      "Strong knowledge of JavaScript, React, and Node.js",
      "Understanding of data structures and algorithms",
      "Excellent problem-solving skills",
      "Good communication and teamwork abilities",
    ],
    responsibilities: [
      "Develop and maintain web applications using React and Node.js",
      "Collaborate with cross-functional teams to define and ship new features",
      "Write clean, maintainable, and efficient code",
      "Participate in code reviews and contribute to team knowledge sharing",
      "Debug and resolve technical issues",
    ],
    benefits: [
      "Competitive hourly compensation",
      "Mentorship from senior engineers",
      "Flexible work hours",
      "Modern tech stack and tools",
      "Potential for full-time conversion",
      "Free lunch and snacks",
    ],
    postedDate: "2024-01-15",
    deadline: "2024-03-01",
    category: "engineering",
  },
  {
    id: "2",
    title: "Product Design Intern",
    company: "DesignHub",
    companyId: "2",
    location: "New York, NY",
    type: "Internship",
    salary: "$22-30/hour",
    description:
      "Create beautiful user experiences for our mobile app. Work with our design team to craft intuitive interfaces that delight users and solve real problems.",
    logo: "/generic-company-logo.png",
    requirements: [
      "Currently pursuing a degree in Design, HCI, or related field",
      "Proficiency in Figma and Adobe Creative Suite",
      "Strong portfolio demonstrating UI/UX design skills",
      "Understanding of design principles and user-centered design",
      "Ability to iterate quickly based on feedback",
    ],
    responsibilities: [
      "Design user interfaces for mobile and web applications",
      "Create wireframes, prototypes, and high-fidelity mockups",
      "Conduct user research and usability testing",
      "Collaborate with engineers to ensure design implementation",
      "Contribute to the design system and component library",
    ],
    benefits: [
      "Work with award-winning design team",
      "Access to latest design tools and software",
      "Portfolio-building opportunities",
      "Design conference attendance",
      "Flexible remote work options",
    ],
    postedDate: "2024-01-18",
    deadline: "2024-03-05",
    category: "design",
  },
  {
    id: "3",
    title: "Data Science Intern",
    company: "DataFlow",
    companyId: "3",
    location: "Remote",
    type: "Internship",
    salary: "$28-38/hour",
    description:
      "Analyze large datasets and build predictive models to drive business decisions. Work on cutting-edge machine learning projects with real-world impact.",
    logo: "/data-analytics-logo.jpg",
    requirements: [
      "Currently pursuing a degree in Data Science, Statistics, or related field",
      "Strong programming skills in Python and SQL",
      "Experience with machine learning libraries (scikit-learn, TensorFlow, PyTorch)",
      "Knowledge of statistical analysis and data visualization",
      "Excellent analytical and problem-solving skills",
    ],
    responsibilities: [
      "Analyze complex datasets to extract actionable insights",
      "Build and deploy machine learning models",
      "Create data visualizations and dashboards",
      "Collaborate with product teams to define metrics and KPIs",
      "Document findings and present results to stakeholders",
    ],
    benefits: [
      "Fully remote position",
      "Access to powerful computing resources",
      "Mentorship from PhD data scientists",
      "Conference and training budget",
      "Flexible schedule",
    ],
    postedDate: "2024-01-20",
    deadline: "2024-03-10",
    category: "data",
  },
  {
    id: "4",
    title: "Marketing Intern",
    company: "GrowthLabs",
    companyId: "4",
    location: "Austin, TX",
    type: "Internship",
    salary: "$20-28/hour",
    description:
      "Help us grow our brand through digital marketing campaigns. Learn the ins and outs of modern marketing while working on real campaigns.",
    logo: "/marketing-agency-logo.png",
    requirements: [
      "Currently pursuing a degree in Marketing, Communications, or related field",
      "Strong writing and communication skills",
      "Familiarity with social media platforms and analytics",
      "Basic understanding of SEO and content marketing",
      "Creative mindset and attention to detail",
    ],
    responsibilities: [
      "Create and manage social media content",
      "Assist in developing marketing campaigns",
      "Analyze campaign performance and provide insights",
      "Conduct market research and competitor analysis",
      "Support email marketing initiatives",
    ],
    benefits: [
      "Hands-on marketing experience",
      "Exposure to multiple marketing channels",
      "Professional development workshops",
      "Networking opportunities",
      "Hybrid work model",
    ],
    postedDate: "2024-01-22",
    deadline: "2024-03-15",
    category: "marketing",
  },
  {
    id: "5",
    title: "Frontend Developer Intern",
    company: "WebWorks",
    companyId: "5",
    location: "Seattle, WA",
    type: "Internship",
    salary: "$24-32/hour",
    description:
      "Build responsive and accessible web interfaces using modern frontend technologies. Join a team that values clean code and great user experiences.",
    logo: "/web-development-logo.png",
    requirements: [
      "Currently pursuing a degree in Computer Science or related field",
      "Strong knowledge of HTML, CSS, and JavaScript",
      "Experience with React or Vue.js",
      "Understanding of responsive design principles",
      "Familiarity with version control (Git)",
    ],
    responsibilities: [
      "Develop responsive web interfaces using React",
      "Implement designs with pixel-perfect accuracy",
      "Ensure cross-browser compatibility and accessibility",
      "Optimize application performance",
      "Collaborate with designers and backend developers",
    ],
    benefits: [
      "Modern tech stack (React, TypeScript, Tailwind)",
      "Code review and mentorship",
      "Flexible work arrangements",
      "Learning and development budget",
      "Team social events",
    ],
    postedDate: "2024-01-25",
    deadline: "2024-03-20",
    category: "engineering",
  },
  {
    id: "6",
    title: "UX Research Intern",
    company: "UserFirst",
    companyId: "6",
    location: "Boston, MA",
    type: "Internship",
    salary: "$23-31/hour",
    description:
      "Conduct user research to improve product experiences. Learn research methodologies while contributing to real product decisions.",
    logo: "/ux-research-logo.jpg",
    requirements: [
      "Currently pursuing a degree in Psychology, HCI, or related field",
      "Understanding of UX research methodologies",
      "Strong analytical and communication skills",
      "Experience with user testing and interviews",
      "Attention to detail and empathy for users",
    ],
    responsibilities: [
      "Plan and conduct user research studies",
      "Analyze research data and synthesize findings",
      "Create research reports and presentations",
      "Collaborate with design and product teams",
      "Maintain research repository and insights library",
    ],
    benefits: [
      "Exposure to various research methods",
      "Mentorship from experienced researchers",
      "Access to research tools and software",
      "Conference attendance opportunities",
      "Flexible schedule",
    ],
    postedDate: "2024-01-28",
    deadline: "2024-03-25",
    category: "design",
  },
]

export function getJobById(id: string): Job | undefined {
  return mockJobs.find((job) => job.id === id)
}
