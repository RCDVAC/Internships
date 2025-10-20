"use client"

import { Moon, Sun, Laptop } from "lucide-react"
import { useEffect, useState } from "react"

type Theme = "light" | "dark" | "soft-dark"

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    }
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement
    root.classList.remove("light", "dark", "soft-dark")
    root.classList.add(newTheme)
  }

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    applyTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  return (
    <div className="flex items-center gap-1 rounded-full bg-muted p-1">
      <button
        onClick={() => handleThemeChange("light")}
        className={`rounded-full p-2 transition-all ${
          theme === "light" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Light mode"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleThemeChange("dark")}
        className={`rounded-full p-2 transition-all ${
          theme === "dark" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Dark mode"
      >
        <Moon className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleThemeChange("soft-dark")}
        className={`rounded-full p-2 transition-all ${
          theme === "soft-dark"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Soft dark mode"
      >
        <Laptop className="h-4 w-4" />
      </button>
    </div>
  )
}
