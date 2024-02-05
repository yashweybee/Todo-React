import React, { useEffect, useState } from "react";
import "./progress.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setProgress } from "../../utils/todoSlice";

const Progress = () => {
  const progress = useSelector((store) => store.todo.progress);
  const progressBarValue = Math.floor(progress);
  console.log(progressBarValue);
  const todos = useSelector((store) => store.todo.todo).length;
  const dispatch = useDispatch();
  // const [progress, setProgress] = useState(1);
  useEffect(() => {
    dispatch(setProgress());
  }, []);
  //   if (!progressBarValue) return;

  return (
    <div className="progress-summary">
      <div className="content">
        <h1>Today's progress summary</h1>
      </div>
      <div className="tasks">
        <span>{todos} Tasks</span>
        <span>{!progressBarValue ? 0 : progressBarValue}%</span>
      </div>
      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: `${!progressBarValue ? 0 : progressBarValue}%` }}
        >
          {" "}
        </div>
      </div>
    </div>
  );
};

export default Progress;
