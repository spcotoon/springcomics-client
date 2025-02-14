import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/artistSlice";
import "./artistLogin.css";

const ArtistLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/artist/login`,
        form,
        { withCredentials: true }
      );

      alert("로그인 성공!");

      const authResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/artist/auth`,
        {
          withCredentials: true,
        }
      );

      const { email, displayName, authority } = authResponse.data;
      dispatch(login({ email, displayName, authority }));

      navigate("/artist");
    } catch (error) {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="artist-login-container">
      <h2>작가 로그인</h2>
      <form onSubmit={handleLogin}>
        <div className="artist-login-input">
          <label>Email:</label>
          <br />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="이메일 입력"
          />
        </div>
        <div className="artist-login-input">
          <label>Password:</label>
          <br />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="비밀번호 입력"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="artist-login-btn">
          로그인
        </button>
      </form>

      <button onClick={() => navigate("/login")} className="action-btn">
        일반유저 로그인
      </button>
    </div>
  );
};

export default ArtistLogin;
