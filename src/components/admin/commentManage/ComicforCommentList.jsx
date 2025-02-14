import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ComicforCommentList = () => {
  const navigate = useNavigate();
  const [comics, setComics] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComics = async (page = 0) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/manage/comicHead/list`,
        {
          params: { page },
          withCredentials: true,
        }
      );
      setComics(response.data.content);
      setTotalPages(response.data.page.totalPages);
      setCurrentPage(page);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComics();
  }, []);

  const handlePageClick = (page) => {
    fetchComics(page);
  };

  const handleComicClick = (comicId) => {
    navigate(`/sca/comment/comic?comicHeadId=${comicId}`);
  };

  return (
    <div style={{ padding: "16px" }}>
      <h2
        style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}
      >
        댓글 관리 - 작품 목록
      </h2>

      {isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #ccc",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f0f0f0" }}>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  작품명
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  작가명
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  연재수
                </th>
              </tr>
            </thead>
            <tbody>
              {comics.map((comic) => (
                <tr
                  key={comic.id}
                  style={{
                    cursor: "pointer",
                    textAlign: "center",
                    backgroundColor: "#fff",
                    hover: { backgroundColor: "#f9f9f9" },
                  }}
                  onClick={() => handleComicClick(comic.id)}
                >
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {comic.title}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {comic.artistPenName}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {comic.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 페이징 버튼 */}
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <button
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 0}
              style={{
                padding: "10px 16px",
                backgroundColor: "#ccc",
                color: "#333",
                borderRadius: "5px",
                opacity: currentPage === 0 ? 0.5 : 1,
              }}
            >
              이전
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(index)}
                style={{
                  padding: "10px 16px",
                  borderRadius: "5px",
                  backgroundColor:
                    currentPage === index ? "#007bff" : "#e0e0e0",
                  color: currentPage === index ? "white" : "#333",
                  fontWeight: currentPage === index ? "bold" : "normal",
                }}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              style={{
                padding: "10px 16px",
                backgroundColor: "#ccc",
                color: "#333",
                borderRadius: "5px",
                opacity: currentPage === totalPages - 1 ? 0.5 : 1,
              }}
            >
              다음
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ComicforCommentList;
