import React, { useEffect, useRef, useState } from "react";
import Todo from "./Todo";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTodo, editTodoState } from "../utils/todoSlice";
import "../styles/todoList.css";

const TodoList = () => {
  const dispatch = useDispatch();
  const todoStoredata = useSelector((store) => store?.todo?.todo);
  const { currentState } = useSelector((store) => store?.state);
  const [todoData, setTodoData] = useState(todoStoredata);
  const [taskCompleted, setTaskCompleted] = useState(false);

  const setTodoDataOnStateChange = () => {
    if (currentState == "active") {
      const todoData = todoStoredata.filter(
        (todo) => todo.isCompleted === false
      );
      setTodoData(todoData);
    } else if (currentState == "all") {
      setTodoData(todoStoredata);
    } else if (currentState == "completed") {
      const todoData = todoStoredata.filter(
        (todo) => todo.isCompleted === true
      );
      setTodoData(todoData);
    }
  };

  useEffect(() => {
    setTodoDataOnStateChange();
  }, [taskCompleted, todoStoredata, currentState]);

  const handleDeleteTodo = (e) => {
    // e.stopPropagation();
    // console.log(e.target.value);
    dispatch(deleteTodo(e.target.value));
  };

  const handleCheckBox = (e) => {
    setTaskCompleted(!taskCompleted);

    dispatch(
      editTodoState({ id: e.target.value, taskCompleted: taskCompleted })
    );
  };

  //   console.log(todoStoredata);
  return (
    <div>
      {todoData.map((todo) => (
        <div key={todo.id} className="todoContainer">
          <input
            type="checkbox"
            onChange={handleCheckBox}
            value={todo.id}
            checked={todo.isCompleted}
          />
          <Link to={"/todo/" + todo.id}>
            <Todo name={todo.name} isCompleted={todo.isCompleted} />
          </Link>
          <button
            value={todo.id}
            onClick={handleDeleteTodo}
            className="deleteBtn"
          >
            delete
            {/* <DeleteSvg /> */}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
