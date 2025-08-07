import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  "html, body, #root": {
    height: "100%",
    fontFamily: '"Inter", sans-serif',
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    minHeight: "100vh",
    width: "100%",
    scrollBehavior: "smooth",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
