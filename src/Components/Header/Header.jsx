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
import Progress from "../Progress/Progress";
import { TodoSvg } from "../../utils/svgs";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const currentState = useSelector((store) => store?.state?.currentState);
  const handelAllBtn = () => {
    dispatch(setCurrnetState("all"));
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
          <TodoSvg />
        </Link>
        {/* <div className="left-icon icons">
          <SettingSvg />
        </div> */}
      </div>
      <div className="search-div">
        <SearchTodo />
      </div>
      <div className="btn-container">
        <div className="select-sortby">
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
        </div>

        <div className="all-btns">
          <button
            className="btn"
            onClick={handelAllBtn}
            style={{
              backgroundColor: currentState === "all" ? "#4cc0ee" : "#1464c7",
            }}
          >
            All
          </button>
          <button
            className="btn"
            onClick={handelActiveBtn}
            style={{
              backgroundColor:
                currentState === "active" ? "#4cc0ee" : "#1464c7",
            }}
          >
            Active
          </button>
          <button
            className="btn"
            onClick={handelCompleted}
            style={{
              backgroundColor:
                currentState === "completed" ? "#4cc0ee" : "#1464c7",
            }}
          >
            Completed
          </button>
        </div>
      </div>
      <div className="progress-container">
        <Progress />
      </div>
    </div>
  );
};

export default Header;
