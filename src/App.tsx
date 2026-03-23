import React, { useState } from 'react'
import type { PageName } from './types'

import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CompleteProfilePage from './pages/CompleteProfilePage'
import UnderReviewPage from './pages/UnderReviewPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import DashboardPage from './pages/DashboardPage'

const pageLabels: Array<{ key: PageName; label: string }> = [
  { key: 'login', label: 'Login' },
  { key: 'signup', label: 'Sign Up' },
  { key: 'complete-profile', label: 'Complete Profile' },
  { key: 'under-review', label: 'Under Review' },
  { key: 'home', label: 'Home' },
  { key: 'profile', label: 'Profile' },
  { key: 'dashboard', label: 'Dashboard' },
]

function App() {
 return (
   <div>
    <HomePage />
    </div>
  )
}

export default App
