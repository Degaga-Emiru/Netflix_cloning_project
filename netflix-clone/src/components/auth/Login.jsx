import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate('/profiles');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-netflix-black flex items-center justify-center p-4">
      <div className="bg-black/70 p-8 md:p-16 max-w-md w-full rounded-md">
        <h1 className="text-3xl font-bold mb-6">Sign In</h1>
        
        {error && <div className="mb-4 p-3 bg-red-900 text-white rounded-md">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-md text-white"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-md text-white"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-netflix-red text-white py-3 rounded-md font-semibold hover:bg-red-700 transition"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-4 flex justify-between items-center text-gray-400 text-sm">
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button className="hover:underline">Need help?</button>
        </div>
        
        <p className="mt-8 text-gray-400">
          New to Netflix?{' '}
          <button 
            onClick={() => navigate('/signup')}
            className="text-white hover:underline"
          >
            Sign up now
          </button>
        </p>
      </div>
    </div>
  );
}