"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

interface TypewriterEffectProps {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenTexts?: number
  className?: string
}

export function TypewriterEffect({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 1500,
  className,
}: TypewriterEffectProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const { language } = useLanguage()

  // Use useRef instead of state for the timeout
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Reset when language changes
  useEffect(() => {
    setCurrentText("")
    setIsDeleting(false)
    setCurrentTextIndex(0)

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [language])

  // Handle the typing effect
  useEffect(() => {
    const currentFullText = texts[currentTextIndex]

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    const delay = typingSpeed

    // Typing
    if (!isDeleting && currentText !== currentFullText) {
      timeoutRef.current = setTimeout(() => {
        setCurrentText(currentFullText.substring(0, currentText.length + 1))
      }, typingSpeed)
      return
    }

    // Pause after typing
    if (!isDeleting && currentText === currentFullText) {
      timeoutRef.current = setTimeout(() => {
        setIsDeleting(true)
      }, delayBetweenTexts)
      return
    }

    // Deleting
    if (isDeleting && currentText !== "") {
      timeoutRef.current = setTimeout(() => {
        setCurrentText(currentFullText.substring(0, currentText.length - 1))
      }, deletingSpeed)
      return
    }

    // Change to next text
    if (isDeleting && currentText === "") {
      timeoutRef.current = setTimeout(() => {
        setIsDeleting(false)
        setCurrentTextIndex((currentTextIndex + 1) % texts.length)
      }, typingSpeed)
      return
    }

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentText, currentTextIndex, delayBetweenTexts, deletingSpeed, isDeleting, texts, typingSpeed])

  return (
    <div className={cn("inline-block", className)}>
      <span className="text-primary">{currentText}</span>
      <span className="animate-blink">|</span>
    </div>
  )
}

