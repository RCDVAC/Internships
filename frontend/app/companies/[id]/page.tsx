import Image from "next/image"
import { JobCard } from "@/components/job-card"

const mockCompany = {
  id: "1",
  name: "TechCorp",
  industry: "Technology",
  logo: "/tech-company-logo.jpg",
  description:
    "TechCorp is a leading technology company focused on building innovative solutions for the modern web. We believe in empowering the next generation of developers and designers.",
}

const mockJobs = [
  {
    id: "1",
    title: "Software Engineering Intern",
    company: "TechCorp",
    location: "San Francisco, CA",
    description: "Join our engineering team to build scalable web applications",
    logo: "/tech-company-logo.jpg",
  },
  {
    id: "2",
    title: "Frontend Developer Intern",
    company: "TechCorp",
    location: "San Francisco, CA",
    description: "Build responsive and accessible web interfaces",
    logo: "/tech-company-logo.jpg",
  },
  {
    id: "3",
    title: "DevOps Intern",
    company: "TechCorp",
    location: "Remote",
    description: "Help us maintain and scale our cloud infrastructure",
    logo: "/tech-company-logo.jpg",
  },
]

export default function CompanyDetailPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Company Header */}
      <div className="mb-12 flex flex-col items-center gap-6 rounded-lg border bg-card p-8 md:flex-row md:items-start">
        <Image
          src={mockCompany.logo || "/placeholder.svg"}
          alt={`${mockCompany.name} logo`}
          width={120}
          height={120}
          className="rounded-lg"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="mb-2 text-3xl font-bold">{mockCompany.name}</h1>
          <p className="mb-4 text-muted-foreground">{mockCompany.industry}</p>
          <p className="text-muted-foreground">{mockCompany.description}</p>
        </div>
      </div>

      {/* Available Jobs */}
      <div className="mb-8">
        <h2 className="mb-6 text-2xl font-bold">Open Positions</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  )
}
