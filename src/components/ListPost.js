import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/listpost.css";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

const ListPost = () => {
  const apiUrl = "https://suitmedia-backend.suitdev.com/api/ideas";
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("published_at");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          params: {
            "page[number]": currentPage,
            "page[size]": pageSize,
            append: ["small_image", "medium_image"],
            sort: sortBy,
          },
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (Array.isArray(response.data.data)) {
          setPosts(response.data.data);
        } else {
          console.error("Invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [apiUrl, currentPage, pageSize, sortBy]);

  const [totalPosts, setTotalPosts] = useState(0);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePageSizeChange = (pageSize) => {
    setPageSize(pageSize);
    setCurrentPage(1);
  };

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
    setCurrentPage(1);
  };

  return (
    <div className="container mt-4">
      <div className="row mt-3">
        <div className="col">
          <p className="showing-info">
            Showing {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalPosts)} of {totalPosts}
          </p>
        </div>
        <div className="col d-flex align-items-center justify-content-end">
          <label className="me-4 text-nowrap">Show Per Page:</label>
          <select className="form-select me-4 custom-select-style" value={pageSize} onChange={(e) => handlePageSizeChange(e.target.value)}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>

          <label className="me-4 text-nowrap">Sort By:</label>
          <select className="form-select  custom-select-style" value={sortBy} onChange={(e) => handleSortChange(e.target.value)}>
            <option value="published_at">Terbaru</option>
            <option value="-published_at">Terlama</option>
          </select>
        </div>
      </div>
      <div className="row mt-4">
        {posts.map((post) => (
          <div key={post.id} className="col-md-4 mb-4">
            <div className="card">
              {post.attributes && post.attributes.small_image ? (
                <img src={post.attributes.small_image} data-src={post.attributes.medium_image} className="card-img-top lazyload" alt={post.attributes.title} />
              ) : (
                <div className="card-img-top placeholder-image"></div>
              )}
              <div className="card-body">
                <p className="card-text">{post.attributes ? new Date(post.attributes.published_at).toLocaleDateString() : ""}</p>
                <h5
                  className="card-title"
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    WebkitLineClamp: 3,
                  }}
                >
                  {post.attributes ? post.attributes.title : ""}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row mt-4 mb-4">
        <div className="col-md-12 d-flex justify-content-center align-items-center">
          <label className="btn" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
            {"<<"}
          </label>
          <label className="btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            {"<"}
          </label>

          {[...Array(pageSize)].map((_, index) => (
            <span key={index} className={`mx-2 btn ${currentPage === currentPage + index ? "active-page btn-tomato" : ""}`} style={{ cursor: "pointer" }} onClick={() => handlePageChange(currentPage + index)}>
              {currentPage + index}
            </span>
          ))}

          <label className="btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(totalPosts / pageSize)}>
            {">"}
          </label>
          <label className="btn" onClick={() => handlePageChange(currentPage + Math.min(pageSize, Math.ceil(totalPosts / pageSize)))} disabled={currentPage + pageSize - 1 >= Math.ceil(totalPosts / pageSize)}>
            {">>"}
          </label>
        </div>
      </div>
    </div>
  );
};

export default ListPost;
