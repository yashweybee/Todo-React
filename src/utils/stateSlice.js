import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice(
    {
        name: "state",
        initialState: {
            currentState: "all",
            currentPage: "List", //List, add, edit, display
            searchText: ""
        },
        reducers: {
            setCurrnetState: (state, action) => {
                state.currentState = action.payload;
                state.searchText = ""
            },
            setCurrnetPage: (state, action) => {
                console.log(action.payload);
                state.currentPage = action.payload
            },
            setSearchText: (state, action) => {
                // console.log(action.payload);
                state.searchText = action.payload
            }

        }
    }
)

export const { setCurrnetState, setCurrnetPage, setSearchText } = stateSlice.actions;
export default stateSlice.reducer //stateReducer