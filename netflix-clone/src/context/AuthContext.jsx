import { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const storedUser = localStorage.getItem('netflixUser');
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const userData = {
            email,
            name: email.split('@')[0],
            avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}`,
          };
          setUser(userData);
          localStorage.setItem('netflixUser', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Email and password are required'));
        }
      }, 1000);
    });
  };

  const signup = async (email, password, name) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && name) {
          const userData = {
            email,
            name,
            avatar: `https://ui-avatars.com/api/?name=${name}`,
          };
          setUser(userData);
          localStorage.setItem('netflixUser', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('All fields are required'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('netflixUser');
    
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 3. Export the custom hook (recommended usage)
export const useAuth = () => useContext(AuthContext);

// 4. Export the context directly (if needed elsewhere)
export { AuthContext };