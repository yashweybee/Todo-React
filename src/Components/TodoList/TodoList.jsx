import React, { useEffect, useState } from "react";
import Todo from "../Todo/Todo";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { editTodoState } from "../../utils/todoSlice";
import "./todoList.css";

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

  const handleCheckBox = (e) => {
    setTaskCompleted(!taskCompleted);

    dispatch(
      editTodoState({ id: e.target.value, taskCompleted: taskCompleted })
    );
  };

  //   console.log(todoStoredata);
  return (
    <>
      <Header />
      <div className="todo-list">
        {todoData.map((todo) => (
          <div key={todo.id} className="todoContainer">
            <label className="check-container">
              <input
                className="inp-checkbox"
                type="checkbox"
                onChange={handleCheckBox}
                value={todo.id}
                checked={todo.isCompleted}
              />
              <span className="checkmark"></span>
            </label>

            <Link className="todo-item" to={"/todo/" + todo.id}>
              <Todo
                name={todo.name}
                isCompleted={todo.isCompleted}
                deadline={todo.deadline}
              />
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default TodoList;
