"use client"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Laptop, Monitor } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("soft-dark")
    } else if (theme === "soft-dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={cycleTheme}>
      {theme === "light" && <Sun className="h-5 w-5" />}
      {theme === "dark" && <Moon className="h-5 w-5" />}
      {theme === "soft-dark" && <Laptop className="h-5 w-5" />}
      {theme === "system" && <Monitor className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
