import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

const ComicCard = forwardRef(({ comic }, ref) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/comics/${comic.id}`);
  };

  return (
    <div className="comic-card" onClick={handleClick} ref={ref}>
      <img
        src={comic.thumbnailUrl}
        alt={comic.title}
        className="comic-thumbnail-card"
      />
      <div className="comic-info">
        <div className="comic-title-name">{comic.title}</div>
        <div className="comic-artist-name">{comic.artist}</div>
      </div>
    </div>
  );
});

export default ComicCard;
