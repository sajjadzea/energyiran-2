/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import LoginPage from '../../../src/components/LoginPage.jsx';

// If this test times out, increase Jest timeout via jest.setTimeout

test('renders login form and responds to input', () => {
  render(<LoginPage />);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
  expect(emailInput.value).toBe('user@example.com');
});
// اگر کامپوننت رندر نمی‌شود، بررسی کن که default export صحیح باشد
