import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignIn, setIsSignIn] = useState(true);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would validate and authenticate with a backend
    login({ email, name: email.split('@')[0] });
    navigate('/browse');
  };

  return (
    <div className="relative h-screen w-full bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/d0982892-13ac-4702-b9fa-87a410c1f2da/519e3d3a-1c8c-4fdb-8f8a-7eabdbe87056/AE-en-20220321-popsignuptwoweeks-perspective_alpha_website_large.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="https://rb.gy/ulxxee" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {isSignIn ? 'Sign In' : 'Register'}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 rounded-md px-5 py-3 text-white focus:outline-none focus:bg-gray-600"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700 rounded-md px-5 py-3 text-white focus:outline-none focus:bg-gray-600"
              />
              <button
                type="submit"
                className="bg-netflixRed py-3 text-white rounded-md w-full mt-6 hover:bg-red-700 transition"
              >
                {isSignIn ? 'Sign In' : 'Sign Up'}
              </button>
            </form>
            <p className="text-neutral-500 mt-12">
              {isSignIn ? 'New to Netflix? ' : 'Already have an account? '}
              <span
                className="text-white hover:underline cursor-pointer"
                onClick={() => setIsSignIn(!isSignIn)}
              >
                {isSignIn ? 'Create an account' : 'Sign in now'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;