import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Plane, 
  Smartphone, 
  CreditCard,
  Code2, 
  Check, 
  ShieldCheck, 
  ArrowRight,
  Layers,
  Sparkles,
  Zap,
  Copy,
  Terminal,
  RefreshCw,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const EmbeddedInsurance: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<'ecommerce' | 'flight' | 'gadget' | 'fintech'>('ecommerce');
  const [isInsuranceAttached, setIsInsuranceAttached] = useState<boolean>(true);
  const [activeCodeTab, setActiveCodeTab] = useState<'react' | 'curl' | 'node' | 'webhook'>('react');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [purchaseCompleted, setPurchaseCompleted] = useState<boolean>(false);
  const [testWebhookFiring, setTestWebhookFiring] = useState<boolean>(false);
  const [webhookLog, setWebhookLog] = useState<string | null>(null);

  const scenarioDetails = {
    ecommerce: {
      merchant: 'QuickMart Express Cart',
      itemTitle: 'Air Zoom Running Shoes (Pro Edition)',
      itemSubtitle: 'Size: UK 9 • Qty: 1 • Color: Obsidian',
      icon: '👟',
      price: 7999,
      addonTitle: '1-Year Transit Loss & Damage Protection',
      addonDesc: 'Instant replacement if lost in transit, porch-pirated, or damaged during delivery.',
      addonPrice: 49,
      insurer: 'ShelterSafe Logistics Cover',
      currency: '₹',
    },
    flight: {
      merchant: 'SkyWings Air Checkout',
      itemTitle: 'DEL ➔ BLR Flight 6E-204 (Non-Stop)',
      itemSubtitle: '1 Passenger (Economy) • Departing 18 Sep',
      icon: '✈️',
      price: 5400,
      addonTitle: 'Automated Flight Delay & Medical Evacuation',
      addonDesc: '₹2,500 instant UPI payout if delay > 90 mins + ₹5 Lakh overseas emergency medical cover.',
      addonPrice: 299,
      insurer: 'VoyageGuard Worldwide',
      currency: '₹',
    },
    gadget: {
      merchant: 'TechHub Apple Reseller',
      itemTitle: 'MacBook Pro 14" M3 (Space Black)',
      itemSubtitle: '16GB Unified RAM • 512GB SSD • AppleCare Compatible',
      icon: '💻',
      price: 169900,
      addonTitle: '2-Year All-Risk OEM Hardware & Liquid Shield',
      addonDesc: 'Zero-deductible screen repair, logic-board surge cover, and 72-hour repair turnaround.',
      addonPrice: 3499,
      insurer: 'GadgetSecure Micro',
      currency: '₹',
    },
    fintech: {
      merchant: 'ZestPay BNPL & Personal Loan',
      itemTitle: 'Instant Credit Line Approval (₹1,50,000)',
      itemSubtitle: '12-Month EMI @ ₹13,200/mo • Instant Disbursal',
      icon: '💳',
      price: 150000,
      addonTitle: 'Loan Protection & Job Loss EMI Shield',
      addonDesc: 'Covers up to 3 EMIs in case of involuntary job loss or temporary critical illness.',
      addonPrice: 490,
      insurer: 'Aegis Credit Mutual',
      currency: '₹',
    },
  };

  const current = scenarioDetails[activeScenario];
  const totalPrice = isInsuranceAttached ? current.price + current.addonPrice : current.price;

  const codeSnippets = {
    react: `import { CoverFlowEmbed } from '@coverflow/embed-sdk';

// Mount 1-Click Embedded Insurance Widget
export function CheckoutSummary() {
  return (
    <CoverFlowEmbed
      apiKey="pk_live_coverflow_8829104"
      merchantId="mch_${activeScenario}_partner"
      category="${activeScenario}"
      cartValue={${current.price}}
      currency="INR"
      preselected={true}
      onPolicyBound={(policy) => {
        console.log("✓ Bound Policy:", policy.policyNumber, "Premium:", policy.premium);
        analytics.track('Insurance_Attached', { policyId: policy.id });
      }}
    />
  );
}`,
    curl: `curl -X POST https://api.coverflow.insurance/v1/embedded/bind \\
  -H "Authorization: Bearer sk_live_coverflow_998124" \\
  -H "Content-Type: application/json" \\
  -d '{
    "merchant_id": "mch_${activeScenario}_partner",
    "category": "${activeScenario}",
    "transaction_ref": "TXN_ORD_${Date.now()}",
    "insured_item": "${current.itemTitle}",
    "item_value": ${current.price},
    "premium_amount": ${current.addonPrice},
    "customer": {
      "name": "Rohan Sharma",
      "mobile": "+919876543210"
    }
  }'`,
    node: `const { CoverFlowClient } = require('@coverflow/node');
const coverflow = new CoverFlowClient(process.env.COVERFLOW_SECRET_KEY);

// Bind micro-policy at cart confirmation
async function onCheckoutConfirmed(order) {
  const policy = await coverflow.embedded.bindPolicy({
    category: '${activeScenario}',
    merchantRef: order.id,
    premium: ${current.addonPrice},
    nomineeName: order.customer.name,
  });

  console.log(\`Issued Certificate: \${policy.certificateUrl}\`);
  return policy;
}`,
    webhook: `{
  "event": "policy.bound.instant",
  "timestamp": "${new Date().toISOString()}",
  "data": {
    "policy_number": "CF-EMBD-2026-${Math.floor(10000 + Math.random() * 90000)}",
    "category": "${activeScenario}",
    "merchant_id": "mch_${activeScenario}_partner",
    "sum_insured": ${current.price},
    "premium_collected": ${current.addonPrice},
    "commission_credited": ${(current.addonPrice * 0.22).toFixed(2)},
    "underwriter": "${current.insurer}",
    "status": "in_force_active"
  }
}`
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(codeSnippets[activeCodeTab]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCompletePurchase = () => {
    setPurchaseCompleted(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }
    setWebhookLog(`[${new Date().toLocaleTimeString()}] HTTP 200: Event 'policy.bound' sent to merchant webhook URL`);
  };

  const handleFireTestWebhook = () => {
    setTestWebhookFiring(true);
    setTimeout(() => {
      setTestWebhookFiring(false);
      setWebhookLog(`[${new Date().toLocaleTimeString()}] POST /webhooks/insurance -> 200 OK (Latency: 38ms, Signature: Verified HMAC-SHA256)`);
    }, 700);
  };

  return (
    <section id="embedded" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5 text-teal-600" />
            <span>Embedded Finance & B2B2C Insurance Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-display tracking-tight">
            Embedded Insurance Engine
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Integrate contextual, micro-sachet protection directly into your checkout flow. Earn 20%+ commission while protecting customers.
          </p>

          {/* Scenario Switcher */}
          <div className="mt-6 inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-semibold overflow-x-auto max-w-full">
            {[
              { id: 'ecommerce' as const, label: 'E-Commerce Cart', icon: ShoppingBag },
              { id: 'flight' as const, label: 'Flight Booking', icon: Plane },
              { id: 'gadget' as const, label: 'Gadget Checkout', icon: Smartphone },
              { id: 'fintech' as const, label: 'FinTech Credit', icon: CreditCard },
            ].map((s) => {
              const Icon = s.icon;
              const isActive = activeScenario === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveScenario(s.id);
                    setIsInsuranceAttached(true);
                    setPurchaseCompleted(false);
                    setWebhookLog(null);
                  }}
                  className={`px-4 py-2 rounded-xl flex items-center space-x-1.5 whitespace-nowrap transition-all ${
                    isActive ? 'bg-white text-navy-900 shadow-xs' : 'text-slate-600 hover:text-navy-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Merchant Checkout Simulator & Code Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Merchant UI Simulation (6 Cols) */}
          <div className="lg:col-span-6 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-5">
            
            {/* Merchant Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <span className="text-xs font-bold text-slate-600 ml-2">
                  {current.merchant}
                </span>
              </div>
              <span className="text-[10px] text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full font-bold">
                CoverFlow SDK Live
              </span>
            </div>

            {/* Merchant Item Info */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between shadow-2xs">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl">
                  {current.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-navy-900">
                    {current.itemTitle}
                  </h4>
                  <div className="text-[11px] text-slate-500">
                    {current.itemSubtitle}
                  </div>
                </div>
              </div>
              <div className="text-sm font-extrabold text-navy-900">
                {current.currency}{current.price.toLocaleString()}
              </div>
            </div>

            {/* THE EMBEDDED COVERFLOW WIDGET */}
            <div 
              onClick={() => setIsInsuranceAttached(!isInsuranceAttached)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                isInsuranceAttached
                  ? 'bg-gradient-to-r from-teal-50/90 to-emerald-50/90 border-teal-400 shadow-sm ring-1 ring-teal-400/20'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
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
                        {current.addonTitle}
                      </span>
                      <span className="text-[9px] bg-teal-600 text-white px-1.5 py-0.2 rounded font-bold uppercase">
                        1-Click
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      {current.addonDesc}
                    </p>
                    <div className="text-[10px] text-slate-400 mt-1">
                      Underwritten by <strong>{current.insurer}</strong>
                    </div>
                  </div>
                </div>
                <div className="text-xs font-extrabold text-teal-700 whitespace-nowrap pl-2">
                  + {current.currency}{current.addonPrice}
                </div>
              </div>
            </div>

            {/* Total Calculation */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs space-y-1.5 shadow-2xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal:</span>
                <span>{current.currency}{current.price.toLocaleString()}</span>
              </div>
              {isInsuranceAttached && (
                <div className="flex justify-between text-teal-700 font-semibold">
                  <span>CoverFlow Instant Protection:</span>
                  <span>+ {current.currency}{current.addonPrice}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-extrabold text-navy-900 pt-2 border-t border-slate-100">
                <span>Total Amount:</span>
                <span className="text-teal-700 font-black">
                  {current.currency}{totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Interactive Checkout Action */}
            {!purchaseCompleted ? (
              <button 
                onClick={handleCompletePurchase}
                className="w-full py-3.5 rounded-xl bg-navy-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center space-x-2 transition-all active:scale-[0.99]"
              >
                <span>Complete Purchase with 1-Click</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs text-emerald-900 animate-in fade-in">
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Purchase & Embedded Insurance Bound!</span>
                  </span>
                  <button
                    onClick={() => setPurchaseCompleted(false)}
                    className="text-[10px] text-emerald-700 hover:underline font-semibold"
                  >
                    Reset
                  </button>
                </div>
                <p className="text-[11px] text-emerald-800">
                  Certificate #{Math.floor(100000 + Math.random() * 900000)} generated. Customer received SMS & WhatsApp policy pass.
                </p>
              </div>
            )}

            {/* Webhook live output if fired */}
            {webhookLog && (
              <div className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-[10px] break-all border border-slate-800">
                {webhookLog}
              </div>
            )}

          </div>

          {/* Right: API Code Preview & Integration Sandbox (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-navy-950 text-slate-200 rounded-3xl p-6 sm:p-7 shadow-floating border border-slate-800 space-y-4">
              
              {/* SDK Header & Tabs */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2 text-xs font-mono text-teal-400">
                  <Code2 className="w-4 h-4" />
                  <span>CoverFlow Embedded SDK</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
              </div>

              {/* Language Selector */}
              <div className="flex space-x-1 bg-slate-900 p-1 rounded-xl text-xs font-mono">
                {[
                  { id: 'react' as const, label: 'React (JSX)' },
                  { id: 'curl' as const, label: 'cURL API' },
                  { id: 'node' as const, label: 'Node.js' },
                  { id: 'webhook' as const, label: 'Webhook JSON' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCodeTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeCodeTab === tab.id ? 'bg-teal-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Code snippet display */}
              <pre className="text-xs font-mono leading-relaxed overflow-x-auto p-3 bg-slate-900/80 rounded-2xl text-teal-300/90 max-h-64 border border-slate-800">
                {codeSnippets[activeCodeTab]}
              </pre>

              {/* Test Webhook Trigger Button */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={handleFireTestWebhook}
                  disabled={testWebhookFiring}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-mono font-bold flex items-center space-x-1.5 border border-slate-700 transition-colors"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{testWebhookFiring ? 'Emitting Webhook...' : 'Test Webhook Ping (POST)'}</span>
                </button>

                <span className="text-[10px] text-slate-400">
                  Latency: <strong className="text-teal-400">~38ms</strong> • 99.99% Uptime
                </span>
              </div>
            </div>

            {/* B2B Embedded Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200/70">
                <div className="text-xl font-extrabold text-navy-900 font-display">22.4%</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">Attach Rate</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200/70">
                <div className="text-xl font-extrabold text-teal-700 font-display">₹4.2 Cr+</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">B2B Payouts</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200/70">
                <div className="text-xl font-extrabold text-emerald-700 font-display">&lt; 45ms</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">API SLA</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
