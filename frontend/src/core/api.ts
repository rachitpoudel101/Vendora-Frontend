const token = localStorage.getItem('token')

export async function fetchUsers() {
  try {
    const res = await fetch('http://127.0.0.1:8000/users/', {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
    return await res.json()
  } catch (e) {
    return []
  }
}

export async function createUser(
  user: {
    username: string;
    role: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    password: string;
  },
  token?: string
) {
  const res = await fetch('http://127.0.0.1:8000/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify({
      username: user.username,
      role: user.role,
      email: user.email || "",
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      password: user.password
    }),
  })
  if (!res.ok) throw new Error('Failed to create user')
  return await res.json()
}

export async function getUsers() {
  const res = await fetch('http://127.0.0.1:8000/users/', {
    method: 'GET',
    headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
  })
  if (!res.ok) throw new Error('Failed to create user')
  return await res.json()
}