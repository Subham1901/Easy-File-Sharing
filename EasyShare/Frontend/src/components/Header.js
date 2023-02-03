import { Box, Heading, Image } from "@chakra-ui/react";
import React from "react";
import share from "../assets/share.png";
function Header() {
  return (
    <Box
      display={"flex"}
      alignItems="center"
      justifyContent="center"
      p={5}
      borderRadius="lg"
      shadow={"lg"}
    >
      <a href="/">
        <Image cursor={"pointer"} height={20} src={share}></Image>
      </a>
      <Heading fontSize={"5xl"} color={"linkedin.400"}>
        .
      </Heading>
    </Box>
  );
}

export default Header;
