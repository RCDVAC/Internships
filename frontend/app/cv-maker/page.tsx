"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Trash2,
  Download,
  Eye,
  EyeOff,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Languages,
} from "lucide-react"

interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  linkedin: string
  portfolio: string
  summary: string
}

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa: string
  description: string
}

interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

interface Project {
  id: string
  name: string
  description: string
  technologies: string
  link: string
}

interface Skill {
  id: string
  category: string
  skills: string
}

interface Language {
  id: string
  language: string
  proficiency: string
}

export default function CVMakerPage() {
  const [activeSection, setActiveSection] = useState("personal")
  const [showPreview, setShowPreview] = useState(false)
  const [template, setTemplate] = useState("modern")
  const [accentColor, setAccentColor] = useState("blue")
  const [fontSize, setFontSize] = useState("medium")

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    portfolio: "",
    summary: "",
  })

  const [education, setEducation] = useState<Education[]>([
    {
      id: "1",
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
      description: "",
    },
  ])

  const [experience, setExperience] = useState<Experience[]>([
    {
      id: "1",
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  ])

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "",
      description: "",
      technologies: "",
      link: "",
    },
  ])

  const [skills, setSkills] = useState<Skill[]>([
    {
      id: "1",
      category: "",
      skills: "",
    },
  ])

  const [languages, setLanguages] = useState<Language[]>([
    {
      id: "1",
      language: "",
      proficiency: "",
    },
  ])

  const addEducation = () => {
    setEducation([
      ...education,
      {
        id: Date.now().toString(),
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        gpa: "",
        description: "",
      },
    ])
  }

  const removeEducation = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id))
  }

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        id: Date.now().toString(),
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ])
  }

  const removeExperience = (id: string) => {
    setExperience(experience.filter((exp) => exp.id !== id))
  }

  const addProject = () => {
    setProjects([
      ...projects,
      {
        id: Date.now().toString(),
        name: "",
        description: "",
        technologies: "",
        link: "",
      },
    ])
  }

  const removeProject = (id: string) => {
    setProjects(projects.filter((proj) => proj.id !== id))
  }

  const addSkill = () => {
    setSkills([
      ...skills,
      {
        id: Date.now().toString(),
        category: "",
        skills: "",
      },
    ])
  }

  const removeSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id))
  }

  const addLanguage = () => {
    setLanguages([
      ...languages,
      {
        id: Date.now().toString(),
        language: "",
        proficiency: "",
      },
    ])
  }

  const removeLanguage = (id: string) => {
    setLanguages(languages.filter((lang) => lang.id !== id))
  }

  const sections = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: Code },
    { id: "skills", label: "Skills", icon: Award },
    { id: "languages", label: "Languages", icon: Languages },
    { id: "customize", label: "Customize", icon: FileText },
  ]

  const getAccentColorClass = () => {
    const colors = {
      blue: "text-primary",
      teal: "text-accent",
      green: "text-green-600",
      purple: "text-purple-600",
      red: "text-red-600",
    }
    return colors[accentColor as keyof typeof colors] || colors.blue
  }

  const getFontSizeClass = () => {
    const sizes = {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    }
    return sizes[fontSize as keyof typeof sizes] || sizes.medium
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">CV Maker</h1>
          <p className="mt-2 text-muted-foreground">Create a professional CV with our easy-to-use builder</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <Card className="sticky top-20 p-4">
              <div className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${
                        activeSection === section.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-6 space-y-3 border-t border-border pt-6">
                <Button onClick={() => setShowPreview(!showPreview)} variant="outline" className="w-full">
                  {showPreview ? (
                    <>
                      <EyeOff className="mr-2 h-4 w-4" />
                      Hide Preview
                    </>
                  ) : (
                    <>
                      <Eye className="mr-2 h-4 w-4" />
                      Show Preview
                    </>
                  )}
                </Button>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className={showPreview ? "lg:col-span-5" : "lg:col-span-9"}>
            <Card className="p-6">
              {/* Personal Info Section */}
              {activeSection === "personal" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Personal Information</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Basic information about yourself</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={personalInfo.fullName}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={personalInfo.location}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                        placeholder="New York, NY"
                      />
                    </div>

                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={personalInfo.linkedin}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                        placeholder="linkedin.com/in/johndoe"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <Label htmlFor="portfolio">Portfolio/Website</Label>
                      <Input
                        id="portfolio"
                        value={personalInfo.portfolio}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, portfolio: e.target.value })}
                        placeholder="johndoe.com"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        value={personalInfo.summary}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                        placeholder="A brief summary of your professional background and career goals..."
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Education Section */}
              {activeSection === "education" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Education</h2>
                      <p className="mt-1 text-sm text-muted-foreground">Your educational background</p>
                    </div>
                    <Button onClick={addEducation} size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Education
                    </Button>
                  </div>

                  {education.map((edu, index) => (
                    <Card key={edu.id} className="p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">Education {index + 1}</h3>
                        {education.length > 1 && (
                          <Button onClick={() => removeEducation(edu.id)} variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <Label>Institution *</Label>
                          <Input
                            value={edu.institution}
                            onChange={(e) => {
                              const updated = [...education]
                              updated[index].institution = e.target.value
                              setEducation(updated)
                            }}
                            placeholder="University Name"
                          />
                        </div>

                        <div>
                          <Label>Degree *</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) => {
                              const updated = [...education]
                              updated[index].degree = e.target.value
                              setEducation(updated)
                            }}
                            placeholder="Bachelor of Science"
                          />
                        </div>

                        <div>
                          <Label>Field of Study *</Label>
                          <Input
                            value={edu.field}
                            onChange={(e) => {
                              const updated = [...education]
                              updated[index].field = e.target.value
                              setEducation(updated)
                            }}
                            placeholder="Computer Science"
                          />
                        </div>

                        <div>
                          <Label>Start Date</Label>
                          <Input
                            type="month"
                            value={edu.startDate}
                            onChange={(e) => {
                              const updated = [...education]
                              updated[index].startDate = e.target.value
                              setEducation(updated)
                            }}
                          />
                        </div>

                        <div>
                          <Label>End Date</Label>
                          <Input
                            type="month"
                            value={edu.endDate}
                            onChange={(e) => {
                              const updated = [...education]
                              updated[index].endDate = e.target.value
                              setEducation(updated)
                            }}
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <Label>GPA (Optional)</Label>
                          <Input
                            value={edu.gpa}
                            onChange={(e) => {
                              const updated = [...education]
                              updated[index].gpa = e.target.value
                              setEducation(updated)
                            }}
                            placeholder="3.8/4.0"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <Label>Description</Label>
                          <Textarea
                            value={edu.description}
                            onChange={(e) => {
                              const updated = [...education]
                              updated[index].description = e.target.value
                              setEducation(updated)
                            }}
                            placeholder="Relevant coursework, achievements, honors..."
                            rows={3}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* Experience Section */}
              {activeSection === "experience" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Work Experience</h2>
                      <p className="mt-1 text-sm text-muted-foreground">Your professional experience</p>
                    </div>
                    <Button onClick={addExperience} size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Experience
                    </Button>
                  </div>

                  {experience.map((exp, index) => (
                    <Card key={exp.id} className="p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">Experience {index + 1}</h3>
                        {experience.length > 1 && (
                          <Button onClick={() => removeExperience(exp.id)} variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <Label>Company *</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => {
                              const updated = [...experience]
                              updated[index].company = e.target.value
                              setExperience(updated)
                            }}
                            placeholder="Company Name"
                          />
                        </div>

                        <div>
                          <Label>Position *</Label>
                          <Input
                            value={exp.position}
                            onChange={(e) => {
                              const updated = [...experience]
                              updated[index].position = e.target.value
                              setExperience(updated)
                            }}
                            placeholder="Software Engineer Intern"
                          />
                        </div>

                        <div>
                          <Label>Location</Label>
                          <Input
                            value={exp.location}
                            onChange={(e) => {
                              const updated = [...experience]
                              updated[index].location = e.target.value
                              setExperience(updated)
                            }}
                            placeholder="San Francisco, CA"
                          />
                        </div>

                        <div>
                          <Label>Start Date</Label>
                          <Input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => {
                              const updated = [...experience]
                              updated[index].startDate = e.target.value
                              setExperience(updated)
                            }}
                          />
                        </div>

                        <div>
                          <Label>End Date</Label>
                          <Input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => {
                              const updated = [...experience]
                              updated[index].endDate = e.target.value
                              setExperience(updated)
                            }}
                            disabled={exp.current}
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={exp.current}
                              onChange={(e) => {
                                const updated = [...experience]
                                updated[index].current = e.target.checked
                                if (e.target.checked) {
                                  updated[index].endDate = ""
                                }
                                setExperience(updated)
                              }}
                              className="h-4 w-4"
                            />
                            <span className="text-sm text-foreground">I currently work here</span>
                          </label>
                        </div>

                        <div className="sm:col-span-2">
                          <Label>Description *</Label>
                          <Textarea
                            value={exp.description}
                            onChange={(e) => {
                              const updated = [...experience]
                              updated[index].description = e.target.value
                              setExperience(updated)
                            }}
                            placeholder="• Developed and maintained web applications&#10;• Collaborated with cross-functional teams&#10;• Improved system performance by 30%"
                            rows={5}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* Projects Section */}
              {activeSection === "projects" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Projects</h2>
                      <p className="mt-1 text-sm text-muted-foreground">Showcase your personal or academic projects</p>
                    </div>
                    <Button onClick={addProject} size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Project
                    </Button>
                  </div>

                  {projects.map((project, index) => (
                    <Card key={project.id} className="p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">Project {index + 1}</h3>
                        {projects.length > 1 && (
                          <Button onClick={() => removeProject(project.id)} variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </div>

                      <div className="grid gap-4">
                        <div>
                          <Label>Project Name *</Label>
                          <Input
                            value={project.name}
                            onChange={(e) => {
                              const updated = [...projects]
                              updated[index].name = e.target.value
                              setProjects(updated)
                            }}
                            placeholder="E-commerce Platform"
                          />
                        </div>

                        <div>
                          <Label>Description *</Label>
                          <Textarea
                            value={project.description}
                            onChange={(e) => {
                              const updated = [...projects]
                              updated[index].description = e.target.value
                              setProjects(updated)
                            }}
                            placeholder="Describe what the project does and your role..."
                            rows={4}
                          />
                        </div>

                        <div>
                          <Label>Technologies Used</Label>
                          <Input
                            value={project.technologies}
                            onChange={(e) => {
                              const updated = [...projects]
                              updated[index].technologies = e.target.value
                              setProjects(updated)
                            }}
                            placeholder="React, Node.js, MongoDB, AWS"
                          />
                        </div>

                        <div>
                          <Label>Project Link</Label>
                          <Input
                            value={project.link}
                            onChange={(e) => {
                              const updated = [...projects]
                              updated[index].link = e.target.value
                              setProjects(updated)
                            }}
                            placeholder="github.com/username/project"
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* Skills Section */}
              {activeSection === "skills" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Skills</h2>
                      <p className="mt-1 text-sm text-muted-foreground">Your technical and soft skills</p>
                    </div>
                    <Button onClick={addSkill} size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Category
                    </Button>
                  </div>

                  {skills.map((skill, index) => (
                    <Card key={skill.id} className="p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">Skill Category {index + 1}</h3>
                        {skills.length > 1 && (
                          <Button onClick={() => removeSkill(skill.id)} variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </div>

                      <div className="grid gap-4">
                        <div>
                          <Label>Category *</Label>
                          <Input
                            value={skill.category}
                            onChange={(e) => {
                              const updated = [...skills]
                              updated[index].category = e.target.value
                              setSkills(updated)
                            }}
                            placeholder="Programming Languages"
                          />
                        </div>

                        <div>
                          <Label>Skills *</Label>
                          <Textarea
                            value={skill.skills}
                            onChange={(e) => {
                              const updated = [...skills]
                              updated[index].skills = e.target.value
                              setSkills(updated)
                            }}
                            placeholder="JavaScript, Python, Java, C++"
                            rows={3}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* Languages Section */}
              {activeSection === "languages" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Languages</h2>
                      <p className="mt-1 text-sm text-muted-foreground">Languages you speak</p>
                    </div>
                    <Button onClick={addLanguage} size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Language
                    </Button>
                  </div>

                  {languages.map((lang, index) => (
                    <Card key={lang.id} className="p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">Language {index + 1}</h3>
                        {languages.length > 1 && (
                          <Button onClick={() => removeLanguage(lang.id)} variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label>Language *</Label>
                          <Input
                            value={lang.language}
                            onChange={(e) => {
                              const updated = [...languages]
                              updated[index].language = e.target.value
                              setLanguages(updated)
                            }}
                            placeholder="English"
                          />
                        </div>

                        <div>
                          <Label>Proficiency *</Label>
                          <Select
                            value={lang.proficiency}
                            onValueChange={(value) => {
                              const updated = [...languages]
                              updated[index].proficiency = value
                              setLanguages(updated)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select proficiency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="native">Native</SelectItem>
                              <SelectItem value="fluent">Fluent</SelectItem>
                              <SelectItem value="professional">Professional</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="basic">Basic</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* Customize Section */}
              {activeSection === "customize" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Customize Your CV</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Personalize the look and feel of your CV</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label>Template Style</Label>
                      <Select value={template} onValueChange={setTemplate}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="classic">Classic</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                          <SelectItem value="creative">Creative</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Accent Color</Label>
                      <Select value={accentColor} onValueChange={setAccentColor}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blue">Blue</SelectItem>
                          <SelectItem value="teal">Teal</SelectItem>
                          <SelectItem value="green">Green</SelectItem>
                          <SelectItem value="purple">Purple</SelectItem>
                          <SelectItem value="red">Red</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Font Size</Label>
                      <Select value={fontSize} onValueChange={setFontSize}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Card className="p-4">
                      <h3 className="mb-4 font-semibold text-foreground">Preview Colors</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded bg-primary" />
                          <span className="text-sm text-muted-foreground">Primary Color</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded bg-accent" />
                          <span className="text-sm text-muted-foreground">Accent Color</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded border border-border bg-background" />
                          <span className="text-sm text-muted-foreground">Background</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <div className="lg:col-span-4">
              <Card className="sticky top-20 p-6">
                <h3 className="mb-4 text-lg font-semibold text-foreground">Preview</h3>
                <div className={`space-y-4 rounded-lg border border-border bg-card p-6 ${getFontSizeClass()}`}>
                  {/* Header */}
                  {personalInfo.fullName && (
                    <div className="border-b border-border pb-4">
                      <h1 className={`text-2xl font-bold ${getAccentColorClass()}`}>{personalInfo.fullName}</h1>
                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        {personalInfo.email && <p>{personalInfo.email}</p>}
                        {personalInfo.phone && <p>{personalInfo.phone}</p>}
                        {personalInfo.location && <p>{personalInfo.location}</p>}
                      </div>
                    </div>
                  )}

                  {/* Summary */}
                  {personalInfo.summary && (
                    <div>
                      <h2 className={`mb-2 text-lg font-semibold ${getAccentColorClass()}`}>Summary</h2>
                      <p className="text-sm text-foreground">{personalInfo.summary}</p>
                    </div>
                  )}

                  {/* Education */}
                  {education.some((edu) => edu.institution) && (
                    <div>
                      <h2 className={`mb-2 text-lg font-semibold ${getAccentColorClass()}`}>Education</h2>
                      <div className="space-y-3">
                        {education
                          .filter((edu) => edu.institution)
                          .map((edu) => (
                            <div key={edu.id} className="text-sm">
                              <p className="font-semibold text-foreground">{edu.institution}</p>
                              <p className="text-muted-foreground">
                                {edu.degree} {edu.field && `in ${edu.field}`}
                              </p>
                              {edu.gpa && <p className="text-muted-foreground">GPA: {edu.gpa}</p>}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Experience */}
                  {experience.some((exp) => exp.company) && (
                    <div>
                      <h2 className={`mb-2 text-lg font-semibold ${getAccentColorClass()}`}>Experience</h2>
                      <div className="space-y-3">
                        {experience
                          .filter((exp) => exp.company)
                          .map((exp) => (
                            <div key={exp.id} className="text-sm">
                              <p className="font-semibold text-foreground">{exp.position}</p>
                              <p className="text-muted-foreground">{exp.company}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {skills.some((skill) => skill.category) && (
                    <div>
                      <h2 className={`mb-2 text-lg font-semibold ${getAccentColorClass()}`}>Skills</h2>
                      <div className="space-y-2">
                        {skills
                          .filter((skill) => skill.category)
                          .map((skill) => (
                            <div key={skill.id} className="text-sm">
                              <p className="font-semibold text-foreground">{skill.category}</p>
                              <p className="text-muted-foreground">{skill.skills}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
