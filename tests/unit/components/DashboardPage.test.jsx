/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
jest.mock(
  'react-router-dom',
  () => ({
    MemoryRouter: ({ children }) => <div>{children}</div>,
    useNavigate: () => jest.fn(),
  }),
  { virtual: true }
);
const { MemoryRouter } = require('react-router-dom');
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock Chart.js to avoid canvas dependency
jest.mock(
  'chart.js/auto',
  () => ({
    Chart: class {
      constructor() {}
      update() {}
    },
  }),
  { virtual: true }
);

// Mock ReactFlow to a simple div
jest.mock(
  'reactflow',
  () => (props) => <div data-testid="react-flow">{JSON.stringify(props)}</div>,
  { virtual: true }
);
jest.mock('reactflow/dist/style.css', () => ({}), { virtual: true });

const DashboardPage = require('../../../mvp/src/components/DashboardPage.jsx').default;

test('renders chart and graph', async () => {
  localStorage.setItem('token', 't');
  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({ ok: true, json: async () => ({ name: 'Bob' }) })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ categoryCounts: [{ category: 'A', count: 1 }] }),
    })
    .mockResolvedValueOnce({ ok: true, json: async () => ({ data: { nodes: [], edges: [] } }) });

  render(
    <MemoryRouter>
      <DashboardPage />
    </MemoryRouter>
  );
  expect(await screen.findByText(/welcome/i)).toBeInTheDocument();
  expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  expect(screen.getByTestId('graph')).toBeInTheDocument();
});
