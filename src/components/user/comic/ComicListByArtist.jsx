import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ComicCard from "./ComicCard";
import "./allComicList.css";

const ComicListByArtist = () => {
  const { artistName } = useParams();

  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isFetchingRef = useRef(false);

  const fetchComics = async () => {
    if (loading || isFetchingRef.current) return;

    setLoading(true);
    isFetchingRef.current = true;

    try {
      const url = `${import.meta.env.VITE_API_URL}/springcomics/comics/artist/${artistName}`;
      const response = await axios.get(url, { withCredentials: true });

      setComics(response.data);
    } catch (err) {
      setError("연재작품을 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    fetchComics();
  }, [artistName]);

  return (
    <>
      {loading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="comic-list">
          {comics.length > 0 ? (
            comics.map((comic) => (
              <ComicCard key={comic.id} comic={comic} />
            ))
          ) : (
            <p>저장된 만화가 없습니다.</p>
          )}
        </div>
      )}
    </>
  );
};

export default ComicListByArtist;
