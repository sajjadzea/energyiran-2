import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Both fields are required')
      return
    }
    try {
      await onLogin(email, password)
      navigate('/dashboard')
    } catch (err) {
      console.error(err) // debug
      setError('Login failed')
    }
    // If login hangs, check network in DevTools
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-xl mb-4">Login</h2>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            className="border p-2 w-64"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            className="border p-2 w-64"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Sign In
        </button>
      </form>
    </div>
  )
}
