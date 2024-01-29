import React from "react";
import {
  AccountNewSvg,
  CalenderSvg,
  ChatSvg,
  HomeSvg,
  PlusSvg,
} from "../../utils/svgs";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="left-foot secondary-foot">
        <HomeSvg />
        <CalenderSvg />
      </div>
      <Link to="/todo/add">
        <div className="plus-container">
          <PlusSvg />
        </div>
      </Link>
      <div className="right-foot secondary-foot">
        <ChatSvg />
        <AccountNewSvg />
      </div>
    </div>
  );
};

export default Footer;
