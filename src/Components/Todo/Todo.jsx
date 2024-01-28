import React from "react";
import "./todo.css";

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
        <p>&rarr;</p>
      </div>
    </div>
  );
};

export default Todo;
