// useAuth.js: هوک ساده برای مدیریت توکن
/**
 * Authentication hook
 * -------------------------------
 * Debug: placeholder for real auth flow.
 * Troubleshoot: stores token in localStorage.
 * Performance optimization: useState initializer reads token once.
 */
import { useState } from 'react';

export function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const login = async (email, password) => {
    // Debug: simulated login; replace with real API call
    // eslint-disable-next-line no-void
    void email;
    // eslint-disable-next-line no-void
    void password;
    const fakeToken = 'demo-jwt';
    localStorage.setItem('token', fakeToken);
    setToken(fakeToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    // Troubleshoot: ensures token cleared on logout
  };

  return { token, login, logout };
}
