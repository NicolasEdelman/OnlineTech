'use client'

import { useState } from 'react'
import { AlertTriangle, Box, Edit, Package, Plus, Search, Trash2, Settings, Upload, FileDown, History, AlertCircle, Truck, Tags, BarChart, FileText, Eye } from 'lucide-react'
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'

interface Product {
  id: string
  name: string
  sku: string
  category: string
  stock: number
  minStock: number
  price: number
  warehouse: string
  variants?: string
}

const initialProducts: Product[] = [
  { id: '1', name: 'Teclado Mecánico RGB', sku: 'TEC-001', category: 'Teclados', stock: 5, minStock: 10, price: 89.99, warehouse: 'Principal', variants: 'Negro, Blanco' },
  { id: '2', name: 'Mouse Inalámbrico Pro', sku: 'MOU-015', category: 'Mouse', stock: 3, minStock: 8, price: 45.99, warehouse: 'Principal', variants: 'Negro, Blanco, Gris' },
  { id: '3', name: 'Monitor 27" 4K', sku: 'MON-008', category: 'Monitores', stock: 2, minStock: 5, price: 399.99, warehouse: 'Principal' },
  { id: '4', name: 'Webcam HD 1080p', sku: 'WEB-003', category: 'Accesorios', stock: 25, minStock: 10, price: 59.99, warehouse: 'Secundario' },
  { id: '5', name: 'Auriculares Gaming', sku: 'AUR-012', category: 'Audio', stock: 18, minStock: 15, price: 79.99, warehouse: 'Principal' },
  { id: '6', name: 'Mouse Pad XXL', sku: 'PAD-005', category: 'Accesorios', stock: 45, minStock: 20, price: 24.99, warehouse: 'Principal' },
  { id: '7', name: 'Teclado Inalámbrico', sku: 'TEC-007', category: 'Teclados', stock: 32, minStock: 15, price: 65.99, warehouse: 'Secundario' },
  { id: '8', name: 'Monitor 24" Full HD', sku: 'MON-015', category: 'Monitores', stock: 12, minStock: 8, price: 199.99, warehouse: 'Principal' },
]

export function InventoryModule() {
  const [products] = useState<Product[]>(initialProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterWarehouse, setFilterWarehouse] = useState('all')
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [stockDialogOpen, setStockDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [suppliersDialogOpen, setSuppliersDialogOpen] = useState(false)
  const [stockAlertsDialogOpen, setStockAlertsDialogOpen] = useState(false)
  const [movementsDialogOpen, setMovementsDialogOpen] = useState(false)
  const [categoriesDialogOpen, setCategoriesDialogOpen] = useState(false)
  const [importExportDialogOpen, setImportExportDialogOpen] = useState(false)
  const [auditDialogOpen, setAuditDialogOpen] = useState(false)
  const [variantsDialogOpen, setVariantsDialogOpen] = useState(false)
  const [priceHistoryDialogOpen, setPriceHistoryDialogOpen] = useState(false)
  const [transferDialogOpen, setTransferDialogOpen] = useState(false)
  const [labelsDialogOpen, setLabelsDialogOpen] = useState(false)
  const { toast } = useToast()

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesWarehouse = filterWarehouse === 'all' || product.warehouse === filterWarehouse
    return matchesSearch && matchesWarehouse
  })

  const lowStockCount = products.filter(p => p.stock <= p.minStock).length
  const totalValue = products.reduce((sum, p) => sum + (p.stock * p.price), 0)

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setEditDialogOpen(true)
  }

  const handleStockUpdate = (product: Product) => {
    setSelectedProduct(product)
    setStockDialogOpen(true)
  }

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product)
    setDeleteDialogOpen(true)
  }

  const handleSaveEdit = () => {
    toast({
      title: "Producto actualizado",
      description: `Los cambios en ${selectedProduct?.name} se guardaron correctamente.`,
    })
    setEditDialogOpen(false)
  }

  const handleSaveStock = () => {
    toast({
      title: "Stock actualizado",
      description: `El stock de ${selectedProduct?.name} se actualizó correctamente.`,
    })
    setStockDialogOpen(false)
  }

  const handleConfirmDelete = () => {
    toast({
      title: "Producto eliminado",
      description: `${selectedProduct?.name} fue eliminado del inventario.`,
      variant: "destructive",
    })
    setDeleteDialogOpen(false)
  }

  const handleAddProduct = () => {
    toast({
      title: "Producto agregado",
      description: "El nuevo producto se agregó correctamente al inventario.",
    })
    setAddDialogOpen(false)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Gestión de Inventario</h2>
          <p className="text-muted-foreground mt-1">Control completo de productos y stock</p>
        </div>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Producto</DialogTitle>
              <DialogDescription>Complete los datos del producto</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre del Producto</Label>
                  <Input id="name" placeholder="Ej: Teclado Mecánico" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="TEC-001" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teclados">Teclados</SelectItem>
                      <SelectItem value="mouse">Mouse</SelectItem>
                      <SelectItem value="monitores">Monitores</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="accesorios">Accesorios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="warehouse">Depósito</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="principal">Principal</SelectItem>
                      <SelectItem value="secundario">Secundario</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Inicial</Label>
                  <Input id="stock" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minStock">Stock Mínimo</Label>
                  <Input id="minStock" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Precio</Label>
                  <Input id="price" type="number" placeholder="0.00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="variants">Variantes (opcional)</Label>
                <Input id="variants" placeholder="Negro, Blanco, Azul" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancelar</Button>
              <Button onClick={handleAddProduct}>Guardar Producto</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground mt-1">En catálogo</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Valor Total Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Inventario valorizado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Bajo Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{lowStockCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Productos en alerta</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Depósitos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">Ubicaciones activas</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="grid gap-4 md:grid-cols-5 mb-6">
        <Button variant="outline" onClick={() => setSuppliersDialogOpen(true)} className="justify-start">
          <Truck className="h-4 w-4 mr-2" />
          Proveedores
        </Button>
        <Button variant="outline" onClick={() => setStockAlertsDialogOpen(true)} className="justify-start">
          <AlertCircle className="h-4 w-4 mr-2" />
          Alertas de Stock
        </Button>
        <Button variant="outline" onClick={() => setMovementsDialogOpen(true)} className="justify-start">
          <History className="h-4 w-4 mr-2" />
          Movimientos
        </Button>
        <Button variant="outline" onClick={() => setCategoriesDialogOpen(true)} className="justify-start">
          <Tags className="h-4 w-4 mr-2" />
          Categorías
        </Button>
        <Button variant="outline" onClick={() => setImportExportDialogOpen(true)} className="justify-start">
          <FileDown className="h-4 w-4 mr-2" />
          Importar/Exportar
        </Button>
      </div>

      {/* Filters and Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Listado de Productos</CardTitle>
              <CardDescription>Gestión completa del inventario</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre o SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Select value={filterWarehouse} onValueChange={setFilterWarehouse}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Depósito" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Principal">Principal</SelectItem>
                  <SelectItem value="Secundario">Secundario</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Depósito</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      {product.variants && (
                        <p className="text-xs text-muted-foreground">{product.variants}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{product.stock}</span>
                      {product.stock <= product.minStock && (
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.warehouse}</Badge>
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    {product.stock > product.minStock ? (
                      <Badge className="bg-green-600">En Stock</Badge>
                    ) : (
                      <Badge variant="destructive">Bajo Stock</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleStockUpdate(product)}>
                        <Package className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => { setSelectedProduct(product); setPriceHistoryDialogOpen(true); }}>
                        <BarChart className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => { setSelectedProduct(product); setLabelsDialogOpen(true); }}>
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Product Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Producto</DialogTitle>
            <DialogDescription>Modificar información del producto</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre del Producto</Label>
                  <Input defaultValue={selectedProduct.name} />
                </div>
                <div className="space-y-2">
                  <Label>SKU</Label>
                  <Input defaultValue={selectedProduct.sku} disabled />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Categoría</Label>
                  <Select defaultValue={selectedProduct.category.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teclados">Teclados</SelectItem>
                      <SelectItem value="mouse">Mouse</SelectItem>
                      <SelectItem value="monitores">Monitores</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="accesorios">Accesorios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Precio</Label>
                  <Input type="number" defaultValue={selectedProduct.price} />
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveEdit}>Guardar Cambios</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Stock Update Dialog */}
      <Dialog open={stockDialogOpen} onOpenChange={setStockDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Actualizar Stock</DialogTitle>
            <DialogDescription>Modificar cantidad en inventario</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4 py-4">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm font-medium">{selectedProduct.name}</p>
                <p className="text-xs text-muted-foreground">Stock actual: {selectedProduct.stock} unidades</p>
              </div>
              <div className="space-y-2">
                <Label>Nueva Cantidad</Label>
                <Input type="number" defaultValue={selectedProduct.stock} min="0" />
              </div>
              <div className="space-y-2">
                <Label>Motivo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar motivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="purchase">Compra de mercadería</SelectItem>
                    <SelectItem value="return">Devolución cliente</SelectItem>
                    <SelectItem value="adjustment">Ajuste de inventario</SelectItem>
                    <SelectItem value="damaged">Mercadería dañada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setStockDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveStock}>Actualizar Stock</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente el producto "{selectedProduct?.name}" del inventario.
              Esta operación no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground">
              Eliminar Producto
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={suppliersDialogOpen} onOpenChange={setSuppliersDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Gestión de Proveedores</DialogTitle>
            <DialogDescription>Administrar proveedores y precios de compra</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-end">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Proveedor
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Proveedor</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Productos</TableHead>
                  <TableHead>Última Compra</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Tech Supplies Co.</TableCell>
                  <TableCell>+598 2 123 4567</TableCell>
                  <TableCell>45 productos</TableCell>
                  <TableCell>2024-01-10</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => {
                      toast({ title: "Ver detalles", description: "Abriendo perfil del proveedor" })
                    }}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Global Electronics</TableCell>
                  <TableCell>+598 2 234 5678</TableCell>
                  <TableCell>32 productos</TableCell>
                  <TableCell>2024-01-08</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => {
                      toast({ title: "Ver detalles", description: "Abriendo perfil del proveedor" })
                    }}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={stockAlertsDialogOpen} onOpenChange={setStockAlertsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Configuración de Alertas de Stock</DialogTitle>
            <DialogDescription>Configurar notificaciones automáticas</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">Alerta de Stock Bajo</h4>
                  <p className="text-sm text-muted-foreground">Notificar cuando el stock esté por debajo del mínimo</p>
                </div>
                <Button onClick={() => toast({ title: "Configurado", description: "Alerta activada correctamente" })}>
                  Configurar
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">Alerta de Stock Crítico</h4>
                  <p className="text-sm text-muted-foreground">Alerta urgente cuando el stock sea 0</p>
                </div>
                <Button onClick={() => toast({ title: "Configurado", description: "Alerta activada correctamente" })}>
                  Configurar
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">Alerta de Sobrestock</h4>
                  <p className="text-sm text-muted-foreground">Notificar cuando haya exceso de inventario</p>
                </div>
                <Button onClick={() => toast({ title: "Configurado", description: "Alerta activada correctamente" })}>
                  Configurar
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={movementsDialogOpen} onOpenChange={setMovementsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Historial de Movimientos</DialogTitle>
            <DialogDescription>Auditoría completa de cambios en inventario</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha/Hora</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Motivo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>2024-01-15 14:32</TableCell>
                  <TableCell>Teclado Mecánico RGB</TableCell>
                  <TableCell><Badge className="bg-green-600">Entrada</Badge></TableCell>
                  <TableCell>+50</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>Compra de mercadería</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2024-01-15 11:15</TableCell>
                  <TableCell>Mouse Inalámbrico Pro</TableCell>
                  <TableCell><Badge variant="destructive">Salida</Badge></TableCell>
                  <TableCell>-5</TableCell>
                  <TableCell>Vendedor1</TableCell>
                  <TableCell>Venta ORD-2024-045</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2024-01-14 16:45</TableCell>
                  <TableCell>Monitor 27" 4K</TableCell>
                  <TableCell><Badge variant="secondary">Ajuste</Badge></TableCell>
                  <TableCell>-2</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>Mercadería dañada</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={categoriesDialogOpen} onOpenChange={setCategoriesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gestión de Categorías</DialogTitle>
            <DialogDescription>Organizar productos por categorías</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-end">
              <Button size="sm" onClick={() => toast({ title: "Nueva categoría", description: "Abriendo formulario" })}>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Categoría
              </Button>
            </div>
            <div className="space-y-2">
              {['Teclados', 'Mouse', 'Monitores', 'Audio', 'Accesorios'].map((cat) => (
                <div key={cat} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Tags className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{cat}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => toast({ title: "Editar", description: `Editando ${cat}` })}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={importExportDialogOpen} onOpenChange={setImportExportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Importar/Exportar Datos</DialogTitle>
            <DialogDescription>Gestionar datos en formato Excel o CSV</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "Importando", description: "Seleccione archivo Excel" })}>
                <Upload className="h-4 w-4 mr-2" />
                Importar desde Excel
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "Exportando", description: "Descargando archivo Excel" })}>
                <FileDown className="h-4 w-4 mr-2" />
                Exportar a Excel
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "Exportando", description: "Descargando archivo CSV" })}>
                <FileDown className="h-4 w-4 mr-2" />
                Exportar a CSV
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "Generando", description: "Creando reporte PDF" })}>
                <FileText className="h-4 w-4 mr-2" />
                Generar Reporte PDF
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={priceHistoryDialogOpen} onOpenChange={setPriceHistoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Historial de Precios</DialogTitle>
            <DialogDescription>
              {selectedProduct?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">2024-01-15</p>
                  <p className="text-xs text-muted-foreground">Actualización manual</p>
                </div>
                <p className="font-bold">${selectedProduct?.price}</p>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">2024-01-01</p>
                  <p className="text-xs text-muted-foreground">Ajuste de temporada</p>
                </div>
                <p className="font-bold">$84.99</p>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">2023-12-15</p>
                  <p className="text-xs text-muted-foreground">Precio inicial</p>
                </div>
                <p className="font-bold">$79.99</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={labelsDialogOpen} onOpenChange={setLabelsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Imprimir Etiquetas</DialogTitle>
            <DialogDescription>
              {selectedProduct?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Cantidad de Etiquetas</Label>
              <Input type="number" defaultValue={1} min={1} />
            </div>
            <div className="space-y-2">
              <Label>Tipo de Etiqueta</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="barcode">Código de barras</SelectItem>
                  <SelectItem value="qr">QR Code</SelectItem>
                  <SelectItem value="price">Etiqueta de precio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Incluir en etiqueta</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="include-sku" defaultChecked />
                  <label htmlFor="include-sku" className="text-sm">SKU</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="include-price" defaultChecked />
                  <label htmlFor="include-price" className="text-sm">Precio</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="include-name" defaultChecked />
                  <label htmlFor="include-name" className="text-sm">Nombre del producto</label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setLabelsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={() => {
              toast({ title: "Imprimiendo", description: "Enviando a impresora" })
              setLabelsDialogOpen(false)
            }}>Imprimir</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
