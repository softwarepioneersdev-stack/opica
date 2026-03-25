import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GoogleButton from '../components/GoogleButton'
import { Footer } from '../components/Containers'
import { useT } from '../lib/i18n'

// ── Validation helpers ────────────────────────────────────────────────────────
const validateEmail = (v: string) => {
  if (!v.trim()) return 'emailRequired'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'emailInvalid'
  return null
}
const validatePassword = (v: string) => {
  if (!v) return 'passwordRequired'
  if (v.length < 8) return 'passwordMin'
  return null
}

// ── Reusable field wrapper ────────────────────────────────────────────────────
const FieldError = ({ msg }: { msg?: string }) =>
  msg ? <p className="text-xs text-danger mt-1">{msg}</p> : null

const LoginPage: React.FC = () => {
  const { t } = useT()
  const [email, setEmail]           = useState('')
  const [password, setPassword]     = useState('')
  const [showPass, setShowPass]     = useState(false)
  const [keepLogged, setKeepLogged] = useState(false)
  const [errors, setErrors]         = useState<Record<string, string>>({})
  const [touched, setTouched]       = useState<Record<string, boolean>>({})

  const getErrors = () => ({
    email:    validateEmail(email)    ? t(`auth.errors.${validateEmail(email)}`)    : '',
    password: validatePassword(password) ? t(`auth.errors.${validatePassword(password)}`) : '',
  })

  const touch = (field: string) => {
    setTouched(p => ({ ...p, [field]: true }))
    setErrors(getErrors())
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ email: true, password: true })
    const errs = getErrors()
    setErrors(errs)
    if (!errs.email && !errs.password) console.log('Login ✓', { email })
  }

  const inputCls = (field: string) =>
    `w-full bg-surface-raised border rounded-xl py-3 text-sm text-content-primary placeholder-content-muted focus:outline-none focus:ring-2 transition-all ${
      touched[field] && errors[field]
        ? 'border-danger focus:ring-danger/20'
        : 'border-border focus:ring-primary/25 focus:border-primary'
    }`

  return (
    <div className="min-h-screen bg-surface-overlay flex flex-col items-center justify-center px-4 py-12 transition-colors">
      <h1 className="text-3xl font-bold text-primary font-serif mb-2 tracking-tight">{t('common.appName')}</h1>
      <p className="text-content-muted text-sm mb-8">{t('common.tagline')}</p>

      <div className="w-full max-w-md bg-surface rounded-2xl shadow-sm border border-border p-8 transition-colors">
        <h2 className="text-2xl font-bold text-content-primary mb-1">{t('auth.login.title')}</h2>
        <p className="text-sm text-content-secondary mb-7">{t('auth.login.subtitle')}</p>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-content-primary">{t('auth.login.email')}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-content-muted text-sm pointer-events-none">✉️</span>
              <input type="email" placeholder={t('auth.login.emailPlaceholder')} value={email}
                onChange={e => { setEmail(e.target.value); if (touched.email) setErrors(getErrors()) }}
                onBlur={() => touch('email')}
                className={`${inputCls('email')} pl-10 pr-4`} />
            </div>
            <FieldError msg={touched.email ? errors.email : ''} />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-content-primary">{t('auth.login.password')}</label>
              <button type="button" className="text-xs text-primary hover:underline">{t('auth.login.forgotPassword')}</button>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-content-muted text-sm pointer-events-none">🔒</span>
              <input type={showPass ? 'text' : 'password'} placeholder={t('auth.login.passwordPlaceholder')} value={password}
                onChange={e => { setPassword(e.target.value); if (touched.password) setErrors(getErrors()) }}
                onBlur={() => touch('password')}
                className={`${inputCls('password')} pl-10 pr-10`} />
              <button type="button" onClick={() => setShowPass(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted text-sm">
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
            <FieldError msg={touched.password ? errors.password : ''} />
          </div>

          <label className="flex items-center gap-2 text-sm text-content-secondary cursor-pointer">
            <input type="checkbox" checked={keepLogged} onChange={() => setKeepLogged(v => !v)} className="accent-primary" />
            {t('auth.login.keepLoggedIn')}
          </label>

          <button type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-xl transition-colors">
            {t('auth.login.signIn')}
          </button>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-content-muted uppercase tracking-widest">{t('auth.login.orContinue')}</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <GoogleButton />

          <p className="text-center text-sm text-content-secondary">
            {t('auth.login.noAccount')}{' '}
            <Link to="/signup" className="text-primary font-medium hover:underline">{t('auth.login.createAccount')}</Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default LoginPage
