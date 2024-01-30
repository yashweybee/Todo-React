import React, { useEffect, useState } from "react";
import Todo from "../Todo/Todo";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { onChangeCheckBox } from "../../utils/todoSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./todoList.css";
import Checkbox from "../Checkbox/Checkbox";

const TodoList = () => {
  const dispatch = useDispatch();
  const todoStoredata = useSelector((store) => store?.todo?.todo);
  const sortBy = useSelector((store) => store?.state?.sortBy);
  const { currentState, searchText } = useSelector((store) => store?.state);
  const [todoData, setTodoData] = useState(todoStoredata);
  const [copyTodoData, setCopyTodoData] = useState(todoData);

  const setTodoDataOnStateChange = () => {
    if (currentState == "active") {
      const todoData2 = todoStoredata.filter(
        (todo) => todo.isCompleted === false
      );
      sortByFunc(todoData2);
      setCopyTodoData(todoData2);
      // setTodoData(todoData);
    } else if (currentState == "all") {
      // setTodoData(todoStoredata);
      setCopyTodoData(todoStoredata);
      sortByFunc(todoStoredata);
    } else if (currentState == "completed") {
      // console.log("com");
      const todoData2 = todoStoredata.filter(
        (todo) => todo.isCompleted === true
      );
      setCopyTodoData(todoData2);
      sortByFunc(todoData2);
    }
  };

  const sortByFunc = (todoData) => {
    let tempData = [...todoData];
    if (sortBy === "Name") {
      tempData.sort((a, b) => a.name.localeCompare(b.name));
      setTodoData(tempData);
    } else if (sortBy === "Date") {
      tempData.sort((p1, p2) =>
        p1.deadline > p2.deadline ? 1 : p1.deadline < p2.deadline ? -1 : 0
      );
      // console.log(tempData);
      setTodoData(tempData);
    } else if (sortBy === "Created/Modified") {
      setTodoData(copyTodoData);
    }

    setSearchFunc(tempData);
  };

  const setSearchFunc = (todoData) => {
    if (searchText.length === 0) {
      setTodoData(todoData);
      // sortByFunc(todoData);
    } else {
      const searchTodo = todoData.filter((todo) =>
        todo.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setTodoData(searchTodo);
      // sortByFunc(searchTodo);
      // console.log(searchTodo);
    }
  };

  useEffect(() => {
    setTodoDataOnStateChange();
  }, [todoStoredata, currentState, searchText, sortBy]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(todoData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodoData(items);
  };

  const handleCheckbox = (todo) => {
    // console.log(e.target.value);
    dispatch(onChangeCheckBox(todo));
  };
  console.log(todoData);
  return (
    <>
      <Header />
      <div className="todo-list">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="todoData">
            {(provided) => (
              <div
                className="todoData"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {todoData.map((todo, index) => {
                  return (
                    <Draggable
                      key={todo.taskId}
                      draggableId={todo.taskId}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="todoContainer"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Link
                            className="todo-item"
                            to={"/todo/display/" + todo.taskId}
                          >
                            <Todo
                              name={todo.name}
                              isCompleted={todo.isCompleted}
                              deadline={todo.deadline}
                              imgFile={todo.imgFile}
                            />
                          </Link>
                          <Checkbox
                            onClick={() => handleCheckbox(todo)}
                            defaultChecked={todo.isCompleted}
                          />
                          {provided.placeholder}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <Footer />
    </>
  );
};

export default TodoList;
