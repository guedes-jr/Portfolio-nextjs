"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GitHubIcon } from "@/components/icons"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"

type GitHubStats = {
  publicRepos: number
  followers: number
  following: number
  stars: number
  forks: number
  languages: Array<[string, number]>
}

export function GitHubStatsClient({ username }: { username: string }) {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    // Simulated data - in a real app, you would fetch this from an API
    const mockStats: GitHubStats = {
      publicRepos: 12,
      followers: 45,
      following: 32,
      stars: 78,
      forks: 23,
      languages: [
        ["JavaScript", 8],
        ["TypeScript", 6],
        ["HTML", 4],
        ["CSS", 3],
        ["Python", 2],
      ],
    }

    // Simulate API call
    setTimeout(() => {
      setStats(mockStats)
      setLoading(false)
    }, 1000)
  }, [username])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <GitHubIcon className="h-6 w-6" />
            <CardTitle>GitHub Stats</CardTitle>
          </div>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (!stats) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <GitHubIcon className="h-6 w-6" />
            <CardTitle>GitHub Stats</CardTitle>
          </div>
          <CardDescription>Failed to load GitHub stats</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const statItems = [
    { name: "Repositories", value: stats.publicRepos },
    { name: "Followers", value: stats.followers },
    { name: "Following", value: stats.following },
    { name: "Stars", value: stats.stars },
    { name: "Forks", value: stats.forks },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <GitHubIcon className="h-6 w-6" />
          <CardTitle>GitHub Stats</CardTitle>
        </div>
        <CardDescription>Summary of GitHub activity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {statItems.map((stat) => (
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
          <h4 className="mb-3 font-medium">Most Used Languages</h4>
          <div className="space-y-2">
            {stats.languages.map(([language, count]) => (
              <div key={language} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span>{language}</span>
                  <span className="text-sm text-muted-foreground">{count} repos</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(count / stats.languages.reduce((sum, [, c]) => sum + c, 0)) * 100}%` }}
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

