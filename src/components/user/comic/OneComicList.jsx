import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import OneComicCard from "./OneComicCard";
import OneComicListButton from "./OneComicListButton"; 
import OneComicListHeader from "./OneComicListHeader";
import "./oneComicList.css";

const OneComicList = () => {
  const { headId } = useParams();
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxNo, setMaxNo] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const comicHeadId = location.state?.comicHeadId;

  useEffect(() => {
    const fetchComics = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/springcomics/comics/${headId}?page=${currentPage}`
        );
        setComics(response.data.content);
        setTotalPages(response.data.page.totalPages);
        setMaxNo(response.data.page.totalElements);
      } catch (err) {
        setError("연재작품을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchComics();
  }, [comicHeadId, currentPage]);

  const handleTitleClick = (headId, no) => {
    navigate(`/comics/${headId}/${no}`, { state: { maxNo } });
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="comic-content-container">
      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <OneComicListHeader comics={comics} maxNo={maxNo} />

      <ul className="comic-content-list">
        {comics && comics.length > 0 ? (
          comics.map((comic, index) => (
            <OneComicCard
              key={index}
              comic={comic}
              onClick={() => handleTitleClick(comic.headId, comic.no)}
            />
          ))
        ) : (
          <p>연재작품이 없습니다.</p>
        )}
      </ul>

      <OneComicListButton
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default OneComicList;
