import React, { useState } from "react";
import { Link } from "react-router-dom";
import OnlyArtistList from "./OnlyArtistList";
import OnlyComicList from "./OnlyComicList";

const AdminArtistList = () => {
  const [activeButton, setActiveButton] = useState("작가목록");

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <div>
      <button
        onClick={() => handleButtonClick("작가목록")}
        disabled={activeButton === "작가목록"}
        style={{
          backgroundColor: activeButton === "작가목록" ? "#ddd" : "#4CAF50",
          color: "#fff",
          padding: "10px 20px",
          marginRight: "10px",
        }}
      >
        작가 목록
      </button>
      <button
        onClick={() => handleButtonClick("만화목록")}
        disabled={activeButton === "만화목록"}
        style={{
          backgroundColor: activeButton === "만화목록" ? "#ddd" : "#4CAF50",
          color: "#fff",
          padding: "10px 20px",
          marginRight: "10px",
        }}
      >
        만화 목록
      </button>

      <Link to="/sca/artist/signup">
        <button
          style={{
            backgroundColor: "#4CAF50",
            color: "#fff",
            padding: "10px 20px",
            marginLeft: "20px",
          }}
        >
          작가 등록
        </button>
      </Link>

      <div style={{ marginTop: "20px" }}>
        {activeButton === "작가목록" && <OnlyArtistList />}
        {activeButton === "만화목록" && <OnlyComicList />}
      </div>
    </div>
  );
};

export default AdminArtistList;
