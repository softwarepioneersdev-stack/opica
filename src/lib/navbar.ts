// ─────────────────────────────────────────────────────────────────────────────
// lib/navbar.ts — Single source of truth for navigation links & dark mode
// No external dependencies — browser APIs only
// ─────────────────────────────────────────────────────────────────────────────

export interface NavLink {
  label: string
  path: string
  icon: string // heroicons SVG <path d="…">
}

export type Theme = 'light' | 'dark'

// ─── 1. Links ─────────────────────────────────────────────────────────────────

export const getNavLinks = (): NavLink[] => [
  { label: 'Home',      path: '/',         icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { label: 'Messaging', path: '/messaging', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
  { label: 'Orders',    path: '/orders',   icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { label: 'Dashboard', path: '/Admin',    icon: 'M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z' },
  { label: 'Profile',   path: '/Profile',  icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
]

export const getAuthLinks = (): NavLink[] => [
  { label: 'Login',   path: '/signin', icon: 'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' },
  { label: 'Sign Up', path: '/signup', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
]

// ─── 2. Active link ───────────────────────────────────────────────────────────

export const isActiveLink = (path: string, pathname: string): boolean => {
  if (path === '/') return pathname === '/'
  return pathname.startsWith(path)
}

// ─── 3. Dark mode ─────────────────────────────────────────────────────────────

const THEME_KEY = 'opica-theme'

export const getSavedTheme = (): Theme => {
  const saved = localStorage.getItem(THEME_KEY) as Theme | null
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const applyTheme = (theme: Theme): void => {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export const toggleTheme = (current: Theme): Theme => {
  const next: Theme = current === 'dark' ? 'light' : 'dark'
  localStorage.setItem(THEME_KEY, next)
  applyTheme(next)
  return next
}

export const initTheme = (): Theme => {
  const theme = getSavedTheme()
  applyTheme(theme)
  return theme
}
