import type { ReactNode } from 'react'
import { Logo } from '../brand/Logo'

type AppShellProps = {
  children: ReactNode
  actions?: ReactNode
}

export function AppShell({ children, actions }: AppShellProps) {
  return (
    <div className="min-h-screen bg-ruta-surface">
      <header className="sticky top-0 z-20 border-b border-ruta-silver-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo size="sm" />
          {actions}
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  )
}
