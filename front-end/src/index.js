import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { ChakraProvider } from "@chakra-ui/react";

// setup navigation
import { BrowserRouter } from "react-router-dom";

// setup redux
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ChakraProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ChakraProvider>
  </Provider>
);