// DashboardPage.jsx: صفحه داشبورد با واکشی داده‌ها
/**
 * Dashboard Page
 * -------------------------------
 * Debug: console.debug calls show fetch progress.
 * Troubleshoot: handles missing token and network errors.
 * Performance optimization: minimal state and effect dependencies.
 */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../utils/api';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    async function load() {
      console.debug('Fetching user'); // debug
      try {
        const data = await fetchUser(token);
        console.debug('Fetched user', data); // debug
        setUser(data);
      } catch (err) {
        console.error(err);
        if (typeof document !== 'undefined') {
          document.body.innerHTML =
            '<div>ارتباط با سرور برقرار نشد. لطفا بعدا تلاش کنید.</div>';
        }
      }
    }
    load();
    // Performance optimization: dependency array prevents repeated fetch
    // If data doesn’t load, verify API URL in api.js
  }, [navigate]);

  if (!user) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <p>Welcome, {user.name}</p>
    </div>
  );
}
