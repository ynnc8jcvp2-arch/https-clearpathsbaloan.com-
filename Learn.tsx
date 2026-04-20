import { useState } from "react";
import { AdRect, AdInFeed, type Page } from "../App";

const ARTICLES = [
  { id:"what_is_sba", title:"What Is an SBA Loan?", cat:"Basics", time:"3 min",
    content:`<h3>The short answer</h3><p>An SBA loan is a business loan partially guaranteed by the U.S. Small Business Administration. The SBA does not lend money directly — instead, it promises to repay a portion (typically 75–85%) if the borrower defaults. That guarantee reduces lender risk, which is why SBA loans offer rates and terms that banks typically won't extend on conventional loans.</p><h3>Why SBA loans stand out</h3><p>Lower rates, longer terms (up to 25 years for real estate), and lower down payments than conventional business loans. The tradeoff: the application process is more complex and takes 30–90 days from application to funding.</p><h3>The main programs</h3><p><strong>SBA 7(a)</strong> — The most common and flexible SBA loan. Up to $5 million. Used for working capital, equipment, real estate, and acquisitions.<br/><strong>SBA Express</strong> — A 7(a) subset with 36-hour SBA response. Up to $500K. Faster, but stricter credit requirements.<br/><strong>SBA 504</strong> — For major fixed assets (commercial real estate, heavy equipment). Up to $5.5M. Fixed rate on the SBA portion.<br/><strong>SBA Microloan</strong> — Up to $50K through nonprofit intermediaries. More flexible for startups and very small businesses.</p><h3>What SBA loans cannot fund</h3><p>Passive real estate investment, delinquent tax payoff, and businesses in ineligible industries (gambling, adult entertainment, etc.).</p>` },
  { id:"credit_score", title:"What Credit Score Do You Need?", cat:"Eligibility", time:"4 min",
    content:`<h3>The baseline: 650+</h3><p>Most SBA lenders prefer a minimum personal credit score of 650–680. This is not a hard SBA requirement — individual lenders set their own standards. Some CDFIs will consider scores as low as 620 with strong compensating factors.</p><h3>The SBSS score: what most people don't know</h3><p>For 7(a) loans under $500K, the SBA uses the Small Business Scoring Service (SBSS) — a Dun & Bradstreet model combining personal credit, business credit, and financial data into a score from 0–300. The SBA requires a minimum SBSS of 155 for most streamlined reviews. Scores below 155 trigger full manual SBA review, slowing the process significantly.</p><h3>How to improve before applying</h3><p><strong>Pay down revolving balances.</strong> Getting below 30% credit utilization can add 20–40 points.<br/><strong>Check for errors.</strong> Request your free report at annualcreditreport.com. Errors are common — disputes can produce quick gains.<br/><strong>Don't open new accounts.</strong> Avoid any credit applications in the 6 months before your SBA application.<br/><strong>Build business credit.</strong> A strong Dun & Bradstreet PAYDEX score improves your SBSS. Register with D&B and pay all bills early.</p><h3>If your score is below 650</h3><p>Consider SBA Microloans (up to $50K, more flexible), CDFIs, or taking 6–12 months to build your profile before applying.</p>` },
  { id:"timeline", title:"How Long Does an SBA Loan Take?", cat:"Process", time:"4 min",
    content:`<h3>The honest answer: 30–90 days</h3><p>A typical SBA 7(a) loan takes 30–90 days from a complete application to funding. SBA Express can move in 2–4 weeks because lenders have delegated approval authority.</p><h3>Why it takes so long</h3><p>Multiple parties are involved: you, your lender, and the SBA. The lender first reviews and approves (1–4 weeks), then submits to the SBA for guaranty (5–10 business days for Preferred Lenders). After SBA approval, attorneys, title companies, and document execution add closing time.</p><h3>The full timeline</h3><p><strong>Days 1–5:</strong> Document gathering. An incomplete package can add weeks.<br/><strong>Days 5–25:</strong> Lender underwriting. Information requests can reset this clock.<br/><strong>Days 25–35:</strong> SBA review (for non-PLP lenders).<br/><strong>Days 35–45:</strong> Approval and commitment letter.<br/><strong>Days 45–70:</strong> Closing, title, and funding.</p><h3>The single biggest way to speed it up</h3><p>Submit a complete, organized document package on day one. Applications with missing documents take twice as long. Use the Document Checklist tool to prepare everything before you approach a lender.</p>` },
  { id:"7a_vs_504", title:"SBA 7(a) vs. 504: Which Is Right?", cat:"Loan Types", time:"5 min",
    content:`<h3>The core difference</h3><p>The 7(a) is general-purpose: working capital, equipment, real estate, acquisitions. The 504 is purpose-built for major fixed assets and offers a fixed rate on the SBA portion — a meaningful advantage in a rising rate environment.</p><h3>SBA 7(a) pros and cons</h3><p><strong>Pros:</strong> Flexible use of proceeds. One lender. Works for almost any business purpose. Lines of credit available.<br/><strong>Cons:</strong> Variable rate (tied to prime). Maximum $5M. Higher guarantee fee for larger amounts.</p><h3>SBA 504 pros and cons</h3><p><strong>Pros:</strong> Fixed rate on the CDC portion — you know your payment for 20 years. Lower effective rate for real estate. Up to $5.5M.<br/><strong>Cons:</strong> Two-lender structure (bank + CDC). Strictly for fixed assets — no working capital. Longer closing. Cannot fund investment property.</p><h3>Simple rule of thumb</h3><p>If you need real estate or large equipment and want rate certainty, explore 504. For everything else — working capital, smaller equipment, business acquisition, flexibility — 7(a) is almost certainly the right path.</p>` },
  { id:"collateral", title:"Do You Need Collateral?", cat:"Eligibility", time:"3 min",
    content:`<h3>The SBA's official position</h3><p>The SBA requires lenders to take all available collateral for loans over $50K, but the SBA will not deny a loan solely because there is insufficient collateral. Lenders must ask for it — but its absence shouldn't automatically disqualify you.</p><h3>What counts as collateral</h3><p>Commercial real estate (most valuable), business equipment and machinery, business inventory and receivables, personal real estate. Lenders typically value real estate at 80% of market value and equipment at 50%.</p><h3>The personal guarantee</h3><p>All owners with 20%+ must sign an unlimited personal guarantee regardless of collateral. This is separate from collateral — it's a personal promise to repay, even if the business fails.</p><h3>If you lack collateral</h3><p>Focus on demonstrating strong cash flow. Lenders care most about your ability to make payments from business revenue — collateral is the backup, not the primary underwriting factor for most SBA loans.</p>` },
  { id:"rejection_reasons", title:"Top 5 Rejection Reasons (and How to Avoid Them)", cat:"Preparation", time:"5 min",
    content:`<h3>1. Credit score below lender threshold</h3><p>The most common rejection reason. Most SBA lenders want 650+. Get your free credit report at annualcreditreport.com, dispute errors, and pay down revolving balances. A 30–60 day delay to improve your score can make the difference.</p><h3>2. Insufficient cash flow</h3><p>Lenders require a Debt Service Coverage Ratio (DSCR) of at least 1.25 — your business generates $1.25 for every $1 of debt payment. Barely-breaking-even businesses won't qualify. Show growth trajectory and explain any down years.</p><h3>3. Incomplete application package</h3><p>Missing a single page or submitting statements that don't reconcile causes lenders to slow-walk or reject applications. Use the Document Checklist to submit a complete, organized package from day one.</p><h3>4. Ineligible business type or use of proceeds</h3><p>Passive real estate, certain financial businesses, and restricted-industry businesses are ineligible by SBA policy. SBA loan proceeds also can't be used for certain purposes. Run the Eligibility Screener to catch these before you apply.</p><h3>5. Prior federal default or outstanding federal debt</h3><p>Any unresolved federal debt — prior SBA default, unpaid federal tax lien, delinquent student loan — is typically disqualifying. This applies to all 20%+ owners. Must be resolved before an SBA loan can be approved.</p>` },
  { id:"after_rejection", title:"My SBA Loan Was Rejected. What Now?", cat:"Recovery", time:"6 min",
    content:`<h3>Don't treat a rejection as final</h3><p>An SBA loan rejection is not a lifetime ban — it's a diagnosis. Most businesses that are rejected can qualify in 3–12 months by addressing the specific issue the lender or SBA identified. The key is understanding exactly what failed and building a clear remediation plan.</p><h3>Step 1: Get the specific reason in writing</h3><p>Lenders are required to provide a reason for denial. If you received only a vague explanation, ask for specifics in writing. The SBA's Adverse Action Notice should identify the primary reason. Common rejection codes include: credit score insufficient, cash flow inadequate for debt service, insufficient collateral, ineligible purpose, and prior federal debt.</p><h3>Step 2: Match the reason to a fix</h3><p><strong>Credit score too low:</strong> Pay down revolving balances (target under 30% utilization), dispute any errors at annualcreditreport.com, and avoid new credit applications for 6+ months. A 50-point improvement is often achievable in 6–12 months.<br/><strong>Insufficient cash flow (DSCR below 1.25):</strong> You need to either increase revenue, reduce debt, or wait for a stronger period to apply. Document any temporary revenue dips with written explanations. Lenders can use a 3-year average; if one year was anomalous, explain it.<br/><strong>Prior federal debt:</strong> This must be paid, discharged, or resolved before any SBA loan is possible. Contact the relevant federal agency directly.<br/><strong>Ineligible business type:</strong> This is often unfixable for the SBA. Explore CDFI loans, community bank conventional loans, or non-SBA alternatives.<br/><strong>Incomplete documentation:</strong> This is the most fixable — rebuild your package using the ClearPath Document Checklist and apply again.</p><h3>Step 3: Consider alternative SBA pathways</h3><p>If a standard 7(a) was rejected, consider whether you qualify for an SBA Microloan (more flexible, up to $50K through nonprofit lenders), SBA Community Advantage (mission-driven lenders with more flexible underwriting), or whether your state has a Small Business Credit Initiative (SSBCI) program with more flexible terms.</p><h3>Step 4: Ask for a second opinion</h3><p>Not all SBA-approved lenders have the same credit appetite. A rejection from one bank is not a rejection from all banks. Try a Preferred Lender Program (PLP) lender — they have higher SBA approval rates and more experienced SBA teams. Use SBA Lender Match at lendermatch.sba.gov to find lenders who actively work with your industry and loan size.</p><h3>Step 5: Document what you're doing differently</h3><p>When you reapply, include a brief "credit narrative" — a 1-page letter explaining what changed since your last application and why you're a stronger candidate. Lenders respond well to self-awareness and a clear improvement story.</p>` },
  { id:"sba_vs_conventional", title:"SBA Loan vs. Conventional Bank Loan: The Full Comparison", cat:"Loan Types", time:"5 min",
    content:`<h3>Why the comparison matters</h3><p>Many small business owners assume they must choose SBA or bank — in reality, you're often choosing a bank loan with or without SBA backing. Understanding what the SBA guarantee actually changes will help you know when to push for SBA and when a conventional loan is genuinely better.</p><h3>Interest rates</h3><p>SBA loans cap the interest rate premium lenders can charge above prime. For 7(a) loans over $250K, the max is prime + 2.75% — significantly below what many conventional lenders charge for small business credit risk. For businesses with thin credit histories, the rate difference can be 2–4 percentage points annually, which adds up to tens of thousands of dollars over a 10-year term.</p><h3>Loan terms</h3><p>This is where SBA loans often win decisively. A conventional bank loan for equipment might carry a 5-year term. An SBA 7(a) loan for the same equipment can run 10 years. For commercial real estate, conventional loans are typically 5–10 years with a balloon payment; SBA 7(a) offers up to 25 years, fully amortized. Longer terms mean lower monthly payments and better cash flow.</p><h3>Down payment requirements</h3><p>Conventional commercial real estate loans often require 20–30% down. SBA 7(a) real estate loans typically require 10–20% down, and 504 loans can be as low as 10% (15% for special-use properties or startups). For a $1M building, that's the difference between $200K–$300K down (conventional) and $100K–$150K down (SBA).</p><h3>Approval speed</h3><p>Conventional wins here. A simple conventional business loan can close in days or weeks. SBA 7(a) typically takes 30–90 days; SBA Express is 2–4 weeks. If you need capital immediately, SBA may not be the right vehicle. If you can plan 60–90 days ahead, the rate and term advantages are usually worth the wait.</p><h3>Paperwork and complexity</h3><p>SBA loans require significantly more documentation: business tax returns (3 years), personal tax returns (3 years), business financial statements, personal financial statements, business plan (for acquisitions/startups), and SBA-specific forms (1919, 912, 413). Conventional loans have lighter documentation requirements, especially for established businesses with strong bank relationships.</p><h3>When to choose each</h3><p><strong>Choose SBA when:</strong> You need a longer term to manage cash flow. You don't have a 20–30% down payment for real estate. Your business has limited credit history or thin collateral. You're acquiring a business and need flexible use of proceeds.<br/><strong>Choose conventional when:</strong> Speed is critical. You have an established bank relationship and strong credit. The loan is small and the paperwork overhead isn't worth it. You're refinancing existing debt (SBA has restrictions).</p>` },
];

const CAT_COLORS: Record<string,string> = {
  Basics: "bg-blue-50 text-blue-700 border-blue-100",
  Eligibility: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Process: "bg-violet-50 text-violet-700 border-violet-100",
  "Loan Types": "bg-amber-50 text-amber-700 border-amber-100",
  Preparation: "bg-red-50 text-red-700 border-red-100",
  Recovery: "bg-orange-50 text-orange-700 border-orange-100",
};

export default function Learn({ nav }: { nav: (p: Page) => void }) {
  const [selected, setSelected] = useState<string|null>(null);
  const article = ARTICLES.find(a => a.id === selected);

  if (selected && article) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex gap-10 xl:gap-14">
          <div className="flex-1 min-w-0 max-w-2xl">
            <button onClick={() => setSelected(null)} className="flex items-center gap-1.5 text-slate-400 hover:text-slate-700 text-sm font-medium mb-6 transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L5 7L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Back to articles
            </button>
            <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border mb-3 ${CAT_COLORS[article.cat]}`}>{article.cat}</span>
            <h1 className="text-3xl font-black text-slate-900 mb-2 text-balance">{article.title}</h1>
            <p className="text-sm text-slate-400 mb-8">{article.time} read · For informational purposes only</p>

            <div className="bg-white border border-slate-200 p-8 mb-6"
              dangerouslySetInnerHTML={{ __html: article.content
                .replace(/<h3>/g, '<h3 class="text-lg font-bold text-slate-900 mt-7 mb-2 first:mt-0">')
                .replace(/<p>/g, '<p class="text-slate-600 leading-relaxed mb-4 text-sm">')
                .replace(/<strong>/g, '<strong class="font-semibold text-slate-900">') }} />

            <div className="border-l-2 border-amber-400 bg-amber-50 px-4 py-3 text-xs text-amber-800 mb-6">
              Educational purposes only. Not legal, financial, or professional advice. Consult a qualified SBA lender for guidance specific to your situation.
            </div>

            <div className="bg-navy-900 text-white p-6">
              <h3 className="font-bold text-base mb-1">Ready to take the next step?</h3>
              <p className="text-white/60 text-sm mb-4">Check your eligibility or prepare your documents — free, in minutes.</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => nav("screener")} className="bg-sky hover:bg-sky-light text-white text-sm font-semibold px-4 py-2 transition-colors duration-150">Check Eligibility →</button>
                <button onClick={() => nav("checklist")} className="bg-white/10 hover:bg-white/15 text-white text-sm font-semibold px-4 py-2 transition-colors border border-white/15">Get Doc Checklist</button>
                <button onClick={() => nav("calculator")} className="bg-white/10 hover:bg-white/15 text-white text-sm font-semibold px-4 py-2 transition-colors border border-white/15">Calculate Payment</button>
              </div>
            </div>
          </div>

          <aside className="hidden xl:flex flex-col gap-5 w-[300px] shrink-0">
            <div className="sticky top-[120px] flex flex-col gap-5">
              <AdRect />
              <div className="bg-slate-50 border border-slate-200  p-5">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">More Articles</div>
                {ARTICLES.filter(a=>a.id!==selected).map(a=>(
                  <button key={a.id} onClick={()=>{setSelected(a.id);window.scrollTo(0,0);}} className="w-full text-left py-2.5 border-b border-slate-200 last:border-0 hover:text-sky transition-colors">
                    <div className="text-xs font-semibold text-slate-800">{a.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{a.time} read</div>
                  </button>
                ))}
              </div>
              <AdRect />
            </div>
          </aside>
        </div>
      </div>
    );
  }

  const cats = [...new Set(ARTICLES.map(a=>a.cat))];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
      <div className="flex gap-10 xl:gap-14">
        <div className="flex-1 min-w-0">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-slate-900 mb-1">SBA Loan Learning Center</h1>
            <p className="text-slate-500 text-sm">Plain-English answers to the most common SBA loan questions — no jargon, no sales pitch.</p>
          </div>

          {cats.map((cat, ci) => (
            <div key={cat} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${CAT_COLORS[cat]}`}>{cat}</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {ARTICLES.filter(a=>a.cat===cat).map(a=>(
                  <button key={a.id} onClick={()=>setSelected(a.id)}
                    className="text-left bg-white border border-slate-200 p-5 hover:border-slate-300 hover:bg-slate-50 transition-all duration-150 group">
                    <h3 className="font-bold text-slate-900 mb-1.5 leading-tight group-hover:text-sky transition-colors text-balance">{a.title}</h3>
                    <div className="text-xs text-slate-400">{a.time} read</div>
                  </button>
                ))}
              </div>
              {ci === 1 && <AdInFeed />}
            </div>
          ))}

          <div className="bg-navy-900 text-white  p-8 mt-6">
            <div className="max-w-lg">
              <h2 className="text-xl font-black mb-2">Ready to check your eligibility?</h2>
              <p className="text-white/60 text-sm mb-5">10 questions. Plain-English result. Catches the disqualifiers before they catch you.</p>
              <button onClick={()=>nav("screener")} className="btn-primary text-white font-bold px-5 py-2.5  hover:opacity-90 transition-opacity flex items-center gap-2">
                Start Eligibility Screener
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7H11M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>

        <aside className="hidden xl:flex flex-col gap-5 w-[300px] shrink-0">
          <div className="sticky top-[120px] flex flex-col gap-5">
            <AdRect />
            <div className="bg-navy-900 text-white  p-5">
              <div className="text-xs font-semibold text-sky-light uppercase tracking-wider mb-2">Free Newsletter</div>
              <h3 className="font-bold text-sm mb-2 leading-snug">SBA rule change alerts</h3>
              <p className="text-xs text-white/60 mb-3">We monitor SBA guidelines and email you when updates affect eligibility.</p>
              <input type="email" placeholder="you@email.com"
                className="w-full bg-white/10 border border-white/15  px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-sky-light mb-2"/>
              <button className="w-full btn-primary text-white text-sm font-semibold py-2  hover:opacity-90 transition-opacity">Subscribe Free</button>
            </div>
            <AdRect />
          </div>
        </aside>
      </div>
    </div>
  );
}
