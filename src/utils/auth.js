const SESSION_KEY = 'ticketapp_session';

// Mock user database
const MOCK_USERS = [
  { email: 'admin@example.com', password: 'password123', name: 'Admin User' },
  { email: 'user@example.com', password: 'user123', name: 'Test User' }
];

// Login function
export function login(email, password) {
  const user = MOCK_USERS.find(u => u.email === email && u.password === password);

  if (user) {
    const session = {
      token: `mock-jwt-${Date.now()}`,
      user: { email: user.email, name: user.name }
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { success: true, user: session.user };
  }

  return { success: false, error: 'Invalid email or password' };
}

// Signup function
export function signup(email, password, name) {
  const existingUser = MOCK_USERS.find(u => u.email === email);

  if (existingUser) {
    return { success: false, error: 'User already exists' };
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return { success: false, error: 'Invalid email format' };
  }

  if (password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters' };
  }

  // Save mock user
  MOCK_USERS.push({ email, password, name });

  const session = {
    token: `mock-jwt-${Date.now()}`,
    user: { email, name }
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { success: true, user: session.user };
}

// Logout function
export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

// Check if authenticated
export function isAuthenticated() {
  const session = localStorage.getItem(SESSION_KEY);
  if (!session) return false;

  try {
    const parsed = JSON.parse(session);
    return !!parsed.token;
  } catch {
    return false;
  }
}

// Get current user
export function getCurrentUser() {
  const session = localStorage.getItem(SESSION_KEY);
  if (!session) return null;

  try {
    const parsed = JSON.parse(session);
    return parsed.user;
  } catch {
    return null;
  }
}
