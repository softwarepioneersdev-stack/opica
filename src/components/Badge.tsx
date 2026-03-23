import React from 'react'

interface BadgeProps {
  label: string
  color: string
}

const Badge: React.FC<BadgeProps> = ({ label, color }) => {
  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap ${color}`}>
      {label}
    </span>
  )
}

export default Badge
