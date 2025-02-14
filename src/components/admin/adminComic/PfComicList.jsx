import React, { useState, useEffect } from "react";
import axios from "axios";

import "../../user/comic/allComicList.css";
import ComicCard from "../../user/comic/ComicCard";

const PfComicList = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchComics = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/springcomics/pf-comics`
      );
      setComics(response.data);
    } catch (err) {
      setError("연재작품을 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComics();
  }, []);

  return (
    <div className="comic-list">
      {loading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p>{error}</p>
      ) : comics.length > 0 ? (
        comics.map((comic) => <ComicCard key={comic.id} comic={comic} />)
      ) : (
        <p>저장된 만화가 없습니다.</p>
      )}
    </div>
  );
};

export default PfComicList;
