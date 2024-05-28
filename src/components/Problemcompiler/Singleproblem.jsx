import React from "react";
import { Box } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import CodeEditor from "./CodeEditor";

const Singleproblem = () => {
  const location = useLocation();
  const problemid = String(location.pathname.split("/").at(-1)); //String(location.pathname..........) because to read id as a string

  return (
    <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
      <CodeEditor problemid={problemid} />
    </Box>
  );
};

export default Singleproblem;
