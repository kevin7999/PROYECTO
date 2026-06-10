//Authorization Context

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { AuthUser } from '../types/auth'
import { api } from '../lib/api'
import { clearAuth, getStoredAuth, saveAuth } from '../lib/auth'

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredAuth())

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      login: async (username, password) => {
        const response = await api.login(username, password)
        const authUser: AuthUser = {
          access: response.access,
          refresh: response.refresh,
          username: response.username,
        }
        saveAuth(authUser)
        setUser(authUser)
      },
      logout: () => {
        clearAuth()
        setUser(null)
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
