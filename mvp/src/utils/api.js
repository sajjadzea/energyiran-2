export async function fetchUser(token) {
  console.debug('API fetchUser start')
  const res = await fetch('https://jsonplaceholder.typicode.com/users/1')
  console.debug('API fetchUser end')
  if (!res.ok) {
    throw new Error('Failed to fetch user')
  }
  return res.json()
}
// If data doesn’t load, verify API URL in api.js
