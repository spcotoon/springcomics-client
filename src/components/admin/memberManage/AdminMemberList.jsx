import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminMemberList = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMembers = async (page) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/manage/member`,
        {
          params: { page },
          withCredentials: true,
        }
      );
      setMembers(response.data.content);
      setTotalPages(response.data.page.totalPages);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/manage/member/${id}/delete`,
        {
          withCredentials: true,
        }
      );
      fetchMembers(currentPage);
    } catch (error) {}
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>회원 관리</h1>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>이메일</th>
                <th>닉네임</th>
                <th>가입일</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {members.map((data) => (
                <tr key={data.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td>{data.email}</td>
                  <td>{data.nickName}</td>
                  <td>{new Date(data.createdDate).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(data.id)}
                      style={{
                        backgroundColor: "#f44336",
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
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: "20px" }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              style={{ padding: "5px 10px", marginRight: "10px" }}
            >
              &lt;
            </button>

            {Array.from({ length: Math.min(totalPages, 10) }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index)}
                style={{
                  padding: "5px 10px",
                  marginRight: "5px",
                  backgroundColor:
                    currentPage === index ? "#4CAF50" : "#f0f0f0",
                  border: "none",
                  color: currentPage === index ? "white" : "black",
                }}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              style={{ padding: "5px 10px", marginLeft: "10px" }}
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminMemberList;
