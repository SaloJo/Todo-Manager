import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import todoReducer from "./todo";

const store = configureStore({
  reducer: { auth: authReducer, todo: todoReducer },
});

export default store;
