'use client'

import { useState } from 'react'
import { ArrowDown, ArrowUp, Calendar, CreditCard, DollarSign, FileText, TrendingDown, TrendingUp, Download } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { useToast } from '@/hooks/use-toast'

interface Transaction {
  id: string
  date: string
  description: string
  type: 'income' | 'expense'
  category: string
  amount: number
  status: 'completed' | 'pending'
}

const transactions: Transaction[] = [
  { id: '1', date: '2024-01-15', description: 'Venta #ORD-2024-001', type: 'income', category: 'Ventas', amount: 459.97, status: 'completed' },
  { id: '2', date: '2024-01-15', description: 'Compra de stock - Teclados', type: 'expense', category: 'Inventario', amount: -1200.00, status: 'completed' },
  { id: '3', date: '2024-01-14', description: 'Venta #ORD-2024-003', type: 'income', category: 'Ventas', amount: 679.96, status: 'completed' },
  { id: '4', date: '2024-01-14', description: 'Pago servicios - Internet', type: 'expense', category: 'Servicios', amount: -80.00, status: 'completed' },
  { id: '5', date: '2024-01-13', description: 'Venta #ORD-2024-005', type: 'income', category: 'Ventas', amount: 199.99, status: 'pending' },
  { id: '6', date: '2024-01-13', description: 'Salarios personal', type: 'expense', category: 'Nómina', amount: -3500.00, status: 'completed' },
]

const cashFlowData = [
  { month: 'Ene', ingresos: 67000, egresos: 45000 },
  { month: 'Feb', ingresos: 52000, egresos: 38000 },
  { month: 'Mar', ingresos: 75000, egresos: 52000 },
  { month: 'Abr', ingresos: 61000, egresos: 44000 },
  { month: 'May', ingresos: 82000, egresos: 56000 },
  { month: 'Jun', ingresos: 67000, egresos: 48000 },
]

export function FinanceModule() {
  const [filterPeriod, setFilterPeriod] = useState('month')
  const [filterType, setFilterType] = useState('all')
  const { toast } = useToast()

  const filteredTransactions = transactions.filter(t => 
    filterType === 'all' || t.type === filterType
  )

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = Math.abs(transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0))
  const netProfit = totalIncome - totalExpenses
  const pendingAmount = transactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0)

  const handleExport = () => {
    toast({
      title: "Exportando reporte",
      description: "El reporte financiero se está generando en formato Excel.",
    })
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Gestión Financiera</h2>
        <p className="text-muted-foreground mt-1">Control de ingresos, egresos y flujo de caja</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Egresos Totales</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Beneficio Neto</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${netProfit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Margen: {((netProfit / totalIncome) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Cuentas por Cobrar</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Pendientes</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Flujo de Caja</CardTitle>
            <CardDescription>Ingresos vs Egresos - Últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 264)" />
                <XAxis dataKey="month" stroke="oklch(0.5 0.02 264)" />
                <YAxis stroke="oklch(0.5 0.02 264)" />
                <Tooltip />
                <Line type="monotone" dataKey="ingresos" stroke="oklch(0.55 0.22 264)" strokeWidth={2} name="Ingresos" />
                <Line type="monotone" dataKey="egresos" stroke="oklch(0.65 0.18 290)" strokeWidth={2} name="Egresos" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comparativa Mensual</CardTitle>
            <CardDescription>Beneficio neto por mes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cashFlowData.map(d => ({ ...d, neto: d.ingresos - d.egresos }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 264)" />
                <XAxis dataKey="month" stroke="oklch(0.5 0.02 264)" />
                <YAxis stroke="oklch(0.5 0.02 264)" />
                <Tooltip />
                <Bar dataKey="neto" fill="oklch(0.55 0.22 264)" radius={[8, 8, 0, 0]} name="Beneficio Neto" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Libro de Movimientos</CardTitle>
              <CardDescription>Registro de ingresos y egresos</CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Esta Semana</SelectItem>
                  <SelectItem value="month">Este Mes</SelectItem>
                  <SelectItem value="year">Este Año</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="income">Ingresos</SelectItem>
                  <SelectItem value="expense">Egresos</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Monto</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {transaction.type === 'income' ? (
                        <ArrowUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-red-600" />
                      )}
                      {transaction.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{transaction.category}</Badge>
                  </TableCell>
                  <TableCell>
                    {transaction.type === 'income' ? (
                      <Badge className="bg-green-600">Ingreso</Badge>
                    ) : (
                      <Badge variant="destructive">Egreso</Badge>
                    )}
                  </TableCell>
                  <TableCell className={`text-right font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : ''}{transaction.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {transaction.status === 'completed' ? (
                      <Badge variant="outline">Completado</Badge>
                    ) : (
                      <Badge variant="secondary">Pendiente</Badge>
                    )}
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
