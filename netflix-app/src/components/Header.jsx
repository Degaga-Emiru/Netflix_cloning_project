import React from 'react';
import { Link } from 'react-router-dom';
import { NetflixLogo } from '../components/Icons';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-6 md:px-12">
      <Link to="/" className="w-32 md:w-40">
        <NetflixLogo />
      </Link>
      <div className="flex space-x-4">
        <select className="bg-black text-white px-2 py-1 border border-gray-600 rounded">
          <option>English</option>
          <option>हिन्दी</option>
        </select>
        <Link 
          to="/login" 
          className="bg-netflixRed text-white px-4 py-1 rounded-md font-medium"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}