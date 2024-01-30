import React, { useEffect, useId, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { addTodo, deleteTodo } from "../../utils/todoSlice";
import { setCurrnetPage } from "../../utils/stateSlice";
import "../AddTodo/addTodo.css";
import { CameraSvg } from "../../utils/svgs";
const AddTodo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { idParam } = useParams();
  const currentPage = useSelector((store) => store?.state?.currentPage);
  const allTodos = useSelector((store) => store?.todo?.todo);
  const [currentTodo, setCurrentTodo] = useState();
  const taskId = useId();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("High");

  const getFormatedDate = () => {
    const date = new Date();

    // Get year, month, and day
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = date.getDate().toString().padStart(2, "0");

    // Formatted date string
    return `${year}-${month}-${day}`;
  };
  const [taskDate, setTaskDate] = useState(getFormatedDate());

  const getFormatedTime = () => {
    const date = new Date();

    // Get hours and minutes
    const hours = date.getHours().toString().padStart(2, "0"); // Ensure two-digit format
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensure two-digit format

    // Formatted time string
    return `${hours}:${minutes}`;
  };
  const [notificationTime, setNotificationTime] = useState(getFormatedTime());
  const [imgFile, setImgFile] = useState();

  useEffect(() => {
    getCurrentTodo();
  }, [idParam, pathname]);

  const getCurrentTodo = () => {
    if (idParam) {
      const todoToEdit = allTodos.find((todo) => todo.taskId === idParam);

      if (pathname.includes("edit")) {
        dispatch(setCurrnetPage("edit"));
      } else if (pathname.includes("display")) {
        dispatch(setCurrnetPage("display"));
      } else {
        dispatch(setCurrnetPage("add"));
      }

      if (todoToEdit) {
        setCurrentTodo(todoToEdit);
        setImgFile(todoToEdit.imgFile);
        setName(todoToEdit.name);
        setDesc(todoToEdit.description);
        setTaskDate(todoToEdit.deadline);
        setNotificationTime(todoToEdit.notificationTime);
        setPriority(todoToEdit.priority);
      }
    }
  };
  // console.log(currentPage, idParam);

  const handleImageInp = (e) => {
    const file = e.target.files[0];
    // const imagePath = `/images/${file.name}`;
    console.log(URL.createObjectURL(file));
    setImgFile(URL.createObjectURL(file));
  };

  const handleSelectPriority = (e) => {
    // console.log(e.target.value);
    setPriority(e.target.value);
  };
  const handleDateChange = (e) => {
    console.log(e.target.value);
    setTaskDate(e.target.value);
  };
  const handleNotificationTime = (e) => {
    // console.log(e.target.value);
    setNotificationTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const todoData = {
      taskId: taskId,
      imgFile: imgFile,
      name: name,
      description: desc,
      deadline: taskDate,
      notificationTime: notificationTime,
      isCompleted: false,
      priority: priority,
    };
    // console.log(todoData);
    dispatch(addTodo(todoData));
    navigate("/todo");
  };

  const handleDeleteTodo = () => {
    const confirmBox = window.confirm(
      "Do you really want to delete this Crumb?"
    );
    if (confirmBox === true) {
      console.log("Yes");
      // dispatch(deleteTodo(idParam));
    }
  };

  return (
    <div className="todo-form">
      <div className="heading">
        <Link to="/todo">Back</Link>
        <h1>{idParam ? "Edit" : "Create"} Task</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          {/* <p>Avatar</p> */}
          <img src={imgFile || "../gym-pic.jpg"} alt="image" />
          <CameraSvg />
          <input
            required
            type="file"
            name="myImage"
            accept="image/png, image/gif, image/jpeg"
            className="inp-Img"
            onChange={handleImageInp}
          />
        </label>

        <label>
          <p>Task Name</p>
          <input
            required
            type="text"
            placeholder="Go to gym"
            // name=""
            id=""
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={currentPage === "display"}
          />
        </label>

        <label>
          <p>Priority</p>
          <select
            name="priority"
            id="priority"
            onChange={handleSelectPriority}
            value={priority}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>

        <label>
          <p>Date</p>
          <input
            type="date"
            id="start"
            name="trip-start"
            value={taskDate}
            onChange={handleDateChange}
          />
        </label>
        <label>
          <p>Notify me at</p>
          <input
            type="time"
            id="notify"
            name="notification time"
            required
            onChange={handleNotificationTime}
            value={notificationTime}
          />
        </label>

        <label>
          <p>Description</p>
          <textarea
            required
            type="text"
            placeholder="Today workout Plan..."
            name=""
            rows={5}
            id="description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </label>

        {currentPage === "display" ? (
          <div className="display-btns">
            <button
              onClick={handleDeleteTodo}
              className="btn-link back"
              to="/todo"
            >
              Delete
            </button>
            <button className="btn-link">Edit Task</button>
          </div>
        ) : (
          <label>
            <button type="submit">{idParam ? "Edit" : "Create"} Task</button>
          </label>
        )}
      </form>
    </div>
  );
};

export default AddTodo;
