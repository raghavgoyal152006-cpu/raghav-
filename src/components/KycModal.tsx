import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  UserCheck, 
  CreditCard, 
  FileText, 
  Camera, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Upload, 
  RefreshCw, 
  QrCode, 
  Download,
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { KycData } from '../types/insurance';

interface KycModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentKycData?: KycData;
  onKycComplete: (data: KycData) => void;
  userName?: string;
}

export const KycModal: React.FC<KycModalProps> = ({
  isOpen,
  onClose,
  currentKycData,
  onKycComplete,
  userName = 'Rohan Sharma'
}) => {
  const [step, setStep] = useState<number>(1);
  
  // Step 1: PAN
  const [panNumber, setPanNumber] = useState(currentKycData?.panNumber || 'ABCPS1234F');
  const [panName, setPanName] = useState(currentKycData?.panName || userName.toUpperCase());
  const [isPanVerified, setIsPanVerified] = useState(Boolean(currentKycData?.panNumber));
  const [panLoading, setPanLoading] = useState(false);

  // Step 2: Aadhaar e-KYC
  const [aadhaarNumber, setAadhaarNumber] = useState(currentKycData?.aadhaarNumber || '5421 8890 8912');
  const [aadhaarOtp, setAadhaarOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);
  const [isAadhaarVerified, setIsAadhaarVerified] = useState(Boolean(currentKycData?.aadhaarVerified));
  const [aadhaarLoading, setAadhaarLoading] = useState(false);

  // Step 3: Document Upload & AI OCR
  const [docType, setDocType] = useState<'aadhaar' | 'passport' | 'voter_id' | 'driving_license'>('aadhaar');
  const [fileName, setFileName] = useState(currentKycData?.documentFileName || 'Aadhaar_DigiLocker_Verified.xml');
  const [isScanning, setIsScanning] = useState(false);
  const [ocrCompleted, setOcrCompleted] = useState(Boolean(currentKycData?.ocrMatchScore));
  const [ocrScore, setOcrScore] = useState(currentKycData?.ocrMatchScore || 99.4);

  // Step 4: Liveness Selfie
  const [selfieCaptured, setSelfieCaptured] = useState(Boolean(currentKycData?.livenessVerified));
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraCountdown, setCameraCountdown] = useState<number | null>(null);

  // Generated CKYC
  const [generatedCkyc, setGeneratedCkyc] = useState(currentKycData?.ckycNumber || 'CKYC-2026-8829104');

  useEffect(() => {
    let interval: any;
    if (otpSent && otpTimer > 0) {
      interval = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, otpTimer]);

  if (!isOpen) return null;

  const handleVerifyPan = () => {
    if (panNumber.length !== 10) return;
    setPanLoading(true);
    setTimeout(() => {
      setPanLoading(false);
      setIsPanVerified(true);
      if (!panName) setPanName(userName.toUpperCase());
    }, 900);
  };

  const handleSendAadhaarOtp = () => {
    if (aadhaarNumber.replace(/\s/g, '').length < 12) return;
    setAadhaarLoading(true);
    setTimeout(() => {
      setAadhaarLoading(false);
      setOtpSent(true);
      setOtpTimer(30);
    }, 800);
  };

  const handleVerifyAadhaarOtp = () => {
    if (aadhaarOtp.length !== 6 && aadhaarOtp !== '719284') return;
    setAadhaarLoading(true);
    setTimeout(() => {
      setAadhaarLoading(false);
      setIsAadhaarVerified(true);
    }, 900);
  };

  const handleTriggerScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setOcrCompleted(true);
      setOcrScore(99.6);
    }, 1500);
  };

  const handleStartSelfieCapture = () => {
    setIsCameraActive(true);
    setCameraCountdown(3);
    const countdownTimer = setInterval(() => {
      setCameraCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countdownTimer);
          setIsCameraActive(false);
          setSelfieCaptured(true);
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);
  };

  const handleFinalSubmit = () => {
    const ckycNum = generatedCkyc || `CKYC-2026-${Math.floor(1000000 + Math.random() * 9000000)}`;
    setGeneratedCkyc(ckycNum);
    const updatedData: KycData = {
      panNumber: panNumber.toUpperCase(),
      panName: panName || userName.toUpperCase(),
      aadhaarNumber: `XXXX XXXX ${aadhaarNumber.replace(/\s/g, '').slice(-4) || '8912'}`,
      aadhaarVerified: true,
      ckycNumber: ckycNum,
      documentType: docType,
      documentNumber: aadhaarNumber.slice(-4) || '8912',
      documentFileName: fileName,
      ocrMatchScore: ocrScore,
      livenessVerified: true,
      verifiedAt: 'Just Now',
      address: 'Flat 402, Green Glen Layout, Bellandur, Bengaluru 560103',
    };

    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback if canvas-confetti is not supported
    }

    onKycComplete(updatedData);
    setStep(5); // Success celebration screen
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-navy-900 via-slate-900 to-teal-950 text-white px-6 py-5 flex items-center justify-between border-b border-teal-500/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold font-display tracking-tight text-white">
                  IRDAI Digital KYC & CKYC Verification
                </h3>
                <span className="text-[10px] bg-teal-500/30 text-teal-300 font-bold px-2 py-0.5 rounded-full border border-teal-400/30">
                  DigiLocker Synced
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Instant digital identity verification for faster cashless claim settlement and policy issuance.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4-Step Stepper Progress Bar */}
        {step <= 4 && (
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-3">
            <div className="grid grid-cols-4 gap-2">
              {[
                { s: 1, label: 'PAN Card', icon: CreditCard, done: isPanVerified },
                { s: 2, label: 'Aadhaar e-KYC', icon: Smartphone, done: isAadhaarVerified },
                { s: 3, label: 'AI OCR Scan', icon: FileText, done: ocrCompleted },
                { s: 4, label: 'Live Selfie', icon: Camera, done: selfieCaptured },
              ].map((item) => {
                const StepIcon = item.icon;
                const isActive = step === item.s;
                const isCompleted = item.done;

                return (
                  <button
                    key={item.s}
                    onClick={() => {
                      if (item.s <= step || isCompleted) setStep(item.s);
                    }}
                    className={`flex items-center space-x-2 p-2 rounded-xl text-left transition-all ${
                      isActive 
                        ? 'bg-teal-50 border border-teal-200 text-teal-900 shadow-2xs' 
                        : isCompleted
                        ? 'text-emerald-700 hover:bg-emerald-50/50'
                        : 'text-slate-400'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                      isCompleted 
                        ? 'bg-emerald-600 text-white' 
                        : isActive 
                        ? 'bg-teal-600 text-white' 
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <StepIcon className="w-3 h-3" />}
                    </div>
                    <span className="text-[11px] font-bold hidden sm:inline truncate">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP BODY */}
        <div className="p-6 sm:p-8 space-y-6">

          {/* STEP 1: PAN CARD VERIFICATION */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200/70 text-teal-900 text-xs">
                <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Permanent Account Number (PAN) Validation:</strong>
                  <p className="text-teal-800 text-[11px] mt-0.5">
                    Required under Section 114B of Income Tax Act and IRDAI KYC Master Directions for insurance premium payments.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                    10-Digit PAN Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={10}
                      value={panNumber}
                      onChange={(e) => {
                        setPanNumber(e.target.value.toUpperCase());
                        setIsPanVerified(false);
                      }}
                      placeholder="e.g. ABCPS1234F"
                      className="w-full text-base tracking-widest font-mono uppercase bg-white border border-slate-200 rounded-xl px-4 py-3 text-navy-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
                    />
                    {isPanVerified && (
                      <span className="absolute right-3 top-3 bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>NSDL Verified</span>
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                    Name as per PAN Records
                  </label>
                  <input
                    type="text"
                    value={panName}
                    onChange={(e) => setPanName(e.target.value.toUpperCase())}
                    placeholder="ROHAN SHARMA"
                    className="w-full text-xs font-semibold uppercase bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-navy-900 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                {!isPanVerified ? (
                  <button
                    type="button"
                    onClick={handleVerifyPan}
                    disabled={panNumber.length !== 10 || panLoading}
                    className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-md shadow-teal-600/20"
                  >
                    {panLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying with Income Tax Portal...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Verify PAN with NSDL / ITD Database</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-emerald-800 text-xs font-semibold">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div>
                        <div className="font-bold">PAN Validated & Active</div>
                        <div className="text-[11px] text-emerald-700">Aadhaar Seeding Status: Linked & Compliant</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1 shadow-sm"
                    >
                      <span>Proceed to Step 2</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: AADHAAR E-KYC VIA DIGILOCKER */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-sky-900 text-xs">
                <Smartphone className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Paperless DigiLocker / Aadhaar e-KYC:</strong>
                  <p className="text-sky-800 text-[11px] mt-0.5">
                    Direct integration with UIDAI Central Repository. Receive instant OTP on your Aadhaar-registered mobile number.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                    12-Digit Aadhaar Number (or Virtual ID)
                  </label>
                  <input
                    type="text"
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value)}
                    placeholder="XXXX XXXX 8912"
                    className="w-full text-base tracking-widest font-mono bg-white border border-slate-200 rounded-xl px-4 py-3 text-navy-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    🔒 Protected under UIDAI Aadhaar Act 2016. Only masked 4 digits stored on servers.
                  </span>
                </div>

                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSendAadhaarOtp}
                    disabled={aadhaarLoading}
                    className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-md shadow-teal-600/20"
                  >
                    {aadhaarLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Connecting to UIDAI OTP Gateway...</span>
                      </>
                    ) : (
                      <>
                        <Smartphone className="w-4 h-4" />
                        <span>Send 6-Digit UIDAI OTP</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-navy-900">Enter OTP sent to registered mobile:</span>
                      <span className="text-slate-500 font-mono text-[11px]">
                        {otpTimer > 0 ? `Resend in ${otpTimer}s` : 'OTP Expired'}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        maxLength={6}
                        value={aadhaarOtp}
                        onChange={(e) => setAadhaarOtp(e.target.value)}
                        placeholder="719284"
                        className="flex-1 text-center tracking-[0.4em] font-mono text-lg font-bold bg-white border border-slate-300 rounded-xl py-2.5 text-navy-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      <button
                        type="button"
                        onClick={() => setAadhaarOtp('719284')}
                        className="px-3 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold whitespace-nowrap"
                      >
                        Auto-fill (719284)
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleVerifyAadhaarOtp}
                      disabled={aadhaarLoading}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center space-x-1 shadow-sm"
                    >
                      {aadhaarLoading ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Decrypting DigiLocker Identity...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Verify & Fetch XML Certificate</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {isAadhaarVerified && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                    <div className="text-emerald-800 text-xs">
                      <span className="font-bold flex items-center space-x-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Aadhaar e-KYC Verified Successfully</span>
                      </span>
                      <p className="text-[11px] text-emerald-700 mt-0.5">
                        Address: Flat 402, Green Glen Layout, Bellandur, Bengaluru
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1 shadow-sm"
                    >
                      <span>Proceed to Step 3</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: DOCUMENT UPLOAD & AI OCR SCANNER */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs">
                <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">AI Computer Vision & OCR Verification:</strong>
                  <p className="text-indigo-800 text-[11px] mt-0.5">
                    Our neural network cross-references photograph, holographic seals, and text against government records.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                    Select Document Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'aadhaar', label: 'Aadhaar XML' },
                      { id: 'passport', label: 'Passport' },
                      { id: 'driving_license', label: 'Driving License' },
                      { id: 'voter_id', label: 'Voter ID' },
                    ].map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setDocType(d.id as any)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                          docType === d.id
                            ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-2xs'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upload Zone */}
                <label className="border-2 border-dashed border-slate-200 hover:border-teal-400 rounded-2xl p-6 text-center bg-slate-50/50 transition-colors block cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg,.xml"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFileName(e.target.files[0].name);
                      }
                    }}
                  />
                  <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h4 className="text-xs font-bold text-navy-900">
                    Uploaded Document: <span className="text-teal-700">{fileName}</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Click to browse or drop file (Supports PDF, PNG, JPG, or DigiLocker XML)
                  </p>
                </label>

                {!ocrCompleted ? (
                  <button
                    type="button"
                    onClick={handleTriggerScan}
                    disabled={isScanning}
                    className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-md shadow-teal-600/20"
                  >
                    {isScanning ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>AI Neural Network Scanning Document Features...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Run Instant AI OCR Verification</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-emerald-800 text-xs font-bold">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>OCR Verification Passed (Score: {ocrScore}%)</span>
                      </div>
                      <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                        Zero Forgery Detected
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-white/70 p-2.5 rounded-xl border border-emerald-100 text-slate-700">
                      <div>Name Match: <strong className="text-emerald-700">100%</strong></div>
                      <div>DOB Extracted: <strong className="text-emerald-700">15-08-1992</strong></div>
                      <div>Hologram Integrity: <strong className="text-emerald-700">Valid</strong></div>
                      <div>Central DB Match: <strong className="text-emerald-700">Confirmed</strong></div>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => setStep(4)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1 shadow-sm"
                      >
                        <span>Proceed to Step 4</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: LIVE LIVENESS / VIDEO SELFIE */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-purple-50 border border-purple-200 text-purple-900 text-xs">
                <Camera className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Live Human Biometric Check:</strong>
                  <p className="text-purple-800 text-[11px] mt-0.5">
                    Position your face within the frame. IRDAI regulations require 3D depth verification to prevent impersonation fraud.
                  </p>
                </div>
              </div>

              {/* Viewfinder simulation */}
              <div className="relative w-full h-64 rounded-3xl bg-slate-900 flex flex-col items-center justify-center text-white overflow-hidden border-2 border-dashed border-teal-500/40">
                {isCameraActive ? (
                  <div className="text-center space-y-2 animate-pulse">
                    <div className="text-6xl font-black text-teal-400 font-display">
                      {cameraCountdown}
                    </div>
                    <p className="text-xs text-slate-300 font-semibold">Hold still... AI checking micro-expressions</p>
                  </div>
                ) : selfieCaptured ? (
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-display">3D Biometric Face Verified</h4>
                      <p className="text-xs text-emerald-400 font-semibold mt-0.5">Liveness Score: 99.9% (Passed)</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-3 px-4">
                    {/* Face oval guide */}
                    <div className="w-28 h-36 border-2 border-teal-400 rounded-[50%] flex items-center justify-center mx-auto relative">
                      <span className="w-2 h-2 rounded-full bg-teal-400 absolute top-1"></span>
                      <span className="w-2 h-2 rounded-full bg-teal-400 absolute bottom-1"></span>
                      <span className="w-2 h-2 rounded-full bg-teal-400 absolute left-1"></span>
                      <span className="w-2 h-2 rounded-full bg-teal-400 absolute right-1"></span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Center your face in good lighting. No glasses or hats.
                    </p>
                  </div>
                )}
              </div>

              {!selfieCaptured ? (
                <button
                  type="button"
                  onClick={handleStartSelfieCapture}
                  disabled={isCameraActive}
                  className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-md shadow-teal-600/20"
                >
                  <Camera className="w-4 h-4" />
                  <span>{isCameraActive ? 'Capturing Liveness...' : 'Capture 3-Second Liveness Selfie'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-bold flex items-center justify-center space-x-2 transition-all shadow-lg shadow-teal-600/30 active:scale-[0.99]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Issue IRDAI CKYC Certificate & Finalize</span>
                </button>
              )}
            </div>
          )}

          {/* STEP 5: SUCCESS / CELEBRATION */}
          {step === 5 && (
            <div className="text-center space-y-6 animate-in zoom-in-95 py-2">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-navy-950 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <ShieldCheck className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-extrabold text-navy-900 font-display">
                  Digital KYC Verification Complete!
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Your identity has been authenticated against UIDAI, NSDL, and the Central KYC Registry (CKYC).
                </p>
              </div>

              {/* Official CKYC ID Card */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-gradient-to-br from-navy-900 to-slate-900 text-white border border-teal-500/30 text-left shadow-elevated space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] text-teal-400 uppercase font-bold tracking-widest block">
                      Government of India
                    </span>
                    <span className="text-xs font-bold text-white">Central KYC Registry (CKYCR)</span>
                  </div>
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-teal-300">
                    <QrCode className="w-5 h-5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Insured Name</span>
                    <strong className="text-slate-100">{panName || userName}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">CKYC Unique ID</span>
                    <strong className="font-mono text-teal-300">{generatedCkyc}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">PAN Number</span>
                    <strong className="font-mono text-slate-100">{panNumber}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Aadhaar Status</span>
                    <span className="text-emerald-400 font-bold">✓ e-KYC Verified</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Validity: Lifetime (IRDAI Compliant)</span>
                  <span className="text-teal-400 font-semibold">100% Cashless Eligible</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
                >
                  Return to Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert(`Downloaded CKYC Certificate (${generatedCkyc}.pdf)`);
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center space-x-1.5 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CKYC Certificate</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        {step <= 4 && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => step > 1 && setStep(step - 1)}
              disabled={step === 1}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-navy-900 hover:bg-slate-200 disabled:opacity-40 flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <span className="text-xs text-slate-400 font-medium">
              Step {step} of 4 • 256-bit Encrypted
            </span>

            <button
              type="button"
              onClick={() => {
                if (step === 1 && isPanVerified) setStep(2);
                else if (step === 2 && isAadhaarVerified) setStep(3);
                else if (step === 3 && ocrCompleted) setStep(4);
                else if (step === 4 && selfieCaptured) handleFinalSubmit();
                else alert('Please complete the current verification step first.');
              }}
              className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold flex items-center space-x-1 shadow-sm"
            >
              <span>{step === 4 ? 'Complete Verification' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
