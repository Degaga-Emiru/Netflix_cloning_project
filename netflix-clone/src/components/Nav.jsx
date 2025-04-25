import { useState, useEffect } from 'react';
import { FaBell, FaSearch, FaBars, FaTimes, FaUserAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Nav = () => {
  const [showBackground, setShowBackground] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {  logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav className={`fixed top-0 w-full p-4 z-50 transition-all duration-500 ${showBackground ? 'bg-netflix-black' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
              alt="Netflix Logo" 
              className="h-8"
            />
            <div className="hidden md:flex space-x-6">
              <a href="#" className="text-white hover:text-gray-300">Home</a>
              <a href="#" className="text-white hover:text-gray-300">TV Shows</a>
              <a href="#" className="text-white hover:text-gray-300">Movies</a>
              <a href="#" className="text-white hover:text-gray-300">New & Popular</a>
              <a href="#" className="text-white hover:text-gray-300">My List</a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowSearch(true)}
              className="text-white hover:text-gray-300"
            >
              <FaSearch className="h-5 w-5" />
            </button>
            <a href="#" className="text-white hover:text-gray-300 hidden md:block">
              <FaBell className="h-5 w-5" />
            </a>
            <div className="relative group">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-8 h-8 rounded-md bg-netflix-red flex items-center justify-center">
                  <FaUserAlt className="text-white text-sm" />
                </div>
                <button 
  onClick={toggleMobileMenu}
  className="p-1 md:hidden"
  aria-label="Toggle menu"
>
  {mobileMenuOpen ? (
    <FaTimes className="h-5 w-5 text-white" />
  ) : (
    <FaBars className="h-5 w-5 text-white" />
  )}
</button>
              </div>
              <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-md py-1 hidden md:block group-hover:block">
                <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-800">Account</a>
                <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-800">Help Center</a>
                <button 
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800"
                >
                  Sign out of Netflix
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-netflix-black absolute top-16 left-0 right-0 p-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-white hover:text-gray-300">Home</a>
              <a href="#" className="text-white hover:text-gray-300">TV Shows</a>
              <a href="#" className="text-white hover:text-gray-300">Movies</a>
              <a href="#" className="text-white hover:text-gray-300">New & Popular</a>
              <a href="#" className="text-white hover:text-gray-300">My List</a>
              <div className="pt-4 border-t border-gray-800">
                <a href="#" className="block py-2 text-white hover:text-gray-300">Account</a>
                <a href="#" className="block py-2 text-white hover:text-gray-300">Help Center</a>
                <button 
                  onClick={logout}
                  className="block w-full text-left py-2 text-white hover:text-gray-300"
                >
                  Sign out of Netflix
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
    </>
  );
};

export default Nav;