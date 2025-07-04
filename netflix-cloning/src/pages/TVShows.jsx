import { useEffect } from 'react';
import Header from '../components/Header';
import Row from '../components/Row';
import { 
  fetchTrendingTV,
  fetchTopRatedTV,
  fetchPopularTV,
  fetchTVGenres
} from '../utils/api';
import Footer from '../components/Footer';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const TVShows = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) navigate('/auth');
  }, [isAuthenticated, navigate]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPopularTV();
        console.log(response.data); // Now properly returns TV data
        // setTVShows(response.data.results);
      } catch (error) {
        console.error("Error fetching popular TV:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#141414]">
      <Header />
      
      <main className="pt-20 pb-10 px-4 md:px-16">
        {/* Hero Row - Trending TV Shows */}
        <Row 
          title="Trending TV Shows" 
          fetchUrl={fetchTrendingTV()} 
          isLargeRow 
          mediaType="tv"
        />

        {/* Other TV Show Rows */}
        <Row title="Top Rated TV" fetchUrl={fetchTopRatedTV()} mediaType="tv" />
        <Row title="Popular TV" fetchUrl={fetchPopularTV()} mediaType="tv" />
        
        {/* Genre-based Rows */}
        <Row 
          title="Action & Adventure" 
          fetchUrl={fetchTVGenres('10759')} 
          mediaType="tv"
        />
        <Row 
          title="Comedy TV" 
          fetchUrl={fetchTVGenres('35')} 
          mediaType="tv"
        />
      </main>

      <Footer />
    </div>
  );
};

export default TVShows;