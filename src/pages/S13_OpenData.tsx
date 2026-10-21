import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useLanguage } from '../context/LanguageContext';
import { PLATFORM_STATS } from '../data/mockData';
import {
  Globe,
  DownloadSimple,
  CodeBlock,
  MagnifyingGlass,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  FileText,
  MapPin,
  Sparkle,
  X,
  ShareNetwork,
  Car,
  Tree,
  Drop,
} from '@phosphor-icons/react';

export const S13_OpenData: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [modalType, setModalType] = useState<'suggest' | 'issue' | 'geohack' | null>(null);
  const [modalSuccess, setModalSuccess] = useState(false);

  const openDatasets = [
    {
      id: 'od-1',
      title: 'Public Parks & Recreational Spaces',
      publisher: 'Department of Municipalities and Transport (DMT)',
      formats: ['GeoJSON', 'CSV', 'KML'],
      downloads: '14,200',
      updated: '05 Sep 2027',
      desc: 'All municipal community parks, children playgrounds, shaded gazebos, and opening hours across the Emirate.',
      features: 312,
      category: 'Recreation',
    },
    {
      id: 'od-2',
      title: 'Bus Stops & Transit Routes',
      publisher: 'Integrated Transport Centre (ITC)',
      formats: ['GTFS', 'GeoJSON', 'CSV'],
      downloads: '28,400',
      updated: '10 Sep 2027',
      desc: 'Public bus routes, geographic station coordinates, shelter accessibility ratings, and timetable linkages.',
      features: 3820,
      category: 'Transport',
    },
    {
      id: 'od-3',
      title: 'Beaches & Coastal Access Points',
      publisher: 'Environment Agency – Abu Dhabi (EAD)',
      formats: ['GeoJSON', 'Shapefile', 'CSV'],
      downloads: '9,800',
      updated: '28 Aug 2027',
      desc: 'Public and family beaches, water quality monitoring flags, lifeguard stations, and mangrove eco-boardwalks.',
      features: 84,
      category: 'Environment',
    },
    {
      id: 'od-4',
      title: 'Designated Cycling & Running Tracks',
      publisher: 'Abu Dhabi Sports Council (ADSC) & DMT',
      formats: ['GeoJSON', 'GPX', 'CSV'],
      downloads: '11,500',
      updated: '02 Sep 2027',
      desc: 'Dedicated tracks including Al Hudayriyat Island cycle loop, Yas Marina circuit, and Corniche paths.',
      features: 420,
      category: 'Sports & Health',
    },
  ];

  const handleDownload = (dsTitle: string, format: string) => {
    const dummyGeoJson = {
      type: "FeatureCollection",
      name: dsTitle,
      crs: { type: "name", properties: { name: "urn:ogc:def:crs:EPSG::32640" } },
      features: [
        {
          type: "Feature",
          properties: { name: "Abu Dhabi Waterfront Asset", status: "Active Open Data" },
          geometry: { type: "Point", coordinates: [54.3773, 24.4539] }
        }
      ]
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dummyGeoJson, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${dsTitle.replace(/\s+/g, '_')}.${format.toLowerCase()}`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Header />

      {/* Hero Banner */}
      <section className="bg-navy-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-navy-700 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            Module F • Abu Dhabi Open Data Initiative
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {t('open.hero.title')}
          </h1>

          <p className="text-base text-slate-300 max-w-xl mx-auto">
            {t('open.hero.subtitle')}
          </p>

          {/* Trust Statement */}
          <div className="max-w-2xl mx-auto p-3 rounded-xl bg-navy-800/80 border border-navy-700 text-xs text-slate-200 flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t('open.trust')}</span>
          </div>

          {/* Open Data Statistics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-navy-800 text-center">
            <div>
              <div className="text-2xl font-mono font-extrabold text-white">640</div>
              <div className="text-xs text-slate-400 mt-0.5">Open Datasets</div>
            </div>
            <div>
              <div className="text-2xl font-mono font-extrabold text-white">48k</div>
              <div className="text-xs text-slate-400 mt-0.5">Downloads / Month</div>
            </div>
            <div>
              <div className="text-2xl font-mono font-extrabold text-white">1.2M</div>
              <div className="text-xs text-slate-400 mt-0.5">API Calls / Month</div>
            </div>
            <div>
              <div className="text-2xl font-mono font-extrabold text-white">52</div>
              <div className="text-xs text-slate-400 mt-0.5">Registered Public Apps</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-10">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl border border-border p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 640 open datasets..."
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-canvas border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-600 text-text-primary"
            />
            <MagnifyingGlass className="w-4 h-4 text-text-secondary absolute left-3 top-3 pointer-events-none" />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="p-2.5 bg-canvas border border-border rounded-xl text-xs text-text-primary"
            >
              <option value="all">All Formats</option>
              <option value="GeoJSON">GeoJSON</option>
              <option value="CSV">CSV</option>
              <option value="KML">KML</option>
              <option value="GTFS">GTFS</option>
            </select>

            <button
              onClick={() => setModalType('suggest')}
              className="px-4 py-2.5 rounded-xl border border-border hover:bg-canvas text-navy-900 font-semibold text-xs whitespace-nowrap transition-colors"
            >
              Suggest Dataset
            </button>
          </div>
        </div>

        {/* Popular Open Datasets Cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-navy-900 tracking-tight">Popular Open Datasets</h2>
              <p className="text-xs text-text-secondary">Free to download under the Abu Dhabi Open Data Licence</p>
            </div>
            <Link to="/catalogue" className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1">
              <span>View full catalogue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {openDatasets.map((ds) => (
              <div key={ds.id} className="bg-white rounded-2xl border border-border p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-colors">
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {ds.category}
                    </span>
                    <span className="text-text-muted font-mono">{ds.downloads} downloads</span>
                  </div>

                  <h3 className="text-base font-bold text-navy-900">{ds.title}</h3>
                  <div className="text-xs text-text-secondary mt-0.5">{ds.publisher}</div>
                  <p className="text-xs text-text-secondary mt-2 leading-relaxed">{ds.desc}</p>
                </div>

                <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    {ds.formats.map((fmt) => (
                      <span key={fmt} className="px-2 py-0.5 rounded bg-canvas-subtle border border-border text-[10px] font-mono">
                        {fmt}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownload(ds.title, 'GeoJSON')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <DownloadSimple className="w-3.5 h-3.5" />
                      <span>Download GeoJSON</span>
                    </button>
                    <button
                      onClick={() => handleDownload(ds.title, 'CSV')}
                      className="px-3 py-1.5 rounded-lg border border-border hover:bg-canvas font-medium text-xs transition-colors"
                    >
                      CSV
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Developer Section */}
        <section id="developers" className="bg-white rounded-2xl border border-border p-8 shadow-xs space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Developer Ecosystem</span>
            <h2 className="text-xl font-bold text-navy-900 mt-1">Open APIs & Integration Toolkits</h2>
            <p className="text-xs text-text-secondary mt-1 leading-relaxed">
              Build civic mobile applications, municipal dashboards, and analytical workflows using OGC API Features and modern REST endpoints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-canvas border border-border space-y-2">
              <CodeBlock className="w-6 h-6 text-emerald-600" />
              <h4 className="font-bold text-navy-900 text-sm">OpenAPI & Swagger Specs</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Standard OpenAPI 3.0 documentation for spatial queries with live Postman collections.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-canvas border border-border space-y-2">
              <Globe className="w-6 h-6 text-blue-600" />
              <h4 className="font-bold text-navy-900 text-sm">Open-Source SDKs</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Python (GeoPandas), JavaScript (MapLibre/Leaflet), and R libraries for rapid spatial integration.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-canvas border border-border space-y-2">
              <FileText className="w-6 h-6 text-purple-600" />
              <h4 className="font-bold text-navy-900 text-sm">Entity Onboarding Guide</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Step-by-step instructions for contributing agencies to publish open datasets into the portal.
              </p>
            </div>
          </div>
        </section>

        {/* GeoHack 2028 Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-navy-900 to-navy-800 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-navy-700 shadow-md">
          <div className="space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-400 font-bold text-[10px] uppercase border border-gold-500/30">
              Registrations Open
            </span>
            <h3 className="text-xl font-bold">Abu Dhabi GeoHack 2028</h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Join 500+ developers, data scientists, and urban planners solving real sustainability, mobility, and climate challenges using open AD-SDI datasets.
            </p>
          </div>

          <button
            onClick={() => setModalType('geohack')}
            className="px-5 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold text-xs shrink-0 shadow-md transition-colors"
          >
            Register for GeoHack 2028
          </button>
        </div>
      </div>

      {/* Modals for GeoHack, Suggest, Report Issue */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-border space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-bold text-navy-900">
                {modalType === 'geohack' ? 'GeoHack 2028 Registration' : modalType === 'suggest' ? 'Suggest a Dataset' : 'Report a Data Issue'}
              </h3>
              <button onClick={() => { setModalType(null); setModalSuccess(false); }} className="text-text-muted hover:text-navy-900">
                <X className="w-4 h-4" />
              </button>
            </div>

            {!modalSuccess ? (
              <form onSubmit={(e) => { e.preventDefault(); setModalSuccess(true); }} className="space-y-3 text-xs">
                <div>
                  <label className="block text-navy-900 font-semibold mb-1">Your Full Name</label>
                  <input required type="text" placeholder="Omar Al Nuaimi" className="w-full p-2 bg-canvas border border-border rounded-lg" />
                </div>
                <div>
                  <label className="block text-navy-900 font-semibold mb-1">Email Address</label>
                  <input required type="email" placeholder="omar@domain.ae" className="w-full p-2 bg-canvas border border-border rounded-lg" />
                </div>
                <div>
                  <label className="block text-navy-900 font-semibold mb-1">Details & Description</label>
                  <textarea rows={3} required placeholder="Provide context..." className="w-full p-2 bg-canvas border border-border rounded-lg" />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setModalType(null)} className="px-3 py-1.5 rounded-lg border border-border">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold">
                    Submit
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4 space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <div className="font-bold text-navy-900 text-sm">Submission Received</div>
                <p className="text-xs text-text-secondary">Your submittal has been logged for review by the Open Data team.</p>
                <button onClick={() => setModalType(null)} className="mt-3 px-4 py-1.5 rounded-lg bg-navy-900 text-white text-xs font-semibold">
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
