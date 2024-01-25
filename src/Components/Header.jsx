import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setCurrnetState } from "../utils/stateSlice";
import SearchTodo from "./SearchTodo";

const Header = () => {
  const dispatch = useDispatch();
  const handelAllBtn = () => {
    dispatch(setCurrnetState("all"));

    Notification.requestPermission();
    new Notification("Hello", {
      body: "Notification Body",
      icon: "https://www.vkf-renzel.com/out/pictures/generated/product/1/356_356_75/r12044336-01/general-warning-sign-10836-1.jpg?    auto=compress&cs=tinysrgb&dpr=1&w=500",
      dir: "ltr",
    });
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
      <SearchTodo />
      <button onClick={handelAllBtn}>All</button>
      <button onClick={handelActiveBtn}>Active</button>
      <button onClick={handelCompleted}>Completed</button>
    </div>
  );
};

export default Header;
