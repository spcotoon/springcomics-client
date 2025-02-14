import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminNav = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/auth/logout`,
        {},
        { withCredentials: true }
      );

      navigate("/");
    } catch (error) {}
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#333",
        height: "60px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "0 20px",
      }}
    >
      <div
        onClick={() => navigate("/sca/main")}
        style={{
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        스프링코믹스 마스터
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => navigate("/sca/member")} style={buttonStyle}>
          회원 관리
        </button>
        <button onClick={() => navigate("/sca/comment")} style={buttonStyle}>
          댓글 관리
        </button>
        <button onClick={() => navigate("/sca/artist")} style={buttonStyle}>
          작가 관리
        </button>
        <button onClick={() => navigate("/sca/comics")} style={buttonStyle}>
          연재 작품
        </button>
        <button
          onClick={handleLogout}
          style={{
            ...buttonStyle,
            backgroundColor: "#f44336",
            color: "white",
          }}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

// 공통 스타일 정의
const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  fontWeight: "bold",
  display: "inline-block",
};

const buttonHoverStyle = {
  backgroundColor: "#45a049",
};

export default AdminNav;
