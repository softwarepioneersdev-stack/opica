import React, { useState } from 'react'

interface DashboardHeaderProps {
  title?: string
  subtitle?: string
  onRefresh?: () => void
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title = 'Platform Overview',
  subtitle = "Welcome back, here's what's happening today.",
  onRefresh,
}) => {
  const [notifOpen, setNotifOpen] = useState(false)

  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">{title}</h2>
        <p className="text-sm text-slate-400 mt-1 font-medium">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-150 hover:bg-white/5"
            style={{ background: 'rgba(30,41,59,0.7)', border: '1px solid rgba(51,65,85,0.5)' }}
          >
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-slate-900" />
            <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          {notifOpen && (
            <div
              className="absolute right-0 top-12 w-72 rounded-xl p-3 z-50 shadow-2xl"
              style={{ background: '#1e293b', border: '1px solid rgba(51,65,85,0.8)' }}
            >
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">Notifications</p>
              {[
                { text: 'Unauthorized IP login detected', time: '2m ago', dot: 'bg-rose-500' },
                { text: 'Backup completed successfully',  time: '1h ago', dot: 'bg-emerald-500' },
                { text: 'v2.4.0 deployed to production',  time: '3h ago', dot: 'bg-sky-500' },
              ].map((n, i) => (
                <button
                  key={i}
                  className="w-full flex items-start gap-3 px-2 py-2.5 rounded-lg hover:bg-white/5 transition-colors duration-150 text-left"
                >
                  <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${n.dot}`} />
                  <div>
                    <p className="text-sm text-slate-200 leading-snug">{n.text}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{n.time}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Refresh */}
        <button
          onClick={onRefresh}
          className="flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-150 hover:bg-white/5"
          style={{ background: 'rgba(30,41,59,0.7)', border: '1px solid rgba(51,65,85,0.5)' }}
        >
          <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        {/* Live badge */}
        <div className="h-10 px-4 rounded-xl flex items-center gap-2 bg-gradient-to-r from-indigo-600/20 to-sky-600/20 border border-indigo-500/30 text-sm font-semibold text-indigo-200">
          <span>Live Environment</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader