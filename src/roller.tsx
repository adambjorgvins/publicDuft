import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Phase =
  | "intro_type"
  | "intro_hold"
  | "intro_erase_word"
  | "intro_type_next"
  | "intro_hold_next"
  | "intro_full_erase"
  | "forgot_type"
  | "forgot_hold"
  | "forgot_erase_to_base"
  | "final_full_erase"
  | "final_type"
  | "final_hold";

const TYPE_SPEED = 50; // was 70
const ERASE_SPEED = 20; // was 45
const HOLD_SHORT = 500; // was 1000
const HOLD_LONG = 500; // was 1400

export const TypewriterDuftbar: React.FC<{
  afterItems: string[];
  forgotYour: string;
  items: string[];
  finalText?: string;
  fontSize?: string;
  color?: string;
}> = ({
  afterItems,
  forgotYour,
  items,
  finalText = "no worries we got you ;)",
  fontSize = "1rem",
  color,
}) => {
  const [phase, setPhase] = useState<Phase>("intro_type");
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [forgotIdx, setForgotIdx] = useState(0);

  const currentAfter = afterItems[idx] || "";
  const currentForgot = `${forgotYour} ${items[forgotIdx]}`;

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;

    switch (phase) {
      /** INTRO CYCLE **/
      case "intro_type": {
        const target = currentAfter;
        if (text.length < target.length) {
          t = setTimeout(
            () => setText(target.slice(0, text.length + 1)),
            TYPE_SPEED
          );
        } else {
          t = setTimeout(() => setPhase("intro_hold"), HOLD_SHORT);
        }
        break;
      }
      case "intro_hold": {
        t = setTimeout(() => setPhase("intro_erase_word"), HOLD_SHORT);
        break;
      }
      case "intro_erase_word": {
        // erase only last word of the sentence (everything after last space)
        const lastSpace = currentAfter.lastIndexOf(" ");
        const base = currentAfter.slice(0, lastSpace + 1);
        if (text.length > base.length) {
          t = setTimeout(() => setText(text.slice(0, -1)), ERASE_SPEED);
        } else {
          setPhase("intro_type_next");
        }
        break;
      }
      case "intro_type_next": {
        const target = afterItems[idx + 1] || "";
        if (text.length < target.length) {
          t = setTimeout(
            () => setText(target.slice(0, text.length + 1)),
            TYPE_SPEED
          );
        } else {
          t = setTimeout(() => setPhase("intro_hold_next"), HOLD_LONG);
        }
        break;
      }
      case "intro_hold_next": {
        t = setTimeout(() => setPhase("intro_full_erase"), HOLD_SHORT);
        break;
      }
      case "intro_full_erase": {
        if (text.length > 0) {
          t = setTimeout(() => setText(text.slice(0, -1)), ERASE_SPEED);
        } else {
          setPhase("forgot_type");
        }
        break;
      }

      /** FORGOT CYCLE **/
      case "forgot_type": {
        const target = currentForgot;
        if (text.length < target.length) {
          t = setTimeout(
            () => setText(target.slice(0, text.length + 1)),
            TYPE_SPEED
          );
        } else {
          t = setTimeout(() => setPhase("forgot_hold"), HOLD_LONG);
        }
        break;
      }
      case "forgot_hold": {
        if (forgotIdx === items.length - 1) {
          t = setTimeout(() => setPhase("final_full_erase"), HOLD_SHORT);
        } else {
          t = setTimeout(() => setPhase("forgot_erase_to_base"), HOLD_SHORT);
        }
        break;
      }
      case "forgot_erase_to_base": {
        const base = `${forgotYour} `;
        if (text.length > base.length) {
          t = setTimeout(() => setText(text.slice(0, -1)), ERASE_SPEED);
        } else {
          setForgotIdx((i) => i + 1);
          setPhase("forgot_type");
        }
        break;
      }

      /** FINAL **/
      case "final_full_erase": {
        if (text.length > 0) {
          t = setTimeout(() => setText(text.slice(0, -1)), ERASE_SPEED);
        } else {
          setPhase("final_type");
        }
        break;
      }
      case "final_type": {
        const target = finalText;
        if (text.length < target.length) {
          t = setTimeout(
            () => setText(target.slice(0, text.length + 1)),
            TYPE_SPEED
          );
        } else {
          setPhase("final_hold");
        }
        break;
      }
      case "final_hold": {
        break;
      }
    }

    return () => clearTimeout(t);
  }, [
    phase,
    text,
    idx,
    forgotIdx,
    afterItems,
    items,
    forgotYour,
    currentAfter,
    currentForgot,
    finalText,
  ]);

  return (
    <motion.div
      style={{
        fontSize,
        fontWeight: 700,
        textAlign: "center",
        whiteSpace: "nowrap",
        color,
      }}
    >
      {text}
      <motion.span
        aria-hidden
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        style={{ display: "inline-block", marginLeft: 2 }}
      >
        |
      </motion.span>
    </motion.div>
  );
};
