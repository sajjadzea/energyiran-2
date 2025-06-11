import { useState } from 'react'

export function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem('token'))

  const login = async (email, password) => {
    // replace with real authentication logic
    const fakeToken = 'demo-jwt'
    localStorage.setItem('token', fakeToken)
    setToken(fakeToken)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return { token, login, logout }
}
