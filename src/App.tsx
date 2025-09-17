import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DuftbarPage from "./duftbar-page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DuftbarPage />} />
      </Routes>
    </BrowserRouter>
  );
}
