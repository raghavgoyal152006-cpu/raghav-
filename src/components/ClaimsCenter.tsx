import React, { useState } from 'react';
import { 
  Search, 
  UploadCloud, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  PhoneCall, 
  FileText, 
  Check, 
  ArrowRight
} from 'lucide-react';
import { MOCK_CLAIMS } from '../data/mockData';
import { ClaimRecord } from '../types/insurance';

export const ClaimsCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'track' | 'file'>('track');
  const [claims, setClaims] = useState<ClaimRecord[]>(MOCK_CLAIMS);
  const [selectedClaimId, setSelectedClaimId] = useState<string>('CLM-2026-0041');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // File Claim State
  const [filePolicyNumber, setFilePolicyNumber] = useState<string>('CF-HLTH-2026-98124');
  const [incidentType, setIncidentType] = useState<string>('Hospitalization');
  const [incidentDate, setIncidentDate] = useState<string>('2026-08-30');
  const [claimAmount, setClaimAmount] = useState<string>('45000');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(['Hospital_Bill_Receipt.pdf']);
  const [claimSubmitted, setClaimSubmitted] = useState<boolean>(false);

  const filteredClaims = claims.filter(
    (c) =>
      c.claimNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.policyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.incidentType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentClaim = claims.find((c) => c.id === selectedClaimId) || claims[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileName = e.target.files[0].name;
      setUploadedFiles([...uploadedFiles, fileName]);
    }
  };

  const handleFileClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClaimId = `CLM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord: ClaimRecord = {
      id: newClaimId,
      claimNumber: `CF-CLM-${Math.floor(10000 + Math.random() * 90000)}`,
      policyNumber: filePolicyNumber,
      policyType: 'health',
      insurer: 'CareNova Assurance',
      claimantName: 'Rohan Sharma',
      incidentType: incidentType,
      incidentDate: incidentDate,
      claimAmount: `₹${Number(claimAmount).toLocaleString()}`,
      approvedAmount: `₹${Math.round(Number(claimAmount) * 0.95).toLocaleString()}`,
      status: 'under_assessment',
      currentStep: 3,
      lastUpdated: 'Just Now',
      documents: uploadedFiles.map((name) => ({ name, size: '1.2 MB', status: 'verified' })),
      timeline: [
        { step: 'Claim Registered', timestamp: 'Today, 09:30 AM', note: 'Intimation logged via mobile portal.', completed: true },
        { step: 'Documents Received', timestamp: 'Today, 10:15 AM', note: `${uploadedFiles.length} bills uploaded & OCR scanned.`, completed: true },
        { step: 'Under Medical Audit', timestamp: 'Today, 11:00 AM', note: 'Doctor verifying diagnosis at hospital desk.', completed: true },
        { step: 'Final Approval', timestamp: 'Estimated in 2 Hours', note: 'Cashless pre-authorization voucher ready.', completed: false },
        { step: 'Settlement Disbursed', timestamp: 'Pending', note: 'Direct payment to hospital account.', completed: false },
      ],
    };

    setClaims([newRecord, ...claims]);
    setSelectedClaimId(newClaimId);
    setClaimSubmitted(true);
  };

  const workflowSteps = [
    { number: 1, title: 'Claim Registered', desc: 'Digital incident intimation logged' },
    { number: 2, title: 'Documents Received', desc: 'Medical/repair bills OCR verified' },
    { number: 3, title: 'Under Assessment', desc: 'Medical board & surveyor audit' },
    { number: 4, title: 'Final Decision', desc: 'Cashless approval & liability signoff' },
    { number: 5, title: 'Settlement Disbursed', desc: 'Direct NEFT bank transfer' },
  ];

  return (
    <section id="claims" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold mb-3">
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            <span>Real-Time Digital Claims Center</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-display tracking-tight">
            Fast, Transparent Claim Management
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Intimate incidents, upload diagnostic bills, and track claim disbursements live with zero paperwork.
          </p>

          {/* Sub Navigation Switcher */}
          <div className="mt-6 inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => { setActiveTab('track'); setClaimSubmitted(false); }}
              className={`px-5 py-2 rounded-lg transition-all ${
                activeTab === 'track' ? 'bg-white text-navy-900 shadow-xs' : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              Track Existing Claim
            </button>
            <button
              onClick={() => setActiveTab('file')}
              className={`px-5 py-2 rounded-lg transition-all ${
                activeTab === 'file' ? 'bg-white text-navy-900 shadow-xs' : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              File a New Claim
            </button>
          </div>
        </div>

        {/* TAB 1: TRACK EXISTING CLAIM */}
        {activeTab === 'track' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Claim Selector & Search (4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="block text-xs font-bold text-navy-900 mb-1.5">
                  Look Up By Claim / Policy ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter CF-CLM-98214..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-navy-900 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Demo Active Claims ({filteredClaims.length})
                </div>
                {filteredClaims.map((claim) => {
                  const isSelected = selectedClaimId === claim.id;
                  return (
                    <div
                      key={claim.id}
                      onClick={() => setSelectedClaimId(claim.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-teal-50/70 border-teal-500 ring-1 ring-teal-500/20 shadow-sm'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-extrabold text-navy-900">{claim.claimNumber}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          claim.status === 'settled' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {claim.status === 'settled' ? 'Settled' : 'Under Assessment'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 font-medium truncate">{claim.incidentType}</div>
                      <div className="flex justify-between items-center text-[11px] text-slate-400 mt-2">
                        <span>Amount: <strong className="text-slate-700">{claim.claimAmount}</strong></span>
                        <span>{claim.incidentDate}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Concierge Help Box */}
              <div className="p-4 rounded-2xl bg-navy-900 text-white text-xs space-y-2">
                <div className="flex items-center space-x-2 font-bold text-teal-300">
                  <PhoneCall className="w-4 h-4" />
                  <span>24/7 Claim Concierge Desk</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Stuck at a network hospital or authorized garage? Call our direct cashless emergency line: <strong>1800-268-3735</strong>.
                </p>
              </div>
            </div>

            {/* Right: Live Visual Progress Tracker & Claim Details (8 Cols) */}
            <div className="lg:col-span-8 bg-slate-50/60 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-6">
              
              {/* Claim Overview Box */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400 font-semibold">Claim Intimation Reference</div>
                  <h3 className="text-lg font-bold text-navy-900 font-display mt-0.5">{currentClaim.claimNumber}</h3>
                  <div className="text-xs text-slate-600 mt-1">
                    Insurer: <strong>{currentClaim.insurer}</strong> • Policy: <strong>{currentClaim.policyNumber}</strong>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-semibold">Claimed Amount</div>
                  <div className="text-xl font-extrabold text-teal-600 font-display">{currentClaim.claimAmount}</div>
                  <div className="text-[10px] text-slate-500">Updated: {currentClaim.lastUpdated}</div>
                </div>
              </div>

              {/* Visual Step Progression Bar */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs">
                <div className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-6">
                  Live Settlement Progression
                </div>

                <div className="relative">
                  {/* Connecting Horizontal Line */}
                  <div className="hidden sm:block absolute top-4 left-6 right-6 h-1 bg-slate-200 -z-0">
                    <div
                      className="bg-teal-500 h-1 transition-all duration-500"
                      style={{ width: `${((currentClaim.currentStep - 1) / 4) * 100}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
                    {workflowSteps.map((stepItem) => {
                      const isPast = stepItem.number < currentClaim.currentStep;
                      const isCurrent = stepItem.number === currentClaim.currentStep;

                      return (
                        <div key={stepItem.number} className="flex sm:flex-col items-center sm:text-center space-x-3 sm:space-x-0">
                          {/* Step Icon Node */}
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                            isPast
                              ? 'bg-emerald-500 text-white shadow-xs'
                              : isCurrent
                              ? 'bg-teal-600 text-white ring-4 ring-teal-100 shadow-sm animate-pulse'
                              : 'bg-slate-200 text-slate-500'
                          }`}>
                            {isPast ? <Check className="w-4 h-4 stroke-[3]" /> : stepItem.number}
                          </div>

                          {/* Step Title & Desc */}
                          <div className="sm:mt-2">
                            <div className={`text-xs font-bold ${isCurrent ? 'text-teal-700' : isPast ? 'text-navy-900' : 'text-slate-400'}`}>
                              {stepItem.title}
                            </div>
                            <div className="text-[10px] text-slate-500 hidden sm:block mt-0.5 leading-tight">
                              {stepItem.desc}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Timeline Detail Log */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
                <div className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                  Audit Activity Logs
                </div>
                <div className="space-y-3">
                  {currentClaim.timeline.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-xs">
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${item.completed ? 'bg-teal-500' : 'bg-slate-300'}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-navy-900">{item.step}</span>
                          <span className="text-[10px] text-slate-400 font-medium">{item.timestamp}</span>
                        </div>
                        <p className="text-slate-600 text-[11px] mt-0.5">{item.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Uploaded Documents List */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-navy-900 uppercase tracking-wider">Verified Documents ({currentClaim.documents.length})</span>
                  <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">256-Bit Encrypted</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {currentClaim.documents.map((doc, dIdx) => (
                    <div key={dIdx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-2 text-xs">
                      <FileText className="w-4 h-4 text-teal-600 shrink-0" />
                      <div className="truncate">
                        <div className="font-semibold text-slate-800 truncate">{doc.name}</div>
                        <div className="text-[10px] text-slate-400">{doc.size}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance Disclaimers */}
              <div className="text-[10px] text-slate-400 flex items-start space-x-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>
                  Claim settlement timelines are indicative estimates based on insurer TPA operational workflows and verified policy terms. The platform does not guarantee approval or fixed disbursement timings.
                </span>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: FILE A NEW CLAIM FORM */}
        {activeTab === 'file' && (
          <div className="max-w-2xl mx-auto bg-slate-50/60 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle">
            {!claimSubmitted ? (
              <form onSubmit={handleFileClaimSubmit} className="space-y-5">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-navy-900 font-display">
                    File a Digital Claim
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Takes less than 3 minutes. Upload diagnostic records or repair estimates directly.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1.5">
                    Select Active Policy
                  </label>
                  <select
                    value={filePolicyNumber}
                    onChange={(e) => setFilePolicyNumber(e.target.value)}
                    className="w-full text-xs font-semibold text-navy-900 bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="CF-HLTH-2026-98124">Plus Shield Health (CF-HLTH-2026-98124)</option>
                    <option value="CF-AUTO-2025-44120">Zero-Dep Car Shield (CF-AUTO-2025-44120)</option>
                    <option value="CF-TERM-2024-11098">Term Life Plus (CF-TERM-2024-11098)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-1.5">
                      Incident Type
                    </label>
                    <select
                      value={incidentType}
                      onChange={(e) => setIncidentType(e.target.value)}
                      className="w-full text-xs font-semibold text-navy-900 bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    >
                      <option value="Hospitalization">Emergency Hospitalization</option>
                      <option value="Planned Surgery">Planned Daycare Procedure</option>
                      <option value="Vehicle Accident">Car Collision / Scratch</option>
                      <option value="Flight Delay">Flight Delay & Cancellation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-1.5">
                      Date of Occurrence
                    </label>
                    <input
                      type="date"
                      value={incidentDate}
                      onChange={(e) => setIncidentDate(e.target.value)}
                      className="w-full text-xs font-semibold text-navy-900 bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1.5">
                    Estimated Claim Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(e.target.value)}
                    placeholder="e.g. 45000"
                    className="w-full text-xs font-semibold text-navy-900 bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                {/* Document Upload Simulator */}
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1.5">
                    Upload Supporting Invoices / Discharge Summary
                  </label>
                  <div className="border-2 border-dashed border-slate-300 hover:border-teal-400 rounded-2xl p-6 text-center bg-white cursor-pointer transition-colors">
                    <UploadCloud className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                    <div className="text-xs font-bold text-navy-900">Click to upload documents</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">PDF, PNG, JPG up to 15MB</div>
                    <input type="file" onChange={handleFileUpload} className="hidden" id="claim-file-input" />
                    <label htmlFor="claim-file-input" className="inline-block mt-3 px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 text-xs font-bold cursor-pointer hover:bg-teal-100">
                      Browse Files
                    </label>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="mt-3 space-y-1.5">
                      {uploadedFiles.map((file, fIdx) => (
                        <div key={fIdx} className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs">
                          <span className="font-medium text-slate-700">{file}</span>
                          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Ready</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-teal-600/20 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Submit Claim Intimation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>
                <h4 className="text-2xl font-extrabold text-navy-900 font-display">
                  Claim Registered!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your reference ID is <strong className="text-teal-700">CF-CLM-99142</strong>. Our medical auditor team has initiated the cashless query with the hospital desk.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => { setActiveTab('track'); setSelectedClaimId('CLM-2026-0041'); }}
                    className="px-5 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-semibold"
                  >
                    Go To Track Screen
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
