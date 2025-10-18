import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

interface Job {
  id: string
  title: string
  company: string
  location: string
  description: string
  logo: string
}

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="group flex flex-col rounded-lg border bg-card p-6 transition-all hover:shadow-lg">
      <div className="mb-4 flex items-start gap-4">
        <Image
          src={job.logo || "/placeholder.svg"}
          alt={`${job.company} logo`}
          width={48}
          height={48}
          className="rounded-lg"
        />
        <div className="flex-1">
          <h3 className="mb-1 font-semibold group-hover:text-primary">{job.title}</h3>
          <p className="text-sm text-muted-foreground">{job.company}</p>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4" />
        {job.location}
      </div>

      <p className="mb-6 flex-1 text-sm text-muted-foreground">{job.description}</p>

      <Button asChild className="w-full">
        <Link href={`/jobs/${job.id}`}>View More</Link>
      </Button>
    </div>
  )
}
