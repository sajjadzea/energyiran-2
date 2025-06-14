// DashboardPage.jsx: صفحه داشبورد با واکشی داده‌ها
/**
 * Dashboard Page
 * -------------------------------
 * Debug: console.debug calls show fetch progress.
 * Troubleshoot: handles missing token and network errors.
 * Performance optimization: minimal state and effect dependencies.
 */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart } from 'chart.js/auto';
import { fetchUser, fetchDashboardData } from '../utils/api';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();
  const barRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    async function load() {
      try {
        console.debug('Fetching user');
        const u = await fetchUser(token);
        setUser(u);
      } catch (err) {
        console.error(err);
      }
      try {
        console.debug('Fetching dashboard data');
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (err) {
        console.error(err);
        // fallback mock data
        setDashboardData({
          kpis: [
            { title: 'Sample Users', value: 0 },
            { title: 'Sample Sessions', value: 0 },
          ],
          categoryCounts: [
            { category: 'demo', count: 1 },
            { category: 'test', count: 2 },
          ],
          timeSeries: [
            { label: 'Jan', value: 0 },
            { label: 'Feb', value: 0 },
          ],
        });
      }
    }

    load();
  }, [navigate]);

  useEffect(() => {
    if (!dashboardData) return;

    let barChart;
    let lineChart;

    if (barRef.current) {
      const ctx = barRef.current.getContext('2d');
      barChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: dashboardData.categoryCounts.map((c) => c.category),
          datasets: [
            {
              label: 'Count',
              data: dashboardData.categoryCounts.map((c) => c.count),
              backgroundColor: 'rgba(75,192,192,0.5)',
            },
          ],
        },
        options: { maintainAspectRatio: false },
      });
    }

    if (lineRef.current) {
      const ctx = lineRef.current.getContext('2d');
      lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dashboardData.timeSeries.map((t) => t.label),
          datasets: [
            {
              label: 'Value',
              data: dashboardData.timeSeries.map((t) => t.value),
              fill: false,
              borderColor: 'rgba(54,162,235,0.8)',
              tension: 0.1,
            },
          ],
        },
        options: { maintainAspectRatio: false },
      });
    }

    return () => {
      if (barChart) barChart.destroy();
      if (lineChart) lineChart.destroy();
    };
  }, [dashboardData]);

  if (!user || !dashboardData) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <p>Welcome, {user.name}</p>
      <div className="grid grid-cols-2 gap-4">
        {dashboardData.kpis.map((kpi) => (
          <div
            key={kpi.title}
            className="bg-gray-100 p-2 rounded"
            data-testid="kpi"
          >
            {kpi.title}: {kpi.value}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4" style={{ height: '300px' }}>
        <canvas ref={barRef} aria-label="Category Chart" />
        <canvas ref={lineRef} aria-label="Time Series Chart" />
      </div>
    </div>
  );
}
