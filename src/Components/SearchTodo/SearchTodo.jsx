import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchText } from "../../utils/stateSlice";
import { CrossSvg, SearchSvg } from "../../utils/svgs";
import "./searchTodo.css";
import { useSelector } from "react-redux";

const SearchTodo = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handeSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchText(text));
  };

  const handleCrossBtn = (e) => {
    e.preventDefault();
    setText("");
    dispatch(setSearchText(""));
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
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {text !== "" && (
          <button type="button" onClick={handleCrossBtn}>
            <CrossSvg />
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchTodo;
