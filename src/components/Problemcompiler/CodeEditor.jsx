import { useEffect, useRef, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  VStack,
  Text,
  Heading,
  toCSSObject,
} from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";
import { CODE_SNIPPETS } from "./api_and_language/constants";
import { getProblembyid } from "../../services/operations/authAPI";

const CodeEditor = (problemid) => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [problem, setproblem] = useState(null);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const getProblem = async () => {
    try {
      const data = problemid;
      const response = await getProblembyid(data.problemid);
      setproblem(response.data.problem);
      console.log("---------------------->>>>>>>>>", problem);
    } catch (error) {
      console.error("Unable to Fetch problem:", error); // More informative error handling
    }
  };
  useEffect(() => {
    getProblem();
  }, [problemid]);

  return (
    <Box p={4}>
      <Grid templateColumns="1fr 2fr" gap={4}>
        {/* Left Column: Problem Statement */}
        <GridItem>
          <VStack align="start" spacing={4}>
            <Box>
              <Heading size="md">{problem?.title}</Heading>
              <Text mt={1} fontSize="md" color="gray.500">
                Difficulty: {problem?.difficulty}
              </Text>
              <Text mt={2}>{problem?.description}</Text>
            </Box>
            <Box>
              <Heading size="sm">Input Format</Heading>
              <Text mt={2}>{problem?.inputformat}</Text>
            </Box>
            <Box>
              <Heading size="sm">Output Format</Heading>
              <Text mt={2}>{problem?.outputformat}</Text>
            </Box>
            <Box>
              <Heading size="sm">EXAMPLE</Heading>
              <Text mt={2}>
                <strong>Sample 1 INPUT:</strong>
              </Text>
              <Text>{problem?.sampleinput1}</Text>
              <Text mt={2}>
                <strong>Sample 1 OUTPUT:</strong>
              </Text>
              <Text>{problem?.sampleoutput1}</Text>
            </Box>
          </VStack>
        </GridItem>

        {/* Right Column: Code Editor and Output */}
        <GridItem>
          <VStack spacing={4} align="stretch">
            <Box>
              <LanguageSelector language={language} onSelect={onSelect} />
            </Box>
            <Box>
              <Editor
                options={{
                  minimap: {
                    enabled: false,
                  },
                }}
                height="40vh"
                theme="vs-blue"
                language={language}
                defaultValue={CODE_SNIPPETS[language]}
                onMount={onMount}
                value={value}
                onChange={(value) => setValue(value)}
              />
            </Box>
            <Box>
              <Output height="10vh" editorRef={editorRef} language={language} />
            </Box>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CodeEditor;
