import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LockClosedIcon, EnvelopeIcon, UserIcon } from '@heroicons/react/24/outline';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(email, password, name);
      navigate('/'); // Redirect to home after successful signup
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Netflix-style film background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <img 
          src="https://assets.https://occ-0-8243-1501.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABcc0ZFo9RqbhV9jEFrOneG9PnPozeU0qa6Tu5MwCPg49Z_0kKR6ybUo8rsl_MTbNvhhnSK0Zq8Xmki0poO9pmMFyleKgswVmYpY.jpg?r=730.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/2b0bfda4-60f1-4a9b-8d0a-549a289c7d2a/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="Netflix background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header with Netflix logo */}
      <header className="relative z-20 px-4 py-4 md:px-12">
        <Link to="/">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
            alt="Netflix" 
            className="h-8 md:h-12" 
          />
        </Link>
      </header>

      {/* Signup Form */}
      <div className="relative z-20 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-black/80 rounded-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            Sign Up
          </h2>
          
          {error && (
            <div className="mb-6 p-3 bg-red-600 text-white text-sm rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-netflix-red"
                required
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-netflix-red"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-netflix-red"
                required
                minLength="6"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 bg-netflix-red text-white font-semibold rounded hover:bg-red-700 transition ${loading ? 'opacity-70' : ''}`}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-8 text-gray-400">
            <p className="mb-2">Already have an account?</p>
            <Link 
              to="/login" 
              className="text-white hover:underline"
            >
              Sign in now
            </Link>
          </div>

          <div className="mt-6 text-xs text-gray-400">
            <p>
              This page is protected by Google reCAPTCHA to ensure you're not a bot.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;