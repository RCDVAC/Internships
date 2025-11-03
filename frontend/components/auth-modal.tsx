"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isSignIn, setIsSignIn] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!isSignIn && !formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call - replace with your actual backend endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/' + (isSignIn ? 'login' : 'signup'), {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // })

      console.log("[v0] Auth submission:", {
        mode: isSignIn ? "Sign In" : "Sign Up",
        data: formData,
      })

      // Success - store user session (localStorage for demo, use proper auth in production)
      localStorage.setItem("user", JSON.stringify({ email: formData.email, name: formData.name }))

      // Reset form and close modal
      setFormData({ name: "", email: "", password: "" })
      setErrors({})
      onClose()

      // Reload to update UI with logged-in state
      window.location.reload()
    } catch (error) {
      setErrors({ submit: "Authentication failed. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
    // Clear error for this field when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }))
    }
  }

  const handleModeSwitch = () => {
    setIsSignIn(!isSignIn)
    setErrors({})
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg bg-card p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-6 text-2xl font-semibold text-card-foreground">{isSignIn ? "Sign In" : "Sign Up"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isSignIn && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>
          {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Loading..." : isSignIn ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <button onClick={handleModeSwitch} className="text-primary hover:underline">
            {isSignIn ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  )
}
