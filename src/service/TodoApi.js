import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const TodosApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  tagTypes: ["todos"],

  // refetchOnFocus:true, // activeListner is required
  // refetchOnMountOrArgChange: 40
  // keepUnusedDataFor: 60
  // refetchOnReconnect: true, // activeListner is required

  endpoints: (builder) => {
    return {
      getTodos: builder.query({
        query: ({ page, limit }) => ({
          url: `todos?_page=${page}&_limit=${limit}`,
        }),
        keepUnusedDataFor: 6,
        providesTags: (results, errors, args) => {
          return results
            ? [...results.map((el) => ({ type: "todos", id: el.id }))]
            : ["todos"];
        },
        // transformResponse: (res, meta) => res.data,
      }),
      postTodo: builder.mutation({
        query: (data) => ({
          url: "todos",
          method: "POST",
          body: data,
        }),
        invalidatesTags: (results, error, arg) => {
          return ["todos"];
        },
      }),
      deleteTodo: builder.mutation({
        query: (id) => {
          return {
            url: `todos/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: (results, error, arg) => {
          return [{ type: "todos", id: arg.id }];
        },
      }),
    };
  },
});

export const {
  useGetTodosQuery,
  usePostTodoMutation,
  useDeleteTodoMutation,
  endpoints,
} = TodosApi;
