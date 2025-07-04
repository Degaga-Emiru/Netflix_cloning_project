import { useEffect } from 'react';
import Header from '../components/Header';
import Row from '../components/Row';
import ErrorBoundary from '../components/ErrorBoundary';


import { 
  fetchTrending,
  fetchNetflixOriginals,
  fetchTopRated,
  fetchActionMovies,
  fetchComedyMovies,
  fetchHorrorMovies,
  fetchRomanceMovies,
  fetchDocumentaries,
} from '../utils/api';
import Footer from '../components/Footer';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const Browse = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="relative min-h-screen bg-[#141414]">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-20 pb-10 px-4 md:px-16">
        {/* Hero Banner Row (Netflix Originals) */}
        <Row 
          title="Netflix Originals" 
          fetchUrl={fetchNetflixOriginals()} 
          isLargeRow 
        />

        {/* Other Rows */}
        <Row title="Trending Now" fetchUrl={fetchTrending()} />
        <Row title="Top Rated" fetchUrl={fetchTopRated()} />
        <Row title="Action Movies" fetchUrl={fetchActionMovies()} />
        <Row title="Comedy Movies" fetchUrl={fetchComedyMovies()} />
        <Row title="Horror Movies" fetchUrl={fetchHorrorMovies()} />
        <Row title="Romance Movies" fetchUrl={fetchRomanceMovies()} />
        <Row title="Documentaries" fetchUrl={fetchDocumentaries()} />
        /
<ErrorBoundary>
  <Row title="Trending Now" fetchUrl={fetchTrending()} />
</ErrorBoundary>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Browse;