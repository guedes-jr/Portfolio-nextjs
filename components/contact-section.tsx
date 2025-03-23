"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons"
import { MapPin, Phone, Send, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export function ContactSection() {
  const { t } = useLanguage()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de envio de formulário
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Aqui você adicionaria a lógica real de envio do formulário
    console.log("Form submitted:", formState)

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({
      name: "",
      email: "",
      subject: "",
      message: "",
    })

    // Reset do estado de sucesso após 5 segundos
    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
  }

  return (
    <div className="grid gap-6 md:gap-8 md:grid-cols-2">
      {/* Informações de contato */}
      <Card>
        <CardHeader>
          <CardTitle>{t("contact.info.title")}</CardTitle>
          <CardDescription>{t("contact.info.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">{t("contact.location")}</h3>
                <p className="text-sm text-muted-foreground">São Paulo, Brasil</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MailIcon className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">{t("contact.email")}</h3>
                <p className="text-sm text-muted-foreground">
                  <Link href="mailto:contact@example.com" className="hover:text-primary transition-colors">
                    contact@example.com
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">{t("contact.phone")}</h3>
                <p className="text-sm text-muted-foreground">+55 (11) 9xxxx-xxxx</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-medium mb-3">{t("contact.social")}</h3>
            <div className="flex gap-4">
              <Link
                href="https://github.com/guedes-jr"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-muted dark:bg-muted/30 p-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <GitHubIcon className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>

              <Link
                href="https://linkedin.com/in/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-muted dark:bg-muted/30 p-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <LinkedInIcon className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>

              <Link
                href="mailto:contact@example.com"
                className="bg-muted dark:bg-muted/30 p-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <MailIcon className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulário de contato */}
      <Card>
        <CardHeader>
          <CardTitle>{t("contact.form.title")}</CardTitle>
          <CardDescription>{t("contact.form.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-xl font-medium mb-2">{t("contact.form.success.title")}</h3>
              <p className="text-muted-foreground">{t("contact.form.success.text")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    {t("contact.form.name")}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={t("contact.form.name")}
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {t("contact.form.email")}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  {t("contact.form.subject")}
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder={t("contact.form.subject")}
                  value={formState.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  {t("contact.form.message")}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t("contact.form.message")}
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t("contact.form.sending")}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    {t("contact.form.send")}
                  </span>
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

