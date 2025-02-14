import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: "", pw: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/auth/login`,
        form,
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate("/sca/main");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data.code === "400") {
          setError("아이디 또는 비밀번호가 올바르지 않습니다.");
        } else {
          setError("로그인 중 오류가 발생했습니다.");
        }
      } else {
        setError("서버와 연결할 수 없습니다.");
      }
    }
  };

  return (
    <div
      style={{ maxWidth: "300px", margin: "50px auto", textAlign: "center" }}
    >
      <h2>관리자 로그인</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          placeholder="아이디"
          value={form.id}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          type="password"
          name="pw"
          placeholder="비밀번호"
          value={form.pw}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          로그인
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
};

export default AdminLogin;
