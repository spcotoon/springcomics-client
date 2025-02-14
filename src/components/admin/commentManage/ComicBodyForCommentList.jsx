import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ComicBodyForCommentList = () => {
  const [comicBodies, setComicBodies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const comicId = new URLSearchParams(location.search).get("comicHeadId");
  const fetchComicBodies = async (page = 0) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/admin/manage/comment/comic-list/${comicId}`,
        {
          params: { page },
          withCredentials: true,
        }
      );
      setComicBodies(response.data.content);
      setTotalPages(response.data.page.totalPages);
      setCurrentPage(response.data.page.number);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (comicId) {
      fetchComicBodies();
    }
  }, [comicId]);

  const handlePageClick = (page) => {
    if (page >= 0 && page < totalPages) {
      fetchComicBodies(page);
    }
  };

  const handleComicBodyClick = (comicBodyId) => {
    navigate(`/sca/comment/list?comicBodyId=${comicBodyId}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2
        style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "20px" }}
      >
        댓글 관리 - 회차 목록
      </h2>

      {isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #ddd",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  작품명
                </th>
                <th
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  댓글수
                </th>
              </tr>
            </thead>
            <tbody>
              {comicBodies.map((comicBody) => (
                <tr
                  key={comicBody.id}
                  onClick={() => handleComicBodyClick(comicBody.id)}
                  style={{ cursor: "pointer" }}
                >
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    {comicBody.title}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    {comicBody.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
                padding: "10px 20px",
                backgroundColor: "#f2f2f2",
                color: "#555",
                border: "1px solid #ddd",
                borderRadius: "4px",
                cursor: "pointer",
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
                  padding: "10px 20px",
                  backgroundColor:
                    currentPage === index ? "#007bff" : "#f2f2f2",
                  color: currentPage === index ? "white" : "#555",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              style={{
                padding: "10px 20px",
                backgroundColor: "#f2f2f2",
                color: "#555",
                border: "1px solid #ddd",
                borderRadius: "4px",
                cursor: "pointer",
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

export default ComicBodyForCommentList;
