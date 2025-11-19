export interface Product {
  id: string
  name: string
  sku: string
  category: string
  stock: number
  minStock: number
  price: number
  warehouse: string
  variants?: string
  supplierId?: string
}

export interface Supplier {
  id: string
  name: string
  contact: string
  email?: string
  address?: string
  city?: string
  country?: string
  taxId?: string
  productsCount: number
  lastPurchase: string
  totalPurchases?: number
  rating?: number
  notes?: string
}

export const initialProducts: Product[] = [
  { id: '1', name: 'Teclado Mecánico RGB', sku: 'TEC-001', category: 'Teclados', stock: 5, minStock: 10, price: 89.99, warehouse: 'Principal', variants: 'Negro, Blanco', supplierId: '1' },
  { id: '2', name: 'Mouse Inalámbrico Pro', sku: 'MOU-015', category: 'Mouse', stock: 3, minStock: 8, price: 45.99, warehouse: 'Principal', variants: 'Negro, Blanco, Gris', supplierId: '1' },
  { id: '3', name: 'Monitor 27" 4K', sku: 'MON-008', category: 'Monitores', stock: 2, minStock: 5, price: 399.99, warehouse: 'Principal', supplierId: '2' },
  { id: '4', name: 'Webcam HD 1080p', sku: 'WEB-003', category: 'Accesorios', stock: 25, minStock: 10, price: 59.99, warehouse: 'Secundario', supplierId: '3' },
  { id: '5', name: 'Auriculares Gaming', sku: 'AUR-012', category: 'Audio', stock: 18, minStock: 15, price: 79.99, warehouse: 'Principal', supplierId: '4' },
  { id: '6', name: 'Mouse Pad XXL', sku: 'PAD-005', category: 'Accesorios', stock: 45, minStock: 20, price: 24.99, warehouse: 'Principal', supplierId: '1' },
  { id: '7', name: 'Teclado Inalámbrico', sku: 'TEC-007', category: 'Teclados', stock: 32, minStock: 15, price: 65.99, warehouse: 'Secundario', supplierId: '2' },
  { id: '8', name: 'Monitor 24" Full HD', sku: 'MON-015', category: 'Monitores', stock: 12, minStock: 8, price: 199.99, warehouse: 'Principal', supplierId: '2' },
]

export const initialSuppliers: Supplier[] = [
  { id: '1', name: 'Tech Supplies Co.', contact: '+598 2 123 4567', email: 'contacto@techsupplies.com', address: 'Av. 18 de Julio 1234', city: 'Montevideo', country: 'Uruguay', taxId: '214567890012', productsCount: 45, lastPurchase: '2024-01-10', totalPurchases: 125000, rating: 4.5, notes: 'Proveedor confiable con entregas rápidas' },
  { id: '2', name: 'Global Electronics', contact: '+598 2 234 5678', email: 'ventas@globalelectronics.com', address: 'Bulevar Artigas 567', city: 'Montevideo', country: 'Uruguay', taxId: '214567890013', productsCount: 32, lastPurchase: '2024-01-08', totalPurchases: 98000, rating: 4.2, notes: 'Buenos precios mayoristas' },
  { id: '3', name: 'Digital Solutions S.A.', contact: '+598 2 345 6789', email: 'info@digitalsolutions.com', address: 'Ruta 8 km 28.500', city: 'Canelones', country: 'Uruguay', taxId: '214567890014', productsCount: 28, lastPurchase: '2024-01-12', totalPurchases: 87000, rating: 4.8, notes: 'Excelente servicio post-venta' },
  { id: '4', name: 'Importadora Tech Uruguay', contact: '+598 2 456 7890', email: 'compras@techuruguay.com', address: 'Zona Franca Nueva Palmira', city: 'Nueva Palmira', country: 'Uruguay', taxId: '214567890015', productsCount: 67, lastPurchase: '2024-01-14', totalPurchases: 245000, rating: 4.3, notes: 'Importador directo con buen stock' },
  { id: '5', name: 'Hardware Store Pro', contact: '+598 99 123 456', email: 'contacto@hardwarestore.com', address: 'Calle Rivera 890', city: 'Punta del Este', country: 'Uruguay', taxId: '214567890016', productsCount: 19, lastPurchase: '2024-01-05', totalPurchases: 45000, rating: 3.9, notes: 'Proveedor regional' },
  { id: '6', name: 'Componentes Electrónicos Ltda.', contact: '+598 2 567 8901', email: 'ventas@componentes.com', address: 'Av. Garzón 2345', city: 'Montevideo', country: 'Uruguay', taxId: '214567890017', productsCount: 54, lastPurchase: '2024-01-15', totalPurchases: 198000, rating: 4.6, notes: 'Especialistas en componentes' },
]

