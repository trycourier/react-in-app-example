import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Toast } from "@trycourier/react-toast";
import { CourierProvider } from "@trycourier/react-provider";

import App from "./App";

const COURIER_CLIENT_KEY = "";
const COURIER_USER_ID = "";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <CourierProvider clientKey={COURIER_CLIENT_KEY} userId={COURIER_USER_ID}>
        <Toast />

        <App />
      </CourierProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
