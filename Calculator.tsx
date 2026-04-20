import { useState, useMemo } from "react";
import { AdRect } from "../App";

function pmt(rate: number, nper: number, pv: number) {
  if (rate === 0) return pv / nper;
  return (rate * pv * Math.pow(1 + rate, nper)) / (Math.pow(1 + rate, nper) - 1);
}

const PROGRAMS = [
  { id: "7a_25",   label: "7(a) Real Estate",                maxY: 25, note: "Up to 25 years · Prime + 2.75%" },
  { id: "7a_10",   label: "7(a) Equipment / Working Capital", maxY: 10, note: "Up to 10 years · Prime + 2.75%" },
  { id: "express", label: "SBA Express",                      maxY: 10, note: "Up to 10 years · Prime + 4.5%"  },
  { id: "504",     label: "SBA 504 (CDC portion)",            maxY: 20, note: "Up to 20 years · Fixed ~6–7%"   },
];

const RATES = [
  ["7(a) ≤ $50K",      "Prime + 6.5%"],
  ["7(a) $50K–$250K",  "Prime + 4.5%"],
  ["7(a) > $250K",     "Prime + 2.75%"],
  ["SBA Express",      "Prime + 4.5%"],
  ["504 (CDC portion)","Fixed ~6–7%"],
];

const fieldStyle: React.CSSProperties = {
  width: "100%",
  border: "1.5px solid #E2E8F0",
  background: "white",
  padding: "8px 12px",
  fontSize: "14px",
  color: "#0F172A",
  outline: "none",
  transition: "border-color 0.15s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "10px",
  fontWeight: 700,
  color: "#64748B",
  letterSpacing: "0.10em",
  textTransform: "uppercase",
  marginBottom: "8px",
};

export default function Calculator() {
  const [amount, setAmount] = useState("500000");
  const [rateStr, setRateStr] = useState("11.5");
  const [years, setYears] = useState("10");
  const [prog, setProg] = useState("7a_10");
  const [showAmort, setShowAmort] = useState(false);

  const principal  = parseFloat(amount.replace(/,/g, "")) || 0;
  const annualRate = parseFloat(rateStr) / 100 || 0;
  const n          = parseInt(years) * 12;
  const mr         = annualRate / 12;
  const monthly    = useMemo(() => principal > 0 && n > 0 ? pmt(mr, n, principal) : 0, [principal, mr, n]);
  const total      = monthly * n;
  const interest   = total - principal;
  const pct        = total > 0 ? (interest / total * 100) : 0;

  const fmt  = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const fmt2 = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const amort = useMemo(() => {
    if (!showAmort || principal <= 0) return [];
    let bal = principal;
    return Array.from({ length: Math.min(n, 60) }, (_, i) => {
      const int = bal * mr;
      const pri = monthly - int;
      bal = Math.max(0, bal - pri);
      return { m: i + 1, pay: monthly, pri, int, bal };
    });
  }, [showAmort, principal, monthly, mr, n]);

  const maxY = PROGRAMS.find(p => p.id === prog)?.maxY || 25;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 page-enter">
      <div className="flex gap-10 xl:gap-14">
        <div className="flex-1 min-w-0">

          <div className="s1" style={{ marginBottom: "28px" }}>
            <p className="section-label" style={{ marginBottom: "6px" }}>Payment estimator</p>
            <h1 style={{ fontSize: "26px", fontWeight: 900, color: "#0F172A", margin: 0 }}>
              SBA Loan Calculator
            </h1>
            <p style={{ fontSize: "14px", color: "#64748B", marginTop: "6px" }}>
              Estimate your monthly payment, total interest, and full amortization schedule.
            </p>
          </div>

          {/* ── Inputs + Results grid ── */}
          <div className="s2" style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: "16px", marginBottom: "20px" }}>

            {/* Inputs */}
            <div style={{ background: "white", border: "1px solid #E0E0DC", padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>

              <div>
                <label style={labelStyle}>Loan Program</label>
                <select
                  value={prog}
                  onChange={e => {
                    setProg(e.target.value);
                    const p = PROGRAMS.find(p => p.id === e.target.value);
                    if (p && parseInt(years) > p.maxY) setYears(String(p.maxY));
                  }}
                  style={{ ...fieldStyle, cursor: "pointer" }}
                  onFocus={e => (e.target.style.borderColor = "#2563EB")}
                  onBlur={e => (e.target.style.borderColor = "#E2E8F0")}
                >
                  {PROGRAMS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                </select>
                <p style={{ fontSize: "11px", color: "#2563EB", marginTop: "6px" }}>
                  {PROGRAMS.find(p => p.id === prog)?.note}
                </p>
              </div>

              <div>
                <label style={labelStyle}>Loan Amount</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8", fontWeight: 600, fontSize: "14px" }}>
                    $
                  </span>
                  <input
                    type="text"
                    value={Number(amount.replace(/,/g, "")).toLocaleString()}
                    onChange={e => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
                    style={{ ...fieldStyle, paddingLeft: "24px" }}
                    onFocus={e => (e.target.style.borderColor = "#2563EB")}
                    onBlur={e => (e.target.style.borderColor = "#E2E8F0")}
                    aria-label="Loan amount in dollars"
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>
                  Annual Interest Rate — <span style={{ color: "#0F172A", fontVariantNumeric: "tabular-nums" }}>{rateStr}%</span>
                </label>
                <input
                  type="range" min="4" max="20" step="0.25"
                  value={rateStr}
                  onChange={e => setRateStr(e.target.value)}
                  aria-label={`Interest rate: ${rateStr}%`}
                />
                <p style={{ fontSize: "11px", color: "#94A3B8", marginTop: "6px" }}>
                  Current SBA rates: approx. 10.5%–13.5%
                </p>
              </div>

              <div>
                <label style={labelStyle}>
                  Loan Term — <span style={{ color: "#0F172A", fontVariantNumeric: "tabular-nums" }}>{years} years</span>
                </label>
                <input
                  type="range" min="1" max={maxY}
                  value={years}
                  onChange={e => setYears(e.target.value)}
                  aria-label={`Loan term: ${years} years`}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#94A3B8", marginTop: "6px" }}>
                  <span>1 yr</span>
                  <span>{maxY} yrs max</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

              {/* Monthly payment hero */}
              <div
                style={{
                  background: "#060D1F",
                  backgroundImage: "radial-gradient(circle at 80% 50%, rgba(37,99,235,0.2) 0%, transparent 60%)",
                  padding: "28px 24px",
                  color: "white",
                  flexShrink: 0,
                }}
              >
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.50)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>
                  Estimated Monthly Payment
                </div>
                <div style={{ fontSize: "48px", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
                  {fmt2(monthly)}
                </div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.40)", marginTop: "10px" }}>
                  {years} years · {n} total payments
                </div>
              </div>

              {/* Summary cards */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ background: "white", border: "1px solid #E0E0DC", padding: "16px", textAlign: "center" }}>
                  <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>Total Repaid</div>
                  <div style={{ fontSize: "20px", fontWeight: 900, color: "#0F172A", fontVariantNumeric: "tabular-nums" }}>{fmt(total)}</div>
                </div>
                <div style={{ background: "white", border: "1px solid #E0E0DC", padding: "16px", textAlign: "center" }}>
                  <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>Total Interest</div>
                  <div style={{ fontSize: "20px", fontWeight: 900, color: "#EF4444", fontVariantNumeric: "tabular-nums" }}>{fmt(interest)}</div>
                </div>
              </div>

              {/* Breakdown bar */}
              <div style={{ background: "white", border: "1px solid #E0E0DC", padding: "16px" }}>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "#64748B", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
                  Payment Breakdown
                </div>
                <div style={{ display: "flex", height: "8px", marginBottom: "10px", overflow: "hidden" }}>
                  <div style={{ background: "#2563EB", width: `${100 - pct}%`, transition: "width 0.3s ease" }} />
                  <div style={{ background: "#EF4444", width: `${pct}%`, transition: "width 0.3s ease" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#64748B" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "8px", height: "8px", background: "#2563EB", display: "inline-block" }} />
                    Principal {(100 - pct).toFixed(1)}%
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "8px", height: "8px", background: "#EF4444", display: "inline-block" }} />
                    Interest {pct.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Guarantee fee note */}
          <div
            className="s3"
            style={{
              display: "flex",
              gap: "12px",
              background: "#FFFBEB",
              border: "1px solid #FDE68A",
              borderLeft: "3px solid #F59E0B",
              padding: "14px 16px",
              fontSize: "13px",
              color: "#92400E",
              marginBottom: "20px",
            }}
          >
            <div>
              <strong>SBA Guarantee Fee not included.</strong> Typically 0.5%–3.5% of the guaranteed portion — usually financed into the loan. Add it to your amount for a complete estimate.
            </div>
          </div>

          {/* Amortization table */}
          <div className="s4" style={{ background: "white", border: "1px solid #E0E0DC", overflow: "hidden" }}>
            <button
              onClick={() => setShowAmort(s => !s)}
              style={{
                width: "100%",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#F7F7F5")}
              onMouseLeave={e => (e.currentTarget.style.background = "none")}
              aria-expanded={showAmort}
            >
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A" }}>
                Amortization Schedule{" "}
                <span style={{ fontWeight: 400, color: "#94A3B8" }}>(first 60 months)</span>
              </div>
              <svg
                style={{ width: "16px", height: "16px", color: "#94A3B8", transition: "transform 0.2s", transform: showAmort ? "rotate(180deg)" : "rotate(0deg)" }}
                viewBox="0 0 16 16" fill="none"
              >
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {showAmort && (
              <div style={{ overflowX: "auto", borderTop: "1px solid #E8E8E4" }}>
                <table className="amort-table">
                  <thead>
                    <tr>
                      {["Month", "Payment", "Principal", "Interest", "Balance"].map(h => (
                        <th key={h} style={{ textAlign: h === "Month" ? "left" : "right" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {amort.map((r) => (
                      <tr key={r.m}>
                        <td style={{ fontWeight: 600, color: "#64748B" }}>{r.m}</td>
                        <td style={{ textAlign: "right" }}>{fmt2(r.pay)}</td>
                        <td style={{ textAlign: "right", color: "#2563EB" }}>{fmt2(r.pri)}</td>
                        <td style={{ textAlign: "right", color: "#EF4444" }}>{fmt2(r.int)}</td>
                        <td style={{ textAlign: "right", color: "#0F172A", fontWeight: 600 }}>{fmt2(r.bal)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <p style={{ fontSize: "11px", color: "#94A3B8", marginTop: "12px" }}>
            Disclaimer: Estimates are for informational purposes only. Actual loan terms are determined by individual SBA-approved lenders.
          </p>
        </div>

        {/* ── Sidebar ── */}
        <aside className="hidden xl:flex flex-col gap-5 w-[300px] shrink-0" aria-label="Sidebar">
          <div className="sticky" style={{ top: "120px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <AdRect />

            <div style={{ background: "white", border: "1px solid #E0E0DC", padding: "20px" }}>
              <div className="section-label" style={{ marginBottom: "14px" }}>Current SBA Rates</div>
              {RATES.map(([l, r]) => (
                <div
                  key={l}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                    borderBottom: "1px solid #F1F1EE",
                    fontSize: "12px",
                  }}
                >
                  <span style={{ color: "#64748B" }}>{l}</span>
                  <span style={{ fontWeight: 600, color: "#0F172A" }}>{r}</span>
                </div>
              ))}
              <p style={{ fontSize: "11px", color: "#94A3B8", marginTop: "10px" }}>
                Prime rate as of early 2026: ~7.5%
              </p>
            </div>

            <AdRect />
          </div>
        </aside>
      </div>
    </div>
  );
}
