import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, FileText, Video, Download, ExternalLink, GraduationCap } from "lucide-react"

export default function ResourcesPage() {
  const guides = [
    {
      id: 1,
      title: "How to Write a Winning Resume",
      description: "Learn the essential elements of a standout resume that gets you noticed by recruiters.",
      category: "Resume",
      type: "Guide",
      readTime: "8 min read",
      icon: FileText,
    },
    {
      id: 2,
      title: "Mastering the Interview Process",
      description: "Comprehensive guide to preparing for and acing your internship interviews.",
      category: "Interview",
      type: "Guide",
      readTime: "12 min read",
      icon: BookOpen,
    },
    {
      id: 3,
      title: "Cover Letter Best Practices",
      description: "Craft compelling cover letters that showcase your passion and qualifications.",
      category: "Cover Letter",
      type: "Guide",
      readTime: "6 min read",
      icon: FileText,
    },
    {
      id: 4,
      title: "Networking for Students",
      description: "Build meaningful professional connections that can lead to internship opportunities.",
      category: "Networking",
      type: "Guide",
      readTime: "10 min read",
      icon: BookOpen,
    },
  ]

  const videos = [
    {
      id: 1,
      title: "Common Interview Questions & Answers",
      description: "Watch our expert breakdown of the most common interview questions and how to answer them.",
      duration: "15 min",
      thumbnail: "/interview-video-thumbnail.jpg",
    },
    {
      id: 2,
      title: "Building Your Personal Brand",
      description: "Learn how to create a strong online presence that attracts recruiters.",
      duration: "12 min",
      thumbnail: "/personal-brand-video.jpg",
    },
    {
      id: 3,
      title: "Negotiating Your Internship Offer",
      description: "Tips and strategies for negotiating compensation and benefits as an intern.",
      duration: "10 min",
      thumbnail: "/negotiation-video.jpg",
    },
  ]

  const templates = [
    {
      id: 1,
      title: "Modern Resume Template",
      description: "Clean and professional resume template optimized for ATS systems.",
      format: "PDF",
    },
    {
      id: 2,
      title: "Cover Letter Template",
      description: "Customizable cover letter template with proven structure.",
      format: "DOCX",
    },
    {
      id: 3,
      title: "Thank You Email Template",
      description: "Professional follow-up email template for after interviews.",
      format: "TXT",
    },
  ]

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <GraduationCap className="mr-1 h-3 w-3" />
            Career Resources
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Resources to Help You Succeed</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to land your dream internship, from resume tips to interview prep
          </p>
        </div>

        {/* Guides Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Career Guides</h2>
              <p className="text-muted-foreground">Expert advice to boost your job search</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide) => (
              <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <guide.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <CardTitle className="text-lg">{guide.title}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {guide.type}
                        </Badge>
                      </div>
                      <CardDescription>{guide.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Badge variant="secondary">{guide.category}</Badge>
                      <span>{guide.readTime}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Read More
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Video Tutorials Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Video Tutorials</h2>
              <p className="text-muted-foreground">Learn from industry experts</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative aspect-video bg-muted">
                  <img
                    src={video.thumbnail || "/placeholder.svg?height=200&width=400"}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                      <Video className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>
                  <Badge className="absolute top-2 right-2">{video.duration}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{video.title}</CardTitle>
                  <CardDescription>{video.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-transparent" variant="outline">
                    Watch Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Templates Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Downloadable Templates</h2>
              <p className="text-muted-foreground">Professional templates to get you started</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Download className="h-5 w-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{template.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {template.format}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">Need More Help?</CardTitle>
              <CardDescription className="text-base">
                Our team is here to support you throughout your internship search journey
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
