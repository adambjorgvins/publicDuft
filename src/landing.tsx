// Landing.tsx
import React, { useRef, useEffect, useState } from "react";
import styled, { createGlobalStyle, css } from "styled-components";
import { DarkVeil } from "./herlpers";
import { SnakeSteps } from "./stepSection";
import frameIcon from "./images/frame.svg";

const COLORS = {
  bg: "#0B0D13",
  accent: "#eff8ffff",
  surface: "rgba(255, 255, 255, 0.01)",
  text: "#FFFFFF",
};

const BREAK_SM = "480px";
const BREAK_MD = "768px";
const BREAK_LG = "1024px";
const BREAK = BREAK_LG;

const GlobalStyle = createGlobalStyle`
  *,*::before,*::after{box-sizing:border-box}
  :root {
    --maxw: 1200px;
    --padX: 1rem;
    --rad: 12px;
  }
  @media (min-width: ${BREAK_MD}) {
    :root { --padX: 1.25rem; }
  }
  body {
    margin: 0;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Helvetica", sans-serif;
    background: ${COLORS.bg};
    color: ${COLORS.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
  }
  :focus-visible {
    outline: 2px solid ${COLORS.accent};
    outline-offset: 2px;
  }
  img, video {
    max-width: 100%;
    display: block;
  }
  @media (prefers-reduced-motion: reduce) {
    *,*::before,*::after { animation: none !important; transition: none !important; }
  }
`;

const menuItems = [
  { label: "HOW IT WORKS", target: "#steps" },
  { label: "VIDEO", target: "#video" },
  { label: "PHOTO", target: "#photo" },
];

export const Landing: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > parseInt(BREAK)) {
        setScrolled(window.scrollY > 40);
      } else {
        setScrolled(false);
      }
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoSrc(
            "https://www.youtube.com/embed/68ugkg9RePc?list=RD68ugkg9RePc"
          );
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const scrollToVideo = () =>
    videoRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const menuEl = menuRef.current;
      const toggleEl = toggleRef.current;
      if (
        menuEl &&
        toggleEl &&
        !menuEl.contains(event.target as Node) &&
        !toggleEl.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <>
      <GlobalStyle />
      <HeaderWrapper scrolled={scrolled}>
        <HeaderInner>
          <MobileMenuToggle
            ref={toggleRef}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            ☰
          </MobileMenuToggle>

          <HeaderLogo
            src={frameIcon}
            alt="DUFTBAR logo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />

          <HeaderNav>
            {menuItems.map((item) => (
              <NavItem
                key={item.label}
                onClick={() => {
                  const el = document.querySelector(item.target);
                  if (!el) return;
                  const yOffset = -120;
                  const y =
                    el.getBoundingClientRect().top +
                    window.pageYOffset +
                    yOffset;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }}
              >
                {item.label}
              </NavItem>
            ))}
          </HeaderNav>
        </HeaderInner>

        {menuOpen && (
          <MobileMenu ref={menuRef}>
            {menuItems.map((item) => (
              <MobileNavItem
                key={item.label}
                onClick={() => {
                  const el = document.querySelector(item.target);
                  if (!el) return;
                  const yOffset = -100;
                  const y =
                    el.getBoundingClientRect().top +
                    window.pageYOffset +
                    yOffset;
                  window.scrollTo({ top: y, behavior: "smooth" });
                  setMenuOpen(false);
                }}
              >
                {item.label}
              </MobileNavItem>
            ))}
          </MobileMenu>
        )}
      </HeaderWrapper>
      <Wrapper>
        <CanvasWrap>
          <DarkVeil
            hueShift={0}
            noiseIntensity={0.01}
            scanlineIntensity={0.05}
            scanlineFrequency={4}
            warpAmount={0.01}
            resolutionScale={1}
          />
        </CanvasWrap>

        {/* Hero / Intro */}
        <IntroSection>
          <IntroContent>
            <h1>DUFTBAR</h1>
            <p>
              A smart, self-serve powder dispenser that fills directly into your
              own bottle. No single-use plastic, no scoops — just precise dosing
              in seconds.
            </p>
            <PrimaryButton type="button" onClick={scrollToVideo}>
              Watch Video <span aria-hidden>▶</span>
            </PrimaryButton>
          </IntroContent>
        </IntroSection>

        {/* Mission */}
        <Section>
          <Title>Powder, perfectly dosed — anywhere</Title>
          <Lead>
            DUFTBAR is designed to offer a hygienic, precise, and eco-friendly
            solution for supplements — anywhere.
          </Lead>
        </Section>

        {/* USP Grid */}
        <Section $compact>
          <Grid>
            {[
              ["No plastic", "Fills into your own bottle."],
              ["Perfect dose", "±0.1g Dosing accuracy."],
              ["Hygienic", "Closed system, contact-free."],
              ["Fast", "Filled in ~10s."],
            ].map(([t, d]) => (
              <Card key={t} $compact>
                <h3>{t}</h3>
                <Small $compact>{d}</Small>
              </Card>
            ))}
          </Grid>
        </Section>

        <Section aria-label="Key numbers" $compact>
          <Strip $compact>
            <Stat>
              <Big $compact>0</Big>
              <Small $compact>Single-use plastic</Small>
            </Stat>
            <Stat>
              <Big $compact>±0.1g</Big>
              <Small $compact>Dosing accuracy</Small>
            </Stat>
            <Stat>
              <Big $compact>~10s</Big>
              <Small $compact>Serving time</Small>
            </Stat>
            <Stat>
              <Big $compact>24/7</Big>
              <Small $compact>Self-serve</Small>
            </Stat>
          </Strip>
        </Section>
        <SnakeSteps id="steps" />

        <VideoSection ref={videoRef} id="video">
          <VideoText>
            <h2>Experience the Future of Supplement Dispensing</h2>
            <p>
              See how DUFTBAR works in real time — no scoops, no mess, just
              innovation in action.
            </p>
          </VideoText>
          {videoSrc ? (
            <Iframe
              src={`${videoSrc}&autoplay=1`}
              title="DUFTBAR demo video"
              allow="autoplay; encrypted-media"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <VideoPreview
              onClick={() =>
                setVideoSrc(
                  "https://www.youtube.com/embed/8GkcJre6ti0?rel=0&modestbranding=1&showinfo=0&controls=1"
                )
              }
            >
              <PlayButton>▶</PlayButton>
            </VideoPreview>
          )}
        </VideoSection>

        <Section>
          <Title>Built for accuracy & hygiene</Title>
          <Two>
            <Card>
              <h3>Technology</h3>
              <Small>
                Real-time weighing, closed dosing system, contactless payment,
                remote monitoring.
              </Small>
            </Card>
            <Card>
              <h3>Hygiene</h3>
              <Small>
                Closed flow paths, easy-to-clean design, and regular
                sanitization.
              </Small>
            </Card>
          </Two>
        </Section>

        <Section>
          <CTA>
            <Title>Bring DUFTBAR to your location?</Title>
            <Lead>
              We’re opening for pilot installations. Let’s talk and see if it’s
              a good fit.
            </Lead>
            <CTAButton href="mailto:hello@duftbar.is">Get in touch</CTAButton>
          </CTA>
        </Section>

        {/* Footer */}
        <Footer>
          <FooterContent>
            <FooterLogo
              src={frameIcon}
              alt="DUFTBAR Logo"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
            <FooterNote>
              © {new Date().getFullYear()} DUFTBAR ehf. — All rights reserved.
            </FooterNote>
          </FooterContent>
        </Footer>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  overflow-x: hidden;
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
`;

const CanvasWrap = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
`;

const IntroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  @supports (height: 80dvh) {
    min-height: 80dvh;
  }
`;

const IntroContent = styled.div`
  max-width: min(92%, 46rem);
  text-align: center;
  padding: 1.25rem var(--padX);

  h1 {
    font-size: clamp(2rem, 8vw, 3.5rem);
    margin: 0 0 1rem;
    letter-spacing: 0.02em;
    line-height: 1.1;
  }
  p {
    font-size: clamp(0.95rem, 3.5vw, 1.1rem);
    margin: 0 auto 1.75rem;
    max-width: 34rem;
    opacity: 0.9;
  }
`;

const PrimaryButton = styled.button`
  padding: 0.7rem 1.25rem;
  border: 1.5px solid ${COLORS.text};
  background: transparent;
  color: ${COLORS.text};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
  font-size: clamp(0.9rem, 3.2vw, 1rem);

  &:hover {
    background: ${COLORS.text};
    color: ${COLORS.bg};
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
`;

const Title = styled.h2`
  font-size: clamp(1.4rem, 5vw, 2.2rem);
  margin: 0 0 0.75rem;
  text-align: center;
`;

const Lead = styled.p`
  max-width: 44rem;
  margin: 0 auto 1rem;
  opacity: 0.85;
  text-align: center;
  font-size: clamp(0.95rem, 3.2vw, 1.05rem);
`;

const VideoSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 55vh;
  padding: 2rem var(--padX) 1rem; /* minna bil á síma */
  text-align: center;

  @supports (height: 70dvh) {
    min-height: 70dvh;
  }

  @media (min-width: ${BREAK_MD}) {
    padding: 3.5rem var(--padX) 2.5rem; /* aðeins meira bil á stærri skjám */
  }
`;

const VideoText = styled.div`
  text-align: center;
  margin-bottom: 1.25rem;
  max-width: 40rem;
  padding: 0 var(--padX);
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;

  h2 {
    font-size: clamp(1.4rem, 5.5vw, 2.4rem);
    margin-bottom: 0.5rem;
    letter-spacing: 0.03em;
    line-height: 1.2;
    background: linear-gradient(90deg, ${COLORS.accent}, #ffffff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  p {
    font-size: clamp(0.9rem, 3.2vw, 1rem);
    opacity: 0.75;
    margin: 0 auto;
  }
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(16px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Iframe = styled.iframe`
  aspect-ratio: 16 / 9;
  width: 100%;
  max-width: 58rem;
  max-height: 60vh;
  border: 0;
  border-radius: 0.75rem;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.45);
`;

const VideoPreview = styled.div`
  width: 100%;
  max-width: 58rem;
  aspect-ratio: 16 / 9;
  max-height: 60vh;
  background: #000;
  border-radius: 0.75rem;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: transform 0.15s ease;
  &:hover {
    transform: scale(1.01);
  }
`;

const PlayButton = styled.div`
  font-size: 3rem;
  color: white;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  padding: 0.6em 0.9em;
  backdrop-filter: blur(6px);
  transition: all 0.3s ease;
  box-shadow: 0 0 1rem rgba(255, 255, 255, 0.15);
  &:hover {
    background: rgba(255, 255, 255, 0.35);
    transform: scale(1.1);
  }
`;

const Two = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  text-align: center; /* centrera allt í gridinu */

  @media (max-width: ${BREAK}) {
    grid-template-columns: 1fr;
  }
`;

const CTA = styled.div`
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--rad);
  padding: 1.25rem;
  background: ${COLORS.surface};

  @media (min-width: ${BREAK_MD}) {
    padding: 1.75rem;
  }
`;

const CTAButton = styled.a`
  display: inline-block;
  margin-top: 0.75rem;
  padding: 0.7rem 1.05rem;
  border-radius: 0.7rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: ${COLORS.text};
  text-decoration: none;
  font-size: clamp(0.85rem, 3vw, 0.95rem);
`;

const Footer = styled.footer`
  width: 100%;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 2rem var(--padX) 2rem;
  display: flex;
  justify-content: center;
`;

const FooterContent = styled.div`
  width: 100%;
  max-width: var(--maxw);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const FooterLogo = styled.img`
  height: clamp(2rem, 6vw, 3rem);
  cursor: pointer;
  opacity: 0.85;
  transition: opacity 0.25s ease;
  &:hover {
    opacity: 1;
  }
`;

const FooterNote = styled.p`
  font-size: clamp(0.7rem, 2.8vw, 0.8rem);
  opacity: 0.55;
`;

const HeaderWrapper = styled.header<{ scrolled: boolean }>`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  width: 100%;
  top: 0;
  padding: 0.75rem 0;
  background: transparent;
  border: 0;

  @media (min-width: ${BREAK_LG}) {
    top: ${({ scrolled }) => (scrolled ? "15px" : "0")};
    width: ${({ scrolled }) => (scrolled ? "65%" : "100%")};
    padding: ${({ scrolled }) => (scrolled ? "0.5rem 0" : "1.25rem 0")};
    background: rgba(255, 255, 255, ${({ scrolled }) => (scrolled ? 0.08 : 0)});
    backdrop-filter: ${({ scrolled }) => (scrolled ? "blur(10px)" : "none")};
    border-radius: ${({ scrolled }) => (scrolled ? "1rem" : "0")};
    border: ${({ scrolled }) =>
      scrolled ? "1px solid rgba(255,255,255,0.12)" : "1px solid transparent"};
    box-shadow: ${({ scrolled }) =>
      scrolled ? "0 6px 24px rgba(0, 0, 0, 0.1)" : "none"};
  }
`;

const HeaderInner = styled.div`
  width: 100%;
  padding: 0 var(--padX);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLogo = styled.img`
  height: clamp(2rem, 7vw, 3rem);
  cursor: pointer;
  transition: transform 0.25s ease, opacity 0.25s ease;
  opacity: 0.95;
  &:hover {
    transform: scale(1.03);
    opacity: 1;
  }
  @media (min-width: ${BREAK_LG}) {
    height: 4rem;
  }
`;

const HeaderNav = styled.nav`
  display: none;
  gap: 1.25rem;
  @media (min-width: ${BREAK_LG}) {
    display: flex;
  }
`;

const NavItem = styled.button`
  background: none;
  border: none;
  color: ${COLORS.text};
  font-size: 0.95rem;
  font-weight: 700;
  font-family: "Inter", "Helvetica Neue", sans-serif;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  padding: 0.6rem 1.25rem;
  border-radius: 999px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: ${COLORS.accent};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${COLORS.accent};
    outline-offset: 2px;
  }
`;

const MobileMenuToggle = styled.button`
  display: inline-flex;
  font-size: 1.75rem;
  background: none;
  border: none;
  color: ${COLORS.text};
  cursor: pointer;

  @media (min-width: ${BREAK_LG}) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-top: none;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 199;
  padding: 1rem 0;
  gap: 0.5rem;
  border-radius: 0 0 1rem 1rem;

  @media (min-width: ${BREAK_LG}) {
    display: none;
  }
`;

const MobileNavItem = styled.button`
  background: none;
  border: none;
  color: ${COLORS.text};
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: ${COLORS.accent};
  }
`;

const Section = styled.section<{ $compact?: boolean }>`
  max-width: var(--maxw);
  margin: 0 auto;
  padding: ${({ $compact }) =>
    $compact ? "1.5rem var(--padX)" : "2rem var(--padX)"};

  @media (min-width: ${BREAK_MD}) {
    padding: ${({ $compact }) =>
      $compact ? "2rem var(--padX)" : "3rem var(--padX)"};
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  align-items: stretch;

  @media (min-width: ${BREAK_MD}) {
    gap: 0.9rem;
  }
`;

const Strip = styled.div<{ $compact?: boolean }>`
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;
  gap: ${({ $compact }) => ($compact ? "0.5rem" : "0.75rem")};
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: ${({ $compact }) => ($compact ? "0.6rem 0.6rem" : "0.8rem 0.8rem")};
  border-radius: ${({ $compact }) => ($compact ? "0.9rem" : "1rem")};
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
`;

const Stat = styled.div`
  text-align: center;
  flex: 0 0 auto;
  min-width: 84px;
`;

const Big = styled.div<{ $compact?: boolean }>`
  font-weight: 900;
  font-size: ${({ $compact }) =>
    $compact ? "clamp(1rem, 4vw, 1.3rem)" : "clamp(1.1rem, 4.5vw, 1.6rem)"};
  line-height: 1.1;
  margin-bottom: 0.1rem;
`;

const Small = styled.p<{ $compact?: boolean }>`
  margin: 0;
  opacity: 0.78;
  font-size: ${({ $compact }) =>
    $compact
      ? "clamp(0.7rem, 3vw, 0.85rem)"
      : "clamp(0.75rem, 3.2vw, 0.95rem)"};
  line-height: 1.3;
`;

const Card = styled.div<{ $compact?: boolean }>`
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: ${COLORS.surface};
  border-radius: 0.9rem;
  padding: ${({ $compact }) => ($compact ? "0.9rem 1rem" : "1rem")};
  text-align: center; /* centrera textann */

  h3 {
    font-size: clamp(1.05rem, 3.8vw, 1.25rem);
    margin: 0 0 0.4rem;
    letter-spacing: 0.02em;
  }

  p,
  ${Small} {
    margin: 0;
    opacity: 0.78;
    font-size: clamp(0.9rem, 3.4vw, 1rem);
    line-height: 1.5;
  }
`;
