"use client"

import * as React from "react"
import { Sun, Building2, Contrast } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
  inheritTextColor?: boolean
}

const themes = [
  { key: "light", icon: Sun, label: "Light" },
  { key: "inverted", icon: Contrast, label: "Dark" },
  { key: "blue-black", icon: Building2, label: "Navy" },
] as const

export function ThemeToggle({ className, inheritTextColor = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={cn(
          "inline-flex items-center rounded-full bg-white/10 p-0.5",
          className
        )}
      >
        {themes.map(({ key, icon: Icon }) => (
          <div
            key={key}
            className="flex h-7 w-7 items-center justify-center rounded-full"
          >
            <Icon className="h-3.5 w-3.5 opacity-50" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full bg-white/10 p-0.5",
        inheritTextColor ? "" : "text-foreground",
        className
      )}
      role="radiogroup"
      aria-label="Theme selector"
    >
      {themes.map(({ key, icon: Icon, label }) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          role="radio"
          aria-checked={theme === key}
          aria-label={`${label} theme`}
          className={cn(
            "relative flex h-7 w-7 items-center justify-center rounded-full transition-colors",
            "before:absolute before:inset-0 before:-m-2 before:rounded-full before:content-['']",
            theme === key
              ? "bg-gold-500 text-navy-950"
              : "text-current opacity-60 hover:opacity-100"
          )}
        >
          <Icon className="h-3.5 w-3.5" />
        </button>
      ))}
    </div>
  )
}
