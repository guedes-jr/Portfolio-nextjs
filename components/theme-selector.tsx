"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sun, Moon, Waves, Laptop } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeSelector() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Evitar hidratação incorreta
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="h-9 w-9 px-0">
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme

  const themes = [
    {
      value: "light",
      label: "Light",
      icon: Sun,
    },
    {
      value: "dark",
      label: "Dark",
      icon: Moon,
    },
    {
      value: "teal-dark",
      label: "Teal Dark",
      icon: Waves,
    },
    {
      value: "system",
      label: "System",
      icon: Laptop,
    },
  ]

  const currentThemeObj =
    themes.find(
      (t) =>
        t.value === (theme === "system" ? "system" : currentTheme === "dark" && theme !== "teal-dark" ? "dark" : theme),
    ) || themes[0]

  const ThemeIcon = currentThemeObj.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-1 px-2 lg:px-3">
          <ThemeIcon className="h-4 w-4 lg:mr-1" />
          <span className="hidden sm:inline-flex">{currentThemeObj.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setTheme(t.value)}
            className="flex items-center gap-2 px-3 py-2 cursor-pointer"
          >
            <t.icon className="h-4 w-4" />
            <span>{t.label}</span>
            {(theme === t.value || (theme === "system" && resolvedTheme === t.value && t.value !== "system")) && (
              <span className="ml-auto h-2 w-2 rounded-full bg-primary"></span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

