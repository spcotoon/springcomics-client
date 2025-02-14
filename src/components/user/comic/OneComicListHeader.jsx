import React from "react";
import { useNavigate } from "react-router-dom";

const OneComicListHeader = ({ comics, maxNo }) => {
  const navigate = useNavigate();

  const handleArtistClick = (artistName) => {
    navigate(`/comics/artist/${artistName}`);
  };

  const handleFirstComicClick = () => {
    navigate(`/comics/${comics[0].headId}/1`, { state: { maxNo } });
  };

  return (
    <div className="comic-content-header">
      {comics.length > 0 ? (
        <>
          <div className="comic-thumbnail-container">
            <img
              src={comics[0].headThumbnail}
              alt="thumbnail"
              className="comic-thumbnail"
            />
          </div>
          <div className="comic-info-container">
            <div className="comic-title">
              {comics[0].headTitle}
              <span
                className="comic-artist"
                onClick={() => handleArtistClick(comics[0].artist)}
              >
                {comics[0].artist}
              </span>
            </div>
            <div className="comic-genre">{comics[0].genre}</div>
            <div className="comic-synopsis">{comics[0].headSynopsis}</div>
            <button
              className="first-comic-button"
              onClick={handleFirstComicClick}
            >
              첫화 보기
            </button>
          </div>
        </>
      ) : (
        <p>데이터를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default OneComicListHeader;
