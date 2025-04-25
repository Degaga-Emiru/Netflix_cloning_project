import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Landing from './pages/Landing';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import ProfileSelect from './pages/ProfileSelect';
import Browse from './pages/Browse';
import MovieDetails from './components/movie/MovieDetails';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profiles" element={<ProfileSelect />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;