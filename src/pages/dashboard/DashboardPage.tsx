import React, { useState } from 'react'
import toast from 'react-hot-toast'
import type { NavKey, MetricCard, StaffMember, SecurityEvent, Request } from './Types'

import Sidebar             from './sidebar'
import DashboardHeader     from './header'
import MetricCards         from './metrikCarts'
import RevenueChart        from './RevenueChart'
import SecurityFeed        from './SecurityFeed'
import StaffPanel          from './StaffPanel'
import TransactionsTable   from './TransictionTable'
import PlaceholderPage     from './PlaceholderPage'

import {
  metricCards,
  chartData,
  securityFeed,
  staffMembers,
  recentRequests,
} from './Data'

// ─────────────────────────────────────────────────────────────────────────────
// DashboardPage
// ─────────────────────────────────────────────────────────────────────────────
const DashboardPage: React.FC = () => {
  const [activeNav, setActiveNav] = useState<NavKey>('dashboard')

  const handleNavigate = (key: NavKey) => {
    setActiveNav(key)
    
  }

  const handleMetricClick = (card: MetricCard) => {
    toast(`Viewing details for: ${card.title}`, {
      icon: '📊',
    })
  }

  const handleSecurityAction = (event: SecurityEvent, action: 'block' | 'view') => {
    if (action === 'block') {
      toast.error(`Blocking threat: ${event.title}`)
    } else {
      toast.loading(`Loading details: ${event.title}`, { duration: 1500 })
    }
  }

  const handleMessage = (member: StaffMember) => {
    toast(`Opening chat with ${member.name}`, {
      icon: '💬',
    })
  }

  const handleRowClick = (request: Request) => {
    toast(`Opening transaction: ${request.project}`, {
      description: `ID: ${request.id}`,
    } as any)
  }

  const handleExport = () => {
    const t = toast.loading('Exporting transactions as CSV…')
    setTimeout(() => {
      toast.success('Transactions exported successfully!', { id: t })
    }, 2000)
  }

  const handleRefresh = () => {
    const t = toast.loading('Refreshing dashboard data…')
    setTimeout(() => {
      toast.success('Dashboard data refreshed', { id: t })
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0b1120] text-slate-200 font-sans selection:bg-indigo-500/30">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-indigo-500/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[320px] h-[320px] bg-sky-500/8 rounded-full blur-[90px] pointer-events-none" />

        <Sidebar activeNav={activeNav} onNavigate={handleNavigate} />

        <main className="flex-1 flex flex-col w-full h-screen overflow-y-auto overflow-x-hidden relative z-10">
          <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">

            {activeNav === 'dashboard' ? (
              <>
                <DashboardHeader onRefresh={handleRefresh} />

                <MetricCards cards={metricCards} onCardClick={handleMetricClick} />

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <RevenueChart data={chartData} />
                  <SecurityFeed events={securityFeed} onAction={handleSecurityAction} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pb-8">
                  <StaffPanel
                    members={staffMembers}
                    onMessage={handleMessage}
                    onViewAll={() => handleNavigate('staff')}
                  />
                  <TransactionsTable
                    requests={recentRequests}
                    onRowClick={handleRowClick}
                    onExport={handleExport}
                  />
                </div>
              </>
            ) : (
              <PlaceholderPage page={activeNav} />
            )}

          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardPage