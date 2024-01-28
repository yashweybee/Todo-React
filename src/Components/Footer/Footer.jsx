import React from "react";
import {
  AccountNewSvg,
  CalenderSvg,
  ChatSvg,
  HomeSvg,
  PlusSvg,
} from "../../utils/svgs";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="left-foot secondary-foot">
        <HomeSvg />
        <CalenderSvg />
      </div>
      <div className="plus-container">
        <PlusSvg />
      </div>
      <div className="right-foot secondary-foot">
        <ChatSvg />
        <AccountNewSvg />
      </div>
    </div>
  );
};

export default Footer;
