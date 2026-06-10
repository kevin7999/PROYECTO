import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { LoginPage } from './LoginPage'

const mockLogin = vi.fn()

vi.mock('../../app/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    isAuthenticated: false,
    login: mockLogin,
    logout: vi.fn(),
  }),
}))

function renderLoginPage() {
  return render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>,
  )
}

describe('LoginPage', () => {
  beforeEach(() => {
    mockLogin.mockReset()
  })

  it('renderiza campos de usuario y contraseña', () => {
    renderLoginPage()

    expect(screen.getByLabelText('Usuario')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument()
  })

  it('deshabilita el botón durante el loading', async () => {
    mockLogin.mockImplementation(() => new Promise(() => {}))
    const user = userEvent.setup()
    renderLoginPage()

    await user.type(screen.getByLabelText('Usuario'), 'admin')
    await user.type(screen.getByLabelText('Contraseña'), 'admin123')
    await user.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(screen.getByRole('button', { name: 'Ingresando...' })).toBeDisabled()
  })

  it('muestra error ante credenciales inválidas', async () => {
    mockLogin.mockRejectedValue(new Error('Credenciales inválidas'))
    const user = userEvent.setup()
    renderLoginPage()

    await user.type(screen.getByLabelText('Usuario'), 'admin')
    await user.type(screen.getByLabelText('Contraseña'), 'wrong')
    await user.click(screen.getByRole('button', { name: 'Ingresar' }))

    await waitFor(() => {
      expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument()
    })
  })
})
