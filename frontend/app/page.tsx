import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Briefcase, Building2, GraduationCap, TrendingUp } from "lucide-react"

export default function HomePage() {
  const featuredJobs = [
    {
      id: 1,
      title: "Software Engineering Intern",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$25-35/hr",
      tags: ["React", "TypeScript", "Node.js"],
    },
    {
      id: 2,
      title: "Product Design Intern",
      company: "DesignHub",
      location: "Remote",
      type: "Part-time",
      salary: "$20-30/hr",
      tags: ["Figma", "UI/UX", "Prototyping"],
    },
    {
      id: 3,
      title: "Data Science Intern",
      company: "DataFlow",
      location: "New York, NY",
      type: "Full-time",
      salary: "$30-40/hr",
      tags: ["Python", "ML", "SQL"],
    },
  ]

  const categories = [
    { name: "Engineering", count: 234, icon: Briefcase },
    { name: "Design", count: 156, icon: GraduationCap },
    { name: "Business", count: 189, icon: TrendingUp },
    { name: "Marketing", count: 142, icon: Building2 },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center gap-6">
            <Badge variant="secondary" className="text-sm">
              🎓 Built for Students & Recent Grads
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">
              Launch Your Career with the <span className="text-primary">Perfect Internship</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl text-pretty">
              Discover thousands of internship opportunities from top companies. Get real-world experience and kickstart
              your professional journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" asChild>
                <Link href="/jobs">
                  Browse Internships <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/companies">Explore Companies</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">2,500+</div>
              <div className="text-sm text-muted-foreground mt-1">Active Internships</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">850+</div>
              <div className="text-sm text-muted-foreground mt-1">Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">15,000+</div>
              <div className="text-sm text-muted-foreground mt-1">Students Hired</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground mt-1">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Explore by Category</h2>
            <p className="text-muted-foreground">Find internships in your field of interest</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Card key={category.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <CardDescription>{category.count} positions</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-3">Featured Internships</h2>
              <p className="text-muted-foreground">Hand-picked opportunities from top companies</p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex bg-transparent">
              <Link href="/jobs">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg mb-1">{job.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {job.company}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">{job.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground">{job.location}</div>
                    <div className="text-sm font-semibold text-primary">{job.salary}</div>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full mt-4" asChild>
                      <Link href={`/jobs/${job.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8 sm:hidden">
            <Button variant="outline" asChild>
              <Link href="/jobs">View All Internships</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl mb-3">Ready to Start Your Journey?</CardTitle>
              <CardDescription className="text-primary-foreground/90 text-lg">
                Join thousands of students who have found their dream internships through InternHub
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/jobs">Browse All Internships</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/resources">Career Resources</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
