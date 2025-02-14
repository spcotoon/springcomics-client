import React from "react";
import { useNavigate } from "react-router-dom";
import "./comicNav.css";

const ComicNav = ({ headId, no, maxNo }) => {
  const navigate = useNavigate();

  const handleNavigation = (offset) => {
    const newNo = parseInt(no) + offset;
    if (newNo >= 1 && newNo <= maxNo) {
      navigate(`/comics/${headId}/${newNo}`, { state: { maxNo } });
    }
  };

  return (
    <div className="comic-navigation">
      {maxNo !== undefined ? (
        <>
          <button
            className="comic-nav-btn"
            onClick={() => handleNavigation(-1)}
            disabled={parseInt(no) === 1}
          >
            이전화
          </button>
          <button
            className="comic-nav-btn"
            onClick={() => navigate(`/comics/${headId}`)}
          >
            목록으로
          </button>
          <button
            className="comic-nav-btn"
            onClick={() => handleNavigation(1)}
            disabled={parseInt(no) === maxNo}
          >
            다음화
          </button>
        </>
      ) : (
        <button
          className="nav-btn"
          onClick={() => navigate(`/comics/${headId}`)}
        >
          목록으로
        </button>
      )}
    </div>
  );
};

export default ComicNav;
