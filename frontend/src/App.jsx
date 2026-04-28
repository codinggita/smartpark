import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard';
import MapPage from './pages/MapPage';
import BookingPage from './pages/BookingPage';
import ValetTrackingPage from './pages/ValetTrackingPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes for Admin */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Protected Routes for User */}
          <Route element={<ProtectedRoute allowedRoles={['user', 'guest']} />}>
            <Route path="/map" element={<MapPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/valet" element={<ValetTrackingPage />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
