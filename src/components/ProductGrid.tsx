import React, { useState } from 'react';
import { 
  Heart, 
  Car, 
  Users, 
  Home, 
  Plane, 
  Briefcase, 
  Smartphone, 
  Check, 
  XCircle, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  Building2,
  Sparkles
} from 'lucide-react';
import { COMPARISON_DATA } from '../data/mockData';
import { ProductType, PlanTier } from '../types/insurance';

interface ProductGridProps {
  onSelectPlan: (plan: PlanTier, category: ProductType) => void;
  onOpenFinder: (category: ProductType) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ onSelectPlan, onOpenFinder }) => {
  const [activeTab, setActiveTab] = useState<ProductType>('health');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const categories: { id: ProductType; label: string; icon: any }[] = [
    { id: 'health', label: 'Health Insurance', icon: Heart },
    { id: 'auto', label: 'Motor & EV', icon: Car },
    { id: 'life', label: 'Term Life', icon: Users },
    { id: 'home', label: 'Home Insurance', icon: Home },
    { id: 'travel', label: 'Travel Protection', icon: Plane },
    { id: 'business', label: 'Business & Cyber', icon: Briefcase },
    { id: 'device', label: 'Gadget Shield', icon: Smartphone },
  ];

  const currentData = COMPARISON_DATA[activeTab];

  return (
    <section id="products" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Regulated Digital Products</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-display tracking-tight">
            Curated Insurance Products
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Compare plans across top-rated insurers with transparent policy wordings and 100% cashless claims.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="mt-6 inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-lg transition-all ${
                billingCycle === 'monthly' ? 'bg-white text-navy-900 shadow-xs' : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              Pay Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
                billingCycle === 'annual' ? 'bg-white text-navy-900 shadow-xs' : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.2 rounded font-bold">
                Save 10%
              </span>
            </button>
          </div>
        </div>

        {/* Product Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-navy-900 text-white shadow-md'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-navy-900 border border-slate-200/70'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3 Tier Plan Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {currentData.tiers.map((tier) => {
            const price = billingCycle === 'monthly' ? tier.premiumMonthly : tier.premiumAnnual;
            const period = billingCycle === 'monthly' ? '/month' : '/year';

            return (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                  tier.isPopular
                    ? 'bg-gradient-to-b from-teal-900 via-navy-900 to-slate-900 text-white shadow-floating ring-2 ring-teal-500/50 scale-100 lg:scale-105 z-10'
                    : 'bg-white text-navy-900 border border-slate-200/90 shadow-subtle hover:shadow-elevated hover:border-teal-300'
                }`}
              >
                {/* Popular Ribbon */}
                {tier.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-400 to-emerald-400 text-navy-950 px-4 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase shadow-md flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        tier.isPopular ? 'bg-white/10 text-teal-300' : 'bg-teal-50 text-teal-800'
                      }`}>
                        {tier.badge}
                      </span>
                      <h3 className="text-xl font-bold font-display mt-2.5">
                        {tier.name}
                      </h3>
                      <div className="flex items-center space-x-1 text-xs mt-1 opacity-80">
                        <Building2 className="w-3 h-3" />
                        <span>{tier.insurerName}</span>
                        <div className="flex items-center text-amber-400 ml-2">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span className="text-[11px] font-bold ml-0.5">{tier.insurerRating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Box */}
                  <div className="my-6 pb-6 border-b border-slate-100/15">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-3xl sm:text-4xl font-extrabold font-display">
                        ₹{price.toLocaleString()}
                      </span>
                      <span className={`text-xs ${tier.isPopular ? 'text-slate-300' : 'text-slate-500'}`}>
                        {period}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-3 pt-3 border-t border-dashed border-slate-200/20">
                      <span>Sum Insured: <strong className="text-teal-400 font-bold">{tier.coverageAmount}</strong></span>
                      <span>Deductible: <strong>{tier.deductible}</strong></span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-3 mb-6">
                    <div className={`text-xs font-bold uppercase tracking-wider ${
                      tier.isPopular ? 'text-teal-300' : 'text-slate-500'
                    }`}>
                      Included Coverage:
                    </div>
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-2 text-xs leading-relaxed">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${
                          tier.isPopular ? 'text-teal-400' : 'text-teal-600'
                        }`} />
                        <span className={tier.isPopular ? 'text-slate-200' : 'text-slate-700'}>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Exclusions Note */}
                  <div className="pt-3 mb-6 border-t border-slate-100/10 text-[11px] opacity-75">
                    <div className="font-semibold mb-1 flex items-center space-x-1">
                      <XCircle className="w-3 h-3 text-rose-400" />
                      <span>Key Exclusions:</span>
                    </div>
                    <p>{tier.exclusions.join(', ')}</p>
                  </div>
                </div>

                {/* Card CTA Action */}
                <div className="pt-4 space-y-2">
                  <button
                    type="button"
                    onClick={() => onSelectPlan(tier, activeTab)}
                    className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center space-x-2 ${
                      tier.isPopular
                        ? 'bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-navy-950 shadow-teal-500/20'
                        : 'bg-navy-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>Choose {tier.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center text-[10px] opacity-70">
                    Settlement Ratio: <strong>{tier.settlementRatio}</strong> • Instant KYC
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 border border-teal-200/70 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-navy-900">Need personalized policy advice?</h4>
              <p className="text-xs text-slate-600">Our recommendation simulator calculates optimal sum insured based on your family profile.</p>
            </div>
          </div>
          <button
            onClick={() => onOpenFinder(activeTab)}
            className="px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-slate-800 text-white font-semibold text-xs whitespace-nowrap shadow-sm"
          >
            Launch Policy Finder Wizard
          </button>
        </div>

      </div>
    </section>
  );
};
