import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GoogleButton from '../components/GoogleButton'
import { Footer } from '../components/Containers'
import { useT } from '../lib/i18n'

// ── Validators ────────────────────────────────────────────────────────────────
const rules = {
  name:     (v: string) => !v.trim() ? 'nameRequired' : v.trim().length < 2 ? 'nameMin' : null,
  email:    (v: string) => !v.trim() ? 'emailRequired' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'emailInvalid' : null,
  role:     (v: string) => !v ? 'roleRequired' : null,
  password: (v: string) => !v ? 'passwordRequired' : v.length < 8 ? 'passwordMin' : null,
  confirm:  (v: string, pw: string) => !v ? 'confirmRequired' : v !== pw ? 'passwordMatch' : null,
  terms:    (v: boolean) => !v ? 'termsRequired' : null,
}

const FieldError = ({ msg }: { msg?: string }) =>
  msg ? <p className="text-xs text-danger mt-1">{msg}</p> : null

const SignupPage: React.FC = () => {
  const { t } = useT()
  const [form, setForm] = useState({ name: '', email: '', role: '', password: '', confirm: '', terms: false })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [showPass, setShowPass] = useState(false)

  const getErrors = () => ({
    name:     rules.name(form.name)                   ? t(`auth.errors.${rules.name(form.name)}`)                   : '',
    email:    rules.email(form.email)                 ? t(`auth.errors.${rules.email(form.email)}`)                 : '',
    role:     rules.role(form.role)                   ? t(`auth.errors.${rules.role(form.role)}`)                   : '',
    password: rules.password(form.password)           ? t(`auth.errors.${rules.password(form.password)}`)           : '',
    confirm:  rules.confirm(form.confirm, form.password) ? t(`auth.errors.${rules.confirm(form.confirm, form.password)}`) : '',
    terms:    rules.terms(form.terms)                 ? t(`auth.errors.${rules.terms(form.terms)}`)                 : '',
  })

  const touch = (field: string) => {
    setTouched(p => ({ ...p, [field]: true }))
    setErrors(getErrors())
  }

  const set = (field: string, value: string | boolean) => {
    setForm(p => ({ ...p, [field]: value }))
    if (touched[field]) setErrors(getErrors())
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const all = Object.keys(rules).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    setTouched(all)
    const errs = getErrors()
    setErrors(errs)
    if (Object.values(errs).every(v => !v)) console.log('Signup ✓', form)
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
        <h2 className="text-2xl font-bold text-content-primary mb-1">{t('auth.signup.title')}</h2>
        <p className="text-sm text-primary mb-7">{t('auth.signup.subtitle')}</p>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-content-primary">{t('auth.signup.fullName')}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-content-muted pointer-events-none">👤</span>
              <input type="text" placeholder={t('auth.signup.fullNamePlaceholder')} value={form.name}
                onChange={e => set('name', e.target.value)} onBlur={() => touch('name')}
                className={`${inputCls('name')} pl-10 pr-4`} />
            </div>
            <FieldError msg={touched.name ? errors.name : ''} />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-content-primary">{t('auth.signup.email')}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-content-muted pointer-events-none">✉️</span>
              <input type="email" placeholder={t('auth.signup.emailPlaceholder')} value={form.email}
                onChange={e => set('email', e.target.value)} onBlur={() => touch('email')}
                className={`${inputCls('email')} pl-10 pr-4`} />
            </div>
            <FieldError msg={touched.email ? errors.email : ''} />
          </div>

          {/* Role */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-primary">{t('auth.signup.role')}</label>
            <div className="relative">
              <select value={form.role} onChange={e => set('role', e.target.value)} onBlur={() => touch('role')}
                className={`${inputCls('role')} px-4 appearance-none`}>
                <option value="">{t('auth.signup.rolePlaceholder')}</option>
                {Object.entries(t('auth.signup.roles', { returnObjects: true }) as Record<string,string>).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted pointer-events-none">▾</span>
            </div>
            <FieldError msg={touched.role ? errors.role : ''} />
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-content-primary">{t('auth.signup.password')}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-content-muted pointer-events-none">🔒</span>
                <input type={showPass ? 'text' : 'password'} placeholder={t('auth.signup.passwordPlaceholder')} value={form.password}
                  onChange={e => set('password', e.target.value)} onBlur={() => touch('password')}
                  className={`${inputCls('password')} pl-10 pr-8`} />
                <button type="button" onClick={() => setShowPass(v => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-content-muted text-xs">{showPass ? '🙈' : '👁️'}</button>
              </div>
              <FieldError msg={touched.password ? errors.password : ''} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-content-primary">{t('auth.signup.confirmPassword')}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-content-muted pointer-events-none">🔒</span>
                <input type="password" placeholder={t('auth.signup.confirmPlaceholder')} value={form.confirm}
                  onChange={e => set('confirm', e.target.value)} onBlur={() => touch('confirm')}
                  className={`${inputCls('confirm')} pl-10 pr-4`} />
              </div>
              <FieldError msg={touched.confirm ? errors.confirm : ''} />
            </div>
          </div>

          {/* Terms */}
          <div className="flex flex-col gap-1">
            <label className="flex items-start gap-2 text-sm text-content-secondary cursor-pointer">
              <input type="checkbox" checked={form.terms}
                onChange={e => set('terms', e.target.checked)} onBlur={() => touch('terms')}
                className="mt-0.5 accent-primary" />
              <span>
                {t('auth.signup.agree')}{' '}
                <span className="text-primary underline cursor-pointer">{t('auth.signup.terms')}</span>
                {' '}{t('auth.signup.and')}{' '}
                <span className="text-primary underline cursor-pointer">{t('auth.signup.privacy')}</span>
              </span>
            </label>
            <FieldError msg={touched.terms ? errors.terms : ''} />
          </div>

          <button type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-xl transition-colors">
            {t('auth.signup.createBtn')}
          </button>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-content-muted uppercase tracking-widest">{t('auth.signup.orRegister')}</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <GoogleButton />

          <p className="text-center text-sm text-content-secondary">
            {t('auth.signup.haveAccount')}{' '}
            <Link to="/signin" className="text-primary font-medium hover:underline">{t('auth.signup.signIn')}</Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default SignupPage
