import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

type Skill = {
  name: string
  icon: React.ReactNode
  level: number
}

type SkillCategory = {
  name: string
  skills: Skill[]
}

export function SkillsSection() {
  const skillCategories: SkillCategory[] = [
    {
      name: "Frontend",
      skills: [
        {
          name: "HTML",
          icon: (
            <div className="w-6 h-6 flex items-center justify-center text-orange-500 dark:text-teal-300 font-bold">
              H
            </div>
          ),
          level: 90,
        },
        {
          name: "CSS",
          icon: (
            <div className="w-6 h-6 flex items-center justify-center text-blue-500 dark:text-cyan-300 font-bold">C</div>
          ),
          level: 85,
        },
        {
          name: "JavaScript",
          icon: (
            <div className="w-6 h-6 flex items-center justify-center text-yellow-500 dark:text-emerald-300 font-bold">
              JS
            </div>
          ),
          level: 80,
        },
        {
          name: "React",
          icon: (
            <div className="w-6 h-6 flex items-center justify-center text-blue-400 dark:text-teal-300 font-bold">R</div>
          ),
          level: 75,
        },
        {
          name: "Next.js",
          icon: <div className="w-6 h-6 flex items-center justify-center text-black dark:text-white font-bold">N</div>,
          level: 70,
        },
      ],
    },
    {
      name: "Backend",
      skills: [
        {
          name: "Node.js",
          icon: <div className="w-6 h-6 flex items-center justify-center text-green-500 font-bold">N</div>,
          level: 75,
        },
        {
          name: "Express",
          icon: <div className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">E</div>,
          level: 70,
        },
        {
          name: "MongoDB",
          icon: <div className="w-6 h-6 flex items-center justify-center text-green-600 font-bold">M</div>,
          level: 65,
        },
      ],
    },
    {
      name: "Tools & Others",
      skills: [
        {
          name: "Git",
          icon: <div className="w-6 h-6 flex items-center justify-center text-orange-600 font-bold">G</div>,
          level: 80,
        },
        {
          name: "Figma",
          icon: <div className="w-6 h-6 flex items-center justify-center text-purple-500 font-bold">F</div>,
          level: 60,
        },
        {
          name: "Responsive Design",
          icon: <div className="w-6 h-6 flex items-center justify-center text-teal-500 font-bold">RD</div>,
          level: 85,
        },
      ],
    },
  ]

  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
      {skillCategories.map((category) => (
        <Card key={category.name} className="overflow-hidden">
          <div className="bg-primary p-4">
            <h3 className="text-lg font-semibold text-primary-foreground">{category.name}</h3>
          </div>
          <CardContent className="p-6">
            <div className="space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {skill.icon}
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

