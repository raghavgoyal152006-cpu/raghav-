import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Car, 
  Users, 
  Home, 
  Plane, 
  Briefcase, 
  Smartphone,
  Lock,
  Download,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProductType, PlanTier, UserProfile } from '../types/insurance';
import { COMPARISON_DATA } from '../data/mockData';

interface PolicyFinderWizardProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: ProductType;
  onPolicyIssued?: (newPolicy: any) => void;
  onViewCertificate?: (policy: any) => void;
  currentUser?: UserProfile | null;
  onKycVerified?: (data: any) => void;
}

export const PolicyFinderWizard: React.FC<PolicyFinderWizardProps> = ({
  isOpen,
  onClose,
  initialCategory = 'health',
  onPolicyIssued,
  onViewCertificate,
  currentUser,
  onKycVerified,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<ProductType>(initialCategory);
  const [beneficiaries, setBeneficiaries] = useState<string[]>(['Self', 'Spouse']);
  const [coverageLevel, setCoverageLevel] = useState<string>('10L');
  const [addOns, setAddOns] = useState<string[]>(['Zero Deductible OPD', 'Consumables Cover']);
  const [budgetMonthly, setBudgetMonthly] = useState<number>(850);
  const [selectedPlan, setSelectedPlan] = useState<PlanTier | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [issuedPolicyData, setIssuedPolicyData] = useState<any>(null);

  // Wizard KYC State
  const [wizardPan, setWizardPan] = useState(currentUser?.kycData?.panNumber || 'ABCPS1234F');
  const [wizardAadhaar, setWizardAadhaar] = useState('5421 8890 8912');
  const [kycVerifying, setKycVerifying] = useState(false);

  if (!isOpen) return null;

  const currentPlans = COMPARISON_DATA[selectedCategory]?.tiers || COMPARISON_DATA.health.tiers;

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const executePolicyIssuance = (plan: PlanTier) => {
    const newPolicy = {
      id: `POL-${Math.floor(10000 + Math.random() * 90000)}`,
      policyNumber: `CF-${selectedCategory.toUpperCase()}-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      title: `${plan.name} Comprehensive`,
      type: selectedCategory,
      insurer: plan.insurerName,
      coverageAmount: plan.coverageAmount,
      premiumPaid: `₹${plan.premiumMonthly} / mo`,
      frequency: 'monthly',
      startDate: 'Today',
      expiryDate: '31 Aug 2027',
      status: 'active',
      nominee: 'Priya Sharma (Spouse)',
      cashlessHospitalCount: 12000,
      idCardNumber: `CF-CRD-${Math.floor(10000 + Math.random() * 90000)}`,
    };

    setIssuedPolicyData(newPolicy);
    setIsCompleted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback
    }

    if (onPolicyIssued) {
      onPolicyIssued(newPolicy);
    }
  };

  const handleBuyPlan = (plan: PlanTier) => {
    setSelectedPlan(plan);
    // Check if user has completed KYC
    if (currentUser?.kycStatus === 'verified') {
      executePolicyIssuance(plan);
    } else {
      // Prompt Mandatory IRDAI KYC Verification Step 6
      setStep(6);
    }
  };

  const handleVerifyKycAndIssue = () => {
    setKycVerifying(true);
    setTimeout(() => {
      setKycVerifying(false);
      if (onKycVerified) {
        onKycVerified({
          panNumber: wizardPan.toUpperCase(),
          panName: (currentUser?.name || 'Rohan Sharma').toUpperCase(),
          aadhaarNumber: 'XXXX XXXX 8912',
          aadhaarVerified: true,
          ckycNumber: `CKYC-2026-${Math.floor(1000000 + Math.random() * 9000000)}`,
          documentType: 'aadhaar',
          documentNumber: '8912',
          documentFileName: 'DigiLocker_Verified.xml',
          ocrMatchScore: 99.7,
          livenessVerified: true,
          verifiedAt: 'Just Now',
          address: 'Flat 402, Green Glen Layout, Bellandur, Bengaluru 560103',
        });
      }
      if (selectedPlan) {
        executePolicyIssuance(selectedPlan);
      }
    }, 1000);
  };

  const toggleBeneficiary = (item: string) => {
    if (beneficiaries.includes(item)) {
      setBeneficiaries(beneficiaries.filter((b) => b !== item));
    } else {
      setBeneficiaries([...beneficiaries, item]);
    }
  };

  const toggleAddOn = (item: string) => {
    if (addOns.includes(item)) {
      setAddOns(addOns.filter((a) => a !== item));
    } else {
      setAddOns([...addOns, item]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
              CF
            </div>
            <div>
              <h3 className="text-sm font-bold text-navy-900 font-display">
                Policy Finder Wizard
              </h3>
              <p className="text-[11px] text-slate-500">
                Step {step} of 5 — {step === 1 ? 'Protection Type' : step === 2 ? 'Beneficiaries' : step === 3 ? 'Coverage Level' : step === 4 ? 'Budget & Add-ons' : 'Compare & Choose'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Step Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5">
          <div
            className="bg-gradient-to-r from-teal-500 to-emerald-500 h-1.5 transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 min-h-[380px] flex flex-col justify-between">
          
          {/* STEP 1: What do you want to protect? */}
          {step === 1 && !isCompleted && (
            <div className="space-y-4 animate-in fade-in">
              <div className="text-center max-w-md mx-auto mb-6">
                <h4 className="text-xl font-bold text-navy-900 font-display">
                  What do you want to protect?
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Choose the primary insurance domain for your customized quote.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'health' as ProductType, label: 'Health & Medical', icon: Heart },
                  { id: 'auto' as ProductType, label: 'Car & EV', icon: Car },
                  { id: 'life' as ProductType, label: 'Term Life', icon: Users },
                  { id: 'home' as ProductType, label: 'Home & Property', icon: Home },
                  { id: 'travel' as ProductType, label: 'Travel & Trips', icon: Plane },
                  { id: 'device' as ProductType, label: 'Smart Device', icon: Smartphone },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedCategory === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedCategory(item.id)}
                      className={`p-4 rounded-2xl border text-center transition-all ${
                        isSelected
                          ? 'border-teal-500 bg-teal-50/70 text-teal-900 ring-2 ring-teal-500/20 font-bold shadow-sm'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-teal-600' : 'text-slate-500'}`} />
                      <div className="text-xs font-semibold">{item.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Who needs protection? */}
          {step === 2 && !isCompleted && (
            <div className="space-y-4 animate-in fade-in">
              <div className="text-center max-w-md mx-auto mb-6">
                <h4 className="text-xl font-bold text-navy-900 font-display">
                  Who needs protection?
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Select all family members to include in this policy coverage.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'Self', icon: '🧑', desc: 'Primary Insured' },
                  { id: 'Spouse', icon: '👩', desc: 'Partner' },
                  { id: 'Son / Daughter', icon: '🧒', desc: 'Up to 25 yrs' },
                  { id: 'Parents', icon: '👴👵', desc: 'Senior Citizen Care' },
                ].map((member) => {
                  const isChecked = beneficiaries.includes(member.id);
                  return (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => toggleBeneficiary(member.id)}
                      className={`p-4 rounded-2xl border text-center transition-all ${
                        isChecked
                          ? 'border-teal-500 bg-teal-50/70 text-teal-900 font-bold ring-2 ring-teal-500/20'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="text-2xl mb-1">{member.icon}</div>
                      <div className="text-xs font-bold">{member.id}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{member.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Coverage Level & Add-ons */}
          {step === 3 && !isCompleted && (
            <div className="space-y-4 animate-in fade-in">
              <div className="text-center max-w-md mx-auto mb-4">
                <h4 className="text-xl font-bold text-navy-900 font-display">
                  Select Coverage Amount & Riders
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Choose optimal sum insured and custom protection add-ons.
                </p>
              </div>

              {/* Coverage Tier Selector */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { id: '5L', label: '₹5 Lakh', tag: 'Standard' },
                  { id: '10L', label: '₹10 Lakh', tag: 'Recommended' },
                  { id: '25L', label: '₹25 Lakh', tag: 'High Net Worth' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setCoverageLevel(tier.id)}
                    className={`p-3 rounded-xl border text-center ${
                      coverageLevel === tier.id
                        ? 'border-teal-500 bg-teal-50 font-bold text-teal-900 ring-1 ring-teal-500'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="text-sm font-bold">{tier.label}</div>
                    <div className="text-[10px] text-slate-500">{tier.tag}</div>
                  </button>
                ))}
              </div>

              {/* Add-on Checkboxes */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                  Recommended Add-on Riders:
                </div>
                {[
                  { id: 'Zero Deductible OPD', desc: 'Covers doctor consultations and pharmacy bills up to ₹15,000/yr' },
                  { id: 'Consumables Cover', desc: '100% reimbursement for gloves, masks, PPE, syringes' },
                  { id: 'Unlimited Restoration', desc: 'Automatic 100% refill of sum insured if exhausted' },
                ].map((addon) => {
                  const isChecked = addOns.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`flex items-start space-x-3 p-3 rounded-xl border cursor-pointer text-xs ${
                        isChecked ? 'border-teal-500 bg-teal-50/40 text-slate-900' : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        readOnly
                        className="mt-0.5 rounded text-teal-600 focus:ring-teal-500"
                      />
                      <div>
                        <div className="font-bold text-navy-900">{addon.id}</div>
                        <div className="text-[11px] text-slate-500">{addon.desc}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Budget Range */}
          {step === 4 && !isCompleted && (
            <div className="space-y-6 animate-in fade-in">
              <div className="text-center max-w-md mx-auto">
                <h4 className="text-xl font-bold text-navy-900 font-display">
                  What is your target monthly budget?
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  We'll surface only plans that comfortably match your budget ceiling.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
                <div className="text-3xl font-extrabold text-teal-600 font-display">
                  ₹{budgetMonthly} <span className="text-xs font-normal text-slate-500">/ month</span>
                </div>
                <input
                  type="range"
                  min={300}
                  max={2500}
                  step={50}
                  value={budgetMonthly}
                  onChange={(e) => setBudgetMonthly(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-xs text-slate-500 font-medium">
                  <span>₹300/mo (Basic)</span>
                  <span>₹1,200/mo (Standard)</span>
                  <span>₹2,500/mo (Elite)</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Compare & Instant Purchase */}
          {step === 5 && !isCompleted && (
            <div className="space-y-4 animate-in fade-in">
              <div className="text-center max-w-md mx-auto mb-4">
                <h4 className="text-xl font-bold text-navy-900 font-display">
                  Curated Matching Plans
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Based on your parameters, here are the highest-rated verified plans.
                </p>
              </div>

              <div className="space-y-3">
                {currentPlans.map((tier) => (
                  <div
                    key={tier.id}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-teal-400 bg-white hover:bg-teal-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-navy-900">{tier.name}</span>
                        <span className="text-[10px] font-semibold bg-teal-50 text-teal-700 px-2 py-0.5 rounded">
                          {tier.insurerName}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        Coverage: <strong>{tier.coverageAmount}</strong> • Deductible: <strong>{tier.deductible}</strong> • Network: {tier.networkSize}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end space-x-3">
                      <div className="text-right">
                        <div className="text-base font-extrabold text-navy-900">₹{tier.premiumMonthly}/mo</div>
                        <div className="text-[10px] text-emerald-600 font-semibold">{tier.settlementRatio} Claims Ratio</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleBuyPlan(tier)}
                        className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs"
                      >
                        Instant Buy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: MANDATORY IRDAI DIGITAL KYC */}
          {step === 6 && !isCompleted && selectedPlan && (
            <div className="space-y-5 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-900 to-navy-900 text-white flex items-start justify-between">
                <div>
                  <div className="text-[10px] text-teal-300 font-bold uppercase tracking-wider">
                    IRDAI Central Compliance
                  </div>
                  <h4 className="text-base font-bold font-display mt-0.5">
                    Mandatory Digital e-KYC Verification
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Government regulations require instant PAN and Aadhaar authentication before issuing {selectedPlan.name}.
                  </p>
                </div>
                <span className="text-[10px] bg-teal-500/20 text-teal-300 border border-teal-500/40 px-2 py-1 rounded-full font-bold">
                  DigiLocker FastTrack
                </span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                      10-Digit PAN Card
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      value={wizardPan}
                      onChange={(e) => setWizardPan(e.target.value.toUpperCase())}
                      placeholder="ABCPS1234F"
                      className="w-full text-sm font-mono uppercase bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-navy-900 font-bold focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                      12-Digit Aadhaar (Masked)
                    </label>
                    <input
                      type="text"
                      value={wizardAadhaar}
                      onChange={(e) => setWizardAadhaar(e.target.value)}
                      placeholder="XXXX XXXX 8912"
                      className="w-full text-sm font-mono bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-navy-900 font-bold focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center space-x-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold">Paperless DigiLocker Consent:</span>
                    <p className="text-[11px] text-emerald-700">
                      I authorize CoverFlow to fetch my verified e-KYC profile from UIDAI/NSDL to issue policy documents immediately.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleVerifyKycAndIssue}
                  disabled={kycVerifying}
                  className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md shadow-teal-600/20 transition-all"
                >
                  {kycVerifying ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Authenticating with CKYC Registry & Issuing Policy...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify e-KYC & Issue Policy Certificate</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* COMPLETED CELEBRATION STATE */}
          {isCompleted && issuedPolicyData && (
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div className="space-y-1">
                <h4 className="text-2xl font-extrabold text-navy-900 font-display">
                  Protection Active!
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Your policy certificate has been digitally issued and secured on the CoverFlow verified ledger.
                </p>
              </div>

              {/* Policy Card Summary */}
              <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between font-bold text-navy-900 border-b border-slate-200 pb-2">
                  <span>{issuedPolicyData.title}</span>
                  <span className="text-teal-600">{issuedPolicyData.policyNumber}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div>Insurer: <strong>{issuedPolicyData.insurer}</strong></div>
                  <div>Coverage: <strong className="text-emerald-700">{issuedPolicyData.coverageAmount}</strong></div>
                  <div>Valid Till: <strong>{issuedPolicyData.expiryDate}</strong></div>
                  <div>Premium: <strong>{issuedPolicyData.premiumPaid}</strong></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center space-x-3 pt-2">
                <button
                  onClick={() => {
                    if (onViewCertificate) onViewCertificate(issuedPolicyData);
                  }}
                  className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>View Policy Document</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                >
                  Done
                </button>
              </div>
            </div>
          )}

          {/* Bottom Navigation Buttons */}
          {!isCompleted && (
            <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 flex items-center space-x-1 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : <div />}

              {step < 5 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
