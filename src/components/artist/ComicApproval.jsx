import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./comicApproval.css";
import { persistor } from "../redux/store";

const ComicApproval = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    synopsis: "",
    genre: "장르 선택",
    thumbnailUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const getPresignedUrl = async (file) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/artist/comic-head/presigned-url`,
        {
          thumbnailUrl: file.name,
        },
        {
          withCredentials: true,
        }
      );

      const presignedUrl = response.data;

      const fileUrl = presignedUrl.split("?")[0];

      return { presignedUrl, fileUrl };
    } catch (error) {
      alert("Presigned URL 요청 실패");
      return {};
    }
  };

  const uploadImageToS3 = async (presignedUrl, file) => {
    try {
      await axios.put(presignedUrl, file, {
        headers: { "Content-Type": file.type },
      });
      return true;
    } catch (error) {
      alert("이미지 업로드 실패");
      return false;
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("이미지를 선택해주세요.");
      return;
    }

    const { presignedUrl, fileUrl } = await getPresignedUrl(file);

    const uploadSuccess = await uploadImageToS3(presignedUrl, file);
    if (uploadSuccess) {
      setForm({ ...form, thumbnailUrl: fileUrl });
      alert("이미지 업로드 성공!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.genre === "장르 선택") {
      alert("장르를 선택해주세요.");
      return;
    }

    axios
      .post(`${import.meta.env.VITE_API_URL}/artist/approval`, form, {
        withCredentials: true,
      })
      .then((response) => {
        alert("ComicHead 신청 완료!");
        navigate("/artist/list");
      })
      .catch((error) => {
        if (error.response) {
          const errorCode = error.response.data.code;
          if (errorCode === "401" || errorCode === "403") {
            alert("잘못된 접근입니다. 다시 로그인해주세요");
            persistor.purge();
            navigate("/artist/login");
            return;
          }
        }
        alert("신청 중 오류 발생!");
      });
  };

  return (
    <div className="container">
      <h2>신작 연재 신청</h2>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div>
            <label>제목</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>줄거리</label>
            <textarea
              name="synopsis"
              value={form.synopsis}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>장르</label>
            <select
              name="genre"
              value={form.genre}
              onChange={handleChange}
              required
            >
              <option value="장르 선택">장르 선택</option>
              <option value="판타지">판타지</option>
              <option value="무협">무협</option>
              <option value="일상">일상</option>
            </select>
          </div>

          <div className="file-upload">
            <label>썸네일 이미지</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            <button type="button" onClick={handleUpload} className="upload-btn">
              이미지 업로드
            </button>
          </div>

          <div>
            <input
              name="thumbnailUrl"
              value={form.thumbnailUrl}
              onChange={handleChange}
              type="hidden"
            />
          </div>

          {form.thumbnailUrl && (
            <div>
              <h3>썸네일 미리보기</h3>
              <img src={form.thumbnailUrl} alt="Thumbnail Preview" />
            </div>
          )}

          <button type="submit">신청</button>
        </form>
      </div>
    </div>
  );
};

export default ComicApproval;
