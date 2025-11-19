import { BarChart3, Box, DollarSign, LayoutDashboard, ShoppingCart, Users } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { ViewType } from '@/components/dashboard'

interface SidebarProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as ViewType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory' as ViewType, label: 'Inventario', icon: Box },
    { id: 'sales' as ViewType, label: 'Ventas', icon: ShoppingCart },
    { id: 'customers' as ViewType, label: 'Clientes', icon: Users },
    { id: 'finance' as ViewType, label: 'Finanzas', icon: DollarSign },
    { id: 'reports' as ViewType, label: 'Reportes', icon: BarChart3 },
  ]

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Image
            src="/OnlineTech.png"
            alt="OnlineTech Logo"
            width={62}
            height={62}
            className="flex-shrink-0"
          />
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              OnlineTech
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Sistema ERP</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentView === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">Admin</p>
            <p className="text-xs text-muted-foreground truncate">admin@onlinetech.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
