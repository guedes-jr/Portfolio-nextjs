import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Documentação do Portfólio</h1>
          <p className="text-muted-foreground">
            Guias e referências para personalizar e implantar seu portfólio Next.js
          </p>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="setup">Configuração</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="github">GitHub</TabsTrigger>
            <TabsTrigger value="vercel">Vercel</TabsTrigger>
            <TabsTrigger value="deployment">Implantação</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Visão Geral do Portfólio</CardTitle>
                <CardDescription>Entenda a estrutura e os recursos do seu portfólio Next.js</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Este portfólio foi construído com Next.js 14, utilizando o App Router e React Server Components para
                  oferecer uma experiência de usuário rápida e moderna. O projeto inclui:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Design responsivo com Tailwind CSS</li>
                  <li>Temas claro e escuro</li>
                  <li>Suporte para múltiplos idiomas (Português, Inglês e Espanhol)</li>
                  <li>Integração com a API do GitHub para exibir seus projetos</li>
                  <li>Seções personalizáveis para habilidades, experiência e educação</li>
                  <li>Formulário de contato</li>
                  <li>Animações e efeitos visuais</li>
                </ul>

                <div className="flex justify-end mt-4">
                  <Button asChild variant="outline">
                    <Link href="/docs/deployment" className="flex items-center gap-2">
                      Ver guia de implantação
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manter o conteúdo existente das outras abas */}
          <TabsContent value="setup" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Setting Up GitHub Integration</CardTitle>
                <CardDescription>Step-by-step guide to configure GitHub API access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold">1. Create a GitHub Personal Access Token</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Go to your GitHub account settings</li>
                  <li>Navigate to Developer Settings &gt; Personal Access Tokens &gt; Tokens (classic)</li>
                  <li>Click "Generate new token" and select "Generate new token (classic)"</li>
                  <li>Give your token a descriptive name</li>
                  <li>
                    Select the <code>public_repo</code> and <code>read:user</code> scopes
                  </li>
                  <li>Click "Generate token" and copy the token value</li>
                </ol>

                <h3 className="text-lg font-semibold mt-6">2. Add Environment Variables</h3>
                <p>
                  Create a <code>.env.local</code> file in your project root with:
                </p>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>
                    {`GITHUB_TOKEN=your_personal_access_token
GITHUB_USERNAME=your_github_username`}
                  </code>
                </pre>

                <h3 className="text-lg font-semibold mt-6">3. Deploy to Vercel</h3>
                <p>When deploying to Vercel, add these same environment variables in your project settings.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>API Reference</CardTitle>
                <CardDescription>Available GitHub API functions and usage examples</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold">Available Functions</h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium">getUser(username)</h4>
                    <p className="text-sm text-muted-foreground">Fetches a GitHub user's profile information</p>
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto mt-2">
                      <code>
                        {`// Example usage
import { getUser } from "@/lib/github"

export default async function Page() {
  const user = await getUser("guedes-jr")
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
      <img src={user.avatar_url || "/placeholder.svg"} alt={user.name} />
    </div>
  )
}`}
                      </code>
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-medium">getRepositories(username, options)</h4>
                    <p className="text-sm text-muted-foreground">
                      Fetches a user's repositories with optional filtering
                    </p>
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto mt-2">
                      <code>
                        {`// Example usage
import { getRepositories } from "@/lib/github"

export default async function Page() {
  // Get all non-forked repositories sorted by stars
  const repos = await getRepositories("guedes-jr", {
    sort: "stars",
    direction: "desc",
    per_page: 10,
    type: "owner"
  })
  
  return (
    <div>
      <h1>My Projects</h1>
      <ul>
        {repos.map(repo => (
          <li key={repo.id}>
            <h2>{repo.name}</h2>
            <p>{repo.description}</p>
            <span>Stars: {repo.stargazers_count}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}`}
                      </code>
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-medium">getRepository(username, repo)</h4>
                    <p className="text-sm text-muted-foreground">
                      Fetches detailed information about a specific repository
                    </p>
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto mt-2">
                      <code>
                        {`// Example usage
import { getRepository } from "@/lib/github"

export default async function Page() {
  const repo = await getRepository("guedes-jr", "Portfolio")
  
  return (
    <div>
      <h1>{repo.name}</h1>
      <p>{repo.description}</p>
      <div>
        <span>Stars: {repo.stargazers_count}</span>
        <span>Forks: {repo.forks_count}</span>
        <span>Language: {repo.language}</span>
      </div>
    </div>
  )
}`}
                      </code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="github" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Publicando no GitHub</CardTitle>
                <CardDescription>Como publicar seu portfólio no GitHub</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold">1. Crie um repositório no GitHub</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    Acesse{" "}
                    <a
                      href="https://github.com/new"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      github.com/new
                    </a>
                  </li>
                  <li>Dê um nome ao seu repositório (ex: "portfolio-nextjs")</li>
                  <li>Adicione uma descrição opcional (ex: "Meu portfólio pessoal construído com Next.js")</li>
                  <li>Escolha se o repositório será público ou privado</li>
                  <li>Clique em "Create repository"</li>
                </ol>

                <h3 className="text-lg font-semibold mt-6">2. Inicialize o Git no seu projeto local</h3>
                <p>Abra o terminal na pasta do seu projeto e execute:</p>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>
                    {`git init
git add .
git commit -m "Initial commit"`}
                  </code>
                </pre>

                <h3 className="text-lg font-semibold mt-6">3. Conecte seu repositório local ao GitHub</h3>
                <p>
                  Execute os seguintes comandos, substituindo YOUR_USERNAME pelo seu nome de usuário do GitHub e
                  REPO_NAME pelo nome do repositório que você criou:
                </p>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>
                    {`git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main`}
                  </code>
                </pre>

                <h3 className="text-lg font-semibold mt-6">4. Atualizando seu repositório</h3>
                <p>Sempre que fizer alterações no seu projeto, você pode enviá-las para o GitHub com:</p>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>
                    {`git add .
git commit -m "Descrição das alterações"
git push`}
                  </code>
                </pre>

                <h3 className="text-lg font-semibold mt-6">5. Configurando o arquivo .gitignore</h3>
                <p>Certifique-se de que seu projeto tenha um arquivo .gitignore adequado para projetos Next.js:</p>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>
                    {`# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts`}
                  </code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vercel" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Implantando na Vercel</CardTitle>
                <CardDescription>Como publicar seu portfólio na plataforma Vercel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold">1. Crie uma conta na Vercel</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    Acesse{" "}
                    <a
                      href="https://vercel.com/signup"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      vercel.com/signup
                    </a>
                  </li>
                  <li>Recomendamos fazer login com sua conta do GitHub para facilitar a integração</li>
                  <li>Siga as instruções para concluir o cadastro</li>
                </ol>

                <h3 className="text-lg font-semibold mt-6">2. Importe seu repositório</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>No dashboard da Vercel, clique em "Add New..." e selecione "Project"</li>
                  <li>Selecione o repositório do seu portfólio na lista de repositórios</li>
                  <li>
                    Se não encontrar seu repositório, pode ser necessário configurar a integração do GitHub com a Vercel
                  </li>
                </ol>

                <h3 className="text-lg font-semibold mt-6">3. Configure o projeto</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>A Vercel detectará automaticamente que é um projeto Next.js</li>
                  <li>
                    Adicione as variáveis de ambiente necessárias:
                    <ul className="list-disc pl-6 mt-2">
                      <li>
                        <code>GITHUB_TOKEN</code> - Seu token de acesso pessoal do GitHub
                      </li>
                      <li>
                        <code>GITHUB_USERNAME</code> - Seu nome de usuário do GitHub
                      </li>
                    </ul>
                  </li>
                  <li>Mantenha as configurações padrão de build e clique em "Deploy"</li>
                </ol>

                <h3 className="text-lg font-semibold mt-6">4. Aguarde a implantação</h3>
                <p>A Vercel irá construir e implantar seu projeto. Isso geralmente leva alguns minutos.</p>

                <h3 className="text-lg font-semibold mt-6">5. Configurando um domínio personalizado (opcional)</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>No painel do projeto, vá para a aba "Domains"</li>
                  <li>Clique em "Add" e insira seu domínio personalizado</li>
                  <li>Siga as instruções para configurar os registros DNS</li>
                </ol>

                <h3 className="text-lg font-semibold mt-6">6. Implantação contínua</h3>
                <p>
                  A Vercel configurará automaticamente a implantação contínua. Sempre que você enviar alterações para o
                  branch principal do seu repositório no GitHub, a Vercel irá automaticamente reconstruir e reimplantar
                  seu site.
                </p>

                <h3 className="text-lg font-semibold mt-6">7. Visualizações de pré-visualização</h3>
                <p>
                  A Vercel também criará implantações de pré-visualização para cada pull request que você criar,
                  permitindo que você teste as alterações antes de mesclar com o branch principal.
                </p>

                <div className="bg-muted/50 p-4 rounded-md mt-6">
                  <h4 className="font-medium">Dica</h4>
                  <p className="text-sm">Para otimizar o desempenho do seu portfólio, a Vercel oferece:</p>
                  <ul className="list-disc pl-6 mt-2 text-sm">
                    <li>CDN global para entrega rápida</li>
                    <li>Otimização automática de imagens</li>
                    <li>Edge Functions para APIs rápidas</li>
                    <li>Analytics para monitorar o desempenho</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deployment" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Guia de Implantação</CardTitle>
                <CardDescription>Aprenda a publicar seu portfólio online</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Temos um guia detalhado sobre como implantar seu portfólio no GitHub e na Vercel, incluindo:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Configuração do repositório no GitHub</li>
                  <li>Comandos Git essenciais</li>
                  <li>Passo a passo para implantação na Vercel</li>
                  <li>Configuração de domínio personalizado</li>
                  <li>Implantação contínua e atualizações</li>
                </ul>

                <div className="flex justify-center mt-6">
                  <Button asChild>
                    <Link href="/docs/deployment" className="flex items-center gap-2">
                      Ver guia completo de implantação
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

