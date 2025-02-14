import React, { useEffect, useState } from "react";
import axios from "axios";

const PfComicHeadList = () => {
  const [comics, setComics] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [form, setForm] = useState({
    comicHeadId: "",
    genre: "",
  });

  const genres = ["판타지", "무협", "일상", "portfolio"];

  const fetchComics = async (page) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/manage/comicHead/list`,
        {
          params: { page },
          withCredentials: true,
        }
      );

      setComics(response.data.content);
      setTotalPages(response.data.page.totalPages);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeGenre = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/manage/comic/set-genre`,
        form,
        { withCredentials: true }
      );
      if (response.data === "success") {
        alert("장르가 변경되었습니다.");
        fetchComics(currentPage);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchComics(currentPage);
  }, [currentPage]);

  const handleSelectChange = (e, comicId, currentGenre) => {
    const selectedGenre = e.target.value;
    setForm({
      comicHeadId: comicId,
      genre: selectedGenre,
    });
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
                <th
                  style={{
                    border: "1px solid gray",
                    padding: "8px",
                    width: "40%",
                  }}
                >
                  제목
                </th>
                <th
                  style={{
                    border: "1px solid gray",
                    padding: "8px",
                    width: "40%",
                  }}
                >
                  장르
                </th>
                <th
                  style={{
                    border: "1px solid gray",
                    padding: "8px",
                    width: "20%",
                  }}
                >
                  장르 변경
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
                    {comic.genre}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <select
                        value={
                          form.comicHeadId === comic.id
                            ? form.genre
                            : comic.genre
                        }
                        onChange={(e) =>
                          handleSelectChange(e, comic.id, comic.genre)
                        }
                        style={{ padding: "4px 8px", marginRight: "8px" }}
                      >
                        {genres
                          .filter((genre) => genre !== comic.genre)
                          .map((genre) => (
                            <option key={genre} value={genre}>
                              {genre}
                            </option>
                          ))}
                      </select>
                      <button
                        onClick={handleChangeGenre}
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#4CAF50",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        변경
                      </button>
                    </div>
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

export default PfComicHeadList;
