import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { CourierProvider } from "@trycourier/react-provider";

import App from "./App";

const COURIER_CLIENT_KEY = process.env.REACT_APP_COURIER_CLIENT_KEY;
const COURIER_USER_ID =
  localStorage.getItem("COURIER_USER_ID") ||
  Math.round(Math.random() * 10e16).toString(36);

localStorage.setItem("COURIER_USER_ID", COURIER_USER_ID);

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <CourierProvider clientKey={COURIER_CLIENT_KEY} userId={COURIER_USER_ID}>
        <App courierUserId={COURIER_USER_ID} />
      </CourierProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
