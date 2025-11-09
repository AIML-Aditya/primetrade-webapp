import jwtDecode from 'jwt-decode';

export const saveToken = (token) => localStorage.setItem('token', token);
export const clearToken = () => localStorage.removeItem('token');
export const getToken = () => localStorage.getItem('token');

export function isAuthenticated() {
  const token = getToken();
  if (!token) return false;
  try {
    const { exp } = jwtDecode(token);
    if (exp && Date.now() >= exp * 1000) { clearToken(); return false; }
    return true;
  } catch (e) { clearToken(); return false; }
}

export function getUserId() {
  const token = getToken();
  if (!token) return null;
  try { const payload = jwtDecode(token); return payload.user?.id || null; } catch(e) { return null; }
}