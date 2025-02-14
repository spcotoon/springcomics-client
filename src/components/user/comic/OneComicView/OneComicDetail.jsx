import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Comment from "./Comment"; 
import "./oneComicDetail.css";
import ComicNav from "../../../nav/ComicNav";

const OneComicDetail = () => {
  const location = useLocation();
  const maxNo = location.state?.maxNo;
  const { headId, no } = useParams();
  const navigate = useNavigate();

  const [comicDetails, setComicDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCommentOpen, setIsCommentOpen] = useState(false); 


  useEffect(() => {
    const disableRightClick = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);
    
    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  useEffect(() => {
    const fetchComicDetails = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/springcomics/get-one/${headId}/comics/${no}`,
          {
            withCredentials: true,
          }
        );
        setComicDetails(response.data);
      } catch (err) {
        if (err.response) {
          if (err.response.status === 401 || err.response.data.code === "401") {
            navigate("/login");
          }
          else if (err.response.status === 403) {
            alert("로그인이 필요합니다.");
            navigate("/login");
          }
        }
        setError("연재작품 상세 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchComicDetails();
  }, [headId, no]); 

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <>
      <ComicNav headId={headId} no={no} maxNo={maxNo} />

      <div className="onecomic-item">
        {comicDetails && (
          <>
            {comicDetails.imageUrls && comicDetails.imageUrls.length > 0 ? (
              <div>
                {comicDetails.imageUrls.map((url, index) => (
                  <img key={index} src={url} alt={`comic-image-${index}`} />
                ))}
              </div>
            ) : (
              <p>이미지가 없습니다.</p>
            )}
          </>
        )}
      </div>

      {comicDetails.authorComment && (
        <div className="author-comment">
          <h3>작가의 말</h3>
          <p>{comicDetails.authorComment}</p>
        </div>
      )}

      <div className="comment-button-div">
        <button
          className="comment-btn"
          onClick={() => setIsCommentOpen(!isCommentOpen)}
        >
          {isCommentOpen ? "댓글창 닫기" : "댓글창 펼치기"}
        </button>
      </div>

      {isCommentOpen && (
        <Comment comicBodyId={comicDetails.id} /> // 댓글 컴포넌트로 headId와 no 전달
      )}
    </>
  );
};

export default OneComicDetail;
