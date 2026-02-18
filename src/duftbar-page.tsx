import React, {
  JSX,
  useEffect,
  useState,
  useRef,
  useCallback,
  lazy,
  memo,
} from "react";
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
  MousePointerClick,
  TrendingUp,
  Eye,
  Clock,
  Shield,
  Users,
  Zap,
  Target,
  X,
  Check,
  Plus,
  Menu,
} from "lucide-react";

import {
  Page,
  StickyHeader,
  Container,
  Row,
  Nav as TopNav,
  HeaderActions,
  GhostBtn,
  Hero,
  H1,
  Lead,
  SolidBtn,
  VisuallyHidden,
  ContactRow,
  ContactLabel,
  ContactSub,
  Section,
  P,
  Contact,
  ContactGrid,
  ContactForm,
  PrimarySubmit,
  SideCard,
  FooterWrap,
  MobileMenuButton,
  MobileMenu,
  RightControls,
} from "./primatives";
import { GlobalStyle } from "./global-styles";
import { light } from "./theme";
import { Locale, locale, LocaleStrings } from "./locale";
import { Logo } from "./logo";
import { TypewriterDuftbar } from "./roller";

// FAQ Accordion Component
const FAQ = ({ t }: { t: LocaleStrings }) => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {t.faqs.map((faq: any, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          style={{
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            style={{
              width: "100%",
              padding: "24px 28px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              fontSize: "17px",
              fontWeight: 600,
              color: "#0a0a0a",
              transition: "all 0.2s ease",
            }}
          >
            <span>{faq.question}</span>
            <motion.div
              animate={{ rotate: openIndex === index ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              style={{
                flexShrink: 0,
                marginLeft: "16px",
              }}
            >
              <Plus size={20} />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div
                  style={{
                    padding: "0 28px 24px",
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: "rgba(0,0,0,0.6)",
                  }}
                >
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default function DuftbarPage(): JSX.Element {
  const [progress, setProgress] = useState<number>(0);
  const [lang, setLang] = useState<Locale>("is");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navSectionIds = [
    "how",
    "features",
    "benefits",
    "comparison",
    "faq",
    "spaces",
    "team",
    "contact",
  ];

  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrollingTo, setIsScrollingTo] = useState<string | null>(null);

  useEffect(() => {
    const getActiveFromScroll = () => {
      // If we're programmatically scrolling to a section, lock to that section
      if (isScrollingTo) return;

      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;
      const docH = document.documentElement.scrollHeight;

      // At bottom of page, activate last section
      if (scrollY + viewportH >= docH - 50) {
        setActiveSection(`#${navSectionIds[navSectionIds.length - 1]}`);
        return;
      }

      // Find which section occupies the most viewport space
      let bestId = "";
      let bestOverlap = 0;
      const trigger = viewportH * 0.4; // top 40% of viewport is the "trigger zone"

      for (const id of navSectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        // Section must have its top within viewport to be considered
        if (rect.top > viewportH) continue;

        // How much of this section is in the top portion of viewport
        const top = Math.max(rect.top, 0);
        const bottom = Math.min(rect.bottom, trigger);
        const overlap = Math.max(0, bottom - top);

        // Also give priority if section top is close to viewport top
        const distFromTop = Math.abs(rect.top);
        const proximity = distFromTop < 200 ? 200 - distFromTop : 0;
        const score = overlap + proximity;

        if (score > bestOverlap) {
          bestOverlap = score;
          bestId = id;
        }
      }

      // Only set active if a section actually scored (not on hero)
      setActiveSection(bestId ? `#${bestId}` : "");
    };

    const onScroll = () => {
      requestAnimationFrame(getActiveFromScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial check
    getActiveFromScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [isScrollingTo]);

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;

    // Lock active state immediately
    setActiveSection(href);
    setIsScrollingTo(href);

    el.scrollIntoView({ behavior: "smooth", block: "start" });

    // Release lock after scroll completes
    // Listen for scroll end
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const onScrollEnd = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrollingTo(null);
        window.removeEventListener("scroll", onScrollEnd);
      }, 100);
    };
    window.addEventListener("scroll", onScrollEnd, { passive: true });

    // Safety fallback
    setTimeout(() => {
      setIsScrollingTo(null);
      window.removeEventListener("scroll", onScrollEnd);
    }, 1500);
  };

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

  const getCurrentSectionIndex = () => {
    if (!activeSection) return -1;
    const index = t.nav.findIndex((n) => n.href === activeSection);
    return index >= 0 ? index : -1;
  };

  return (
    <ThemeProvider theme={light}>
      <GlobalStyle />
      <Page>
        {/* Vertical Navigation - Right Side */}
        {(() => {
          const currentIdx = getCurrentSectionIndex();
          const totalItems = t.nav.length;
          const itemHeight = 150;
          const dotSize = 8;
          const activeDotSize = 10;
          const totalHeight = (totalItems - 1) * itemHeight;

          // Progress line: from center of first dot to center of active dot
          const progressHeight =
            currentIdx <= 0 ? 0 : (currentIdx / (totalItems - 1)) * totalHeight;

          return (
            <div
              style={{
                position: "fixed",
                right: "40px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 100,
                display: window.innerWidth < 1024 ? "none" : "block",
              }}
            >
              {/* Track container — exact height matches dot-to-dot distance */}
              <div style={{ position: "relative", height: totalHeight }}>
                {/* Background track line */}
                <div
                  style={{
                    position: "absolute",
                    right: `${activeDotSize / 2 - 1}px`,
                    top: "0",
                    height: "100%",
                    width: "2px",
                    background: "rgba(0,0,0,0.08)",
                    borderRadius: "1px",
                  }}
                />

                {/* Active progress line */}
                <div
                  style={{
                    position: "absolute",
                    right: `${activeDotSize / 2 - 1}px`,
                    top: "0",
                    width: "2px",
                    height: `${progressHeight}px`,
                    background: "#000",
                    borderRadius: "1px",
                    transition: "height 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                    willChange: "height",
                  }}
                />

                {/* Navigation items positioned at exact intervals */}
                {t.nav.map((navItem, index) => {
                  const isActive = activeSection === navItem.href;
                  const isPast = index <= currentIdx;
                  const yPos = index * itemHeight;
                  const currentDotSize = isActive ? activeDotSize : dotSize;

                  return (
                    <div
                      key={navItem.href}
                      style={{
                        position: "absolute",
                        right: "0",
                        top: `${yPos}px`,
                        transform: "translateY(-50%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: "14px",
                      }}
                    >
                      {/* Label */}
                      <a
                        href={navItem.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(navItem.href);
                        }}
                        style={{
                          fontSize: "13px",
                          fontWeight: isActive ? 600 : 400,
                          letterSpacing: isActive ? "-0.01em" : "0",
                          color: isActive ? "#000" : "rgba(0,0,0,0.45)",
                          textDecoration: "none",
                          transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                          transform: isActive
                            ? "translateX(-2px)"
                            : "translateX(0)",
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.color = "rgba(0,0,0,0.8)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.color = "rgba(0,0,0,0.45)";
                          }
                        }}
                      >
                        {navItem.label}
                      </a>

                      {/* Dot — always centered on the track line */}
                      <div
                        style={{
                          width: `${activeDotSize}px`,
                          height: `${activeDotSize}px`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <div
                          style={{
                            width: `${currentDotSize}px`,
                            height: `${currentDotSize}px`,
                            borderRadius: "50%",
                            background: "#000",
                            transition:
                              "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                            boxShadow: isActive
                              ? "0 0 0 3px rgba(0,0,0,0.06)"
                              : "none",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* Minimal progress indicator */}
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            height: 4,
            width: `${progress}%`,
            background: "rgba(0,0,0,0.3)",
            zIndex: 50,
            transition: "width .2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* Simple Header - Logo and Language Switcher */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 99,
            padding: "20px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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
              textDecoration: "none",
            }}
          >
            <Logo size={28} />
            <span
              style={{
                fontWeight: 600,
                fontSize: 17,
                letterSpacing: "-0.02em",
                color: "#000",
              }}
            >
              duftbar
            </span>
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Language switcher - hidden on mobile */}
            <button
              onClick={() => setLang(lang === "en" ? "is" : "en")}
              style={{
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: "8px",
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: window.innerWidth < 768 ? "none" : "block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.9)";
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)";
              }}
            >
              {lang === "en" ? "ÍS" : "EN"}
            </button>

            {/* Hamburger menu button - visible on mobile */}
            <MobileMenuButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Menu size={20} />
            </MobileMenuButton>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <MobileMenu
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                className="close"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  alignSelf: "flex-end",
                }}
              >
                <X size={28} />
              </button>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                  paddingTop: "20px",
                }}
              >
                {t.nav.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                      setMobileMenuOpen(false);
                    }}
                    style={{
                      fontSize: "24px",
                      fontWeight: 600,
                      color: "#000",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {item.label}
                  </a>
                ))}

                {/* Language switcher in mobile menu */}
                <button
                  onClick={() => {
                    setLang(lang === "en" ? "is" : "en");
                  }}
                  style={{
                    background: "rgba(0,0,0,0.05)",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: "12px",
                    padding: "16px 24px",
                    fontSize: 18,
                    fontWeight: 600,
                    cursor: "pointer",
                    marginTop: "20px",
                  }}
                >
                  {lang === "en" ? "Íslenska" : "English"}
                </button>
              </div>
            </MobileMenu>
          )}
        </AnimatePresence>
        <Hero
          id="hero"
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            paddingTop: "100px",
            paddingBottom: "80px",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.02,
              pointerEvents: "none",
              display: "grid",
              gridTemplateColumns: `repeat(auto-fill, minmax(${window.innerWidth < 768 ? "50px" : "70px"}, 1fr))`,
              gridAutoRows: `${window.innerWidth < 768 ? "50px" : "70px"}`,
              gap: window.innerWidth < 768 ? "25px" : "35px",
              padding: "20px",
              alignContent: "start",
            }}
          >
            {[...Array(1000)].map((_, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Logo size={window.innerWidth < 768 ? 20 : 24} />
              </div>
            ))}
          </div>

          <Container style={{ maxWidth: 1400, padding: "0 24px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  window.innerWidth < 900 ? "1fr" : "1fr 1fr",
                gap: "80px",
                alignItems: "center",
              }}
            >
              {/* Left: Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <H1
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: "black",
                    letterSpacing: "-0.04em",
                    marginBottom: "24px",
                  }}
                >
                  duftbar
                </H1>
                <Lead
                  style={{
                    fontSize: "clamp(17px, 2vw, 20px)",
                    lineHeight: 1.6,
                    color: "rgba(0,0,0,0.7)",
                    marginBottom: "40px",
                    maxWidth: "540px",
                  }}
                >
                  {t.heroLead}
                </Lead>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SolidBtn
                      href="#contact"
                      style={{
                        background: "black",
                        color: "#fff",
                        padding: "18px 36px",
                        fontSize: "16px",
                        fontWeight: 600,
                        boxShadow: "0 8px 24px rgba(30, 64, 175, 0.25)",
                        border: "none",
                      }}
                    >
                      {t.getMachine} <ArrowRight size={18} />
                    </SolidBtn>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right: Product Dashboard Screenshot */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  {/* Machine */}
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <img
                      src={mashine}
                      alt="Duftbar Machine"
                      style={{
                        width: "100%",
                        borderRadius: "16px",
                        display: "block",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </Container>
        </Hero>

        {/* INFINITE SCROLLING LOGO BANNER */}
        <Section
          style={{
            position: "relative",
            padding: "60px 0",
            background: "#ffffff",
            overflow: "hidden",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <style>
            {`
              @keyframes scroll-left {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              
              .logo-track {
                display: flex;
                width: max-content;
                animation: scroll-left 30s linear infinite;
              }
              
              .logo-track:hover {
                animation-play-state: paused;
              }
            `}
          </style>
          <div
            style={{
              display: "flex",
              width: "100%",
            }}
          >
            <div className="logo-track">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    padding: "0 48px",
                    display: "flex",
                    alignItems: "center",
                    opacity: 0.4,
                    transition: "opacity 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0.4";
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 150 32"
                    width="150"
                    height="32"
                    style={{ display: "block" }}
                  >
                    <path
                      fill="currentColor"
                      d="M.783.194 0 31.767h7.085l4.345-18.975h.274l-1.331 18.975h7.045L26.148.194h-6.225l-4.462 19.87h-.274L16.48.193H10.49l-4.736 19.87H5.48L7.046.193H.783ZM32.05 11.86l-2.113 14.113c-.157 1.011-.314 1.556-1.175 1.556-.587 0-.783-.273-.783-.856 0-.155.04-.389.079-.7L30.17 11.86c.157-.972.314-1.555 1.096-1.555.666 0 .9.272.9.933 0 .078-.078.272-.117.622Zm5.637.621c.235-1.477.352-2.527.352-3.266 0-2.994-1.996-3.344-6.028-3.344-6.028 0-6.772.972-7.633 6.61l-1.957 12.831c-.235 1.633-.313 2.8-.313 3.422 0 2.838 1.957 3.188 5.989 3.188 5.91 0 6.81-.894 7.672-6.61l1.918-12.83ZM52.07 12.987c.274-1.789.391-2.917.391-3.305 0-2.528-1.096-3.81-3.17-3.81-.94 0-2.075.466-3.366 1.36l.156-1.205h-5.715l-3.835 25.74h5.675l2.975-19.597c.157-1.01.43-1.438 1.135-1.438.548 0 .783.233.783.816 0 .078 0 .311-.04.622l-.665 4.394h5.128l.548-3.577ZM55.277.194 50.54 31.767h5.675L60.992.194h-5.715ZM70.261.194l-1.056 7.038c-1.057-.894-1.958-1.36-3.093-1.36-3.836 0-4.736 2.915-5.362 7.115l-1.8 11.82c-.236 1.477-.392 2.566-.392 3.266 0 2.45 1.33 3.81 3.64 3.81 1.174 0 2.231-.466 3.484-1.36l.463 1.244h5.095L75.976.194h-5.715Zm-1.8 12.015-1.996 13.337c-.157.972-.431 1.438-1.175 1.438-.548 0-.783-.233-.783-.816 0-.078 0-.273.04-.622l1.996-13.337c.156-1.01.47-1.439 1.174-1.439.509 0 .822.311.822.778 0 .117-.039.311-.078.661ZM98.113 6.532c.195-1.283.313-2.333.313-3.11C98.426.194 96.156 0 91.458 0c-3.483 0-5.636.039-6.967 1.439-1.057 1.127-1.33 2.76-1.683 5.093L79.99 25.39c-.235 1.478-.313 2.644-.313 3.46 0 2.8 2.426 3.15 6.967 3.15 3.444 0 5.558-.117 6.85-1.4 1.174-1.166 1.409-2.838 1.761-5.21l1.096-7.038h-6.654l-1.018 6.844c-.156 1.01-.352 1.594-1.252 1.594-.627 0-.861-.272-.861-.933 0-.156 0-.39.039-.661l2.779-18.47c.156-.971.313-1.555 1.174-1.555.705 0 .979.272.979.933 0 .04-.04.234-.079.623l-.626 4.199h6.615l.666-4.394ZM100.971.194l-4.736 31.573h5.676L106.686.194h-5.715ZM119.831 12.481c.235-1.516.352-2.605.352-3.266 0-2.994-1.996-3.344-6.028-3.344-6.067 0-6.772 1.011-7.633 6.61l-.352 2.294h5.715l.43-2.916c.157-1.01.314-1.555 1.214-1.555.626 0 .783.272.783.933 0 0-.039.194-.118.622l-.509 3.383-5.48 2.955c-2.152 1.166-2.896 2.138-3.248 4.588l-.392 2.527c-.195 1.322-.352 2.411-.352 3.266 0 2.294 1.057 3.344 3.366 3.344 1.331 0 2.505-.466 3.836-1.322l.463 1.167h5.056l2.897-19.286Zm-6.928 8.204-.822 5.288c-.157 1.05-.353 1.556-1.175 1.556-.587 0-.783-.273-.783-.856 0-.194.04-.428.079-.7l.391-2.605c.157-1.088.313-1.827 1.292-2.255l1.018-.428ZM120.038 22.513l-.43 2.8c-.235 1.593-.314 2.76-.314 3.42 0 2.84 1.957 3.19 5.989 3.19 5.872 0 6.811-.895 7.672-6.61l.313-2.334c.118-.7.235-1.4.235-2.06 0-1.284-.587-2.217-1.722-2.878l-2.192-1.244c-1.566-.894-2.584-1.089-2.584-2.41 0-.273.079-.545.118-.895l.235-1.633c.156-1.01.352-1.555 1.096-1.555.665 0 .9.272.9.933 0 .039-.039.233-.117.622l-.431 2.916h5.715l.352-2.294c.235-1.438.352-2.527.352-3.266 0-2.994-1.996-3.344-6.028-3.344-5.245 0-6.732.661-7.476 5.56l-.43 2.683c-.157 1.167-.274 1.983-.274 2.45 0 1.555.822 2.372 2.661 3.344l2.075 1.127c1.448.778 1.8 1.128 1.8 1.983 0 .04 0 .272-.078.739l-.352 2.216c-.157 1.011-.313 1.556-1.174 1.556-.588 0-.783-.273-.783-.856 0-.194.039-.428.078-.7l.509-3.46h-5.715ZM134.813 22.513l-.431 2.8c-.235 1.593-.313 2.76-.313 3.42 0 2.84 1.957 3.19 5.989 3.19 5.871 0 6.811-.895 7.672-6.61l.313-2.334c.117-.7.235-1.4.235-2.06 0-1.284-.587-2.217-1.723-2.878l-2.191-1.244c-1.566-.894-2.584-1.089-2.584-2.41 0-.273.078-.545.118-.895l.234-1.633c.157-1.01.353-1.555 1.096-1.555.666 0 .901.272.901.933 0 .039-.039.233-.118.622l-.43 2.916h5.714l.353-2.294c.235-1.438.352-2.527.352-3.266 0-2.994-1.996-3.344-6.028-3.344-5.245 0-6.732.661-7.476 5.56l-.431 2.683c-.156 1.167-.274 1.983-.274 2.45 0 1.555.822 2.372 2.662 3.344l2.075 1.127c1.448.778 1.8 1.128 1.8 1.983 0 .04 0 .272-.078.739l-.352 2.216c-.157 1.011-.314 1.556-1.175 1.556-.587 0-.783-.273-.783-.856 0-.194.04-.428.079-.7l.509-3.46h-5.715Z"
                    ></path>
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* HOW IT WORKS SECTION */}
        <Section
          id="how"
          style={{
            position: "relative",
            padding: "120px 0",
            background: "#f8fafc",
          }}
        >
          <Container style={{ maxWidth: 1200, padding: "0 24px" }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: "center", marginBottom: "80px" }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  background: "rgba(147, 51, 234, 0.08)",
                  color: "#9333ea",
                  borderRadius: 100,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 24,
                }}
              >
                {lang === "is" ? "Hvernig virkar þetta" : "How it works"}
              </div>
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  marginBottom: "16px",
                }}
              >
                {t.howItWorks}
              </h2>
              <P
                style={{
                  fontSize: 17,
                  color: "rgba(0,0,0,0.6)",
                  maxWidth: 600,
                  margin: "16px auto 0",
                  lineHeight: 1.7,
                }}
              >
                {t.howDesc}
              </P>
            </motion.div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  window.innerWidth < 768 ? "1fr" : "repeat(3, 1fr)",
                gap: "32px",
                marginBottom: "64px",
              }}
            >
              {[
                {
                  icon: <MousePointerClick size={28} />,
                  title: t.stepChoose,
                  text: t.stepChooseText,
                  iconColor: "#6366f1",
                },
                {
                  icon: <Sparkles size={28} />,
                  title: t.stepTap,
                  text: t.stepTapText,
                  iconColor: "#f59e0b",
                },
                {
                  icon: <CheckCircle2 size={28} />,
                  title: t.stepGo,
                  text: t.stepGoText,
                  iconColor: "#10b981",
                },
              ].map((step, i) => (
                <motion.div
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
                    background: "#ffffff",
                    border: "1px solid rgba(0,0,0,0.06)",
                    borderRadius: "16px",
                    padding: "40px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "12px",
                      background: "rgba(0,0,0,0.04)",
                      color: step.iconColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 24,
                    }}
                  >
                    {step.icon}
                  </div>

                  <h3
                    style={{
                      marginTop: 0,
                      fontSize: 20,
                      fontWeight: 600,
                      color: "#0a0a0a",
                      letterSpacing: "-0.01em",
                      marginBottom: 12,
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color: "rgba(0,0,0,0.6)",
                      lineHeight: 1.6,
                      fontSize: 15,
                    }}
                  >
                    {step.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "relative",
                maxWidth: 1000,
                width: "100%",
                margin: "0 auto",
                background: "#ffffff",
                borderRadius: 24,
                padding: 8,
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
              }}
            >
              <video
                autoPlay
                loop
                muted
                // @ts-ignore
                playsInPlace
                preload="auto"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: 16,
                }}
              >
                <source src={duftbar} type="video/webm" />
              </video>
            </motion.div>
          </Container>
        </Section>

        {/* FEATURES SECTION - "Unique Features" */}
        <Section
          id="features"
          style={{
            position: "relative",
            padding: "120px 0",
            background: "#ffffff",
          }}
        >
          <Container style={{ maxWidth: 1200, padding: "0 24px" }}>
            {/* Section Tag & Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: "center", marginBottom: "80px" }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  background: "rgba(30, 64, 175, 0.08)",
                  color: "#1e40af",
                  borderRadius: 100,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                {t.uniqueFeatures}
              </div>
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  marginBottom: "16px",
                }}
              >
                {t.smartNutrition}
              </h2>
            </motion.div>

            {/* 2x2 Feature Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  window.innerWidth < 768 ? "1fr" : "repeat(2, 1fr)",
                gap: "32px",
              }}
            >
              {[
                { icon: <Target size={28} />, ...t.features[0] },
                { icon: <Zap size={28} />, ...t.features[1] },
                { icon: <Shield size={28} />, ...t.features[2] },
                { icon: <CheckCircle2 size={28} />, ...t.features[3] },
              ].map((feature: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  style={{
                    background: "#f8fafc",
                    border: "1px solid rgba(0,0,0,0.06)",
                    borderRadius: "16px",
                    padding: "40px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "12px",
                      background: "rgba(30, 64, 175, 0.1)",
                      color: "#1e40af",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "24px",
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      marginBottom: "12px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.6,
                      color: "rgba(0,0,0,0.6)",
                      margin: 0,
                    }}
                  >
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* BENEFITS SECTION - "Run the Case, not the Paperwork" */}
        <Section
          id="benefits"
          style={{
            position: "relative",
            padding: "120px 0",
            background: "#f8fafc",
          }}
        >
          <Container style={{ maxWidth: 1200, padding: "0 24px" }}>
            {/* Section Tag & Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: "center", marginBottom: "80px" }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  background: "rgba(249, 115, 22, 0.08)",
                  color: "#ea580c",
                  borderRadius: 100,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                {t.benefitsTitle}
              </div>
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  marginBottom: "16px",
                }}
              >
                {t.benefitsSubtitle}
              </h2>
              <p
                style={{
                  fontSize: "18px",
                  lineHeight: 1.6,
                  color: "rgba(0,0,0,0.6)",
                  maxWidth: "700px",
                  margin: "0 auto",
                }}
              >
                {t.benefitsDesc}
              </p>
            </motion.div>

            {/* Benefits Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  window.innerWidth < 768 ? "1fr" : "repeat(3, 1fr)",
                gap: "24px",
                marginBottom: "48px",
              }}
            >
              {[
                { icon: <TrendingUp size={24} />, ...t.benefits[0] },
                { icon: <Users size={24} />, ...t.benefits[1] },
                { icon: <Clock size={24} />, ...t.benefits[2] },
              ].map((benefit: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{
                    background: "#ffffff",
                    border: "1px solid rgba(0,0,0,0.06)",
                    borderRadius: "16px",
                    padding: "32px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "rgba(249, 115, 22, 0.1)",
                      color: "#ea580c",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "20px",
                    }}
                  >
                    {benefit.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      marginBottom: "12px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.6,
                      color: "rgba(0,0,0,0.6)",
                      margin: 0,
                    }}
                  >
                    {benefit.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Second Row of Benefits */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  window.innerWidth < 768 ? "1fr" : "repeat(3, 1fr)",
                gap: "24px",
              }}
            >
              {[
                { icon: <Shield size={24} />, ...t.benefits[3] },
                { icon: <Eye size={24} />, ...t.benefits[4] },
                { icon: <Sparkles size={24} />, ...t.benefits[5] },
              ].map((benefit: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i + 3) * 0.1 }}
                  style={{
                    background: "#ffffff",
                    border: "1px solid rgba(0,0,0,0.06)",
                    borderRadius: "16px",
                    padding: "32px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "rgba(249, 115, 22, 0.1)",
                      color: "#ea580c",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "20px",
                    }}
                  >
                    {benefit.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      marginBottom: "12px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.6,
                      color: "rgba(0,0,0,0.6)",
                      margin: 0,
                    }}
                  >
                    {benefit.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* COMPARISON SECTION - "Why Kuratech" */}
        <Section
          id="comparison"
          style={{
            position: "relative",
            padding: "120px 0",
            background: "#ffffff",
          }}
        >
          <Container style={{ maxWidth: 1000, padding: "0 24px" }}>
            {/* Section Tag & Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: "center", marginBottom: "80px" }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  background: "rgba(22, 163, 74, 0.08)",
                  color: "#16a34a",
                  borderRadius: 100,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                Why duftbar
              </div>
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  marginBottom: "16px",
                }}
              >
                A smarter way to serve nutrition
              </h2>
            </motion.div>

            {/* Comparison Two-Column Layout */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                display: "grid",
                gridTemplateColumns:
                  window.innerWidth < 768 ? "1fr" : "1fr 1fr",
                gap: "32px",
                background: "#f8fafc",
                border: "1px solid rgba(0,0,0,0.06)",
                borderRadius: "24px",
                padding: "48px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              }}
            >
              {/* Traditional vending Column */}
              <div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    marginBottom: "24px",
                    color: "rgba(0,0,0,0.9)",
                  }}
                >
                  Traditional vending
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {[
                    "Pre-packaged products with excess waste",
                    "Limited product variety and flexibility",
                    "Frequent manual restocking required",
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "flex-start",
                      }}
                    >
                      <X
                        size={20}
                        style={{
                          color: "#ef4444",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "15px",
                          lineHeight: 1.6,
                          color: "rgba(0,0,0,0.7)",
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* duftbar Column */}
              <div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    marginBottom: "24px",
                    color: "rgba(0,0,0,0.9)",
                  }}
                >
                  duftbar
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {[
                    "Fresh, precise servings with zero packaging waste",
                    "Flexible product options — easily swap flavors",
                    "Automated monitoring with smart refill alerts",
                    "Cloud-connected with real-time data & insights",
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "flex-start",
                      }}
                    >
                      <Check
                        size={20}
                        style={{
                          color: "#22c55e",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "15px",
                          lineHeight: 1.6,
                          color: "rgba(0,0,0,0.7)",
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Container>
        </Section>

        {/* FAQ SECTION - Accordion */}
        <Section
          id="faq"
          style={{
            position: "relative",
            padding: "120px 0",
            background: "#f8fafc",
          }}
        >
          <Container style={{ maxWidth: 900, padding: "0 24px" }}>
            {/* Section Tag & Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: "center", marginBottom: "64px" }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  background: "rgba(147, 51, 234, 0.08)",
                  color: "#9333ea",
                  borderRadius: 100,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                {t.faqTitle}
              </div>
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                {t.faqSubtitle}
              </h2>
            </motion.div>

            {/* FAQ Accordion */}
            <FAQ t={t} />
          </Container>
        </Section>

        <Section
          id="spaces"
          style={{
            position: "relative",
            padding: "120px 0",
            background: "#f8fafc",
          }}
        >
          <Container style={{ maxWidth: 1200, padding: "0 24px" }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: "center", marginBottom: "80px" }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  background: "rgba(22, 163, 74, 0.08)",
                  color: "#16a34a",
                  borderRadius: 100,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 24,
                }}
              >
                {lang === "is" ? "Staðsetningar" : "Locations"}
              </div>
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  marginBottom: "16px",
                }}
              >
                {t.spacesTitle}
              </h2>
              <P
                style={{
                  fontSize: 17,
                  maxWidth: 600,
                  margin: "16px auto 0",
                  color: "rgba(0,0,0,0.6)",
                  lineHeight: 1.7,
                }}
              >
                {t.spacesDesc}
              </P>
            </motion.div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  window.innerWidth < 768 ? "1fr" : "repeat(2, 1fr)",
                gap: "32px",
              }}
            >
              {t.spaces.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    background: "#ffffff",
                    border: "1px solid rgba(0,0,0,0.06)",
                    borderRadius: "16px",
                    padding: "40px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      marginBottom: 24,
                      borderRadius: "12px",
                      background: "rgba(22, 163, 74, 0.1)",
                      color: "#16a34a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {i === 0 && <Dumbbell size={24} />}
                    {i === 1 && <Sparkles size={24} />}
                    {i === 2 && <CheckCircle2 size={24} />}
                    {i === 3 && <MapPin size={24} />}
                  </div>
                  <h3
                    style={{
                      fontWeight: 600,
                      fontSize: 20,
                      letterSpacing: "-0.01em",
                      marginBottom: 12,
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 15,
                      color: "rgba(0,0,0,0.6)",
                      lineHeight: 1.6,
                    }}
                  >
                    {s.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        <Section
          id="team"
          style={{
            position: "relative",
            padding: "120px 0",
            background: "#ffffff",
          }}
        >
          <Container style={{ maxWidth: 1200, padding: "0 24px" }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: "center", marginBottom: "80px" }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  background: "rgba(249, 115, 22, 0.08)",
                  color: "#ea580c",
                  borderRadius: 100,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 24,
                }}
              >
                {lang === "is" ? "Teymið" : "Team"}
              </div>
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  marginBottom: "16px",
                }}
              >
                {lang === "is" ? "Við erum duftbar" : "Meet the Team"}
              </h2>
              <P
                style={{
                  fontSize: 17,
                  color: "rgba(0,0,0,0.6)",
                  maxWidth: 600,
                  margin: "16px auto 0",
                  lineHeight: 1.7,
                }}
              >
                {t.teamIntro}
              </P>
            </motion.div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  window.innerWidth < 768
                    ? "1fr"
                    : "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "32px",
              }}
            >
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
                    background: "#f8fafc",
                    border: "1px solid rgba(0,0,0,0.06)",
                    borderRadius: "16px",
                    padding: "40px",
                    textAlign: "center",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                  }}
                >
                  <img
                    src={m.img}
                    alt={m.name}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: "50%",
                      objectFit: "cover",
                      margin: "0 auto 24px",
                      border: "3px solid rgba(0,0,0,0.06)",
                    }}
                  />
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: "#0a0a0a",
                      letterSpacing: "-0.01em",
                      marginBottom: 8,
                    }}
                  >
                    {m.name}
                  </h3>
                  <div
                    style={{
                      marginBottom: 16,
                      fontSize: 13,
                      fontWeight: 500,
                      color: "rgba(0,0,0,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {m.role}
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      color: "rgba(0,0,0,0.6)",
                      lineHeight: 1.6,
                    }}
                  >
                    {m.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        <Contact
          id="contact"
          style={{
            position: "relative",
            padding: "120px 0",
            background: "#f8fafc",
          }}
        >
          <Container style={{ maxWidth: 1200, padding: "0 24px" }}>
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
                    background: "rgba(30, 64, 175, 0.08)",
                    color: "#1e40af",
                    borderRadius: 100,
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 24,
                  }}
                >
                  {lang === "is" ? "Hafa samband" : "Contact"}
                </div>
                <h2
                  style={{
                    fontSize: "clamp(2rem, 4vw, 2.5rem)",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    marginBottom: "16px",
                  }}
                >
                  {t.bringDuftbar}
                </h2>
                <P
                  style={{
                    fontSize: 16,
                    color: "rgba(0,0,0,0.6)",
                    maxWidth: 450,
                    lineHeight: 1.7,
                  }}
                >
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
              padding: "80px 24px 60px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 32,
              textAlign: "center",
              maxWidth: 800,
            }}
          >
            <Logo size={32} />

            <p
              style={{
                fontSize: "18px",
                lineHeight: 1.6,
                color: "rgba(0,0,0,0.7)",
                maxWidth: "600px",
                margin: 0,
              }}
            >
              {t.footerDescription}
            </p>

            <div
              style={{
                marginTop: "40px",
                paddingTop: "32px",
                borderTop: "1px solid rgba(0,0,0,0.1)",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{
                  fontWeight: 500,
                  fontSize: 13,
                  letterSpacing: "-0.01em",
                  color: "rgba(0,0,0,0.6)",
                }}
              >
                © {new Date().getFullYear()} {t.footerCopyright}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(0,0,0,0.4)",
                }}
              >
                {t.footerContact}
              </div>
            </div>
          </Container>
        </FooterWrap>
      </Page>
    </ThemeProvider>
  );
}
