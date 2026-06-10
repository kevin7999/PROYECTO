import { describe, expect, it } from 'vitest'
import { tryMockLogin, MOCK_USERNAME, MOCK_PASSWORD } from './mockAuth'

describe('tryMockLogin', () => {
  it('acepta credenciales admin / admin', () => {
    const result = tryMockLogin(MOCK_USERNAME, MOCK_PASSWORD)
    expect(result).toEqual({
      access: 'mock-access-token',
      refresh: 'mock-refresh-token',
      username: 'admin',
    })
  })

  it('rechaza credenciales incorrectas', () => {
    expect(tryMockLogin('admin', 'wrong')).toBeNull()
    expect(tryMockLogin('other', 'admin')).toBeNull()
  })
})
