import { createSlice } from "@reduxjs/toolkit";

//createSlice uses a library called Immer inside.
// Immer uses a special JS tool called a Proxy to wrap the data you provide,
//  and lets you write code that "mutates" that wrapped data.
//  But, Immer tracks all the changes you've tried to make,
//  and then uses that list of changes to return a safely immutably updated value,
//  as if you'd written all the immutable update logic by hand.

const TodoSlice = createSlice({
  name: "Todo",
  initialState: [],
  reducers: {
    createTodo: (state, action) => {
      state.push(action.payload);  
    },
    deleteTodo: (state, action) => {
      return state.filter((el) => el.id !== action.payload);
    },
    updateTodo: (state, action) => {
      return state.map((el) =>
        el.id === action.payload.id ? action.payload : el
      );
    },
  },
});


export const deleteTodoAsynchronously = (id) => async (dispatch, getState) => {
  const prevState = getState();
  console.log(prevState);
  setTimeout(() => {
    dispatch(deleteTodo(id));
    console.log("Todo Deleted");
  }, 3000);
};

export const { createTodo, deleteTodo, updateTodo } = TodoSlice.actions;

export default TodoSlice.reducer;

export const getTodoState = (state) => state.todo;
