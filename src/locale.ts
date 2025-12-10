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
  footerMade: string;
  footerPayments: string;
  formContact: string;
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
      { label: "The Machine", href: "#product" },
      { label: "How it Works", href: "#how" },
      { label: "For Spaces", href: "#spaces" },
      { label: "Team", href: "#team" },
      { label: "Contact", href: "#contact" },
    ],

    forgotYour: "Forgot your",
    items: ["supplement?"],
    afterItems: [
      "Running late?",
      "Need a quick boost?",
      "duftbar — nutrition, simplified.",
    ],

    talkToUs: "Let's talk",

    heroLead:
      "The world’s first powder-only nutrition dispenser — designed to increase sales, reduce waste, and make nutrition available in seconds.",
    getMachine: "Bring duftbar to Your Space",

    duftbarMachine: "The duftbar Machine",
    machineDesc:
      "duftbar is a clean, modern dispenser that serves nutrition powder — like protein or pre-workout — in seconds. Built for high-traffic spaces that want to offer instant, convenient nutrition without mess or waste.",
    machineFeatures1: "Accurate single, double, or triple scoops",
    machineFeatures2:
      "Fast and intuitive touch interface for seamless experience",
    machineFeatures3: "High-capacity storage with smart refill alerts",
    machineFeatures4: "Contactless payments — card, phone, or watch",
    machineFeatures5:
      "Cloud-connected with live status, alerts, and remote overview",

    howItWorks: "How duftbar Works",
    howDesc:
      "Walk up, choose your product, tap to pay — and your perfect scoop is dispensed in seconds.",
    stepChoose: "Choose",
    stepChooseText: "Pick your product, flavor, and scoop size",
    stepTap: "Pay",
    stepTapText: "Fast, secure, fully contactless payment",
    stepGo: "Enjoy",
    stepGoText: "Your dose is ready instantly.",

    spacesTitle: "Perfect for Modern Spaces",
    spacesDesc:
      "duftbar boosts sales, improves customer experience, and delivers clean, instant nutrition — ideal for any busy environment.",
    spaces: [
      {
        title: "Gyms & Studios",
        text: "Increase sales and member satisfaction with instant protein and pre-workout.",
      },
      {
        title: "Universities",
        text: "Give students fast, accessible energy between classes.",
      },
      {
        title: "Offices & Co-working",
        text: "A sustainable daily fuel that keeps teams energized and productive.",
      },
      {
        title: "Arenas & Events",
        text: "Serve athletes and guests instantly — where performance matters.",
      },
    ],

    taglines: [
      "Nutrition, beautifully simplified.",
      "Instant fuel — anywhere.",
      "Smart, clean, and ready in seconds.",
      "Modern nutrition for modern spaces.",
    ],

    teamTitle: "Meet the Team",
    teamIntro:
      "We believe nutrition should be simple, beautiful, and accessible. duftbar blends design, clarity, and convenience into a seamless experience. This isn’t just a machine — it’s a new standard in on-demand nutrition.",

    team: [
      {
        name: "Adam Bæhrenz Björgvinsson",
        role: "Founder – Software & Hardware (BSc Computer Science)",
        text: "Adam leads the full software and hardware development of duftbar — building the core system that connects design, data, and technology into one fluid experience.",
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

    bringDuftbar: "Bring duftbar to Your Space",
    bringDesc:
      "We handle setup, service, and support — you provide the location. duftbar increases sales, enhances convenience, and offers instant, modern nutrition to your customers or staff.",

    formName: "Your Name",
    formContact: "Email or phone number",
    formVenue: "Venue (gym, office, university …)",
    formNotes: "Anything we should know?",
    requestPlacement: "Request Placement",

    footerMade: "Designed with passion. Built in Iceland.",
    footerPayments: "Secure payments powered by Verifone",

    contactLocationLabel: "Reykjavík, Iceland",
    contactLocationSub:
      "Installations across Iceland — European pilots in development.",
    contactEmailLabel: "hello.duftbar@gmail.com",
    contactEmailSub: "Replies within 24 hours on weekdays",
    contactPhoneLabel: "+354 6982326",
    contactPhoneSub: "Sales & Support",
  },

  // ===========================
  // ==== ICELANDIC VERSION ====
  // ===========================

  is: {
    nav: [
      { label: "Vélin", href: "#product" },
      { label: "Hvernig virkar duftbar", href: "#how" },
      { label: "Fyrir rými", href: "#spaces" },
      { label: "Teymið", href: "#team" },
      { label: "Hafðu samband", href: "#contact" },
    ],

    forgotYour: "Gleymdirðu",
    items: ["fæðubótarefninu?"],
    afterItems: [
      "Seinn í tíma?",
      "Þarft orku á ferðinni?",
      "duftbar — næring einfölduð.",
    ],

    talkToUs: "Hafðu samband",

    heroLead:
      "Fyrsta duft-einangraða næringarvélin í heiminum — hönnuð til að auka sölu, draga úr sóun og gera næringu aðgengilega á nokkrum sekúndum.",
    getMachine: "Komdu duftbar í þitt rými",

    duftbarMachine: "duftbar vélin",
    machineDesc:
      "duftbar er stílhrein og nútímaleg sjálfsafgreiðsluvél sem skammtar eingöngu næringardufti — prótein, pre-workout, kreatín, glútamín, kolvetni eða aðrar duftblöndur — á sekúndum, án vatns og án blöndunar. Hún tekur hvaða duft sem er frá hvaða framleiðanda sem er, og hentar fullkomlega fyrir rými sem vilja auka sölu, bæta upplifun og draga úr umbúðasóun.",
    machineFeatures1: "Nákvæmir skammtar — einfaldur, tvöfaldur eða þrefaldur",
    machineFeatures2: "Hraðvirkt, einfalt og leiðandi viðmót á snertiskjá",
    machineFeatures3: "Stór geymsla með snjöllum áfyllingartilkynningum",
    machineFeatures4: "Snertilausar greiðslur — sími, kort eða úr",
    machineFeatures5: "Tengt kerfi með rauntímastöðu, áminningum og yfirliti",

    howItWorks: "Hvernig virkar duftbar?",
    howDesc:
      "Gakktu að, veldu, borgaðu — og skammturinn kemur á nokkrum sekúndum.",
    stepChoose: "Veldu",
    stepChooseText: "Veldu tegund, bragð og skammtastærð",
    stepTap: "Borgaðu",
    stepTapText: "Hraðvirk og örugg snertilaus greiðsla",
    stepGo: "Njóttu",
    stepGoText: "Skammturinn er tilbúinn strax.",

    spacesTitle: "Fullkomið fyrir nútímaleg rými",
    spacesDesc:
      "duftbar eykur sölu, bætir upplifun og gerir næringu aðgengilega á sekúndum — hentar öllum rýmum sem vilja bæta þjónustu og þægindi.",
    spaces: [
      {
        title: "Líkamsrækt & Stúdíó",
        text: "Auktu sölu og bættu þjónustu með instant prótein- og pre-workout skömmtum.",
      },
      {
        title: "Háskólar",
        text: "Gefur nemendum hraðan og nútímalegan aðgang að orku milli fyrirlestra.",
      },
      {
        title: "Skrifstofur & Sameiginleg vinnurými",
        text: "Sjálfbært eldsneyti sem heldur starfsfólki orkumiklu og einbeittu.",
      },
      {
        title: "Íþróttaleikvangar & Viðburðir",
        text: "Næring á sekúndum fyrir leikmenn og gesti — þegar hraði skiptir máli.",
      },
    ],

    taglines: [
      "Næring, einföld og falleg.",
      "Orka á sekúndum — hvar sem er.",
      "Snjallt, hreint og tilbúið strax.",
      "Nútímaleg næring fyrir nútímaleg rými.",
    ],

    teamTitle: "Teymið á bakvið duftbar",
    teamIntro:
      "Við trúum að næring eigi að vera einföld, falleg og aðgengileg. duftbar sameinar hönnun, notendavænni og þægindum í eina heildstæða upplifun.",

    team: [
      {
        name: "Adam Bæhrenz Björgvinsson",
        role: "Stofnandi – Hugbúnaður & Vélbúnaður (BSc Tölvunarfræði)",
        text: "Leiðir þróun hugbúnaðar og vélbúnaðar duftbar — byggir kerfið sem sameinar hönnun, gögn og tækni í eina heildstæða upplifun.",
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

    bringDuftbar: "Komdu duftbar inn í þitt rými",
    bringDesc:
      "Við sjáum um uppsetningu, þjónustu og stuðning — þú leggur til rýmið. duftbar eykur sölu, eflir þjónustu og bætir næringaraðgengi til muna.",

    formName: "Nafn þitt",
    formContact: "Netfang eða símanúmer",
    formVenue: "Staður (líkamsrækt, skrifstofa, háskóli …)",
    formNotes: "Eitthvað sem við ættum að vita?",
    requestPlacement: "Senda beiðni",

    footerMade: "Hannað af ástríðu. Byggt á Íslandi.",
    footerPayments: "Öruggar greiðslur með Verifone",

    contactLocationLabel: "Reykjavík, Ísland",
    contactLocationSub:
      "Uppsetningar um land allt — evrópskar prufur í undirbúningi.",
    contactEmailLabel: "hello.duftbar@gmail.com",
    contactEmailSub: "Svör innan 24 klst. á virkum dögum",
    contactPhoneLabel: "+354 6982326",
    contactPhoneSub: "Sala & Þjónusta",
  },
};
