import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/Containers'

const sources = ['Facebook', 'YouTube', 'Google', 'Friend', 'Other']
const icons: Record<string, string> = { Facebook: '👥', YouTube: '▶️', Google: '🔍', Friend: '🤝', Other: '•••' }

const CompleteProfilePage: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <div className="min-h-screen bg-surface-overlay flex flex-col items-center justify-center px-4 py-12 transition-colors">
      <div className="w-full max-w-md bg-surface rounded-2xl shadow-sm border border-border p-8 transition-colors">
        <h2 className="text-2xl font-bold text-content-primary mb-1 text-center">Complete Your Profile</h2>
        <p className="text-sm text-content-muted text-center mb-8">Help us understand you better to improve your experience.</p>
        <div className="flex flex-col items-center mb-6">
          <p className="text-xs text-content-muted uppercase tracking-widest mb-3">Profile Image</p>
          <div className="w-20 h-20 rounded-full border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
            <svg className="w-6 h-6 text-content-muted mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs text-content-muted">UPLOAD</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-content-primary">What is your goal?</label>
            <textarea placeholder="Tell us what you are looking to achieve..." rows={3}
              className="w-full bg-surface-raised border border-border rounded-xl py-3 px-4 text-sm text-content-primary placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-primary/25 resize-none transition-colors" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-content-primary">Where did you hear about us?</label>
            <div className="flex flex-wrap gap-2">
              {sources.map(s => (
                <button key={s} onClick={() => setSelected(s)}
                  className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl border text-xs font-medium transition-all ${selected === s ? 'border-primary bg-primary-light text-primary' : 'border-border text-content-secondary hover:border-primary/50'}`}>
                  <span className="text-lg">{icons[s]}</span>{s}
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-start gap-2 text-sm text-content-secondary cursor-pointer">
            <input type="checkbox" className="mt-0.5 accent-primary" />
            <span>I agree to the <span className="text-primary underline cursor-pointer">Terms & Conditions</span> and <span className="text-primary underline cursor-pointer">Privacy Policy</span></span>
          </label>
          <Link to="/under-review">
            <button className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-xl transition-colors">Continue →</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default CompleteProfilePage
