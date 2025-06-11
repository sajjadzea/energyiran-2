import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchUser } from '../utils/api'

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    async function load() {
      console.debug('Fetching user') // debug
      try {
        const data = await fetchUser(token)
        console.debug('Fetched user', data) // debug
        setUser(data)
      } catch (err) {
        console.error(err)
      }
    }
    load()
    // If data doesn’t load, verify API URL in api.js
  }, [navigate])

  if (!user) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <p>Welcome, {user.name}</p>
    </div>
  )
}
