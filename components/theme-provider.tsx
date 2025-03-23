"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { useEffect } from "react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Adicionar classe CSS personalizada para o tema teal-dark
  useEffect(() => {
    const handleThemeChange = () => {
      const theme = localStorage.getItem("theme")

      if (theme === "teal-dark") {
        document.documentElement.classList.add("dark", "teal-dark")
      } else {
        document.documentElement.classList.remove("teal-dark")
      }
    }

    // Verificar no carregamento inicial
    handleThemeChange()

    // Observar mudanças
    window.addEventListener("storage", handleThemeChange)
    return () => window.removeEventListener("storage", handleThemeChange)
  }, [])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

