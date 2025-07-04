import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Browse from './pages/Browse';
import MovieDetails from './pages/MovieDetails';
import SearchResults from './pages/SearchResults';
import TVShows from './pages/TvShows';
import MyList from './pages/MyList';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes (Require Auth) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/browse" element={<Browse />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/tvshows" element={<TVShows />} />
            <Route path="/mylist" element={<MyList />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;