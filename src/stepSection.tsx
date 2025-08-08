import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const COLORS = {
  accent: "#eff8ffff",
};

const BREAK = "1000px";

const AnimatedPath = styled.path`
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: none;
  transition: stroke-dashoffset 0.2s ease-out;

  &.animate {
    animation: scrollLine 2s linear forwards;
  }

  @keyframes scrollLine {
    to {
      stroke-dashoffset: 0;
    }
  }
`;

const steps = [
  {
    title: "Select your powder",

    desc: "Choose pre-workout, protein, or recovery.",
    icon: (
      <svg
        width="22"
        height="16"
        viewBox="0 0 22 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11 7C10.4477 7 10 7.44772 10 8C10 8.55228 10.4477 9 11 9C11.5523 9 12 8.55228 12 8C12 7.44772 11.5523 7 11 7ZM8 8C8 6.34315 9.34315 5 11 5C12.6569 5 14 6.34315 14 8C14 9.65685 12.6569 11 11 11C9.34315 11 8 9.65685 8 8Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.63576 0.290247C5.02642 0.677325 5.02652 1.305 4.63598 1.69219C2.94841 3.3653 2.00039 5.63422 2.00039 8C2.00039 10.3658 2.94841 12.6347 4.63598 14.3078C5.02652 14.695 5.02642 15.3227 4.63576 15.7098C4.24511 16.0968 3.61182 16.0967 3.22128 15.7095C1.15869 13.6646 0 10.8915 0 8C0 5.1085 1.15869 2.33537 3.22128 0.290459C3.61182 -0.0967368 4.24511 -0.0968316 4.63576 0.290247ZM17.3642 0.290247C17.7549 -0.0968316 18.3882 -0.0967368 18.7787 0.290459C20.8413 2.33537 22 5.1085 22 8C22 10.8915 20.8413 13.6646 18.7787 15.7095C18.3882 16.0967 17.7549 16.0968 17.3642 15.7098C16.9736 15.3227 16.9735 14.695 17.364 14.3078C19.0516 12.6347 19.9996 10.3658 19.9996 8C19.9996 5.63422 19.0516 3.3653 17.364 1.69219C16.9735 1.305 16.9736 0.677325 17.3642 0.290247ZM7.46681 3.08628C7.8572 3.47363 7.85685 4.10131 7.46603 4.48823C7.00106 4.94857 6.63219 5.49523 6.38052 6.09695C6.12885 6.69868 5.99931 7.34367 5.99931 7.99504C5.99931 8.64642 6.12885 9.29141 6.38052 9.89314C6.63219 10.4949 7.00106 11.0415 7.46603 11.5019C7.85685 11.8888 7.8572 12.5165 7.46681 12.9038C7.07643 13.2912 6.44314 13.2915 6.05233 12.9046C5.40137 12.2601 4.88495 11.4948 4.53261 10.6524C4.18028 9.80996 3.99892 8.90697 3.99892 7.99504C3.99892 7.08311 4.18028 6.18013 4.53261 5.33771C4.88495 4.4953 5.40137 3.72997 6.05233 3.0855C6.44314 2.69858 7.07643 2.69893 7.46681 3.08628ZM14.5332 3.0962C14.9236 2.70884 15.5569 2.70849 15.9477 3.09542C16.5986 3.73989 17.115 4.50521 17.4674 5.34763C17.8197 6.19004 18.0011 7.09303 18.0011 8.00496C18.0011 8.91689 17.8197 9.81987 17.4674 10.6623C17.115 11.5047 16.5986 12.27 15.9477 12.9145C15.5569 13.3014 14.9236 13.3011 14.5332 12.9137C14.1428 12.5264 14.1432 11.8987 14.534 11.5118C14.9989 11.0514 15.3678 10.5048 15.6195 9.90305C15.8712 9.30133 16.0007 8.65634 16.0007 8.00496C16.0007 7.35358 15.8712 6.70859 15.6195 6.10686C15.3678 5.50514 14.9989 4.95848 14.534 4.49814C14.1432 4.11122 14.1428 3.48355 14.5332 3.0962Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    title: "Make payment",
    desc: "Tap card or phone – done in seconds.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 9V19.4C3 19.9601 3 20.2399 3.10899 20.4538C3.20487 20.642 3.35774 20.7952 3.5459 20.8911C3.7596 21 4.0395 21 4.59846 21H15.0001M17 8L13 12L11 10M7 13.8002V6.2002C7 5.08009 7 4.51962 7.21799 4.0918C7.40973 3.71547 7.71547 3.40973 8.0918 3.21799C8.51962 3 9.08009 3 10.2002 3H17.8002C18.9203 3 19.4801 3 19.9079 3.21799C20.2842 3.40973 20.5905 3.71547 20.7822 4.0918C21.0002 4.51962 21.0002 5.07969 21.0002 6.19978L21.0002 13.7998C21.0002 14.9199 21.0002 15.48 20.7822 15.9078C20.5905 16.2841 20.2842 16.5905 19.9079 16.7822C19.4805 17 18.9215 17 17.8036 17H10.1969C9.07899 17 8.5192 17 8.0918 16.7822C7.71547 16.5905 7.40973 16.2842 7.21799 15.9079C7 15.4801 7 14.9203 7 13.8002Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Place your bottle",
    desc: "Put bottle where the light appears.",
    icon: (
      <svg
        width="14"
        height="33"
        viewBox="0 0 14 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.23226 33C2.37902 33 1.56038 32.6565 0.954893 32.0445C0.349403 31.4324 0.00618597 30.6014 9.14016e-05 29.7327V26.5641C0.00102951 25.7489 0.302591 24.9637 0.845073 24.364L1.12211 24.0537L0.789667 23.8046C0.544644 23.6237 0.345295 23.3862 0.208027 23.1116C0.0707597 22.837 -0.00050611 22.5331 9.14016e-05 22.225V21.4399C-0.00401525 20.9706 0.160161 20.516 0.46183 20.1612L0.669611 19.9167L0.46183 19.6723C0.160473 19.3191 -0.00373968 18.866 9.14016e-05 18.3983V17.6085C-0.0034489 17.1379 0.160587 16.682 0.46183 16.325L0.669611 16.0806L0.46183 15.8314C0.159788 15.4769 -0.00444182 15.0221 9.14016e-05 14.5527V13.4385C9.14016e-05 13.2317 0.078588 11.3512 3.89716 6.50436L4.3589 5.89321H3.10759C2.99125 5.89321 2.87968 5.84616 2.79741 5.7624C2.71515 5.67865 2.66894 5.56505 2.66894 5.4466C2.66894 5.32815 2.71515 5.21455 2.79741 5.1308C2.87968 5.04704 2.99125 5 3.10759 5H10.874C10.9904 5 11.1019 5.04704 11.1842 5.1308C11.2665 5.21455 11.3127 5.32815 11.3127 5.4466C11.3127 5.56505 11.2665 5.67865 11.1842 5.7624C11.1019 5.84616 10.9904 5.89321 10.874 5.89321H9.6181L10.1029 6.50436C13.9215 11.3465 14 13.2458 14 13.4432V14.5527C13.9957 15.0283 13.8218 15.4861 13.5106 15.8408L13.2982 16.0853L13.5106 16.3344C13.8086 16.6895 13.9724 17.1414 13.9723 17.6085V18.3983C13.974 18.8657 13.8101 19.318 13.5106 19.6723L13.3028 19.9167L13.5106 20.1612C13.8104 20.5171 13.9743 20.971 13.9723 21.4399V22.225C13.972 22.5334 13.8999 22.8374 13.7618 23.112C13.6237 23.3866 13.4237 23.6239 13.1781 23.8046L12.8503 24.0537L13.1273 24.364C13.6698 24.9637 13.9714 25.7489 13.9723 26.5641V29.7327C13.9662 30.6014 13.623 31.4324 13.0175 32.0445C12.412 32.6565 11.5934 33 10.7401 33H3.23226ZM3.15838 24.1948C2.55492 24.2083 1.98067 24.4619 1.55863 24.9012C1.13659 25.3406 0.900334 25.9308 0.90048 26.5453V29.7139C0.9017 30.3432 1.14777 30.9463 1.58479 31.3913C2.02182 31.8362 2.61421 32.0867 3.23226 32.088H10.814C11.4321 32.0867 12.0244 31.8362 12.4615 31.3913C12.8985 30.9463 13.1446 30.3432 13.1458 29.7139V26.5453C13.1459 25.93 12.909 25.3391 12.486 24.8996C12.063 24.4601 11.4875 24.2071 10.8833 24.1948H7.84964C7.7333 24.1948 7.62173 24.1477 7.53947 24.064C7.45721 23.9802 7.41099 23.8666 7.41099 23.7482C7.41099 23.6297 7.45721 23.5161 7.53947 23.4324C7.62173 23.3486 7.7333 23.3015 7.84964 23.3015H12.0838C12.2226 23.3015 12.3601 23.2737 12.4884 23.2196C12.6167 23.1655 12.7333 23.0862 12.8315 22.9862C12.9297 22.8863 13.0075 22.7676 13.0607 22.637C13.1138 22.5063 13.1412 22.3664 13.1412 22.225V21.4399C13.14 21.1572 13.0301 20.8862 12.8351 20.6849C12.64 20.4837 12.3753 20.3682 12.0976 20.3633H7.8912C7.82185 20.3865 7.74809 20.3927 7.67596 20.3812C7.60383 20.3698 7.53539 20.3411 7.47626 20.2975C7.41712 20.2539 7.36898 20.1967 7.33579 20.1305C7.30259 20.0643 7.28529 19.991 7.28529 19.9167C7.28529 19.8424 7.30259 19.7691 7.33579 19.7029C7.36898 19.6367 7.41712 19.5795 7.47626 19.5359C7.53539 19.4923 7.60383 19.4636 7.67596 19.4522C7.74809 19.4408 7.82185 19.4469 7.8912 19.4701H12.0838C12.363 19.4689 12.6306 19.3557 12.8285 19.1551C13.0264 18.9545 13.1387 18.6826 13.1412 18.3983V17.6085C13.14 17.3233 13.0282 17.0502 12.8301 16.8486C12.6321 16.6469 12.3638 16.5331 12.0838 16.5319H7.84964C7.78029 16.5551 7.70652 16.5612 7.63439 16.5498C7.56226 16.5384 7.49383 16.5097 7.4347 16.4661C7.37557 16.4225 7.32743 16.3653 7.29423 16.2991C7.26104 16.2329 7.24372 16.1596 7.24372 16.0853C7.24372 16.011 7.26104 15.9377 7.29423 15.8715C7.32743 15.8053 7.37557 15.7481 7.4347 15.7045C7.49383 15.6609 7.56226 15.6322 7.63439 15.6208C7.70652 15.6093 7.78029 15.6155 7.84964 15.6387H9.88591H12.1023C12.3823 15.6374 12.6506 15.5236 12.8486 15.322C13.0466 15.1204 13.1584 14.8473 13.1596 14.5621V13.2928L13.0858 13.0719C12.8641 12.2868 12.0007 10.1195 8.61613 6.02014L8.50531 5.88851H5.54095L5.43013 6.02014C1.05747 11.3042 0.89586 13.3492 0.891243 13.4338V14.548C0.891243 14.6894 0.918593 14.8294 0.971731 14.96C1.02487 15.0906 1.10276 15.2093 1.20094 15.3093C1.29913 15.4092 1.4157 15.4885 1.54399 15.5426C1.67227 15.5967 1.80977 15.6246 1.94863 15.6246H2.78899H3.15838H3.694C3.78638 15.6555 3.86682 15.7153 3.92384 15.7955C3.98086 15.8757 4.01156 15.9722 4.01156 16.0712C4.01156 16.1702 3.98086 16.2667 3.92384 16.3469C3.86682 16.4271 3.78638 16.4869 3.694 16.5178H1.95786C1.67743 16.5178 1.40848 16.6312 1.21018 16.8331C1.01188 17.035 0.90048 17.3088 0.90048 17.5944V18.3842C0.901645 18.6656 1.01104 18.9354 1.20524 19.1358C1.39943 19.3361 1.66297 19.4511 1.93939 19.456H3.694C3.81034 19.456 3.92191 19.5031 4.00417 19.5868C4.08644 19.6706 4.13265 19.7842 4.13265 19.9026C4.13265 20.0211 4.08644 20.1347 4.00417 20.2184C3.92191 20.3022 3.81034 20.3492 3.694 20.3492H1.94401C1.66679 20.3542 1.40256 20.4697 1.20824 20.6711C1.01392 20.8725 0.905059 21.1435 0.905102 21.4258V22.2109C0.90449 22.3524 0.931421 22.4927 0.984343 22.6236C1.03726 22.7545 1.11513 22.8734 1.21344 22.9735C1.31175 23.0736 1.42855 23.1529 1.55711 23.2068C1.68568 23.2606 1.82345 23.2881 1.96248 23.2874H3.694C3.81034 23.2874 3.92191 23.3345 4.00417 23.4183C4.08644 23.502 4.13265 23.6156 4.13265 23.7341C4.13265 23.8525 4.08644 23.9661 4.00417 24.0499C3.92191 24.1336 3.81034 24.1807 3.694 24.1807H3.163L3.15838 24.1948Z"
          fill="white"
        />
        <path
          d="M9.01099 3V1.34933C9.00967 1.22444 8.95313 1.105 8.85355 1.01668C8.75396 0.928368 8.61927 0.87824 8.47844 0.877067H5.49619C5.35536 0.87824 5.22068 0.928368 5.12109 1.01668C5.02151 1.105 4.96497 1.22444 4.96365 1.34933V3H4V1.34933C3.99994 0.995325 4.15677 0.655483 4.43665 0.403072C4.71654 0.150661 5.09706 0.00590001 5.49619 0H8.47844C8.88199 0 9.269 0.14216 9.55435 0.395207C9.83969 0.648255 10 0.991462 10 1.34933V3H9.01099Z"
          fill="white"
        />
      </svg>
    ),
  },
];

export const SnakeSteps: React.FC<{ id: string }> = ({ id }) => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const section = document.getElementById(id);
    if (!path || !section) return;

    const dashLength = 1000;
    path.style.strokeDasharray = dashLength.toString();
    path.style.strokeDashoffset = dashLength.toString();

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.bottom < 0 || rect.top > windowHeight) {
        // If the section is not in view, reset the stroke offset
        path.style.strokeDashoffset = dashLength.toString();
        return;
      }
      const scrollStart = windowHeight * 0.7;
      const scrollEnd = windowHeight * 0.2;

      const progress =
        1 -
        Math.max(
          0,
          Math.min(1, (rect.top - scrollEnd) / (windowHeight - scrollStart))
        );

      const offset = dashLength * (1 - progress);
      path.style.strokeDashoffset = offset.toString();
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [id]);

  return (
    <Wrapper id={id}>
      <SnakeLine viewBox="0 0 400 900" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="snakeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" /> {/* fljólublár */}
            <stop offset="50%" stopColor="#3b82f6" /> {/* blár */}
            <stop offset="100%" stopColor="white" /> {/* hvítur */}
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <AnimatedPath
          ref={pathRef}
          d="
    M200 150
    C200 240, 100 240, 100 300
    S300 460, 300 550
    S100 660, 100 750
  "
          fill="none"
          stroke="url(#snakeGradient)"
          strokeWidth="4"
          filter="url(#glow)"
          strokeLinecap="round"
        />
      </SnakeLine>

      <StepsContainer>
        {steps.map((step, idx) => (
          <StepItem key={idx} align={idx % 2 === 0 ? "left" : "right"}>
            <StepHeader>
              <h3>{step.title}</h3>
              <IconWrapper>{step.icon}</IconWrapper>
            </StepHeader>
            <p>{step.desc}</p>
          </StepItem>
        ))}
      </StepsContainer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  padding: 6rem 1rem;
  background: rgba(255, 255, 255, 0.01);
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${BREAK}) {
    padding: 4rem 1rem 3rem;
  }
`;

const SnakeLine = styled.svg`
  position: absolute;
  top: 60px;
  left: 50%;
  width: 400px;
  height: calc(100% - 140px); /* smá meira buffer neðst */
  transform: translateX(-50%);
  z-index: 0;
  pointer-events: none;

  @media (max-width: ${BREAK}) {
    top: 36px;
    width: 62vw;
    max-width: 420px;
    min-width: 260px;
    height: 600px; /* <- stillanlegt: 480–560px eftir smekk */
  }
`;

const StepsContainer = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8rem;
  z-index: 1;

  @media (max-width: ${BREAK}) {
    gap: 3.75rem; /* smá meiri loft en samt kompakt */
  }
`;

const StepItem = styled.li<{ align: "left" | "right" }>`
  width: 300px;
  padding: 2rem 1.5rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 1.5rem;
  backdrop-filter: blur(12px);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  text-align: left;
  align-self: ${({ align }) => (align === "left" ? "flex-start" : "flex-end")};
  transform: ${({ align }) =>
    align === "left" ? "translateX(-60px)" : "translateX(60px)"};

  h3 {
    font-size: clamp(1.2rem, 4.8vw, 1.5rem);
    margin-bottom: 0.75rem;
    color: ${COLORS.accent};
  }

  p {
    font-size: clamp(1rem, 4.2vw, 1.1rem);
    line-height: 1.55;
    opacity: 0.9;
    margin: 0;
  }

  /* <-- Lykilbreyting: á síma haldast kortin “criss cross”, en mýkri offset og speglað alignment */
  @media (max-width: ${BREAK}) {
    width: min(92vw, 380px);
    align-self: ${({ align }) =>
      align === "left" ? "flex-start" : "flex-end"};
    transform: ${({ align }) =>
      align === "left" ? "translateX(-14px)" : "translateX(14px)"};
    text-align: ${({ align }) => (align === "left" ? "left" : "right")};
    padding: 1.4rem 1.2rem;
  }
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  justify-content: space-between;

  h3 {
    font-size: clamp(1.2rem, 4.8vw, 1.5rem);
    color: ${COLORS.accent};
    margin: 0;
  }

  @media (max-width: ${BREAK}) {
    /* spegla layout með text-align breytingunni */
    justify-content: ${({ theme }) =>
      (theme as any)?.justify || "space-between"};
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  svg {
    display: block;
    width: 28px;
    height: auto;
  }
  @media (max-width: ${BREAK}) {
    svg {
      width: 30px;
    }
  }
`;
