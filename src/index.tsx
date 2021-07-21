import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastProvider } from "@trycourier/react-toast";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
