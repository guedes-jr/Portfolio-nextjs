"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "pt" | "en" | "es"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Traduções
const translations = {
  en: {
    // Header
    "nav.home": "Home",
    "nav.skills": "Skills",
    "nav.experience": "Experience",
    "nav.education": "Education",
    "nav.projects": "Projects",
    "nav.docs": "Docs",
    "nav.contact": "Contact",

    // Hero
    "hero.viewProjects": "View Projects",
    "hero.documentation": "Documentation",

    // About
    "about.title": "About Me",

    // Skills
    "skills.title": "Skills & Technologies",
    "skills.subtitle": "Technologies and tools I work with",

    // Experience
    "experience.title": "Work Experience",
    "experience.subtitle": "My professional journey",
    "experience.responsibilities": "Responsibilities:",
    "experience.technologies": "Technologies used:",

    // Education
    "education.title": "Education",
    "education.subtitle": "My academic journey and professional development",
    "education.tabs.all": "All",
    "education.tabs.academic": "Academic Education",
    "education.tabs.professional": "Professional Courses",
    "education.details": "Details:",
    "education.skills": "Skills acquired:",

    // Projects
    "projects.title": "Projects",
    "projects.subtitle": "Check out some of my recent projects directly from GitHub",
    "projects.viewProject": "View Project",
    "projects.noDescription": "No description provided",
    "projects.search": "Search projects",
    "projects.technologies": "Technologies",
    "projects.status": "Status",
    "projects.allStatuses": "All statuses",
    "projects.clearFilters": "Clear filters",
    "projects.activeFilters": "Active filters",
    "projects.details": "Details",
    "projects.features": "Features",
    "projects.lastUpdate": "Last update",
    "projects.viewRepository": "View Repository",
    "projects.viewDemo": "View Demo",
    "projects.noProjectsFound": "No projects found",
    "projects.tryDifferentFilters": "Try different filters or clear the current ones",
    "projects.viewAllProjects": "View all projects",

    // Contact
    "contact.title": "Contact Me",
    "contact.subtitle": "Have a project in mind or want to chat? I'm here to help.",
    "contact.info.title": "Contact Information",
    "contact.info.subtitle": "Various ways to get in touch with me",
    "contact.location": "Location",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.social": "Social Networks",
    "contact.form.title": "Send a Message",
    "contact.form.subtitle": "Fill out the form below to get in touch",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.subject": "Subject",
    "contact.form.message": "Message",
    "contact.form.send": "Send Message",
    "contact.form.sending": "Sending...",
    "contact.form.success.title": "Message Sent!",
    "contact.form.success.text": "Thank you for your message. I'll get back to you as soon as possible.",

    // Footer
    "footer.quickLinks": "Quick Links",
    "footer.technologies": "Technologies",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved.",
  },
  pt: {
    // Header
    "nav.home": "Início",
    "nav.skills": "Habilidades",
    "nav.experience": "Experiência",
    "nav.education": "Educação",
    "nav.projects": "Projetos",
    "nav.docs": "Documentação",
    "nav.contact": "Contato",

    // Hero
    "hero.viewProjects": "Ver Projetos",
    "hero.documentation": "Documentação",

    // About
    "about.title": "Sobre Mim",

    // Skills
    "skills.title": "Habilidades & Tecnologias",
    "skills.subtitle": "Tecnologias e ferramentas com as quais trabalho",

    // Experience
    "experience.title": "Experiência Profissional",
    "experience.subtitle": "Minha jornada profissional",
    "experience.responsibilities": "Responsabilidades:",
    "experience.technologies": "Tecnologias utilizadas:",

    // Education
    "education.title": "Educação",
    "education.subtitle": "Minha jornada acadêmica e desenvolvimento profissional",
    "education.tabs.all": "Todas",
    "education.tabs.academic": "Formação Acadêmica",
    "education.tabs.professional": "Cursos de Aperfeiçoamento",
    "education.details": "Detalhes:",
    "education.skills": "Competências adquiridas:",

    // Projects
    "projects.title": "Projetos",
    "projects.subtitle": "Confira alguns dos meus projetos recentes diretamente do GitHub",
    "projects.viewProject": "Ver Projeto",
    "projects.noDescription": "Sem descrição fornecida",
    "projects.search": "Buscar projetos",
    "projects.technologies": "Tecnologias",
    "projects.status": "Status",
    "projects.allStatuses": "Todos os status",
    "projects.clearFilters": "Limpar filtros",
    "projects.activeFilters": "Filtros ativos",
    "projects.details": "Detalhes",
    "projects.features": "Funcionalidades",
    "projects.lastUpdate": "Última atualização",
    "projects.viewRepository": "Ver Repositório",
    "projects.viewDemo": "Ver Demo",
    "projects.noProjectsFound": "Nenhum projeto encontrado",
    "projects.tryDifferentFilters": "Tente filtros diferentes ou limpe os atuais",
    "projects.viewAllProjects": "Ver todos os projetos",

    // Contact
    "contact.title": "Entre em Contato",
    "contact.subtitle": "Tem um projeto em mente ou quer conversar? Estou à disposição para ajudar.",
    "contact.info.title": "Informações de Contato",
    "contact.info.subtitle": "Várias formas de entrar em contato comigo",
    "contact.location": "Localização",
    "contact.email": "Email",
    "contact.phone": "Telefone",
    "contact.social": "Redes Sociais",
    "contact.form.title": "Envie uma Mensagem",
    "contact.form.subtitle": "Preencha o formulário abaixo para entrar em contato",
    "contact.form.name": "Nome",
    "contact.form.email": "Email",
    "contact.form.subject": "Assunto",
    "contact.form.message": "Mensagem",
    "contact.form.send": "Enviar Mensagem",
    "contact.form.sending": "Enviando...",
    "contact.form.success.title": "Mensagem Enviada!",
    "contact.form.success.text": "Obrigado pelo contato. Responderei o mais breve possível.",

    // Footer
    "footer.quickLinks": "Links Rápidos",
    "footer.technologies": "Tecnologias",
    "footer.contact": "Contato",
    "footer.rights": "Todos os direitos reservados.",
  },
  es: {
    // Header
    "nav.home": "Inicio",
    "nav.skills": "Habilidades",
    "nav.experience": "Experiencia",
    "nav.education": "Educación",
    "nav.projects": "Proyectos",
    "nav.docs": "Documentación",
    "nav.contact": "Contacto",

    // Hero
    "hero.viewProjects": "Ver Proyectos",
    "hero.documentation": "Documentación",

    // About
    "about.title": "Sobre Mí",

    // Skills
    "skills.title": "Habilidades y Tecnologías",
    "skills.subtitle": "Tecnologías y herramientas con las que trabajo",

    // Experience
    "experience.title": "Experiencia Laboral",
    "experience.subtitle": "Mi trayectoria profesional",
    "experience.responsibilities": "Responsabilidades:",
    "experience.technologies": "Tecnologías utilizadas:",

    // Education
    "education.title": "Educación",
    "education.subtitle": "Mi trayectoria académica y desarrollo profesional",
    "education.tabs.all": "Todas",
    "education.tabs.academic": "Formación Académica",
    "education.tabs.professional": "Cursos de Perfeccionamiento",
    "education.details": "Detalles:",
    "education.skills": "Competencias adquiridas:",

    // Projects
    "projects.title": "Proyectos",
    "projects.subtitle": "Mira algunos de mis proyectos recientes directamente desde GitHub",
    "projects.viewProject": "Ver Proyecto",
    "projects.noDescription": "Sin descripción proporcionada",
    "projects.search": "Buscar proyectos",
    "projects.technologies": "Tecnologías",
    "projects.status": "Estado",
    "projects.allStatuses": "Todos los estados",
    "projects.clearFilters": "Limpiar filtros",
    "projects.activeFilters": "Filtros activos",
    "projects.details": "Detalles",
    "projects.features": "Funcionalidades",
    "projects.lastUpdate": "Última actualización",
    "projects.viewRepository": "Ver Repositorio",
    "projects.viewDemo": "Ver Demo",
    "projects.noProjectsFound": "No se encontraron proyectos",
    "projects.tryDifferentFilters": "Prueba diferentes filtros o limpia los actuales",
    "projects.viewAllProjects": "Ver todos los proyectos",

    // Contact
    "contact.title": "Contáctame",
    "contact.subtitle": "¿Tienes un proyecto en mente o quieres charlar? Estoy aquí para ayudar.",
    "contact.info.title": "Información de Contacto",
    "contact.info.subtitle": "Varias formas de ponerse en contacto conmigo",
    "contact.location": "Ubicación",
    "contact.email": "Correo electrónico",
    "contact.phone": "Teléfono",
    "contact.social": "Redes Sociales",
    "contact.form.title": "Envía un Mensaje",
    "contact.form.subtitle": "Completa el formulario a continuación para ponerte en contacto",
    "contact.form.name": "Nombre",
    "contact.form.email": "Correo electrónico",
    "contact.form.subject": "Asunto",
    "contact.form.message": "Mensaje",
    "contact.form.send": "Enviar Mensaje",
    "contact.form.sending": "Enviando...",
    "contact.form.success.title": "¡Mensaje Enviado!",
    "contact.form.success.text": "Gracias por tu mensaje. Te responderé lo antes posible.",

    // Footer
    "footer.quickLinks": "Enlaces Rápidos",
    "footer.technologies": "Tecnologías",
    "footer.contact": "Contacto",
    "footer.rights": "Todos los derechos reservados.",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt")

  // Carregar idioma do localStorage no cliente
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["pt", "en", "es"].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  // Função de tradução
  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

