import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  ShieldCheck, 
  Heart, 
  Car, 
  Users, 
  Home, 
  Plane, 
  Smartphone, 
  Briefcase, 
  FileText, 
  Building, 
  HelpCircle, 
  ArrowRight,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { ProductType } from '../types/insurance';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (cat: ProductType) => void;
  onNavigate: (sectionId: string) => void;
  onOpenKyc: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onNavigate,
  onOpenKyc,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = [
    // Products
    { id: 'p-health', title: 'Health Insurance (CareNova & Zenith)', type: 'product', category: 'health' as ProductType, icon: Heart, desc: '₹5L to ₹25L sum insured with 12,000+ cashless hospitals' },
    { id: 'p-auto', title: 'Car & EV Zero-Depreciation Insurance', type: 'product', category: 'auto' as ProductType, icon: Car, desc: '1-day cashless claim with bumper-to-bumper EV battery cover' },
    { id: 'p-life', title: 'Term Life Insurance (₹1 Crore Cover)', type: 'product', category: 'life' as ProductType, icon: Users, desc: '99.5% claim settlement ratio with critical illness rider' },
    { id: 'p-home', title: 'Home & Structure Shield', type: 'product', category: 'home' as ProductType, icon: Home, desc: 'Covers earthquake, fire, burst pipes & interior contents' },
    { id: 'p-travel', title: 'International Travel Insurance', type: 'product', category: 'travel' as ProductType, icon: Plane, desc: 'Schengen & US compliant with cashless medical cover' },
    { id: 'p-device', title: 'Smart Device & Gadget Shield', type: 'product', category: 'device' as ProductType, icon: Smartphone, desc: 'Instant screen damage and theft protection' },
    { id: 'p-business', title: 'Commercial & Cyber Liability', type: 'product', category: 'business' as ProductType, icon: Briefcase, desc: 'Corporate group health, director liability & cyber threat' },
    // Actions & Tools
    { id: 'a-kyc', title: 'Complete Digital KYC (Aadhaar & PAN)', type: 'action', action: () => { onClose(); onOpenKyc(); }, icon: UserCheck, desc: 'Verify identity for 1-click cashless approval & CKYC ID' },
    { id: 'a-claim', title: 'File or Track a Claim', type: 'action', action: () => { onClose(); onNavigate('claims'); }, icon: FileText, desc: 'Real-time hospital intimation and cashless tracking' },
    { id: 'a-advisor', title: 'AI Insurance Advisor', type: 'action', action: () => { onClose(); onNavigate('recommendation'); }, icon: Sparkles, desc: 'Get tailored sum insured and deductible recommendations' },
    { id: 'a-embedded', title: 'Embedded Insurance SDK Sandbox', type: 'action', action: () => { onClose(); onNavigate('embedded'); }, icon: ShieldCheck, desc: 'Interactive developer sandbox for e-commerce checkouts' },
    // Hospitals
    { id: 'h-fortis', title: 'Fortis Hospital (Cashless Network Partner)', type: 'hospital', icon: Building, desc: 'Cunningham Rd & Bannerghatta Rd • 100% Cashless' },
    { id: 'h-apollo', title: 'Apollo Hospitals (Priority Network)', type: 'hospital', icon: Building, desc: 'Greams Rd, Jayanagar & Pan-India • 30-min cashless' },
    { id: 'h-manipal', title: 'Manipal Hospital (Zero-Waitlist Partner)', type: 'hospital', icon: Building, desc: 'HAL Airport Rd & Whitefield • Direct TPA desk' },
  ];

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-md flex items-start justify-center pt-20 p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-slate-200 bg-slate-50/70">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search plans, claims, network hospitals, KYC, or tax tools..."
            className="w-full text-sm font-semibold bg-transparent text-navy-900 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full hover:bg-slate-200 text-slate-400 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-1 text-[10px] font-mono font-bold text-slate-400 bg-white border border-slate-200 rounded-lg shadow-2xs">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <HelpCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-xs font-semibold">No matching insurance products or actions found.</p>
              <p className="text-[11px] text-slate-400 mt-1">Try searching "health", "claim", "Aadhaar", "KYC", or "hospital".</p>
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (item.type === 'product' && item.category) {
                      onClose();
                      onSelectProduct(item.category);
                    } else if (item.action) {
                      item.action();
                    } else if (item.type === 'hospital') {
                      onClose();
                      onNavigate('claims');
                    }
                  }}
                  className="p-3 rounded-2xl border border-transparent hover:border-teal-500/40 hover:bg-teal-50/40 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3 truncate">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-teal-100 group-hover:text-teal-700 text-slate-600 flex items-center justify-center shrink-0 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-navy-900 group-hover:text-teal-800 flex items-center space-x-2">
                        <span>{item.title}</span>
                        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-extrabold tracking-wider">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">{item.desc}</p>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 transition-colors shrink-0 ml-2" />
                </div>
              );
            })
          )}
        </div>

        {/* Quick Footer Links */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Tip: Press <strong className="text-slate-700">Ctrl + K</strong> anytime to open search</span>
          <span className="text-teal-700 font-bold">12,000+ Cashless Network Hospitals</span>
        </div>

      </div>
    </div>
  );
};
