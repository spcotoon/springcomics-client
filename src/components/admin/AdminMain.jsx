import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/manage/auth`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
        }
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/sca/login");
        }
      }
    };

    checkAdminAuth();
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <button
        onClick={() => navigate("/sca/member")}
        style={{ width: "200px", height: "60px", fontSize: "16px" }}
      >
        회원 관리
      </button>
      <button
        onClick={() => navigate("/sca/comment")}
        style={{ width: "200px", height: "60px", fontSize: "16px" }}
      >
        댓글 관리
      </button>
      <button
        onClick={() => navigate("/sca/artist")}
        style={{ width: "200px", height: "60px", fontSize: "16px" }}
      >
        작가 관리
      </button>
      <button
        onClick={() => navigate("/sca/comics")}
        style={{ width: "200px", height: "60px", fontSize: "16px" }}
      >
        연재 작품
      </button>
    </div>
  );
};

export default AdminPage;
