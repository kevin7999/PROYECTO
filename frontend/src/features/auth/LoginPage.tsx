import { type FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { useAuth } from '../../app/AuthContext'
import { Logo } from '../../components/brand/Logo'
import { LoginBackground } from '../../components/layout/LoginBackground'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { ErrorState, Input, InputLabel } from '../../components/ui/PageElements'

const stagger = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: 'easeOut' as const },
  }),
}

export function LoginPage() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(username, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginBackground>
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-6 flex flex-col items-center text-center"
        >
          <Logo size="lg" className="h-20 sm:h-24" />
          <p className="mt-4 text-sm font-medium tracking-wide text-ruta-muted">
            Sistema de inventario automotriz
          </p>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="w-full max-w-md"
        >
          <Card variant="glass" accent>
            <div className="mb-6">
              <h1 className="font-display text-2xl font-bold text-ruta-ink">Iniciar sesión</h1>
              <p className="mt-1 text-sm text-ruta-muted">
                Acceso seguro para administradores
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div custom={2} initial="hidden" animate="visible" variants={stagger}>
                <InputLabel htmlFor="username">Usuario</InputLabel>
                <Input
                  id="username"
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ingresa tu usuario"
                  disabled={loading}
                />
              </motion.div>

              <motion.div custom={3} initial="hidden" animate="visible" variants={stagger}>
                <InputLabel htmlFor="password">Contraseña</InputLabel>
                <div className="relative">
                  <Input
                    id="password"
                    required
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    disabled={loading}
                    className="pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ruta-silver-400 transition-colors hover:text-ruta-blue-600"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </motion.div>

              {error && (
                <motion.div custom={4} initial="hidden" animate="visible" variants={stagger}>
                  <ErrorState message={error} />
                </motion.div>
              )}

              <motion.div custom={5} initial="hidden" animate="visible" variants={stagger}>
                <Button type="submit" className="w-full text-white" disabled={loading}>
                  {loading ? 'Ingresando...' : 'Ingresar'}
                </Button>
              </motion.div>
            </form>

            <div className="mt-6 rounded-xl border border-ruta-blue-500/15 bg-ruta-blue-500/5 px-4 py-3 text-xs text-ruta-muted">
              <p>
                <strong className="text-ruta-blue-700">Demo:</strong> admin / admin
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          custom={6}
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mt-8 flex items-center gap-2 text-xs text-ruta-muted"
        >
          <ShieldCheck className="h-4 w-4 text-ruta-blue-600" />
          <span>Conexión segura · Solo personal autorizado</span>
        </motion.div>
      </div>
    </LoginBackground>
  )
}
