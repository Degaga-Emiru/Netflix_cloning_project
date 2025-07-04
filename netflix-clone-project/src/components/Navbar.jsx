import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
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

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-netflixBlack' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center justify-between px-4 py-2 md:px-12">
        <div className="flex items-center space-x-8">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="Netflix Logo"
              className="h-8 md:h-12"
            />
          </Link>
          
          {user && (
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-sm font-medium hover:text-gray-300">Home</Link>
              <Link to="/mylist" className="text-sm font-medium hover:text-gray-300">My List</Link>
            </nav>
          )}
        </div>

        {user ? (
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-gray-300">
              <MagnifyingGlassIcon className="h-6 w-6" onClick={() => navigate('/search')} />
            </button>
            <button className="text-white hover:text-gray-300">
              <BellIcon className="h-6 w-6" />
            </button>
            <div className="relative group">
              <img
                src="https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABY20DrC9-11ewwAs6nfEgb1vrORxRPP9IGmlW1WtKuaLIz8VxCx5NryzDK3_ez064IsBGdXjVUT59G5IRuFdqZlCJCneepU.png?r=229"
                alt="Profile"
                className="h-8 w-8 rounded"
              />
              <div className="absolute right-0 mt-2 w-48 bg-netflixGray rounded shadow-lg py-1 hidden group-hover:block">
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-netflixRed"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-1 text-white bg-netflixRed rounded hover:bg-red-700 transition"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;