import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Education = {
  degree: string
  institution: string
  period: string
  description: string
}

export function EducationSection() {
  const educations: Education[] = [
    {
      degree: "Bacharelado em Ciência da Computação",
      institution: "Universidade Federal",
      period: "2016 - 2020",
      description:
        "Formação em fundamentos da computação, algoritmos, estruturas de dados, desenvolvimento web e mobile.",
    },
    {
      degree: "Curso Técnico em Desenvolvimento Web",
      institution: "Instituto Técnico",
      period: "2015 - 2016",
      description: "Formação técnica em desenvolvimento web, incluindo HTML, CSS, JavaScript e PHP.",
    },
    {
      degree: "Certificação em Desenvolvimento Frontend",
      institution: "Plataforma Online",
      period: "2018",
      description: "Especialização em tecnologias frontend modernas como React, Redux e ferramentas de build.",
    },
  ]

  return (
    <div className="space-y-6">
      {educations.map((edu, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{edu.degree}</CardTitle>
                <CardDescription>{edu.institution}</CardDescription>
              </div>
              <Badge variant="outline" className="text-sm font-medium">
                {edu.period}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{edu.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

