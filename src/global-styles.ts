import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,*::before,*::after{ box-sizing:border-box; }
  html, body, #root { height:100%; }
  body {
    margin:0;
    background: ${({ theme }) => (theme as any).bg};
    color: ${({ theme }) => (theme as any).text};
    font-family: "TASA Orbiter", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, "Helvetica Neue", Arial, "Apple Color Emoji","Segoe UI Emoji";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  a { color: inherit; text-decoration: none; }
  button { font: inherit; }
`;
