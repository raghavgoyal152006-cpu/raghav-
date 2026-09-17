import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  Smartphone, 
  Building2, 
  QrCode, 
  RefreshCw, 
  Copy, 
  Check, 
  Zap, 
  ArrowRight,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface PaymentPayload {
  title: string;
  subtitle?: string;
  amount: number;
  policyNumber?: string;
  category?: string;
  onPaymentSuccess: (receipt: PaymentReceipt) => void;
}

export interface PaymentReceipt {
  transactionId: string;
  bankReference: string;
  amountPaid: number;
  paymentMethod: string;
  timestamp: string;
  status: 'SUCCESS';
  payerUpiOrCard: string;
}

interface FreePaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  payload: PaymentPayload | null;
}

export const FreePaymentGatewayModal: React.FC<FreePaymentGatewayModalProps> = ({
  isOpen,
  onClose,
  payload,
}) => {
  const [activeTab, setActiveTab] = useState<'upi' | 'card' | 'netbanking' | 'paylater'>('upi');
  
  // UPI State
  const [upiId, setUpiId] = useState('rohan.sharma@okhdfcbank');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'cred'>('gpay');
  const [qrCodeScanned, setQrCodeScanned] = useState(false);

  // Card State
  const [cardNumber, setCardNumber] = useState('4111 8901 2345 6789');
  const [cardHolder, setCardHolder] = useState('ROHAN SHARMA');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('782');
  const [saveCard, setSaveCard] = useState(true);

  // Netbanking State
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // PayLater State
  const [selectedEmiTenure, setSelectedEmiTenure] = useState<'3' | '6' | '12'>('6');

  // Simulation Controls
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState<string>('');
  const [simulateDecline, setSimulateDecline] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [completedReceipt, setCompletedReceipt] = useState<PaymentReceipt | null>(null);
  const [copiedTxn, setCopiedTxn] = useState(false);

  const handleModalClose = () => {
    setIsProcessing(false);
    setProcessingStage('');
    setErrorMessage(null);
    setCompletedReceipt(null);
    setQrCodeScanned(false);
    onClose();
  };

  if (!isOpen || !payload) return null;

  const baseAmount = Math.round(payload.amount / 1.18);
  const gstAmount = payload.amount - baseAmount;

  const handleQuickCardFill = (type: 'visa' | 'mastercard' | 'rupay') => {
    if (type === 'visa') {
      setCardNumber('4111 8901 2345 6789');
      setCardHolder('ROHAN SHARMA');
      setCardExpiry('08/29');
      setCardCvv('782');
    } else if (type === 'mastercard') {
      setCardNumber('5241 6700 8912 3456');
      setCardHolder('ROHAN SHARMA');
      setCardExpiry('11/28');
      setCardCvv('419');
    } else {
      setCardNumber('6080 1200 4590 8821');
      setCardHolder('ROHAN SHARMA');
      setCardExpiry('05/30');
      setCardCvv('301');
    }
  };

  const handleExecutePayment = (methodLabel: string, detail: string) => {
    setIsProcessing(true);
    setErrorMessage(null);
    setProcessingStage('Connecting to IRDAI Encrypted Payment Switch...');

    setTimeout(() => {
      setProcessingStage('Authenticating with NPCI / Tokenized Gateway...');
    }, 600);

    setTimeout(() => {
      if (simulateDecline) {
        setIsProcessing(false);
        setErrorMessage('Simulation: Bank declined transaction (Insufficient test balance or invalid mock OTP). You can retry with another method.');
        return;
      }

      setProcessingStage('Authorization Approved! Issuing Insurance Binder...');
      
      setTimeout(() => {
        setIsProcessing(false);
        const receipt: PaymentReceipt = {
          transactionId: `TXN-FREE-${Math.floor(10000000 + Math.random() * 90000000)}`,
          bankReference: `NPCI-REF-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
          amountPaid: payload.amount,
          paymentMethod: methodLabel,
          timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          status: 'SUCCESS',
          payerUpiOrCard: detail,
        };

        setCompletedReceipt(receipt);

        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.55 },
          });
        } catch {
          // fallback
        }

        payload.onPaymentSuccess(receipt);
      }, 700);
    }, 1400);
  };

  const handleCopyTxn = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedTxn(true);
    setTimeout(() => setCopiedTxn(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        
        {/* Top Sandbox Notice Header */}
        <div className="bg-gradient-to-r from-navy-900 via-slate-900 to-teal-950 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-display font-bold text-sm sm:text-base tracking-tight">Coverflow Pay</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold uppercase tracking-wider">
                  Free Sandbox Gateway
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                100% Free • No real cards or bank balances charged • Zero gateway surcharge
              </p>
            </div>
          </div>

          <button
            onClick={handleModalClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* COMPLETED SUCCESS RECEIPT VIEW */}
        {completedReceipt ? (
          <div className="p-6 sm:p-8 text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Payment Authorized & Settled</span>
              <h3 className="text-2xl font-black text-navy-900 font-display">₹{completedReceipt.amountPaid.toLocaleString('en-IN')} Paid Successfully</h3>
              <p className="text-xs text-slate-500">Premium allocated to your digital policy under IRDAI guidelines.</p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Policy Plan</span>
                <strong className="text-navy-900 font-bold">{payload.title}</strong>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Payment Channel</span>
                <span className="font-semibold text-slate-800">{completedReceipt.paymentMethod} ({completedReceipt.payerUpiOrCard})</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Transaction ID</span>
                <div className="flex items-center space-x-1">
                  <span className="font-mono text-[11px] text-teal-700 font-bold">{completedReceipt.transactionId}</span>
                  <button 
                    onClick={() => handleCopyTxn(completedReceipt.transactionId)}
                    className="text-slate-400 hover:text-slate-700 p-0.5"
                  >
                    {copiedTxn ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Settlement Status</span>
                <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold">
                  <Check className="w-3.5 h-3.5" />
                  <span>Instant Cashless Authorized</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={handleModalClose}
                className="px-6 py-3 rounded-xl bg-navy-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
              >
                Done & View Active Coverage
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 sm:p-6 space-y-6">
            
            {/* Amount & Policy Header Banner */}
            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">Payment Breakdown</span>
                <h4 className="text-base font-bold text-navy-900">{payload.title}</h4>
                <p className="text-xs text-slate-500">{payload.subtitle || 'IRDAI Approved Annual Premium'}</p>
              </div>

              <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-teal-200/50">
                <div className="text-2xl font-black text-teal-800 font-display">
                  ₹{payload.amount.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-slate-500">
                  Base: ₹{baseAmount.toLocaleString('en-IN')} + 18% GST (₹{gstAmount}) • <strong className="text-emerald-600">Zero Fee</strong>
                </div>
              </div>
            </div>

            {/* Error Message if Simulation Declined */}
            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Main Tabs Navigation */}
            <div className="grid grid-cols-4 gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('upi')}
                className={`py-2 px-1 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-1.5 ${
                  activeTab === 'upi' ? 'bg-white text-navy-900 shadow-xs' : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>UPI FastPay</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('card')}
                className={`py-2 px-1 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-1.5 ${
                  activeTab === 'card' ? 'bg-white text-navy-900 shadow-xs' : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('netbanking')}
                className={`py-2 px-1 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-1.5 ${
                  activeTab === 'netbanking' ? 'bg-white text-navy-900 shadow-xs' : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>NetBanking</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('paylater')}
                className={`py-2 px-1 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-1.5 ${
                  activeTab === 'paylater' ? 'bg-white text-navy-900 shadow-xs' : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>0% EMI</span>
              </button>
            </div>

            {/* TAB CONTENT */}
            <div className="min-h-[220px]">
              
              {/* TAB 1: UPI */}
              {activeTab === 'upi' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Left: UPI Apps 1-Click Sandbox */}
                    <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Instant 1-Click UPI Apps
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'gpay', name: 'Google Pay', icon: '🟢', vpa: 'rohan@okhdfc' },
                          { id: 'phonepe', name: 'PhonePe', icon: '🟣', vpa: 'rohan@ybl' },
                          { id: 'paytm', name: 'Paytm UPI', icon: '🔵', vpa: 'rohan@paytm' },
                          { id: 'cred', name: 'CRED UPI', icon: '⚫', vpa: 'rohan@axisbank' },
                        ].map((app) => (
                          <button
                            key={app.id}
                            type="button"
                            onClick={() => {
                              setSelectedUpiApp(app.id as any);
                              setUpiId(app.vpa);
                            }}
                            className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center space-x-2 ${
                              selectedUpiApp === app.id
                                ? 'bg-white border-teal-500 ring-2 ring-teal-500/20 shadow-xs font-bold text-navy-900'
                                : 'bg-white/80 border-slate-200 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <span className="text-base">{app.icon}</span>
                            <div className="truncate">
                              <div className="truncate font-semibold leading-tight">{app.name}</div>
                              <div className="text-[9px] text-slate-400 font-normal">{app.vpa}</div>
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Custom UPI ID */}
                      <div className="pt-2">
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Or Enter Custom UPI ID / VPA
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="username@bank"
                            className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-navy-900 font-medium focus:outline-none focus:border-teal-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right: Dynamic QR Simulator */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-navy-950 text-white flex flex-col items-center justify-center text-center space-y-3">
                      <div className="p-2.5 rounded-2xl bg-white text-navy-950 shadow-md relative group">
                        <QrCode className="w-24 h-24" />
                        {qrCodeScanned && (
                          <div className="absolute inset-0 bg-emerald-600/90 rounded-2xl flex flex-col items-center justify-center text-white text-xs font-bold animate-in fade-in">
                            <CheckCircle2 className="w-8 h-8 mb-1" />
                            <span>App Scanned</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-teal-300">Scan & Pay ₹{payload.amount.toLocaleString('en-IN')}</div>
                        <p className="text-[10px] text-slate-400">Accepts GPay, PhonePe, Paytm, BHIM</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setQrCodeScanned(true);
                          setTimeout(() => {
                            handleExecutePayment('UPI QR Scan', upiId);
                          }, 600);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition-colors"
                      >
                        ⚡ Simulate App Scan & Pay
                      </button>
                    </div>

                  </div>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleExecutePayment(`UPI (${selectedUpiApp.toUpperCase()})`, upiId)}
                    className="w-full py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-teal-600/20 transition-all flex items-center justify-center space-x-2 active:scale-[0.99] disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>{processingStage || 'Processing Payment...'}</span>
                      </>
                    ) : (
                      <>
                        <span>Pay ₹{payload.amount.toLocaleString('en-IN')} via {selectedUpiApp.toUpperCase()}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* TAB 2: CARDS */}
              {activeTab === 'card' && (
                <div className="space-y-4">
                  {/* Preset Free Sandbox Cards Buttons */}
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                      Auto-Fill Test Cards:
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuickCardFill('rupay')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold hover:bg-emerald-100"
                    >
                      RuPay (Zero Fee)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickCardFill('visa')}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold hover:bg-blue-100"
                    >
                      Visa Signature
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickCardFill('mastercard')}
                      className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold hover:bg-amber-100"
                    >
                      Mastercard
                    </button>
                  </div>

                  {/* Mock Card Preview */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-navy-900 to-teal-950 text-white shadow-md relative overflow-hidden space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold tracking-wider text-teal-400">SANDBOX TEST CARD</span>
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    </div>

                    <div className="text-base sm:text-lg font-mono font-black tracking-widest text-slate-100">
                      {cardNumber}
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono">
                      <div>
                        <div className="text-[9px] text-slate-400 uppercase">Card Holder</div>
                        <div className="font-bold text-slate-200">{cardHolder}</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-slate-400 uppercase">Valid Thru</div>
                        <div className="font-bold text-slate-200">{cardExpiry}</div>
                      </div>
                    </div>
                  </div>

                  {/* Card Form Inputs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-navy-900 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Expiry</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-navy-900 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">CVV</label>
                      <input
                        type="password"
                        value={cardCvv}
                        maxLength={3}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-navy-900 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-slate-600">
                    <input
                      type="checkbox"
                      id="save-card-chk"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                    />
                    <label htmlFor="save-card-chk" className="cursor-pointer">
                      Secure this card as per RBI & IRDAI Tokenization Guidelines
                    </label>
                  </div>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleExecutePayment('Debit/Credit Card', `Card ending in ${cardNumber.slice(-4)}`)}
                    className="w-full py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-teal-600/20 transition-all flex items-center justify-center space-x-2 active:scale-[0.99] disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>{processingStage || 'Processing Payment...'}</span>
                      </>
                    ) : (
                      <>
                        <span>Authorize ₹{payload.amount.toLocaleString('en-IN')} (Free Sandbox)</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* TAB 3: NETBANKING */}
              {activeTab === 'netbanking' && (
                <div className="space-y-4">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Popular Indian Banking Partners (Sandbox Ready)
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      { name: 'HDFC Bank', code: 'HDFC' },
                      { name: 'ICICI Bank', code: 'ICICI' },
                      { name: 'State Bank of India', code: 'SBI' },
                      { name: 'Axis Bank', code: 'AXIS' },
                      { name: 'Kotak Mahindra', code: 'KOTAK' },
                      { name: 'Punjab National Bank', code: 'PNB' },
                    ].map((b) => (
                      <button
                        key={b.code}
                        type="button"
                        onClick={() => setSelectedBank(b.name)}
                        className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                          selectedBank === b.name
                            ? 'bg-teal-50 border-teal-500 text-teal-900 font-bold shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                        }`}
                      >
                        <div className="font-bold">{b.name}</div>
                        <div className="text-[10px] text-slate-400">Direct Gateway</div>
                      </button>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                    <span>Selected Bank: <strong>{selectedBank}</strong></span>
                    <span className="text-[10px] text-emerald-600 font-bold">● High Success Switch (99.8%)</span>
                  </div>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleExecutePayment(`NetBanking (${selectedBank})`, 'Instant Gateway Direct')}
                    className="w-full py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-teal-600/20 transition-all flex items-center justify-center space-x-2 active:scale-[0.99] disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>{processingStage || 'Processing Payment...'}</span>
                      </>
                    ) : (
                      <>
                        <span>Log in to {selectedBank} & Pay ₹{payload.amount.toLocaleString('en-IN')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* TAB 4: 0% EMI & PAYLATER */}
              {activeTab === 'paylater' && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs flex items-center space-x-2.5">
                    <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span><strong>0% Interest IRDAI Premium Financing:</strong> Split your annual premium with zero interest or upfront fees.</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { tenure: '3', monthly: Math.round(payload.amount / 3) },
                      { tenure: '6', monthly: Math.round(payload.amount / 6) },
                      { tenure: '12', monthly: Math.round(payload.amount / 12) },
                    ].map((plan) => (
                      <button
                        key={plan.tenure}
                        type="button"
                        onClick={() => setSelectedEmiTenure(plan.tenure as any)}
                        className={`p-3 rounded-2xl border text-center transition-all ${
                          selectedEmiTenure === plan.tenure
                            ? 'bg-teal-50 border-teal-500 text-teal-950 font-bold ring-2 ring-teal-500/20 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                        }`}
                      >
                        <div className="text-xs font-bold">{plan.tenure} Months</div>
                        <div className="text-sm font-black text-navy-900 mt-1">₹{plan.monthly}/mo</div>
                        <div className="text-[10px] text-emerald-600 font-semibold">0% Interest</div>
                      </button>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Financing Partner:</span>
                      <strong className="text-navy-900">Simpl / ZestMoney CoverFlow Pay</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing Fee:</span>
                      <strong className="text-emerald-600">₹0 (Zero Fee)</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleExecutePayment(`0% No-Cost EMI (${selectedEmiTenure} Mos)`, 'Pre-approved Sandbox Credit')}
                    className="w-full py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-teal-600/20 transition-all flex items-center justify-center space-x-2 active:scale-[0.99] disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>{processingStage || 'Processing Payment...'}</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm {selectedEmiTenure}-Month No-Cost EMI Plan</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}

            </div>

            {/* Bottom Sandbox Simulation Toggles */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>IRDAI Web Aggregator Tokenized Switch • 256-Bit SSL</span>
              </div>

              {/* Testing Failure Toggle */}
              <div className="flex items-center space-x-2 bg-slate-100 px-2.5 py-1 rounded-lg">
                <input
                  type="checkbox"
                  id="fail-sim-chk"
                  checked={simulateDecline}
                  onChange={(e) => setSimulateDecline(e.target.checked)}
                  className="rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                />
                <label htmlFor="fail-sim-chk" className="cursor-pointer text-slate-700 font-medium">
                  Test Decline Handling
                </label>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
