import { configureStore } from "@reduxjs/toolkit";
import chartSlice from "./chartSlice";
import userSlice from "./userSlice";

export default configureStore({
    reducer: {
        chartSlice, userSlice
    },
});