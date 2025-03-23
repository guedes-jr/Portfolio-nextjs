"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

const lightBackgrounds = [
  "bg-gradient-to-r from-blue-600 to-indigo-600",
  "bg-gradient-to-r from-purple-600 to-pink-600",
  "bg-gradient-to-r from-emerald-600 to-teal-600",
  "bg-gradient-to-r from-orange-600 to-amber-600",
  "bg-gradient-to-r from-rose-600 to-red-600",
]

const darkBackgrounds = [
  "bg-gradient-to-r from-blue-900 to-indigo-900",
  "bg-gradient-to-r from-purple-900 to-pink-900",
  "bg-gradient-to-r from-emerald-900 to-teal-900",
  "bg-gradient-to-r from-orange-900 to-amber-900",
  "bg-gradient-to-r from-rose-900 to-red-900",
]

// Gradientes de verde mar para preto
const tealDarkBackgrounds = [
  "bg-gradient-to-r from-teal-700 to-gray-900",
  "bg-gradient-to-r from-emerald-800 to-gray-900",
  "bg-gradient-to-r from-cyan-800 to-gray-900",
  "bg-gradient-to-r from-teal-900 via-emerald-800 to-gray-900",
  "bg-gradient-to-r from-cyan-900 via-teal-800 to-gray-900",
]

export function BackgroundSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { resolvedTheme, theme } = useTheme()

  const isTealDark = theme === "teal-dark"
  const isDark = resolvedTheme === "dark" && !isTealDark
  const isLight = resolvedTheme === "light"

  let backgrounds = lightBackgrounds
  if (isTealDark) backgrounds = tealDarkBackgrounds
  else if (isDark) backgrounds = darkBackgrounds

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex(nextIndex)
        setNextIndex((nextIndex + 1) % backgrounds.length)
        setIsTransitioning(false)
      }, 1000) // Duração da transição
    }, 5000) // Intervalo entre slides

    return () => clearInterval(interval)
  }, [nextIndex, backgrounds.length])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Container centralizado para os slides */}
      <div className="mx-auto max-w-[1400px] h-full relative">
        {/* Gradiente atual */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            backgrounds[currentIndex],
            isTransitioning ? "opacity-0" : isTealDark ? "opacity-30" : "opacity-20",
          )}
        />
        {/* Próximo gradiente */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            backgrounds[nextIndex],
            isTransitioning ? (isTealDark ? "opacity-30" : "opacity-20") : "opacity-0",
          )}
        />
      </div>
      {/* Camada de desfoque que cobre toda a tela */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl" />
    </div>
  )
}

