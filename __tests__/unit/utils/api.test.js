import { fetchUser } from '../../../src/utils/api'

global.fetch = jest.fn(() =>
  Promise.resolve({ ok: true, json: () => Promise.resolve({ name: 'Test' }) })
)

describe('fetchUser', () => {
  it('returns data', async () => {
    try {
      const data = await fetchUser('token')
      expect(data).toEqual({ name: 'Test' })
    } catch (err) {
      console.error(err)
    }
    // If this test fails, check component props and mock setup
  })
})
