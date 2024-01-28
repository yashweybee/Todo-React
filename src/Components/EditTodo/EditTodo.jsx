import React from "react";
import { useParams } from "react-router";

const EditTodo = () => {
  const { id } = useParams();
  return (
    <div>
      <form>
        <label>Task Name</label>
        <input required ref={taskRef} type="text" name="TaskName" />
        <label>Description</label>
        <input ref={descRef} type="text" name="description" />
        <div className="radioContainer">
          <label>
            <input
              onChange={handleRadioBtn}
              type="radio"
              name="priority"
              value="High"
              defaultChecked
            ></input>
            High
          </label>
          <label>
            <input
              onChange={handleRadioBtn}
              type="radio"
              name="priority"
              value="Medium"
            ></input>
            Medium
          </label>
          <label>
            <input
              onChange={handleRadioBtn}
              type="radio"
              name="priority"
              value="Low"
            ></input>
            Low
          </label>
        </div>
        <div className="time-container">
          <label htmlFor="appt">Notify me at:</label>

          <input
            ref={notifyTimeRed}
            type="time"
            id="notifyTimer"
            name="notification Time"
            // min="09:00"
            // max="18:00"
            required
          />
        </div>
        <div className="calander-container">
          <Calendar onChange={handleCalanderValue} value={taskDate} />
        </div>
        <div>
          <p>{errorMessage}</p>
        </div>
        <div>
          <button type="button" onClick={handleCancelClick}>
            Cancel
          </button>
          <button type="submit" onClick={handleTaskAdd}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTodo;
