import { ReactNode } from 'react'

type cardProps = { children?: ReactNode; className?: string; gradient?: boolean }

const Card = ({ children, className }: cardProps) => (
  <div className={`${className} bg-surface rounded-2xl p-6 shadow-sm border border-border flex flex-col items-center text-center transition-colors`}>{children}</div>
)

const CardHeader = ({ children, className, gradient }: cardProps) => {
  const style = gradient ? 'bg-gradient-to-l from-primary to-primary-hover' : ''
  return <div className={`${className || ''} ${style}`}>{children}</div>
}

const CardContent = ({ children, className }: cardProps) => (
  <div className={`${className} flex flex-col gap-2 p-2`}>{children}</div>
)

const Actions = ({ children, className }: cardProps) => (
  <div className={`${className} flex justify-center flex-col md:flex-row m-0 gap-2`}>{children}</div>
)

export { Card, Actions, CardContent, CardHeader }
