import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Puff } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { useGetMoviesDetailsQuery } from "../service/MovieApi";
import { mintohrmin } from "../utils/commonfunctions";
import CastCarouel from "./CastCarouel";

const TvDetails = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError } = useGetMoviesDetailsQuery(
    { id, type: "tv" },
    { skip: false }
  );

  if (isFetching) {
    return (
      <Box
        height={"90vh"}
        d="flex"
        justifyContent={"center"}
        alignItems="center"
      >
        <Puff color="#ba8fff" height={550} width={80} />
      </Box>
    );
  }

  return (
    <>
      {data ? (
        <>
          <Box
            mt="70"
            minHeight={"88vh"}
            w="100%"
            className="details_wrapper"
            backgroundImage={`url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${data?.backdrop_path}")`}
            backgroundRepeat="no-repeat"
            backgroundSize={"cover"}
            backgroundPosition="right -200px top"
          >
            <Box
              bgImage={
                "linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) 150px, rgba(31.5, 31.5, 31.5, 0.84) 100%)"
              }
              d="flex"
              minHeight="88vh"
              p="1rem 1.5rem"
              alignItems={"center"}
              flexDirection={["column", "column", "row", "row"]}
            >
              <Box
                as="img"
                src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                height="450px"
              ></Box>
              <Box
                pt="16"
                pl={["0", "0", "10", "10"]}
                alignSelf={["initial", "initial", "flex-start", "flex-start"]}
                fontWeight="bold"
              >
                <Text fontSize={"4xl"}>
                  {data.title} ({data.first_air_date.split("-")[0]})
                </Text>
                <Box mt="2">
                  <Text>
                    Duration:{" "}
                    {data.episode_run_time
                      ? mintohrmin(data.episode_run_time[0])
                      : "N/A"}{" "}
                  </Text>
                </Box>
                <Box mt="4">
                  <Box d="flex" alignItems={"center"}>
                    <Box
                      d="flex"
                      color="white"
                      justifyContent={"center"}
                      alignItems={"center"}
                      borderRadius={"50%"}
                      bg={
                        data.vote_average * 10 >= 80
                          ? "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)"
                          : data.vote_average * 10 < 80 &&
                            data.vote_average * 10 >= 50
                          ? "linear-gradient(62deg,#fbab7e,#f7ce68)"
                          : "linear-gradient(180deg, rgba(131,58,180,1) 5%, rgba(253,29,29,1) 9%, rgba(252,176,69,1) 100%)"
                      }
                      h="16"
                      w="16"
                      fontSize={"2xl"}
                    >
                      {data.vote_average * 10}%
                    </Box>
                    <Text fontSize={"md"} ml="2">
                      User Score
                    </Text>
                  </Box>
                  <Text fontWeight={"thin"} mt="6" fontStyle={"italic"}>
                    {data.tagline}
                  </Text>
                  <Box mt="6">
                    <Text fontSize={"lg"}>Overview</Text>
                    <Text mt="4" fontWeight={"light"}>
                      {data.overview}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Text textAlign={"center"} mt="4" fontWeight={"bold"} fontSize="3xl">
            Cast
          </Text>
          <Box mt="6">
            <CastCarouel castArr={data.credits.cast} />
          </Box>
        </>
      ) : null}
    </>
  );
};

export default TvDetails;
