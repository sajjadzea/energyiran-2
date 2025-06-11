import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy } from 'react'
import { useAuth } from './hooks/useAuth'

const LoginPage = lazy(() => import('./components/LoginPage'))
const DashboardPage = lazy(() => import('./components/DashboardPage'))

export default function App() {
  const { token, login } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={login} />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to={token ? '/dashboard' : '/login'} />} />
      </Routes>
    </BrowserRouter>
  )
}
