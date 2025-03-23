"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

type Experience = {
  title: string
  company: string
  period: string
  description: string
  responsibilities: string[]
  skills: string[]
}

export function ExperienceTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const { t } = useLanguage()

  const experiences: Experience[] = [
    {
      title: "Frontend Developer",
      company: "Tech Company",
      period: "Jan 2021 - Presente",
      description: "Desenvolvendo interfaces modernas e responsivas utilizando React e Next.js.",
      responsibilities: [
        "Implementação de designs do Figma para código",
        "Otimização de performance e SEO",
        "Desenvolvimento de componentes reutilizáveis",
        "Integração com APIs RESTful",
      ],
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "Web Developer",
      company: "Digital Agency",
      period: "Mar 2019 - Dez 2020",
      description: "Criação de websites e landing pages para diversos clientes.",
      responsibilities: [
        "Desenvolvimento de soluções personalizadas",
        "Integração com APIs de terceiros",
        "Manutenção e atualização de sites existentes",
        "Colaboração com designers e equipe de marketing",
      ],
      skills: ["HTML", "CSS", "JavaScript", "WordPress"],
    },
    {
      title: "Freelance Developer",
      company: "Self-employed",
      period: "Jun 2018 - Fev 2019",
      description: "Desenvolvimento de projetos para clientes como freelancer.",
      responsibilities: [
        "Criação de websites responsivos",
        "Desenvolvimento de sistemas de gerenciamento",
        "Implementação de lojas virtuais",
        "Suporte técnico e manutenção",
      ],
      skills: ["HTML", "CSS", "JavaScript", "PHP"],
    },
    {
      title: "Junior Developer",
      company: "Startup",
      period: "Ago 2017 - Mai 2018",
      description: "Desenvolvimento de aplicações web como parte de uma equipe ágil.",
      responsibilities: [
        "Implementação de novas funcionalidades",
        "Correção de bugs e melhorias de performance",
        "Participação em code reviews",
        "Testes e documentação",
      ],
      skills: ["JavaScript", "jQuery", "Bootstrap", "PHP"],
    },
  ]

  return (
    <div className="relative">
      {/* Linha central da timeline - visível apenas em telas médias e grandes */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary via-primary to-muted hidden md:block" />

      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <div key={index} className="relative">
            {/* Ponto central na linha - visível apenas em telas médias e grandes */}
            <div className="absolute left-1/2 top-6 h-4 w-4 -translate-x-1/2 rounded-full bg-primary border-2 border-background z-10 hidden md:block" />

            {/* Card - alterna entre esquerdo e direito em telas médias e grandes */}
            <div
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 gap-4 relative",
                index % 2 === 0 ? "md:[direction:rtl]" : "",
              )}
            >
              {/* Espaçador para o lado sem card */}
              <div className={cn("hidden md:block", index % 2 === 0 ? "md:[direction:ltr]" : "")} />

              {/* Card */}
              <motion.div
                className={cn("md:[direction:ltr]")}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setExpandedIndex(index)}
                onMouseLeave={() => setExpandedIndex(null)}
              >
                <Card
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    expandedIndex === index ? "shadow-lg" : "",
                  )}
                >
                  <CardHeader className="pb-2">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div>
                        <CardTitle className="text-lg">{experience.title}</CardTitle>
                        <CardDescription>{experience.company}</CardDescription>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-sm font-medium whitespace-nowrap self-start sm:self-auto mt-2 sm:mt-0"
                      >
                        {experience.period}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-2">{experience.description}</p>

                    {/* Expanded content */}
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        expandedIndex === index ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0",
                      )}
                    >
                      <h4 className="font-medium mb-2">{t("experience.responsibilities")}</h4>
                      <ul className="list-disc pl-5 mb-4 space-y-1">
                        {experience.responsibilities.map((responsibility, i) => (
                          <li key={i} className="text-sm text-muted-foreground">
                            {responsibility}
                          </li>
                        ))}
                      </ul>

                      <h4 className="font-medium mb-2">{t("experience.technologies")}</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

