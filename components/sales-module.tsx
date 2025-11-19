'use client'

import { useState } from 'react'
import { Calendar, CreditCard, Package, Plus, Search, ShoppingCart, Trash2, Check, Receipt, Clock, Gift, Percent, Eye, FileText, Users, DollarSign } from 'lucide-react'
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
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  sku: string
}

interface Order {
  id: string
  orderNumber: string
  date: string
  customer: string
  total: number
  status: 'pending' | 'completed' | 'cancelled'
  items: number
}

const recentOrders: Order[] = [
  { id: '1', orderNumber: 'ORD-2024-001', date: '2024-01-15', customer: 'Juan Pérez', total: 459.97, status: 'completed', items: 3 },
  { id: '2', orderNumber: 'ORD-2024-002', date: '2024-01-15', customer: 'María García', total: 89.99, status: 'pending', items: 1 },
  { id: '3', orderNumber: 'ORD-2024-003', date: '2024-01-14', customer: 'Carlos Rodríguez', total: 679.96, status: 'completed', items: 4 },
  { id: '4', orderNumber: 'ORD-2024-004', date: '2024-01-14', customer: 'Ana Martínez', total: 199.99, status: 'completed', items: 2 },
  { id: '5', orderNumber: 'ORD-2024-005', date: '2024-01-13', customer: 'Luis Fernández', total: 45.99, status: 'cancelled', items: 1 },
]

export function SalesModule() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchProduct, setSearchProduct] = useState('')
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showCombosDialog, setShowCombosDialog] = useState(false)
  const [showDiscountDialog, setShowDiscountDialog] = useState(false)
  const [quotationsDialogOpen, setQuotationsDialogOpen] = useState(false)
  const [returnsDialogOpen, setReturnsDialogOpen] = useState(false)
  const [bulkDiscountDialogOpen, setBulkDiscountDialogOpen] = useState(false)
  const [taxConfigDialogOpen, setTaxConfigDialogOpen] = useState(false)
  const [paymentMethodsDialogOpen, setPaymentMethodsDialogOpen] = useState(false)
  const [loyaltyDialogOpen, setLoyaltyDialogOpen] = useState(false)
  const [detailedHistoryDialogOpen, setDetailedHistoryDialogOpen] = useState(false)
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState('')
  const [selectedPayment, setSelectedPayment] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const { toast } = useToast()

  const addToCart = () => {
    const newItem: CartItem = {
      id: Date.now().toString(),
      name: 'Teclado Mecánico RGB',
      price: 89.99,
      quantity: 1,
      sku: 'TEC-001'
    }
    setCart([...cart, newItem])
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    ))
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.22 // IVA 22% Uruguay
  const total = subtotal + tax

  const handleProcessSale = () => {
    if (!selectedCustomer) {
      toast({
        title: "Error",
        description: "Por favor seleccione un cliente",
        variant: "destructive",
      })
      return
    }
    if (!selectedPayment) {
      toast({
        title: "Error",
        description: "Por favor seleccione un método de pago",
        variant: "destructive",
      })
      return
    }
    setShowSuccessDialog(true)
  }

  const handleCloseSaleSuccess = () => {
    setShowSuccessDialog(false)
    setCart([])
    setSelectedCustomer('')
    setSelectedPayment('')
    toast({
      title: "Venta procesada",
      description: `Venta por $${total.toFixed(2)} completada exitosamente.`,
    })
  }

  const handleShowCombos = () => {
    setShowCombosDialog(true)
  }

  const handleShowDiscount = () => {
    setShowDiscountDialog(true)
  }

  const handleApplyDiscount = () => {
    toast({
      title: "Descuento aplicado",
      description: "Se aplicó un 10% de descuento a la venta.",
    })
    setShowDiscountDialog(false)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Punto de Venta</h2>
        <p className="text-muted-foreground mt-1">Sistema POS y gestión de ventas</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* POS Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Nueva Venta</CardTitle>
              <CardDescription>Agregar productos a la venta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar producto por nombre o SKU..."
                    value={searchProduct}
                    onChange={(e) => setSearchProduct(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Button onClick={addToCart}>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>El carrito está vacío</p>
                  <p className="text-sm mt-1">Busca y agrega productos para comenzar</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Cantidad</TableHead>
                      <TableHead>Subtotal</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.sku}</p>
                          </div>
                        </TableCell>
                        <TableCell>${item.price}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className="w-20"
                            min="1"
                          />
                        </TableCell>
                        <TableCell className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Checkout Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Venta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Cliente</Label>
                <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Juan Pérez</SelectItem>
                    <SelectItem value="2">María García</SelectItem>
                    <SelectItem value="3">Carlos Rodríguez</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment">Método de Pago</Label>
                <Select value={selectedPayment} onValueChange={setSelectedPayment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Efectivo</SelectItem>
                    <SelectItem value="card">Tarjeta</SelectItem>
                    <SelectItem value="transfer">Transferencia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">IVA (22%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full" size="lg" disabled={cart.length === 0} onClick={handleProcessSale}>
                <CreditCard className="h-4 w-4 mr-2" />
                Procesar Venta
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm" onClick={handleShowCombos}>
                <Package className="h-4 w-4 mr-2" />
                Ver Combos
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm" onClick={handleShowDiscount}>
                <Calendar className="h-4 w-4 mr-2" />
                Aplicar Descuento
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Button variant="outline" onClick={() => setQuotationsDialogOpen(true)} className="justify-start">
          <FileText className="h-4 w-4 mr-2" />
          Cotizaciones
        </Button>
        <Button variant="outline" onClick={() => setReturnsDialogOpen(true)} className="justify-start">
          <Package className="h-4 w-4 mr-2" />
          Devoluciones
        </Button>
        <Button variant="outline" onClick={() => setTaxConfigDialogOpen(true)} className="justify-start">
          <Percent className="h-4 w-4 mr-2" />
          Config. Impuestos
        </Button>
        <Button variant="outline" onClick={() => setLoyaltyDialogOpen(true)} className="justify-start">
          <Gift className="h-4 w-4 mr-2" />
          Programa Lealtad
        </Button>
      </div>

      {/* Recent Orders */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Órdenes Recientes</CardTitle>
          <CardDescription>Últimas transacciones realizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número de Orden</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono">{order.orderNumber}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.items} productos</TableCell>
                  <TableCell className="font-semibold">${order.total}</TableCell>
                  <TableCell>
                    {order.status === 'completed' && <Badge className="bg-green-600">Completado</Badge>}
                    {order.status === 'pending' && <Badge variant="secondary">Pendiente</Badge>}
                    {order.status === 'cancelled' && <Badge variant="destructive">Cancelado</Badge>}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => {
                        setSelectedOrder(order)
                        setInvoiceDialogOpen(true)
                      }}>
                        <Receipt className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => {
                        setSelectedOrder(order)
                        setDetailedHistoryDialogOpen(true)
                      }}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <DialogTitle className="text-center">Venta Procesada Exitosamente</DialogTitle>
            <DialogDescription className="text-center">
              La venta se registró correctamente en el sistema
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total:</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Método de pago:</span>
              <span>{selectedPayment === 'cash' ? 'Efectivo' : selectedPayment === 'card' ? 'Tarjeta' : 'Transferencia'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Productos:</span>
              <span>{cart.length} items</span>
            </div>
          </div>
          <Button onClick={handleCloseSaleSuccess} className="w-full">Cerrar</Button>
        </DialogContent>
      </Dialog>

      {/* Combos Dialog */}
      <Dialog open={showCombosDialog} onOpenChange={setShowCombosDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Combos Disponibles</DialogTitle>
            <DialogDescription>Paquetes especiales con descuento</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold">Combo Gaming Básico</h4>
                  <p className="text-sm text-muted-foreground">Teclado + Mouse</p>
                </div>
                <Badge className="bg-green-600">-15%</Badge>
              </div>
              <p className="text-lg font-bold">$115.00</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold">Combo Home Office</h4>
                  <p className="text-sm text-muted-foreground">Monitor + Webcam + Teclado</p>
                </div>
                <Badge className="bg-green-600">-20%</Badge>
              </div>
              <p className="text-lg font-bold">$435.00</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold">Combo Streaming Pro</h4>
                  <p className="text-sm text-muted-foreground">Webcam + Auriculares + Mouse</p>
                </div>
                <Badge className="bg-green-600">-18%</Badge>
              </div>
              <p className="text-lg font-bold">$152.00</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Discount Dialog */}
      <Dialog open={showDiscountDialog} onOpenChange={setShowDiscountDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aplicar Descuento</DialogTitle>
            <DialogDescription>Ingrese el porcentaje de descuento</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Porcentaje de Descuento</Label>
              <Input type="number" placeholder="10" min="0" max="100" />
            </div>
            <div className="space-y-2">
              <Label>Motivo del Descuento</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar motivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="promo">Promoción</SelectItem>
                  <SelectItem value="loyalty">Cliente frecuente</SelectItem>
                  <SelectItem value="bulk">Compra por volumen</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDiscountDialog(false)}>Cancelar</Button>
            <Button onClick={handleApplyDiscount}>Aplicar Descuento</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={quotationsDialogOpen} onOpenChange={setQuotationsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Gestión de Cotizaciones</DialogTitle>
            <DialogDescription>Administrar presupuestos y cotizaciones pendientes</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-end">
              <Button size="sm" onClick={() => toast({ title: "Nueva cotización", description: "Creando nueva cotización" })}>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Cotización
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono">COT-2024-015</TableCell>
                  <TableCell>Juan Pérez</TableCell>
                  <TableCell>2024-01-14</TableCell>
                  <TableCell>$1,245.00</TableCell>
                  <TableCell><Badge variant="secondary">Pendiente</Badge></TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => toast({ title: "Convirtiendo", description: "Convirtiendo cotización a venta" })}>
                      Convertir a Venta
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">COT-2024-014</TableCell>
                  <TableCell>María García</TableCell>
                  <TableCell>2024-01-13</TableCell>
                  <TableCell>$680.50</TableCell>
                  <TableCell><Badge variant="secondary">Pendiente</Badge></TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => toast({ title: "Convirtiendo", description: "Convirtiendo cotización a venta" })}>
                      Convertir a Venta
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={returnsDialogOpen} onOpenChange={setReturnsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Gestión de Devoluciones</DialogTitle>
            <DialogDescription>Procesar devoluciones y reembolsos</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-end">
              <Button size="sm" onClick={() => toast({ title: "Nueva devolución", description: "Iniciando proceso de devolución" })}>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Devolución
              </Button>
            </div>
            <div className="space-y-3">
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold">ORD-2024-042</p>
                    <p className="text-sm text-muted-foreground">Cliente: Carlos Rodríguez</p>
                  </div>
                  <Badge variant="secondary">Pendiente Aprobación</Badge>
                </div>
                <p className="text-sm mb-3">Producto: Monitor 27" 4K</p>
                <p className="text-sm mb-3">Motivo: Defecto de fábrica</p>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => toast({ title: "Aprobado", description: "Devolución aprobada" })}>
                    Aprobar
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => toast({ title: "Rechazado", description: "Devolución rechazada" })}>
                    Rechazar
                  </Button>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold">ORD-2024-038</p>
                    <p className="text-sm text-muted-foreground">Cliente: Ana Martínez</p>
                  </div>
                  <Badge className="bg-green-600">Completado</Badge>
                </div>
                <p className="text-sm mb-3">Producto: Teclado Inalámbrico</p>
                <p className="text-sm">Reembolso: $65.99</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={taxConfigDialogOpen} onOpenChange={setTaxConfigDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configuración de Impuestos</DialogTitle>
            <DialogDescription>Gestionar tasas de IVA y otros impuestos</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Tasa de IVA (%)</Label>
              <Input type="number" defaultValue={22} min={0} max={100} />
            </div>
            <div className="space-y-2">
              <Label>Aplicar a</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los productos</SelectItem>
                  <SelectItem value="category">Por categoría</SelectItem>
                  <SelectItem value="product">Por producto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="include-in-price" />
              <label htmlFor="include-in-price" className="text-sm">Incluir impuesto en precio mostrado</label>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setTaxConfigDialogOpen(false)}>Cancelar</Button>
            <Button onClick={() => {
              toast({ title: "Configuración guardada", description: "Impuestos actualizados correctamente" })
              setTaxConfigDialogOpen(false)
            }}>Guardar</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={loyaltyDialogOpen} onOpenChange={setLoyaltyDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Programa de Lealtad</DialogTitle>
            <DialogDescription>Gestionar puntos y recompensas de clientes frecuentes</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Miembros Activos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">156</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Puntos Emitidos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">45,280</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Puntos Canjeados</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">12,450</p>
                </CardContent>
              </Card>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Configuración de Recompensas</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Puntos por compra</p>
                    <p className="text-sm text-muted-foreground">1 punto por cada $10</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => toast({ title: "Configurando", description: "Editando regla de puntos" })}>
                    Editar
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Descuento con puntos</p>
                    <p className="text-sm text-muted-foreground">100 puntos = $5 descuento</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => toast({ title: "Configurando", description: "Editando regla de canje" })}>
                    Editar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={invoiceDialogOpen} onOpenChange={setInvoiceDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Factura Electrónica</DialogTitle>
            <DialogDescription>
              {selectedOrder?.orderNumber}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-6 border rounded-lg bg-muted/30">
              <div className="flex justify-between mb-6">
                <div>
                  <h3 className="font-bold text-lg">OnlineTech ERP</h3>
                  <p className="text-sm text-muted-foreground">Montevideo, Uruguay</p>
                  <p className="text-sm text-muted-foreground">RUT: 123456789012</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold">{selectedOrder?.orderNumber}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder?.date}</p>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Cliente</h4>
                <p>{selectedOrder?.customer}</p>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Detalle</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>${selectedOrder?.total ? (selectedOrder.total / 1.22).toFixed(2) : '0.00'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>IVA (22%):</span>
                    <span>${selectedOrder?.total ? (selectedOrder.total - (selectedOrder.total / 1.22)).toFixed(2) : '0.00'}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total:</span>
                    <span>${selectedOrder?.total}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => toast({ title: "Descargando", description: "Generando PDF" })}>
                <FileText className="h-4 w-4 mr-2" />
                Descargar PDF
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => toast({ title: "Enviando", description: "Enviando por email" })}>
                Enviar Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
