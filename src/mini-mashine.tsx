import React, { useState } from "react";
import { motion } from "framer-motion";
import type { JSX } from "react";

export default function MachineMiniSVG(): JSX.Element {
  const [step, setStep] = useState<"main" | "variant" | "grams" | "dispense">(
    "main"
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [variant, setVariant] = useState<string | null>(null);
  const [grams, setGrams] = useState<number | null>(null);

  const supplements = ["PROTEIN", "CREATINE", "REFUEL"];
  const variants: Record<string, string[]> = {
    PROTEIN: ["Whey", "Casein", "Vegan"],
    CREATINE: ["Monohydrate", "HCL"],
    REFUEL: ["Electrolytes", "Carbs"],
  };
  const gramOptions = [5, 10, 20];

  // ---- CONSTANTS ----
  const screen = { x: 60, y: 100, w: 420, h: 220 };
  const btnW = 110;
  const btnH = 80;
  const pad = 30;

  // helper: render buttons always inside screen, centered
  const renderButtons = (items: string[], onClick: (v: string) => void) => {
    const totalWidth = items.length * btnW + (items.length - 1) * pad;
    const offsetX = screen.x + (screen.w - totalWidth) / 2;
    const centerY = screen.y + screen.h / 2;

    return items.map((label, i) => (
      <g
        key={label}
        onClick={() => onClick(label)}
        style={{ cursor: "pointer" }}
      >
        <rect
          x={offsetX + i * (btnW + pad)}
          y={centerY - btnH / 2}
          width={btnW}
          height={btnH}
          rx="12"
          fill="#111"
          stroke="#444"
        />
        <text
          x={offsetX + i * (btnW + pad) + btnW / 2}
          y={centerY + 6}
          textAnchor="middle"
          fontSize="14"
          fontFamily="sans-serif"
          fill="#fff"
          fontWeight="600"
        >
          {label}
        </text>
      </g>
    ));
  };

  return (
    <svg viewBox="0 0 700 650" style={{ width: "100%", height: "100%" }}>
      {/* Outer frame */}
      <rect
        x="20"
        y="20"
        width="660"
        height="600"
        rx="20"
        fill="#1a1a1a"
        stroke="#ff6600"
        strokeWidth="4"
      />

      {/* Title */}
      <text
        x="250"
        y="60"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontSize="32"
        fill="#ff4400"
        fontWeight="bold"
      >
        DUFTBAR
      </text>

      {/* Screen */}
      <rect
        x={screen.x}
        y={screen.y}
        width={screen.w}
        height={screen.h}
        rx="18"
        fill="#000"
        stroke="#444"
      />

      {/* Screen content */}
      {step === "main" &&
        renderButtons(supplements, (label) => {
          setSelected(label);
          setStep("variant");
        })}

      {step === "variant" &&
        selected &&
        renderButtons(variants[selected], (v) => {
          setVariant(v);
          setStep("grams");
        })}

      {step === "grams" &&
        renderButtons(
          gramOptions.map((g) => `${g} g`),
          (g) => {
            setGrams(parseInt(g));
            setStep("dispense");
          }
        )}

      {/* Big dispenser slot */}
      <rect
        x="60"
        y="360"
        width="580"
        height="130"
        rx="16"
        fill="#111"
        stroke="#333"
      />

      {/* Dispensing LED + powder streams */}
      {step === "dispense" && (
        <>
          {/* LED indicator on POS */}
          <rect x="508" y="138" width="54" height="20" rx="3" fill="#0f0" />
          {/* Powder streams */}
          {["#ffaa00", "#ff4444", "#00e5ff"].map((color, i) => (
            <motion.line
              key={i}
              x1={180 + i * 120}
              y1="360"
              x2={180 + i * 120}
              y2="490"
              stroke={color}
              strokeWidth="6"
              strokeLinecap="round"
              initial={{ opacity: 0, y2: 360 }}
              animate={{ opacity: [0, 1, 0.5, 1], y2: [360, 490, 360] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      )}

      {/* POS terminal */}
      <g>
        <rect
          x="500"
          y="130"
          width="70"
          height="100"
          rx="8"
          fill="#111"
          stroke="#666"
        />
        {step !== "dispense" && (
          <rect
            x="508"
            y="138"
            width="54"
            height="20"
            rx="3"
            fill="#0f9"
            opacity="0.85"
          />
        )}
        <rect x="508" y="200" width="54" height="8" rx="2" fill="#333" />
      </g>

      {/* Hint (only if not dispensing) */}
      {step !== "dispense" && (
        <g>
          <text
            x={screen.x + screen.w / 2}
            y={screen.y + screen.h + 30}
            textAnchor="middle"
            fontFamily="sans-serif"
            fontSize="16"
            fill="#fff"
            opacity="0.8"
          >
            Interact with it..
          </text>
          <motion.g
            animate={{ rotate: [-10, 10, -10] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            {/* simple mouse icon */}
            <path
              d="M330 360 l14 -8 l0 16 z"
              fill="#fff"
              stroke="#000"
              strokeWidth="1"
            />
          </motion.g>
        </g>
      )}
    </svg>
  );
}
