import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useLanguage } from '../context/LanguageContext';
import { MARKETPLACE_PRODUCTS } from '../data/mockData';
import { MarketplaceProduct } from '../types';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { getMarketplaceSampleData } from '../data/geoData';
import {
  Storefront,
  MagnifyingGlass,
  Funnel,
  ArrowRight,
  Cube,
  CodeBlock,
  Brain,
  Tree,
  X,
  LockKeyOpen,
  CheckCircle,
  FileText,
  Clock,
  Building,
  Eye,
  Code,
  Table,
  Copy,
  Check,
  DownloadSimple,
} from '@phosphor-icons/react';

export const S08_Marketplace: React.FC = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProviderType, setSelectedProviderType] = useState<string>('all');
  const [selectedLicense, setSelectedLicense] = useState<string>('all');
  const [selectedAccessModel, setSelectedAccessModel] = useState<string>('all');

  // Product Detail Drawer State
  const [selectedProduct, setSelectedProduct] = useState<MarketplaceProduct | null>(MARKETPLACE_PRODUCTS[0]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);

  // Sample Geometry Modal State
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [previewTab, setPreviewTab] = useState<'map' | 'json' | 'schema'>('map');
  const [inspectedFeature, setInspectedFeature] = useState<any>(null);
  const [copiedJson, setCopiedJson] = useState<boolean>(false);

  const sampleData = useMemo(() => {
    if (!selectedProduct) return null;
    return getMarketplaceSampleData(selectedProduct.id);
  }, [selectedProduct?.id]);

  useEffect(() => {
    if (sampleData?.geoJson?.features?.[0]) {
      setInspectedFeature(sampleData.geoJson.features[0].properties);
    } else {
      setInspectedFeature(null);
    }
  }, [sampleData]);

  const handleCopyGeoJson = () => {
    if (!sampleData?.geoJson) return;
    navigator.clipboard.writeText(JSON.stringify(sampleData.geoJson, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleDownloadGeoJson = () => {
    if (!sampleData?.geoJson || !selectedProduct) return;
    const blob = new Blob([JSON.stringify(sampleData.geoJson, null, 2)], { type: 'application/geo+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedProduct.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_sample.geojson`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredProducts = useMemo(() => {
    return MARKETPLACE_PRODUCTS.filter((prod) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (
          !prod.title.toLowerCase().includes(q) &&
          !prod.description.toLowerCase().includes(q) &&
          !prod.provider.toLowerCase().includes(q)
        ) {
          return false;
        }
      }

      if (selectedCategory !== 'all' && prod.category !== selectedCategory) return false;
      if (selectedProviderType !== 'all' && prod.providerType !== selectedProviderType) return false;
      if (selectedLicense !== 'all' && prod.license !== selectedLicense) return false;
      if (selectedAccessModel !== 'all' && prod.accessModel !== selectedAccessModel) return false;

      return true;
    });
  }, [searchQuery, selectedCategory, selectedProviderType, selectedLicense, selectedAccessModel]);

  const handleOpenDetail = (prod: MarketplaceProduct) => {
    setSelectedProduct(prod);
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Header />

      {/* Hero Header */}
      <div className="bg-navy-900 text-white border-b border-navy-700 py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-semibold mb-3">
              <Storefront className="w-3.5 h-3.5 text-teal-400" />
              {isAr ? 'الوحدة C • منصة تبادل البيانات المكانية' : 'Module C • Geospatial Exchange'}
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              {isAr ? 'سوق البيانات المكانية' : 'Geospatial Marketplace'}
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
              {isAr
                ? 'منتجات بيانات موثوقة، ونماذج ثلاثية الأبعاد، وواجهات برمجية، ونماذج ذكاء اصطناعي من الجهات الحكومية والشركاء المعتمدين.'
                : 'Trusted data products, 3D meshes, programmatic APIs, and AI models from government entities and approved private sector partners.'}
            </p>
          </div>

          {/* Quick Sub-navigation buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/marketplace/entitlements"
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors shadow-xs"
            >
              {isAr ? 'اشتراكاتي وصلاحياتي' : 'My Entitlements'}
            </Link>
            <Link
              to="/marketplace/provider"
              className="px-4 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 border border-navy-600 font-semibold text-xs transition-colors"
            >
              {isAr ? 'مساحة عمل المزود' : 'Provider Workspace'}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col lg:flex-row gap-6">
        {/* Left Column: Filters & Grid */}
        <div className="flex-1 space-y-4">
          {/* Filters Bar */}
          <div className="bg-white rounded-2xl border border-border p-4 shadow-xs space-y-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'ابحث في المنتجات، والمزودين، والتصنيفات...' : 'Search products by title, provider, or topic...'}
                className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2 text-xs bg-canvas border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-600 text-text-primary"
              />
              <MagnifyingGlass className="w-4 h-4 text-text-secondary absolute left-3 rtl:left-auto rtl:right-3 top-2.5 pointer-events-none" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-1.5 bg-canvas border border-border rounded text-[11px] text-text-primary"
              >
                <option value="all">{isAr ? 'جميع أنواع المنتجات' : 'All Product Types'}</option>
                <option value="Datasets">{isAr ? 'حزم البيانات' : 'Datasets'}</option>
                <option value="Services & APIs">{isAr ? 'الخدمات والواجهات' : 'Services & APIs'}</option>
                <option value="AI outputs">{isAr ? 'مخرجات الذكاء الاصطناعي' : 'AI outputs'}</option>
                <option value="Imagery">{isAr ? 'الصور والخرائط' : 'Imagery'}</option>
              </select>

              <select
                value={selectedProviderType}
                onChange={(e) => setSelectedProviderType(e.target.value)}
                className="p-1.5 bg-canvas border border-border rounded text-[11px] text-text-primary"
              >
                <option value="all">{isAr ? 'جميع المزودين' : 'All Providers'}</option>
                <option value="Government entity">{isAr ? 'جهة حكومية' : 'Government Entity'}</option>
                <option value="Approved partner">{isAr ? 'شريك معتمد' : 'Approved Partner'}</option>
              </select>

              <select
                value={selectedLicense}
                onChange={(e) => setSelectedLicense(e.target.value)}
                className="p-1.5 bg-canvas border border-border rounded text-[11px] text-text-primary"
              >
                <option value="all">{isAr ? 'جميع التراخيص' : 'All Licences'}</option>
                <option value="Government-only">{isAr ? 'حكومي فقط' : 'Government-only'}</option>
                <option value="Commercial">{isAr ? 'تجاري' : 'Commercial'}</option>
                <option value="Open">{isAr ? 'مفتوح' : 'Open'}</option>
              </select>

              <select
                value={selectedAccessModel}
                onChange={(e) => setSelectedAccessModel(e.target.value)}
                className="p-1.5 bg-canvas border border-border rounded text-[11px] text-text-primary"
              >
                <option value="all">{isAr ? 'جميع نماذج الوصول' : 'All Access Models'}</option>
                <option value="Included">{isAr ? 'مشمول ضمن الترخيص' : 'Included'}</option>
                <option value="Subscription">{isAr ? 'اشتراك' : 'Subscription'}</option>
                <option value="Pay-per-use">{isAr ? 'الدفع حسب الاستخدام' : 'Pay-per-use'}</option>
              </select>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProducts.map((prod) => {
              const isSelected = selectedProduct?.id === prod.id && drawerOpen;
              return (
                <div
                  key={prod.id}
                  onClick={() => handleOpenDetail(prod)}
                  className={`bg-white rounded-2xl border overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between relative group ${
                    isSelected ? 'border-teal-600 ring-2 ring-teal-500/20' : 'border-border'
                  }`}
                >
                  {/* Topic-Related Geospatial Preview Thumbnail */}
                  {prod.image && (
                    <div className="h-32 w-full relative overflow-hidden bg-slate-900 border-b border-border">
                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px]">
                        <span className="font-bold px-2 py-0.5 rounded-full bg-teal-900/90 text-teal-300 border border-teal-500/30 backdrop-blur-xs">
                          {prod.category}
                        </span>
                        <span className="text-white/90 text-[10px] px-2 py-0.5 rounded-full bg-slate-900/80 border border-white/15 backdrop-blur-xs font-mono">
                          {prod.accessModel}
                        </span>
                      </div>
                      <div className="absolute bottom-2 left-3 right-3 text-[11px] text-slate-200 font-medium truncate">
                        {prod.coverage}
                      </div>
                    </div>
                  )}

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {!prod.image && (
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                            {prod.category}
                          </span>
                          <span className="text-[10px] text-text-secondary px-1.5 py-0.5 rounded bg-canvas border border-border">
                            {prod.accessModel}
                          </span>
                        </div>
                      )}

                      <h3 className="text-base font-bold text-navy-900 group-hover:text-teal-700 transition-colors">
                        {prod.title}
                      </h3>
                      <div className="text-xs font-semibold text-text-secondary mt-0.5">
                        {prod.provider}
                      </div>

                      <p className="text-xs text-text-secondary line-clamp-2 mt-2 leading-relaxed">
                        {prod.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                      <span className="text-[11px] font-medium text-text-muted">
                        {prod.updateFrequency}
                      </span>
                      <button
                        type="button"
                        className="text-teal-700 hover:text-navy-900 font-semibold flex items-center gap-1"
                      >
                        <span>View details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Product Detail Drawer */}
        {drawerOpen && selectedProduct && (
          <div className="w-full lg:w-96 bg-white rounded-2xl border border-border p-6 shadow-md flex flex-col justify-between space-y-4 shrink-0">
            <div>
              <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                    Product Specification
                  </span>
                  <h3 className="text-base font-bold text-navy-900 mt-0.5">
                    {selectedProduct.title}
                  </h3>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1 rounded-lg hover:bg-canvas text-text-muted"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Topic-Related High-Resolution Spatial Image Preview */}
              <div
                onClick={() => setShowPreviewModal(true)}
                className="h-44 rounded-xl relative overflow-hidden mb-4 border border-border bg-slate-900 group shadow-md cursor-pointer"
                title="Click to open interactive sample geometry preview"
              >
                <img
                  src={selectedProduct.image || '/products/land_parcels.jpg'}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Visual Metadata Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/40 p-3 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="px-2 py-0.5 rounded-full bg-teal-900/80 backdrop-blur-md text-teal-300 font-mono border border-teal-500/40 shadow-xs">
                      {selectedProduct.category}
                    </span>
                    <span className="text-slate-200 text-[10px] font-medium drop-shadow-sm bg-slate-900/70 px-2 py-0.5 rounded-full backdrop-blur-xs">
                      {selectedProduct.coverage.split('(')[0]}
                    </span>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[10px] text-teal-300 font-mono block">Spatial Product Asset</span>
                      <span className="text-xs font-bold text-white drop-shadow-md">
                        {selectedProduct.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-teal-200 font-semibold bg-teal-600/80 hover:bg-teal-500 px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors shadow-xs">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Metadata Details */}
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-canvas border border-border space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Provider</span>
                    <span className="font-semibold text-navy-900 text-right">{selectedProduct.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Licence Model</span>
                    <span className="font-semibold text-teal-700">{selectedProduct.license}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Coverage</span>
                    <span className="font-medium text-navy-900 text-right text-[11px]">{selectedProduct.coverage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">SLA Commitment</span>
                    <span className="font-mono text-emerald-700 text-[11px]">{selectedProduct.sla}</span>
                  </div>
                </div>

                {/* Available Access Plans */}
                <div>
                  <h4 className="text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-2">
                    Available Access Plans
                  </h4>
                  <div className="space-y-2">
                    {selectedProduct.plans.map((p) => (
                      <div key={p.name} className="p-2.5 rounded-lg border border-border bg-canvas-subtle">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-navy-900">{p.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-white text-text-secondary border border-border">
                            {p.tier}
                          </span>
                        </div>
                        <p className="text-[11px] text-text-secondary mt-1">{p.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-border space-y-2">
              <button
                type="button"
                onClick={() => navigate('/marketplace/request')}
                className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <LockKeyOpen className="w-4 h-4" />
                <span>Request Access License</span>
              </button>

              <button
                type="button"
                onClick={() => setShowPreviewModal(true)}
                className="w-full py-2.5 px-4 rounded-xl border-2 border-teal-600/40 bg-teal-50/80 hover:bg-teal-100 text-teal-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <Eye className="w-4 h-4 text-teal-700" />
                <span>Preview Sample Geometry</span>
              </button>

              <div className="text-[10px] text-text-muted text-center pt-1">
                Zero fees or currency. Access governed by official DSA authorization.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Sample Geometry Preview Modal */}
      {showPreviewModal && selectedProduct && sampleData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-border w-full max-w-5xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-border bg-canvas-subtle flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full border border-teal-300">
                    OGC Sample Inspection
                  </span>
                  <span className="text-xs font-mono text-text-muted">
                    EPSG:32640 (UTM Zone 40N)
                  </span>
                </div>
                <h3 className="text-lg font-bold text-navy-900 mt-1 flex items-center gap-2">
                  <span>{selectedProduct.title}</span>
                  <span className="text-xs font-normal text-text-secondary">— Sample Geometry Preview</span>
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="p-2 rounded-lg hover:bg-canvas text-text-muted hover:text-navy-900 transition-colors"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Subheader / Tab Navigation */}
            <div className="px-6 py-2.5 border-b border-border bg-white flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewTab('map')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    previewTab === 'map'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-text-secondary hover:text-navy-900 hover:bg-canvas'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Interactive Map View</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('json')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    previewTab === 'json'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-text-secondary hover:text-navy-900 hover:bg-canvas'
                  }`}
                >
                  <Code className="w-4 h-4" />
                  <span>OGC GeoJSON Payload</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('schema')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    previewTab === 'schema'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-text-secondary hover:text-navy-900 hover:bg-canvas'
                  }`}
                >
                  <Table className="w-4 h-4" />
                  <span>Attributes & Schema</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {previewTab === 'json' && (
                  <button
                    type="button"
                    onClick={handleCopyGeoJson}
                    className="px-2.5 py-1 text-xs rounded-lg border border-border bg-white hover:bg-canvas text-navy-900 font-medium flex items-center gap-1"
                  >
                    {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedJson ? 'Copied!' : 'Copy JSON'}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleDownloadGeoJson}
                  className="px-2.5 py-1 text-xs rounded-lg border border-border bg-white hover:bg-canvas text-navy-900 font-medium flex items-center gap-1"
                >
                  <DownloadSimple className="w-3.5 h-3.5" />
                  <span>Download .geojson</span>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-hidden min-h-[460px] flex flex-col md:flex-row">
              {/* Left / Main view */}
              <div className="flex-1 relative bg-canvas-subtle min-h-[380px] overflow-hidden flex flex-col">
                {previewTab === 'map' && (
                  <div className="w-full h-full relative flex-1 min-h-[420px]">
                    <InteractiveMap
                      center={sampleData.center}
                      zoom={sampleData.zoom}
                      geoJsonData={sampleData.geoJson}
                      onFeatureClick={(props) => setInspectedFeature(props)}
                      height="100%"
                    />
                    <div className="absolute bottom-3 left-3 z-[1000] bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-medium text-navy-900 border border-border shadow-xs pointer-events-none">
                      Click any polygon to inspect spatial attributes
                    </div>
                  </div>
                )}

                {previewTab === 'json' && (
                  <div className="flex-1 p-4 overflow-auto font-mono text-xs bg-slate-950 text-emerald-400 leading-relaxed selection:bg-teal-700 selection:text-white">
                    <pre>{JSON.stringify(sampleData.geoJson, null, 2)}</pre>
                  </div>
                )}

                {previewTab === 'schema' && (
                  <div className="flex-1 p-6 overflow-auto bg-white">
                    <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-3">
                      Feature Schema & Attribute Definitions
                    </h4>
                    <div className="border border-border rounded-xl overflow-hidden text-xs">
                      <table className="w-full text-left">
                        <thead className="bg-canvas border-b border-border text-[11px] font-bold text-text-secondary">
                          <tr>
                            <th className="p-3">Attribute Name</th>
                            <th className="p-3">Data Type</th>
                            <th className="p-3">FGDS Directives</th>
                            <th className="p-3">Sample Value</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {inspectedFeature && Object.entries(inspectedFeature).map(([key, val]) => (
                            <tr key={key} className="hover:bg-canvas-subtle">
                              <td className="p-3 font-mono font-semibold text-navy-900">{key}</td>
                              <td className="p-3 text-text-secondary font-mono">{typeof val === 'number' ? 'Float / Integer' : 'String / Text'}</td>
                              <td className="p-3 text-emerald-700 font-medium">Authoritative FGDS Standard</td>
                              <td className="p-3 font-mono text-text-primary">{String(val)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Inspected Feature Details Panel */}
              <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-border bg-white p-5 flex flex-col justify-between overflow-y-auto max-h-[460px]">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-border">
                    <span className="text-[11px] font-bold text-navy-900 uppercase tracking-wider">
                      Selected Feature
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-mono font-semibold">
                      {sampleData.featureTypeName}
                    </span>
                  </div>

                  {inspectedFeature ? (
                    <div className="space-y-2 text-xs">
                      {Object.entries(inspectedFeature).map(([key, val]) => (
                        <div key={key} className="p-2.5 rounded-lg bg-canvas-subtle border border-border">
                          <span className="text-[10px] text-text-secondary uppercase font-semibold block tracking-wide">
                            {key.replace(/([A-Z])/g, ' $1')}
                          </span>
                          <span className="font-mono font-bold text-navy-900 text-xs mt-0.5 block break-all">
                            {String(val)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-xs text-text-muted">
                      Click any polygon on the map to inspect its attributes.
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-border space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPreviewModal(false);
                      navigate('/marketplace/request');
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <LockKeyOpen className="w-4 h-4" />
                    <span>Proceed to Access Request</span>
                  </button>
                  <div className="text-[10px] text-text-muted text-center">
                    Sample clip adheres to FGDS Spec v2027.09
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
