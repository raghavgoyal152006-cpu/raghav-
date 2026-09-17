import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  ShieldCheck, 
  CheckCircle2, 
  Building, 
  QrCode, 
  Calendar, 
  User, 
  FileText,
  Mail,
  Share2,
  Check,
  Receipt
} from 'lucide-react';
import { Policy } from '../types/insurance';

interface PolicyCertificateModalProps {
  policy: Policy | null;
  onClose: () => void;
  insuredName?: string;
}

export const PolicyCertificateModal: React.FC<PolicyCertificateModalProps> = ({ 
  policy, 
  onClose,
  insuredName = 'Rohan Sharma'
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!policy) return null;

  const handleDownload = () => {
    setDownloadSuccess(true);
    // Create a mock blob download
    const element = document.createElement('a');
    const file = new Blob([
      `COVERFLOW OFFICIAL INSURANCE CERTIFICATE\n` +
      `Policy Number: ${policy.policyNumber}\n` +
      `Plan: ${policy.title}\n` +
      `Insured: ${insuredName}\n` +
      `Coverage: ${policy.coverageAmount}\n` +
      `Underwritten by: ${policy.insurer}\n` +
      `Valid: ${policy.startDate} to ${policy.expiryDate}\n` +
      `Nominee: ${policy.nominee}\n` +
      `IRDAI Central Repository UID: CKYC-2026-8829104\n`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${policy.policyNumber}_Certificate.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Modal Actions Top Bar (Non-printable) */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-slate-900 text-white border-b border-slate-800 print:hidden">
          <div className="flex items-center space-x-2 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Official Policy Schedule & IRDAI Certificate of Insurance</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center space-x-1 text-xs font-semibold"
              title="Share Certificate Link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="p-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white transition-colors flex items-center space-x-1 text-xs font-bold shadow-xs"
              title="Download Certificate"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{downloadSuccess ? 'Downloaded!' : 'Download PDF'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Print Document"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Body */}
        <div className="p-8 sm:p-10 space-y-6 text-xs text-navy-900 bg-white relative">
          
          {/* Faint Security Watermark Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
            <div className="text-8xl font-black font-display rotate-[-30deg] tracking-widest text-navy-900">
              COVERFLOW VERIFIED
            </div>
          </div>

          {/* Certificate Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b-2 border-teal-600 pb-5 gap-4">
            <div>
              <div className="flex items-center space-x-2.5 mb-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                  CF
                </div>
                <div>
                  <span className="text-2xl font-black font-display tracking-tight text-navy-900">
                    Cover<span className="text-teal-600">Flow</span>
                  </span>
                  <div className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">
                    Regulated InsurTech Digital Platform
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 max-w-sm mt-1">
                Digital Policy Schedule issued in accordance with IRDAI (Protection of Policyholders' Interests) Regulations.
              </p>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Digitally Certified & In-Force</span>
              </div>
              <div className="text-xs text-slate-400 font-bold uppercase">Policy Reference No.</div>
              <div className="text-base font-mono font-extrabold text-teal-700">{policy.policyNumber}</div>
              <div className="text-[10px] text-slate-400 font-mono">UIN: IRDAI/NL-HLT/2026/V.1/994</div>
            </div>
          </div>

          {/* Key Schedule Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50/80 border border-slate-200 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Primary Insured</span>
              <strong className="text-navy-900 text-sm block mt-0.5">{insuredName}</strong>
              <span className="text-[10px] text-slate-500">Customer ID: CF-USR-99824</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Plan / Product</span>
              <strong className="text-navy-900 text-sm block mt-0.5 truncate">{policy.title}</strong>
              <span className="text-[10px] text-teal-700 font-semibold capitalize">{policy.type} Protection</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Sum Insured</span>
              <strong className="text-teal-700 text-sm block mt-0.5">{policy.coverageAmount}</strong>
              <span className="text-[10px] text-emerald-600 font-semibold">100% Restoration</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Period of Cover</span>
              <strong className="text-navy-900 text-xs block mt-0.5">{policy.startDate} — {policy.expiryDate}</strong>
              <span className="text-[10px] text-slate-500">365 Days Continuous</span>
            </div>
          </div>

          {/* Underwriter & Nominee Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl border border-slate-200/90 space-y-2 bg-white">
              <div className="font-bold text-navy-900 flex items-center space-x-1.5 text-xs pb-1 border-b border-slate-100">
                <Building className="w-3.5 h-3.5 text-teal-600" />
                <span>Licensed Underwriter Details</span>
              </div>
              <div className="space-y-1 text-[11px] text-slate-600">
                <div>Underwriting Entity: <strong className="text-navy-900">{policy.insurer}</strong></div>
                <div>IRDAI Registration No: <strong className="text-navy-900">148/2026/GIC</strong></div>
                <div>Corporate Agency License: <strong className="text-navy-900">CF-IRDAI-CA-99201</strong></div>
                <div>24/7 Cashless Authorization Desk: <strong className="text-teal-700">1800-268-3735</strong></div>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200/90 space-y-2 bg-white">
              <div className="font-bold text-navy-900 flex items-center space-x-1.5 text-xs pb-1 border-b border-slate-100">
                <User className="w-3.5 h-3.5 text-teal-600" />
                <span>Beneficiary & Tax Benefit Schedule</span>
              </div>
              <div className="space-y-1 text-[11px] text-slate-600">
                <div>Designated Nominee: <strong className="text-navy-900">{policy.nominee}</strong></div>
                <div>Nominee Relationship: <strong className="text-navy-900">Spouse (100% Share)</strong></div>
                <div>Section 80D Tax Receipt: <strong className="text-emerald-700 font-bold">Eligible (FY26-27)</strong></div>
                <div>Digital Health Card ID: <strong className="text-navy-900 font-mono">{policy.idCardNumber}</strong></div>
              </div>
            </div>
          </div>

          {/* Premium Computation & Tax Invoice Matrix */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div className="flex items-center justify-between font-bold text-navy-900 pb-1.5 border-b border-slate-200">
              <div className="flex items-center space-x-1.5">
                <Receipt className="w-3.5 h-3.5 text-teal-600" />
                <span>Premium Computation & Tax Invoice Schedule</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">TXN-ID: TXN-2026-981244</span>
            </div>

            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between text-slate-600">
                <span>Basic Underwriting Premium:</span>
                <span>₹7,449.00</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Add-on Endorsement (Consumables & Zero-Deductible OPD):</span>
                <span>₹890.00</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Integrated GST (IGST 18%):</span>
                <span>₹1,501.00</span>
              </div>
              <div className="flex justify-between font-bold text-navy-900 pt-1.5 border-t border-slate-200 text-xs">
                <span>Total Annual Premium Received:</span>
                <span className="text-teal-700 font-extrabold">{policy.premiumPaid}</span>
              </div>
            </div>
          </div>

          {/* Official Digital Cashless Card Mockup */}
          <div className="p-5 rounded-2xl bg-gradient-to-tr from-navy-900 via-slate-900 to-teal-950 text-white shadow-elevated flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-teal-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
                  CoverFlow Cashless Smart Pass
                </span>
              </div>
              <div className="text-lg font-bold font-display text-white">{insuredName}</div>
              <div className="text-xs text-slate-300 font-mono">
                Member ID: <strong className="text-white">{policy.idCardNumber}</strong>
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold flex items-center space-x-1.5">
                <span>●</span>
                <span>12,000+ Cashless Hospital Network & Zero-Dep Garages</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-2xl text-navy-950 flex flex-col items-center shrink-0 shadow-md">
              <QrCode className="w-14 h-14 text-navy-900" />
              <span className="text-[8px] font-extrabold uppercase mt-1 tracking-wider text-slate-600">
                IRDAI Scannable
              </span>
            </div>
          </div>

          {/* Endorsement Clauses & Signatures */}
          <div className="pt-3 border-t border-slate-200 text-[10px] text-slate-500 space-y-2">
            <p>
              <strong>Special Warranty & Conditions:</strong> Subject to standard policy terms and exclusions. Free-look cancellation period: 30 days from policy receipt. All cashless claims require electronic intimation via CoverFlow portal or network TPA desk within 24 hours of hospitalization.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-slate-400 pt-1 text-[10px]">
              <span>SHA-256 Digital Certificate Hash: 48dac0e55c30e7dafdee2c9adb73d79e</span>
              <span className="font-semibold text-slate-600">Authorized Signatory: CoverFlow InsurTech Central Repository</span>
            </div>
          </div>

        </div>

        {/* Modal Bottom Footer (Non-printable) */}
        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between print:hidden">
          <span className="text-xs text-slate-500 font-medium">
            IRDAI Compliant Electronic Policy (e-Policy)
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-navy-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
