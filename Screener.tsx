import { useState } from "react";
import { AdRect, type Page } from "../App";

interface Question {
  id: string; q: string; hint?: string;
  options: { label: string; value: string; flag?: "red"|"yellow"|"none" }[];
}

const questions: Question[] = [
  { id:"biz_age", q:"How long has your business been operating?", hint:"Most SBA lenders require at least 2 years in business.", options:[{label:"Less than 1 year",value:"under1",flag:"red"},{label:"1–2 years",value:"1to2",flag:"yellow"},{label:"2–5 years",value:"2to5",flag:"none"},{label:"Over 5 years",value:"over5",flag:"none"}]},
  { id:"biz_type", q:"What type of business do you operate?", hint:"Certain business types are ineligible for SBA loans by policy.", options:[{label:"Restaurant / Food Service",value:"food"},{label:"Retail",value:"retail"},{label:"Service (consulting, cleaning, etc.)",value:"service"},{label:"Healthcare / Medical",value:"medical"},{label:"Construction / Contracting",value:"construction"},{label:"Real estate investment only",value:"realestate",flag:"red"},{label:"Gambling, adult entertainment, or firearms",value:"restricted",flag:"red"},{label:"Other eligible business",value:"other"}]},
  { id:"revenue", q:"What was your annual revenue last year?", options:[{label:"Under $50,000",value:"under50k",flag:"yellow"},{label:"$50K – $250K",value:"50to250k"},{label:"$250K – $1M",value:"250kto1m"},{label:"$1M – $5M",value:"1mto5m"},{label:"Over $5M",value:"over5m"}]},
  { id:"credit", q:"What is your personal credit score?", hint:"SBA lenders typically require 650+. The SBSS model also applies.", options:[{label:"Below 580",value:"poor",flag:"red"},{label:"580–619",value:"fair",flag:"red"},{label:"620–649",value:"neargood",flag:"yellow"},{label:"650–699",value:"good"},{label:"700–749",value:"verygood"},{label:"750 or above",value:"excellent"}]},
  { id:"purpose", q:"What is the primary purpose of the loan?", options:[{label:"Working capital (payroll, inventory, expenses)",value:"working_capital"},{label:"Equipment or machinery",value:"equipment"},{label:"Purchase or renovate commercial real estate",value:"realestate_purchase"},{label:"Acquire or buy a business",value:"acquisition"},{label:"Refinance existing debt",value:"refinance",flag:"yellow"},{label:"Start a new business (no revenue yet)",value:"startup",flag:"red"}]},
  { id:"ownership", q:"What percentage of the business do you own?", hint:"Owners with 20%+ must personally guarantee SBA loans.", options:[{label:"100% — sole owner",value:"100"},{label:"51%–99%",value:"51to99"},{label:"20%–50%",value:"20to50"},{label:"Less than 20%",value:"under20",flag:"yellow"}]},
  { id:"federal_default", q:"Have you ever defaulted on a federal loan?", options:[{label:"No",value:"no"},{label:"Yes, fully resolved",value:"resolved",flag:"yellow"},{label:"Yes, unresolved",value:"unresolved",flag:"red"}]},
  { id:"criminal", q:"Any felony convictions in the past 5 years?", hint:"SBA restricts loans to those with recent felony convictions.", options:[{label:"No",value:"no"},{label:"Yes, non-financial, over 3 years ago",value:"old_nonfinancial",flag:"yellow"},{label:"Yes, within 3 years",value:"recent",flag:"red"},{label:"Yes, financial crime",value:"financial",flag:"red"}]},
  { id:"equity", q:"Can you contribute equity (your own money) toward the project?", hint:"Lenders prefer borrowers to have 'skin in the game.'", options:[{label:"Yes, 30%+ of project cost",value:"30plus"},{label:"Yes, 10%–30%",value:"10to30"},{label:"Yes, less than 10%",value:"under10",flag:"yellow"},{label:"No, need 100% financing",value:"none",flag:"yellow"}]},
  { id:"loan_amount", q:"How much are you looking to borrow?", options:[{label:"Under $50,000",value:"under50k"},{label:"$50K – $150K",value:"50to150k"},{label:"$150K – $500K",value:"150to500k"},{label:"$500K – $2M",value:"500kto2m"},{label:"$2M – $5M",value:"2mto5m"},{label:"Over $5M",value:"over5m",flag:"yellow"}]},
];

const RED_MSG: Record<string,string> = {
  biz_age:"Businesses under 1 year typically don't meet lender requirements. Consider SBA Microloans (up to $50K) which are more flexible for newer businesses.",
  biz_type:"Your business type is generally ineligible for SBA loans. Passive real estate investment companies and restricted-industry businesses do not qualify.",
  credit:"A score below 620 is below most SBA lenders' minimum threshold. Reaching 650+ opens significantly more options.",
  purpose:"The SBA generally doesn't fund startups with no revenue through the standard 7(a) program. The SBA Microloan program may apply.",
  federal_default:"An unresolved federal loan default is a disqualifying condition. It must be resolved before you can receive SBA backing.",
  criminal:"A recent felony conviction (within 3 years) or financial crime conviction is a disqualifying condition under current SBA policy.",
};
const YELLOW_MSG: Record<string,string> = {
  biz_age:"1–2 years in business is borderline. SBA Express and Microloans may be more accessible at this stage.",
  revenue:"Low revenue may limit loan amount and lender options. Demonstrating strong cash flow trajectory helps.",
  credit:"Your score is below most lenders' preferred range. Some lenders consider 620–649 with strong compensating factors.",
  purpose:"Refinancing has additional SBA requirements. The existing debt must meet specific conditions to qualify.",
  criminal:"A non-financial felony over 3 years ago may not be disqualifying, but disclosure is required and lenders may still decline.",
  federal_default:"A resolved default may be acceptable, but must be well-documented. Lenders will scrutinize this closely.",
  equity:"Little or no equity injection may limit lender options, particularly for real estate or acquisition loans.",
  loan_amount:"Loans over $5M exceed the standard 7(a) guaranty cap. SBA 504 or conventional financing may be more appropriate.",
};

function computeResult(answers: Record<string,string>) {
  const reds: string[] = [];
  const yellows: string[] = [];
  questions.forEach(q => {
    const opt = q.options.find(o => o.value === answers[q.id]);
    if (opt?.flag === "red") reds.push(q.id);
    else if (opt?.flag === "yellow") yellows.push(q.id);
  });
  if (reds.length === 0 && yellows.length === 0) return { status:"likely" as const, headline:"You appear likely eligible.", summary:"Based on your answers, you have no obvious disqualifying factors and appear to meet the general profile of approved SBA borrowers. The next step is to find a lender and submit a complete application.", details:[], next:["Use the Document Checklist to prepare your application package.","Calculate your estimated payment with the Loan Calculator.","Find approved lenders at lendermatch.sba.gov."] };
  if (reds.length >= 2) return { status:"unlikely" as const, headline:"Multiple disqualifying factors found.", summary:"You have two or more conditions that are typically disqualifying. SBA loans may not be the right path right now. Address the specific factors below before applying.", details:reds.map(id=>RED_MSG[id]).filter(Boolean), next:["Consult a free SCORE mentor at score.org.","Explore SBA Microloans at sba.gov/microloans.","Focus on resolving disqualifying conditions before re-applying."] };
  if (reds.length === 1) return { status:"disqualified" as const, headline:"One likely disqualifying factor found.", summary:"You have one condition that typically disqualifies applicants from standard SBA 7(a) loans. In some cases this can be resolved — review the detail below.", details:reds.map(id=>RED_MSG[id]).filter(Boolean), next:reds.includes("credit")?["Work on improving your credit score — even 30 points can make a difference.","Dispute any errors at annualcreditreport.com (free).","Consider a secured business credit card to build history."]:["Address the issue noted above.","Consult a free SCORE mentor.","Re-check your eligibility in 3–6 months."] };
  return { status:"conditional" as const, headline:"Potentially eligible — with some conditions.", summary:"You appear generally eligible but have factors that some lenders may view as concerns. None are automatic disqualifiers, but they may reduce your options or require explanation.", details:yellows.map(id=>YELLOW_MSG[id]).filter(Boolean), next:["A strong, complete application helps overcome borderline factors — use the Document Checklist.","Apply to 2–3 SBA lenders, as underwriting standards vary.","Visit lendermatch.sba.gov to find lenders who specialize in your situation."] };
}

const STATUS_CONFIG = {
  likely:      { bg:"bg-emerald-50", border:"border-emerald-200", dotColor:"bg-emerald-500", label:"Likely Eligible",        labelColor:"text-emerald-700" },
  conditional: { bg:"bg-amber-50",   border:"border-amber-200",   dotColor:"bg-amber-500",   label:"Conditionally Eligible",  labelColor:"text-amber-700"   },
  disqualified:{ bg:"bg-red-50",     border:"border-red-200",     dotColor:"bg-red-500",     label:"Factor Found",            labelColor:"text-red-700"     },
  unlikely:    { bg:"bg-red-50",     border:"border-red-200",     dotColor:"bg-red-500",     label:"Multiple Factors Found",  labelColor:"text-red-700"     },
};

export default function Screener({ nav }: { nav: (p: Page) => void }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [result, setResult] = useState<ReturnType<typeof computeResult>|null>(null);
  const [selected, setSelected] = useState("");

  const q = questions[current];
  const progress = (current / questions.length) * 100;

  const handleNext = () => {
    if (!selected) return;
    const newAnswers = { ...answers, [q.id]: selected };
    setAnswers(newAnswers);
    setSelected("");
    if (current + 1 >= questions.length) setResult(computeResult(newAnswers));
    else setCurrent(c => c + 1);
  };

  const restart = () => { setCurrent(0); setAnswers({}); setSelected(""); setResult(null); };

  if (result) {
    const cfg = STATUS_CONFIG[result.status];
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 page-enter">
        <div className="flex gap-10 xl:gap-14">
          <div className="flex-1 min-w-0">
            {/* Result card */}
            <div className={`${cfg.bg} border ${cfg.border} p-7 mb-5`}>
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center gap-1.5 shrink-0 pt-1">
                  <div className={`w-3 h-3 ${cfg.dotColor}`} />
                </div>
                <div>
                  <div className={`text-[10px] font-bold uppercase tracking-widest ${cfg.labelColor} mb-2`}>{cfg.label}</div>
                  <h2 className="text-2xl font-black text-slate-900 mb-2">{result.headline}</h2>
                  <p className="text-slate-600 leading-relaxed text-sm">{result.summary}</p>
                </div>
              </div>
            </div>

            {result.details.length > 0 && (
              <div className="bg-white border border-slate-200 p-6 mb-5">
                <h3 className="font-bold text-slate-900 mb-3 text-[10px] uppercase tracking-widest">Factors to Address</h3>
                <div className="flex flex-col gap-2.5">
                  {result.details.map((d, i) => (
                    <div key={i} className="flex gap-3 text-sm bg-red-50 border border-red-100 p-4">
                      <div className="w-1 bg-red-400 shrink-0 self-stretch" />
                      <span className="text-slate-700 leading-relaxed">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-navy-900 text-white p-6 mb-5">
              <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-white/60">Recommended Next Steps</h3>
              <ol className="flex flex-col gap-3">
                {result.next.map((n, i) => (
                  <li key={i} className="flex gap-3 text-sm text-white/80">
                    <span className="text-sky-light font-bold font-mono text-[11px] shrink-0 mt-0.5 w-4">
                      {String(i+1).padStart(2,'0')}
                    </span>
                    {n}
                  </li>
                ))}
              </ol>
            </div>

            <div className="border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800 mb-6">
              <strong>Disclaimer:</strong> This is for informational purposes only and is not a loan decision or financial advice. Only SBA-approved lenders make actual credit decisions.
            </div>

            <div className="flex flex-wrap gap-3">
              <button onClick={() => nav("checklist")} className="bg-sky hover:bg-sky-light text-white font-bold px-5 py-2.5 text-sm transition-colors duration-150">
                Get Document Checklist →
              </button>
              <button onClick={() => nav("calculator")} className="bg-white text-slate-800 font-semibold px-5 py-2.5 border border-slate-200 hover:border-slate-300 transition-colors text-sm">
                Calculate Payment
              </button>
              <button onClick={restart} className="text-slate-400 hover:text-slate-700 font-medium px-5 py-2.5 transition-colors text-sm">
                Start Over
              </button>
            </div>
          </div>

          {/* Sidebar ad */}
          <aside className="hidden xl:flex flex-col gap-5 w-[300px] shrink-0">
            <div className="sticky top-[120px] flex flex-col gap-5">
              <AdRect />
              <div className="bg-navy-900 text-white rounded-xl p-5">
                <div className="text-xs font-semibold text-sky-light uppercase tracking-wider mb-2">Next Step</div>
                <h3 className="font-bold mb-2 leading-snug">Get your personalized document checklist</h3>
                <p className="text-xs text-white/60 mb-4">Incomplete packages are the #1 reason applications stall. Know exactly what to gather.</p>
                <button onClick={() => nav("checklist")} className="w-full gradient-cta text-white text-sm font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity">Build My Checklist →</button>
              </div>
              <AdRect />
            </div>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 page-enter">
      <div className="flex gap-10 xl:gap-14">
        <div className="flex-1 min-w-0 max-w-2xl">

          {/* Progress header */}
          <div className="mb-7">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1 className="text-2xl font-black text-slate-900">SBA Eligibility Screener</h1>
                <p className="text-slate-500 text-sm">Free · No sign-up · ~3 minutes</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-slate-900 font-mono">
                  {String(current + 1).padStart(2,'0')}
                  <span className="text-slate-300 font-normal text-lg">/{questions.length}</span>
                </div>
              </div>
            </div>
            {/* Progress bar — sharp, no rounded */}
            <div className="w-full bg-slate-100 h-1">
              <div
                className="bg-sky h-1 transition-all duration-400 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white border border-slate-200 p-7 mb-4">
            <h2 className="text-xl font-bold text-slate-900 mb-2 text-balance">{q.q}</h2>
            {q.hint && (
              <div className="flex gap-2.5 border-l-2 border-sky bg-sky-pale px-3.5 py-2.5 mb-5">
                <p className="text-xs text-sky-700 leading-relaxed">{q.hint}</p>
              </div>
            )}
            <div className="flex flex-col gap-2">
              {q.options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSelected(opt.value)}
                  className={`text-left px-4 py-3.5 border transition-all duration-100 text-sm font-medium flex items-center gap-3
                    ${selected === opt.value
                      ? "border-sky bg-sky-pale text-slate-900"
                      : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50"
                    }`}
                >
                  {/* Clean square radio indicator */}
                  <span className={`w-4 h-4 border-2 flex-shrink-0 flex items-center justify-center transition-colors
                    ${selected === opt.value ? "border-sky bg-sky" : "border-slate-300 bg-white"}`}>
                    {selected === opt.value && (
                      <span className="w-1.5 h-1.5 bg-white" />
                    )}
                  </span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                if (current > 0) {
                  setCurrent(c => c - 1);
                  setSelected(answers[questions[current - 1].id] || "");
                }
              }}
              disabled={current === 0}
              className="flex items-center gap-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-0 text-sm font-medium transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M9 2L5 7L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!selected}
              className="bg-sky hover:bg-sky-light text-white font-bold px-7 py-2.5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150 flex items-center gap-2"
            >
              {current + 1 === questions.length ? "See My Result" : "Continue"}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7H11M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden xl:flex flex-col gap-5 w-[300px] shrink-0">
          <div className="sticky top-[120px] flex flex-col gap-5">
            <div className="bg-white border border-slate-200 p-5">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                What we check
              </div>
              <ul className="flex flex-col gap-2 text-xs text-slate-600">
                {[
                  "Business age & type eligibility",
                  "Revenue & cash flow profile",
                  "Personal credit score range",
                  "Loan purpose eligibility",
                  "Ownership structure",
                  "Federal default history",
                  "Criminal history",
                  "Equity injection capacity",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2.5 items-start">
                    <div className="w-1.5 h-1.5 bg-sky shrink-0 mt-1" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <AdRect />
          </div>
        </aside>
      </div>
    </div>
  );
}
