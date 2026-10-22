import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useLanguage } from '../context/LanguageContext';
import {
  CodeBlock,
  Terminal,
  Copy,
  Check,
  ArrowRight,
  Globe,
  Key,
  ShieldCheck,
  Lightning,
  FileText,
  Sparkle,
  DownloadSimple,
  ArrowSquareOut,
  BookOpen,
  Cpu,
  Stack,
  CheckCircle,
  MagnifyingGlass,
  ShareNetwork,
} from '@phosphor-icons/react';

export const S15_Developers: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'curl' | 'js' | 'python' | 'r'>('curl');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [showSandboxModal, setShowSandboxModal] = useState(false);
  const [sandboxSuccess, setSandboxSuccess] = useState(false);

  const codeSnippets = {
    curl: `# 1. Authenticate & fetch Land Parcels via OGC API Features
curl -X GET "https://gateway.sdi.abudhabi.ae/ogc/features/v1/collections/land_parcels/items?limit=10" \\
  -H "Authorization: Bearer <YOUR_ADSDI_API_KEY>" \\
  -H "Accept: application/geo+json" \\
  -H "X-Client-Entity: DMT-CitizenApp"`,
    js: `// Using @adsdi/web-sdk or standard Fetch with MapLibre GL
import { ADSDIClient } from '@adsdi/web-sdk';

const client = new ADSDIClient({
  apiKey: process.env.ADSDI_API_KEY,
  environment: 'production' // or 'sandbox'
});

// Stream GeoJSON features directly into map source
const parcels = await client.features.getItems('land_parcels', {
  bbox: [54.30, 24.40, 54.45, 24.52], // Abu Dhabi Island extent
  limit: 100
});

map.addSource('parcels', {
  type: 'geojson',
  data: parcels
});`,
    python: `# Python 3.10+ with geopandas and requests
import geopandas as gpd
import requests

url = "https://gateway.sdi.abudhabi.ae/ogc/features/v1/collections/public_transport/items"
headers = {
    "Authorization": "Bearer YOUR_ADSDI_API_KEY",
    "Accept": "application/geo+json"
}

response = requests.get(url, headers=headers, params={"limit": 500})
gdf = gpd.read_file(response.text)

print(f"Loaded {len(gdf)} public transport stops into GeoDataFrame.")
gdf.to_crs(epsg=32640).plot() # UTM Zone 40N (UAE National Grid)`,
    r: `# R (sf & httr2)
library(sf)
library(httr2)

req <- request("https://gateway.sdi.abudhabi.ae/ogc/features/v1/collections/environmental_habitats/items") |>
  req_headers(
    Authorization = "Bearer YOUR_ADSDI_API_KEY",
    Accept = "application/geo+json"
  ) |>
  req_url_query(limit = 100)

resp <- req_perform(req)
habitats_sf <- read_sf(resp_body_string(resp))
summary(habitats_sf)`
  };

  const jsonResponsePreview = `{
  "type": "FeatureCollection",
  "numberMatched": 142850,
  "numberReturned": 2,
  "timeStamp": "2027-10-21T12:00:00Z",
  "features": [
    {
      "type": "Feature",
      "id": "PARCEL-AD-2027-00918",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[54.3671, 24.4821], [54.3685, 24.4822], [54.3684, 24.4809], [54.3670, 24.4808], [54.3671, 24.4821]]]
      },
      "properties": {
        "zone_code": "C12_COMMERCIAL",
        "municipality": "Abu Dhabi City",
        "sector": "Al Danah",
        "verified": true,
        "crs": "EPSG:32640"
      }
    }
  ]
}`;

  const apis = [
    {
      id: 'api-1',
      name: 'OGC API – Features (Core Cadastre)',
      category: 'features',
      standard: 'OGC API 1.0 / WFS 3.0',
      version: 'v1.4.2',
      endpoint: 'https://gateway.sdi.abudhabi.ae/ogc/features/v1',
      desc: 'Query, filter, and stream vector feature collections including land parcels, administrative boundaries, and zoning.',
      auth: 'API Key / OAuth2',
      latency: '38ms',
      status: 'Operational',
      isPublic: true,
    },
    {
      id: 'api-2',
      name: 'Web Map Service (WMS) — Abu Dhabi Basemap',
      category: 'tiles',
      standard: 'WMS 1.3.0',
      version: 'v2.1.0',
      endpoint: 'https://gateway.sdi.abudhabi.ae/wms/basemap',
      desc: 'High-speed cached cartographic tiles and georeferenced raster renders in English and Arabic typography.',
      auth: 'Public / Open',
      latency: '24ms',
      status: 'Operational',
      isPublic: true,
    },
    {
      id: 'api-3',
      name: 'WMTS — High-Resolution Aerial & Coastal Orthos',
      category: 'tiles',
      standard: 'WMTS 1.0.0',
      version: 'v2027.1',
      endpoint: 'https://gateway.sdi.abudhabi.ae/wmts/imagery2027',
      desc: '5cm Emirate-wide aerial photography, satellite sensor mosaics, and coastal bathymetry raster pyramid.',
      auth: 'Government DSA / Key',
      latency: '32ms',
      status: 'Operational',
      isPublic: false,
    },
    {
      id: 'api-4',
      name: 'GeoAI Real-time Feature Inference API',
      category: 'geoai',
      standard: 'REST OpenAPI 3.0',
      version: 'v3.0-rc2',
      endpoint: 'https://gateway.sdi.abudhabi.ae/ai/v1/inference',
      desc: 'Submit satellite or drone GeoTIFF bounding boxes for automated building footprint extraction and solar canopy detection.',
      auth: 'OAuth2 Partner Key',
      latency: '115ms',
      status: 'Operational',
      isPublic: false,
    },
    {
      id: 'api-5',
      name: 'Onwani Unified Geocoding & Address API',
      category: 'search',
      standard: 'REST OpenAPI 3.0',
      version: 'v2.0.4',
      endpoint: 'https://gateway.sdi.abudhabi.ae/onwani/v2/geocode',
      desc: 'Forward and reverse geocoding against the official Emirate Onwani street naming and building numbering system.',
      auth: 'API Key',
      latency: '18ms',
      status: 'Operational',
      isPublic: true,
    },
    {
      id: 'api-6',
      name: '3D Tiles LoD2 Streaming Gateway',
      category: '3d',
      standard: 'OGC 3D Tiles 1.1',
      version: 'v1.1.0',
      endpoint: 'https://gateway.sdi.abudhabi.ae/3dtiles/citywide',
      desc: 'Hierarchical 3D mesh streaming of Abu Dhabi city models, bridges, and infrastructure landmarks for Cesium & Unreal Engine.',
      auth: 'Commercial / DSA',
      latency: '82ms',
      status: 'Operational',
      isPublic: false,
    },
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyEndpoint = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedEndpoint(url);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const filteredApis = apis.filter((api) => {
    const matchesCategory = selectedCategory === 'all' || api.category === selectedCategory;
    const matchesSearch =
      api.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      api.desc.toLowerCase().includes(searchFilter.toLowerCase()) ||
      api.endpoint.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-canvas font-sans antialiased text-text-primary">
      <Header />

      <main className="flex-1">
        {/* Developer Portal Hero Section with Sovereign Navy Coastal Image Blend */}
        <section
          className="relative text-white overflow-hidden py-14 lg:py-20 border-b border-[#13315C]"
          style={{ backgroundColor: '#0B2545' }}
        >
          {/* Authentic Abu Dhabi Aerial Coastal Backdrop */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src="/abu-dhabi-aerial-coastal.jpg"
              alt="Abu Dhabi Geospatial Infrastructure"
              className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B2545]/95 via-[#0B2545]/85 to-[#0B2545]/70"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545] via-transparent to-[#0B2545]/70"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                {/* Authority Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800/80 border border-blue-400/30 text-xs text-gold-400 font-semibold mb-4 backdrop-blur-xs shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>AD-SDI Developer Gateway • API v3.0</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                  {language === 'ar' ? 'بوابة المطورين للبيانات المكانية' : 'AD-SDI Developer Portal'}
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-8">
                  {language === 'ar'
                    ? 'ابنِ تطبيقات مكانية متقدمة وحلول الذكاء الاصطناعي الجغرافي بالاعتماد على واجهات برمجة التطبيقات الرسمية والمعايير العالمية المعتمدة لإمارة أبوظبي.'
                    : "Build next-generation civic mobile apps, AI spatial pipelines, and enterprise systems using Abu Dhabi's authoritative OGC APIs, REST endpoints, and client SDKs."}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setShowSandboxModal(true)}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md active:scale-[0.99]"
                  >
                    <Key className="w-4 h-4 text-gold-300" />
                    <span>{language === 'ar' ? 'طلب مفتاح تجريبي / بيئة الاختبار' : 'Get API Key / Sandbox Access'}</span>
                  </button>

                  <a
                    href="#code-quickstart"
                    className="px-5 py-2.5 rounded-xl bg-navy-800/90 hover:bg-navy-700 border border-blue-400/30 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xs"
                  >
                    <CodeBlock className="w-4 h-4 text-blue-400" />
                    <span>{language === 'ar' ? 'دليل البدء السريع' : 'Quickstart Guide'}</span>
                  </a>

                  <a
                    href="#api-directory"
                    className="px-4 py-2.5 rounded-xl bg-transparent hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs transition-colors"
                  >
                    <span>{language === 'ar' ? 'تصفح أكثر من 1,150 خدمة ↓' : 'Browse 1,150+ Services ↓'}</span>
                  </a>
                </div>
              </div>

              {/* Live Gateway Metrics Card */}
              <div className="w-full lg:w-80 rounded-2xl bg-navy-800/90 border border-[#1A427A] p-5 backdrop-blur-md shadow-xl space-y-4 shrink-0">
                <div className="flex items-center justify-between border-b border-[#1A427A] pb-3">
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    {language === 'ar' ? 'حالة البوابة' : 'Gateway Status'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {language === 'ar' ? 'تعمل بكفاءة' : 'Operational'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-navy-900/60 border border-[#1A427A]/60">
                    <div className="text-[11px] text-slate-400">{language === 'ar' ? 'زمن الاستجابة P95' : 'P95 Latency'}</div>
                    <div className="text-lg font-bold text-white font-mono mt-0.5">38ms</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-navy-900/60 border border-[#1A427A]/60">
                    <div className="text-[11px] text-slate-400">{language === 'ar' ? 'مستوى الخدمة' : 'Monthly SLA'}</div>
                    <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">99.98%</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-navy-900/60 border border-[#1A427A]/60">
                    <div className="text-[11px] text-slate-400">{language === 'ar' ? 'طبقات مفتوحة' : 'Open Features'}</div>
                    <div className="text-lg font-bold text-white font-mono mt-0.5">640+</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-navy-900/60 border border-[#1A427A]/60">
                    <div className="text-[11px] text-slate-400">{language === 'ar' ? 'مطور نشط' : 'Active Devs'}</div>
                    <div className="text-lg font-bold text-gold-400 font-mono mt-0.5">520+</div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                  <span>{language === 'ar' ? 'عنقود GeoServer & OGC' : 'GeoServer & OGC Cluster'}</span>
                  <span className="font-mono text-slate-300">v2.24-enterprise</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Code Sandbox / Quickstart Section */}
        <section id="code-quickstart" className="py-12 bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  {language === 'ar' ? 'البدء السريع للمطورين' : 'Developer Quickstart'}
                </span>
                <h2 className="text-2xl font-bold text-navy-900 mt-1">
                  {language === 'ar' ? 'أمثلة برمجية تفاعلية' : 'Interactive Code Snippets'}
                </h2>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">
                  {language === 'ar'
                    ? 'اربط تطبيقك الخرائطي أو مسار البيانات بثلاثة أسطر برمجية بالاعتماد على معايير OGC API الرسمية.'
                    : 'Connect your frontend map or data pipeline in 3 lines of code using official OGC API standards.'}
                </p>
              </div>

              {/* Language Selector */}
              <div className="flex items-center gap-1 p-1 bg-canvas rounded-xl border border-border">
                {[
                  { id: 'curl', label: 'cURL / Shell' },
                  { id: 'js', label: 'JavaScript / TS' },
                  { id: 'python', label: 'Python (GeoPandas)' },
                  { id: 'r', label: 'R (sf)' },
                ].map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setActiveTab(lang.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === lang.id
                        ? 'bg-navy-900 text-white shadow-xs'
                        : 'text-text-secondary hover:text-navy-900'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Code Box */}
              <div className="lg:col-span-7 rounded-2xl bg-navy-950 border border-navy-800 text-slate-100 overflow-hidden shadow-lg flex flex-col">
                <div className="flex items-center justify-between px-4 py-3 bg-navy-900/90 border-b border-navy-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                    <span className="font-mono text-[11px] text-slate-400 ml-2" dir="ltr">
                      {activeTab === 'curl' && 'bash — cURL'}
                      {activeTab === 'js' && 'main.ts — TypeScript'}
                      {activeTab === 'python' && 'pipeline.py — Python 3.10'}
                      {activeTab === 'r' && 'analysis.R — R Studio'}
                    </span>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-navy-800 hover:bg-navy-700 text-slate-200 text-[11px] font-semibold transition-colors"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">{language === 'ar' ? 'تم النسخ!' : 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>{language === 'ar' ? 'نسخ الكود' : 'Copy Code'}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 sm:p-5 font-mono text-xs leading-relaxed overflow-x-auto flex-1 bg-[#07182F]" dir="ltr">
                  <pre className="text-blue-300 whitespace-pre text-left">
                    {codeSnippets[activeTab]}
                  </pre>
                </div>

                <div className="px-4 py-2.5 bg-navy-900/60 border-t border-navy-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    {language === 'ar' ? 'تشفير صارم TLS 1.3 • بوابة سيادية لدولة الإمارات' : 'TLS 1.3 Strict • Sovereign UAE Gateway'}
                  </span>
                  <a
                    href="https://swagger.io"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1"
                  >
                    <span>{language === 'ar' ? 'عرض مواصفات Swagger JSON' : 'View Swagger JSON Spec'}</span>
                    <ArrowSquareOut className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Live GeoJSON Response Output Preview */}
              <div className="lg:col-span-5 rounded-2xl bg-white border border-border p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-navy-900">
                        {language === 'ar' ? 'مخرجات OGC GeoJSON القياسية' : 'Standard OGC GeoJSON Output'}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      HTTP 200 OK
                    </span>
                  </div>

                  <p className="text-xs text-text-secondary mt-3 mb-3">
                    {language === 'ar'
                      ? 'تُرجع جميع مجموعات المتجهات بيانات GeoJSON قياسية وصحيحة وفق RFC 7946 بنظام EPSG:4326 أو EPSG:32640 الوطني.'
                      : 'All vector collections return clean, validated RFC 7946 GeoJSON with native EPSG:4326 (WGS84) or EPSG:32640 (UTM 40N) coordinates.'}
                  </p>

                  <div className="p-3 bg-canvas rounded-xl font-mono text-[11px] text-navy-900 overflow-x-auto max-h-64 border border-border" dir="ltr">
                    <pre className="text-slate-800 text-left">{jsonResponsePreview}</pre>
                  </div>
                </div>

                <div className="pt-4 border-t border-border mt-4 flex items-center justify-between">
                  <div className="text-xs text-text-secondary font-medium">
                    {language === 'ar' ? 'جاهز للاختبار عبر Postman؟' : 'Ready to test with Postman?'}
                  </div>
                  <button
                    onClick={() => alert('AD-SDI Postman Collection downloaded (v2.1).')}
                    className="px-3 py-1.5 rounded-lg border border-border bg-canvas hover:bg-slate-100 text-navy-900 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <DownloadSimple className="w-3.5 h-3.5 text-blue-600" />
                    <span>{language === 'ar' ? 'تنزيل ملفات Postman' : 'Download Postman Collection'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* API Gateway Directory */}
        <section id="api-directory" className="py-14 bg-canvas border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  {language === 'ar' ? 'البوابة الرسمية' : 'Authoritative Gateway'}
                </span>
                <h2 className="text-2xl font-bold text-navy-900 mt-1">
                  {language === 'ar' ? 'دليل واجهات برمجة التطبيقات والخدمات المكانية' : 'Spatial APIs & Services Directory'}
                </h2>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">
                  {language === 'ar'
                    ? 'استكشف نقاط النهاية المعتمدة وفق معايير البيانات المكانية الأساسية لإمارة أبوظبي (FGDS).'
                    : 'Explore endpoints certified against Abu Dhabi Fundamental Geospatial Data Standards (FGDS).'}
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder={language === 'ar' ? 'تصفية الواجهات، الصيغ، الطبقات...' : 'Filter APIs, formats, layers...'}
                  className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-2 text-xs bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 text-navy-900 shadow-xs"
                />
                <MagnifyingGlass className="w-4 h-4 text-slate-400 absolute left-3 rtl:left-auto rtl:right-3 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 text-xs">
              {[
                { id: 'all', label: language === 'ar' ? 'جميع الخدمات (6)' : 'All Services (6)' },
                { id: 'features', label: language === 'ar' ? 'واجهة المعالم OGC' : 'OGC API Features' },
                { id: 'tiles', label: language === 'ar' ? 'بلاطات الخرائط و WMTS' : 'Map Tiles & WMTS' },
                { id: 'geoai', label: language === 'ar' ? 'استدلال الذكاء الاصطناعي' : 'GeoAI Inference' },
                { id: 'search', label: language === 'ar' ? 'الترميز الجغرافي والبحث' : 'Geocoding & Search' },
                { id: '3d', label: language === 'ar' ? 'بلاطات ثلاثية الأبعاد' : '3D Tiles & Mesh' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setSelectedCategory(pill.id)}
                  className={`px-3.5 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === pill.id
                      ? 'bg-navy-900 text-white shadow-xs'
                      : 'bg-white border border-border text-text-secondary hover:text-navy-900 hover:bg-slate-50'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* API Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
              {filteredApis.map((api) => (
                <div
                  key={api.id}
                  className="bg-white rounded-2xl border border-border p-5 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-[11px] font-mono font-bold text-navy-900 bg-canvas px-2 py-0.5 rounded border border-border">
                          {api.standard}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">{api.version}</span>
                    </div>

                    <h3 className="font-bold text-navy-900 text-sm group-hover:text-blue-600 transition-colors leading-snug mb-1.5">
                      {api.name}
                    </h3>

                    <p className="text-xs text-text-secondary leading-relaxed mb-4">
                      {api.desc}
                    </p>

                    <div className="p-2.5 bg-canvas rounded-xl font-mono text-[11px] text-slate-700 flex items-center justify-between gap-2 border border-border mb-3">
                      <span className="truncate" dir="ltr">{api.endpoint}</span>
                      <button
                        onClick={() => handleCopyEndpoint(api.endpoint)}
                        className="text-slate-400 hover:text-navy-900 shrink-0"
                        title="Copy endpoint"
                      >
                        {copiedEndpoint === api.endpoint ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-[11px] text-text-secondary font-medium">
                      {language === 'ar' ? 'المصادقة: ' : 'Auth: '}
                      <span className="font-semibold text-navy-900">{api.auth}</span>
                    </span>
                    <span className="font-mono text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                      {api.latency}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Client SDKs & Tools */}
        <section className="py-14 bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                {language === 'ar' ? 'منظومة المطورين' : 'Developer Ecosystem'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mt-1">
                {language === 'ar' ? 'المكتبات وحزم تطوير البرمجيات الرسمية (SDKs)' : 'Official Client Libraries & SDKs'}
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary mt-1">
                {language === 'ar'
                  ? 'حزم برمجية جاهزة مهيأة مسبقاً بالمصادقة وإعادة المحاولة التلقائية ودعم اتجاه النص العربي (RTL).'
                  : 'Zero-boilerplate packages pre-configured with authentication, automatic spatial retry logic, and Arabic RTL support.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-canvas border border-border space-y-4 hover:border-blue-300 transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <CodeBlock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 text-base">@adsdi/web-sdk</h3>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                    TypeScript client for MapLibre GL, Leaflet, and OpenLayers with auto-token rotation and vector tile caching.
                  </p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-border font-mono text-xs text-slate-800 flex items-center justify-between" dir="ltr">
                  <span>npm i @adsdi/web-sdk</span>
                  <button onClick={() => { navigator.clipboard.writeText('npm i @adsdi/web-sdk'); alert('Command copied'); }}>
                    <Copy className="w-3.5 h-3.5 text-slate-400 hover:text-navy-900" />
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-canvas border border-border space-y-4 hover:border-emerald-300 transition-all">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 text-base">adsdi-geokit (Python)</h3>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                    Native Python interface for Jupyter notebooks, GeoPandas, rasterio, and direct GeoAI inference integration.
                  </p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-border font-mono text-xs text-slate-800 flex items-center justify-between" dir="ltr">
                  <span>pip install adsdi-geokit</span>
                  <button onClick={() => { navigator.clipboard.writeText('pip install adsdi-geokit'); alert('Command copied'); }}>
                    <Copy className="w-3.5 h-3.5 text-slate-400 hover:text-navy-900" />
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-canvas border border-border space-y-4 hover:border-purple-300 transition-all">
                <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                  <Stack className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 text-base">QGIS / ArcGIS Connector</h3>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                    Official desktop GIS plugins providing one-click access to all authenticated Abu Dhabi government data layers.
                  </p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-border font-mono text-xs text-slate-800 flex items-center justify-between" dir="ltr">
                  <span>Plugin v2.4.1 (ZIP)</span>
                  <button onClick={() => alert('Downloading AD-SDI QGIS Plugin...')}>
                    <DownloadSimple className="w-3.5 h-3.5 text-purple-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GeoHack 2028 Banner */}
        <section className="py-12 bg-canvas">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white p-8 sm:p-10 border border-navy-700 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="space-y-3 relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-bold border border-gold-500/30">
                  <Sparkle className="w-3.5 h-3.5" />
                  <span>
                    {language === 'ar' ? 'التسجيل مفتوح • جوائز بقيمة 250,000 درهم' : 'Registrations Open • AED 250,000 Prize Pool'}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {language === 'ar' ? 'هاكاثون أبوظبي للبيانات المكانية 2028' : 'Abu Dhabi GeoHack 2028'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {language === 'ar'
                    ? 'انضم إلى أكثر من 500 مطور وعالم بيانات ومبتكر لمواجهة تحديات الإمارة في التنقل النظيف والجزر الحرارية والبيئة الساحلية باستخدام واجهات AD-SDI.'
                    : 'Join 500+ developers, data scientists, and urban innovators to solve Emirate challenges in clean mobility, urban heat islands, and coastal ecology using AD-SDI APIs.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 shrink-0 w-full sm:w-auto">
                <Link
                  to="/open-data"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold text-xs shadow-md transition-colors text-center"
                >
                  {language === 'ar' ? 'التسجيل في الهاكاثون' : 'Register for GeoHack 2028'}
                </Link>
                <Link
                  to="/catalogue"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-navy-800 hover:bg-navy-700 border border-navy-600 text-white font-semibold text-xs transition-colors text-center"
                >
                  {language === 'ar' ? 'استكشاف مجموعات البيانات' : 'Explore Datasets'}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Sandbox Request Modal */}
      {showSandboxModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-border space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-navy-900 text-base">
                  {language === 'ar' ? 'إنشاء مفتاح بيئة الاختبار (Sandbox)' : 'Generate Sandbox API Key'}
                </h3>
              </div>
              <button onClick={() => { setShowSandboxModal(false); setSandboxSuccess(false); }} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            {sandboxSuccess ? (
              <div className="py-4 space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-navy-900 text-sm">
                    {language === 'ar' ? 'تم إنشاء المفتاح التجريبي بنجاح!' : 'Sandbox Key Generated!'}
                  </h4>
                  <p className="text-xs text-text-secondary mt-1">
                    {language === 'ar'
                      ? 'مفتاح Sandbox الخاص بك مفعل بحصة شهرية تبلغ 50,000 طلب.'
                      : 'Your sandbox API key is active with a 50,000 monthly request quota.'}
                  </p>
                </div>
                <div className="p-3 bg-canvas rounded-xl font-mono text-xs text-slate-800 border border-border select-all break-all" dir="ltr">
                  adsdi_sb_9f82d1c7e4a05b382901ef
                </div>
                <button
                  onClick={() => { setShowSandboxModal(false); setSandboxSuccess(false); }}
                  className="w-full py-2.5 bg-navy-900 text-white rounded-xl text-xs font-semibold"
                >
                  {language === 'ar' ? 'إغلاق' : 'Done'}
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSandboxSuccess(true);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">
                    {language === 'ar' ? 'اسم المطور أو الجهة' : 'Developer or Entity Name'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Masdar City Smart Mobility Lab"
                    className="w-full px-3 py-2 text-xs border border-border rounded-lg bg-canvas text-navy-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">
                    {language === 'ar' ? 'البريد الإلكتروني المؤسسي' : 'Government or Organization Email'}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="dev@organization.ae"
                    className="w-full px-3 py-2 text-xs border border-border rounded-lg bg-canvas text-navy-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">
                    {language === 'ar' ? 'حالة الاستخدام الرئيسية' : 'Primary Use Case'}
                  </label>
                  <select className="w-full px-3 py-2 text-xs border border-border rounded-lg bg-canvas text-navy-900">
                    <option>{language === 'ar' ? 'تطبيق جوال أو ويب مجتمعي' : 'Civic Mobile / Web Application'}</option>
                    <option>{language === 'ar' ? 'بحث أكاديمي أو علمي' : 'Academic or Scientific Research'}</option>
                    <option>{language === 'ar' ? 'تكامل تجاري ومؤسسي' : 'Commercial Enterprise Integration'}</option>
                    <option>{language === 'ar' ? 'تدريب نماذج الذكاء الاصطناعي الجغرافي' : 'GeoAI Model Training & Validation'}</option>
                  </select>
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                  >
                    {language === 'ar' ? 'إنشاء مفتاح تجريبي فوري' : 'Generate Instant Sandbox Key'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
