"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Briefcase } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { AuthModal } from "./auth-modal"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Browse Jobs" },
    { href: "/companies", label: "Companies" },
    { href: "/cv-maker", label: "CV Maker" },
    { href: "/chat", label: "Chat Room" }, // Added Chat Room link to navigation
    { href: "/resources", label: "Resources" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-primary" />
              <Link href="/" className="text-xl font-semibold text-foreground">
                Softlytic
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button onClick={() => setIsAuthModalOpen(true)} className="hidden md:inline-flex">
                Sign In / Sign Up
              </Button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden" aria-label="Toggle menu">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="border-t border-border py-4 md:hidden">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  onClick={() => {
                    setIsAuthModalOpen(true)
                    setIsMenuOpen(false)
                  }}
                  className="w-full"
                >
                  Sign In / Sign Up
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
