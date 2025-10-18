import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Clock, DollarSign, Briefcase, FileText } from "lucide-react"
import { getJobById } from "@/lib/mock-data"

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = getJobById(params.id)

  if (!job) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back Button */}
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/jobs">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Link>
      </Button>

      {/* Job Header */}
      <div className="mb-8 rounded-lg border bg-card p-8">
        <div className="mb-6 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex gap-6">
            <Image
              src={job.logo || "/placeholder.svg"}
              alt={`${job.company} logo`}
              width={80}
              height={80}
              className="rounded-lg"
            />
            <div>
              <h1 className="mb-2 text-3xl font-bold">{job.title}</h1>
              <p className="mb-4 text-xl text-muted-foreground">{job.company}</p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="gap-1">
                  <MapPin className="h-3 w-3" />
                  {job.location}
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Briefcase className="h-3 w-3" />
                  {job.type}
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <DollarSign className="h-3 w-3" />
                  {job.salary}
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Clock className="h-3 w-3" />
                  Posted {new Date(job.postedDate).toLocaleDateString()}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button asChild size="lg" className="gap-2">
              <Link href="/resume">
                <FileText className="h-4 w-4" />
                Apply with CV
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              Save Job
            </Button>
          </div>
        </div>

        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-sm">
            <span className="font-semibold">Application Deadline:</span>{" "}
            {new Date(job.deadline).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Job Details */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Description */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">About the Role</h2>
            <p className="leading-relaxed text-muted-foreground">{job.description}</p>
          </section>

          {/* Responsibilities */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">Responsibilities</h2>
            <ul className="space-y-2">
              {job.responsibilities.map((responsibility, index) => (
                <li key={index} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span className="leading-relaxed text-muted-foreground">{responsibility}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Requirements */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">Requirements</h2>
            <ul className="space-y-2">
              {job.requirements.map((requirement, index) => (
                <li key={index} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span className="leading-relaxed text-muted-foreground">{requirement}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Benefits */}
          <section>
            <h2 className="mb-4 text-2xl font-bold">Benefits</h2>
            <ul className="space-y-2">
              {job.benefits.map((benefit, index) => (
                <li key={index} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span className="leading-relaxed text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-lg border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold">Quick Apply</h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Ready to apply? Use our CV maker to create a professional resume and submit your application.
            </p>
            <Button asChild className="mb-3 w-full gap-2">
              <Link href="/resume">
                <FileText className="h-4 w-4" />
                Apply with CV
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href={`/companies/${job.companyId}`}>View Company</Link>
            </Button>

            <div className="mt-6 border-t pt-6">
              <h4 className="mb-3 text-sm font-semibold">Share this job</h4>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
