import { Container } from "@chakra-ui/react";
import React from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileInfo from "./components/FileInfo";

function App() {
  return (
    <Container maxW={"container.xl"}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/:id" element={<FileInfo />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
