import React, { useState } from 'react';
import { 
  Shield, 
  Car, 
  Home, 
  Heart, 
  Users, 
  Plane, 
  Briefcase, 
  Smartphone, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Cpu, 
  Receipt, 
  Timer, 
  Headphones,
  SlidersHorizontal,
  ChevronDown,
  Info,
  ExternalLink
} from 'lucide-react';
import { COMPARISON_DATA } from '../data/mockData';
import { ProductType, PlanTier } from '../types/insurance';

interface HeroProps {
  onStartQuote: (category?: ProductType, pinCode?: string) => void;
  onSelectPlan: (plan: PlanTier, category: ProductType) => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartQuote, onSelectPlan }) => {
  const [pinCode, setPinCode] = useState('560001');
  const [selectedProduct, setSelectedProduct] = useState<ProductType>('health');
  const [showTooltip, setShowTooltip] = useState(true);
  const [activeEcosystemNode, setActiveEcosystemNode] = useState<ProductType>('health');

  const currentComparison = COMPARISON_DATA[selectedProduct] || COMPARISON_DATA.health;

  const handleStartQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartQuote(selectedProduct, pinCode);
  };

  const ecosystemNodes = [
    { id: 'auto' as ProductType, label: 'Auto Insurance', icon: Car, cx: 350, cy: 90 },
    { id: 'home' as ProductType, label: 'Home Insurance', icon: Home, cx: 480, cy: 80 },
    { id: 'health' as ProductType, label: 'Health Insurance', icon: Heart, cx: 300, cy: 260 },
    { id: 'life' as ProductType, label: 'Life Insurance', icon: Users, cx: 520, cy: 250 },
    { id: 'business' as ProductType, label: 'Commercial & Cyber', icon: Briefcase, cx: 310, cy: 370 },
    { id: 'device' as ProductType, label: 'Smart Device', icon: Smartphone, cx: 490, cy: 360 },
  ];

  return (
    <section className="relative overflow-hidden bg-hero-mesh pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-100">
      {/* Background soft decorative gradient blobs */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-32 right-10 w-96 h-96 bg-cyan-200/25 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Hero Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT SIDE: Headline, Subtitle, CTA input form */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/70 text-brand-800 text-xs font-semibold shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-ping" />
              <span>Next-Generation InsurTech Platform</span>
            </div>

            {/* Main Title matching reference */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-navy-900 leading-[1.1] tracking-tight font-display">
                Modern Insurance,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-teal-500">
                  Made Simple.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal pt-2">
                Personalized coverage, transparent pricing, and faster protection — all in one place. No spam calls, no agent harassment.
              </p>
            </div>

            {/* CTA & PIN / ZIP Code Input Form (matching reference layout) */}
            <form onSubmit={handleStartQuoteSubmit} className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch gap-2.5 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-elevated focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all">
                
                {/* START YOUR QUOTE BUTTON */}
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-bold text-sm uppercase tracking-wider shadow-md shadow-brand-600/25 transition-all flex items-center justify-center space-x-2 whitespace-nowrap active:scale-[0.99]"
                >
                  <span>Start Your Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* PIN / ZIP Input */}
                <div className="flex-1 flex items-center px-3 py-1">
                  <input
                    type="text"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    placeholder="Enter PIN / ZIP Code"
                    maxLength={6}
                    className="w-full text-sm text-navy-900 placeholder:text-slate-400 font-medium bg-transparent focus:outline-none"
                  />
                  <span className="text-xs text-slate-400 border-l border-slate-200 pl-2 ml-1 hidden sm:inline">
                    Bangalore
                  </span>
                </div>
              </div>

              {/* Helper Microcopy & Link */}
              <div className="flex items-center justify-between text-xs text-slate-500 px-2">
                <span>⚡ Get personalized insurance options in 90 seconds.</span>
                <button 
                  type="button" 
                  onClick={() => onStartQuote()} 
                  className="text-brand-600 font-semibold hover:underline flex items-center space-x-1"
                >
                  <span>Quick Policy Finder</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </form>

            {/* Quick Product Category Toggles */}
            <div className="pt-2">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Instant Category Switcher
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'health', label: '❤️ Health', price: '₹499/mo' },
                  { id: 'auto', label: '🚗 Car & EV', price: '₹389/mo' },
                  { id: 'life', label: '🛡️ Term Life', price: '₹490/mo' },
                  { id: 'home', label: '🏠 Home', price: '₹199/mo' },
                  { id: 'travel', label: '✈️ Travel', price: '₹149/mo' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedProduct(item.id as ProductType);
                      setActiveEcosystemNode(item.id as ProductType);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedProduct === item.id
                        ? 'bg-navy-900 text-white shadow-sm'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {item.label} <span className="text-[10px] opacity-75">({item.price})</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Visual Ecosystem + Floating Live Plan Comparison Dashboard */}
          <div className="lg:col-span-7 relative">
            
            {/* Interactive Digital Insurance Ecosystem Canvas/SVG (Behind the Card) */}
            <div className="hidden md:block relative w-full h-[460px] overflow-hidden rounded-3xl bg-gradient-to-br from-teal-50/70 via-slate-50/50 to-cyan-50/70 border border-teal-100/80 p-4">
              
              {/* Header Title inside Canvas */}
              <div className="absolute top-4 left-6 flex items-center space-x-2 text-xs font-bold text-teal-800 uppercase tracking-wider z-10">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
                <span>Live Connected Ecosystem Telemetry</span>
              </div>

              <svg className="w-full h-full" viewBox="0 0 800 460">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.4" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Central Hub Position: (400, 220) */}
                {/* Connecting Curved Lines */}
                <path d="M 400 220 Q 300 120 200 90" stroke="url(#lineGrad)" strokeWidth="2" fill="none" className="flowing-line" opacity="0.6" />
                <path d="M 400 220 Q 320 180 180 260" stroke="url(#lineGrad)" strokeWidth="2" fill="none" className="flowing-line" opacity="0.6" />
                <path d="M 400 220 Q 280 320 190 380" stroke="url(#lineGrad)" strokeWidth="2" fill="none" className="flowing-line" opacity="0.6" />
                <path d="M 400 220 Q 520 120 620 90" stroke="url(#lineGrad)" strokeWidth="2" fill="none" className="flowing-line" opacity="0.6" />
                <path d="M 400 220 Q 500 260 640 260" stroke="url(#lineGrad)" strokeWidth="2" fill="none" className="flowing-line" opacity="0.6" />
                <path d="M 400 220 Q 520 340 610 380" stroke="url(#lineGrad)" strokeWidth="2" fill="none" className="flowing-line" opacity="0.6" />

                {/* Moving Signal Dots */}
                <circle r="4" fill="#0D9488" filter="url(#glow)">
                  <animateMotion path="M 400 220 Q 300 120 200 90" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle r="4" fill="#0EA5E9" filter="url(#glow)">
                  <animateMotion path="M 400 220 Q 500 260 640 260" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle r="4" fill="#10B981" filter="url(#glow)">
                  <animateMotion path="M 400 220 Q 280 320 190 380" dur="5s" repeatCount="indefinite" />
                </circle>

                {/* Peripheral Ecosystem Nodes */}
                <g transform="translate(160, 60)" className="cursor-pointer" onClick={() => setSelectedProduct('auto')}>
                  <rect width="90" height="60" rx="12" fill="#FFFFFF" stroke="#CCFBF1" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.04))" />
                  <circle cx="45" cy="24" r="14" fill="#F0FDFA" />
                  <text x="45" y="28" textAnchor="middle" fontSize="13">🚗</text>
                  <text x="45" y="48" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0F172A">Auto & EV</text>
                </g>

                <g transform="translate(140, 230)" className="cursor-pointer" onClick={() => setSelectedProduct('health')}>
                  <rect width="90" height="60" rx="12" fill="#FFFFFF" stroke="#CCFBF1" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.04))" />
                  <circle cx="45" cy="24" r="14" fill="#F0FDFA" />
                  <text x="45" y="28" textAnchor="middle" fontSize="13">❤️</text>
                  <text x="45" y="48" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0F172A">Health 360</text>
                </g>

                <g transform="translate(150, 350)" className="cursor-pointer" onClick={() => setSelectedProduct('home')}>
                  <rect width="90" height="60" rx="12" fill="#FFFFFF" stroke="#CCFBF1" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.04))" />
                  <circle cx="45" cy="24" r="14" fill="#F0FDFA" />
                  <text x="45" y="28" textAnchor="middle" fontSize="13">🏠</text>
                  <text x="45" y="48" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0F172A">Home Care</text>
                </g>

                <g transform="translate(580, 60)" className="cursor-pointer" onClick={() => setSelectedProduct('travel')}>
                  <rect width="90" height="60" rx="12" fill="#FFFFFF" stroke="#CCFBF1" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.04))" />
                  <circle cx="45" cy="24" r="14" fill="#F0FDFA" />
                  <text x="45" y="28" textAnchor="middle" fontSize="13">✈️</text>
                  <text x="45" y="48" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0F172A">Travel</text>
                </g>

                <g transform="translate(600, 230)" className="cursor-pointer" onClick={() => setSelectedProduct('life')}>
                  <rect width="90" height="60" rx="12" fill="#FFFFFF" stroke="#CCFBF1" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.04))" />
                  <circle cx="45" cy="24" r="14" fill="#F0FDFA" />
                  <text x="45" y="28" textAnchor="middle" fontSize="13">🛡️</text>
                  <text x="45" y="48" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0F172A">Term Life</text>
                </g>

                <g transform="translate(570, 350)" className="cursor-pointer" onClick={() => setSelectedProduct('device')}>
                  <rect width="90" height="60" rx="12" fill="#FFFFFF" stroke="#CCFBF1" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.04))" />
                  <circle cx="45" cy="24" r="14" fill="#F0FDFA" />
                  <text x="45" y="28" textAnchor="middle" fontSize="13">📱</text>
                  <text x="45" y="48" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0F172A">Gadget Shield</text>
                </g>

                {/* Central AI Protection Shield Engine */}
                <g transform="translate(340, 160)">
                  <circle cx="60" cy="60" r="54" fill="#0D9488" fillOpacity="0.1" className="animate-pulse" />
                  <circle cx="60" cy="60" r="44" fill="#0F172A" />
                  <circle cx="60" cy="60" r="40" stroke="#14B8A6" strokeWidth="2" fill="#0F172A" />
                  <text x="60" y="56" textAnchor="middle" fontSize="22">🛡️</text>
                  <text x="60" y="78" textAnchor="middle" fontSize="9" fontWeight="700" fill="#2DD4BF" letterSpacing="1">COVERFLOW</text>
                </g>
              </svg>
            </div>

            {/* FLOATING "LIVE PLAN COMPARISON" CARD (Matching Reference Image) */}
            <div className="relative md:-mt-84 md:ml-6 bg-white/98 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-floating p-5 sm:p-6 transition-all hover:shadow-2xl">
              
              {/* Card Header & Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
                  <h3 className="text-base font-bold text-navy-900 font-display">Live Plan Comparison</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                    Real-time
                  </span>
                </div>

                {/* Product Dropdown & Compare Button */}
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <select
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value as ProductType)}
                      className="text-xs font-semibold text-navy-900 bg-slate-50 border border-slate-200 rounded-lg pl-2.5 pr-7 py-1.5 focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer appearance-none"
                    >
                      <option value="health">Health Plans</option>
                      <option value="auto">Car & EV Plans</option>
                      <option value="life">Term Life Plans</option>
                      <option value="home">Home Plans</option>
                      <option value="travel">Travel Plans</option>
                      <option value="business">Cyber & Business</option>
                      <option value="device">Smart Device</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
                  </div>

                  <button
                    type="button"
                    onClick={() => onStartQuote(selectedProduct)}
                    className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    Compare
                  </button>
                </div>
              </div>

              {/* Progress Metrics & Tooltip Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                
                {/* Horizontal Progress Bars */}
                <div className="space-y-2.5 text-xs">
                  <div>
                    <div className="flex justify-between font-semibold text-slate-700 mb-1">
                      <span>Premium Value Score</span>
                      <span className="text-teal-600 font-bold">{currentComparison.metrics.premiumScore}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-500" 
                        style={{ width: `${currentComparison.metrics.premiumScore}%` }} 
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-slate-700 mb-1">
                      <span>Deductible Optimization</span>
                      <span className="text-teal-600 font-bold">{currentComparison.metrics.deductibleScore}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-500" 
                        style={{ width: `${currentComparison.metrics.deductibleScore}%` }} 
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-slate-700 mb-1">
                      <span>Coverage Breadth</span>
                      <span className="text-teal-600 font-bold">{currentComparison.metrics.coverageScore}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-400 transition-all duration-500" 
                        style={{ width: `${currentComparison.metrics.coverageScore}%` }} 
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-slate-700 mb-1">
                      <span>Claim Settlement Speed</span>
                      <span className="text-teal-600 font-bold">{currentComparison.metrics.claimSupportScore}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500" 
                        style={{ width: `${currentComparison.metrics.claimSupportScore}%` }} 
                      />
                    </div>
                  </div>
                </div>

                {/* Right Tooltip / Explanation Box (matching reference) */}
                <div className="relative">
                  {showTooltip && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
                      <div className="flex items-center justify-between text-navy-900 font-bold">
                        <div className="flex items-center space-x-1.5">
                          <Info className="w-3.5 h-3.5 text-brand-600" />
                          <span>Transparent Rating Criteria</span>
                        </div>
                        <button 
                          onClick={() => setShowTooltip(false)}
                          className="text-slate-400 hover:text-slate-600 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        Premiums are computed at direct-to-consumer rates with zero hidden agent commission markups. Ratings are verified from IRDAI public settlement registries.
                      </p>
                      <div className="flex items-center space-x-3 text-[11px] pt-1">
                        <span className="text-slate-700 font-semibold">Network:</span>
                        <span className="text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded">
                          {currentComparison.tiers[1]?.networkSize || 'Pan-India'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Live Comparison Table (Columns matching reference design) */}
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-semibold text-[11px]">
                      <th className="pb-2 pl-2">Plan</th>
                      <th className="pb-2">Monthly</th>
                      <th className="pb-2">Deductible</th>
                      <th className="pb-2">Coverage</th>
                      <th className="pb-2 hidden sm:table-cell">Claim Support</th>
                      <th className="pb-2 text-right pr-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentComparison.tiers.map((tier) => (
                      <tr 
                        key={tier.id} 
                        className={`hover:bg-teal-50/40 transition-colors group ${
                          tier.isPopular ? 'bg-teal-50/20' : ''
                        }`}
                      >
                        <td className="py-2.5 pl-2 font-bold text-navy-900 flex items-center space-x-1.5">
                          <span>{tier.name}</span>
                          {tier.isPopular && (
                            <span className="text-[9px] bg-brand-500 text-white px-1.5 py-0.2 rounded font-semibold">
                              POPULAR
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 font-semibold text-slate-800">₹{tier.premiumMonthly}</td>
                        <td className="py-2.5 text-slate-600">{tier.deductible}</td>
                        <td className="py-2.5 text-teal-700 font-bold">{tier.coverageAmount}</td>
                        <td className="py-2.5 text-slate-600 hidden sm:table-cell">{tier.claimSupport}</td>
                        <td className="py-2.5 text-right pr-2">
                          <button
                            onClick={() => onSelectPlan(tier, selectedProduct)}
                            className="px-2.5 py-1 rounded bg-slate-900 group-hover:bg-brand-600 text-white font-semibold text-[11px] transition-colors"
                          >
                            Choose
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Sample demo note */}
              <div className="pt-2 text-[10px] text-slate-400 text-right">
                * Indicative sample rates. Final quote subject to underwriting disclosures.
              </div>

            </div>

          </div>

        </div>

        {/* 4 Hero Key Benefit Badges Directly Below Hero (Matching Reference) */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="flex items-center space-x-3.5 p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-teal-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-navy-900">Smart Technology</div>
              <div className="text-[11px] text-slate-500">AI-driven instant quotes</div>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-teal-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-navy-900">Transparent Pricing</div>
              <div className="text-[11px] text-slate-500">Zero hidden markups</div>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-teal-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0">
              <Timer className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-navy-900">Fast Claims</div>
              <div className="text-[11px] text-slate-500">Hassle-free digital filing</div>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-teal-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-navy-900">24/7 Human Support</div>
              <div className="text-[11px] text-slate-500">Dedicated claim concierge</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
