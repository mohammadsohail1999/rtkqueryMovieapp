import React from "react";
import { useDispatch } from "react-redux";
// import {
//   deleteTodo,
//   deleteTodoAsynchronously,
//   updateTodo as rtkupdateTodo,
// } from "../Features/TodoSlice";
import { useGetTodosQuery, useDeleteTodoMutation } from "../service/TodoApi";
const Todo = ({ id, todoData }) => {

  const [deleteTodo, { isError, isLoading, error }] = useDeleteTodoMutation();

  const onDeleteHandler = () => {
    deleteTodo(id);
  };

  const onUpdateHandler = (data) => {
    //Rtk Action
    // dispatch(rtkupdateTodo(data));
  };

  return (
    <div>
      <h4
        style={{
          textDecoration: todoData?.completed ? "line-through" : "none",
        }}
      >
        {todoData.todo}
      </h4>
      <input
        onChange={() => {
          onUpdateHandler({ ...todoData, completed: !todoData.completed });
        }}
        type="checkbox"
        checked={todoData?.completed}
      />
      <button onClick={onDeleteHandler}>delete</button>
      {/* <button onClick={onAsyncDelete}> Delete Asynchronously</button> */}
    </div>
  );
};

export default Todo;
