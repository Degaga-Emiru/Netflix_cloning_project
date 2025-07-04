import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/browse');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-netflixBlack flex flex-col pt-20 px-4">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-4xl font-bold mb-8">Sign Up</h1>
        {error && <p className="text-netflixRed mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-gray-800 rounded text-white"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-gray-800 rounded text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-netflixRed text-white py-3 rounded font-bold"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-8 text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-white hover:underline">
            Sign in now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;