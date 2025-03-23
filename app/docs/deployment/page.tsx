import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function DeploymentPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Documentação de Implantação</h1>
          <p className="text-muted-foreground">Aprenda como publicar seu portfólio no GitHub e na Vercel</p>
        </div>

        <Tabs defaultValue="github">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="github">GitHub</TabsTrigger>
            <TabsTrigger value="vercel">Vercel</TabsTrigger>
          </TabsList>

          <TabsContent value="github" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Publicando no GitHub</CardTitle>
                <CardDescription>Passo a passo para publicar seu portfólio no GitHub</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <h3 className="text-lg font-semibold">1. Preparação Inicial</h3>
                <div className="space-y-4">
                  <p>Antes de publicar seu projeto, certifique-se de que você tem:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Uma conta no GitHub (
                      <Link
                        href="https://github.com/signup"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        criar uma conta
                      </Link>
                      )
                    </li>
                    <li>
                      Git instalado em seu computador (
                      <Link
                        href="https://git-scm.com/downloads"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        download do Git
                      </Link>
                      )
                    </li>
                    <li>Seu projeto Next.js funcionando localmente</li>
                  </ul>
                </div>

                <h3 className="text-lg font-semibold">2. Criar um Repositório no GitHub</h3>
                <div className="space-y-4">
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>
                      Acesse{" "}
                      <Link
                        href="https://github.com/new"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        github.com/new
                      </Link>
                    </li>
                    <li>Dê um nome ao seu repositório (ex: "portfolio-nextjs")</li>
                    <li>Adicione uma descrição opcional (ex: "Meu portfólio pessoal construído com Next.js")</li>
                    <li>Escolha se o repositório será público ou privado</li>
                    <li>Deixe as opções de inicialização desmarcadas (sem README, .gitignore ou licença)</li>
                    <li>Clique em "Create repository"</li>
                  </ol>
                </div>

                <h3 className="text-lg font-semibold">3. Inicializar Git no Projeto</h3>
                <div className="space-y-4">
                  <p>Abra o terminal na pasta raiz do seu projeto e execute os seguintes comandos:</p>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>
                      {`# Inicializar o repositório Git
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Initial commit"`}
                    </code>
                  </pre>
                </div>

                <h3 className="text-lg font-semibold">4. Conectar ao Repositório Remoto</h3>
                <div className="space-y-4">
                  <p>
                    Substitua <code>SEU_USUARIO</code> e <code>NOME_DO_REPOSITORIO</code> pelos seus dados:
                  </p>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>
                      {`# Adicionar o repositório remoto
git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git

# Renomear a branch principal para main (padrão atual do GitHub)
git branch -M main

# Enviar os arquivos para o GitHub
git push -u origin main`}
                    </code>
                  </pre>
                </div>

                <h3 className="text-lg font-semibold">5. Atualizando o Projeto</h3>
                <div className="space-y-4">
                  <p>Sempre que fizer alterações no seu projeto, você pode enviá-las para o GitHub com:</p>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>
                      {`# Verificar quais arquivos foram alterados
git status

# Adicionar as alterações
git add .

# Fazer um commit com uma mensagem descritiva
git commit -m "Descrição das alterações"

# Enviar para o GitHub
git push`}
                    </code>
                  </pre>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Dica</AlertTitle>
                  <AlertDescription>
                    Certifique-se de que seu arquivo <code>.gitignore</code> está configurado corretamente para evitar o
                    envio de arquivos desnecessários como <code>node_modules</code>, <code>.env</code> e arquivos de
                    build.
                  </AlertDescription>
                </Alert>

                <h3 className="text-lg font-semibold">6. Arquivo .gitignore Recomendado</h3>
                <div className="space-y-4">
                  <p>
                    Certifique-se de que seu projeto tenha um arquivo <code>.gitignore</code> adequado para projetos
                    Next.js:
                  </p>
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vercel" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Implantando na Vercel</CardTitle>
                <CardDescription>Como implantar seu portfólio na plataforma Vercel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <h3 className="text-lg font-semibold">1. Preparação</h3>
                <div className="space-y-4">
                  <p>
                    A Vercel é a plataforma criada pelos desenvolvedores do Next.js e oferece a maneira mais fácil de
                    implantar aplicações Next.js. Antes de começar:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Certifique-se de que seu projeto está no GitHub (siga as instruções da aba GitHub)</li>
                    <li>
                      Crie uma conta na Vercel (
                      <Link
                        href="https://vercel.com/signup"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        vercel.com/signup
                      </Link>
                      )
                    </li>
                    <li>Recomendamos fazer login com sua conta do GitHub para facilitar a integração</li>
                  </ul>
                </div>

                <h3 className="text-lg font-semibold">2. Importar Projeto</h3>
                <div className="space-y-4">
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Após fazer login na Vercel, clique em "Add New..." e selecione "Project"</li>
                    <li>Na seção "Import Git Repository", você verá seus repositórios do GitHub</li>
                    <li>Encontre e selecione o repositório do seu portfólio</li>
                    <li>
                      Se não encontrar seu repositório, clique em "Configure GitHub App" para conceder acesso à Vercel
                    </li>
                  </ol>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Dica</AlertTitle>
                    <AlertDescription>
                      Se você fez login com GitHub, a Vercel automaticamente terá acesso aos seus repositórios. Caso
                      contrário, você precisará configurar a integração.
                    </AlertDescription>
                  </Alert>
                </div>

                <h3 className="text-lg font-semibold">3. Configurar Projeto</h3>
                <div className="space-y-4">
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>A Vercel detectará automaticamente que é um projeto Next.js</li>
                    <li>
                      Configure as variáveis de ambiente necessárias:
                      <ul className="list-disc pl-6 mt-2">
                        <li>
                          <code>GITHUB_TOKEN</code> - Seu token de acesso pessoal do GitHub (se estiver usando a API do
                          GitHub)
                        </li>
                        <li>
                          <code>GITHUB_USERNAME</code> - Seu nome de usuário do GitHub (se necessário)
                        </li>
                        <li>Quaisquer outras variáveis de ambiente que seu projeto utilize</li>
                      </ul>
                    </li>
                    <li>Mantenha as configurações padrão de build e clique em "Deploy"</li>
                  </ol>
                </div>

                <h3 className="text-lg font-semibold">4. Aguardar a Implantação</h3>
                <div className="space-y-4">
                  <p>
                    A Vercel irá construir e implantar seu projeto. Isso geralmente leva alguns minutos. Você pode
                    acompanhar o progresso na interface da Vercel.
                  </p>

                  <Alert variant="success">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Sucesso!</AlertTitle>
                    <AlertDescription>
                      Após a conclusão, a Vercel fornecerá um URL para seu site (geralmente no formato{" "}
                      <code>https://seu-projeto.vercel.app</code>). Seu portfólio agora está online!
                    </AlertDescription>
                  </Alert>
                </div>

                <h3 className="text-lg font-semibold">5. Configurar Domínio Personalizado (Opcional)</h3>
                <div className="space-y-4">
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>No painel do projeto na Vercel, vá para a aba "Domains"</li>
                    <li>Clique em "Add" e insira seu domínio personalizado</li>
                    <li>Siga as instruções para configurar os registros DNS</li>
                  </ol>

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Importante</AlertTitle>
                    <AlertDescription>
                      As alterações de DNS podem levar até 48 horas para se propagar, embora geralmente sejam muito mais
                      rápidas.
                    </AlertDescription>
                  </Alert>
                </div>

                <h3 className="text-lg font-semibold">6. Implantação Contínua</h3>
                <div className="space-y-4">
                  <p>Uma das melhores características da Vercel é a implantação contínua:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Cada vez que você fizer push para a branch principal no GitHub, a Vercel automaticamente
                      reimplantará seu site
                    </li>
                    <li>Para cada pull request, a Vercel criará uma implantação de pré-visualização</li>
                    <li>
                      Você pode compartilhar o link de pré-visualização para obter feedback antes de mesclar as
                      alterações
                    </li>
                  </ul>
                </div>

                <h3 className="text-lg font-semibold">7. Recursos Adicionais</h3>
                <div className="space-y-4">
                  <p>A Vercel oferece muitos recursos para otimizar seu site:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Analytics para monitorar o desempenho e uso</li>
                    <li>Integrações com serviços de CMS, bancos de dados e ferramentas de análise</li>
                    <li>Configurações avançadas de cache e otimização de imagens</li>
                    <li>Proteção com senha para projetos em desenvolvimento</li>
                  </ul>

                  <div className="flex justify-center mt-6">
                    <Link
                      href="https://vercel.com/docs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                      Consulte a documentação oficial da Vercel
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

