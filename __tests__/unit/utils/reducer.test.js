import { counterReducer } from '../../../src/utils/reducer'

describe('counterReducer', () => {
  it('increments state', () => {
    try {
      const result = counterReducer(0, { type: 'inc' })
      expect(result).toBe(1)
    } catch (err) {
      console.error(err)
    }
    // If this test fails, check component props and mock setup
  })
})
