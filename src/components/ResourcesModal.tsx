import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  FileText, 
  Building, 
  ShieldCheck, 
  Calculator, 
  Download, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';

interface ResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenKyc: () => void;
}

export const ResourcesModal: React.FC<ResourcesModalProps> = ({
  isOpen,
  onClose,
  onOpenKyc,
}) => {
  const [activeTab, setActiveTab] = useState<'80d' | 'hospitals' | 'faq' | 'downloads'>('80d');

  // 80D Calculator State
  const [selfAge, setSelfAge] = useState<number>(32);
  const [parentsAge, setParentsAge] = useState<number>(62);
  const [selfPremium, setSelfPremium] = useState<number>(24000);
  const [parentsPremium, setParentsPremium] = useState<number>(38000);

  if (!isOpen) return null;

  // Max 80D limits: Self/Family (<60): ₹25,000. Senior Parents (>=60): ₹50,000. Total max: ₹75,000.
  const selfEligible = Math.min(selfPremium, selfAge >= 60 ? 50000 : 25000);
  const parentsEligible = Math.min(parentsPremium, parentsAge >= 60 ? 50000 : 25000);
  const totalDeduction = selfEligible + parentsEligible;
  const estimatedTaxSaved = Math.round(totalDeduction * 0.312); // approx 30% slab + cess

  const networkHospitals = [
    { name: 'Fortis Hospital', city: 'Bengaluru (Cunningham & Bannerghatta)', beds: '450 Beds', tpa: 'Cashless Direct Counter', cashless: 'Yes', rating: 4.8 },
    { name: 'Apollo Hospital', city: 'Bengaluru (Jayanagar & Sheshadripuram)', beds: '600 Beds', tpa: 'Green-Channel TPA', cashless: 'Yes', rating: 4.9 },
    { name: 'Manipal Hospital', city: 'Bengaluru (HAL Airport Road & Whitefield)', beds: '750 Beds', tpa: 'Instant Pre-Auth Desk', cashless: 'Yes', rating: 4.85 },
    { name: 'Max Super Speciality Hospital', city: 'Delhi NCR (Saket & Patparganj)', beds: '500 Beds', tpa: 'Express Cashless', cashless: 'Yes', rating: 4.9 },
    { name: 'Kokilaben Dhirubhai Ambani Hospital', city: 'Mumbai (Andheri West)', beds: '750 Beds', tpa: 'Direct Insurer Port', cashless: 'Yes', rating: 4.95 },
    { name: 'Medanta - The Medicity', city: 'Gurugram (Sector 38)', beds: '1250 Beds', tpa: 'Cashless Superdesk', cashless: 'Yes', rating: 4.9 },
  ];

  const faqs = [
    { q: 'What is CKYC and why is it mandatory for buying insurance in India?', a: 'Central KYC Registry (CKYC) is an initiative by the Government of India and IRDAI to centralize KYC records of financial sector customers. Once verified, you receive a 14-digit CKYC number that eliminates the need to submit documents repeatedly when buying policies.' },
    { q: 'How does Cashless Hospitalization work with CoverFlow?', a: 'Present your CoverFlow Digital Health Card at the hospital TPA desk. The hospital intimates us digitally, and our automated underwriting system grants pre-authorization within 30 minutes, settling bills directly.' },
    { q: 'Can I claim tax deduction under Section 80D for preventive health checkups?', a: 'Yes! Within the overall Section 80D limits, up to ₹5,000 can be claimed for preventive health checkups for self, spouse, and children.' },
    { q: 'What is No Claim Bonus (NCB) in Motor Insurance?', a: 'NCB is a reward discount given on own-damage premium for every claim-free year. It starts at 20% for the first claim-free year and can increase up to 50% for five consecutive claim-free years.' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-900 via-slate-900 to-teal-950 text-white px-6 py-5 flex items-center justify-between border-b border-teal-500/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display tracking-tight text-white">
                InsurTech Resources & Knowledge Hub
              </h3>
              <p className="text-xs text-slate-300">
                Tax savings calculator, cashless hospital directory, regulatory guides, and policy tools.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex items-center space-x-2 overflow-x-auto">
          {[
            { id: '80d', label: 'Section 80D Calculator', icon: Calculator },
            { id: 'hospitals', label: 'Cashless Network Hospitals', icon: Building },
            { id: 'faq', label: 'IRDAI Guidelines & FAQ', icon: HelpCircle },
            { id: 'downloads', label: 'Tax & Claim Forms', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center space-x-1.5 transition-all ${
                  isActive ? 'bg-navy-900 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">

          {/* TAB 1: 80D CALCULATOR */}
          {activeTab === '80d' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 text-xs">
                <div className="font-bold flex items-center space-x-1.5 mb-1">
                  <Calculator className="w-4 h-4 text-teal-700" />
                  <span>Section 80D Income Tax Exemption Estimator (FY 2026-27)</span>
                </div>
                <p className="text-teal-800 text-[11px]">
                  Calculate your tax deduction under Section 80D for health insurance premiums paid for yourself, your family, and senior citizen parents.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-1">
                      Your Age ({selfAge} Years)
                    </label>
                    <input
                      type="range"
                      min={18}
                      max={75}
                      value={selfAge}
                      onChange={(e) => setSelfAge(Number(e.target.value))}
                      className="w-full accent-teal-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>18 Yrs</span>
                      <span>Below 60: Max ₹25,000</span>
                      <span>Senior 60+: Max ₹50,000</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-1">
                      Self & Family Annual Health Premium (₹)
                    </label>
                    <input
                      type="number"
                      value={selfPremium}
                      onChange={(e) => setSelfPremium(Number(e.target.value))}
                      className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-navy-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-1">
                      Parents Age ({parentsAge} Years)
                    </label>
                    <input
                      type="range"
                      min={50}
                      max={90}
                      value={parentsAge}
                      onChange={(e) => setParentsAge(Number(e.target.value))}
                      className="w-full accent-teal-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-1">
                      Parents Annual Health Premium (₹)
                    </label>
                    <input
                      type="number"
                      value={parentsPremium}
                      onChange={(e) => setParentsPremium(Number(e.target.value))}
                      className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-navy-900"
                    />
                  </div>
                </div>

                {/* Calculation Result */}
                <div className="p-6 rounded-3xl bg-navy-950 text-white flex flex-col justify-between border border-teal-500/30 shadow-elevated">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-teal-400 font-extrabold block mb-1">
                      Tax Savings Summary
                    </span>
                    <h4 className="text-xl font-bold font-display">Section 80D Benefits</h4>

                    <div className="mt-4 space-y-2.5 text-xs">
                      <div className="flex justify-between pb-2 border-b border-white/10">
                        <span className="text-slate-400">Self & Family Deduction:</span>
                        <span className="font-bold text-teal-300">₹{selfEligible.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-white/10">
                        <span className="text-slate-400">Parents Deduction:</span>
                        <span className="font-bold text-teal-300">₹{parentsEligible.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm pt-1">
                        <span className="font-bold text-white">Total 80D Exemption:</span>
                        <span className="font-extrabold text-emerald-400">₹{totalDeduction.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 text-center">
                    <span className="text-[11px] text-slate-400 block">Estimated Tax Saved (30% Slab + Cess):</span>
                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 font-display">
                      ₹{estimatedTaxSaved.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: NETWORK HOSPITALS */}
          {activeTab === 'hospitals' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-navy-900">
                  Showing 6 of 12,000+ Cashless Network Hospitals
                </span>
                <span className="text-[11px] text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full font-bold">
                  Zero-Waitlist Green Channel Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {networkHospitals.map((h, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-teal-500/50 transition-all space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-navy-900">{h.name}</h4>
                        <p className="text-[11px] text-slate-500">{h.city}</p>
                      </div>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        ★ {h.rating}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <span>{h.beds}</span>
                      <span className="font-semibold text-teal-700">{h.tpa}</span>
                      <span className="font-bold text-emerald-700">✓ Cashless</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <h4 className="text-xs font-bold text-navy-900 flex items-start space-x-2">
                    <span className="text-teal-600 font-extrabold">Q:</span>
                    <span>{f.q}</span>
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed pl-4">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: DOWNLOADS */}
          {activeTab === 'downloads' && (
            <div className="space-y-3">
              {[
                { name: 'Section_80D_Tax_Certificate_FY26.pdf', size: '420 KB', desc: 'Pre-filled certificate with insurer seal for income tax return filing' },
                { name: 'Cashless_Hospitalization_PreAuth_Form_IRDAI.pdf', size: '650 KB', desc: 'Official standard pre-authorization form for hospital admissions' },
                { name: 'Motor_Claim_Intimation_Accident_Checklist.pdf', size: '320 KB', desc: 'Step-by-step checklist for immediate surveyor inspection & towing' },
                { name: 'CoverFlow_Digital_KYC_Consent_Form.pdf', size: '280 KB', desc: 'UIDAI & DigiLocker e-KYC compliance and regulatory disclosure' },
              ].map((doc, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between hover:border-slate-300 transition-colors">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-teal-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-navy-900">{doc.name}</div>
                      <div className="text-[11px] text-slate-500">{doc.desc} • {doc.size}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Downloading ${doc.name}...`)}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 shrink-0 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenKyc();
            }}
            className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center space-x-1"
          >
            <span>Need KYC verification? Open Digital KYC</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold transition-all"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
