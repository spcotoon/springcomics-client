import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { login, logout } from "../redux/auth/artistSlice";
import { Outlet } from "react-router-dom";

function RequireArtistAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/artist/auth`,
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
          localStorage.removeItem("persist:artist");
          alert("로그인이 필요합니다.");
          navigate("/artist/login");
        }

        dispatch(logout());
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
}

export default RequireArtistAuth;
