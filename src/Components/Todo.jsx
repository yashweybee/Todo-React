import React from "react";

const Todo = ({ name, isCompleted }) => {
  return (
    <div>
      <h1>
        {name}
        {isCompleted ? "✔" : "❌"}
      </h1>
    </div>
  );
};

export default Todo;
