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
  taglines: string[];
}

export const locale: Record<Locale, LocaleStrings> = {
  en: {
    nav: [
      { label: "Product", href: "#product" },
      { label: "How it works", href: "#how" },
      { label: "For Spaces", href: "#gyms" },
      { label: "Contact", href: "#contact" },
    ],
    talkToUs: "Talk to us",
    heroLead: "Smart powder vending — stylish, sustainable and fast.",
    taglines: [
      "Forgot your preworkout?",
      "Running late to class?",
      "Need fuel for your meeting?",
      "Duftbar — fuel in seconds.",
    ],
    getMachine: "Get the machine",
    howItWorks: "How duftbar works",
    duftbarMachine: "The duftbar Machine",
    machineDesc:
      "A sleek, furniture-like design with precision dosing, cashless payments and eco-friendly serving. It blends into any modern space — from gyms to co-working hubs.",
    machineFeatures1: "Accurate single, double or triple scoop dispensing",
    machineFeatures2: "21.5″ intuitive touch display with beautiful UI",
    machineFeatures3: "Cashless only (phone, card or watch)",
    machineFeatures4: "Cloud telemetry, remote recipes and updates",
    howDesc:
      "Walk up. Choose your blend. Tap to pay. Dispense in seconds. No friction, no waste — just fuel when you need it.",
    stepChoose: "Choose",
    stepChooseText: "Pick your blend and size",
    stepTap: "Tap to pay",
    stepTapText: "Fast, seamless checkout",
    stepGo: "Dispense",
    stepGoText: "Freshly mixed in seconds",
    bringDuftbar: "Bring Duftbar to your venue",
    bringDesc:
      "We handle installation, service and support. Share your space with us and we’ll tailor the setup to fit perfectly.",
    formName: "Your name",
    formContact: "Email or phone",
    formVenue: "Venue (gym, office, university …)",
    formNotes: "Anything we should know?",
    requestPlacement: "Request a placement",
    footerMade: "Designed and built with care and Iceland",
  },

  is: {
    nav: [
      { label: "Vélin", href: "#product" },
      { label: "Hvernig þetta virkar", href: "#how" },
      { label: "Fyrir aðstöðu", href: "#gyms" },
      { label: "Hafðu samband", href: "#contact" },
    ],
    talkToUs: "Hafðu samband",
    heroLead:
      "Snjöll og sjálfbær lausn fyrir næringarduft – hraðvirk og hreinleg.",
    taglines: [
      "Gleymdirðu preworkout?",
      "Seinn á fund?",
      "Þarft orku fyrir daginn?",
      "Duftbar — eldsneyti á sekúndum.",
    ],
    getMachine: "Fáðu vélina",
    howItWorks: "Hvernig Duftbar virkar",
    duftbarMachine: "Duftbar-vélin",
    machineDesc:
      "Falleg hönnun sem líkist húsgagni, með nákvæma skömmtun, snertilausar greiðslur og vistvæna nálgun. Fellur inn í hvaða nútímarými sem er – frá líkamsrækt til samvinnurýma.",
    machineFeatures1:
      "Einfaldir, tvöfaldir eða þrefaldir skammtar með nákvæmni",
    machineFeatures2: '21,5" snertiskjár með glæsilegu og notendavænu viðmóti',
    machineFeatures3: "Aðeins snertilausar greiðslur (sími, kort, úr)",
    machineFeatures4: "Skýjatenging, uppskriftir og fjaruppfærslur",
    howDesc:
      "Gakktu að. Veldu blöndu. Greiddu. Vél blandar á sekúndum. Engin fyrirhöfn, engin sóun – bara eldsneyti þegar þú þarft á því að halda.",
    stepChoose: "Veldu",
    stepChooseText: "Veldu blöndu og stærð",
    stepTap: "Greiddu",
    stepTapText: "Hraðvirkt og snertilaust",
    stepGo: "Njóttu",
    stepGoText: "Tilbúið á örfáum sekúndum",
    bringDuftbar: "Komdu Duftbar fyrir hjá þér",
    bringDesc:
      "Við sjáum um uppsetningu, þjónustu og stuðning. Segðu okkur frá þínum aðstæðum og við mótum lausn sem smellpassar.",
    formName: "Nafn þitt",
    formContact: "Netfang eða símanúmer",
    formVenue: "Staður (líkamsrækt, háskóli, skrifstofa …)",
    formNotes: "Eitthvað sem við ættum að vita?",
    requestPlacement: "Senda inn beiðni",
    footerMade: "Hannað af alúð og smíðað á Íslandi",
  },
};
