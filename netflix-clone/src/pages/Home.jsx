// src/pages/Home.jsx
import { useState } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Row from '../components/Row';
import TrendingCard from '../components/TrendingCard';
import FAQ from '../components/landing/FAQ';
import ReasonsToJoin from '../components//landing/ReasonsToJoin';
import Footer from '../components/landing/Footer';
import AuthModal from '../components/auth/AuthModal';

const Home = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-900">
      <Header onLoginClick={() => setShowAuthModal(true)} />
      <Banner />
      
      <div className="pb-16">
        {/* Trending Now Section with Cards */}
        <div className="px-4 md:px-12 mb-8">
          <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">
            Trending Now
          </h2>
          <div className="flex space-x-4 overflow-x-scroll scrollbar-hide pb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <TrendingCard
                key={item}
                item={{
                  id: item,
                  title: `Trending Movie ${item}`,
                  vote_average: Math.random() * 5 + 5,
                  release_date: '2023',
                  backdrop_path: `/trending-${item}.jpg`,
                }}
              />
            ))}
          </div>
        </div>

        <Row
          title="NETFLIX ORIGINALS"
          fetchUrl="/discover/tv?with_networks=213"
          isLargeRow
        />
        <Row title="Trending Now" fetchUrl="/trending/all/week" />
        <Row title="Top Rated" fetchUrl="/movie/top_rated" />
        <Row title="Action Movies" fetchUrl="/discover/movie?with_genres=28" />
        <Row title="Comedy Movies" fetchUrl="/discover/movie?with_genres=35" />
        <Row title="Horror Movies" fetchUrl="/discover/movie?with_genres=27" />
        <Row
          title="Romance Movies"
          fetchUrl="/discover/movie?with_genres=10749"
        />
        <Row title="Documentaries" fetchUrl="/discover/movie?with_genres=99" />
      </div>

      <ReasonsToJoin />
      <FAQ />
      <Footer />

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
};

export default Home;