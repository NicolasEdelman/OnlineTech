'use client'

import { useState } from 'react'
import { AlertTriangle, Edit, Package, Plus, Search, History, AlertCircle, Truck, Tags, BarChart, FileText, FileDown, Trash2 } from 'lucide-react'
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
import type { Product, Supplier } from '@/types/inventory'
import { initialProducts, initialSuppliers } from '@/types/inventory'
import { ProductDialogs } from '@/components/inventory/dialogs/product-dialogs'
import { SupplierDialogs } from '@/components/inventory/dialogs/supplier-dialogs'
import { AlertConfigDialogs } from '@/components/inventory/dialogs/alert-config-dialogs'
import { OtherDialogs } from '@/components/inventory/dialogs/other-dialogs'

export function InventoryModule() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterWarehouse, setFilterWarehouse] = useState('all')
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [stockDialogOpen, setStockDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [suppliersDialogOpen, setSuppliersDialogOpen] = useState(false)
  const [supplierViewDialogOpen, setSupplierViewDialogOpen] = useState(false)
  const [supplierAddDialogOpen, setSupplierAddDialogOpen] = useState(false)
  const [supplierEditDialogOpen, setSupplierEditDialogOpen] = useState(false)
  const [supplierDeleteDialogOpen, setSupplierDeleteDialogOpen] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [stockAlertsDialogOpen, setStockAlertsDialogOpen] = useState(false)
  const [movementsDialogOpen, setMovementsDialogOpen] = useState(false)
  const [categoriesDialogOpen, setCategoriesDialogOpen] = useState(false)
  const [importExportDialogOpen, setImportExportDialogOpen] = useState(false)
  const [auditDialogOpen, setAuditDialogOpen] = useState(false)
  const [variantsDialogOpen, setVariantsDialogOpen] = useState(false)
  const [priceHistoryDialogOpen, setPriceHistoryDialogOpen] = useState(false)
  const [transferDialogOpen, setTransferDialogOpen] = useState(false)
  const [labelsDialogOpen, setLabelsDialogOpen] = useState(false)
  const [supplierSearchTerm, setSupplierSearchTerm] = useState('')
  const [lowStockAlertConfigOpen, setLowStockAlertConfigOpen] = useState(false)
  const [criticalStockAlertConfigOpen, setCriticalStockAlertConfigOpen] = useState(false)
  const [overstockAlertConfigOpen, setOverstockAlertConfigOpen] = useState(false)
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

  const handleViewSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier)
    setSupplierViewDialogOpen(true)
  }

  const handleEditSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier)
    setSupplierEditDialogOpen(true)
  }

  const handleSaveSupplier = () => {
    if (selectedSupplier) {
      if (supplierEditDialogOpen) {
        toast({
          title: "Proveedor actualizado",
          description: `Los datos de ${selectedSupplier.name} se actualizaron correctamente.`,
        })
        setSupplierEditDialogOpen(false)
      } else {
        toast({
          title: "Proveedor agregado",
          description: `El proveedor ${selectedSupplier.name} se agregó correctamente.`,
        })
        setSupplierAddDialogOpen(false)
      }
      setSelectedSupplier(null)
    }
  }

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(supplierSearchTerm.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(supplierSearchTerm.toLowerCase()) ||
    supplier.email?.toLowerCase().includes(supplierSearchTerm.toLowerCase())
  )

  const handleDeleteSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier)
    setSupplierDeleteDialogOpen(true)
  }

  const handleConfirmDeleteSupplier = () => {
    if (selectedSupplier) {
      // Eliminar todos los productos asociados al proveedor
      const productsToDelete = products.filter(p => p.supplierId === selectedSupplier.id)
      setProducts(products.filter(p => p.supplierId !== selectedSupplier.id))
      
      // Eliminar el proveedor
      setSuppliers(suppliers.filter(s => s.id !== selectedSupplier.id))
      
      toast({
        title: "Proveedor eliminado",
        description: `${selectedSupplier.name} y ${productsToDelete.length} producto(s) asociado(s) fueron eliminados.`,
        variant: "destructive",
      })
      
      setSupplierDeleteDialogOpen(false)
      setSelectedSupplier(null)
    }
  }

  const getSupplierProducts = (supplierId: string) => {
    return products.filter(p => p.supplierId === supplierId)
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

      {/* Product Dialogs */}
      <ProductDialogs
        addDialogOpen={addDialogOpen}
        setAddDialogOpen={setAddDialogOpen}
        editDialogOpen={editDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        stockDialogOpen={stockDialogOpen}
        setStockDialogOpen={setStockDialogOpen}
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        priceHistoryDialogOpen={priceHistoryDialogOpen}
        setPriceHistoryDialogOpen={setPriceHistoryDialogOpen}
        labelsDialogOpen={labelsDialogOpen}
        setLabelsDialogOpen={setLabelsDialogOpen}
        selectedProduct={selectedProduct}
        handleSaveEdit={handleSaveEdit}
        handleSaveStock={handleSaveStock}
        handleConfirmDelete={handleConfirmDelete}
        handleAddProduct={handleAddProduct}
      />

      {/* Supplier Dialogs */}
      <SupplierDialogs
        suppliersDialogOpen={suppliersDialogOpen}
        setSuppliersDialogOpen={setSuppliersDialogOpen}
        supplierViewDialogOpen={supplierViewDialogOpen}
        setSupplierViewDialogOpen={setSupplierViewDialogOpen}
        supplierAddDialogOpen={supplierAddDialogOpen}
        setSupplierAddDialogOpen={setSupplierAddDialogOpen}
        supplierEditDialogOpen={supplierEditDialogOpen}
        setSupplierEditDialogOpen={setSupplierEditDialogOpen}
        supplierDeleteDialogOpen={supplierDeleteDialogOpen}
        setSupplierDeleteDialogOpen={setSupplierDeleteDialogOpen}
        selectedSupplier={selectedSupplier}
        setSelectedSupplier={setSelectedSupplier}
        supplierSearchTerm={supplierSearchTerm}
        setSupplierSearchTerm={setSupplierSearchTerm}
        filteredSuppliers={filteredSuppliers}
        suppliers={suppliers}
        setSuppliers={setSuppliers}
        products={products}
        getSupplierProducts={getSupplierProducts}
        handleViewSupplier={handleViewSupplier}
        handleEditSupplier={handleEditSupplier}
        handleSaveSupplier={handleSaveSupplier}
        handleDeleteSupplier={handleDeleteSupplier}
        handleConfirmDeleteSupplier={handleConfirmDeleteSupplier}
      />

      {/* Alert Configuration Dialogs */}
      <AlertConfigDialogs
        lowStockAlertConfigOpen={lowStockAlertConfigOpen}
        setLowStockAlertConfigOpen={setLowStockAlertConfigOpen}
        criticalStockAlertConfigOpen={criticalStockAlertConfigOpen}
        setCriticalStockAlertConfigOpen={setCriticalStockAlertConfigOpen}
        overstockAlertConfigOpen={overstockAlertConfigOpen}
        setOverstockAlertConfigOpen={setOverstockAlertConfigOpen}
      />

      {/* Stock Alerts Main Dialog */}
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
                <Button onClick={() => setLowStockAlertConfigOpen(true)}>
                  Configurar
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">Alerta de Stock Crítico</h4>
                  <p className="text-sm text-muted-foreground">Alerta urgente cuando el stock sea 0</p>
                </div>
                <Button onClick={() => setCriticalStockAlertConfigOpen(true)}>
                  Configurar
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">Alerta de Sobrestock</h4>
                  <p className="text-sm text-muted-foreground">Notificar cuando haya exceso de inventario</p>
                </div>
                <Button onClick={() => setOverstockAlertConfigOpen(true)}>
                  Configurar
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Other Dialogs */}
      <OtherDialogs
        movementsDialogOpen={movementsDialogOpen}
        setMovementsDialogOpen={setMovementsDialogOpen}
        categoriesDialogOpen={categoriesDialogOpen}
        setCategoriesDialogOpen={setCategoriesDialogOpen}
        importExportDialogOpen={importExportDialogOpen}
        setImportExportDialogOpen={setImportExportDialogOpen}
      />

    </div>
  )
}
