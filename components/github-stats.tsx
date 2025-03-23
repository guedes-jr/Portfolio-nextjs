import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GitHubIcon } from "@/components/icons"
import { getUser, getRepositories } from "@/lib/github"

export async function GitHubStats({ username }: { username: string }) {
  const user = await getUser(username)
  const repos = await getRepositories(username)

  // Calcular estatísticas
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0)
  const languages = repos
    .filter((repo) => repo.language)
    .reduce(
      (acc, repo) => {
        if (repo.language) {
          acc[repo.language] = (acc[repo.language] || 0) + 1
        }
        return acc
      },
      {} as Record<string, number>,
    )

  // Ordenar linguagens por frequência
  const topLanguages = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const stats = [
    { name: "Repositórios", value: user.public_repos },
    { name: "Seguidores", value: user.followers },
    { name: "Seguindo", value: user.following },
    { name: "Estrelas", value: totalStars },
    { name: "Forks", value: totalForks },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <GitHubIcon className="h-6 w-6" />
          <CardTitle>Estatísticas do GitHub</CardTitle>
        </div>
        <CardDescription>Resumo da atividade no GitHub</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="flex flex-col items-center justify-center rounded-lg border p-4 text-center"
            >
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.name}</span>
            </div>
          ))}
        </div>

        <div>
          <h4 className="mb-3 font-medium">Linguagens Mais Usadas</h4>
          <div className="space-y-2">
            {topLanguages.map(([language, count]) => (
              <div key={language} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span>{language}</span>
                  <span className="text-sm text-muted-foreground">{count} repos</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(count / repos.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

