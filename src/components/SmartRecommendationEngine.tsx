import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Sliders, 
  ShieldCheck, 
  ArrowRight, 
  Info,
  DollarSign,
  Heart,
  Users,
  Building,
  Car
} from 'lucide-react';
import { ProductType } from '../types/insurance';

interface SmartRecommendationEngineProps {
  onApplyRecommendation: (product: ProductType, sumInsured: string) => void;
}

export const SmartRecommendationEngine: React.FC<SmartRecommendationEngineProps> = ({
  onApplyRecommendation
}) => {
  const [age, setAge] = useState<number>(29);
  const [cityTier, setCityTier] = useState<'tier1' | 'tier2' | 'tier3'>('tier1');
  const [familySize, setFamilySize] = useState<number>(2); // 1: Self, 2: Couple, 3: +Kids, 4: Joint
  const [incomeRange, setIncomeRange] = useState<string>('12-25');
  const [riskAppetite, setRiskAppetite] = useState<'low' | 'moderate' | 'high'>('moderate');
  const [hasVehicle, setHasVehicle] = useState<boolean>(true);
  const [preExistingConditions, setPreExistingConditions] = useState<boolean>(false);
  const [primaryGoal, setPrimaryGoal] = useState<'health' | 'wealth' | 'family' | 'comprehensive'>('comprehensive');

  // Recommendation algorithm simulation
  const recommendation = useMemo(() => {
    let confidence = 92;
    let sumInsured = '₹10 Lakh';
    let deductible = '₹3,000';
    let monthlyPremium = '₹799 - ₹950';
    let product: ProductType = 'health';
    let rationale = '';

    if (familySize > 2) {
      sumInsured = '₹20 Lakh (Family Floater)';
      deductible = '₹2,500';
      monthlyPremium = '₹1,299 - ₹1,550';
      confidence = 96;
      rationale = `Given your family size of ${familySize} in a ${cityTier === 'tier1' ? 'Tier-1 Metro' : 'Urban'} area, healthcare inflation requires minimum ₹20L floater with unlimited restoration.`;
    } else if (age > 45 || preExistingConditions) {
      sumInsured = '₹15 Lakh Comprehensive';
      deductible = '₹5,000 (Lowers premium by 22%)';
      monthlyPremium = '₹1,450 - ₹1,800';
      confidence = 94;
      rationale = 'Focused on zero room-rent capping, pre-existing disease waiting waiver, and cashless OPD consultation cover.';
    } else {
      sumInsured = '₹10 Lakh Super Top-Up Ready';
      deductible = '₹3,000';
      monthlyPremium = '₹649 - ₹799';
      confidence = 97;
      rationale = 'Optimal balance for young professionals with zero deductible for day-care and emergency procedures.';
    }

    if (primaryGoal === 'family') {
      product = 'life';
      sumInsured = incomeRange === '12-25' || incomeRange === '25+' ? '₹1.5 Crore Pure Term' : '₹75 Lakh Pure Term';
      deductible = '₹0';
      monthlyPremium = '₹690 - ₹890';
      rationale = `Term Life cover calibrated at 12x of your annual earnings bracket to safeguard family living standard and liabilities.`;
    }

    return {
      product,
      confidence,
      sumInsured,
      deductible,
      monthlyPremium,
      rationale,
      benefits: [
        '100% Cashless hospitalization at 12,000+ top hospitals',
        'No co-payment or sub-limits on modern surgeries',
        'Annual free health checkup for all insured members',
        'Direct claim concierge with 30-minute discharge approval'
      ],
      exclusions: [
        'Cosmetic or aesthetic surgeries',
        'Unapproved non-allopathic treatments without qualified practitioner certification'
      ]
    };
  }, [age, cityTier, familySize, incomeRange, riskAppetite, hasVehicle, preExistingConditions, primaryGoal]);

  return (
    <section id="recommendation" className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>AI-Assisted Underwriting Simulation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-display tracking-tight">
            Smart Insurance Recommendation
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Tailor insurance coverage parameters to match your family demographics, financial goals, and risk profile.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Input Factor Controls (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-navy-900 font-display flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-teal-600" />
                <span>Configure Your Profile Factors</span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">8 Parameters</span>
            </div>

            {/* Factor 1: Age Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-navy-900 mb-2">
                <span>Primary Applicant Age</span>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 font-extrabold text-sm">
                  {age} years
                </span>
              </div>
              <input
                type="range"
                min={18}
                max={70}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>18 yrs</span>
                <span>45 yrs</span>
                <span>70 yrs</span>
              </div>
            </div>

            {/* Factor 2: Location Tier */}
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-2">
                Residential Location Tier
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'tier1', label: 'Tier-1 Metro', desc: 'Bangalore, Mumbai, Delhi' },
                  { id: 'tier2', label: 'Tier-2 Urban', desc: 'Pune, Jaipur, Kochi' },
                  { id: 'tier3', label: 'Tier-3 / Semi-Urban', desc: 'Rest of India' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCityTier(item.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      cityTier === item.id
                        ? 'border-teal-500 bg-teal-50/60 text-teal-900 font-semibold ring-1 ring-teal-500'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-bold">{item.label}</div>
                    <div className="text-[10px] text-slate-500">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Factor 3: Family Size */}
            <div>
              <label className="block text-xs font-bold text-navy-900 mb-2">
                Members Requiring Protection
              </label>
              <div className="grid grid-cols-4 gap-2 text-xs">
                {[
                  { id: 1, label: 'Individual', icon: '👤' },
                  { id: 2, label: 'Couple', icon: '👫' },
                  { id: 3, label: 'Family (1 Kid)', icon: '👨‍👩‍👧' },
                  { id: 4, label: 'Joint Family', icon: '👨‍👩‍👧‍👦' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFamilySize(item.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      familySize === item.id
                        ? 'border-teal-500 bg-teal-50/60 text-teal-900 font-bold ring-1 ring-teal-500'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="text-lg">{item.icon}</div>
                    <div className="text-[11px] mt-1">{item.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Factor 4: Income Range & Risk Tolerance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-2">
                  Annual Household Income
                </label>
                <select
                  value={incomeRange}
                  onChange={(e) => setIncomeRange(e.target.value)}
                  className="w-full text-xs font-semibold text-navy-900 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option value="below-5">Up to ₹5 Lakh</option>
                  <option value="5-12">₹5 Lakh - ₹12 Lakh</option>
                  <option value="12-25">₹12 Lakh - ₹25 Lakh</option>
                  <option value="25+">₹25 Lakh+</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-2">
                  Risk Preference (Deductible)
                </label>
                <select
                  value={riskAppetite}
                  onChange={(e) => setRiskAppetite(e.target.value as any)}
                  className="w-full text-xs font-semibold text-navy-900 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option value="low">Zero Deductible (Maximum peace of mind)</option>
                  <option value="moderate">Balanced Deductible (Best value)</option>
                  <option value="high">High Deductible (Lowest premium)</option>
                </select>
              </div>
            </div>

            {/* Factor 5: Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <label className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={hasVehicle}
                  onChange={(e) => setHasVehicle(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                />
                <span className="text-xs font-semibold text-slate-800">Owns Car / EV Vehicle</span>
              </label>

              <label className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={preExistingConditions}
                  onChange={(e) => setPreExistingConditions(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                />
                <span className="text-xs font-semibold text-slate-800">Pre-existing Medical History</span>
              </label>
            </div>

          </div>

          {/* RIGHT: Dynamic Recommendation Result Card (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-navy-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-floating space-y-6">
            
            {/* Header & Confidence Match Score */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400">
                  Recommendation Engine
                </span>
                <h3 className="text-xl font-bold font-display mt-0.5">
                  Your Tailored Plan
                </h3>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center space-x-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-full text-xs font-extrabold">
                  <Sparkles className="w-3 h-3" />
                  <span>{recommendation.confidence}% Match</span>
                </div>
              </div>
            </div>

            {/* Highlighted Recommendations */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div>
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Recommended Sum</div>
                <div className="text-lg font-bold text-teal-300 font-display mt-0.5">{recommendation.sumInsured}</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Est. Premium</div>
                <div className="text-lg font-bold text-emerald-400 font-display mt-0.5">{recommendation.monthlyPremium}</div>
              </div>
              <div className="col-span-2 pt-2 border-t border-white/10 flex justify-between text-xs">
                <span className="text-slate-400">Deductible:</span>
                <span className="font-semibold text-slate-200">{recommendation.deductible}</span>
              </div>
            </div>

            {/* Rationale Note */}
            <div className="text-xs text-slate-300 bg-white/5 p-3.5 rounded-xl border border-white/10 leading-relaxed">
              <span className="font-bold text-teal-300 mr-1">Underwriting Rationale:</span>
              {recommendation.rationale}
            </div>

            {/* Key Benefits */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Tailored Benefits:
              </div>
              {recommendation.benefits.map((b, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 mt-0.5 shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            {/* CTA Action */}
            <button
              type="button"
              onClick={() => onApplyRecommendation(recommendation.product, recommendation.sumInsured)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-navy-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center space-x-2"
            >
              <span>Apply Recommended Coverage</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Compliance Disclaimer */}
            <div className="text-[10px] text-slate-400 leading-relaxed flex items-start space-x-1.5 pt-2">
              <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>
                Simulated recommendation for informational purposes. Does not guarantee insurer underwriting acceptance, final premium, or claims approval.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
