import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-bold text-primary">Softlytic</h3>
            <p className="text-sm text-muted-foreground">Find your next internship or early career opportunity</p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                About
              </Link>
              <Link href="/privacy" className="text-muted-foreground transition-colors hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground transition-colors hover:text-foreground">
                Terms of Service
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Softlytic. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
