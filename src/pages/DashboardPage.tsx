import React, { useState } from 'react'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'
import { recentRequests } from '../data/fakeData'

const sideNav = [
  {
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
        <rect x="1" y="1" width="6" height="6" rx="1.5" />
        <rect x="9" y="1" width="6" height="6" rx="1.5" />
        <rect x="1" y="9" width="6" height="6" rx="1.5" />
        <rect x="9" y="9" width="6" height="6" rx="1.5" />
      </svg>
    ),
    label: 'Dashboard',
  },
  {
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="12" height="10" rx="1.5" />
        <path d="M5 3V2M11 3V2M2 7h12" />
      </svg>
    ),
    label: 'Inventory',
  },
  {
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 12L5 8l3 2 3-4 3 2" />
      </svg>
    ),
    label: 'Analytics',
  },
  {
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="5" r="2.5" />
        <path d="M3 13c0-2.76 2.24-5 5-5s5 2.24 5 5" />
        <circle cx="13" cy="5" r="2" />
        <path d="M13 10c1.5.3 2.5 1.5 2.5 3" />
      </svg>
    ),
    label: 'Staff',
  },
  {
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 4h12M2 8h8M2 12h6" />
      </svg>
    ),
    label: 'Logs',
  },
  {
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 2L3 4.5V8c0 3 2.3 5 5 6 2.7-1 5-3 5-6V4.5L8 2z" />
      </svg>
    ),
    label: 'Security',
  },
]

const staffMembers = [
  { initials: 'EV', name: 'Elena Vance',   role: 'Lead Curator',      online: true,  color: 'bg-gradient-to-br from-indigo-500 to-indigo-400' },
  { initials: 'MT', name: 'Marcus Thorne', role: 'Logistics Analyst', online: true,  color: 'bg-gradient-to-br from-sky-500 to-sky-400' },
  { initials: 'SC', name: 'Sarah Connor',  role: 'Quality Auditor',   online: false, color: 'bg-gradient-to-br from-pink-500 to-pink-400' },
]

const securityFeed = [
  { type: 'warn' as const, icon: '⚠️', title: 'Admin login from unauthorized IP',   meta: '2 minutes ago • San Francisco, CA', action: 'block' },
  { type: 'ok'   as const, icon: '✓',  title: 'Daily backup completed successfully', meta: '1 hour ago • System Duty',           action: null },
  { type: 'info' as const, icon: '🔄', title: 'System version 2.4.0 deployed',       meta: '3 hours ago • Automated Bot',        action: null },
]

const feedIconColors: Record<string, string> = {
  warn: 'bg-red-500/10 text-red-400',
  ok:   'bg-green-500/10 text-green-400',
  info: 'bg-blue-500/10 text-blue-400',
}

const DashboardPage: React.FC = () => {
  const [search, setSearch]           = useState('')
  const [activeNav, setActiveNav]     = useState('Dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filtered = recentRequests.filter(
    (r) =>
      r.project.toLowerCase().includes(search.toLowerCase()) ||
      r.user.toLowerCase().includes(search.toLowerCase()),
  )

  /* Sidebar content extracted so it can be reused in both desktop aside + mobile drawer */
  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div
        className="flex items-center gap-2.5 px-5 py-5 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-sm flex-shrink-0"
          style={{ background: '#4f6ef7' }}
        >
          ◈
        </div>
        <div>
          <p className="text-white text-xs font-bold leading-tight">Precise Curator</p>
          <p className="text-xs leading-tight" style={{ color: '#8b90a0' }}>Admin Panel</p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 flex flex-col gap-0.5 p-2.5 pt-3 overflow-y-auto">
        {sideNav.map((item) => {
          const isActive = activeNav === item.label
          return (
            <button
              key={item.label}
              onClick={() => { setActiveNav(item.label); setSidebarOpen(false) }}
              className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-all duration-150 w-full"
              style={{
                fontSize: 12.5, fontWeight: 500,
                color: isActive ? '#7b97f9' : '#8b90a0',
                background: isActive ? 'rgba(79,110,247,0.12)' : 'transparent',
                border: isActive ? '1px solid rgba(79,110,247,0.2)' : '1px solid transparent',
              }}
            >
              <span style={{ opacity: isActive ? 1 : 0.7 }}>{item.icon}</span>
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Generate Report CTA */}
      <div className="p-2.5 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <button
          className="w-full flex items-center justify-center gap-2 rounded-lg text-white font-semibold transition-opacity hover:opacity-85"
          style={{ background: '#4f6ef7', padding: '9px', fontSize: 11.5, letterSpacing: '0.02em' }}
        >
          ⚡ Generate Report
        </button>
      </div>
    </>
  )

  return (
    <div
      className="min-h-screen flex"
      style={{ background: '#0f1117', fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Desktop Sidebar (lg+) ── */}
      <aside
        className="hidden lg:flex fixed top-0 left-0 bottom-0 z-50 flex-col"
        style={{ width: 200, background: '#13151c', borderRight: '1px solid rgba(255,255,255,0.07)' }}
      >
        <SidebarContent />
      </aside>

      {/* ── Mobile: backdrop overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Mobile: slide-in drawer ── */}
      <aside
        className="fixed top-0 left-0 bottom-0 z-50 flex flex-col lg:hidden transition-transform duration-300 ease-in-out"
        style={{
          width: 200,
          background: '#13151c',
          borderRight: '1px solid rgba(255,255,255,0.07)',
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        <SidebarContent />
      </aside>

      {/* ── Main content area ── */}
      <div className="flex flex-col flex-1 min-w-0 lg:ml-[200px]">

        {/* ── Topbar ── */}
        <div
          className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-7 h-14"
          style={{ background: '#13151c', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Hamburger menu — mobile/tablet only */}
            <button
              className="lg:hidden flex-shrink-0 flex flex-col justify-center gap-[5px] p-1.5 rounded-md hover:bg-white/5 transition-colors"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <span className="block w-[18px] h-[2px] rounded-full" style={{ background: '#8b90a0' }} />
              <span className="block w-[18px] h-[2px] rounded-full" style={{ background: '#8b90a0' }} />
              <span className="block w-[13px] h-[2px] rounded-full" style={{ background: '#8b90a0' }} />
            </button>
            <div className="min-w-0">
              <h1 className="font-bold text-white truncate" style={{ fontSize: 15, letterSpacing: '-0.02em' }}>
                System Dashboard
              </h1>
              <p className="text-xs mt-0.5 hidden sm:block truncate" style={{ color: '#8b90a0' }}>
                Monitoring real-time precision metrics and curated logistics.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              className="rounded-md text-xs px-2.5 py-1.5 hidden sm:block"
              style={{ background: '#1a1d27', border: '1px solid rgba(255,255,255,0.07)', color: '#8b90a0' }}
            >
              🔔 3
            </button>
            <button
              className="rounded-md text-xs px-2.5 py-1.5"
              style={{ background: '#1a1d27', border: '1px solid rgba(255,255,255,0.07)', color: '#8b90a0' }}
            >
              ⚙️
            </button>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#4f6ef7,#818cf8)' }}
            >
              AT
            </div>
          </div>
        </div>

        {/* ── Page body ── */}
        <div className="flex flex-col gap-4 p-4 sm:p-6 lg:p-7 flex-1">

          {/* KPI Cards
              xs:  1 col
              sm:  2 col  (revenue spans both)
              lg:  3 col custom (2fr 1fr 1fr) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-3 lg:gap-3.5">
            {/* Revenue hero — spans 2 cols on sm, resets on lg via inline override */}
            <div
              className="rounded-xl p-5 relative overflow-hidden sm:col-span-2 lg:col-span-1"
              style={{
                background: 'linear-gradient(135deg,#1a2240,#1e2a4a)',
                border: '1px solid rgba(79,110,247,0.25)',
              }}
            >
              <p className="mb-2 font-semibold" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(150,170,255,0.7)' }}>
                Total Managed Revenue
              </p>
              <p className="font-bold text-white mb-2" style={{ fontSize: 'clamp(22px,4vw,32px)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                $1,284,500.00
              </p>
              <span className="inline-flex items-center gap-1 font-semibold rounded-full px-2 py-0.5" style={{ fontSize: 10.5, color: '#22c55e', background: 'rgba(34,197,94,0.15)' }}>
                ↑ +12.5% from last month
              </span>
            </div>

            {/* Curator Nodes */}
            <div className="rounded-xl p-5" style={{ background: '#1a1d27', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="mb-3 font-semibold" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#555a6e' }}>
                Active Curator Nodes
              </p>
              <p className="font-bold text-white" style={{ fontSize: 32, letterSpacing: '-0.03em', lineHeight: 1 }}>42</p>
              <div className="mt-2 rounded-full" style={{ height: 3, width: 48, background: '#4f6ef7' }} />
            </div>

            {/* System Integrity */}
            <div className="rounded-xl p-5" style={{ background: '#1a1d27', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="mb-3 font-semibold" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#555a6e' }}>
                System Integrity
              </p>
              <p className="font-bold" style={{ fontSize: 28, letterSpacing: '-0.02em', lineHeight: 1, color: '#22c55e' }}>99.9%</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="rounded-full flex-shrink-0" style={{ width: 6, height: 6, background: '#22c55e' }} />
                <span style={{ fontSize: 10.5, color: '#22c55e', fontWeight: 500 }}>Stable</span>
              </div>
            </div>
          </div>

          {/* On lg+ override to 3-col custom grid */}
          <style>{`
            @media (min-width: 1024px) {
              .kpi-grid { grid-template-columns: 2fr 1fr 1fr !important; }
              .kpi-grid > *:first-child { grid-column: auto !important; }
            }
          `}</style>

          {/* ── Table ── */}
          <div className="rounded-xl overflow-hidden" style={{ background: '#1a1d27', border: '1px solid rgba(255,255,255,0.07)' }}>

            {/* Table topbar */}
            <div
              className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-5 py-3.5"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <h3 className="font-bold text-white" style={{ fontSize: 13 }}>Recent Inventory Requests</h3>
              <div className="flex items-center gap-2 flex-wrap">
                {/* Search — sm+ only */}
                <div className="relative hidden sm:block">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs" style={{ color: '#555a6e' }}>🔍</span>
                  <input
                    type="text"
                    placeholder="Search…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="rounded-md pl-7 pr-3 py-1.5 text-xs focus:outline-none"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#d1d5db', width: 150 }}
                  />
                </div>
                <button
                  className="rounded-md hidden sm:block"
                  style={{ fontSize: 11, fontWeight: 500, padding: '5px 12px', background: 'transparent', border: '1px solid rgba(255,255,255,0.07)', color: '#8b90a0' }}
                >
                  Export CSV
                </button>
                <button
                  className="rounded-md text-white font-semibold transition-opacity hover:opacity-85"
                  style={{ fontSize: 11, padding: '5px 13px', background: '#4f6ef7', border: 'none', letterSpacing: '0.02em' }}
                >
                  + New
                </button>
              </div>
            </div>

            {/* Mobile-only search bar */}
            <div className="sm:hidden px-4 pt-3 pb-1">
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs" style={{ color: '#555a6e' }}>🔍</span>
                <input
                  type="text"
                  placeholder="Search requests…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-md pl-7 pr-3 py-2 text-xs focus:outline-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#d1d5db' }}
                />
              </div>
            </div>

            {/* Horizontally scrollable table */}
            <div className="overflow-x-auto">
              <table className="w-full" style={{ borderCollapse: 'collapse', minWidth: 540 }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                    {['Tracking ID', 'Asset Name', 'Category', 'Status', 'Timestamp', 'Actions'].map((h) => (
                      <th
                        key={h}
                        className="text-left font-semibold whitespace-nowrap"
                        style={{ padding: '9px 14px', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555a6e', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr
                      key={r.id}
                      className="transition-colors"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ padding: '11px 14px' }}>
                        <span className="whitespace-nowrap" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#7b97f9', fontWeight: 500 }}>
                          #{r.id}
                        </span>
                      </td>
                      <td style={{ padding: '11px 14px' }}>
                        <p className="font-semibold text-white" style={{ fontSize: 12 }}>{r.project}</p>
                        <p style={{ fontSize: 10.5, color: '#8b90a0', marginTop: 1 }}>{r.user}</p>
                      </td>
                      <td className="whitespace-nowrap" style={{ padding: '11px 14px', fontSize: 11, color: '#8b90a0' }}>{r.priority}</td>
                      <td style={{ padding: '11px 14px' }}><Badge label={r.status} color={r.statusColor} /></td>
                      <td style={{ padding: '11px 14px' }}>
                        <span className="whitespace-nowrap" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: '#555a6e', lineHeight: 1.5 }}>
                          {r.email}
                        </span>
                      </td>
                      <td style={{ padding: '11px 14px' }}>
                        <div className="flex gap-1.5">
                          <button className="rounded font-semibold transition-opacity hover:opacity-70" style={{ fontSize: 10.5, padding: '3px 10px', background: 'rgba(79,110,247,0.12)', border: 'none', color: '#7b97f9', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                            Edit
                          </button>
                          <button className="rounded font-semibold transition-opacity hover:opacity-70" style={{ fontSize: 10.5, padding: '3px 10px', background: 'rgba(239,68,68,0.1)', border: 'none', color: '#f87171', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                            Del
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div
              className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-5 py-2.5"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
            >
              <span style={{ fontSize: 10.5, color: '#555a6e' }}>Showing {filtered.length} of 152 entries</span>
              <div className="flex gap-1">
                {['‹', '1', '2', '3', '›'].map((p, i) => (
                  <button
                    key={i}
                    className="flex items-center justify-center rounded-md font-semibold transition-all"
                    style={{
                      width: 26, height: 26, fontSize: 11,
                      border: p === '1' ? '1px solid #4f6ef7' : '1px solid rgba(255,255,255,0.07)',
                      background: p === '1' ? '#4f6ef7' : 'transparent',
                      color: p === '1' ? 'white' : '#8b90a0',
                      cursor: 'pointer',
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom Row: Staff + Security ──
              Mobile:  1 col (stacked)
              sm+:     2 col               */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">

            {/* Staff Management */}
            <div className="rounded-xl overflow-hidden" style={{ background: '#1a1d27', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <h4 className="font-bold text-white" style={{ fontSize: 13 }}>Staff Management</h4>
              </div>
              {staffMembers.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center gap-3 px-5 py-2.5 cursor-pointer transition-colors"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <Avatar initials={s.initials} size="sm" color={s.color} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate" style={{ fontSize: 12.5 }}>{s.name}</p>
                    <p className="truncate" style={{ fontSize: 10.5, color: '#8b90a0', marginTop: 1 }}>{s.role}</p>
                  </div>
                  <span className="rounded-full flex-shrink-0" style={{ width: 7, height: 7, background: s.online ? '#22c55e' : '#555a6e' }} />
                </div>
              ))}
              <div className="p-3">
                <button
                  className="w-full rounded-lg font-semibold transition-all"
                  style={{ padding: '7px', background: 'transparent', border: '1px solid rgba(255,255,255,0.07)', color: '#8b90a0', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', cursor: 'pointer' }}
                >
                  Manage All Staff
                </button>
              </div>
            </div>

            {/* Security Integrity Feed */}
            <div className="rounded-xl overflow-hidden" style={{ background: '#1a1d27', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <h4 className="font-bold text-white" style={{ fontSize: 13 }}>Security Integrity Feed</h4>
                <span className="font-semibold rounded-full px-2.5 py-0.5" style={{ fontSize: 10, color: '#22c55e', background: 'rgba(34,197,94,0.1)' }}>
                  ● Live
                </span>
              </div>
              {securityFeed.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 px-4 sm:px-5 py-3 transition-colors"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 mt-0.5 ${feedIconColors[item.type]}`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white" style={{ fontSize: 12 }}>{item.title}</p>
                    <p className="truncate" style={{ fontSize: 10.5, color: '#555a6e', marginTop: 2 }}>{item.meta}</p>
                  </div>
                  {item.action === 'block' && (
                    <button
                      className="self-center rounded font-bold text-white transition-opacity hover:opacity-80 flex-shrink-0"
                      style={{ fontSize: 10, padding: '4px 11px', background: '#ef4444', border: 'none', letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' }}
                    >
                      Block
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <footer
          className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 sm:justify-between px-4 sm:px-7 py-3.5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <span style={{ fontSize: 10.5, color: '#555a6e', textAlign: 'center' }}>
            © 2026 The Precise Curator. All rights reserved.
          </span>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
            {['Privacy Policy', 'Terms of Service', 'Contact Support', 'Documentation'].map((link) => (
              <a key={link} href="#" style={{ fontSize: 10.5, color: '#555a6e', textDecoration: 'none' }}>
                {link}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  )
}

export default DashboardPage