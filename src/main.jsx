import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/index.js";
import { Toaster } from "react-hot-toast";
import { ChakraProvider, theme } from "@chakra-ui/react";

const store = configureStore({
  reducer: rootReducer,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
        <Toaster />
      </ChakraProvider>
    </BrowserRouter>
  </Provider>
);
