// src/components/primitives.tsx
import styled from "styled-components";
import { motion } from "framer-motion";

/* Layout */
export const Page = styled.div`
  min-height: 100dvh;
`;

export const StickyHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  backdrop-filter: blur(8px);
  background: ${({ theme }) => (theme as any).bg}cc;
  border-bottom: 1px solid ${({ theme }) => (theme as any).cardBorder};
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
`;

export const Grid3 = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
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
  gap: 16px;

  @media (min-width: 768px) {
    display: flex;
  }

  a {
    font-size: 14px;
    color: ${({ theme }) => (theme as any).subtleText};
  }
  a:hover {
    color: ${({ theme }) => (theme as any).text};
  }
`;

export const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: none;
  border: 0;
  color: ${({ theme }) => (theme as any).text};
  cursor: pointer;
  @media (min-width: 768px) {
    display: none;
  }
`;

export const ThemeToggleWrap = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px; /* smá spacing */
  button {
    border: 1px solid ${({ theme }) => (theme as any).cardBorder};
    background: transparent;
    padding: 6px 10px;
    border-radius: 12px;
    font-size: 14px;
    color: ${({ theme }) => (theme as any).text};
    cursor: pointer;
    &:hover {
      background: ${({ theme }) => (theme as any).soft};
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
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 24px;
    color: ${({ theme }) => (theme as any).text};
  }
  a:hover {
    color: ${({ theme }) => (theme as any).brand};
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
  border:1px solid ${({ theme }) => (theme as any).cardBorder};
  background: transparent;
  padding:8px 12px; border-radius:12px; font-size:14px;
  color:${({ theme }) => (theme as any).text};
  cursor:pointer;
  &:hover{ background: ${({ theme }) => (theme as any).soft}
`;

export const LinkBtn = styled.a`
  border:1px solid ${({ theme }) => (theme as any).cardBorder};
  padding:8px 12px; border-radius:12px; font-size:14px;
  &:hover{ background: ${({ theme }) => (theme as any).soft}
`;

export const Hero = styled.section`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 0; /* adjust as you like */
`;

export const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  background: ${({ theme }) => (theme as any).bg};
`;

/* Typography + Buttons */
export const H1 = styled(motion.h1)`
  font-weight: 700;
  letter-spacing: -0.02em;
  font-size: clamp(42px, 8vw, 88px);
`;
export const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 2px; /* hér færðu gap=2px milli burger og sun/moon */
`;

export const Lead = styled(motion.p)`
  max-width: 720px;
  margin: 16px auto 0;
  font-size: clamp(16px, 2.2vw, 20px);
  color: ${({ theme }) => (theme as any).subtleText};
`;

export const Ctas = styled(motion.div)`
  margin-top: 28px;
  display: flex;
  justify-content: center;
  gap: 12px;
`;

export const SolidBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  font-size: 14px;
  border-radius: 16px;
  background: ${({ theme }) => (theme as any).brand};
  color: ${({ theme }) => (theme as any).bg};
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06), 0 12px 30px -18px rgba(0, 0, 0, 0.4);
`;

export const OutlineBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  font-size: 14px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => (theme as any).cardBorder};
  background: ${({ theme }) => (theme as any).card};
  color: ${({ theme }) => (theme as any).text};
`;

/* Sections + Cards */
export const Section = styled.section<{ bordered?: boolean }>`
  ${(p) =>
    p.bordered ? `border-block:1px solid ${(p.theme as any).cardBorder};` : ""}
  background:${({ theme }) => (theme as any).bg};
`;

export const Grid2 = styled.div`
  display: grid;
  gap: 48px;
  align-items: center;
  grid-template-columns: 3fr;
  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Card = styled(motion.div)`
  position: relative;
  border: 1px solid ${({ theme }) => (theme as any).cardBorder};
  background: ${({ theme }) => (theme as any).card};
  border-radius: 24px;
  padding: 24px;
  aspect-ratio: 4/5;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06), 0 20px 60px -20px rgba(0, 0, 0, 0.25);
  color: ${({ theme }) => (theme as any).text};
  overflow: hidden;
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
  font-size: clamp(28px, 3.2vw, 36px);
  letter-spacing: -0.01em;
  margin: 0;
`;

export const P = styled.p`
  margin-top: 12px;
  color: ${({ theme }) => (theme as any).subtleText};
  font-size: 18px;
  line-height: 1.6;
`;

export const List = styled.ul`
  margin-top: 18px;
  padding: 0;
  list-style: none;
  color: ${({ theme }) => (theme as any).subtleText};
  li {
    display: flex;
    gap: 10px;
    align-items: flex-start;
  }
  li + li {
    margin-top: 10px;
  }
`;

export const HowGrid = styled.ol`
  margin-top: 28px;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
  @media (min-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }
  li {
    background: ${({ theme }) => (theme as any).card};
    border: 1px solid ${({ theme }) => (theme as any).cardBorder};
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
  }
`;

/* Contact (white section) */
export const Contact = styled.section`
  background: #fff;
  color: #0a0a0a;
`;

export const ContactGrid = styled.div`
  display: grid;
  gap: 28px;
  grid-template-columns: 1fr;
  @media (min-width: 900px) {
    grid-template-columns: 2fr 1fr;
  }
`;

export const ContactForm = styled.form`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr;
  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
  input,
  textarea {
    border: 1px solid #d4d4d8;
    border-radius: 16px;
    background: #fff;
    padding: 12px 14px;
    outline: none;
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
  gap: 8px;
  padding: 12px 16px;
  border-radius: 16px;
  border: 0;
  cursor: pointer;
  background: #111;
  color: #fff;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
`;

export const SideCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 20px;
  background: #fff;
  display: grid;
  gap: 14px;
  .row {
    display: flex;
    gap: 12px;
  }
  .label {
    font-weight: 600;
  }
  .sub {
    color: #6b7280;
  }
`;

export const FooterWrap = styled.footer`
  border-top: 1px solid ${({ theme }) => (theme as any).cardBorder};
  background: ${({ theme }) => (theme as any).bg};
  color: ${({ theme }) => (theme as any).subtleText};
`;
