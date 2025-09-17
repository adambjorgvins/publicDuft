import type { JSX } from "react";

export default function MachineMiniSVG(): JSX.Element {
  return (
    <svg viewBox="0 0 320 220" style={{ width: "70%", height: "70%" }}>
      <rect
        x="40"
        y="20"
        width="240"
        height="180"
        rx="14"
        fill="#111"
        opacity="0.1"
      />
      <rect
        x="70"
        y="50"
        width="180"
        height="90"
        rx="10"
        fill="#fff"
        opacity="0.9"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={80 + i * 34}
          y="60"
          width="24"
          height="50"
          rx="4"
          fill="#f2f2f2"
        />
      ))}
      <rect
        x="210"
        y="150"
        width="36"
        height="36"
        rx="8"
        fill="#111"
        opacity="0.2"
      />
      <rect
        x="90"
        y="150"
        width="120"
        height="30"
        rx="6"
        fill="#111"
        opacity="0.15"
      />
    </svg>
  );
}
