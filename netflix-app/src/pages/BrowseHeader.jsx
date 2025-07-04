import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NetflixLogo, SearchIcon, BellIcon } from '../components/Icons';
import ProfileMenu from '../components/ProfileMenu';

export default function BrowseHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-netflixBlack' : 'bg-gradient-to-b from-black to-transparent'}`}>
      <div className="flex items-center justify-between px-4 py-4 md:px-12">
        <div className="flex items-center space-x-8">
          <Link to="/" className="w-24 md:w-32">
            <NetflixLogo />
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/browse" className="text-white hover:text-gray-300">Home</Link>
            <Link to="/browse/tvshows" className="text-white hover:text-gray-300">TV Shows</Link>
            <Link to="/browse/movies" className="text-white hover:text-gray-300">Movies</Link>
            <Link to="/browse/mylist" className="text-white hover:text-gray-300">My List</Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="text-white hover:text-gray-300"
            >
              <SearchIcon className="h-6 w-6" />
            </button>
            {showSearch && (
              <div className="absolute right-0 mt-2 w-64 bg-black p-2 rounded">
                <input
                  type="text"
                  placeholder="Titles, people, genres"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full bg-netflixGray text-white px-3 py-1 rounded"
                />
              </div>
            )}
          </div>
          <button className="text-white hover:text-gray-300">
            <BellIcon className="h-6 w-6" />
          </button>
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}