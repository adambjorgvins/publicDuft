import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from "./landing";
import { DuftbarMenu } from "./Vending";
import styled from "styled-components";

const PASSWORD = "987654321";

export const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Rangt lykilorð");
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            true ? (
              <Landing />
            ) : (
              <Container>
                <h1>Coming Soon</h1>
                <form onSubmit={handleSubmit}>
                  <Input
                    type="password"
                    placeholder="Sláðu inn lykilorð..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <Button type="submit">Staðfesta</Button>
                </form>
              </Container>
            )
          }
        />

        <Route path="/vending" element={<DuftbarMenu />} />
      </Routes>
    </Router>
  );
};

export default App;

// Styled Components
const Container = styled.div`
  height: 100vh;
  background: #0b0d13;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  margin-top: 12px;
  width: 240px;
  text-align: center;
`;

const Button = styled.button`
  padding: 12px 24px;
  margin-top: 12px;
  font-size: 16px;
  background: white;
  color: #0b0d13;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;
