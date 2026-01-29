export type JobType = 'Full-time' | 'Part-time' | 'Internship';

export type Category = 'Engineering' | 'Design' | 'Business' | 'Marketing' | 'Data Science' | 'Other';

export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  location: string; // e.g. "San Francisco, CA" or "Remote"
  postedAgo: string; // e.g. "2 days ago"
  pay: string;       // e.g. "$25-35/hr"
  type: JobType;
  category: Category;
  tags: string[];
  description: string;
  responsibilities: string[];
  qualifications: string[];
  deadline?: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  size: string; // "1000-5000"
  founded: string;
  openPositions: number;
  blurb: string;
  about: string;
  culture: string[];
  benefits: string[];
  tags: string[];
  website?: string;
  logoUrl?: string;
  heroImageUrl?: string;
}
