import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// ─── GLOBAL STYLE RESET ───────────────────────────────────────────────────────
// Injected once to ensure body/html/root have no stray margins or constrained width

function GlobalStyles() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; }
      html, body {
        margin: 0; padding: 0;
        width: 100%; min-height: 100vh;
        overflow-x: hidden;
      }
      #root {
        width: 100%;
        min-height: 100vh;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
}

// ─── LOGO ─────────────────────────────────────────────────────────────────────

function Logo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" fill="#f5a623"/>
      <line x1="4"  y1="16" x2="28" y2="16" stroke="#1a1a1a" strokeWidth="2"/>
      <line x1="10" y1="10" x2="10" y2="22" stroke="#1a1a1a" strokeWidth="2"/>
      <line x1="16" y1="8"  x2="16" y2="24" stroke="#1a1a1a" strokeWidth="2.5"/>
      <line x1="22" y1="10" x2="22" y2="22" stroke="#1a1a1a" strokeWidth="2"/>
      <circle cx="4"  cy="16" r="1.8" fill="#1a1a1a"/>
      <circle cx="28" cy="16" r="1.8" fill="#1a1a1a"/>
    </svg>
  );
}

// ─── ROUTER ───────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");
  const [cookieAccepted, setCookieAccepted] = useState(() => {
    try { return localStorage.getItem("cookieConsent") === "true"; } catch { return false; }
  });
  useEffect(() => { window.scrollTo(0, 0); }, [page]);
  const nav = (p) => setPage(p);
  const acceptCookies = () => {
    try { localStorage.setItem("cookieConsent", "true"); } catch {}
    setCookieAccepted(true);
  };

  if (page === "motor-inrush")       return <><GlobalStyles /><Analytics /><SpeedInsights /><MotorInrushCalculator nav={nav} />{!cookieAccepted && <CookieBanner onAccept={acceptCookies} nav={nav} />}</>;
  if (page === "flc")               return <><GlobalStyles /><Analytics /><SpeedInsights /><FLCCalculator nav={nav} />{!cookieAccepted && <CookieBanner onAccept={acceptCookies} nav={nav} />}</>;
  if (page === "three-phase-power") return <><GlobalStyles /><Analytics /><SpeedInsights /><ThreePhasePowerCalculator nav={nav} />{!cookieAccepted && <CookieBanner onAccept={acceptCookies} nav={nav} />}</>;
  if (page === "ohms-law")          return <><GlobalStyles /><Analytics /><SpeedInsights /><OhmsLawCalculator nav={nav} />{!cookieAccepted && <CookieBanner onAccept={acceptCookies} nav={nav} />}</>;
  if (page === "terms")             return <><GlobalStyles /><Analytics /><SpeedInsights /><TermsPage nav={nav} />{!cookieAccepted && <CookieBanner onAccept={acceptCookies} nav={nav} />}</>;
  if (page === "privacy")           return <><GlobalStyles /><Analytics /><SpeedInsights /><PrivacyPage nav={nav} />{!cookieAccepted && <CookieBanner onAccept={acceptCookies} nav={nav} />}</>;
  if (page === "about")             return <><GlobalStyles /><Analytics /><SpeedInsights /><AboutPage nav={nav} />{!cookieAccepted && <CookieBanner onAccept={acceptCookies} nav={nav} />}</>;
  if (page === "contact")           return <><GlobalStyles /><Analytics /><SpeedInsights /><ContactPage nav={nav} />{!cookieAccepted && <CookieBanner onAccept={acceptCookies} nav={nav} />}</>;
  return <><GlobalStyles /><Analytics /><SpeedInsights /><Homepage nav={nav} />{!cookieAccepted && <CookieBanner onAccept={acceptCookies} nav={nav} />}</>;
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

function TopBar({ nav }) {
  return (
    <div style={{
      background: "#1a1a1a", borderBottom: "3px solid #f5a623",
      position: "sticky", top: 0, zIndex: 20,
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 52,
      }}>
        <div onClick={() => nav("home")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <Logo size={32} />
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 15, letterSpacing: "-0.3px" }}>
            AusElectrical<span style={{ color: "#f5a623" }}>.tools</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <NavLink onClick={() => nav("home")}>Calculators</NavLink>
          <NavLink onClick={() => nav("about")}>About</NavLink>
          <NavLink onClick={() => nav("contact")}>Contact</NavLink>
          <NavLink onClick={() => nav("terms")}>Terms of Use</NavLink>
          <NavLink onClick={() => nav("privacy")}>Privacy Policy</NavLink>
        </div>
      </div>
    </div>
  );
}

function NavLink({ onClick, children }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: "none", border: "none", cursor: "pointer", padding: "4px 0",
      fontSize: 11, fontFamily: "'Courier New', monospace", letterSpacing: "0.1em",
      color: hov ? "#f5a623" : "#888", transition: "color 0.15s",
      textTransform: "uppercase", fontWeight: 600,
    }}>{children}</button>
  );
}

function BackBreadcrumb({ nav, label }) {
  return (
    <div style={{ background: "#f0ece3", borderBottom: "1px solid #ddd" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "8px 24px", display: "flex", alignItems: "center", gap: 6 }}>
        <button onClick={() => nav("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 11, color: "#888", fontFamily: "'Courier New', monospace" }}>
          ← All Calculators
        </button>
        <span style={{ fontSize: 11, color: "#ccc", fontFamily: "'Courier New', monospace" }}>/</span>
        <span style={{ fontSize: 11, color: "#1a1a1a", fontFamily: "'Courier New', monospace", fontWeight: 700 }}>{label}</span>
      </div>
    </div>
  );
}

function Footer({ nav }) {
  return (
    <div style={{ borderTop: "2px solid #1a1a1a", background: "#1a1a1a" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div onClick={() => nav("home")} style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 6, cursor: "pointer" }}>
            AusElectrical<span style={{ color: "#f5a623" }}>.tools</span>
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <FooterLink onClick={() => nav("home")}>Calculators</FooterLink>
            <FooterLink onClick={() => nav("about")}>About</FooterLink>
            <FooterLink onClick={() => nav("contact")}>Contact</FooterLink>
            <FooterLink onClick={() => nav("terms")}>Terms of Use</FooterLink>
            <FooterLink onClick={() => nav("privacy")}>Privacy Policy</FooterLink>
          </div>
        </div>
        <div style={{ fontSize: 10, color: "#444", fontFamily: "'Courier New', monospace", textAlign: "right", lineHeight: 1.8 }}>
          <div>Designed around AS/NZS 3000:2018 · AS/NZS 3008.1</div>
          <div>Results for guidance only. Not a substitute for engineering judgement.</div>
        </div>
      </div>
    </div>
  );
}

function FooterLink({ onClick, children }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: "none", border: "none", cursor: "pointer", padding: 0,
      fontSize: 10, fontFamily: "'Courier New', monospace",
      color: hov ? "#f5a623" : "#555", transition: "color 0.15s",
      textTransform: "uppercase", letterSpacing: "0.1em",
    }}>{children}</button>
  );
}

// ─── CALCULATOR REGISTRY ──────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: "fundamentals", label: "Fundamentals",
    calculators: [
      { id: "flc",               title: "Full Load Current",  desc: "Calculate FLC from kW, kVA or HP for single and three phase circuits.",        tags: ["1Ø", "3Ø", "Current"],     status: "live" },
      { id: "three-phase-power", title: "Three-Phase Power",  desc: "Resolve apparent, active and reactive power from voltage and current.",         tags: ["3Ø", "kVA", "kW", "kVAR"], status: "live" },
      { id: "ohms-law",          title: "Ohm's Law",          desc: "Solve for voltage, current, resistance or power — enter any two known values.", tags: ["V", "I", "R", "P"],         status: "live" },
    ],
  },
  {
    id: "wiring", label: "Wiring & Cables",
    calculators: [
      { id: "cable-sizing", title: "Cable Sizing",  desc: "Size cables per AS/NZS 3008.1 — current capacity and voltage drop.", tags: ["AS 3008", "Cu", "Al", "XLPE", "PVC"], status: "soon" },
      { id: "voltage-drop", title: "Voltage Drop",  desc: "Calculate voltage drop across a cable run per AS/NZS 3000 Cl. 3.6.", tags: ["AS 3000", "Vd", "1Ø", "3Ø"],          status: "soon" },
      { id: "conduit-fill", title: "Conduit Fill",  desc: "Determine maximum number of cables per conduit size.",                tags: ["Conduit", "Fill", "AS 3000"],          status: "soon" },
    ],
  },
  {
    id: "protection", label: "Protection & Switchgear",
    calculators: [
      { id: "fault-level",             title: "Fault Level (Isc)",             desc: "Calculate prospective short circuit current at a point in the system.",   tags: ["Isc", "Fault", "kA"],         status: "soon" },
      { id: "earth-fault-loop",        title: "Earth Fault Loop Impedance",    desc: "Verify disconnection time compliance per AS/NZS 3000.",                   tags: ["AS 3000", "Zs", "RCD"],       status: "soon" },
      { id: "fuse-cb-sizing",          title: "Fuse & Circuit Breaker Sizing", desc: "Select appropriate protection device rating for a given circuit.",         tags: ["MCB", "Fuse", "Protection"],  status: "soon" },
      { id: "power-factor-correction", title: "Power Factor Correction",       desc: "Calculate capacitor bank size required to improve power factor.",          tags: ["kVAR", "Capacitor", "PF"],    status: "soon" },
    ],
  },
  {
    id: "motors", label: "Motors & Drives",
    calculators: [
      { id: "motor-inrush",     title: "Motor Inrush & FLC",        desc: "Calculate full load and inrush current for DOL, star-delta, soft starter and VFD starting.", tags: ["DOL", "Star-Delta", "VFD", "Inrush", "FLC"], status: "live" },
      { id: "motor-starting",   title: "Motor Starting Current",    desc: "Estimate starting current for DOL, star-delta and VFD starting methods.",        tags: ["DOL", "Star-Delta", "VFD"],  status: "soon" },
      { id: "motor-efficiency", title: "Motor Efficiency & Losses", desc: "Calculate input power, losses and efficiency from output and efficiency rating.", tags: ["HP", "kW", "Efficiency"],    status: "soon" },
    ],
  },
  {
    id: "demand", label: "Demand & Supply",
    calculators: [
      { id: "demand-calc",      title: "Demand Calculation", desc: "Calculate maximum demand for residential and commercial installations per AS/NZS 3000 Cl. 2.", tags: ["AS 3000", "MD", "Diversity"], status: "soon" },
      { id: "generator-sizing", title: "Generator Sizing",   desc: "Size a standby or prime generator for a given load profile.",                                  tags: ["Gen", "kVA", "Standby"],      status: "soon" },
      { id: "solar-pv",         title: "Solar PV System",    desc: "Size a grid-connected solar PV system per AS/NZS 4777.",                                       tags: ["AS 4777", "PV", "Solar"],     status: "soon" },
    ],
  },
  {
    id: "mining", label: "Mining & HV",
    calculators: [
      { id: "trailing-cable",   title: "Trailing Cable Sizing",     desc: "Size trailing cables for underground mining equipment per AS 2067.",         tags: ["AS 2067", "Mining", "HV"],      status: "soon" },
      { id: "hv-cable",         title: "HV Cable Sizing",           desc: "Size high voltage cables for mining and industrial applications.",           tags: ["HV", "11kV", "33kV"],           status: "soon" },
      { id: "intrinsic-safety", title: "Intrinsic Safety Barriers", desc: "Calculate barrier parameters for hazardous area circuits per AS/NZS 60079.", tags: ["Ex ia", "Zener", "Hazardous"],  status: "soon" },
    ],
  },
];

const STATUS_STYLES = {
  live: { bg: "#e8f5e9", color: "#2a7a2a", border: "#2a7a2a", label: "LIVE" },
  soon: { bg: "#fff8e1", color: "#b8860b", border: "#b8860b", label: "COMING SOON" },
};

// ─── HOMEPAGE ─────────────────────────────────────────────────────────────────

function Homepage({ nav }) {
  const [search, setSearch]               = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = CATEGORIES.map(cat => ({
    ...cat,
    calculators: cat.calculators.filter(c => {
      const matchSearch = !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.desc.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchCat = activeCategory === "all" || cat.id === activeCategory;
      return matchSearch && matchCat;
    }),
  })).filter(cat => cat.calculators.length > 0);


  return (
    <div style={{ minHeight: "100vh", background: "#f5f2eb", fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* Top Bar */}
      <div style={{ background: "#1a1a1a", borderBottom: "3px solid #f5a623" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Logo size={32} />
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 15, letterSpacing: "-0.3px" }}>
              AusElectrical<span style={{ color: "#f5a623" }}>.tools</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <NavLink onClick={() => nav("home")}>Calculators</NavLink>
            <NavLink onClick={() => nav("about")}>About</NavLink>
            <NavLink onClick={() => nav("contact")}>Contact</NavLink>
            <NavLink onClick={() => nav("terms")}>Terms of Use</NavLink>
            <NavLink onClick={() => nav("privacy")}>Privacy Policy</NavLink>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: "#1a1a1a", borderBottom: "2px solid #333", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 40px", position: "relative" }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{ position: "absolute", top: 0, bottom: 0, left: `${i * 13}%`, width: 1, background: "rgba(255,255,255,0.02)", pointerEvents: "none" }} />
        ))}
        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "inline-block", fontSize: 10, letterSpacing: "0.3em", color: "#f5a623", fontFamily: "'Courier New', monospace", fontWeight: 700, border: "1px solid #f5a62340", padding: "3px 10px", marginBottom: 16 }}>
            AUSTRALIAN ELECTRICAL ENGINEERING TOOLS
          </div>
          <h1 style={{ margin: "0 0 12px", fontSize: "clamp(28px, 5vw, 42px)", color: "#fff", fontWeight: 700, letterSpacing: "-1px", lineHeight: 1.15 }}>
            Electrical calculators built<br /><span style={{ color: "#f5a623" }}>for Australian standards.</span>
          </h1>
          <p style={{ margin: "0 0 28px", fontSize: 15, color: "#888", lineHeight: 1.7, maxWidth: 520 }}>
            Fast, accurate calculators for electricians and electrical engineers. Designed around AS/NZS 3000, AS/NZS 3008, and related standards.
          </p>

          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: "#f0ece3", borderBottom: "2px solid #1a1a1a" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "12px 24px", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 200px", minWidth: 180 }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "#aaa", pointerEvents: "none" }}>⌕</span>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search calculators..."
            style={{ width: "100%", padding: "8px 12px 8px 28px", border: "2px solid #1a1a1a", borderRadius: 2, fontFamily: "'Courier New', monospace", fontSize: 12, outline: "none", background: "#fff", boxSizing: "border-box", color: "#1a1a1a" }} />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[{ id: "all", label: "All" }, ...CATEGORIES.map(c => ({ id: c.id, label: c.label }))].map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{
              padding: "6px 12px", fontSize: 11,
              border: `2px solid ${activeCategory === cat.id ? "#1a1a1a" : "#ccc"}`,
              background: activeCategory === cat.id ? "#1a1a1a" : "#fff",
              color: activeCategory === cat.id ? "#fff" : "#555",
              borderRadius: 2, cursor: "pointer", fontFamily: "'Courier New', monospace",
              fontWeight: activeCategory === cat.id ? 700 : 400, transition: "all 0.1s",
              boxShadow: activeCategory === cat.id ? "2px 2px 0 #f5a623" : "none",
            }}>{cat.label}</button>
          ))}
        </div>
      </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 64px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#aaa", fontFamily: "'Courier New', monospace" }}>No calculators found for "{search}"</div>
        ) : filtered.map(category => (
          <div key={category.id} style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 4, height: 22, background: "#f5a623" }} />
              <h2 style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#1a1a1a", fontFamily: "'Courier New', monospace" }}>{category.label}</h2>
              <div style={{ flex: 1, height: 1, background: "#ddd" }} />
              <span style={{ fontSize: 10, color: "#aaa", fontFamily: "'Courier New', monospace" }}>{category.calculators.length} calculator{category.calculators.length !== 1 ? "s" : ""}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
              {category.calculators.map(calc => <CalcCard key={calc.id} calc={calc} nav={nav} />)}
            </div>
          </div>
        ))}
      </div>

      <Footer nav={nav} />
    </div>
  );
}

function CalcCard({ calc, nav }) {
  const [hovered, setHovered] = useState(false);
  const st = STATUS_STYLES[calc.status];
  const isLive = calc.status === "live";
  return (
    <div onClick={() => isLive && nav(calc.id)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      background: "#fff", border: `2px solid ${hovered && isLive ? "#1a1a1a" : "#ddd"}`,
      borderRadius: 2, padding: "18px 20px", cursor: isLive ? "pointer" : "default",
      transition: "all 0.15s",
      boxShadow: hovered && isLive ? "4px 4px 0 #f5a623" : hovered ? "2px 2px 0 #eee" : "none",
      transform: hovered && isLive ? "translate(-1px, -1px)" : "none",
      opacity: isLive ? 1 : 0.75, display: "flex", flexDirection: "column", gap: 10,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.3 }}>{calc.title}</div>
        <span style={{ flexShrink: 0, fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", padding: "3px 7px", border: `1px solid ${st.border}`, background: st.bg, color: st.color, borderRadius: 2, fontFamily: "'Courier New', monospace" }}>{st.label}</span>
      </div>
      <p style={{ margin: 0, fontSize: 12, color: "#666", lineHeight: 1.6, fontFamily: "'Courier New', monospace" }}>{calc.desc}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {calc.tags.map(tag => (
            <span key={tag} style={{ fontSize: 9, padding: "2px 6px", background: "#f5f2eb", color: "#888", border: "1px solid #e0ddd4", borderRadius: 2, fontFamily: "'Courier New', monospace", letterSpacing: "0.05em" }}>{tag}</span>
          ))}
        </div>
        {isLive && <span style={{ fontSize: 16, color: hovered ? "#f5a623" : "#ccc", transition: "color 0.15s, transform 0.15s", transform: hovered ? "translateX(3px)" : "none", display: "inline-block" }}>→</span>}
      </div>
    </div>
  );
}

// ─── TERMS OF USE PAGE ────────────────────────────────────────────────────────

function TermsPage({ nav }) {
  const sections = [
    {
      title: "1. No Warranty",
      body: "AusElectrical.tools makes no warranty, express or implied, as to the accuracy, completeness, or fitness for purpose of any calculator or result produced by this website. While reasonable efforts are made to ensure calculations reflect commonly accepted interpretations of relevant Australian Standards and industry practice, no guarantee is given that results are free from error or that they reflect the most current version of any referenced standard. Standards are periodically revised and it is the user's responsibility to verify that any standard referenced is current at the time of use.",
    },
    {
      title: "2. Use at Your Own Risk",
      body: "All results, outputs, and recommendations generated by calculators on this website are provided for indicative and educational purposes only. All calculations must be independently verified before being relied upon for design, compliance, or construction purposes. You accept full responsibility for any decisions made, actions taken, or designs produced on the basis of results obtained from this website. AusElectrical.tools, its operators, and contributors accept no liability whatsoever for any loss, damage, injury, or consequence — direct or indirect — arising from the use of or reliance upon any information or calculation result provided on this website.",
    },
    {
      title: "3. Not a Substitute for Professional Advice",
      body: "The calculators on this website do not constitute professional engineering advice. Electrical installations must be designed, verified, and inspected by suitably qualified persons in accordance with the applicable Australian Standards, the National Construction Code, and all relevant state and territory legislation. Nothing on this website should be interpreted as a recommendation to proceed with any electrical installation or design without appropriate professional oversight. Use of this website does not create any engineer-client, consultant-client, or professional advisory relationship between the user and AusElectrical.tools.",
    },
    {
      title: "4. Standards Currency and References",
      body: "Calculators are designed with reference to Australian Standards including, but not limited to, AS/NZS 3000:2018 (Wiring Rules), AS/NZS 3008.1, and other standards as noted. These standards are subject to revision, amendment, and supersession. AusElectrical.tools does not guarantee that calculators reflect the most recent version of any standard and accepts no responsibility for results based on outdated standard versions. Users must independently verify compliance with the current version of all applicable standards. References to Australian Standards are provided for context only. This website does not reproduce or distribute the standards themselves. Calculation methodologies are derived from publicly available engineering principles and interpretations of relevant Australian Standards.",
    },
    {
      title: "5. Limitation of Liability",
      body: "To the maximum extent permitted by law, AusElectrical.tools and its operators shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with the use of this website or the results of any calculator, even if advised of the possibility of such damages. Where liability cannot be excluded by law, it is limited to the fullest extent permitted.",
    },
    {
      title: "6. Australian Consumer Law",
      body: "Nothing in these Terms excludes, restricts, or modifies any consumer guarantee, right, or remedy conferred by the Australian Consumer Law (Schedule 2 of the Competition and Consumer Act 2010 (Cth)) or any other applicable legislation that cannot be lawfully excluded, restricted, or modified.",
    },
    {
      title: "7. Errors and Availability",
      body: "AusElectrical.tools does not guarantee uninterrupted availability of the website or calculators and reserves the right to modify, update, or remove calculators at any time without notice. Users should not rely on the continued availability of any specific calculator or result for ongoing professional or commercial purposes.",
    },
    {
      title: "8. Intellectual Property",
      body: "The calculators, code, design, and content on this website are the intellectual property of AusElectrical.tools. Calculation methodologies are derived from publicly available engineering principles and interpretations of relevant Australian Standards. You may use the results of calculators for your own professional or personal purposes, but you may not reproduce, redistribute, or commercialise the calculators or website content without written permission.",
    },
    {
      title: "9. Governing Law",
      body: "These Terms are governed by the laws of New South Wales, Australia. Any disputes arising out of or in connection with these Terms or your use of this website shall be subject to the exclusive jurisdiction of the courts of New South Wales, Australia.",
    },
    {
      title: "10. Acceptance of Terms",
      body: "By using any calculator or page on this website, you acknowledge that you have read, understood, and agree to these Terms of Use in full. If you do not agree with any part of these terms, you should not use this website.",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f5f2eb", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <TopBar nav={nav} />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Heading */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "#f5a623", fontFamily: "'Courier New', monospace", fontWeight: 700, marginBottom: 10 }}>AUSELECTRICAL.TOOLS</div>
          <h1 style={{ margin: "0 0 12px", fontSize: 32, fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.5px" }}>Terms of Use</h1>
          <p style={{ margin: 0, fontSize: 13, color: "#888", fontFamily: "'Courier New', monospace" }}>Last updated: March 2026 · Governing law: New South Wales, Australia</p>
        </div>

        {/* Warning banner */}
        <div style={{ background: "#fff8e1", border: "2px solid #f5a623", borderRadius: 2, padding: "16px 20px", marginBottom: 36, boxShadow: "4px 4px 0 #f5a623" }}>
          <div style={{ fontSize: 12, fontWeight: 700, fontFamily: "'Courier New', monospace", color: "#b8860b", marginBottom: 6, letterSpacing: "0.1em" }}>⚠ IMPORTANT — PLEASE READ BEFORE USE</div>
          <p style={{ margin: 0, fontSize: 14, color: "#7a5c00", lineHeight: 1.7 }}>
            The calculators provided on this website are for guidance and reference purposes only. They are not a substitute for professional engineering judgement, site-specific assessment, or compliance verification against current Australian Standards. All calculations must be independently verified before being relied upon for design, compliance, or construction purposes. Use of these tools is entirely at your own risk.
          </p>
        </div>

        {/* Sections */}
        {sections.map(section => (
          <div key={section.title} style={{ marginBottom: 32 }}>
            <h2 style={{ margin: "0 0 10px", fontSize: 16, fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.2px" }}>{section.title}</h2>
            <div style={{ width: 32, height: 2, background: "#f5a623", marginBottom: 12 }} />
            <p style={{ margin: 0, fontSize: 14, color: "#444", lineHeight: 1.8 }}>{section.body}</p>
          </div>
        ))}

        {/* Footer note */}
        <div style={{ marginTop: 48, padding: "16px 20px", background: "#fff", border: "2px solid #ddd", borderRadius: 2, fontFamily: "'Courier New', monospace", fontSize: 12, color: "#888", lineHeight: 1.7 }}>
          Questions about these terms? Visit our <button onClick={() => nav("contact")} style={{ background: "none", border: "none", cursor: "pointer", color: "#0077cc", fontSize: 12, fontFamily: "'Courier New', monospace", padding: 0, textDecoration: "underline" }}>Contact page</button> or email us at auselectricaltools@gmail.com. See also our <button onClick={() => nav("privacy")} style={{ background: "none", border: "none", cursor: "pointer", color: "#0077cc", fontSize: 12, fontFamily: "'Courier New', monospace", padding: 0, textDecoration: "underline" }}>Privacy Policy</button>.
        </div>
      </div>
      <Footer nav={nav} />
    </div>
  );
}

// ─── FLC CALCULATOR ───────────────────────────────────────────────────────────

function calculateFLC({ phases, voltage, loadUnit, loadValue, powerFactor, efficiency }) {
  if (!loadValue || !voltage) return null;
  let kw = 0;
  if (loadUnit === "kW")       kw = loadValue;
  else if (loadUnit === "kVA") kw = loadValue * powerFactor;
  else if (loadUnit === "HP")  kw = (loadValue * 0.7457) / (efficiency / 100);
  const kva = kw / powerFactor;
  const current = phases === 1
    ? (kw * 1000) / (voltage * powerFactor)
    : (kw * 1000) / (Math.sqrt(3) * voltage * powerFactor);
  return {
    current: Math.round(current * 100) / 100,
    kw: Math.round(kw * 100) / 100,
    kva: Math.round(kva * 100) / 100,
    formula: phases === 1
      ? `I = (${kw.toFixed(2)} × 1000) / (${voltage} × ${powerFactor})`
      : `I = (${kw.toFixed(2)} × 1000) / (√3 × ${voltage} × ${powerFactor})`,
  };
}

function FLCCalculator({ nav }) {
  const [phases, setPhases]           = useState(3);
  const [voltage, setVoltage]         = useState("415");
  const [loadUnit, setLoadUnit]       = useState("kW");
  const [loadValue, setLoadValue]     = useState("");
  const [powerFactor, setPowerFactor] = useState(0.85);
  const [efficiency, setEfficiency]   = useState(90);
  const [result, setResult]           = useState(null);
  const [flash, setFlash]             = useState(false);

  useEffect(() => { setVoltage(phases === 1 ? "230" : "415"); }, [phases]);
  useEffect(() => {
    const r = calculateFLC({ phases, voltage: parseFloat(voltage), loadUnit, loadValue: parseFloat(loadValue), powerFactor, efficiency });
    setResult(r);
    if (r) { setFlash(true); setTimeout(() => setFlash(false), 300); }
  }, [phases, voltage, loadUnit, loadValue, powerFactor, efficiency]);

  const commonVoltages = phases === 1 ? [110, 120, 230, 240] : [380, 400, 415, 440, 3300, 6600, 11000];

  return (
    <div style={{ minHeight: "100vh", background: "#f5f2eb", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <TopBar nav={nav} />
      <BackBreadcrumb nav={nav} label="Full Load Current" />
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 24px" }}>
        <div style={{ width: "100%", maxWidth: 480, background: "#fff", border: "2px solid #1a1a1a", boxShadow: "6px 6px 0px #1a1a1a", borderRadius: 2 }}>
          <div style={{ background: "#1a1a1a", padding: "20px 28px" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "#f5a623", fontWeight: 700, marginBottom: 6, fontFamily: "'Courier New', monospace" }}>AUSELECTRICAL.TOOLS</div>
            <h1 style={{ margin: 0, fontSize: 22, color: "#fff", fontWeight: 700 }}>Full Load Current</h1>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "#888", fontFamily: "'Courier New', monospace" }}>Single &amp; Three Phase AC Circuits</p>
          </div>
          <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <CalcLabel>Phase Configuration</CalcLabel>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[{ val: 1, label: "Single Phase (AC)", sub: "1Ø" }, { val: 3, label: "Three Phase (AC)", sub: "3Ø" }].map(p => (
                  <button key={p.val} onClick={() => setPhases(p.val)} style={{ padding: "12px 8px", border: `2px solid ${phases === p.val ? "#1a1a1a" : "#ddd"}`, background: phases === p.val ? "#1a1a1a" : "#fff", color: phases === p.val ? "#fff" : "#666", borderRadius: 2, cursor: "pointer", fontFamily: "'Georgia', serif", transition: "all 0.15s", boxShadow: phases === p.val ? "3px 3px 0 #f5a623" : "none" }}>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>{p.sub}</div>
                    <div style={{ fontSize: 11, marginTop: 2, fontFamily: "'Courier New', monospace", letterSpacing: "0.05em" }}>{p.label}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <CalcLabel>System Voltage (V)</CalcLabel>
              <input type="number" value={voltage} onChange={e => setVoltage(e.target.value)} style={inputStyle} placeholder="e.g. 415" />
              <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                {commonVoltages.map(v => (
                  <button key={v} onClick={() => setVoltage(String(v))} style={{ padding: "3px 10px", fontSize: 11, border: `1px solid ${voltage === String(v) ? "#1a1a1a" : "#ccc"}`, background: voltage === String(v) ? "#1a1a1a" : "#f9f9f9", color: voltage === String(v) ? "#fff" : "#555", borderRadius: 2, cursor: "pointer", fontFamily: "'Courier New', monospace", transition: "all 0.1s" }}>
                    {v >= 1000 ? `${v / 1000}kV` : `${v}V`}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <CalcLabel>Load</CalcLabel>
              <div style={{ display: "flex", gap: 8 }}>
                <input type="number" value={loadValue} onChange={e => setLoadValue(e.target.value)} style={{ ...inputStyle, flex: 1 }} placeholder="Enter value" min="0" step="0.1" />
                <div style={{ display: "flex", border: "2px solid #1a1a1a", borderRadius: 2, overflow: "hidden" }}>
                  {["kW", "kVA", "HP"].map(u => (
                    <button key={u} onClick={() => setLoadUnit(u)} style={{ padding: "0 14px", border: "none", borderLeft: u !== "kW" ? "1px solid #1a1a1a" : "none", background: loadUnit === u ? "#f5a623" : "#fff", color: "#1a1a1a", cursor: "pointer", fontFamily: "'Courier New', monospace", fontSize: 12, fontWeight: loadUnit === u ? 700 : 400, transition: "background 0.15s" }}>{u}</button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <CalcLabel>Power Factor — <span style={{ color: "#f5a623", fontFamily: "'Courier New', monospace" }}>{powerFactor.toFixed(2)}</span></CalcLabel>
              <input type="range" min="0.5" max="1.0" step="0.01" value={powerFactor} onChange={e => setPowerFactor(parseFloat(e.target.value))} style={{ width: "100%", accentColor: "#1a1a1a", cursor: "pointer" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#aaa", fontFamily: "'Courier New', monospace", marginTop: 2 }}>
                <span>0.50 (poor)</span><span>0.80 (motor)</span><span>1.00 (unity)</span>
              </div>
            </div>
            {loadUnit === "HP" && (
              <div>
                <CalcLabel>Motor Efficiency — <span style={{ color: "#f5a623", fontFamily: "'Courier New', monospace" }}>{efficiency}%</span></CalcLabel>
                <input type="range" min="70" max="99" step="1" value={efficiency} onChange={e => setEfficiency(parseInt(e.target.value))} style={{ width: "100%", accentColor: "#1a1a1a", cursor: "pointer" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#aaa", fontFamily: "'Courier New', monospace", marginTop: 2 }}>
                  <span>70%</span><span>85% (typical)</span><span>99%</span>
                </div>
              </div>
            )}
            <div style={{ borderTop: "2px dashed #e0e0e0" }} />
            <div style={{ background: result ? (flash ? "#fffbf0" : "#fafafa") : "#fafafa", border: `2px solid ${result ? "#1a1a1a" : "#e0e0e0"}`, borderRadius: 2, padding: "20px", transition: "background 0.3s", boxShadow: result ? "4px 4px 0 #f5a623" : "none" }}>
              {result ? (
                <>
                  <div style={{ textAlign: "center", marginBottom: 16 }}>
                    <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#888", fontFamily: "'Courier New', monospace", marginBottom: 4 }}>FULL LOAD CURRENT</div>
                    <div style={{ fontSize: 56, fontWeight: 700, color: "#1a1a1a", lineHeight: 1, letterSpacing: "-2px" }}>{result.current}</div>
                    <div style={{ fontSize: 20, color: "#f5a623", fontWeight: 700, fontFamily: "'Courier New', monospace" }}>Amperes</div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                    <MiniStat label="Active Power" value={`${result.kw} kW`} />
                    <MiniStat label="Apparent Power" value={`${result.kva} kVA`} />
                  </div>
                  <div style={{ background: "#1a1a1a", padding: "10px 14px", borderRadius: 2, fontFamily: "'Courier New', monospace", fontSize: 11, color: "#f5a623", wordBreak: "break-all", lineHeight: 1.7 }}>
                    <span style={{ color: "#666" }}>formula: </span>{result.formula}
                  </div>
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "10px 0", color: "#bbb", fontFamily: "'Courier New', monospace", fontSize: 12 }}>Enter load value to calculate</div>
              )}
            </div>
            <Disclaimer />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── THREE-PHASE POWER CALCULATOR ─────────────────────────────────────────────

function calculateThreePhase({ voltage, current, powerFactor }) {
  const V = parseFloat(voltage), I = parseFloat(current), PF = parseFloat(powerFactor);
  if (!V || !I || !PF) return null;
  const kva  = (Math.sqrt(3) * V * I) / 1000;
  const kw   = kva * PF;
  const sinPhi = Math.sqrt(1 - PF * PF);
  const kvar = kva * sinPhi;
  const phi  = Math.acos(PF) * (180 / Math.PI);
  return {
    kva:    Math.round(kva    * 1000) / 1000,
    kw:     Math.round(kw     * 1000) / 1000,
    kvar:   Math.round(kvar   * 1000) / 1000,
    phi:    Math.round(phi    * 100)  / 100,
    sinPhi: Math.round(sinPhi * 1000) / 1000,
  };
}

function ThreePhasePowerCalculator({ nav }) {
  const [voltage, setVoltage]         = useState("415");
  const [current, setCurrent]         = useState("");
  const [powerFactor, setPowerFactor] = useState(0.85);
  const [result, setResult]           = useState(null);
  const [flash, setFlash]             = useState(false);

  const commonVoltages = [380, 400, 415, 440, 3300, 6600, 11000];

  useEffect(() => {
    const r = calculateThreePhase({ voltage, current, powerFactor });
    setResult(r);
    if (r) { setFlash(true); setTimeout(() => setFlash(false), 300); }
  }, [voltage, current, powerFactor]);

  const maxVal = result ? Math.max(result.kva, result.kw, result.kvar, 0.001) : 1;

  return (
    <div style={{ minHeight: "100vh", background: "#f5f2eb", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <TopBar nav={nav} />
      <BackBreadcrumb nav={nav} label="Three-Phase Power" />
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 24px" }}>
        <div style={{ width: "100%", maxWidth: 480, background: "#fff", border: "2px solid #1a1a1a", boxShadow: "6px 6px 0px #1a1a1a", borderRadius: 2 }}>
          <div style={{ background: "#1a1a1a", padding: "20px 28px" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "#f5a623", fontWeight: 700, marginBottom: 6, fontFamily: "'Courier New', monospace" }}>AUSELECTRICAL.TOOLS</div>
            <h1 style={{ margin: 0, fontSize: 22, color: "#fff", fontWeight: 700 }}>Three-Phase Power</h1>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "#888", fontFamily: "'Courier New', monospace" }}>kVA · kW · kVAR Calculator (3Ø AC)</p>
          </div>
          <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <CalcLabel>Line Voltage (V)</CalcLabel>
              <input type="number" value={voltage} onChange={e => setVoltage(e.target.value)} style={inputStyle} placeholder="e.g. 415" />
              <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                {commonVoltages.map(v => (
                  <button key={v} onClick={() => setVoltage(String(v))} style={{ padding: "3px 10px", fontSize: 11, border: `1px solid ${voltage === String(v) ? "#1a1a1a" : "#ccc"}`, background: voltage === String(v) ? "#1a1a1a" : "#f9f9f9", color: voltage === String(v) ? "#fff" : "#555", borderRadius: 2, cursor: "pointer", fontFamily: "'Courier New', monospace", transition: "all 0.1s" }}>
                    {v >= 1000 ? `${v / 1000}kV` : `${v}V`}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <CalcLabel>Line Current (A)</CalcLabel>
              <input type="number" value={current} onChange={e => setCurrent(e.target.value)} style={inputStyle} placeholder="Enter current in Amps" min="0" step="0.1" />
            </div>
            <div>
              <CalcLabel>Power Factor — <span style={{ color: "#f5a623", fontFamily: "'Courier New', monospace" }}>{powerFactor.toFixed(2)}</span>
                {result && <span style={{ color: "#aaa", fontWeight: 400, marginLeft: 8, fontSize: 10 }}>(φ = {result.phi}°)</span>}
              </CalcLabel>
              <input type="range" min="0.01" max="1.0" step="0.01" value={powerFactor} onChange={e => setPowerFactor(parseFloat(e.target.value))} style={{ width: "100%", accentColor: "#1a1a1a", cursor: "pointer" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#aaa", fontFamily: "'Courier New', monospace", marginTop: 2 }}>
                <span>0.01 (poor)</span><span>0.80 (motor)</span><span>1.00 (unity)</span>
              </div>
            </div>
            <div style={{ borderTop: "2px dashed #e0e0e0" }} />
            <div style={{ background: result ? (flash ? "#fffbf0" : "#fafafa") : "#fafafa", border: `2px solid ${result ? "#1a1a1a" : "#e0e0e0"}`, borderRadius: 2, padding: "20px", transition: "background 0.3s", boxShadow: result ? "4px 4px 0 #f5a623" : "none" }}>
              {result ? (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <ResultRow label="Apparent Power" symbol="S" value={result.kva}  unit="kVA"  color="#1a1a1a" barColor="#1a1a1a" barWidth={result.kva  / maxVal} formula={`√3 × ${voltage} × ${current} / 1000`} />
                    <ResultRow label="Active Power"   symbol="P" value={result.kw}   unit="kW"   color="#2a7a2a" barColor="#2a7a2a" barWidth={result.kw   / maxVal} formula={`S × PF = S × ${powerFactor.toFixed(2)}`} />
                    <ResultRow label="Reactive Power" symbol="Q" value={result.kvar} unit="kVAR" color="#c05000" barColor="#c05000" barWidth={result.kvar / maxVal} formula={`S × sin(φ) = S × ${result.sinPhi}`} />
                  </div>
                  <div style={{ marginTop: 14, padding: "10px 14px", background: "#1a1a1a", borderRadius: 2, fontFamily: "'Courier New', monospace", fontSize: 11, color: "#888", lineHeight: 1.8 }}>
                    <span style={{ color: "#f5a623" }}>S²</span><span style={{ color: "#666" }}> = </span><span style={{ color: "#6abf6a" }}>P²</span><span style={{ color: "#666" }}> + </span><span style={{ color: "#e07030" }}>Q²</span>
                    <span style={{ color: "#555", marginLeft: 12 }}>{result.kva.toFixed(2)}² = {result.kw.toFixed(2)}² + {result.kvar.toFixed(2)}²</span>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "16px 0", color: "#bbb", fontFamily: "'Courier New', monospace", fontSize: 12 }}>Enter voltage and current to calculate</div>
              )}
            </div>
            <Disclaimer />
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultRow({ label, symbol, value, unit, color, barColor, barWidth, formula }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontFamily: "'Courier New', monospace", fontSize: 11, fontWeight: 700, color, letterSpacing: "0.1em" }}>{symbol}</span>
          <span style={{ fontSize: 11, color: "#888", fontFamily: "'Courier New', monospace" }}>{label}</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
          <span style={{ fontSize: 24, fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.5px", lineHeight: 1 }}>{value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 3 })}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color, fontFamily: "'Courier New', monospace" }}>{unit}</span>
        </div>
      </div>
      <div style={{ height: 6, background: "#eee", borderRadius: 1, overflow: "hidden", marginBottom: 4 }}>
        <div style={{ height: "100%", width: `${Math.max(barWidth * 100, 1)}%`, background: barColor, borderRadius: 1, transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }} />
      </div>
      <div style={{ fontSize: 10, color: "#bbb", fontFamily: "'Courier New', monospace" }}>{formula}</div>
    </div>
  );
}

// ─── OHM'S LAW CALCULATOR ─────────────────────────────────────────────────────

function solveOhmsLaw(known) {
  let v = known.V !== "" && !isNaN(parseFloat(known.V)) ? parseFloat(known.V) : null;
  let i = known.I !== "" && !isNaN(parseFloat(known.I)) ? parseFloat(known.I) : null;
  let r = known.R !== "" && !isNaN(parseFloat(known.R)) ? parseFloat(known.R) : null;
  let p = known.P !== "" && !isNaN(parseFloat(known.P)) ? parseFloat(known.P) : null;

  const count = [v, i, r, p].filter(x => x !== null).length;
  if (count !== 2) return null;

  if (v !== null && i !== null) { r = v / i;                  p = v * i; }
  else if (v !== null && r !== null) { i = v / r;             p = (v * v) / r; }
  else if (v !== null && p !== null) { i = p / v;             r = (v * v) / p; }
  else if (i !== null && r !== null) { v = i * r;             p = i * i * r; }
  else if (i !== null && p !== null) { v = p / i;             r = p / (i * i); }
  else if (r !== null && p !== null) { v = Math.sqrt(p * r);  i = Math.sqrt(p / r); }

  if ([v, i, r, p].some(x => x === null || !isFinite(x) || x < 0)) return null;

  const fmt = n => {
    if (n >= 1000000) return (n / 1000000).toPrecision(4) + "M";
    if (n >= 1000)    return (n / 1000).toPrecision(4) + "k";
    if (n < 0.001)    return (n * 1000000).toPrecision(4) + "µ";
    if (n < 1)        return n.toPrecision(4);
    return parseFloat(n.toPrecision(5)).toString();
  };

  return { V: fmt(v), I: fmt(i), R: fmt(r), P: fmt(p) };
}

const OHM_FIELDS = [
  { key: "V", label: "Voltage",    unit: "V", color: "#0077cc", emptyBg: "#e8f4ff", emptyColor: "#0077cc", desc: "Volts" },
  { key: "I", label: "Current",    unit: "A", color: "#2a9a2a", emptyBg: "#e8f5e9", emptyColor: "#2a9a2a", desc: "Amperes" },
  { key: "R", label: "Resistance", unit: "Ω", color: "#cc2200", emptyBg: "#fff0ee", emptyColor: "#cc2200", desc: "Ohms" },
  { key: "P", label: "Power",      unit: "W", color: "#cc7700", emptyBg: "#fff8e1", emptyColor: "#cc7700", desc: "Watts" },
];

function OhmsLawCalculator({ nav }) {
  const [inputs, setInputs] = useState({ V: "", I: "", R: "", P: "" });
  const [result, setResult] = useState(null);
  const [error, setError]   = useState("");

  const filledCount = Object.values(inputs).filter(v => v !== "" && !isNaN(parseFloat(v))).length;

  useEffect(() => {
    if (filledCount < 2)  { setResult(null); setError(""); return; }
    if (filledCount > 2)  { setResult(null); setError("Enter exactly 2 known values — clear the others."); return; }
    setError("");
    const r = solveOhmsLaw(inputs);
    r ? setResult(r) : (setResult(null), setError("Could not solve — check your values."));
  }, [inputs]);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f2eb", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <TopBar nav={nav} />
      <BackBreadcrumb nav={nav} label="Ohm's Law" />
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 24px" }}>
        <div style={{ width: "100%", maxWidth: 480, background: "#fff", border: "2px solid #1a1a1a", boxShadow: "6px 6px 0px #1a1a1a", borderRadius: 2 }}>
          <div style={{ background: "#1a1a1a", padding: "20px 28px" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "#f5a623", fontWeight: 700, marginBottom: 6, fontFamily: "'Courier New', monospace" }}>AUSELECTRICAL.TOOLS</div>
            <h1 style={{ margin: 0, fontSize: 22, color: "#fff", fontWeight: 700 }}>Ohm's Law</h1>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "#888", fontFamily: "'Courier New', monospace" }}>Enter any 2 known values — the rest are solved automatically</p>
          </div>
          <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Formula reference */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: "12px 14px", background: "#f9f7f2", border: "1px solid #e0ddd4", borderRadius: 2, fontFamily: "'Courier New', monospace", fontSize: 11 }}>
              {["V = I × R", "I = V / R", "R = V / I", "P = V × I"].map(f => <div key={f} style={{ color: "#555" }}>{f}</div>)}
            </div>

            {/* Input fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {OHM_FIELDS.map(field => {
                const isFilled = inputs[field.key] !== "" && !isNaN(parseFloat(inputs[field.key]));
                const isSolved = result && !isFilled;
                return (
                  <div key={field.key} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", border: `2px solid ${isFilled ? field.color : isSolved ? "#ddd" : field.emptyBg}`, borderRadius: 2, background: isSolved ? "#fafafa" : "#fff", transition: "border-color 0.2s" }}>
                    <div style={{ width: 36, height: 36, flexShrink: 0, background: isFilled ? field.color : field.emptyBg, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2, transition: "background 0.2s" }}>
                      <span style={{ fontSize: 16, fontWeight: 700, color: isFilled ? "#fff" : field.emptyColor, fontFamily: "'Courier New', monospace" }}>{field.key}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 10, color: "#aaa", fontFamily: "'Courier New', monospace", marginBottom: 2, letterSpacing: "0.1em" }}>{field.label.toUpperCase()} ({field.desc})</div>
                      {isSolved ? (
                        <div style={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.5px", lineHeight: 1 }}>
                          {result[field.key]}
                          <span style={{ fontSize: 12, color: field.color, marginLeft: 4, fontFamily: "'Courier New', monospace" }}>{field.unit}</span>
                          <span style={{ fontSize: 9, color: "#bbb", marginLeft: 8, fontFamily: "'Courier New', monospace", fontWeight: 400 }}>CALCULATED</span>
                        </div>
                      ) : (
                        <input type="number" value={inputs[field.key]} onChange={e => setInputs(prev => ({ ...prev, [field.key]: e.target.value }))} placeholder={`Enter ${field.desc.toLowerCase()}`} min="0" step="any"
                          style={{ width: "100%", border: "none", outline: "none", fontSize: 16, fontFamily: "'Georgia', serif", background: "transparent", color: "#1a1a1a", padding: 0, boxSizing: "border-box" }} />
                      )}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: field.color, fontFamily: "'Courier New', monospace" }}>{field.unit}</span>
                      {isFilled && (
                        <button onClick={() => setInputs(prev => ({ ...prev, [field.key]: "" }))} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 9, color: "#ccc", fontFamily: "'Courier New', monospace", letterSpacing: "0.1em" }}>CLEAR</button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {error ? (
              <div style={{ padding: "10px 14px", background: "#fff8e1", border: "1px solid #f5a623", borderRadius: 2, fontSize: 12, color: "#b8860b", fontFamily: "'Courier New', monospace" }}>⚠ {error}</div>
            ) : filledCount < 2 ? (
              <div style={{ textAlign: "center", fontSize: 12, color: "#ccc", fontFamily: "'Courier New', monospace" }}>{2 - filledCount} more value{filledCount === 1 ? "" : "s"} needed to solve</div>
            ) : result ? (
              <div style={{ padding: "10px 14px", background: "#e8f5e9", border: "1px solid #2a7a2a", borderRadius: 2, fontSize: 11, color: "#2a7a2a", fontFamily: "'Courier New', monospace" }}>
                ✓ Solved — V={result.V}V · I={result.I}A · R={result.R}Ω · P={result.P}W
              </div>
            ) : null}

            <button onClick={() => setInputs({ V: "", I: "", R: "", P: "" })}
              style={{ padding: "10px", border: "2px solid #ddd", borderRadius: 2, background: "#fff", color: "#888", cursor: "pointer", fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", transition: "all 0.15s" }}
              onMouseOver={e => { e.target.style.borderColor = "#1a1a1a"; e.target.style.color = "#1a1a1a"; }}
              onMouseOut={e => { e.target.style.borderColor = "#ddd"; e.target.style.color = "#888"; }}>
              ↺ Reset All
            </button>
            <Disclaimer />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── COOKIE BANNER ───────────────────────────────────────────────────────────

function CookieBanner({ onAccept, nav }) {
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
      background: "#1a1a1a", borderTop: "3px solid #f5a623",
      padding: "16px 24px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: 12,
      boxShadow: "0 -4px 24px rgba(0,0,0,0.3)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flex: "1 1 300px" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f5a623", flexShrink: 0 }} />
        <p style={{ margin: 0, fontSize: 12, color: "#bbb", fontFamily: "'Courier New', monospace", lineHeight: 1.6 }}>
          This site uses cookies for analytics purposes.{" "}
          <button onClick={() => nav("privacy")} style={{ background: "none", border: "none", cursor: "pointer", color: "#f5a623", fontSize: 12, fontFamily: "'Courier New', monospace", padding: 0, textDecoration: "underline" }}>
            Privacy Policy
          </button>
        </p>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={onAccept} style={{
          padding: "8px 20px", background: "#f5a623", border: "2px solid #f5a623",
          borderRadius: 2, cursor: "pointer", fontFamily: "'Courier New', monospace",
          fontSize: 11, fontWeight: 700, color: "#1a1a1a", letterSpacing: "0.1em",
          textTransform: "uppercase", transition: "all 0.15s",
        }}>
          Accept & Continue
        </button>
      </div>
    </div>
  );
}

// ─── PRIVACY POLICY PAGE ──────────────────────────────────────────────────────

function PrivacyPage({ nav }) {
  const sections = [
    {
      title: "1. Who We Are",
      body: "AusElectrical.tools is a free Australian website providing electrical engineering calculators for electricians and electrical engineers. This Privacy Policy explains what information we collect, how we use it, and your rights in relation to it.",
    },
    {
      title: "2. Information We Collect",
      body: "We do not require you to create an account or submit any personal information to use this website. We automatically collect non-personal, anonymised usage data through analytics tools, including pages visited, time on site, browser type, device type, and approximate geographic location (country or city level). This data is collected in aggregate and cannot be used to identify you personally.",
    },
    {
      title: "3. Cookies",
      body: "This website uses cookies — small text files placed on your device by your browser. We use first-party cookies to remember your cookie consent preference. We also use third-party cookies through analytics and advertising services (see sections below). You may disable cookies through your browser settings. Doing so may affect the functionality of some features on this site.",
    },
    {
      title: "4. Analytics",
      body: "We use Vercel Analytics to collect anonymised data about how visitors use this site. This helps us understand which calculators are most used and how to improve the site. Vercel Analytics does not use cookies and does not collect personally identifiable information. For more information, see vercel.com/docs/analytics.",
    },
    {
      title: "5. Advertising",
      body: "This website may display advertisements served by Google AdSense. Google AdSense uses cookies and similar technologies to serve ads relevant to your interests, based on your visits to this and other websites. You may opt out of personalised advertising at any time by visiting Google's Ads Settings at adssettings.google.com. For more information on how Google uses data, visit policies.google.com/privacy.",
    },
    {
      title: "6. Third-Party Services",
      body: "This website uses the following third-party services, each of which has its own privacy policy: Vercel (hosting and analytics) — vercel.com/legal/privacy-policy; Google AdSense (advertising) — policies.google.com/privacy. We are not responsible for the privacy practices of these third parties.",
    },
    {
      title: "7. Australian Privacy Act",
      body: "This website is operated in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles to the extent they apply. We do not collect personal information in the ordinary course of operating this website.",
    },
    {
      title: "8. Data Retention",
      body: "We do not store personal data on our own servers. Analytics data held by Vercel and advertising data held by Google are retained in accordance with their respective privacy policies. Cookie consent preferences are stored locally in your browser only.",
    },
    {
      title: "9. Your Rights",
      body: "You have the right to opt out of personalised advertising (via adssettings.google.com), disable cookies via your browser settings, and request information about any personal data we hold about you by contacting us. As we do not collect personal information, we are unlikely to hold any data about you directly.",
    },
    {
      title: "10. Children",
      body: "This website is intended for use by adults. We do not knowingly collect information from children under the age of 13.",
    },
    {
      title: "11. Changes to This Policy",
      body: "We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised date. Continued use of the website after any update constitutes acceptance of the revised policy.",
    },
    {
      title: "12. Contact",
      body: "If you have questions about this Privacy Policy, please visit our Contact page or email auselectricaltools@gmail.com.",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f5f2eb", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <TopBar nav={nav} />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px 80px" }}>

        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "#f5a623", fontFamily: "'Courier New', monospace", fontWeight: 700, marginBottom: 10 }}>AUSELECTRICAL.TOOLS</div>
          <h1 style={{ margin: "0 0 12px", fontSize: 32, fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.5px" }}>Privacy Policy</h1>
          <p style={{ margin: 0, fontSize: 13, color: "#888", fontFamily: "'Courier New', monospace" }}>Last updated: March 2026 · Governing law: New South Wales, Australia</p>
        </div>

        <div style={{ background: "#e8f4ff", border: "2px solid #0077cc", borderRadius: 2, padding: "14px 18px", marginBottom: 36 }}>
          <p style={{ margin: 0, fontSize: 13, color: "#004a80", lineHeight: 1.7, fontFamily: "'Courier New', monospace" }}>
            ℹ This site uses cookies for analytics and advertising purposes. By continuing to use this site, you consent to our use of cookies as described below.
          </p>
        </div>

        {sections.map(section => (
          <div key={section.title} style={{ marginBottom: 32 }}>
            <h2 style={{ margin: "0 0 10px", fontSize: 16, fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.2px" }}>{section.title}</h2>
            <div style={{ width: 32, height: 2, background: "#f5a623", marginBottom: 12 }} />
            <p style={{ margin: 0, fontSize: 14, color: "#444", lineHeight: 1.8 }}>{section.body}</p>
          </div>
        ))}

        <div style={{ marginTop: 48, padding: "16px 20px", background: "#fff", border: "2px solid #ddd", borderRadius: 2, fontFamily: "'Courier New', monospace", fontSize: 12, color: "#888", lineHeight: 1.9 }}>
          <div>Opt out of personalised ads: <span style={{ color: "#0077cc" }}>adssettings.google.com</span></div>
          <div>Google Privacy Policy: <span style={{ color: "#0077cc" }}>policies.google.com/privacy</span></div>
          <div>Vercel Privacy Policy: <span style={{ color: "#0077cc" }}>vercel.com/legal/privacy-policy</span></div>
        </div>
      </div>
      <Footer nav={nav} />
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────

function AboutPage({ nav }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f2eb", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <TopBar nav={nav} />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Heading */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "#f5a623", fontFamily: "'Courier New', monospace", fontWeight: 700, marginBottom: 10 }}>AUSELECTRICAL.TOOLS</div>
          <h1 style={{ margin: "0 0 16px", fontSize: 32, fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.5px" }}>About</h1>
          <p style={{ margin: 0, fontSize: 16, color: "#555", lineHeight: 1.8, maxWidth: 580 }}>
            Free, accurate electrical calculators built specifically for Australian electricians and electrical engineers.
          </p>
        </div>

        {/* Story section */}
        <div style={{ marginBottom: 40, paddingBottom: 40, borderBottom: "1px solid #ddd" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 4, height: 22, background: "#f5a623" }} />
            <h2 style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#1a1a1a", fontFamily: "'Courier New', monospace" }}>Why This Site Exists</h2>
          </div>
          <p style={{ margin: "0 0 16px", fontSize: 15, color: "#444", lineHeight: 1.9 }}>
            Most electrical calculation tools online are built around IEC or UK standards — not Australian ones. Engineers and electricians working under AS/NZS 3000, AS/NZS 3008, and related standards are left doing calculations by hand, in spreadsheets, or adapting tools that weren't designed for the Australian context.
          </p>
          <p style={{ margin: 0, fontSize: 15, color: "#444", lineHeight: 1.9 }}>
            AusElectrical.tools was built to fix that — a dedicated, free, and growing library of calculators designed specifically around Australian standards and industry practice.
          </p>
        </div>

        {/* Built by section */}
        <div style={{ marginBottom: 40, paddingBottom: 40, borderBottom: "1px solid #ddd" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 4, height: 22, background: "#f5a623" }} />
            <h2 style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#1a1a1a", fontFamily: "'Courier New', monospace" }}>Built By</h2>
          </div>
          <p style={{ margin: "0 0 16px", fontSize: 15, color: "#444", lineHeight: 1.9 }}>
            This site is developed and maintained by an Australian electrical engineer with experience across industrial and mining electrical systems in New South Wales. The calculators are designed with practical, real-world use in mind — not just academic completeness.
          </p>
          <p style={{ margin: 0, fontSize: 15, color: "#444", lineHeight: 1.9 }}>
            All calculation logic is reviewed against current Australian Standards before publication. Where interpretations are required, conservative and commonly accepted industry approaches are used.
          </p>
        </div>

        {/* What we are building */}
        <div style={{ marginBottom: 40, paddingBottom: 40, borderBottom: "1px solid #ddd" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 4, height: 22, background: "#f5a623" }} />
            <h2 style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#1a1a1a", fontFamily: "'Courier New', monospace" }}>What We Are Building</h2>
          </div>
          <p style={{ margin: "0 0 16px", fontSize: 15, color: "#444", lineHeight: 1.9 }}>
            The roadmap includes calculators across fundamentals, wiring and cables, protection and switchgear, motors and drives, demand and supply, and specialist mining and high voltage applications — areas that are underserved by existing tools.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginTop: 20 }}>
            {[
              "Full Load Current", "Three-Phase Power", "Ohm's Law",
              "Cable Sizing (AS 3008)", "Voltage Drop", "Fault Level",
              "Earth Fault Loop", "Motor Starting", "Demand Calculation",
              "Solar PV (AS 4777)", "Trailing Cable", "HV Cable Sizing",
            ].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#fff", border: "1px solid #e0ddd4", borderRadius: 2 }}>
                <div style={{ width: 6, height: 6, background: "#f5a623", borderRadius: "50%", flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "#555", fontFamily: "'Courier New', monospace" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Important note */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 4, height: 22, background: "#f5a623" }} />
            <h2 style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#1a1a1a", fontFamily: "'Courier New', monospace" }}>Important Note</h2>
          </div>
          <div style={{ background: "#fff8e1", border: "2px solid #f5a623", borderRadius: 2, padding: "16px 20px" }}>
            <p style={{ margin: 0, fontSize: 14, color: "#7a5c00", lineHeight: 1.8 }}>
              All calculators on this site are provided for guidance only and must be independently verified before use in design, compliance, or construction. This site does not replace professional engineering judgement. Please read our{" "}
              <button onClick={() => nav("terms")} style={{ background: "none", border: "none", cursor: "pointer", color: "#b8860b", fontSize: 14, fontFamily: "'Georgia', serif", padding: 0, textDecoration: "underline", fontWeight: 700 }}>Terms of Use</button>
              {" "}before relying on any results.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          <button onClick={() => nav("home")} style={{
            padding: "14px 32px", background: "#1a1a1a", border: "2px solid #1a1a1a",
            borderRadius: 2, cursor: "pointer", fontFamily: "'Courier New', monospace",
            fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: "0.15em",
            textTransform: "uppercase", transition: "all 0.15s",
            boxShadow: "4px 4px 0 #f5a623",
          }}>
            Browse Calculators →
          </button>
        </div>
      </div>
      <Footer nav={nav} />
    </div>
  );
}

// ─── CONTACT PAGE ────────────────────────────────────────────────────────────

function ContactPage({ nav }) {
  const [copied, setCopied] = useState(false);
  const [showMailMenu, setShowMailMenu] = useState(false);
  const email = "auselectricaltools@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const mailClients = [
    { label: "Gmail",         url: `https://mail.google.com/mail/?view=cm&to=${email}` },
    { label: "Outlook Web",   url: `https://outlook.live.com/mail/0/deeplink/compose?to=${email}` },
    { label: "Yahoo Mail",    url: `https://compose.mail.yahoo.com/?to=${email}` },
    { label: "Default App",   url: `mailto:${email}` },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f5f2eb", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <TopBar nav={nav} />
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "64px 24px 80px" }}>

        {/* Heading */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "#f5a623", fontFamily: "'Courier New', monospace", fontWeight: 700, marginBottom: 10 }}>AUSELECTRICAL.TOOLS</div>
          <h1 style={{ margin: "0 0 12px", fontSize: 32, fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.5px" }}>Contact</h1>
          <p style={{ margin: 0, fontSize: 15, color: "#666", lineHeight: 1.8 }}>
            Questions, feedback, or suggestions for new calculators — we'd love to hear from you.
          </p>
        </div>

        {/* Email card */}
        <div style={{ background: "#fff", border: "2px solid #1a1a1a", borderRadius: 2, padding: "28px 32px", boxShadow: "6px 6px 0 #f5a623", marginBottom: 24 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#aaa", fontFamily: "'Courier New', monospace", fontWeight: 700, marginBottom: 12, textTransform: "uppercase" }}>Email Us</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <a href={`mailto:${email}`} style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a", fontFamily: "'Courier New', monospace", textDecoration: "none", letterSpacing: "-0.3px" }}>
              {email}
            </a>
            <div style={{ display: "flex", gap: 8, position: "relative" }}>
              {/* Mail client dropdown */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setShowMailMenu(v => !v)}
                  style={{
                    padding: "8px 18px", background: "#1a1a1a", border: "2px solid #1a1a1a",
                    borderRadius: 2, cursor: "pointer", fontFamily: "'Courier New', monospace",
                    fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.1em",
                    textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6,
                  }}>
                  Send Email <span style={{ fontSize: 9 }}>{showMailMenu ? "▲" : "▼"}</span>
                </button>
                {showMailMenu && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 4px)", right: 0,
                    background: "#fff", border: "2px solid #1a1a1a", borderRadius: 2,
                    boxShadow: "4px 4px 0 #f5a623", zIndex: 50, minWidth: 160, overflow: "hidden",
                  }}>
                    {mailClients.map(client => (
                      <a
                        key={client.label}
                        href={client.url}
                        target={client.label === "Default App" ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        onClick={() => setShowMailMenu(false)}
                        style={{
                          display: "block", padding: "10px 16px",
                          fontFamily: "'Courier New', monospace", fontSize: 11,
                          color: "#1a1a1a", textDecoration: "none", fontWeight: 700,
                          letterSpacing: "0.05em", borderBottom: "1px solid #f0ece3",
                          transition: "background 0.1s",
                        }}
                        onMouseEnter={e => e.target.style.background = "#f5f2eb"}
                        onMouseLeave={e => e.target.style.background = "#fff"}
                      >
                        {client.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              {/* Copy button */}
              <button onClick={copyEmail} style={{
                padding: "8px 18px", background: copied ? "#e8f5e9" : "#fff",
                border: `2px solid ${copied ? "#2a7a2a" : "#ddd"}`,
                borderRadius: 2, cursor: "pointer", fontFamily: "'Courier New', monospace",
                fontSize: 11, fontWeight: 700, color: copied ? "#2a7a2a" : "#888",
                letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.2s",
              }}>
                {copied ? "✓ Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        {/* Response time note */}
        <div style={{ padding: "14px 18px", background: "#f9f7f2", border: "1px solid #e0ddd4", borderRadius: 2, marginBottom: 40 }}>
          <p style={{ margin: 0, fontSize: 12, color: "#888", fontFamily: "'Courier New', monospace", lineHeight: 1.7 }}>
            We aim to respond within 2–3 business days. For calculator suggestions, please include the calculation type, the relevant Australian Standard, and any specific inputs or edge cases you have in mind.
          </p>
        </div>

        {/* What to contact about */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 4, height: 22, background: "#f5a623" }} />
            <h2 style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#1a1a1a", fontFamily: "'Courier New', monospace" }}>What To Contact Us About</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: "→", text: "Suggesting a new calculator or standard to cover" },
              { icon: "→", text: "Reporting an error or incorrect result in an existing calculator" },
              { icon: "→", text: "Feedback on usability or features" },
              { icon: "→", text: "Questions about the calculations or methodology" },
              { icon: "→", text: "Advertising or partnership enquiries" },
            ].map(item => (
              <div key={item.text} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 14px", background: "#fff", border: "1px solid #e0ddd4", borderRadius: 2 }}>
                <span style={{ color: "#f5a623", fontWeight: 700, fontFamily: "'Courier New', monospace", flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer note */}
        <div style={{ padding: "14px 18px", background: "#fff8e1", border: "1px solid #f5a623", borderRadius: 2 }}>
          <p style={{ margin: 0, fontSize: 12, color: "#7a5c00", fontFamily: "'Courier New', monospace", lineHeight: 1.7 }}>
            ⚠ We are not able to provide site-specific engineering advice or verify designs via email. For professional engineering services, please engage a suitably qualified engineer in your state or territory.
          </p>
        </div>

      </div>
      <Footer nav={nav} />
    </div>
  );
}

// ─── MOTOR INRUSH & FLC CALCULATOR ──────────────────────────────────────────

function calculateMotorInrush({ voltage, powerKw, powerFactor, efficiency, startingMethod, customMultiplier }) {
  if (!voltage || !powerKw) return null;

  const eff = efficiency / 100;
  const pf  = powerFactor;
  const V   = voltage;
  const kW  = powerKw;

  // FLC — three phase motor (AS/NZS 1359, standard industrial formula)
  // I_FLC = (kW × 1000) / (√3 × V × PF × η)
  const flc = (kW * 1000) / (Math.sqrt(3) * V * pf * eff);

  // Inrush multipliers by starting method
  // DOL: 6–8× FLC typical (AS 1359 / IEC 60034 — use 6 as conservative standard)
  // Star-Delta: reduces voltage to 1/√3, so current reduced to 1/3 of DOL inrush
  // Soft Starter: typically 2–3.5× FLC (adjustable — use 2.5 default)
  // VFD: approximately 1.0–1.5× FLC (current-limited by drive — use 1.0)
  const methods = {
    dol:          { label: "DOL (Direct On-Line)",    multiplier: 6.0,  note: "6× FLC — AS/NZS 1359 typical" },
    "star-delta": { label: "Star-Delta",              multiplier: 2.0,  note: "≈2× FLC (1/3 of DOL inrush)" },
    "soft-start": { label: "Soft Starter",            multiplier: 2.5,  note: "2.5× FLC — adjustable, typical setting" },
    vfd:          { label: "VFD / Variable Speed",    multiplier: 1.0,  note: "≈1× FLC — current limited by drive" },
    custom:       { label: "Custom Multiplier",       multiplier: customMultiplier, note: `${customMultiplier}× FLC — user defined` },
  };

  const method   = methods[startingMethod];
  const inrush   = flc * method.multiplier;

  // Protection sizing hints (AS/NZS 3000 Table C3 — Type D MCB or HRC fuse for motor circuits)
  // MCB Type D: ≥10× FLC, commonly 10–20× — size to ≥ inrush but ≥ 125% FLC for continuous
  const mcbSuggestion  = Math.ceil(flc * 1.25 / 5) * 5;   // round up to next 5A
  const fuseHRC        = Math.ceil(flc * 1.5  / 5) * 5;   // HRC fuse ~150% FLC

  return {
    flc:        Math.round(flc    * 100) / 100,
    inrush:     Math.round(inrush * 100) / 100,
    multiplier: method.multiplier,
    methodLabel: method.label,
    methodNote:  method.note,
    mcb:        mcbSuggestion,
    fuse:       fuseHRC,
    inputPower: Math.round((kW / eff) * 100) / 100,
    formulaFLC: `I_FLC = (${kW} × 1000) / (√3 × ${V} × ${pf} × ${eff.toFixed(2)})`,
    formulaInrush: `I_inrush = ${flc.toFixed(2)} × ${method.multiplier} = ${inrush.toFixed(2)} A`,
  };
}

function MotorInrushCalculator({ nav }) {
  const [voltage,         setVoltage]         = useState("415");
  const [powerUnit,       setPowerUnit]        = useState("kW");
  const [powerValue,      setPowerValue]       = useState("");
  const [powerFactor,     setPowerFactor]      = useState(0.85);
  const [efficiency,      setEfficiency]       = useState(92);
  const [startingMethod,  setStartingMethod]   = useState("dol");
  const [customMult,      setCustomMult]       = useState("6");
  const [result,          setResult]           = useState(null);
  const [flash,           setFlash]            = useState(false);
  const [activeTab,       setActiveTab]        = useState("results");

  // Convert HP to kW if needed
  const getKw = () => {
    const v = parseFloat(powerValue);
    if (!v) return null;
    return powerUnit === "HP" ? v * 0.7457 : v;
  };

  useEffect(() => {
    const kW = getKw();
    const r = calculateMotorInrush({
      voltage: parseFloat(voltage),
      powerKw: kW,
      powerFactor,
      efficiency,
      startingMethod,
      customMultiplier: parseFloat(customMult) || 6,
    });
    setResult(r);
    if (r) { setFlash(true); setTimeout(() => setFlash(false), 300); }
  }, [voltage, powerValue, powerUnit, powerFactor, efficiency, startingMethod, customMult]);

  const commonVoltages = [415, 400, 380, 3300, 6600, 11000];

  const startingMethods = [
    { id: "dol",          label: "DOL",         sub: "Direct On-Line" },
    { id: "star-delta",   label: "Y/Δ",         sub: "Star-Delta" },
    { id: "soft-start",   label: "SS",          sub: "Soft Starter" },
    { id: "vfd",          label: "VFD",         sub: "Variable Speed" },
    { id: "custom",       label: "Custom",      sub: "User Defined" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f5f2eb", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <TopBar nav={nav} />
      <BackBreadcrumb nav={nav} label="Motor Inrush & FLC" />
      <div style={{ display: "flex", justifyContent: "center", padding: "32px 24px" }}>
        <div style={{ width: "100%", maxWidth: 520, background: "#fff", border: "2px solid #1a1a1a", boxShadow: "6px 6px 0px #1a1a1a", borderRadius: 2 }}>

          {/* Header */}
          <div style={{ background: "#1a1a1a", padding: "20px 28px" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "#f5a623", fontWeight: 700, marginBottom: 6, fontFamily: "'Courier New', monospace" }}>AUSELECTRICAL.TOOLS — MOTORS</div>
            <h1 style={{ margin: 0, fontSize: 22, color: "#fff", fontWeight: 700 }}>Motor Inrush & FLC</h1>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "#888", fontFamily: "'Courier New', monospace" }}>Three Phase AC Induction Motor · AS/NZS 1359</p>
          </div>

          <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Voltage */}
            <div>
              <CalcLabel>System Voltage (V)</CalcLabel>
              <input type="number" value={voltage} onChange={e => setVoltage(e.target.value)} style={inputStyle} placeholder="e.g. 415" />
              <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                {commonVoltages.map(v => (
                  <button key={v} onClick={() => setVoltage(String(v))} style={{ padding: "3px 10px", fontSize: 11, border: `1px solid ${voltage === String(v) ? "#1a1a1a" : "#ccc"}`, background: voltage === String(v) ? "#1a1a1a" : "#f9f9f9", color: voltage === String(v) ? "#fff" : "#555", borderRadius: 2, cursor: "pointer", fontFamily: "'Courier New', monospace", transition: "all 0.1s" }}>
                    {v >= 1000 ? `${v/1000}kV` : `${v}V`}
                  </button>
                ))}
              </div>
            </div>

            {/* Motor Power */}
            <div>
              <CalcLabel>Motor Output Power</CalcLabel>
              <div style={{ display: "flex", gap: 8 }}>
                <input type="number" value={powerValue} onChange={e => setPowerValue(e.target.value)} style={{ ...inputStyle, flex: 1 }} placeholder="Enter value" min="0" step="0.1" />
                <div style={{ display: "flex", border: "2px solid #1a1a1a", borderRadius: 2, overflow: "hidden" }}>
                  {["kW", "HP"].map(u => (
                    <button key={u} onClick={() => setPowerUnit(u)} style={{ padding: "0 16px", border: "none", borderLeft: u !== "kW" ? "1px solid #1a1a1a" : "none", background: powerUnit === u ? "#f5a623" : "#fff", color: "#1a1a1a", cursor: "pointer", fontFamily: "'Courier New', monospace", fontSize: 12, fontWeight: powerUnit === u ? 700 : 400, transition: "background 0.15s" }}>{u}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Power Factor */}
            <div>
              <CalcLabel>Power Factor — <span style={{ color: "#f5a623", fontFamily: "'Courier New', monospace" }}>{powerFactor.toFixed(2)}</span></CalcLabel>
              <input type="range" min="0.6" max="0.95" step="0.01" value={powerFactor} onChange={e => setPowerFactor(parseFloat(e.target.value))} style={{ width: "100%", accentColor: "#1a1a1a", cursor: "pointer" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#aaa", fontFamily: "'Courier New', monospace", marginTop: 2 }}>
                <span>0.60</span><span>0.80 (typical motor)</span><span>0.95</span>
              </div>
            </div>

            {/* Efficiency */}
            <div>
              <CalcLabel>Motor Efficiency — <span style={{ color: "#f5a623", fontFamily: "'Courier New', monospace" }}>{efficiency}%</span></CalcLabel>
              <input type="range" min="70" max="98" step="1" value={efficiency} onChange={e => setEfficiency(parseInt(e.target.value))} style={{ width: "100%", accentColor: "#1a1a1a", cursor: "pointer" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#aaa", fontFamily: "'Courier New', monospace", marginTop: 2 }}>
                <span>70%</span><span>92% (IE3 typical)</span><span>98%</span>
              </div>
            </div>

            {/* Starting Method */}
            <div>
              <CalcLabel>Starting Method</CalcLabel>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }}>
                {startingMethods.map(m => (
                  <button key={m.id} onClick={() => setStartingMethod(m.id)} style={{
                    padding: "10px 4px", border: `2px solid ${startingMethod === m.id ? "#1a1a1a" : "#ddd"}`,
                    background: startingMethod === m.id ? "#1a1a1a" : "#fff",
                    color: startingMethod === m.id ? "#fff" : "#666",
                    borderRadius: 2, cursor: "pointer", transition: "all 0.15s",
                    boxShadow: startingMethod === m.id ? "3px 3px 0 #f5a623" : "none",
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Courier New', monospace" }}>{m.label}</div>
                    <div style={{ fontSize: 9, marginTop: 3, fontFamily: "'Courier New', monospace", letterSpacing: "0.03em", lineHeight: 1.3 }}>{m.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom multiplier input */}
            {startingMethod === "custom" && (
              <div>
                <CalcLabel>Inrush Multiplier (× FLC)</CalcLabel>
                <input type="number" value={customMult} onChange={e => setCustomMult(e.target.value)} style={inputStyle} placeholder="e.g. 6" min="1" max="15" step="0.1" />
                <div style={{ fontSize: 10, color: "#aaa", fontFamily: "'Courier New', monospace", marginTop: 4 }}>
                  Typical range: DOL 5–8×, Star-Delta 1.5–2.5×, Soft Starter 2–4×
                </div>
              </div>
            )}

            <div style={{ borderTop: "2px dashed #e0e0e0" }} />

            {/* Results */}
            <div style={{ background: result ? (flash ? "#fffbf0" : "#fafafa") : "#fafafa", border: `2px solid ${result ? "#1a1a1a" : "#e0e0e0"}`, borderRadius: 2, padding: "20px", transition: "background 0.3s", boxShadow: result ? "4px 4px 0 #f5a623" : "none" }}>
              {result ? (
                <>
                  {/* Tab bar */}
                  <div style={{ display: "flex", gap: 0, marginBottom: 16, border: "2px solid #1a1a1a", borderRadius: 2, overflow: "hidden" }}>
                    {[{ id: "results", label: "Results" }, { id: "formulas", label: "Formulas" }, { id: "protection", label: "Protection" }].map(tab => (
                      <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                        flex: 1, padding: "7px 4px", border: "none",
                        borderLeft: tab.id !== "results" ? "1px solid #1a1a1a" : "none",
                        background: activeTab === tab.id ? "#f5a623" : "#fff",
                        color: "#1a1a1a", cursor: "pointer",
                        fontFamily: "'Courier New', monospace", fontSize: 10,
                        fontWeight: activeTab === tab.id ? 700 : 400,
                        letterSpacing: "0.05em", transition: "background 0.15s",
                      }}>
                        {tab.label.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  {/* Results tab */}
                  {activeTab === "results" && (
                    <>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                        {/* FLC */}
                        <div style={{ background: "#fff", border: "2px solid #1a1a1a", borderRadius: 2, padding: "14px", textAlign: "center" }}>
                          <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#888", fontFamily: "'Courier New', monospace", marginBottom: 4 }}>FULL LOAD CURRENT</div>
                          <div style={{ fontSize: 36, fontWeight: 700, color: "#1a1a1a", lineHeight: 1, letterSpacing: "-1px" }}>{result.flc}</div>
                          <div style={{ fontSize: 14, color: "#f5a623", fontWeight: 700, fontFamily: "'Courier New', monospace" }}>A</div>
                        </div>
                        {/* Inrush */}
                        <div style={{ background: "#1a1a1a", border: "2px solid #1a1a1a", borderRadius: 2, padding: "14px", textAlign: "center" }}>
                          <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#888", fontFamily: "'Courier New', monospace", marginBottom: 4 }}>INRUSH CURRENT</div>
                          <div style={{ fontSize: 36, fontWeight: 700, color: "#fff", lineHeight: 1, letterSpacing: "-1px" }}>{result.inrush}</div>
                          <div style={{ fontSize: 14, color: "#f5a623", fontWeight: 700, fontFamily: "'Courier New', monospace" }}>A</div>
                        </div>
                      </div>
                      {/* Method note */}
                      <div style={{ background: "#f5f2eb", border: "1px solid #e0ddd4", borderRadius: 2, padding: "8px 12px", marginBottom: 10 }}>
                        <div style={{ fontSize: 10, fontFamily: "'Courier New', monospace", color: "#888", marginBottom: 2 }}>{result.methodLabel}</div>
                        <div style={{ fontSize: 11, fontFamily: "'Courier New', monospace", color: "#555" }}>{result.methodNote} · {result.multiplier}× FLC</div>
                      </div>
                      {/* Secondary stats */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <MiniStat label="Input Power" value={`${result.inputPower} kW`} />
                        <MiniStat label="Output Power" value={`${getKw()?.toFixed(2)} kW`} />
                      </div>
                    </>
                  )}

                  {/* Formulas tab */}
                  {activeTab === "formulas" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <div>
                        <div style={{ fontSize: 10, color: "#aaa", fontFamily: "'Courier New', monospace", marginBottom: 4 }}>FULL LOAD CURRENT</div>
                        <div style={{ background: "#1a1a1a", padding: "10px 14px", borderRadius: 2, fontFamily: "'Courier New', monospace", fontSize: 11, color: "#f5a623", wordBreak: "break-all", lineHeight: 1.8 }}>
                          {result.formulaFLC}
                          <div style={{ color: "#666", marginTop: 4 }}>= {result.flc} A</div>
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: "#aaa", fontFamily: "'Courier New', monospace", marginBottom: 4 }}>INRUSH CURRENT</div>
                        <div style={{ background: "#1a1a1a", padding: "10px 14px", borderRadius: 2, fontFamily: "'Courier New', monospace", fontSize: 11, color: "#f5a623", wordBreak: "break-all", lineHeight: 1.8 }}>
                          {result.formulaInrush}
                        </div>
                      </div>
                      <div style={{ padding: "8px 12px", background: "#f5f2eb", border: "1px solid #e0ddd4", borderRadius: 2, fontSize: 10, color: "#888", fontFamily: "'Courier New', monospace", lineHeight: 1.7 }}>
                        η = efficiency · PF = power factor · V = line voltage<br/>
                        Reference: AS/NZS 1359 · IEC 60034
                      </div>
                    </div>
                  )}

                  {/* Protection tab */}
                  {activeTab === "protection" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <div style={{ background: "#fff", border: "2px solid #1a1a1a", borderRadius: 2, padding: "12px", textAlign: "center" }}>
                          <div style={{ fontSize: 9, letterSpacing: "0.1em", color: "#888", fontFamily: "'Courier New', monospace", marginBottom: 4 }}>MCB (TYPE D)</div>
                          <div style={{ fontSize: 28, fontWeight: 700, color: "#1a1a1a" }}>{result.mcb}A</div>
                          <div style={{ fontSize: 9, color: "#aaa", fontFamily: "'Courier New', monospace" }}>min. rating</div>
                        </div>
                        <div style={{ background: "#fff", border: "2px solid #1a1a1a", borderRadius: 2, padding: "12px", textAlign: "center" }}>
                          <div style={{ fontSize: 9, letterSpacing: "0.1em", color: "#888", fontFamily: "'Courier New', monospace", marginBottom: 4 }}>HRC FUSE</div>
                          <div style={{ fontSize: 28, fontWeight: 700, color: "#1a1a1a" }}>{result.fuse}A</div>
                          <div style={{ fontSize: 9, color: "#aaa", fontFamily: "'Courier New', monospace" }}>min. rating</div>
                        </div>
                      </div>
                      <div style={{ padding: "8px 12px", background: "#fff8e1", border: "1px solid #f5a623", borderRadius: 2, fontSize: 10, color: "#7a5c00", fontFamily: "'Courier New', monospace", lineHeight: 1.7 }}>
                        ⚠ Indicative sizing only. Verify against AS/NZS 3000 Table C3,
                        motor nameplate data, and protection coordination study.
                        Type D MCB recommended for motor circuits.
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "10px 0", color: "#bbb", fontFamily: "'Courier New', monospace", fontSize: 12 }}>Enter motor details to calculate</div>
              )}
            </div>
            <Disclaimer />
          </div>
        </div>
      </div>
      <Footer nav={nav} />
    </div>
  );
}

// ─── SHARED HELPERS ───────────────────────────────────────────────────────────

const inputStyle = {
  width: "100%", padding: "10px 12px", border: "2px solid #1a1a1a", borderRadius: 2,
  fontSize: 16, fontFamily: "'Georgia', serif", outline: "none", boxSizing: "border-box",
  background: "#fff", color: "#1a1a1a",
};

function CalcLabel({ children }) {
  return (
    <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1a1a1a", marginBottom: 8, fontFamily: "'Courier New', monospace" }}>{children}</label>
  );
}

function MiniStat({ label, value }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 2, padding: "8px 12px", textAlign: "center" }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>{value}</div>
      <div style={{ fontSize: 10, color: "#aaa", fontFamily: "'Courier New', monospace", marginTop: 2 }}>{label}</div>
    </div>
  );
}

function Disclaimer() {
  return (
    <p style={{ margin: 0, fontSize: 10, color: "#bbb", textAlign: "center", fontFamily: "'Courier New', monospace", lineHeight: 1.6 }}>
      Results for guidance only. Verify against current standards.<br />Not a substitute for engineering judgement.
    </p>
  );
}
