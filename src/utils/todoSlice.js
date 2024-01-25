import { createSlice } from "@reduxjs/toolkit";
import mockData from "./mockData";

const todoSlice = createSlice(
    {
        name: "todo",
        initialState: {
            todo: mockData
        },
        reducers: {
            addTodo: (state, action) => {
                state.todo.push(action.payload);
            },
            editTodoState: (state, action) => {
                // isComppleted
                const { id, taskCompleted } = action.payload
                state.todo.map((todo) => todo.id === id ? todo.isCompleted = taskCompleted : todo)
            },
            deleteTodo: (state, action) => {
                return { ...state, todo: state.todo.filter((todo) => todo.id !== action.payload) };
            },
            clearTodo: (state) => {
                state.todo.length = 0;
            }

        }
    }
)
export const { addTodo, clearTodo, editTodoState, deleteTodo } = todoSlice.actions
export default todoSlice.reducer //todoReducer