import { Box, Button, Grid, Input, Select } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useSearchMoviesMutation } from "../service/MovieApi";
import CardSkeleton from "./CardSkeleton";
import MovieCard from "./MovieCard";

const MovieInput = () => {
  const [type, setType] = useState("movie");
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageReset, setPageReset] = useState(false);
  const resultContainerRef = useRef(null);

  const [searchMovie, { isLoading, data: searchData }] =
    useSearchMoviesMutation();

  useEffect(() => {
    let TimeOut = setTimeout(() => {
      if (term) {
        searchMovie({
          search: term,
          page: 1,
          type,
        });
      }
    }, 2000);
    return function () {
      clearTimeout(TimeOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  useEffect(() => {
    if (pageReset) {
      setPageReset(false);
      return;
    }
    if (term) {
      searchMovie({
        search: term,
        page: page,
        type,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <Box mt={"32"} d="flex" paddingX={"10"}>
        <Input
          placeholder="Search Movies or TV shows"
          onChange={(e) => {
            setTerm(e.target.value);
            if (page > 1) {
              setPageReset(true);
              setPage(1);
            }
          }}
          flex="3"
        />
        <Select
          ml="10"
          flex="1"
          value={type}
          onChange={(e) => {
            if (term) {
              searchMovie({ search: term, page: 1, type: e.target.value });
            }
            setType(e.target.value);

            if (page > 1) {
              setPageReset(true);
              setPage(1);
            }
          }}
        >
          <option value="movie">Movies</option>
          <option value="TV">TV</option>
        </Select>
      </Box>
      {!searchData ? (
        <Box d="flex" justifyContent={"center"} mt="30" fontSize={"2xl"}>
          Search for a Movie
        </Box>
      ) : null}

      {isLoading ? <CardSkeleton length={20} height={"230px"} /> : null}
      {searchData ? (
        <>
          <Grid
            px={["10", "20", "24"]}
            paddingTop={"20"}
            templateColumns={[
              "repeat(1,1fr)",
              "repeat(2,1fr)",
              "repeat(3,1fr)",
              "repeat(4,1fr)",
            ]}
            gap={6}
          >
            {searchData?.results.map((el) => {
              return (
                <MovieCard
                  key={el.id}
                  backdrop_path={el.backdrop_path}
                  poster_path={el.poster_path}
                  vote_average={el.vote_average}
                  title={el.title}
                  type={type}
                  release_date={el.release_date}
                  id={el.id}
                  name={el.name}
                  first_air_date={el.first_air_date}
                />
              );
            })}
          </Grid>
        </>
      ) : null}
      {searchData ? (
        <Box d="flex" justifyContent={"center"} py="10">
          <Button
            onClick={() => {
              setPage((prev) => {
                if (prev !== 1) {
                  return prev - 1;
                }
                return prev;
              });
              window.scrollTo(0, resultContainerRef.current.offsetTop || 0);
            }}
            disabled={page === 1}
            mx="4"
          >
            Prev
          </Button>
          <Button
            onClick={() => {
              setPage((prev) => prev + 1);
              window.scrollTo(0, resultContainerRef.current.offsetTop || 0);
            }}
          >
            Next
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export default MovieInput;
