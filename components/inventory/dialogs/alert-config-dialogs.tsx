'use client'

import { useState } from 'react'
import { Bell, Mail, MessageSquare, Clock, Users, CheckCircle2, Calendar, Zap, Shield, TrendingUp, TrendingDown, AlertTriangle, BarChart, Filter } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'

interface AlertConfigDialogsProps {
  lowStockAlertConfigOpen: boolean
  setLowStockAlertConfigOpen: (open: boolean) => void
  criticalStockAlertConfigOpen: boolean
  setCriticalStockAlertConfigOpen: (open: boolean) => void
  overstockAlertConfigOpen: boolean
  setOverstockAlertConfigOpen: (open: boolean) => void
}

export function AlertConfigDialogs({
  lowStockAlertConfigOpen,
  setLowStockAlertConfigOpen,
  criticalStockAlertConfigOpen,
  setCriticalStockAlertConfigOpen,
  overstockAlertConfigOpen,
  setOverstockAlertConfigOpen,
}: AlertConfigDialogsProps) {
  const { toast } = useToast()
  const [lowStockEnabled, setLowStockEnabled] = useState(true)
  const [criticalStockEnabled, setCriticalStockEnabled] = useState(true)
  const [overstockEnabled, setOverstockEnabled] = useState(false)

  const handleSaveLowStock = () => {
    toast({
      title: "Configuración guardada",
      description: "La alerta de stock bajo se configuró correctamente.",
    })
    setLowStockAlertConfigOpen(false)
  }

  const handleSaveCriticalStock = () => {
    toast({
      title: "Configuración guardada",
      description: "La alerta de stock crítico se configuró correctamente.",
    })
    setCriticalStockAlertConfigOpen(false)
  }

  const handleSaveOverstock = () => {
    toast({
      title: "Configuración guardada",
      description: "La alerta de sobrestock se configuró correctamente.",
    })
    setOverstockAlertConfigOpen(false)
  }

  return (
    <>
      {/* Low Stock Alert Configuration */}
      <Dialog open={lowStockAlertConfigOpen} onOpenChange={setLowStockAlertConfigOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Configuración de Alerta de Stock Bajo
            </DialogTitle>
            <DialogDescription>
              Configura alertas cuando el stock esté por debajo del mínimo establecido
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Enable/Disable */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Estado de la Alerta</CardTitle>
                    <CardDescription>Activar o desactivar esta alerta</CardDescription>
                  </div>
                  <Switch checked={lowStockEnabled} onCheckedChange={setLowStockEnabled} />
                </div>
              </CardHeader>
            </Card>

            {/* Threshold Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  Configuración de Umbrales
                </CardTitle>
                <CardDescription>Define cuándo se activará la alerta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="low-threshold-type">Tipo de Umbral</Label>
                    <Select defaultValue="percentage">
                      <SelectTrigger id="low-threshold-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Porcentaje del stock mínimo</SelectItem>
                        <SelectItem value="absolute">Cantidad absoluta</SelectItem>
                        <SelectItem value="days">Días de inventario restantes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="low-threshold-value">Valor del Umbral</Label>
                    <Input id="low-threshold-value" type="number" defaultValue="80" placeholder="80" />
                    <p className="text-xs text-muted-foreground">% del stock mínimo o unidades</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="low-exclude-categories">Excluir Categorías</Label>
                  <Select>
                    <SelectTrigger id="low-exclude-categories">
                      <SelectValue placeholder="Seleccionar categorías a excluir" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Aplicar a todas las categorías</SelectItem>
                      <SelectItem value="specific">Categorías específicas</SelectItem>
                      <SelectItem value="none">No excluir ninguna</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="low-ignore-discontinued" className="rounded" />
                  <Label htmlFor="low-ignore-discontinued" className="text-sm font-normal cursor-pointer">
                    Ignorar productos discontinuados
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Notification Channels */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Canales de Notificación
                </CardTitle>
                <CardDescription>Selecciona cómo recibir las alertas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label className="font-medium">Email</Label>
                        <p className="text-xs text-muted-foreground">Recibir notificaciones por correo electrónico</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label className="font-medium">SMS/WhatsApp</Label>
                        <p className="text-xs text-muted-foreground">Notificaciones por mensaje de texto</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label className="font-medium">Notificaciones Push</Label>
                        <p className="text-xs text-muted-foreground">Alertas en tiempo real en la aplicación</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="low-email-template">Plantilla de Email</Label>
                  <Select>
                    <SelectTrigger id="low-email-template">
                      <SelectValue placeholder="Seleccionar plantilla" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple">Plantilla Simple</SelectItem>
                      <SelectItem value="detailed">Plantilla Detallada</SelectItem>
                      <SelectItem value="custom">Plantilla Personalizada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Recipients */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Destinatarios
                </CardTitle>
                <CardDescription>Quién recibirá las alertas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <div>
                        <Label className="font-medium">Administradores</Label>
                        <p className="text-xs text-muted-foreground">Todos los usuarios con rol de administrador</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      <div>
                        <Label className="font-medium">Gerentes de Inventario</Label>
                        <p className="text-xs text-muted-foreground">Equipo de gestión de inventario</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-purple-500" />
                      <div>
                        <Label className="font-medium">Compras</Label>
                        <p className="text-xs text-muted-foreground">Departamento de compras</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="low-custom-emails">Emails Personalizados</Label>
                  <Textarea
                    id="low-custom-emails"
                    placeholder="email1@ejemplo.com, email2@ejemplo.com"
                    rows={2}
                  />
                  <p className="text-xs text-muted-foreground">Separar múltiples emails con comas</p>
                </div>
              </CardContent>
            </Card>

            {/* Frequency and Timing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Frecuencia y Horarios
                </CardTitle>
                <CardDescription>Cuándo y con qué frecuencia se enviarán las alertas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="low-frequency">Frecuencia de Alerta</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="low-frequency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Tiempo Real</SelectItem>
                        <SelectItem value="hourly">Cada Hora</SelectItem>
                        <SelectItem value="daily">Diaria (Resumen)</SelectItem>
                        <SelectItem value="weekly">Semanal (Resumen)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="low-time">Hora de Envío</Label>
                    <Input id="low-time" type="time" defaultValue="09:00" />
                    <p className="text-xs text-muted-foreground">Solo aplica a alertas diarias/semanales</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Días de la Semana</Label>
                  <div className="grid grid-cols-7 gap-2">
                    {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, index) => (
                      <div key={index} className="flex items-center justify-center">
                        <input
                          type="checkbox"
                          id={`low-day-${index}`}
                          defaultChecked={index < 5}
                          className="rounded"
                        />
                        <label htmlFor={`low-day-${index}`} className="ml-2 text-sm cursor-pointer">
                          {day}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="low-throttle" className="rounded" />
                  <Label htmlFor="low-throttle" className="text-sm font-normal cursor-pointer">
                    Evitar notificaciones duplicadas (esperar 24h entre alertas del mismo producto)
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Acciones Automáticas
                </CardTitle>
                <CardDescription>Acciones que se ejecutarán automáticamente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Generar Orden de Compra Sugerida</Label>
                    <p className="text-xs text-muted-foreground">Crear automáticamente una orden sugerida</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Notificar al Proveedor</Label>
                    <p className="text-xs text-muted-foreground">Enviar alerta al proveedor del producto</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Actualizar Estado del Producto</Label>
                    <p className="text-xs text-muted-foreground">Marcar producto como "Stock Bajo"</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Advanced Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Opciones Avanzadas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="low-priority">Prioridad</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="low-priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baja</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="low-escalation">Escalación</Label>
                  <Select>
                    <SelectTrigger id="low-escalation">
                      <SelectValue placeholder="Sin escalación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sin escalación</SelectItem>
                      <SelectItem value="2hours">Escalar después de 2 horas</SelectItem>
                      <SelectItem value="1day">Escalar después de 1 día</SelectItem>
                      <SelectItem value="3days">Escalar después de 3 días</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="low-notes">Notas Internas</Label>
                  <Textarea
                    id="low-notes"
                    placeholder="Notas adicionales sobre esta configuración..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setLowStockAlertConfigOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveLowStock}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Guardar Configuración
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Critical Stock Alert Configuration */}
      <Dialog open={criticalStockAlertConfigOpen} onOpenChange={setCriticalStockAlertConfigOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Configuración de Alerta de Stock Crítico
            </DialogTitle>
            <DialogDescription>
              Alertas urgentes cuando el stock alcance niveles críticos o sea 0
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Enable/Disable */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Estado de la Alerta</CardTitle>
                    <CardDescription>Activar o desactivar esta alerta urgente</CardDescription>
                  </div>
                  <Switch checked={criticalStockEnabled} onCheckedChange={setCriticalStockEnabled} />
                </div>
              </CardHeader>
            </Card>

            {/* Critical Threshold */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  Definición de Stock Crítico
                </CardTitle>
                <CardDescription>Establece qué se considera stock crítico</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="critical-threshold-type">Tipo de Definición</Label>
                    <Select defaultValue="zero">
                      <SelectTrigger id="critical-threshold-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zero">Stock en 0 unidades</SelectItem>
                        <SelectItem value="below-min">Por debajo del stock mínimo</SelectItem>
                        <SelectItem value="percentage">Porcentaje específico</SelectItem>
                        <SelectItem value="absolute">Cantidad absoluta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="critical-threshold-value">Valor Crítico</Label>
                    <Input id="critical-threshold-value" type="number" defaultValue="0" placeholder="0" />
                    <p className="text-xs text-muted-foreground">Unidades o porcentaje</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="critical-time-window">Ventana de Tiempo</Label>
                  <Select defaultValue="immediate">
                    <SelectTrigger id="critical-time-window">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Inmediato (0 horas)</SelectItem>
                      <SelectItem value="1hour">Después de 1 hora en crítico</SelectItem>
                      <SelectItem value="4hours">Después de 4 horas en crítico</SelectItem>
                      <SelectItem value="24hours">Después de 24 horas en crítico</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Tiempo que debe estar en crítico antes de alertar</p>
                </div>
              </CardContent>
            </Card>

            {/* Urgent Notification Channels */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Canales de Notificación Urgente
                </CardTitle>
                <CardDescription>Todos los canales activados para alertas críticas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border-2 border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-red-600" />
                      <div>
                        <Label className="font-medium">Email (OBLIGATORIO)</Label>
                        <p className="text-xs text-muted-foreground">Alerta inmediata por correo</p>
                      </div>
                    </div>
                    <Switch defaultChecked disabled />
                  </div>
                  <div className="flex items-center justify-between p-3 border-2 border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-4 w-4 text-red-600" />
                      <div>
                        <Label className="font-medium">SMS/WhatsApp (OBLIGATORIO)</Label>
                        <p className="text-xs text-muted-foreground">Notificación inmediata por SMS</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label className="font-medium">Notificaciones Push</Label>
                        <p className="text-xs text-muted-foreground">Alertas en tiempo real</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label className="font-medium">Notificación de Escritorio</Label>
                        <p className="text-xs text-muted-foreground">Alertas emergentes en el sistema</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Nota:</strong> Las alertas críticas se envían inmediatamente sin límite de frecuencia.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recipients */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Destinatarios Urgentes
                </CardTitle>
                <CardDescription>Quién debe ser notificado inmediatamente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border-2 border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-red-600" />
                      <div>
                        <Label className="font-medium">Director General</Label>
                        <p className="text-xs text-muted-foreground">Notificación directa al director</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <div>
                        <Label className="font-medium">Todos los Administradores</Label>
                        <p className="text-xs text-muted-foreground">Notificación a todos los administradores</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      <div>
                        <Label className="font-medium">Gerentes de Inventario</Label>
                        <p className="text-xs text-muted-foreground">Equipo completo de inventario</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-purple-500" />
                      <div>
                        <Label className="font-medium">Departamento de Compras</Label>
                        <p className="text-xs text-muted-foreground">Todos los compradores</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="critical-urgent-emails">Emails de Emergencia</Label>
                  <Textarea
                    id="critical-urgent-emails"
                    placeholder="emergencia@empresa.com, director@empresa.com"
                    rows={2}
                  />
                  <p className="text-xs text-muted-foreground">Separar múltiples emails con comas</p>
                </div>
              </CardContent>
            </Card>

            {/* Automatic Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Acciones Automáticas Urgentes
                </CardTitle>
                <CardDescription>Acciones que se ejecutarán automáticamente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 border-2 border-red-200 rounded-lg bg-red-50">
                  <div>
                    <Label className="font-medium">Crear Orden de Compra Automática</Label>
                    <p className="text-xs text-muted-foreground">Generar orden inmediatamente con cantidad sugerida</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Bloquear Ventas del Producto</Label>
                    <p className="text-xs text-muted-foreground">Prevenir ventas mientras está en crítico</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Notificar al Proveedor</Label>
                    <p className="text-xs text-muted-foreground">Alerta urgente al proveedor principal</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Marcar Producto como "Fuera de Stock"</Label>
                    <p className="text-xs text-muted-foreground">Actualizar estado público del producto</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Generar Reporte de Urgencia</Label>
                    <p className="text-xs text-muted-foreground">Crear reporte ejecutivo automático</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Escalation Rules */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Reglas de Escalación
                </CardTitle>
                <CardDescription>Qué hacer si la alerta no se resuelve</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="critical-escalation-time">Tiempo para Escalar</Label>
                  <Select defaultValue="4hours">
                    <SelectTrigger id="critical-escalation-time">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1hour">1 hora</SelectItem>
                      <SelectItem value="4hours">4 horas</SelectItem>
                      <SelectItem value="8hours">8 horas</SelectItem>
                      <SelectItem value="24hours">24 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="critical-escalation-action">Acción de Escalación</Label>
                  <Select>
                    <SelectTrigger id="critical-escalation-action">
                      <SelectValue placeholder="Seleccionar acción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="notify-director">Notificar al Director</SelectItem>
                      <SelectItem value="create-ticket">Crear Ticket de Urgencia</SelectItem>
                      <SelectItem value="call-provider">Llamar al Proveedor Automáticamente</SelectItem>
                      <SelectItem value="all">Todas las anteriores</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setCriticalStockAlertConfigOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveCriticalStock} className="bg-red-600 hover:bg-red-700">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Guardar Configuración Crítica
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Overstock Alert Configuration */}
      <Dialog open={overstockAlertConfigOpen} onOpenChange={setOverstockAlertConfigOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-blue-500" />
              Configuración de Alerta de Sobrestock
            </DialogTitle>
            <DialogDescription>
              Alertas cuando el inventario exceda los niveles óptimos
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Enable/Disable */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Estado de la Alerta</CardTitle>
                    <CardDescription>Activar alertas de sobrestock</CardDescription>
                  </div>
                  <Switch checked={overstockEnabled} onCheckedChange={setOverstockEnabled} />
                </div>
              </CardHeader>
            </Card>

            {/* Overstock Threshold */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  Definición de Sobrestock
                </CardTitle>
                <CardDescription>Establece qué se considera sobrestock</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="overstock-threshold-type">Método de Cálculo</Label>
                    <Select defaultValue="percentage">
                      <SelectTrigger id="overstock-threshold-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Porcentaje sobre stock óptimo</SelectItem>
                        <SelectItem value="absolute">Cantidad absoluta</SelectItem>
                        <SelectItem value="days">Días de inventario excedente</SelectItem>
                        <SelectItem value="value">Valor monetario excedente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="overstock-threshold-value">Valor del Umbral</Label>
                    <Input id="overstock-threshold-value" type="number" defaultValue="150" placeholder="150" />
                    <p className="text-xs text-muted-foreground">% del stock óptimo o unidades</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="overstock-max-value">Valor Máximo Permitido</Label>
                    <Input id="overstock-max-value" type="number" placeholder="1000" />
                    <p className="text-xs text-muted-foreground">En unidades o valor monetario</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="overstock-rotation-days">Días de Rotación Objetivo</Label>
                    <Input id="overstock-rotation-days" type="number" defaultValue="30" placeholder="30" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="overstock-apply-categories">Aplicar a Categorías</Label>
                  <Select>
                    <SelectTrigger id="overstock-apply-categories">
                      <SelectValue placeholder="Todas las categorías" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      <SelectItem value="specific">Categorías específicas</SelectItem>
                      <SelectItem value="exclude-slow">Excluir productos de rotación lenta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Configuración de Notificaciones
                </CardTitle>
                <CardDescription>Cómo y cuándo recibir alertas de sobrestock</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label className="font-medium">Email</Label>
                        <p className="text-xs text-muted-foreground">Reporte por correo electrónico</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label className="font-medium">Notificaciones Push</Label>
                        <p className="text-xs text-muted-foreground">Alertas en la aplicación</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="overstock-frequency">Frecuencia del Reporte</Label>
                  <Select defaultValue="weekly">
                    <SelectTrigger id="overstock-frequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Diario</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensual</SelectItem>
                      <SelectItem value="on-demand">Bajo demanda</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Recipients */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Destinatarios
                </CardTitle>
                <CardDescription>Quién recibirá los reportes de sobrestock</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <div>
                        <Label className="font-medium">Gerentes de Inventario</Label>
                        <p className="text-xs text-muted-foreground">Equipo de gestión de inventario</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      <div>
                        <Label className="font-medium">Finanzas</Label>
                        <p className="text-xs text-muted-foreground">Departamento financiero</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-purple-500" />
                      <div>
                        <Label className="font-medium">Ventas</Label>
                        <p className="text-xs text-muted-foreground">Equipo de ventas</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="overstock-custom-emails">Emails Personalizados</Label>
                  <Textarea
                    id="overstock-custom-emails"
                    placeholder="email1@ejemplo.com, email2@ejemplo.com"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Analysis and Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  Análisis y Recomendaciones
                </CardTitle>
                <CardDescription>Incluir análisis detallado en las alertas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Análisis de Rotación</Label>
                    <p className="text-xs text-muted-foreground">Calcular y mostrar días de rotación</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Costo de Oportunidad</Label>
                    <p className="text-xs text-muted-foreground">Calcular capital inmovilizado</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Recomendaciones de Acción</Label>
                    <p className="text-xs text-muted-foreground">Sugerir promociones o descuentos</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Comparación con Períodos Anteriores</Label>
                    <p className="text-xs text-muted-foreground">Incluir tendencias históricas</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Automatic Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Acciones Automáticas
                </CardTitle>
                <CardDescription>Acciones sugeridas automáticamente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Generar Sugerencia de Promoción</Label>
                    <p className="text-xs text-muted-foreground">Crear propuesta de descuento automática</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Calcular Precio Óptimo de Liquidación</Label>
                    <p className="text-xs text-muted-foreground">Sugerir precio de venta para acelerar rotación</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-medium">Notificar a Ventas</Label>
                    <p className="text-xs text-muted-foreground">Alertar al equipo de ventas sobre exceso</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Advanced Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Configuración Avanzada
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="overstock-min-value">Valor Mínimo para Alertar</Label>
                  <Input id="overstock-min-value" type="number" placeholder="1000" />
                  <p className="text-xs text-muted-foreground">No alertar si el valor excedente es menor a este monto</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="overstock-exclude-products">Excluir Productos</Label>
                  <Select>
                    <SelectTrigger id="overstock-exclude-products">
                      <SelectValue placeholder="Sin exclusiones" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sin exclusiones</SelectItem>
                      <SelectItem value="seasonal">Productos estacionales</SelectItem>
                      <SelectItem value="new">Productos nuevos (&lt; 30 días)</SelectItem>
                      <SelectItem value="custom">Productos específicos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="overstock-notes">Notas</Label>
                  <Textarea
                    id="overstock-notes"
                    placeholder="Notas sobre esta configuración..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setOverstockAlertConfigOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveOverstock}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Guardar Configuración
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

