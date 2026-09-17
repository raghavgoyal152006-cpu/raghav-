import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  FileText, 
  CreditCard, 
  Download, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle, 
  Heart, 
  Car, 
  Users, 
  RefreshCw, 
  Sparkles,
  UserCheck,
  ChevronRight,
  Receipt
} from 'lucide-react';
import { MOCK_USER_POLICIES, MOCK_CLAIMS } from '../data/mockData';
import { Policy, UserProfile } from '../types/insurance';

interface MyAccountDashboardProps {
  onViewCertificate: (policy: Policy) => void;
  currentUser?: UserProfile | null;
  onOpenKyc?: () => void;
  onTriggerPayment?: (policy: Policy, onDone: () => void) => void;
}

export const MyAccountDashboard: React.FC<MyAccountDashboardProps> = ({
  onViewCertificate,
  currentUser,
  onOpenKyc,
  onTriggerPayment,
}) => {
  const [activeTab, setActiveTab] = useState<'policies' | 'claims' | 'renewals' | 'documents'>('policies');
  const [policies, setPolicies] = useState<Policy[]>(MOCK_USER_POLICIES);
  const [renewedId, setRenewedId] = useState<string | null>(null);

  const userName = currentUser?.name || 'Rohan Sharma';
  const userInitials = currentUser?.avatarInitials || 'RS';
  const userId = currentUser?.id || 'CF-USR-99824';
  const userMobile = currentUser?.mobile || '+91 98765 ****0';
  const isKycVerified = currentUser?.kycStatus === 'verified';

  const handleQuickRenew = (policyId: string) => {
    const target = policies.find((p) => p.id === policyId);
    const applyRenewalState = () => {
      setPolicies(prev => prev.map((p) => {
        if (p.id === policyId) {
          return { ...p, status: 'renewed', expiryDate: '19 Sep 2027' };
        }
        return p;
      }));
      setRenewedId(policyId);
      setTimeout(() => setRenewedId(null), 5000);
    };

    if (target && onTriggerPayment) {
      onTriggerPayment(target, applyRenewalState);
    } else {
      applyRenewalState();
    }
  };

  return (
    <section className="py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Welcome Banner */}
        <div className="bg-gradient-to-r from-navy-900 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-floating mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 text-navy-950 font-black text-2xl flex items-center justify-center shadow-md">
              {userInitials}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-bold font-display">{userName}</h2>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
                  isKycVerified
                    ? 'bg-teal-500/30 text-teal-300 border-teal-500/40'
                    : 'bg-amber-500/30 text-amber-300 border-amber-500/40'
                }`}>
                  {isKycVerified ? 'Verified Insured Member' : 'KYC Pending Action'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Customer ID: <strong className="text-white">{userId}</strong> • Primary Mobile: {userMobile}
              </p>
            </div>
          </div>

          {/* KYC Status Badge & Action */}
          <div className="flex items-center space-x-4 bg-white/5 border border-white/10 p-3 rounded-2xl">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isKycVerified ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
            }`}>
              {isKycVerified ? <UserCheck className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            </div>
            <div className="text-xs">
              <div className="font-bold text-slate-200">
                KYC Status: {isKycVerified ? 'Verified (Aadhaar & PAN)' : 'Verification Incomplete'}
              </div>
              <div className="text-[10px] text-slate-400">
                {isKycVerified ? 'IRDAI Central Registry (CKYC) Synced' : 'Required for instant claim approvals'}
              </div>
            </div>
            {onOpenKyc && (
              <button
                onClick={onOpenKyc}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                  isKycVerified
                    ? 'bg-white/10 hover:bg-white/20 text-white'
                    : 'bg-amber-500 hover:bg-amber-400 text-navy-950 animate-pulse'
                }`}
              >
                {isKycVerified ? 'View CKYC' : 'Verify Now'}
              </button>
            )}
          </div>
        </div>

        {/* KYC Pending Reminder Banner if not verified */}
        {!isKycVerified && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-in fade-in">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <strong className="text-amber-900 font-bold">Action Required: Complete Your Digital e-KYC</strong>
                <p className="text-amber-800 text-[11px] mt-0.5">
                  Link your Aadhaar & PAN in 2 minutes to unlock 100% cashless hospital admissions and instant digital claims.
                </p>
              </div>
            </div>
            {onOpenKyc && (
              <button
                onClick={onOpenKyc}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold whitespace-nowrap shadow-sm"
              >
                Start Digital KYC
              </button>
            )}
          </div>
        )}

        {/* 4 TOP DASHBOARD METRIC CARDS (Exact Match to Prompt Specs) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <span>Active Policies</span>
              <ShieldCheck className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-3xl font-extrabold text-navy-900 font-display">
              {policies.filter((p) => p.status === 'active' || p.status === 'renewed').length}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">
              ✓ All in-force
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <span>Upcoming Renewals</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-extrabold text-navy-900 font-display">
              {policies.filter((p) => p.status === 'expiring_soon').length}
            </div>
            <div className="text-[11px] text-amber-600 font-semibold mt-1">
              Due in next 30 days
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <span>Open Claims</span>
              <RefreshCw className="w-4 h-4 text-cyan-600 animate-spin" />
            </div>
            <div className="text-3xl font-extrabold text-navy-900 font-display">
              {MOCK_CLAIMS.filter((c) => c.status !== 'settled').length}
            </div>
            <div className="text-[11px] text-cyan-600 font-semibold mt-1">
              Under medical audit
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <span>Total Coverage</span>
              <Sparkles className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
              ₹1.18 Cr
            </div>
            <div className="text-[11px] text-slate-500 font-semibold mt-1">
              Across Health, Auto & Life
            </div>
          </div>

        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 mb-6 overflow-x-auto">
          {[
            { id: 'policies', label: 'My In-Force Policies', count: policies.length },
            { id: 'claims', label: 'Claim History', count: MOCK_CLAIMS.length },
            { id: 'renewals', label: 'Renewals & Payments', count: 1 },
            { id: 'documents', label: 'Policy Documents & 80D Tax', count: 3 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/70'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* TAB 1: POLICIES GRID */}
        {activeTab === 'policies' && (
          <div className="space-y-4">
            {renewedId && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center space-x-2 animate-in fade-in">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Policy renewal successful! Expiry date updated to 2027 with 5% NCB applied.</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {policies.map((pol) => {
                const isExpiring = pol.status === 'expiring_soon';
                const isRenewed = pol.status === 'renewed';

                return (
                  <div
                    key={pol.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top status */}
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          isRenewed
                            ? 'bg-emerald-100 text-emerald-800'
                            : isExpiring
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-teal-50 text-teal-800'
                        }`}>
                          {isRenewed ? 'Renewed' : isExpiring ? 'Expiring in 19 Days' : 'Active'}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{pol.policyNumber}</span>
                      </div>

                      {/* Policy Title & Insurer */}
                      <h3 className="text-base font-bold text-navy-900 font-display mb-1">
                        {pol.title}
                      </h3>
                      <div className="text-xs text-slate-500 mb-4">
                        Issued by <strong>{pol.insurer}</strong>
                      </div>

                      {/* Key Details Matrix */}
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs mb-4">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Coverage Limit:</span>
                          <span className="font-bold text-teal-700">{pol.coverageAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Premium Frequency:</span>
                          <span className="font-semibold text-slate-800">{pol.premiumPaid}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Nominee:</span>
                          <span className="font-semibold text-slate-800">{pol.nominee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Valid Until:</span>
                          <span className={`font-bold ${isExpiring ? 'text-amber-600' : 'text-slate-800'}`}>
                            {pol.expiryDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2 pt-2">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onViewCertificate(pol)}
                          className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center space-x-1 transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Policy</span>
                        </button>

                        {isExpiring ? (
                          <button
                            onClick={() => handleQuickRenew(pol.id)}
                            className="py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center justify-center space-x-1 shadow-xs"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Renew Now</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => onViewCertificate(pol)}
                            className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center space-x-1"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download PDF</span>
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: CLAIMS TAB */}
        {activeTab === 'claims' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider">All Historical Claims</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-semibold">
                    <th className="pb-3 pl-2">Claim ID</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Insurer</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_CLAIMS.map((clm) => (
                    <tr key={clm.id} className="hover:bg-slate-50">
                      <td className="py-3 pl-2 font-bold text-navy-900">{clm.claimNumber}</td>
                      <td className="py-3 text-slate-700">{clm.incidentType}</td>
                      <td className="py-3 text-slate-600">{clm.insurer}</td>
                      <td className="py-3 font-bold text-teal-700">{clm.claimAmount}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          clm.status === 'settled' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {clm.status === 'settled' ? 'Settled Cashless' : 'Under Review'}
                        </span>
                      </td>
                      <td className="py-3 text-slate-500">{clm.incidentDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: DOCUMENTS */}
        {activeTab === 'documents' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Section_80D_Tax_Certificate_FY26.pdf', size: '420 KB', date: 'Generated 15 Apr 2026' },
              { name: 'Health_Plus_Shield_Master_Policy.pdf', size: '1.4 MB', date: 'Issued 12 Jan 2026' },
              { name: 'Motor_Zero_Dep_Schedule_Honda.pdf', size: '890 KB', date: 'Issued 20 Sep 2025' },
            ].map((doc, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3 truncate">
                  <FileText className="w-6 h-6 text-teal-600 shrink-0" />
                  <div className="truncate">
                    <div className="text-xs font-bold text-navy-900 truncate">{doc.name}</div>
                    <div className="text-[10px] text-slate-400">{doc.date} • {doc.size}</div>
                  </div>
                </div>
                <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 shrink-0">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
