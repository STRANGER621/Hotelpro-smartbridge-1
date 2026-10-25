import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Rooms from './pages/Rooms.jsx';
import RoomDetails from './pages/RoomDetails.jsx';
import Login from './pages/Login.jsx';
import Bookings from './pages/Bookings.jsx';
import Admin from './pages/Admin.jsx';
import { useAuth } from './context/AuthContext.jsx';

function RequireAuth({ children, roles }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="page-state">Checking your session…</div>;
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}
export default function App() {
  return <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route element={<Layout/>}>
      <Route path="/" element={<Home/>}/>
      <Route path="/rooms" element={<Rooms/>}/>
      <Route path="/rooms/:id" element={<RoomDetails/>}/>
      <Route path="/bookings" element={<RequireAuth><Bookings/></RequireAuth>}/>
      <Route path="/admin" element={<RequireAuth roles={['admin','staff']}><Admin/></RequireAuth>}/>
      <Route path="*" element={<div className="page-state"><h1>Page not found</h1><a href="/">Return home</a></div>}/>
    </Route>
  </Routes>;
}
