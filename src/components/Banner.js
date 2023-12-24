import React, { useState, useEffect } from "react";
import "../style/banner.css";

const Banner = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const imageUrl = "https://i.pinimg.com/564x/8f/2f/49/8f2f49d24cab49be7a00a88b7804733a.jpg";

  const parallaxStyle = {
    transform: `translateY(${scrollPosition * 0.5}px ) skewY(-3deg)`,
  };

  return (
    <div className="banner">
      <div className="parallax-container" style={parallaxStyle}>
        <img src={imageUrl} alt="Banner" className="banner-image" />
      </div>
      <div className="banner-text-container">
        <div className="banner-text">
          <h1>Ideas</h1>
          <p>where all our great things begin</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
