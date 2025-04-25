import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      signUp(email, password);
      navigate('/profiles');
    }
  };

  return (
    <div className="min-h-screen bg-netflix-black flex items-center justify-center p-4">
      <div className="bg-black/70 p-8 md:p-16 max-w-md w-full rounded-md">
        <h1 className="text-3xl font-bold mb-6">
          {step === 1 ? 'Create a password to start your membership' : 'Choose your plan.'}
        </h1>
        
        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-gray-700 rounded-md text-white"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  placeholder="Add a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 bg-gray-700 rounded-md text-white"
                  required
                />
              </div>
            </>
          ) : (
            <div className="mb-6 space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-md">
                <div>
                  <h3 className="font-bold">Basic</h3>
                  <p className="text-sm text-gray-400">Monthly price</p>
                </div>
                <span>$9.99</span>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-md">
                <div>
                  <h3 className="font-bold">Standard</h3>
                  <p className="text-sm text-gray-400">Monthly price</p>
                </div>
                <span>$15.49</span>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-600 rounded-md">
                <div>
                  <h3 className="font-bold">Premium</h3>
                  <p className="text-sm text-gray-400">Monthly price</p>
                </div>
                <span>$19.99</span>
              </div>
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-netflix-red text-white py-3 rounded-md font-semibold hover:bg-red-700 transition"
          >
            {step === 1 ? 'Next' : 'Continue'}
          </button>
        </form>
        
        <p className="mt-4 text-gray-400 text-sm">
          Already have an account?{' '}
          <button 
            onClick={() => navigate('/login')}
            className="text-white hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}