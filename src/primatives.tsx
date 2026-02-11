// src/components/primitives.tsx
import styled from "styled-components";
import { motion } from "framer-motion";

/* Layout */
export const Page = styled.div`
  min-height: 100dvh;
  position: relative;
`;

export const StickyHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  background: ${({ theme }) =>
    (theme as any).mode === "dark"
      ? "rgba(10, 10, 10, 0.9)"
      : "rgba(255, 255, 255)"};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid
    ${({ theme }) =>
      (theme as any).mode === "dark"
        ? "rgba(255,255,255,0.06)"
        : "rgba(0,0,0,0.04)"};
  transform: translateZ(0);
  will-change: transform;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;

  @media (min-width: 768px) {
    padding: 0 48px;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
`;

export const Grid3 = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
`;

/* Header UI */
export const LogoMark = styled.div`
  position: relative;
  width: 28px;
  height: 28px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => (theme as any).cardBorder};
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    inset: -20%;
    background: conic-gradient(
      from 90deg,
      ${({ theme }) => (theme as any).text} 0deg,
      #999 120deg,
      transparent 180deg,
      transparent 360deg
    );
    opacity: 0.5;
    animation: spin 6s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(1turn);
    }
  }
`;

export const Nav = styled.nav`
  display: none;
  gap: 8px;

  @media (min-width: 768px) {
    display: flex;
  }

  a {
    position: relative;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: ${({ theme }) => (theme as any).subtleText};
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    padding: 10px 16px;
    border-radius: 100px;
  }

  a:hover {
    color: ${({ theme }) => (theme as any).text};
    background: ${({ theme }) =>
      (theme as any).mode === "dark"
        ? "rgba(255,255,255,0.06)"
        : "rgba(0,0,0,0.04)"};
  }
`;

export const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: transparent;
  border: 1px solid
    ${({ theme }) =>
      (theme as any).mode === "dark"
        ? "rgba(255,255,255,0.1)"
        : "rgba(0,0,0,0.08)"};
  border-radius: 12px;
  color: ${({ theme }) => (theme as any).text};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  font-size: 18px;

  &:hover {
    background: ${({ theme }) =>
      (theme as any).mode === "dark"
        ? "rgba(255,255,255,0.06)"
        : "rgba(0,0,0,0.04)"};
    transform: scale(1.02);
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export const ThemeToggleWrap = styled.div`
  display: flex;
  align-items: center;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: 1px solid
      ${({ theme }) =>
        (theme as any).mode === "dark"
          ? "rgba(255,255,255,0.1)"
          : "rgba(0,0,0,0.08)"};
    background: transparent;
    border-radius: 12px;
    color: ${({ theme }) => (theme as any).text};
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

    &:hover {
      background: ${({ theme }) =>
        (theme as any).mode === "dark"
          ? "rgba(255,255,255,0.06)"
          : "rgba(0,0,0,0.04)"};
      transform: scale(1.02);
    }
  }
`;

export const MobileMenu = styled(motion.nav)`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => (theme as any).bg};
  z-index: 100;
  display: flex;
  flex-direction: column;
  padding: 24px;

  button.close {
    align-self: flex-end;
    font-size: 32px;
    background: none;
    border: 0;
    cursor: pointer;
    margin-bottom: 40px;
    color: ${({ theme }) => (theme as any).text};
  }

  a {
    font-size: 28px;
    font-weight: 500;
    margin-bottom: 24px;
    color: ${({ theme }) => (theme as any).text};
    letter-spacing: -0.02em;
    transition: opacity 0.2s;
  }
  a:hover {
    opacity: 0.6;
  }
`;

export const HeaderActions = styled.div`
  display: none;
  gap: 8px;

  @media (min-width: 768px) {
    display: flex;
  }
`;

export const GhostBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid
    ${({ theme }) =>
      (theme as any).mode === "dark"
        ? "rgba(255,255,255,0.1)"
        : "rgba(0,0,0,0.08)"};
  background: transparent;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => (theme as any).text};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background: ${({ theme }) =>
      (theme as any).mode === "dark"
        ? "rgba(255,255,255,0.06)"
        : "rgba(0,0,0,0.04)"};
    transform: scale(1.02);
  }
`;

export const LinkBtn = styled.a`
  border: 1px solid ${({ theme }) => (theme as any).cardBorder};
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => (theme as any).text};
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background: ${({ theme }) => (theme as any).soft};
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

export const Hero = styled.section`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0;
  min-height: 100vh;
  min-height: 100dvh;
`;

export const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  background: ${({ theme }) => (theme as any).bg};
`;

/* Typography + Buttons */
export const H1 = styled(motion.h1)`
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 0.95;
  font-size: clamp(56px, 12vw, 140px);
`;
export const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Lead = styled(motion.div)`
  max-width: 540px;
  margin: 24px auto 0;
  font-size: clamp(16px, 2vw, 19px);
  color: ${({ theme }) => (theme as any).subtleText};
  line-height: 1.6;
  font-weight: 400;
  letter-spacing: -0.01em;
`;

export const Ctas = styled(motion.div)`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
`;

export const SolidBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.01em;
  border-radius: 100px;
  background: ${({ theme }) => (theme as any).text};
  color: ${({ theme }) => (theme as any).bg};
  border: none;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2) 0%,
      transparent 50%
    );
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: ${({ theme }) =>
      (theme as any).mode === "dark"
        ? "0 20px 40px -15px rgba(255,255,255,0.15)"
        : "0 20px 40px -15px rgba(0,0,0,0.25)"};
  }

  &:hover::before {
    opacity: 1;
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

export const OutlineBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.01em;
  border-radius: 100px;
  border: 1px solid
    ${({ theme }) =>
      (theme as any).mode === "dark"
        ? "rgba(255,255,255,0.2)"
        : "rgba(0,0,0,0.15)"};
  background: transparent;
  color: ${({ theme }) => (theme as any).text};
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  backdrop-filter: blur(10px);

  &:hover {
    background: ${({ theme }) =>
      (theme as any).mode === "dark"
        ? "rgba(255,255,255,0.08)"
        : "rgba(0,0,0,0.04)"};
    border-color: ${({ theme }) =>
      (theme as any).mode === "dark"
        ? "rgba(255,255,255,0.3)"
        : "rgba(0,0,0,0.25)"};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

/* Sections + Cards */
export const Section = styled.section<{ bordered?: boolean }>`
  ${(p) =>
    p.bordered ? `border-block:1px solid ${(p.theme as any).cardBorder};` : ""}
`;

export const Grid2 = styled.div`
  display: grid;
  gap: 32px;
  align-items: center;
  grid-template-columns: 1fr;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 64px;
  }
`;

export const Card = styled(motion.div)`
  position: relative;
  border: 1px solid
    ${({ theme }) =>
      (theme as any).mode === "dark"
        ? "rgba(255,255,255,0.08)"
        : "rgba(0,0,0,0.06)"};
  background: ${({ theme }) =>
    (theme as any).mode === "dark"
      ? "rgba(255,255,255,0.02)"
      : "rgba(0,0,0,0.01)"};
  border-radius: 24px;
  aspect-ratio: 4/5;
  color: ${({ theme }) => (theme as any).text};
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-8px);
    border-color: ${({ theme }) =>
      (theme as any).mode === "dark"
        ? "rgba(255,255,255,0.15)"
        : "rgba(0,0,0,0.1)"};
    box-shadow: ${({ theme }) =>
      (theme as any).mode === "dark"
        ? "0 40px 80px -30px rgba(0,0,0,0.5)"
        : "0 40px 80px -30px rgba(0,0,0,0.15)"};
  }
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const ContactRow = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr;
  align-items: start;
  gap: 10px 12px;
  padding: 10px 0;
`;

export const ContactLabel = styled.div`
  font-weight: 600;
  line-height: 1.2;
`;

export const ContactSub = styled.div`
  opacity: 0.8;
  line-height: 1.3;
  margin-top: 2px;
`;

export const Kicker = styled.h2`
  font-size: clamp(32px, 4vw, 56px);
  letter-spacing: -0.03em;
  margin: 0;
  font-weight: 600;
  line-height: 1.1;
`;

export const P = styled.p`
  margin-top: 16px;
  color: ${({ theme }) => (theme as any).subtleText};
  font-size: 17px;
  line-height: 1.7;
  letter-spacing: -0.01em;
`;

export const List = styled.ul`
  margin-top: 24px;
  padding: 0;
  list-style: none;
  color: ${({ theme }) => (theme as any).subtleText};

  li {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    font-size: 16px;
    line-height: 1.5;
  }
  li + li {
    margin-top: 14px;
  }
`;

export const HowGrid = styled.ol`
  margin-top: 40px;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;

  @media (min-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }

  li {
    background: ${({ theme }) =>
      (theme as any).mode === "dark"
        ? "rgba(255,255,255,0.03)"
        : "rgba(0,0,0,0.02)"};
    border: 1px solid
      ${({ theme }) =>
        (theme as any).mode === "dark"
          ? "rgba(255,255,255,0.06)"
          : "rgba(0,0,0,0.05)"};
    padding: 32px 24px;
    border-radius: 20px;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

    &:hover {
      transform: translateY(-4px);
      border-color: ${({ theme }) =>
        (theme as any).mode === "dark"
          ? "rgba(255,255,255,0.12)"
          : "rgba(0,0,0,0.1)"};
    }
  }
`;

/* Contact (white section) */
export const Contact = styled.section`
  background: #fff;
  color: #0a0a0a;
`;

export const ContactGrid = styled.div`
  display: grid;
  gap: 48px;
  grid-template-columns: 1fr;

  @media (min-width: 900px) {
    grid-template-columns: 1.5fr 1fr;
  }
`;

export const ContactForm = styled.form`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }

  input,
  textarea {
    border: 1px solid #e5e7eb;
    border-radius: 14px;
    background: #fafafa;
    padding: 16px 18px;
    font-size: 15px;
    outline: none;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

    &:focus {
      border-color: #0a0a0a;
      background: #fff;
      box-shadow: 0 0 0 4px rgba(10, 10, 10, 0.05);
    }

    &::placeholder {
      color: #9ca3af;
    }
  }

  textarea,
  .wide {
    grid-column: 1 / -1;
  }
`;

export const PrimarySubmit = styled.button`
  grid-column: 1 / -1;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 18px 32px;
  border-radius: 100px;
  border: 0;
  cursor: pointer;
  background: #0a0a0a;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.01em;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SideCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 24px;
  padding: 32px;
  background: #fafafa;
  display: grid;
  gap: 20px;

  .row {
    display: flex;
    gap: 14px;
  }
  .label {
    font-weight: 600;
  }
  .sub {
    color: #6b7280;
    font-size: 14px;
  }
`;

export const FooterWrap = styled.footer`
  border-top: 1px solid
    ${({ theme }) =>
      (theme as any).mode === "dark"
        ? "rgba(255,255,255,0.06)"
        : "rgba(0,0,0,0.06)"};
  background: ${({ theme }) => (theme as any).bg};
  color: ${({ theme }) => (theme as any).subtleText};
`;
