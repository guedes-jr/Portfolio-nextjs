export type ProjectAuthor = {
  name: string
  github: string
  linkedin: string
}

export type Project = {
  name: string
  description: string
  technologies: string[]
  repository: string
  demo?: string
  status: string
  features: string[]
  image: string
  author: ProjectAuthor
  last_update: string
}

