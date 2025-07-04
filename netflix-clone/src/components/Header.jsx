// src/components/Header.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import netflixLogo from '../assets/netflix-logo.jpg';
import SearchBar from '../pages/SearchBar';

const Header = ({ onLoginClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    onLoginClick();
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black to-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4 md:px-12">
        {/* Left side - Logo and Links */}
        <div className="flex items-center space-x-8">
          <Link to="/">
            <img
              src={netflixLogo}
              alt="Netflix"
              className="h-8 md:h-10 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link to="/movies" className="text-white hover:text-gray-300">
              Movies
            </Link>
            <Link to="/tv-shows" className="text-white hover:text-gray-300">
              TV Shows
            </Link>
            <Link to="/my-list" className="text-white hover:text-gray-300">
              My List
            </Link>
          </nav>
        </div>

        {/* Right side - Search and User */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300"
              >
                Sign Out
              </button>
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded"
              />
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="hidden md:block text-white hover:text-gray-300"
            >
              Sign In
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-90 absolute top-16 left-0 right-0 px-4 py-2">
          <div className="mb-4">
            <SearchBar />
          </div>
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-white hover:text-gray-300"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/movies"
              className="text-white hover:text-gray-300"
              onClick={toggleMenu}
            >
              Movies
            </Link>
            <Link
              to="/tv-shows"
              className="text-white hover:text-gray-300"
              onClick={toggleMenu}
            >
              TV Shows
            </Link>
            <Link
              to="/my-list"
              className="text-white hover:text-gray-300"
              onClick={toggleMenu}
            >
              My List
            </Link>
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="text-white hover:text-gray-300 text-left"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="text-white hover:text-gray-300 text-left"
              >
                Sign In
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;