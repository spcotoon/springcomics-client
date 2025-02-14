import React from "react";

const OneComicListButton = ({ currentPage, totalPages, handlePageChange }) => {
  const pageGroupSize = 5; 
  const startPage = Math.floor(currentPage / pageGroupSize) * pageGroupSize;
  const endPage = Math.min(startPage + pageGroupSize, totalPages);

  const buttons = [];

  if (startPage > 0)
    buttons.push(
      <button
        key="previous-group"
        onClick={() => handlePageChange(startPage - 1)}
      >
        {"<"}
      </button>
    );

  for (let i = startPage; i < endPage; i++) {
    buttons.push(
      <button
        key={i} 
        onClick={() => handlePageChange(i)}
        disabled={i === currentPage}
        className={i === currentPage ? "active" : ""}
      >
        {i + 1}
      </button>
    );
  }

  if (endPage < totalPages)
    buttons.push(
      <button key="next-group" onClick={() => handlePageChange(endPage)}>
        {">"}
      </button>
    );

  return <div className="comic-pagination">{buttons}</div>;
};

export default OneComicListButton;
