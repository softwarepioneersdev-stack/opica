import React from 'react'
import NavBar from '../components/Navbar'
import { recentRequests } from '../data/fakeData'
import { useT } from '../lib/i18n'

const ORDER = {
  id: '#ORD-2024-8842', status: 'Processing', estimated: 'Oct 24, 2024',
  priority: 'Priority Express', shipmentMethod: 'Global Logistics Pro',
  destination: 'Curator Central Hub', itemCount: '12 Handpicked Artifacts',
  totalValue: '$4,250.00', lastUpdate: '2 hours ago',
}

type StepState = 'done' | 'active' | 'current' | 'pending'
const STEP_KEYS: { key: string; state: StepState }[] = [
  { key: 'created', state: 'done' }, { key: 'inProgress', state: 'active' },
  { key: 'processing', state: 'current' }, { key: 'completed', state: 'pending' },
]

const stepCircleStyle = (state: StepState): React.CSSProperties => {
  const base: React.CSSProperties = { width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, border: '3px solid transparent', transition: 'all 0.3s ease' }
  if (state === 'done')    return { ...base, background: 'var(--color-primary)',  color: 'white', borderColor: 'var(--color-primary)' }
  if (state === 'active')  return { ...base, background: 'var(--color-warning)',  color: 'white', borderColor: 'var(--color-warning)', boxShadow: '0 0 0 4px rgba(245,158,11,0.15)' }
  if (state === 'current') return { ...base, background: 'var(--color-primary)',  color: 'white', borderColor: 'var(--color-primary)', boxShadow: '0 0 0 4px var(--color-primary-muted)' }
  return { ...base, background: 'var(--color-surface)', color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }
}

const stepLabelColor = (state: StepState) =>
  state === 'done' || state === 'current' ? 'var(--color-primary)' : state === 'active' ? 'var(--color-warning)' : 'var(--color-text-muted)'

const stepIcon = (state: StepState) =>
  state === 'done' ? '✓' : state === 'active' ? '⟳' : state === 'current' ? '⚡' : '○'

const PREVIOUS_REQUESTS = [
  { icon: '▦', name: 'Curated Set #721',         date: 'Completed on Sept 12, 2024', status: 'Completed', ref: 'B-455-98' },
  { icon: '✦', name: 'Special Anniversary Batch', date: 'Completed on Aug 04, 2024',  status: 'Completed', ref: 'X-102-12' },
  { icon: '△', name: 'Foundation Blueprints',     date: 'Completed on July 21, 2024', status: 'Completed', ref: 'F-881-29' },
]

const OrdersPage: React.FC = () => {
  const { t } = useT()

  return (
    <div className="min-h-screen flex flex-col bg-surface-overlay transition-colors" style={{ fontSize: 13 }}>
      <NavBar />

      <main className="flex-1 flex flex-col gap-6 sm:gap-7 px-4 sm:px-8 py-6 sm:py-9 w-full max-w-5xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="font-extrabold text-content-primary text-3xl sm:text-4xl tracking-tighter leading-none">{t('orders.title')}</h1>
          <p className="text-xs mt-1.5 text-content-muted">{t('orders.monitoring')} {ORDER.id}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6 items-start">
          {/* Status Card */}
          <div className="rounded-2xl p-5 sm:p-6 flex flex-col gap-6 bg-surface border border-border transition-colors">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <p className="font-bold text-base text-content-primary">{t('orders.status')} {ORDER.status}</p>
                <p className="text-xs mt-1 text-content-muted">{t('orders.estimated')} {ORDER.estimated}</p>
              </div>
              <div className="text-white font-bold rounded-md px-3 py-1.5 text-xs tracking-widest uppercase" style={{ background: 'var(--color-primary)' }}>
                {ORDER.priority}
              </div>
            </div>

            {/* Progress */}
            <div className="relative pt-2 pb-6">
              <div className="absolute rounded-full top-[18px] left-4 right-4 h-[3px] bg-border" />
              <div className="absolute rounded-full top-[18px] left-4 h-[3px] w-[55%]" style={{ background: 'var(--color-primary)' }} />
              <div className="flex justify-between relative z-10">
                {STEP_KEYS.map(step => (
                  <div key={step.key} className="flex flex-col items-center gap-2">
                    <div style={stepCircleStyle(step.state)}>{stepIcon(step.state)}</div>
                    <span className="font-semibold text-center uppercase tracking-wider" style={{ fontSize: 9, color: stepLabelColor(step.state), maxWidth: 60 }}>
                      {t(`orders.steps.${step.key}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: '🚚', label: t('orders.shipmentMethod'), value: ORDER.shipmentMethod },
                { icon: '📍', label: t('orders.destination'),    value: ORDER.destination },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-3 rounded-xl p-3 bg-surface-raised border border-border">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm bg-primary-light flex-shrink-0">{s.icon}</div>
                  <div className="min-w-0">
                    <p className="font-semibold text-content-muted uppercase tracking-wider" style={{ fontSize: 9.5 }}>{s.label}</p>
                    <p className="font-semibold text-content-primary truncate" style={{ fontSize: 12.5 }}>{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overview */}
          <div className="rounded-2xl p-5 flex flex-col border transition-colors" style={{ background: 'var(--color-surface-dark)', borderColor: 'var(--color-border)' }}>
            <p className="font-bold text-white mb-4 text-sm">{t('orders.overview')}</p>
            <div className="flex flex-col gap-1">
              {[
                { key: t('orders.itemCount'),  val: ORDER.itemCount },
                { key: t('orders.totalValue'), val: ORDER.totalValue },
                { key: t('orders.lastUpdate'), val: ORDER.lastUpdate },
              ].map((row, i, arr) => (
                <div key={row.key} className={`flex justify-between items-center py-2.5 ${i < arr.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <span className="text-white/40" style={{ fontSize: 10.5 }}>{row.key}</span>
                  <span className="font-semibold text-white text-xs">{row.val}</span>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full text-white font-bold rounded-xl py-3 text-xs uppercase tracking-wider transition-all hover:opacity-85"
              style={{ background: 'var(--color-primary)' }}>
              {t('orders.modify')}
            </button>
          </div>
        </div>

        {/* Previous */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-extrabold text-lg tracking-tight text-content-primary">{t('orders.previous')}</h2>
            <button className="font-semibold text-xs text-primary hover:underline">{t('orders.viewArchive')}</button>
          </div>
          <div className="flex flex-col gap-3">
            {PREVIOUS_REQUESTS.map(req => (
              <div key={req.ref} className="flex items-center gap-4 px-5 py-4 rounded-xl border cursor-pointer group transition-colors"
                style={{ background: 'var(--color-surface-dark)', borderColor: 'var(--color-border)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-surface-raised)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-surface-dark)')}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base" style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)' }}>{req.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white truncate" style={{ fontSize: 13 }}>{req.name}</p>
                  <p className="text-white/30 mt-0.5" style={{ fontSize: 11 }}>{req.date}</p>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-1">
                  <p className="text-white/30 uppercase font-bold tracking-widest" style={{ fontSize: 9 }}>Status</p>
                  <p className="font-semibold text-success flex items-center gap-1.5" style={{ fontSize: 11 }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-success" /> {req.status}
                  </p>
                </div>
                <button className="text-primary border px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-all text-xs hover:opacity-80"
                  style={{ background: 'var(--color-primary-muted)', borderColor: 'var(--color-primary-light)' }}>
                  {t('orders.details')}
                </button>
              </div>
            ))}
          </div>

          {/* Quick Table */}
          <div className="mt-8 rounded-2xl overflow-hidden border bg-surface transition-colors" style={{ borderColor: 'var(--color-border)' }}>
            <div className="px-4 py-3 bg-surface-raised border-b border-border">
              <h3 className="font-bold text-content-primary" style={{ fontSize: 13 }}>{t('orders.quickView')}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    {(['id','project','user','priority','status'] as const).map(label => (
                      <th key={label} className="px-4 py-3 text-content-muted font-bold tracking-widest uppercase" style={{ fontSize: 10 }}>
                        {t(`orders.headers.${label}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentRequests.map(row => (
                    <tr key={row.id} className="border-b border-border hover:bg-surface-raised transition-colors">
                      <td className="px-4 py-3 text-xs font-medium text-content-secondary">#{row.id}</td>
                      <td className="px-4 py-3 text-xs text-content-secondary">{row.project}</td>
                      <td className="px-4 py-3 text-xs text-content-secondary">{row.user}</td>
                      <td className="px-4 py-3 text-xs text-content-secondary">{row.priority}</td>
                      <td className="px-4 py-3 text-xs font-bold" style={{
                        color: row.status === 'Rejected' ? 'var(--color-danger)' : row.status === 'Approved' ? 'var(--color-success)' : 'var(--color-primary)'
                      }}>{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto px-4 sm:px-8 py-6 border-t border-border bg-surface transition-colors">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-content-muted uppercase tracking-widest text-center" style={{ fontSize: 10 }}>
            {t('orders.footer.copyright')}
          </span>
          <div className="flex flex-wrap justify-center gap-6">
            {['Privacy','Terms','Support','Docs'].map(l => (
              <a key={l} href="#" className="text-content-muted hover:text-primary uppercase tracking-widest no-underline transition-colors" style={{ fontSize: 10 }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default OrdersPage
