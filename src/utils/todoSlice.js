import { createSlice } from "@reduxjs/toolkit";
import mockData from "./mockData";

const setNotification = (todoData) => {
    console.log(todoData);
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
            // todo: mockData,
            todo: [],
            progress: 0
        },
        reducers: {
            addTodo: (state, action) => {
                const index = state.todo.findIndex(todo => todo.taskId === action.payload.taskId);
                // console.log(index);
                setNotification(action.payload);
                if (index === -1) {
                    state.todo.push(action.payload);

                } else {
                    const copyArray = [...state.todo];
                    copyArray[index] = action.payload
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
            },
            setProgress: (state) => {
                const totalTodos = state.todo.length;
                const completedTodos = state.todo.filter((todo) => todo.isCompleted === true);
                const progressFinal = (100 * completedTodos.length) / totalTodos;

                state.progress = progressFinal
            }
        }
    }
)
export const { addTodo, clearTodo, onChangeCheckBox, deleteTodo, editTodo, setProgress } = todoSlice.actions
export default todoSlice.reducer //todoReducer