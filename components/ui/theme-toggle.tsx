"use client"

import * as React from "react"
import { Building2, Contrast } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
  inheritTextColor?: boolean
}

export function ThemeToggle({ className, inheritTextColor = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch by only rendering after mount
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-sm p-2 transition-colors",
          "hover:bg-muted",
          inheritTextColor ? "" : "text-foreground",
          className
        )}
        disabled
        aria-label="Toggle theme"
      >
        <Contrast className="h-5 w-5" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "blue-black" ? "inverted" : "blue-black")}
      className={cn(
        "inline-flex items-center justify-center rounded-sm p-2 transition-colors",
        "hover:bg-accent/10",
        inheritTextColor ? "" : "text-foreground",
        className
      )}
      aria-label={`Switch to ${theme === "blue-black" ? "inverted" : "blue-black"} mode`}
    >
      {theme === "inverted" ? (
        <Building2 className="h-5 w-5" />
      ) : (
        <Contrast className="h-5 w-5" />
      )}
    </button>
  )
}
