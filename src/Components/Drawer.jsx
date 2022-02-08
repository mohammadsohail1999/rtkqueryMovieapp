import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const NavDrawer = ({ onClose, isOpen }) => {
  const navigate = useNavigate();

  return (
    <Drawer placement={"left"} onClose={onClose} size="xs" isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader
          borderBottomWidth="1px"
          onClick={() => {
            navigate("/");
            onClose();
          }}
          cursor="pointer"
        >
          Movie DB
        </DrawerHeader>
        <DrawerBody>
          <Box
            onClick={() => {
              navigate("/search");
              onClose();
            }}
            fontSize={"1.4rem"}
            fontWeight="bold"
            cursor={"pointer"}
          >
            Search
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default NavDrawer;
