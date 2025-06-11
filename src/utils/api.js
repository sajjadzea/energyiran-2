export async function fetchUser(token) {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1')
    if (!res.ok) {
      throw new Error('Failed to fetch user')
    }
    return res.json()
  } catch (err) {
    console.error(err)
    throw err
  }
}
// If data doesn’t load, verify API URL in api.js
