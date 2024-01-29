import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { deleteTodo } from "../../utils/todoSlice";
// import DeleteSvg from "../utils/svgs.jsx"

const DisplayTodo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const todoData = useSelector((store) => store?.todo?.todo);
  const currentTodo = todoData.filter((todo) => todo.id === id);
  console.log(currentTodo);

  //   const handleDeleteTodo = (e) => {
  //     dispatch(deleteTodo(e.target.value));
  //     navigate("/todo");
  //   };

  return (
    <></>
    // <div>
    //   <Link to="/todo">Home</Link>
    //   <h1>{currentTodo[0].name}</h1>
    //   <p>{currentTodo[0].description}</p>

    //   <div>
    //     <Link to={"/todo/edit/" + id}>Edit</Link>
    //     {/* <button>Edit</button> */}
    //     <button value={id} onClick={handleDeleteTodo} className="deleteBtn">
    //       delete
    //       {/* <DeleteSvg /> */}
    //     </button>
    //   </div>
    // </div>
  );
};

export default DisplayTodo;
