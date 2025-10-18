import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Offers } from './pages/Offers';
import { Requests } from './pages/Requests';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Messages } from './pages/Messages';
import { Booking } from './pages/Booking';
import { Payment } from './pages/Payment';
import { MatchingSystem } from './pages/Matching';
import { MapDemo } from './pages/MapDemo';
import { Reviews } from './pages/Reviews';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/preview_page.html" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/map" element={<MapDemo />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/messages" 
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/booking" 
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/payment" 
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/matching" 
            element={
              <ProtectedRoute>
                <MatchingSystem />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}