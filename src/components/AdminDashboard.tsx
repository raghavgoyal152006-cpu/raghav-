import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  Activity, 
  Building2, 
  Layers, 
  Settings, 
  Filter,
  FileCheck,
  RefreshCw,
  BarChart2
} from 'lucide-react';
import { MOCK_ADMIN_METRICS } from '../data/mockData';

export const AdminDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'month' | 'quarter' | 'year'>('month');
  const [activeTab, setActiveTab] = useState<'overview' | 'underwriting' | 'fraud' | 'partners'>('overview');

  const pendingUnderwriting = [
    { id: 'UW-9921', applicant: 'Vikram Mehta (Age 52)', product: 'Health Elite 360', amount: '₹25 Lakh', flag: 'Hypertension disclosure', status: 'Pending Doctor Tele-MER' },
    { id: 'UW-9922', applicant: 'TechLogix Pvt Ltd', product: 'Cyber Liability', amount: '₹2 Crore', flag: 'SOC-2 Report verified', status: 'Awaiting Reinsurance Line' },
    { id: 'UW-9923', applicant: 'Aakash Verma (Age 28)', product: 'Zero-Dep EV Motor', amount: 'IDV ₹18 Lakh', flag: 'FastTrack Automated', status: 'Approved Instant' },
  ];

  return (
    <section className="py-12 bg-slate-900 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Platform InsurTech Executive Console</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Underwriting & Operations Intelligence
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live multi-insurer API telemetry, loss ratios, fraud detection, and policy conversion metrics.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-slate-800 p-1 rounded-xl border border-slate-700 flex text-xs">
              {(['month', 'quarter', 'year'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-3 py-1.5 rounded-lg capitalize font-semibold transition-all ${
                    selectedTimeframe === tf ? 'bg-teal-500 text-slate-950 shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            <button className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-all">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sync IRDAI Ledger</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
          
          <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 shadow-md">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
              <span>Gross Written Premium (GWP)</span>
              <DollarSign className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {MOCK_ADMIN_METRICS.grossWrittenPremium}
            </div>
            <div className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>+18.4% vs last month</span>
            </div>
          </div>

          <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 shadow-md">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
              <span>Claims Settlement Ratio</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display">
              {MOCK_ADMIN_METRICS.claimSettlementRatio}
            </div>
            <div className="text-[11px] text-slate-400 font-semibold mt-1">
              Avg Turnaround: <strong>{MOCK_ADMIN_METRICS.averageClaimTurnaround}</strong>
            </div>
          </div>

          <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 shadow-md">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
              <span>Active Policies In-Force</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {MOCK_ADMIN_METRICS.activePolicies.toLocaleString()}
            </div>
            <div className="text-[11px] text-teal-300 font-semibold mt-1">
              Quote Conversion: <strong>{MOCK_ADMIN_METRICS.quoteConversionRate}</strong>
            </div>
          </div>

          <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 shadow-md">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
              <span>Fraud Triggers Intercepted</span>
              <ShieldAlert className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-display">
              {MOCK_ADMIN_METRICS.fraudAlertsDetected}
            </div>
            <div className="text-[11px] text-slate-400 font-semibold mt-1">
              Prevented loss: <strong>₹34.5 Lakh</strong>
            </div>
          </div>

        </div>

        {/* Charts & Underwriting Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Monthly GWP & Claim Payout Trend Visual (8 Cols) */}
          <div className="lg:col-span-8 bg-slate-800/60 rounded-3xl p-6 sm:p-7 border border-slate-700 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div className="flex items-center space-x-2">
                <BarChart2 className="w-4 h-4 text-teal-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Monthly Premium Volume & Claims Incurred (₹ Cr)
                </h3>
              </div>
              <div className="flex items-center space-x-3 text-xs">
                <span className="flex items-center space-x-1"><span className="w-3 h-3 bg-teal-400 rounded-sm"></span><span className="text-slate-300">GWP</span></span>
                <span className="flex items-center space-x-1"><span className="w-3 h-3 bg-rose-400 rounded-sm"></span><span className="text-slate-300">Claims</span></span>
              </div>
            </div>

            {/* Custom Bar Graph Visualization */}
            <div className="h-60 flex items-end justify-between gap-4 pt-6 px-2">
              {MOCK_ADMIN_METRICS.monthlyGwpTrend.map((item) => (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full flex items-end justify-center gap-1.5 h-44">
                    {/* GWP Bar */}
                    <div
                      className="w-5 bg-gradient-to-t from-teal-600 to-teal-400 rounded-t group-hover:brightness-125 transition-all relative"
                      style={{ height: `${(item.gwp / 20) * 100}%` }}
                    >
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] bg-slate-950 px-1 py-0.5 rounded text-white font-bold transition-opacity whitespace-nowrap">
                        ₹{item.gwp}Cr
                      </span>
                    </div>

                    {/* Claims Bar */}
                    <div
                      className="w-3 bg-rose-400/80 rounded-t group-hover:brightness-125 transition-all"
                      style={{ height: `${(item.claims / 20) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-400">{item.month}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700 text-xs">
              <div>
                <span className="text-slate-400">Claims Submitted:</span>
                <div className="text-base font-bold text-white mt-0.5">{MOCK_ADMIN_METRICS.claimsSubmitted}</div>
              </div>
              <div>
                <span className="text-slate-400">Claims Settled:</span>
                <div className="text-base font-bold text-emerald-400 mt-0.5">{MOCK_ADMIN_METRICS.claimsSettled}</div>
              </div>
              <div>
                <span className="text-slate-400">Pending TPA Review:</span>
                <div className="text-base font-bold text-amber-400 mt-0.5">{MOCK_ADMIN_METRICS.claimsPending}</div>
              </div>
            </div>
          </div>

          {/* Right: Partner Insurers API Status (4 Cols) */}
          <div className="lg:col-span-4 bg-slate-800/60 rounded-3xl p-6 sm:p-7 border border-slate-700 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-teal-400" />
              <span>Partner Underwriter APIs</span>
            </h3>

            <div className="space-y-3">
              {MOCK_ADMIN_METRICS.partnerInsurers.map((ins, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/80 text-xs space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>{ins.name}</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                      {ins.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>GWP Share: <strong className="text-teal-300">{ins.share}</strong></span>
                    <span>Rating: <strong>{ins.rating}</strong></span>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated Underwriting Queue */}
            <div className="pt-2">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Underwriting Review Queue (3)
              </div>
              <div className="space-y-2">
                {pendingUnderwriting.map((uw) => (
                  <div key={uw.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-[11px]">
                    <div className="flex justify-between font-bold text-white">
                      <span>{uw.applicant}</span>
                      <span className="text-teal-400">{uw.amount}</span>
                    </div>
                    <div className="text-slate-400 mt-0.5">{uw.product} • {uw.flag}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
