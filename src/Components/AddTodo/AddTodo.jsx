import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
const AddTodo = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { idParam } = useParams();
  const allTodos = useSelector((store) => store?.todo?.todo);
  const [currentTodo, setCurrentTodo] = useState();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("High");
  const [taskDate, setTaskDate] = useState(new Date());

  const getFormatedDate = () => {
    const date = new Date();

    // Get hours and minutes
    const hours = date.getHours().toString().padStart(2, "0"); // Ensure two-digit format
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensure two-digit format

    // Formatted time string
    return `${hours}:${minutes}`;
  };
  const [notificationTime, setNotificationTime] = useState(getFormatedDate());

  const [imgFile, setImgFile] = useState();

  console.log(notificationTime);

  useEffect(() => {
    getCurrentTodo();
  }, []);

  const getCurrentTodo = () => {
    if (idParam || pathname.includes("edit")) {
      const todoToEdit = allTodos.find((todo) => todo.id === idParam);
      if (todoToEdit) {
        console.log(todoToEdit);
        setCurrentTodo(todoToEdit);
        setName(todoToEdit.name);
        setDesc(todoToEdit.description);
        setTaskDate(todoToEdit.deadline);

        // You can set other fields here if needed
      }
    }
  };

  const handleImageInp = (e) => {
    setImgFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleSelectPriority = (e) => {
    // console.log(e.target.value);
    setPriority(e.target.value);
  };
  const handleDateChange = (e) => {
    // console.log(e.target.value);
    setTaskDate(e.target.value);
  };
  const handleNotificationTime = (e) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const todoData = {
    //   name,
    //   // Add other fields if needed
    // };

    // if (idParam) {
    //   // Edit existing todo
    //   dispatch(editTodo({ id: idParam, data: todoData }));
    // } else {
    //   // Add new todo
    //   dispatch(addTodo(todoData));
    // }

    // // Redirect to the todo list after submission
    // history.push("/todo");
  };

  return (
    <div>
      <div className="heading">
        <Link to="/todo">Back</Link>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          <p>Avatar</p>
          <input
            required
            type="file"
            name="myImage"
            accept="image/png, image/gif, image/jpeg"
            onChange={handleImageInp}
          />
        </label>

        <label>
          <p>Task Name</p>
          <input
            required
            type="text"
            name=""
            id=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          <p>Priority</p>
          <select
            name="priority"
            id="cars"
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
          <p>Notyfy me at</p>
          <input
            type="time"
            id="notify"
            name="notification time"
            min="12:00"
            max="18:00"
            required
            onChange={handleNotificationTime}
            value={notificationTime}
          />
        </label>

        <label>
          <p>Description</p>
          <input
            required
            type="text"
            name=""
            id=""
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </label>
        <button type="submit">{idParam ? "Edit Todo" : "Add Todo"}</button>
      </form>
    </div>
  );
};

export default AddTodo;
