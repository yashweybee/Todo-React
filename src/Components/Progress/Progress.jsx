import React, { useEffect, useState } from "react";
import "./progress.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setProgress } from "../../utils/todoSlice";

const Progress = () => {
  const progressBarValue = useSelector((store) => store.todo.progress);
  const dispatch = useDispatch();
  // const [progress, setProgress] = useState(1);
  console.log(progressBarValue);
  useEffect(() => {
    dispatch(setProgress());
  }, []);

  return (
    <div className="progress-summary">
      <div className="content">
        <h1>Today's progress summary</h1>
      </div>
      <div className="tasks">10 Tasks</div>
      <div className="progress">
        {/* <progress id="file" value="50" max="100">
          32%
        </progress> */}
        <div className="progress-bar" style={{ width: `${progressBarValue}%` }}>
          {" "}
        </div>
      </div>
    </div>
  );
};

export default Progress;
