import React, { useEffect } from "react";
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

  // Scroll effect fyrir brand banner
  useEffect(() => {
    const handleScroll = () => {
      const banner = document.getElementById("brand-banner-content");
      if (banner) {
        const scrollY = window.scrollY;
        // Bannerinn færist til vinstri þegar þú scrollar niður
        banner.style.transform = `translateX(-${scrollY * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <h1 style={{ margin: 0, letterSpacing: "-0.02em" }}>Duftbar x WCI</h1>
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
          loading="lazy"
          decoding="async"
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
          loading="lazy"
          decoding="async"
          style={{
            maxWidth: "100%",
            height: "auto",
            marginTop: 24,
            borderRadius: 12,
          }}
        />
      </header>

      {/* Scrolling Brand Banner */}
      <div
        id="brand-banner"
        style={{
          width: "100%",
          height: 50,
          background:
            "linear-gradient(90deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          borderTop: "1px solid #e5e7eb",
          borderBottom: "1px solid #e5e7eb",
          position: "relative",
        }}
      >
        <div
          id="brand-banner-content"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 60,
            whiteSpace: "nowrap",
          }}
        >
          {[...Array(3)].map((_, setIndex) => (
            <React.Fragment key={setIndex}>
              {/* World Glass Logo */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 150 32"
                width="120"
                height="26"
                style={{ opacity: 0.7 }}
              >
                <path
                  fill="currentColor"
                  d="M.783.194 0 31.767h7.085l4.345-18.975h.274l-1.331 18.975h7.045L26.148.194h-6.225l-4.462 19.87h-.274L16.48.193H10.49l-4.736 19.87H5.48L7.046.193H.783ZM32.05 11.86l-2.113 14.113c-.157 1.011-.314 1.556-1.175 1.556-.587 0-.783-.273-.783-.856 0-.155.04-.389.079-.7L30.17 11.86c.157-.972.314-1.555 1.096-1.555.666 0 .9.272.9.933 0 .078-.078.272-.117.622Zm5.637.621c.235-1.477.352-2.527.352-3.266 0-2.994-1.996-3.344-6.028-3.344-6.028 0-6.772.972-7.633 6.61l-1.957 12.831c-.235 1.633-.313 2.8-.313 3.422 0 2.838 1.957 3.188 5.989 3.188 5.91 0 6.81-.894 7.672-6.61l1.918-12.83ZM52.07 12.987c.274-1.789.391-2.917.391-3.305 0-2.528-1.096-3.81-3.17-3.81-.94 0-2.075.466-3.366 1.36l.156-1.205h-5.715l-3.835 25.74h5.675l2.975-19.597c.157-1.01.43-1.438 1.135-1.438.548 0 .783.233.783.816 0 .078 0 .311-.04.622l-.665 4.394h5.128l.548-3.577ZM55.277.194 50.54 31.767h5.675L60.992.194h-5.715ZM70.261.194l-1.056 7.038c-1.057-.894-1.958-1.36-3.093-1.36-3.836 0-4.736 2.915-5.362 7.115l-1.8 11.82c-.236 1.477-.392 2.566-.392 3.266 0 2.45 1.33 3.81 3.64 3.81 1.174 0 2.231-.466 3.484-1.36l.463 1.244h5.095L75.976.194h-5.715Zm-1.8 12.015-1.996 13.337c-.157.972-.431 1.438-1.175 1.438-.548 0-.783-.233-.783-.816 0-.078 0-.273.04-.622l1.996-13.337c.156-1.01.47-1.439 1.174-1.439.509 0 .822.311.822.778 0 .117-.039.311-.078.661ZM98.113 6.532c.195-1.283.313-2.333.313-3.11C98.426.194 96.156 0 91.458 0c-3.483 0-5.636.039-6.967 1.439-1.057 1.127-1.33 2.76-1.683 5.093L79.99 25.39c-.235 1.478-.313 2.644-.313 3.46 0 2.8 2.426 3.15 6.967 3.15 3.444 0 5.558-.117 6.85-1.4 1.174-1.166 1.409-2.838 1.761-5.21l1.096-7.038h-6.654l-1.018 6.844c-.156 1.01-.352 1.594-1.252 1.594-.627 0-.861-.272-.861-.933 0-.156 0-.39.039-.661l2.779-18.47c.156-.971.313-1.555 1.174-1.555.705 0 .979.272.979.933 0 .04-.04.234-.079.623l-.626 4.199h6.615l.666-4.394ZM100.971.194l-4.736 31.573h5.676L106.686.194h-5.715ZM119.831 12.481c.235-1.516.352-2.605.352-3.266 0-2.994-1.996-3.344-6.028-3.344-6.067 0-6.772 1.011-7.633 6.61l-.352 2.294h5.715l.43-2.916c.157-1.01.314-1.555 1.214-1.555.626 0 .783.272.783.933 0 0-.039.194-.118.622l-.509 3.383-5.48 2.955c-2.152 1.166-2.896 2.138-3.248 4.588l-.392 2.527c-.195 1.322-.352 2.411-.352 3.266 0 2.294 1.057 3.344 3.366 3.344 1.331 0 2.505-.466 3.836-1.322l.463 1.167h5.056l2.897-19.286Zm-6.928 8.204-.822 5.288c-.157 1.05-.353 1.556-1.175 1.556-.587 0-.783-.273-.783-.856 0-.194.04-.428.079-.7l.391-2.605c.157-1.088.313-1.827 1.292-2.255l1.018-.428ZM120.038 22.513l-.43 2.8c-.235 1.593-.314 2.76-.314 3.42 0 2.84 1.957 3.19 5.989 3.19 5.872 0 6.811-.895 7.672-6.61l.313-2.334c.118-.7.235-1.4.235-2.06 0-1.284-.587-2.217-1.722-2.878l-2.192-1.244c-1.566-.894-2.584-1.089-2.584-2.41 0-.273.079-.545.118-.895l.235-1.633c.156-1.01.352-1.555 1.096-1.555.665 0 .9.272.9.933 0 .039-.039.233-.117.622l-.431 2.916h5.715l.352-2.294c.235-1.438.352-2.527.352-3.266 0-2.994-1.996-3.344-6.028-3.344-5.245 0-6.732.661-7.476 5.56l-.43 2.683c-.157 1.167-.274 1.983-.274 2.45 0 1.555.822 2.372 2.661 3.344l2.075 1.127c1.448.778 1.8 1.128 1.8 1.983 0 .04 0 .272-.078.739l-.352 2.216c-.157 1.011-.313 1.556-1.174 1.556-.588 0-.783-.273-.783-.856 0-.194.039-.428.078-.7l.509-3.46h-5.715ZM134.813 22.513l-.431 2.8c-.235 1.593-.313 2.76-.313 3.42 0 2.84 1.957 3.19 5.989 3.19 5.871 0 6.811-.895 7.672-6.61l.313-2.334c.117-.7.235-1.4.235-2.06 0-1.284-.587-2.217-1.723-2.878l-2.191-1.244c-1.566-.894-2.584-1.089-2.584-2.41 0-.273.078-.545.118-.895l.234-1.633c.157-1.01.353-1.555 1.096-1.555.666 0 .901.272.901.933 0 .039-.039.233-.118.622l-.43 2.916h5.714l.353-2.294c.235-1.438.352-2.527.352-3.266 0-2.994-1.996-3.344-6.028-3.344-5.245 0-6.732.661-7.476 5.56l-.431 2.683c-.156 1.167-.274 1.983-.274 2.45 0 1.555.822 2.372 2.662 3.344l2.075 1.127c1.448.778 1.8 1.128 1.8 1.983 0 .04 0 .272-.078.739l-.352 2.216c-.157 1.011-.314 1.556-1.175 1.556-.587 0-.783-.273-.783-.856 0-.194.04-.428.079-.7l.509-3.46h-5.715Z"
                ></path>
              </svg>
              {/* Nike */}
              <svg
                viewBox="0 0 100 35"
                width="70"
                height="24"
                style={{ opacity: 0.6 }}
              >
                <path
                  fill="currentColor"
                  d="M21.2 35c-1.8 0-3.5-.5-4.8-1.5L.5 21.9c-1.3-1-1.3-2.6 0-3.6L16.4 6.7c1.3-1 3.5-1 4.8 0l15.9 11.6c1.3 1 1.3 2.6 0 3.6L21.2 33.5c-1.3 1-3 1.5-4.8 1.5l58.1-21.7c1.7-.6 3.5.3 4 2 .5 1.7-.3 3.5-2 4L21.2 35z"
                />
              </svg>
              {/* Adidas-style trefoil */}
              <svg
                viewBox="0 0 100 40"
                width="65"
                height="26"
                style={{ opacity: 0.6 }}
              >
                <path
                  fill="currentColor"
                  d="M50 0L30 35h10l10-17.5L60 35h10L50 0zM20 20L0 35h15l12.5-22L20 20zM80 20l-7.5-7L85 35h15L80 20z"
                />
              </svg>
              {/* Puma-style cat */}
              <svg
                viewBox="0 0 100 40"
                width="70"
                height="28"
                style={{ opacity: 0.6 }}
              >
                <path
                  fill="currentColor"
                  d="M85 5c-5 0-10 3-12 8L60 35H45L58 13c2-4 6-8 12-8h15zM30 5H10v30h20c8 0 15-7 15-15S38 5 30 5zm0 22H18V13h12c4 0 7 3 7 7s-3 7-7 7z"
                />
              </svg>
              {/* Reebok-style delta */}
              <svg
                viewBox="0 0 80 40"
                width="60"
                height="30"
                style={{ opacity: 0.6 }}
              >
                <path
                  fill="currentColor"
                  d="M0 40L40 0l40 40H60L40 20 20 40H0z"
                />
              </svg>
              {/* Under Armour-style U */}
              <svg
                viewBox="0 0 80 40"
                width="65"
                height="32"
                style={{ opacity: 0.6 }}
              >
                <path
                  fill="currentColor"
                  d="M40 0C20 0 10 10 10 25v15h15V25c0-8 7-15 15-15s15 7 15 15v15h15V25C70 10 60 0 40 0z"
                />
              </svg>
              {/* New Balance-style NB */}
              <svg
                viewBox="0 0 100 40"
                width="70"
                height="28"
                style={{ opacity: 0.6 }}
              >
                <path
                  fill="currentColor"
                  d="M10 5v30h8V18l17 17h10V5h-8v17L20 5H10zM55 5v30h20c8 0 15-7 15-15S83 5 75 5H55zm8 8h12c4 0 7 3 7 7s-3 7-7 7H63V13z"
                />
              </svg>
              {/* Fitness/Gym icon */}
              <svg
                viewBox="0 0 100 40"
                width="60"
                height="24"
                style={{ opacity: 0.6 }}
              >
                <path
                  fill="currentColor"
                  d="M5 15h10v10H5zM85 15h10v10H85zM20 10h5v20h-5zM75 10h5v20h-5zM30 17h40v6H30z"
                />
              </svg>
            </React.Fragment>
          ))}
        </div>
      </div>

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
        preload="metadata"
        style={{
          maxWidth: "100%",
          height: "auto",
          marginTop: 24,
          borderRadius: 12,
          backgroundColor: "#F5F7FB",
          display: "block",
          contentVisibility: "auto",
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
              <strong>Hærri meðaltekjur á heimsókn:</strong> Sjálfsögð lausn sem
              selur sig sjálf.
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
