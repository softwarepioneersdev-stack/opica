// ─── Page / Route names ───────────────────────────────────────────────────────
export type PageName =
  | '/'
  | 'signin'
  | 'signup'
  | 'Profile'
  | 'Admin'
  | 'messaging'
  | 'orders'
  | 'complete-profile'
  | 'under-review'

// ─── Data shapes ─────────────────────────────────────────────────────────────
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
