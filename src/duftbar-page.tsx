import React, { JSX, useEffect, useState } from "react";
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
      const h = document.documentElement;
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(scrolled);
    };
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) {
      setMode(saved);
    } else {
      setMode("light");
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"duftbar" | "dots" | "eraseDots" | "wink">(
    "duftbar"
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
    a.length > b.length ? a : b
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
          prev !== null ? (prev + 1) % afterItems.length : 0
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
    <ThemeProvider theme={mode === "dark" ? dark : light}>
      <GlobalStyle />
      <Page>
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            height: 12,
            width: `${progress}%`,
            background: mode === "dark" ? "#fafafa" : "#0a0a0a",
            zIndex: 50,
            transition: "width .15s",
            marginBottom: -12,
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
                  gap: 8,
                  cursor: "pointer",
                }}
              >
                <Logo size={28} />
                <span style={{ fontWeight: 600 }}>duftbar</span>
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
                  <GhostBtn onClick={toggleTheme}>
                    {mode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                  </GhostBtn>
                </ThemeToggleWrap>
                <GhostBtn onClick={() => setLang(lang === "en" ? "is" : "en")}>
                  {lang === "en" ? "ÍSL" : "EN"}
                </GhostBtn>
                <MobileMenuButton onClick={() => setMenuOpen(true)}>
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
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundImage: `url(${person})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",

              zIndex: -2, // stays behind EVERYTHING
              pointerEvents: "none",
            }}
          />

          {/* Dark gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.65))",
              zIndex: -1,
            }}
          />

          {/* Content */}
          <Container
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.2rem",
              padding: "0 24px",
            }}
          >
            <H1
              style={{
                margin: 0,
                letterSpacing: "-0.02em",
                fontSize: "clamp(3.5rem, 9vw, 4.5rem)",
                fontWeight: 800,
                lineHeight: 1.05,
              }}
            >
              {text}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                style={{ display: "inline-block" }}
              >
                |
              </motion.span>
            </H1>

            <Lead
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "clamp(16px, 2vw, 20px)",
                maxWidth: "640px",
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

            <Ctas
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <SolidBtn href="#contact">
                {t.getMachine} <ArrowDown size={16} />
              </SolidBtn>
              <OutlineBtn href="#how">{t.howItWorks}</OutlineBtn>
            </Ctas>
          </Container>
        </Hero>

        <Section
          id="product"
          style={{
            position: "relative",
            overflow: "hidden",
            backgroundColor: mode === "dark" ? "#0e0e10" : "#f8fafc",
            padding: "140px 0",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                mode === "dark"
                  ? "linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(0,0,0,0.3))"
                  : "linear-gradient(to bottom right, rgba(255,255,255,0.7), rgba(255,255,255,0.5))",
              zIndex: 1,
            }}
          />

          <Container
            style={{
              position: "relative",
              zIndex: 2,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              alignItems: "center",
              gap: "64px",
              padding: "0 24px",
            }}
          >
            {/* Left: Text block */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Kicker>{t.duftbarMachine}</Kicker>
              <P
                style={{
                  fontSize: 18,
                  color: mode === "dark" ? "#d1d5db" : "#374151",
                  lineHeight: 1.7,
                  maxWidth: 560,
                }}
              >
                {t.machineDesc}
              </P>
              <List style={{ marginTop: 24 }}>
                {[
                  t.machineFeatures1,
                  t.machineFeatures2,
                  t.machineFeatures3,
                  t.machineFeatures4,
                  t.machineFeatures5,
                ].map((item, i) => (
                  <li key={i}>
                    <CheckCircle2
                      size={20}
                      style={{
                        marginTop: 2,
                        color: mode === "dark" ? "#22c55e" : "#16a34a",
                        flexShrink: 0,
                      }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </List>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                position: "relative",
                borderRadius: 24,
                overflow: "hidden",
                boxShadow:
                  mode === "dark"
                    ? "0 20px 60px -20px rgba(0,0,0,0.7)"
                    : "0 20px 60px -20px rgba(0,0,0,0.2)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "-20%",
                  background:
                    mode === "dark"
                      ? "radial-gradient(circle at 70% 40%, rgba(59,130,246,0.3), transparent)"
                      : "radial-gradient(circle at 70% 40%, rgba(96,165,250,0.2), transparent)",
                  zIndex: 0,
                }}
              />

              <div
                style={{
                  position: "relative",
                  borderRadius: 24,
                  overflow: "hidden",
                  background:
                    mode === "dark"
                      ? "rgba(30,30,32,0.6)"
                      : "rgba(255,255,255,0.65)",
                }}
              >
                <img
                  src={mashine}
                  alt="Duftbar Machine"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: 24,
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
            padding: "140px 0",
            background: "transparent",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
            }}
          />

          <Container
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "0 24px",
              gap: "64px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Kicker style={{ color: "white" }}>{t.howItWorks}</Kicker>
              <P
                style={{
                  fontSize: 18,
                  color: "white",
                  maxWidth: 620,
                  margin: "12px auto 0",
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
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                justifyItems: "stretch",
                alignItems: "stretch",
                gap: "48px",
                maxWidth: 1000,
                width: "100%",
                position: "relative",
              }}
            >
              {[
                {
                  icon: <Dumbbell size={22} />,
                  title: t.stepChoose,
                  text: t.stepChooseText,
                },
                {
                  icon: <Sparkles size={22} />,
                  title: t.stepTap,
                  text: t.stepTapText,
                },
                {
                  icon: <CheckCircle2 size={22} />,
                  title: t.stepGo,
                  text: t.stepGoText,
                },
              ].map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  style={{
                    position: "relative",
                    background: mode === "dark" ? "#1a1a1d" : "#ffffff",
                    border: `1px solid ${
                      mode === "dark" ? "#2f2f32" : "rgba(255, 255, 255, 1)"
                    }`,
                    borderRadius: 24,
                    padding: "48px 32px",
                    boxShadow:
                      mode === "dark"
                        ? "0 10px 40px -20px rgba(0,0,0,0.8)"
                        : "0 10px 40px -20px rgba(0,0,0,0.15)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: -24,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "black",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
                    }}
                  >
                    {step.icon}
                  </div>

                  <h3
                    style={{
                      marginTop: 32,
                      fontSize: 20,
                      fontWeight: 700,
                      color: mode === "dark" ? "#f9fafb" : "#111827",
                    }}
                  >
                    {`${i + 1}. ${step.title}`}
                  </h3>

                  <p
                    style={{
                      marginTop: 12,
                      color: mode === "dark" ? "#c7c7c7" : "#4b5563",
                      lineHeight: 1.6,
                    }}
                  >
                    {step.text}
                  </p>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                position: "relative",
                borderRadius: 24,
                overflow: "hidden",
                maxWidth: 960,
                width: "100%",
                marginTop: 64,
                boxShadow:
                  "0 1px 0 rgba(255,255,255,.05) inset, 0 30px 80px -40px rgba(0,0,0,.5)",
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
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 24,
                  display: "block",
                  backgroundColor: "#000",
                }}
              >
                <source src={duftbar} type="video/mp4" />
              </video>
            </motion.div>
          </Container>
        </Section>

        <Section
          id="spaces"
          style={{ background: mode === "dark" ? "#0f0f11" : "#fafafa" }}
        >
          <Container style={{ padding: "96px 24px" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: "center", marginBottom: 48 }}
            >
              <Kicker>{t.spacesTitle}</Kicker>
              <P style={{ maxWidth: 640, margin: "12px auto 0" }}>
                {t.spacesDesc}
              </P>
            </motion.div>

            <Grid2>
              {t.spaces.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{
                    background: mode === "dark" ? "#1a1a1c" : "#fff",
                    border: `1px solid ${
                      mode === "dark" ? "#2d2d2f" : "#e5e7eb"
                    }`,
                    borderRadius: 20,
                    padding: 28,
                    textAlign: "center",
                    boxShadow:
                      "0 1px 0 rgba(0,0,0,.04), 0 12px 40px -20px rgba(0,0,0,.2)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 56,
                      height: 56,
                      margin: "0 auto 16px",
                      borderRadius: 16,
                      background: mode === "dark" ? "#111" : "#f4f4f5",
                    }}
                  >
                    {i === 0 && <Dumbbell size={28} />}
                    {i === 1 && <Sparkles size={28} />}
                    {i === 2 && <CheckCircle2 size={28} />}
                    {i === 3 && <MapPin size={28} />}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>{s.title}</div>
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 15,
                      color: mode === "dark" ? "#c7c7c7" : "#525252",
                      lineHeight: 1.5,
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
          <Container style={{ padding: "96px 24px" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: "center", marginBottom: 48 }}
            >
              <Kicker style={{ color: "white" }}>
                {lang === "is" ? "Við erum duftbar" : "Meet the Team"}
              </Kicker>
              <P
                style={{ color: "white", maxWidth: 640, margin: "12px auto 0" }}
              >
                {t.teamIntro}
              </P>
            </motion.div>

            <Grid3>
              {t.team.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{
                    background: mode === "dark" ? "#1a1a1c" : "#fff",
                    border: `1px solid ${
                      mode === "dark" ? "#2d2d2f" : "#e5e7eb"
                    }`,
                    borderRadius: 20,
                    padding: 28,
                    textAlign: "center",
                    boxShadow:
                      "0 1px 0 rgba(0,0,0,.04), 0 12px 40px -20px rgba(0,0,0,.2)",
                  }}
                >
                  <img
                    src={m.img}
                    alt={m.name}
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: "50%",
                      objectFit: "cover",
                      margin: "0 auto 16px",
                      boxShadow: "0 4px 12px rgba(0,0,0,.15)",
                    }}
                  />

                  <div
                    style={{
                      marginTop: 4,
                      fontSize: 14,
                      fontWeight: 500,
                      color: mode === "dark" ? "#a1a1aa" : "#4b5563",
                    }}
                  >
                    {m.role}
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      fontSize: 15,
                      lineHeight: 1.5,
                      color: mode === "dark" ? "#c7c7c7" : "#525252",
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
          <Container style={{ padding: "96px 24px" }}>
            <ContactGrid>
              <div>
                <Kicker style={{ color: "#0a0a0a" }}>{t.bringDuftbar}</Kicker>
                <P style={{ color: "#4b5563" }}>{t.bringDesc}</P>

                <ContactForm
                  onSubmit={(e) => {
                    e.preventDefault();
                    emailjs
                      .sendForm(
                        "service_2t3o7gx",
                        "template_b82hfq7", // Template ID
                        e.target as HTMLFormElement,
                        "Y0n17dXccHdv0lIs4" // Public Key
                      )
                      .then(
                        () => {
                          alert("Takk! Beiðnin þín hefur verið send 🚀");
                        },
                        (error) => {
                          console.error(error);
                          alert("Villa kom upp við að senda email 😢");
                        }
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
              </div>

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
                    <MapPin size={20} aria-hidden="true" />
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
                    <Mail size={20} aria-hidden="true" />
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
                    <Phone size={20} aria-hidden="true" />
                    <div>
                      <ContactLabel>
                        <a
                          href={`tel:${t.contactPhoneLabel.replace(
                            /\s+/g,
                            ""
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
            </ContactGrid>
          </Container>
        </Contact>

        {/* Footer */}
        <FooterWrap>
          <Container
            style={{
              padding: "64px 24px",
              display: "grid",
              gap: 32,
              gridTemplateColumns: "1fr",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                textAlign: "center",
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 16 }}>
                © {new Date().getFullYear()} Duftbar ehf.
              </div>
              <div style={{ fontSize: 14 }}>{t.footerMade}</div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  letterSpacing: ".05em",
                  textTransform: "uppercase",
                }}
              >
                {t.footerPayments}
              </div>
              <img
                src="https://logosandtypes.com/wp-content/uploads/2024/07/verifone.svg"
                alt="Verifone"
                style={{
                  height: 28,
                  filter: mode === "dark" ? "invert(1) grayscale(1)" : "none",
                }}
              />
            </div>
          </Container>
        </FooterWrap>
      </Page>
    </ThemeProvider>
  );
}
