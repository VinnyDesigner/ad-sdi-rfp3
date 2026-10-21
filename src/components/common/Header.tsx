import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Globe, MagnifyingGlass, SignIn, CaretDown, ArrowSquareOut } from '@phosphor-icons/react';

export const Header: React.FC = () => {
  const { currentUser, isAuthenticated, logout, setCurrentPersona } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalogue?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/catalogue');
    }
  };

  const navLinks = [
    { name: t('nav.data'), path: '/catalogue' },
    { name: t('nav.maps'), path: '/workspace/map-viewer' },
    { name: t('nav.services'), path: '/workspace/services' },
    { name: t('nav.marketplace'), path: '/marketplace' },
    { name: t('nav.opendata'), path: '/open-data' },
    { name: t('nav.developers'), path: '/developers' },
  ];

  return (
    <header className="bg-white border-b border-border sticky top-0 z-[9999] shadow-xs select-none">
      {/* Signature 6-Module Brand Color Bar */}
      <div className="module-bar">
        <span title="Clearinghouse & Portal"></span>
        <span title="GeoAI Studio"></span>
        <span title="Data Marketplace"></span>
        <span title="Capacity Building & GeoMaturity"></span>
        <span title="Digital Twin 3D"></span>
        <span title="Open Data"></span>
      </div>

      <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px] gap-4">
          {/* Left: Official Department of Government Enablement Logo */}
          <div className="flex items-center gap-5 shrink-0">
            <Link to="/" className="flex items-center group shrink-0" title="Department of Government Enablement — Home">
              <img
                src="/dge-logo.png"
                alt="Department of Government Enablement | دائرة التمكين الحكومي"
                className="h-10 sm:h-12 w-auto object-contain shrink-0"
              />
            </Link>

            {/* Main Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 shrink-0">
              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.path ||
                  (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => {
                      if (location.pathname !== link.path) {
                        navigate(link.path);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      isActive
                        ? 'text-blue-600 bg-blue-50/80 font-bold'
                        : 'text-text-primary hover:text-blue-600 hover:bg-canvas'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Controls: Search, Language, Workspace & User Persona */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Search Input */}
            <form onSubmit={handleGlobalSearch} className="hidden md:flex items-center relative shrink-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ar' ? 'ابحث في البيانات...' : 'Search catalogue...'}
                className="w-40 xl:w-52 pl-8 pr-3 py-1.5 text-xs bg-canvas border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white text-text-primary placeholder:text-text-muted transition-all"
              />
              <MagnifyingGlass className="w-3.5 h-3.5 text-text-secondary absolute left-2.5 pointer-events-none" />
            </form>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border hover:bg-canvas text-xs font-semibold text-text-primary transition-colors whitespace-nowrap shrink-0"
              title="Toggle English / Arabic"
            >
              <Globe className="w-4 h-4 text-blue-600" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>

            {/* Authenticated Workspace Shortcut */}
            <Link
              to="/workspace/publishing"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 text-white hover:bg-navy-700 text-xs font-semibold transition-colors shadow-xs whitespace-nowrap shrink-0"
            >
              <span>Workspace</span>
              <ArrowSquareOut className="w-3.5 h-3.5 text-gold-500" />
            </Link>

            {/* Authentication & Persona Control */}
            {isAuthenticated ? (
              <div className="relative shrink-0">
                <button
                  onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-lg border border-border hover:bg-canvas text-xs font-medium transition-colors shrink-0"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {currentUser.avatarText}
                  </div>
                  <div className="hidden xl:flex flex-col text-left rtl:text-right shrink-0">
                    <span className="text-navy-900 font-bold leading-tight whitespace-nowrap">{currentUser.name}</span>
                    <span className="text-[10px] text-text-secondary whitespace-nowrap">{currentUser.role === 'steward' ? 'Data Steward' : currentUser.role === 'partner' ? 'Approved Partner' : 'Visitor'}</span>
                  </div>
                  <CaretDown className="w-3 h-3 text-text-secondary shrink-0" />
                </button>

                {/* Persona Switcher Dropdown */}
                {showPersonaMenu && (
                  <div className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-72 bg-white rounded-xl shadow-2xl border border-border py-2 z-[10000] animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-border bg-canvas/50">
                      <div className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
                        Demonstration Personas
                      </div>
                      <div className="text-xs text-text-primary mt-1 font-medium">
                        Current: <span className="text-blue-600 font-bold">{currentUser.name}</span>
                      </div>
                      <div className="text-[10px] text-text-secondary">{currentUser.entity}</div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => { setCurrentPersona('khalid'); setShowPersonaMenu(false); }}
                        className={`w-full text-left rtl:text-right px-4 py-2 text-xs flex items-center gap-2.5 hover:bg-canvas transition-colors ${
                          currentUser.id === 'khalid' ? 'bg-blue-50 font-bold text-blue-700' : 'text-text-primary'
                        }`}
                      >
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">KM</span>
                        <div>
                          <div>Khalid M. (DMT Data Steward)</div>
                          <div className="text-[10px] text-text-secondary font-normal">Full Governance & Publishing Access</div>
                        </div>
                      </button>

                      <button
                        onClick={() => { setCurrentPersona('fatima'); setShowPersonaMenu(false); }}
                        className={`w-full text-left rtl:text-right px-4 py-2 text-xs flex items-center gap-2.5 hover:bg-canvas transition-colors ${
                          currentUser.id === 'fatima' ? 'bg-blue-50 font-bold text-blue-700' : 'text-text-primary'
                        }`}
                      >
                        <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">FA</span>
                        <div>
                          <div>Fatima A. (Spatial Quality Officer)</div>
                          <div className="text-[10px] text-text-secondary font-normal">Quality Gateway & Validation</div>
                        </div>
                      </button>

                      <button
                        onClick={() => { setCurrentPersona('omar'); setShowPersonaMenu(false); }}
                        className={`w-full text-left rtl:text-right px-4 py-2 text-xs flex items-center gap-2.5 hover:bg-canvas transition-colors ${
                          currentUser.id === 'omar' ? 'bg-blue-50 font-bold text-blue-700' : 'text-text-primary'
                        }`}
                      >
                        <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">OR</span>
                        <div>
                          <div>Omar R. (Approved Partner)</div>
                          <div className="text-[10px] text-text-secondary font-normal">Marketplace Buyer & Entitlements</div>
                        </div>
                      </button>

                      <button
                        onClick={() => { setCurrentPersona('public'); setShowPersonaMenu(false); }}
                        className={`w-full text-left rtl:text-right px-4 py-2 text-xs flex items-center gap-2.5 hover:bg-canvas transition-colors ${
                          currentUser.id === 'public' ? 'bg-blue-50 font-bold text-blue-700' : 'text-text-primary'
                        }`}
                      >
                        <span className="w-6 h-6 rounded-full bg-slate-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0">PV</span>
                        <div>
                          <div>Public Visitor</div>
                          <div className="text-[10px] text-text-secondary font-normal">Open Data & Public Catalogue</div>
                        </div>
                      </button>
                    </div>

                    <div className="border-t border-border pt-1">
                      <button
                        onClick={() => { logout(); setShowPersonaMenu(false); }}
                        className="w-full text-left rtl:text-right px-4 py-1.5 text-xs text-red-600 hover:bg-red-50 font-medium"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-navy-900 bg-white text-navy-900 hover:bg-canvas text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <SignIn className="w-4 h-4 text-navy-900" />
                <span>{t('nav.signin')}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
