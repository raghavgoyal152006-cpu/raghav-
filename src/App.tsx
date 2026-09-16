import React, { useState } from 'react';
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
import { UserRole, ProductType, PlanTier, Policy } from './types/insurance';
import { MOCK_USER_POLICIES } from './data/mockData';

export function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('customer');
  const [activeSection, setActiveSection] = useState<string>('hero');
  
  // Modals & Drawers
  const [isPolicyFinderOpen, setIsPolicyFinderOpen] = useState<boolean>(false);
  const [policyFinderCategory, setPolicyFinderCategory] = useState<ProductType>('health');
  const [selectedCertificate, setSelectedCertificate] = useState<Policy | null>(null);
  const [showMyAccountView, setShowMyAccountView] = useState<boolean>(false);
  
  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
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
    triggerToast(`Selected ${plan.name} (${plan.coverageAmount}). Complete digital verification.`);
  };

  const handleApplyRecommendation = (category: ProductType, sumInsured: string) => {
    setPolicyFinderCategory(category);
    setIsPolicyFinderOpen(true);
    triggerToast(`Applied recommended ${sumInsured} cover package.`);
  };

  const handlePolicyIssued = (newPolicy: Policy) => {
    triggerToast(`Policy ${newPolicy.policyNumber} issued successfully! Certificate ready.`);
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

      {/* Sticky Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={(role) => {
          setCurrentRole(role);
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
        }}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenPolicyFinder={() => handleStartQuote('health')}
        onOpenMyAccount={() => setShowMyAccountView(!showMyAccountView)}
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
                <span className="text-xs text-slate-500 font-semibold">Customer Account ID: CF-USR-99824</span>
              </div>
            </div>
            <MyAccountDashboard onViewCertificate={(pol) => setSelectedCertificate(pol)} />
          </div>
        ) : (
          /* Standard Customer & Business Homepage Experience (Matching Reference) */
          <>
            {/* 1. Hero Section + Floating Live Plan Comparison Dashboard (Matching Reference Image) */}
            <Hero
              onStartQuote={handleStartQuote}
              onSelectPlan={handleSelectPlan}
            />

            {/* 2. How It Works 3-Step Process (Matching Reference Layout) */}
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
            <EmbeddedInsurance />

            {/* 8. Trust, Security & Compliance */}
            <TrustAndCompliance />

            {/* 9. Insurance Partners Carousel */}
            <PartnersSection />
          </>
        )}

      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive 5-Step Policy Finder Wizard Modal */}
      <PolicyFinderWizard
        isOpen={isPolicyFinderOpen}
        onClose={() => setIsPolicyFinderOpen(false)}
        initialCategory={policyFinderCategory}
        onPolicyIssued={handlePolicyIssued}
        onViewCertificate={(pol) => setSelectedCertificate(pol)}
      />

      {/* Official Policy Certificate Modal */}
      <PolicyCertificateModal
        policy={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />

    </div>
  );
}

export default App;
