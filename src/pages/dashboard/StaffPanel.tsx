import React from 'react'
import type { StaffMember } from './Types'

interface StaffPanelProps {
  members: StaffMember[]
  onMessage?: (member: StaffMember) => void
  onViewAll?: () => void
}

const StaffPanel: React.FC<StaffPanelProps> = ({ members, onMessage, onViewAll }) => {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: 'rgba(30,41,59,0.7)',
        border: '1px solid rgba(51,65,85,0.5)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Active Operations</h3>
          <p className="text-xs text-slate-400 mt-0.5">Staff on duty</p>
        </div>
        <button
          onClick={onViewAll}
          className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold transition-colors duration-150"
        >
          View All
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {members.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-3 rounded-xl border border-transparent hover:border-slate-700/50 hover:bg-slate-800/30 transition-colors duration-150 cursor-pointer"
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm ${s.color}`}
              >
                {s.initials}
              </div>
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#0f172a] ${
                  s.online ? 'bg-emerald-500' : 'bg-slate-500'
                }`}
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-slate-200 truncate">{s.name}</p>
              <p className="text-xs text-slate-400 truncate mt-0.5">{s.role}</p>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); onMessage?.(s) }}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors duration-150"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StaffPanel