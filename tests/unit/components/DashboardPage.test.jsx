/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
jest.mock('chart.js/auto', () => ({
  __esModule: true,
  default: function Chart() {
    return { destroy: jest.fn() };
  },
}), { virtual: true });
jest.mock('d3', () => {
  const sel = {
    attr: jest.fn(() => sel),
    append: jest.fn(() => sel),
    selectAll: jest.fn(() => ({ remove: jest.fn(), data: jest.fn(() => ({ join: jest.fn(() => sel) })) })),
  };
  return {
    select: jest.fn(() => sel),
    scaleBand: jest.fn(() => {
      const band = {
        domain: jest.fn(() => band),
        range: jest.fn(() => band),
        padding: jest.fn(() => band),
        bandwidth: jest.fn(() => 10),
      };
      return band;
    }),
    scaleLinear: jest.fn(() => {
      const lin = {
        domain: jest.fn(() => lin),
        nice: jest.fn(() => lin),
        range: jest.fn(() => lin),
      };
      return lin;
    }),
    max: jest.fn(() => 1),
  };
}, { virtual: true });
jest.mock('react-router-dom', () => {
  const React = require('react');
  return {
    MemoryRouter: ({ children }) => React.createElement('div', null, children),
    useNavigate: jest.fn(),
  };
}, { virtual: true });

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes('users')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ name: 'test-user' }),
      });
    }
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          timeSeries: [{ label: 'Jan', value: 1 }],
          categoryCounts: [{ category: 'a', count: 2 }],
        }),
    });
  });
  localStorage.setItem('token', 'demo');
  HTMLCanvasElement.prototype.getContext = jest.fn();
});
import DashboardPage from '../../../mvp/src/components/DashboardPage.jsx';
import { MemoryRouter } from 'react-router-dom';

afterEach(() => {
  jest.resetAllMocks();
  localStorage.clear();
});

test('renders chart and graph', async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <DashboardPage />
    </MemoryRouter>
  );
  await waitFor(() => screen.getByTestId('chart'));
  expect(screen.getByTestId('graph')).toBeInTheDocument();
});
