import React from 'react';
import { PARTNERS } from '../data/mockData';
import { Building2, Star, Shield } from 'lucide-react';

export const PartnersSection: React.FC = () => {
  return (
    <section className="py-14 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8">
          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Trusted Insurance Underwriters
          </div>
          <h3 className="text-xl font-bold text-navy-900 font-display mt-1">
            Integrated With Top Licensed Insurers
          </h3>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {PARTNERS.map((partner, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 hover:bg-teal-50/20 transition-all text-center group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-navy-900 mx-auto mb-2 shadow-2xs group-hover:text-brand-600 transition-colors">
                {partner.code}
              </div>
              <div className="text-xs font-bold text-navy-900 line-clamp-1">{partner.name}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{partner.category}</div>
              <div className="inline-flex items-center text-[10px] text-amber-500 font-bold mt-1">
                <Star className="w-2.5 h-2.5 fill-amber-400 mr-0.5" />
                <span>{partner.rating}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 text-[11px] text-slate-400">
          * Partner availability, underwriting parameters, and policy inclusions vary by product type and geographical region.
        </div>

      </div>
    </section>
  );
};
