"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, MapPin, Search, SlidersHorizontal } from "lucide-react"

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const jobs = [
    {
      id: 1,
      title: "Software Engineering Intern",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Full-time",
      category: "Engineering",
      salary: "$25-35/hr",
      tags: ["React", "TypeScript", "Node.js"],
      posted: "2 days ago",
    },
    {
      id: 2,
      title: "Product Design Intern",
      company: "DesignHub",
      location: "Remote",
      type: "Part-time",
      category: "Design",
      salary: "$20-30/hr",
      tags: ["Figma", "UI/UX", "Prototyping"],
      posted: "1 week ago",
    },
    {
      id: 3,
      title: "Data Science Intern",
      company: "DataFlow",
      location: "New York, NY",
      type: "Full-time",
      category: "Engineering",
      salary: "$30-40/hr",
      tags: ["Python", "ML", "SQL"],
      posted: "3 days ago",
    },
    {
      id: 4,
      title: "Marketing Intern",
      company: "BrandWorks",
      location: "Los Angeles, CA",
      type: "Full-time",
      category: "Marketing",
      salary: "$18-25/hr",
      tags: ["Social Media", "Content", "Analytics"],
      posted: "5 days ago",
    },
    {
      id: 5,
      title: "Business Analyst Intern",
      company: "ConsultPro",
      location: "Chicago, IL",
      type: "Full-time",
      category: "Business",
      salary: "$22-30/hr",
      tags: ["Excel", "PowerPoint", "Strategy"],
      posted: "1 day ago",
    },
    {
      id: 6,
      title: "Frontend Developer Intern",
      company: "WebSolutions",
      location: "Remote",
      type: "Part-time",
      category: "Engineering",
      salary: "$20-28/hr",
      tags: ["Vue.js", "CSS", "JavaScript"],
      posted: "4 days ago",
    },
    {
      id: 7,
      title: "UX Research Intern",
      company: "UserFirst",
      location: "Seattle, WA",
      type: "Full-time",
      category: "Design",
      salary: "$23-32/hr",
      tags: ["Research", "Testing", "Analysis"],
      posted: "1 week ago",
    },
    {
      id: 8,
      title: "Content Marketing Intern",
      company: "MediaCo",
      location: "Austin, TX",
      type: "Part-time",
      category: "Marketing",
      salary: "$17-24/hr",
      tags: ["Writing", "SEO", "Blogging"],
      posted: "6 days ago",
    },
  ]

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesLocation = locationFilter === "all" || job.location.includes(locationFilter)
    const matchesType = typeFilter === "all" || job.type === typeFilter
    const matchesCategory = categoryFilter === "all" || job.category === categoryFilter

    return matchesSearch && matchesLocation && matchesType && matchesCategory
  })

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Browse Internships</h1>
          <p className="text-muted-foreground text-lg">
            Discover {jobs.length} internship opportunities tailored for students
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-primary" />
              <CardTitle>Search & Filter</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Job title, company, or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="San Francisco">San Francisco</SelectItem>
                    <SelectItem value="New York">New York</SelectItem>
                    <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                    <SelectItem value="Chicago">Chicago</SelectItem>
                    <SelectItem value="Seattle">Seattle</SelectItem>
                    <SelectItem value="Austin">Austin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="type">Job Type</Label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredJobs.length} of {jobs.length} internships
          </p>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-base">
                      <Building2 className="h-4 w-4" />
                      {job.company}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">{job.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div>•</div>
                    <div>{job.posted}</div>
                  </div>
                  <div className="text-base font-semibold text-primary">{job.salary}</div>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full" asChild>
                    <Link href={`/jobs/${job.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <Card className="py-12">
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">No internships found matching your criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setLocationFilter("all")
                  setTypeFilter("all")
                  setCategoryFilter("all")
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
