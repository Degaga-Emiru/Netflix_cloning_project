import Header from '../components/Header';
import Banner from '../components/Banner';
import Row from '../components/Row';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import {
  fetchTrending,
  fetchTopRated,
  fetchActionMovies,
  fetchComedyMovies,
  fetchHorrorMovies,
  fetchRomanceMovies,
  fetchDocumentaries,
} from '../utils/api';

const Home = () => {
  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511]">
      <Header />
      <Banner />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Row title="Trending Now" fetchUrl={fetchTrending()} />
        <Row title="Top Rated" fetchUrl={fetchTopRated()} />
        <Row title="Action Movies" fetchUrl={fetchActionMovies()} />
        <Row title="Comedy Movies" fetchUrl={fetchComedyMovies()} />
        <Row title="Horror Movies" fetchUrl={fetchHorrorMovies()} />
        <Row title="Romance Movies" fetchUrl={fetchRomanceMovies()} />
        <Row title="Documentaries" fetchUrl={fetchDocumentaries()} />
      </main>
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;