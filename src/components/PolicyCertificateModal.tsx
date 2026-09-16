import React from 'react';
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
  Lock
} from 'lucide-react';
import { Policy } from '../types/insurance';

interface PolicyCertificateModalProps {
  policy: Policy | null;
  onClose: () => void;
}

export const PolicyCertificateModal: React.FC<PolicyCertificateModalProps> = ({ policy, onClose }) => {
  if (!policy) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Actions Top Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-slate-900 text-white">
          <div className="flex items-center space-x-2 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Official Policy Certificate Preview</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Print Document"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Body */}
        <div className="p-8 space-y-6 text-xs text-navy-900 bg-white">
          
          {/* Certificate Header */}
          <div className="flex items-start justify-between border-b-2 border-teal-600 pb-5">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                  CF
                </div>
                <span className="text-xl font-extrabold font-display text-navy-900">CoverFlow</span>
              </div>
              <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                Digital Policy Schedule & Certificate of Insurance
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Policy Reference</div>
              <div className="text-sm font-mono font-extrabold text-teal-700">{policy.policyNumber}</div>
              <div className="text-[10px] text-emerald-600 font-bold">● Digitally Signed & Stamped</div>
            </div>
          </div>

          {/* Key Identification Schedule Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Primary Insured</div>
              <div className="font-bold text-navy-900 mt-0.5">Rohan Sharma</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Product Plan</div>
              <div className="font-bold text-navy-900 mt-0.5 truncate">{policy.title}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Sum Insured</div>
              <div className="font-extrabold text-teal-700 mt-0.5">{policy.coverageAmount}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Valid Period</div>
              <div className="font-bold text-navy-900 mt-0.5">{policy.startDate} — {policy.expiryDate}</div>
            </div>
          </div>

          {/* Underwriter Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl border border-slate-200 space-y-1.5">
              <div className="font-bold text-navy-900 text-xs flex items-center space-x-1.5">
                <Building className="w-3.5 h-3.5 text-teal-600" />
                <span>Underwriting Insurer</span>
              </div>
              <div className="text-slate-700"><strong>{policy.insurer}</strong></div>
              <div className="text-[11px] text-slate-500">Corporate Agency License: CF-IRDAI-CA-99201</div>
              <div className="text-[11px] text-slate-500">TPA Concierge: 1800-268-3735 (24/7 Cashless)</div>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 space-y-1.5">
              <div className="font-bold text-navy-900 text-xs flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-teal-600" />
                <span>Beneficiary & Nominee</span>
              </div>
              <div className="text-slate-700">Nominee: <strong>{policy.nominee}</strong></div>
              <div className="text-[11px] text-slate-500">Member Card ID: {policy.idCardNumber}</div>
              <div className="text-[11px] text-emerald-600 font-semibold">Section 80D Tax Benefit Eligible</div>
            </div>
          </div>

          {/* Digital Cashless Card Mockup */}
          <div className="p-5 rounded-2xl bg-gradient-to-tr from-navy-900 via-slate-900 to-teal-950 text-white shadow-md flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-300">CoverFlow Health Pass</span>
              </div>
              <div className="text-sm font-bold font-display">Rohan Sharma</div>
              <div className="text-[10px] text-slate-300 font-mono">Card ID: {policy.idCardNumber}</div>
              <div className="text-[10px] text-emerald-400 font-bold">12,000+ Cashless Hospitals Approved</div>
            </div>

            <div className="p-2 bg-white rounded-xl text-navy-950 flex flex-col items-center">
              <div className="w-12 h-12 bg-slate-900 rounded flex items-center justify-center text-white text-[9px] font-mono text-center">
                [QR PASS]
              </div>
              <span className="text-[8px] font-bold uppercase mt-1">Scan At Desk</span>
            </div>
          </div>

          {/* Footer Legal Seal */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-[10px] text-slate-400">
            <div>
              Secured with SHA-256 Digital Signature • Registered with Central Insurance Repository (CIR).
            </div>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-navy-900 text-white font-semibold text-xs"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
