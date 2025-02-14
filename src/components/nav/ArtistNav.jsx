import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../redux/auth/artistSlice';
import axios from 'axios';
import './artistNav.css';

const ArtistNav = () => {
  const { displayName, isLoggedIn } = useSelector((state) => state.artist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sideNavOpen, setSideNavOpen] = useState(false); 

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('overlay')) {
      setSideNavOpen(false);
    }
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.style.overflow = 'hidden'; 
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.body.style.overflow = 'auto';
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [sideNavOpen]);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/artist/logout`, {}, { withCredentials: true });
      dispatch(logout()); 
      persistor.purge();
      navigate('/artist/login'); 
    } catch (error) {
    
    }
  };

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen); 
  };

  return (
    <>
      {sideNavOpen && <div className="overlay" onClick={handleOutsideClick}></div>}

      <nav className="artist-nav">
        <div className="nav-container">
          <div className="brand">
            <NavLink to="/artist" className={({ isActive }) => (isActive ? 'brand-name active' : 'brand-name')}>
              스프링코믹스 작가
            </NavLink>
          </div>

          <div className="side-nav-button" onClick={toggleSideNav}>
            {sideNavOpen ? '' : '>'} 
          </div>

          <div className="nav-links">
            {displayName && isLoggedIn && <span className="user-name">(🖼️{displayName} 님)</span>}

            <NavLink to="/artist/list" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              연재작품
            </NavLink>

            {isLoggedIn ? (
              <>
                <NavLink to="/artist/my-page" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                  My Page
                </NavLink>
                <button className="nav-link logout-btn" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <NavLink to="/artist/login" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Login
              </NavLink>
            )}
          </div>
        </div>
      </nav>

      <div className={`side-nav ${sideNavOpen ? 'open' : ''}`}>
        {displayName && isLoggedIn && <span className="user-name">(🖼️{displayName} 님)</span>}

        <NavLink to="/artist/list" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={toggleSideNav}>
          연재작품
        </NavLink>

        {isLoggedIn ? (
          <>
            <NavLink to="/artist/my-page" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={toggleSideNav}>
              My Page
            </NavLink>
            <button className="nav-link logout-btn" onClick={() => { handleLogout(); toggleSideNav(); }}>Logout</button>
          </>
        ) : (
          <NavLink to="/artist/login" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={toggleSideNav}>
            Login
          </NavLink>
        )}
      </div>
    </>
  );
};

export default ArtistNav;
