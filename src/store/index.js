import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth';
import expenseReducer from "./expenses";

const store= configureStore({
    reducer: {
        auth: authReducer,
        expenses: expenseReducer
    },
});

export default store;