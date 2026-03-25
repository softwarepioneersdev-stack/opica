import React from 'react'

interface InputProps {
  label?: string; type?: string; placeholder?: string
  icon?: React.ReactNode; rightIcon?: React.ReactNode
  value?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; defaultValue?: string
}

const Input: React.FC<InputProps> = ({ label, type = 'text', placeholder, icon, rightIcon, value, onChange, defaultValue }) => (
  <div className="flex flex-col gap-1.5">
    {label && <label className="text-sm font-medium text-content-primary">{label}</label>}
    <div className="relative">
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-content-muted text-sm pointer-events-none">{icon}</span>}
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} defaultValue={defaultValue}
        className={`w-full bg-surface-raised border border-border rounded-xl py-3 text-sm text-content-primary placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all ${icon ? 'pl-10' : 'pl-4'} ${rightIcon ? 'pr-10' : 'pr-4'}`} />
      {rightIcon && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted text-sm cursor-pointer">{rightIcon}</span>}
    </div>
  </div>
)

export default Input
