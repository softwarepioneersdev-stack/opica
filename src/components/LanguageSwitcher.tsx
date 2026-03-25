// ─────────────────────────────────────────────────────────────────────────────
// components/LanguageSwitcher.tsx
// Dropdown to switch between en / ar / fr.
// Used inside Navbar (desktop + mobile dropdown).
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useRef, useEffect } from 'react'
import { LANGUAGES } from '../lib/i18n'
import { useT } from '../lib/i18n'

const GlobeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c-2.5 0-4.5-4-4.5-9S9.5 3 12 3s4.5 4 4.5 9-2 9-4.5 9zM3 12h18" />
  </svg>
)

interface Props {
  /** compact: icon only (for navbar). expanded: shows full label (for mobile menu). */
  variant?: 'compact' | 'expanded'
}

const LanguageSwitcher = ({ variant = 'compact' }: Props) => {
  const { lang, changeLang } = useT()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  
  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  if (variant === 'expanded') {
    return (
      <div className="flex gap-1 px-4 py-1">
        {LANGUAGES.map(l => (
          <button
            key={l.code}
            onClick={() => changeLang(l.code)}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${
              lang === l.code
                ? 'bg-primary text-white'
                : 'bg-surface-raised text-content-secondary hover:bg-primary-light hover:text-primary'
            }`}
          >
            {l.nativeLabel}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Switch language"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-content-secondary hover:bg-surface-raised hover:text-content-primary transition-colors text-xs font-semibold"
      >
        <GlobeIcon />
        <span className="hidden sm:inline uppercase tracking-wider">{lang}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-36 bg-surface rounded-xl shadow-lg border border-border overflow-hidden z-50">
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              onClick={() => { changeLang(l.code); setOpen(false) }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium transition-colors text-left ${
                lang === l.code
                  ? 'bg-primary-light text-primary'
                  : 'text-content-secondary hover:bg-surface-raised hover:text-content-primary'
              }`}
            >
              <span className="font-bold uppercase tracking-wider w-5 text-center opacity-60">{l.code}</span>
              {l.nativeLabel}
              {lang === l.code && <span className="ml-auto text-primary">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
