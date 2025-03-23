"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

type Education = {
  degree: string
  institution: string
  period: string
  description: string
  details: string[]
  skills: string[]
  type: "academic" | "professional"
  logoUrl: string
}

export function EducationGrid() {
  const { t } = useLanguage()

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
      type: "academic",
      logoUrl: "/placeholder.svg?height=60&width=60",
    },
    {
      degree: "Mestrado em Engenharia de Software",
      institution: "Universidade Estadual",
      period: "2020 - 2022",
      description: "Especialização em metodologias ágeis, arquitetura de software e qualidade de código.",
      details: [
        "Dissertação sobre otimização de performance em aplicações React",
        "Publicação de artigo em conferência internacional",
        "Participação em grupo de pesquisa sobre DevOps",
      ],
      skills: ["Arquitetura de Software", "Metodologias Ágeis", "DevOps", "TDD", "CI/CD"],
      type: "academic",
      logoUrl: "/placeholder.svg?height=60&width=60",
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
      type: "academic",
      logoUrl: "/placeholder.svg?height=60&width=60",
    },
    {
      degree: "Certificação em Desenvolvimento Frontend",
      institution: "Plataforma Online",
      period: "Jan 2018 - Jun 2018",
      description: "Especialização em tecnologias frontend modernas como React, Redux e ferramentas de build.",
      details: [
        "Desenvolvimento de aplicações SPA com React e Redux",
        "Implementação de testes automatizados com Jest e Testing Library",
        "Otimização de performance em aplicações React",
      ],
      skills: ["React", "Redux", "Webpack", "Jest", "TypeScript"],
      type: "professional",
      logoUrl: "/placeholder.svg?height=60&width=60",
    },
    {
      degree: "Bootcamp de Desenvolvimento Full Stack",
      institution: "Escola de Programação",
      period: "Mar 2019 - Jul 2019",
      description: "Imersão intensiva em desenvolvimento full stack com foco em aplicações modernas.",
      details: [
        "Desenvolvimento de aplicação completa com autenticação e autorização",
        "Implementação de APIs RESTful com Node.js e Express",
        "Integração com serviços de terceiros e APIs externas",
      ],
      skills: ["Node.js", "Express", "MongoDB", "React", "Docker"],
      type: "professional",
      logoUrl: "/placeholder.svg?height=60&width=60",
    },
    {
      degree: "Curso de UX/UI Design",
      institution: "Design Academy",
      period: "Fev 2021 - Abr 2021",
      description: "Fundamentos de design de interface e experiência do usuário para desenvolvedores.",
      details: [
        "Criação de wireframes e protótipos no Figma",
        "Estudos de usabilidade e testes com usuários",
        "Princípios de design responsivo e acessibilidade",
      ],
      skills: ["Figma", "UI Design", "UX Research", "Prototyping", "Acessibilidade"],
      type: "professional",
      logoUrl: "/placeholder.svg?height=60&width=60",
    },
  ]

  const academicEducation = educations.filter((edu) => edu.type === "academic")
  const professionalEducation = educations.filter((edu) => edu.type === "professional")

  const EducationCard = ({ education, index }: { education: Education; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden border bg-muted dark:bg-muted/30 flex items-center justify-center">
                <Image
                  src={education.logoUrl || "/placeholder.svg"}
                  alt={`${education.institution} logo`}
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <div>
                <CardTitle className="text-lg">{education.degree}</CardTitle>
                <CardDescription>{education.institution}</CardDescription>
              </div>
            </div>
            <Badge
              variant="outline"
              className="text-sm font-medium whitespace-nowrap self-start sm:self-auto mt-2 sm:mt-0"
            >
              {education.period}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{education.description}</p>

          <div>
            <h4 className="font-medium mb-2">{t("education.details")}</h4>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              {education.details.map((detail, i) => (
                <li key={i} className="text-sm text-muted-foreground">
                  {detail}
                </li>
              ))}
            </ul>

            <h4 className="font-medium mb-2">{t("education.skills")}</h4>
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
  )

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="all">{t("education.tabs.all")}</TabsTrigger>
        <TabsTrigger value="academic">{t("education.tabs.academic")}</TabsTrigger>
        <TabsTrigger value="professional">{t("education.tabs.professional")}</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-0">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {educations.map((education, index) => (
            <EducationCard key={index} education={education} index={index} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="academic" className="mt-0">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {academicEducation.map((education, index) => (
            <EducationCard key={index} education={education} index={index} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="professional" className="mt-0">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {professionalEducation.map((education, index) => (
            <EducationCard key={index} education={education} index={index} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}

