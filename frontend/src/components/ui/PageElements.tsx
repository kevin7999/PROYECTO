import { cn } from '../../lib/cn'

export function InputLabel({
  htmlFor,
  children,
}: {
  htmlFor?: string
  children: React.ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-ruta-ink">
      {children}
    </label>
  )
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full rounded-xl border border-ruta-silver-200 bg-white px-3.5 py-3 text-sm text-ruta-ink shadow-sm outline-none transition-all duration-200 placeholder:text-ruta-silver-400 focus:border-ruta-blue-500 focus:shadow-md focus:shadow-ruta-blue-500/15 focus:ring-2 focus:ring-ruta-blue-400/25',
        className,
      )}
      {...props}
    />
  )
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-danger-500/30 bg-danger-500/5 px-4 py-3 text-sm text-danger-500">
      {message}
    </div>
  )
}
