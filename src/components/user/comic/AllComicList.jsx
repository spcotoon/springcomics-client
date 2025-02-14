import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ComicCard from "./ComicCard";
import "./allComicList.css";

const AllComicList = () => {
  const { artistName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search).get("search");

  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const page = useRef(0);
  const observer = useRef(null);
  const isFetchingRef = useRef(false);

  const fetchComics = async () => {
    if (loading || !hasMore || isFetchingRef.current) return;

    isFetchingRef.current = true;
    setLoading(true);

    try {
      let url = `${import.meta.env.VITE_API_URL}/springcomics/comics?page=${
        page.current
      }`;

      if (artistName) {
        url = `${
          import.meta.env.VITE_API_URL
        }/springcomics/comics/artist/${artistName}`;
      } else if (searchQuery && searchQuery.trim() !== "") {
        const formattedSearchQuery = searchQuery.replace(/_/g, " ");
        url += `&search=${formattedSearchQuery}`;
      }
      const response = await axios.get(url, { withCredentials: true });

      setComics((prev) =>
        page.current === 0
          ? response.data.content
          : [...prev, ...response.data.content]
      );
      setHasMore(!response.data.last);
    } catch (err) {
      setError("연재작품을 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    setComics([]);
    page.current = 0;
    setHasMore(true);
    fetchComics();
  }, [searchQuery]);

  const lastComicElementRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isFetchingRef.current) {
          page.current += 1;
          fetchComics();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;

    if (searchValue.trim() === "") {
      navigate("/comics");
    } else {
      const formattedSearchValue = searchValue.replace(/\s+/g, "_");
      navigate(`/comics?search=${formattedSearchValue}`);
    }
  };

  return (
    <>
      {loading && page.current === 0 ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="comic-list">
          {comics.length > 0 ? (
            comics.map((comic, index) => {
              if (index === comics.length - 1) {
                return (
                  <ComicCard
                    ref={lastComicElementRef}
                    key={comic.id}
                    comic={comic}
                  />
                );
              } else {
                return <ComicCard key={comic.id} comic={comic} />;
              }
            })
          ) : (
            <p>저장된 만화가 없습니다.</p>
          )}
        </div>
      )}
      {loading && page.current > 0 && <p>추가 로딩 중...</p>}
    </>
  );
};

export default AllComicList;
