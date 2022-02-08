import React, { useEffect, useState } from "react";
import { v4 as uuid, v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import Todo from "../Components/Todo";
import { createTodo, getTodoState } from "../Features/TodoSlice";
import { useGetTodosQuery, usePostTodoMutation } from "../service/TodoApi";

const TodoScreen = () => {
  // console.log(
  //   mutationIsSuccess,
  //   mutationIsLoading,
  //   mutationIsError,
  //   mutationError,
  //   mutationIsError,
  //   mutationData
  // );

  const [todo, setTodo] = useState("");
  const [limit, setLimit] = useState("5");
  const [page, setPage] = useState(1);

  const {
    data = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetTodosQuery(
    { page, limit },
    {
      // pollingInterval: 3000,
      refetchOnMountOrArgChange: 50,
      refetchOnFocus: true,
      // skip: false,
    }
  );

  const [
    postTodo,
    {
      isLoading: mutationIsLoading,
      isSuccess: mutationIsSuccess,
      isError: mutationIsError,
      error: mutationError,
      data: mutationData,
    },
  ] = usePostTodoMutation();

  // useEffect(() => {
  //   if (mutationIsSuccess) {
  //     refetch();
  //   }
  // }, [mutationIsSuccess]);

  const onChangeHandler = (e) => {
    setTodo(e.target.value);
  };

  const createHandler = (e) => {
    postTodo({
      todo,
      completed: false,
      id: v4(),
    });
    setTodo("");
  };

  if (isLoading) return <h1>loading...</h1>;

  if (isError) return <h1>Error occured</h1>;

  return (
    <>
      <input type="text" value={todo} onChange={onChangeHandler} />
      <button onClick={createHandler} disabled={!todo}>
        Create
      </button>
      <div>
        {!isFetching ? (
          data.map((el) => {
            return (
              <Todo
                completed={el.completed}
                id={el.id}
                key={el.id}
                todoData={el}
                todo={el.todo}
              />
            );
          })
        ) : (
          <h1>Refetching</h1>
        )}

        <div>
          <button>Prev</button>
          <button>Next</button>
          <select value={limit} onChange={(e) => setLimit(e.target.value)}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default TodoScreen;
