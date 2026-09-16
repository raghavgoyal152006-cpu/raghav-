import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ChevronDown, 
  User, 
  Bell, 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  FileText, 
  Zap, 
  Layers, 
  HelpCircle,
  Briefcase,
  Users,
  Settings
} from 'lucide-react';
import { UserRole } from '../types/insurance';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenPolicyFinder: () => void;
  onOpenMyAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  activeSection,
  onNavigate,
  onOpenPolicyFinder,
  onOpenMyAccount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navLinks = [
    { id: 'quote', label: 'Get Quote', action: () => onOpenPolicyFinder(), isSpecial: true },
    { id: 'products', label: 'Products', action: () => onNavigate('products') },
    { id: 'claims', label: 'Claims', action: () => onNavigate('claims') },
    { id: 'finder', label: 'Policy Finder', action: () => onNavigate('finder') },
    { id: 'recommendation', label: 'AI Advisor', action: () => onNavigate('recommendation') },
    { id: 'embedded', label: 'Embedded', action: () => onNavigate('embedded') },
    { id: 'company', label: 'Company Info', action: () => onNavigate('trust') },
    { id: 'resources', label: 'Resources', action: () => onNavigate('resources') },
  ];

  const roles: { id: UserRole; label: string; icon: any; desc: string }[] = [
    { id: 'customer', label: 'Customer Portal', icon: User, desc: 'Individual & Family Cover' },
    { id: 'advisor', label: 'Insurance Advisor', icon: Users, desc: 'Partner & POSP Portal' },
    { id: 'business', label: 'Corporate & B2B', icon: Briefcase, desc: 'Group Health & Commercial' },
    { id: 'admin', label: 'Platform Admin', icon: Settings, desc: 'Underwriting & Analytics' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-3 cursor-pointer select-none" onClick={() => onNavigate('hero')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-400 text-white shadow-md shadow-brand-500/20">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="text-2xl font-extrabold tracking-tight font-display text-navy-900">Cover</span>
                <span className="text-2xl font-extrabold tracking-tight font-display text-brand-600">Flow</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
                Digital InsurTech
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={link.action}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  link.isSpecial
                    ? 'text-brand-700 bg-brand-50/80 hover:bg-brand-100 font-semibold'
                    : activeSection === link.id
                    ? 'text-brand-600 bg-slate-50'
                    : 'text-slate-600 hover:text-navy-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Actions: Role Switcher & My Account */}
          <div className="hidden sm:flex items-center space-x-3">
            
            {/* Quick Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-lg text-slate-500 hover:text-navy-900 hover:bg-slate-100 transition-colors relative"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 ring-2 ring-white"></span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-floating border border-slate-100 p-4 text-xs z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                    <span className="font-bold text-navy-900">Notifications (2)</span>
                    <span className="text-[10px] text-brand-600 cursor-pointer font-medium hover:underline">Mark all read</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-lg bg-teal-50/60 border border-teal-100/60">
                      <div className="flex items-center justify-between text-teal-800 font-semibold mb-1">
                        <span>Claim Status Update</span>
                        <span className="text-[10px] text-slate-400">10m ago</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">Claim CF-CLM-98214 is now under medical board assessment at Fortis Hospital.</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-100/60">
                      <div className="flex items-center justify-between text-amber-800 font-semibold mb-1">
                        <span>Renewal Alert</span>
                        <span className="text-[10px] text-slate-400">1d ago</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">Honda City Zero-Dep policy expires in 19 days. Renew now for 5% NCB bonus.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="capitalize">{currentRole} View</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-floating border border-slate-100 p-2 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Switch Platform Experience
                  </div>
                  <div className="space-y-1">
                    {roles.map((r) => {
                      const Icon = r.icon;
                      const isActive = currentRole === r.id;
                      return (
                        <button
                          key={r.id}
                          onClick={() => {
                            onRoleChange(r.id);
                            setRoleDropdownOpen(false);
                          }}
                          className={`w-full flex items-start space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                            isActive ? 'bg-brand-50 text-brand-900 font-semibold' : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <Icon className={`w-4 h-4 mt-0.5 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                          <div>
                            <div className="text-xs font-semibold">{r.label}</div>
                            <div className="text-[10px] text-slate-500">{r.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* My Account Profile Button */}
            <button
              onClick={onOpenMyAccount}
              className="flex items-center space-x-2.5 pl-3 pr-4 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium shadow-sm transition-all group"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-navy-950 font-bold text-[10px] ring-2 ring-white/20">
                RS
              </div>
              <span className="font-semibold tracking-wide">My Account</span>
              <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={onOpenMyAccount}
              className="p-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
            >
              Account
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-100 py-4 px-2 space-y-2 animate-in fade-in">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    onRoleChange(r.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border text-left ${
                    currentRole === r.id ? 'bg-brand-50 border-brand-300 text-brand-800' : 'border-slate-200 text-slate-700'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  link.action();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}

      </div>
    </header>
  );
};
