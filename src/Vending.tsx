import React, { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import styled, { keyframes } from "styled-components";

const BG = {
  start: "#0b0d13",
  end: "#111827",
};
type Lang = "is" | "en";

const I18N = {
  is: {
    ui: {
      back: "Til baka",
      chooseFlavor: "Veldu bragð",
      cancel: "Hætta við",
      payNow: "Greiða núna",
      flavor: "Bragð",
      dispensingTitle: "DUFT KEMUR Á",
      bay: "BÁS",
      wait: "Bíðið",
    },
    products: {
      REFUEL: {
        title: "ORKUSKOT",
        tagline: "Orka á sekúndum",
        tastes: ["Bláís", "Suðrænt"],
      },
      PROTEIN: {
        title: "PRÓTEIN",
        tagline: "Hreint afkösteldsneyti",
        tastes: ["Vanillu", "Súkkulaði", "Jarðarber"],
      },
      CREATINE: {
        title: "KREATÍN",
        tagline: "Sprengikraftur og styrkur",
        tastes: ["Bragðlaust"],
      },
    },
  },
  en: {
    ui: {
      back: "Back",
      chooseFlavor: "Choose flavor",
      cancel: "Cancel",
      payNow: "Pay now",
      flavor: "Flavor",
      dispensingTitle: "DISPENSING TO",
      bay: "BAY",
      wait: "Please wait",
    },
    products: {
      REFUEL: {
        title: "REFUEL",
        tagline: "Energy in seconds",
        tastes: ["Blue Ice", "Tropical"],
      },
      PROTEIN: {
        title: "PROTEIN",
        tagline: "Pure performance fuel",
        tastes: ["Vanilla", "Chocolate", "Strawberry"],
      },
      CREATINE: {
        title: "CREATINE",
        tagline: "Explosive strength",
        tastes: ["Unflavored"],
      },
    },
  },
} as const;

const PRICE_ISK_PER_GRAM: Record<ProductKey, number> = {
  REFUEL: 12,
  PROTEIN: 7,
  CREATINE: 18,
};
const formatISK = (v: number) =>
  new Intl.NumberFormat("is-IS", {
    style: "currency",
    currency: "ISK",
    maximumFractionDigits: 0,
  }).format(v);

const COLORS = {
  refuel: {
    base: "#00A7FF",
    glow: "#20C6FF",
    text: "#E6F7FF",
  },
  protein: {
    base: "#FF8A00",
    glow: "#FFB84D",
    text: "#FFF5E6",
  },
  creatine: {
    base: "#7A5CFF",
    glow: "#B09CFF",
    text: "#F2EDFF",
  },
  neutral: "#9aa4b2",
  white: "#ffffff",
};

const shimmerY = keyframes`
  0% { transform: translateY(-150%); }
  50% { transform: translateY(0%); }
  100% { transform: translateY(150%); }
`;

const waveY = keyframes`
  0% { background-position: 0 0, 0 0, 0 0, 0 0; }
  100% { background-position: 0 200%, 0 -200%, 0 200%, 0 -200%; }
`;

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const floatUp = keyframes`
  0% { transform: translateY(0) scale(1); opacity: 0; }
  10% { opacity: .5; }
  100% { transform: translateY(-120vh) scale(1.2); opacity: 0; }
`;

const FlagGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const FlagIS: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <defs>
      <clipPath id="r">
        <rect x="0" y="0" width="24" height="24" rx="3" />
      </clipPath>
    </defs>
    <g clipPath="url(#r)">
      <rect width="24" height="24" fill="#02529C" />
      <rect x="0" y="9.5" width="24" height="5" fill="#fff" />
      <rect x="8.5" y="0" width="5" height="24" fill="#fff" />
      <rect x="0" y="10.5" width="24" height="3" fill="#DC1E35" />
      <rect x="9.5" y="0" width="3" height="24" fill="#DC1E35" />
    </g>
  </svg>
);

const FlagGB: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <defs>
      <clipPath id="rg">
        <rect x="0" y="0" width="24" height="24" rx="3" />
      </clipPath>
    </defs>
    <g clipPath="url(#rg)">
      <rect width="24" height="24" fill="#012169" />
      <path d="M0,0 L24,24 M24,0 L0,24" stroke="#fff" strokeWidth="5" />
      <path d="M0,0 L24,24 M24,0 L0,24" stroke="#C8102E" strokeWidth="3" />
      <rect x="10" y="0" width="4" height="24" fill="#fff" />
      <rect x="0" y="10" width="24" height="4" fill="#fff" />
      <rect x="11" y="0" width="2" height="24" fill="#C8102E" />
      <rect x="0" y="11" width="24" height="2" fill="#C8102E" />
    </g>
  </svg>
);

const FlagButton = styled.button<{ $active?: boolean }>`
  all: unset;
  cursor: pointer;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  position: relative;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
  transition: transform 0.12s ease, box-shadow 0.2s ease, background 0.2s ease;
  &:hover {
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
  outline: none;

  /* Active glow */
  &:after {
    content: "";
    position: absolute;
    inset: -3px;
    border-radius: inherit;
    box-shadow: ${({ $active }) =>
      $active
        ? "0 0 0 2px rgba(255,255,255,0.25), 0 0 24px rgba(255,255,255,0.18)"
        : "none"};
    pointer-events: none;
  }
`;

const GlobalTopBar = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  left: 12px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  z-index: 20;
`;

const FlagBtn = styled.button<{ $active?: boolean }>`
  all: unset;
  cursor: pointer;
  font-size: 22px;
  line-height: 1;
  padding: 8px 10px;
  border-radius: 10px;
  background: ${({ $active }) =>
    $active ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)"};
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
`;

const Fullscreen = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: radial-gradient(
      1200px 800px at 20% 30%,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0) 50%
    ),
    linear-gradient(180deg, ${BG.start} 0%, ${BG.end} 100%);
`;

const VaporLayer = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  background: radial-gradient(
      60% 80% at 10% 90%,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0) 60%
    ),
    radial-gradient(
      70% 60% at 90% 10%,
      rgba(255, 255, 255, 0.04) 0%,
      rgba(255, 255, 255, 0) 60%
    );
  filter: blur(20px);
`;

const Particles = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  & > span {
    position: absolute;
    left: var(--x);
    bottom: -10vh;
    width: var(--s);
    height: var(--s);
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0)
    );
    border-radius: 50%;
    opacity: 0.25;
    animation: ${floatUp} var(--t) linear infinite;
    filter: blur(1px);
  }
`;

const CenterRow = styled.div`
  /* var: position: absolute; inset: 0;  <- fjarlægt */
  min-height: 100dvh; /* fyllir skjáhæð, virkar á mobile */
  display: grid;
  place-items: center;
  padding-top: 72px; /* pláss fyrir TopBar */
`;

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 80;
  display: grid;
  place-items: center;
  background: rgba(7, 10, 16, 0.85);
  backdrop-filter: blur(8px);
`;

const OverlayCard = styled.div`
  text-align: center;
  padding: clamp(20px, 4vw, 40px);
  border-radius: 24px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.06),
    rgba(255, 255, 255, 0.02)
  );
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  color: ${COLORS.white};
  width: min(700px, 92vw);
`;

const SlotNumber = styled.div`
  font: 900 clamp(64px, 10vw, 140px) / 0.9 "SF Pro Display", system-ui,
    -apple-system, Segoe UI, Roboto, sans-serif;
  letter-spacing: 0.02em;
  margin-bottom: clamp(10px, 2vw, 18px);
`;

const OverlayTitle = styled.h3`
  margin: 0 0 10px 0;
  font: 900 clamp(22px, 3.6vw, 40px) / 1.1 "SF Pro Display", system-ui,
    -apple-system, Segoe UI, Roboto, sans-serif;
`;

const OverlayMeta = styled.p`
  margin: 0 0 16px 0;
  opacity: 0.92;
  font: 400 clamp(14px, 2.2vw, 18px) / 1.4 "SF Pro Text", system-ui,
    -apple-system, Segoe UI, Roboto, sans-serif;
`;

const LoadingDots = styled.span`
  display: inline-block;
  width: 1.6em;
  text-align: left;
  &:after {
    content: "…";
    animation: dots 1.2s steps(4, end) infinite;
  }
  @keyframes dots {
    0% {
      content: "";
    }
    25% {
      content: ".";
    }
    50% {
      content: "..";
    }
    75% {
      content: "...";
    }
    100% {
      content: "";
    }
  }
`;

const CardsRow = styled.div`
  display: grid;
  gap: clamp(14px, 3vw, 28px);
  grid-template-columns: repeat(3, 1fr); /* fast 3 dálkar */
  align-items: stretch; /* teygja hluti */
  width: min(1100px, 92vw);

  /* láta child wrapper fylla reitinn (motion.div) */
  & > * {
    height: 100%;
  }

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    width: min(560px, 92vw);
  }
`;
const CardWrap = styled(motion.button)<{ $accent: string; $text: string }>`
  position: relative;
  isolation: isolate;
  border: 0;
  outline: none;
  cursor: pointer;

  width: 100%;
  height: 100%;
  min-height: clamp(240px, 34vh, 320px);

  border-radius: 28px;
  padding: 24px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.06),
    rgba(255, 255, 255, 0.02)
  );
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  color: ${(p) => p.$text};

  display: flex; /* notum flex */
  flex-direction: column;
  align-items: center; /* miðja lárétt */
  justify-content: center; /* miðja lóðrétt */
  gap: 14px; /* bil á milli icon og texta */

  transform-style: preserve-3d;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 30px;
    padding: 2px;
    z-index: -1;
    background: linear-gradient(
        120deg,
        transparent 0 25%,
        ${(p) => p.$accent} 45%,
        transparent 70%
      ),
      linear-gradient(
        300deg,
        transparent 0 30%,
        ${(p) => p.$accent}99 55%,
        transparent 80%
      );
    -webkit-mask: linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

const IconWrap = styled.div`
  display: grid;
  place-items: center;
  width: clamp(40px, 5vw, 52px);
  height: clamp(40px, 5vw, 52px);
  border-radius: 12px;
  backdrop-filter: blur(6px);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);

  & > svg {
    width: 60%;
    height: 60%;
  }
`;

const Title = styled.h2`
  font: 800 clamp(26px, 4.2vw, 44px) / 1.1 "SF Pro Display", system-ui,
    -apple-system, Segoe UI, Roboto, sans-serif;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin: 0;
  text-align: center;
`;

const Tagline = styled.p`
  margin: 0;
  opacity: 0.85;
  font: 300 clamp(12px, 1.6vw, 16px) / 1.4 "SF Pro Text", system-ui,
    -apple-system, Segoe UI, Roboto, sans-serif;
  text-align: center;

  max-width: 90%;
`;
const BlueWaves = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: -2;
  opacity: 0.55;
  background: radial-gradient(
      1200px 60px at -20% 30%,
      rgba(32, 198, 255, 0.25),
      transparent 40%
    ),
    radial-gradient(
      1200px 60px at -30% 60%,
      rgba(32, 198, 255, 0.18),
      transparent 40%
    ),
    linear-gradient(0deg, rgba(32, 198, 255, 0.25), rgba(32, 198, 255, 0) 60%),
    linear-gradient(180deg, rgba(32, 198, 255, 0.25), rgba(32, 198, 255, 0) 60%);
  background-size: 100% 400%, 100% 400%, 100% 200%, 100% 200%;
  animation: ${waveY} 12s linear infinite;
`;

const AmberPulse = styled.div<{ $color: string }>`
  pointer-events: none;
  position: absolute;
  inset: -40%;
  z-index: -2;
  border-radius: 50%;
  background: radial-gradient(
    circle at 50% 60%,
    ${(p) => p.$color}33 0%,
    transparent 55%
  );
  filter: blur(20px);
  animation: pulse 3.6s ease-in-out infinite;
  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.6;
    }
    50% {
      transform: scale(1.06);
      opacity: 0.85;
    }
  }
`;

const VioletShimmer = styled.div<{ $color: string }>`
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: -2;
  overflow: hidden;
  opacity: 0.65;
  &:after {
    content: "";
    position: absolute;
    top: -50%;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(
      180deg,
      transparent,
      ${(p) => p.$color}55,
      transparent
    );
    transform: skewY(-12deg);
    animation: ${shimmerY} 3.8s ease-in-out infinite;
  }
`;
const ConfirmRing = styled(motion.span)`
  position: absolute;
  inset: -6px;
  border-radius: 16px;
  border: 2px solid currentColor;
  opacity: 0;
`;

const ConfirmSheet = styled(motion.div)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  background: rgba(17, 24, 39, 0.92);
  backdrop-filter: blur(10px);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: clamp(16px, 3vw, 28px);
  box-shadow: 0 -20px 60px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
`;

const ConfirmTitle = styled.h3`
  margin: 0 0 8px 0;
  font: 900 clamp(22px, 4vw, 36px) / 1.1 "SF Pro Display", system-ui,
    -apple-system, Segoe UI, Roboto, sans-serif;
  letter-spacing: 0.02em;
  color: ${COLORS.white};
`;

const ConfirmMeta = styled.p`
  margin: 0;
  opacity: 0.9;
  font: 400 clamp(14px, 2.2vw, 16px) / 1.4 "SF Pro Text", system-ui,
    -apple-system, Segoe UI, Roboto, sans-serif;
  color: ${COLORS.white};
`;

const TextBlock = styled.div`
  grid-row: 3; /* neðsta röð */
  align-self: end;
  justify-self: start;
  width: 100%;
`;

const SheetRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  align-items: center;
  margin-top: 14px;
`;

const PayButton = styled.button<{ $accent?: string }>`
  all: unset;
  cursor: pointer;
  padding: 14px 18px;
  border-radius: 14px;
  background: ${(p) => p.$accent ?? "#ffffff"}; // default fallback
  color: #0b0d13;
  font: 800 16px/1 "SF Pro Display", system-ui, -apple-system, Segoe UI, Roboto,
    sans-serif;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  transition: transform 0.08s ease;
  &:active {
    transform: translateY(1px) scale(0.99);
  }
`;

const purchaseBlurb = (
  product: ProductConfig,
  grams: number,
  taste: string | undefined,
  lang: Lang
) => {
  const t = taste ? ` (${taste})` : "";
  if (lang === "en") {
    switch (product.key) {
      case "REFUEL":
        return `Fast energy shot${t} with ${grams}g — mixed straight into your bottle.`;
      case "PROTEIN":
        return `${grams}g${t} of pure protein to recharge after training.`;
      case "CREATINE":
        return `Classic daily dose${t}: ${grams}g creatine for strength and explosiveness.`;
      default:
        return `${grams}g${t} — ready in seconds.`;
    }
  } else {
    switch (product.key) {
      case "REFUEL":
        return `Hraður orkuskot${t} með ${grams}g — blandað beint í brúsa.`;
      case "PROTEIN":
        return `${grams}g${t} af hreinu próteini til endurhleðslu eftir æfingu.`;
      case "CREATINE":
        return `Klassísk dagskammtur${t}: ${grams}g kreatín fyrir styrk og sprengikraft.`;
      default:
        return `${grams}g${t} — tilbúið á sekúndum.`;
    }
  }
};

const TopBar = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 10;
`;

const BackButton = styled.button`
  all: unset;
  display: inline-grid;
  place-items: center;
  cursor: pointer;
  padding: 14px;
  border-radius: 12px;
  color: ${COLORS.white};
  opacity: 0.8;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 1;
  }

  svg {
    width: 124px;
    height: 124px;
  }
`;
const CancelButton = styled(PayButton).attrs({ $accent: "#ef4444" })`
  background: #ef4444;
  color: #0b0d13;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);

  &:hover {
    filter: brightness(1.05);
  }
  &:active {
    transform: translateY(1px) scale(0.99);
  }

  /* fókus hringur fyrir aðgengi */
  &:focus-visible {
    outline: 2px solid #fecaca;
    outline-offset: 2px;
  }
`;

const SubGrid = styled.div`
  display: grid;
  gap: 16px;

  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  justify-content: center;
  justify-items: center;

  width: min(720px, 92vw);

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    width: min(480px, 92vw);
  }
`;

const OptionBtn = styled(motion.button)`
  width: 100%;
  max-width: 320px;          
  position: relative;
  border: 0; outline: none; cursor: pointer;
  border-radius: 16px; padding: 18px 16px;
  background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
  box-shadow: 0 20px 50px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.06));
  color: ${COLORS.white};
  text-align: left; overflow: hidden;
  &:after {
    content: "";
    position: absolute; inset: 0; border-radius: 16px;
    opacity: 0; box-shadow: 0 0 0 2px currentColor; transition: opacity .25s ease;
  }
  &:active:after { opacity: .9; }
`;

const OptionTitle = styled.div`
  font: 800 18px/1 "SF Pro Display", system-ui, -apple-system, Segoe UI, Roboto,
    sans-serif;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 6px;
`;
const OptionMeta = styled.div`
  font: 400 14px/1.3 "SF Pro Text", system-ui, -apple-system, Segoe UI, Roboto,
    sans-serif;
  opacity: 0.9;
`;

const BoltIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
  </svg>
);
const ScoopIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M10 6a6 6 0 100 12 6 6 0 000-12z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M15 15l6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const CrystalIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 2l4 5-4 15-4-15 4-5z" stroke="currentColor" strokeWidth="2" />
    <path d="M8 7h8" stroke="currentColor" strokeWidth="2" />
  </svg>
);

type ProductKey = "REFUEL" | "PROTEIN" | "CREATINE";

type Portion = { label: string; grams: number; tagline: string };

type ProductConfig = {
  key: ProductKey;
  title: string; // var: ProductKey
  tagline: string;
  icon: React.FC;
  colors: { base: string; glow: string; text: string };
  effect: "wave" | "pulse" | "shimmer";
  tastes: readonly string[];
  gramsOptions: number[];
};

function useTilt(maxTilt = 10) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 200,
    damping: 20,
  });
  const ry = useSpring(useTransform(x, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 200,
    damping: 20,
  });

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const px = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    const py = clamp((e.clientY - rect.top) / rect.height, 0, 1);
    x.set(px);
    y.set(py);
  };
  const onLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return { rx, ry, onMouseMove, onLeave };
}

const MenuCard: React.FC<{
  product: ProductConfig;
  onSelect: (p: ProductConfig) => void;
  lang: Lang;
}> = ({ product, onSelect, lang }) => {
  const Icon = product.icon;

  return (
    <CardWrap
      $accent={product.colors.base}
      $text={product.colors.text}
      onClick={() => onSelect(product)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`${product.title} ${lang === "is" ? "valmynd" : "menu"}`}
    >
      {product.effect === "wave" && <BlueWaves />}
      {product.effect === "pulse" && (
        <AmberPulse $color={product.colors.glow} />
      )}
      {product.effect === "shimmer" && (
        <VioletShimmer $color={product.colors.glow} />
      )}

      <IconWrap style={{ color: product.colors.base }}>
        <Icon />
      </IconWrap>

      <TextBlock>
        <Title>{product.title}</Title>
        <Tagline>{product.tagline}</Tagline>
      </TextBlock>
    </CardWrap>
  );
};

const SubMenuView: React.FC<{
  product: ProductConfig;
  onBack: () => void;
  onPick: (portion: Portion, extras?: { taste?: string }) => void;
  lang: Lang;
}> = ({ product, onBack, onPick, lang }) => {
  const L = I18N[lang];
  const [selectedTaste, setSelectedTaste] = useState<string | null>(
    product.tastes.length === 1 ? product.tastes[0] : null
  );

  return (
    <CenterRow>
      <TopBar>
        <BackButton onClick={onBack} aria-label={L.ui.back}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 5l-7 7 7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </BackButton>
      </TopBar>

      {!selectedTaste && product.tastes.length > 1 && (
        <SubGrid>
          {product.tastes.map((t) => (
            <OptionBtn
              key={t}
              onClick={() => setSelectedTaste(t)}
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -2 }}
              style={{ color: product.colors.glow }}
            >
              <ConfirmRing
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.05, opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              />
              <OptionTitle>{t}</OptionTitle>
              <OptionMeta>{L.ui.chooseFlavor}</OptionMeta>
            </OptionBtn>
          ))}
        </SubGrid>
      )}

      {selectedTaste && (
        <SubGrid>
          {product.gramsOptions.map((g) => (
            <OptionBtn
              key={g}
              onClick={() =>
                onPick(
                  { label: `${g}g`, grams: g, tagline: product.tagline },
                  { taste: selectedTaste || undefined }
                )
              }
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -2 }}
              style={{ color: product.colors.glow }}
            >
              <ConfirmRing
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.05, opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              />
              <OptionTitle>{g}g</OptionTitle>
              <OptionMeta>{selectedTaste}</OptionMeta>
            </OptionBtn>
          ))}
        </SubGrid>
      )}
    </CenterRow>
  );
};

const ParticlesField: React.FC<{ count?: number }> = ({ count = 28 }) => {
  const spans = Array.from({ length: count }).map((_, i) => {
    const left = Math.random() * 100;
    const size = Math.random() * 8 + 2; // 2-10px
    const time = Math.random() * 14 + 8; // 8-22s
    return (
      <span
        key={i}
        style={{
          ["--x" as any]: `${left}%`,
          ["--s" as any]: `${size}px`,
          ["--t" as any]: `${time}s`,
        }}
      />
    );
  });
  return <Particles aria-hidden>{spans}</Particles>;
};

const PRODUCT_BASE = {
  REFUEL: {
    icon: BoltIcon,
    colors: COLORS.refuel,
    effect: "wave",
    gramsOptions: [5, 7, 10],
  },
  PROTEIN: {
    icon: ScoopIcon,
    colors: COLORS.protein,
    effect: "pulse",
    gramsOptions: [15, 25, 30],
  },
  CREATINE: {
    icon: CrystalIcon,
    colors: COLORS.creatine,
    effect: "shimmer",
    gramsOptions: [5, 10, 15],
  },
} as const;

const getProducts = (lang: Lang): ProductConfig[] =>
  //@ts-ignore
  (Object.keys(PRODUCT_BASE) as ProductKey[]).map((key) => ({
    key,
    title: I18N[lang].products[key].title,
    tagline: I18N[lang].products[key].tagline,
    icon: PRODUCT_BASE[key].icon,
    colors: PRODUCT_BASE[key].colors,
    effect: PRODUCT_BASE[key].effect,
    tastes: I18N[lang].products[key].tastes,
    gramsOptions: PRODUCT_BASE[key].gramsOptions,
  }));

export const DuftbarMenu: React.FC<{
  onSelected?: (payload: {
    product: ProductKey;
    portion?: Portion;
    priceISK?: number;
    taste?: string;
  }) => void;
  resolveSlot?: (payload: {
    product: ProductKey;
    grams: number;
    taste?: string;
  }) => number;
}> = ({ onSelected, resolveSlot }) => {
  const detectInitialLang = (): Lang => {
    const saved = localStorage.getItem("duftbar.lang") as Lang | null;
    if (saved === "is" || saved === "en") return saved;
    const nav = navigator.language?.toLowerCase() || "";
    return nav.startsWith("is") ? "is" : "en";
  };

  const [lang, setLang] = useState<Lang>(detectInitialLang());

  const [zoomKey, setZoomKey] = useState(0);
  const [active, setActive] = useState<ProductConfig | null>(null);
  const L = I18N[lang];
  const productsLocalized = useMemo(() => getProducts(lang), [lang]);

  const [pending, setPending] = useState<{
    product: ProductConfig;
    portion: Portion;
    taste?: string;
  } | null>(null);

  const handlePick = (portion: Portion, extras?: { taste?: string }) => {
    if (!active) return;

    const ctx = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "triangle";
    o.frequency.value = 520;
    o.connect(g);
    g.connect(ctx.destination);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
    o.start();
    o.stop(ctx.currentTime + 0.21);

    setPending({ product: active, portion, taste: extras?.taste });
  };

  const TOTAL_SLOTS = 6;

  const [dispensing, setDispensing] = useState<{
    slot: number;
    product: ProductConfig;
    grams: number;
    taste?: string;
  } | null>(null);

  const pickSlot = (product: ProductConfig, grams: number, taste?: string) =>
    resolveSlot?.({ product: product.key, grams, taste }) ??
    Math.floor(Math.random() * TOTAL_SLOTS) + 1;

  const handlePay = () => {
    if (!pending) return;
    const price =
      pending.portion.grams * PRICE_ISK_PER_GRAM[pending.product.key];

    onSelected?.({
      product: pending.product.key,
      portion: pending.portion,
      priceISK: price,
      taste: pending.taste,
    });

    const slot = pickSlot(
      pending.product,
      pending.portion.grams,
      pending.taste
    );
    setDispensing({
      slot,
      product: pending.product,
      grams: pending.portion.grams,
      taste: pending.taste,
    });

    setPending(null);

    setTimeout(() => {
      setDispensing(null);
      setActive(null);
    }, 5000);
  };

  const handleOpen = (p: ProductConfig) => {
    setActive(p);
    setZoomKey((k) => k + 1);
  };
  useEffect(() => {
    if (active) {
      const next = getProducts(lang).find((p) => p.key === active.key);
      if (next) setActive(next);
    }
  }, [lang]);
  return (
    <Fullscreen>
      <VaporLayer />
      <ParticlesField />
      <GlobalTopBar>
        <FlagButton
          onClick={() => {
            setLang("is");
            localStorage.setItem("duftbar.lang", "is");
          }}
          $active={lang === "is"}
          aria-label="Íslenska"
          aria-pressed={lang === "is"}
          title="Íslenska"
        >
          <FlagIS />
        </FlagButton>
        <FlagButton
          onClick={() => {
            setLang("en");
            localStorage.setItem("duftbar.lang", "en");
          }}
          $active={lang === "en"}
          aria-label="English"
          aria-pressed={lang === "en"}
          title="English"
        >
          <FlagGB />
        </FlagButton>
      </GlobalTopBar>

      <AnimatePresence mode="wait">
        {!active ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 6, scale: 0.997 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.997 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
          >
            <CenterRow>
              <CardsRow>
                {productsLocalized.map((p) => (
                  <motion.div key={p.key}>
                    <MenuCard product={p} onSelect={handleOpen} lang={lang} />
                  </motion.div>
                ))}
              </CardsRow>
            </CenterRow>
          </motion.div>
        ) : (
          <motion.div
            key={`submenu-${zoomKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              key={`submenu-${zoomKey}`}
              initial={{ opacity: 0, y: 6, scale: 0.997 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.997 }}
              transition={{ duration: 0.14, ease: "easeOut" }}
            >
              <SubMenuView
                product={active}
                onBack={() => setActive(null)}
                onPick={handlePick}
                lang={lang}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {pending && (
          <ConfirmSheet
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            role="dialog"
            aria-labelledby="confirm-title"
          >
            <ConfirmTitle id="confirm-title">
              {I18N[lang].products[pending.product.key].title} —{" "}
              {pending.portion.grams}g
            </ConfirmTitle>
            <ConfirmMeta>
              {purchaseBlurb(
                pending.product,
                pending.portion.grams,
                pending.taste,
                lang
              )}
            </ConfirmMeta>
            {pending.taste && (
              <ConfirmMeta style={{ marginTop: 6 }}>
                {L.ui.flavor}:{" "}
                <strong>
                  {I18N[lang].products[pending.product.key].tastes.find(
                    (t) => t.toLowerCase() === pending.taste?.toLowerCase()
                  ) || pending.taste}
                </strong>
              </ConfirmMeta>
            )}
            <SheetRow>
              <ConfirmMeta>
                {formatISK(
                  pending.portion.grams *
                    PRICE_ISK_PER_GRAM[pending.product.key]
                )}
              </ConfirmMeta>
              <div style={{ display: "flex", gap: 10 }}>
                <CancelButton onClick={() => setPending(null)}>
                  {L.ui.cancel}
                </CancelButton>
                <PayButton
                  onClick={handlePay}
                  $accent={pending.product.colors.base}
                  aria-label={L.ui.payNow}
                >
                  {L.ui.payNow}
                </PayButton>
              </div>
            </SheetRow>
          </ConfirmSheet>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {dispensing && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <OverlayCard>
              <OverlayTitle>{L.ui.dispensingTitle}</OverlayTitle>
              <SlotNumber>
                {L.ui.bay} {dispensing.slot}
              </SlotNumber>
              <OverlayMeta>
                {I18N[lang].products[dispensing.product.key].title} —{" "}
                {dispensing.grams}g
                {dispensing.taste ? ` (${dispensing.taste})` : ""} • {L.ui.wait}
                <LoadingDots />
              </OverlayMeta>
            </OverlayCard>
          </Overlay>
        )}
      </AnimatePresence>
    </Fullscreen>
  );
};
export default DuftbarMenu;
