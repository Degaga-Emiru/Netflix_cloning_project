import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  return (
    <div className="relative h-screen bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_large.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/50" />
      
      <header className="relative z-10 p-4">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
          alt="Netflix" 
          className="h-12"
        />
      </header>

      <div className="relative z-10 flex flex-col items-center justify-center h-[70vh] px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Unlimited movies, TV shows and more
        </h1>
        <p className="text-xl md:text-2xl mb-6">
          Watch anywhere. Cancel anytime.
        </p>
        <p className="text-lg md:text-xl mb-8">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        
        <div className="flex flex-col md:flex-row w-full max-w-2xl gap-2">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow p-4 bg-black/70 border border-gray-600 rounded-md"
          />
          <button 
            onClick={() => navigate('/signup')}
            className="bg-netflix-red text-white py-4 px-6 text-xl rounded-md font-semibold hover:bg-red-700 transition"
          >
            Get Started &gt;
          </button>
        </div>
      </div>
    </div>
  );
}