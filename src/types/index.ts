export type PageName =
  | 'login'
  | 'signup'
  | 'complete-profile'
  | 'under-review'
  | 'home'
  | 'profile'
  | 'dashboard'

export interface Project {
  id: number
  name: string
  updated: string
  status: string
  statusColor: string
  icon: string
  iconBg: string
}

export interface Request {
  id: number
  user: string
  email: string
  initials: string
  project: string
  status: string
  statusColor: string
  priority: string
}

export interface StatItem {
  label: string
  value: string
}
