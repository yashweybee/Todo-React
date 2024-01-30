import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setCurrnetState,
  setSearchText,
  setSortBy,
} from "../../utils/stateSlice";
import SearchTodo from "../SearchTodo/SearchTodo";
import "./header.css";
import { AccountSvg, SettingSvg } from "../../utils/svgs";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const currentPage = useSelector((store) => store?.state?.currentPage);
  const handelAllBtn = () => {
    dispatch(setCurrnetState("all"));
    // dispatch(setSearchText(""));

    // Notification.requestPermission();
    // new Notification("Hello", {
    //   body: "Notification Body",
    //   icon: "https://www.vkf-renzel.com/out/pictures/generated/product/1/356_356_75/r12044336-01/general-warning-sign-10836-1.jpg?    auto=compress&cs=tinysrgb&dpr=1&w=500",
    //   dir: "ltr",
    // });
  };
  const handelActiveBtn = () => {
    dispatch(setCurrnetState("active"));
  };

  const handelCompleted = () => {
    dispatch(setCurrnetState("completed"));
  };
  // console.log("Render header");

  const handleSortSelect = (e) => {
    // console.log(e.target.value);
    dispatch(setSortBy(e.target.value));
  };

  const toogleSortSelect = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="main-header">
      <div className="heading">
        <Link to="/">
          <h1>TO-DO</h1>
        </Link>
        <div className="left-icon icons">
          <SettingSvg />
        </div>
      </div>
      <SearchTodo />
      <div className="btn-container">
        <select
          name="sort by"
          className="btn drop-down"
          onChange={handleSortSelect}
          onClick={toogleSortSelect}
        >
          <option value="" defaultChecked>
            {!isOpen ? "Sort" : "None"}
          </option>
          <option value="Created/Modified">Created</option>
          <option value="Name">Name</option>
          <option value="Date">Date</option>
        </select>

        <button className="btn" onClick={handelAllBtn}>
          All
        </button>
        <button className="btn" onClick={handelActiveBtn}>
          Active
        </button>
        <button className="btn" onClick={handelCompleted}>
          Completed
        </button>
      </div>
    </div>
  );
};

export default Header;
