import React, { JSX, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
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
} from "./primatives";
import { MachineMiniSVG } from "./mashine-svg";
import { GlobalStyle } from "./global-styles";
import { dark, light } from "./theme";
import { Locale, locale } from "./locale";
import { Logo } from "./logo";

export default function DuftbarPage(): JSX.Element {
  const [progress, setProgress] = useState<number>(0);
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [lang, setLang] = useState<Locale>("en");
  const t = locale[lang];

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(scrolled);
    };
    const saved =
      (localStorage.getItem("theme") as "light" | "dark" | null) ?? null;
    setMode(
      saved ??
        (window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
          ? "dark"
          : "light")
    );
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
          }}
        />

        <StickyHeader>
          <Container>
            <Row>
              {/* Logo + text */}
              <a
                href="#hero"
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <Logo size={28} />
                <span style={{ fontWeight: 600 }}>duftbar</span>
              </a>

              {/* Desktop nav */}
              <TopNav>
                {t.nav.map((n) => (
                  <a key={n.href} href={n.href}>
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

        <Hero id="hero">
          <HeroBg />
          <Container style={{ padding: "128px 24px" }}>
            <H1
              style={{
                lineHeight: 1.1,
                textAlign: "center",
                margin: 0,
                fontSize: "clamp(3rem, 6vw, 5rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              {text}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                style={{
                  display: "inline-block",
                  fontSize: "0.8em",
                }}
              >
                |
              </motion.span>
            </H1>
            <Lead
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.5rem",
              }}
            >
              {/* STAGE: fast breidd, miðjuð; vinstri brún = upphafspunktur allra fasa */}
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    visibility: "hidden",
                    height: 0,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span>Forgot your </span>
                  <span>{longestItem}</span>
                  <div>{longestAfter}</div>
                </div>

                {/* VISIBLE CONTENT */}
                {phaseIndex === null ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span
                      style={{
                        lineHeight: "1.2em",
                      }}
                    >
                      {t.forgotYour}&nbsp;
                    </span>

                    <span
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: `${longestItem.length}ch`,
                        height: "1.2em",
                        lineHeight: "1.2em",
                      }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={items[index]}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.35 }}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {items[index]}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </div>
                ) : (
                  <span
                    style={{
                      position: "relative",
                      display: "inline-block",
                      height: "1.2em",
                      lineHeight: "1.2em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {/* ghost til að halda stöðugri hæð/breidd */}
                    <span style={{ visibility: "hidden" }}>{longestAfter}</span>

                    <AnimatePresence mode="wait">
                      <motion.span
                        key={afterItems[phaseIndex]}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35 }}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {afterItems[phaseIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                )}
              </div>
            </Lead>

            <Ctas
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <SolidBtn href="#contact">
                {t.getMachine} <ArrowRight size={16} />
              </SolidBtn>
              <OutlineBtn href="#how">{t.howItWorks}</OutlineBtn>
            </Ctas>
          </Container>
        </Hero>

        {/* Product */}
        <Section id="product" bordered>
          <Container style={{ padding: "96px 24px" }}>
            <Grid2>
              <Card
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <MachineMiniSVG />
              </Card>

              <motion.div
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Kicker>{t.duftbarMachine}</Kicker>
                <P>{t.machineDesc}</P>
                <List>
                  {[
                    t.machineFeatures1,
                    t.machineFeatures2,
                    t.machineFeatures3,
                    t.machineFeatures4,
                  ].map((item) => (
                    <li key={item}>
                      <CheckCircle2 size={20} style={{ marginTop: 2 }} />
                      {item}
                    </li>
                  ))}
                </List>
              </motion.div>
            </Grid2>
          </Container>
        </Section>

        {/* How it works */}
        <Section
          id="how"
          style={{ background: mode === "dark" ? "#111214" : "#f6f6f7" }}
        >
          <Container style={{ padding: "96px 24px" }}>
            <Grid2>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ order: 2 }}
              >
                <Kicker>{t.howItWorks}</Kicker>
                <P>{t.howDesc}</P>
                <HowGrid>
                  {[
                    {
                      icon: <Dumbbell size={20} />,
                      title: t.stepChoose,
                      text: t.stepChooseText,
                    },
                    {
                      icon: <Sparkles size={20} />,
                      title: t.stepTap,
                      text: t.stepTapText,
                    },
                    {
                      icon: <CheckCircle2 size={20} />,
                      title: t.stepGo,
                      text: t.stepGoText,
                    },
                  ].map((s, i) => (
                    <li key={i}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <div
                          style={{
                            border: "1px solid var(--outline,#e5e7eb)",
                            borderRadius: 12,
                            padding: 8,
                          }}
                        >
                          {s.icon}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            letterSpacing: ".12em",
                            textTransform: "uppercase",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </div>
                      </div>
                      <div style={{ marginTop: 12, fontWeight: 700 }}>
                        {s.title}
                      </div>
                      <div
                        style={{
                          color: mode === "dark" ? "#c7c7c7" : "#525252",
                        }}
                      >
                        {s.text}
                      </div>
                    </li>
                  ))}
                </HowGrid>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ order: 1 }}
              >
                <div
                  style={{
                    position: "relative",
                    borderRadius: 24,
                    overflow: "hidden",
                    background: "linear-gradient(135deg, #1f1f22, #0a0a0a)",
                    aspectRatio: "16/10",
                    boxShadow:
                      "0 1px 0 rgba(255,255,255,.08) inset, 0 30px 80px -40px rgba(0,0,0,.5)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      opacity: 0.3,
                      background:
                        "radial-gradient(60rem 40rem at 10% 10%, #60a5fa, transparent), radial-gradient(60rem 40rem at 90% 90%, #a78bfa, transparent)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MachineMiniSVG />
                  </div>
                </div>
              </motion.div>
            </Grid2>
          </Container>
        </Section>

        {/* Contact */}
        <Contact id="contact">
          <Container style={{ padding: "96px 24px" }}>
            <ContactGrid>
              <div>
                <Kicker style={{ color: "#0a0a0a" }}>{t.bringDuftbar}</Kicker>
                <P style={{ color: "#4b5563" }}>{t.bringDesc}</P>

                <ContactForm onSubmit={(e) => e.preventDefault()}>
                  <input placeholder={t.formName} />
                  <input placeholder={t.formContact} />
                  <input className="wide" placeholder={t.formVenue} />
                  <textarea
                    className="wide"
                    placeholder={t.formNotes}
                    rows={4}
                  />
                  <PrimarySubmit type="submit">
                    {t.requestPlacement} <ArrowRight size={16} />
                  </PrimarySubmit>
                </ContactForm>
              </div>

              <SideCard>
                <div className="row">
                  <MapPin size={20} />
                  <div>
                    <div className="label">Reykjavík, Iceland</div>
                    <div className="sub">
                      Installations across IS — EU pilots on request
                    </div>
                  </div>
                </div>
                <div className="row">
                  <Mail size={20} />
                  <div>
                    <div className="label">hello@duftbar.is</div>
                    <div className="sub">24h response on weekdays</div>
                  </div>
                </div>
                <div className="row">
                  <Phone size={20} />
                  <div>
                    <div className="label">+354 555 0000</div>
                    <div className="sub">Sales &amp; Support</div>
                  </div>
                </div>
              </SideCard>
            </ContactGrid>
          </Container>
        </Contact>

        {/* Footer */}
        <FooterWrap>
          <Container
            style={{
              padding: "40px 24px",
              display: "flex",
              gap: 12,
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <div style={{ fontSize: 14 }}>
              © {new Date().getFullYear()} Duftbar ehf.
            </div>
            <div style={{ fontSize: 14 }}>{t.footerMade}</div>
          </Container>
        </FooterWrap>
      </Page>
    </ThemeProvider>
  );
}
