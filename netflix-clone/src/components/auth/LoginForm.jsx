// src/components/Auth/LoginForm.jsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const LoginForm = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-2 bg-red-500 text-white text-sm rounded">
          {error}
        </div>
      )}
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 bg-gray-700 rounded text-white"
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 bg-gray-700 rounded text-white"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 bg-netflix-red rounded text-white font-semibold ${
          loading ? 'opacity-70' : 'hover:bg-red-600'
        }`}
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
};

export default LoginForm;