// Google Analytics 4 helper functions
// Measurement ID: G-VL7EBMHLQJ

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>,
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Track a page view
 * @param path - The page path (e.g., '/about', '/contact')
 * @param title - Optional page title
 */
export const trackPageView = (path: string, title?: string) => {
  if (typeof window.gtag === "function") {
    window.gtag("config", "G-VL7EBMHLQJ", {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

/**
 * Track a custom event
 * @param eventName - Name of the event (e.g., 'button_click', 'login_success')
 * @param eventParams - Additional event parameters
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>,
) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, eventParams);
  }
};

/**
 * Track login event
 * @param method - Login method (e.g., 'password', 'google')
 */
export const trackLogin = (method: string = "password") => {
  trackEvent("login", { method });
};

/**
 * Track navigation clicks
 * @param destination - Where the user navigated to
 */
export const trackNavigation = (destination: string) => {
  trackEvent("navigation", { destination });
};

/**
 * Check if Google Analytics is loaded and ready
 */
export const isAnalyticsReady = (): boolean => {
  return typeof window.gtag === "function";
};
