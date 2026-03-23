import { Route, Routes } from "react-router-dom"
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import DashboardPage from './pages/DashboardPage'
// import CompleteProfilePage from './pages/CompleteProfilePage'
// import UnderReviewPage from './pages/UnderReviewPage'
// import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/signin' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/Profile' element={<ProfilePage/>} />
      <Route path='/Admin' element={<DashboardPage/>} />
    </Routes>
  )
}

export default App
