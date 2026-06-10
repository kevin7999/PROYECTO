import { cn } from '../../lib/cn'

const sizes = {
  sm: 'h-8',
  md: 'h-14',
  lg: 'h-24',
} as const

type LogoProps = {
  size?: keyof typeof sizes
  className?: string
}

export function Logo({ size = 'md', className }: LogoProps) {
  return (
    <img
      src="/logo-ruta8.png"
      alt="RUTA 8 AUTOPARTES"
      className={cn('w-auto object-contain', sizes[size], className)}
      onError={(e) => {
        const target = e.currentTarget
        if (!target.src.endsWith('/logo-ruta8.svg')) {
          target.src = '/logo-ruta8.svg'
        }
      }}
    />
  )
}
