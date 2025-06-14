// DashboardPage.jsx: صفحه داشبورد با واکشی داده‌ها
/**
 * Dashboard Page
 * -------------------------------
 * Debug: console.debug calls show fetch progress.
 * Troubleshoot: handles missing token and network errors.
 * Performance optimization: minimal state and effect dependencies.
 */
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import * as d3 from 'd3';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../utils/api';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const graphRef = useRef(null);
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
    async function loadData() {
      console.debug('Fetching dashboard data');
      try {
        const res = await fetch('/api/dashboard/data.json');
        if (!res.ok) throw new Error('Dashboard data error');
        const json = await res.json();
        console.debug('Fetched dashboard data');
        setData(json);
      } catch (err) {
        console.error('Dashboard fetch failed', err);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!data || !chartRef.current) return;
    const ctx = chartRef.current.getContext('2d');
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.timeSeries.map((d) => d.label),
        datasets: [
          {
            label: 'Value',
            data: data.timeSeries.map((d) => d.value),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
    });
  }, [data]);

  useEffect(() => {
    if (!data || !graphRef.current) return;
    const svg = d3.select(graphRef.current);
    svg.selectAll('*').remove();

    const width = 300;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const x = d3
      .scaleBand()
      .domain(data.categoryCounts.map((d) => d.category))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data.categoryCounts, (d) => d.count)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.attr('width', width).attr('height', height);

    svg
      .append('g')
      .selectAll('rect')
      .data(data.categoryCounts)
      .join('rect')
      .attr('x', (d) => x(d.category))
      .attr('y', (d) => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', (d) => y(0) - y(d.count))
      .attr('fill', 'steelblue');
  }, [data]);

  if (!user) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <p>Welcome, {user.name}</p>
      {data && (
        <div>
          <canvas data-testid="chart" ref={chartRef} />
          <svg data-testid="graph" ref={graphRef} />
        </div>
      )}
    </div>
  );
}
