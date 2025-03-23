type GitHubUser = {
  login: string
  id: number
  avatar_url: string
  html_url: string
  name: string
  company: string | null
  blog: string
  location: string | null
  email: string | null
  bio: string
  public_repos: number
  followers: number
  following: number
}

type GitHubRepo = {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  fork: boolean
  created_at: string
  updated_at: string
  pushed_at: string
  homepage: string | null
  size: number
  stargazers_count: number
  watchers_count: number
  language: string | null
  forks_count: number
  archived: boolean
  disabled: boolean
  open_issues_count: number
  license: {
    key: string
    name: string
    url: string
  } | null
  topics: string[]
  visibility: string
  forks: number
  watchers: number
  default_branch: string
}

type RepoOptions = {
  sort?: "created" | "updated" | "pushed" | "full_name" | "stars"
  direction?: "asc" | "desc"
  per_page?: number
  page?: number
  type?: "all" | "owner" | "member"
}

const GITHUB_API_URL = "https://api.github.com"
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "guedes-jr"

const headers = GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {}

/**
 * Fetches a GitHub user's profile information
 */
export async function getUser(username: string): Promise<GitHubUser> {
  const response = await fetch(`${GITHUB_API_URL}/users/${username}`, {
    headers,
    next: { revalidate: 3600 }, // Revalidate every hour
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Fetches a user's repositories with optional filtering
 */
export async function getRepositories(username: string, options: RepoOptions = {}): Promise<GitHubRepo[]> {
  const { sort = "pushed", direction = "desc", per_page = 100, page = 1, type = "owner" } = options

  const queryParams = new URLSearchParams({
    sort,
    direction,
    per_page: per_page.toString(),
    page: page.toString(),
    type,
  })

  const response = await fetch(`${GITHUB_API_URL}/users/${username}/repos?${queryParams}`, {
    headers,
    next: { revalidate: 3600 }, // Revalidate every hour
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch repositories: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Fetches detailed information about a specific repository
 */
export async function getRepository(username: string, repo: string): Promise<GitHubRepo> {
  const response = await fetch(`${GITHUB_API_URL}/repos/${username}/${repo}`, {
    headers,
    next: { revalidate: 3600 }, // Revalidate every hour
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch repository: ${response.statusText}`)
  }

  return response.json()
}

