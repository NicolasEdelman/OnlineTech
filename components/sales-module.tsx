'use client'

import { useState } from 'react'
import { Calendar, CreditCard, Package, Plus, Search, ShoppingCart, Trash2, Check, Receipt, Clock, Gift, Percent, Eye, FileText, Users, DollarSign, Edit, X, Send, Download, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
  customerEmail?: string
  customerPhone?: string
  total: number
  status: 'pending' | 'completed' | 'cancelled'
  items: number
  products?: Array<{
    id: string
    name: string
    sku: string
    quantity: number
    price: number
    subtotal: number
  }>
  paymentMethod?: 'cash' | 'card' | 'transfer'
  discount?: number
  tax?: number
  notes?: string
}

interface Quotation {
  id: string
  number: string
  customer: string
  customerEmail?: string
  customerPhone?: string
  date: string
  expiryDate?: string
  total: number
  status: 'pending' | 'approved' | 'rejected' | 'converted' | 'expired'
  items: Array<{
    id: string
    name: string
    sku: string
    quantity: number
    price: number
    subtotal: number
  }>
  notes?: string
  discount?: number
  tax?: number
}

const recentOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-01-15',
    customer: 'Juan Pérez',
    customerEmail: 'juan.perez@email.com',
    customerPhone: '+598 99 123 456',
    total: 459.97,
    status: 'completed',
    items: 3,
    products: [
      { id: '1', name: 'Teclado Mecánico RGB', sku: 'TEC-001', quantity: 2, price: 89.99, subtotal: 179.98 },
      { id: '2', name: 'Mouse Inalámbrico Pro', sku: 'MOU-015', quantity: 1, price: 45.99, subtotal: 45.99 },
      { id: '3', name: 'Webcam HD 1080p', sku: 'WEB-003', quantity: 2, price: 59.99, subtotal: 119.98 },
    ],
    paymentMethod: 'card',
    discount: 5,
    tax: 22,
    notes: 'Cliente frecuente - Descuento aplicado',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-01-15',
    customer: 'María García',
    customerEmail: 'maria.garcia@email.com',
    total: 89.99,
    status: 'pending',
    items: 1,
    products: [
      { id: '1', name: 'Mouse Pad XXL', sku: 'PAD-005', quantity: 1, price: 24.99, subtotal: 24.99 },
    ],
    paymentMethod: 'cash',
    tax: 22,
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: '2024-01-14',
    customer: 'Carlos Rodríguez',
    customerEmail: 'carlos.rodriguez@email.com',
    customerPhone: '+598 99 345 678',
    total: 679.96,
    status: 'completed',
    items: 4,
    products: [
      { id: '1', name: 'Monitor 27" 4K', sku: 'MON-008', quantity: 1, price: 399.99, subtotal: 399.99 },
      { id: '2', name: 'Auriculares Gaming', sku: 'AUR-012', quantity: 2, price: 79.99, subtotal: 159.98 },
      { id: '3', name: 'Teclado Inalámbrico', sku: 'TEC-007', quantity: 1, price: 65.99, subtotal: 65.99 },
    ],
    paymentMethod: 'transfer',
    tax: 22,
    notes: 'Entrega en oficina',
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    date: '2024-01-14',
    customer: 'Ana Martínez',
    customerEmail: 'ana.martinez@email.com',
    total: 199.99,
    status: 'completed',
    items: 2,
    products: [
      { id: '1', name: 'Monitor 24" Full HD', sku: 'MON-015', quantity: 1, price: 199.99, subtotal: 199.99 },
    ],
    paymentMethod: 'card',
    tax: 22,
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-005',
    date: '2024-01-13',
    customer: 'Luis Fernández',
    customerPhone: '+598 99 567 890',
    total: 45.99,
    status: 'cancelled',
    items: 1,
    products: [
      { id: '1', name: 'Mouse Inalámbrico Pro', sku: 'MOU-015', quantity: 1, price: 45.99, subtotal: 45.99 },
    ],
    paymentMethod: 'cash',
    tax: 22,
    notes: 'Cancelado por cliente - Cambio de opinión',
  },
]

const initialQuotations: Quotation[] = [
  {
    id: '1',
    number: 'COT-2024-015',
    customer: 'Juan Pérez',
    customerEmail: 'juan.perez@email.com',
    customerPhone: '+598 99 123 456',
    date: '2024-01-14',
    expiryDate: '2024-02-14',
    total: 1245.00,
    status: 'pending',
    items: [
      { id: '1', name: 'Teclado Mecánico RGB', sku: 'TEC-001', quantity: 5, price: 89.99, subtotal: 449.95 },
      { id: '2', name: 'Monitor 27" 4K', sku: 'MON-008', quantity: 2, price: 399.99, subtotal: 799.98 },
    ],
    notes: 'Cotización para renovación de equipos de oficina',
    discount: 5,
    tax: 22,
  },
  {
    id: '2',
    number: 'COT-2024-014',
    customer: 'María García',
    customerEmail: 'maria.garcia@email.com',
    customerPhone: '+598 99 234 567',
    date: '2024-01-13',
    expiryDate: '2024-02-13',
    total: 680.50,
    status: 'pending',
    items: [
      { id: '1', name: 'Mouse Inalámbrico Pro', sku: 'MOU-015', quantity: 10, price: 45.99, subtotal: 459.90 },
      { id: '2', name: 'Auriculares Gaming', sku: 'AUR-012', quantity: 3, price: 79.99, subtotal: 239.97 },
    ],
    discount: 0,
    tax: 22,
  },
  {
    id: '3',
    number: 'COT-2024-013',
    customer: 'Carlos Rodríguez',
    customerEmail: 'carlos.rodriguez@email.com',
    customerPhone: '+598 99 345 678',
    date: '2024-01-12',
    expiryDate: '2024-02-12',
    total: 2150.75,
    status: 'approved',
    items: [
      { id: '1', name: 'Monitor 27" 4K', sku: 'MON-008', quantity: 5, price: 399.99, subtotal: 1999.95 },
    ],
    notes: 'Aprobada por cliente, esperando confirmación de pago',
    discount: 10,
    tax: 22,
  },
  {
    id: '4',
    number: 'COT-2024-012',
    customer: 'Ana Martínez',
    date: '2024-01-11',
    expiryDate: '2024-02-11',
    total: 445.50,
    status: 'converted',
    items: [
      { id: '1', name: 'Webcam HD 1080p', sku: 'WEB-003', quantity: 7, price: 59.99, subtotal: 419.93 },
    ],
    tax: 22,
  },
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
  const [quotations, setQuotations] = useState<Quotation[]>(initialQuotations)
  const [quotationAddDialogOpen, setQuotationAddDialogOpen] = useState(false)
  const [quotationViewDialogOpen, setQuotationViewDialogOpen] = useState(false)
  const [quotationEditDialogOpen, setQuotationEditDialogOpen] = useState(false)
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null)
  const [quotationSearchTerm, setQuotationSearchTerm] = useState('')
  const [quotationStatusFilter, setQuotationStatusFilter] = useState<string>('all')
  const [loyaltyPointsPerPurchase, setLoyaltyPointsPerPurchase] = useState({ amount: 10, points: 1 })
  const [loyaltyPointsDiscount, setLoyaltyPointsDiscount] = useState({ points: 100, discount: 5 })
  const [editPointsPerPurchaseOpen, setEditPointsPerPurchaseOpen] = useState(false)
  const [editPointsDiscountOpen, setEditPointsDiscountOpen] = useState(false)
  const [tempPointsPerPurchase, setTempPointsPerPurchase] = useState({ amount: 10, points: 1 })
  const [tempPointsDiscount, setTempPointsDiscount] = useState({ points: 100, discount: 5 })
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

      {/* Quotations Management Dialog */}
      <Dialog open={quotationsDialogOpen} onOpenChange={setQuotationsDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-2xl">Gestión de Cotizaciones</DialogTitle>
            <DialogDescription>Administrar presupuestos y cotizaciones pendientes</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 flex-1 overflow-hidden flex flex-col">
            {/* Filtros y acciones */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por número, cliente..."
                    value={quotationSearchTerm}
                    onChange={(e) => setQuotationSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={quotationStatusFilter} onValueChange={setQuotationStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="approved">Aprobada</SelectItem>
                    <SelectItem value="rejected">Rechazada</SelectItem>
                    <SelectItem value="converted">Convertida</SelectItem>
                    <SelectItem value="expired">Vencida</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button size="sm" onClick={() => {
                setSelectedQuotation(null)
                setQuotationAddDialogOpen(true)
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Cotización
              </Button>
            </div>

            {/* Tabla con scroll */}
            <div className="flex-1 overflow-auto border rounded-lg">
              <Table>
                <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow>
                    <TableHead className="w-[140px]">Número</TableHead>
                    <TableHead className="min-w-[180px]">Cliente</TableHead>
                    <TableHead className="w-[120px]">Fecha</TableHead>
                    <TableHead className="w-[120px]">Válida Hasta</TableHead>
                    <TableHead className="w-[120px] text-right">Total</TableHead>
                    <TableHead className="w-[120px]">Estado</TableHead>
                    <TableHead className="w-[180px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quotations
                    .filter((quote) => {
                      const matchesSearch = quote.number.toLowerCase().includes(quotationSearchTerm.toLowerCase()) ||
                                          quote.customer.toLowerCase().includes(quotationSearchTerm.toLowerCase())
                      const matchesStatus = quotationStatusFilter === 'all' || quote.status === quotationStatusFilter
                      return matchesSearch && matchesStatus
                    })
                    .length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                        No se encontraron cotizaciones
                      </TableCell>
                    </TableRow>
                  ) : (
                    quotations
                      .filter((quote) => {
                        const matchesSearch = quote.number.toLowerCase().includes(quotationSearchTerm.toLowerCase()) ||
                                            quote.customer.toLowerCase().includes(quotationSearchTerm.toLowerCase())
                        const matchesStatus = quotationStatusFilter === 'all' || quote.status === quotationStatusFilter
                        return matchesSearch && matchesStatus
                      })
                      .map((quote) => (
                        <TableRow key={quote.id}>
                          <TableCell className="font-mono text-sm">{quote.number}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{quote.customer}</p>
                              {quote.customerEmail && (
                                <p className="text-xs text-muted-foreground">{quote.customerEmail}</p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{quote.date}</TableCell>
                          <TableCell className="text-sm">
                            {quote.expiryDate ? (
                              <span className={quote.status === 'expired' ? 'text-destructive' : ''}>
                                {quote.expiryDate}
                              </span>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right font-semibold">${quote.total.toLocaleString('es-UY', { minimumFractionDigits: 2 })}</TableCell>
                          <TableCell>
                            {quote.status === 'pending' && <Badge variant="secondary">Pendiente</Badge>}
                            {quote.status === 'approved' && <Badge className="bg-blue-600">Aprobada</Badge>}
                            {quote.status === 'rejected' && <Badge variant="destructive">Rechazada</Badge>}
                            {quote.status === 'converted' && <Badge className="bg-green-600">Convertida</Badge>}
                            {quote.status === 'expired' && <Badge variant="outline" className="border-red-500 text-red-500">Vencida</Badge>}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" onClick={() => {
                                setSelectedQuotation(quote)
                                setQuotationViewDialogOpen(true)
                              }}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              {quote.status !== 'converted' && quote.status !== 'rejected' && (
                                <>
                                  <Button variant="ghost" size="sm" onClick={() => {
                                    setSelectedQuotation(quote)
                                    setQuotationEditDialogOpen(true)
                                  }}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  {quote.status === 'pending' && (
                                    <Button size="sm" variant="outline" onClick={() => {
                                      setQuotations(quotations.map(q => 
                                        q.id === quote.id ? { ...q, status: 'converted' as const } : q
                                      ))
                                      toast({
                                        title: "Cotización convertida",
                                        description: `La cotización ${quote.number} se convirtió a venta correctamente.`,
                                      })
                                    }}>
                                      Convertir a Venta
                                    </Button>
                                  )}
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Resumen */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Mostrando <span className="font-medium text-foreground">
                  {quotations.filter((quote) => {
                    const matchesSearch = quote.number.toLowerCase().includes(quotationSearchTerm.toLowerCase()) ||
                                        quote.customer.toLowerCase().includes(quotationSearchTerm.toLowerCase())
                    const matchesStatus = quotationStatusFilter === 'all' || quote.status === quotationStatusFilter
                    return matchesSearch && matchesStatus
                  }).length}
                </span> cotización(es)
              </div>
              <div className="text-sm text-muted-foreground">
                Total: <span className="font-medium text-foreground">
                  ${quotations
                    .filter((quote) => {
                      const matchesSearch = quote.number.toLowerCase().includes(quotationSearchTerm.toLowerCase()) ||
                                          quote.customer.toLowerCase().includes(quotationSearchTerm.toLowerCase())
                      const matchesStatus = quotationStatusFilter === 'all' || quote.status === quotationStatusFilter
                      return matchesSearch && matchesStatus
                    })
                    .reduce((sum, q) => sum + q.total, 0)
                    .toLocaleString('es-UY', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Quotation Dialog */}
      <Dialog open={quotationViewDialogOpen} onOpenChange={setQuotationViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles de la Cotización</DialogTitle>
            <DialogDescription>{selectedQuotation?.number}</DialogDescription>
          </DialogHeader>
          {selectedQuotation && (
            <div className="space-y-6 py-4">
              {/* Información del Cliente */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-muted-foreground">Cliente</Label>
                  <p className="font-semibold text-lg mt-1">{selectedQuotation.customer}</p>
                  {selectedQuotation.customerEmail && (
                    <p className="text-sm text-muted-foreground mt-1">{selectedQuotation.customerEmail}</p>
                  )}
                  {selectedQuotation.customerPhone && (
                    <p className="text-sm text-muted-foreground">{selectedQuotation.customerPhone}</p>
                  )}
                </div>
                <div className="space-y-3">
                  <div>
                    <Label className="text-muted-foreground">Fecha de Emisión</Label>
                    <p className="mt-1">{selectedQuotation.date}</p>
                  </div>
                  {selectedQuotation.expiryDate && (
                    <div>
                      <Label className="text-muted-foreground">Válida Hasta</Label>
                      <p className={`mt-1 ${selectedQuotation.status === 'expired' ? 'text-destructive font-semibold' : ''}`}>
                        {selectedQuotation.expiryDate}
                      </p>
                    </div>
                  )}
                  <div>
                    <Label className="text-muted-foreground">Estado</Label>
                    <div className="mt-1">
                      {selectedQuotation.status === 'pending' && <Badge variant="secondary">Pendiente</Badge>}
                      {selectedQuotation.status === 'approved' && <Badge className="bg-blue-600">Aprobada</Badge>}
                      {selectedQuotation.status === 'rejected' && <Badge variant="destructive">Rechazada</Badge>}
                      {selectedQuotation.status === 'converted' && <Badge className="bg-green-600">Convertida</Badge>}
                      {selectedQuotation.status === 'expired' && <Badge variant="outline" className="border-red-500 text-red-500">Vencida</Badge>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Items de la Cotización */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-4">Productos Cotizados</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead className="text-right">Cantidad</TableHead>
                      <TableHead className="text-right">Precio Unit.</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedQuotation.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="font-mono text-sm text-muted-foreground">{item.sku}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">${item.price.toLocaleString('es-UY', { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-right font-semibold">${item.subtotal.toLocaleString('es-UY', { minimumFractionDigits: 2 })}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Totales */}
              <div className="border-t pt-4">
                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span>${(selectedQuotation.total / (1 + (selectedQuotation.tax || 0) / 100) / (1 - (selectedQuotation.discount || 0) / 100)).toFixed(2)}</span>
                    </div>
                    {selectedQuotation.discount && selectedQuotation.discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Descuento ({selectedQuotation.discount}%):</span>
                        <span className="text-green-600">-${((selectedQuotation.total / (1 + (selectedQuotation.tax || 0) / 100)) * (selectedQuotation.discount / 100)).toFixed(2)}</span>
                      </div>
                    )}
                    {selectedQuotation.tax && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">IVA ({selectedQuotation.tax}%):</span>
                        <span>${(selectedQuotation.total - (selectedQuotation.total / (1 + selectedQuotation.tax / 100))).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total:</span>
                      <span>${selectedQuotation.total.toLocaleString('es-UY', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notas */}
              {selectedQuotation.notes && (
                <div className="border-t pt-4">
                  <Label className="text-muted-foreground">Notas</Label>
                  <p className="mt-2 p-3 bg-muted rounded-lg">{selectedQuotation.notes}</p>
                </div>
              )}
            </div>
          )}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setQuotationViewDialogOpen(false)}>
              Cerrar
            </Button>
            {selectedQuotation && (
              <>
                <Button variant="outline" onClick={() => {
                  toast({ title: "Descargando", description: "Generando PDF de cotización..." })
                }}>
                  <Download className="h-4 w-4 mr-2" />
                  Descargar PDF
                </Button>
                {selectedQuotation.customerEmail && (
                  <Button variant="outline" onClick={() => {
                    toast({ title: "Enviando", description: `Enviando cotización a ${selectedQuotation.customerEmail}...` })
                  }}>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar por Email
                  </Button>
                )}
                {selectedQuotation.status === 'pending' && (
                  <Button onClick={() => {
                    setQuotationViewDialogOpen(false)
                    setQuotationEditDialogOpen(true)
                  }}>
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Cotización
                  </Button>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Quotation Dialog */}
      <Dialog open={quotationAddDialogOpen || quotationEditDialogOpen} onOpenChange={(open) => {
        setQuotationAddDialogOpen(open && !quotationEditDialogOpen)
        setQuotationEditDialogOpen(open && quotationAddDialogOpen)
        if (!open) setSelectedQuotation(null)
      }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{quotationEditDialogOpen ? 'Editar Cotización' : 'Nueva Cotización'}</DialogTitle>
            <DialogDescription>
              {quotationEditDialogOpen ? 'Modificar información de la cotización' : 'Crear una nueva cotización para un cliente'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Información del Cliente */}
            <div className="space-y-4">
              <h4 className="font-semibold">Información del Cliente</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quote-customer">Cliente *</Label>
                  <Input
                    id="quote-customer"
                    defaultValue={selectedQuotation?.customer || ''}
                    placeholder="Nombre completo del cliente"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quote-email">Email</Label>
                  <Input
                    id="quote-email"
                    type="email"
                    defaultValue={selectedQuotation?.customerEmail || ''}
                    placeholder="cliente@email.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quote-phone">Teléfono</Label>
                <Input
                  id="quote-phone"
                  defaultValue={selectedQuotation?.customerPhone || ''}
                  placeholder="+598 99 123 456"
                />
              </div>
            </div>

            {/* Fechas */}
            <div className="space-y-4">
              <h4 className="font-semibold">Fechas</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quote-date">Fecha de Emisión *</Label>
                  <Input
                    id="quote-date"
                    type="date"
                    defaultValue={selectedQuotation?.date || new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quote-expiry">Válida Hasta</Label>
                  <Input
                    id="quote-expiry"
                    type="date"
                    defaultValue={selectedQuotation?.expiryDate || ''}
                  />
                  <p className="text-xs text-muted-foreground">Opcional: fecha de vencimiento de la cotización</p>
                </div>
              </div>
            </div>

            {/* Productos */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Productos</h4>
                <Button size="sm" variant="outline" onClick={() => {
                  toast({ title: "Agregar producto", description: "Buscador de productos (funcionalidad en desarrollo)" })
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Producto
                </Button>
              </div>
              {selectedQuotation ? (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Producto</TableHead>
                        <TableHead className="text-right">Cant.</TableHead>
                        <TableHead className="text-right">Precio</TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedQuotation.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.sku}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right font-semibold">${item.subtotal.toFixed(2)}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => {
                              toast({ title: "Eliminando", description: "Removiendo producto..." })
                            }}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="border rounded-lg p-8 text-center text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No hay productos agregados</p>
                  <p className="text-sm mt-1">Haz clic en "Agregar Producto" para comenzar</p>
                </div>
              )}
            </div>

            {/* Descuentos e Impuestos */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quote-discount">Descuento (%)</Label>
                <Input
                  id="quote-discount"
                  type="number"
                  min="0"
                  max="100"
                  defaultValue={selectedQuotation?.discount || 0}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quote-tax">IVA (%)</Label>
                <Input
                  id="quote-tax"
                  type="number"
                  min="0"
                  max="100"
                  defaultValue={selectedQuotation?.tax || 22}
                  placeholder="22"
                />
              </div>
            </div>

            {/* Notas */}
            <div className="space-y-2">
              <Label htmlFor="quote-notes">Notas Adicionales</Label>
              <Textarea
                id="quote-notes"
                defaultValue={selectedQuotation?.notes || ''}
                placeholder="Información adicional sobre la cotización..."
                rows={4}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => {
              setQuotationAddDialogOpen(false)
              setQuotationEditDialogOpen(false)
              setSelectedQuotation(null)
            }}>
              Cancelar
            </Button>
            <Button onClick={() => {
              const customerName = (document.getElementById('quote-customer') as HTMLInputElement)?.value
              if (customerName && customerName.trim()) {
                if (quotationEditDialogOpen && selectedQuotation) {
                  const updated: Quotation = {
                    ...selectedQuotation,
                    customer: customerName.trim(),
                    customerEmail: (document.getElementById('quote-email') as HTMLInputElement)?.value || undefined,
                    customerPhone: (document.getElementById('quote-phone') as HTMLInputElement)?.value || undefined,
                    date: (document.getElementById('quote-date') as HTMLInputElement)?.value || selectedQuotation.date,
                    expiryDate: (document.getElementById('quote-expiry') as HTMLInputElement)?.value || undefined,
                    discount: parseFloat((document.getElementById('quote-discount') as HTMLInputElement)?.value || '0'),
                    tax: parseFloat((document.getElementById('quote-tax') as HTMLInputElement)?.value || '22'),
                    notes: (document.getElementById('quote-notes') as HTMLTextAreaElement)?.value || undefined,
                  }
                  setQuotations(quotations.map(q => q.id === updated.id ? updated : q))
                  setQuotationEditDialogOpen(false)
                  toast({
                    title: "Cotización actualizada",
                    description: `La cotización ${updated.number} se actualizó correctamente.`,
                  })
                } else {
                  const newNumber = `COT-2024-${String(quotations.length + 1).padStart(3, '0')}`
                  const subtotal = 1000 // Placeholder, debería calcularse desde los items
                  const discount = parseFloat((document.getElementById('quote-discount') as HTMLInputElement)?.value || '0')
                  const tax = parseFloat((document.getElementById('quote-tax') as HTMLInputElement)?.value || '22')
                  const total = (subtotal * (1 - discount / 100)) * (1 + tax / 100)
                  
                  const newQuotation: Quotation = {
                    id: Date.now().toString(),
                    number: newNumber,
                    customer: customerName.trim(),
                    customerEmail: (document.getElementById('quote-email') as HTMLInputElement)?.value || undefined,
                    customerPhone: (document.getElementById('quote-phone') as HTMLInputElement)?.value || undefined,
                    date: (document.getElementById('quote-date') as HTMLInputElement)?.value || new Date().toISOString().split('T')[0],
                    expiryDate: (document.getElementById('quote-expiry') as HTMLInputElement)?.value || undefined,
                    total,
                    status: 'pending',
                    items: [],
                    discount,
                    tax,
                    notes: (document.getElementById('quote-notes') as HTMLTextAreaElement)?.value || undefined,
                  }
                  setQuotations([...quotations, newQuotation])
                  setQuotationAddDialogOpen(false)
                  toast({
                    title: "Cotización creada",
                    description: `La cotización ${newNumber} se creó correctamente.`,
                  })
                }
                setSelectedQuotation(null)
              }
            }}>
              {quotationEditDialogOpen ? 'Guardar Cambios' : 'Crear Cotización'}
            </Button>
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
                    <p className="text-sm text-muted-foreground">{loyaltyPointsPerPurchase.points} punto{loyaltyPointsPerPurchase.points !== 1 ? 's' : ''} por cada ${loyaltyPointsPerPurchase.amount}</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => setEditPointsPerPurchaseOpen(true)}>
                    Editar
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Descuento con puntos</p>
                    <p className="text-sm text-muted-foreground">{loyaltyPointsDiscount.points} puntos = ${loyaltyPointsDiscount.discount} descuento</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => setEditPointsDiscountOpen(true)}>
                    Editar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Points Per Purchase Dialog */}
      <Dialog open={editPointsPerPurchaseOpen} onOpenChange={(open) => {
        setEditPointsPerPurchaseOpen(open)
        if (open) {
          setTempPointsPerPurchase(loyaltyPointsPerPurchase)
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Puntos por Compra</DialogTitle>
            <DialogDescription>Configurar cuántos puntos se otorgan por cada monto gastado</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="points-amount">Monto en pesos ($)</Label>
              <Input
                id="points-amount"
                type="number"
                min="1"
                value={tempPointsPerPurchase.amount}
                onChange={(e) => setTempPointsPerPurchase({ ...tempPointsPerPurchase, amount: parseFloat(e.target.value) || 0 })}
                placeholder="10"
              />
              <p className="text-xs text-muted-foreground">Cada cuánto dinero se otorgan puntos</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="points-given">Puntos otorgados</Label>
              <Input
                id="points-given"
                type="number"
                min="1"
                value={tempPointsPerPurchase.points}
                onChange={(e) => setTempPointsPerPurchase({ ...tempPointsPerPurchase, points: parseInt(e.target.value) || 0 })}
                placeholder="1"
              />
              <p className="text-xs text-muted-foreground">Cantidad de puntos otorgados</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium">Vista previa:</p>
              <p className="text-sm text-muted-foreground">
                {tempPointsPerPurchase.points} punto{tempPointsPerPurchase.points !== 1 ? 's' : ''} por cada ${tempPointsPerPurchase.amount} gastados
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditPointsPerPurchaseOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => {
              if (tempPointsPerPurchase.amount > 0 && tempPointsPerPurchase.points > 0) {
                setLoyaltyPointsPerPurchase(tempPointsPerPurchase)
                toast({
                  title: "Configuración guardada",
                  description: `Se actualizó la regla: ${tempPointsPerPurchase.points} punto${tempPointsPerPurchase.points !== 1 ? 's' : ''} por cada $${tempPointsPerPurchase.amount}`,
                })
                setEditPointsPerPurchaseOpen(false)
              } else {
                toast({
                  title: "Error",
                  description: "Los valores deben ser mayores a 0",
                  variant: "destructive",
                })
              }
            }}>
              Guardar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Points Discount Dialog */}
      <Dialog open={editPointsDiscountOpen} onOpenChange={(open) => {
        setEditPointsDiscountOpen(open)
        if (open) {
          setTempPointsDiscount(loyaltyPointsDiscount)
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Descuento con Puntos</DialogTitle>
            <DialogDescription>Configurar cuántos puntos se necesitan para obtener un descuento</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="discount-points">Puntos requeridos</Label>
              <Input
                id="discount-points"
                type="number"
                min="1"
                value={tempPointsDiscount.points}
                onChange={(e) => setTempPointsDiscount({ ...tempPointsDiscount, points: parseInt(e.target.value) || 0 })}
                placeholder="100"
              />
              <p className="text-xs text-muted-foreground">Cantidad de puntos necesarios para el descuento</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="discount-amount">Descuento en pesos ($)</Label>
              <Input
                id="discount-amount"
                type="number"
                min="1"
                step="0.01"
                value={tempPointsDiscount.discount}
                onChange={(e) => setTempPointsDiscount({ ...tempPointsDiscount, discount: parseFloat(e.target.value) || 0 })}
                placeholder="5"
              />
              <p className="text-xs text-muted-foreground">Monto del descuento otorgado</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium">Vista previa:</p>
              <p className="text-sm text-muted-foreground">
                {tempPointsDiscount.points} puntos = ${tempPointsDiscount.discount} de descuento
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditPointsDiscountOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => {
              if (tempPointsDiscount.points > 0 && tempPointsDiscount.discount > 0) {
                setLoyaltyPointsDiscount(tempPointsDiscount)
                toast({
                  title: "Configuración guardada",
                  description: `Se actualizó la regla: ${tempPointsDiscount.points} puntos = $${tempPointsDiscount.discount} de descuento`,
                })
                setEditPointsDiscountOpen(false)
              } else {
                toast({
                  title: "Error",
                  description: "Los valores deben ser mayores a 0",
                  variant: "destructive",
                })
              }
            }}>
              Guardar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Detailed Order History Dialog */}
      <Dialog open={detailedHistoryDialogOpen} onOpenChange={setDetailedHistoryDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles de la Orden</DialogTitle>
            <DialogDescription>{selectedOrder?.orderNumber}</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6 py-4">
              {/* Información del Cliente */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-muted-foreground">Cliente</Label>
                  <p className="font-semibold text-lg mt-1">{selectedOrder.customer}</p>
                  {selectedOrder.customerEmail && (
                    <p className="text-sm text-muted-foreground mt-1">{selectedOrder.customerEmail}</p>
                  )}
                  {selectedOrder.customerPhone && (
                    <p className="text-sm text-muted-foreground">{selectedOrder.customerPhone}</p>
                  )}
                </div>
                <div className="space-y-3">
                  <div>
                    <Label className="text-muted-foreground">Fecha</Label>
                    <p className="mt-1">{selectedOrder.date}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Estado</Label>
                    <div className="mt-1">
                      {selectedOrder.status === 'completed' && <Badge className="bg-green-600">Completado</Badge>}
                      {selectedOrder.status === 'pending' && <Badge variant="secondary">Pendiente</Badge>}
                      {selectedOrder.status === 'cancelled' && <Badge variant="destructive">Cancelado</Badge>}
                    </div>
                  </div>
                  {selectedOrder.paymentMethod && (
                    <div>
                      <Label className="text-muted-foreground">Método de Pago</Label>
                      <p className="mt-1 capitalize">
                        {selectedOrder.paymentMethod === 'cash' ? 'Efectivo' :
                         selectedOrder.paymentMethod === 'card' ? 'Tarjeta' :
                         selectedOrder.paymentMethod === 'transfer' ? 'Transferencia' : selectedOrder.paymentMethod}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Productos */}
              {selectedOrder.products && selectedOrder.products.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-4">Productos</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Producto</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead className="text-right">Cantidad</TableHead>
                        <TableHead className="text-right">Precio Unit.</TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell className="font-mono text-sm text-muted-foreground">{product.sku}</TableCell>
                          <TableCell className="text-right">{product.quantity}</TableCell>
                          <TableCell className="text-right">${product.price.toLocaleString('es-UY', { minimumFractionDigits: 2 })}</TableCell>
                          <TableCell className="text-right font-semibold">${product.subtotal.toLocaleString('es-UY', { minimumFractionDigits: 2 })}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {/* Totales */}
              <div className="border-t pt-4">
                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span>${(selectedOrder.total / (1 + (selectedOrder.tax || 22) / 100) / (1 - (selectedOrder.discount || 0) / 100)).toFixed(2)}</span>
                    </div>
                    {selectedOrder.discount && selectedOrder.discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Descuento ({selectedOrder.discount}%):</span>
                        <span className="text-green-600">-${((selectedOrder.total / (1 + (selectedOrder.tax || 22) / 100)) * (selectedOrder.discount / 100)).toFixed(2)}</span>
                      </div>
                    )}
                    {selectedOrder.tax && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">IVA ({selectedOrder.tax}%):</span>
                        <span>${(selectedOrder.total - (selectedOrder.total / (1 + selectedOrder.tax / 100))).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total:</span>
                      <span>${selectedOrder.total.toLocaleString('es-UY', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notas */}
              {selectedOrder.notes && (
                <div className="border-t pt-4">
                  <Label className="text-muted-foreground">Notas</Label>
                  <p className="mt-2 p-3 bg-muted rounded-lg">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          )}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setDetailedHistoryDialogOpen(false)}>
              Cerrar
            </Button>
            {selectedOrder && (
              <Button variant="outline" onClick={() => {
                setDetailedHistoryDialogOpen(false)
                setInvoiceDialogOpen(true)
              }}>
                <Receipt className="h-4 w-4 mr-2" />
                Ver Factura
              </Button>
            )}
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
