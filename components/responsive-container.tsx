import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ResponsiveContainerProps {
  children: ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
  id?: string
}

export function ResponsiveContainer({ children, className, as: Component = "div", id }: ResponsiveContainerProps) {
  return (
    <Component id={id} className={cn("w-full px-4 sm:px-6 md:px-8 mx-auto max-w-[1400px]", className)}>
      {children}
    </Component>
  )
}

