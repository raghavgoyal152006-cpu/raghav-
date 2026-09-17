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
  Settings,
  UserCheck,
  AlertCircle,
  LogOut,
  LogIn,
  CheckCircle2
} from 'lucide-react';
import { UserRole, UserProfile } from '../types/insurance';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenPolicyFinder: () => void;
  onOpenMyAccount: () => void;
  currentUser: UserProfile | null;
  onOpenLogin: () => void;
  onLogout: () => void;
  onOpenKyc: () => void;
  onOpenSearch: () => void;
  onOpenResources: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  activeSection,
  onNavigate,
  onOpenPolicyFinder,
  onOpenMyAccount,
  currentUser,
  onOpenLogin,
  onLogout,
  onOpenKyc,
  onOpenSearch,
  onOpenResources,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  // Local notifications state to support mark all read
  const [notifications, setNotifications] = useState(
    currentUser?.unreadNotifications || [
      { id: '1', title: 'Claim Status Update', desc: 'Claim CF-CLM-98214 is now under medical audit.', time: '10m ago', read: false, type: 'claim' as const },
      { id: '2', title: 'Renewal Alert', desc: 'Honda City policy expires in 19 days. Renew now for 5% NCB.', time: '1d ago', read: false, type: 'renewal' as const },
      { id: '3', title: 'KYC Verified (CKYC)', desc: 'IRDAI Central Registry verified successfully.', time: '3d ago', read: true, type: 'kyc' as const },
    ]
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const navLinks = [
    { id: 'quote', label: 'Get Quote', action: () => onOpenPolicyFinder(), isSpecial: true },
    { id: 'products', label: 'Products', action: () => onNavigate('products') },
    { id: 'claims', label: 'Claims', action: () => onNavigate('claims') },
    { id: 'finder', label: 'Policy Finder', action: () => onNavigate('finder') },
    { id: 'recommendation', label: 'AI Advisor', action: () => onNavigate('recommendation') },
    { id: 'embedded', label: 'Embedded', action: () => onNavigate('embedded') },
    { id: 'company', label: 'Company Info', action: () => onNavigate('trust') },
    { id: 'resources', label: 'Resources & Tax', action: () => onOpenResources() },
  ];

  const roles: { id: UserRole; label: string; icon: any; desc: string }[] = [
    { id: 'customer', label: 'Customer Portal', icon: User, desc: 'Individual & Family Cover' },
    { id: 'advisor', label: 'Insurance Advisor', icon: Users, desc: 'Partner & POSP Portal' },
    { id: 'business', label: 'Corporate & B2B', icon: Briefcase, desc: 'Group Health & Commercial' },
    { id: 'admin', label: 'Platform Admin', icon: Settings, desc: 'Underwriting & Analytics' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all">
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
                    ? 'text-brand-600 bg-slate-50 font-semibold'
                    : 'text-slate-600 hover:text-navy-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Actions: Search, Notifications, Role Switcher, KYC Badge, & Account / Login */}
          <div className="hidden sm:flex items-center space-x-3">
            
            {/* Quick Search Shortcut Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-500 hover:text-navy-900 text-xs transition-colors"
              title="Search anything (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden md:inline text-[11px] font-medium">Search...</span>
              <kbd className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Quick Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-xl text-slate-500 hover:text-navy-900 hover:bg-slate-100 transition-colors relative"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 ring-2 ring-white"></span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-floating border border-slate-100 p-4 text-xs z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                    <span className="font-bold text-navy-900">Notifications ({unreadCount})</span>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllRead}
                        className="text-[10px] text-brand-600 font-bold hover:underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notifications.map((n) => (
                      <div 
                        key={n.id} 
                        className={`p-2.5 rounded-xl border transition-all ${
                          n.read 
                            ? 'bg-slate-50/50 border-slate-100 text-slate-500' 
                            : n.type === 'claim'
                            ? 'bg-teal-50/70 border-teal-200/70 text-teal-950'
                            : n.type === 'renewal'
                            ? 'bg-amber-50/70 border-amber-200/70 text-amber-950'
                            : 'bg-indigo-50/70 border-indigo-200/70 text-indigo-950'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold mb-1">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                        </div>
                        <p className="text-[11px] leading-relaxed">{n.desc}</p>
                      </div>
                    ))}
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
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-floating border border-slate-100 p-2 z-50">
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
                          className={`w-full flex items-start space-x-3 px-3 py-2 rounded-xl text-left transition-colors ${
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

            {/* KYC Status Direct Action Pill */}
            {currentUser && (
              <button
                onClick={onOpenKyc}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  currentUser.kycStatus === 'verified'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 hover:bg-emerald-100'
                    : 'bg-amber-50 text-amber-800 border border-amber-300 animate-pulse hover:bg-amber-100'
                }`}
                title="Click to view or verify IRDAI CKYC"
              >
                {currentUser.kycStatus === 'verified' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="hidden md:inline">KYC Verified</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Verify KYC</span>
                  </>
                )}
              </button>
            )}

            {/* User Account / Login Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                  className="flex items-center space-x-2.5 pl-2.5 pr-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium shadow-sm transition-all group"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-navy-950 font-bold text-[10px] ring-2 ring-white/20">
                    {currentUser.avatarInitials}
                  </div>
                  <span className="font-semibold tracking-wide truncate max-w-[90px]">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" />
                </button>

                {accountDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-floating border border-slate-100 p-3 z-50 space-y-2 animate-in fade-in">
                    <div className="pb-2 border-b border-slate-100">
                      <div className="text-xs font-bold text-navy-900">{currentUser.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{currentUser.email}</div>
                      <div className="mt-1 flex items-center space-x-1.5">
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                          {currentUser.id}
                        </span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          currentUser.kycStatus === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {currentUser.kycStatus === 'verified' ? 'KYC Complete' : 'KYC Pending'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      <button
                        onClick={() => {
                          setAccountDropdownOpen(false);
                          onOpenMyAccount();
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 font-semibold text-left"
                      >
                        <FileText className="w-3.5 h-3.5 text-teal-600" />
                        <span>My Policies & Renewals</span>
                      </button>

                      <button
                        onClick={() => {
                          setAccountDropdownOpen(false);
                          onOpenKyc();
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 font-semibold text-left"
                      >
                        <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Digital KYC & CKYC Details</span>
                      </button>

                      <button
                        onClick={() => {
                          setAccountDropdownOpen(false);
                          onOpenResources();
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 font-semibold text-left"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Tax Calculator & Help Center</span>
                      </button>

                      <div className="pt-2 border-t border-slate-100">
                        <button
                          onClick={() => {
                            setAccountDropdownOpen(false);
                            onLogout();
                          }}
                          className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold text-left"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm shadow-teal-600/20 transition-all active:scale-[0.99]"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In / Register</span>
              </button>
            )}

          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-lg bg-slate-100 text-slate-700"
            >
              <Search className="w-4 h-4" />
            </button>
            {currentUser ? (
              <button
                onClick={onOpenMyAccount}
                className="p-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold"
              >
                {currentUser.avatarInitials}
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="px-2.5 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-bold"
              >
                Login
              </button>
            )}
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
          <div className="sm:hidden border-t border-slate-100 py-4 px-2 space-y-3 animate-in fade-in">
            <div className="grid grid-cols-2 gap-2 mb-2">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    onRoleChange(r.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-medium border text-left ${
                    currentRole === r.id ? 'bg-brand-50 border-brand-300 text-brand-800 font-bold' : 'border-slate-200 text-slate-700'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenKyc();
                }}
                className="flex-1 py-2 rounded-xl bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200 text-center"
              >
                IRDAI Digital KYC
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResources();
                }}
                className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold text-center"
              >
                80D Tax Calculator
              </button>
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

            {currentUser && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            )}
          </div>
        )}

      </div>
    </header>
  );
};
