import React, { useState, useEffect } from 'react';
import { 
  X, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  User, 
  Users, 
  Briefcase, 
  Settings, 
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import { UserProfile } from '../types/insurance';
import { DEMO_USERS } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'login',
}) => {
  const [activeTab, setActiveTab] = useState<'mobile' | 'email' | 'personas'>('mobile');
  const [isRegisterMode, setIsRegisterMode] = useState<boolean>(initialMode === 'register');
  
  // Mobile Login State
  const [mobileNumber, setMobileNumber] = useState<string>('9876543210');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>('');
  const [otpTimer, setOtpTimer] = useState<number>(30);
  const [loading, setLoading] = useState<boolean>(false);

  // Email Login State
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('rohan.sharma@example.com');
  const [password, setPassword] = useState<string>('CoverFlow2026!');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    let timer: any;
    if (otpSent && otpTimer > 0) {
      timer = setInterval(() => setOtpTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [otpSent, otpTimer]);

  if (!isOpen) return null;

  const handleSendMobileOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setOtpTimer(30);
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Login as Rohan Sharma by default or build custom profile
      const user = DEMO_USERS.rohan;
      onLoginSuccess(user);
      onClose();
    }, 800);
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (isRegisterMode) {
        // New user starts with KYC pending
        const newUser: UserProfile = {
          id: `CF-USR-${Math.floor(10000 + Math.random() * 90000)}`,
          name: fullName || 'New Customer',
          email: email,
          mobile: '+91 98000 00000',
          role: 'customer',
          avatarInitials: (fullName || 'NC').slice(0, 2).toUpperCase(),
          kycStatus: 'pending',
          kycData: {
            panNumber: '',
            panName: '',
            aadhaarNumber: '',
            aadhaarVerified: false,
            documentType: 'aadhaar',
            documentNumber: '',
            livenessVerified: false,
          },
          unreadNotifications: [
            { id: 'notif-welcome', title: 'Welcome to CoverFlow', desc: 'Complete your 2-minute digital KYC to unlock cashless hospital admissions.', time: 'Just now', read: false, type: 'kyc' }
          ],
        };
        onLoginSuccess(newUser);
      } else {
        onLoginSuccess(DEMO_USERS.rohan);
      }
      onClose();
    }, 800);
  };

  const handleSelectPersona = (key: keyof typeof DEMO_USERS) => {
    const persona = DEMO_USERS[key];
    onLoginSuccess(persona);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-navy-900 via-slate-900 to-teal-950 text-white px-6 py-5 flex items-center justify-between border-b border-teal-500/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display tracking-tight text-white">
                {isRegisterMode ? 'Create CoverFlow Account' : 'Sign In to CoverFlow'}
              </h3>
              <p className="text-xs text-slate-300">
                Secure access to policies, cashless claims, & insurance portfolio.
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

        {/* Tab Switcher */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex items-center justify-between">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('mobile')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'mobile' ? 'bg-white text-navy-900 shadow-2xs' : 'text-slate-500 hover:text-navy-900'
              }`}
            >
              Mobile OTP
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'email' ? 'bg-white text-navy-900 shadow-2xs' : 'text-slate-500 hover:text-navy-900'
              }`}
            >
              Email & Password
            </button>
          </div>

          <button
            onClick={() => setActiveTab('personas')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
              activeTab === 'personas' ? 'bg-teal-600 text-white shadow-xs' : 'text-teal-700 bg-teal-50 hover:bg-teal-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1-Click Personas</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">

          {/* TAB 1: MOBILE OTP LOGIN */}
          {activeTab === 'mobile' && (
            <div className="space-y-5">
              {!otpSent ? (
                <form onSubmit={handleSendMobileOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                      Mobile Number
                    </label>
                    <div className="flex rounded-xl border border-slate-200 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 overflow-hidden">
                      <span className="bg-slate-100 px-3.5 py-3 text-xs font-bold text-slate-700 flex items-center space-x-1 border-r border-slate-200">
                        <span>🇮🇳</span>
                        <span>+91</span>
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="9876543210"
                        className="flex-1 text-sm font-semibold px-4 py-3 text-navy-900 focus:outline-none"
                      />
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      We'll send a 4-digit verification code to this phone.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={mobileNumber.length !== 10 || loading}
                    className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md shadow-teal-600/20 transition-all"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending SMS Code...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Verification OTP</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-between text-xs text-teal-900">
                    <div>
                      <span>OTP sent to <strong>+91 {mobileNumber}</strong></span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-teal-700 font-bold hover:underline"
                    >
                      Change
                    </button>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <label className="font-bold text-navy-900 uppercase tracking-wider">
                        Enter 4-Digit OTP
                      </label>
                      <span className="text-slate-400 font-mono text-[11px]">
                        {otpTimer > 0 ? `Resend in ${otpTimer}s` : 'Didn\'t receive?'}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        maxLength={4}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="4829"
                        className="flex-1 text-center tracking-[0.6em] font-mono text-xl font-bold bg-white border border-slate-300 rounded-xl py-3 text-navy-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      <button
                        type="button"
                        onClick={() => setOtpCode('4829')}
                        className="px-3 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold whitespace-nowrap"
                      >
                        Auto-fill (4829)
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md shadow-emerald-600/20 transition-all"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying & Signing In...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Verify & Sign In</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: EMAIL & PASSWORD */}
          {activeTab === 'email' && (
            <form onSubmit={handleEmailAuth} className="space-y-4">
              {isRegisterMode && (
                <div>
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Rohan Sharma"
                    className="w-full text-xs font-semibold bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-navy-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rohan.sharma@example.com"
                  className="w-full text-xs font-semibold bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-navy-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full text-xs font-semibold bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-navy-900 focus:outline-none focus:ring-2 focus:ring-teal-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center space-x-2 text-slate-600">
                  <input type="checkbox" defaultChecked className="rounded text-teal-600 focus:ring-teal-500" />
                  <span>Remember session</span>
                </label>
                <button type="button" className="text-teal-700 font-semibold hover:underline">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md shadow-teal-600/20 transition-all"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>{isRegisterMode ? 'Create Account' : 'Sign In with Email'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(!isRegisterMode)}
                  className="text-xs text-slate-600 hover:text-teal-700 font-semibold"
                >
                  {isRegisterMode ? 'Already have an account? Sign In' : 'New to CoverFlow? Create an Account'}
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: 1-CLICK DEMO PERSONAS */}
          {activeTab === 'personas' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 mb-2">
                Click any profile to instantly sign in with simulated credentials and view their respective role and KYC status:
              </p>

              {[
                { 
                  key: 'rohan' as const, 
                  role: 'customer' as const, 
                  name: 'Rohan Sharma', 
                  tag: 'Retail Customer (KYC Verified)', 
                  desc: '3 Active Policies • Fortis Hospital Claim in review',
                  icon: User,
                  color: 'emerald'
                },
                { 
                  key: 'aakash' as const, 
                  role: 'customer' as const, 
                  name: 'Aakash Verma', 
                  tag: 'New Customer (KYC Pending)', 
                  desc: 'Unverified • Explore the complete interactive KYC flow',
                  icon: User,
                  color: 'amber'
                },
                { 
                  key: 'priya' as const, 
                  role: 'advisor' as const, 
                  name: 'Priya Nair', 
                  tag: 'Certified POSP Advisor', 
                  desc: 'Partner Dashboard • Client quotes & commissions',
                  icon: Users,
                  color: 'blue'
                },
                { 
                  key: 'vikram' as const, 
                  role: 'business' as const, 
                  name: 'Vikram Mehta', 
                  tag: 'TechLogix Corporate B2B', 
                  desc: '45 Vehicle Commercial Fleet • Group Health Policy',
                  icon: Briefcase,
                  color: 'purple'
                },
                { 
                  key: 'admin' as const, 
                  role: 'admin' as const, 
                  name: 'Underwriting Lead', 
                  tag: 'Platform Executive Console', 
                  desc: 'Risk metrics • Real-time fraud detection & loss ratios',
                  icon: Settings,
                  color: 'teal'
                },
              ].map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => handleSelectPersona(p.key)}
                    className="w-full p-3 rounded-2xl border border-slate-200 hover:border-teal-500/60 bg-slate-50/50 hover:bg-teal-50/30 text-left transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                        p.color === 'emerald' ? 'bg-emerald-100 text-emerald-800' :
                        p.color === 'amber' ? 'bg-amber-100 text-amber-800' :
                        p.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                        p.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                        'bg-teal-100 text-teal-800'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-navy-900 group-hover:text-teal-800">
                            {p.name}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-500">
                            ({p.tag})
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">{p.desc}</p>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors" />
                  </button>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
