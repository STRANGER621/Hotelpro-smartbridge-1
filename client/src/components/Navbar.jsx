import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Hotel, Menu, X, UserRound, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const close = () => setOpen(false);
  return <header className="navbar">
    <div className="nav-inner container">
      <Link to="/" className="brand" onClick={close}><span className="brand-icon"><Hotel size={20}/></span><span>hotelpro<span className="brand-dot">.</span></span></Link>
      <button className="mobile-menu" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      <nav className={open ? 'nav-links open' : 'nav-links'}>
        <NavLink to="/rooms" onClick={close}>Stay</NavLink>
        <a href="/#experience" onClick={close}>Experience</a>
        <a href="/#about" onClick={close}>About</a>
        {user ? <>
          <NavLink to="/bookings" onClick={close}>My bookings</NavLink>
          {(user.role === 'admin' || user.role === 'staff') && <NavLink to="/admin" onClick={close}>Dashboard</NavLink>}
          <span className="nav-user"><UserRound size={15}/>{user.name.split(' ')[0]}</span>
          <button className="btn btn-small btn-outline" onClick={() => { logout(); close(); navigate('/'); }}><LogOut size={15}/> Sign out</button>
        </> : <Link to="/login" onClick={close} className="btn btn-small btn-dark">Sign in <span>↗</span></Link>}
      </nav>
    </div>
  </header>;
}
