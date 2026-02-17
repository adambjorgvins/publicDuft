// src/data/locale.ts
export type Locale = "en" | "is";

// @ts-ignore
import adamos from "./images/adamos.png";
// @ts-ignore
import saraos from "./images/saraos.png";
// @ts-ignore
import balduros from "./images/balduros.png";

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
  faqTitle: string;
  faqSubtitle: string;
  faqs: { question: string; answer: string }[];
  uniqueFeatures: string;
  smartNutrition: string;
  features: { title: string; desc: string }[];
  benefitsTitle: string;
  benefitsSubtitle: string;
  benefitsDesc: string;
  benefits: { title: string; desc: string }[];
  dashboardInsights: string;
  footerDescription: string;
  footerCopyright: string;
  footerContact: string;
  cookieMessage: string;
  cookieAccept: string;
}

export const locale: Record<Locale, LocaleStrings> = {
  en: {
    nav: [
      { label: "How it Works", href: "#how" },
      { label: "Features", href: "#features" },
      { label: "Benefits", href: "#benefits" },
      { label: "Why duftbar", href: "#comparison" },
      { label: "FAQ", href: "#faq" },
      { label: "Spaces", href: "#spaces" },
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
        img: adamos,
      },
      {
        name: "Sara Ísey Isorena Guðjónsdóttir",
        role: "Co-Founder – Mechanical Design (MSc Aerospace Engineering)",
        text: "Sara drives the mechanical and structural design of the machine — merging engineering precision with timeless aesthetics and usability.",
        img: saraos,
      },
      {
        name: "Baldur Geir Gunnarsson",
        role: "Co-Founder – Electrical Design (BSc Mechanical Engineering)",
        text: "Baldur oversees all electrical design and system integration — ensuring every movement, sensor, and motor works in perfect harmony.",
        img: balduros,
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

    faqTitle: "FAQ's",
    faqSubtitle: "Frequently Asked Questions",
    faqs: [
      {
        question: "How does duftbar work?",
        answer:
          "Simply walk up to the machine, select your product and scoop size on the touchscreen, tap your card or phone to pay, and receive your perfect serving in seconds.",
      },
      {
        question: "What products can duftbar dispense?",
        answer:
          "duftbar works with any powder nutrition supplement — protein, pre-workout, creatine, BCAAs, meal replacements, and more. We can customize the product lineup for your space.",
      },
      {
        question: "How often does it need refilling?",
        answer:
          "Our high-capacity canisters hold enough product for hundreds of servings. The machine monitors inventory in real-time and sends smart alerts when it's time to refill.",
      },
      {
        question: "Is there a monthly fee?",
        answer:
          "We offer flexible partnership models including revenue sharing and leasing options. Contact us to discuss the best fit for your space.",
      },
      {
        question: "What kind of support do you provide?",
        answer:
          "We handle installation, training, maintenance, and provide ongoing support. Our cloud dashboard lets you monitor performance 24/7, and we're always available to help.",
      },
    ],

    uniqueFeatures: "Unique Features",
    smartNutrition: "Smart Nutrition Dispensing",
    features: [
      {
        title: "Precise Dosing",
        desc: "Accurate single, double, or triple scoops every time with zero waste",
      },
      {
        title: "Lightning Fast",
        desc: "Dispense your product in seconds with an intuitive touch interface",
      },
      {
        title: "Smart Monitoring",
        desc: "Cloud-connected with live status, alerts, and remote management",
      },
      {
        title: "Contactless Pay",
        desc: "Secure payments via card, phone, or watch — no cash needed",
      },
    ],

    benefitsTitle: "Why Businesses should Choose duftbar",
    benefitsSubtitle: "Built for Growth",
    benefitsDesc:
      "Increase revenue, enhance member experience, and deliver instant nutrition — all automated",
    benefits: [
      {
        title: "Revenue boost",
        desc: "Turn your space into a new revenue stream",
      },
      {
        title: "Member satisfaction",
        desc: "Give your customers instant access to the nutrition they need, when they need it",
      },
      {
        title: "Save time",
        desc: "No restocking hassles, no checkout lines — fully automated operations",
      },
      {
        title: "Zero waste",
        desc: "Precise dispensing means no spills, no mess, and minimal product loss",
      },
      {
        title: "Dashboard insights",
        desc: "Track sales, inventory, and performance from anywhere with our dashboard",
      },
      {
        title: "Modern design",
        desc: "A sleek machine that looks great in any modern space",
      },
    ],

    dashboardInsights: "Dashboard insights",
    footerDescription:
      "The world's first powder-only nutrition dispenser. Instant fuel for gyms, offices, universities, and high-performance spaces.",
    footerCopyright: "duftbar ehf. All rights reserved.",
    footerContact: "Contact: hello.duftbar@gmail.com | +354 6982326",
    cookieMessage:
      "We use cookies to improve your experience and analyze site traffic. By clicking Accept, you consent to our use of cookies.",
    cookieAccept: "Accept",
  },

  // ===========================
  // ==== ICELANDIC VERSION ====
  // ===========================

  is: {
    nav: [
      { label: "Hvernig virkar þetta", href: "#how" },
      { label: "Eiginleikar", href: "#features" },
      { label: "Kostir", href: "#benefits" },
      { label: "Af hverju duftbar", href: "#comparison" },
      { label: "Algengar spurningar", href: "#faq" },
      { label: "Staðsetningar", href: "#spaces" },
      { label: "Teymið", href: "#team" },
      { label: "Hafðu samband", href: "#contact" },
    ],

    forgotYour: "Gleymdirðu",
    items: ["fæðubótarefninu?"],
    afterItems: [
      "Seinn í tíma?",
      "Þarftu smá boost á leiðinni?",
      "duftbar — næring, einfölduð.",
    ],

    talkToUs: "Hafðu samband",

    heroLead:
      "Fyrsta næringarvélin í heiminum sem skammtar eingöngu duft — hönnuð til að auka sölu, draga úr sóun og gera næringu aðgengilega á örfáum sekúndum.",
    getMachine: "Komdu duftbar í rýmið þitt",

    duftbarMachine: "duftbar vélin",
    machineDesc:
      "duftbar er stílhrein, nútímaleg sjálfsafgreiðsluvél sem skammtar næringarduft — eins og prótein, pre-workout eða kreatín — á örfáum sekúndum. Hún er hönnuð fyrir fjölfarin rými sem vilja bjóða upp á þægilega næringu án sóðaskapar eða umbúðasóunar.",
    machineFeatures1: "Nákvæmir skammtar — einn, tveir eða þrír",
    machineFeatures2: "Hraðvirkt og leiðandi viðmót á snertiskjá",
    machineFeatures3: "Stór geymslugeta með snjöllum áfyllingartilkynningum",
    machineFeatures4: "Snertilausar greiðslur — kort, sími eða úr",
    machineFeatures5:
      "Skýjatengd með rauntímastöðu, tilkynningum og fjaryfirliti",

    howItWorks: "Hvernig virkar duftbar?",
    howDesc:
      "Gakktu að, veldu vöru, borgaðu — og skammturinn er tilbúinn á örfáum sekúndum.",
    stepChoose: "Veldu",
    stepChooseText: "Veldu vöru, bragð og skammtastærð",
    stepTap: "Borgaðu",
    stepTapText: "Hröð, örugg og snertilaus greiðsla",
    stepGo: "Njóttu",
    stepGoText: "Skammturinn er tilbúinn strax.",

    spacesTitle: "Fullkomið fyrir nútímaleg rými",
    spacesDesc:
      "duftbar eykur sölu, bætir upplifun og veitir hreina, tafarlausa næringu — tilvalið fyrir annasöm rými.",
    spaces: [
      {
        title: "Líkamsrækt & stúdíó",
        text: "Auktu sölu og ánægju með tafarlausu próteini og pre-workout.",
      },
      {
        title: "Háskólar",
        text: "Gefðu nemendum hraðan og aðgengilegan orkuskammt milli tíma.",
      },
      {
        title: "Skrifstofur & samvinnurými",
        text: "Sjálfbært eldsneyti sem heldur teymum orkumiklum og einbeittum.",
      },
      {
        title: "Leikvangar & viðburðir",
        text: "Næring á staðnum — fyrir íþróttafólk og gesti þegar frammistaða skiptir máli.",
      },
    ],

    taglines: [
      "Næring, fallega einfölduð.",
      "Tafarlaust eldsneyti — hvar sem er.",
      "Snjallt, hreint og tilbúið á sekúndum.",
      "Nútímaleg næring fyrir nútímaleg rými.",
    ],

    teamTitle: "Teymið á bak við duftbar",
    teamIntro:
      "Við trúum að næring eigi að vera einföld, falleg og aðgengileg. duftbar sameinar hönnun, skýrleika og þægindi í eina hnökralausa upplifun. Þetta er ekki bara vél — þetta er nýr staðall í næringu eftir þörfum.",

    team: [
      {
        name: "Adam Bæhrenz Björgvinsson",
        role: "Stofnandi – Hugbúnaður & vélbúnaður (BSc Tölvunarfræði)",
        text: "Adam leiðir alla hugbúnaðar- og vélbúnaðarþróun duftbar — byggir kjarnakerfið sem tengir saman hönnun, gögn og tækni í eina heildstæða upplifun.",
        img: adamos,
      },
      {
        name: "Sara Ísey Isorena Guðjónsdóttir",
        role: "Meðstofnandi – Vélhönnun (MSc Flugverkfræði)",
        text: "Sara sér um vélræna og burðarhönnun vélarinnar — sameinar verkfræðilega nákvæmni við tímalausa fagurfræði og notagildi.",
        img: saraos,
      },
      {
        name: "Baldur Geir Gunnarsson",
        role: "Meðstofnandi – Rafhönnun (BSc Vélaverkfræði)",
        text: "Baldur ber ábyrgð á rafhönnun og samþættingu kerfa — tryggir að skynjarar, mótorar og öll hreyfing vinni saman í fullkomnu samræmi.",
        img: balduros,
      },
    ],

    bringDuftbar: "Komdu duftbar í rýmið þitt",
    bringDesc:
      "Við sjáum um uppsetningu, þjónustu og stuðning — þú leggur til staðsetninguna. duftbar eykur sölu, bætir þægindi og veitir tafarlausan, nútímalegan aðgang að næringu fyrir viðskiptavini eða starfsfólk.",

    formName: "Nafn",
    formContact: "Netfang eða símanúmer",
    formVenue: "Staður (líkamsrækt, skrifstofa, háskóli …)",
    formNotes: "Eitthvað sem við ættum að vita?",
    requestPlacement: "Senda fyrirspurn",

    footerMade: "Hannað af ástríðu. Byggt á Íslandi.",
    footerPayments: "Öruggar greiðslur í gegnum Verifone",

    contactLocationLabel: "Reykjavík, Ísland",
    contactLocationSub: "Uppsetningar um allt land — Evrópuverkefni í þróun.",
    contactEmailLabel: "hello.duftbar@gmail.com",
    contactEmailSub: "Svörum innan 24 klst. á virkum dögum",
    contactPhoneLabel: "+354 6982326",
    contactPhoneSub: "Sala & þjónusta",

    faqTitle: "Algengar spurningar",
    faqSubtitle: "Spurt og svarað",
    faqs: [
      {
        question: "Hvernig virkar duftbar?",
        answer:
          "Gakktu að vélinni, veldu vöru og skammtastærð á snertiskjánum, borgaðu með korti eða síma og fáðu skammtinn þinn á örfáum sekúndum.",
      },
      {
        question: "Hvaða vörur getur duftbar skammtað?",
        answer:
          "duftbar virkar með öllum duftformuðum fæðubótarefnum — próteini, pre-workout, kreatíni, BCAA, máltíðarstaðgöngum og fleiru. Við getum aðlagað vöruframboðið að þínu rými.",
      },
      {
        question: "Hversu oft þarf að fylla á vélina?",
        answer:
          "Stór hylki geyma nægt magn fyrir hundruð skammta. Vélin fylgist með birgðastöðu í rauntíma og sendir tilkynningar þegar þarf að fylla á.",
      },
      {
        question: "Er mánaðargjald?",
        answer:
          "Við bjóðum upp á sveigjanleg samstarfslíkön, meðal annars tekjuskiptingu og leigu. Hafðu samband og við finnum lausn sem hentar þínu rými.",
      },
      {
        question: "Hvaða stuðning veitið þið?",
        answer:
          "Við sjáum um uppsetningu, þjálfun, viðhald og áframhaldandi stuðning. Skýjatengt stjórnborð gerir þér kleift að fylgjast með afköstum 24/7 og við erum alltaf til staðar ef eitthvað kemur upp.",
      },
    ],

    uniqueFeatures: "Sérstakir eiginleikar",
    smartNutrition: "Snjöll skömmtun næringar",
    features: [
      {
        title: "Nákvæm skömmtun",
        desc: "Einn, tveir eða þrír skammtar í hvert sinn — án sóunar",
      },
      {
        title: "Leifturhröð",
        desc: "Skammtar á örfáum sekúndum með leiðandi snertiskjáviðmóti",
      },
      {
        title: "Snjöll vöktun",
        desc: "Skýjatengd með rauntímastöðu, tilkynningum og fjarstýringu",
      },
      {
        title: "Snertilaus greiðsla",
        desc: "Öruggar greiðslur með korti, síma eða úri — ekkert reiðufé",
      },
    ],

    benefitsTitle: "Af hverju ættu fyrirtæki að velja duftbar?",
    benefitsSubtitle: "Hannað fyrir vöxt",
    benefitsDesc:
      "Auktu tekjur, bættu upplifun og veittu tafarlausa næringu — allt sjálfvirkt.",
    benefits: [
      {
        title: "Aukin sala",
        desc: "Bættu við nýjum tekjustraumi í rýmið þitt",
      },
      {
        title: "Meiri ánægja",
        desc: "Gefðu fólki tafarlausan aðgang að næringu þegar þörf er á",
      },
      {
        title: "Sparar tíma",
        desc: "Engar biðraðir og engin afgreiðsla — sjálfvirk rekstur",
      },
      {
        title: "Lítil sóun",
        desc: "Nákvæm skömmtun þýðir engin hella, ekkert sull og lágmarks vörutap",
      },
      {
        title: "Innsýn í stjórnborði",
        desc: "Fylgstu með sölu, birgðum og afköstum hvar sem er",
      },
      {
        title: "Nútímaleg hönnun",
        desc: "Stílhrein vél sem passar vel í öll nútímaleg rými",
      },
    ],

    dashboardInsights: "Innsýn í stjórnborði",
    footerDescription:
      "Fyrsta næringarvélin í heiminum sem skammtar eingöngu duft. Tafarlaust eldsneyti fyrir líkamsrækt, skrifstofur, háskóla og afkastamiðuð rými.",
    footerCopyright: "duftbar ehf. Öll réttindi áskilin.",
    footerContact: "Hafðu samband: hello.duftbar@gmail.com | +354 6982326",
    cookieMessage:
      "Við notum vafrakökur til að bæta upplifun þína og greina umferð á vefnum. Með því að smella á „Samþykkja“ samþykkir þú notkun okkar á vafrakökum.",
    cookieAccept: "Samþykkja",
  },
};
