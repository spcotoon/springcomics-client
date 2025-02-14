import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./comment.css";
import { useNavigate } from "react-router-dom";

const Comment = ({ comicBodyId }) => {
  const navigate = useNavigate();
  const [comment, setComment] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 
  const [commentList, setCommentList] = useState([]); 
  const [hasNext, setHasNext] = useState(true); 
  const page = useRef(0); 
  const MAX_COMMENT_LENGTH = 200;

  const handleCommentChange = (e) => {
    const inputText = e.target.value;

    if (inputText.length <= MAX_COMMENT_LENGTH) {
      setComment(inputText);
    } else {
      alert("최대 200자까지 입력 가능합니다.");
    }
  };

  const handleSubmitComment = async () => {
    if (!comment.trim()) {
      setError("댓글을 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/comment/${comicBodyId}`,
        { comment },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setComment("");
        setError(""); 
        page.current = 0; 
        fetchComments(true);
      }
    } catch (err) {
      if (err.response.status === 401 || err.response.data.code === "401") {
        alert("로그인이 필요합니다.");
        navigate("/login");
      }
      else if (err.response.status === 403) {
        alert("로그인이 필요합니다.");
        navigate("/login");
      }
      setError("댓글을 등록하는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (reset = false) => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/comment/${comicBodyId}?page=${
          page.current
        }`,
        { withCredentials: true }
      );

      setHasNext(!response.data.last);

      setCommentList((prevComments) => {
        if (reset) {
          return response.data.content;
        } else {
          return [...prevComments, ...response.data.content]; 
        }
      });

      if (!reset) {
   
        page.current += 1; 
      }
    } catch (err) {
      setError("댓글을 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (hasNext && !loading) {
      if (page.current === 0) {
        page.current += 1;
      }
      fetchComments(); 
    }
  };

  useEffect(() => {
    if (comicBodyId) {
      page.current = 0; 
      fetchComments(true); 
    }
  }, [comicBodyId]); 

  return (
    <div className="comment-box">
      <textarea
        value={comment}
        onChange={handleCommentChange}
        placeholder="댓글을 입력하세요"
        rows="4"
        cols="50"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        onClick={handleSubmitComment}
        disabled={loading}
        className="comment-btn"
      >
        {loading ? "등록 중..." : "댓글 등록"}
      </button>

      <div style={{ fontSize: "0.8em", color: "gray", marginTop: "5px" }}>
        {comment.length} / {MAX_COMMENT_LENGTH}자
      </div>

      <div className="comments-list">
        {commentList.map((commentData, index) => (
          <div className="comment-card" key={index}>
            <div className="comment-header">
              <strong>{commentData.postUserNickname}</strong>
              <span
                style={{ color: "gray", fontSize: "0.9em", marginLeft: "10px" }}
              >
                {new Date(commentData.postDate).toLocaleString()}
              </span>
            </div>
            <p>{commentData.comment}</p>
          </div>
        ))}

        {hasNext && (
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="comment-btn"
          >
            {loading ? "로딩 중..." : "더보기"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Comment;
