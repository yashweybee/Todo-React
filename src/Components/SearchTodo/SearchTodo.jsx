import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchText } from "../../utils/stateSlice";
import { SearchSvg } from "../../utils/svgs";
import "./searchTodo.css";

const SearchTodo = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const handeSubmit = (e) => {
    e.preventDefault();
    // console.log(text);
    dispatch(setSearchText(text));
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handeSubmit}>
        <span>
          <SearchSvg />
        </span>
        <input
          className="inp-box"
          placeholder="Search.."
          type="text"
          onChange={(e) => setText(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchTodo;
