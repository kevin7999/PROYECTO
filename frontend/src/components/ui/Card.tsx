import { cn } from '../../lib/cn'

type CardProps = {
  className?: string
  children: React.ReactNode
  variant?: 'default' | 'glass'
  accent?: boolean
}

export function Card({ className, children, variant = 'default', accent = false }: CardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl p-6',
        variant === 'default' && 'border border-ruta-silver-200 bg-white shadow-sm',
        variant === 'glass' && 'glass-card',
        accent && 'pt-7',
        className,
      )}
    >
      {accent && (
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-ruta-orange-500 to-ruta-orange-400" />
      )}
      {children}
    </div>
  )
}

type StatCardProps = {
  label: string
  value: string
  hint?: string
  accent?: 'blue' | 'orange'
  icon?: React.ReactNode
}

export function StatCard({ label, value, hint, accent = 'blue', icon }: StatCardProps) {
  const accentStyles =
    accent === 'orange'
      ? 'border-ruta-orange-500/20 bg-gradient-to-br from-ruta-orange-500/5 to-white'
      : 'border-ruta-blue-500/20 bg-gradient-to-br from-ruta-blue-500/5 to-white'

  return (
    <Card className={cn('border', accentStyles)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-ruta-muted">{label}</p>
          <p className="mt-2 font-display text-3xl font-bold text-ruta-ink">{value}</p>
          {hint && <p className="mt-1 text-xs text-ruta-muted">{hint}</p>}
        </div>
        {icon && (
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-xl',
              accent === 'orange'
                ? 'bg-ruta-orange-500/10 text-ruta-orange-500'
                : 'bg-ruta-blue-500/10 text-ruta-blue-600',
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}
