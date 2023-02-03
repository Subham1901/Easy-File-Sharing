import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Code,
  FormLabel,
  Heading,
  Input,
  Link,
  Spinner,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdAttachEmail } from "react-icons/md";
import "../style.css";
import { useDispatch, useSelector } from "react-redux";
import { IoIosShareAlt } from "react-icons/io";
import { uploadFile, sendMail } from "../action/actions";
import { AiFillFile } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
import { URL } from "../configs";
import ShowCorrespondence from "./ShowCorrespondence";

function Form() {
  const toast = useToast();
  const dispatch = useDispatch();

  const fileInput = React.useRef(null);
  const [file, setFile] = useState();
  //data
  const state = useSelector((state) => state.file);

  //handle file upload
  const handleUpload = (event) => {
    fileInput.current.click();
  };

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };
  //handle form data
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      dispatch(uploadFile(formData));
    } else {
      toast({
        status: "warning",
        duration: 2000,
        position: "top-right",
        description: "Please choose file",
      });
    }
  };

  if (state.data) {
    const hrefUrl = `${URL}${state.data._id}`;
    return (
      <ShowCorrespondence
        key={state.data._id}
        state={state}
        hrefUrl={hrefUrl}
      />
    );
  }
  if (state.loading) {
    return (
      <Box display={"flex"} justifyContent="center" alignItems={"center"}>
        <Spinner
          mt={50}
          thickness="4px"
          speed="0.65s"
          emptyColor="black"
          color="white"
          size="xl"
        />
      </Box>
    );
  }

  if (state.error) {
    return (
      <Box shadow="xl">
        <Alert status="error" mt={10} textAlign={"center"} color="red">
          <AlertIcon />
          {state.error.response.data.message}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      m={"4rem auto !important"}
      borderRadius={"xl"}
      shadow={"2xl"}
      width={"sm"}
      p={10}
    >
      <VStack>
        <Heading
          letterSpacing={"wide"}
          textTransform={"uppercase"}
          fontSize={"2xl"}
          color="gray.400"
        >
          Upload your file
        </Heading>
        <form onSubmit={handleFormSubmit}>
          <VStack>
            <Input
              ref={fileInput}
              onChange={handleChange}
              className="input"
              id="fileInput"
              type="file"
            ></Input>
            <Button
              w={"xs"}
              className="upload"
              onClick={handleUpload}
              leftIcon={<AiFillFile />}
              mt={"5 !important"}
              colorScheme={"linkedin"}
            >
              Browse
            </Button>
            {file && <Text>{file.name}</Text>}
            <Button
              w={"xs"}
              colorScheme={"linkedin"}
              leftIcon={<IoIosShareAlt />}
              type="submit"
            >
              Share
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
}

export default Form;
