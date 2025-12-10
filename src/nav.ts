import { Locale } from "./locale";

export const locale: Record<Locale, Record<string, any>> = {
  en: {
    nav: [
      { label: "Product", href: "#product" },
      { label: "How it works", href: "#how" },
      { label: "For Spaces", href: "#spaces" },
      { label: "Team", href: "#team" }, // 👈 bætti þessu við
      { label: "Contact", href: "#contact" },
    ],
  },
  is: {
    nav: [
      { label: "Vélin", href: "#product" },
      { label: "Hvernig virkar duftbar", href: "#how" },
      { label: "Fyrir rými", href: "#spaces" },
      { label: "Teymið", href: "#team" }, // 👈 bætti þessu við
      { label: "Hafðu samband", href: "#contact" },
    ],
  },
};
