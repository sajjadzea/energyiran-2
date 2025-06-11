// dashboard.js - renders KPI cards and charts using Chart.js

import { Chart } from 'chart.js/auto'

// helper to fetch JSON with error handling
async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  return res.json()
}

let barChart
let pieChart

export async function initDashboard({ cardsContainer, barChartId, pieChartId }) {
  console.debug('Fetching dashboard data…')
  try {
    const data = await fetchJson('/api/dashboard/data.json')
    const { kpis = [], categoryCounts = [], timeSeries = [] } = data

    renderCards(cardsContainer, kpis)
    renderBarChart(barChartId, categoryCounts)
    renderPieChart(pieChartId, timeSeries)
  } catch (err) {
    console.error('Failed to initialize dashboard', err)
  }
}

function renderCards(containerSelector, kpis) {
  const container = document.querySelector(containerSelector)
  if (!container) {
    console.error('Cards container not found', containerSelector)
    return
  }
  container.innerHTML = ''
  kpis.forEach(kpi => {
    const div = document.createElement('div')
    div.className = 'dashboard-card'
    div.innerHTML = `<h3>${kpi.title}</h3><p>${kpi.value}</p>`
    container.appendChild(div)
    console.debug('Rendered KPI:', kpi.title)
  })
  // If cards not visible, check CSS class names
}

function renderBarChart(canvasId, counts) {
  const ctx = document.getElementById(canvasId)?.getContext('2d')
  if (!ctx) {
    console.error('Bar chart canvas not found', canvasId)
    return
  }
  const labels = counts.map(d => d.category)
  const values = counts.map(d => d.count)
  console.debug('Bar chart data:', counts)
  if (barChart) {
    barChart.data.labels = labels
    barChart.data.datasets[0].data = values
    barChart.update()
  } else {
    barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{ label: 'Categories', data: values }]
      },
      options: { responsive: true }
    })
  }
}

function renderPieChart(canvasId, series) {
  const ctx = document.getElementById(canvasId)?.getContext('2d')
  if (!ctx) {
    console.error('Pie chart canvas not found', canvasId)
    return
  }
  const labels = series.map(d => d.label)
  const values = series.map(d => d.value)
  if (pieChart) {
    pieChart.data.labels = labels
    pieChart.data.datasets[0].data = values
    pieChart.update()
  } else {
    pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [{ data: values }]
      },
      options: { responsive: true }
    })
  }
  // If chart blank, verify data arrays and labels length
}
