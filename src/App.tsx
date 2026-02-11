import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { light, dark } from "./theme";
import { GlobalStyle } from "./global-styles";
import DuftbarPage from "./duftbar-page";
import Login from "./login";

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("duftbar-theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (localStorage.getItem("duftbarPass") === "true") {
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("duftbar-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const theme = isDark ? dark : light;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              authed ? (
                <DuftbarPage />
              ) : (
                <Login onSuccess={() => setAuthed(true)} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
