import React, { useRef } from "react";
import { Box, Button, useColorMode, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import NavDrawer from "./Drawer";
const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  //   const NavbarBg = useColorModeValue("blue.600", "violet");

  const navigate = useNavigate();

  // const color = useColorModeValue("#ba8fff");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnref = useRef();

  return (
    <>
      <Box
        className="nav"
        // className={boxshadowclass}
        minHeight={"10vh"}
        d="flex"
        justifyContent={"space-between"}
        alignItems="center"
        px="4"
        position={"fixed"}
        width="100%"
        color={"#ba8fff"}
        top={0}
        zIndex={"100"}
      >
        <Box
          cursor={"pointer"}
          onClick={() => navigate("/")}
          fontSize={"2xl"}
          fontWeight={"bold"}
          display={["none", "block"]}
        >
          Movie DB
        </Box>
        <Box
          cursor={"pointer"}
          onClick={() => navigate("/search")}
          fontSize={"2xl"}
          fontWeight={"bold"}
          display={["none", "block"]}
        >
          Search
        </Box>
        <HamburgerIcon
          onClick={onOpen}
          cursor={"pointer"}
          ref={btnref}
          display={["block", "none"]}
          height={"2rem"}
          fontSize="2rem"
        />
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "dark" : "light"}
        </Button>
      </Box>
      <NavDrawer onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default Navbar;
