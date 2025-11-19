'use client'

import { Edit, Package, Trash2, BarChart, FileText, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Product } from '@/types/inventory'

interface ProductDialogsProps {
  addDialogOpen: boolean
  setAddDialogOpen: (open: boolean) => void
  editDialogOpen: boolean
  setEditDialogOpen: (open: boolean) => void
  stockDialogOpen: boolean
  setStockDialogOpen: (open: boolean) => void
  deleteDialogOpen: boolean
  setDeleteDialogOpen: (open: boolean) => void
  priceHistoryDialogOpen: boolean
  setPriceHistoryDialogOpen: (open: boolean) => void
  labelsDialogOpen: boolean
  setLabelsDialogOpen: (open: boolean) => void
  selectedProduct: Product | null
  handleSaveEdit: () => void
  handleSaveStock: () => void
  handleConfirmDelete: () => void
  handleAddProduct: () => void
}

export function ProductDialogs({
  addDialogOpen,
  setAddDialogOpen,
  editDialogOpen,
  setEditDialogOpen,
  stockDialogOpen,
  setStockDialogOpen,
  deleteDialogOpen,
  setDeleteDialogOpen,
  priceHistoryDialogOpen,
  setPriceHistoryDialogOpen,
  labelsDialogOpen,
  setLabelsDialogOpen,
  selectedProduct,
  handleSaveEdit,
  handleSaveStock,
  handleConfirmDelete,
  handleAddProduct,
}: ProductDialogsProps) {
  return (
    <>
      {/* Add Product Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
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

      {/* Price History Dialog */}
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

      {/* Labels Dialog */}
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
            <Button onClick={() => setLabelsDialogOpen(false)}>Imprimir</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

