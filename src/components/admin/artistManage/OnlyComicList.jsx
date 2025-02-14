import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/admin/manage/comicHead/list`;

const OnlyComicList = () => {
  const [comics, setComics] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComics = async (page) => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL, {
        params: { page },
        withCredentials: true,
      });

      setComics(response.data.content);
      setTotalPages(response.data.page.totalPages);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComics(currentPage);
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/manage/comicHead/${id}/delete`,
        { withCredentials: true }
      );
      fetchComics(currentPage);
    } catch (error) {}
  };

  return (
    <div
      style={{
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h2
        style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}
      >
        만화 목록
      </h2>

      {isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid gray",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#ddd" }}>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  제목
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  작가
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  작가 이메일
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  연재 횟수
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  연재 시작일
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  최신 연재일
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  삭제
                </th>
              </tr>
            </thead>
            <tbody>
              {comics.map((comic) => (
                <tr key={comic.id} style={{ textAlign: "center" }}>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {comic.title}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {comic.artistPenName}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {comic.artistEmail}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {comic.amount}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {new Date(comic.createdDate).toLocaleDateString()}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {comic.lastUploadDate
                      ? new Date(comic.lastUploadDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    <button
                      onClick={() => handleDelete(comic.id)}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            style={{
              marginTop: "16px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
              style={{
                padding: "6px 12px",
                backgroundColor: "#ccc",
                borderRadius: "4px",
                margin: "0 4px",
                border: "none",
                cursor: "pointer",
              }}
            >
              &lt;
            </button>

            {Array.from({ length: Math.min(totalPages, 10) }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                style={{
                  padding: "6px 12px",
                  margin: "0 4px",
                  backgroundColor: currentPage === index ? "green" : "#ddd",
                  color: currentPage === index ? "white" : "black",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              style={{
                padding: "6px 12px",
                backgroundColor: "#ccc",
                borderRadius: "4px",
                margin: "0 4px",
                border: "none",
                cursor: "pointer",
              }}
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OnlyComicList;
