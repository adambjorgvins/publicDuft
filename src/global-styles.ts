import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,*::before,*::after{ box-sizing:border-box; }
  html, body, #root { height:100%; }
  html {
    scroll-behavior: smooth;
  }
  body {
    margin:0;
    background: ${({ theme }) => (theme as any).bg};
    color: ${({ theme }) => (theme as any).text};
    font-family: "TASA Orbiter", system-ui, -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  a { 
    color: inherit; 
    text-decoration: none;
  }
  button { 
    font: inherit;
    cursor: pointer;
  }
  
  /* GPU acceleration for smooth scrolling */
  img, video {
    content-visibility: auto;
  }
  
  /* Simple bounce animation */
  @keyframes bounce {
    0%, 100% { transform: translateY(0); opacity: 0.6; }
    50% { transform: translateY(12px); opacity: 1; }
  }
`;
