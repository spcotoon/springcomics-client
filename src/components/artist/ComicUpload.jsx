import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./comicApproval.css";

const ComicUpload = () => {
  const comicHeadId = useSelector((state) => state.comic.comicHeadId);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    authorComment: "",
    imageUrls: [],
    thumbnail: "",
  });
  const [files, setFiles] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleThumbnailChange = (e) => {
    setThumbnailFile(e.target.files[0]);
  };

  const getPresignedUrls = async (fileNames, endpoint, isThumbnail = false) => {
    try {
      const requestData = isThumbnail
        ? { thumbnail: fileNames[0] } // 섬네일 요청 시
        : { imageUrls: fileNames }; // 일반 이미지 요청 시

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        requestData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      alert("Presigned URL 요청 실패");
      return [];
    }
  };

  const uploadImagesToS3 = async (presignedUrls, files) => {
    try {
      if (typeof presignedUrls === "string") {
        await axios.put(presignedUrls, files[0], {
          headers: { "Content-Type": files[0].type },
        });
        return [presignedUrls.split("?")[0]];
      } else if (Array.isArray(presignedUrls)) {
        const uploadPromises = presignedUrls.map((url, index) =>
          axios.put(url, files[index], {
            headers: { "Content-Type": files[index].type },
          })
        );
        await Promise.all(uploadPromises);
        return presignedUrls.map((url) => url.split("?")[0]);
      } else {
        throw new Error("Invalid presigned URL format");
      }
    } catch (error) {
      alert("이미지 업로드 실패");
      return [];
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("이미지를 선택해주세요.");
      return;
    }
    const fileNames = files.map((file) => file.name);
    const presignedUrls = await getPresignedUrls(
      fileNames,
      "/artist/comic-body/presigned-url"
    );
    const uploadedUrls = await uploadImagesToS3(presignedUrls, files);

    if (uploadedUrls.length === files.length) {
      setForm((prevForm) => ({
        ...prevForm,
        imageUrls: uploadedUrls, // 기존 상태에 추가
      }));
      alert("이미지 업로드 성공!");
    }
  };

  const handleThumbnailUpload = async () => {
    if (!thumbnailFile) {
      alert("섬네일을 선택해주세요.");
      return;
    }
    const presignedUrls = await getPresignedUrls(
      [thumbnailFile.name],
      "/artist/comic-body/thumbnail/presigned-url",
      true
    );
    const uploadedUrls = await uploadImagesToS3(presignedUrls, [thumbnailFile]);

    if (uploadedUrls.length === 1) {
      setForm((prevForm) => ({
        ...prevForm,
        thumbnail: uploadedUrls[0], // 기존 상태 유지, 썸네일 추가
      }));
      alert("섬네일 업로드 성공!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.thumbnail || form.imageUrls.length === 0) {
      alert("제목, 이미지 및 섬네일을 모두 업로드해주세요.");
      return;
    }

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/artist/comic/${comicHeadId}/upload`,
        form,
        { withCredentials: true }
      )
      .then((response) => {
        alert("업로드 성공!");
        navigate("/artist/list");
      })
      .catch((error) => {
        alert("업로드 중 오류 발생!");
      });
  };

  return (
    <div className="container">
      <h2>연재작 업로드</h2>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div>
            <label>제목</label>
            <input
              type="text"
              name="title"
              placeholder="제목을 입력하세요"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>작가의 말</label>
            <textarea
              name="authorComment"
              placeholder="작가의 말을 입력하세요"
              value={form.authorComment}
              onChange={handleChange}
            />
          </div>

          <div className="file-upload">
            <label>섬네일 이미지</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
            />
            <button
              type="button"
              onClick={handleThumbnailUpload}
              className="upload-btn"
            >
              섬네일 업로드
            </button>
          </div>

          {form.thumbnail && (
            <div>
              <h4>업로드된 섬네일</h4>
              <img src={form.thumbnail} alt="섬네일 미리보기" width="150" />
            </div>
          )}

          <div className="file-upload">
            <label>이미지 업로드</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
            <button type="button" onClick={handleUpload} className="upload-btn">
              이미지 업로드
            </button>
          </div>

          {form.imageUrls.length > 0 && (
            <div>
              <h4>업로드된 이미지 미리보기</h4>
              {form.imageUrls.map((url, index) => (
                <img key={index} src={url} alt="미리보기" width="100" />
              ))}
            </div>
          )}

          <button type="submit">업로드</button>
        </form>
      </div>
    </div>
  );
};

export default ComicUpload;
