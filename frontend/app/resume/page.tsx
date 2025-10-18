"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Download, Save, Plus, Trash2, GripVertical, FileText, Palette } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Education = {
  id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
  description: string
}

type Experience = {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

type Project = {
  id: string
  name: string
  description: string
  technologies: string
  link: string
}

type Certification = {
  id: string
  name: string
  issuer: string
  date: string
  credentialId: string
}

type CVData = {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    linkedin: string
    github: string
    website: string
    summary: string
  }
  education: Education[]
  experience: Experience[]
  skills: {
    technical: string[]
    soft: string[]
  }
  projects: Project[]
  certifications: Certification[]
  languages: { language: string; proficiency: string }[]
}

type Template = "modern" | "classic" | "minimal"

export default function CVMakerPage() {
  const [cvData, setCVData] = useState<CVData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
      summary: "",
    },
    education: [],
    experience: [],
    skills: {
      technical: [],
      soft: [],
    },
    projects: [],
    certifications: [],
    languages: [],
  })

  const [template, setTemplate] = useState<Template>("modern")
  const [activeTab, setActiveTab] = useState("personal")

  useEffect(() => {
    const saved = localStorage.getItem("softlytic-cv")
    if (saved) {
      try {
        setCVData(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to load saved CV")
      }
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("softlytic-cv", JSON.stringify(cvData))
    alert("CV saved successfully!")
  }

  const handleExport = () => {
    alert("Export functionality would integrate with a PDF library like jsPDF or react-pdf")
  }

  const addEducation = () => {
    setCVData({
      ...cvData,
      education: [
        ...cvData.education,
        {
          id: Date.now().toString(),
          school: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    })
  }

  const removeEducation = (id: string) => {
    setCVData({
      ...cvData,
      education: cvData.education.filter((edu) => edu.id !== id),
    })
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setCVData({
      ...cvData,
      education: cvData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const addExperience = () => {
    setCVData({
      ...cvData,
      experience: [
        ...cvData.experience,
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
      ],
    })
  }

  const removeExperience = (id: string) => {
    setCVData({
      ...cvData,
      experience: cvData.experience.filter((exp) => exp.id !== id),
    })
  }

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setCVData({
      ...cvData,
      experience: cvData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const addProject = () => {
    setCVData({
      ...cvData,
      projects: [
        ...cvData.projects,
        {
          id: Date.now().toString(),
          name: "",
          description: "",
          technologies: "",
          link: "",
        },
      ],
    })
  }

  const removeProject = (id: string) => {
    setCVData({
      ...cvData,
      projects: cvData.projects.filter((proj) => proj.id !== id),
    })
  }

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setCVData({
      ...cvData,
      projects: cvData.projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)),
    })
  }

  const addCertification = () => {
    setCVData({
      ...cvData,
      certifications: [
        ...cvData.certifications,
        {
          id: Date.now().toString(),
          name: "",
          issuer: "",
          date: "",
          credentialId: "",
        },
      ],
    })
  }

  const removeCertification = (id: string) => {
    setCVData({
      ...cvData,
      certifications: cvData.certifications.filter((cert) => cert.id !== id),
    })
  }

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    setCVData({
      ...cvData,
      certifications: cvData.certifications.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert)),
    })
  }

  const addLanguage = () => {
    setCVData({
      ...cvData,
      languages: [...cvData.languages, { language: "", proficiency: "" }],
    })
  }

  const removeLanguage = (index: number) => {
    setCVData({
      ...cvData,
      languages: cvData.languages.filter((_, i) => i !== index),
    })
  }

  const updateLanguage = (index: number, field: "language" | "proficiency", value: string) => {
    setCVData({
      ...cvData,
      languages: cvData.languages.map((lang, i) => (i === index ? { ...lang, [field]: value } : lang)),
    })
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Professional CV Builder</h1>
          <p className="text-muted-foreground">Create a comprehensive, ATS-friendly resume with multiple templates</p>
        </div>

        {/* Actions Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3">
            <Palette className="h-5 w-5 text-muted-foreground" />
            <Label htmlFor="template" className="text-sm font-medium">
              Template:
            </Label>
            <Select value={template} onValueChange={(value: Template) => setTemplate(value)}>
              <SelectTrigger id="template" className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="classic">Classic</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button size="sm" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-[1fr,500px]">
          {/* Editor */}
          <div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6 grid w-full grid-cols-7">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="certs">Certs</TabsTrigger>
                <TabsTrigger value="languages">Languages</TabsTrigger>
              </TabsList>

              {/* Personal Info Tab */}
              <TabsContent value="personal" className="space-y-6">
                <Card className="p-6">
                  <h2 className="mb-4 text-xl font-semibold">Personal Information</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        value={cvData.personalInfo.fullName}
                        onChange={(e) =>
                          setCVData({
                            ...cvData,
                            personalInfo: { ...cvData.personalInfo, fullName: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={cvData.personalInfo.email}
                        onChange={(e) =>
                          setCVData({
                            ...cvData,
                            personalInfo: { ...cvData.personalInfo, email: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        value={cvData.personalInfo.phone}
                        onChange={(e) =>
                          setCVData({
                            ...cvData,
                            personalInfo: { ...cvData.personalInfo, phone: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="San Francisco, CA"
                        value={cvData.personalInfo.location}
                        onChange={(e) =>
                          setCVData({
                            ...cvData,
                            personalInfo: { ...cvData.personalInfo, location: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        placeholder="linkedin.com/in/johndoe"
                        value={cvData.personalInfo.linkedin}
                        onChange={(e) =>
                          setCVData({
                            ...cvData,
                            personalInfo: { ...cvData.personalInfo, linkedin: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        placeholder="github.com/johndoe"
                        value={cvData.personalInfo.github}
                        onChange={(e) =>
                          setCVData({
                            ...cvData,
                            personalInfo: { ...cvData.personalInfo, github: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="website">Portfolio/Website</Label>
                      <Input
                        id="website"
                        placeholder="johndoe.com"
                        value={cvData.personalInfo.website}
                        onChange={(e) =>
                          setCVData({
                            ...cvData,
                            personalInfo: { ...cvData.personalInfo, website: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        placeholder="A brief overview of your professional background, key skills, and career objectives..."
                        rows={5}
                        value={cvData.personalInfo.summary}
                        onChange={(e) =>
                          setCVData({
                            ...cvData,
                            personalInfo: { ...cvData.personalInfo, summary: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Experience Tab */}
              <TabsContent value="experience" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Work Experience</h2>
                  <Button onClick={addExperience} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Experience
                  </Button>
                </div>

                {cvData.experience.length === 0 ? (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">
                      No experience added yet. Click "Add Experience" to get started.
                    </p>
                  </Card>
                ) : (
                  cvData.experience.map((exp) => (
                    <Card key={exp.id} className="p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <GripVertical className="mt-1 h-5 w-5 text-muted-foreground" />
                        <Button variant="ghost" size="sm" onClick={() => removeExperience(exp.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Company *</Label>
                          <Input
                            placeholder="Company Name"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Position *</Label>
                          <Input
                            placeholder="Job Title"
                            value={exp.position}
                            onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Location</Label>
                          <Input
                            placeholder="City, State"
                            value={exp.location}
                            onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            type="month"
                            value={exp.endDate}
                            disabled={exp.current}
                            onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                          />
                        </div>
                        <div className="flex items-center space-x-2 pt-8">
                          <input
                            type="checkbox"
                            id={`current-${exp.id}`}
                            checked={exp.current}
                            onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                            className="h-4 w-4 rounded border-input"
                          />
                          <Label htmlFor={`current-${exp.id}`} className="font-normal">
                            Currently working here
                          </Label>
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label>Description & Achievements</Label>
                          <Textarea
                            placeholder="• Led a team of 5 developers&#10;• Increased performance by 40%&#10;• Implemented new features..."
                            rows={5}
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                          />
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Education</h2>
                  <Button onClick={addEducation} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Education
                  </Button>
                </div>

                {cvData.education.length === 0 ? (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">
                      No education added yet. Click "Add Education" to get started.
                    </p>
                  </Card>
                ) : (
                  cvData.education.map((edu) => (
                    <Card key={edu.id} className="p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <GripVertical className="mt-1 h-5 w-5 text-muted-foreground" />
                        <Button variant="ghost" size="sm" onClick={() => removeEducation(edu.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2 sm:col-span-2">
                          <Label>School/University *</Label>
                          <Input
                            placeholder="University Name"
                            value={edu.school}
                            onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Degree *</Label>
                          <Input
                            placeholder="Bachelor's, Master's, etc."
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Field of Study</Label>
                          <Input
                            placeholder="Computer Science"
                            value={edu.field}
                            onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input
                            type="month"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            type="month"
                            value={edu.endDate}
                            onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label>Additional Details</Label>
                          <Textarea
                            placeholder="GPA, honors, relevant coursework, activities..."
                            rows={3}
                            value={edu.description}
                            onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                          />
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills" className="space-y-6">
                <Card className="p-6">
                  <h2 className="mb-4 text-xl font-semibold">Technical Skills</h2>
                  <Textarea
                    placeholder="Enter skills separated by commas: JavaScript, React, Python, Node.js, SQL, Git..."
                    rows={4}
                    value={cvData.skills.technical.join(", ")}
                    onChange={(e) =>
                      setCVData({
                        ...cvData,
                        skills: {
                          ...cvData.skills,
                          technical: e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        },
                      })
                    }
                  />
                </Card>

                <Card className="p-6">
                  <h2 className="mb-4 text-xl font-semibold">Soft Skills</h2>
                  <Textarea
                    placeholder="Enter skills separated by commas: Leadership, Communication, Problem Solving, Teamwork..."
                    rows={4}
                    value={cvData.skills.soft.join(", ")}
                    onChange={(e) =>
                      setCVData({
                        ...cvData,
                        skills: {
                          ...cvData.skills,
                          soft: e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        },
                      })
                    }
                  />
                </Card>
              </TabsContent>

              {/* Projects Tab */}
              <TabsContent value="projects" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Projects</h2>
                  <Button onClick={addProject} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Project
                  </Button>
                </div>

                {cvData.projects.length === 0 ? (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">No projects added yet. Click "Add Project" to get started.</p>
                  </Card>
                ) : (
                  cvData.projects.map((proj) => (
                    <Card key={proj.id} className="p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <GripVertical className="mt-1 h-5 w-5 text-muted-foreground" />
                        <Button variant="ghost" size="sm" onClick={() => removeProject(proj.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>

                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label>Project Name *</Label>
                          <Input
                            placeholder="E-commerce Platform"
                            value={proj.name}
                            onChange={(e) => updateProject(proj.id, "name", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Technologies Used</Label>
                          <Input
                            placeholder="React, Node.js, MongoDB"
                            value={proj.technologies}
                            onChange={(e) => updateProject(proj.id, "technologies", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Project Link</Label>
                          <Input
                            placeholder="https://github.com/username/project"
                            value={proj.link}
                            onChange={(e) => updateProject(proj.id, "link", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            placeholder="Describe the project, your role, and key achievements..."
                            rows={4}
                            value={proj.description}
                            onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                          />
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </TabsContent>

              {/* Certifications Tab */}
              <TabsContent value="certs" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Certifications</h2>
                  <Button onClick={addCertification} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Certification
                  </Button>
                </div>

                {cvData.certifications.length === 0 ? (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">
                      No certifications added yet. Click "Add Certification" to get started.
                    </p>
                  </Card>
                ) : (
                  cvData.certifications.map((cert) => (
                    <Card key={cert.id} className="p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <GripVertical className="mt-1 h-5 w-5 text-muted-foreground" />
                        <Button variant="ghost" size="sm" onClick={() => removeCertification(cert.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2 sm:col-span-2">
                          <Label>Certification Name *</Label>
                          <Input
                            placeholder="AWS Certified Solutions Architect"
                            value={cert.name}
                            onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Issuing Organization</Label>
                          <Input
                            placeholder="Amazon Web Services"
                            value={cert.issuer}
                            onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Issue Date</Label>
                          <Input
                            type="month"
                            value={cert.date}
                            onChange={(e) => updateCertification(cert.id, "date", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label>Credential ID</Label>
                          <Input
                            placeholder="ABC123XYZ"
                            value={cert.credentialId}
                            onChange={(e) => updateCertification(cert.id, "credentialId", e.target.value)}
                          />
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </TabsContent>

              {/* Languages Tab */}
              <TabsContent value="languages" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Languages</h2>
                  <Button onClick={addLanguage} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Language
                  </Button>
                </div>

                {cvData.languages.length === 0 ? (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">
                      No languages added yet. Click "Add Language" to get started.
                    </p>
                  </Card>
                ) : (
                  <Card className="p-6">
                    <div className="space-y-4">
                      {cvData.languages.map((lang, index) => (
                        <div key={index} className="flex items-end gap-4">
                          <div className="flex-1 space-y-2">
                            <Label>Language</Label>
                            <Input
                              placeholder="English"
                              value={lang.language}
                              onChange={(e) => updateLanguage(index, "language", e.target.value)}
                            />
                          </div>
                          <div className="flex-1 space-y-2">
                            <Label>Proficiency</Label>
                            <Select
                              value={lang.proficiency}
                              onValueChange={(value) => updateLanguage(index, "proficiency", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Native">Native</SelectItem>
                                <SelectItem value="Fluent">Fluent</SelectItem>
                                <SelectItem value="Professional">Professional</SelectItem>
                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                <SelectItem value="Basic">Basic</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeLanguage(index)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Live Preview */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <Card className="overflow-hidden">
              <div className="border-b bg-muted/50 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Live Preview</h3>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className={`cv-preview ${template} p-8`}>
                {/* Modern Template */}
                {template === "modern" && (
                  <div className="space-y-6 text-sm">
                    {/* Header */}
                    {cvData.personalInfo.fullName && (
                      <div className="border-b pb-4">
                        <h1 className="mb-2 text-3xl font-bold">{cvData.personalInfo.fullName}</h1>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          {cvData.personalInfo.email && <span>{cvData.personalInfo.email}</span>}
                          {cvData.personalInfo.phone && <span>{cvData.personalInfo.phone}</span>}
                          {cvData.personalInfo.location && <span>{cvData.personalInfo.location}</span>}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          {cvData.personalInfo.linkedin && <span>{cvData.personalInfo.linkedin}</span>}
                          {cvData.personalInfo.github && <span>{cvData.personalInfo.github}</span>}
                          {cvData.personalInfo.website && <span>{cvData.personalInfo.website}</span>}
                        </div>
                      </div>
                    )}

                    {/* Summary */}
                    {cvData.personalInfo.summary && (
                      <div>
                        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
                          Professional Summary
                        </h2>
                        <p className="text-xs leading-relaxed text-muted-foreground">{cvData.personalInfo.summary}</p>
                      </div>
                    )}

                    {/* Experience */}
                    {cvData.experience.length > 0 && (
                      <div>
                        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">Experience</h2>
                        <div className="space-y-4">
                          {cvData.experience.map((exp) => (
                            <div key={exp.id}>
                              <div className="mb-1 flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold">{exp.position}</h3>
                                  <p className="text-xs text-muted-foreground">{exp.company}</p>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                                </span>
                              </div>
                              {exp.location && <p className="mb-2 text-xs text-muted-foreground">{exp.location}</p>}
                              {exp.description && (
                                <p className="whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">
                                  {exp.description}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Education */}
                    {cvData.education.length > 0 && (
                      <div>
                        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">Education</h2>
                        <div className="space-y-3">
                          {cvData.education.map((edu) => (
                            <div key={edu.id}>
                              <div className="mb-1 flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold">{edu.school}</h3>
                                  <p className="text-xs text-muted-foreground">
                                    {edu.degree}
                                    {edu.field && ` in ${edu.field}`}
                                  </p>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {edu.startDate} - {edu.endDate}
                                </span>
                              </div>
                              {edu.description && (
                                <p className="text-xs leading-relaxed text-muted-foreground">{edu.description}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    {(cvData.skills.technical.length > 0 || cvData.skills.soft.length > 0) && (
                      <div>
                        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">Skills</h2>
                        {cvData.skills.technical.length > 0 && (
                          <div className="mb-2">
                            <span className="text-xs font-medium">Technical: </span>
                            <span className="text-xs text-muted-foreground">{cvData.skills.technical.join(" • ")}</span>
                          </div>
                        )}
                        {cvData.skills.soft.length > 0 && (
                          <div>
                            <span className="text-xs font-medium">Soft Skills: </span>
                            <span className="text-xs text-muted-foreground">{cvData.skills.soft.join(" • ")}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Projects */}
                    {cvData.projects.length > 0 && (
                      <div>
                        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">Projects</h2>
                        <div className="space-y-3">
                          {cvData.projects.map((proj) => (
                            <div key={proj.id}>
                              <h3 className="font-semibold">{proj.name}</h3>
                              {proj.technologies && (
                                <p className="mb-1 text-xs text-muted-foreground">{proj.technologies}</p>
                              )}
                              {proj.description && (
                                <p className="mb-1 text-xs leading-relaxed text-muted-foreground">{proj.description}</p>
                              )}
                              {proj.link && (
                                <a href={proj.link} className="text-xs text-primary hover:underline">
                                  {proj.link}
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Certifications */}
                    {cvData.certifications.length > 0 && (
                      <div>
                        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                          Certifications
                        </h2>
                        <div className="space-y-2">
                          {cvData.certifications.map((cert) => (
                            <div key={cert.id}>
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="text-xs font-semibold">{cert.name}</h3>
                                  <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                                </div>
                                {cert.date && <span className="text-xs text-muted-foreground">{cert.date}</span>}
                              </div>
                              {cert.credentialId && (
                                <p className="text-xs text-muted-foreground">ID: {cert.credentialId}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Languages */}
                    {cvData.languages.length > 0 && (
                      <div>
                        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">Languages</h2>
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                          {cvData.languages.map((lang, index) => (
                            <span key={index} className="text-xs text-muted-foreground">
                              {lang.language}
                              {lang.proficiency && ` (${lang.proficiency})`}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Empty State */}
                    {!cvData.personalInfo.fullName &&
                      cvData.experience.length === 0 &&
                      cvData.education.length === 0 && (
                        <div className="py-12 text-center">
                          <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                          <p className="text-sm text-muted-foreground">
                            Start filling out your information to see the preview
                          </p>
                        </div>
                      )}
                  </div>
                )}

                {/* Classic Template */}
                {template === "classic" && (
                  <div className="space-y-5 text-sm">
                    {cvData.personalInfo.fullName && (
                      <div className="text-center">
                        <h1 className="mb-2 text-2xl font-bold uppercase tracking-wide">
                          {cvData.personalInfo.fullName}
                        </h1>
                        <div className="text-xs text-muted-foreground">
                          {[cvData.personalInfo.email, cvData.personalInfo.phone, cvData.personalInfo.location]
                            .filter(Boolean)
                            .join(" | ")}
                        </div>
                        {(cvData.personalInfo.linkedin ||
                          cvData.personalInfo.github ||
                          cvData.personalInfo.website) && (
                          <div className="mt-1 text-xs text-muted-foreground">
                            {[cvData.personalInfo.linkedin, cvData.personalInfo.github, cvData.personalInfo.website]
                              .filter(Boolean)
                              .join(" | ")}
                          </div>
                        )}
                      </div>
                    )}

                    {cvData.personalInfo.summary && (
                      <div>
                        <h2 className="mb-2 border-b-2 border-foreground text-xs font-bold uppercase">Summary</h2>
                        <p className="text-xs leading-relaxed">{cvData.personalInfo.summary}</p>
                      </div>
                    )}

                    {cvData.experience.length > 0 && (
                      <div>
                        <h2 className="mb-2 border-b-2 border-foreground text-xs font-bold uppercase">
                          Professional Experience
                        </h2>
                        <div className="space-y-3">
                          {cvData.experience.map((exp) => (
                            <div key={exp.id}>
                              <div className="flex justify-between">
                                <h3 className="font-bold">{exp.position}</h3>
                                <span className="text-xs">
                                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                                </span>
                              </div>
                              <div className="text-xs italic">
                                {exp.company}
                                {exp.location && ` - ${exp.location}`}
                              </div>
                              {exp.description && (
                                <p className="mt-1 whitespace-pre-wrap text-xs leading-relaxed">{exp.description}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {cvData.education.length > 0 && (
                      <div>
                        <h2 className="mb-2 border-b-2 border-foreground text-xs font-bold uppercase">Education</h2>
                        <div className="space-y-2">
                          {cvData.education.map((edu) => (
                            <div key={edu.id}>
                              <div className="flex justify-between">
                                <h3 className="font-bold">{edu.school}</h3>
                                <span className="text-xs">
                                  {edu.startDate} - {edu.endDate}
                                </span>
                              </div>
                              <div className="text-xs italic">
                                {edu.degree}
                                {edu.field && ` in ${edu.field}`}
                              </div>
                              {edu.description && <p className="text-xs">{edu.description}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {(cvData.skills.technical.length > 0 || cvData.skills.soft.length > 0) && (
                      <div>
                        <h2 className="mb-2 border-b-2 border-foreground text-xs font-bold uppercase">Skills</h2>
                        {cvData.skills.technical.length > 0 && (
                          <div className="mb-1 text-xs">
                            <span className="font-bold">Technical: </span>
                            {cvData.skills.technical.join(", ")}
                          </div>
                        )}
                        {cvData.skills.soft.length > 0 && (
                          <div className="text-xs">
                            <span className="font-bold">Soft Skills: </span>
                            {cvData.skills.soft.join(", ")}
                          </div>
                        )}
                      </div>
                    )}

                    {cvData.projects.length > 0 && (
                      <div>
                        <h2 className="mb-2 border-b-2 border-foreground text-xs font-bold uppercase">Projects</h2>
                        <div className="space-y-2">
                          {cvData.projects.map((proj) => (
                            <div key={proj.id}>
                              <h3 className="font-bold">{proj.name}</h3>
                              {proj.technologies && <div className="text-xs italic">{proj.technologies}</div>}
                              {proj.description && <p className="text-xs">{proj.description}</p>}
                              {proj.link && <div className="text-xs text-primary">{proj.link}</div>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {cvData.certifications.length > 0 && (
                      <div>
                        <h2 className="mb-2 border-b-2 border-foreground text-xs font-bold uppercase">
                          Certifications
                        </h2>
                        <div className="space-y-1">
                          {cvData.certifications.map((cert) => (
                            <div key={cert.id} className="text-xs">
                              <span className="font-bold">{cert.name}</span> - {cert.issuer}
                              {cert.date && ` (${cert.date})`}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {cvData.languages.length > 0 && (
                      <div>
                        <h2 className="mb-2 border-b-2 border-foreground text-xs font-bold uppercase">Languages</h2>
                        <div className="text-xs">
                          {cvData.languages
                            .map((lang) => `${lang.language}${lang.proficiency ? ` (${lang.proficiency})` : ""}`)
                            .join(", ")}
                        </div>
                      </div>
                    )}

                    {!cvData.personalInfo.fullName &&
                      cvData.experience.length === 0 &&
                      cvData.education.length === 0 && (
                        <div className="py-12 text-center">
                          <p className="text-sm text-muted-foreground">
                            Start filling out your information to see the preview
                          </p>
                        </div>
                      )}
                  </div>
                )}

                {/* Minimal Template */}
                {template === "minimal" && (
                  <div className="space-y-8 text-sm">
                    {cvData.personalInfo.fullName && (
                      <div>
                        <h1 className="mb-1 text-3xl font-light tracking-tight">{cvData.personalInfo.fullName}</h1>
                        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                          {cvData.personalInfo.email && <span>{cvData.personalInfo.email}</span>}
                          {cvData.personalInfo.phone && <span>{cvData.personalInfo.phone}</span>}
                          {cvData.personalInfo.location && <span>{cvData.personalInfo.location}</span>}
                          {cvData.personalInfo.linkedin && <span>{cvData.personalInfo.linkedin}</span>}
                        </div>
                      </div>
                    )}

                    {cvData.personalInfo.summary && (
                      <div>
                        <p className="text-xs leading-relaxed text-muted-foreground">{cvData.personalInfo.summary}</p>
                      </div>
                    )}

                    {cvData.experience.length > 0 && (
                      <div>
                        <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                          Experience
                        </h2>
                        <div className="space-y-6">
                          {cvData.experience.map((exp) => (
                            <div key={exp.id}>
                              <div className="mb-1 flex justify-between">
                                <h3 className="font-medium">{exp.position}</h3>
                                <span className="text-xs text-muted-foreground">
                                  {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                                </span>
                              </div>
                              <div className="mb-2 text-xs text-muted-foreground">{exp.company}</div>
                              {exp.description && (
                                <p className="whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">
                                  {exp.description}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {cvData.education.length > 0 && (
                      <div>
                        <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                          Education
                        </h2>
                        <div className="space-y-4">
                          {cvData.education.map((edu) => (
                            <div key={edu.id}>
                              <div className="mb-1 flex justify-between">
                                <h3 className="font-medium">{edu.school}</h3>
                                <span className="text-xs text-muted-foreground">
                                  {edu.startDate} — {edu.endDate}
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {edu.degree}
                                {edu.field && `, ${edu.field}`}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {(cvData.skills.technical.length > 0 || cvData.skills.soft.length > 0) && (
                      <div>
                        <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                          Skills
                        </h2>
                        <div className="space-y-2 text-xs text-muted-foreground">
                          {cvData.skills.technical.length > 0 && <div>{cvData.skills.technical.join(" · ")}</div>}
                          {cvData.skills.soft.length > 0 && <div>{cvData.skills.soft.join(" · ")}</div>}
                        </div>
                      </div>
                    )}

                    {cvData.projects.length > 0 && (
                      <div>
                        <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                          Projects
                        </h2>
                        <div className="space-y-4">
                          {cvData.projects.map((proj) => (
                            <div key={proj.id}>
                              <h3 className="mb-1 font-medium">{proj.name}</h3>
                              {proj.description && (
                                <p className="mb-1 text-xs leading-relaxed text-muted-foreground">{proj.description}</p>
                              )}
                              {proj.technologies && (
                                <div className="text-xs text-muted-foreground">{proj.technologies}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {!cvData.personalInfo.fullName &&
                      cvData.experience.length === 0 &&
                      cvData.education.length === 0 && (
                        <div className="py-12 text-center">
                          <p className="text-sm text-muted-foreground">
                            Start filling out your information to see the preview
                          </p>
                        </div>
                      )}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
