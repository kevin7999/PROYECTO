import { cn } from '../../lib/cn'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md'
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50',
        size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-3 text-sm',
        variant === 'primary' &&
          'btn-primary-ruta shadow-lg shadow-ruta-blue-600/30 hover:scale-[1.02] hover:shadow-ruta-blue-600/45 active:scale-[0.98]',
        variant === 'secondary' &&
          'border border-ruta-silver-200 bg-white text-ruta-ink hover:border-ruta-blue-400/40 hover:bg-ruta-surface',
        variant === 'ghost' && 'text-ruta-muted hover:bg-ruta-silver-200/50 hover:text-ruta-ink',
        className,
      )}
      {...props}
    />
  )
}
