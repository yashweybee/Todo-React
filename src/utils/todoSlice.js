import { createSlice } from "@reduxjs/toolkit";
import mockData from "./mockData";

const todoSlice = createSlice(
    {
        name: "todo",
        initialState: {
            // todo: mockData
            todo: []
        },
        reducers: {
            addTodo: (state, action) => {
                // console.log(action.payload);

                const index = state.todo.findIndex(todo => todo.taskId === action.payload.taskId);
                console.log(index);
                if (index === -1) {
                    state.todo.push(action.payload);
                } else {
                    const copyArray = [...state.todo];
                    copyArray[index] = action.payload
                    console.log({
                        ...state,
                        todo: copyArray
                    });
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
                // console.log(action.payload);
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