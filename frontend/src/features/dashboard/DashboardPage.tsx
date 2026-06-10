import { Droplets, LogOut, Package, Wrench } from 'lucide-react'
import { useAuth } from '../../app/AuthContext'
import { AppShell } from '../../components/layout/AppShell'
import { Button } from '../../components/ui/Button'
import { Card, StatCard } from '../../components/ui/Card'

export function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <AppShell
      actions={
        <Button variant="ghost" size="sm" onClick={logout}>
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </Button>
      }
    >
      <Card variant="glass" accent className="mb-8">
        <h1 className="font-display text-3xl font-bold text-ruta-ink">
          Bienvenido, {user?.username}
        </h1>
        <p className="mt-2 max-w-xl text-ruta-muted">
          Panel de administración de inventario. Gestiona repuestos, aceites, lubricantes y
          químicos desde un solo lugar.
        </p>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Aceites y lubricantes"
          value="—"
          hint="Próximamente"
          accent="blue"
          icon={<Droplets className="h-5 w-5" />}
        />
        <StatCard
          label="Repuestos y frenos"
          value="—"
          hint="Próximamente"
          accent="orange"
          icon={<Wrench className="h-5 w-5" />}
        />
        <StatCard
          label="Químicos y accesorios"
          value="—"
          hint="Próximamente"
          accent="blue"
          icon={<Package className="h-5 w-5" />}
        />
      </div>
    </AppShell>
  )
}
