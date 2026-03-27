import React, { useState } from 'react'
import type { ChartPoint } from './Types'

interface RevenueChartProps {
  data: ChartPoint[]
}

type Range = 'Daily' | 'Weekly' | 'Monthly'

const weeklyData: ChartPoint[]  = [
  { date: 'W1', value: 2100 }, { date: 'W2', value: 3400 },
  { date: 'W3', value: 2800 }, { date: 'W4', value: 4100 },
]
const monthlyData: ChartPoint[] = [
  { date: 'Jan', value: 9000  }, { date: 'Feb', value: 11000 }, { date: 'Mar', value: 8500 },
  { date: 'Apr', value: 13000 }, { date: 'May', value: 15000 }, { date: 'Jun', value: 12000 },
]

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  const [range, setRange] = useState<Range>('Daily')

  const display: Record<Range, ChartPoint[]> = {
    Daily: data,
    Weekly: weeklyData,
    Monthly: monthlyData,
  }

  const activeData = display[range]
  const max = Math.max(...activeData.map((d) => d.value))

  return (
    <div
      className="xl:col-span-2 rounded-2xl flex flex-col p-6 relative overflow-hidden"
      style={{
        background: 'rgba(30,41,59,0.7)',
        border: '1px solid rgba(51,65,85,0.5)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Revenue Analytics</h3>
          <p className="text-sm text-slate-400 mt-0.5">Performance overview</p>
        </div>
        <div
          className="flex items-center p-1 rounded-lg"
          style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(51,65,85,0.5)' }}
        >
          {(['Daily', 'Weekly', 'Monthly'] as Range[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors duration-150 ${
                range === r ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Bars */}
      <div className="relative flex-1 min-h-[220px] flex items-end gap-2 sm:gap-3 md:gap-4 pt-8">
        {activeData.map((d, i) => {
          const pct = (d.value / max) * 100
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 relative group h-full justify-end">
              {/* Tooltip */}
              <div
                className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-slate-800 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-xl border border-slate-700 z-10 whitespace-nowrap pointer-events-none"
              >
                ${d.value.toLocaleString()}
              </div>

              {/* Bar container */}
              <div className="w-full h-full relative rounded-t-md overflow-hidden flex items-end" style={{ background: 'rgba(30,41,59,0.5)' }}>
                <div
                  className="w-full bg-gradient-to-t from-indigo-600 to-sky-400 rounded-t-md"
                  style={{ height: `${pct}%`, transition: 'height 0.4s ease' }}
                />
              </div>

              <span className="text-xs font-medium text-slate-400 group-hover:text-slate-200 transition-colors duration-150">
                {d.date}
              </span>
            </div>
          )
        })}

        {/* Grid lines */}
        <div className="absolute top-0 w-full border-b border-dashed border-slate-700/40 pointer-events-none" />
        <div className="absolute top-1/2 w-full border-b border-dashed border-slate-700/40 pointer-events-none" />
      </div>
    </div>
  )
}

export default RevenueChart