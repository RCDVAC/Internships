"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Search, Users, Briefcase } from "lucide-react"

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [sizeFilter, setSizeFilter] = useState("all")

  const companies = [
    {
      id: 1,
      name: "TechCorp",
      industry: "Technology",
      size: "1000-5000",
      location: "San Francisco, CA",
      description: "Leading technology company building innovative software solutions for the modern world.",
      openPositions: 12,
      logo: "/tech-company-logo.jpg",
      tags: ["Engineering", "Product", "Design"],
    },
    {
      id: 2,
      name: "DesignHub",
      industry: "Design",
      size: "100-500",
      location: "Remote",
      description: "Creative agency specializing in user experience and brand design for startups.",
      openPositions: 8,
      logo: "/design-agency-logo.png",
      tags: ["Design", "Marketing", "Creative"],
    },
    {
      id: 3,
      name: "DataFlow",
      industry: "Technology",
      size: "500-1000",
      location: "New York, NY",
      description: "Data analytics platform helping businesses make data-driven decisions.",
      openPositions: 15,
      logo: "/data-company-logo.png",
      tags: ["Engineering", "Data Science", "Analytics"],
    },
    {
      id: 4,
      name: "BrandWorks",
      industry: "Marketing",
      size: "50-100",
      location: "Los Angeles, CA",
      description: "Full-service marketing agency creating compelling brand experiences.",
      openPositions: 6,
      logo: "/marketing-agency-logo.png",
      tags: ["Marketing", "Content", "Social Media"],
    },
    {
      id: 5,
      name: "ConsultPro",
      industry: "Consulting",
      size: "5000+",
      location: "Chicago, IL",
      description: "Global consulting firm providing strategic business solutions to Fortune 500 companies.",
      openPositions: 20,
      logo: "/consulting-firm-logo.png",
      tags: ["Business", "Strategy", "Finance"],
    },
    {
      id: 6,
      name: "WebSolutions",
      industry: "Technology",
      size: "10-50",
      location: "Remote",
      description: "Web development studio crafting beautiful and functional websites for clients worldwide.",
      openPositions: 4,
      logo: "/web-development-logo.png",
      tags: ["Engineering", "Design", "Web"],
    },
    {
      id: 7,
      name: "UserFirst",
      industry: "Design",
      size: "100-500",
      location: "Seattle, WA",
      description: "UX research and design consultancy focused on creating user-centered products.",
      openPositions: 7,
      logo: "/ux-research-logo.jpg",
      tags: ["Design", "Research", "Product"],
    },
    {
      id: 8,
      name: "MediaCo",
      industry: "Media",
      size: "500-1000",
      location: "Austin, TX",
      description: "Digital media company producing engaging content across multiple platforms.",
      openPositions: 10,
      logo: "/generic-media-logo.png",
      tags: ["Content", "Marketing", "Creative"],
    },
  ]

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      searchQuery === "" ||
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesIndustry = industryFilter === "all" || company.industry === industryFilter
    const matchesSize = sizeFilter === "all" || company.size === sizeFilter

    return matchesSearch && matchesIndustry && matchesSize
  })

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Browse Companies</h1>
          <p className="text-muted-foreground text-lg">
            Explore {companies.length} companies hiring interns and discover your next opportunity
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Company name or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Select value={industryFilter} onValueChange={setIndustryFilter}>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="All Industries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Consulting">Consulting</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="size">Company Size</Label>
                <Select value={sizeFilter} onValueChange={setSizeFilter}>
                  <SelectTrigger id="size">
                    <SelectValue placeholder="All Sizes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sizes</SelectItem>
                    <SelectItem value="10-50">10-50 employees</SelectItem>
                    <SelectItem value="50-100">50-100 employees</SelectItem>
                    <SelectItem value="100-500">100-500 employees</SelectItem>
                    <SelectItem value="500-1000">500-1000 employees</SelectItem>
                    <SelectItem value="1000-5000">1000-5000 employees</SelectItem>
                    <SelectItem value="5000+">5000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredCompanies.length} of {companies.length} companies
          </p>
        </div>

        {/* Company Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <img
                    src={company.logo || "/placeholder.svg"}
                    alt={`${company.name} logo`}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{company.name}</CardTitle>
                    <CardDescription className="text-base">{company.industry}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{company.description}</p>
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
                      <Briefcase className="h-4 w-4" />
                      {company.openPositions} open positions
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {company.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full" asChild>
                    <Link href={`/companies/${company.id}`}>View Company</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCompanies.length === 0 && (
          <Card className="py-12">
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">No companies found matching your criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setIndustryFilter("all")
                  setSizeFilter("all")
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
