import React, { useEffect, useState } from "react";
import Todo from "../Todo/Todo";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { editTodoState } from "../../utils/todoSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./todoList.css";

const TodoList = () => {
  const dispatch = useDispatch();
  const todoStoredata = useSelector((store) => store?.todo?.todo);
  const { currentState, searchText } = useSelector((store) => store?.state);
  const [todoData, setTodoData] = useState(todoStoredata);
  const [taskCompleted, setTaskCompleted] = useState(false);

  const setTodoDataOnStateChange = () => {
    if (currentState == "active") {
      const todoData2 = todoStoredata.filter(
        (todo) => todo.isCompleted === false
      );
      setSearchFunc(todoData2);
      // setTodoData(todoData);
    } else if (currentState == "all") {
      // setTodoData(todoStoredata);
      setSearchFunc(todoStoredata);
    } else if (currentState == "completed") {
      // console.log("com");
      const todoData2 = todoStoredata.filter(
        (todo) => todo.isCompleted === true
      );
      // setTodoData(todoData);
      setSearchFunc(todoData2);
    }
  };

  const setSearchFunc = (todoData) => {
    if (searchText.length === 0) {
      setTodoData(todoData);
    } else {
      // if (searchText.length !== 0) {
      const searchTodo = todoData.filter((todo) =>
        todo.name.includes(searchText)
      );
      setTodoData(searchTodo);
    }
  };

  useEffect(() => {
    setTodoDataOnStateChange();
  }, [taskCompleted, todoStoredata, currentState, searchText]);

  const handleCheckBox = (e) => {
    setTaskCompleted(!taskCompleted);

    dispatch(
      editTodoState({ id: e.target.value, taskCompleted: taskCompleted })
    );
  };
  console.log(todoData);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(todoData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodoData(items);
  };
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
                      key={todo.id}
                      draggableId={todo.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="todoContainer"
                          ref={provided.innerRef}
                          // {...provided.placeholder}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
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
