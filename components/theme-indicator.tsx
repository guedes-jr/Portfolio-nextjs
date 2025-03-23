"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon, Waves, Laptop } from "lucide-react"
import { cn } from "@/lib/utils"

export function ThemeIndicator({ className }: { className?: string }) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const getThemeIcon = () => {
    if (theme === "teal-dark") return <Waves className="h-5 w-5 text-teal-400" />
    if (theme === "system") return <Laptop className="h-5 w-5 text-blue-400" />

    const currentTheme = theme === "system" ? resolvedTheme : theme

    if (currentTheme === "dark") return <Moon className="h-5 w-5 text-yellow-400" />
    return <Sun className="h-5 w-5 text-orange-400" />
  }

  const getThemeName = () => {
    if (theme === "teal-dark") return "Teal Dark"
    if (theme === "system") return "System"

    const currentTheme = theme === "system" ? resolvedTheme : theme

    if (currentTheme === "dark") return "Dark"
    return "Light"
  }

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-background/80 px-3 py-2 shadow-md backdrop-blur",
        className,
      )}
    >
      {getThemeIcon()}
      <span className="text-xs font-medium hidden sm:inline">{getThemeName()}</span>
    </div>
  )
}

