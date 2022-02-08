import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const MovieApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
  }),
  endpoints: (builder) => {
    return {
      GetMoviesorTV: builder.query({
        query: ({ page, type, filter }) => ({
          url: `/${type}/${filter}`,
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            page: page,
          },
        }),
      }),
      GetMoviesDetails: builder.query({
        query: ({ id, type }) => {
          return {
            url: `/${type}/${id}`,
            params: {
              api_key: process.env.REACT_APP_API_KEY,
              append_to_response: "credits",
            },
          };
        },
      }),
      searchMovies: builder.mutation({
        query: ({ search, page = 1, type = "movie" }) => ({
          url: type === "movie" ? "/search/movie" : "/search/tv",
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            page,
            query: search,
          },
          method: "GET",
        }),
      }),
    };
  },
});

export const {
  useGetMoviesorTVQuery,
  useSearchMoviesMutation,
  useGetMoviesDetailsQuery,
} = MovieApi;
