import React from 'react'

interface BadgeProps {
  label: string
  color?: string
}

const Badge: React.FC<BadgeProps> = ({ label, color = 'bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/30' }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold ${color}`}>
    {label}
  </span>
)

export default Badge