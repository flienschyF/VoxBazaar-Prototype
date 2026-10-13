const USERS_KEY = 'voxbazaar.prototype.users'
const SESSION_KEY = 'voxbazaar.prototype.session'

export const demoUsers = [
  { name: 'Sarah Jenkins', email: 'sarah@artisanbakery.com', password: 'VoxDemo!2026', role: 'vendor', business: 'Artisan Bakery' },
  { name: 'Alex Morgan', email: 'alex@semiramis.events', password: 'VoxDemo!2026', role: 'organizer', business: 'Semiramis Bazaar' },
]

export function getUsers() {
  try {
    const stored = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    return [...demoUsers, ...stored.filter((u) => !demoUsers.some((d) => d.email.toLowerCase() === u.email.toLowerCase() && d.role === u.role))]
  } catch { return demoUsers }
}
export function registerUser(user) {
  const all = getUsers()
  if (all.some((u) => u.email.toLowerCase() === user.email.toLowerCase() && u.role === user.role)) return { ok: false, message: 'An account with this email and role already exists. Try signing in.' }
  try {
    const stored = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    localStorage.setItem(USERS_KEY, JSON.stringify([...stored, user]))
    return { ok: true }
  } catch { return { ok: false, message: 'Local storage is unavailable in this browser. Please enable it and try again.' } }
}
export function signIn(email, password, role, remember) {
  const user = getUsers().find((u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password && u.role === role)
  if (!user) return { ok: false, message: 'Email, password, or account type does not match. Check the demo credentials or register a prototype account.' }
  const value = JSON.stringify({ name: user.name, email: user.email, role: user.role, business: user.business || '' })
  try {
    if (remember) localStorage.setItem(SESSION_KEY, value)
    else sessionStorage.setItem(SESSION_KEY, value)
  } catch { /* session is still available in component state for this page */ }
  return { ok: true, user }
}
export function currentUser() {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY) || 'null') } catch { return null }
}
export function signOut() {
  localStorage.removeItem(SESSION_KEY)
  sessionStorage.removeItem(SESSION_KEY)
  location.hash = '/'
}
