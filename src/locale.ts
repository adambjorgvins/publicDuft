// src/data/locale.ts
export type Locale = "en" | "is";

export type NavItem = { label: string; href: string };

export interface LocaleStrings {
  nav: NavItem[];
  talkToUs: string;
  heroLead: string;
  getMachine: string;
  howItWorks: string;
  duftbarMachine: string;
  machineDesc: string;
  machineFeatures1: string;
  machineFeatures2: string;
  machineFeatures3: string;
  machineFeatures4: string;
  howDesc: string;
  stepChoose: string;
  stepChooseText: string;
  stepTap: string;
  stepTapText: string;
  stepGo: string;
  stepGoText: string;
  bringDuftbar: string;
  bringDesc: string;
  formName: string;
  formContact: string;
  formVenue: string;
  formNotes: string;
  requestPlacement: string;
  footerMade: string;
}

export const locale: Record<Locale, LocaleStrings> = {
  en: {
    nav: [
      { label: "Product", href: "#product" },
      { label: "How it works", href: "#how" },
      { label: "For Gyms", href: "#gyms" },
      { label: "Contact", href: "#contact" },
    ],
    talkToUs: "Talk to us",
    heroLead:
      "Smart powder vending — clean, quick and contactless for gyms, arenas, offices and everyday athletes.",
    getMachine: "Get the machine",
    howItWorks: "How Duftbar works",
    duftbarMachine: "The Duftbar Machine",
    machineDesc:
      "Precision dosing, cashless payments and a minimal, robust enclosure — designed to look at home in premium gyms and modern workplaces.",
    machineFeatures1: "NEMA-driven augers for gram-accurate control",
    machineFeatures2: "21.5″ touch with an accessible, queue-friendly flow",
    machineFeatures3: "Cashless only (tap phone, card or watch)",
    machineFeatures4: "Cloud telemetry, remote recipes and firmware updates",
    howDesc:
      "Walk up. Tap to pay. Dispense. Duftbar removes friction so members refuel fast and keep training.",
    stepChoose: "Choose",
    stepChooseText: "Pick blend and size",
    stepTap: "Tap to pay",
    stepTapText: "Fast, cashless checkout",
    stepGo: "Dispense",
    stepGoText: "Fresh mix in seconds",
    bringDuftbar: "Bring Duftbar to your venue",
    bringDesc:
      "We handle install and support. Tell us about your location and we’ll tailor the setup to fit.",
    formName: "Your name",
    formContact: "Email or phone",
    formVenue: "Venue (gym, office, arena …)",
    formNotes: "Anything we should know?",
    requestPlacement: "Request a placement",
    footerMade: "Designed and built with care in Iceland",
  },

  is: {
    nav: [
      { label: "Vélin", href: "#product" },
      { label: "Hvernig þetta virkar", href: "#how" },
      { label: "Fyrir líkamsræktarstöðvar", href: "#gyms" },
      { label: "Hafðu samband", href: "#contact" },
    ],
    talkToUs: "Hafðu samband",
    heroLead:
      "Snjall sjálfsali fyrir næringarduft – hraður, hreinlegur og snertilaus; hannaður fyrir líkamsræktarstöðvar, íþróttamannvirki og vinnustaði.",
    getMachine: "Fáðu vélina",
    howItWorks: "Hvernig Duftbar virkar",
    duftbarMachine: "Duftbar-vélin",
    machineDesc:
      "Nákvæm skömmtun, snertilausar greiðslur og einföld, stílhrein hönnun sem fellur vel að nútímalegum líkamsræktarrýmum og vinnustöðum.",
    machineFeatures1: "NEMA-drifið skrúfukerfi með gramm-nákvæmri skömmtun",
    machineFeatures2: '21,5" snertiskjár með aðgengilegu og hraðvirku flæði',
    machineFeatures3: "Einungis snertilausar greiðslur (sími, kort, úr)",
    machineFeatures4: "Skýjatenging, rekjanleiki og fjaruppfærslur uppskrifta",
    howDesc:
      "Gakktu að, greiddu snertilaust, vélin blandar – þú heldur áfram með æfinguna.",
    stepChoose: "Veldu",
    stepChooseText: "Veldu blöndu og stærð",
    stepTap: "Greiddu",
    stepTapText: "Snertilaust og öruggt",
    stepGo: "Njóttu",
    stepGoText: "Blandað og tilbúið á örskotsstundu",
    bringDuftbar: "Komdu Duftbar fyrir hjá þér",
    bringDesc:
      "Við sjáum um ráðgjöf, uppsetningu og þjónustu. Segðu okkur frá aðstæðum og við mótum lausn sem hentar.",
    formName: "Nafn þitt",
    formContact: "Netfang eða símanúmer",
    formVenue: "Staður (líkamsrækt, skrifstofa, íþróttahöll …)",
    formNotes: "Eitthvað sem við eigum að vita?",
    requestPlacement: "Senda inn beiðni",
    footerMade: "Hannað og smíðað af alúð á Íslandi",
  },
};
