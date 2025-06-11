import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
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
      try {
        const data = await fetchUser(token)
        setUser(data)
      } catch (err) {
        console.error(err)
      }
    }
    load()
    // If data doesn’t load, verify API URL in api.js
  }, [navigate])

  const cards = useMemo(() => {
    if (!user) return []
    return [{ title: 'Profile', value: user.name }]
  }, [user])

  if (!user) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-4 rounded shadow"
          >
            <p className="font-semibold">{card.title}</p>
            <p>{card.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
