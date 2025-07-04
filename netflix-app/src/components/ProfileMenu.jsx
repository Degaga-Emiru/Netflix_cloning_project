import React, { useState } from 'react';
import { useAuth } from './components/AuthContext';
import { ChevronDownIcon, CogIcon, LogoutIcon, UserIcon } from './components/Icons';
import { signOut } from 'firebase/auth';
import { auth } from './services/firebase';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const menuItems = [
    {
      icon: <UserIcon className="w-5 h-5" />,
      label: 'Profile',
      onClick: () => navigate('/profile')
    },
    {
      icon: <CogIcon className="w-5 h-5" />,
      label: 'Settings',
      onClick: () => navigate('/settings')
    },
    {
      icon: <LogoutIcon className="w-5 h-5" />,
      label: 'Sign Out',
      onClick: handleSignOut
    }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="w-8 h-8 rounded bg-netflixRed flex items-center justify-center text-white">
          {user?.email?.charAt(0).toUpperCase()}
        </div>
        <ChevronDownIcon className={`w-4 h-4 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-netflixBlack rounded-md shadow-lg py-1 z-50 border border-gray-700">
          <div className="px-4 py-2 border-b border-gray-700">
            <p className="text-sm text-white">{user?.email}</p>
          </div>
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 hover:text-white"
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;