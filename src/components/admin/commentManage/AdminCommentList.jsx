import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AdminCommentList = () => {
  const location = useLocation();
  const comicBodyId = new URLSearchParams(location.search).get("comicBodyId");

  const [comments, setComments] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!comicBodyId) {
      return;
    }

    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/admin/manage/comment/comment-list/${comicBodyId}`,
          {
            params: { page: currentPage },
            withCredentials: true,
          }
        );

        if (response.data && response.data.content) {
          setComments(response.data.content || []);
          setTotalElements(response.data.page.totalElements);
          setTotalPages(response.data.page.totalPages);
        } else {
          throw new Error("댓글 데이터가 없습니다.");
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [comicBodyId, currentPage]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/manage/comment/${id}/delete`,
        { withCredentials: true }
      );
      setComments(comments.filter((comment) => comment.id !== id));
    } catch (error) {}
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>댓글을 불러오는 데 실패했습니다. 다시 시도해주세요.</div>;
  }

  return (
    <div>
      <h2>코믹 바디 ID: {comicBodyId}</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
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
              작성자
            </th>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              내용
            </th>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              작성일
            </th>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              삭제
            </th>
          </tr>
        </thead>
        <tbody>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <tr key={comment.id} style={{ backgroundColor: "#fff" }}>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {comment.writer}
                </td>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {comment.content}
                </td>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  {new Date(comment.createdDate).toLocaleDateString()}
                </td>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  <button
                    onClick={() => handleDelete(comment.id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                style={{
                  textAlign: "center",
                  padding: "10px",
                  border: "1px solid #ddd",
                }}
              >
                댓글이 없습니다.
              </td>
            </tr>
          )}
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
          onClick={() => handlePageChange(currentPage - 1)}
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
            onClick={() => handlePageChange(index)}
            style={{
              padding: "10px 16px",
              borderRadius: "5px",
              backgroundColor: currentPage === index ? "#007bff" : "#e0e0e0",
              color: currentPage === index ? "white" : "#333",
              fontWeight: currentPage === index ? "bold" : "normal",
            }}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
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
    </div>
  );
};

export default AdminCommentList;
