// ─────────────────────────────────────────────────────────────────────────────
// components/Navbar.tsx
//
// Reusable sub-components (all local, no extra deps):
//   <NavIcon>        — renders a single SVG icon from a path string
//   <ThemeToggleIcon>— sun / moon svg
//   <HamburgerIcon>  — ☰ / ✕
//   <DesktopNavLink> — single link for desktop bar
//   <MobileNavLink>  — single link for mobile dropdown
//   <ThemeToggleRow> — the full dark-mode row inside the mobile menu
//   <Navbar>         — main export
//
// All logic (links, theme) lives in lib/navbar.ts
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react'
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom'
import {
  getNavLinks,
  getAuthLinks,
  isActiveLink,
  initTheme,
  toggleTheme,
} from '../lib/navbar'
import type { NavLink as NavLinkType, Theme } from '../lib/navbar'

// ─────────────────────────────────────────────────────────────────────────────
// Primitive icon component — renders any heroicon path string
// ─────────────────────────────────────────────────────────────────────────────
interface NavIconProps {
  path: string
  className?: string
}
const NavIcon = ({ path, className = 'w-5 h-5' }: NavIconProps) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
)

// ─────────────────────────────────────────────────────────────────────────────
// Sun / Moon icon
// ─────────────────────────────────────────────────────────────────────────────
const ThemeToggleIcon = ({ isDark, className = 'w-5 h-5' }: { isDark: boolean; className?: string }) =>
  isDark ? (
    // Sun → click switches to light
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  ) : (
    // Moon → click switches to dark
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
    </svg>
  )

// ─────────────────────────────────────────────────────────────────────────────
// Hamburger / Close icon
// ─────────────────────────────────────────────────────────────────────────────
const HamburgerIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ) : (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )

// ─────────────────────────────────────────────────────────────────────────────
// Desktop nav link  (icon + label, active underline dot)
// ─────────────────────────────────────────────────────────────────────────────
interface LinkProps {
  link: NavLinkType
  pathname: string
}

const DesktopNavLink = ({ link, pathname }: LinkProps) => {
  const active = isActiveLink(link.path, pathname)
  return (
    <RouterNavLink
      to={link.path}
      className={`relative flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-150 ${
        active
          ? 'text-blue-600 dark:text-blue-400'
          : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      {active && (
        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full" />
      )}
      <NavIcon path={link.icon} className="w-4 h-4" />
      {link.label}
    </RouterNavLink>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Mobile dropdown link  (larger tap target, active highlight)
// ─────────────────────────────────────────────────────────────────────────────
const MobileNavLink = ({ link, pathname }: LinkProps) => {
  const active = isActiveLink(link.path, pathname)
  return (
    <RouterNavLink
      to={link.path}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150 ${
        active
          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
      }`}
    >
      <NavIcon path={link.icon} className="w-5 h-5 flex-shrink-0" />
      <span className="flex-1">{link.label}</span>
      {active && <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full" />}
    </RouterNavLink>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Dark-mode toggle row for the mobile dropdown (label + pill toggle)
// ─────────────────────────────────────────────────────────────────────────────
interface ThemeRowProps {
  isDark: boolean
  onToggle: () => void
}
const ThemeToggleRow = ({ isDark, onToggle }: ThemeRowProps) => (
  <button
    onClick={onToggle}
    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
  >
    <ThemeToggleIcon isDark={isDark} className="w-5 h-5 flex-shrink-0" />
    <span className="flex-1 text-left">{isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
    {/* Pill toggle */}
    <span className="flex items-center" aria-hidden="true">
      <span className={`relative inline-flex w-10 h-5 rounded-full transition-colors duration-200 ${isDark ? 'bg-blue-600' : 'bg-gray-300'}`}>
        <span className={`inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 m-0.5 ${isDark ? 'translate-x-5' : 'translate-x-0'}`} />
      </span>
    </span>
  </button>
)

// ─────────────────────────────────────────────────────────────────────────────
// Divider  (reusable horizontal rule for the mobile menu)
// ─────────────────────────────────────────────────────────────────────────────
const MenuDivider = () => <div className="h-px bg-gray-100 dark:bg-gray-800 my-1" />

// ─────────────────────────────────────────────────────────────────────────────
// Main Navbar
// ─────────────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const wrapperRef = useRef<HTMLElement>(null)
  const navLinks = getNavLinks()
  const authLinks = getAuthLinks()

  // ── Init theme on mount
  useEffect(() => {
    const theme = initTheme()
    setIsDark(theme === 'dark')
  }, [])

  // ── Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  // ── Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node))
        setMenuOpen(false)
    }
    
    if (menuOpen) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  // ── Close menu on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const handleToggleTheme = () => {
    const next = toggleTheme(isDark ? 'dark' : 'light' as Theme)
    setIsDark(next === 'dark')
  }

  return (
    <header ref={wrapperRef} className="sticky top-0 z-50 w-full">
      <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <RouterNavLink to="/" className="flex items-center gap-2 flex-shrink-0" aria-label="Opica home">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="font-bold text-lg text-blue-600 dark:text-blue-400 tracking-tight">
                Opica
              </span>
            </RouterNavLink>

            {/* ── Desktop: main links ── */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <DesktopNavLink key={link.path} link={link} pathname={location.pathname} />
              ))}
            </div>

            {/* ── Desktop: right side ── */}
            <div className="hidden md:flex items-center gap-2">
              {/* Dark mode */}
              <button
                onClick={handleToggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors duration-150"
              >
                <ThemeToggleIcon isDark={isDark} />
              </button>

              {/* Notifications */}
              <button
                aria-label="Notifications"
                className="relative w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors duration-150"
              >
                <NavIcon path="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" />
              </button>

              <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />

              {/* Auth links */}
              {authLinks.map(link => (
                <RouterNavLink
                  key={link.path}
                  to={link.path}
                  className={
                    link.label === 'Sign Up'
                      ? 'text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-xl transition-colors duration-150'
                      : 'text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150'
                  }
                >
                  {link.label}
                </RouterNavLink>
              ))}
            </div>

            {/* ── Mobile: right side ── */}
            <div className="flex md:hidden items-center gap-1">
              <button
                onClick={handleToggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
              >
                <ThemeToggleIcon isDark={isDark} />
              </button>
              <button
                onClick={() => setMenuOpen(v => !v)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
              >
                <HamburgerIcon open={menuOpen} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile slide-down dropdown ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? 'max-h-[640px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!menuOpen}
        >
          <div className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 pt-3 pb-5 space-y-1">
            {/* Main nav links */}
            {navLinks.map(link => (
              <MobileNavLink key={link.path} link={link} pathname={location.pathname} />
            ))}

            <MenuDivider />

            {/* Auth links */}
            {authLinks.map(link => (
              <MobileNavLink key={link.path} link={link} pathname={location.pathname} />
            ))}

            <MenuDivider />

            {/* Dark mode toggle row */}
            <ThemeToggleRow isDark={isDark} onToggle={handleToggleTheme} />

            {/* New Request CTA */}
            <RouterNavLink
              to="/orders"
              className="flex items-center justify-center gap-2 w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-xl transition-colors duration-150"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Request
            </RouterNavLink>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
