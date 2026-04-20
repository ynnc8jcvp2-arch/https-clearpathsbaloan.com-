import { useState } from "react";
import { AdRect, AdInFeed, type Page } from "../App";

const PROGRAMS = [
  {
    id: "7a",
    name: "SBA 7(a)",
    badge: "Most Popular",
    badgeColor: "#2563EB",
    max: "$5 million",
    term: "Up to 25 yrs (RE) / 10 yrs (equipment, working capital)",
    rate: "Prime + 2.75% – 6.5% (variable)",
    fee: "0.5% – 3.5% of guaranteed portion",
    down: "10% – 30% (lender discretion)",
    creditMin: "650+",
    timeToFund: "30–90 days",
    sbsMin: "155 SBSS",
    twoLender: false,
    bestFor: ["Working capital", "Business acquisitions", "Equipment", "Leasehold improvements", "Commercial real estate", "Business lines of credit"],
    notFor: ["Investment/rental real estate", "Passive income businesses"],
    pros: ["Flexible use of proceeds", "Single lender — simpler closing", "Lines of credit available", "Works for nearly any eligible business purpose", "Refinancing of existing business debt allowed"],
    cons: ["Variable rate (rises with prime)", "Higher guarantee fee for large loans", "More paperwork than conventional loans", "Personal guarantee always required"],
    highlight: "Best for: businesses that need flexibility or aren't buying a major fixed asset.",
  },
  {
    id: "504",
    name: "SBA 504",
    badge: "Best for Real Estate",
    badgeColor: "#0891B2",
    max: "$5.5 million (up to $16.5M for manufacturers)",
    term: "10 or 20 years (fixed)",
    rate: "Fixed ~5.5%–6.5% on CDC portion; market rate on bank portion",
    fee: "~2.65% of the debenture amount (financed in)",
    down: "10% (15% for startups or special-use property)",
    creditMin: "650+",
    timeToFund: "45–90 days",
    sbsMin: "155 SBSS",
    twoLender: true,
    bestFor: ["Commercial real estate purchase", "Heavy machinery / large equipment", "Building construction or renovation", "Businesses wanting rate certainty for 20 years"],
    notFor: ["Working capital", "Inventory", "Business acquisitions", "Investment/rental real estate", "Refinancing of existing debt (limited)"],
    pros: ["Fixed rate for 10 or 20 years — no rate risk", "Lower effective rate for real estate vs. 7(a)", "Higher loan limits for manufacturers", "Preserves working capital (lower down payment for real estate)"],
    cons: ["Two-lender structure adds complexity", "Strictly for fixed assets — zero working capital", "Longer and more complex closing process", "Must create or retain 1 job per $95K borrowed (CDC portion)"],
    highlight: "Best for: profitable businesses buying owner-occupied real estate or large equipment and wanting rate certainty.",
  },
  {
    id: "express",
    name: "SBA Express",
    badge: "Fastest Approval",
    badgeColor: "#7C3AED",
    max: "$500,000",
    term: "Up to 10 years",
    rate: "Prime + 4.5% (variable)",
    fee: "No guarantee fee on loans ≤ $150K",
    down: "Varies; lender discretion",
    creditMin: "680+",
    timeToFund: "2–4 weeks",
    sbsMin: "No formal SBSS minimum",
    twoLender: false,
    bestFor: ["Businesses that need funds quickly", "Revolving lines of credit", "Smaller loan amounts", "Businesses with strong credit profiles"],
    notFor: ["Large loan amounts over $500K", "Businesses with credit challenges", "Complex transactions"],
    pros: ["SBA responds in 36 hours (vs. 5–10 days for standard 7(a))", "Revolving lines of credit available", "Lower fees for loans under $150K", "Streamlined documentation"],
    cons: ["Higher interest rate than standard 7(a)", "Lower maximum ($500K vs. $5M)", "Less SBA guarantee (50% vs. 75–85%) means stricter lender requirements", "Credit standards are higher"],
    highlight: "Best for: businesses with strong credit that need speed and don't need more than $500K.",
  },
  {
    id: "microloan",
    name: "SBA Microloan",
    badge: "Best for Startups",
    badgeColor: "#059669",
    max: "$50,000 (avg: $13,000)",
    term: "Up to 6 years",
    rate: "8%–13% (set by intermediary lender)",
    fee: "Varies by intermediary",
    down: "Varies; often lower requirements",
    creditMin: "~620+ (varies by intermediary)",
    timeToFund: "2–8 weeks",
    sbsMin: "No SBSS requirement",
    twoLender: false,
    bestFor: ["Startups and very new businesses", "Very small loan needs", "Businesses with limited credit history", "Underserved entrepreneurs", "Businesses that need mentoring support"],
    notFor: ["Loan amounts over $50K", "Real estate purchase", "Refinancing existing debt"],
    pros: ["More flexible credit requirements", "Nonprofit intermediaries often provide technical assistance", "Great for building business credit history", "No SBA guarantee fee"],
    cons: ["Very small loan limits ($50K max)", "Higher interest rates than 7(a)", "Must use an SBA-approved intermediary nonprofit", "Cannot be used for real estate or debt payoff"],
    highlight: "Best for: startups, very small businesses, and entrepreneurs who need capital plus mentoring.",
  },
];

const COMPARE_ROWS: { label: string; key: keyof typeof PROGRAMS[0] }[] = [
  { label: "Maximum Loan", key: "max" },
  { label: "Loan Term", key: "term" },
  { label: "Interest Rate", key: "rate" },
  { label: "Guarantee Fee", key: "fee" },
  { label: "Down Payment", key: "down" },
  { label: "Min. Credit Score", key: "creditMin" },
  { label: "Time to Funding", key: "timeToFund" },
  { label: "Min. Credit Score (SBSS)", key: "sbsMin" },
];

const USE_CASES = [
  { q: "Buying a commercial building", winner: "504", why: "Fixed rate, lower effective cost for real estate, 10%–15% down" },
  { q: "Working capital or cash flow gap", winner: "7a", why: "Only 7(a) and Express can fund working capital" },
  { q: "Acquiring an existing business", winner: "7a", why: "504 cannot fund acquisitions; 7(a) can" },
  { q: "Buying equipment under $500K quickly", winner: "express", why: "Faster SBA approval (36 hours) for qualified borrowers" },
  { q: "Starting a business with thin credit", winner: "microloan", why: "More flexible underwriting through nonprofit intermediaries" },
  { q: "Large manufacturing equipment", winner: "504", why: "Higher limits for manufacturers; 20-year fixed rate" },
  { q: "Business line of credit", winner: "express", why: "Express is the only SBA program with a true revolving LOC" },
  { q: "Small startup with under $50K needed", winner: "microloan", why: "Purpose-built for small startup capital needs" },
];

const FAQS = [
  { q: "Can I use an SBA 7(a) loan to buy real estate?", a: "Yes — the 7(a) can fund commercial real estate purchases with a term up to 25 years. The 504 is often a better choice for owner-occupied real estate because it offers a fixed rate and lower effective cost, but 7(a) is more flexible if you also need working capital or have other uses for the loan." },
  { q: "What is the difference between SBA 504 and 7(a)?", a: "The core difference is purpose and structure. The 7(a) is general-purpose (any eligible business use, one lender, variable rate). The 504 is strictly for fixed assets like real estate and large equipment, involves two lenders (a bank and a CDC), and carries a fixed rate on the SBA/CDC portion for 10 or 20 years. If you want rate certainty for a major real estate or equipment purchase, 504 often wins. For flexibility, working capital, or acquisitions, choose 7(a)." },
  { q: "Which SBA loan has the lowest interest rate?", a: "SBA 504 typically has the lowest effective rate for real estate and equipment financing because the CDC portion is fixed at a rate tied to 10-year Treasury notes. Standard 7(a) rates for loans over $250K (Prime + 2.75%) are competitive but variable. SBA Express carries a slightly higher spread (Prime + 4.5%). Microloans have the highest rates (8%–13%) but serve borrowers who often can't access other programs." },
  { q: "Can you have both an SBA 7(a) and 504 loan at the same time?", a: "Yes — the SBA allows borrowers to have multiple outstanding SBA loans, provided the combined exposure doesn't exceed program limits and you can demonstrate ability to repay both. For example, you might use a 7(a) for working capital and a 504 to purchase a building simultaneously." },
  { q: "What is the SBA Express loan and how fast is approval?", a: "SBA Express is a subset of the 7(a) program where approved lenders have delegated authority to approve loans up to $500K without SBA review. The SBA's response time is guaranteed at 36 hours (versus 5–10 business days for standard 7(a)). Total time to funding is typically 2–4 weeks. The tradeoff is a higher rate (Prime + 4.5%) and lower SBA guarantee (50% instead of 75–85%)." },
];

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "10px",
  fontWeight: 700,
  color: "#64748B",
  letterSpacing: "0.10em",
  textTransform: "uppercase",
  marginBottom: "6px",
};

export default function Compare({ nav }: { nav: (p: Page) => void }) {
  const [selected, setSelected] = useState<string[]>(["7a", "504"]);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.length > 1 ? prev.filter(x => x !== id) : prev
        : [...prev, id]
    );
  };

  const activeProg = PROGRAMS.filter(p => selected.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 page-enter">
      <div className="flex gap-10 xl:gap-14">
        <div className="flex-1 min-w-0">

          {/* Header */}
          <div className="s1" style={{ marginBottom: "28px" }}>
            <p className="section-label" style={{ marginBottom: "6px" }}>Side-by-side tool</p>
            <h1 style={{ fontSize: "26px", fontWeight: 900, color: "#0F172A", margin: 0 }}>
              SBA Loan Program Comparison
            </h1>
            <p style={{ fontSize: "14px", color: "#64748B", marginTop: "6px" }}>
              Compare SBA 7(a), 504, Express, and Microloan side-by-side. Select any programs to compare.
            </p>
          </div>

          {/* Program selector */}
          <div className="s2" style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
            {PROGRAMS.map(p => (
              <button
                key={p.id}
                onClick={() => toggle(p.id)}
                style={{
                  padding: "8px 16px",
                  fontSize: "13px",
                  fontWeight: 600,
                  background: selected.includes(p.id) ? p.badgeColor : "white",
                  color: selected.includes(p.id) ? "white" : "#64748B",
                  border: `1.5px solid ${selected.includes(p.id) ? p.badgeColor : "#E2E8F0"}`,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {p.name}
              </button>
            ))}
            <span style={{ fontSize: "12px", color: "#94A3B8", alignSelf: "center", marginLeft: "4px" }}>
              Select 2+ to compare
            </span>
          </div>

          {/* Comparison table */}
          <div className="s3" style={{ background: "white", border: "1px solid #E0E0DC", overflowX: "auto", marginBottom: "20px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "#F7F7F5", borderBottom: "1px solid #E0E0DC" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "10px", fontWeight: 700, color: "#64748B", letterSpacing: "0.08em", textTransform: "uppercase", width: "160px" }}>
                    Factor
                  </th>
                  {activeProg.map(p => (
                    <th key={p.id} style={{ padding: "12px 16px", textAlign: "left" }}>
                      <div style={{ fontSize: "14px", fontWeight: 800, color: "#0F172A" }}>{p.name}</div>
                      <div style={{ display: "inline-block", fontSize: "9px", fontWeight: 700, color: "white", background: p.badgeColor, padding: "2px 6px", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: "4px" }}>
                        {p.badge}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr key={row.key} style={{ background: i % 2 === 0 ? "white" : "#FAFAF8", borderBottom: "1px solid #F1F1EE" }}>
                    <td style={{ padding: "10px 16px", fontWeight: 600, color: "#64748B", fontSize: "12px", verticalAlign: "top" }}>
                      {row.label}
                    </td>
                    {activeProg.map(p => (
                      <td key={p.id} style={{ padding: "10px 16px", color: "#0F172A", verticalAlign: "top" }}>
                        {String(p[row.key])}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr style={{ background: "#F0F4FF", borderBottom: "1px solid #E0E0DC" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 700, color: "#64748B", fontSize: "12px", verticalAlign: "top" }}>
                    Two-Lender Structure
                  </td>
                  {activeProg.map(p => (
                    <td key={p.id} style={{ padding: "12px 16px", verticalAlign: "top" }}>
                      {p.twoLender
                        ? <span style={{ color: "#F59E0B", fontWeight: 700 }}>Yes (Bank + CDC)</span>
                        : <span style={{ color: "#10B981", fontWeight: 700 }}>No — single lender</span>}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Best for / not for cards */}
          <div
            className="s4"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(activeProg.length, 2)}, 1fr)`,
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            {activeProg.map(p => (
              <div key={p.id} style={{ background: "white", border: "1px solid #E0E0DC", padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                  <div style={{ width: "10px", height: "10px", background: p.badgeColor, flexShrink: 0 }} />
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#0F172A" }}>{p.name}</span>
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <label style={labelStyle}>Best for</label>
                  {p.bestFor.map(item => (
                    <div key={item} style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "5px" }}>
                      <div style={{ width: "6px", height: "6px", background: "#10B981", marginTop: "5px", flexShrink: 0 }} />
                      <span style={{ fontSize: "12px", color: "#334155" }}>{item}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: "14px" }}>
                  <label style={labelStyle}>Not for</label>
                  {p.notFor.map(item => (
                    <div key={item} style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "5px" }}>
                      <div style={{ width: "6px", height: "6px", background: "#EF4444", marginTop: "5px", flexShrink: 0 }} />
                      <span style={{ fontSize: "12px", color: "#334155" }}>{item}</span>
                    </div>
                  ))}
                </div>

                <div style={{ borderLeft: "3px solid " + p.badgeColor, paddingLeft: "12px", fontSize: "12px", color: "#64748B", fontStyle: "italic" }}>
                  {p.highlight}
                </div>
              </div>
            ))}
          </div>

          <AdInFeed />

          {/* Use case matcher */}
          <div className="s5" style={{ marginBottom: "24px" }}>
            <div style={{ marginBottom: "16px" }}>
              <p className="section-label" style={{ marginBottom: "6px" }}>Quick decision guide</p>
              <h2 style={{ fontSize: "20px", fontWeight: 900, color: "#0F172A", margin: 0 }}>
                Which loan fits your situation?
              </h2>
            </div>
            <div style={{ border: "1px solid #E0E0DC", background: "white" }}>
              {USE_CASES.map((uc, i) => {
                const prog = PROGRAMS.find(p => p.id === uc.winner)!;
                return (
                  <div
                    key={uc.q}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "14px 16px",
                      borderBottom: i < USE_CASES.length - 1 ? "1px solid #F1F1EE" : "none",
                      background: i % 2 === 0 ? "white" : "#FAFAF8",
                    }}
                  >
                    <div style={{ flex: 1, fontSize: "13px", color: "#0F172A", fontWeight: 500 }}>{uc.q}</div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px", flexShrink: 0 }}>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "white", background: prog.badgeColor, padding: "2px 8px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                        {prog.name}
                      </div>
                      <div style={{ fontSize: "11px", color: "#94A3B8" }}>{uc.why}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pros / cons for selected */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ marginBottom: "16px" }}>
              <p className="section-label" style={{ marginBottom: "6px" }}>Advantages & trade-offs</p>
              <h2 style={{ fontSize: "20px", fontWeight: 900, color: "#0F172A", margin: 0 }}>
                Pros and cons compared
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(activeProg.length, 2)}, 1fr)`, gap: "12px" }}>
              {activeProg.map(p => (
                <div key={p.id} style={{ background: "white", border: "1px solid #E0E0DC", padding: "20px" }}>
                  <div style={{ fontSize: "14px", fontWeight: 800, color: "#0F172A", marginBottom: "14px" }}>{p.name}</div>
                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ ...labelStyle, color: "#10B981" }}>Advantages</label>
                    {p.pros.map(pro => (
                      <div key={pro} style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "6px" }}>
                        <svg style={{ flexShrink: 0, marginTop: "2px" }} width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L4.5 8.5L10 3.5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span style={{ fontSize: "12px", color: "#334155" }}>{pro}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={{ ...labelStyle, color: "#EF4444" }}>Trade-offs</label>
                    {p.cons.map(con => (
                      <div key={con} style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "6px" }}>
                        <svg style={{ flexShrink: 0, marginTop: "2px" }} width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 9.5L9.5 2.5M9.5 9.5L2.5 2.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        <span style={{ fontSize: "12px", color: "#334155" }}>{con}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ marginBottom: "16px" }}>
              <p className="section-label" style={{ marginBottom: "6px" }}>Common questions</p>
              <h2 style={{ fontSize: "20px", fontWeight: 900, color: "#0F172A", margin: 0 }}>
                SBA loan comparison FAQ
              </h2>
            </div>
            <div style={{ border: "1px solid #E0E0DC", background: "white" }}>
              {FAQS.map((f, i) => (
                <div key={f.q} style={{ padding: "18px 20px", borderBottom: i < FAQS.length - 1 ? "1px solid #E8E8E4" : "none" }}>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A", marginBottom: "6px" }}>{f.q}</div>
                  <div style={{ fontSize: "13px", color: "#64748B", lineHeight: "1.65" }}>{f.a}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ background: "#060D1F", backgroundImage: "radial-gradient(circle at 80% 50%, rgba(37,99,235,0.15) 0%, transparent 60%)", padding: "28px 24px", color: "white" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 900, margin: "0 0 6px" }}>Know which loan you want?</h2>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", margin: "0 0 18px" }}>
              Check your eligibility, build your document checklist, or estimate your monthly payment — free, in minutes.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <button onClick={() => nav("screener")} className="btn-primary">Check My Eligibility →</button>
              <button onClick={() => nav("checklist")} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "white", fontSize: "13px", fontWeight: 600, padding: "10px 18px", cursor: "pointer" }}>Build Doc Checklist</button>
              <button onClick={() => nav("calculator")} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "white", fontSize: "13px", fontWeight: 600, padding: "10px 18px", cursor: "pointer" }}>Calculate Payment</button>
            </div>
          </div>

          <p style={{ fontSize: "11px", color: "#94A3B8", marginTop: "12px" }}>
            Disclaimer: Program details are for informational purposes only. Actual terms vary by lender. SBA guidelines are updated periodically — verify current requirements with your lender or SBA.gov.
          </p>
        </div>

        {/* Sidebar */}
        <aside className="hidden xl:flex flex-col gap-5 w-[300px] shrink-0" aria-label="Sidebar">
          <div className="sticky" style={{ top: "120px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <AdRect />

            <div style={{ background: "white", border: "1px solid #E0E0DC", padding: "20px" }}>
              <div className="section-label" style={{ marginBottom: "12px" }}>Program at a glance</div>
              {PROGRAMS.map(p => (
                <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #F1F1EE", fontSize: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ width: "6px", height: "6px", background: p.badgeColor }} />
                    <span style={{ fontWeight: 600, color: "#0F172A" }}>{p.name}</span>
                  </div>
                  <span style={{ color: "#64748B" }}>{p.max.split(" (")[0]}</span>
                </div>
              ))}
              <p style={{ fontSize: "11px", color: "#94A3B8", marginTop: "10px" }}>Max loan amounts shown</p>
            </div>

            <div style={{ background: "#0A1628", padding: "20px", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "#3B82F6", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "8px" }}>Not sure which fits?</div>
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: "white", marginBottom: "8px", lineHeight: "1.3" }}>Run the Eligibility Screener</h3>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: "1.65", marginBottom: "14px" }}>10 questions. Plain-English verdict. Catches every common disqualifier.</p>
              <button
                onClick={() => nav("screener")}
                style={{ width: "100%", background: "#2563EB", color: "white", fontSize: "13px", fontWeight: 600, padding: "10px", border: "none", cursor: "pointer" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#1D4ED8")}
                onMouseLeave={e => (e.currentTarget.style.background = "#2563EB")}
              >
                Check My Eligibility →
              </button>
            </div>

            <AdRect />
          </div>
        </aside>
      </div>
    </div>
  );
}
