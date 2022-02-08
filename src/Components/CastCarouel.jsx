import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import CastCard from "./CastCard";

const CastCarouel = ({ castArr }) => {
  const responsive = {
    0: {
      items: 1,
    },
    340: {
      items: 2,
    },
    768: {
      items: 4,
    },
    1024: {
      items: 6,
    },
  };

  const castCardComponentArr = castArr.map((el) => {
    return (
      <CastCard
        imgSrc={el.profile_path}
        key={el.name}
        characterName={el.character}
        actorName={el.original_name}
      />
    );
  });

  return (
    <>
      <AliceCarousel
        mouseTracking
        responsive={responsive}
        items={castCardComponentArr}
        disableDotsControls
        renderDotsItem={false}
        autoPlay
        autoPlayInterval={600}
        disableButtonsControls
        infinite
      />
    </>
  );
};

export default CastCarouel;
