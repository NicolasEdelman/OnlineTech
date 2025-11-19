'use client'

import { useState } from 'react'
import { BarChart3, Download, Package, TrendingUp, FileText } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { useToast } from '@/hooks/use-toast'

interface TopProduct {
  name: string
  sales: number
  revenue: number
  units: number
  margin: number
}

const topProducts: TopProduct[] = [
  { name: 'Teclado Mecánico RGB', sales: 142, revenue: 12778.58, units: 142, margin: 45 },
  { name: 'Mouse Inalámbrico Pro', sales: 98, revenue: 4507.02, units: 98, margin: 52 },
  { name: 'Monitor 27" 4K', sales: 56, revenue: 22399.44, units: 56, margin: 38 },
  { name: 'Auriculares Gaming', sales: 87, revenue: 6959.13, units: 87, margin: 48 },
  { name: 'Webcam HD 1080p', sales: 45, revenue: 2699.55, units: 45, margin: 55 },
]

const salesTrendData = [
  { week: 'Sem 1', ventas: 12500, forecast: 13000 },
  { week: 'Sem 2', ventas: 15200, forecast: 14500 },
  { week: 'Sem 3', ventas: 13800, forecast: 14000 },
  { week: 'Sem 4', ventas: 16500, forecast: 15500 },
  { week: 'Sem 5', ventas: 18200, forecast: 17000 },
  { week: 'Sem 6', ventas: 17800, forecast: 18500 },
]

const categoryMargin = [
  { name: 'Teclados', margen: 45 },
  { name: 'Mouse', margen: 52 },
  { name: 'Monitores', margen: 38 },
  { name: 'Audio', margen: 48 },
  { name: 'Accesorios', margen: 55 },
]

const inventoryRotation = [
  { category: 'Accesorios', rotation: 8.2, color: 'oklch(0.55 0.22 264)' },
  { category: 'Mouse', rotation: 6.5, color: 'oklch(0.65 0.18 290)' },
  { category: 'Teclados', rotation: 5.8, color: 'oklch(0.6 0.15 240)' },
  { category: 'Audio', rotation: 4.2, color: 'oklch(0.7 0.12 280)' },
  { category: 'Monitores', rotation: 3.1, color: 'oklch(0.5 0.2 300)' },
]

export function ReportsModule() {
  const [reportPeriod, setReportPeriod] = useState('month')
  const { toast } = useToast()

  const totalRevenue = topProducts.reduce((sum, p) => sum + p.revenue, 0)
  const avgMargin = topProducts.reduce((sum, p) => sum + p.margin, 0) / topProducts.length

  const handleExportPDF = () => {
    toast({
      title: "Generando reporte",
      description: "El reporte PDF se está descargando...",
    })
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Reportes y Analítica</h2>
          <p className="text-muted-foreground mt-1">Análisis detallado de rendimiento y métricas</p>
        </div>
        <div className="flex gap-2">
          <Select value={reportPeriod} onValueChange={setReportPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta Semana</SelectItem>
              <SelectItem value="month">Este Mes</SelectItem>
              <SelectItem value="quarter">Este Trimestre</SelectItem>
              <SelectItem value="year">Este Año</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExportPDF}>
            <Download className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Top 5 productos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Margen Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgMargin.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">Rentabilidad general</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rotación Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.6x</div>
            <p className="text-xs text-muted-foreground mt-1">Veces por mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Productos Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">428</div>
            <p className="text-xs text-muted-foreground mt-1">SKUs en venta</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Tendencia de Ventas y Forecast</CardTitle>
            <CardDescription>Ventas reales vs proyección</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 264)" />
                <XAxis dataKey="week" stroke="oklch(0.5 0.02 264)" />
                <YAxis stroke="oklch(0.5 0.02 264)" />
                <Tooltip />
                <Line type="monotone" dataKey="ventas" stroke="oklch(0.55 0.22 264)" strokeWidth={2} name="Ventas Reales" />
                <Line type="monotone" dataKey="forecast" stroke="oklch(0.65 0.18 290)" strokeWidth={2} strokeDasharray="5 5" name="Proyección" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Margen por Categoría</CardTitle>
            <CardDescription>Rentabilidad por tipo de producto</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryMargin}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 264)" />
                <XAxis dataKey="name" stroke="oklch(0.5 0.02 264)" />
                <YAxis stroke="oklch(0.5 0.02 264)" />
                <Tooltip />
                <Bar dataKey="margen" fill="oklch(0.55 0.22 264)" radius={[8, 8, 0, 0]} name="Margen %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rotación de Inventario</CardTitle>
            <CardDescription>Velocidad de rotación por categoría</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={inventoryRotation} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 264)" />
                <XAxis type="number" stroke="oklch(0.5 0.02 264)" />
                <YAxis dataKey="category" type="category" stroke="oklch(0.5 0.02 264)" width={100} />
                <Tooltip />
                <Bar dataKey="rotation" radius={[0, 8, 8, 0]} name="Rotación (veces/mes)">
                  {inventoryRotation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Indicadores Clave</CardTitle>
            <CardDescription>Métricas principales del período</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Crecimiento Ventas</p>
                    <p className="text-xs text-muted-foreground">vs mes anterior</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-green-600">+12.5%</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Package className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Ticket Promedio</p>
                    <p className="text-xs text-muted-foreground">Por transacción</p>
                  </div>
                </div>
                <p className="text-2xl font-bold">$245</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Conversión</p>
                    <p className="text-xs text-muted-foreground">Cotización a venta</p>
                  </div>
                </div>
                <p className="text-2xl font-bold">68%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Productos Más Vendidos</CardTitle>
          <CardDescription>Ranking de productos por performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Posición</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Unidades Vendidas</TableHead>
                <TableHead>Ingresos</TableHead>
                <TableHead>Margen</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.map((product, index) => (
                <TableRow key={product.name}>
                  <TableCell>
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-bold">
                      {index + 1}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.units} unidades</TableCell>
                  <TableCell className="font-semibold">${product.revenue.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary"
                          style={{ width: `${product.margin}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12">{product.margin}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Excelente</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
