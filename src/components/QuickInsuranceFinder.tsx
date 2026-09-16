import React from 'react';
import { 
  Car, 
  Home, 
  Heart, 
  Users, 
  Plane, 
  Briefcase, 
  Smartphone, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ProductType } from '../types/insurance';

interface QuickInsuranceFinderProps {
  onSelectCategory: (category: ProductType) => void;
}

export const QuickInsuranceFinder: React.FC<QuickInsuranceFinderProps> = ({ onSelectCategory }) => {
  const protectionCategories = [
    {
      id: 'auto' as ProductType,
      title: 'Car & EV',
      icon: '🚗',
      price: 'From ₹389/mo',
      desc: 'Zero-depreciation, 24/7 roadside assistance & instant video surveyor claim approval.',
      badge: 'Bumper-to-Bumper',
    },
    {
      id: 'health' as ProductType,
      title: 'Health & Medical',
      icon: '❤️',
      price: 'From ₹499/mo',
      desc: '₹10L to ₹1Cr cashless hospital cover with zero room rent cap & AYUSH support.',
      badge: '12,000+ Hospitals',
    },
    {
      id: 'life' as ProductType,
      title: 'Term Life',
      icon: '🛡️',
      price: 'From ₹490/mo',
      desc: 'Financial shield for your family up to ₹2 Crore with 36 critical illness payouts.',
      badge: 'Tax Benefit 80C',
    },
    {
      id: 'home' as ProductType,
      title: 'Home & Structure',
      icon: '🏠',
      price: 'From ₹199/mo',
      desc: 'Protection for home structure, precious contents, electronics, fire & short-circuits.',
      badge: 'Tenant & Owner',
    },
    {
      id: 'travel' as ProductType,
      title: 'Travel & Trips',
      icon: '✈️',
      price: 'From ₹149/trip',
      desc: 'Schengen-approved international medical cover, passport loss, & flight delay refund.',
      badge: 'Worldwide Cover',
    },
    {
      id: 'business' as ProductType,
      title: 'Business & Cyber',
      icon: '💼',
      price: 'From ₹999/mo',
      desc: 'Ransomware forensic costs, commercial property, and D&O liability for founders.',
      badge: 'Startup & SMB',
    },
    {
      id: 'device' as ProductType,
      title: 'Gadget & Screen',
      icon: '📱',
      price: 'From ₹99/mo',
      desc: 'Screen damage, liquid spills, and hardware surges with OEM genuine parts.',
      badge: 'Doorstep Pickup',
    },
    {
      id: 'health' as ProductType,
      title: 'Family Floater',
      icon: '👨‍👩‍👧',
      price: 'From ₹899/mo',
      desc: 'Single unified policy protecting self, spouse, children, and parents with OPD care.',
      badge: 'Multi-Member Cover',
    },
  ];

  return (
    <section className="py-16 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-brand-600 font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Smart Insurance Discovery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
              What do you want to protect?
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Select an asset category to explore tailored coverage matrices in seconds.
            </p>
          </div>
          <div className="text-xs text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs self-start md:self-auto">
            🛡️ 100% Cashless Direct Settlements
          </div>
        </div>

        {/* 8 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {protectionCategories.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onSelectCategory(item.id)}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-subtle hover:shadow-elevated hover:border-teal-400 hover:-translate-y-1 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Header with Emoji & Badge */}
                <div className="flex items-start justify-between mb-3.5">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 group-hover:bg-teal-100/80 flex items-center justify-center text-2xl transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                    {item.badge}
                  </span>
                </div>

                {/* Title & Price */}
                <div className="mb-2">
                  <h3 className="text-base font-bold text-navy-900 font-display group-hover:text-brand-600 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-slate-500">
                    {item.price}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-600 group-hover:text-brand-700">
                <span>Explore Plans</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
