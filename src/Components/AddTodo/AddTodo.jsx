import React, { useEffect, useId, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { addTodo, deleteTodo } from "../../utils/todoSlice";
import { setCurrnetPage } from "../../utils/stateSlice";
import "../AddTodo/addTodo.css";
import { CameraSvg } from "../../utils/svgs";
import { DEFAULT_IMG_PATH } from "../../utils/constants";
import checkValidation from "../../utils/validation";
const AddTodo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { idParam } = useParams();
  const currentPage = useSelector((store) => store?.state?.currentPage);
  const allTodos = useSelector((store) => store?.todo?.todo);
  const [currentTodo, setCurrentTodo] = useState();
  const newTaskId = useId();
  const [taskId, setTaskId] = useState(newTaskId);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("High");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModel, setShowModel] = useState(false);

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
  const [imgFile, setImgFile] = useState(DEFAULT_IMG_PATH);

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
        setTaskId(todoToEdit.taskId);
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
    setErrorMessage("");
    const file = e.target.files[0];
    // const imagePath = `/images/${file.name}`;
    // console.log(URL.createObjectURL(file));
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
    console.log(e.target.value);
    setNotificationTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = checkValidation(name);
    setErrorMessage(message);
    console.log(message);
    if (message) return;

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

  const handleDeleteTodo = (e) => {
    e.preventDefault();
    setShowModel(true);
  };

  const handleEditBtn = (e) => {
    e.preventDefault();
    console.log("edit");
    navigate(`/todo/edit/${idParam}`);
  };

  const handleCancelBtn = () => {
    setShowModel(false);
  };
  const handleYesBtn = () => {
    dispatch(deleteTodo(idParam));
    navigate("/todo");
  };

  return (
    <div className="todo-form">
      {showModel && (
        <div className="model-confirm">
          <div className="model-body">
            <div className="title">
              <h2>Are you sure to delete?</h2>
            </div>
            <div className="confirm-btns">
              <button type="button" onClick={handleCancelBtn}>
                Cancel
              </button>
              <button type="button" onClick={handleYesBtn}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="heading">
        <Link
          to={currentPage === "edit" ? `/todo/display/${idParam}` : "/todo"}
        >
          Back
        </Link>
        <h1>
          {currentPage === "display"
            ? "Details"
            : idParam
            ? "Edit Task"
            : "New Task"}
        </h1>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          <img src={imgFile || "../gym-pic.jpg"} alt="image" />
          <div
            style={{ display: currentPage === "display" ? "none" : "block" }}
          >
            <CameraSvg />
          </div>
          <input
            type="file"
            name="myImage"
            accept="image/png, image/gif, image/jpeg"
            className="inp-Img"
            onChange={handleImageInp}
            disabled={currentPage === "display"}
          />
        </label>

        <label name="inp-name">
          <p>Task Name</p>
          {/* <span>{errorMessage}</span> */}
          <input
            required
            type="text"
            placeholder="Go to gym"
            id="inp-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={currentPage === "display"}
            style={{
              border: errorMessage ? "1px solid red" : "1px solid #ccc",
            }}
          />
        </label>

        <label>
          <p>Priority</p>
          <select
            name="priority"
            id="priority"
            onChange={handleSelectPriority}
            value={priority}
            disabled={currentPage === "display"}
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
            disabled={currentPage === "display"}
          />
        </label>

        <label>
          <p>Notify me at</p>
          <input
            type="time"
            id="notify"
            name="notification time"
            onChange={handleNotificationTime}
            value={notificationTime}
            disabled={currentPage === "display"}
          />
        </label>

        <label>
          <p>Description</p>
          <textarea
            type="text"
            placeholder="Today workout Plan..."
            name=""
            rows={5}
            id="description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            disabled={currentPage === "display"}
          />
        </label>

        {currentPage === "display" ? (
          <label className="display-btns">
            <button
              onClick={handleDeleteTodo}
              className="btn-link delete"
              to="/todo"
            >
              Delete
            </button>
            <button onClick={handleEditBtn} className="btn-link">
              Edit Task
            </button>
          </label>
        ) : (
          <label>
            <button onClick={handleSubmit} type="submit">
              {idParam ? "Edit" : "Create"} Task
            </button>

            {/* <button onClick={handleSubmit} type="submit">
              Create Task
            </button> */}
          </label>
        )}
      </form>
    </div>
  );
};

export default AddTodo;
