import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, Video } from "lucide-react"

const mockResources = [
  {
    id: "1",
    title: "Top Internship Interview Tips",
    description: "Learn how to ace your next internship interview with these proven strategies",
    type: "article",
    icon: FileText,
  },
  {
    id: "2",
    title: "How to Write a Great Resume",
    description: "Step-by-step guide to creating a resume that stands out",
    type: "guide",
    icon: BookOpen,
  },
  {
    id: "3",
    title: "Landing Your First Job in Tech",
    description: "Everything you need to know about breaking into the tech industry",
    type: "video",
    icon: Video,
  },
  {
    id: "4",
    title: "Networking for Students",
    description: "Build meaningful professional connections while still in school",
    type: "article",
    icon: FileText,
  },
  {
    id: "5",
    title: "Salary Negotiation Guide",
    description: "Get paid what you're worth with these negotiation tactics",
    type: "guide",
    icon: BookOpen,
  },
  {
    id: "6",
    title: "Remote Work Best Practices",
    description: "Thrive in a remote internship with these tips",
    type: "video",
    icon: Video,
  },
]

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Resources</h1>
        <p className="text-lg text-muted-foreground">
          Guides, tips, and advice to help you succeed in your career journey
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockResources.map((resource) => {
          const Icon = resource.icon
          return (
            <div
              key={resource.id}
              className="flex flex-col rounded-lg border bg-card p-6 transition-all hover:shadow-lg"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-medium uppercase text-muted-foreground">{resource.type}</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">{resource.title}</h3>
              <p className="mb-6 flex-1 text-sm text-muted-foreground">{resource.description}</p>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href={`/resources/${resource.id}`}>Read More</Link>
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
