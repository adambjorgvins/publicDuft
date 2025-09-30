import React from "react";
import { ThemeProvider } from "styled-components";
import { dark, light } from "./theme";
import { GlobalStyle } from "./global-styles";
//@ts-ignore
import duftmachine from "./images/mashine.png";
//@ts-ignore
import duftbarvideo from "./images/duftbar.webm";
//@ts-ignore
import duftbarphoto from "./images/duftwebsitestuff.png";
export default function PitchPage() {
  // Þú getur víxlað yfir á saved theme síðar ef þú vilt
  const mode: "light" | "dark" = "light";

  const sectionStyle: React.CSSProperties = {
    maxWidth: 900,
    margin: "0 auto",
    padding: "48px 24px",
  };

  const h2Style: React.CSSProperties = {
    margin: "0 0 12px",
    letterSpacing: "-0.01em",
    fontSize: "clamp(22px, 3vw, 28px)",
  };

  const pStyle: React.CSSProperties = {
    opacity: 0.9,
    lineHeight: 1.7,
    fontSize: 16,
    margin: "0 0 12px",
  };

  const ulStyle: React.CSSProperties = {
    margin: "8px 0 0",
    paddingLeft: 18,
    lineHeight: 1.7,
  };

  const hrStyle: React.CSSProperties = {
    border: 0,
    height: 1,
    background: "var(--outline, #e5e7eb)",
    opacity: 0.7,
    margin: "0 auto",
    maxWidth: 900,
  };

  return (
    //@ts-ignore
    <ThemeProvider theme={mode === "dark" ? dark : light}>
      <GlobalStyle />
      <br />
      <br />
      <br />
      <header style={{ ...sectionStyle, paddingTop: 0, textAlign: "center" }}>
        <h1 style={{ margin: 0, letterSpacing: "-0.02em" }}>Duftbar x WC</h1>
        <p style={{ ...pStyle, marginTop: 8 }}>
          Duftbar er sjálfsafgreiðsluvél sem skammtar pre-workout, prótein,
          kreatín, electrolytes og fleira í brúsann á sekúndum. Vélin passar inn
          á hvaða stað sem er og breytir einföldu vatnsstoppi í eitthvað miklu
          betra.
        </p>
        <section aria-labelledby="af-hverju" style={sectionStyle}>
          <h2 id="af-hverju" style={h2Style}>
            Myndir unnar út frá teikningum og settar í raunverulegt umhverfi með
            gervigreind. Aðeins ætlað til þess að sjá hugmyndir hvernig þetta
            gæti orðið
          </h2>
        </section>
        <img
          src={duftmachine}
          alt="Duftbar sjálfsafgreiðsluvél"
          style={{
            maxWidth: "100%",
            height: "auto",
            marginTop: 24,
            borderRadius: 12,
          }}
        />
        <img
          src={duftbarphoto}
          alt="Duftbar sjálfsafgreiðsluvél"
          style={{
            maxWidth: "100%",
            height: "auto",
            marginTop: 24,
            borderRadius: 12,
          }}
        />
      </header>
      <section aria-labelledby="af-hverju" style={sectionStyle}>
        <h2 id="af-hverju" style={h2Style}>
          Myndband sem sýnir demo-flæði — einfalt og hratt notendaviðmót fyrir
          viðskiptavininn í Duftbar
        </h2>
      </section>
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          maxWidth: "100%",
          height: "auto",
          marginTop: 24,
          borderRadius: 12,
          backgroundColor: "#F5F7FB",
          display: "block",
        }}
      >
        {/* @ts-ignore */}
        <source src={duftbarvideo} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      <main style={{ paddingTop: 80, paddingBottom: 80 }}>
        <hr style={hrStyle} />

        <section aria-labelledby="af-hverju" style={sectionStyle}>
          <h2 id="af-hverju" style={h2Style}>
            Afhverju duftbar?
          </h2>
          <ul style={ulStyle}>
            <li>
              <strong>Aukin sala:</strong> Staðsetning vélarinnar á lykilstöðum
              ýtir undir sölu fæðubótarefna fyrir fólk á hvaða tímapunkti
              æfingarinnar sem er.
            </li>
            <li>
              <strong>Einföld afgreiðsla:</strong> Minni bið, styttri
              afgreiðslutími.
            </li>
            <li>
              <strong>Skýr hlutverkaskipting:</strong> duftbar sér um sérsniðnar
              blöndur og vélin skammtar - „grab-and-go“ concept.
            </li>
            <li>
              <strong>Hönnun sem lyftir rýminu:</strong> Falleg, snyrtileg vél
              sem passar upp á look &amp; feel og gefur nútímalegt vibe eins og
              WorldClass gerir vel ;).
            </li>
            <li>
              <strong>Mælanleg áhrif frá degi 1:</strong> Skýr yfirsýn yfir
              hvenær og hversu mikið er keypt, ásamt því hvaða vörur seljast
              best — svart á hvítu hvað virkar og hvenær.
            </li>
            <li>
              <strong>Auglýsingar</strong> Möguleiki á að sýna auglýsingar á
              skjánum.
            </li>
          </ul>
        </section>

        <hr style={hrStyle} />

        <hr style={hrStyle} />

        {/* Innleiðing */}
        <section aria-labelledby="innleiding" style={sectionStyle}>
          <h2 id="innleiding" style={h2Style}>
            Innleiðing
          </h2>
          <ul style={ulStyle}>
            <li>
              <strong>Staðsetning:</strong> Vélin er sett á fjölfarna staði eins
              og við vask eða afgreiðslu.
            </li>
            <li>
              <strong>Sjónræn skilaboð:</strong> Veggtexti eða skjár sem grípur
              augað og styður söluna.
            </li>
            <li>
              <strong>Vörur &amp; verð:</strong> Speglum ykkar fæðubótarefni,
              skammta og verð.
            </li>
            <li>
              <strong>Gögn &amp; fínstilling:</strong> Lesum notkunarmynstur og
              aðlögum staðsetningu/merkingar til að hámarka söluna.
            </li>
          </ul>
        </section>

        <hr style={hrStyle} />

        <section aria-labelledby="worldfit" style={sectionStyle}>
          <h2 id="worldfit" style={h2Style}>
            WorldFit &amp; mannlausar stöðvar
          </h2>
          <ul style={ulStyle}>
            <li>
              <strong>24/7 tekjur án starfsmanna:</strong> Sjálfsafgreiðsla með
              skýrum leiðbeiningum.
            </li>
            <li>
              <strong>Þegar þörfin kviknar:</strong> duftbar mætir þörfinni á
              réttum tíma — hvort sem það er orka fyrir æfinguna, prótein eftir
              átök eða skammtur á ferðinni.
            </li>
            <li>
              <strong>Lágur rekstrarkostnaður:</strong> Starfsmenn þurfa aðeins
              að sinna þrifum og áfyllingu, sem heldur kostnaði lágum og
              rekstrinum einföldum. Við innleiðingu er farið yfir útfærslur á
              því hver sér um áfyllingar — hvort það sé starfsfólk á staðnum eða
              Duftbar sjálft í fyrstu skrefum.
            </li>
            <li>
              <strong>Hærri meðaltekjur á heimsókn:</strong> Sjálfsögð
              lausn sem selur sig sjálf.
            </li>
          </ul>
        </section>
        <hr style={hrStyle} />

        <hr style={hrStyle} />

        {/* Vatnsstöðin sem hub + samspil við bar/kæla */}
        <section aria-labelledby="vatnsstod-hub" style={sectionStyle}>
          <h2 id="vatnsstod-hub" style={h2Style}>
            Staðir með núverandi prótein- og drykkjarframboð.
          </h2>
          <ul style={ulStyle}>
            <li>
              <strong>Aukin sala, ekki samkeppni:</strong> Áhersla duftbar er að
              auka framboð fæðubótarefna og mæta þörf viðskiptavina sem kjósa
              snögga afgreiðslu.
            </li>
            <li>
              <strong>Ný upplifun:</strong> Í stað þess að vatnsstöðin sé bara
              vatn, breytist hún í kjarna upplifunarinnar: á sama stað færðu
              vatn, duft og jafnvel handklæði — allt sem þú þarft fyrir
              æfinguna.
            </li>
            <li>
              <strong>Lyftir stöðinni:</strong> Þetta sýnir að WorldClass er að
              hugsa öðruvísi. Vatnsstöðin verður að töff „wellness hub“ sem
              engin önnur stöð í heiminum er með.
            </li>
          </ul>
        </section>

        <section aria-labelledby="vatnsstod-hub" style={sectionStyle}>
          <h2 id="vatnsstod-hub" style={h2Style}>
            Hafa samband.
          </h2>
          <ul style={ulStyle}>
            <li>
              <strong>Sími og mail:</strong> 6982326 - hello.duftbar@gmail.com
            </li>
          </ul>
        </section>
      </main>
    </ThemeProvider>
  );
}
