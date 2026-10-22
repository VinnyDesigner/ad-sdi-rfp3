import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { useLanguage } from '../context/LanguageContext';
import { KHALIFA_CITY_PARCELS_GEOJSON, KHALIFA_CITY_CENTER } from '../data/geoData';
import {
  CheckCircle,
  Copy,
  Check,
  MapTrifold,
  LockKeyOpen,
  ShareNetwork,
  DownloadSimple,
  ShieldCheck,
  FileText,
  Clock,
  ArrowRight,
  Database,
  ArrowSquareOut,
  Info,
} from '@phosphor-icons/react';

export const S03_DatasetDetail: React.FC = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'metadata' | 'services' | 'quality' | 'lineage' | 'access' | 'versions' | 'audit'>('overview');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [selectedParcel, setSelectedParcel] = useState<any>(KHALIFA_CITY_PARCELS_GEOJSON.features[0].properties);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(id);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const tabs = [
    { id: 'overview', label: isAr ? 'نظرة عامة والخريطة' : 'Overview' },
    { id: 'metadata', label: isAr ? 'البيانات الوصفية' : 'Metadata' },
    { id: 'services', label: isAr ? 'الخدمات والواجهات' : 'Services & APIs' },
    { id: 'quality', label: isAr ? 'الجودة والمطابقة' : 'Quality' },
    { id: 'lineage', label: isAr ? 'المصدر والتتبع' : 'Lineage' },
    { id: 'access', label: isAr ? 'الصلاحيات والترخيص' : 'Access' },
    { id: 'versions', label: isAr ? 'الإصدارات' : 'Versions' },
    { id: 'audit', label: isAr ? 'سجل التدقيق' : 'Audit Trail' },
  ];

  const servicesList = [
    { name: 'OGC API – Features', type: 'WFS3 / OGC', url: 'https://gateway.sdi.abudhabi.ae/ogc/cadastre/collections/parcels/items', status: 'Operational', latency: '68 ms p95' },
    { name: 'Web Map Service (WMS)', type: 'OGC WMS 1.3.0', url: 'https://gateway.sdi.abudhabi.ae/wms/cadastre?service=WMS&request=GetCapabilities', status: 'Operational', latency: '92 ms p95' },
    { name: 'Web Feature Service (WFS)', type: 'OGC WFS 2.0.0', url: 'https://gateway.sdi.abudhabi.ae/wfs/cadastre?service=WFS&request=GetCapabilities', status: 'Operational', latency: '115 ms p95' },
    { name: 'Web Map Tile Service (WMTS)', type: 'OGC WMTS', url: 'https://gateway.sdi.abudhabi.ae/wmts/cadastre/1.0.0/WMTSCapabilities.xml', status: 'Operational', latency: '42 ms p95' },
    { name: 'REST Feature Query API', type: 'GeoJSON REST', url: 'https://gateway.sdi.abudhabi.ae/api/v2/cadastre/parcels/query', status: 'Operational', latency: '54 ms p95' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Header />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-border px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <Link to="/" className="hover:text-blue-600">{isAr ? 'الرئيسية' : 'Home'}</Link>
            <span>/</span>
            <Link to="/catalogue" className="hover:text-blue-600">{isAr ? 'فهرس البيانات المكانية' : 'Geospatial Catalogue'}</Link>
            <span>/</span>
            <span className="font-semibold text-navy-900">{isAr ? 'القطع العقارية (المسح العقاري)' : 'Land Parcels (Cadastre)'}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> {isAr ? 'اجتاز معايير الجودة' : 'Quality Passed'}
            </span>
            <span className="text-[11px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {isAr ? 'حداثة البيانات: منتظمة' : 'Data currency: On schedule'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Card */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              {/* Badges Strip */}
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-800 font-bold border border-blue-200 text-[11px]">
                  {isAr ? 'بيانات أساسية FGDS' : 'FGDS – Fundamental'}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-navy-50 text-navy-800 font-semibold border border-navy-200 text-[11px]">
                  {isAr ? 'مشترك حكومي' : 'Shared – Government'}
                </span>
                <span className="px-2 py-0.5 rounded bg-canvas text-text-secondary border border-border text-[11px]">
                  {isAr ? 'استخدام داخلي' : 'Internal'}
                </span>
                <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 text-[11px]">
                  {isAr ? 'مؤهل لسوق البيانات' : 'Marketplace Eligible'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                {isAr ? 'القطع العقارية وحدود المسح العقاري' : 'Land Parcels (Cadastre)'}
              </h1>

              <div className="flex items-center gap-4 text-xs text-text-secondary flex-wrap">
                <div>
                  <span className="text-text-muted">{isAr ? 'الجهة المسؤولة: ' : 'Custodian: '}</span>
                  <span className="font-semibold text-navy-900">{isAr ? 'دائرة البلديات والنقل (DMT)' : 'Department of Municipalities and Transport (DMT)'}</span>
                </div>
                <span>•</span>
                <div>
                  <span className="text-text-muted">{isAr ? 'مشرف البيانات: ' : 'Data Steward: '}</span>
                  <span className="font-semibold text-navy-900">{isAr ? 'خالد م.' : 'Khalid M.'}</span>
                </div>
                <span>•</span>
                <div>
                  <span className="text-text-muted">{isAr ? 'رمز الترخيص: ' : 'Licence: '}</span>
                  <span className="font-semibold text-blue-600">DSA-2027-014</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {isAr
                  ? 'المسح العقاري الجيومكاني الأساسي المعتمد الذي يمثل كافة القطع العقارية المسجلة وأرقامها وقواعد التخطيط الحضري وهندسة الأراضي والحدود عبر إمارة أبوظبي.'
                  : 'Fundamental authoritative spatial cadastre representing all registered land parcels, parcel identifiers, zoning rules, plot geometry, and boundary marks throughout the Abu Dhabi Emirate.'}
              </p>
            </div>

            {/* Quick Actions Panel */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
              <button
                onClick={() => navigate('/workspace/map-viewer')}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <MapTrifold className="w-4 h-4" />
                <span>{isAr ? 'فتح في مستعرض الخرائط' : 'Open in Map Viewer'}</span>
              </button>

              <button
                onClick={() => navigate('/marketplace/request')}
                className="px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <LockKeyOpen className="w-4 h-4 text-gold-500" />
                <span>{isAr ? 'طلب اشتراك الواجهة API' : 'Request API Access'}</span>
              </button>

              <button
                onClick={() => handleCopy('https://gateway.sdi.abudhabi.ae/ogc/cadastre/collections/parcels/items', 'main-api')}
                className="px-4 py-2.5 rounded-xl border border-border bg-canvas hover:bg-canvas-subtle text-text-primary font-medium text-xs flex items-center justify-center gap-2 transition-colors"
              >
                {copiedUrl === 'main-api' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedUrl === 'main-api' ? (isAr ? 'تم نسخ الرابط!' : 'Copied URL!') : (isAr ? 'نسخ رابط OGC API' : 'Copy OGC API URL')}</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto border-t border-border mt-6 pt-2 text-xs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                    : 'text-text-secondary hover:text-navy-900 hover:bg-canvas'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Map Preview & Selected Feature */}
            <div className="lg:col-span-2 space-y-6">
              {/* Interactive Cadastre Map Preview */}
              <div className="bg-white rounded-2xl border border-border p-4 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                      {isAr ? 'النطاق الجغرافي والمعاينة التفاعلية للقطع العقارية (مدينة خليفة)' : 'Geographic Footprint & Interactive Parcel Inspection (Khalifa City)'}
                    </h3>
                  </div>
                  <span className="text-[11px] text-text-secondary">{isAr ? 'انقر على مضلع القطعة العقارية للمعاينة' : 'Click parcel polygon to inspect'}</span>
                </div>

                <div className="w-full h-96 rounded-xl overflow-hidden border border-border relative">
                  <InteractiveMap
                    center={KHALIFA_CITY_CENTER}
                    zoom={15}
                    height="100%"
                    geoJsonData={KHALIFA_CITY_PARCELS_GEOJSON}
                    selectedFeatureId={selectedParcel?.parcelId}
                    onFeatureClick={(props) => setSelectedParcel(props)}
                  />
                </div>

                {/* Selected Feature Card */}
                {selectedParcel && (
                  <div className="mt-4 p-3.5 rounded-xl bg-canvas border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-blue-600">{isAr ? 'المعلم العقاري المحدد' : 'Selected Parcel Feature'}</div>
                      <div className="font-bold text-navy-900 text-sm">{selectedParcel.parcelId}</div>
                      <div className="text-text-secondary mt-0.5">{selectedParcel.sector} • {selectedParcel.zoning}</div>
                    </div>
                    <div className="flex items-center gap-4 text-[11px]">
                      <div>
                        <span className="text-text-muted">{isAr ? 'المساحة: ' : 'Area: '}</span>
                        <span className="font-mono font-bold text-navy-900">{selectedParcel.areaSqm?.toLocaleString()} {isAr ? 'م²' : 'm²'}</span>
                      </div>
                      <div>
                        <span className="text-text-muted">{isAr ? 'المشرف: ' : 'Steward: '}</span>
                        <span className="font-semibold text-navy-900">{isAr ? 'خالد م. (DMT)' : selectedParcel.steward}</span>
                      </div>
                      <div>
                        <span className="text-text-muted">{isAr ? 'تاريخ المسح: ' : 'Surveyed: '}</span>
                        <span className="font-medium text-navy-900">{selectedParcel.lastSurvey}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Data Lineage Summary */}
              <div className="bg-white rounded-2xl border border-border p-6 shadow-xs">
                <h3 className="text-sm font-bold text-navy-900 mb-4">
                  {isAr ? 'خط النشر المؤتمت والمصدر (Lineage)' : 'Automated Publishing Pipeline & Lineage'}
                </h3>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center text-xs">
                  <div className="p-3 rounded-xl bg-canvas border border-border w-full sm:w-auto">
                    <div className="font-bold text-navy-900">{isAr ? 'المسح العقاري المصدر (DMT)' : 'DMT Source Cadastre'}</div>
                    <div className="text-[10px] text-text-secondary">{isAr ? 'قاعدة بيانات GIS المؤسسية' : 'Enterprise GIS DB'}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-600 rotate-90 sm:rotate-0 rtl:rotate-180" />
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 w-full sm:w-auto">
                    <div className="font-bold">{isAr ? 'بوابة الجودة' : 'Quality Gateway'}</div>
                    <div className="text-[10px]">{isAr ? 'تم التحقق من الطوبولوجيا ونظام الإسناد' : 'Topology & CRS Verified'}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-600 rotate-90 sm:rotate-0 rtl:rotate-180" />
                  <div className="p-3 rounded-xl bg-canvas border border-border w-full sm:w-auto">
                    <div className="font-bold text-navy-900">{isAr ? 'اعتماد المشرف' : 'Custodian Approval'}</div>
                    <div className="text-[10px] text-text-secondary">{isAr ? 'خالد م. (DMT)' : 'Khalid M. (DMT)'}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-600 rotate-90 sm:rotate-0 rtl:rotate-180" />
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 w-full sm:w-auto">
                    <div className="font-bold">{isAr ? 'مستودع AD-SDI الرقمي' : 'AD-SDI Clearinghouse'}</div>
                    <div className="text-[10px]">{isAr ? '23 خدمة تابعة' : '23 Downstream Services'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Key Facts & Quality Scorecard */}
            <div className="space-y-6">
              {/* Key Facts Card */}
              <div className="bg-white rounded-2xl border border-border p-6 shadow-xs">
                <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4 border-b border-border pb-2">
                  {isAr ? 'الحقائق الفنية الرئيسية' : 'Key Technical Facts'}
                </h3>

                <dl className="space-y-3 text-xs">
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <dt className="text-text-muted">{isAr ? 'نظام الإسناد الإحداثي' : 'Coordinate Reference System'}</dt>
                    <dd className="font-mono font-bold text-navy-900">EPSG:32640 (UTM 40N)</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <dt className="text-text-muted">{isAr ? 'النطاق الجغرافي' : 'Geographic Extent'}</dt>
                    <dd className="font-medium text-navy-900">{isAr ? 'إمارة أبوظبي' : 'Abu Dhabi Emirate'}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <dt className="text-text-muted">{isAr ? 'إجمالي المعالم' : 'Total Features'}</dt>
                    <dd className="font-mono font-bold text-blue-600">{isAr ? '412,380 قطعة عقارية' : '412,380 parcels'}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <dt className="text-text-muted">{isAr ? 'دورية التحديث' : 'Update Frequency'}</dt>
                    <dd className="font-medium text-navy-900">{isAr ? 'شهرياً' : 'Monthly'}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <dt className="text-text-muted">{isAr ? 'آخر تحديث' : 'Last Updated'}</dt>
                    <dd className="font-medium text-navy-900">{isAr ? '1 سبتمبر 2027' : '1 Sep 2027'}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <dt className="text-text-muted">{isAr ? 'المزامنة القادمة المجدولة' : 'Next Scheduled Sync'}</dt>
                    <dd className="font-medium text-navy-900">{isAr ? '1 أكتوبر 2027' : '1 Oct 2027'}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <dt className="text-text-muted">{isAr ? 'حالة دورة الحياة' : 'Lifecycle State'}</dt>
                    <dd className="font-semibold text-emerald-600">{isAr ? 'بيئة إنتاج نشطة' : 'Active Production'}</dd>
                  </div>
                  <div className="flex justify-between py-1">
                    <dt className="text-text-muted">{isAr ? 'بيانات وصفية ISO 19115' : 'ISO 19115 Metadata'}</dt>
                    <dd className="font-semibold text-blue-600">{isAr ? 'مكتمل بنسبة 100%' : '100% Complete'}</dd>
                  </div>
                </dl>
              </div>

              {/* Quality Checks Card */}
              <div className="bg-white rounded-2xl border border-border p-6 shadow-xs">
                <div className="flex items-center justify-between mb-3 border-b border-border pb-2">
                  <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider">
                    {isAr ? 'فحوصات التحقق من الجودة' : 'Quality Validation Checks'}
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {isAr ? 'اجتاز بنجاح (100%)' : 'Passed (100%)'}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  {[
                    { name: isAr ? 'التحقق من المخطط' : 'Schema Validation', detail: isAr ? 'معيار المسح العقاري FGDS v2.4' : 'FGDS Cadastre Standard v2.4' },
                    { name: isAr ? 'سلامة المعالم الهندسية' : 'Geometry Integrity', detail: isAr ? 'خالٍ من المضلعات الضئيلة والتقاطعات الذاتية' : 'Zero slivers, zero self-intersections' },
                    { name: isAr ? 'قواعد الطوبولوجيا' : 'Topology Rules', detail: isAr ? 'عدم التداخل وعدم وجود فجوات' : 'Must Not Overlap, Must Not Have Gaps' },
                    { name: isAr ? 'نطاقات السمات' : 'Attribute Domains', detail: isAr ? 'رموز قطاعات ومناطق صالحة' : 'Valid sector & zoning codes' },
                    { name: isAr ? 'الإسناد المكاني' : 'Spatial Reference', detail: isAr ? 'مطابقة صارمة لنظام EPSG:32640' : 'Strict EPSG:32640 alignment' },
                    { name: isAr ? 'اكتمال البيانات الوصفية' : 'Metadata Completeness', detail: isAr ? 'جميع العناصر الإلزامية متوفرة' : 'All mandatory elements present' },
                  ].map((chk) => (
                    <div key={chk.name} className="flex items-center justify-between p-2 rounded-lg bg-canvas-subtle">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-semibold text-navy-900">{chk.name}</span>
                      </div>
                      <span className="text-[10px] text-text-secondary">{chk.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="bg-white rounded-2xl border border-border p-6 shadow-xs space-y-6">
            <div>
              <h3 className="text-base font-bold text-navy-900">{isAr ? 'الخدمات والواجهات المكانية المتاحة' : 'Available Spatial Services & APIs'}</h3>
              <p className="text-xs text-text-secondary mt-1">
                {isAr
                  ? 'نقاط اتصال مباشرة مهيأة بحدود الاستخدام والمصادقة وفقاً لصلاحياتك الحكومية.'
                  : 'Direct endpoints configured with rate limits and authentication according to your government credentials.'}
              </p>
            </div>

            <div className="divide-y divide-border">
              {servicesList.map((svc, i) => (
                <div key={svc.name} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-navy-900">{svc.name}</span>
                      <span className="text-[10px] px-2 py-0.2 rounded bg-canvas border border-border text-text-secondary">
                        {svc.type}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        {isAr ? 'يعمل بكفاءة' : svc.status}
                      </span>
                    </div>
                    <div className="font-mono text-[11px] text-text-secondary mt-1 break-all select-all text-left" dir="ltr">
                      {svc.url}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[11px] font-mono text-text-muted">{svc.latency}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(svc.url, `svc-${i}`)}
                      className="px-3 py-1.5 rounded-lg border border-border hover:bg-canvas font-medium flex items-center gap-1.5 transition-colors"
                    >
                      {copiedUrl === `svc-${i}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedUrl === `svc-${i}` ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ الرابط' : 'Copy URL')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'metadata' && (
          <div className="bg-white rounded-2xl border border-border p-6 shadow-xs space-y-4 text-xs">
            <h3 className="text-base font-bold text-navy-900">{isAr ? 'الملف التعريفي للبيانات الوصفية المكانية ISO 19115' : 'ISO 19115 Geospatial Metadata Profile'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-canvas border border-border">
                <div className="font-bold text-navy-900 mb-2">{isAr ? 'معلومات التعريف' : 'Identification Information'}</div>
                <p className="text-text-secondary leading-relaxed">
                  {isAr ? (
                    <>
                      المسمى الرسمي: نسيج القطع العقارية لإمارة أبوظبي v2027.09<br />
                      الملخص: مسح القطع العقارية المعتمدة تحت الاختصاص البلدي لـ DMT.<br />
                      الحالة: مكتمل / مراجعة دورية شهرية مستمرة.<br />
                      فئة الموضوع: التخطيط والمسح العقاري، الحدود الإدارية.
                    </>
                  ) : (
                    <>
                      Official Title: Abu Dhabi Emirate Cadastral Parcel Fabric v2027.09<br />
                      Abstract: Authoritative survey parcels under DMT municipal jurisdiction.<br />
                      Status: Completed / On-going monthly revision.<br />
                      Topic Category: PlanningCadastre, Boundaries.
                    </>
                  )}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-canvas border border-border">
                <div className="font-bold text-navy-900 mb-2">{isAr ? 'التمثيل المكاني' : 'Spatial Representation'}</div>
                <p className="text-text-secondary leading-relaxed">
                  {isAr ? (
                    <>
                      نوع التمثيل: مضلع شعاعي (Vector Polygon)<br />
                      عدد المعالم الهندسية: 412,380<br />
                      التناسق الطوبولوجي: تم التحقق عبر قواعد FME المؤتمتة.<br />
                      الدقة الموضعية: دقة أفقية مطلقة ± 0.05 متر.
                    </>
                  ) : (
                    <>
                      Representation Type: Vector Polygon<br />
                      Geometric Object Count: 412,380<br />
                      Topological Consistency: Verified by Automated FME Ruleset.<br />
                      Positional Accuracy: Absolute horizontal accuracy ± 0.05m.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lineage' && (
          <div className="bg-white rounded-2xl border border-border p-6 shadow-xs space-y-4 text-xs">
            <h3 className="text-base font-bold text-navy-900">{isAr ? 'المصدر وتاريخ تدفق البيانات (Lineage)' : 'Data Lineage & Provenance History'}</h3>
            <div className="p-4 rounded-xl bg-canvas border border-border leading-relaxed text-text-secondary">
              <p className="mb-2"><strong>{isAr ? 'الإصدار 2027.09:' : 'Epoch 2027.09:'}</strong> {isAr ? 'تحديث مرحلي يعكس 1,480 تقسيماً سكنياً جديداً في مدينة خليفة (القطاع 14-B) وياس شمال المنطقة 4.' : 'Incremental update reflecting 1,480 new residential plot subdivisions in Khalifa City (Sector 14-B) and Yas North Zone 4.'}</p>
              <p className="mb-2"><strong>{isAr ? 'جمع البيانات المصدرية:' : 'Source Capture:'}</strong> {isAr ? 'تقديمات المساحين المعتمدين لدى دائرة البلديات والنقل المصدقة عبر نظام التراخيص الإلكتروني.' : 'DMT Registered Surveyor submittals validated through the electronic municipal permitting workflow.'}</p>
              <p><strong>{isAr ? 'التحويلات الإحداثية:' : 'Transformations:'}</strong> {isAr ? 'إسقاط من شبكة المساحة المحلية إلى UTM Zone 40N (WGS 84) باستخدام نقاط الضبط المساحية الرسمية.' : 'Projected from local cadastral grid to UTM Zone 40N (WGS 84) using official survey control datum shifts.'}</p>
            </div>
          </div>
        )}

        {activeTab === 'access' && (
          <div className="bg-white rounded-2xl border border-border p-6 shadow-xs space-y-4 text-xs">
            <h3 className="text-base font-bold text-navy-900">{isAr ? 'شروط تبادل واستخدام البيانات' : 'Data Sharing & Access Terms'}</h3>
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200">
              <div className="font-bold text-navy-900 mb-1">{isAr ? 'الاتفاقية الحاكمة: اتفاقية مشاركة البيانات DSA-2027-014' : 'Governing Agreement: Data Sharing Agreement DSA-2027-014'}</div>
              <p className="text-text-secondary leading-relaxed">
                {isAr
                  ? 'مصرح للاستخدام في العمليات الحكومية الرسمية لجميع الجهات الـ 64 المساهمة في أبوظبي. يمكن للشركاء التجاريين المعتمدين طلب اشتراك عبر سوق البيانات AD-SDI Marketplace بعد التحقق من طبيعة المشروع.'
                  : 'Authorized for official government operations across all 64 contributing Abu Dhabi entities. Approved commercial partners may request subscription access via the AD-SDI Marketplace subject to project verification.'}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'versions' && (
          <div className="bg-white rounded-2xl border border-border p-6 shadow-xs text-xs space-y-3">
            <h3 className="text-base font-bold text-navy-900">{isAr ? 'سجل الإصدارات' : 'Version History'}</h3>
            <div className="divide-y divide-border">
              <div className="py-2.5 flex justify-between items-center">
                <div><span className="font-bold text-navy-900">{isAr ? 'v2027.09 (الحالي)' : 'v2027.09 (Current)'}</span> — {isAr ? 'مزامنة شهرية للمسح العقاري' : 'Monthly cadastral synchronization'}</div>
                <span className="text-text-muted">{isAr ? '1 سبتمبر 2027' : '1 Sep 2027'}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <div><span className="font-medium text-text-secondary">v2027.08</span> — {isAr ? 'تعديل حدود قطع جزيرة الريم' : 'Reem Island parcel boundary adjustment'}</div>
                <span className="text-text-muted">{isAr ? '1 أغسطس 2027' : '1 Aug 2027'}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <div><span className="font-medium text-text-secondary">v2027.07</span> — {isAr ? 'مطابقة نصف سنوية لحدود الإمارة' : 'Semi-annual emirate-wide boundary reconciliation'}</div>
                <span className="text-text-muted">{isAr ? '1 يوليو 2027' : '1 Jul 2027'}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="bg-white rounded-2xl border border-border p-6 shadow-xs text-xs space-y-3">
            <h3 className="text-base font-bold text-navy-900">{isAr ? 'سجل تدقيق غير قابل للتعديل' : 'Immutable Audit Trail'}</h3>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-canvas border border-border flex items-center justify-between">
                <div>
                  <span className="font-semibold text-navy-900">{isAr ? 'تم اعتماد النشر' : 'Publication Approved'}</span> {isAr ? 'بواسطة خالد م. (مشرف بيانات DMT)' : 'by Khalid M. (DMT Data Steward)'}
                </div>
                <span className="text-text-muted font-mono">{isAr ? '01 سبتمبر 2027 10:14 توقيت الإمارات' : '01 Sep 2027 10:14 GST'}</span>
              </div>
              <div className="p-3 rounded-lg bg-canvas border border-border flex items-center justify-between">
                <div>
                  <span className="font-semibold text-emerald-700">{isAr ? 'اجتاز بوابة الجودة الآلية (100%)' : 'Automated Quality Gateway Passed (100%)'}</span>
                </div>
                <span className="text-text-muted font-mono">{isAr ? '01 سبتمبر 2027 09:48 توقيت الإمارات' : '01 Sep 2027 09:48 GST'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
