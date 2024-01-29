import React from "react";
import "./todo.css";
import { RightVectorSvg } from "../../utils/svgs";

const Todo = ({ name, isCompleted, deadline }) => {
  return (
    <div className="single-todo">
      <div className="todo-content">
        <h1>
          {name}
          {/* {isCompleted ? '✔' : '❌'} */}
        </h1>
        <p>{deadline}</p>
      </div>
      <div className="aero">
        <RightVectorSvg />
      </div>
    </div>
  );
};

export default Todo;
