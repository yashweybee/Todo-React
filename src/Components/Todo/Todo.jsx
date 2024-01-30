import React from "react";
import "./todo.css";
import { RightVectorSvg } from "../../utils/svgs";

const Todo = ({ name, isCompleted, deadline, imgFile }) => {
  return (
    <>
      <div className="single-todo">
        <div className="todo-img">
          <img src={imgFile} alt="image" />
        </div>
        <div className="todo-content">
          <h1>{name}</h1>
          <span>{deadline}</span>
        </div>

        {/* <div className="aero">
          <RightVectorSvg />
        </div> */}
      </div>
    </>
  );
};

export default Todo;
