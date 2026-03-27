import React from 'react'
import type { NavKey } from './Types'

interface PlaceholderPageProps {
  page: NavKey
}

const PAGE_META: Record<NavKey, { title: string; desc: string; icon: string }> = {
  dashboard: { title: 'Dashboard',  desc: '',                         icon: '▦' },
  inventory: { title: 'Inventory',  desc: 'Manage all system assets and packages.', icon: '⬡' },
  analytics: { title: 'Analytics',  desc: 'Deep-dive into performance metrics.',     icon: '▲' },
  staff:     { title: 'Staff',      desc: 'Manage your team and permissions.',       icon: '◉' },
  logs:      { title: 'Logs',       desc: 'Full audit trail and event history.',     icon: '≡' },
  security:  { title: 'Security',   desc: 'Threat detection and firewall rules.',    icon: '⬡' },
  settings:  { title: 'Settings',   desc: 'Configure your platform preferences.',   icon: '⚙' },
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ page }) => {
  const meta = PAGE_META[page]

  return (
    <div className="flex flex-1 items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-3xl text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
          {meta.icon}
        </div>
        <h2 className="text-2xl font-extrabold text-white">{meta.title}</h2>
        <p className="text-slate-400 text-sm max-w-xs mx-auto">{meta.desc}</p>
        <p className="text-xs text-slate-600 font-mono mt-6 border border-slate-800 rounded-lg px-4 py-2 inline-block">
          Page under construction
        </p>
      </div>
    </div>
  )
}

export default PlaceholderPage