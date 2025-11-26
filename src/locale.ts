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
  teamIntro: string;
  teamTitle: string;
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
    teamIntro:
      "We believe the future of nutrition is smart, beautiful, and accessible. Duftbar combines design, technology, and sustainability into one seamless experience — redefining how people access energy and performance. This isn’t just a machine. It’s a movement.",
    teamTitle: "Meet the Team",
    nav: [
      { label: "The Machine", href: "#product" },
      { label: "How it Works", href: "#how" },
      { label: "For Spaces", href: "#spaces" },
      { label: "Team", href: "#team" },
      { label: "Contact", href: "#contact" },
    ],
    team: [
      {
        name: "Adam Bæhrenz Björgvinsson",
        role: "Founder – Software & Hardware (BSc Computer Science)",
        text: "Adam leads the full software and hardware development of Duftbar — building the core system that connects design, data, and technology into one fluid experience.",
        img: "https://cdn-icons-png.flaticon.com/512/145/145867.png",
      },
      {
        name: "Sara Ísey Isorena Guðjónsdóttir",
        role: "Co-Founder – Mechanical Design (MSc Aerospace Engineering)",
        text: "Sara drives the mechanical and structural design of the machine — merging engineering precision with timeless aesthetics and usability.",
        img: "https://cdn-icons-png.flaticon.com/512/145/145852.png",
      },
      {
        name: "Baldur Geir Gunnarsson",
        role: "Co-Founder – Electrical Design (BSc Mechanical Engineering)",
        text: "Baldur oversees all electrical design and system integration — ensuring every movement, sensor, and motor works in perfect harmony.",
        img: "https://cdn-icons-png.flaticon.com/512/145/145867.png",
      },
    ],

    spacesTitle: "For Modern Spaces",
    spacesDesc:
      "Duftbar is redefining on-demand nutrition — a design-driven, smart, and sustainable experience that fits perfectly into gyms, universities, offices, and arenas.",
    spaces: [
      {
        title: "Gyms & Studios",
        text: "Increase sales and customer satisfaction with instant protein and pre-workout — no mess, no delay.",
      },
      {
        title: "Universities",
        text: "Empower students with on-demand energy between lectures — quick, healthy, and modern.",
      },
      {
        title: "Offices & Co-working",
        text: "Sustainable focus fuel that keeps teams energized and productive throughout the day.",
      },
      {
        title: "Arenas & Events",
        text: "Serve athletes, teams, and guests instantly — energy where performance matters most.",
      },
    ],

    forgotYour: "Forgot your",
    items: ["supplement?"],
    afterItems: [
      "Running late?",
      "Need a boost before training?",
      "Duftbar — fuel, redefined.",
    ],

    talkToUs: "Let’s talk",
    heroLead:
      "The world’s first smart nutrition dispenser — designed to increase sales, boost experience, and make nutrition available in seconds.",
    taglines: [
      "The future of nutrition is here.",
      "Smart. Fast. Beautiful.",
      "Fuel up in seconds — anywhere.",
      "Duftbar — the revolution in motion.",
    ],
    getMachine: "Join the Revolution",
    howItWorks: "How Duftbar Works",

    duftbarMachine: "The Duftbar Machine",
    machineDesc:
      "Duftbar is a precision-engineered nutrition dispenser that serves protein, pre-workout, or hydration blends in seconds. Contactless payments, real-time monitoring, and furniture-grade design — built to attract, perform, and sell.",
    machineFeatures1: "Accurate single, double, or triple scoop dispensing",
    machineFeatures2:
      '21.5" touchscreen with fast, elegant, and intuitive interface',
    machineFeatures3:
      "Over 1000 servings per refill with automatic stock alerts",
    machineFeatures4: "100% contactless payments — phone, card, or watch",
    machineFeatures5:
      "Cloud-connected for live data, updates, and remote control",

    howDesc:
      "Walk up. Choose your product. Tap to pay. Get your perfect scoop in seconds — no hassle, no wait, just pure performance.",
    stepChoose: "Choose",
    stepChooseText: "Select your product, flavor, and portion size",
    stepTap: "Tap",
    stepTapText: "Secure, fast, and fully contactless payment",
    stepGo: "Go",
    stepGoText: "Your dose — dispensed in seconds.",

    bringDuftbar: "Bring Duftbar to Your Space",
    bringDesc:
      "We handle setup, service, and support — you provide the space. Duftbar transforms your environment into an experience that attracts customers, drives sales, and redefines daily nutrition.",

    formName: "Your Name",
    formContact: "Email or phone number",
    formVenue: "Venue (gym, office, university …)",
    formNotes: "Anything we should know?",
    requestPlacement: "Request Placement",

    footerMade: "Designed with passion. Built in Iceland.",
    footerPayments: "Secure payments powered by Verifone",
    contactLocationLabel: "Reykjavík, Iceland",
    contactLocationSub:
      "Installations across Iceland — pilot programs launching across Europe.",
    contactEmailLabel: "hello.duftbar@gmail.com",
    contactEmailSub: "Replies within 24h on weekdays",
    contactPhoneLabel: "+354 6982326",
    contactPhoneSub: "Sales & Support",
  },

  is: {
    teamTitle: "Teymið á bakvið duftbar",
    teamIntro:
      "Við trúum því að framtíð næringar sé snjöll, falleg og aðgengileg. Duftbar sameinar hönnun, tækni og sjálfbærni í eina heild — og breytir því hvernig fólk nálgast orku og næringu. Þetta er ekki bara vél. Þetta er bylting.",
    nav: [
      { label: "Vélin", href: "#product" },
      { label: "Hvernig virkar", href: "#how" },
      { label: "Fyrir rými", href: "#spaces" },
      { label: "Teymið", href: "#team" },
      { label: "Hafðu samband", href: "#contact" },
    ],
    team: [
      {
        name: "Adam Bæhrenz Björgvinsson",
        role: "Stofnandi – Hugbúnaður & Vélbúnaður (BSc Tölvunarfræði)",
        text: "Leiðir þróun hugbúnaðar og vélbúnaðar Duftbar — byggir kerfið sem sameinar hönnun, gögn og tækni í eina heildstæða upplifun.",
        img: "https://cdn-icons-png.flaticon.com/512/145/145867.png",
      },
      {
        name: "Sara Ísey Isorena Guðjónsdóttir",
        role: "Meðstofnandi – Vélhönnun (MSc Flugverkfræði)",
        text: "Sér um vélhönnun og byggingarform vélarinnar — þar sem verkfræði, fagurfræði og notendaupplifun mætast í fullkomnu jafnvægi.",
        img: "https://cdn-icons-png.flaticon.com/512/145/145852.png",
      },
      {
        name: "Baldur Geir Gunnarsson",
        role: "Meðstofnandi – Rafhönnun (BSc Vélaverkfræði)",
        text: "Ber ábyrgð á rafhönnun og samþættingu kerfa — tryggir nákvæmni, öryggi og áreiðanleika í hverjum skammti.",
        img: "https://cdn-icons-png.flaticon.com/512/145/145867.png",
      },
    ],

    spacesTitle: "Fyrir rými framtíðarinnar",
    spacesDesc:
      "Duftbar er bylting í því hvernig fólk nálgast næringu — falleg, snjöll og sjálfbær lausn sem hæfir líkamsræktarstöðvum, háskólum, skrifstofum og íþróttamannvirkjum.",
    spaces: [
      {
        title: "Líkamsrækt & Stúdíó",
        text: "Auktu sölu og þjónustu með vél sem gefur pre-workout eða prótein á sekúndum — án biðar, án fyrirhafnar.",
      },
      {
        title: "Háskólar",
        text: "Gefur nemendum hraðan og snjallan aðgang að orku milli fyrirlestra — fullkomið eldsneyti fyrir daginn.",
      },
      {
        title: "Skrifstofur & Co-working",
        text: "Heldur starfsfólki orkumiklu og einbeittu — sjálfbær lausn sem lítur jafn vel út og hún virkar.",
      },
      {
        title: "Íþróttaleikvangar & Viðburðir",
        text: "Næring á sekúndum fyrir leikmenn, lið og gesti — þar sem hraði og orka skipta máli.",
      },
    ],

    forgotYour: "Gleymdirðu",
    items: ["fæðubótarefni?"],
    afterItems: [
      "Seinn í tíma?",
      "Þarft orku fyrir fund eða æfingu?",
      "Duftbar — framtíðarorka í lófa þér.",
    ],

    talkToUs: "Hafðu samband",
    heroLead:
      "Fyrsta vélin sinnar tegundar í heiminum — hönnuð til að auka sölu, bæta upplifun og gera næringu aðgengilega á sekúndum.",
    taglines: [
      "Framtíð næringar er hér.",
      "Snjallt. Hraðvirkt. Fallegt.",
      "Eldsneyti á sekúndum — hvar sem er.",
      "Duftbar — bylting í næringu.",
    ],
    getMachine: "Vertu hluti af byltingunni",
    howItWorks: "Hvernig virkar duftbar?",

    duftbarMachine: "duftbar vélin",
    machineDesc:
      "duftbar er nákvæmlega hönnuð sjálfsafgreiðsluvél sem skammtar næringarduft eins og prótein og pre-workout á sekúndum. Snertilausar greiðslur, rauntímagögn og hönnun sem líkist húsgagni — hönnuð til að selja, þjóna og skara fram úr.",
    machineFeatures1:
      "Einfaldir, tvöfaldir eða þrefaldir skammtar með fullkominni nákvæmni",
    machineFeatures2: '21,5" snertiskjár með hraðvirku og glæsilegu viðmóti',
    machineFeatures3:
      "Yfir 1000 skammtar í vél með sjálfvirkum áfyllingartilkynningum",
    machineFeatures4: "100% snertilaus greiðsla — sími, kort eða úr",
    machineFeatures5:
      "Skýjatenging með rauntímagögnum, uppfærslum og stjórn á netinu",

    howDesc:
      "Gakktu að, veldu, greiddu  — og fáðu fullkominn skammt á nokkrum sekúndum. Engin bið, engin fyrirhöfn — bara næring í búsann.",
    stepChoose: "Veldu",
    stepChooseText: "Veldu vöru, bragð og skammtastærð",
    stepTap: "Greiddu",
    stepTapText: "Snertilaus og örugg greiðsla á sekúndum",
    stepGo: "Njóttu",
    stepGoText: "Skammturinn tilbúinn á augabragði.",

    bringDuftbar: "Komdu duftbar í þitt rými",
    bringDesc:
      "Við sjáum um uppsetningu, þjónustu og stuðning — þú leggur til rýmið. Duftbar breytir rýminu þínu í upplifun sem laðar að, selur meira og einfaldar aðgang að næringu.",

    formName: "Nafn þitt",
    formContact: "Netfang eða símanúmer",
    formVenue: "Staður (líkamsrækt, skrifstofa, háskóli …)",
    formNotes: "Eitthvað sem við ættum að vita?",
    requestPlacement: "Senda beiðni",

    footerMade: "Hannað með ástríðu. Byggt á Íslandi.",
    footerPayments: "Öruggar greiðslur með Verifone",
    contactLocationLabel: "Reykjavík, Ísland",
    contactLocationSub:
      "Uppsetningar um land allt — evrópskar prufueiningar í þróun.",
    contactEmailLabel: "hello.duftbar@gmail.com",
    contactEmailSub: "Svör innan 24 klst. á virkum dögum",
    contactPhoneLabel: "+354 6982326",
    contactPhoneSub: "Sala & Þjónusta",
  },
};
