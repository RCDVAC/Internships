"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Phone, MapPin, GraduationCap, Briefcase, FileText, Edit, Save, X, Plus } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    phone: "+1 (555) 987-6543",
    location: "San Francisco, CA",
    bio: "Computer Science student passionate about web development and creating impactful software solutions. Seeking internship opportunities to apply my skills and learn from experienced professionals.",
    university: "Stanford University",
    major: "Computer Science",
    graduationYear: "2026",
    gpa: "3.8",
  })

  const skills = ["React", "TypeScript", "Node.js", "Python", "SQL", "Git", "Figma", "AWS"]

  const experience = [
    {
      title: "Web Development Intern",
      company: "StartupCo",
      period: "Summer 2024",
      description:
        "Built responsive web applications using React and collaborated with design team on UI/UX improvements.",
    },
    {
      title: "Teaching Assistant",
      company: "Stanford University",
      period: "Fall 2023 - Present",
      description: "Assist students with programming assignments and hold weekly office hours for CS101 course.",
    },
  ]

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "Stanford University",
      period: "2022 - 2026",
      gpa: "3.8/4.0",
    },
  ]

  const savedJobs = [
    {
      id: 1,
      title: "Software Engineering Intern",
      company: "TechCorp",
      location: "San Francisco, CA",
      salary: "$25-35/hr",
    },
    {
      id: 2,
      title: "Frontend Developer Intern",
      company: "WebSolutions",
      location: "Remote",
      salary: "$20-28/hr",
    },
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Save profile changes
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset changes
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder.svg" alt={profile.name} />
                    <AvatarFallback className="text-2xl">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl">{profile.name}</CardTitle>
                <CardDescription>{profile.major}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{profile.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <GraduationCap className="h-4 w-4" />
                  <span>{profile.university}</span>
                </div>
              </CardContent>
            </Card>

            {/* Skills Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Skills</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Profile Views</span>
                  <span className="font-semibold">127</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Applications</span>
                  <span className="font-semibold">8</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Saved Jobs</span>
                  <span className="font-semibold">{savedJobs.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Edit Controls */}
            <div className="flex justify-end gap-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button variant="outline" onClick={handleCancel} className="bg-transparent">
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </>
              )}
            </div>

            {/* About Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <CardTitle>About</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                  />
                ) : (
                  <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
                )}
              </CardContent>
            </Card>

            {/* Education Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <CardTitle>Education</CardTitle>
                  </div>
                  {isEditing && (
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index}>
                    {index > 0 && <Separator className="my-6" />}
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{edu.degree}</h3>
                      <p className="text-muted-foreground">{edu.school}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{edu.period}</span>
                        <span>•</span>
                        <span>GPA: {edu.gpa}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Experience Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <CardTitle>Experience</CardTitle>
                  </div>
                  {isEditing && (
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index}>
                    {index > 0 && <Separator className="my-6" />}
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{exp.title}</h3>
                      <p className="text-muted-foreground">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.period}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-2">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Saved Jobs Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle>Saved Jobs</CardTitle>
                </div>
                <CardDescription>{savedJobs.length} positions saved</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {savedJobs.map((job, index) => (
                  <div key={job.id}>
                    {index > 0 && <Separator className="my-4" />}
                    <div className="space-y-2">
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{job.location}</span>
                        <span className="font-semibold text-primary">{job.salary}</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        View Details
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
