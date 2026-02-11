import React, { JSX, useEffect, useState, lazy, memo } from "react";
import { ThemeProvider } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

//@ts-ignore
import person from "./images/person.png";
// @ts-ignore
import mashine from "./images/mashine.png";
// @ts-ignore
import duftbar from "./images/duftbar.webm";

import {
  ArrowRight,
  CheckCircle2,
  Dumbbell,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Sun,
  Moon,
  ArrowDown,
  MousePointerClick,
} from "lucide-react";

import {
  Page,
  StickyHeader,
  Container,
  Row,
  Nav as TopNav,
  HeaderActions,
  GhostBtn,
  LinkBtn,
  Hero,
  HeroBg,
  H1,
  Lead,
  Ctas,
  SolidBtn,
  OutlineBtn,
  VisuallyHidden,
  ContactRow,
  ContactLabel,
  ContactSub,
  Section,
  Grid2,
  Card,
  Kicker,
  P,
  List,
  HowGrid,
  Contact,
  ContactGrid,
  ContactForm,
  PrimarySubmit,
  SideCard,
  FooterWrap,
  MobileMenuButton,
  MobileMenu,
  ThemeToggleWrap,
  RightControls,
  Grid3,
} from "./primatives";
import { GlobalStyle } from "./global-styles";
import { dark, light } from "./theme";
import { Locale, locale } from "./locale";
import { Logo } from "./logo";
import { TypewriterDuftbar } from "./roller";

export default function DuftbarPage(): JSX.Element {
  const [progress, setProgress] = useState<number>(0);
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [lang, setLang] = useState<Locale>("is");
  const t = locale[lang];

  useEffect(() => {
    const onScroll = () => {
      requestAnimationFrame(() => {
        const h = document.documentElement;
        const scrolled =
          (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
        setProgress(scrolled);
      });
    };
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) {
      setMode(saved);
    } else {
      setMode("light");
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"duftbar" | "dots" | "eraseDots" | "wink">(
    "duftbar",
  );
  const fullWord = "duftbar";

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "duftbar") {
      if (text.length < fullWord.length) {
        timeout = setTimeout(() => {
          setText(fullWord.slice(0, text.length + 1));
        }, 120);
      } else {
        timeout = setTimeout(() => setPhase("dots"), 1000);
      }
    }

    if (phase === "dots") {
      if (!text.endsWith("...")) {
        timeout = setTimeout(() => {
          setText(text + ".");
        }, 200);
      } else {
        timeout = setTimeout(() => setPhase("eraseDots"), 800);
      }
    }

    if (phase === "eraseDots") {
      if (text.endsWith(".")) {
        timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, 100);
      } else {
        setPhase("wink");
      }
    }

    if (phase === "wink") {
      const target = fullWord + " ;)";
      if (text !== target) {
        timeout = setTimeout(() => {
          setText(target.slice(0, text.length + 1));
        }, 120);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase]);

  const [menuOpen, setMenuOpen] = useState(false);
  const items = t.items;
  const afterItems = t.afterItems;

  const [index, setIndex] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState<number | null>(null);
  const longestItem = items.reduce((a, b) => (a.length > b.length ? a : b));
  const longestAfter = afterItems.reduce((a, b) =>
    a.length > b.length ? a : b,
  );
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (phaseIndex === null) {
      timer = setInterval(() => {
        setIndex((prev) => {
          if (prev + 1 === items.length) {
            clearInterval(timer);
            setTimeout(() => setPhaseIndex(0), 1200);
          }
          return prev + 1 < items.length ? prev + 1 : prev;
        });
      }, 1000);
    } else {
      timer = setInterval(() => {
        setPhaseIndex((prev) =>
          prev !== null ? (prev + 1) % afterItems.length : 0,
        );
      }, 2000);
    }

    return () => clearInterval(timer);
  }, [phaseIndex]);

  const toggleTheme = () => {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <ThemeProvider theme={{ ...(mode === "dark" ? dark : light), mode }}>
      <GlobalStyle />
      <Page>
        {/* Minimal progress indicator */}
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            height: 4,
            width: `${progress}%`,
            background:
              mode === "dark" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.3)",
            zIndex: 50,
            transition: "width .2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        <StickyHeader>
          <Container>
            <Row>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  cursor: "pointer",
                }}
              >
                <Logo size={26} />
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: 15,
                    letterSpacing: "-0.02em",
                  }}
                >
                  duftbar
                </span>
              </a>

              <TopNav>
                {t.nav.map((n) => (
                  <a
                    key={n.href}
                    href={n.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.querySelector(n.href);
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {n.label}
                  </a>
                ))}
              </TopNav>

              <RightControls>
                <HeaderActions></HeaderActions>
                <ThemeToggleWrap>
                  <GhostBtn onClick={toggleTheme} aria-label="Toggle theme">
                    {mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                  </GhostBtn>
                </ThemeToggleWrap>
                <GhostBtn
                  onClick={() => setLang(lang === "en" ? "is" : "en")}
                  style={{
                    width: "auto",
                    padding: "0 16px",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {lang === "en" ? "ÍS" : "EN"}
                </GhostBtn>
                <MobileMenuButton
                  onClick={() => setMenuOpen(true)}
                  aria-label="Open menu"
                >
                  ☰
                </MobileMenuButton>
              </RightControls>
            </Row>
          </Container>
        </StickyHeader>
        <AnimatePresence>
          {menuOpen && (
            <MobileMenu
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <button className="close" onClick={() => setMenuOpen(false)}>
                ✕
              </button>

              {t.nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {n.label}
                </a>
              ))}

              <div style={{ marginTop: "auto" }}>
                <GhostBtn onClick={toggleTheme}>
                  {mode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </GhostBtn>
                <GhostBtn onClick={() => setLang(lang === "en" ? "is" : "en")}>
                  {lang === "en" ? "ÍSL" : "EN"}
                </GhostBtn>
              </div>
            </MobileMenu>
          )}
        </AnimatePresence>
        <Hero
          id="hero"
          style={{
            position: "relative",
            height: "100dvh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
            overflow: "hidden",
          }}
        >
          {/* FIXED background layer: image + overlay */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: -2,
              pointerEvents: "none",
            }}
          >
            {/* Image */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${person})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />

            {/* Overlay directly on top of the image */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.75))",
              }}
            />
          </div>

          {/* HERO CONTENT */}
          <Container
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0",
              padding: "0 24px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <H1
                style={{
                  margin: 0,
                  letterSpacing: "-0.03em",
                  fontSize: "clamp(3rem, 10vw, 7rem)",
                  fontWeight: 700,
                  lineHeight: 0.95,
                }}
              >
                {text}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  style={{ display: "inline-block", fontWeight: 300 }}
                >
                  |
                </motion.span>
              </H1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Lead
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "clamp(15px, 2vw, 18px)",
                  maxWidth: "480px",
                  marginTop: "24px",
                }}
              >
                <TypewriterDuftbar
                  afterItems={t.afterItems}
                  forgotYour={t.forgotYour}
                  items={t.items}
                  finalText={
                    lang === "is"
                      ? "Engar áhyggjur, duftbar reddar þessu."
                      : "no worries we got you"
                  }
                />
              </Lead>
            </motion.div>

            <Ctas
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ marginTop: "48px" }}
            >
              <SolidBtn
                href="#contact"
                style={{ background: "#fff", color: "#0a0a0a" }}
              >
                {t.getMachine} <ArrowDown size={16} />
              </SolidBtn>
              <OutlineBtn
                href="#how"
                style={{ borderColor: "rgba(255,255,255,0.25)", color: "#fff" }}
              >
                {t.howItWorks}
              </OutlineBtn>
            </Ctas>
          </Container>
        </Hero>

        {/* Scrolling Brand Banner */}
        <div
          style={{
            width: "100%",
            height: 50,
            background:
              mode === "dark"
                ? "linear-gradient(90deg, #1a1a1a 0%, #0a0a0a 50%, #1a1a1a 100%)"
                : "linear-gradient(90deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%)",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            borderTop: mode === "dark" ? "1px solid #333" : "1px solid #e5e7eb",
            borderBottom:
              mode === "dark" ? "1px solid #333" : "1px solid #e5e7eb",
            position: "relative",
          }}
        >
          <div
            id="brand-banner-scroll"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 60,
              whiteSpace: "nowrap",
              animation: "scrollBanner 25s linear infinite",
              willChange: "transform",
            }}
          >
            {/* Duplicate content for seamless loop */}
            {[0, 1].map((set) =>
              [...Array(15)].map((_, index) => (
                <svg
                  key={`${set}-${index}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 150 32"
                  width="120"
                  height="26"
                  style={{ opacity: 0.7, flexShrink: 0 }}
                >
                  <path
                    fill="currentColor"
                    d="M.783.194 0 31.767h7.085l4.345-18.975h.274l-1.331 18.975h7.045L26.148.194h-6.225l-4.462 19.87h-.274L16.48.193H10.49l-4.736 19.87H5.48L7.046.193H.783ZM32.05 11.86l-2.113 14.113c-.157 1.011-.314 1.556-1.175 1.556-.587 0-.783-.273-.783-.856 0-.155.04-.389.079-.7L30.17 11.86c.157-.972.314-1.555 1.096-1.555.666 0 .9.272.9.933 0 .078-.078.272-.117.622Zm5.637.621c.235-1.477.352-2.527.352-3.266 0-2.994-1.996-3.344-6.028-3.344-6.028 0-6.772.972-7.633 6.61l-1.957 12.831c-.235 1.633-.313 2.8-.313 3.422 0 2.838 1.957 3.188 5.989 3.188 5.91 0 6.81-.894 7.672-6.61l1.918-12.83ZM52.07 12.987c.274-1.789.391-2.917.391-3.305 0-2.528-1.096-3.81-3.17-3.81-.94 0-2.075.466-3.366 1.36l.156-1.205h-5.715l-3.835 25.74h5.675l2.975-19.597c.157-1.01.43-1.438 1.135-1.438.548 0 .783.233.783.816 0 .078 0 .311-.04.622l-.665 4.394h5.128l.548-3.577ZM55.277.194 50.54 31.767h5.675L60.992.194h-5.715ZM70.261.194l-1.056 7.038c-1.057-.894-1.958-1.36-3.093-1.36-3.836 0-4.736 2.915-5.362 7.115l-1.8 11.82c-.236 1.477-.392 2.566-.392 3.266 0 2.45 1.33 3.81 3.64 3.81 1.174 0 2.231-.466 3.484-1.36l.463 1.244h5.095L75.976.194h-5.715Zm-1.8 12.015-1.996 13.337c-.157.972-.431 1.438-1.175 1.438-.548 0-.783-.233-.783-.816 0-.078 0-.273.04-.622l1.996-13.337c.156-1.01.47-1.439 1.174-1.439.509 0 .822.311.822.778 0 .117-.039.311-.078.661ZM98.113 6.532c.195-1.283.313-2.333.313-3.11C98.426.194 96.156 0 91.458 0c-3.483 0-5.636.039-6.967 1.439-1.057 1.127-1.33 2.76-1.683 5.093L79.99 25.39c-.235 1.478-.313 2.644-.313 3.46 0 2.8 2.426 3.15 6.967 3.15 3.444 0 5.558-.117 6.85-1.4 1.174-1.166 1.409-2.838 1.761-5.21l1.096-7.038h-6.654l-1.018 6.844c-.156 1.01-.352 1.594-1.252 1.594-.627 0-.861-.272-.861-.933 0-.156 0-.39.039-.661l2.779-18.47c.156-.971.313-1.555 1.174-1.555.705 0 .979.272.979.933 0 .04-.04.234-.079.623l-.626 4.199h6.615l.666-4.394ZM100.971.194l-4.736 31.573h5.676L106.686.194h-5.715ZM119.831 12.481c.235-1.516.352-2.605.352-3.266 0-2.994-1.996-3.344-6.028-3.344-6.067 0-6.772 1.011-7.633 6.61l-.352 2.294h5.715l.43-2.916c.157-1.01.314-1.555 1.214-1.555.626 0 .783.272.783.933 0 0-.039.194-.118.622l-.509 3.383-5.48 2.955c-2.152 1.166-2.896 2.138-3.248 4.588l-.392 2.527c-.195 1.322-.352 2.411-.352 3.266 0 2.294 1.057 3.344 3.366 3.344 1.331 0 2.505-.466 3.836-1.322l.463 1.167h5.056l2.897-19.286Zm-6.928 8.204-.822 5.288c-.157 1.05-.353 1.556-1.175 1.556-.587 0-.783-.273-.783-.856 0-.194.04-.428.079-.7l.391-2.605c.157-1.088.313-1.827 1.292-2.255l1.018-.428ZM120.038 22.513l-.43 2.8c-.235 1.593-.314 2.76-.314 3.42 0 2.84 1.957 3.19 5.989 3.19 5.872 0 6.811-.895 7.672-6.61l.313-2.334c.118-.7.235-1.4.235-2.06 0-1.284-.587-2.217-1.722-2.878l-2.192-1.244c-1.566-.894-2.584-1.089-2.584-2.41 0-.273.079-.545.118-.895l.235-1.633c.156-1.01.352-1.555 1.096-1.555.665 0 .9.272.9.933 0 .039-.039.233-.117.622l-.431 2.916h5.715l.352-2.294c.235-1.438.352-2.527.352-3.266 0-2.994-1.996-3.344-6.028-3.344-5.245 0-6.732.661-7.476 5.56l-.43 2.683c-.157 1.167-.274 1.983-.274 2.45 0 1.555.822 2.372 2.661 3.344l2.075 1.127c1.448.778 1.8 1.128 1.8 1.983 0 .04 0 .272-.078.739l-.352 2.216c-.157 1.011-.313 1.556-1.174 1.556-.588 0-.783-.273-.783-.856 0-.194.039-.428.078-.7l.509-3.46h-5.715ZM134.813 22.513l-.431 2.8c-.235 1.593-.313 2.76-.313 3.42 0 2.84 1.957 3.19 5.989 3.19 5.871 0 6.811-.895 7.672-6.61l.313-2.334c.117-.7.235-1.4.235-2.06 0-1.284-.587-2.217-1.723-2.878l-2.191-1.244c-1.566-.894-2.584-1.089-2.584-2.41 0-.273.078-.545.118-.895l.234-1.633c.157-1.01.353-1.555 1.096-1.555.666 0 .901.272.901.933 0 .039-.039.233-.118.622l-.43 2.916h5.714l.353-2.294c.235-1.438.352-2.527.352-3.266 0-2.994-1.996-3.344-6.028-3.344-5.245 0-6.732.661-7.476 5.56l-.431 2.683c-.156 1.167-.274 1.983-.274 2.45 0 1.555.822 2.372 2.662 3.344l2.075 1.127c1.448.778 1.8 1.128 1.8 1.983 0 .04 0 .272-.078.739l-.352 2.216c-.157 1.011-.314 1.556-1.175 1.556-.587 0-.783-.273-.783-.856 0-.194.04-.428.079-.7l.509-3.46h-5.715Z"
                  ></path>
                </svg>
              )),
            )}
          </div>
          <style>
            {`
            @keyframes scrollBanner {
              from { transform: translateX(0); }
              to { transform: translateX(calc(-120px * 15 - 60px * 15)); }
            }
          `}
          </style>
        </div>

        <Section
          id="product"
          style={{
            position: "relative",
            overflow: "hidden",
            backgroundColor: mode === "dark" ? "#0a0a0a" : "#fafafa",
            padding: "160px 0",
          }}
        >
          <Container
            style={{
              position: "relative",
              zIndex: 2,
              display: "grid",
              gridTemplateColumns: "1fr",
              alignItems: "center",
              gap: "80px",
              padding: "0 24px",
            }}
          >
            {/* Left: Text block */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ maxWidth: 600 }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  background:
                    mode === "dark"
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,0,0,0.04)",
                  borderRadius: 100,
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: 24,
                  color:
                    mode === "dark"
                      ? "rgba(255,255,255,0.85)"
                      : "rgba(0,0,0,0.5)",
                }}
              >
                {lang === "is" ? "Varan" : "Product"}
              </div>
              <Kicker>{t.duftbarMachine}</Kicker>
              <P
                style={{
                  fontSize: 17,
                  color:
                    mode === "dark"
                      ? "rgba(255,255,255,0.85)"
                      : "rgba(0,0,0,0.6)",
                  lineHeight: 1.8,
                  maxWidth: 520,
                }}
              >
                {t.machineDesc}
              </P>
              <List style={{ marginTop: 32 }}>
                {[
                  t.machineFeatures1,
                  t.machineFeatures2,
                  t.machineFeatures3,
                  t.machineFeatures4,
                  t.machineFeatures5,
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <CheckCircle2
                      size={18}
                      style={{
                        marginTop: 3,
                        color: mode === "dark" ? "#22c55e" : "#16a34a",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        color:
                          mode === "dark"
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(0,0,0,0.7)",
                      }}
                    >
                      {item}
                    </span>
                  </motion.li>
                ))}
              </List>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                position: "relative",
                borderRadius: 32,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "relative",
                  borderRadius: 32,
                  overflow: "hidden",
                  background:
                    mode === "dark"
                      ? "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)"
                      : "linear-gradient(145deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.01) 100%)",
                  border: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"}`,
                }}
              >
                <img
                  src={mashine}
                  alt="Duftbar Machine"
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: 32,
                    display: "block",
                  }}
                />
              </div>
            </motion.div>
          </Container>
        </Section>

        <Section
          id="how"
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "160px 0",
            background: mode === "dark" ? "#0a0a0a" : "#1a1a1a",
            isolation: "isolate",
          }}
        >
          <Container
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "0 24px",
              gap: "80px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: 100,
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: 24,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                {lang === "is" ? "Hvernig virkar þetta" : "How it works"}
              </div>
              <Kicker style={{ color: "white" }}>{t.howItWorks}</Kicker>
              <P
                style={{
                  fontSize: 17,
                  color: "rgba(255,255,255,0.75)",
                  maxWidth: 500,
                  margin: "16px auto 0",
                  lineHeight: 1.7,
                }}
              >
                {t.howDesc}
              </P>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                justifyItems: "stretch",
                alignItems: "stretch",
                gap: "24px",
                maxWidth: 1000,
                width: "100%",
                position: "relative",
              }}
            >
              {[
                {
                  icon: <MousePointerClick size={22} />,
                  title: t.stepChoose,
                  text: t.stepChooseText,
                  iconColor: "#6366f1",
                },
                {
                  icon: <Sparkles size={22} />,
                  title: t.stepTap,
                  text: t.stepTapText,
                  iconColor: "#f59e0b",
                },
                {
                  icon: <CheckCircle2 size={22} />,
                  title: t.stepGo,
                  text: t.stepGoText,
                  iconColor: "#10b981",
                },
              ].map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    position: "relative",
                    background:
                      mode === "dark"
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(255,255,255,0.95)",
                    border: `1px solid ${
                      mode === "dark"
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(0,0,0,0.05)"
                    }`,
                    borderRadius: 24,
                    padding: "40px 28px 36px",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background:
                        mode === "dark"
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(0,0,0,0.04)",
                      color: step.iconColor,
                      marginBottom: 20,
                    }}
                  >
                    {step.icon}
                  </div>

                  <h3
                    style={{
                      marginTop: 0,
                      fontSize: 18,
                      fontWeight: 600,
                      color: mode === "dark" ? "#fff" : "#0a0a0a",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      marginTop: 10,
                      color:
                        mode === "dark"
                          ? "rgba(255,255,255,0.5)"
                          : "rgba(0,0,0,0.5)",
                      lineHeight: 1.6,
                      fontSize: 15,
                    }}
                  >
                    {step.text}
                  </p>
                </motion.li>
              ))}
            </motion.ul>

            <div
              style={{
                position: "relative",
                maxWidth: 1000,
                width: "100%",
                marginTop: 40,
                background: mode === "dark" ? "#0a0a0a" : "#fff",
                borderRadius: 24,
                padding: 4,
                isolation: "isolate",
                transform: "translateZ(0)",
              }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: 20,
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                }}
              >
                <source src={duftbar} type="video/webm" />
              </video>
            </div>
          </Container>
        </Section>

        <Section
          id="spaces"
          style={{ background: mode === "dark" ? "#0a0a0a" : "#fafafa" }}
        >
          <Container style={{ padding: "160px 24px" }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: "center", marginBottom: 64 }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  background:
                    mode === "dark"
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,0,0,0.04)",
                  borderRadius: 100,
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: 24,
                  color:
                    mode === "dark"
                      ? "rgba(255,255,255,0.5)"
                      : "rgba(0,0,0,0.4)",
                }}
              >
                {lang === "is" ? "Staðsetningar" : "Locations"}
              </div>
              <Kicker>{t.spacesTitle}</Kicker>
              <P
                style={{
                  maxWidth: 500,
                  margin: "16px auto 0",
                  color:
                    mode === "dark"
                      ? "rgba(255,255,255,0.8)"
                      : "rgba(0,0,0,0.5)",
                }}
              >
                {t.spacesDesc}
              </P>
            </motion.div>

            <Grid2>
              {t.spaces.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    background:
                      mode === "dark" ? "rgba(255,255,255,0.02)" : "#fff",
                    border: `1px solid ${
                      mode === "dark"
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(0,0,0,0.05)"
                    }`,
                    borderRadius: 24,
                    padding: 32,
                    textAlign: "left",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 48,
                      height: 48,
                      marginBottom: 20,
                      borderRadius: "50%",
                      background: mode === "dark" ? "#fff" : "#0a0a0a",
                      color: mode === "dark" ? "#0a0a0a" : "#fff",
                    }}
                  >
                    {i === 0 && <Dumbbell size={20} />}
                    {i === 1 && <Sparkles size={20} />}
                    {i === 2 && <CheckCircle2 size={20} />}
                    {i === 3 && <MapPin size={20} />}
                  </div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 18,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s.title}
                  </div>
                  <div
                    style={{
                      marginTop: 10,
                      fontSize: 15,
                      color:
                        mode === "dark"
                          ? "rgba(255,255,255,0.5)"
                          : "rgba(0,0,0,0.5)",
                      lineHeight: 1.6,
                    }}
                  >
                    {s.text}
                  </div>
                </motion.div>
              ))}
            </Grid2>
          </Container>
        </Section>

        <Section
          id="team"
          style={{
            background: "transparent",
          }}
        >
          <Container style={{ padding: "160px 24px" }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: "center", marginBottom: 64 }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  background: "rgba(255,255,255,0.12)",
                  borderRadius: 100,
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: 24,
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                {lang === "is" ? "Teymið" : "Team"}
              </div>
              <Kicker
                style={{
                  color: "white",
                }}
              >
                {lang === "is" ? "Við erum duftbar" : "Meet the Team"}
              </Kicker>
              <P
                style={{
                  color: "rgba(255,255,255,0.9)",
                  maxWidth: 500,
                  margin: "16px auto 0",
                }}
              >
                {t.teamIntro}
              </P>
            </motion.div>

            <Grid3>
              {t.team.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    background:
                      mode === "dark"
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(255,255,255,0.95)",
                    border: `1px solid ${
                      mode === "dark"
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(0,0,0,0.05)"
                    }`,
                    borderRadius: 24,
                    padding: 32,
                    textAlign: "center",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <img
                    src={m.img}
                    alt={m.name}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      objectFit: "cover",
                      margin: "0 auto 20px",
                      border: `3px solid ${mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
                    }}
                  />
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 600,
                      color: mode === "dark" ? "#fff" : "#0a0a0a",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {m.name}
                  </div>
                  <div
                    style={{
                      marginTop: 4,
                      fontSize: 13,
                      fontWeight: 500,
                      color:
                        mode === "dark"
                          ? "rgba(255,255,255,0.85)"
                          : "rgba(0,0,0,0.6)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {m.role}
                  </div>
                  <div
                    style={{
                      marginTop: 16,
                      fontSize: 14,
                      lineHeight: 1.6,
                      color:
                        mode === "dark"
                          ? "rgba(255,255,255,0.9)"
                          : "rgba(0,0,0,0.7)",
                    }}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
            </Grid3>
          </Container>
        </Section>
        <Contact id="contact">
          <Container style={{ padding: "160px 24px" }}>
            <ContactGrid>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "8px 16px",
                    background: "rgba(0,0,0,0.04)",
                    borderRadius: 100,
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    marginBottom: 24,
                    color: "rgba(0,0,0,0.4)",
                  }}
                >
                  {lang === "is" ? "Hafa samband" : "Contact"}
                </div>
                <Kicker style={{ color: "#0a0a0a" }}>{t.bringDuftbar}</Kicker>
                <P style={{ color: "rgba(0,0,0,0.5)", maxWidth: 400 }}>
                  {t.bringDesc}
                </P>

                <ContactForm
                  style={{ marginTop: 40 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    emailjs
                      .sendForm(
                        "service_2t3o7gx",
                        "template_b82hfq7", // Template ID
                        e.target as HTMLFormElement,
                        "Y0n17dXccHdv0lIs4", // Public Key
                      )
                      .then(
                        () => {
                          alert("Takk! Beiðnin þín hefur verið send 🚀");
                        },
                        (error) => {
                          console.error(error);
                          alert("Villa kom upp við að senda email 😢");
                        },
                      );
                  }}
                >
                  <input name="name" placeholder={t.formName} required />
                  <input name="email" placeholder={t.formContact} required />
                  <input
                    name="venue"
                    className="wide"
                    placeholder={t.formVenue}
                  />
                  <textarea
                    name="message"
                    className="wide"
                    placeholder={t.formNotes}
                    rows={4}
                  />
                  <PrimarySubmit type="submit">
                    {t.requestPlacement} <ArrowRight size={16} />
                  </PrimarySubmit>
                </ContactForm>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <SideCard as="section" aria-labelledby="contact-info">
                  <VisuallyHidden as="h3" id="contact-info">
                    Contact information
                  </VisuallyHidden>
                  <address
                    style={{ all: "unset" }}
                    itemScope
                    itemType="https://schema.org/Organization"
                  >
                    <meta itemProp="name" content="Duftbar" />

                    <ContactRow role="group" aria-label="Location">
                      <MapPin
                        size={18}
                        aria-hidden="true"
                        style={{ opacity: 0.6 }}
                      />
                      <div>
                        <ContactLabel
                          itemProp="address"
                          itemScope
                          itemType="https://schema.org/PostalAddress"
                        >
                          <span itemProp="addressLocality">
                            {t.contactLocationLabel}
                          </span>
                        </ContactLabel>
                        <ContactSub>{t.contactLocationSub}</ContactSub>
                      </div>
                    </ContactRow>

                    <ContactRow role="group" aria-label="Email">
                      <Mail
                        size={18}
                        aria-hidden="true"
                        style={{ opacity: 0.6 }}
                      />
                      <div>
                        <ContactLabel>
                          <a
                            href={`mailto:${t.contactEmailLabel}`}
                            itemProp="email"
                            rel="nofollow"
                          >
                            {t.contactEmailLabel}
                          </a>
                        </ContactLabel>
                        <ContactSub>{t.contactEmailSub}</ContactSub>
                      </div>
                    </ContactRow>

                    <ContactRow role="group" aria-label="Phone">
                      <Phone
                        size={18}
                        aria-hidden="true"
                        style={{ opacity: 0.6 }}
                      />
                      <div>
                        <ContactLabel>
                          <a
                            href={`tel:${t.contactPhoneLabel.replace(
                              /\s+/g,
                              "",
                            )}`}
                            itemProp="telephone"
                            rel="nofollow"
                          >
                            {t.contactPhoneLabel}
                          </a>
                        </ContactLabel>
                        <ContactSub>{t.contactPhoneSub}</ContactSub>
                      </div>
                    </ContactRow>
                  </address>
                </SideCard>
              </motion.div>
            </ContactGrid>
          </Container>
        </Contact>

        {/* Footer */}
        <FooterWrap>
          <Container
            style={{
              padding: "80px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
              textAlign: "center",
            }}
          >
            <Logo size={28} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <div
                style={{
                  fontWeight: 500,
                  fontSize: 13,
                  letterSpacing: "-0.01em",
                }}
              >
                © {new Date().getFullYear()} Duftbar ehf.
              </div>
              <div style={{ fontSize: 12, opacity: 0.5 }}>{t.footerMade}</div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 8,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  opacity: 0.4,
                }}
              >
                {t.footerPayments}
              </span>
              <img
                src="https://logosandtypes.com/wp-content/uploads/2024/07/verifone.svg"
                alt="Verifone"
                loading="lazy"
                decoding="async"
                style={{
                  height: 20,
                  filter: mode === "dark" ? "invert(1) grayscale(1)" : "none",
                  opacity: 0.5,
                }}
              />
            </div>
          </Container>
        </FooterWrap>
      </Page>
    </ThemeProvider>
  );
}
