import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { QuickInsuranceFinder } from './components/QuickInsuranceFinder';
import { ProductGrid } from './components/ProductGrid';
import { SmartRecommendationEngine } from './components/SmartRecommendationEngine';
import { ClaimsCenter } from './components/ClaimsCenter';
import { MyAccountDashboard } from './components/MyAccountDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { EmbeddedInsurance } from './components/EmbeddedInsurance';
import { TrustAndCompliance } from './components/TrustAndCompliance';
import { PartnersSection } from './components/PartnersSection';
import { Footer } from './components/Footer';
import { PolicyFinderWizard } from './components/PolicyFinderWizard';
import { PolicyCertificateModal } from './components/PolicyCertificateModal';
import { AuthModal } from './components/AuthModal';
import { KycModal } from './components/KycModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { ResourcesModal } from './components/ResourcesModal';
import { FreePaymentGatewayModal, PaymentPayload, PaymentReceipt } from './components/FreePaymentGatewayModal';
import { UserRole, ProductType, PlanTier, Policy, UserProfile, KycData } from './types/insurance';
import { DEMO_USERS } from './data/mockData';

export function App() {
  // Authentication & Current User State (persists to localStorage)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('coverflow_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEMO_USERS.rohan;
  });

  const [currentRole, setCurrentRole] = useState<UserRole>(currentUser?.role || 'customer');
  const [activeSection, setActiveSection] = useState<string>('hero');
  
  // Modals & Drawers
  const [isPolicyFinderOpen, setIsPolicyFinderOpen] = useState<boolean>(false);
  const [policyFinderCategory, setPolicyFinderCategory] = useState<ProductType>('health');
  const [selectedCertificate, setSelectedCertificate] = useState<Policy | null>(null);
  const [showMyAccountView, setShowMyAccountView] = useState<boolean>(false);
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isKycModalOpen, setIsKycModalOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isResourcesModalOpen, setIsResourcesModalOpen] = useState<boolean>(false);

  // Free Payment Gateway State
  const [paymentPayload, setPaymentPayload] = useState<PaymentPayload | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (currentUser) {
      const updatedUser = { ...currentUser, role };
      setCurrentUser(updatedUser);
      localStorage.setItem('coverflow_user', JSON.stringify(updatedUser));
    }
    if (role === 'admin') {
      setShowMyAccountView(false);
      triggerToast('Switched to Platform Admin & Underwriting Console');
    } else if (role === 'customer') {
      triggerToast('Switched to Retail Customer Experience');
    } else if (role === 'advisor') {
      triggerToast('Switched to Advisor & POSP Partner Portal');
    } else if (role === 'business') {
      triggerToast('Switched to Commercial & Corporate Experience');
    }
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setCurrentRole(user.role);
    localStorage.setItem('coverflow_user', JSON.stringify(user));
    triggerToast(`Welcome, ${user.name}! (${user.kycStatus === 'verified' ? '✓ KYC Verified' : 'KYC Pending'})`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('coverflow_user');
    setShowMyAccountView(false);
    triggerToast('You have been signed out.');
  };

  const handleKycComplete = (kycData: KycData) => {
    if (currentUser) {
      const updatedUser: UserProfile = {
        ...currentUser,
        kycStatus: 'verified',
        kycData: kycData,
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('coverflow_user', JSON.stringify(updatedUser));
    }
    triggerToast(`Digital KYC Verified! IRDAI CKYC ID: ${kycData.ckycNumber}`);
  };

  const handleNavigate = (sectionId: string) => {
    setShowMyAccountView(false);
    setActiveSection(sectionId);
    
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartQuote = (category: ProductType = 'health') => {
    setPolicyFinderCategory(category);
    setIsPolicyFinderOpen(true);
  };

  const handleSelectPlan = (plan: PlanTier, category: ProductType) => {
    setPolicyFinderCategory(category);
    setIsPolicyFinderOpen(true);
    triggerToast(`Selected ${plan.name} (${plan.coverageAmount}). Complete verification.`);
  };

  const handleApplyRecommendation = (category: ProductType, sumInsured: string) => {
    setPolicyFinderCategory(category);
    setIsPolicyFinderOpen(true);
    triggerToast(`Applied recommended ${sumInsured} cover package.`);
  };

  const handlePolicyIssued = (newPolicy: Policy) => {
    triggerToast(`Policy ${newPolicy.policyNumber} issued successfully! Certificate ready.`);
  };

  const handleTriggerPayment = (
    payload: Omit<PaymentPayload, 'onPaymentSuccess'>,
    onSuccessCallback?: (receipt: PaymentReceipt) => void
  ) => {
    setPaymentPayload({
      ...payload,
      onPaymentSuccess: (receipt) => {
        triggerToast(`Payment authorized! Transaction ID: ${receipt.transactionId}`);
        if (onSuccessCallback) onSuccessCallback(receipt);
      },
    });
    setIsPaymentModalOpen(true);
  };

  const handleOpenPaymentDemo = () => {
    handleTriggerPayment({
      title: 'Term Life Cover ₹1 Crore (Annual Plan)',
      subtitle: 'HDFC Life Click 2 Protect 3D Plus • Zero Gateway Surcharge',
      amount: 5880,
      policyNumber: 'CF-LIFE-2026-DEMO',
      category: 'life',
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col selection:bg-teal-500 selection:text-white font-sans">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-navy-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-floating border border-teal-500/40 flex items-center space-x-2 animate-in slide-in-from-top-4 fade-in">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sticky Header with Dynamic Auth & KYC */}
      <Header
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenPolicyFinder={() => handleStartQuote('health')}
        onOpenMyAccount={() => {
          if (!currentUser) {
            setIsAuthModalOpen(true);
          } else {
            setShowMyAccountView(!showMyAccountView);
          }
        }}
        currentUser={currentUser}
        onOpenLogin={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenKyc={() => setIsKycModalOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenResources={() => setIsResourcesModalOpen(true)}
        onOpenPaymentDemo={handleOpenPaymentDemo}
      />

      {/* Main View Body */}
      <main className="flex-1">
        
        {/* If Admin Role is active, show Admin Console directly */}
        {currentRole === 'admin' ? (
          <AdminDashboard />
        ) : showMyAccountView ? (
          /* Customer Portal View */
          <div>
            <div className="bg-white border-b border-slate-200 px-4 py-3">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <button
                  onClick={() => setShowMyAccountView(false)}
                  className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center space-x-1"
                >
                  <span>← Back to Marketplace</span>
                </button>
                <div className="flex items-center space-x-3 text-xs">
                  <span className="text-slate-500 font-semibold">
                    Customer Account: <strong className="text-navy-900 font-mono">{currentUser?.id || 'CF-USR-99824'}</strong>
                  </span>
                  <button
                    onClick={() => setIsKycModalOpen(true)}
                    className="text-teal-700 font-bold hover:underline"
                  >
                    Digital KYC Details
                  </button>
                </div>
              </div>
            </div>
            <MyAccountDashboard 
              onViewCertificate={(pol) => setSelectedCertificate(pol)}
              currentUser={currentUser}
              onOpenKyc={() => setIsKycModalOpen(true)}
              onTriggerPayment={(pol, onDone) => {
                handleTriggerPayment({
                  title: `${pol.title} (Annual Renewal)`,
                  subtitle: `Policy: ${pol.policyNumber} • 5% NCB Discount Applied`,
                  amount: 6800,
                  policyNumber: pol.policyNumber,
                  category: pol.type,
                }, () => onDone());
              }}
            />
          </div>
        ) : (
          /* Standard Customer & Business Homepage Experience */
          <>
            {/* 1. Hero Section + Floating Live Plan Comparison Dashboard */}
            <Hero
              onStartQuote={handleStartQuote}
              onSelectPlan={handleSelectPlan}
            />

            {/* 2. How It Works 3-Step Process */}
            <HowItWorks onStartClick={() => handleStartQuote('health')} />

            {/* 3. Quick Insurance Finder ("What do you want to protect?") */}
            <QuickInsuranceFinder onSelectCategory={(cat) => handleStartQuote(cat)} />

            {/* 4. Comprehensive Product Grid */}
            <ProductGrid
              onSelectPlan={handleSelectPlan}
              onOpenFinder={(cat) => handleStartQuote(cat)}
            />

            {/* 5. Smart Insurance Recommendation Engine */}
            <SmartRecommendationEngine
              onApplyRecommendation={handleApplyRecommendation}
            />

            {/* 6. Real-Time Claims Center */}
            <ClaimsCenter />

            {/* 7. Embedded Insurance Sandbox */}
            <EmbeddedInsurance 
              onTriggerPayment={({ title, subtitle, amount, onPaymentSuccess }) => {
                handleTriggerPayment({
                  title,
                  subtitle,
                  amount,
                }, () => onPaymentSuccess());
              }}
            />

            {/* 8. Trust, Security & Compliance */}
            <TrustAndCompliance />

            {/* 9. Insurance Partners Carousel */}
            <PartnersSection />
          </>
        )}

      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive 5-Step Policy Finder Wizard Modal (with Integrated Step 6 KYC) */}
      <PolicyFinderWizard
        isOpen={isPolicyFinderOpen}
        onClose={() => setIsPolicyFinderOpen(false)}
        initialCategory={policyFinderCategory}
        onPolicyIssued={handlePolicyIssued}
        onViewCertificate={(pol) => setSelectedCertificate(pol)}
        currentUser={currentUser}
        onKycVerified={handleKycComplete}
      />

      {/* Official Policy Certificate Modal */}
      <PolicyCertificateModal
        policy={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />

      {/* Authentication Modal (Mobile OTP, Email/Password, 1-Click Personas) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Comprehensive Digital KYC Modal (PAN, Aadhaar e-KYC, AI OCR, Live Selfie) */}
      <KycModal
        isOpen={isKycModalOpen}
        onClose={() => setIsKycModalOpen(false)}
        currentKycData={currentUser?.kycData}
        userName={currentUser?.name}
        onKycComplete={handleKycComplete}
      />

      {/* Global Search & Command Palette Modal */}
      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectProduct={handleStartQuote}
        onNavigate={handleNavigate}
        onOpenKyc={() => setIsKycModalOpen(true)}
      />

      {/* Resources & Tax Savings Modal */}
      <ResourcesModal
        isOpen={isResourcesModalOpen}
        onClose={() => setIsResourcesModalOpen(false)}
        onOpenKyc={() => setIsKycModalOpen(true)}
      />

      {/* Free IRDAI Compliant Payment Gateway Modal (UPI FastPay, Test Cards, NetBanking, 0% EMI) */}
      <FreePaymentGatewayModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        payload={paymentPayload}
      />

    </div>
  );
}

export default App;
