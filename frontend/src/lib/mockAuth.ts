import type { LoginResponse } from '../types/auth'

export const MOCK_USERNAME = 'admin'
export const MOCK_PASSWORD = 'admin'

export function tryMockLogin(username: string, password: string): LoginResponse | null {
  if (username.trim() === MOCK_USERNAME && password === MOCK_PASSWORD) {
    return {
      access: 'mock-access-token',
      refresh: 'mock-refresh-token',
      username: MOCK_USERNAME,
    }
  }
  return null
}

export function isMockAuthEnabled() {
  return import.meta.env.VITE_MOCK_AUTH !== 'false'
}
