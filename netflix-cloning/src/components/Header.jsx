import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { 
  BellIcon, 
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon 
} from '@heroicons/react/24/outline';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
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

  // Add to the toggleMenu and closeMenu functions
const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
  document.body.classList.toggle('menu-open');
};

const closeMenu = () => {
  setIsMenuOpen(false);
  document.body.classList.remove('menu-open');
};

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-[#141414] z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <XMarkIcon 
            className="h-8 w-8 text-white cursor-pointer" 
            onClick={closeMenu}
          />
        </div>
        <ul className="flex flex-col space-y-4 p-4">
          <li>
            <Link 
              to="/browse" 
              className="text-white hover:text-gray-300"
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/tvshows" 
              className="text-white hover:text-gray-300"
              onClick={closeMenu}
            >
              TV Shows
            </Link>
          </li>
          <li>
            <Link 
              to="/browse" 
              className="text-white hover:text-gray-300"
              onClick={closeMenu}
            >
              Movies
            </Link>
          </li>
          <li>
            <Link 
              to="/browse" 
              className="text-white hover:text-gray-300"
              onClick={closeMenu}
            >
              New & Popular
            </Link>
          </li>
          <li>
            <Link 
              to="/mylist" 
              className="text-white hover:text-gray-300"
              onClick={closeMenu}
            >
              My List
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Header */}
      <header className={`${isScrolled ? 'bg-[#141414]' : ''} fixed top-0 z-50 flex w-full items-center justify-between px-4 py-4 transition-all lg:px-10 lg:py-6`}>
        <div className="flex items-center space-x-2 md:space-x-10">
          {/* Hamburger Menu Button - Mobile Only */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMenu}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          <Link to="/browse">
            <img
              src="https://rb.gy/ulxxee"
              width={100}
              height={100}
              className="cursor-pointer object-contain"
              alt="Netflix"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden space-x-4 md:flex">
            <li className="headerLink">
              <Link to="/browse">Home</Link>
            </li>
            <li className="headerLink">
              <Link to="/tvshows">TV Shows</Link>
            </li>
            <li className="headerLink">
              <Link to="/browse">Movies</Link>
            </li>
            <li className="headerLink">
              <Link to="/browse">New & Popular</Link>
            </li>
            <li className="headerLink">
              <Link to="/mylist">My List</Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-4 text-sm font-light">
          <MagnifyingGlassIcon 
            className="hidden h-6 w-6 sm:inline cursor-pointer" 
            onClick={() => navigate('/search')}
          />
          <BellIcon className="h-6 w-6 cursor-pointer" />
          <div className="flex items-center space-x-1 cursor-pointer" onClick={logout}>
            <img
              src="https://rb.gy/g1pwyx"
              alt=""
              className="h-8 w-8 rounded"
            />
            <p className="hidden lg:inline">{user?.name}</p>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;