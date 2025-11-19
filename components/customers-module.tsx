'use client'

import { useState } from 'react'
import { Mail, Phone, Plus, Search, ShoppingBag, TrendingUp, User, Eye } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  type: 'retail' | 'wholesale'
  totalPurchases: number
  lastPurchase: string
  orders: number
}

const customers: Customer[] = [
  { id: '1', name: 'Juan Pérez', email: 'juan@email.com', phone: '+598 99 123 456', type: 'retail', totalPurchases: 2459.97, lastPurchase: '2024-01-15', orders: 12 },
  { id: '2', name: 'María García', email: 'maria@email.com', phone: '+598 99 234 567', type: 'wholesale', totalPurchases: 15789.50, lastPurchase: '2024-01-15', orders: 45 },
  { id: '3', name: 'Carlos Rodríguez', email: 'carlos@email.com', phone: '+598 99 345 678', type: 'retail', totalPurchases: 1879.96, lastPurchase: '2024-01-14', orders: 8 },
  { id: '4', name: 'Ana Martínez', email: 'ana@email.com', phone: '+598 99 456 789', type: 'retail', totalPurchases: 899.99, lastPurchase: '2024-01-14', orders: 5 },
  { id: '5', name: 'Luis Fernández', email: 'luis@email.com', phone: '+598 99 567 890', type: 'wholesale', totalPurchases: 28450.25, lastPurchase: '2024-01-13', orders: 67 },
  { id: '6', name: 'Sofía López', email: 'sofia@email.com', phone: '+598 99 678 901', type: 'retail', totalPurchases: 1245.80, lastPurchase: '2024-01-12', orders: 6 },
]

export function CustomersModule() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const { toast } = useToast()

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || customer.type === filterType
    return matchesSearch && matchesType
  })

  const totalCustomers = customers.length
  const retailCount = customers.filter(c => c.type === 'retail').length
  const wholesaleCount = customers.filter(c => c.type === 'wholesale').length
  const avgPurchase = customers.reduce((sum, c) => sum + c.totalPurchases, 0) / customers.length

  const handleAddCustomer = () => {
    toast({
      title: "Cliente registrado",
      description: "El nuevo cliente se agregó correctamente al sistema.",
    })
    setAddDialogOpen(false)
  }

  const handleViewHistory = (customer: Customer) => {
    setSelectedCustomer(customer)
    setHistoryDialogOpen(true)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Gestión de Clientes</h2>
          <p className="text-muted-foreground mt-1">CRM y seguimiento de clientes</p>
        </div>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Cliente</DialogTitle>
              <DialogDescription>Complete los datos del cliente</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Nombre Completo</Label>
                <Input id="customerName" placeholder="Juan Pérez" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerEmail">Email</Label>
                <Input id="customerEmail" type="email" placeholder="juan@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerPhone">Teléfono</Label>
                <Input id="customerPhone" placeholder="+598 99 123 456" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerType">Tipo de Cliente</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Minorista</SelectItem>
                    <SelectItem value="wholesale">Mayorista</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancelar</Button>
              <Button onClick={handleAddCustomer}>Guardar Cliente</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground mt-1">Registrados activos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Minoristas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{retailCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Clientes retail</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Mayoristas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wholesaleCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Clientes wholesale</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Promedio de Compra</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgPurchase.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground mt-1">Por cliente</p>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Listado de Clientes</CardTitle>
              <CardDescription>Base de datos de clientes registrados</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="retail">Minorista</SelectItem>
                  <SelectItem value="wholesale">Mayorista</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Órdenes</TableHead>
                <TableHead>Total Compras</TableHead>
                <TableHead>Última Compra</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {customer.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {customer.type === 'retail' ? (
                      <Badge variant="outline">Minorista</Badge>
                    ) : (
                      <Badge className="bg-secondary">Mayorista</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{customer.orders}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">${customer.totalPurchases.toLocaleString()}</TableCell>
                  <TableCell>{customer.lastPurchase}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleViewHistory(customer)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Historial
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Customer History Dialog */}
      <Dialog open={historyDialogOpen} onOpenChange={setHistoryDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Historial del Cliente</DialogTitle>
            <DialogDescription>
              Información detallada de {selectedCustomer?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Total Compras</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">${selectedCustomer.totalPurchases.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Órdenes Totales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{selectedCustomer.orders}</p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Últimas Órdenes</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">ORD-2024-045</p>
                      <p className="text-xs text-muted-foreground">2024-01-15</p>
                    </div>
                    <p className="font-semibold">$459.97</p>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">ORD-2024-032</p>
                      <p className="text-xs text-muted-foreground">2024-01-10</p>
                    </div>
                    <p className="font-semibold">$199.99</p>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">ORD-2024-018</p>
                      <p className="text-xs text-muted-foreground">2024-01-05</p>
                    </div>
                    <p className="font-semibold">$89.99</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
