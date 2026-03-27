export type NavKey = 'dashboard' | 'inventory' | 'analytics' | 'staff' | 'logs' | 'security' | 'settings'

export type TrendDirection = 'up' | 'down'
export type FeedType = 'warn' | 'ok' | 'info'
export type FeedAction = 'block' | 'view' | null

export interface MetricCard {
  title: string
  curr: string
  val: string
  sub: string
  percent: string
  trend: TrendDirection
  color: string
  bg: string
  icon: string
}

export interface ChartPoint {
  date: string
  value: number
}

export interface SecurityEvent {
  type: FeedType
  icon: string
  title: string
  meta: string
  action: FeedAction
}

export interface StaffMember {
  initials: string
  name: string
  role: string
  online: boolean
  color: string
}

export interface Request {
  id: string | number
  project: string
  user: string
  priority: string
  status: string
  statusColor?: string
  email?: string
}