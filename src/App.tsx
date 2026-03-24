import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { initTheme } from './lib/navbar'

import HomePage            from './pages/HomePage'
import LoginPage           from './pages/LoginPage'
import SignupPage          from './pages/SignupPage'
import ProfilePage         from './pages/ProfilePage'
import DashboardPage       from './pages/DashboardPage'
import CompleteProfilePage from './pages/CompleteProfilePage'
import UnderReviewPage     from './pages/UnderReviewPage'
import Orders              from './pages/Orders'

// ── Placeholder pages for new nav routes ─────────────────────────────────────
const PlaceholderPage = ({ title, emoji }: { title: string; emoji: string }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
    <div className="text-center">
      <p className="text-5xl mb-4">{emoji}</p>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h1>
      <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Coming soon</p>
    </div>
  </div>
)

function App() {
  // Apply saved theme before first paint
  useEffect(() => { initTheme() }, [])

  return (
    <div className="transition-colors duration-200">
      <Routes>
        {/* ── Main pages ── */}
        <Route path="/"          element={<HomePage />} />
        <Route path="/Profile"   element={<ProfilePage />} />
        <Route path="/Admin"     element={<DashboardPage />} />

        {/* ── Auth pages ── */}
        <Route path="/signin"    element={<LoginPage />} />
        <Route path="/signup"    element={<SignupPage />} />
        <Route path="/complete-profile" element={<CompleteProfilePage />} />
        <Route path="/under-review"     element={<UnderReviewPage />} />

        {/* ── New nav routes ── */}
        <Route path="/messaging" element={<PlaceholderPage title="Messaging"  emoji="💬" />} />
        <Route path="/orders"    element={<Orders/>} />
      </Routes>
    </div>
  )
}

export default App
