import React, { useId, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch } from "react-redux";
import { addTodo } from "../../utils/todoSlice";
import { useNavigate } from "react-router";
import checkValidation from "../../utils/validation";
import "../AddTodo/addTodo.css";
import { setCurrnetPage } from "../../utils/stateSlice";
import { Link } from "react-router-dom";

const AddTodo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const taskId = useId();
  const [taskDate, setTaskDate] = useState(new Date());
  const [priority, setPriority] = useState("High");
  const [errorMessage, setErrorMessage] = useState("");
  const taskRef = useRef(null);
  const descRef = useRef(null);
  const notifyTimeRed = useRef(null);

  dispatch(setCurrnetPage("AddTodoPage"));

  const handleRadioBtn = (e) => {
    setPriority(e.target.value);
  };

  const handleCalanderValue = (val) => {
    setTaskDate(val);
  };

  const handleTaskAdd = (e) => {
    e.preventDefault();
    const message = checkValidation(
      taskRef.current.value,
      descRef.current.value
    );

    setErrorMessage(message);

    if (message) return;
    console.log(notifyTimeRed.current.value);

    // dispatch(
    //   addTodo({
    //     id: taskId,
    //     name: taskRef.current.value,
    //     description: descRef.current.value,
    //     isCompleted: false,
    //     priority: priority,
    //     deadline: taskDate.toJSON(),
    //     notificationTime: notifyTimeRed.current.value,
    //   })
    // );
    navigate("/todo");

    console.log({
      id: taskId,
      name: taskRef.current.value,
      description: descRef.current.value,
      isCompleted: false,
      priority: priority,
      deadline: taskDate.toJSON(),
      notificationTime: notifyTimeRed.current.value,
    });
  };

  return (
    <div>
      <div className="head">
        <Link to="/todo">Back</Link>
        <h1>Create new task</h1>
      </div>
      <form>
        <label>Task Name</label>
        <input
          placeholder="Task Name"
          required
          ref={taskRef}
          type="text"
          name="TaskName"
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
        <div className="time-container">
          <label htmlFor="appt">Notify me at:</label>

          <input
            ref={notifyTimeRed}
            type="time"
            id="notifyTimer"
            name="notification Time"
            // min="09:00"
            // max="18:00"
            required
          />
        </div>
        <div>
          <button type="button">Date</button>
        </div>
        <div className="calander-container">
          {/* <Calendar onChange={handleCalanderValue} value={taskDate} /> */}
          <input type="date" name="" id="" />
        </div>
        <div>
          <p>{errorMessage}</p>
        </div>

        <label>Description</label>
        <input ref={descRef} type="text" name="description" />
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
