import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../redux/auth/userSlice";
import axios from "axios";

const RequireUserAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user-auth/auth`,
          {
            withCredentials: true,
          }
        );
        dispatch(
          login({
            email: response.data.email,
            displayName: response.data.displayName,
            authority: response.data.authority,
          })
        );
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          localStorage.removeItem("persist:user");
          alert("로그인이 필요합니다.");
          navigate("/user/login");
          dispatch(logout());
        }
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [dispatch, navigate]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return <Outlet />;
};

export default RequireUserAuth;
