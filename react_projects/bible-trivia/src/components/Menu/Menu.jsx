import React from "react";
import healthlogo from "../../assets/logo/bible_trivia.png";
import ImageTextSlider from "./ImageTextSlider";

import "../styles/menu.css";

const Menu = () => {
  return (
    <nav className="menu-container">
      <div className="menu-left-container menu-item">
        <a href="/"><img src={healthlogo} alt="Health Logo" /></a>
        <div style={{ marginLeft: "10px" }}>
          <a
            href="/"
            style={{
              padding: "10px 20px",
              margin: "5px",
              cursor: "pointer",
              textDecoration: 'none',
              color: 'white'
            }}
          >
            Bible Trivia
          </a>
        </div>
        <ul
          style={{
            listStyleType: "none",
            display: "flex",
            gap: "20px",
            margin: 0,
          }}
        ></ul>
      </div>
      <div className="menu-center-container menu-item">
        {/* <TextSlider/> */}
        <ImageTextSlider />
      </div>
      <div className="menu-right-container menu-item">
        <ul
          style={{
            listStyleType: "none",
            display: "flex",
            gap: "20px",
            margin: 0,
          }}
        >
          {/* <li>
            <Link
              to="/quiz"
              style={{ color: "#fff", textDecoration: "none" }}
            >
             Practice Quiz
            </Link>
          </li> */}
          {/* <li>
            <Link
              to="/settings"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Chapter
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Number of Questions
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
