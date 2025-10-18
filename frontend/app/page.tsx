import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Briefcase, Building2, FileText } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-6xl">
              Launch Your <span className="text-primary">Career</span>
            </h1>
            <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
              Discover thousands of internships and entry-level opportunities from top companies. Start your career
              journey today.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="group">
                <Link href="/jobs">
                  Browse Jobs
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/companies">Browse Companies</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Softlytic?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Curated Opportunities</h3>
              <p className="text-muted-foreground">
                Hand-picked internships and entry-level positions from verified companies
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-accent/10 p-4">
                <Building2 className="h-8 w-8 text-accent" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Top Companies</h3>
              <p className="text-muted-foreground">
                Connect with leading tech companies and startups looking for fresh talent
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Resume Builder</h3>
              <p className="text-muted-foreground">Create professional resumes with our easy-to-use builder tool</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Start Your Career?</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join thousands of students and graduates finding their dream opportunities
          </p>
          <Button asChild size="lg">
            <Link href="/jobs">Get Started</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
