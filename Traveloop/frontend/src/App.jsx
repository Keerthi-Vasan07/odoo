import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import DashboardLayout from './layouts/DashboardLayout';
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
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trips" element={<TripList />} />
          <Route path="/trips/new" element={<CreateTrip />} />
          <Route path="/trips/:id/build" element={<ItineraryBuilder />} />
          <Route path="/community" element={<div className="p-8 text-white">Community Page (Coming Soon)</div>} />
          <Route path="/budget" element={<div className="p-8 text-white">Budget Page (Coming Soon)</div>} />
          <Route path="/profile" element={<div className="p-8 text-white">Profile Page (Coming Soon)</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
