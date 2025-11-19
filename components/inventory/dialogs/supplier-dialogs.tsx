'use client'

import { Search, Plus, Eye, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Supplier, Product } from '@/types/inventory'

interface SupplierDialogsProps {
  suppliersDialogOpen: boolean
  setSuppliersDialogOpen: (open: boolean) => void
  supplierViewDialogOpen: boolean
  setSupplierViewDialogOpen: (open: boolean) => void
  supplierAddDialogOpen: boolean
  setSupplierAddDialogOpen: (open: boolean) => void
  supplierEditDialogOpen: boolean
  setSupplierEditDialogOpen: (open: boolean) => void
  supplierDeleteDialogOpen: boolean
  setSupplierDeleteDialogOpen: (open: boolean) => void
  selectedSupplier: Supplier | null
  setSelectedSupplier: (supplier: Supplier | null) => void
  supplierSearchTerm: string
  setSupplierSearchTerm: (term: string) => void
  filteredSuppliers: Supplier[]
  suppliers: Supplier[]
  setSuppliers: (suppliers: Supplier[] | ((prev: Supplier[]) => Supplier[])) => void
  products: Product[]
  getSupplierProducts: (supplierId: string) => Product[]
  handleViewSupplier: (supplier: Supplier) => void
  handleEditSupplier: (supplier: Supplier) => void
  handleSaveSupplier: () => void
  handleDeleteSupplier: (supplier: Supplier) => void
  handleConfirmDeleteSupplier: () => void
}

export function SupplierDialogs({
  suppliersDialogOpen,
  setSuppliersDialogOpen,
  supplierViewDialogOpen,
  setSupplierViewDialogOpen,
  supplierAddDialogOpen,
  setSupplierAddDialogOpen,
  supplierEditDialogOpen,
  setSupplierEditDialogOpen,
  supplierDeleteDialogOpen,
  setSupplierDeleteDialogOpen,
  selectedSupplier,
  setSelectedSupplier,
  supplierSearchTerm,
  setSupplierSearchTerm,
  filteredSuppliers,
  suppliers,
  setSuppliers,
  getSupplierProducts,
  handleViewSupplier,
  handleEditSupplier,
  handleSaveSupplier,
  handleDeleteSupplier,
  handleConfirmDeleteSupplier,
}: SupplierDialogsProps) {
  return (
    <>
      {/* Suppliers Management Dialog */}
      <Dialog open={suppliersDialogOpen} onOpenChange={setSuppliersDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Gestión de Proveedores</DialogTitle>
            <DialogDescription>Administrar proveedores y precios de compra</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 flex-1 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar proveedores..."
                  value={supplierSearchTerm}
                  onChange={(e) => setSupplierSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button size="sm" onClick={() => {
                setSelectedSupplier(null)
                setSupplierAddDialogOpen(true)
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Proveedor
              </Button>
            </div>
            <div className="flex-1 overflow-auto border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Productos</TableHead>
                    <TableHead>Última Compra</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSuppliers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        No se encontraron proveedores
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSuppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell className="font-medium">{supplier.name}</TableCell>
                        <TableCell>{supplier.contact}</TableCell>
                        <TableCell className="text-muted-foreground">{supplier.email || '-'}</TableCell>
                        <TableCell>{supplier.productsCount} productos</TableCell>
                        <TableCell>{supplier.lastPurchase}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleViewSupplier(supplier)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEditSupplier(supplier)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteSupplier(supplier)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Supplier Details Dialog */}
      <Dialog open={supplierViewDialogOpen} onOpenChange={setSupplierViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalles del Proveedor</DialogTitle>
            <DialogDescription>Información completa del proveedor</DialogDescription>
          </DialogHeader>
          {selectedSupplier && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Nombre de la Empresa</Label>
                    <p className="text-lg font-semibold mt-1">{selectedSupplier.name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Contacto</Label>
                    <p className="mt-1">{selectedSupplier.contact}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="mt-1">{selectedSupplier.email || '-'}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Dirección</Label>
                    <p className="mt-1">{selectedSupplier.address || '-'}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Ciudad</Label>
                    <p className="mt-1">{selectedSupplier.city || '-'}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">País</Label>
                    <p className="mt-1">{selectedSupplier.country || '-'}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">RUT/CUIT</Label>
                    <p className="mt-1">{selectedSupplier.taxId || '-'}</p>
                  </div>
                  {selectedSupplier.rating && (
                    <div>
                      <Label className="text-muted-foreground">Calificación</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-semibold">{selectedSupplier.rating}</span>
                        <span className="text-muted-foreground">/ 5.0</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Productos</Label>
                    <p className="text-2xl font-bold mt-1">{selectedSupplier.productsCount}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Última Compra</Label>
                    <p className="text-lg font-semibold mt-1">{selectedSupplier.lastPurchase}</p>
                  </div>
                  {selectedSupplier.totalPurchases && (
                    <div>
                      <Label className="text-muted-foreground">Total Compras</Label>
                      <p className="text-lg font-semibold mt-1">${selectedSupplier.totalPurchases.toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </div>
              {selectedSupplier.notes && (
                <div>
                  <Label className="text-muted-foreground">Notas</Label>
                  <p className="mt-1 p-3 bg-muted rounded-lg">{selectedSupplier.notes}</p>
                </div>
              )}
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setSupplierViewDialogOpen(false)}>Cerrar</Button>
            {selectedSupplier && (
              <Button onClick={() => {
                setSupplierViewDialogOpen(false)
                handleEditSupplier(selectedSupplier)
              }}>
                <Edit className="h-4 w-4 mr-2" />
                Editar Proveedor
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Supplier Dialog */}
      <Dialog open={supplierAddDialogOpen} onOpenChange={setSupplierAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nuevo Proveedor</DialogTitle>
            <DialogDescription>Registrar un nuevo proveedor en el sistema</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supplier-name">Nombre de la Empresa *</Label>
                <Input id="supplier-name" placeholder="Ej: Tech Supplies Co." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier-contact">Contacto *</Label>
                <Input id="supplier-contact" placeholder="+598 2 123 4567" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier-email">Email</Label>
              <Input id="supplier-email" type="email" placeholder="contacto@empresa.com" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supplier-address">Dirección</Label>
                <Input id="supplier-address" placeholder="Av. Principal 123" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier-city">Ciudad</Label>
                <Input id="supplier-city" placeholder="Montevideo" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supplier-country">País</Label>
                <Input id="supplier-country" placeholder="Uruguay" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier-taxId">RUT/CUIT</Label>
                <Input id="supplier-taxId" placeholder="214567890012" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier-notes">Notas</Label>
              <Textarea id="supplier-notes" placeholder="Información adicional sobre el proveedor..." rows={3} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => {
              setSupplierAddDialogOpen(false)
              setSelectedSupplier(null)
            }}>Cancelar</Button>
            <Button onClick={() => {
              const newSupplier: Supplier = {
                id: Date.now().toString(),
                name: (document.getElementById('supplier-name') as HTMLInputElement)?.value || 'Nuevo Proveedor',
                contact: (document.getElementById('supplier-contact') as HTMLInputElement)?.value || '',
                email: (document.getElementById('supplier-email') as HTMLInputElement)?.value || undefined,
                address: (document.getElementById('supplier-address') as HTMLInputElement)?.value || undefined,
                city: (document.getElementById('supplier-city') as HTMLInputElement)?.value || undefined,
                country: (document.getElementById('supplier-country') as HTMLInputElement)?.value || undefined,
                taxId: (document.getElementById('supplier-taxId') as HTMLInputElement)?.value || undefined,
                productsCount: 0,
                lastPurchase: '-',
                notes: (document.getElementById('supplier-notes') as HTMLTextAreaElement)?.value || undefined,
              }
              setSuppliers([...suppliers, newSupplier])
              setSelectedSupplier(newSupplier)
              handleSaveSupplier()
            }}>Guardar Proveedor</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Supplier Confirmation Dialog */}
      <AlertDialog open={supplierDeleteDialogOpen} onOpenChange={setSupplierDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar Proveedor?</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedSupplier && (
                <>
                  Esta acción eliminará permanentemente el proveedor <strong>{selectedSupplier.name}</strong> del sistema.
                  <br /><br />
                  {(() => {
                    const supplierProducts = getSupplierProducts(selectedSupplier.id)
                    const productsCount = supplierProducts.length
                    if (productsCount > 0) {
                      return (
                        <>
                          <span className="text-destructive font-semibold">
                            También se eliminarán {productsCount} producto(s) asociado(s):
                          </span>
                          <ul className="list-disc list-inside mt-2 space-y-1 max-h-40 overflow-y-auto">
                            {supplierProducts.slice(0, 10).map((product) => (
                              <li key={product.id} className="text-sm">
                                {product.name} ({product.sku})
                              </li>
                            ))}
                            {productsCount > 10 && (
                              <li className="text-sm text-muted-foreground">
                                ... y {productsCount - 10} producto(s) más
                              </li>
                            )}
                          </ul>
                        </>
                      )
                    }
                    return <span>Este proveedor no tiene productos asociados.</span>
                  })()}
                  <br /><br />
                  <span className="font-semibold">Esta operación no se puede deshacer.</span>
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDeleteSupplier} 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar Proveedor
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Supplier Dialog */}
      <Dialog open={supplierEditDialogOpen} onOpenChange={setSupplierEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Proveedor</DialogTitle>
            <DialogDescription>Modificar información del proveedor</DialogDescription>
          </DialogHeader>
          {selectedSupplier && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-supplier-name">Nombre de la Empresa *</Label>
                  <Input id="edit-supplier-name" defaultValue={selectedSupplier.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-supplier-contact">Contacto *</Label>
                  <Input id="edit-supplier-contact" defaultValue={selectedSupplier.contact} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-supplier-email">Email</Label>
                <Input id="edit-supplier-email" type="email" defaultValue={selectedSupplier.email || ''} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-supplier-address">Dirección</Label>
                  <Input id="edit-supplier-address" defaultValue={selectedSupplier.address || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-supplier-city">Ciudad</Label>
                  <Input id="edit-supplier-city" defaultValue={selectedSupplier.city || ''} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-supplier-country">País</Label>
                  <Input id="edit-supplier-country" defaultValue={selectedSupplier.country || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-supplier-taxId">RUT/CUIT</Label>
                  <Input id="edit-supplier-taxId" defaultValue={selectedSupplier.taxId || ''} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-supplier-notes">Notas</Label>
                <Textarea id="edit-supplier-notes" defaultValue={selectedSupplier.notes || ''} rows={3} />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => {
              setSupplierEditDialogOpen(false)
              setSelectedSupplier(null)
            }}>Cancelar</Button>
            <Button onClick={() => {
              if (selectedSupplier) {
                const updatedSupplier: Supplier = {
                  ...selectedSupplier,
                  name: (document.getElementById('edit-supplier-name') as HTMLInputElement)?.value || selectedSupplier.name,
                  contact: (document.getElementById('edit-supplier-contact') as HTMLInputElement)?.value || selectedSupplier.contact,
                  email: (document.getElementById('edit-supplier-email') as HTMLInputElement)?.value || undefined,
                  address: (document.getElementById('edit-supplier-address') as HTMLInputElement)?.value || undefined,
                  city: (document.getElementById('edit-supplier-city') as HTMLInputElement)?.value || undefined,
                  country: (document.getElementById('edit-supplier-country') as HTMLInputElement)?.value || undefined,
                  taxId: (document.getElementById('edit-supplier-taxId') as HTMLInputElement)?.value || undefined,
                  notes: (document.getElementById('edit-supplier-notes') as HTMLTextAreaElement)?.value || undefined,
                }
                setSuppliers(suppliers.map(s => s.id === updatedSupplier.id ? updatedSupplier : s))
                setSelectedSupplier(updatedSupplier)
              }
              handleSaveSupplier()
            }}>Guardar Cambios</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

