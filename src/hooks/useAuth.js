import { useState } from 'react'

export function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem('token'))

  const login = async (email, password) => {
    try {
      const fakeToken = 'demo-jwt'
      localStorage.setItem('token', fakeToken)
      setToken(fakeToken)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return { token, login, logout }
}
