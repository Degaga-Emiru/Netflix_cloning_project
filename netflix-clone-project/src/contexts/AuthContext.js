import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for user on initial load
    const storedUser = localStorage.getItem('netflixUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // eslint-disable-next-line no-unused-vars
  const login = (email, password) => {
    // In a real app, you would verify credentials with a backend
    const userData = { email };
    localStorage.setItem('netflixUser', JSON.stringify(userData));
    setUser(userData);
    navigate('/');
  };

  // eslint-disable-next-line no-unused-vars
  const signup = (email, password) => {
    // In a real app, you would create a new user in a backend
    const userData = { email };
    localStorage.setItem('netflixUser', JSON.stringify(userData));
    setUser(userData);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('netflixUser');
    setUser(null);
    navigate('/landing');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);