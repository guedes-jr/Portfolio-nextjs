import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Experience = {
  title: string
  company: string
  period: string
  description: string
  skills: string[]
}

export function ExperienceSection() {
  const experiences: Experience[] = [
    {
      title: "Frontend Developer",
      company: "Tech Company",
      period: "2021 - Present",
      description:
        "Desenvolvendo interfaces modernas e responsivas utilizando React e Next.js. Implementação de designs do Figma para código, otimização de performance e SEO.",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "Web Developer",
      company: "Digital Agency",
      period: "2019 - 2021",
      description:
        "Criação de websites e landing pages para diversos clientes. Desenvolvimento de soluções personalizadas e integração com APIs de terceiros.",
      skills: ["HTML", "CSS", "JavaScript", "WordPress"],
    },
    {
      title: "Freelance Developer",
      company: "Self-employed",
      period: "2018 - 2019",
      description:
        "Desenvolvimento de projetos para clientes como freelancer, incluindo websites, sistemas de gerenciamento e lojas virtuais.",
      skills: ["HTML", "CSS", "JavaScript", "PHP"],
    },
  ]

  return (
    <div className="space-y-3">
      {" "}
      {/* Reduzido de space-y-6 para space-y-3 */}
      {experiences.map((exp, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="pb-2 pt-4">
            {" "}
            {/* Reduzido o padding vertical */}
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{exp.title}</CardTitle>
                <CardDescription>{exp.company}</CardDescription>
              </div>
              <Badge variant="outline" className="text-sm font-medium">
                {exp.period}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pb-4">
            {" "}
            {/* Reduzido o padding e o espaçamento */}
            <p className="text-muted-foreground">{exp.description}</p>
            <div className="flex flex-wrap gap-2">
              {exp.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

