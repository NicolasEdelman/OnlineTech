'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { DashboardOverview } from '@/components/dashboard-overview'
import { InventoryModule } from '@/components/inventory-module'
import { SalesModule } from '@/components/sales-module'
import { CustomersModule } from '@/components/customers-module'
import { FinanceModule } from '@/components/finance-module'
import { ReportsModule } from '@/components/reports-module'

export type ViewType = 'dashboard' | 'inventory' | 'sales' | 'customers' | 'finance' | 'reports'

export function Dashboard() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard')

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-auto">
        {currentView === 'dashboard' && <DashboardOverview onNavigate={setCurrentView} />}
        {currentView === 'inventory' && <InventoryModule />}
        {currentView === 'sales' && <SalesModule />}
        {currentView === 'customers' && <CustomersModule />}
        {currentView === 'finance' && <FinanceModule />}
        {currentView === 'reports' && <ReportsModule />}
      </main>
    </div>
  )
}
