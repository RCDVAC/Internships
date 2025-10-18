"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { JobCard } from "@/components/job-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { mockJobs } from "@/lib/mock-data"

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [location, setLocation] = useState("all")

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Browse Jobs</h1>
        <p className="text-lg text-muted-foreground">Discover internships and entry-level opportunities</p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 rounded-lg border bg-card p-6 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="data">Data Science</SelectItem>
          </SelectContent>
        </Select>

        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="sf">San Francisco</SelectItem>
            <SelectItem value="ny">New York</SelectItem>
            <SelectItem value="austin">Austin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Job Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/* Load More */}
      <div className="mt-12 text-center">
        <Button size="lg" variant="outline">
          Load More Jobs
        </Button>
      </div>
    </div>
  )
}
