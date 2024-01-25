import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import stateReducer from "./stateSlice"

const appStore = configureStore(
    {
        reducer: {
            todo: todoReducer,
            state: stateReducer
        }
    }
)

export default appStore