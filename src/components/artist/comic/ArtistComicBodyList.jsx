import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setComicHeadId, setComicBodyId } from "../../redux/comic/comicSlice";
import "./comic.css";

const ArtistComicOne = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const [comicDetails, setComicDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComicDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/artist/comic/${id}`,
          { withCredentials: true }
        );
        setComicDetails(response.data);
      } catch (err) {
        setError("연재작품 상세 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchComicDetails();
  }, [id]);

  const handleUploadClick = () => {
    dispatch(setComicHeadId(id));
    navigate(`/artist/upload`);
  };

  const handleTitleClick = (comicId) => {
    localStorage.setItem("comicBodyId", comicId);
    dispatch(setComicBodyId(comicId));
    navigate(`/artist/content/${comicId}`);
  };

  return (
    <div className="comic-container">
      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleUploadClick} className="upload-btn">
        회차 업로드
      </button>

      <div className="comic-header">
        {comicDetails.length > 0 && (
          <>
            <div className="thumbnail-container">
              <img
                src={comicDetails[0].headThumbnail}
                alt="thumbnail"
                className="thumbnail"
              />
            </div>
            <div className="info-container">
              <div className="title">
                {comicDetails[0].headTitle}{" "}
                <span className="artist"> / {comicDetails[0].artist}</span>
              </div>
              <div className="genre">{comicDetails[0].genre}</div>
              <div className="synopsis">{comicDetails[0].headSynopsis}</div>
            </div>
          </>
        )}
    
      </div>

      <ul className="comic-list">
        {comicDetails && comicDetails.length > 0 ? (
          comicDetails.map((comic, index) => (
            <li key={index} className="comic-item">
              <div
                className="comic-link"
                onClick={() => handleTitleClick(comic.id)}
              >
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
          ))
        ) : (
          <p>등록된 회차가 없습니다</p>
        )}
      </ul>
    </div>
  );
};

export default ArtistComicOne;
