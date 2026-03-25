import type { Project, Request, StatItem } from '../types'

export const fakeUser = {
  name: 'Alexander Wright',
  title: 'Principal Architect, Creative Studio',
  email: 'alex.wright@Opica.com',
  location: 'San Francisco, CA',
  member: 'Premium Member since 2021',
  initials: 'AW',
}

export const homeStats: Array<{
  label: string
  value: string
  accent: boolean
}> = [
  { label: 'Active Projects', value: '12', accent: true },
  { label: 'Pending Approvals', value: '04', accent: false },
  { label: 'Unread Messages', value: '08', accent: false },
]

export const projects: Project[] = [
  {
    id: 1,
    name: 'The Ridge Residence',
    updated: 'Updated 2 hours ago',
    status: 'In Progress',
    statusColor: 'bg-emerald-100 text-emerald-700',
    icon: '🏠',
    iconBg: 'bg-blue-50',
  },
  {
    id: 2,
    name: 'Urban Loft HQ',
    updated: 'Updated 1 day ago',
    status: 'Review',
    statusColor: 'bg-gray-100 text-gray-600',
    icon: '🏢',
    iconBg: 'bg-orange-50',
  },
  {
    id: 3,
    name: 'Green Valley Pavilion',
    updated: 'Updated 3 days ago',
    status: 'Planning',
    statusColor: 'bg-blue-100 text-blue-600',
    icon: '🌿',
    iconBg: 'bg-purple-50',
  },
]

export const recentRequests: Request[] = [
  {
    id: 1,
    user: 'John Doe',
    email: 'john@example.com',
    initials: 'JD',
    project: 'Downtown Commercial Center',
    status: 'In Review',
    statusColor: 'bg-blue-100 text-blue-700',
    priority: 'High',
  },
  {
    id: 2,
    user: 'Alice Smith',
    email: 'alice@eth.io',
    initials: 'AS',
    project: 'Riverside Apartments Phase II',
    status: 'Approved',
    statusColor: 'bg-emerald-100 text-emerald-700',
    priority: 'Medium',
  },
  {
    id: 3,
    user: 'Mark Knight',
    email: 'mark@builds.co',
    initials: 'MK',
    project: 'Urban Sky Loft Renovations',
    status: 'Rejected',
    statusColor: 'bg-red-100 text-red-600',
    priority: 'Low',
  },
]

export const profileDetails = {
  fullName: 'Julian Marcus Henderson',
  email: 'j.henderson@Opica.com',
  phone: '+1 (555) 902-3412',
  office: '245 Park Avenue, Suite 1200',
  location: 'New York, NY',
  role: 'Senior Architect',
  initials: 'JH',
  availability: ['Full-time', 'Remote Ready', 'On-site Visits'],
  credentials: [
    'AIA Member #10294',
    'Licensed Architect (NY)',
    'LEED Accredited',
  ],
  stats: [
    { label: 'Active Projects', value: '12' },
    { label: 'Response Rate', value: '98%' },
    { label: 'Client Satisfaction', value: '4.9/5' },
  ] as StatItem[],
}
