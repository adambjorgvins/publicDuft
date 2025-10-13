import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DuftbarPage from "./duftbar-page";
import Login from "./login";
export default function App() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("duftbar-auth") === "true") {
      setAuthed(true);
    }
  }, []);

  return (
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
  );
}
