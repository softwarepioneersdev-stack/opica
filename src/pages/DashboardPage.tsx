import React, { useState } from 'react'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'
import { recentRequests } from '../data/fakeData'
import { FlexContainer, Footer } from '../components/Containers'
import Navbar from '../components/Navbar'
import { useT } from '../lib/i18n'

// ── Static data ───────────────────────────────────────────────────────────────
const staffMembers = [
  { initials: 'EV', name: 'Elena Vance',   role: 'Lead Engineer',      online: true,  color: 'bg-gradient-to-br from-indigo-500 to-indigo-400' },
  { initials: 'MT', name: 'Marcus Thorne', role: 'DevOps Analyst',     online: true,  color: 'bg-gradient-to-br from-sky-500 to-sky-400' },
  { initials: 'SC', name: 'Sarah Connor',  role: 'QA Architect',        online: false, color: 'bg-gradient-to-br from-pink-500 to-pink-400' },
]

const securityFeed = [
  { type: 'warn' as const, icon: '⚠️', title: 'Admin login from unauthorized IP', meta: '2 minutes ago • San Francisco, CA', action: 'block' },
  { type: 'ok'   as const, icon: '✓',  title: 'Daily backup completed successfully', meta: '1 hour ago • System Duty', action: null },
  { type: 'info' as const, icon: '🔄', title: 'System version 2.4.0 deployed', meta: '3 hours ago • Automated Bot', action: null },
]

const feedIconColors: Record<string, string> = {
  warn: 'bg-danger/10 text-danger',
  ok:   'bg-success/10 text-success',
  info: 'bg-primary/10 text-primary',
}

// ── Sidebar nav items (icons as JSX, labels via i18n key) ────────────────────
const sideNavItems = [
  { key: 'dashboard', icon: <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1.5"/><rect x="9" y="1" width="6" height="6" rx="1.5"/><rect x="1" y="9" width="6" height="6" rx="1.5"/><rect x="9" y="9" width="6" height="6" rx="1.5"/></svg> },
  { key: 'inventory', icon: <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="12" height="10" rx="1.5"/><path d="M5 3V2M11 3V2M2 7h12"/></svg> },
  { key: 'analytics', icon: <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12L5 8l3 2 3-4 3 2"/></svg> },
  { key: 'staff',     icon: <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="5" r="2.5"/><path d="M3 13c0-2.76 2.24-5 5-5s5 2.24 5 5"/></svg> },
  { key: 'logs',      icon: <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4h12M2 8h8M2 12h6"/></svg> },
  { key: 'security',  icon: <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 2L3 4.5V8c0 3 2.3 5 5 6 2.7-1 5-3 5-6V4.5L8 2z"/></svg> },
]

// ── CSS var shorthands for the dark-panel aesthetic ───────────────────────────
const panel  = { background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }
const panelB = { borderBottom: '1px solid var(--color-border)' }
const mutedTxt = { color: 'var(--color-text-muted)' }

const DashboardPage: React.FC = () => {
  const { t } = useT()
  const [search, setSearch]     = useState('')
  const [activeNav, setActiveNav] = useState('dashboard')

  const filtered = recentRequests.filter(r =>
    r.project.toLowerCase().includes(search.toLowerCase()) ||
    r.user.toLowerCase().includes(search.toLowerCase())
  )

  const Sidebar = () => (
    <FlexContainer className='!flex-col flex-shrink-0 w-44 hidden lg:flex' style={{ background: 'var(--color-surface-dark)', minHeight: '100%' }}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 flex-shrink-0" style={panelB}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-sm" style={{ background: 'var(--color-primary)' }}>◈</div>
        <div>
          <p className="text-white text-xs font-bold leading-tight">Opica</p>
          <p className="text-xs leading-tight" style={mutedTxt}>{t('dashboard.sidebar.dashboard')}</p>
        </div>
      </div>
      <nav className="flex-1 flex flex-col gap-0.5 p-2.5 pt-3 overflow-y-auto">
        {sideNavItems.map(item => {
          const isActive = activeNav === item.key
          return (
            <button key={item.key} onClick={() => setActiveNav(item.key)}
              className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-all duration-150 w-full text-xs font-medium"
              style={{
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                background: isActive ? 'var(--color-primary-muted)' : 'transparent',
                border: isActive ? '1px solid var(--color-primary-light)' : '1px solid transparent',
              }}>
              <span style={{ opacity: isActive ? 1 : 0.7 }}>{item.icon}</span>
              {t(`dashboard.sidebar.${item.key}`)}
            </button>
          )
        })}
      </nav>
    </FlexContainer>
  )

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
        <Sidebar />
        <main className="flex-1 flex flex-col w-full gap-5 p-4 sm:p-6 lg:p-7">
          {/* Header */}
          <div className="flex items-start flex-col md:flex-row gap-3 justify-between">
            <div>
              <h2 className="text-2xl font-bold text-content-primary">{t('dashboard.title')}</h2>
              <p className="text-sm text-content-muted mt-0.5">{t('dashboard.subtitle')}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-md text-xs px-2.5 py-1.5" style={panel}>🔔 3</button>
              <button className="rounded-md text-xs px-2.5 py-1.5" style={panel}>⚙️</button>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: 'linear-gradient(135deg, var(--color-primary), #818cf8)' }}>AT</div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-3">
            <div className="rounded-xl p-5 sm:col-span-2 lg:col-span-1"
              style={{ background: 'linear-gradient(135deg, var(--color-surface-dark), var(--color-surface-raised))', border: '1px solid var(--color-primary-light)' }}>
              <p className="mb-2 font-semibold text-white/60" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('dashboard.revenue')}</p>
              <p className="font-bold text-white mb-2" style={{ fontSize: 'clamp(22px,4vw,32px)', letterSpacing: '-0.03em', lineHeight: 1 }}>$1,284,500.00</p>
              <span className="inline-flex items-center gap-1 font-semibold rounded-full px-2 py-0.5 text-success bg-success/15" style={{ fontSize: 10.5 }}>↑ +12.5%</span>
            </div>
            <div className="rounded-xl p-5" style={panel}>
              <p className="mb-3 font-semibold" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', ...mutedTxt }}>{t('dashboard.curatorNodes')}</p>
              <p className="font-bold text-content-primary" style={{ fontSize: 32, letterSpacing: '-0.03em', lineHeight: 1 }}>42</p>
              <div className="mt-2 rounded-full" style={{ height: 3, width: 48, background: 'var(--color-primary)' }} />
            </div>
            <div className="rounded-xl p-5" style={panel}>
              <p className="mb-3 font-semibold" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', ...mutedTxt }}>{t('dashboard.integrity')}</p>
              <p className="font-bold text-success" style={{ fontSize: 28, letterSpacing: '-0.02em', lineHeight: 1 }}>99.9%</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="rounded-full" style={{ width: 6, height: 6, background: 'var(--color-success)', flexShrink: 0 }} />
                <span className="text-success font-medium" style={{ fontSize: 10.5 }}>{t('dashboard.stable')}</span>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-xl overflow-hidden" style={panel}>
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-5 py-3.5" style={panelB}>
              <h3 className="font-bold text-content-primary" style={{ fontSize: 13 }}>{t('dashboard.recentRequests')}</h3>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative hidden sm:block">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs" style={mutedTxt}>🔍</span>
                  <input type="text" placeholder={t('dashboard.search')} value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="rounded-md pl-7 pr-3 py-1.5 text-xs focus:outline-none bg-surface-overlay border border-border text-content-primary"
                    style={{ width: 150 }} />
                </div>
                <button className="rounded-md hidden sm:block text-content-muted border border-border bg-transparent text-xs px-3 py-1.5">{t('dashboard.exportCSV')}</button>
                <button className="rounded-md text-white text-xs font-semibold px-3 py-1.5 transition-opacity hover:opacity-85"
                  style={{ background: 'var(--color-primary)' }}>{t('dashboard.new')}</button>
              </div>
            </div>
            {/* Mobile search */}
            <div className="sm:hidden px-4 pt-3 pb-1">
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs" style={mutedTxt}>🔍</span>
                <input type="text" placeholder={t('dashboard.search')} value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full rounded-md pl-7 pr-3 py-2 text-xs focus:outline-none bg-surface-overlay border border-border text-content-primary" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                    {(['id','asset','category','status','timestamp','actions'] as const).map(h => (
                      <th key={h} className="text-left font-semibold whitespace-nowrap"
                        style={{ padding: '9px 14px', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', ...mutedTxt, borderBottom: '1px solid var(--color-border)' }}>
                        {t(`dashboard.headers.${h}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(r => (
                    <tr key={r.id} className="transition-colors" style={{ borderBottom: '1px solid var(--color-border)' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-surface-overlay)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <td style={{ padding: '11px 14px' }}>
                        <span className="font-mono text-xs font-semibold" style={{ color: 'var(--color-primary)', fontSize: 11 }}>#{r.id}</span>
                      </td>
                      <td style={{ padding: '11px 14px' }}>
                        <p className="font-semibold text-content-primary" style={{ fontSize: 12 }}>{r.project}</p>
                        <p style={{ fontSize: 10.5, ...mutedTxt }}>{r.user}</p>
                      </td>
                      <td style={{ padding: '11px 14px', fontSize: 11, ...mutedTxt }}>{r.priority}</td>
                      <td style={{ padding: '11px 14px' }}><Badge label={r.status} color={r.statusColor} /></td>
                      <td style={{ padding: '11px 14px', fontSize: 10.5, ...mutedTxt, fontFamily: 'monospace' }}>{r.email}</td>
                      <td style={{ padding: '11px 14px' }}>
                        <div className="flex gap-1.5">
                          <button className="rounded font-semibold text-xs px-2.5 py-1 hover:opacity-70"
                            style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)' }}>{t('dashboard.edit')}</button>
                          <button className="rounded font-semibold text-xs px-2.5 py-1 hover:opacity-70"
                            style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171' }}>{t('dashboard.delete')}</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-2.5" style={{ borderTop: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: 10.5, ...mutedTxt }}>{t('dashboard.showing', { count: filtered.length })}</span>
              <div className="flex gap-1">
                {['‹','1','2','3','›'].map((p, i) => (
                  <button key={i} className="flex items-center justify-center rounded-md font-semibold transition-all"
                    style={{ width: 26, height: 26, fontSize: 11,
                      border: p === '1' ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                      background: p === '1' ? 'var(--color-primary)' : 'transparent',
                      color: p === '1' ? 'white' : 'var(--color-text-muted)' }}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Staff + Security */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Staff */}
            <div className="rounded-xl overflow-hidden" style={panel}>
              <div className="flex items-center justify-between px-5 py-3.5" style={panelB}>
                <h4 className="font-bold text-content-primary" style={{ fontSize: 13 }}>{t('dashboard.staff')}</h4>
              </div>
              {staffMembers.map(s => (
                <div key={s.name} className="flex items-center gap-3 px-5 py-2.5 cursor-pointer transition-colors"
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-surface-overlay)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <Avatar initials={s.initials} size="sm" color={s.color} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-content-primary truncate" style={{ fontSize: 12.5 }}>{s.name}</p>
                    <p className="truncate" style={{ fontSize: 10.5, ...mutedTxt }}>{s.role}</p>
                  </div>
                  <span className="rounded-full" style={{ width: 7, height: 7, flexShrink: 0, background: s.online ? 'var(--color-success)' : 'var(--color-text-muted)' }} />
                </div>
              ))}
              <div className="p-3">
                <button className="w-full rounded-lg font-semibold transition-all text-content-muted border border-border bg-transparent"
                  style={{ padding: '7px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {t('dashboard.manageStaff')}
                </button>
              </div>
            </div>

            {/* Security Feed */}
            <div className="rounded-xl overflow-hidden" style={panel}>
              <div className="flex items-center justify-between px-5 py-3.5" style={panelB}>
                <h4 className="font-bold text-content-primary" style={{ fontSize: 13 }}>{t('dashboard.security')}</h4>
                <span className="font-semibold rounded-full px-2.5 py-0.5 text-success bg-success/10" style={{ fontSize: 10 }}>{t('dashboard.live')}</span>
              </div>
              {securityFeed.map((item, i) => (
                <div key={i} className="flex items-start gap-3 px-4 sm:px-5 py-3 transition-colors"
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-surface-overlay)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 mt-0.5 ${feedIconColors[item.type]}`}>{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-content-primary" style={{ fontSize: 12 }}>{item.title}</p>
                    <p className="truncate" style={{ fontSize: 10.5, ...mutedTxt, marginTop: 2 }}>{item.meta}</p>
                  </div>
                  {item.action === 'block' && (
                    <button className="self-center rounded font-bold text-white hover:opacity-80"
                      style={{ fontSize: 10, padding: '4px 11px', background: 'var(--color-danger)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      {t('dashboard.block')}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default DashboardPage
