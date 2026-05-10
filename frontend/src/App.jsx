import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateTrip from './pages/CreateTrip';
import TripList from './pages/TripList';
import ItineraryBuilder from './pages/ItineraryBuilder';

const ProtectedRoute = ({ children }) => {
  const token = useAuthStore(state => state.token);
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const token = useAuthStore(state => state.token);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {token && <Navbar />}
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
          <Routes>
            <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
            
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/trips" element={<ProtectedRoute><TripList /></ProtectedRoute>} />
            <Route path="/trips/new" element={<ProtectedRoute><CreateTrip /></ProtectedRoute>} />
            <Route path="/trips/:id/build" element={<ProtectedRoute><ItineraryBuilder /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
