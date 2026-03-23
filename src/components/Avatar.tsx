import React from 'react'

interface AvatarProps {
  initials: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
}

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-16 h-16 text-xl',
  xl: 'w-20 h-20 text-2xl',
}

const Avatar: React.FC<AvatarProps> = ({
  initials,
  size = 'md',
  color = 'bg-gradient-to-br from-blue-500 to-blue-700',
}) => {
  return (
    <div
      className={`${sizeMap[size]} ${color} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}
    >
      {initials}
    </div>
  )
}

export default Avatar
