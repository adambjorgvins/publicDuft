// src/data/locale.ts
export type Locale = "en" | "is";

export type NavItem = { label: string; href: string };

export interface LocaleStrings {
  nav: NavItem[];
  forgotYour: string;
  talkToUs: string;
  heroLead: string;
  getMachine: string;
  howItWorks: string;
  items: string[]; // <--- nýtt
  afterItems: string[];
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
    forgotYour: "Forgot your",
    items: [
      "preworkout?",
      "protein?",
      "electrolytes?",
      "creatine?",
      "energy boost?",
    ],
    afterItems: [
      "Running late to class?",
      "Need fuel for your meeting?",
      "Duftbar — fuel in seconds.",
    ],
    talkToUs: "Talk to us",
    heroLead: "Smart. Sustainable. Nutrition in seconds.",
    taglines: [
      "Forgot your preworkout?",
      "Running late to class?",
      "Need fuel before a meeting?",
      "Duftbar — fuel on demand.",
    ],
    getMachine: "Get the machine",
    howItWorks: "How Duftbar works",
    duftbarMachine: "The Duftbar Machine",
    machineDesc:
      "A design-forward, furniture-like dispenser that delivers precision scoops, seamless cashless payments and eco-friendly servings. Built to blend into modern gyms, offices and campuses.",
    machineFeatures1: "Exact single, double or triple scoop dispensing",
    machineFeatures2: "21.5″ intuitive touchscreen with premium UI",
    machineFeatures3: "100% cashless (phone, card or watch)",
    machineFeatures4: "Cloud telemetry, remote recipes & updates",
    howDesc:
      "Walk up. Choose your blend. Tap to pay. Dispensed in seconds. No hassle, no waste — just performance fuel when you need it.",
    stepChoose: "Choose",
    stepChooseText: "Select your blend and portion size",
    stepTap: "Tap",
    stepTapText: "Instant, frictionless checkout",
    stepGo: "Go",
    stepGoText: "Your drink ready in seconds",
    bringDuftbar: "Bring Duftbar to your venue",
    bringDesc:
      "We handle installation, servicing and support. You provide the space — we make it effortless.",
    formName: "Your name",
    formContact: "Email or phone",
    formVenue: "Venue (gym, office, university …)",
    formNotes: "Anything we should know?",
    requestPlacement: "Request placement",
    footerMade: "Designed with care. Built in Iceland.",
  },

  is: {
    nav: [
      { label: "Vélin", href: "#product" },
      { label: "Hvernig virkar", href: "#how" },
      { label: "Fyrir rými", href: "#gyms" },
      { label: "Hafðu samband", href: "#contact" },
    ],
    forgotYour: "Gleymdirðu",
    items: ["preworkout?", "prótein?", "rafvakar?", "kreatín?", "orkuskot?"],
    afterItems: [
      "Seinn í tíma?",
      "Þarft orku fyrir fundinn?",
      "Duftbar — eldsneyti á sekúndum.",
    ],
    talkToUs: "Hafðu samband",
    heroLead: "Snjöll, sjálfbær lausn — næring á sekúndum.",
    taglines: [
      "Gleymdirðu preworkout?",
      "Seinn í tíma eða fund?",
      "Þarft auka orku fyrir daginn?",
      "Duftbar — eldsneyti á sekúndum.",
    ],
    getMachine: "Fáðu vélina",
    howItWorks: "Svona virkar Duftbar",
    duftbarMachine: "Duftbar-vélin",
    machineDesc:
      "Vandað tæki sem líkist húsgagni og blandast umhverfinu náttúrulega. Nákvæm skömmtun, snertilausar greiðslur og vistvæn nálgun gera hana fullkomna fyrir líkamsrækt, skrifstofur og háskóla.",
    machineFeatures1:
      "Einfaldir, tvöfaldir eða þrefaldir skammtar með nákvæmni",
    machineFeatures2: '21,5" snertiskjár með fyrsta flokks viðmóti',
    machineFeatures3: "Aðeins snertilausar greiðslur (sími, kort eða úr)",
    machineFeatures4: "Skýjatenging, uppskriftir & fjaruppfærslur",
    howDesc:
      "Gakktu að. Veldu blöndu. Greiddu með snertingu. Drykkurinn tilbúinn á nokkrum sekúndum. Engin fyrirhöfn — bara eldsneyti þegar þú þarft á því að halda.",
    stepChoose: "Veldu",
    stepChooseText: "Veldu blöndu og skammtastærð",
    stepTap: "Greiddu",
    stepTapText: "Hraðvirkt, snertilaust ferli",
    stepGo: "Njóttu",
    stepGoText: "Drykkurinn tilbúinn á sekúndum",
    bringDuftbar: "Komdu Duftbar í þitt rými",
    bringDesc:
      "Við sjáum um uppsetningu, þjónustu og stuðning. Þú leggur til rýmið — við gerum afganginn.",
    formName: "Nafn þitt",
    formContact: "Netfang eða símanúmer",
    formVenue: "Staður (líkamsrækt, skrifstofa, háskóli …)",
    formNotes: "Eitthvað sem við ættum að vita?",
    requestPlacement: "Senda beiðni",
    footerMade: "Hannað af ástríðu. Byggt á Íslandi.",
  },
};
