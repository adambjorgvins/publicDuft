import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { light, dark } from "./theme";
import { GlobalStyle } from "./global-styles";
import DuftbarPage from "./duftbar-page";
import Login from "./login";
import { trackPageView, setAnalyticsConsent } from "./analytics";
import { CookieConsent, getCookieConsent } from "./cookie-consent";

// Component to track page views on route changes
function PageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return null;
}

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("duftbar-theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (localStorage.getItem("duftbarPass") === "true") {
      setAuthed(true);
    }

    // Initialize analytics based on existing consent
    const consent = getCookieConsent();
    if (consent === "accepted") {
      setAnalyticsConsent(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("duftbar-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const handleAcceptCookies = () => {
    setAnalyticsConsent(true);
  };

  const handleDeclineCookies = () => {
    setAnalyticsConsent(false);
  };

  const theme = isDark ? dark : light;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <PageViewTracker />
        <Routes>
          <Route
            path="/"
            element={
              authed ? (
                <DuftbarPage />
              ) : (
                <Login onSuccess={() => setAuthed(true)} />
              )
            }
          />
        </Routes>
        <CookieConsent
          onAccept={handleAcceptCookies}
          onDecline={handleDeclineCookies}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}
