import { FaEnvelope, FaCheckCircle } from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(true);
  const [error, setError] = useState("");

  const [emailVerificationError, setEmailVerificationError] = useState("");
  const [otpVerificationError, setOtpVerificationError] = useState("");
  const [nicknameError, setNicknameError] = useState("");

  const [emailSuccessMessage, setEmailSuccessMessage] = useState("");
  const [nicknameSuccessMessage, setNicknameSuccessMessage] = useState("");

  const [emailValid, setEmailValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsOtpSent(false);
    setIsOtpVerified(false);
    setOtp("");
    setEmailSuccessMessage("");
    setEmailVerificationError("");
  };

  const handleEmailVerification = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailVerificationError("유효한 이메일을 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/check-email`,
        { email }
      );
      setIsOtpSent(true);
      setEmailSuccessMessage("인증코드가 발송되었습니다.");
      setError("");
      setEmailVerificationError("");
    } catch (err) {
      setEmailVerificationError(
        err.response?.data.message || "이메일 인증 요청 실패"
      );
      setEmailSuccessMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/check-otp`,
        { email, otp }
      );
      setIsOtpVerified(true);
      setOtpVerificationError("");
      setEmailSuccessMessage(response.data);
    } catch (err) {
      setOtpVerificationError(err.response?.data.message || "인증 실패");
    }
  };

  const handleNicknameCheck = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/check-nickname`,
        { nickname }
      );

      setIsNicknameAvailable(true);
      setNicknameSuccessMessage(response.data);
      setNicknameError("");
    } catch (err) {
      const errorResponse = err.response?.data;

      if (errorResponse?.validation) {
        setIsNicknameAvailable(false);
        setNicknameError(errorResponse.validation[0]?.errorMessage);
      } else {
        setNicknameError(err.response.data);
      }
      setNicknameSuccessMessage("");
    }
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, {
        email,
        password,
        nickname,
      });
      alert("회원가입 성공!");
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.validation?.[0]?.errorMessage ||
          err.response?.data?.message ||
          "회원가입 실패"
      );
    }
  };

  const passwordMatch = password === confirmPassword;
  const passwordValid = password.length >= 8;

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <div className="input-group">
        <input
          type="email"
          placeholder="이메일 입력"
          value={email}
          onChange={handleEmailChange}
          className="signup-input"
        />
        <button
          onClick={handleEmailVerification}
          disabled={isOtpSent || isLoading}
          className="signup-button button-inside-input"
        >
          <FaEnvelope className="mr-2" /> 인증 요청
        </button>
      </div>
      {isLoading && <p>메일을 발송중입니다. 잠시만 기다려주세요...</p>}{" "}
      {/* 로딩 메시지 */}
      {emailVerificationError && (
        <p className="error-message">{emailVerificationError}</p>
      )}
      {emailSuccessMessage && (
        <p className="success-message">{emailSuccessMessage}</p>
      )}
      {isOtpSent && !isOtpVerified && (
        <div className="input-group">
          <input
            type="text"
            placeholder="인증코드 입력"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="signup-input"
          />
          <button
            onClick={handleOtpVerification}
            disabled={isOtpVerified}
            className="signup-button button-inside-input"
          >
            <FaCheckCircle className="mr-2" /> 확인
          </button>
        </div>
      )}
      {otpVerificationError && (
        <p className="error-message">{otpVerificationError}</p>
      )}
      <div className="input-group">
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signup-input"
        />
      </div>
      <div className="input-group">
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="signup-input"
        />
        <p className={passwordMatch ? "success-message" : "error-message"}>
          {passwordMatch ? "" : "비밀번호가 일치하지 않습니다."}
        </p>
        {password.length > 0 && password.length < 8 && (
          <p className="error-message">비밀번호는 8자 이상이어야 합니다.</p>
        )}
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder="닉네임 입력"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="signup-input"
        />
        <button
          onClick={handleNicknameCheck}
          className="signup-button button-inside-input"
        >
          <FaCheckCircle className="mr-2" /> 확인
        </button>
      </div>
      {nicknameError && <p className="error-message">{nicknameError}</p>}
      {nicknameSuccessMessage && isNicknameAvailable && (
        <p className="success-message">{nicknameSuccessMessage}</p>
      )}
      <div className="signup-button-container">
        <button
          onClick={handleSignup}
          disabled={
            !isNicknameAvailable ||
            !isOtpVerified ||
            !passwordMatch ||
            !passwordValid
          }
          className="submit-button"
        >
          회원가입
        </button>
        <button className="cancel-button" onClick={() => navigate("login")}>
          취소
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Signup;
