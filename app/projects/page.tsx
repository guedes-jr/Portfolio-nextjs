import { Suspense } from "react"
import { getProjects, getUniqueTechnologies, getUniqueStatuses } from "@/lib/projects"
import { ProjectsSection } from "@/components/projects-section"
import { ResponsiveContainer } from "@/components/responsive-container"

export const dynamic = "force-dynamic" // Garantir que a página seja renderizada dinamicamente

export default async function ProjectsPage() {
  const projects = await getProjects()
  const technologies = await getUniqueTechnologies()
  const statuses = await getUniqueStatuses()

  return (
    <main className="flex-1 py-12 md:py-24">
      <ResponsiveContainer>
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meus Projetos</h1>
          <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Confira meus projetos mais recentes, incluindo trabalhos pessoais e profissionais.
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-12">Carregando projetos...</div>}>
          <ProjectsSection initialProjects={projects} technologies={technologies} statuses={statuses} />
        </Suspense>
      </ResponsiveContainer>
    </main>
  )
}

