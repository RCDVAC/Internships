import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Building2,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  ArrowLeft,
  ExternalLink,
  BookmarkPlus,
  Share2,
} from "lucide-react"

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  // Mock job data - in a real app, this would be fetched based on params.id
  const job = {
    id: params.id,
    title: "Software Engineering Intern",
    company: "TechCorp",
    companyId: 1,
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$25-35/hr",
    posted: "2 days ago",
    deadline: "March 15, 2025",
    tags: ["React", "TypeScript", "Node.js"],
    description:
      "We're looking for a passionate Software Engineering Intern to join our dynamic team. You'll work on real-world projects that impact millions of users, collaborate with experienced engineers, and gain hands-on experience with modern web technologies.",
    responsibilities: [
      "Develop and maintain web applications using React and TypeScript",
      "Collaborate with cross-functional teams to define and implement new features",
      "Write clean, maintainable, and well-documented code",
      "Participate in code reviews and contribute to team knowledge sharing",
      "Debug and resolve technical issues in existing applications",
      "Learn and apply best practices in software development",
    ],
    qualifications: [
      "Currently pursuing a degree in Computer Science or related field",
      "Strong understanding of JavaScript and web development fundamentals",
      "Experience with React or similar frontend frameworks",
      "Familiarity with version control systems (Git)",
      "Excellent problem-solving and communication skills",
      "Ability to work collaboratively in a team environment",
    ],
    preferred: [
      "Experience with TypeScript",
      "Knowledge of Node.js and backend development",
      "Understanding of RESTful APIs",
      "Previous internship or project experience",
    ],
    benefits: [
      "Competitive hourly compensation",
      "Flexible work arrangements",
      "Mentorship from senior engineers",
      "Professional development opportunities",
      "Team events and networking",
      "Potential for full-time conversion",
    ],
    companyLogo: "/tech-company-logo.jpg",
  }

  const relatedJobs = [
    {
      id: 2,
      title: "Frontend Developer Intern",
      company: "WebSolutions",
      location: "Remote",
      salary: "$20-28/hr",
    },
    {
      id: 3,
      title: "Full Stack Intern",
      company: "StartupCo",
      location: "New York, NY",
      salary: "$23-32/hr",
    },
  ]

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/jobs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <img
                    src={job.companyLogo || "/placeholder.svg"}
                    alt={`${job.company} logo`}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Building2 className="h-4 w-4" />
                          <Link href={`/companies/${job.companyId}`} className="hover:text-primary transition-colors">
                            {job.company}
                          </Link>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-sm">
                        {job.type}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Posted {job.posted}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>About the Role</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{job.description}</p>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle>Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Qualifications */}
            <Card>
              <CardHeader>
                <CardTitle>Qualifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Required</h3>
                  <ul className="space-y-3">
                    {job.qualifications.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-3">Preferred</h3>
                  <ul className="space-y-3">
                    {job.preferred.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>What We Offer</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Apply for this Position</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-3 w-3" />
                    Deadline: {job.deadline}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" size="lg">
                  Apply Now
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="w-full bg-transparent">
                    <BookmarkPlus className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>About {job.company}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Leading technology company building innovative software solutions for the modern world.
                </p>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href={`/companies/${job.companyId}`}>View Company Profile</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Related Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Positions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedJobs.map((relatedJob, index) => (
                  <div key={relatedJob.id}>
                    {index > 0 && <Separator className="my-4" />}
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm">{relatedJob.title}</h3>
                      <p className="text-xs text-muted-foreground">{relatedJob.company}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{relatedJob.location}</span>
                        <span className="font-semibold text-primary">{relatedJob.salary}</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                        <Link href={`/jobs/${relatedJob.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
