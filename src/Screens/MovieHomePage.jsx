import { Box, Button, Grid, Badge, HStack, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import CardSkeleton from "../Components/CardSkeleton";
import MovieCard from "../Components/MovieCard";
import { useGetMoviesorTVQuery } from "../service/MovieApi";
const MovieFilterArr = [
  {
    name: "Popular",
    slug: "popular",
  },
  {
    name: "Top rated",
    slug: "top_rated",
  },
  {
    name: "Upcoming",
    slug: "upcoming",
  },
  {
    name: "Now Playing",
    slug: "now_playing",
  },
];
const ShowsFilterArr = [
  {
    name: "Popular",
    slug: "popular",
  },
  {
    name: "Top Rated",
    slug: "top_rated",
  },
  {
    name: "On The Air",
    slug: "on_the_air",
  },
];

const MovieHomePage = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("popular");
  const [category, setCategory] = useState("Popular");
  const [type, setType] = useState("movie");

  const {
    data: popularMovies,
    isFetching,
    isLoading,
  } = useGetMoviesorTVQuery(
    {
      page,
      type,
      filter,
    },
    { skip: false }
  );

  return (
    <>
      <Box
        d="flex"
        justifyContent={"space-between"}
        flexDir={["column", "column", "row", "row"]}
        mt="32"
        px={["5", "10", "20"]}
        alignItems={["center"]}
      >
        <HStack flex={"2"} spacing={["0.5rem", "1rem", "2rem"]}>
          {type === "movie"
            ? MovieFilterArr.map((el) => (
                <Badge
                  cursor={"pointer"}
                  onClick={() => {
                    setCategory(el.name);
                    setFilter(el.slug);
                    setPage(1);
                  }}
                  padding={["10px 5px", "10px 15px", "10px 20px"]}
                  key={el.name}
                  colorScheme={filter === el.slug ? "green" : "purple"}
                >
                  {el.name}
                </Badge>
              ))
            : ShowsFilterArr.map((el) => (
                <Badge
                  cursor={"pointer"}
                  onClick={() => {
                    setCategory(el.name);
                    setFilter(el.slug);
                    setPage(1);
                  }}
                  padding={"10px 20px"}
                  key={el.name}
                  colorScheme={filter === el.slug ? "green" : "purple"}
                >
                  {el.name}
                </Badge>
              ))}
        </HStack>

        <Select
          marginTop={["10", "10", "0"]}
          marginLeft={["0", "0", "10"]}
          onChange={(e) => {
            setType(e.target.value);
            setPage(1);
            setFilter("popular");
            setCategory("Popular");
          }}
          flex={"1"}
          value={type}
        >
          <option value="movie">Movie</option>
          <option value="tv">TV</option>
        </Select>
      </Box>
      <Box
        mt="10"
        d="flex"
        alignItems={"center"}
        justifyContent="center"
        fontSize={["2xl", "2xl", "3xl"]}
        fontWeight="bold"
      >
        {type === "movie" ? `${category} Movies` : `${category} Shows`}
      </Box>

      {isLoading ? <CardSkeleton length={20} height={"230px"} /> : null}
      {!isFetching ? (
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
            {popularMovies?.results.map((el) => {
              return (
                <MovieCard
                  key={el.id}
                  backdrop_path={el.backdrop_path}
                  poster_path={el.poster_path}
                  vote_average={el.vote_average}
                  title={el.title}
                  name={el?.name}
                  type={type}
                  first_air_date={el.first_air_date}
                  release_date={el.release_date}
                  id={el.id}
                />
              );
            })}
          </Grid>
        </>
      ) : (
        <CardSkeleton length={20} height={"230px"} />
      )}
      {!isLoading ? (
        <Box d="flex" justifyContent={"center"} py="10">
          <Button
            onClick={() => {
              setPage((prev) => prev - 1);
            }}
            disabled={page === 1}
            mx="4"
          >
            Prev
          </Button>
          <Button
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
          >
            Next
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export default MovieHomePage;
