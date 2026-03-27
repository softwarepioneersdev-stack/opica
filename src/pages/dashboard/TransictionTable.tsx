import React, { useState } from 'react'
import type { Request } from './Types'
import Badge from './Badge'

interface TransactionsTableProps {
  requests: Request[]
  onRowClick?: (request: Request) => void
  onExport?: () => void
}

const HEADERS = ['ID', 'Asset', 'Category', 'Status', 'Timestamp', 'Actions'] as const

const TransactionsTable: React.FC<TransactionsTableProps> = ({ requests, onRowClick, onExport }) => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const PER_PAGE = 5

  const filtered = requests.filter(
    (r) =>
      r.project.toLowerCase().includes(search.toLowerCase()) ||
      r.user.toLowerCase().includes(search.toLowerCase()),
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleSearch = (v: string) => {
    setSearch(v)
    setPage(1)
  }

  return (
    <div
      className="col-span-1 lg:col-span-3 rounded-2xl flex flex-col overflow-hidden"
      style={{
        background: 'rgba(30,41,59,0.7)',
        border: '1px solid rgba(51,65,85,0.5)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Table Header */}
      <div
        className="p-6 border-b"
        style={{ borderColor: 'rgba(51,65,85,0.5)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Recent Transactions</h3>
            <p className="text-xs text-slate-400 mt-1">Latest system activities and operations</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search logs..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 w-full sm:w-56 transition-shadow duration-150"
                style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(51,65,85,0.5)' }}
              />
            </div>
            <button
              onClick={onExport}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold rounded-xl transition-colors duration-150 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left whitespace-nowrap">
          <thead style={{ background: 'rgba(15,23,42,0.3)', borderBottom: '1px solid rgba(51,65,85,0.5)' }}>
            <tr>
              {HEADERS.map((h, i) => (
                <th
                  key={h}
                  className={`px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest ${i === 0 ? 'pl-8' : ''}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {paginated.map((r) => (
              <tr
                key={r.id}
                onClick={() => onRowClick?.(r)}
                className="hover:bg-slate-800/25 transition-colors duration-100 cursor-pointer"
              >
                <td className="px-6 py-4 pl-8">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono" style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(51,65,85,0.5)' }}>
                    <span className="text-indigo-400">#</span>
                    <span className="text-slate-300">{String(r.id).slice(0, 7)}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-sm text-slate-200">{r.project}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{r.user}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300">
                    {r.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Badge label={r.status} color={r.statusColor} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {r.email ?? new Date().toLocaleTimeString()}
                  </div>
                </td>
                <td className="px-6 py-4 pr-8 text-right" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="text-slate-400 hover:text-indigo-400 p-2 rounded-lg hover:bg-indigo-500/10 transition-colors duration-150"
                    onClick={() => onRowClick?.(r)}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center text-slate-500">
                    <svg className="w-10 h-10 mb-3 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm font-medium">No records found for "{search}"</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        className="mt-auto px-6 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ borderColor: 'rgba(51,65,85,0.5)', background: 'rgba(15,23,42,0.2)' }}
      >
        <p className="text-xs text-slate-500 font-medium">
          Showing {paginated.length} of {filtered.length} entries
        </p>
        <div className="flex gap-1.5">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-150 ${
                page === p
                  ? 'bg-indigo-500 text-white'
                  : 'border border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransactionsTable