import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative h-screen bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_large.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold max-w-2xl mb-4">
          Unlimited movies, TV shows and more
        </h1>
        <p className="text-xl md:text-2xl mb-8">Watch anywhere. Cancel anytime.</p>
        <p className="text-lg md:text-xl mb-8">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-xl">
          <input 
            type="email" 
            placeholder="Email address" 
            className="flex-grow px-4 py-3 bg-black bg-opacity-70 border border-gray-600 rounded"
          />
          <Link 
            to="/signup" 
            className="bg-netflixRed text-white px-6 py-3 rounded-md font-medium text-xl flex items-center justify-center"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}