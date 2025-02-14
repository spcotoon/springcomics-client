import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/admin/manage/artist`;

const OnlyArtistList = () => {
  const [artists, setArtists] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchArtists = async (page) => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL, {
        params: { page },
        withCredentials: true,
      });

      setArtists(response.data.content);
      setTotalPages(response.data.page.totalPages);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArtists(currentPage);
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await axios.delete(`${API_URL}/${id}/delete`, { withCredentials: true });
      fetchArtists(currentPage);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data);
      } else {
      }
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h2
        style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}
      >
        아티스트 목록
      </h2>

      {isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <>
          <table
            style={{
              width: "80%",
              borderCollapse: "collapse",
              border: "1px solid #ccc",
              textAlign: "center",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f4f4f4" }}>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                  이메일
                </th>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                  작가명
                </th>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                  가입일
                </th>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                  작품수
                </th>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                  삭제
                </th>
              </tr>
            </thead>
            <tbody>
              {artists.map((artist) => (
                <tr key={artist.id}>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                    {artist.email}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                    {artist.penName}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                    {new Date(artist.createdDate).toLocaleDateString()}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                    {artist.seriesAmount}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                    <button
                      onClick={() => handleDelete(artist.id)}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: "5px 10px",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "5px",
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
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
              style={{
                padding: "8px 12px",
                backgroundColor: "#ddd",
                border: "none",
                cursor: "pointer",
                margin: "0 5px",
                borderRadius: "5px",
              }}
            >
              &lt;
            </button>

            {Array.from({ length: Math.min(totalPages, 10) }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                style={{
                  padding: "8px 12px",
                  margin: "0 5px",
                  backgroundColor: currentPage === index ? "green" : "#eee",
                  color: currentPage === index ? "white" : "black",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              style={{
                padding: "8px 12px",
                backgroundColor: "#ddd",
                border: "none",
                cursor: "pointer",
                margin: "0 5px",
                borderRadius: "5px",
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

export default OnlyArtistList;
