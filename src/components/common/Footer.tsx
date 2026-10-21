import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, Info } from '@phosphor-icons/react';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-navy-900 text-white border-t border-navy-700 mt-auto">
      {/* Obligatory Conceptual Disclaimer Strip */}
      <div className="bg-navy-800 border-b border-navy-700/80 py-2.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs text-slate-300">
          <Info className="w-4 h-4 text-gold-500 shrink-0" />
          <span className="font-medium text-gold-400">Notice:</span>
          <span>{t('footer.disclaimer')}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Government Authority Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-navy-700 border border-navy-600 flex items-center justify-center text-gold-500">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4zm0 2.18l6 3v4.82c0 4.52-3.13 8.74-6 9.88-2.87-1.14-6-5.36-6-9.88V7.18l6-3zM11 7h2v6h-2zm0 8h2v2h-2z" />
                </svg>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-300 font-medium">
                  {language === 'ar' ? 'دائرة التمكين الحكومي' : 'Department of Government Enablement (DGE)'}
                </div>
                <div className="text-sm font-bold text-white tracking-tight">
                  Abu Dhabi Spatial Data Infrastructure (AD-SDI)
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 max-w-md leading-relaxed">
              The unified authoritative platform empowering the Abu Dhabi Government ecosystem with trusted geospatial data, modern OGC standards, and advanced spatial analytics.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-navy-800 text-[11px] text-slate-300 border border-navy-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                UAE Sovereign Data Residency
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-navy-800 text-[11px] text-slate-300 border border-navy-700">
                ISO 19115 / FGDS Standard
              </span>
            </div>
          </div>

          {/* Col 2: Fast Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-gold-500 uppercase tracking-wider mb-3">
              Portal Modules
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link to="/catalogue" className="hover:text-white transition-colors">Geospatial Catalogue</Link></li>
              <li><Link to="/workspace/map-viewer" className="hover:text-white transition-colors">Map Viewer</Link></li>
              <li><Link to="/marketplace" className="hover:text-white transition-colors">Data Marketplace</Link></li>
              <li><Link to="/workspace/geoai/change-detection" className="hover:text-white transition-colors">GeoAI Studio</Link></li>
              <li><Link to="/workspace/digital-twin" className="hover:text-white transition-colors">Digital Twin 3D</Link></li>
              <li><Link to="/open-data" className="hover:text-white transition-colors">Open Data Portal</Link></li>
            </ul>
          </div>

          {/* Col 3: Governance & Governance Links */}
          <div>
            <h4 className="text-xs font-semibold text-gold-500 uppercase tracking-wider mb-3">
              Governance & Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link to="/workspace/publishing" className="hover:text-white transition-colors">Publishing & Approvals</Link></li>
              <li><Link to="/workspace/quality" className="hover:text-white transition-colors">Quality Gateway & SLAs</Link></li>
              <li><Link to="/workspace/security" className="hover:text-white transition-colors">Security & Access Console</Link></li>
              <li><Link to="/workspace/geomaturity" className="hover:text-white transition-colors">GeoMaturity & Training</Link></li>
              <li><Link to="/workspace/command-centre" className="hover:text-white transition-colors">Programme Command Centre</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="border-t border-navy-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            {t('footer.copyright')}
          </div>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <span className="hover:text-slate-200 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-200 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-200 cursor-pointer">Accessibility</span>
            <span className="hover:text-slate-200 cursor-pointer">Open Data Licence</span>
            <span className="hover:text-slate-200 cursor-pointer">Contact DGE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
