import React, { useState } from "react";
import { URL } from "../configs";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Code,
  Heading,
  Input,
  Link,
  Icon,
  useToast,
  InputRightAddon,
  InputGroup,
} from "@chakra-ui/react";
import validator from "validator";
import { MdAttachEmail } from "react-icons/md";
import "../style.css";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineContentCopy } from "react-icons/md";
import { sendMail } from "../action/actions";
function ShowCorrespondence({ hrefUrl, state }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const [copySuccess, setCopySuccess] = useState("");
  const [maildata, setMailData] = useState({
    from: "",
    to: "",
  });
  const correspondence = useSelector((state) => state.correspondence);
  //handle mail info
  const handleMailData = (event) => {
    setMailData({ ...maildata, [event.target.name]: event.target.value });
  };
  //dispatch mail send action
  const sendCorrespondence = (event) => {
    event.preventDefault();
    if (!validator.isEmail(maildata.from) || !validator.isEmail(maildata.to)) {
      return toast({
        status: "error",
        description: "Invalid recipient/sender",
        duration: 2000,
        position: "top-right",
      });
    }
    dispatch(sendMail(state.data._id, maildata));
    setMailData({
      from: "",
      to: "",
    });
  };
  function copyToClipboard(e) {
    navigator.clipboard
      .writeText(document.getElementById("site").value)
      .then((success) => {
        toast({
          status: "success",
          description: "Link copied to clipboard",
          position: "top-right",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Box
      shadow={"lg"}
      p={10}
      display={"flex"}
      flexDirection="column"
      justifyContent="center"
      alignItems={"center"}
    >
      <Box w={["xs", "sm"]}>
        <InputGroup>
          <Input
            id="site"
            isReadOnly
            outline={"none"}
            defaultValue={`${URL}${state.data._id}`}
          ></Input>
          <InputRightAddon>
            <Icon
              cursor={"pointer"}
              ml={4}
              boxSize={30}
              onClick={copyToClipboard}
              as={MdOutlineContentCopy}
            />
          </InputRightAddon>
        </InputGroup>
      </Box>

      <Box p={4} justifyContent={"center"} alignItems="center" display={"flex"}>
        <MdAttachEmail color="gray" size={50} />
      </Box>
      <Heading
        color={"gray.400"}
        textTransform="uppercase"
        textAlign="center"
        fontWeight={"medium"}
        fontSize="2xl"
      >
        Send correspondence
      </Heading>
      {correspondence.error && (
        <Box p={4}>
          <Alert
            borderRadius={"md"}
            status="error"
            mt={10}
            textAlign={"center"}
            color="red"
          >
            <AlertIcon />
            {correspondence.error.response.data.message}
          </Alert>
        </Box>
      )}
      <form onSubmit={sendCorrespondence}>
        <Input
          required
          mt={4}
          value={maildata.to}
          name="to"
          variant={"flushed"}
          onChange={handleMailData}
          placeholder="Recipient Email"
        ></Input>
        <Input
          required
          value={maildata.from}
          name="from"
          onChange={handleMailData}
          variant={"flushed"}
          placeholder="Sender Email"
        ></Input>
        <Button
          isLoading={correspondence?.loading}
          loadingText="Sending"
          type="submit"
          leftIcon={<IoIosSend />}
          width={"full"}
          mt={2}
          colorScheme={"linkedin"}
        >
          Send
        </Button>
      </form>
      {correspondence?.data?.mailResponse && (
        <Box>
          <Alert status="success" mt={10} textAlign={"center"} color="black">
            <AlertIcon />
            {correspondence.data.mailResponse}
          </Alert>
        </Box>
      )}
    </Box>
  );
}

export default ShowCorrespondence;
