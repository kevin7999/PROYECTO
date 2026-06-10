import { getStoredAuth, clearAuth } from './auth'
import { isMockAuthEnabled, tryMockLogin } from './mockAuth'

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const auth = getStoredAuth()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string> | undefined),
  }
  if (auth?.access) headers.Authorization = `Bearer ${auth.access}`

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers })

  if (response.status === 401) {
    clearAuth()
    window.location.href = '/login'
    throw new Error('Sesión expirada')
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error de conexión' }))
    throw new Error(error.message ?? 'Error inesperado')
  }

  if (response.status === 204) return undefined as T
  return response.json()
}

export const api = {
  login: async (username: string, password: string) => {
    if (isMockAuthEnabled()) {
      const mock = tryMockLogin(username, password)
      if (mock) return mock
    }

    return fetch(`${API_BASE}/api/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }).then(async (res) => {
      if (!res.ok) {
        const error = await res.json().catch(() => ({ message: 'Credenciales inválidas' }))
        throw new Error(error.message ?? 'Credenciales inválidas')
      }
      return res.json() as Promise<import('../types/auth').LoginResponse>
    })
  },

  me: () => {
    const auth = getStoredAuth()
    if (auth?.access === 'mock-access-token') {
      return Promise.resolve({ username: auth.username, is_staff: true })
    }
    return request<import('../types/auth').MeResponse>('/api/auth/me/')
  },
}
