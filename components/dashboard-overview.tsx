import { ArrowDown, ArrowUp, BarChart3, Box, DollarSign, ShoppingCart, TrendingUp, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { ViewType } from '@/components/dashboard'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

interface DashboardOverviewProps {
  onNavigate: (view: ViewType) => void
}

const salesData = [
  { name: 'Ene', ventas: 45000 },
  { name: 'Feb', ventas: 52000 },
  { name: 'Mar', ventas: 48000 },
  { name: 'Abr', ventas: 61000 },
  { name: 'May', ventas: 55000 },
  { name: 'Jun', ventas: 67000 },
]

const categoryData = [
  { name: 'Teclados', value: 35, color: 'oklch(0.55 0.22 264)' },
  { name: 'Mouse', value: 25, color: 'oklch(0.65 0.18 290)' },
  { name: 'Monitores', value: 20, color: 'oklch(0.6 0.15 240)' },
  { name: 'Accesorios', value: 20, color: 'oklch(0.7 0.12 280)' },
]

const lowStockProducts = [
  { name: 'Teclado Mecánico RGB', stock: 5, sku: 'TEC-001' },
  { name: 'Mouse Inalámbrico Pro', stock: 3, sku: 'MOU-015' },
  { name: 'Monitor 27" 4K', stock: 2, sku: 'MON-008' },
]

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground mt-1">Vista general del sistema OnlineTech ERP</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ventas del Mes</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$67,000</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+12.5%</span> vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Productos en Stock</CardTitle>
            <Box className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowDown className="h-3 w-3 text-red-600" />
              <span className="text-red-600">3 alertas</span> de bajo stock
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Órdenes Activas</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+8</span> nuevas hoy
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+23</span> este mes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Ventas Mensuales</CardTitle>
            <CardDescription>Últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 264)" />
                <XAxis dataKey="name" stroke="oklch(0.5 0.02 264)" />
                <YAxis stroke="oklch(0.5 0.02 264)" />
                <Tooltip />
                <Bar dataKey="ventas" fill="oklch(0.55 0.22 264)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución por Categoría</CardTitle>
            <CardDescription>Ventas por tipo de producto</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Productos con Bajo Stock
            </CardTitle>
            <CardDescription>Requieren reabastecimiento inmediato</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div key={product.sku} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-destructive">{product.stock}</p>
                    <p className="text-xs text-muted-foreground">unidades</p>
                  </div>
                </div>
              ))}
              <Button onClick={() => onNavigate('inventory')} className="w-full" variant="outline">
                Ver Inventario Completo
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accesos Rápidos</CardTitle>
            <CardDescription>Acciones frecuentes del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <Button onClick={() => onNavigate('sales')} className="w-full justify-start" variant="outline">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Nueva Venta (POS)
              </Button>
              <Button onClick={() => onNavigate('inventory')} className="w-full justify-start" variant="outline">
                <Box className="h-4 w-4 mr-2" />
                Agregar Producto
              </Button>
              <Button onClick={() => onNavigate('customers')} className="w-full justify-start" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Registrar Cliente
              </Button>
              <Button onClick={() => onNavigate('reports')} className="w-full justify-start" variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Ver Reportes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
