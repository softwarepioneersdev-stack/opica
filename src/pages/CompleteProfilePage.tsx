import React, { useState } from 'react'
import { Footer } from '../components/Containers'


const sources = ['Facebook', 'YouTube', 'Google', 'Friend', 'Other']
const icons: Record<string, string> = {
  Facebook: '👥',
  YouTube: '▶️',
  Google: '🔍',
  Friend: '🤝',
  Other: '•••',
}

const CompleteProfilePage: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">
          Complete Your Profile
        </h2>
        <p className="text-sm text-gray-400 text-center mb-8">
          Help us understand you better to improve your experience.
        </p>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center mb-6">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
            Profile Image
          </p>
          <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors">
            <svg
              className="w-6 h-6 text-gray-300 mb-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-xs text-gray-300">UPLOAD</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Goal */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              What is your goal?
            </label>
            <textarea
              placeholder="Tell us what you are looking to achieve..."
              rows={3}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
            />
          </div>

          {/* Source */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Where did you hear about us?
            </label>
            <div className="flex flex-wrap gap-2">
              {sources.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelected(s)}
                  className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl border text-xs font-medium transition-all ${selected === s
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-200 text-gray-600 hover:border-blue-300'
                    }`}
                >
                  <span className="text-lg">{icons[s]}</span>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" className="mt-0.5 accent-blue-600" />
            <span>
              I agree to the{' '}
              <span className="text-blue-600 underline cursor-pointer">
                Terms & Conditions
              </span>{' '}
              and{' '}
              <span className="text-blue-600 underline cursor-pointer">
                Privacy Policy
              </span>
            </span>
          </label>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Continue →
          </button>
        </div>
      </div>
      <Footer/>
        <div className="flex gap-4 mt-1">
          {['Help Center', 'Privacy', 'Contact'].map((l) => (
            <button key={l} className="text-xs text-gray-400 hover:text-gray-600">
              {l}
            </button>
          ))}
        </div>
    </div>
  )
}

export default CompleteProfilePage
