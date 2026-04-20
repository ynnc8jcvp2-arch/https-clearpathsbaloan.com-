import { useState, useEffect } from "react";
import Screener from "./pages/Screener";
import Checklist from "./pages/Checklist";
import Calculator from "./pages/Calculator";
import Learn from "./pages/Learn";
import Home from "./pages/Home";
import Compare from "./pages/Compare";

export type Page = "home" | "screener" | "checklist" | "calculator" | "learn" | "compare";

const NAV_ITEMS: [Page, string][] = [
  ["screener", "Eligibility Check"],
  ["checklist", "Doc Checklist"],
  ["calculator", "Loan Calculator"],
  ["compare", "Compare Programs"],
  ["learn", "SBA Guide"],
];

export function AdRect() {
  return <div className="ad-unit w-[300px] h-[250px] shrink-0" aria-label="Advertisement 300x250" />;
}

export function AdInFeed() {
  return (
    <div className="ad-unit w-full h-[90px] my-8" aria-label="Advertisement 728x90" />
  );
}

/* ── Logo mark component ──────────────────────────────────────────── */
function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "w-6 h-6 text-[9px]" : "w-7 h-7 text-[11px]";
  const wordmark = size === "sm" ? "text-[13px]" : "text-[14px]";
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`${box} bg-sky flex items-center justify-center text-white font-black shrink-0`}
        style={{ letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}
        aria-hidden="true"
      >
        CP
      </div>
      <div className={`flex items-baseline gap-1.5 ${wordmark}`}>
        <span className="font-black text-white tracking-tight">ClearPath</span>
        <span className="font-bold text-sky-light tracking-widest uppercase" style={{ fontSize: "10px" }}>SBA</span>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const nav = (p: Page) => {
    setPage(p);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#F7F7F5" }}>

      {/* ── HEADER ────────────────────────────────────────────────────── */}
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-navy-900/97 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.04),0_4px_16px_rgba(0,0,0,0.3)]"
            : "bg-navy-900"
        }`}
      >
        {/* Top leaderboard ad */}
        <div style={{ background: "#040B1A", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="max-w-7xl mx-auto px-4 py-1.5 flex justify-center">
            <div className="ad-unit w-full max-w-[728px] h-[50px]" style={{ color: "rgba(255,255,255,0.18)" }}>
              Advertisement · 728×50
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between" style={{ height: "56px" }}>

            {/* Logo */}
            <button
              onClick={() => nav("home")}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-light focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
              aria-label="ClearPath SBA — Home"
            >
              <Logo />
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0" aria-label="Main">
              {NAV_ITEMS.map(([p, label]) => (
                <button
                  key={p}
                  onClick={() => nav(p)}
                  className={`nav-underline px-4 py-2 text-[13px] font-medium transition-colors duration-150 ${
                    page === p ? "is-active text-white" : "text-white/55 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => nav("screener")}
                className="hidden sm:flex items-center gap-1.5 text-white text-[13px] font-semibold px-4 py-2 transition-all duration-150 hover:-translate-y-px"
                style={{ background: "#2563EB" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#1D4ED8")}
                onMouseLeave={e => (e.currentTarget.style.background = "#2563EB")}
              >
                Check Eligibility
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                  <path d="M2 5.5H9M6.5 2.5L9 5.5L6.5 8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <button
                onClick={() => setMobileOpen(o => !o)}
                className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M2 5H16M2 9H16M2 13H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          {mobileOpen && (
            <div
              className="md:hidden pb-3 pt-1"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)", animation: "fadeIn 0.2s ease-out both" }}
            >
              {NAV_ITEMS.map(([p, label]) => (
                <button
                  key={p}
                  onClick={() => nav(p)}
                  className={`w-full text-left px-3 py-2.5 text-sm font-medium transition-colors ${
                    page === p ? "text-white" : "text-white/65 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
              <div className="mt-2 px-3">
                <button
                  onClick={() => nav("screener")}
                  className="w-full text-white text-sm font-bold py-2.5 transition-colors"
                  style={{ background: "#2563EB" }}
                >
                  Check My Eligibility →
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Spacer: 50px top ad + 56px header */}
      <div style={{ height: "106px" }} aria-hidden="true" />

      {/* ── PAGE CONTENT ────────────────────────────────────────────── */}
      <main id="main-content" key={page} className="page-enter">
        {page === "home"       && <Home nav={nav} />}
        {page === "screener"   && <Screener nav={nav} />}
        {page === "checklist"  && <Checklist />}
        {page === "calculator" && <Calculator />}
        {page === "learn"      && <Learn nav={nav} />}
        {page === "compare"    && <Compare nav={nav} />}
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer role="contentinfo" style={{ background: "#060D1F", marginTop: "80px" }}>
        {/* Footer leaderboard */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "12px 0" }}>
          <div className="max-w-7xl mx-auto px-4 flex justify-center">
            <div
              className="ad-unit w-full max-w-[728px] h-[90px]"
              style={{ color: "rgba(255,255,255,0.18)" }}
            >
              Advertisement · 728×90
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6" style={{ padding: "48px 24px 36px" }}>
          <div className="grid md:grid-cols-4 gap-10 mb-10">

            <div className="md:col-span-1">
              {/* Footer logo */}
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-6 h-6 flex items-center justify-center text-white font-black"
                  style={{ background: "#2563EB", fontSize: "9px", letterSpacing: "-0.02em" }}
                >
                  CP
                </div>
                <span className="font-bold text-white text-sm tracking-tight">
                  ClearPath <span className="text-sky-light">SBA</span>
                </span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", lineHeight: "1.7" }}>
                Free tools for small business owners preparing for SBA loan applications.
                No account required, ever.
              </p>
            </div>

            <div>
              <div className="section-label mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Tools</div>
              <div className="flex flex-col gap-2.5">
                {NAV_ITEMS.map(([p, l]) => (
                  <button
                    key={p}
                    onClick={() => nav(p)}
                    className="text-left text-xs transition-colors duration-150"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "white")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="section-label mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
                Official Resources
              </div>
              <div className="flex flex-col gap-2.5">
                {[
                  ["https://lendermatch.sba.gov", "SBA Lender Match"],
                  ["https://www.sba.gov/funding-programs/loans", "SBA.gov — Loan Programs"],
                  ["https://www.score.org", "SCORE — Free Mentors"],
                  ["https://annualcreditreport.com", "Annual Credit Report"],
                ].map(([href, label]) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs transition-colors duration-150"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "white")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="section-label mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Disclaimer</div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", lineHeight: "1.75" }}>
                Informational purposes only. Not legal or financial advice.
                SBA loan decisions are made by individual lenders under their own underwriting criteria.
                Not affiliated with the U.S. Small Business Administration.
              </p>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "24px", display: "flex", flexDirection: "column", gap: "6px" }}>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2" style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>
              <span>© 2026 ClearPath SBA. Educational use only.</span>
              <span>Not endorsed by or affiliated with the U.S. SBA.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
