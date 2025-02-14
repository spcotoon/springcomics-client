import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    penName: "",
    selfIntroduction: "",
  });
  const [error, setError] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordTouched(true);
    handleChange(e);
  };

  useEffect(() => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordMatch) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/manage/artist/signup`,
        {
          email: formData.email,
          password: formData.password,
          penName: formData.penName,
          selfIntroduction: formData.selfIntroduction,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate("/sca/artist");
      }
    } catch (err) {
      setError("Something went wrong. Please try again!");
      if (err.response) {
        setError(err.response.data.message || "Something went wrong!");
      }
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "500px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        Signup
      </h2>
      {error && (
        <p style={{ color: "red", fontSize: "12px", textAlign: "center" }}>
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div
          style={{
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontSize: "14px",
              color: "#333",
              marginRight: "10px",
            }}
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="아이디 입력"
            style={{
              width: "50%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxSizing: "border-box",
              marginRight: "10px",
            }}
          />
          <span>{import.meta.env.VITE_EMAIL_DOMAIN}</span>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontSize: "14px",
              color: "#333",
            }}
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handlePasswordChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontSize: "14px",
              color: "#333",
            }}
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
          {passwordTouched && !passwordMatch && (
            <p
              style={{
                color: "red",
                fontSize: "12px",
                marginTop: "5px",
                textAlign: "center",
              }}
            >
              Passwords do not match!
            </p>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontSize: "14px",
              color: "#333",
            }}
          >
            Pen Name
          </label>
          <input
            type="text"
            name="penName"
            value={formData.penName}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontSize: "14px",
              color: "#333",
            }}
          >
            Self Introduction
          </label>
          <textarea
            name="selfIntroduction"
            value={formData.selfIntroduction}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!passwordMatch}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
