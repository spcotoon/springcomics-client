import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ArtistComicList.css";

const ArtistComicList = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/artist/comic-list`,
          { withCredentials: true }
        );
        setComics(response.data);
      } catch (err) {
        setError("연재작품을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchComics();
  }, []);

  return (
    <div className="comic-list-container">
      <button className="upload-button" onClick={() => navigate("/artist/approval")}>
        연재 신청
      </button>

      {loading && <p className="loading">로딩 중...</p>}
      {error && <p className="error">{error}</p>}

      <div className="comic-grid">
        {comics.length > 0 ? (
          comics.map((comic, index) => (
            <div
              key={index}
              className="comic-card"
              onClick={() => navigate(`/artist/${comic.id}`)}
            >
              <img src={comic.thumbnailUrl} alt={comic.title} className="comic-thumbnail" />
              <div className="comic-info">
                <h3 className="comic-title">{comic.title}</h3>
                <p className="comic-genre">장르: {comic.genre}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-comics">연재작품이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ArtistComicList;
