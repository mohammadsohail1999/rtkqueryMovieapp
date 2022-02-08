import { Grid, GridItem, Skeleton } from "@chakra-ui/react";
import React from "react";

const CardSkeleton = ({ length, height }) => {
  const skeletonArr = Array.from(Array(length).keys());

  return (
    <Grid
      px={["10", "20", "24"]}
      paddingTop={"20"}
      templateColumns={[
        "repeat(1,1fr)",
        "repeat(2,1fr)",
        "repeat(3,1fr)",
        "repeat(4,1fr)",
      ]}
      gap={9}
    >
      {skeletonArr.map((el, i) => (
        <GridItem px={["2", "5", "5"]} key={i} w="100%" h={height}>
          <Skeleton borderRadius={"10"} height={"100%"} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default CardSkeleton;
