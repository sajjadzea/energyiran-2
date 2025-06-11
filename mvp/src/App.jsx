import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { useAuth } from './hooks/useAuth'
import './index.css'

const LoginPage = lazy(() => import('./components/LoginPage'))
const DashboardPage = lazy(() => import('./components/DashboardPage'))

function App() {
  const { token, login } = useAuth()

  return (
    <BrowserRouter>
      <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={login} />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="*"
            element={<Navigate to={token ? '/dashboard' : '/login'} />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
