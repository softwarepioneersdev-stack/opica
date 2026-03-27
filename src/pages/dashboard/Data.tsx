import type { MetricCard, ChartPoint, SecurityEvent, StaffMember, Request } from './Types'

export const staffMembers: StaffMember[] = [
  { initials: 'EV', name: 'Elena Vance',   role: 'Lead Engineer',  online: true,  color: 'bg-gradient-to-br from-indigo-500 to-indigo-400' },
  { initials: 'MT', name: 'Marcus Thorne', role: 'DevOps Analyst', online: true,  color: 'bg-gradient-to-br from-sky-500 to-sky-400'     },
  { initials: 'SC', name: 'Sarah Connor',  role: 'QA Architect',   online: false, color: 'bg-gradient-to-br from-pink-500 to-pink-400'    },
  { initials: 'JD', name: 'James Doe',     role: 'Security Ops',   online: true,  color: 'bg-gradient-to-br from-emerald-500 to-emerald-400' },
]

export const securityFeed: SecurityEvent[] = [
  { type: 'warn', icon: '⚠️', title: 'Admin login from unauthorized IP',   meta: '2 minutes ago • San Francisco, CA', action: 'block' },
  { type: 'ok',   icon: '✓',  title: 'Daily backup completed successfully', meta: '1 hour ago • System Duty',           action: null  },
  { type: 'info', icon: '🔄', title: 'System version 2.4.0 deployed',       meta: '3 hours ago • Automated Bot',        action: null  },
  { type: 'ok',   icon: '✓',  title: 'Firewall rules updated',              meta: '5 hours ago • Security Admin',       action: null  },
  { type: 'warn', icon: '⚠️', title: 'High CPU utilization detected',       meta: '12 hours ago • Server 04',           action: 'view' },
]

export const chartData: ChartPoint[] = [
  { date: 'Mon', value: 400 },
  { date: 'Tue', value: 300 },
  { date: 'Wed', value: 550 },
  { date: 'Thu', value: 450 },
  { date: 'Fri', value: 700 },
  { date: 'Sat', value: 650 },
  { date: 'Sun', value: 900 },
]

export const metricCards: MetricCard[] = [
  {
    title: 'Total Revenue',
    curr: '$', val: '2,485', sub: '.00',
    percent: '+14.5%', trend: 'up',
    color: 'text-emerald-400', bg: 'bg-emerald-400/10',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Active Curator Nodes',
    curr: '', val: '342', sub: '',
    percent: '+5.2%', trend: 'up',
    color: 'text-indigo-400', bg: 'bg-indigo-400/10',
    icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
  },
  {
    title: 'System Integrity',
    curr: '', val: '99.9', sub: '%',
    percent: '+0.1%', trend: 'up',
    color: 'text-sky-400', bg: 'bg-sky-400/10',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    title: 'Avg Response Time',
    curr: '', val: '124', sub: 'ms',
    percent: '-12.4%', trend: 'down',
    color: 'text-amber-400', bg: 'bg-amber-400/10',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
]

export const recentRequests: Request[] = [
  { id: 'TXN-001', project: 'Opica Core Deploy',    user: 'admin@opica.io',   priority: 'High',   status: 'Completed', statusColor: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30', email: '09:41 AM' },
  { id: 'TXN-002', project: 'Node Sync Batch',      user: 'mt@opica.io',      priority: 'Medium', status: 'Running',   statusColor: 'bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/30',             email: '09:30 AM' },
  { id: 'TXN-003', project: 'Firewall Policy Push', user: 'jd@opica.io',      priority: 'High',   status: 'Pending',   statusColor: 'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/30',       email: '09:15 AM' },
  { id: 'TXN-004', project: 'DB Backup Verify',     user: 'system@opica.io',  priority: 'Low',    status: 'Completed', statusColor: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30', email: '08:55 AM' },
  { id: 'TXN-005', project: 'Auth Token Refresh',   user: 'sc@opica.io',      priority: 'Medium', status: 'Failed',    statusColor: 'bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/30',          email: '08:40 AM' },
  { id: 'TXN-006', project: 'CDN Purge All',        user: 'admin@opica.io',   priority: 'Low',    status: 'Running',   statusColor: 'bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/30',             email: '08:20 AM' },
]