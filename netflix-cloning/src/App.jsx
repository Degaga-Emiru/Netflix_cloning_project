import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Browse from './pages/Browse.jsx';
import MovieDetails from './pages/MovieDetails.jsx';
import MyList from './pages/MyList.jsx';
import TVShows from './pages/TVShows.jsx';
import Search from './pages/Search.jsx';
import Auth from './pages/Auth.jsx';
import PrivateRoute from './components/Auth/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/browse" element={<PrivateRoute><Browse /></PrivateRoute>} />
        <Route path="/movie/:id" element={<PrivateRoute><MovieDetails /></PrivateRoute>} />
        <Route path="/tv/:id" element={<PrivateRoute><MovieDetails isTV /></PrivateRoute>} />
        <Route path="/mylist" element={<PrivateRoute><MyList /></PrivateRoute>} />
        <Route path="/tvshows" element={<PrivateRoute><TVShows /></PrivateRoute>} />
        <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;