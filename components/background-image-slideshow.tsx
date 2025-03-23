"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { careerImages } from "./career-images"

export function BackgroundImageSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { resolvedTheme } = useTheme()
  const { language } = useLanguage()

  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex(nextIndex)
        setNextIndex((nextIndex + 1) % careerImages.length)
        setIsTransitioning(false)
      }, 1000) // Duração da transição
    }, 8000) // Intervalo entre slides

    return () => clearInterval(interval)
  }, [nextIndex])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Container para os slides */}
      <div className="absolute inset-0 w-full h-full">
        {/* Imagem atual */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            isTransitioning ? "opacity-0" : "opacity-15",
          )}
        >
          <Image
            src={isDark ? careerImages[currentIndex].dark : careerImages[currentIndex].light}
            alt={careerImages[currentIndex].title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Próxima imagem */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            isTransitioning ? "opacity-15" : "opacity-0",
          )}
        >
          <Image
            src={isDark ? careerImages[nextIndex].dark : careerImages[nextIndex].light}
            alt={careerImages[nextIndex].title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Camada de desfoque que cobre toda a tela */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
    </div>
  )
}

