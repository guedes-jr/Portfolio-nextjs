"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeSelector } from "@/components/theme-selector"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { ResponsiveContainer } from "@/components/responsive-container"

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()

  // Fechar o menu móvel quando a rota mudar
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Detectar rolagem para adicionar sombra ao header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Impedir rolagem quando o menu móvel estiver aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [mobileMenuOpen])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
        scrolled && "shadow-md",
        "dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-900",
        "dark.teal-dark:bg-gradient-to-r dark.teal-dark:from-gray-900 dark.teal-dark:to-teal-900/70",
      )}
    >
      <ResponsiveContainer className="flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2 mr-6">
            <span className="font-bold text-lg">JG</span>
            <span className="hidden font-bold sm:inline-block">João Guedes</span>
          </Link>

          {/* Menu de navegação para desktop */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <NavLink href="/" active={pathname === "/"}>
              {t("nav.home")}
            </NavLink>
            <NavLink href="/#skills" active={pathname === "/#skills"}>
              {t("nav.skills")}
            </NavLink>
            <NavLink href="/#experience" active={pathname === "/#experience"}>
              {t("nav.experience")}
            </NavLink>
            <NavLink href="/#education" active={pathname === "/#education"}>
              {t("nav.education")}
            </NavLink>
            <NavLink href="/projects" active={pathname?.startsWith("/projects")}>
              {t("nav.projects")}
            </NavLink>
            <NavLink href="/docs" active={pathname?.startsWith("/docs")}>
              {t("nav.docs")}
            </NavLink>
            <NavLink href="/#contact" active={pathname === "/#contact"}>
              {t("nav.contact")}
            </NavLink>
          </nav>
        </div>

        {/* Ações do cabeçalho */}
        <div className="flex items-center space-x-2">
          <div className="hidden sm:flex items-center space-x-2">
            <LanguageToggle />
            <ThemeSelector />
          </div>
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="mailto:contact@example.com">{t("nav.contact")}</Link>
          </Button>

          {/* Menu para dispositivos móveis */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </ResponsiveContainer>

      {/* Menu móvel expansível */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 overflow-y-auto">
          <div className="container py-6 space-y-6">
            <nav className="flex flex-col space-y-4">
              <MobileNavLink href="/" active={pathname === "/"}>
                {t("nav.home")}
              </MobileNavLink>
              <MobileNavLink href="/#skills" active={pathname === "/#skills"}>
                {t("nav.skills")}
              </MobileNavLink>
              <MobileNavLink href="/#experience" active={pathname === "/#experience"}>
                {t("nav.experience")}
              </MobileNavLink>
              <MobileNavLink href="/#education" active={pathname === "/#education"}>
                {t("nav.education")}
              </MobileNavLink>
              <MobileNavLink href="/projects" active={pathname?.startsWith("/projects")}>
                {t("nav.projects")}
              </MobileNavLink>
              <MobileNavLink href="/docs" active={pathname?.startsWith("/docs")}>
                {t("nav.docs")}
              </MobileNavLink>
              <MobileNavLink href="/#contact" active={pathname === "/#contact"}>
                {t("nav.contact")}
              </MobileNavLink>
            </nav>
            <div className="flex flex-col space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <LanguageToggle />
                  <ThemeSelector />
                </div>
              </div>
              <Button asChild className="w-full">
                <Link href="mailto:contact@example.com">{t("nav.contact")}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 text-sm font-medium rounded-md transition-colors",
        active ? "text-foreground bg-muted" : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
      )}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-3 text-lg font-medium rounded-md transition-colors",
        active ? "text-foreground bg-muted" : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
      )}
    >
      {children}
    </Link>
  )
}

