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
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import {
  fetchUser,
  fetchDashboardData,
  fetchGraphData,
} from '../utils/api';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
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

  useEffect(() => {
    if (!user) return;
    async function loadData() {
      try {
        const dash = await fetchDashboardData();
        setChartData(dash.categoryCounts);
        const graph = await fetchGraphData();
        setGraphData(graph.data || { nodes: [], edges: [] });
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, [user]);

  useEffect(() => {
    if (!chartData || !chartRef.current) return;
    const labels = chartData.map((d) => d.category);
    const values = chartData.map((d) => d.count);
    if (chartInstanceRef.current) {
      chartInstanceRef.current.data.labels = labels;
      chartInstanceRef.current.data.datasets[0].data = values;
      chartInstanceRef.current.update();
    } else {
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'bar',
        data: { labels, datasets: [{ label: 'Categories', data: values }] },
        options: { responsive: true },
      });
    }
  }, [chartData]);

  if (!user) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <p>Welcome, {user.name}</p>
      <canvas ref={chartRef} data-testid="bar-chart" className="my-4" />
      <div style={{ width: '100%', height: 200 }} data-testid="graph">
        <ReactFlow nodes={graphData.nodes} edges={graphData.edges} fitView />
      </div>
    </div>
  );
}
