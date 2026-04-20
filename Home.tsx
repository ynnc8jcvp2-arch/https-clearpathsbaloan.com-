import { AdRect, AdInFeed, type Page } from "../App";

const TOOLS = [
  {
    page: "screener" as Page,
    num: "01",
    title: "Eligibility Screener",
    desc: "Ten questions. Plain-English go/no-go verdict. Identifies every common disqualifier — credit, ownership, loan purpose, federal history — before you spend weeks applying.",
    cta: "Check My Eligibility",
    badge: "Most Popular",
  },
  {
    page: "checklist" as Page,
    num: "02",
    title: "Document Checklist",
    desc: "Personalized by loan type, entity structure, and purpose. The exact documents your SBA loan application needs — not a generic PDF.",
    cta: "Build My Checklist",
    badge: null,
  },
  {
    page: "calculator" as Page,
    num: "03",
    title: "Loan Calculator",
    desc: "Monthly payment, total interest, and full amortization table. Built for all major SBA programs with accurate rate ranges and term limits.",
    cta: "Calculate My Payment",
    badge: null,
  },
  {
    page: "compare" as Page,
    num: "04",
    title: "Program Comparison",
    desc: "Side-by-side comparison of SBA 7(a), 504, Express, and Microloan. Rates, terms, use cases, and pros/cons — pick the right program before you apply.",
    cta: "Compare Programs",
    badge: "New",
  },
  {
    page: "learn" as Page,
    num: "05",
    title: "SBA Loan Guide",
    desc: "Eight in-depth articles on loan types, credit requirements, timelines, rejection reasons, and SBA vs. conventional loans — with specific steps to address each one.",
    cta: "Start Reading",
    badge: null,
  },
];

const FAQS = [
  {
    q: "How long does an SBA loan take?",
    a: "Typically 30–90 days from a complete application to funding. SBA Express can close in 2–4 weeks. Incomplete documentation is the most common cause of delays — use the Document Checklist to submit a complete package the first time.",
  },
  {
    q: "What credit score do I need for an SBA loan?",
    a: "Most SBA lenders require a personal credit score of 650 or higher. The SBA's SBSS composite score (0–300 scale) also factors in business credit and financials — a score above 155 typically accelerates SBA review.",
  },
  {
    q: "Do I need collateral to get an SBA loan?",
    a: "Lenders must take available collateral, but the SBA will not deny a loan solely for its absence. Personal guarantees from all 20%-or-more owners are always required, regardless of collateral.",
  },
  {
    q: "Can a startup qualify for an SBA loan?",
    a: "Standard 7(a) loans are very difficult for startups with no revenue history. SBA Microloans (up to $50,000 through nonprofit lenders) have more flexible requirements for newer businesses and often include mentoring.",
  },
  {
    q: "Why do SBA loans get rejected?",
    a: "The five most common rejection reasons are: credit score below lender thresholds (650+), insufficient cash flow (lenders require a debt service coverage ratio of 1.25 or higher), incomplete application documentation, ineligible business type or loan purpose, and unresolved federal debt or prior SBA default. The Eligibility Screener catches all of these upfront.",
  },
  {
    q: "What is the SBA 7(a) loan maximum amount?",
    a: "The SBA 7(a) program has a maximum loan amount of $5 million. SBA Express is capped at $500,000. The 504 program goes up to $5.5 million (and higher for manufacturers). SBA Microloans max out at $50,000.",
  },
  {
    q: "What is the difference between SBA 7(a) and SBA 504?",
    a: "The 7(a) is general-purpose — working capital, equipment, acquisitions, or real estate — with a variable rate tied to prime. The 504 is strictly for major fixed assets (commercial real estate and large equipment) and offers a fixed rate on the SBA portion for 10 or 20 years. Use the Program Comparison tool to see a full side-by-side breakdown.",
  },
  {
    q: "Is an SBA loan better than a conventional bank loan?",
    a: "For most small businesses, yes. SBA loans offer lower rates, longer terms (up to 25 years for real estate vs. typically 5–10 years for conventional), and lower down payments. The tradeoff is more paperwork and a longer approval process (30–90 days vs. days for some conventional loans). The SBA guarantee reduces lender risk, which is why banks offer terms they wouldn't extend otherwise.",
  },
];

export default function Home({ nav }: { nav: (p: Page) => void }) {
  return (
    <div>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section
        className="gradient-hero text-white relative overflow-hidden"
        aria-labelledby="hero-heading"
      >
        {/* Dot-grid texture overlay */}
        <div className="hero-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

        {/* Subtle right-side accent glow */}
        <div
          className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 80% 50%, rgba(37,99,235,0.12) 0%, transparent 65%)"
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative" style={{ paddingTop: "72px", paddingBottom: "80px" }}>
          <div style={{ maxWidth: "640px" }}>

            <div className="hero-badge inline-flex items-center gap-2 mb-7" style={{
              border: "1px solid rgba(255,255,255,0.12)",
              padding: "6px 14px",
              fontSize: "11px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.65)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}>
              <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" aria-hidden="true" />
              Free · No sign-up · Based on official SBA guidelines
            </div>

            <h1
              id="hero-heading"
              className="hero-h1 text-balance"
              style={{
                fontSize: "clamp(36px, 5vw, 60px)",
                fontWeight: 900,
                lineHeight: "1.03",
                marginBottom: "24px",
                letterSpacing: "-0.03em",
              }}
            >
              Know exactly where you stand on your SBA loan.
            </h1>

            <p
              className="hero-body"
              style={{
                fontSize: "16px",
                color: "rgba(255,255,255,0.60)",
                lineHeight: "1.7",
                marginBottom: "36px",
                maxWidth: "480px",
              }}
            >
              Most applicants are rejected for reasons they could have caught upfront.
              ClearPath gives you the same clarity a $400/hr consultant would — free.
            </p>

            <div className="hero-ctas flex flex-wrap gap-3">
              <button
                onClick={() => nav("screener")}
                className="btn-primary"
                aria-label="Check my SBA loan eligibility"
              >
                Check My Eligibility
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <path d="M2 6.5H11M7.5 3L11 6.5L7.5 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={() => nav("calculator")}
                className="btn-ghost"
                aria-label="Calculate my SBA loan payment"
              >
                Calculate My Payment
              </button>
            </div>
          </div>
        </div>

        {/* Bottom edge divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} aria-hidden="true" />
      </section>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-6 lg:px-8"
        style={{ paddingTop: "64px", paddingBottom: "40px" }}
        aria-label="Tools"
      >
        <div className="flex gap-10 xl:gap-16">

          {/* Left column */}
          <div className="flex-1 min-w-0">

            {/* Section header */}
            <div className="s1" style={{ marginBottom: "28px" }}>
              <p className="section-label" style={{ marginBottom: "8px" }}>What you get</p>
              <h2 style={{ fontSize: "26px", fontWeight: 900, color: "#0F172A", margin: 0 }}>
                Five free tools. One clear path.
              </h2>
              <p style={{ fontSize: "14px", color: "#64748B", marginTop: "6px" }}>
                No account. No subscription. No sales calls.
              </p>
            </div>

            {/* Tool cards — responsive grid, sharp borders, hover accent */}
            <div
              className="s2"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1px",
                background: "#D8D8D4",
                border: "1px solid #D8D8D4",
                marginBottom: "48px",
              }}
            >
              {TOOLS.map((t) => (
                <article
                  key={t.page}
                  className="tool-card"
                  onClick={() => nav(t.page)}
                  style={{
                    background: "#FFFFFF",
                    padding: "24px",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#FAFAF8")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#FFFFFF")}
                  role="button"
                  tabIndex={0}
                  aria-label={`${t.title} — ${t.cta}`}
                  onKeyDown={e => e.key === "Enter" && nav(t.page)}
                >
                  {t.badge && (
                    <span
                      style={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        background: "#060D1F",
                        color: "white",
                        fontSize: "9px",
                        fontWeight: 700,
                        padding: "2px 8px",
                        letterSpacing: "0.10em",
                        textTransform: "uppercase",
                      }}
                    >
                      {t.badge}
                    </span>
                  )}

                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#C0C0BC",
                      letterSpacing: "0.14em",
                      fontFamily: "monospace",
                      marginBottom: "14px",
                    }}
                  >
                    {t.num}
                  </div>

                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0F172A", marginBottom: "8px" }}>
                    {t.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "#64748B", lineHeight: "1.6", marginBottom: "20px" }}>
                    {t.desc}
                  </p>

                  <div
                    className="group-cta"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#2563EB",
                    }}
                  >
                    {t.cta}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M1.5 6H10.5M7 2.5L10.5 6L7 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </article>
              ))}
            </div>

            {/* In-feed ad */}
            <AdInFeed />

            {/* FAQ */}
            <section className="s3" aria-labelledby="faq-heading" style={{ marginTop: "8px" }}>
              <div style={{ marginBottom: "20px" }}>
                <p className="section-label" style={{ marginBottom: "8px" }}>Common questions</p>
                <h2 id="faq-heading" style={{ fontSize: "22px", fontWeight: 900, color: "#0F172A", margin: 0 }}>
                  Before you apply, know this.
                </h2>
              </div>

              <div style={{ border: "1px solid #E0E0DC" }}>
                {FAQS.map((f, i) => (
                  <div
                    key={f.q}
                    style={{
                      padding: "20px 24px",
                      borderBottom: i < FAQS.length - 1 ? "1px solid #E8E8E4" : "none",
                      background: "white",
                    }}
                  >
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A", marginBottom: "6px" }}>
                      {f.q}
                    </div>
                    <div style={{ fontSize: "13px", color: "#64748B", lineHeight: "1.65" }}>
                      {f.a}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Trust bar */}
            <div
              className="s4"
              style={{
                marginTop: "32px",
                border: "1px solid #E0E0DC",
                background: "white",
                padding: "20px 24px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "16px",
                }}
              >
                {[
                  { label: "Always free", desc: "No subscription or account — ever." },
                  { label: "SBA-sourced", desc: "Based directly on current SBA SOP guidelines." },
                  { label: "Informational only", desc: "Your lender makes the actual credit decision." },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        background: "#10B981",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: "1px",
                      }}
                    >
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
                        <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#0F172A" }}>{item.label}</div>
                      <div style={{ fontSize: "12px", color: "#64748B", lineHeight: "1.5" }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Sidebar ─────────────────────────────────────────────── */}
          <aside
            className="hidden xl:flex flex-col gap-5"
            style={{ width: "300px", flexShrink: 0 }}
            aria-label="Sidebar"
          >
            <div className="sticky" style={{ top: "120px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <AdRect />

              {/* Email capture */}
              <div style={{ background: "#0A1628", padding: "20px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#3B82F6",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  Free Newsletter
                </div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "white", marginBottom: "8px", lineHeight: "1.3" }}>
                  Get SBA rule change alerts
                </h3>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: "1.65", marginBottom: "14px" }}>
                  SBA guidelines change. We'll email you when updates affect borrower eligibility — free, no spam.
                </p>
                <input
                  type="email"
                  placeholder="you@company.com"
                  aria-label="Email address for newsletter"
                  className="field-input"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    color: "white",
                    marginBottom: "8px",
                  }}
                />
                <button
                  className="w-full text-white text-sm font-semibold py-2 transition-colors duration-150"
                  style={{ background: "#2563EB" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#1D4ED8")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#2563EB")}
                >
                  Subscribe Free
                </button>
              </div>

              <AdRect />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
