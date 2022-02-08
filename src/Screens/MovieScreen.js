import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../Components/Navbar";

const MovieScreen = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MovieScreen;
