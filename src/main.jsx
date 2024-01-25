import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./Components/Body.jsx";
import TodoList from "./Components/TodoList.jsx";
import AddTodo from "./Components/AddTodo.jsx";
import DisplayTodo from "./Components/DisplayTodo.jsx";

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <RouterProvider router={appRouter} />
);
