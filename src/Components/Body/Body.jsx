import React from "react";
import { Link } from "react-router-dom";
import { IllustrationImageSvg } from "../../utils/svgs";
import "../Body/body.css";

const Body = () => {
  return (
    <div className="body-container">
      <div className="hero-container">
        <IllustrationImageSvg />
      </div>
      <div className="content">
        <h1>Welcome</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi atqu
        </p>
      </div>
      <div className="btn">
        <Link to="/todo">Get Start</Link>
      </div>
    </div>
  );
};

export default Body;
