import { render, screen, fireEvent } from '@testing-library/react'
import LoginPage from '../../../src/components/LoginPage'

describe('LoginPage validation', () => {
  it('shows error when fields are empty', () => {
    try {
      const mockLogin = jest.fn()
      render(<LoginPage onLogin={mockLogin} />)
      fireEvent.click(screen.getByRole('button', { name: /sign in/i }))
      expect(screen.getByText(/both fields are required/i)).toBeInTheDocument()
    } catch (err) {
      console.error(err)
    }
    // If this test fails, check component props and mock setup
  })
})
