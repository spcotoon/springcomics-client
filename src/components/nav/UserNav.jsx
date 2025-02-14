import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../redux/auth/userSlice";
import axios from "axios";
import "./userNav.css";
import { FaSearch } from "react-icons/fa";
import { persistor } from "../redux/store";

const UserNav = () => {
  const { displayName, isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/user/logout`,
        {},
        { withCredentials: true }
      );

      dispatch(logout());
      persistor.purge();
      navigate("/login");
    } catch (error) {}
  };

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
    if (!sideNavOpen) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const handleSearch = async () => {
    if (searchWord.trim() === "") {
      navigate("/comics"); 
      window.location.reload();
    } else {
      const formattedSearchWord = searchWord
        .trim()
        .replace(/\s+/g, "_"); 

      try {
        navigate(`/comics?search=${formattedSearchWord}`);
        window.location.reload(); 
      } catch (error) {}
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault(); 
    navigate("/"); 
    window.location.reload(); 
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <nav className="user-nav">
        <div className="nav-container">
          <div className="brand">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "brand-name active" : "brand-name"
              }
              onClick={handleLogoClick}
            >
              <span className="brand-text">스프링</span>
              <span className="brand-text">코믹스</span>
            </NavLink>
          </div>

          <NavLink
            to="/comics/portfolio"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
             <span className="portfolio-text">포폴</span>
             <span className="portfolio-text">전용관</span>
          </NavLink>

          <div className="search-bar">
            <input
              type="text"
              placeholder="작품명/작가 검색"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="search-button" onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>

          <div className="side-nav-button" onClick={toggleSideNav}>
            {sideNavOpen ? "" : ">"}
          </div>

          <div className="nav-links">
            {isLoggedIn ? (
              <>
                {displayName && (
                  <span className="user-name">👤 {displayName}</span>
                )}

                <button className="nav-link logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                로그인
              </NavLink>
            )}
          </div>
        </div>
      </nav>

      {sideNavOpen && <div className="overlay" onClick={toggleSideNav}></div>}

      {/* 사이드 네비게이션 */}
      <div className={`side-nav ${sideNavOpen ? "open" : ""}`}>
        <div className="brand">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "brand-name active" : "brand-name"
            }
            onClick={handleLogoClick}
          >
            스프링코믹스
          </NavLink>
        </div>

        <NavLink
          to="/portfolio"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          onClick={toggleSideNav}
        >
          포폴전용관
        </NavLink>

        {isLoggedIn && <span className="user-name">(👤 {displayName} )</span>}

        {isLoggedIn ? (
          <>
            <button
              className="nav-link logout-btn"
              onClick={() => {
                handleLogout();
                toggleSideNav();
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={toggleSideNav}
          >
            Login
          </NavLink>
        )}
      </div>
    </>
  );
};

export default UserNav;
