"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Bell, Menu, X, FileText } from "lucide-react"
import { AuthModal } from "@/components/auth-modal"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  return (
    <>
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-2xl font-bold text-primary">
                Softlytic
              </Link>

              <div className="hidden items-center gap-6 md:flex">
                <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                  Home
                </Link>
                <Link href="/jobs" className="text-sm font-medium transition-colors hover:text-primary">
                  Browse Jobs
                </Link>
                <Link href="/companies" className="text-sm font-medium transition-colors hover:text-primary">
                  Companies
                </Link>
                <Link href="/resources" className="text-sm font-medium transition-colors hover:text-primary">
                  Resources
                </Link>
                <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
                  Contact
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button asChild variant="outline" size="sm" className="hidden gap-2 lg:inline-flex bg-transparent">
                <Link href="/resume">
                  <FileText className="h-4 w-4" />
                  CV Maker
                </Link>
              </Button>

              <ThemeToggle />

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent" />
              </Button>

              <Button onClick={() => setIsAuthModalOpen(true)} className="hidden md:inline-flex">
                Sign In / Sign Up
              </Button>

              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="border-t py-4 md:hidden">
              <div className="flex flex-col gap-4">
                <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                  Home
                </Link>
                <Link href="/jobs" className="text-sm font-medium transition-colors hover:text-primary">
                  Browse Jobs
                </Link>
                <Link href="/companies" className="text-sm font-medium transition-colors hover:text-primary">
                  Companies
                </Link>
                <Link href="/resources" className="text-sm font-medium transition-colors hover:text-primary">
                  Resources
                </Link>
                <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
                  Contact
                </Link>
                <Link href="/resume" className="text-sm font-medium transition-colors hover:text-primary">
                  CV Maker
                </Link>
                <Button onClick={() => setIsAuthModalOpen(true)} className="w-full">
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
