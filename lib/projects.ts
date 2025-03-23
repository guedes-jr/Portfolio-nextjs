import fs from "fs"
import path from "path"
import type { Project } from "@/types/project"

// Função para buscar recursivamente arquivos em um diretório
function findFilesRecursively(dir: string, fileName: string): string[] {
  let results: string[] = []

  try {
    const items = fs.readdirSync(dir)

    for (const item of items) {
      const itemPath = path.join(dir, item)
      const stat = fs.statSync(itemPath)

      if (stat.isDirectory()) {
        // Recursivamente buscar em subdiretórios
        results = results.concat(findFilesRecursively(itemPath, fileName))
      } else if (item === fileName) {
        // Encontrou um arquivo com o nome desejado
        results.push(itemPath)
      }
    }
  } catch (error) {
    console.error(`Erro ao acessar diretório ${dir}:`, error)
  }

  return results
}

export async function getProjects(): Promise<Project[]> {
  const projects: Project[] = []
  const publicDir = path.join(process.cwd(), "public")

  try {
    // Buscar todos os arquivos portfolio_project.json
    const projectFiles = findFilesRecursively(publicDir, "portfolio_project.json")

    // Ler e analisar cada arquivo
    for (const filePath of projectFiles) {
      try {
        const fileContent = fs.readFileSync(filePath, "utf8")
        const projectData = JSON.parse(fileContent) as Project
        projects.push(projectData)
      } catch (error) {
        console.error(`Erro ao ler arquivo ${filePath}:`, error)
      }
    }

    // Ordenar projetos pela data de atualização (mais recentes primeiro)
    return projects.sort((a, b) => {
      return new Date(b.last_update).getTime() - new Date(a.last_update).getTime()
    })
  } catch (error) {
    console.error("Erro ao buscar projetos:", error)
    return []
  }
}

// Função para obter todas as tecnologias únicas de todos os projetos
export async function getUniqueTechnologies(): Promise<string[]> {
  const projects = await getProjects()
  const technologiesSet = new Set<string>()

  projects.forEach((project) => {
    project.technologies.forEach((tech) => {
      technologiesSet.add(tech)
    })
  })

  return Array.from(technologiesSet).sort()
}

// Função para obter todos os status únicos
export async function getUniqueStatuses(): Promise<string[]> {
  const projects = await getProjects()
  const statusSet = new Set<string>()

  projects.forEach((project) => {
    statusSet.add(project.status)
  })

  return Array.from(statusSet).sort()
}

