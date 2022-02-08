import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./Features/TodoSlice";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { TodosApi } from "./service/TodoApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { MovieApi } from "./service/MovieApi";

export const storeRTK = configureStore({
  reducer: {
    todo: TodoSlice,
    [TodosApi.reducerPath]: TodosApi.reducer,
    [MovieApi.reducerPath]: MovieApi.reducer,
  },
  preloadedState: {
    todo: [{ todo: "preloaded State", completed: false, id: "213213112" }],
  },
  middleware: (getdefaults) =>
    getdefaults().concat(TodosApi.middleware, MovieApi.middleware),
});

setupListeners(storeRTK.dispatch);
