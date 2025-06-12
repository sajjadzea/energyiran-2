import { useState } from 'react';

export function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const login = async (email, password) => {
    // currently unused, but kept for future auth implementation
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
  };

  return { token, login, logout };
}
