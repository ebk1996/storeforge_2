export async function login(email, password) {
  const res = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}
// BackendApi.js
const API_URL = 'http://127.0.0.1:5001/api';

export async function signup(email, password) {
  const res = await fetch(`${API_URL}/users/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function getStores() {
  const res = await fetch(`${API_URL}/stores`);
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}
