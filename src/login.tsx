import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Page, SolidBtn } from "./primatives";
import { Logo } from "./logo";

/* Animated gradient background */
const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const CenterWrap = styled(Page)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => (theme as any).bg};
  position: relative;
  overflow: hidden;
  padding: 20px;

  /* Animated gradient orbs */
  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background:
      radial-gradient(
        ellipse at 20% 30%,
        ${({ theme }) =>
            (theme as any).mode === "dark"
              ? "rgba(99, 102, 241, 0.15)"
              : "rgba(99, 102, 241, 0.08)"}
          0%,
        transparent 50%
      ),
      radial-gradient(
        ellipse at 80% 70%,
        ${({ theme }) =>
            (theme as any).mode === "dark"
              ? "rgba(236, 72, 153, 0.15)"
              : "rgba(236, 72, 153, 0.08)"}
          0%,
        transparent 50%
      ),
      radial-gradient(
        ellipse at 50% 50%,
        ${({ theme }) =>
            (theme as any).mode === "dark"
              ? "rgba(16, 185, 129, 0.1)"
              : "rgba(16, 185, 129, 0.05)"}
          0%,
        transparent 50%
      );
    animation: ${pulse} 8s ease-in-out infinite;
    pointer-events: none;
  }
`;

const GlassCard = styled(motion.div)`
  max-width: 420px;
  width: 100%;
  padding: 48px 40px;
  text-align: center;
  position: relative;
  z-index: 1;

  /* Glassmorphism effect */
  background: ${({ theme }) =>
    (theme as any).mode === "dark"
      ? "rgba(15, 15, 16, 0.8)"
      : "rgba(255, 255, 255, 0.85)"};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid
    ${({ theme }) =>
      (theme as any).mode === "dark"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.08)"};
  border-radius: 28px;
  box-shadow: ${({ theme }) =>
    (theme as any).mode === "dark"
      ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) inset"
      : "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.8) inset"};

  @media (max-width: 480px) {
    padding: 36px 24px;
    border-radius: 24px;
    max-width: 100%;
  }
`;

const LogoWrap = styled(motion.div)`
  margin-bottom: 28px;
  display: flex;
  justify-content: center;
  animation: ${float} 4s ease-in-out infinite;
`;

const Title = styled.h1`
  font-size: clamp(1.75rem, 5vw, 2.25rem);
  font-weight: 800;
  color: ${({ theme }) => (theme as any).text};
  margin: 0 0 8px 0;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: clamp(0.9rem, 3vw, 1rem);
  color: ${({ theme }) => (theme as any).subtleText};
  margin: 0 0 32px 0;
  line-height: 1.5;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

const PinInput = styled.input`
  width: 100%;
  padding: 18px 20px 18px 52px;
  border: 2px solid
    ${({ theme }) =>
      (theme as any).mode === "dark"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.08)"};
  border-radius: 16px;
  background: ${({ theme }) =>
    (theme as any).mode === "dark"
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(0, 0, 0, 0.02)"};
  color: ${({ theme }) => (theme as any).text};
  font-size: 16px;
  outline: none;
  font-family: inherit;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme }) => (theme as any).subtleText};
    opacity: 0.7;
  }

  &:focus {
    border-color: ${({ theme }) =>
      (theme as any).mode === "dark"
        ? "rgba(99, 102, 241, 0.6)"
        : "rgba(99, 102, 241, 0.5)"};
    background: ${({ theme }) =>
      (theme as any).mode === "dark"
        ? "rgba(255, 255, 255, 0.08)"
        : "rgba(255, 255, 255)"};
    box-shadow: 0 0 0 4px
      ${({ theme }) =>
        (theme as any).mode === "dark"
          ? "rgba(99, 102, 241, 0.15)"
          : "rgba(99, 102, 241, 0.1)"};
  }

  @media (max-width: 480px) {
    padding: 16px 18px 16px 48px;
    font-size: 16px; /* Prevents zoom on iOS */
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => (theme as any).subtleText};
  display: flex;
  align-items: center;
  pointer-events: none;
`;

const SubmitButton = styled(SolidBtn)`
  width: 100%;
  padding: 18px 24px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 16px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  background: linear-gradient(
    135deg,
    ${({ theme }) => (theme as any).text} 0%,
    ${({ theme }) => ((theme as any).mode === "dark" ? "#e5e5e5" : "#333")} 100%
  );
  background-size: 200% 200%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px -10px
      ${({ theme }) =>
        (theme as any).mode === "dark"
          ? "rgba(255, 255, 255, 0.3)"
          : "rgba(0, 0, 0, 0.3)"};
    background-position: 100% 100%;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    padding: 16px 20px;
  }
`;

const ErrorMessage = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
  padding: 12px 16px;
  background: ${({ theme }) =>
    (theme as any).mode === "dark"
      ? "rgba(239, 68, 68, 0.15)"
      : "rgba(239, 68, 68, 0.1)"};
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 12px;
  color: #ef4444;
  font-size: 14px;
  font-weight: 500;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 28px 0;
  gap: 16px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${({ theme }) =>
      (theme as any).mode === "dark"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.08)"};
  }

  span {
    font-size: 12px;
    color: ${({ theme }) => (theme as any).subtleText};
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;

const Footer = styled.p`
  margin-top: 24px;
  font-size: 13px;
  color: ${({ theme }) => (theme as any).subtleText};
  opacity: 0.8;
`;

export default function Login({ onSuccess }: { onSuccess: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate brief loading for smooth UX
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (pin === "duftbar1234") {
      localStorage.setItem("duftbarPass", "true");
      onSuccess();
    } else {
      setError("Rangt lykilorð 🔐");
      setIsLoading(false);
    }
  };

  return (
    <CenterWrap>
      <GlassCard
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <LogoWrap
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "backOut" }}
        >
          <Logo size={64} />
        </LogoWrap>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Title>Velkomin/n</Title>
          <Subtitle>Sláðu inn aðgangsorð til að halda áfram</Subtitle>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <InputWrapper>
            <InputIcon>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </InputIcon>
            <PinInput
              type="password"
              placeholder="Aðgangsorð"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              autoFocus
            />
          </InputWrapper>

          <SubmitButton as="button" type="submit" disabled={isLoading}>
            {isLoading ? "Augnablik..." : "Innskrá"}
          </SubmitButton>

          <AnimatePresence>
            {error && (
              <ErrorMessage
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </ErrorMessage>
            )}
          </AnimatePresence>
        </motion.form>

        <Divider>
          <span>duftbar</span>
        </Divider>

        <Footer>Aðeins fyrir fjárfesta og teymi 🚀</Footer>
      </GlassCard>
    </CenterWrap>
  );
}
