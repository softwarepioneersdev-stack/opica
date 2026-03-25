// ─────────────────────────────────────────────────────────────────────────────
// lib/i18n.ts
// Lightweight i18n built on i18next + react-i18next.
// - Loads JSON files from src/locales/{en,ar,fr}/translation.json
// - Sets dir="rtl" on <html> for Arabic
// - Exports useT() hook as the single way to consume translations
// ─────────────────────────────────────────────────────────────────────────────

import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'

import en from '../../public/locales/en/translation.json'
import ar from '../../public/locales/ar/translation.json'
import fr from '../../public/locales/fr/translation.json'

// ── Supported languages ───────────────────────────────────────────────────────
export type Lang = 'en' | 'ar' | 'fr'

export const LANGUAGES: { code: Lang; label: string; nativeLabel: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'en', label: 'English',  nativeLabel: 'English', dir: 'ltr' },
  { code: 'ar', label: 'Arabic',   nativeLabel: 'العربية', dir: 'rtl' },
  { code: 'fr', label: 'French',   nativeLabel: 'Français', dir: 'ltr' },
]

// ── Storage key ───────────────────────────────────────────────────────────────
const LANG_KEY = 'opica-lang'

// ── Get saved / default language ──────────────────────────────────────────────
export const getSavedLang = (): Lang => {
  const saved = localStorage.getItem(LANG_KEY) as Lang | null
  if (saved && ['en', 'ar', 'fr'].includes(saved)) return saved
  const browser = navigator.language.slice(0, 2) as Lang
  return ['en', 'ar', 'fr'].includes(browser) ? browser : 'en'
}

// ── Apply dir + lang attribute to <html> ──────────────────────────────────────
export const applyLang = (lang: Lang): void => {
  const found = LANGUAGES.find(l => l.code === lang)
  document.documentElement.lang = lang
  document.documentElement.dir  = found?.dir ?? 'ltr'
}

// ── Change language, persist, apply ──────────────────────────────────────────
export const changeLang = (lang: Lang): void => {
  localStorage.setItem(LANG_KEY, lang)
  applyLang(lang)
  i18n.changeLanguage(lang)
}

// ── i18next initialisation ────────────────────────────────────────────────────
const savedLang = getSavedLang()

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
      fr: { translation: fr },
    },
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: { escapeValue: false }, // React already escapes
  })

// Apply dir on startup
applyLang(savedLang)

export default i18n

// ── Convenience hook ──────────────────────────────────────────────────────────
// Usage:  const { t, lang, changeLang } = useT()
export const useT = () => {
  const { t, i18n: i18nInstance } = useTranslation()
  return {
    t,
    lang: i18nInstance.language as Lang,
    changeLang,
    isRTL: i18nInstance.language === 'ar',
  }
}
