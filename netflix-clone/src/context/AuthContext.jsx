import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for user on initial load
    const storedUser = localStorage.getItem('netflixUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signUp = (email) => {
    const newUser = { email, plan: 'basic' };
    localStorage.setItem('netflixUser', JSON.stringify(newUser));
    setUser(newUser);
  };

  const login = (email) => {
    const storedUser = JSON.parse(localStorage.getItem('netflixUser'));
    if (storedUser && storedUser.email === email) {
      setUser(storedUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('netflixUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);