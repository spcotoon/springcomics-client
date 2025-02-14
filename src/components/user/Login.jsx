import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/userSlice";
import "./login.css";

const Login = () => {
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
        `${import.meta.env.VITE_API_URL}/user/login`,
        form,
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("로그인 성공!");

        const authResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/user-auth/auth`,
          {
            withCredentials: true,
          }
        );

        const { email, displayName, authority } = authResponse.data;
        dispatch(login({ email, displayName, authority }));

        navigate("/");
      }
    } catch (error) {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div className="login-input">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="이메일 입력"
          />
        </div>
        <div className="login-input">
          <label>Password:</label>
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
        <button type="submit" className="login-btn">
          로그인
        </button>
      </form>

      <div className="other-actions">
        <button onClick={() => navigate("/signup")} className="action-btn">
          회원가입
        </button>
        <button
          onClick={() => navigate("/artist/login")}
          className="action-btn"
        >
          작가 로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
