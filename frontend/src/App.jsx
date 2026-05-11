import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Dashboard
import Dashboard from './pages/Main_Landing_page_screen_3';

// Trips
import CreateTrip from './pages/Create_a_new_trip_screen_4';
import BuildItinerary from './pages/Build_Itenary_screen_5';
import TripList from './pages/User_Trip_Listing_screen_6';
import ActivityPage from './pages/activity_page_screen_8';
import ItineraryView from './pages/itenary_view_screen_9';

// User
import ProfilePage from './pages/userprofilepage_screen_7';

// Community
import CommunityFeed from './pages/community_tab_screen_10';

// Utilities
import PackingChecklist from './pages/packing_checklist_screen_11';
import TravelNotes from './pages/travel_notes_screen_13';
import ExpenseInvoice from './pages/expense_invoice_screen_14';

// Admin
import AdminPanel from './pages/admin_panel_screen_12';

// Explore / Regional
import ExplorePage from './pages/ExplorePage';
import DestinationsPage from './pages/DestinationsPage';
import NotificationsPage from './pages/NotificationsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Core Routes — no auth gate for demo */}
        <Route path="/"          element={<Dashboard />} />
        <Route path="/profile"   element={<ProfilePage />} />
        <Route path="/explore"   element={<ExplorePage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/admin"     element={<AdminPanel />} />

        {/* Trip Routes */}
        <Route path="/trips"                   element={<TripList />} />
        <Route path="/trips/new"               element={<CreateTrip />} />
        <Route path="/trips/:id/build"         element={<BuildItinerary />} />
        <Route path="/trips/:id/activities"    element={<ActivityPage />} />
        <Route path="/trips/:id/view"          element={<ItineraryView />} />
        <Route path="/trips/:id/checklist"     element={<PackingChecklist />} />
        <Route path="/trips/:id/notes"         element={<TravelNotes />} />
        <Route path="/trips/:id/invoice"       element={<ExpenseInvoice />} />

        {/* Community Routes */}
        <Route path="/community"         element={<CommunityFeed />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;