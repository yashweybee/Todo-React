import { createSlice } from "@reduxjs/toolkit";
import mockData from "./mockData";

const setNotification = (todoData) => {
    // console.log(todoData.notificationTime);
    const [hours, minutes] = todoData.notificationTime.split(':');
    const timeDiff = new Date(todoData.deadline).setHours(hours, minutes, 0, 0) - new Date().getTime();

    if (timeDiff <= 0) return;

    setTimeout(() => {
        new Notification(todoData.name, {
            body: "You have Pending Task..",
            icon: todoData.imgFile,
            dir: "auto",
        });
    }, timeDiff);
}

const todoSlice = createSlice(
    {
        name: "todo",
        initialState: {
            todo: mockData,
            // todo: [],
            notification: []
        },
        reducers: {
            addTodo: (state, action) => {
                const index = state.todo.findIndex(todo => todo.taskId === action.payload.taskId);
                // console.log(index);
                if (index === -1) {
                    state.todo.push(action.payload);
                    // const notificationTime = ;
                    setNotification(action.payload);



                } else {
                    const copyArray = [...state.todo];
                    copyArray[index] = action.payload
                    // console.log({
                    //     ...state,
                    //     todo: copyArray
                    // });
                    return {
                        ...state,
                        todo: copyArray
                    }
                }
            },
            onChangeCheckBox: (state, action) => {
                const { taskId } = action.payload
                state.todo.map((todo) => todo.taskId === taskId ? todo.isCompleted = !todo.isCompleted : todo)
            },
            deleteTodo: (state, action) => {
                return { ...state, todo: state.todo.filter((todo) => todo.taskId !== action.payload) };
            },
            clearTodo: (state) => {
                state.todo.length = 0;
            }

        }
    }
)
export const { addTodo, clearTodo, onChangeCheckBox, deleteTodo, editTodo } = todoSlice.actions
export default todoSlice.reducer //todoReducer