import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api.js';

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hotelpro_user') || 'null'); } catch { return null; }
  });
  const [loading, setLoading] = useState(false);

  const saveSession = (data) => {
    localStorage.setItem('hotelpro_token', data.token);
    localStorage.setItem('hotelpro_user', JSON.stringify(data.user));
    setUser(data.user);
  };
  const login = async (email, password) => { const { data } = await api.post('/auth/login', { email, password }); saveSession(data); return data.user; };
  const register = async (form) => { const { data } = await api.post('/auth/register', form); saveSession(data); return data.user; };
  const logout = () => { localStorage.removeItem('hotelpro_token'); localStorage.removeItem('hotelpro_user'); setUser(null); };
  useEffect(() => {
    if (!localStorage.getItem('hotelpro_token')) return;
    setLoading(true);
    api.get('/auth/me').then(({ data }) => setUser(data.user)).catch(logout).finally(() => setLoading(false));
  }, []);
  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
