import { useState, useEffect, useRef } from 'react'
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom'
import { getNavLinks, getAuthLinks, isActiveLink, initTheme, toggleTheme } from '../lib/navbar'
import type { NavLink as NavLinkType, Theme } from '../lib/navbar'
import { useT } from '../lib/i18n'
import LanguageSwitcher from './LanguageSwitcher'

const NavIcon = ({ path, className = 'w-5 h-5' }: { path: string; className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
)

const ThemeToggleIcon = ({ isDark, className = 'w-5 h-5' }: { isDark: boolean; className?: string }) =>
  isDark ? (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
  ) : (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" /></svg>
  )

const HamburgerIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
  ) : (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
  )

const DesktopNavLink = ({ link, pathname }: { link: NavLinkType; pathname: string }) => {
  const active = isActiveLink(link.path, pathname)
  return (
    <RouterNavLink to={link.path}
      className={`relative flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-150 ${active ? 'text-primary' : 'text-content-secondary hover:text-content-primary hover:bg-surface-raised'}`}>
      {active && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />}
      <NavIcon path={link.icon} className="w-4 h-4" />
      {link.label}
    </RouterNavLink>
  )
}

const MobileNavLink = ({ link, pathname }: { link: NavLinkType; pathname: string }) => {
  const active = isActiveLink(link.path, pathname)
  return (
    <RouterNavLink to={link.path}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150 ${active ? 'bg-primary-light text-primary' : 'text-content-secondary hover:bg-surface-raised hover:text-content-primary'}`}>
      <NavIcon path={link.icon} className="w-5 h-5 flex-shrink-0" />
      <span className="flex-1">{link.label}</span>
      {active && <span className="w-1.5 h-1.5 bg-primary rounded-full" />}
    </RouterNavLink>
  )
}

const ThemeToggleRow = ({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) => {
  const { t } = useT()
  return (
    <button onClick={onToggle}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-content-secondary hover:bg-surface-raised transition-colors">
      <ThemeToggleIcon isDark={isDark} className="w-5 h-5 flex-shrink-0" />
      <span className="flex-1 text-left">{isDark ? t('nav.switchLight') : t('nav.switchDark')}</span>
      <span aria-hidden="true">
        <span className={`relative inline-flex w-10 h-5 rounded-full transition-colors duration-200 ${isDark ? 'bg-primary' : 'bg-surface-overlay'}`}>
          <span className={`inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 m-0.5 ${isDark ? 'translate-x-5' : 'translate-x-0'}`} />
        </span>
      </span>
    </button>
  )
}

const MenuDivider = () => <div className="h-px bg-border my-1" />

const Navbar = () => {
  const location = useLocation()
  const { t } = useT()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const wrapperRef = useRef<HTMLElement>(null)
  const navLinks  = getNavLinks(t)
  const authLinks = getAuthLinks(t)

  useEffect(() => { setIsDark(initTheme() === 'dark') }, [])
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    if (menuOpen) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const handleToggleTheme = () => {
    setIsDark(prev => { toggleTheme(prev ? 'dark' : 'light' as Theme); return !prev })
  }

  return (
    <header ref={wrapperRef} className="sticky top-0 z-50 w-full">
      <nav className="bg-surface/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <RouterNavLink to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="font-bold text-lg text-primary tracking-tight">{t('common.appName')}</span>
            </RouterNavLink>
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => <DesktopNavLink key={link.path} link={link} pathname={location.pathname} />)}
            </div>
            <div className="hidden md:flex items-center gap-2">
              <LanguageSwitcher />
              <button onClick={handleToggleTheme}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-content-muted hover:bg-surface-raised hover:text-content-primary transition-colors">
                <ThemeToggleIcon isDark={isDark} />
              </button>
              <button className="relative w-9 h-9 flex items-center justify-center rounded-xl text-content-muted hover:bg-surface-raised hover:text-content-primary transition-colors">
                <NavIcon path="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border-2 border-surface" />
              </button>
              <div className="w-px h-5 bg-border mx-1" />
              {authLinks.map(link => (
                <RouterNavLink key={link.path} to={link.path}
                  className={link.path === '/signup'
                    ? 'text-sm font-semibold text-white bg-primary hover:bg-primary-hover px-4 py-1.5 rounded-xl transition-colors'
                    : 'text-sm font-medium text-content-secondary hover:text-content-primary px-3 py-1.5 rounded-lg hover:bg-surface-raised transition-colors'}>
                  {link.label}
                </RouterNavLink>
              ))}
            </div>
            <div className="flex md:hidden items-center gap-1">
              <button onClick={handleToggleTheme} className="w-9 h-9 flex items-center justify-center rounded-xl text-content-muted hover:bg-surface-raised transition-colors">
                <ThemeToggleIcon isDark={isDark} />
              </button>
              <button onClick={() => setMenuOpen(v => !v)} aria-expanded={menuOpen}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-content-secondary hover:bg-surface-raised transition-colors">
                <HamburgerIcon open={menuOpen} />
              </button>
            </div>
          </div>
        </div>
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-surface border-t border-border px-4 pt-3 pb-5 space-y-1">
            {navLinks.map(link => <MobileNavLink key={link.path} link={link} pathname={location.pathname} />)}
            <MenuDivider />
            {authLinks.map(link => <MobileNavLink key={link.path} link={link} pathname={location.pathname} />)}
            <MenuDivider />
            <ThemeToggleRow isDark={isDark} onToggle={handleToggleTheme} />
            <MenuDivider />
            <LanguageSwitcher variant="expanded" />
            <RouterNavLink to="/orders"
              className="flex items-center justify-center gap-2 w-full mt-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold py-3 rounded-xl transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              {t('nav.newRequest')}
            </RouterNavLink>
          </div>
        </div>
      </nav>
    </header>
  )
}
export default Navbar
