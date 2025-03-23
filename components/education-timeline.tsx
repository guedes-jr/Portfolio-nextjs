"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Education = {
  degree: string
  institution: string
  period: string
  description: string
  details: string[]
  skills: string[]
}

export function EducationTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const educations: Education[] = [
    {
      degree: "Bacharelado em Ciência da Computação",
      institution: "Universidade Federal",
      period: "2016 - 2020",
      description:
        "Formação em fundamentos da computação, algoritmos, estruturas de dados, desenvolvimento web e mobile.",
      details: [
        "Projeto de conclusão de curso focado em desenvolvimento de aplicações web com React e Node.js",
        "Participação em projetos de pesquisa em inteligência artificial",
        "Monitor da disciplina de Estruturas de Dados por 2 semestres",
      ],
      skills: ["Algoritmos", "Estruturas de Dados", "Java", "Python", "Banco de Dados"],
    },
    {
      degree: "Curso Técnico em Desenvolvimento Web",
      institution: "Instituto Técnico",
      period: "2015 - 2016",
      description: "Formação técnica em desenvolvimento web, incluindo HTML, CSS, JavaScript e PHP.",
      details: [
        "Desenvolvimento de projetos práticos para clientes reais",
        "Participação em hackathon de desenvolvimento web",
        "Estágio em empresa de desenvolvimento de software",
      ],
      skills: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    },
    {
      degree: "Certificação em Desenvolvimento Frontend",
      institution: "Plataforma Online",
      period: "2018",
      description: "Especialização em tecnologias frontend modernas como React, Redux e ferramentas de build.",
      details: [
        "Desenvolvimento de aplicações SPA com React e Redux",
        "Implementação de testes automatizados com Jest e Testing Library",
        "Otimização de performance em aplicações React",
      ],
      skills: ["React", "Redux", "Webpack", "Jest", "TypeScript"],
    },
    {
      degree: "Bootcamp de Desenvolvimento Full Stack",
      institution: "Escola de Programação",
      period: "2019",
      description: "Imersão intensiva em desenvolvimento full stack com foco em aplicações modernas.",
      details: [
        "Desenvolvimento de aplicação completa com autenticação e autorização",
        "Implementação de APIs RESTful com Node.js e Express",
        "Integração com serviços de terceiros e APIs externas",
      ],
      skills: ["Node.js", "Express", "MongoDB", "React", "Docker"],
    },
  ]

  return (
    <div className="relative">
      {/* Linha central da timeline */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary via-primary to-muted" />

      <div className="space-y-12">
        {educations.map((education, index) => (
          <div key={index} className="relative">
            {/* Ponto central na linha */}
            <div className="absolute left-1/2 top-6 h-4 w-4 -translate-x-1/2 rounded-full bg-primary border-2 border-background z-10" />

            {/* Card - alterna entre esquerdo e direito */}
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
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{education.degree}</CardTitle>
                        <CardDescription>{education.institution}</CardDescription>
                      </div>
                      <Badge variant="outline" className="text-sm font-medium">
                        {education.period}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-2">{education.description}</p>

                    {/* Expanded content */}
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        expandedIndex === index ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0",
                      )}
                    >
                      <h4 className="font-medium mb-2">Detalhes:</h4>
                      <ul className="list-disc pl-5 mb-4 space-y-1">
                        {education.details.map((detail, i) => (
                          <li key={i} className="text-sm text-muted-foreground">
                            {detail}
                          </li>
                        ))}
                      </ul>

                      <h4 className="font-medium mb-2">Competências adquiridas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {education.skills.map((skill) => (
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

