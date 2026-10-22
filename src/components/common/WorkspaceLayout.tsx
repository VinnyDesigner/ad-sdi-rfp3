import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { CURRENT_SCENARIO_DATE } from '../../data/mockData';
import {
  Compass,
  MapTrifold,
  Storefront,
  Brain,
  Cube,
  CodeBlock,
  CheckCircle,
  ChartLineUp,
  ShieldCheck,
  FileText,
  GraduationCap,
  Gauge,
  List,
  Bell,
  Question,
  Globe,
  CaretDown,
  SignOut,
  House,
  MagnifyingGlass,
  Sparkle,
} from '@phosphor-icons/react';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  activeSection?: string;
  dark?: boolean;
}

export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({ children, dark = false }) => {
  const { currentUser, setCurrentPersona, logout } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [globalQuery, setGlobalQuery] = useState('');

  const personaRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (personaRef.current && !personaRef.current.contains(event.target as Node)) {
        setShowPersonaMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (globalQuery.trim()) {
      navigate(`/catalogue?q=${encodeURIComponent(globalQuery.trim())}`);
    }
  };

  const isAr = language === 'ar';

  const navGroups = [
    {
      title: isAr ? 'استكشاف' : 'DISCOVER',
      items: [
        { label: isAr ? 'فهرس البيانات' : 'Catalogue', path: '/catalogue', icon: Compass },
        { label: isAr ? 'مستعرض الخرائط' : 'Map Viewer', path: '/workspace/map-viewer', icon: MapTrifold },
        { label: isAr ? 'سوق البيانات' : 'Marketplace', path: '/marketplace', icon: Storefront },
      ],
    },
    {
      title: isAr ? 'بناء' : 'BUILD',
      items: [
        { label: isAr ? 'مختبر الذكاء الجغرافي' : 'GeoAI Studio', path: '/workspace/geoai/change-detection', icon: Brain },
        { label: isAr ? 'المساعد الجيومكاني' : 'GeoAI Assistant', path: '/workspace/geoai/assistant', icon: Sparkle },
        { label: isAr ? 'التوأم الرقمي 3D' : 'Digital Twin 3D', path: '/workspace/digital-twin', icon: Cube },
        { label: isAr ? 'الخدمات والواجهات' : 'APIs & Services', path: '/workspace/services', icon: CodeBlock },
      ],
    },
    {
      title: isAr ? 'حوكمة' : 'GOVERN',
      items: [
        { label: isAr ? 'النشر والاعتمادات' : 'Publishing & Approvals', path: '/workspace/publishing', icon: CheckCircle },
        { label: isAr ? 'الجودة ومستوى الخدمة' : 'Quality & SLA', path: '/workspace/quality', icon: ChartLineUp },
        { label: isAr ? 'الأمن والصلاحيات' : 'Security & Access', path: '/workspace/security', icon: ShieldCheck },
        { label: isAr ? 'السياسات والمعايير' : 'Policies & Standards', path: '/workspace/policies', icon: FileText },
      ],
    },
    {
      title: isAr ? 'تمكين' : 'ENABLE',
      items: [
        { label: isAr ? 'النضج المكاني والتدريب' : 'GeoMaturity & Training', path: '/workspace/geomaturity', icon: GraduationCap },
      ],
    },
    {
      title: isAr ? 'البرنامج' : 'PROGRAMME',
      items: [
        { label: isAr ? 'مركز العمليات التنفيذي' : 'Command Centre', path: '/workspace/command-centre', icon: Gauge },
      ],
    },
  ];

  return (
    <div className={`h-screen w-screen overflow-hidden flex flex-col font-sans select-none ${dark ? 'bg-[#0A1628] text-slate-100' : 'bg-canvas text-text-primary'}`}>
      {/* 6-Module Brand Color Ribbon */}
      <div className="module-bar shrink-0">
        <span></span><span></span><span></span><span></span><span></span><span></span>
      </div>

      {/* Authenticated Top Navigation - Fixed at top, never scrolls */}
      <header className={`relative h-16 shrink-0 border-b flex items-center justify-between px-4 sm:px-6 z-[9999] ${
        dark ? 'bg-[#0F223D] border-[#1F385C]' : 'bg-white border-border shadow-2xs'
      }`}>
        {/* Left: Sidebar Toggle + DGE Logo + AD-SDI Wordmark */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse shrink-0">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`p-1.5 rounded-lg border transition-colors ${
              dark
                ? 'border-[#1F385C] text-slate-300 hover:bg-[#1A3152]'
                : 'border-border text-text-secondary hover:bg-canvas'
            }`}
            title="Toggle Sidebar"
          >
            <List className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-3 shrink-0" title="Department of Government Enablement — Home">
            <img
              src={dark ? '/dge-logo-white.png' : '/dge-logo.png'}
              alt="Department of Government Enablement | دائرة التمكين الحكومي"
              className="h-8 sm:h-9 w-auto object-contain shrink-0"
            />
          </Link>

          {/* Current Date Scenario Badge */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border border-gold-500/30 bg-gold-500/10 text-gold-600 dark:text-gold-400 shrink-0 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse"></span>
            {isAr ? 'السيناريو: ' : 'Scenario: '}{CURRENT_SCENARIO_DATE}
          </div>
        </div>

        {/* Center: Global Search */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={globalQuery}
              onChange={(e) => setGlobalQuery(e.target.value)}
              placeholder={isAr ? 'ابحث في مجموعات البيانات، والخدمات، والنماذج...' : 'Search across datasets, services, models, tickets...'}
              className={`w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-1.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors ${
                dark
                  ? 'bg-[#132847] border-[#1F385C] text-slate-100 placeholder:text-slate-400'
                  : 'bg-canvas border-border text-text-primary placeholder:text-text-muted'
              }`}
            />
            <MagnifyingGlass className="w-4 h-4 text-text-secondary absolute left-3 rtl:left-auto rtl:right-3 top-2 pointer-events-none" />
          </form>
        </div>

        {/* Right: Quick actions, Notifications, Language, Persona Switcher */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            to="/"
            title={isAr ? 'الرئيسية' : 'Public Home'}
            className={`p-2 rounded-lg border transition-colors ${
              dark ? 'border-[#1F385C] text-slate-300 hover:bg-[#1A3152]' : 'border-border text-text-secondary hover:bg-canvas'
            }`}
          >
            <House className="w-4 h-4" />
          </Link>

          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap ${
              dark
                ? 'border-[#1F385C] text-slate-300 hover:bg-[#1A3152]'
                : 'border-border text-text-primary hover:bg-canvas'
            }`}
            title={isAr ? 'تغيير اللغة إلى الإنجليزية' : 'Switch to Arabic'}
          >
            <Globe className="w-3.5 h-3.5 text-blue-500" />
            <span>{language === 'en' ? 'العربية' : 'EN'}</span>
          </button>

          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 rounded-lg border relative transition-colors ${
                dark ? 'border-[#1F385C] text-slate-300 hover:bg-[#1A3152]' : 'border-border text-text-secondary hover:bg-canvas'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-80 bg-white rounded-xl shadow-2xl border border-border py-2 z-[10000] text-text-primary">
                <div className="px-4 py-2 border-b border-border flex items-center justify-between">
                  <span className="text-xs font-bold text-navy-900">{isAr ? 'الإشعارات' : 'Notifications'}</span>
                  <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">{isAr ? 'تحديد الكل كمقروء' : 'Mark all read'}</span>
                </div>
                <div className="divide-y divide-border/60 max-h-60 overflow-y-auto">
                  <div className="px-4 py-2.5 text-xs hover:bg-canvas cursor-pointer">
                    <div className="font-semibold text-navy-900">{isAr ? 'طلب نشر جديد: مواقف ومسارات الحافلات' : 'New Submission: Bus Stops & Routes'}</div>
                    <div className="text-[11px] text-text-secondary">{isAr ? 'اجتازت الفحوصات الآلية بنجاح (100%). بانتظار اعتماد المشرف.' : 'Quality gateway checks passed (100%). Waiting custodian approval.'}</div>
                    <div className="text-[10px] text-text-muted mt-1">{isAr ? 'منذ ساعتين' : '2 hours ago'}</div>
                  </div>
                  <div className="px-4 py-2.5 text-xs hover:bg-canvas cursor-pointer">
                    <div className="font-semibold text-navy-900">{isAr ? 'طلب اشتراك في سوق البيانات' : 'Marketplace Entitlement Request'}</div>
                    <div className="text-[11px] text-text-secondary">{isAr ? 'طلب عمر ر. (الدار) اشتراكاً تجارياً لواجهة القطع العقارية.' : 'Omar R. (Al Dar) requested commercial subscription for Land Parcels API.'}</div>
                    <div className="text-[10px] text-text-muted mt-1">{isAr ? 'منذ يوم واحد' : '1 day ago'}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/workspace/policies"
            title={isAr ? 'السياسات والمعايير' : 'Policies & Standards'}
            className={`p-2 rounded-lg border transition-colors ${
              dark ? 'border-[#1F385C] text-slate-300 hover:bg-[#1A3152]' : 'border-border text-text-secondary hover:bg-canvas'
            }`}
          >
            <Question className="w-4 h-4" />
          </Link>

          {/* User Persona Profile Pill */}
          <div ref={personaRef} className="relative shrink-0">
            <button
              onClick={() => setShowPersonaMenu(!showPersonaMenu)}
              className={`flex items-center gap-2 p-1.5 pr-2.5 rounded-lg border transition-colors shrink-0 ${
                dark
                  ? 'border-[#1F385C] bg-[#132847] hover:bg-[#1A3152]'
                  : 'border-border bg-white hover:bg-canvas'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                {currentUser.avatarText}
              </div>
              <div className="hidden sm:flex flex-col text-left rtl:text-right shrink-0">
                <span className={`text-xs font-bold leading-none whitespace-nowrap ${dark ? 'text-white' : 'text-navy-900'}`}>
                  {currentUser.name}
                </span>
                <span className={`text-[10px] truncate max-w-[110px] whitespace-nowrap ${dark ? 'text-slate-400' : 'text-text-secondary'}`}>
                  {currentUser.role === 'steward' ? (isAr ? 'مشرف بيانات' : 'Data Steward') : currentUser.role === 'partner' ? (isAr ? 'شريك معتمد' : 'Approved Partner') : (isAr ? 'زائر' : 'Visitor')}
                </span>
              </div>
              <CaretDown className="w-3 h-3 text-text-secondary shrink-0" />
            </button>

            {/* Persona Switcher Menu */}
            {showPersonaMenu && (
              <div className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-72 bg-white rounded-xl shadow-2xl border border-border py-2 z-[10000] text-text-primary animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2 border-b border-border bg-canvas/50">
                  <div className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                    {isAr ? 'تبديل المستخدم التجريبي' : 'Switch Test Persona'}
                  </div>
                  <div className="text-xs font-semibold text-navy-900 mt-1">{currentUser.name}</div>
                  <div className="text-[10px] text-text-secondary">{currentUser.entity}</div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => { setCurrentPersona('khalid'); setShowPersonaMenu(false); }}
                    className={`w-full text-left rtl:text-right px-4 py-2 text-xs flex items-center gap-2.5 hover:bg-canvas ${
                      currentUser.id === 'khalid' ? 'bg-blue-50 font-bold text-blue-700' : ''
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[9px] flex items-center justify-center shrink-0">KM</span>
                    <div>
                      <div>Khalid M. (DMT Data Steward)</div>
                      <div className="text-[10px] text-text-secondary font-normal">Full Publishing & Approvals</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { setCurrentPersona('fatima'); setShowPersonaMenu(false); }}
                    className={`w-full text-left rtl:text-right px-4 py-2 text-xs flex items-center gap-2.5 hover:bg-canvas ${
                      currentUser.id === 'fatima' ? 'bg-blue-50 font-bold text-blue-700' : ''
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[9px] flex items-center justify-center shrink-0">FA</span>
                    <div>
                      <div>Fatima A. (Quality Officer)</div>
                      <div className="text-[10px] text-text-secondary font-normal">Quality & SLA Dashboard</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { setCurrentPersona('omar'); setShowPersonaMenu(false); }}
                    className={`w-full text-left rtl:text-right px-4 py-2 text-xs flex items-center gap-2.5 hover:bg-canvas ${
                      currentUser.id === 'omar' ? 'bg-blue-50 font-bold text-blue-700' : ''
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold text-[9px] flex items-center justify-center shrink-0">OR</span>
                    <div>
                      <div>Omar R. (Approved Partner)</div>
                      <div className="text-[10px] text-text-secondary font-normal">Marketplace & Entitlements</div>
                    </div>
                  </button>
                </div>

                <div className="border-t border-border pt-1">
                  <button
                    onClick={() => { logout(); setShowPersonaMenu(false); navigate('/login'); }}
                    className="w-full text-left rtl:text-right px-4 py-1.5 text-xs text-red-600 hover:bg-red-50 font-medium flex items-center gap-1.5"
                  >
                    <SignOut className="w-3.5 h-3.5" />
                    {isAr ? 'تسجيل الخروج' : 'Sign out'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace Body with Sidebar & Content - Fixed height, no outer window scroll */}
      <div className="flex-1 flex overflow-hidden w-full relative isolate z-0">
        {/* Sidebar Navigation - Fixed height with its own internal scroll */}
        <aside
          className={`transition-all duration-200 border-r rtl:border-r-0 rtl:border-l flex flex-col shrink-0 h-full overflow-hidden z-30 ${
            sidebarCollapsed ? 'w-16' : 'w-64'
          } ${
            dark
              ? 'bg-[#0D1C33] border-[#1F385C]'
              : 'bg-white border-border shadow-xs'
          }`}
        >
          <div className="flex-1 py-4 overflow-y-auto space-y-6">
            {navGroups.map((group) => (
              <div key={group.title} className="px-3">
                {!sidebarCollapsed && (
                  <div className={`px-3 mb-2 text-[10px] font-bold tracking-wider uppercase ${
                    dark ? 'text-slate-400' : 'text-text-muted'
                  }`}>
                    {group.title}
                  </div>
                )}
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = location.pathname.startsWith(item.path);
                    const IconComponent = item.icon;

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        title={sidebarCollapsed ? item.label : undefined}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                          isActive
                            ? dark
                              ? 'bg-blue-600 text-white font-bold shadow-xs'
                              : 'bg-blue-50 text-blue-700 font-bold'
                            : dark
                              ? 'text-slate-300 hover:bg-[#162C4E] hover:text-white'
                              : 'text-text-primary hover:bg-canvas hover:text-navy-900'
                        }`}
                      >
                        <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? (dark ? 'text-white' : 'text-blue-600') : 'text-text-secondary'}`} />
                        {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Footer: Security info & Status */}
          {!sidebarCollapsed && (
            <div className={`p-3 border-t text-[11px] shrink-0 ${dark ? 'border-[#1F385C] bg-[#0A1628]' : 'border-border bg-canvas/60'}`}>
              <div className="flex items-center justify-between text-text-secondary">
                <span>{isAr ? 'بوابة الأمان' : 'Security Gate'}</span>
                <span className="text-emerald-500 font-bold">{isAr ? 'متوافق' : 'Compliant'}</span>
              </div>
              <div className="text-[10px] text-text-muted mt-0.5 font-mono">
                {isAr ? 'الإصدار R-2027.09' : 'Release R-2027.09'}
              </div>
            </div>
          )}
        </aside>

        {/* Content Area - ONLY this scrolls, keeping Header and Sidebar locked in place */}
        <main className="flex-1 h-full overflow-y-auto flex flex-col relative">
          <div className="flex-1 w-full">
            {children}
          </div>

          {/* Internal Footer Disclaimer */}
          <footer className={`py-3 px-6 text-center text-xs border-t shrink-0 ${
            dark ? 'bg-[#081220] border-[#1F385C] text-slate-400' : 'bg-white border-border text-text-muted'
          }`}>
            <span className="font-semibold">{isAr ? 'بوابة AD-SDI' : 'AD-SDI Portal'}</span> • {isAr ? 'دائرة التمكين الحكومي' : 'Department of Government Enablement'} • <span className="text-gold-500 font-medium">{isAr ? 'بيانات استرشادية — تصميم مقترح تجريبي' : 'Illustrative data — conceptual design'}</span>
          </footer>
        </main>
      </div>
    </div>
  );
};
