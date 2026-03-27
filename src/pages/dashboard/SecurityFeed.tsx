import React from 'react'
import type { SecurityEvent } from './Types'
import Badge from './Badge'

interface SecurityFeedProps {
  events: SecurityEvent[]
  onAction?: (event: SecurityEvent, action: 'block' | 'view') => void
}

const iconColors: Record<string, string> = {
  warn: 'bg-rose-500/10 text-rose-500',
  ok:   'bg-emerald-500/10 text-emerald-500',
  info: 'bg-blue-500/10 text-blue-500',
}

const SecurityFeed: React.FC<SecurityFeedProps> = ({ events, onAction }) => {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col"
      style={{
        background: 'rgba(30,41,59,0.7)',
        border: '1px solid rgba(51,65,85,0.5)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white tracking-tight">System Events</h3>
        <Badge label="Live" color="bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30" />
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-3">
        {events.map((item, i) => (
          <div
            key={i}
            className="relative flex gap-4 p-3 rounded-xl transition-colors duration-150 hover:bg-white/[0.03]"
          >
            {/* Timeline connector */}
            {i < events.length - 1 && (
              <div className="absolute left-[33px] top-12 bottom-[-12px] w-px bg-slate-800" />
            )}

            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-base flex-shrink-0 z-10 border border-white/5 ${iconColors[item.type]}`}
            >
              {item.icon}
            </div>

            <div className="flex-1 min-w-0 pt-0.5">
              <p className="font-semibold text-sm text-slate-200 line-clamp-1">{item.title}</p>
              <p className="text-xs text-slate-400 mt-0.5 font-medium flex items-center gap-1">
                <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {item.meta}
              </p>

              {item.action && (
                <div className="mt-2">
                  {item.action === 'block' ? (
                    <button
                      onClick={() => onAction?.(item, 'block')}
                      className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500 hover:text-white transition-colors duration-150"
                    >
                      Take Action
                    </button>
                  ) : (
                    <button
                      onClick={() => onAction?.(item, 'view')}
                      className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg bg-slate-700 text-slate-300 border border-slate-600 hover:bg-slate-600 hover:text-white transition-colors duration-150"
                    >
                      View Details
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SecurityFeed