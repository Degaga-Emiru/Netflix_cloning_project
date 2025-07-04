import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { XIcon, MenuIcon } from './Icons';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(true)}>
        <MenuIcon className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 p-4">
          <div className="flex justify-end mb-8">
            <button onClick={() => setIsOpen(false)}>
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col space-y-6 text-xl">
            <Link to="/browse" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/browse/tvshows" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>TV Shows</Link>
            <Link to="/browse/movies" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Movies</Link>
            <Link to="/browse/mylist" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>My List</Link>
          </nav>
        </div>
      )}
    </div>
  );
}