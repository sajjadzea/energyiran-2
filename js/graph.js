// graph.js - renders causal graph using D3

import * as d3 from 'd3'

// helper to fetch JSON with error handling
async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  return res.json()
}

// main export
export async function renderGraph(containerId) {
  console.debug('Fetching graph JSON…')
  try {
    const [nodes, links] = await Promise.all([
      fetchJson('/api/graphs/nodes.json'),
      fetchJson('/api/graphs/links.json')
    ])

    const container = d3.select(`#${containerId}`)
    if (container.empty()) {
      console.error('Container not found:', containerId)
      return
    }

    container.select('svg').remove() // reuse existing SVG
    const width = container.node().clientWidth || 800
    const height = container.node().clientHeight || 600

    const svg = container
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    const link = svg
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')

    const node = svg
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 6)
      .attr('fill', d => color(d.category))
      .on('click', (_, d) => {
        console.debug('Node clicked:', d)
        // integrate with application callback here
      })

    const simulation = d3
      .forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(80))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .alphaDecay(0.05) // throttle ticks for performance
      .on('tick', ticked)

    node.call(createDrag(simulation))

    function ticked() {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)

      node.attr('cx', d => d.x).attr('cy', d => d.y)
    }

    function createDrag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        event.subject.fx = event.subject.x
        event.subject.fy = event.subject.y
      }

      function dragged(event) {
        event.subject.fx = event.x
        event.subject.fy = event.y
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0)
        event.subject.fx = null
        event.subject.fy = null
      }

      return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended)
    }
  } catch (err) {
    console.error('Error rendering graph', err)
  }
  // If graph doesn’t render, check data shape and container ID
}
