"use client"

import Link from "next/link"
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons"
import { useLanguage } from "@/contexts/language-context"
import { ResponsiveContainer } from "@/components/responsive-container"

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/40 dark:bg-gradient-to-t dark:from-gray-900 dark:to-gray-900/80 dark.teal-dark:from-gray-900 dark.teal-dark:to-teal-900/30 w-full">
      <ResponsiveContainer className="py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">João Guedes</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Desenvolvedor web especializado em criar experiências digitais modernas e de alta performance.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://github.com/guedes-jr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <GitHubIcon className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="mailto:contact@example.com" className="hover:text-primary transition-colors">
                <MailIcon className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
              <Link
                href="https://linkedin.com/in/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <LinkedInIcon className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/#skills" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("nav.skills")}
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("nav.experience")}
                </Link>
              </li>
              <li>
                <Link href="/#education" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("nav.education")}
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("nav.projects")}
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("nav.docs")}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">{t("footer.technologies")}</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">React</li>
              <li className="text-muted-foreground">Next.js</li>
              <li className="text-muted-foreground">TypeScript</li>
              <li className="text-muted-foreground">Tailwind CSS</li>
              <li className="text-muted-foreground">Node.js</li>
            </ul>
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">{t("footer.contact")}</h3>
            <address className="not-italic text-sm text-muted-foreground space-y-2">
              <p>São Paulo, Brasil</p>
              <p>
                <Link href="mailto:contact@example.com" className="hover:text-foreground transition-colors">
                  contact@example.com
                </Link>
              </p>
            </address>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {currentYear} João Guedes. {t("footer.rights")}
          </p>
        </div>
      </ResponsiveContainer>
    </footer>
  )
}

