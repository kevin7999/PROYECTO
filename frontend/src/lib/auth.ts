import type { AuthUser } from '../types/auth'

const STORAGE_KEY = 'kg_inventario_auth'

export function getStoredAuth(): AuthUser | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

export function saveAuth(user: AuthUser) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function clearAuth() {
  localStorage.removeItem(STORAGE_KEY)
}
