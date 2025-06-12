// main.jsx: رندرکنندهٔ ریشهٔ React
/**
 * React root renderer
 * -------------------------------
 * Debug: minimal entrypoint for verifying rendering.
 * Troubleshoot: ensures StrictMode and root element exist.
 * Performance optimization: uses createRoot for concurrent mode.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
