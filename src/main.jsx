import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./Components/Body/Body.jsx";
import TodoList from "./Components/TodoList/TodoList.jsx";
import AddTodo from "./Components/AddTodo/AddTodo.jsx";
import DisplayTodo from "./Components/DisplayTodo/DisplayTodo.jsx";
import EditTodo from "./Components/EditTodo/EditTodo.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
  },
  {
    path: "/todo",
    element: <App />,
    children: [
      {
        path: "/todo",
        element: <TodoList />,
      },
      {
        path: "/todo/add",
        element: <AddTodo />,
      },
      {
        path: "/todo/:id",
        element: <DisplayTodo />,
      },
      {
        path: "/todo/edit/:idParam",
        element: <AddTodo />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <RouterProvider router={appRouter} />
);
