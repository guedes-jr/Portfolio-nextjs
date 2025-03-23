"use client"

import Image from "next/image"
import Link from "next/link"
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SkillsSection } from "@/components/skills-section"
import { BackgroundImageSlideshow } from "@/components/background-image-slideshow"
import { ContactSection } from "@/components/contact-section"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { EducationGrid } from "@/components/education-grid"
import { TypewriterEffect } from "@/components/typewriter-effect"
import { useLanguage } from "@/contexts/language-context"
import { Suspense } from "react"
import { GitHubStatsClient } from "@/components/github-stats-client"
import { ThemeSelector } from "@/components/theme-selector"
import { LanguageToggle } from "@/components/language-toggle"
import { ResponsiveContainer } from "@/components/responsive-container"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  const { t, language } = useLanguage()

  // Textos para o efeito de digitação em diferentes idiomas
  const typewriterTexts = {
    pt: ["Analista de Dados", "Analista de Sistemas", "Developer Frontend", "Programador Python"],
    en: ["Data Analyst", "Systems Analyst", "Frontend Developer", "Python Programmer"],
    es: ["Analista de Datos", "Analista de Sistemas", "Desarrollador Frontend", "Programador Python"],
  }

  return (
    <main className="flex min-h-screen flex-col">
      <BackgroundImageSlideshow />

      {/* Hero Section - Redesenhada */}
      <section className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <ResponsiveContainer>
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Foto de perfil - Agora ao lado do texto */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative order-1 md:order-2 md:w-1/2 lg:w-2/5"
            >
              <div className="relative aspect-square max-w-[320px] md:max-w-[400px] mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 blur-2xl" />
                <div className="relative overflow-hidden rounded-full border-4 border-background shadow-xl">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Profile"
                    width={400}
                    height={400}
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-background p-1 shadow-lg">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-primary">
                    <GitHubIcon className="h-10 w-10 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Conteúdo de texto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="order-2 md:order-1 md:w-1/2 lg:w-3/5 text-center md:text-left"
            >
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">João Guedes</h1>
                <div className="h-10 md:h-12">
                  <TypewriterEffect
                    texts={typewriterTexts[language]}
                    className="text-2xl md:text-3xl font-medium text-primary"
                  />
                </div>
                <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto md:mx-0">
                  Developer & Designer creating modern web experiences with a focus on performance and user experience.
                </p>

                <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-6">
                  <Button asChild size="lg" className="rounded-full">
                    <Link href="#projects">{t("hero.viewProjects")}</Link>
                  </Button>
                  <Button variant="outline" asChild size="lg" className="rounded-full">
                    <Link href="/docs">{t("hero.documentation")}</Link>
                  </Button>
                  <div className="flex items-center gap-2 ml-auto sm:ml-0">
                    <LanguageToggle />
                    <ThemeSelector />
                  </div>
                </div>

                <div className="flex gap-6 mt-6 justify-center md:justify-start">
                  <Link
                    href="https://github.com/guedes-jr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    <GitHubIcon className="h-6 w-6" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                  <Link href="mailto:contact@example.com" className="hover:text-primary transition-colors">
                    <MailIcon className="h-6 w-6" />
                    <span className="sr-only">Email</span>
                  </Link>
                  <Link
                    href="https://linkedin.com/in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    <LinkedInIcon className="h-6 w-6" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </ResponsiveContainer>
      </section>

      {/* GitHub Stats Section */}
      <section className="w-full py-12 md:py-16">
        <ResponsiveContainer>
          <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
            <GitHubStatsClient username="guedes-jr" />
          </Suspense>
        </ResponsiveContainer>
      </section>

      {/* Restante das seções permanecem inalteradas */}
      {/* About Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <ResponsiveContainer>
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("about.title")}</h2>
            <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              I'm a passionate developer focused on creating modern, responsive, and user-friendly web applications.
              With expertise in JavaScript, React, and Next.js, I build solutions that combine great design with optimal
              performance.
            </p>
          </div>
        </ResponsiveContainer>
      </section>

      {/* Skills Section */}
      <section id="skills" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <ResponsiveContainer>
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("skills.title")}</h2>
            <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("skills.subtitle")}
            </p>
          </div>
          <SkillsSection />
        </ResponsiveContainer>
      </section>

      {/* Experience Section */}
      <section id="experience" className="w-full py-12 md:py-24 lg:py-32">
        <ResponsiveContainer>
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("experience.title")}</h2>
            <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("experience.subtitle")}
            </p>
          </div>
          <div className="mx-auto max-w-4xl">
            <ExperienceTimeline />
          </div>
        </ResponsiveContainer>
      </section>

      {/* Education Section */}
      <section id="education" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <ResponsiveContainer>
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("education.title")}</h2>
            <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("education.subtitle")}
            </p>
          </div>
          <div className="mx-auto max-w-5xl">
            <EducationGrid />
          </div>
        </ResponsiveContainer>
      </section>

      {/* Projects Section */}
      <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
        <ResponsiveContainer>
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("projects.title")}</h2>
            <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("projects.subtitle")}
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
            {/* Placeholder for projects - would be populated from GitHub data */}
            {[1, 2, 3, 4, 5, 6].map((repo) => (
              <Card key={repo} className="flex flex-col overflow-hidden">
                <CardHeader className="pb-0">
                  <CardTitle className="text-xl">Project {repo}</CardTitle>
                  <CardDescription className="line-clamp-2 h-12">{t("projects.noDescription")}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">Next.js</Badge>
                    <Badge variant="outline">TypeScript</Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1 h-4 w-4"
                    >
                      <path d="M12 4.5a7.5 7.5 0 0 0-7.5 7.5c0 7.5 7.5 10.5 7.5 10.5s7.5-3 7.5-10.5a7.5 7.5 0 0 0-7.5-7.5Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    {repo * 5} stars
                  </div>
                  <Button size="sm" asChild>
                    <Link href="#" target="_blank" rel="noopener noreferrer">
                      {t("projects.viewProject")}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild size="lg">
              <Link href="/projects" className="flex items-center gap-2">
                {t("projects.viewAllProjects")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </ResponsiveContainer>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <ResponsiveContainer>
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("contact.title")}</h2>
            <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("contact.subtitle")}
            </p>
          </div>
          <div className="mx-auto max-w-5xl">
            <ContactSection />
          </div>
        </ResponsiveContainer>
      </section>
    </main>
  )
}

