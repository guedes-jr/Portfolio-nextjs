"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/project-card"
import { ProjectFilters } from "@/components/project-filters"
import { ProjectDetailsDialog } from "@/components/project-details-dialog"
import { useLanguage } from "@/contexts/language-context"
import type { Project } from "@/types/project"

interface ProjectsSectionProps {
  initialProjects: Project[]
  technologies: string[]
  statuses: string[]
}

export function ProjectsSection({ initialProjects, technologies, statuses }: ProjectsSectionProps) {
  const { t } = useLanguage()
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleFilterChange = (filters: {
    search: string
    technologies: string[]
    status: string | null
  }) => {
    let filteredProjects = initialProjects

    // Filtrar por pesquisa
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredProjects = filteredProjects.filter(
        (project) =>
          project.name.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.technologies.some((tech) => tech.toLowerCase().includes(searchLower)),
      )
    }

    // Filtrar por tecnologias
    if (filters.technologies.length > 0) {
      filteredProjects = filteredProjects.filter((project) =>
        filters.technologies.some((tech) => project.technologies.includes(tech)),
      )
    }

    // Filtrar por status
    if (filters.status) {
      filteredProjects = filteredProjects.filter((project) => project.status === filters.status)
    }

    setProjects(filteredProjects)
  }

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-8">
      <ProjectFilters technologies={technologies} statuses={statuses} onFilterChange={handleFilterChange} />

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">{t("projects.noProjectsFound")}</h3>
          <p className="text-muted-foreground">{t("projects.tryDifferentFilters")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} onClick={() => handleProjectClick(project)} />
          ))}
        </div>
      )}

      <ProjectDetailsDialog project={selectedProject} open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  )
}

