// DashboardPage.jsx: نمایش نمودار ساده با داده‌های آزمایشی
import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';

export default function DashboardPage() {
  const [data, setData] = useState([]); // داده‌های نمودار
  const [chartReady, setChartReady] = useState(false);
  const chartRef = useRef(null);

  // مقداردهی داده‌های آزمایشی
  useEffect(() => {
    setData([
      { label: 'A', value: 10 },
      { label: 'B', value: 15 },
      { label: 'C', value: 7 },
      { label: 'D', value: 20 },
    ]);
  }, []);

  // رسم نمودار پس از آماده شدن داده‌ها
  useEffect(() => {
    if (!data.length || !chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map((d) => d.label),
        datasets: [
          {
            label: 'Value',
            data: data.map((d) => d.value),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          },
        ],
      },
      options: { maintainAspectRatio: false },
    });

    setChartReady(true);
    return () => chart.destroy();
  }, [data]);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      {!chartReady && (
        <ul data-testid="data-list" className="list-disc pl-5">
          {data.map((item) => (
            <li key={item.label}>
              {item.label}: {item.value}
            </li>
          ))}
        </ul>
      )}
      <div style={{ height: '300px' }}>
        <canvas ref={chartRef} data-testid="graph" aria-label="Mock Chart" />
      </div>
    </div>
  );
}

