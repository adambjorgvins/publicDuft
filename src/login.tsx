import React, { useState } from "react";
import styled from "styled-components";
import { Page, Card, H1, Lead, SolidBtn } from "./primatives";

const CenterWrap = styled(Page)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => (theme as any).bg};
`;

const LoginCard = styled(Card)`
  max-width: 400px;
  width: 100%;
  padding: 40px;
  aspect-ratio: auto;
  text-align: center;
`;

const PinInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid ${({ theme }) => (theme as any).cardBorder};
  border-radius: 14px;
  background: ${({ theme }) => (theme as any).card};
  color: ${({ theme }) => (theme as any).text};
  font-size: 16px;
  margin: 20px 0;
  outline: none;
  font-family: inherit;
`;

const Error = styled.p`
  color: #ef4444;
  margin-top: 12px;
  font-size: 14px;
`;

export default function Login({ onSuccess }: { onSuccess: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "worldfit2026") {
      localStorage.setItem("duftbarPass", "true");
      onSuccess();
    } else {
      setError("Rangt pinnnnnnnn 😅");
    }
  };

  return (
    <CenterWrap>
      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <form onSubmit={handleSubmit}>
          <H1>Innskráning</H1>
          <Lead>Sláðu inn PIN til að halda áfram</Lead>
          <PinInput
            type="password"
            placeholder="PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
          <SolidBtn as="button" type="submit">
            Inn
          </SolidBtn>
          {error && <Error>{error}</Error>}
        </form>
      </LoginCard>
    </CenterWrap>
  );
}
