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
  items: string[];
  afterItems: string[];
  duftbarMachine: string;
  machineDesc: string;
  machineFeatures1: string;
  machineFeatures2: string;
  machineFeatures3: string;
  machineFeatures4: string;
  machineFeatures5: string;
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
  footerMade: string;
  footerPayments: string;
  formVenue: string;
  formNotes: string;
  requestPlacement: string;
  taglines: string[];
  spacesTitle: string;
  spacesDesc: string;
  contactLocationLabel: string;
  contactLocationSub: string;
  contactEmailLabel: string;
  contactEmailSub: string;
  contactPhoneLabel: string;
  contactPhoneSub: string;
  spaces: { title: string; text: string }[];
  team: {
    name: string;
    role: string;
    text: string;
    img: string;
  }[];
}

export const locale: Record<Locale, LocaleStrings> = {
  en: {
    nav: [
      { label: "Product", href: "#product" },
      { label: "How it works", href: "#how" },
      { label: "For Spaces", href: "#spaces" },
      { label: "Team", href: "#team" }, // 👈 bætti þessu við
      { label: "Contact", href: "#contact" },
    ],
    team: [
      {
        name: "Adam Bæhrenz Björgvinsson",
        role: "Founder – Software & Hardware",
        text: "Adam leads software and hardware programming, building the core systems that power the machine.",
        img: "https://cdn-icons-png.flaticon.com/512/145/145867.png", // cartoon male avatar
      },
      {
        name: "Sara Ísey Isorena Guðjónsdóttir",
        role: "Co-Founder – Mechanical Design",
        text: "Leads the mechanical design of the machine, focusing on structure and usability.",
        img: "https://cdn-icons-png.flaticon.com/512/145/145852.png", // cartoon female avatar
      },
      {
        name: "Baldur Geir Gunnarsson",
        role: "Co-Founder – Electrical Design",
        text: "Leads the electrical design and system integration for the machine.",
        img: "https://cdn-icons-png.flaticon.com/512/145/145867.png", // another cartoon male avatar
      },
    ],

    spacesTitle: "For Spaces",
    spacesDesc:
      "duftbar fits naturally into any environment — designed for gyms, universities, offices, arenas, and beyond.",
    spaces: [
      {
        title: "Gyms & Studios",
        text: "Instant pre-workout or protein before and after sessions.",
      },
      {
        title: "Universities",
        text: "On-demand energy and focus between lectures and study marathons.",
      },
      {
        title: "Offices & Co-working",
        text: "Boost productivity with sustainable fuel at work.",
      },
      {
        title: "Arenas & Events",
        text: "Fast, reliable nutrition for athletes and fans alike.",
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
      "A design-forward, furniture-like dispenser that delivers precision scoops, seamless cashless payments, and eco-friendly servings. Sized and styled to fit modern gyms, offices, and campuses.",

    machineFeatures1: "Exact single, double, or triple scoop dispensing",
    machineFeatures2: '21.5" intuitive touchscreen with premium UI',
    machineFeatures3: "Over 1000 servings in the machine",
    machineFeatures4: "100% cashless (phone, card, or watch)",
    machineFeatures5: "Cloud telemetry, remote recipes & updates",

    howDesc:
      "Walk up. Choose your supplement. Tap to pay. Dispensed in seconds. No hassle, no waste — just performance fuel when you need it.",
    stepChoose: "Choose",
    stepChooseText: "Select your product or flavor and portion size",
    stepTap: "Tap",
    stepTapText: "Instant, frictionless checkout",
    stepGo: "Go",
    stepGoText: "Your drink ready in seconds",

    bringDuftbar: "Bring duftbar to your venue",
    bringDesc:
      "We handle installation, servicing, and support. You provide the space — we make it effortless.",

    formName: "Your name",
    formContact: "Email or phone",
    formVenue: "Venue (gym, office, university …)",
    formNotes: "Anything we should know?",
    requestPlacement: "Request placement",

    footerMade: "Designed with care. Built in Iceland.",
    footerPayments: "Secure payments powered by Verifone",
    contactLocationLabel: "Reykjavík, Iceland",
    contactLocationSub: "Installations across Iceland — EU pilots on request",
    contactEmailLabel: "hello.duftbar@gmail.com",
    contactEmailSub: "24h response on weekdays",
    contactPhoneLabel: "+354 6982326",
    contactPhoneSub: "Sales & Support",
  },

  is: {
    nav: [
      { label: "Vélin", href: "#product" },
      { label: "Hvernig virkar", href: "#how" },
      { label: "Fyrir rými", href: "#spaces" },
      { label: "Teymið", href: "#team" }, // 👈 bætti þessu við
      { label: "Hafðu samband", href: "#contact" },
      { label: "Orri og Birgitta", href: "/pitch" },
    ],
    team: [
      {
        name: "Adam Bæhrenz Björgvinsson",
        role: "Stofnandi – Hugbúnaður & Vélbúnaður",
        text: "Adam er tölvunarfræðingur og sér um hugbúnaðar- og vélbúnaðarforritun, hann byggir kjarnakerfin sem knýja vélina.",
        img: "https://cdn-icons-png.flaticon.com/512/145/145867.png",
      },
      {
        name: "Sara Ísey Isorena Guðjónsdóttir",
        role: "Meðstofnandi – Vélhönnun",
        text: "Sara er aerospace verkfræðingur og sér um vélhönnun vélarinnar með áherslu á burðarþol og notagildi.",
        img: "https://cdn-icons-png.flaticon.com/512/145/145852.png",
      },
      {
        name: "Baldur Geir Gunnarsson",
        role: "Meðstofnandi – Rafhönnun",
        text: "Baldur er vélaverkfræðingur og sér um rafhönnun og samþættingu kerfa fyrir vélina.",
        img: "https://cdn-icons-png.flaticon.com/512/145/145867.png",
      },
    ],
    spacesTitle: "Fyrir rými",
    spacesDesc:
      "duftbar fellur náttúrulega að hvaða umhverfi sem er — hönnuð fyrir líkamsræktarstöðvar, háskóla, skrifstofur, íþróttahallir og fleira.",
    spaces: [
      {
        title: "Líkamsrækt & Stúdíó",
        text: "Skammtar af pre-workout eða próteini fyrir og eftir æfingar.",
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
        text: "Hröð og áreiðanleg næring fyrir keppendur og áhorfendur.",
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
      "Gleymdirðu pre-workout?",
      "Seinn í tíma eða fund?",
      "Þarft auka orku fyrir daginn?",
      "duftbar — eldsneyti á sekúndum.",
    ],
    getMachine: "Fáðu vélina",
    howItWorks: "Svona virkar duftbar",

    duftbarMachine: "duftbar",
    machineDesc:
      "Vél sem fellur náttúrulega að umhverfinu. Nákvæm skömmtun, snertilausar greiðslur og vistvæn nálgun gerir hana fullkomna fyrir líkamsrækt, skrifstofur og háskóla.",

    machineFeatures1:
      "Einfaldur, tvöfaldur eða þrefaldur skammtar með nákvæmni",
    machineFeatures2: '21,5" snertiskjár með fyrsta flokks viðmóti',
    machineFeatures3: "Yfir 1000 skammtar í vél",
    machineFeatures4: "Aðeins snertilausar greiðslur (sími, kort eða úr)",
    machineFeatures5: "Skýjatenging, uppskriftir og fjaruppfærslur",

    howDesc:
      "Gakktu að. Veldu vöruna. Greiddu. Drykkurinn tilbúinn á nokkrum sekúndum. Engin fyrirhöfn — bara eldsneyti þegar þú þarft á því að halda.",
    stepChoose: "Veldu",
    stepChooseText: "Veldu vöru eða bragð og skammtastærð",
    stepTap: "Greiddu",
    stepTapText: "Hraðvirkt, snertilaust ferli",
    stepGo: "Njóttu",
    stepGoText: "Drykkurinn tilbúinn á sekúndum",

    bringDuftbar: "Komdu duftbar í þitt rými",
    bringDesc:
      "Við sjáum um uppsetningu, þjónustu og stuðning. Þú leggur til rýmið — við gerum rest.",

    formName: "Nafn þitt",
    formContact: "Netfang eða símanúmer",
    formVenue: "Staður (líkamsrækt, skrifstofa, háskóli …)",
    formNotes: "Eitthvað sem við ættum að vita?",
    requestPlacement: "Senda beiðni",

    footerMade: "Hannað af ástríðu. Byggt á Íslandi.",
    footerPayments: "Öruggar greiðslur með Verifone",
    contactLocationLabel: "Reykjavík, Ísland",
    contactLocationSub:
      "Uppsetningar um land allt — tilraunaverkefni í Evrópu eftir samkomulagi",
    contactEmailLabel: "hello.duftbar@gmail.com",
    contactEmailSub: "Svör innan 24 klst. á virkum dögum",
    contactPhoneLabel: "+354 6982326",
    contactPhoneSub: "Sala & Þjónusta",
  },
};
