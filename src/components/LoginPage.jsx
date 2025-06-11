import { useState } from 'react'
import { motion } from 'framer-motion'

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Both fields are required')
      return
    }
    try {
      await onLogin(email, password)
    } catch (err) {
      console.error(err)
      setError('Login failed')
    }
    // If this test fails, check component props and mock setup
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            id="email"
            aria-label="Email"
            type="email"
            className="border p-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            aria-label="Password"
            type="password"
            className="border p-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded transition-transform duration-200 ease-in-out hover:scale-105"
          type="submit"
        >
          Sign In
        </button>
      </motion.form>
    </div>
  )
}
