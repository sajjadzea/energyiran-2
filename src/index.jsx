import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import './styles/animations.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <App />
    </Suspense>
  </StrictMode>
)
