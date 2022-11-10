import { createSlice } from "@reduxjs/toolkit";

export const chartSlice = createSlice({
    name: "charts",
    initialState: {
        value: [],
    },
    reducers: {
        syncData: (state, action) => {
        state.value = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { syncData } = chartSlice.actions;

export default chartSlice.reducer;