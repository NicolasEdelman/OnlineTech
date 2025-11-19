'use client'

import { useState } from 'react'
import { Search, FileDown, Plus, Edit, Trash2, Upload, FileText, Tags } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'

interface OtherDialogsProps {
  movementsDialogOpen: boolean
  setMovementsDialogOpen: (open: boolean) => void
  categoriesDialogOpen: boolean
  setCategoriesDialogOpen: (open: boolean) => void
  importExportDialogOpen: boolean
  setImportExportDialogOpen: (open: boolean) => void
}

export function OtherDialogs({
  movementsDialogOpen,
  setMovementsDialogOpen,
  categoriesDialogOpen,
  setCategoriesDialogOpen,
  importExportDialogOpen,
  setImportExportDialogOpen,
}: OtherDialogsProps) {
  const { toast } = useToast()
  const [categories, setCategories] = useState<string[]>(['Teclados', 'Mouse', 'Monitores', 'Audio', 'Accesorios'])
  const [categoryAddDialogOpen, setCategoryAddDialogOpen] = useState(false)
  const [categoryEditDialogOpen, setCategoryEditDialogOpen] = useState(false)
  const [categoryDeleteDialogOpen, setCategoryDeleteDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleAddCategory = () => {
    const categoryName = (document.getElementById('category-name') as HTMLInputElement)?.value
    if (categoryName && categoryName.trim()) {
      setCategories([...categories, categoryName.trim()])
      setCategoryAddDialogOpen(false)
      toast({
        title: "Categoría agregada",
        description: `La categoría "${categoryName.trim()}" se agregó correctamente.`,
      })
      // Limpiar el input
      const input = document.getElementById('category-name') as HTMLInputElement
      if (input) input.value = ''
    }
  }

  const handleEditCategory = (category: string) => {
    setSelectedCategory(category)
    setCategoryEditDialogOpen(true)
  }

  const handleSaveEditCategory = () => {
    if (selectedCategory) {
      const newName = (document.getElementById('edit-category-name') as HTMLInputElement)?.value
      if (newName && newName.trim()) {
        setCategories(categories.map(cat => cat === selectedCategory ? newName.trim() : cat))
        setCategoryEditDialogOpen(false)
        setSelectedCategory(null)
        toast({
          title: "Categoría actualizada",
          description: `La categoría se actualizó correctamente a "${newName.trim()}".`,
        })
      }
    }
  }

  const handleDeleteCategory = (category: string) => {
    setSelectedCategory(category)
    setCategoryDeleteDialogOpen(true)
  }

  const handleConfirmDeleteCategory = () => {
    if (selectedCategory) {
      setCategories(categories.filter(cat => cat !== selectedCategory))
      setCategoryDeleteDialogOpen(false)
      setSelectedCategory(null)
      toast({
        title: "Categoría eliminada",
        description: `La categoría "${selectedCategory}" fue eliminada correctamente.`,
        variant: "destructive",
      })
    }
  }

  return (
    <>
      {/* Movements History Dialog */}
      <Dialog open={movementsDialogOpen} onOpenChange={setMovementsDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-2xl">Historial de Movimientos</DialogTitle>
            <DialogDescription>Auditoría completa de cambios en inventario</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 flex-1 overflow-hidden flex flex-col">
            {/* Filtros y acciones */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por producto, usuario o motivo..."
                    className="pl-8"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="entry">Entradas</SelectItem>
                    <SelectItem value="exit">Salidas</SelectItem>
                    <SelectItem value="adjustment">Ajustes</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Usuario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los usuarios</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="seller">Vendedores</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="sm" onClick={() => toast({ title: "Exportando", description: "Generando reporte..." })}>
                <FileDown className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>

            {/* Tabla con scroll */}
            <div className="flex-1 overflow-auto border rounded-lg">
              <Table>
                <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow>
                    <TableHead className="w-[160px]">Fecha/Hora</TableHead>
                    <TableHead className="min-w-[200px]">Producto</TableHead>
                    <TableHead className="w-[120px]">Tipo</TableHead>
                    <TableHead className="w-[100px] text-right">Cantidad</TableHead>
                    <TableHead className="w-[120px]">Usuario</TableHead>
                    <TableHead className="min-w-[180px]">Motivo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-sm">2024-01-15 14:32</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">Teclado Mecánico RGB</p>
                        <p className="text-xs text-muted-foreground">SKU: TEC-001</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-600 hover:bg-green-700">Entrada</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-semibold text-green-600">+50</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold">
                          A
                        </div>
                        <span className="text-sm">Admin</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">Compra de mercadería</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-sm">2024-01-15 11:15</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">Mouse Inalámbrico Pro</p>
                        <p className="text-xs text-muted-foreground">SKU: MOU-015</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="destructive">Salida</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-semibold text-red-600">-5</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-semibold">
                          V
                        </div>
                        <span className="text-sm">Vendedor1</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">Venta ORD-2024-045</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-sm">2024-01-14 16:45</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">Monitor 27" 4K</p>
                        <p className="text-xs text-muted-foreground">SKU: MON-008</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">Ajuste</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-semibold text-orange-600">-2</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold">
                          A
                        </div>
                        <span className="text-sm">Admin</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">Mercadería dañada</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-sm">2024-01-14 10:20</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">Auriculares Gaming</p>
                        <p className="text-xs text-muted-foreground">SKU: AUR-012</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-600 hover:bg-green-700">Entrada</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-semibold text-green-600">+25</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold">
                          A
                        </div>
                        <span className="text-sm">Admin</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">Recepción de pedido #1234</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-sm">2024-01-13 15:30</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">Webcam HD 1080p</p>
                        <p className="text-xs text-muted-foreground">SKU: WEB-003</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="destructive">Salida</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-semibold text-red-600">-10</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-semibold">
                          V
                        </div>
                        <span className="text-sm">Vendedor2</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">Venta ORD-2024-042</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-sm">2024-01-12 09:15</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">Mouse Pad XXL</p>
                        <p className="text-xs text-muted-foreground">SKU: PAD-005</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-600 hover:bg-green-700">Entrada</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-semibold text-green-600">+100</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-xs font-semibold">
                          C
                        </div>
                        <span className="text-sm">Compras</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">Compra mayorista</span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Resumen y paginación */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Mostrando <span className="font-medium text-foreground">6</span> de <span className="font-medium text-foreground">45</span> movimientos
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm" className="w-8 h-8 p-0">1</Button>
                  <Button variant="outline" size="sm" className="w-8 h-8 p-0">2</Button>
                  <Button variant="outline" size="sm" className="w-8 h-8 p-0">3</Button>
                </div>
                <Button variant="outline" size="sm">
                  Siguiente
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Categories Dialog */}
      <Dialog open={categoriesDialogOpen} onOpenChange={setCategoriesDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Gestión de Categorías</DialogTitle>
            <DialogDescription>Organizar productos por categorías</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-end">
              <Button size="sm" onClick={() => setCategoryAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Categoría
              </Button>
            </div>
            {categories.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Tags className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No hay categorías registradas</p>
                <p className="text-sm mt-1">Haz clic en "Nueva Categoría" para agregar una</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {categories.map((cat) => (
                  <div key={cat} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <Tags className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{cat}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditCategory(cat)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteCategory(cat)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog open={categoryAddDialogOpen} onOpenChange={setCategoryAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva Categoría</DialogTitle>
            <DialogDescription>Agregar una nueva categoría de productos</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category-name">Nombre de la Categoría *</Label>
              <Input
                id="category-name"
                placeholder="Ej: Teclados, Mouse, Monitores..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddCategory()
                  }
                }}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => {
              setCategoryAddDialogOpen(false)
              const input = document.getElementById('category-name') as HTMLInputElement
              if (input) input.value = ''
            }}>
              Cancelar
            </Button>
            <Button onClick={handleAddCategory}>
              <Plus className="h-4 w-4 mr-2" />
              Crear Categoría
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={categoryEditDialogOpen} onOpenChange={setCategoryEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Categoría</DialogTitle>
            <DialogDescription>Modificar el nombre de la categoría</DialogDescription>
          </DialogHeader>
          {selectedCategory && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-category-name">Nombre de la Categoría *</Label>
                <Input
                  id="edit-category-name"
                  defaultValue={selectedCategory}
                  placeholder="Ej: Teclados, Mouse, Monitores..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSaveEditCategory()
                    }
                  }}
                />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => {
              setCategoryEditDialogOpen(false)
              setSelectedCategory(null)
            }}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEditCategory}>
              <Edit className="h-4 w-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Category Confirmation Dialog */}
      <AlertDialog open={categoryDeleteDialogOpen} onOpenChange={setCategoryDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar Categoría?</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedCategory && (
                <>
                  Esta acción eliminará permanentemente la categoría <strong>{selectedCategory}</strong>.
                  <br /><br />
                  <span className="text-muted-foreground text-sm">
                    Nota: Los productos asociados a esta categoría no se eliminarán, pero perderán su clasificación.
                  </span>
                  <br /><br />
                  <span className="font-semibold">Esta operación no se puede deshacer.</span>
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDeleteCategory}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar Categoría
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Import/Export Dialog */}
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
    </>
  )
}

