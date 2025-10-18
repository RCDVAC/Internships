import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const mockCompanies = [
  {
    id: "1",
    name: "TechCorp",
    industry: "Technology",
    logo: "/tech-company-logo.jpg",
    jobCount: 12,
  },
  {
    id: "2",
    name: "DesignHub",
    industry: "Design & Creative",
    logo: "/generic-company-logo.png",
    jobCount: 8,
  },
  {
    id: "3",
    name: "DataFlow",
    industry: "Data & Analytics",
    logo: "/data-company-logo.png",
    jobCount: 15,
  },
  {
    id: "4",
    name: "GrowthLabs",
    industry: "Marketing",
    logo: "/marketing-company-logo.png",
    jobCount: 6,
  },
  {
    id: "5",
    name: "WebWorks",
    industry: "Web Development",
    logo: "/web-company-logo.png",
    jobCount: 10,
  },
  {
    id: "6",
    name: "UserFirst",
    industry: "UX Research",
    logo: "/ux-company-logo.jpg",
    jobCount: 5,
  },
]

export default function CompaniesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Companies</h1>
        <p className="text-lg text-muted-foreground">Explore companies hiring for internships and early career roles</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockCompanies.map((company) => (
          <div
            key={company.id}
            className="flex flex-col items-center rounded-lg border bg-card p-8 text-center transition-all hover:shadow-lg"
          >
            <Image
              src={company.logo || "/placeholder.svg"}
              alt={`${company.name} logo`}
              width={80}
              height={80}
              className="mb-4 rounded-lg"
            />
            <h3 className="mb-2 text-xl font-semibold">{company.name}</h3>
            <p className="mb-4 text-sm text-muted-foreground">{company.industry}</p>
            <p className="mb-6 text-sm text-muted-foreground">{company.jobCount} open positions</p>
            <Button asChild className="w-full">
              <Link href={`/companies/${company.id}`}>View Jobs</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
