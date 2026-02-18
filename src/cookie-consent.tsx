import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const CONSENT_KEY = "duftbar-cookie-consent";

const ConsentBanner = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 20px 24px;
  z-index: 10000;

  /* Glassmorphism effect */
  background: ${({ theme }) =>
    (theme as any).mode === "dark"
      ? "rgba(20, 20, 22, 0.98)"
      : "rgba(255, 255, 255, 0.98)"};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid
    ${({ theme }) =>
      (theme as any).mode === "dark"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.08)"};
  box-shadow: ${({ theme }) =>
    (theme as any).mode === "dark"
      ? "0 -10px 40px -12px rgba(0, 0, 0, 0.6)"
      : "0 -10px 40px -12px rgba(0, 0, 0, 0.15)"};

  @media (max-width: 640px) {
    padding: 14px 16px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 1400px;
  margin: 0 auto;

  @media (min-width: 641px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }
`;

const TextSection = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  margin: 0 0 6px 0;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => (theme as any).text};
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 640px) {
    font-size: 14px;
    margin-bottom: 4px;
  }
`;

const CookieIcon = styled.span`
  font-size: 20px;

  @media (max-width: 640px) {
    font-size: 18px;
  }
`;

const Description = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => (theme as any).subtleText};
  opacity: 0.9;

  @media (max-width: 640px) {
    font-size: 13px;
    line-height: 1.5;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-shrink: 0;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const Button = styled(motion.button)<{ $variant?: "primary" | "secondary" }>`
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  white-space: nowrap;

  ${({ $variant, theme }) =>
    $variant === "primary"
      ? `
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);

    &:hover {
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  `
      : `
    background: ${
      (theme as any).mode === "dark"
        ? "rgba(255, 255, 255, 0.08)"
        : "rgba(0, 0, 0, 0.05)"
    };
    color: ${(theme as any).subtleText};
    border: 1px solid ${
      (theme as any).mode === "dark"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.1)"
    };

    &:hover {
      background: ${
        (theme as any).mode === "dark"
          ? "rgba(255, 255, 255, 0.12)"
          : "rgba(0, 0, 0, 0.08)"
      };
    }
  `}

  @media (max-width: 640px) {
    width: 100%;
    padding: 10px 20px;
    font-size: 13px;
  }
`;

const LearnMoreLink = styled.a`
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
}

export function CookieConsent({ onAccept, onDecline }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // Show banner after a brief delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setIsVisible(false);
    onAccept();
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setIsVisible(false);
    onDecline();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <ConsentBanner
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Content>
            <TextSection>
              <Title>
                <CookieIcon>🍪</CookieIcon>
                Vefkökur
              </Title>
              <Description>
                Notum Google Analytics til að fylgjast með notkun.{" "}
                <LearnMoreLink
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Lesa meira
                </LearnMoreLink>
              </Description>
            </TextSection>
            <ButtonGroup>
              <Button
                $variant="secondary"
                onClick={handleDecline}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Hafna
              </Button>
              <Button
                $variant="primary"
                onClick={handleAccept}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Samþykkja
              </Button>
            </ButtonGroup>
          </Content>
        </ConsentBanner>
      )}
    </AnimatePresence>
  );
}

export function getCookieConsent(): "accepted" | "declined" | null {
  const consent = localStorage.getItem(CONSENT_KEY);
  if (consent === "accepted") return "accepted";
  if (consent === "declined") return "declined";
  return null;
}
