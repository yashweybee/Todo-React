import React, { useEffect, useId, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch } from "react-redux";
import { addTodo } from "../../utils/todoSlice";
import { useLocation, useNavigate } from "react-router";
import checkValidation from "../../utils/validation";
import "../AddTodo/addTodo.css";
import { setCurrnetPage } from "../../utils/stateSlice";
import { Link } from "react-router-dom";

const AddTodo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);
  const taskId = useId();
  const [taskDate, setTaskDate] = useState(new Date());
  const [priority, setPriority] = useState("High");
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [notifyTime, setNotifyTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    dispatch(setCurrnetPage("AddTodoPage"));
  }, []);

  const handleRadioBtn = (e) => {
    setPriority(e.target.value);
  };

  const handleCalanderValue = (e) => {
    // console.log(e.target.value);
    setTaskDate(e.target.value);
  };

  const handleTaskAdd = (e) => {
    e.preventDefault();
    const message = checkValidation(name, desc);

    setErrorMessage(message);

    if (message) return;
    console.log(notifyTime);

    // dispatch(
    //   addTodo({
    //     id: taskId,
    //     name: name,
    //     description: desc,
    //     isCompleted: false,
    //     priority: priority,
    //     deadline: taskDate,
    //     notificationTime: notifyTime,
    //   })
    // );
    navigate("/todo");

    console.log({
      id: taskId,
      name: name,
      description: desc,
      isCompleted: false,
      priority: priority,
      deadline: taskDate.toLocaleDateString(),
      notificationTime: notifyTime,
    });
  };

  return (
    <div>
      <div className="head">
        <Link to="/todo">Back</Link>
        <h1>Create new task</h1>
      </div>
      <form>
        {/* <input type="hidden" name="taskID" id="" value={taskId} /> */}
        <label>Task Name</label>
        <input
          placeholder="Task Name"
          required
          type="text"
          name="TaskName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Priority</label>

        <div className="radioContainer">
          <label>
            <input
              onChange={handleRadioBtn}
              type="radio"
              name="priority"
              value="High"
              defaultChecked
            ></input>
            High
          </label>
          <label>
            <input
              onChange={handleRadioBtn}
              type="radio"
              name="priority"
              value="Medium"
            ></input>
            Medium
          </label>
          <label>
            <input
              onChange={handleRadioBtn}
              type="radio"
              name="priority"
              value="Low"
            ></input>
            Low
          </label>
        </div>

        <label>Notify me at:</label>
        <div className="time-container">
          <input
            value={notifyTime}
            onChange={(e) => setNotifyTime(e.target.value)}
            type="time"
            id="notifyTimer"
            name="notification Time"
            required
          />
        </div>

        <label>Date</label>
        <div style={{ display: "block" }} className="calander-container">
          <input
            type="date"
            name="todo-date"
            value={taskDate}
            onChange={handleCalanderValue}
          />
        </div>

        <label>Description</label>
        <input
          type="text"
          name="description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div>
          <p>{errorMessage}</p>
        </div>
        <div>
          <button type="submit" onClick={handleTaskAdd}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
