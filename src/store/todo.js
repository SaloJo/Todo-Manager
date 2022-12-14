import { createSlice } from "@reduxjs/toolkit";

const sampleTodo = {
  id: "anyId",
  task: "Task Name",
  date: "28-Jul-2022",
  category: "Default",
  status: "Due",
};

const initialState = {
  todos: [sampleTodo],
  categories: ["Default", "Work", "Shopping"],
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    addTask(state, action) {
      state.todos.unshift(action.payload);
    },
    updateTask(state, action) {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[todoIndex] = action.payload;
    },
    deleteTask(state, action) {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      state.todos.splice(todoIndex, 1);
    },
    completeTask(state, action) {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      state.todos[todoIndex].status = "Done";
    },
  },
});

export const todoActions = todoSlice.actions;

export default todoSlice.reducer;
