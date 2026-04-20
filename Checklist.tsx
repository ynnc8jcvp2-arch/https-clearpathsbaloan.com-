import { useState } from "react";
import { AdRect } from "../App";

const BASE: Record<string, string[]> = {
  "7a_standard": [
    "SBA Form 1919 — Borrower Information Form (all 20%+ owners)",
    "SBA Form 912 — Statement of Personal History (if criminal history applies)",
    "SBA Form 413 — Personal Financial Statement (all 20%+ owners)",
    "Business plan with 3-year financial projections",
    "3 years federal business tax returns (all schedules)",
    "3 years personal tax returns (all 20%+ owners)",
    "YTD Profit & Loss statement (within 120 days)",
    "Current Balance Sheet (within 120 days)",
    "Business debt schedule (all loans: lender, balance, payment, maturity)",
    "Accounts Receivable & Payable aging reports",
    "12 months business bank statements",
    "Government-issued photo ID (all 20%+ owners)",
    "Signed IRS Form 4506-C (business + all owners)",
  ],
  "7a_small": [
    "SBA Form 1919 — Borrower Information Form",
    "SBA Form 413 — Personal Financial Statement",
    "2 years federal business tax returns",
    "2 years personal tax returns (all 20%+ owners)",
    "YTD Profit & Loss statement",
    "Current Balance Sheet",
    "12 months business bank statements",
    "Government-issued photo ID",
    "Signed IRS Form 4506-C",
  ],
  "express": [
    "SBA Form 1919",
    "SBA Form 413",
    "2 years business tax returns",
    "2 years personal tax returns",
    "YTD P&L and Balance Sheet",
    "12 months bank statements",
    "Government-issued photo ID",
    "Signed IRS Form 4506-C",
  ],
};

const ENTITY: Record<string, Record<string, string[]>> = {
  LLC: { "7a_standard": ["LLC Operating Agreement (fully executed)","Certificate of Formation / Articles of Organization"], "7a_small": ["LLC Operating Agreement","Articles of Organization"], "express": ["Operating Agreement","Articles of Organization"] },
  "S-Corp": { "7a_standard": ["Articles of Incorporation","Corporate Bylaws","IRS Form 2553 (S-Corp Election)","Most recent corporate meeting minutes"], "7a_small": ["Articles of Incorporation","Bylaws","S-Corp Election (Form 2553)"], "express": ["Articles of Incorporation","S-Corp Election","Bylaws"] },
  "C-Corp": { "7a_standard": ["Articles of Incorporation","Corporate Bylaws","Stock ledger (all shareholders)","Most recent corporate meeting minutes"], "7a_small": ["Articles of Incorporation","Bylaws","Stock ledger"], "express": ["Articles of Incorporation","Bylaws","Stock ledger"] },
  "Sole Proprietor": { "7a_standard": ["DBA / Fictitious Business Name registration (if applicable)","Business license"], "7a_small": ["DBA registration (if applicable)","Business license"], "express": ["Business license","DBA (if applicable)"] },
  "Partnership": { "7a_standard": ["Partnership Agreement (fully executed)","Certificate of Partnership"], "7a_small": ["Partnership Agreement"], "express": ["Partnership Agreement"] },
};

const PURPOSE: Record<string, string[]> = {
  real_estate: ["Purchase contract or Letter of Intent","Commercial property appraisal (MAI-certified)","Phase I Environmental Report","2 years property financials (if income-producing)","Lease agreement (current copy, if applicable)"],
  equipment: ["Equipment quote or invoice from seller","Equipment appraisal (if used equipment)","Description of equipment and intended use"],
  acquisition: ["Purchase agreement / LOI to buy the business","3 years seller's business tax returns","Business valuation or appraisal","Seller's interim financial statements","Non-compete agreement (if applicable)"],
  construction: ["Construction contracts with licensed contractor","Contractor's license and insurance certificates","Detailed construction timeline and budget","Building permits (or permit application)","Architectural plans or blueprints"],
  refinance: ["Current lender statements for all debts to be refinanced","Loan payoff statements","Documentation showing SBA-eligible refinancing purpose"],
};

type LoanType = "7a_standard"|"7a_small"|"express";
type EntityType = "LLC"|"S-Corp"|"C-Corp"|"Sole Proprietor"|"Partnership";
type Purpose = "working_capital"|"real_estate"|"equipment"|"acquisition"|"construction"|"refinance";

const LOAN_LABELS: Record<LoanType, string> = {
  "7a_standard": "7(a) Standard — up to $5M",
  "7a_small": "7(a) Small — up to $500K",
  "express": "SBA Express — up to $500K",
};

export default function Checklist() {
  const [loanType, setLoanType] = useState<LoanType|"">("");
  const [entity, setEntity] = useState<EntityType|"">("");
  const [purpose, setPurpose] = useState<Purpose|"">("");
  const [checked, setChecked] = useState<Record<number,boolean>>({});
  const [generated, setGenerated] = useState(false);

  const items = generated && loanType && entity ? [
    ...(BASE[loanType] || []),
    ...(ENTITY[entity]?.[loanType] || []),
    ...(purpose && PURPOSE[purpose] ? PURPOSE[purpose] : []),
  ] : [];

  const doneCount = Object.values(checked).filter(Boolean).length;
  const pct = items.length ? Math.round((doneCount / items.length) * 100) : 0;

  const toggle = (i: number) => setChecked(c => ({ ...c, [i]: !c[i] }));

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
      <div className="flex gap-10 xl:gap-14">
        <div className="flex-1 min-w-0">

          <div className="mb-7">
            <h1 className="text-2xl font-black text-slate-900 mb-1">Smart Document Checklist</h1>
            <p className="text-slate-500 text-sm">Tell us about your loan and we'll generate a personalized, printable checklist — no generic PDFs.</p>
          </div>

          {/* Config card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card mb-6">
            <div className="grid sm:grid-cols-3 gap-4 mb-5">
              {([
                ["Loan Program", loanType, setLoanType, [["","Select loan type…"],["7a_standard","SBA 7(a) Standard (up to $5M)"],["7a_small","SBA 7(a) Small (up to $500K)"],["express","SBA Express (up to $500K)"]]],
                ["Business Structure", entity, setEntity, [["","Select entity type…"],["LLC","LLC"],["S-Corp","S-Corporation"],["C-Corp","C-Corporation"],["Sole Proprietor","Sole Proprietorship"],["Partnership","Partnership"]]],
                ["Loan Purpose", purpose, setPurpose, [["","Select purpose…"],["working_capital","Working Capital / Expenses"],["real_estate","Commercial Real Estate"],["equipment","Equipment / Machinery"],["acquisition","Buy a Business"],["construction","Construction / Renovation"],["refinance","Refinance Existing Debt"]]],
              ] as [string, string, (v: any)=>void, [string,string][]][]).map(([label, val, setter, opts]) => (
                <div key={label}>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">{label}</label>
                  <select value={val} onChange={e => { setter(e.target.value); setGenerated(false); setChecked({}); }}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky/30 focus:border-sky bg-slate-50">
                    {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <button onClick={() => { if (loanType && entity) { setGenerated(true); setChecked({}); }}}
              disabled={!loanType || !entity}
              className="gradient-cta text-white font-bold px-6 py-2.5 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-opacity flex items-center gap-2">
              Generate Checklist
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7H11M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          {generated && items.length > 0 && (
            <div>
              {/* Progress */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-card mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{loanType ? LOAN_LABELS[loanType as LoanType] : ""} · {entity}</div>
                    <div className="text-xs text-slate-400">{items.length} documents · {doneCount} gathered</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-slate-900">{pct}%</span>
                    <button onClick={() => window.print()}
                      className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M3 4.5V2h7v2.5M2 4.5h9v5H9.5v1.5h-6V9.5H2v-5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
                      Print / Save PDF
                    </button>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="h-2 rounded-full transition-all duration-300" style={{ width: `${pct}%`, background: pct === 100 ? "#10B981" : "#2563EB" }} />
                </div>
              </div>

              {/* Checklist */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-card mb-5">
                <div className="bg-navy-900 text-white px-6 py-3.5 flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7L5.5 10.5L12 3.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="text-sm font-semibold">Check off each document as you gather it</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {items.map((item, i) => (
                    <label key={i} onClick={() => toggle(i)}
                      className={`flex gap-3.5 px-6 py-4 cursor-pointer transition-colors ${checked[i] ? "bg-emerald-50" : "hover:bg-slate-50"}`}>
                      <div className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${checked[i] ? "bg-emerald-500 border-emerald-500" : "border-slate-300"}`}>
                        {checked[i] && <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1.5 5.5L4.5 8.5L9.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      <span className={`text-sm leading-relaxed transition-colors ${checked[i] ? "text-slate-400 line-through" : "text-slate-800"}`}>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 mb-4">
                <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5V8M8 11H8.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                <div><strong>Pro tip:</strong> Organize documents in clearly labeled folders with a cover page listing your business name, requested amount, and contact info. A clean package can cut weeks off your timeline.</div>
              </div>

              <div className="text-xs text-slate-400 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                <strong>Disclaimer:</strong> This checklist is based on standard SBA guidelines but is informational only. Your specific lender may require additional documents. Always verify with your lender.
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="hidden xl:flex flex-col gap-5 w-[300px] shrink-0">
          <div className="sticky top-[120px] flex flex-col gap-5">
            <AdRect />
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Why documents matter</div>
              <p className="text-xs text-slate-600 leading-relaxed mb-2">Incomplete application packages are the #1 reason SBA loan timelines stretch from 45 to 90+ days.</p>
              <p className="text-xs text-slate-600 leading-relaxed">A complete, organized package submitted on day one is the single biggest thing you can do to speed up your approval.</p>
            </div>
            <AdRect />
          </div>
        </aside>
      </div>
    </div>
  );
}
