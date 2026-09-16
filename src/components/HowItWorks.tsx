import React from 'react';
import { Laptop, BarChart3, ShieldCheck, ArrowRight, Check } from 'lucide-react';

interface HowItWorksProps {
  onStartClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartClick }) => {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Reference */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold mb-3">
            <span>Simple 3-Step Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-display tracking-tight">
            How It Works
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Insurance without the traditional complexity. Instant quotes in under 2 minutes.
          </p>
        </div>

        {/* 3 Step Cards (Matching Visual Hierarchy of Reference) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* STEP 01 */}
          <div className="relative rounded-2xl border border-slate-200/90 bg-gradient-to-b from-slate-50/50 to-white p-7 shadow-subtle hover:shadow-elevated hover:border-teal-300 transition-all duration-300 group">
            
            {/* Step Number Tag */}
            <div className="flex items-center justify-between mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-100/70 text-teal-800 font-bold text-sm">
                1
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Step 01
              </span>
            </div>

            {/* Step Vector Illustration matching Reference */}
            <div className="w-full h-36 rounded-xl bg-teal-50/60 border border-teal-100/60 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
              {/* Laptop Graphic */}
              <div className="relative flex flex-col items-center">
                <div className="w-28 h-20 bg-white rounded-t-lg border-2 border-slate-300 shadow-sm p-1.5 flex flex-col justify-between">
                  <div className="w-full h-2.5 bg-teal-100 rounded-xs flex items-center px-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-1"></div>
                    <div className="w-8 h-1 bg-slate-300 rounded"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-1.5 bg-slate-100 rounded"></div>
                    <div className="w-3/4 h-1.5 bg-slate-100 rounded"></div>
                    <div className="w-1/2 h-1.5 bg-slate-100 rounded"></div>
                  </div>
                  <div className="w-6 h-2 bg-teal-600 rounded-xs mx-auto"></div>
                </div>
                <div className="w-36 h-2.5 bg-slate-300 rounded-b-lg shadow-sm border-t border-slate-400"></div>
              </div>
              <div className="absolute top-3 right-4 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold text-navy-900 font-display mb-2">
              Answer a Few Questions
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Tell us about yourself, your lifestyle, and what you want to protect. No invasive health interrogations.
            </p>
          </div>

          {/* STEP 02 */}
          <div className="relative rounded-2xl border border-slate-200/90 bg-gradient-to-b from-slate-50/50 to-white p-7 shadow-subtle hover:shadow-elevated hover:border-teal-300 transition-all duration-300 group">
            
            {/* Step Number Tag */}
            <div className="flex items-center justify-between mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-100/70 text-teal-800 font-bold text-sm">
                2
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Step 02
              </span>
            </div>

            {/* Comparison Dashboard Illustration matching Reference */}
            <div className="w-full h-36 rounded-xl bg-teal-50/60 border border-teal-100/60 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
              <div className="flex items-center space-x-3">
                {/* Bar Graph */}
                <div className="w-20 h-22 bg-white rounded-lg border border-slate-200 p-2 flex items-end justify-between space-x-1 shadow-sm">
                  <div className="w-3 h-8 bg-teal-300 rounded-t"></div>
                  <div className="w-3 h-14 bg-teal-500 rounded-t"></div>
                  <div className="w-3 h-18 bg-emerald-500 rounded-t"></div>
                </div>
                {/* Plan Tags */}
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-1 bg-white px-2 py-1 rounded shadow-2xs border border-slate-100 text-[10px] font-semibold text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                    <span>Essential</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-teal-600 px-2 py-1 rounded shadow-2xs text-[10px] font-semibold text-white">
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                    <span>Plus Shield</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-white px-2 py-1 rounded shadow-2xs border border-slate-100 text-[10px] font-semibold text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                    <span>Premium</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold text-navy-900 font-display mb-2">
              Compare Options
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Compare coverage limits, premiums, deductibles, network sizes, and exclusions side-by-side with zero bias.
            </p>
          </div>

          {/* STEP 03 */}
          <div className="relative rounded-2xl border border-slate-200/90 bg-gradient-to-b from-slate-50/50 to-white p-7 shadow-subtle hover:shadow-elevated hover:border-teal-300 transition-all duration-300 group">
            
            {/* Step Number Tag */}
            <div className="flex items-center justify-between mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-100/70 text-teal-800 font-bold text-sm">
                3
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Step 03
              </span>
            </div>

            {/* Digital Policy Shield Illustration matching Reference */}
            <div className="w-full h-36 rounded-xl bg-teal-50/60 border border-teal-100/60 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
              <div className="relative flex flex-col items-center">
                {/* Smartphone with Shield */}
                <div className="w-20 h-24 bg-white rounded-xl border-2 border-slate-300 shadow-sm p-1.5 flex flex-col items-center justify-center">
                  <div className="w-4 h-1 bg-slate-300 rounded-full mb-1"></div>
                  <div className="w-10 h-10 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
                    <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div className="w-8 h-1 bg-teal-600 rounded mt-1.5"></div>
                </div>
              </div>
              <div className="absolute bottom-2 right-4 text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                Instant Policy
              </div>
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold text-navy-900 font-display mb-2">
              Get Instant Coverage
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Select your customized plan, complete 100% digital KYC, and download your verified policy document instantly.
            </p>
          </div>

        </div>

        {/* Bottom Micro Action */}
        <div className="mt-12 text-center">
          <button
            onClick={onStartClick}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-navy-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md transition-all group"
          >
            <span>Experience the 3-Step Flow</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
