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

function App() {
  useEffect(() => { initTheme() }, [])
  return (
    <div className="transition-colors duration-200">
      <Routes>
        <Route path="/"                  element={<HomePage />} />
        <Route path="/Profile"           element={<ProfilePage />} />
        <Route path="/Admin"             element={<DashboardPage />} />
        <Route path="/signin"            element={<LoginPage />} />
        <Route path="/signup"            element={<SignupPage />} />
        <Route path="/complete-profile"  element={<CompleteProfilePage />} />
        <Route path="/under-review"      element={<UnderReviewPage />} />
        <Route path="/orders"            element={<Orders />} />
        <Route path="/messaging"         element={
          <div className="min-h-screen bg-surface-overlay flex items-center justify-center transition-colors">
            <div className="text-center">
              <p className="text-5xl mb-4">💬</p>
              <h1 className="text-2xl font-bold text-content-primary">Messaging</h1>
              <p className="text-content-muted mt-1 text-sm">Coming soon</p>
            </div>
          </div>
        } />
      </Routes>
    </div>
  )
}
export default App
