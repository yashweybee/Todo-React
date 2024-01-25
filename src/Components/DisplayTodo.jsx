import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const DisplayTodo = () => {
  const { id } = useParams();
  const todoData = useSelector((store) => store?.todo?.todo);
  const currentTodo = todoData.filter((todo) => todo.id === id);

  return (
    <div>
      <Link to="/todo">Home</Link>
      <h1>{currentTodo[0].name}</h1>
      <p>{currentTodo[0].description}</p>
    </div>
  );
};

export default DisplayTodo;
