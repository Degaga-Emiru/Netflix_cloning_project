import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Landing from './pages/Landing';
import SignupForm from './components/auth/SignupForm';
import LoginForm from './components/auth/LoginForm';
import ProfileSelect from './pages/ProfileSelect';
import Browse from './pages/Browse';
import TvShows from './pages/TvShows';
import Movies from './pages/Movies';
import NewPopular from './pages/NewPopular';
import MyList from './pages/MyList';
import MovieDetails from './components/movie/MovieDetails';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profiles" element={<ProfileSelect />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/tv-shows" element={<TvShows />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/new-popular" element={<NewPopular />} />
          <Route path="/my-list" element={<MyList />} />
          <Route path="/search" element={<SearchResults />} />

          <Route path="/movie/:id" element={<MovieDetails />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;