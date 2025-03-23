"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Filter, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface ProjectFiltersProps {
  technologies: string[]
  statuses: string[]
  onFilterChange: (filters: {
    search: string
    technologies: string[]
    status: string | null
  }) => void
}

export function ProjectFilters({ technologies, statuses, onFilterChange }: ProjectFiltersProps) {
  const { t } = useLanguage()
  const [search, setSearch] = useState("")
  const [selectedTechs, setSelectedTechs] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value
    setSearch(newSearch)
    onFilterChange({ search: newSearch, technologies: selectedTechs, status: selectedStatus })
  }

  const handleTechToggle = (tech: string) => {
    const newSelectedTechs = selectedTechs.includes(tech)
      ? selectedTechs.filter((t) => t !== tech)
      : [...selectedTechs, tech]

    setSelectedTechs(newSelectedTechs)
    onFilterChange({ search, technologies: newSelectedTechs, status: selectedStatus })
  }

  const handleStatusChange = (status: string | null) => {
    setSelectedStatus(status)
    onFilterChange({ search, technologies: selectedTechs, status })
  }

  const clearFilters = () => {
    setSearch("")
    setSelectedTechs([])
    setSelectedStatus(null)
    onFilterChange({ search: "", technologies: [], status: null })
  }

  const hasActiveFilters = search || selectedTechs.length > 0 || selectedStatus

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder={t("projects.search")} value={search} onChange={handleSearchChange} className="pl-9" />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                {t("projects.technologies")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 max-h-80 overflow-y-auto">
              {technologies.map((tech) => (
                <DropdownMenuCheckboxItem
                  key={tech}
                  checked={selectedTechs.includes(tech)}
                  onCheckedChange={() => handleTechToggle(tech)}
                >
                  {tech}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                {t("projects.status")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuCheckboxItem
                checked={selectedStatus === null}
                onCheckedChange={() => handleStatusChange(null)}
              >
                {t("projects.allStatuses")}
              </DropdownMenuCheckboxItem>
              {statuses.map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={selectedStatus === status}
                  onCheckedChange={() => handleStatusChange(status)}
                >
                  {status}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearFilters} className="flex items-center gap-2">
              <X className="h-4 w-4" />
              {t("projects.clearFilters")}
            </Button>
          )}
        </div>
      </div>

      {/* Mostrar filtros ativos */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          <Label className="text-sm text-muted-foreground">{t("projects.activeFilters")}:</Label>

          {search && (
            <Badge variant="outline" className="flex items-center gap-1">
              {t("projects.search")}: {search}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setSearch("")
                  onFilterChange({ search: "", technologies: selectedTechs, status: selectedStatus })
                }}
              />
            </Badge>
          )}

          {selectedTechs.map((tech) => (
            <Badge key={tech} variant="outline" className="flex items-center gap-1">
              {tech}
              <X className="h-3 w-3 cursor-pointer" onClick={() => handleTechToggle(tech)} />
            </Badge>
          ))}

          {selectedStatus && (
            <Badge variant="outline" className="flex items-center gap-1">
              {selectedStatus}
              <X className="h-3 w-3 cursor-pointer" onClick={() => handleStatusChange(null)} />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}

