import React from 'react'
import NavBar from '../components/Navbar'
import { recentRequests } from '../data/fakeData'

// البيانات الأساسية للطلب
const ORDER = {
  id: '#ORD-2024-8842',
  status: 'Processing',
  estimated: 'Oct 24, 2024',
  priority: 'Priority Express',
  shipmentMethod: 'Global Logistics Pro',
  destination: 'Curator Central Hub',
  itemCount: '12 Handpicked Artifacts',
  totalValue: '$4,250.00',
  lastUpdate: '2 hours ago',
}

type StepState = 'done' | 'active' | 'current' | 'pending'

interface Step {
  key: string;
  label: string;
  state: StepState;
}

const STEPS: Step[] = [
  { key: 'created',    label: 'Created',     state: 'done'    },
  { key: 'inprogress', label: 'In Progress', state: 'active'  },
  { key: 'processing', label: 'Processing',  state: 'current' },
  { key: 'completed',  label: 'Completed',   state: 'pending' },
]

// دالة تنسيق دوائر التتبع
const stepCircleStyle = (state: StepState): React.CSSProperties => {
  const base: React.CSSProperties = {
    width: 32, height: 32, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 12, fontWeight: 700, flexShrink: 0,
    border: '3px solid transparent',
    transition: 'all 0.3s ease'
  }
  if (state === 'done')    return { ...base, background: '#4f6ef7', color: 'white', borderColor: '#4f6ef7' }
  if (state === 'active')  return { ...base, background: '#f59e0b', color: 'white', borderColor: '#f59e0b', boxShadow: '0 0 0 4px rgba(245,158,11,0.15)' }
  if (state === 'current') return { ...base, background: '#4f6ef7', color: 'white', borderColor: '#4f6ef7', boxShadow: '0 0 0 4px rgba(79,110,247,0.15)' }
  return { ...base, background: 'white', color: '#9ca3af', borderColor: '#e4e7ef' }
}

const stepLabelColor = (state: StepState) =>
  state === 'done' || state === 'current' ? '#4f6ef7' : state === 'active' ? '#f59e0b' : '#9ca3af'

const stepIcon = (state: StepState) =>
  state === 'done' ? '✓' : state === 'active' ? '⟳' : state === 'current' ? '⚡' : '○'

const PREVIOUS_REQUESTS = [
  { icon: '▦', name: 'Curated Set #721',         date: 'Completed on Sept 12, 2024', status: 'Completed', ref: 'B-455-98' },
  { icon: '✦', name: 'Special Anniversary Batch', date: 'Completed on Aug 04, 2024',  status: 'Completed', ref: 'X-102-12' },
  { icon: '△', name: 'Foundation Blueprints',     date: 'Completed on July 21, 2024', status: 'Completed', ref: 'F-881-29' },
]

const OrdersPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f0f2f7]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
      <NavBar />

      {/* ── Topbar ── */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-8 h-[52px] bg-white border-b border-[#e4e7ef]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-sm bg-[#4f6ef7]">◈</div>
          <span className="font-bold text-sm hidden sm:block tracking-tight">Precise Curator</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-lg px-2.5 py-1.5 text-xs hidden sm:block bg-[#f4f5f8] border border-[#e4e7ef] text-[#6b7280]">🔔 3</button>
          <button className="rounded-lg px-2.5 py-1.5 text-xs bg-[#f4f5f8] border border-[#e4e7ef] text-[#6b7280]">⚙️</button>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br from-[#4f6ef7] to-[#818cf8]">AT</div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col gap-6 sm:gap-7 px-4 sm:px-8 py-6 sm:py-9 w-full max-w-5xl mx-auto">
        
        {/* Header */}
        <div>
          <h1 className="font-extrabold text-gray-900 text-3xl sm:text-4xl tracking-tighter leading-none">Order Tracking</h1>
          <p className="text-xs mt-1.5 text-[#6b7280]">Monitoring Request: {ORDER.id}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6 items-start">
          
          {/* Status Card */}
          <div className="rounded-2xl p-5 sm:p-6 flex flex-col gap-6 bg-white border border-[#e4e7ef]">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <p className="font-bold text-base">Status: {ORDER.status}</p>
                <p className="text-xs mt-1 text-[#6b7280]">Estimated completion: {ORDER.estimated}</p>
              </div>
              <div className="bg-[#4f6ef7] text-white font-bold rounded-md px-3 py-1.5 text-[10px] tracking-widest uppercase">
                {ORDER.priority}
              </div>
            </div>

            {/* Progress Track */}
            <div className="relative pt-2 pb-6">
              <div className="absolute rounded-full top-[18px] left-4 right-4 h-[3px] bg-[#e4e7ef]" />
              <div className="absolute rounded-full top-[18px] left-4 h-[3px] bg-[#4f6ef7] w-[55%]" />
              <div className="flex justify-between relative z-10">
                {STEPS.map((step) => (
                  <div key={step.key} className="flex flex-col items-center gap-2">
                    <div style={stepCircleStyle(step.state)}>{stepIcon(step.state)}</div>
                    <span className="font-semibold text-center text-[9px] uppercase tracking-wider" style={{ color: stepLabelColor(step.state), maxWidth: 60 }}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: '🚚', label: 'Shipment Method', value: ORDER.shipmentMethod },
                { icon: '📍', label: 'Destination',     value: ORDER.destination    },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3 rounded-xl p-3 bg-[#f8f9fc] border border-[#e4e7ef]">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm bg-[#eef1fe] flex-shrink-0">{s.icon}</div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[9.5px] uppercase tracking-wider text-[#9ca3af]">{s.label}</p>
                    <p className="font-semibold text-[12.5px] text-[#111827] truncate">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overview Card */}
          <div className="rounded-2xl p-5 flex flex-col bg-[#1a1d27] border border-white/10">
            <p className="font-bold text-white mb-4 text-sm">Request Overview</p>
            <div className="flex flex-col gap-1">
              {[
                { key: 'Item count',  val: ORDER.itemCount  },
                { key: 'Total Value', val: ORDER.totalValue },
                { key: 'Last Update', val: ORDER.lastUpdate },
              ].map((row, i, arr) => (
                <div key={row.key} className={`flex justify-between items-center py-2.5 ${i < arr.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <span className="text-[10.5px] text-white/40">{row.key}</span>
                  <span className="font-semibold text-white text-xs">{row.val}</span>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full bg-[#4f6ef7] hover:bg-[#3d56ce] text-white font-bold rounded-xl py-3 text-xs uppercase tracking-wider transition-all">
              Modify Request
            </button>
          </div>
        </div>

        {/* Previous Requests */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-extrabold text-lg tracking-tight">Previous Requests</h2>
            <button className="font-semibold text-xs text-[#4f6ef7] hover:underline">View Archive →</button>
          </div>

          <div className="flex flex-col gap-3">
            {PREVIOUS_REQUESTS.map((req) => (
              <div key={req.ref} className="flex items-center gap-4 px-5 py-4 rounded-xl bg-[#1a1d27] border border-white/5 hover:bg-[#21253a] transition-colors cursor-pointer group">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base bg-[#4f6ef7]/15 text-[#818cf8]">{req.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white truncate text-[13px]">{req.name}</p>
                  <p className="text-[11px] text-white/30 mt-0.5">{req.date}</p>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-1">
                  <p className="text-[9px] uppercase font-bold text-white/30 tracking-widest">Status</p>
                  <p className="font-semibold text-[11px] text-[#22c55e] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" /> {req.status}
                  </p>
                </div>
                <button className="bg-[#4f6ef7]/15 border border-[#4f6ef7]/25 text-[#7b97f9] px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-[#4f6ef7]/30 transition-all">
                  Details
                </button>
              </div>
            ))}
          </div>

          {/* Quick Table */}
          <div className="mt-8 rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
            <div className="px-4 py-3 bg-[#f8f9fc] border-b border-gray-200">
              <h3 className="font-bold text-[13px]">Order History (Quick View)</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['ID', 'Project', 'User', 'Priority', 'Status'].map((label) => (
                      <th key={label} className="px-4 py-3 text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentRequests.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-xs font-medium text-gray-700">#{row.id}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{row.project}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{row.user}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{row.priority}</td>
                      <td className="px-4 py-3 text-xs font-bold" style={{ color: row.status === 'Rejected' ? '#dc2626' : row.status === 'Approved' ? '#16a34a' : '#0ea5e9' }}>
                        {row.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="mt-auto px-4 sm:px-8 py-6 border-t border-[#e4e7ef] bg-white">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] text-[#9ca3af] uppercase tracking-widest text-center">
            © 2024 The Precise Curator. All rights reserved.
          </span>
          <div className="flex flex-wrap justify-center gap-6">
            {['Privacy', 'Terms', 'Support', 'Docs'].map((l) => (
              <a key={l} href="#" className="text-[10px] text-[#9ca3af] hover:text-[#4f6ef7] uppercase tracking-widest no-underline transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default OrdersPage;