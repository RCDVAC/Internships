import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Building2, MapPin, Users, Globe, Briefcase, ArrowLeft } from "lucide-react"

export default function CompanyProfilePage({ params }: { params: { id: string } }) {
  // Mock company data - in a real app, this would be fetched based on params.id
  const company = {
    id: params.id,
    name: "TechCorp",
    industry: "Technology",
    size: "1000-5000 employees",
    location: "San Francisco, CA",
    website: "https://techcorp.example.com",
    description:
      "TechCorp is a leading technology company building innovative software solutions for the modern world. We're passionate about creating products that make a difference in people's lives and empower businesses to succeed in the digital age.",
    logo: "/tech-company-logo.jpg",
    coverImage: "/modern-office.png",
    founded: "2015",
    tags: ["Engineering", "Product", "Design"],
    culture: [
      "Innovation-driven environment",
      "Work-life balance",
      "Continuous learning opportunities",
      "Diverse and inclusive workplace",
      "Collaborative team culture",
    ],
    benefits: [
      "Competitive compensation",
      "Health insurance",
      "Flexible work arrangements",
      "Professional development budget",
      "Mentorship programs",
      "Team events and activities",
    ],
    openPositions: [
      {
        id: 1,
        title: "Software Engineering Intern",
        type: "Full-time",
        location: "San Francisco, CA",
        salary: "$25-35/hr",
        tags: ["React", "TypeScript", "Node.js"],
      },
      {
        id: 2,
        title: "Product Design Intern",
        type: "Full-time",
        location: "San Francisco, CA",
        salary: "$23-32/hr",
        tags: ["Figma", "UI/UX", "Prototyping"],
      },
      {
        id: 3,
        title: "Data Engineering Intern",
        type: "Part-time",
        location: "Remote",
        salary: "$28-38/hr",
        tags: ["Python", "SQL", "AWS"],
      },
    ],
  }

  return (
    <div className="min-h-screen">
      {/* Cover Image */}
      <div className="relative h-64 bg-muted">
        <img
          src={company.coverImage || "/placeholder.svg"}
          alt={`${company.name} office`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        {/* Company Header */}
        <div className="relative -mt-16 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <img
                  src={company.logo || "/placeholder.svg"}
                  alt={`${company.name} logo`}
                  className="w-24 h-24 rounded-lg object-cover border-4 border-background shadow-lg"
                />
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
                      <p className="text-muted-foreground text-lg">{company.industry}</p>
                    </div>
                    <Button asChild>
                      <a href={company.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="mr-2 h-4 w-4" />
                        Visit Website
                      </a>
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {company.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {company.size}
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      Founded {company.founded}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {company.openPositions.length} open positions
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About {company.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{company.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {company.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Culture */}
            <Card>
              <CardHeader>
                <CardTitle>Company Culture</CardTitle>
                <CardDescription>What makes us unique</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {company.culture.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Open Positions */}
            <Card>
              <CardHeader>
                <CardTitle>Open Internship Positions</CardTitle>
                <CardDescription>{company.openPositions.length} opportunities available</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {company.openPositions.map((job, index) => (
                    <div key={job.id}>
                      {index > 0 && <Separator className="my-4" />}
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <MapPin className="h-3 w-3" />
                              {job.location}
                            </div>
                          </div>
                          <Badge variant="secondary">{job.type}</Badge>
                        </div>
                        <div className="text-sm font-semibold text-primary">{job.salary}</div>
                        <div className="flex flex-wrap gap-2">
                          {job.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button className="w-full" asChild>
                          <Link href={`/jobs/${job.id}`}>View Job Details</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Intern Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {company.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <Link href="/jobs">View All Jobs</Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/companies">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Companies
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
