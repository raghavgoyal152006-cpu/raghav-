import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Heart, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Mission Column (Col 1 & 2 on mobile) */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-400 text-white shadow-md">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-2xl font-extrabold font-display text-white">Cover</span>
                <span className="text-2xl font-extrabold font-display text-teal-400">Flow</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              CoverFlow is a next-generation digital InsurTech platform transforming insurance discovery, comparison, issuance, and claims through transparent intelligence and zero-friction technology.
            </p>

            <div className="flex flex-col space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-teal-400" />
                <span>support@coverflow.insurance</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-teal-400" />
                <span>Toll-Free 24/7: 1800-268-3735</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>Indiranagar Tech Hub, Bangalore, Karnataka 560038</span>
              </div>
            </div>
          </div>

          {/* Col 2: Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Insurance Products
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => onNavigate('products')} className="hover:text-teal-300 transition-colors">Health Insurance</button></li>
              <li><button onClick={() => onNavigate('products')} className="hover:text-teal-300 transition-colors">Car & EV Protection</button></li>
              <li><button onClick={() => onNavigate('products')} className="hover:text-teal-300 transition-colors">Term Life Insurance</button></li>
              <li><button onClick={() => onNavigate('products')} className="hover:text-teal-300 transition-colors">Home & Structure</button></li>
              <li><button onClick={() => onNavigate('products')} className="hover:text-teal-300 transition-colors">International Travel</button></li>
              <li><button onClick={() => onNavigate('products')} className="hover:text-teal-300 transition-colors">Cyber & Business Risk</button></li>
              <li><button onClick={() => onNavigate('products')} className="hover:text-teal-300 transition-colors">Smart Device Shield</button></li>
            </ul>
          </div>

          {/* Col 3: Company & Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Company & Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => onNavigate('trust')} className="hover:text-teal-300 transition-colors">About CoverFlow</button></li>
              <li><button onClick={() => onNavigate('recommendation')} className="hover:text-teal-300 transition-colors">AI Underwriting Engine</button></li>
              <li><button onClick={() => onNavigate('embedded')} className="hover:text-teal-300 transition-colors">Embedded SDK & APIs</button></li>
              <li><button onClick={() => onNavigate('claims')} className="hover:text-teal-300 transition-colors">Claims Concierge</button></li>
              <li><button onClick={() => onNavigate('trust')} className="hover:text-teal-300 transition-colors">Partner Insurers</button></li>
              <li><a href="#" className="hover:text-teal-300 transition-colors">Careers (We're Hiring)</a></li>
            </ul>
          </div>

          {/* Col 4: Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Legal & Compliance
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-teal-300 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-teal-300 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-teal-300 transition-colors">IRDAI Disclosures</a></li>
              <li><a href="#" className="hover:text-teal-300 transition-colors">Grievance Redressal Policy</a></li>
              <li><a href="#" className="hover:text-teal-300 transition-colors">Key Feature Documents (KFD)</a></li>
              <li><a href="#" className="hover:text-teal-300 transition-colors">Security & ISO 27001</a></li>
            </ul>
          </div>

        </div>

        {/* Regulatory Mandatory Disclaimer (Matching Prompt Requirement) */}
        <div className="py-6 border-b border-slate-800/80 text-[11px] text-slate-500 leading-relaxed space-y-2">
          <p>
            <strong>Regulatory Disclaimer:</strong> Insurance products, coverage, pricing, eligibility, underwriting acceptance, and claims availability are subject to the terms and conditions of the applicable licensed insurance underwriter and official policy contract documents. CoverFlow operates as a registered technology and digital distribution platform.
          </p>
          <p>
            Tax benefits are subject to changes in tax laws (Section 80D / Section 80C of the Income Tax Act). None of the materials or recommendation scores on this website constitute formal legal, actuarial, or medical advice.
          </p>
        </div>

        {/* Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div>
            © {new Date().getFullYear()} CoverFlow Technologies Ltd. All rights reserved.
          </div>
          <div className="flex items-center space-x-1 text-slate-400">
            <span>Engineered for modern InsurTech with radical simplicity.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
