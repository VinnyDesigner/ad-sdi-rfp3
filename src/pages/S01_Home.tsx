import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useLanguage } from '../context/LanguageContext';
import { PLATFORM_STATS, THEMES } from '../data/mockData';
import {
  MagnifyingGlass,
  ArrowRight,
  Database,
  Buildings,
  Tree,
  MapPin,
  Car,
  Lightning,
  Image as ImageIcon,
  Users,
  Compass,
  Brain,
  Storefront,
  GraduationCap,
  Cube,
  Globe,
  Sparkle,
  CheckCircle,
} from '@phosphor-icons/react';

export const S01_Home: React.FC = () => {
  const { language, t } = useLanguage();
  const isAr = language === 'ar';
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState<'all' | 'datasets' | 'services' | 'maps' | 'apis' | 'ai'>('all');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalogue?q=${encodeURIComponent(searchQuery.trim())}&type=${searchFilter}`);
    } else {
      navigate(`/catalogue?type=${searchFilter}`);
    }
  };

  const getThemeIcon = (iconName: string) => {
    switch (iconName) {
      case 'MapPin': return <MapPin className="w-5 h-5 text-blue-600" />;
      case 'Car': return <Car className="w-5 h-5 text-indigo-600" />;
      case 'SelectionAll': return <Buildings className="w-5 h-5 text-amber-600" />;
      case 'Buildings': return <Buildings className="w-5 h-5 text-cyan-600" />;
      case 'Tree': return <Tree className="w-5 h-5 text-emerald-600" />;
      case 'Lightning': return <Lightning className="w-5 h-5 text-orange-600" />;
      case 'Image': return <ImageIcon className="w-5 h-5 text-purple-600" />;
      case 'Users': return <Users className="w-5 h-5 text-teal-600" />;
      default: return <Database className="w-5 h-5 text-blue-600" />;
    }
  };

  const services = [
    {
      code: 'Module A',
      title: t('module.a.title'),
      desc: t('module.a.desc'),
      color: '#1F5FAD',
      path: '/catalogue',
      icon: Compass,
      tag: 'Core SDI',
    },
    {
      code: 'Module B',
      title: t('module.b.title'),
      desc: t('module.b.desc'),
      color: '#7B4FD6',
      path: '/workspace/geoai/change-detection',
      icon: Brain,
      tag: 'AI & Inference',
    },
    {
      code: 'Module C',
      title: t('module.c.title'),
      desc: t('module.c.desc'),
      color: '#0E9F8E',
      path: '/marketplace',
      icon: Storefront,
      tag: 'Commercial & Shared',
    },
    {
      code: 'Module D',
      title: t('module.d.title'),
      desc: t('module.d.desc'),
      color: '#E07B24',
      path: '/workspace/geomaturity',
      icon: GraduationCap,
      tag: 'Training & Maturity',
    },
    {
      code: 'Module E',
      title: t('module.e.title'),
      desc: t('module.e.desc'),
      color: '#2BA6DE',
      path: '/workspace/digital-twin',
      icon: Cube,
      tag: '3D & 4D Simulation',
    },
    {
      code: 'Module F',
      title: t('module.f.title'),
      desc: t('module.f.desc'),
      color: '#5DAA3A',
      path: '/open-data',
      icon: Globe,
      tag: 'Public Access',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative text-white overflow-hidden py-16 lg:py-24 border-b border-[#13315C]"
          style={{ backgroundColor: '#0B2545' }}
        >
          {/* Authentic Abu Dhabi Geospatial Aerial Banner Image */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src="/abu-dhabi-aerial-coastal.jpg"
              alt="Abu Dhabi Spatial Data Infrastructure"
              className="w-full h-full object-cover object-center"
            />
            {/* Blended sovereign navy overlays ensuring 100% text legibility and rich visual depth */}
            <div className="absolute inset-0 bg-[#0B2545]/70"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B2545]/85 via-[#0B2545]/60 to-[#0B2545]/90"></div>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Government Authority Banner */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800 border border-navy-700 text-xs text-gold-400 font-medium mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              {language === 'ar' ? 'البوابة الرسمية للبنية التحتية للبيانات المكانية بإمارة أبوظبي' : 'Official Geospatial Platform • Abu Dhabi Government'}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              {t('home.hero.title')}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              {t('home.hero.subtitle')}
            </p>

            {/* Central Search Box with Filter Pills */}
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-2.5 sm:p-3 border border-border text-left rtl:text-right">
              {/* Filter pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-border/80 text-xs px-1">
                {[
                  { id: 'all', label: isAr ? 'الكل' : 'All' },
                  { id: 'datasets', label: isAr ? 'مجموعات البيانات' : 'Datasets' },
                  { id: 'services', label: isAr ? 'الخدمات' : 'Services' },
                  { id: 'maps', label: isAr ? 'الخرائط' : 'Maps' },
                  { id: 'apis', label: isAr ? 'واجهات البرمجة' : 'APIs' },
                  { id: 'ai', label: isAr ? 'نماذج الذكاء الاصطناعي' : 'AI Models' },
                ].map((pill) => (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => setSearchFilter(pill.id as any)}
                    className={`px-3 py-1 rounded-full font-medium transition-colors ${
                      searchFilter === pill.id
                        ? 'bg-navy-900 text-white shadow-xs'
                        : 'text-text-secondary hover:text-navy-900 hover:bg-canvas'
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>

              {/* Input field + Search button */}
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 mt-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('home.search.placeholder')}
                    className="w-full pl-10 rtl:pl-3 rtl:pr-10 pr-3 py-3 text-sm text-navy-900 bg-transparent rounded-lg focus:outline-none placeholder:text-text-muted"
                  />
                  <MagnifyingGlass className="w-5 h-5 text-blue-600 absolute left-3 rtl:left-auto rtl:right-3 top-3.5 pointer-events-none" />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors shrink-0 shadow-md"
                >
                  <span>{isAr ? 'بحث' : 'Search'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </form>
            </div>

            {/* Platform Operational Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 pt-8 border-t border-navy-800/80 text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{PLATFORM_STATS.datasets}</div>
                <div className="text-xs text-slate-300 mt-1">{t('home.stats.datasets')}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{PLATFORM_STATS.contributingEntities}</div>
                <div className="text-xs text-slate-300 mt-1">{t('home.stats.entities')}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{PLATFORM_STATS.ogcServices}</div>
                <div className="text-xs text-slate-300 mt-1">{t('home.stats.services')}</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  99.95% SLA
                </div>
                <div className="text-xs text-slate-300 mt-1">{t('home.stats.operational')}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Explore by Theme Section */}
        <section className="py-14 bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight">
                  {isAr ? 'استكشف حسب المجال الجيومكاني' : 'Explore by Geospatial Theme'}
                </h2>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">
                  {isAr ? 'مصنفة وفقاً لمعايير البيانات الجيومكانية الأساسية لإمارة أبوظبي (FGDS).' : 'Categorized in accordance with the Abu Dhabi Fundamental Geospatial Data Standards (FGDS).'}
                </p>
              </div>
              <Link
                to="/catalogue"
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                <span>{isAr ? 'عرض جميع المجالات' : 'View all themes'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => navigate(`/catalogue?theme=${encodeURIComponent(theme.name)}`)}
                  className="p-4 rounded-xl border border-border bg-canvas/40 hover:bg-white hover:border-blue-300 hover:shadow-md transition-all text-center flex flex-col items-center group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-white border border-border group-hover:border-blue-200 flex items-center justify-center mb-3 shadow-xs transition-colors">
                    {getThemeIcon(theme.icon)}
                  </div>
                  <span className="text-xs font-semibold text-navy-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                    {language === 'ar' ? theme.nameAr : theme.name}
                  </span>
                  <span className="text-[11px] font-mono text-text-muted">
                    {theme.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Six Core Platform Services Section */}
        <section className="py-16 bg-canvas">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                {isAr ? 'الوحدات المعمارية' : 'Architectural Modules'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-3">
                {isAr ? 'ست خدمات جيومكانية متكاملة' : 'Six Integrated Geospatial Services'}
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary mt-2">
                {isAr
                  ? 'منظومة موحدة لتمكين المشرفين الحكوميين والمحللين الحضريين والشركاء المعتمدين والمطورين.'
                  : 'A unified ecosystem powering government data custodians, urban analysts, commercial partners, and developers.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((svc) => {
                const IconComp = svc.icon;
                const moduleCodeAr = svc.code.replace('Module A', 'الوحدة أ')
                  .replace('Module B', 'الوحدة ب')
                  .replace('Module C', 'الوحدة ج')
                  .replace('Module D', 'الوحدة د')
                  .replace('Module E', 'الوحدة هـ')
                  .replace('Module F', 'الوحدة و');
                const moduleTagAr = svc.tag === 'Core SDI' ? 'البنية التحتية الأساسية'
                  : svc.tag === 'AI & Inference' ? 'الاستدلال والذكاء الاصطناعي'
                  : svc.tag === 'Commercial & Shared' ? 'تجاري ومشترك'
                  : svc.tag === 'Training & Maturity' ? 'التدريب والنضج'
                  : svc.tag === '3D & 4D Simulation' ? 'محاكاة ثلاثية ورباعية الأبعاد'
                  : svc.tag === 'Public Access' ? 'الوصول العام'
                  : svc.tag;

                return (
                  <Link
                    key={svc.code}
                    to={svc.path}
                    className="group bg-white rounded-xl border border-border p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between relative overflow-hidden"
                  >
                    {/* Module Color Indicator Top Edge */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1.5 transition-all group-hover:h-2"
                      style={{ backgroundColor: svc.color }}
                    ></div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-xs"
                          style={{ backgroundColor: svc.color }}
                        >
                          <IconComp className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-canvas-subtle border border-border text-text-secondary">
                          {isAr ? `${moduleCodeAr} • ${moduleTagAr}` : `${svc.code} • ${svc.tag}`}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-navy-900 group-hover:text-blue-600 transition-colors mb-2">
                        {svc.title}
                      </h3>

                      <p className="text-xs text-text-secondary leading-relaxed mb-6">
                        {svc.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border/80 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-navy-900 transition-colors">
                      <span>{isAr ? 'تشغيل الوحدة' : 'Launch module'}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Security & Sovereign Trust Strip */}
        <section className="bg-navy-900 text-white py-12 border-t border-navy-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-navy-800 text-gold-500 border border-navy-700 shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {isAr ? 'جهات مشرفة معتمدة' : 'Authoritative Custodians'}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isAr
                      ? 'تُنشر البيانات مباشرة من الجهات المعتمدة مثل دائرة البلديات والنقل وهيئة البيئة ومركز الإحصاء ودائرة التعليم والمعرفة وفق اتفاقيات تبادل بيانات معتمدة.'
                      : 'Data published directly by accredited entities such as DMT, EAD, SCAD, and ADEK under formal DSAs.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-navy-800 text-emerald-400 border border-navy-700 shrink-0">
                  <Sparkle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {isAr ? 'بوابة جودة آلية متقدمة' : 'Automated Quality Gateway'}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isAr
                      ? 'فحص الطوبولوجيا، والتوافق مع الإسقاط EPSG:32640، وتطبيق النطاقات القيمية، وتدقيق اكتمال البيانات الوصفية.'
                      : 'Topology verification, EPSG:32640 alignment, domain lookup enforcement, and metadata completeness audits.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-navy-800 text-blue-400 border border-navy-700 shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {isAr ? 'مطابقة للمعايير الدولية' : 'Standards Compliant'}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isAr
                      ? 'دعم كامل لمعايير OGC API Features و WMS و WFS و WMTS و 3D Tiles و GeoJSON ومخططات FGDS للبيانات الوصفية.'
                      : 'Full support for OGC API Features, WMS, WFS, WMTS, 3D Tiles, GeoJSON, and FGDS metadata schemas.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
