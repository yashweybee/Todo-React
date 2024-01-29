import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const EditTodo = () => {
  const { idParam } = useParams();
  const allTodos = useSelector((store) => store?.todo?.todo);
  const currentTodo = allTodos.filter((todo) => todo.id === idParam);
  console.log(currentTodo);

  const dispatch = useDispatch();

  const [taskDate, setTaskDate] = useState(currentTodo[0].deadline);
  const [priority, setPriority] = useState(currentTodo[0].priority);
  const [errorMessage, setErrorMessage] = useState("");
  const taskRef = useRef(currentTodo[0].name);
  const descRef = useRef(currentTodo[0].description);
  const notifyTimeRed = useRef(currentTodo[0].notificationTime);

  // console.log(taskRef);

  const handleTaskAdd = (e) => {
    e.preventDefault();
    const message = checkValidation(
      taskRef.current.value,
      descRef.current.value
    );

    setErrorMessage(message);

    if (message) return;
    console.log(notifyTimeRed.current.value);

    dispatch(
      addTodo({
        id: taskId,
        name: taskRef.current.value,
        description: descRef.current.value,
        isCompleted: false,
        priority: priority,
        deadline: taskDate,
        notificationTime: notifyTimeRed.current.value,
      })
    );
    navigate("/todo");

    // console.log({
    //   id: taskId,
    //   name: taskRef.current.value,
    //   description: descRef.current.value,
    //   isCompleted: false,
    //   priority: priority,
    //   deadline: taskDate.toJSON(),
    //   notificationTime: notifyTimeRed.current.value,
    // });
  };

  const handleCalanderValue = (e) => {
    // console.log(new Date());

    setTaskDate(e.target.value);
  };

  const handleRadioBtn = (e) => {
    setPriority(e.target.value);
  };

  return (
    <div>
      <div className="head">
        <Link to="/todo">Back</Link>
        <h1>Edit task</h1>
      </div>
      <form>
        {/* <input type="hidden" name="taskID" id="" value={taskId} /> */}
        <label>Task Name</label>
        <input
          placeholder="Task Name"
          required
          ref={taskRef}
          type="text"
          name="TaskName"
          value={taskRef.current}
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
            ref={notifyTimeRed}
            value={notifyTimeRed.current}
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
          {/* <input type="date" name="" id="" /> */}
        </div>

        <label>Description</label>
        <input
          ref={descRef}
          value={descRef.current}
          type="text"
          name="description"
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

export default EditTodo;
