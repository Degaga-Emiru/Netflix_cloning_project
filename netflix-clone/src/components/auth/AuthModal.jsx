// src/components/Auth/AuthModal.jsx
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative bg-gray-900 rounded-md w-full max-w-md mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </h2>

          {isLogin ? (
            <LoginForm onSuccess={onClose} />
          ) : (
            <SignupForm onSuccess={onClose} />
          )}

          <div className="mt-4 text-gray-400">
            {isLogin ? (
              <p>
                New to Netflix?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-white hover:underline"
                >
                  Sign up now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-white hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;