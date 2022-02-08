import { Box, GridItem, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({
  title,
  backdrop_path,
  original_language,
  release_date,
  first_air_date,
  vote_average,
  poster_path,
  type,
  name,
  id,
}) => {
  const navigate = useNavigate();

  return (
    <GridItem w="100%" padding={["4", "4", "3"]}>
      {/* <Fade in={fade}> */}
      <Box
        borderRadius={"10"}
        overflow={"hidden"}
        cursor={"pointer"}
        position={"relative"}
        className="card_wrapper"
        _hover={{
          "& .card_image": {
            transform: "scale(1.2)",
            transition: "all 1s ease",
          },
          "& .card_overlay": {
            transform: "scale(1)",
            transition: "all .5s ease",
          },
        }}
      >
        <Image
          className="card_image"
          _hover={{
            transform: "scale(1.1)",
            transition: "all 1s ease",
          }}
          height={"100%"}
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg"
          }
          alt={type === "movie" ? title : name}
        />
        <Box
          borderRadius={"full"}
          padding={"1"}
          d="flex"
          justifyContent={"center"}
          alignItems={"center"}
          bg={"gray.900"}
          top="4"
          color="whiteAlpha.800"
          right={"2"}
          position={"absolute"}
          width="14"
          height={"14"}
          fontWeight="bold"
          border={"ThreeDShadow"}
        >
          {vote_average}
        </Box>
        {/* <Box
          className="card_overlay"
          position={"absolute"}
          background={"rgba(0,0,0,0.6)"}
          height="100%"
          width={"100%"}
          top={"0"}
          left={"0"}
          transform={"scale(0)"}
          d="flex"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text fontSize={"medium"} fontWeight="bold">
            {type === "movie" ? title : name}
          </Text>
        </Box> */}
      </Box>
      <Box cursor={"pointer"} mt="5">
        <Text
          fontSize={"medium"}
          fontWeight="bold"
          _hover={{ color: "blue.100" }}
          onClick={() => {
            type === "movie" ? navigate(`/movie/${id}`) : navigate(`/tv/${id}`);
          }}
        >
          {type === "movie" ? title : name}
        </Text>
        <Text fontSize={"small"} fontWeight="semibold">
          {type === "movie" ? release_date : first_air_date}
        </Text>
      </Box>
    </GridItem>
  );
};

export default MovieCard;
