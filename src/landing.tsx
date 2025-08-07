// Landing.tsx
import React, { useRef, useEffect, useState } from "react";
import styled, { createGlobalStyle, css } from "styled-components";
import { DarkVeil } from "./herlpers";
import { SnakeSteps } from "./stepSection";

const COLORS = {
  bg: "#0B0D13",
  accent: "#eff8ffff",
  surface: "rgba(255, 255, 255, 0.01)",
  text: "#FFFFFF",
};

const BREAK = "1000px";
const GlobalStyle = createGlobalStyle`
  *,*::before,*::after{box-sizing:border-box}
  body {
    margin: 0;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Helvetica", sans-serif;
    background: ${COLORS.bg};
    color: ${COLORS.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }
  :focus-visible {
    outline: 2px solid ${COLORS.accent};
    outline-offset: 2px;
  }
  img, video {
    max-width: 100%;
    display: block;
  }
`;

const steps: { title: string; desc: string; icon: string }[] = [
  {
    title: "Select your powder",
    desc: "Choose pre-workout, protein, or recovery.",
    icon: "choose.svg",
  },
  {
    title: "Make payment",
    desc: "Tap card or phone – done in seconds.",
    icon: "pay.svg",
  },
  {
    title: "Place your bottle",
    desc: "Put bottle where the light appears.",
    icon: "bottle.svg",
  },
];
const stepIcons = ["choose", "pay", "bottle"];
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
      setScrolled(window.scrollY > 40);
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
          >
            ☰
          </MobileMenuToggle>

          <HeaderLogo
            src="https://raw.githubusercontent.com/adambjorgvins/publicDuft/ed647a29b068593dc5a57bc59b4ce124bc080d89/Frame%201.svg"
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
      <Wrapper id="main">
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

        <IntroSection>
          <IntroContent>
            <h1>DUFTBAR</h1>
            <p>
              A smart, self-serve powder dispenser that delivers perfectly dosed
              supplements — like protein or pre-workout — straight into your
              bottle. No scoops. No mess. No single-use plastic. Just scan,
              choose, and fill.
            </p>

            <PrimaryButton type="button" onClick={scrollToVideo}>
              Watch video <span aria-hidden>▶</span>
            </PrimaryButton>
          </IntroContent>
        </IntroSection>

        <SnakeSteps id="steps" />
        <VideoSection ref={videoRef} id="video">
          <VideoText>
            <h2>Experience the Future of Supplement Dispensing</h2>
            <p>
              Watch how DUFTBAR works in real-time – no scoops, no mess, just
              pure innovation.
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

        <ImageSection id="photo">
          <HeroImage
            src="https://sdmntprnortheu.oaiusercontent.com/files/00000000-b128-61f4-81a7-9bffb6fdad9e/raw?se=2025-08-07T15%3A54%3A51Z&sp=r&sv=2024-08-04&sr=b&scid=c8e78d7a-f484-5b26-815f-d7ca33019e6b&skoid=b928fb90-500a-412f-a661-1ece57a7c318&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-07T08%3A26%3A18Z&ske=2025-08-08T08%3A26%3A18Z&sks=b&skv=2024-08-04&sig=pKDC3JJeuBP1QG1AHZcfFCECwQ1Re9JrhW4QCN9bMkY%3D"
            alt="Athlete refilling reusable bottle at DUFTBAR dispenser"
            loading="lazy"
          />
        </ImageSection>

        {showScrollTop && (
          <ScrollToTopButton
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
          >
            ↑
          </ScrollToTopButton>
        )}
        <Footer>
          <FooterContent>
            <FooterLogo
              src="https://raw.githubusercontent.com/adambjorgvins/publicDuft/ed647a29b068593dc5a57bc59b4ce124bc080d89/Frame%201.svg"
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
`;

const CanvasWrap = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
`;

const sectionBase = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IntroSection = styled.section`
  ${sectionBase};
  min-height: 85vh;
  @supports (height: 85dvh) {
    min-height: 85dvh;
  }
`;

const IntroContent = styled.div`
  max-width: min(90%, 96rem);
  text-align: center;
  padding: 2rem 1rem;

  @media (max-width: ${BREAK}) {
    padding: 4rem 1.5rem 2rem;
  }

  h1 {
    font-size: clamp(3rem, 12vw, 6rem);
    margin: 0 0 1.5rem;
    letter-spacing: 0.04em;
    line-height: 1.1;
  }

  p {
    font-size: clamp(1rem, 4vw, 1.15rem);
    margin: 0 auto 2.5rem;
    max-width: 38rem;
  }
`;

const PrimaryButton = styled.button`
  padding: 0.75rem 2rem;
  border: 2px solid ${COLORS.text};
  background: transparent;
  color: ${COLORS.text};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.25s, transform 0.2s;

  &:hover {
    background: ${COLORS.text};
    color: ${COLORS.bg};
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.97);
  }
`;

const MobileMenuToggle = styled.button`
  display: none;
  font-size: 2rem;
  background: none;
  border: none;
  color: ${COLORS.text};
  cursor: pointer;

  @media (max-width: ${BREAK}) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); /* for Safari */
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-top: none;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 199;
  padding: 1.5rem 0;
  gap: 1rem;
  border-radius: 0 0 1rem 1rem;

  @media (min-width: ${BREAK}) {
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

const Iframe = styled.iframe`
  aspect-ratio: 16 / 9;
  width: 100%;
  max-width: 64rem;
  border: 0;
  border-radius: 0.75rem;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.45);
`;

const VideoText = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
  max-width: 800px;
  padding: 0 1rem;
  animation: fadeInUp 0.9s ease forwards;
  opacity: 0;

  h2 {
    font-size: clamp(2rem, 6vw, 3.5rem);
    margin-bottom: 0.75rem;
    letter-spacing: 0.05em;
    line-height: 1.2;
    background: linear-gradient(90deg, ${COLORS.accent}, #ffffff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1rem;
    opacity: 0.7;
    max-width: 600px;
    margin: 0 auto;
  }

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const VideoSection = styled.section`
  ${sectionBase};
  flex-direction: column;
  min-height: 85vh;
  padding: 6rem 1rem 4rem;
  position: relative;
  text-align: center;

  @supports (height: 85dvh) {
    min-height: 85dvh;
  }
`;

const Placeholder = styled.p`
  font-size: 1rem;
  opacity: 0.7;
`;

const ImageSection = styled.section`
  ${sectionBase};
  padding: 0;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 85vh;
  object-fit: cover;
  object-position: center center;
  display: block;

  @supports (height: 85dvh) {
    height: 85dvh;
  }

  @media (max-width: ${BREAK}) {
    border-radius: 0;
  }
`;

const VideoPreview = styled.div`
  width: 100%;
  max-width: 64rem;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: 0.75rem;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
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

const HeaderWrapper = styled.header<{ scrolled: boolean }>`
  position: fixed;
  top: ${({ scrolled }) => (scrolled ? "15px" : "0")};
  left: 50%;
  transform: translateX(-50%);
  width: ${({ scrolled }) => (scrolled ? "65%" : "100%")};

  padding: ${({ scrolled }) => (scrolled ? "0.5rem 0" : "1.5rem 0")};
  background: rgba(255, 255, 255, ${({ scrolled }) => (scrolled ? 0.08 : 0)});
  backdrop-filter: ${({ scrolled }) => (scrolled ? "blur(10px)" : "none")};
  border-radius: ${({ scrolled }) => (scrolled ? "1rem" : "0")};
  border: ${({ scrolled }) =>
    scrolled ? "2px solid rgba(255, 255, 255, 0.12)" : "1px solid transparent"};
  box-shadow: ${({ scrolled }) =>
    scrolled ? "0 6px 24px rgba(0, 0, 0, 0.1)" : "none"};

  transition: width 0.4s ease, top 0.4s ease, padding 0.4s ease,
    background 0.4s ease, border 0.4s ease, box-shadow 0.4s ease,
    border-radius 0.4s ease, backdrop-filter 0.2s ease;

  z-index: 100;
  display: flex;
  justify-content: center;
`;

const HeaderInner = styled.div`
  width: 100%;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;
`;

const HeaderLogo = styled.img`
  height: 4rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const HeaderNav = styled.nav`
  display: flex;
  gap: 1.5rem;

  @media (max-width: ${BREAK}) {
    display: none;
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
const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 3.2rem;
  height: 3.2rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  color: ${COLORS.text};
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    background: ${COLORS.accent};
    color: ${COLORS.bg};
    transform: translate(-50%, -4px);
  }

  @media (max-width: ${BREAK}) {
    bottom: 1rem;
    width: 2.8rem;
    height: 2.8rem;
    font-size: 1.25rem;
  }
`;

const Footer = styled.footer`
  width: 100%;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 3rem 1.5rem 2rem;
  display: flex;
  justify-content: center;
`;

const FooterContent = styled.div`
  width: 100%;
  max-width: 1200px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const FooterLogo = styled.img`
  height: 3rem;
  cursor: pointer;
  opacity: 0.85;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const FooterNav = styled.nav`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const FooterLink = styled.a`
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${COLORS.text};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${COLORS.accent};
  }
`;

const FooterNote = styled.p`
  font-size: 0.75rem;
  opacity: 0.5;
`;
