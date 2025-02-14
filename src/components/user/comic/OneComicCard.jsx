import React from "react";
import { useNavigate } from "react-router-dom";

const OneComicCard = ({ comic, onClick }) => {
  const navigate = useNavigate();

  return (
    <li className="comic-content-item" onClick={() => onClick(comic.id)}>
      <div className="comic-link">
        <div className="thumbnail-area">
          <img src={comic.thumbnail} alt={`${comic.title} thumbnail`} />
        </div>
        <div className="info-area">
          <p className="comic-title">{comic.title}</p>
          <div className="meta-info">
            <span className="episode-rating"> ⭐ 9.77</span>
            <span className="upload-date">
              {new Date(comic.uploadDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};
export default OneComicCard;
