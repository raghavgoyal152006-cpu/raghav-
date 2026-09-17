import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Car, 
  Users, 
  Home, 
  Plane, 
  Briefcase, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Watch, 
  CheckCircle2, 
  RefreshCw,
  Download
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
  
  // Health/Life State
  const [beneficiaries, setBeneficiaries] = useState<string[]>(['Self', 'Spouse']);
  
  // Gadget Shield State
  const [gadgetType, setGadgetType] = useState<'smartphone' | 'laptop' | 'tablet' | 'smartwatch'>('smartphone');
  const [gadgetModel, setGadgetModel] = useState('Apple iPhone 16 Pro (256GB)');
  const [gadgetAge, setGadgetAge] = useState('< 30 Days (Brand New)');

  // Auto Insurance State
  const [vehicleType, setVehicleType] = useState('Four Wheeler (SUV / Sedan)');
  const [fuelType, setFuelType] = useState('Electric Vehicle (EV)');

  // Coverage & Budget
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
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newPolicy = {
      id: `POL-${randomSuffix}`,
      policyNumber: `CF-${selectedCategory.toUpperCase()}-2026-${randomSuffix}`,
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
      idCardNumber: `CF-CRD-${randomSuffix}`,
    };

    setIssuedPolicyData(newPolicy);
    setIsCompleted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }

    if (onPolicyIssued) {
      onPolicyIssued(newPolicy);
    }
  };

  const handleBuyPlan = (plan: PlanTier) => {
    setSelectedPlan(plan);
    if (currentUser?.kycStatus === 'verified') {
      executePolicyIssuance(plan);
    } else {
      setStep(6); // Step 6 IRDAI KYC
    }
  };

  const handleVerifyKycAndIssue = () => {
    setKycVerifying(true);
    setTimeout(() => {
      setKycVerifying(false);
      const ckycNum = `CKYC-2026-${Math.floor(1000000 + Math.random() * 9000000)}`;
      if (onKycVerified) {
        onKycVerified({
          panNumber: wizardPan.toUpperCase(),
          panName: (currentUser?.name || 'Rohan Sharma').toUpperCase(),
          aadhaarNumber: 'XXXX XXXX 8912',
          aadhaarVerified: true,
          ckycNumber: ckycNum,
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              CF
            </div>
            <div>
              <h3 className="text-sm font-bold text-navy-900 font-display">
                Interactive Policy Finder Wizard
              </h3>
              <p className="text-[11px] text-slate-500">
                Step {step > 5 ? 5 : step} of 5 — {
                  step === 1 ? 'Protection Domain' :
                  step === 2 ? (selectedCategory === 'device' ? 'Select Gadget' : selectedCategory === 'auto' ? 'Vehicle Details' : 'Members / Nominees') :
                  step === 3 ? 'Coverage Level' :
                  step === 4 ? 'Budget & Add-ons' :
                  step === 5 ? 'Curated Plan Comparison' :
                  'IRDAI e-KYC Verification'
                }
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
            style={{ width: `${(Math.min(step, 5) / 5) * 100}%` }}
          />
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 min-h-[390px] flex flex-col justify-between">
          
          {/* STEP 1: What do you want to protect? */}
          {step === 1 && !isCompleted && (
            <div className="space-y-5 animate-in fade-in">
              <div className="text-center max-w-md mx-auto mb-4">
                <h4 className="text-xl font-bold text-navy-900 font-display">
                  What do you want to protect?
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Select your primary insurance category for customized underwriting quotes.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'health' as ProductType, label: 'Health & Medical', icon: Heart, desc: '12,000+ Cashless Hospitals' },
                  { id: 'auto' as ProductType, label: 'Car & EV Shield', icon: Car, desc: 'Zero-Dep & Roadside Assist' },
                  { id: 'device' as ProductType, label: 'Gadget Shield', icon: Smartphone, desc: 'Phones, Laptops & Screen' },
                  { id: 'life' as ProductType, label: 'Term Life Cover', icon: Users, desc: '₹1 Cr+ Pure Protection' },
                  { id: 'home' as ProductType, label: 'Home & Property', icon: Home, desc: 'Fire, Earthquake & Contents' },
                  { id: 'travel' as ProductType, label: 'Travel Protection', icon: Plane, desc: 'Schengen & Worldwide Medical' },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedCategory === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedCategory(item.id)}
                      className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between group ${
                        isSelected
                          ? 'border-teal-500 bg-teal-50/50 shadow-sm ring-1 ring-teal-500/20'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:text-navy-900'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-teal-600" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-navy-900">{item.label}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: CONTEXTUAL SPECIFICATION (Tailored for Gadget, Auto, or Health) */}
          {step === 2 && !isCompleted && (
            <div className="space-y-5 animate-in fade-in">
              {selectedCategory === 'device' ? (
                /* Gadget Shield Custom Step 2 */
                <div className="space-y-4">
                  <div className="text-center max-w-md mx-auto mb-3">
                    <h4 className="text-xl font-bold text-navy-900 font-display">
                      Select Your Smart Device
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Choose your gadget category, brand, and purchase age for instant coverage.
                    </p>
                  </div>

                  {/* Device Form Factor Selector */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'smartphone' as const, label: 'Smartphone', icon: Smartphone },
                      { id: 'laptop' as const, label: 'Laptop / Mac', icon: Laptop },
                      { id: 'tablet' as const, label: 'Tablet / iPad', icon: Tablet },
                      { id: 'smartwatch' as const, label: 'Smartwatch', icon: Watch },
                    ].map((g) => {
                      const GIcon = g.icon;
                      const isSelected = gadgetType === g.id;
                      return (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => setGadgetType(g.id)}
                          className={`p-3 rounded-2xl border text-center transition-all ${
                            isSelected
                              ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-2xs font-bold'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium'
                          }`}
                        >
                          <GIcon className="w-5 h-5 mx-auto mb-1 text-teal-600" />
                          <span className="text-xs block">{g.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Device Model Selector */}
                  <div>
                    <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                      Device Model & Configuration
                    </label>
                    <select
                      value={gadgetModel}
                      onChange={(e) => setGadgetModel(e.target.value)}
                      className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy-900 focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="Apple iPhone 16 Pro (256GB)">Apple iPhone 16 Pro (256GB)</option>
                      <option value="Apple iPhone 15 / 15 Plus">Apple iPhone 15 / 15 Plus</option>
                      <option value="Apple MacBook Pro M3 14-inch">Apple MacBook Pro M3 14-inch</option>
                      <option value="Samsung Galaxy S24 Ultra (512GB)">Samsung Galaxy S24 Ultra (512GB)</option>
                      <option value="OnePlus 12 (16GB RAM)">OnePlus 12 (16GB RAM)</option>
                      <option value="Apple iPad Air M2 11-inch">Apple iPad Air M2 11-inch</option>
                      <option value="Apple Watch Ultra 2">Apple Watch Ultra 2</option>
                    </select>
                  </div>

                  {/* Device Age / Condition */}
                  <div>
                    <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                      When did you purchase this device?
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['< 30 Days (Brand New)', '1 - 6 Months Old', '6 - 12 Months Old'].map((age) => (
                        <button
                          key={age}
                          type="button"
                          onClick={() => setGadgetAge(age)}
                          className={`p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                            gadgetAge === age
                              ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {age}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : selectedCategory === 'auto' ? (
                /* Auto Insurance Step 2 */
                <div className="space-y-4">
                  <div className="text-center max-w-md mx-auto mb-3">
                    <h4 className="text-xl font-bold text-navy-900 font-display">
                      Vehicle & Registration Details
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Choose vehicle category and powertrain for accurate Insured Declared Value (IDV).
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                        Vehicle Classification
                      </label>
                      <select
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-navy-900 focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="Four Wheeler (SUV / Sedan)">Four Wheeler (SUV / Sedan / Hatchback)</option>
                        <option value="Luxury / Premium Vehicle">Luxury / Premium (Audi, BMW, Mercedes)</option>
                        <option value="Electric Vehicle (EV)">Electric Vehicle (Tata EV, Tesla, Hyundai)</option>
                        <option value="Two Wheeler / Motorbike">Two Wheeler / Electric Scooter</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                        Fuel & Powertrain Type
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {['Electric (EV)', 'Petrol', 'Diesel', 'Hybrid / CNG'].map((fuel) => (
                          <button
                            key={fuel}
                            type="button"
                            onClick={() => setFuelType(fuel)}
                            className={`p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                              fuelType === fuel
                                ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {fuel}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Health / Life Standard Step 2 */
                <div className="space-y-4">
                  <div className="text-center max-w-md mx-auto mb-4">
                    <h4 className="text-xl font-bold text-navy-900 font-display">
                      Who are you protecting?
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Select all family members you want to include in this policy.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['Self', 'Spouse', 'Children', 'Parents'].map((member) => {
                      const isSelected = beneficiaries.includes(member);
                      return (
                        <button
                          key={member}
                          type="button"
                          onClick={() => toggleBeneficiary(member)}
                          className={`p-4 rounded-2xl border text-center transition-all ${
                            isSelected
                              ? 'border-teal-500 bg-teal-50/50 shadow-sm font-bold text-teal-900'
                              : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                          }`}
                        >
                          <div className="text-sm">{member}</div>
                          <div className="text-[10px] text-slate-500 mt-1">
                            {isSelected ? 'Included' : '+ Add to Plan'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Coverage Limit */}
          {step === 3 && !isCompleted && (
            <div className="space-y-4 animate-in fade-in">
              <div className="text-center max-w-md mx-auto mb-4">
                <h4 className="text-xl font-bold text-navy-900 font-display">
                  {selectedCategory === 'device' ? 'Choose Device Protection Tier' : 'Select Desired Coverage Limit'}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  {selectedCategory === 'device' ? 'Select screen repair, liquid damage, or comprehensive OEM shield.' : 'Higher coverage gives maximum financial peace of mind during emergency claims.'}
                </p>
              </div>

              {selectedCategory === 'device' ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'screen', title: 'Screen Protection', amount: '₹15,000 Screen Cover', desc: '1 Free OEM screen replacement + liquid spill repair' },
                    { id: 'allrisk', title: 'All-Risk Device Shield', amount: 'Full Invoice Price', desc: 'Motherboard, camera, liquid & theft with 72h repair' },
                    { id: 'family', title: 'Family Ecosystem', amount: 'Up to 3 Devices', desc: 'Cover phone, laptop, and watch in one discounted bundle' },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setCoverageLevel(tier.id)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        coverageLevel === tier.id
                          ? 'border-teal-500 bg-teal-50/50 shadow-sm'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-bold text-navy-900">{tier.title}</div>
                      <div className="text-base font-extrabold text-teal-700 mt-1">{tier.amount}</div>
                      <div className="text-[11px] text-slate-500 mt-1">{tier.desc}</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: '5L', amount: '₹5 Lakh', label: 'Essential Cover', desc: 'Good for young individuals' },
                    { id: '10L', amount: '₹10 Lakh', label: 'Most Popular', desc: 'Ideal for couples & small families' },
                    { id: '25L', amount: '₹25 Lakh+', label: 'Elite Protection', desc: 'Complete high-end hospital coverage' },
                  ].map((level) => (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setCoverageLevel(level.id)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        coverageLevel === level.id
                          ? 'border-teal-500 bg-teal-50/50 shadow-sm'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-bold text-navy-900">{level.label}</div>
                      <div className="text-xl font-extrabold text-teal-700 mt-1">{level.amount}</div>
                      <div className="text-[11px] text-slate-500 mt-1">{level.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Budget & Add-ons */}
          {step === 4 && !isCompleted && (
            <div className="space-y-5 animate-in fade-in">
              <div className="text-center max-w-md mx-auto mb-2">
                <h4 className="text-xl font-bold text-navy-900 font-display">
                  Budget & Smart Add-ons
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Fine-tune your deductible riders and monthly premium allocation.
                </p>
              </div>

              {/* Add-ons Checklist */}
              <div className="space-y-2">
                {[
                  { name: selectedCategory === 'device' ? 'Zero Deductible Repair Waiver' : 'Zero Deductible OPD & Diagnostic Cover', price: '+ ₹49/mo' },
                  { name: selectedCategory === 'device' ? 'Worldwide Overseas Theft & Loss Rider' : 'Consumables & PPE Equipment Cover', price: '+ ₹29/mo' },
                  { name: selectedCategory === 'device' ? 'Doorstep Pick-Up & Free Loaner Phone' : 'Unlimited Restoration of Sum Insured', price: '+ ₹59/mo' },
                ].map((addon) => {
                  const isChecked = addOns.includes(addon.name);
                  return (
                    <div
                      key={addon.name}
                      onClick={() => toggleAddOn(addon.name)}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked ? 'bg-teal-50/50 border-teal-400' : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center ${
                          isChecked ? 'bg-teal-600 text-white' : 'border border-slate-300'
                        }`}>
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-xs font-bold text-navy-900">{addon.name}</span>
                      </div>
                      <span className="text-xs font-bold text-teal-700">{addon.price}</span>
                    </div>
                  );
                })}
              </div>

              {/* Budget slider */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-navy-900">Target Monthly Budget:</span>
                  <span className="font-bold text-teal-700">₹{budgetMonthly} / month</span>
                </div>
                <input
                  type="range"
                  min={199}
                  max={3500}
                  step={50}
                  value={budgetMonthly}
                  onChange={(e) => setBudgetMonthly(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />
              </div>
            </div>
          )}

          {/* STEP 5: Compare & Instant Purchase */}
          {step === 5 && !isCompleted && (
            <div className="space-y-4 animate-in fade-in">
              <div className="text-center max-w-md mx-auto mb-3">
                <h4 className="text-xl font-bold text-navy-900 font-display">
                  Curated Matching Plans
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Based on your parameters for <strong className="capitalize">{selectedCategory}</strong>, here are the highest-rated verified plans.
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
                        {tier.isPopular && (
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                            Bestseller
                          </span>
                        )}
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
                      <RefreshCw className="w-4 h-4 animate-spin" />
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
                  type="button"
                  onClick={() => {
                    if (onViewCertificate) onViewCertificate(issuedPolicyData);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>View Official Policy Schedule</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
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
