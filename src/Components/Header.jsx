import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setCurrnetState } from "../utils/stateSlice";

const Header = () => {
  const dispatch = useDispatch();
  const handelAllBtn = () => {
    // dispatch(setCurrnetState("all"));
    console.log("all");
    Notification.requestPermission();
    new Notification("Hello");
  };
  const handelActiveBtn = () => {
    dispatch(setCurrnetState("active"));
  };

  const handelCompleted = () => {
    dispatch(setCurrnetState("completed"));
  };

  return (
    <div>
      <Link to="/todo/add">Add</Link>
      <button onClick={handelAllBtn}>All</button>
      <button onClick={handelActiveBtn}>Active</button>
      <button onClick={handelCompleted}>Completed</button>
    </div>
  );
};

export default Header;
