import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileSearch, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Scale, 
  Check, 
  UserCheck, 
  HeartHandshake,
  AlertCircle
} from 'lucide-react';

export const TrustAndCompliance: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const trustFeatures = [
    { title: 'Transparent Pricing', desc: 'Zero hidden administrative markups or bundled fees. Every rupee is itemized.' },
    { title: 'Clear Plain-English Coverage', desc: 'We translate complex legal insurance clauses into everyday understandable language.' },
    { title: 'Unbiased Comparison', desc: 'Algorithms prioritize customer coverage depth and claim settlement ratios over insurer commissions.' },
    { title: 'Bank-Grade AES-256 Storage', desc: 'Your medical reports and KYC documents are encrypted at rest and in transit.' },
    { title: 'Digital Instant Policy Access', desc: 'Download official policy schedules and digital cashless health cards 24/7.' },
    { title: 'Live Claim Milestone Tracking', desc: 'Real-time telemetry from hospital TPA desks straight to your CoverFlow mobile screen.' },
    { title: 'Human Claim Advocate Support', desc: 'Dedicated claim concierge stands by your side in case of hospital dispute.' },
    { title: 'Zero Spam & Harassment', desc: 'We never sell your phone number to telemarketers or external call centers.' },
  ];

  const faqs = [
    {
      q: 'Is CoverFlow an insurance company or an intermediary platform?',
      a: 'CoverFlow is a technology-first digital insurance platform operating as an authorized web aggregator / corporate distributor in compliance with applicable insurance regulatory authorities (including IRDAI guidelines in India). All insurance underwriting, liability, and claim disbursements are handled by licensed insurance underwriters.'
    },
    {
      q: 'How does the cashless hospitalization settlement work?',
      a: 'When admitted to any of our 12,000+ network hospitals, simply show your digital CoverFlow Health ID card at the TPA desk. The hospital initiates digital pre-authorization, and eligible expenses are settled directly between the insurer and the hospital with zero out-of-pocket payment for covered items.'
    },
    {
      q: 'Can I cancel my policy or switch plans during the free-look period?',
      a: 'Yes, all retail insurance policies come with a mandatory 15 to 30-day Free-Look Period from the date of receiving the policy document. If you are not satisfied with the terms, you can request a 100% refund (subject to nominal stamp duty and medical examination charges).'
    },
    {
      q: 'How does the AI Recommendation Engine calculate my plan match score?',
      a: 'The recommendation algorithm simulates actuarial risk factors including applicant age, city healthcare costs, family size, and income brackets. It benchmarks policy features against public IRDAI claim settlement data to surface the most cost-effective and comprehensive options without human bias.'
    }
  ];

  return (
    <section id="trust" className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold mb-3">
            <Scale className="w-3.5 h-3.5 text-teal-600" />
            <span>High-Trust Fintech Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-display tracking-tight">
            Insurance You Can Understand
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Engineered from first principles for radical clarity, customer-first transparency, and absolute data privacy.
          </p>
        </div>

        {/* 8 Trust Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {trustFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-teal-300 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <h3 className="text-sm font-bold text-navy-900 font-display mb-1">
                {feat.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Regulatory Compliance & Grievance Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center space-x-2 text-teal-700 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Compliance & Consumer Protection Standards</span>
            </div>
            <h3 className="text-xl font-bold text-navy-900 font-display">
              Built for Regulatory Integrity & Grievance Redressal
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              CoverFlow adheres strictly to regulatory norms, consumer consent guidelines, and data protection standards. All policy wordings and brochures are verified against insurer filings with the Insurance Regulatory and Development Authority (IRDAI).
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-2">
              <span>🛡️ <strong>Principal Officer:</strong> Compliance Desk, CoverFlow Tech Ltd</span>
              <span>📩 <strong>Grievance Email:</strong> redressal@coverflow.insurance</span>
              <span>🔒 <strong>ISO 27001</strong> Certified Security</span>
            </div>
          </div>

          <div className="lg:col-span-4 p-5 rounded-2xl bg-teal-50/70 border border-teal-100 text-center space-y-2">
            <div className="text-xs font-bold text-teal-900 uppercase">Grievance Escalation Matrix</div>
            <p className="text-[11px] text-slate-600">
              Response within 24 hours. Resolution within 7 working days per customer charter.
            </p>
            <div className="text-xs font-bold text-teal-800 bg-white py-1.5 px-3 rounded-lg border border-teal-200">
              Toll-Free Helpline: 1800-268-3735
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-navy-900 font-display">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, fIdx) => {
              const isOpen = openFaq === fIdx;
              return (
                <div
                  key={fIdx}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between text-xs font-bold text-navy-900 hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-teal-600 shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
