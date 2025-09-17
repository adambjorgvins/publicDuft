import React from "react";
import { JSX } from "react";
export function MachineMiniSVG(): JSX.Element {
  return (
    <svg viewBox="0 0 640 800" style={{ width: "100%", height: "100%" }}>
      <defs>
        <filter id="s" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="20" stdDeviation="20" floodOpacity="0.18" />
        </filter>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0%" stopColor="#fafafa" />
          <stop offset="100%" stopColor="#f1f1f1" />
        </linearGradient>
      </defs>
      <rect
        x="80"
        y="40"
        width="480"
        height="720"
        rx="22"
        fill="url(#g)"
        filter="url(#s)"
        stroke="#e5e5e5"
      />
      <rect
        x="140"
        y="120"
        width="360"
        height="380"
        rx="16"
        fill="#ffffff"
        stroke="#e5e5e5"
      />
      {[170, 270, 370].map((y) => (
        <g key={y}>
          <rect x="160" y={y} width="320" height="4" fill="#efefef" />
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={i}>
              <rect
                x={170 + i * 50}
                y={y - 70}
                width="36"
                height="66"
                rx="6"
                fill="#fbfbfb"
                stroke="#eaeaea"
              />
              <rect
                x={174 + i * 50}
                y={y - 66}
                width="28"
                height="18"
                rx="3"
                fill="#111111"
                opacity="0.06"
              />
              <rect
                x={174 + i * 50}
                y={y - 42}
                width="28"
                height="30"
                rx="4"
                fill="#ececec"
              />
            </g>
          ))}
        </g>
      ))}

      <rect
        x="160"
        y="560"
        width="320"
        height="80"
        rx="10"
        fill="#111"
        opacity="0.06"
      />
      <text
        x="320"
        y="90"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui"
        fontSize="36"
        fill="currentColor"
      ></text>
    </svg>
  );
}
