import React from 'react'
import type { NavKey } from './Types'

interface SidebarProps {
  activeNav: NavKey
  onNavigate: (key: NavKey) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeNav, onNavigate }) => {
  const menuItems: Array<{ key: NavKey; label: string; icon: string }> = [
    { key: 'dashboard', label: 'Overview', icon: '▦' },
    { key: 'inventory', label: 'Inventory', icon: '⬡' },
    { key: 'analytics', label: 'Analytics', icon: '▲' },
    { key: 'staff',     label: 'Staff',     icon: '◉' },
    { key: 'logs',      label: 'Logs',      icon: '≡' },
    { key: 'security',  label: 'Security',  icon: '⬡' },
    { key: 'settings',  label: 'Settings',  icon: '⚙' },
  ]

  return (
    <aside className="w-64 h-screen bg-[#0f172a] border-r border-slate-800 flex flex-col hidden lg:flex">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-bold text-xl">
            O
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight">Opica<span className="text-indigo-500">.</span></h1>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 ${
                activeNav === item.key
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <span className="text-lg opacity-70">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-800/50">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white font-bold text-sm">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-200 truncate">Admin User</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold truncate">Super Admin</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar