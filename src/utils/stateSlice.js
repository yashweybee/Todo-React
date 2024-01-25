import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice(
    {
        name: "state",
        initialState: {
            currentState: "all"
        },
        reducers: {
            setCurrnetState: (state, action) => {
                state.currentState = action.payload;
            }

        }
    }
)

export const { setCurrnetState } = stateSlice.actions;
export default stateSlice.reducer //stateReducer