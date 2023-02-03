import { Box, Button, Code, Container, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFile } from "../action/actions";
import { DoURL, URL } from "../configs";
import { FcOpenedFolder } from "react-icons/fc";

function FileInfo() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getFile(id));
    }
  }, [id]);

  const state = useSelector((state) => state.file);
  console.log(state);
  const downloadURL = DoURL + state.data?.fileinfo?.filename;
  console.log(downloadURL);
  return (
    <Container
      maxW={"container.md"}
      justifyContent={"center"}
      alignItems="center"
    >
      <Box
        shadow={"lg"}
        p={10}
        display={"flex"}
        flexDirection="column"
        justifyContent={"center"}
        alignItems="center"
      >
        <Heading fontWeight={"medium"}>Your file is ready!</Heading>
        <Text>File size : {state.data?.fileinfo?.filesize}</Text>
        <Button mt={4} leftIcon={<FcOpenedFolder />} colorScheme={"linkedin"}>
          <a href={downloadURL} download="file" target="_blank">
            Open
          </a>
        </Button>
        <Code mt={2} bgColor={"linkedin.400"}>
          Uploaded @ {state.data?.fileinfo?.createdAt}
        </Code>
      </Box>
    </Container>
  );
}

export default FileInfo;
