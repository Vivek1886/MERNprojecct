import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Briefcase, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="container" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Briefcase className="gradient-text" style={{ stroke: 'url(#gradient)', width: '24px', height: '24px' }} />
        <svg width="0" height="0">
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop stopColor="#a78bfa" offset="0%" />
            <stop stopColor="#38bdf8" offset="100%" />
          </linearGradient>
        </svg>
        <h1 className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Resume AI</h1>
      </Link>
      <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {user ? (
          <>
            <Link 
              to="/dashboard" 
              className="btn btn-outline" 
              style={{ textDecoration: 'none' }}
              onClick={(e) => {
                if (window.location.pathname === '/dashboard') {
                  e.preventDefault();
                  window.location.reload();
                }
              }}
            >
              Dashboard
            </Link>
            <button onClick={handleLogout} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
              <LogOut size={18} style={{ marginRight: '0.5rem' }} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline" style={{ textDecoration: 'none' }}>Login</Link>
            <Link to="/register" className="btn btn-primary" style={{ textDecoration: 'none' }}>Sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
