import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice(
    {
        name: "state",
        initialState: {
            currentState: "all",
            currentPage: "List"
        },
        reducers: {
            setCurrnetState: (state, action) => {
                state.currentState = action.payload;
            },
            setCurrnetPage : (state, action)=>{
                state.currentPage = action.payload

            }

        }
    }
)

export const { setCurrnetState, setCurrnetPage } = stateSlice.actions;
export default stateSlice.reducer //stateReducer