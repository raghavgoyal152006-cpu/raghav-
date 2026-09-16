import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Plane, 
  Smartphone, 
  Code2, 
  Check, 
  ShieldCheck, 
  ArrowRight,
  Layers,
  Sparkles,
  Zap
} from 'lucide-react';

export const EmbeddedInsurance: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<'ecommerce' | 'flight' | 'gadget'>('ecommerce');
  const [isInsuranceAttached, setIsInsuranceAttached] = useState<boolean>(true);

  return (
    <section id="embedded" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5 text-teal-600" />
            <span>Developer APIs & B2B2C Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-display tracking-tight">
            Embedded Insurance Engine
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Integrate contextual, micro-sachet protection directly at point-of-sale across e-commerce, travel booking, and fintech apps.
          </p>

          {/* Scenario Switcher */}
          <div className="mt-6 inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => { setActiveScenario('ecommerce'); setIsInsuranceAttached(true); }}
              className={`px-4 py-2 rounded-lg flex items-center space-x-1.5 transition-all ${
                activeScenario === 'ecommerce' ? 'bg-white text-navy-900 shadow-xs' : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>E-Commerce Cart</span>
            </button>
            <button
              onClick={() => { setActiveScenario('flight'); setIsInsuranceAttached(true); }}
              className={`px-4 py-2 rounded-lg flex items-center space-x-1.5 transition-all ${
                activeScenario === 'flight' ? 'bg-white text-navy-900 shadow-xs' : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>Flight Booking</span>
            </button>
            <button
              onClick={() => { setActiveScenario('gadget'); setIsInsuranceAttached(true); }}
              className={`px-4 py-2 rounded-lg flex items-center space-x-1.5 transition-all ${
                activeScenario === 'gadget' ? 'bg-white text-navy-900 shadow-xs' : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Electronics Checkout</span>
            </button>
          </div>
        </div>

        {/* Interactive Merchant Checkout Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Merchant UI Simulation (6 Cols) */}
          <div className="lg:col-span-6 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-5">
            
            {/* Merchant Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <span className="text-xs font-bold text-slate-500 ml-2">
                  {activeScenario === 'ecommerce' ? 'QuickMart Express Cart' : activeScenario === 'flight' ? 'SkyWings Air Checkout' : 'TechHub Electronics'}
                </span>
              </div>
              <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded font-bold">
                CoverFlow SDK Active
              </span>
            </div>

            {/* Merchant Item Info */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl">
                  {activeScenario === 'ecommerce' ? '👟' : activeScenario === 'flight' ? '✈️' : '💻'}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-navy-900">
                    {activeScenario === 'ecommerce' ? 'Air Zoom Running Shoes (Pro)' : activeScenario === 'flight' ? 'DEL ➔ BLR Non-Stop Flight 6E-204' : 'MacBook Pro M3 14" Space Black'}
                  </h4>
                  <div className="text-[11px] text-slate-500">
                    {activeScenario === 'ecommerce' ? 'Size: UK 9 • Qty: 1' : activeScenario === 'flight' ? '1 Passenger (Economy) • 18 Sep' : '16GB RAM / 512GB SSD'}
                  </div>
                </div>
              </div>
              <div className="text-sm font-extrabold text-navy-900">
                {activeScenario === 'ecommerce' ? '₹7,999' : activeScenario === 'flight' ? '₹5,400' : '₹1,69,900'}
              </div>
            </div>

            {/* THE EMBEDDED COVERFLOW WIDGET */}
            <div className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              isInsuranceAttached
                ? 'bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-400 shadow-sm'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
            onClick={() => setIsInsuranceAttached(!isInsuranceAttached)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 transition-colors ${
                    isInsuranceAttached ? 'bg-teal-600 text-white' : 'border border-slate-300 bg-white'
                  }`}>
                    {isInsuranceAttached && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-navy-900">
                        {activeScenario === 'ecommerce' ? 'Add 1-Year Transit & Return Protection' : activeScenario === 'flight' ? 'Add Flight Delay & Medical Evacuation' : 'Add 2-Year Apple Care OEM Shield'}
                      </span>
                      <span className="text-[9px] bg-teal-600 text-white px-1.5 py-0.2 rounded font-bold uppercase">
                        1-Click
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      {activeScenario === 'ecommerce' ? 'Instant ₹5,000 refund if damaged during transit or lost.' : activeScenario === 'flight' ? '₹2,500 automatic payout for delays > 2h + ₹5 Lakh emergency cover.' : 'Zero deductible screen & liquid repair at authorized Apple centers.'}
                    </p>
                  </div>
                </div>
                <div className="text-xs font-extrabold text-teal-700 whitespace-nowrap pl-2">
                  {activeScenario === 'ecommerce' ? '+ ₹49' : activeScenario === 'flight' ? '+ ₹299' : '+ ₹3,499'}
                </div>
              </div>
            </div>

            {/* Total Calculation */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal:</span>
                <span>{activeScenario === 'ecommerce' ? '₹7,999' : activeScenario === 'flight' ? '₹5,400' : '₹1,69,900'}</span>
              </div>
              {isInsuranceAttached && (
                <div className="flex justify-between text-teal-700 font-semibold">
                  <span>CoverFlow Instant Protection:</span>
                  <span>{activeScenario === 'ecommerce' ? '₹49' : activeScenario === 'flight' ? '₹299' : '₹3,499'}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-extrabold text-navy-900 pt-2 border-t border-slate-100">
                <span>Total Amount:</span>
                <span>
                  {activeScenario === 'ecommerce'
                    ? isInsuranceAttached ? '₹8,048' : '₹7,999'
                    : activeScenario === 'flight'
                    ? isInsuranceAttached ? '₹5,699' : '₹5,400'
                    : isInsuranceAttached ? '₹1,73,399' : '₹1,69,900'}
                </span>
              </div>
            </div>

            <button className="w-full py-3 rounded-xl bg-navy-900 text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center space-x-2">
              <span>Complete Purchase With 1-Click</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: API Code Preview & Integration Spec (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-navy-950 text-slate-200 rounded-3xl p-6 sm:p-7 shadow-floating border border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center space-x-2 text-xs font-mono text-teal-400">
                  <Code2 className="w-4 h-4" />
                  <span>CoverFlow Embedded SDK • JavaScript / React</span>
                </div>
                <span className="text-[10px] text-slate-400">v2.4.1 (Live)</span>
              </div>

              {/* Code snippet */}
              <pre className="text-xs font-mono leading-relaxed overflow-x-auto text-teal-300/90">
{`import { CoverFlowEmbed } from '@coverflow/sdk';

// Render 1-click contextual protection widget
<CoverFlowEmbed
  merchantId="merchant_skywings_99"
  category="${activeScenario}"
  cartValue={${activeScenario === 'ecommerce' ? 7999 : activeScenario === 'flight' ? 5400 : 169900}}
  currency="INR"
  onPolicyAttached={(policy) => {
    console.log("Instant Policy Bound:", policy.policyNumber);
  }}
/>`}
              </pre>
            </div>

            {/* B2B Value Proposition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 text-xs">
                <div className="font-bold text-teal-900">Monetize Cart Conversions</div>
                <p className="text-slate-600 mt-1">Earn 18-25% ancillary commission per bound embedded policy.</p>
              </div>
              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 text-xs">
                <div className="font-bold text-teal-900">Zero Underwriting Risk</div>
                <p className="text-slate-600 mt-1">100% underwritten by licensed IRDAI partner insurers.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
