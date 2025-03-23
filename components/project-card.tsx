"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github, Calendar } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { Project } from "@/types/project"

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { t } = useLanguage()
  const lastUpdateDate = new Date(project.last_update)

  // Formatar a data de atualização
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(lastUpdateDate)

  return (
    <Card className="flex flex-col overflow-hidden h-full transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg?height=200&width=400&text=Sem+Imagem"}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            {project.status}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-xl line-clamp-1">{project.name}</CardTitle>
        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-2">
        <div className="flex flex-wrap gap-1 mb-4">
          {project.technologies.slice(0, 5).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 5 && (
            <Badge variant="outline" className="text-xs">
              +{project.technologies.length - 5}
            </Badge>
          )}
        </div>

        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Calendar className="mr-1 h-4 w-4" />
          {formattedDate}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3 mt-auto">
        <Button variant="ghost" size="sm" asChild>
          <Link href={project.repository} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
            <Github className="h-4 w-4" />
            GitHub
          </Link>
        </Button>

        <div className="flex gap-2">
          {project.demo && (
            <Button variant="outline" size="sm" asChild>
              <Link href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                <ExternalLink className="h-4 w-4" />
                Demo
              </Link>
            </Button>
          )}

          <Button size="sm" onClick={onClick}>
            {t("projects.details")}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

