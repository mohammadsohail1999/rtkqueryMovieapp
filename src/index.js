import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { storeRTK } from "./storeForRTK";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import "@fontsource/raleway/400.css";
import "@fontsource/montserrat/700.css";

import theme from "./utils/theme";

ReactDOM.render(
  <>
    <ChakraProvider theme={theme}>
      <Provider store={storeRTK}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </Provider>
    </ChakraProvider>
  </>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
