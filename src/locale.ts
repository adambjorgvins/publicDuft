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
  spacesTitle: string;
  spacesDesc: string;
  spaces: { title: string; text: string }[];
}

export const locale: Record<Locale, LocaleStrings> = {
  en: {
    nav: [
      { label: "Product", href: "#product" },
      { label: "How it works", href: "#how" },
      { label: "For Spaces", href: "#spaces" },
      { label: "Contact", href: "#contact" },
    ],
    spacesTitle: "For Spaces",
    spacesDesc:
      "duftbar blends seamlessly into any environment — designed for gyms, universities, offices, arenas, and beyond.",
    spaces: [
      {
        title: "Gyms & Studios",
        text: "Instant pre-workout or protein fuel before and after sessions.",
      },
      {
        title: "Universities",
        text: "Energy and focus on-demand between lectures and study marathons.",
      },
      {
        title: "Offices & Co-working",
        text: "Boost productivity with sustainable fuel right at work.",
      },
      {
        title: "Arenas & Events",
        text: "Fast and reliable nutrition for athletes and fans alike.",
      },
    ],
    forgotYour: "Forgot your",
    items: ["supplements?"],
    afterItems: [
      "Running late to class?",
      "Need fuel for your meeting?",
      "duftbar — fuel in seconds.",
    ],

    talkToUs: "Talk to us",
    heroLead: "Smart. Sustainable. Nutrition in seconds.",
    taglines: [
      "Forgot your preworkout?",
      "Running late to class?",
      "Need fuel before a meeting?",
      "duftbar — fuel on demand.",
    ],
    getMachine: "Get the machine",
    howItWorks: "How does it work?",
    duftbarMachine: "The duftbar machine",
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
    bringDuftbar: "Bring duftbar to your venue",
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
      { label: "Fyrir rými", href: "#spaces" },
      { label: "Hafðu samband", href: "#contact" },
    ],
    spacesTitle: "Fyrir rými",
    spacesDesc:
      "duftbar fellur náttúrulega inn í hvaða umhverfi sem er — hönnuð fyrir líkamsræktarstöðvar, háskóla, skrifstofur, íþróttahallir og fleira.",
    spaces: [
      {
        title: "Líkamsrækt & Stúdíó",
        text: "Skammtar af preworkout eða próteini fyrir og eftir æfingar.",
      },
      {
        title: "Háskólar",
        text: "Orka og einbeiting á milli fyrirlestra og námslotna.",
      },
      {
        title: "Skrifstofur & Co-working",
        text: "Aukin framleiðni með sjálfbæru eldsneyti á vinnustaðnum.",
      },
      {
        title: "Íþróttaleikvangar & Viðburðir",
        text: "Hröð og áreiðanleg næring fyrir bæði keppendur og áhorfendur.",
      },
    ],
    forgotYour: "Gleymdirðu",
    items: ["fæðubótarefni?"],
    afterItems: [
      "Seinn í tíma?",
      "Þarft orku fyrir fundinn?",
      "duftbar — eldsneyti á sekúndum.",
    ],
    talkToUs: "Hafðu samband",
    heroLead: "Snjöll, sjálfbær lausn — næring á sekúndum.",
    taglines: [
      "Gleymdirðu preworkout?",
      "Seinn í tíma eða fund?",
      "Þarft auka orku fyrir daginn?",
      "duftbar — eldsneyti á sekúndum.",
    ],
    getMachine: "Fáðu vélina",
    howItWorks: "Svona virkar duftbar",
    duftbarMachine: "duftbar-vélin",
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
    bringDuftbar: "Komdu duftbar í þitt rými",
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
