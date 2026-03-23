import React, { useState } from 'react'
import type { PageName } from '../types'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'
import { recentRequests } from '../data/fakeData'

interface Props {
  setPage: (page: PageName) => void
}

const sideNav = [
  { icon: '⊞', label: 'Dashboard', target: 'dashboard' as PageName },
  { icon: '🏛️', label: 'Projects', target: 'home' as PageName },
  { icon: '👥', label: 'Clients', target: 'home' as PageName },
  { icon: '💰', label: 'Finance', target: 'home' as PageName },
  { icon: '⚙️', label: 'Settings', target: 'home' as PageName },
]

const DashboardPage: React.FC<Props> = ({ setPage }) => {
  const [search, setSearch] = useState('')

  const filtered = recentRequests.filter(
    (r) =>
      r.project.toLowerCase().includes(search.toLowerCase()) ||
      r.user.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── Top Navbar ── */}
      <nav className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <button
          onClick={() => setPage('home')}
          className="text-blue-600 font-bold text-lg tracking-tight font-serif"
        >
          ArchServices
        </button>
        <div className="hidden md:flex gap-1">
          {['Home', 'Messaging', 'Orders'].map((item) => (
            <button
              key={item}
              className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-800 rounded-md transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-1.5 rounded-full transition-colors">
            + New Request
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
            🔔
          </button>
          <button
            onClick={() => setPage('profile')}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            ⚙️
          </button>
        </div>
      </nav>

      <div className="flex flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 gap-5">
        {/* ── Sidebar ── */}
        <aside className="hidden lg:flex flex-col w-44 bg-gray-900 rounded-2xl p-4 gap-1 flex-shrink-0 h-fit sticky top-24">
          {sideNav.map((item) => (
            <button
              key={item.label}
              onClick={() => setPage(item.target)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                item.label === 'Dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-gray-800 flex items-center gap-2 mt-6">
            <Avatar
              initials="AT"
              size="sm"
              color="bg-gradient-to-br from-gray-500 to-gray-700"
            />
            <div>
              <p className="text-xs font-medium text-white">Alex Thorne</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Dashboard Overview
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">
                Welcome back, Alex. Here's what's happening today.
              </p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors">
              + Add New User
            </button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Active Requests */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs text-gray-400 uppercase tracking-widest">
                  Active Requests
                </p>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  +12%
                </span>
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-2">1,284</p>
              <div className="h-1 bg-blue-600 rounded-full w-3/4" />
            </div>
            {/* New Users */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-500 text-sm">👤+</span>
                <p className="text-xs text-gray-400">New Users</p>
              </div>
              <p className="text-4xl font-bold text-gray-900">43</p>
            </div>
            {/* Pending Alerts */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-red-400 text-sm">⚠️</span>
                <p className="text-xs text-gray-400">Pending Alerts</p>
              </div>
              <p className="text-4xl font-bold text-gray-900">07</p>
            </div>
          </div>

          {/* Requests Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Recent Requests</h3>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search requests..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-xl py-2 pl-8 pr-4 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 w-48"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wider">
                    <th className="text-left px-6 py-3 font-medium">User</th>
                    <th className="text-left px-6 py-3 font-medium">
                      Project Name
                    </th>
                    <th className="text-left px-6 py-3 font-medium">Status</th>
                    <th className="text-left px-6 py-3 font-medium">
                      Priority
                    </th>
                    <th className="text-left px-6 py-3 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr
                      key={r.id}
                      className="border-t border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <Avatar
                            initials={r.initials}
                            size="sm"
                            color="bg-gradient-to-br from-blue-400 to-blue-600"
                          />
                          <div>
                            <p className="font-medium text-gray-800 text-xs">
                              {r.user}
                            </p>
                            <p className="text-gray-400 text-xs">{r.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-gray-700 text-xs">
                        {r.project}
                      </td>
                      <td className="px-6 py-3">
                        <Badge label={r.status} color={r.statusColor} />
                      </td>
                      <td className="px-6 py-3 text-xs text-gray-500">
                        {r.priority}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex gap-2">
                          <button className="text-blue-500 hover:text-blue-700 text-xs">
                            ✏️
                          </button>
                          <button className="text-red-400 hover:text-red-600 text-xs">
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Showing {filtered.length} of 42 records
              </p>
              <div className="flex gap-2">
                <button className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 text-gray-600">
                  Previous
                </button>
                <button className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 text-gray-600">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-blue-600 rounded-2xl p-6 text-white">
              <h4 className="font-bold text-lg mb-1">Quarterly Performance</h4>
              <p className="text-blue-200 text-xs leading-relaxed mb-4">
                Your service response time has improved by 18% since last
                quarter. Keep up the excellent work in managing architecture
                requests.
              </p>
              <button className="bg-white text-blue-600 text-xs font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                View Full Report
              </button>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h4 className="font-semibold text-gray-800 mb-3">
                Quick Actions
              </h4>
              <div className="space-y-2">
                {[
                  { icon: '✉️', label: 'Blast Newsletter' },
                  { icon: '🔰', label: 'Audit Logs' },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                        {item.icon}
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-gray-400">›</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardPage
