import { createSlice } from "@reduxjs/toolkit";
import mockData from "./mockData";

const todoSlice = createSlice(
    {
        name: "todo",
        initialState: {
            todo: mockData
            // todo: []
        },
        reducers: {
            addTodo: (state, action) => {

                // console.log(action.payload.id);
                const index = state.todo.findIndex(todo => todo.id === action.payload.id);
                if (index === -1) {
                    state.todo.push(action.payload);
                } else {
                    const copyArray = [...state.todo];
                    copyArray[index] = action.payload
                    console.log({
                        ...state,
                        todo: copyArray
                    });
                    // return {
                    //     ...state,
                    //     todo: copyArray
                    // }
                }
            },
            editTodoState: (state, action) => {
                // isComppleted
                const { id, taskCompleted } = action.payload
                state.todo.map((todo) => todo.id === id ? todo.isCompleted = taskCompleted : todo)
            },
            deleteTodo: (state, action) => {
                return { ...state, todo: state.todo.filter((todo) => todo.id !== action.payload) };
            },
            editTodo: (state, action) => {
                // const index = 

            },
            clearTodo: (state) => {
                state.todo.length = 0;
            }

        }
    }
)
export const { addTodo, clearTodo, editTodoState, deleteTodo, editTodo } = todoSlice.actions
export default todoSlice.reducer //todoReducer