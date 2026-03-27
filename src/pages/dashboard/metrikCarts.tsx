import React from 'react'
import type { MetricCard } from './Types'

interface MetricCardsProps {
  cards: MetricCard[]
  onCardClick?: (card: MetricCard) => void
}

const MetricCards: React.FC<MetricCardsProps> = ({ cards, onCardClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((metric, i) => (
        <button
          key={i}
          onClick={() => onCardClick?.(metric)}
          className="relative p-6 rounded-2xl overflow-hidden text-left transition-colors duration-150 hover:bg-white/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          style={{
            background: 'rgba(30,41,59,0.7)',
            border: '1px solid rgba(51,65,85,0.5)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Corner decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/[0.04] to-transparent rounded-bl-full pointer-events-none" />

          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{metric.title}</p>
              <div className="flex items-baseline gap-1">
                {metric.curr && <span className="text-xl font-bold text-slate-300">{metric.curr}</span>}
                <span className="text-4xl font-extrabold text-white tracking-tight">{metric.val}</span>
                <span className="text-lg font-semibold text-slate-400">{metric.sub}</span>
              </div>
            </div>
            <div className={`p-3 rounded-xl ${metric.bg} border border-white/5 flex-shrink-0`}>
              <svg className={`w-6 h-6 ${metric.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={metric.icon} />
              </svg>
            </div>
          </div>

          <div className="flex items-center mt-4">
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${
                metric.trend === 'up'
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-rose-500/10 text-rose-400'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d={
                    metric.trend === 'up'
                      ? 'M5 10l7-7m0 0l7 7m-7-7v18'
                      : 'M19 14l-7 7m0 0l-7-7m7 7V3'
                  }
                />
              </svg>
              {metric.percent} vs last week
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

export default MetricCards