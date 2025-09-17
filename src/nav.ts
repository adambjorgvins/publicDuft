import { Locale } from "./locale";

export const locale: Record<Locale, Record<string, any>> = {
  en: {
    nav: [
      { label: "Product", href: "#product" },
      { label: "How it works", href: "#how" },
      { label: "For Gyms", href: "#gyms" },
      { label: "Contact", href: "#contact" },
    ],
  },
  is: {
    nav: [
      { label: "Vélin", href: "#product" },
      { label: "Hvernig það virkar", href: "#how" },
      { label: "Fyrir líkamsræktarstöðvar", href: "#gyms" },
      { label: "Hafðu samband", href: "#contact" },
    ],
  },
};
