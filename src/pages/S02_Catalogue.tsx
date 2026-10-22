import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { useLanguage } from '../context/LanguageContext';
import { DATASETS } from '../data/mockData';
import { MANGROVE_GEOJSON, EASTERN_MANGROVES_CENTER } from '../data/geoData';
import { DatasetItem } from '../types';
import {
  MagnifyingGlass,
  Funnel,
  BookmarkSimple,
  ArrowSquareOut,
  X,
  SquaresFour,
  List as ListIcon,
  MapPin,
  CheckCircle,
  SlidersHorizontal,
  ArrowRight,
} from '@phosphor-icons/react';

export const S02_Catalogue: React.FC = () => {
  const { language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialQuery = searchParams.get('q') || 'mangrove';
  const initialTheme = searchParams.get('theme') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedTheme, setSelectedTheme] = useState(initialTheme);
  const [selectedPublisher, setSelectedPublisher] = useState('');
  const [selectedClassification, setSelectedClassification] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('');
  const [viewMode, setViewMode] = useState<'split' | 'list' | 'map'>('split');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['ds-3', 'ds-land-parcels']);
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>('ds-1');
  const [mapCenter, setMapCenter] = useState<[number, number]>(EASTERN_MANGROVES_CENTER);
  const [mapZoom, setMapZoom] = useState<number>(12);
  const [isSpatialFilterActive, setIsSpatialFilterActive] = useState<boolean>(false);

  // Sync state if URL param changes
  useEffect(() => {
    if (searchParams.get('q') !== null) {
      setSearchQuery(searchParams.get('q') || '');
    }
    if (searchParams.get('theme') !== null) {
      setSelectedTheme(searchParams.get('theme') || '');
    }
  }, [searchParams]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleClearAllFilters = () => {
    setSearchQuery('');
    setSelectedTheme('');
    setSelectedPublisher('');
    setSelectedClassification('');
    setSelectedAudience('');
    setSelectedFormat('');
    setSelectedServiceType('');
    setIsSpatialFilterActive(false);
    setSearchParams({});
  };

  // Filter datasets
  const filteredDatasets = useMemo(() => {
    return DATASETS.filter((ds) => {
      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          ds.title.toLowerCase().includes(q) ||
          ds.description.toLowerCase().includes(q) ||
          ds.publisher.toLowerCase().includes(q) ||
          ds.publisherCode.toLowerCase().includes(q) ||
          ds.theme.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Theme filter
      if (selectedTheme && ds.theme.toLowerCase() !== selectedTheme.toLowerCase()) {
        return false;
      }

      // Publisher filter
      if (selectedPublisher && ds.publisherCode !== selectedPublisher) {
        return false;
      }

      // Classification filter
      if (selectedClassification && ds.classification !== selectedClassification) {
        return false;
      }

      // Audience filter
      if (selectedAudience && ds.audience !== selectedAudience) {
        return false;
      }

      // Format filter
      if (selectedFormat && !ds.format.includes(selectedFormat)) {
        return false;
      }

      // Service type filter
      if (selectedServiceType && !ds.serviceTypes.includes(selectedServiceType)) {
        return false;
      }

      return true;
    });
  }, [
    searchQuery,
    selectedTheme,
    selectedPublisher,
    selectedClassification,
    selectedAudience,
    selectedFormat,
    selectedServiceType,
  ]);

  // Document consistent default result count presentation
  const displayCount = searchQuery.toLowerCase() === 'mangrove' && !selectedPublisher && !selectedTheme
    ? 38
    : filteredDatasets.length;

  const handleDatasetSelect = (ds: DatasetItem) => {
    setSelectedDatasetId(ds.id);
    if (ds.coordinates) {
      setMapCenter(ds.coordinates);
      setMapZoom(13);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Header />

      {/* Breadcrumb & Top Bar */}
      <div className="bg-white border-b border-border px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <Link to="/" className="hover:text-blue-600">{language === 'ar' ? 'الرئيسية' : 'Home'}</Link>
            <span>/</span>
            <span className="font-semibold text-navy-900">{language === 'ar' ? 'فهرس البيانات المكانية' : 'Geospatial Catalogue'}</span>
            <span>/</span>
            <span className="text-text-muted">{language === 'ar' ? 'المستودع الرقمي لأبوظبي' : 'Abu Dhabi Clearinghouse'}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Switcher */}
            <div className="flex rounded-lg border border-border bg-canvas p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('split')}
                className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1.5 transition-colors ${
                  viewMode === 'split' ? 'bg-white text-navy-900 shadow-xs' : 'text-text-secondary hover:text-navy-900'
                }`}
                title="Split Map & List View"
              >
                <SquaresFour className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'ar' ? 'عرض مزدوج' : 'Split View'}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1.5 transition-colors ${
                  viewMode === 'list' ? 'bg-white text-navy-900 shadow-xs' : 'text-text-secondary hover:text-navy-900'
                }`}
                title="Full List View"
              >
                <ListIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'ar' ? 'قائمة فقط' : 'List Only'}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('map')}
                className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1.5 transition-colors ${
                  viewMode === 'map' ? 'bg-white text-navy-900 shadow-xs' : 'text-text-secondary hover:text-navy-900'
                }`}
                title="Full Map View"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'ar' ? 'خريطة فقط' : 'Map Only'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Filter & Split-Screen View */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-[1680px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 gap-4">
        {/* Left Column: Filter Sidebar & Results List */}
        <div className={`flex flex-col gap-4 ${viewMode === 'map' ? 'hidden' : viewMode === 'list' ? 'w-full' : 'w-full lg:w-[540px] xl:w-[600px] shrink-0'}`}>
          {/* Search and Filters Bar */}
          <div className="bg-white rounded-xl border border-border p-4 shadow-xs">
            <div className="relative mb-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ar' ? 'ابحث في مجموعات البيانات، والخدمات، والجهات...' : 'Search datasets, services, publishers...'}
                className="w-full pl-9 pr-8 rtl:pl-8 rtl:pr-9 py-2 text-xs bg-canvas border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white text-text-primary"
              />
              <MagnifyingGlass className="w-4 h-4 text-text-secondary absolute left-3 rtl:left-auto rtl:right-3 top-2.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 rtl:right-auto rtl:left-2.5 top-2.5 text-text-muted hover:text-navy-900"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Dropdowns Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="p-1.5 bg-canvas border border-border rounded text-text-primary text-[11px] focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option value="">{language === 'ar' ? 'جميع المجالات' : 'All Themes'}</option>
                <option value="Environment">{language === 'ar' ? 'البيئة' : 'Environment'}</option>
                <option value="Land & Cadastre">{language === 'ar' ? 'الأراضي والمسح العقاري' : 'Land & Cadastre'}</option>
                <option value="Transport">{language === 'ar' ? 'النقل والمواصلات' : 'Transport'}</option>
                <option value="Buildings & 3D">{language === 'ar' ? 'المباني والتوأم 3D' : 'Buildings & 3D'}</option>
                <option value="Utilities">{language === 'ar' ? 'المرافق والبنية التحتية' : 'Utilities'}</option>
                <option value="Population">{language === 'ar' ? 'السكان والإحصاء' : 'Population'}</option>
              </select>

              <select
                value={selectedPublisher}
                onChange={(e) => setSelectedPublisher(e.target.value)}
                className="p-1.5 bg-canvas border border-border rounded text-text-primary text-[11px] focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option value="">{language === 'ar' ? 'جميع الجهات' : 'All Publishers'}</option>
                <option value="EAD">{language === 'ar' ? 'هيئة البيئة (EAD)' : 'EAD (Environment)'}</option>
                <option value="DMT">{language === 'ar' ? 'البلديات والنقل (DMT)' : 'DMT (Municipalities)'}</option>
                <option value="SCAD">{language === 'ar' ? 'مركز الإحصاء (SCAD)' : 'SCAD (Statistics)'}</option>
                <option value="ADEK">{language === 'ar' ? 'التعليم والمعرفة (ADEK)' : 'ADEK (Education)'}</option>
              </select>

              <select
                value={selectedClassification}
                onChange={(e) => setSelectedClassification(e.target.value)}
                className="p-1.5 bg-canvas border border-border rounded text-text-primary text-[11px] focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option value="">{language === 'ar' ? 'التصنيف' : 'Classification'}</option>
                <option value="Open">{language === 'ar' ? 'بيانات مفتوحة' : 'Open'}</option>
                <option value="Shared – Government">{language === 'ar' ? 'مشترك حكومي' : 'Shared – Govt'}</option>
                <option value="FGDS – Fundamental">{language === 'ar' ? 'أساسي FGDS' : 'FGDS Fundamental'}</option>
                <option value="Restricted">{language === 'ar' ? 'مقيد' : 'Restricted'}</option>
              </select>

              <select
                value={selectedAudience}
                onChange={(e) => setSelectedAudience(e.target.value)}
                className="p-1.5 bg-canvas border border-border rounded text-text-primary text-[11px] focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option value="">{language === 'ar' ? 'الفئة المستهدفة' : 'Audience'}</option>
                <option value="Public">{language === 'ar' ? 'عام' : 'Public'}</option>
                <option value="Government Only">{language === 'ar' ? 'جهات حكومية فقط' : 'Government Only'}</option>
                <option value="Approved Partners">{language === 'ar' ? 'شركاء معتمدون' : 'Approved Partners'}</option>
              </select>
            </div>

            {/* Filter Summary & Clear All */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/70 text-[11px]">
              <div className="flex items-center gap-1.5 text-text-secondary">
                <span className="font-bold text-navy-900">{displayCount}</span> {language === 'ar' ? 'مجموعة بيانات متوفرة' : 'datasets found'}
                {searchQuery && <span>{language === 'ar' ? `لـ "${searchQuery}"` : `for "${searchQuery}"`}</span>}
              </div>

              {(searchQuery || selectedTheme || selectedPublisher || selectedClassification || selectedAudience) && (
                <button
                  type="button"
                  onClick={handleClearAllFilters}
                  className="text-blue-600 hover:text-navy-900 font-medium flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  {language === 'ar' ? 'مسح التصفية' : 'Clear all'}
                </button>
              )}
            </div>
          </div>

          {/* Results List */}
          <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-280px)] pr-1">
            {filteredDatasets.length === 0 ? (
              <div className="bg-white rounded-xl border border-border p-8 text-center text-xs text-text-secondary">
                <div className="text-sm font-semibold text-navy-900 mb-1">No matching datasets found</div>
                <p>Try resetting your search query or loosening applied filters.</p>
                <button
                  onClick={handleClearAllFilters}
                  className="mt-3 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              filteredDatasets.map((dataset) => {
                const isSelected = selectedDatasetId === dataset.id;
                const isBookmarked = bookmarkedIds.includes(dataset.id);

                return (
                  <div
                    key={dataset.id}
                    onClick={() => handleDatasetSelect(dataset)}
                    className={`bg-white rounded-xl border p-4 transition-all cursor-pointer relative group ${
                      isSelected
                        ? 'border-blue-600 ring-2 ring-blue-600/10 shadow-md'
                        : 'border-border hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        {/* Badges strip */}
                        <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            dataset.classification === 'Open'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : dataset.classification === 'FGDS – Fundamental'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {dataset.classification}
                          </span>

                          <span className="text-[10px] text-text-secondary px-1.5 py-0.5 rounded bg-canvas border border-border">
                            {dataset.audience}
                          </span>

                          <span className="text-[10px] text-text-secondary font-medium">
                            {dataset.theme}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-sm font-bold text-navy-900 group-hover:text-blue-600 transition-colors leading-snug">
                          {language === 'ar' ? (dataset.titleAr || dataset.title) : dataset.title}
                        </h3>

                        {/* Publisher */}
                        <div className="text-[11px] font-medium text-text-secondary mt-0.5">
                          {dataset.publisher} ({dataset.publisherCode})
                        </div>

                        {/* Description snippet */}
                        <p className="text-xs text-text-secondary line-clamp-2 mt-2 leading-relaxed">
                          {language === 'ar' ? (dataset.descriptionAr || dataset.description) : dataset.description}
                        </p>

                        {/* Metadata tags */}
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/60 text-[11px] text-text-muted">
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1 text-emerald-600 font-medium">
                              <CheckCircle className="w-3.5 h-3.5" />
                              {dataset.qualityStatus}
                            </span>
                            <span>•</span>
                            <span>{language === 'ar' ? `تحديث ${dataset.updatedAt}` : `Updated ${dataset.updatedAt}`}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            {dataset.format.slice(0, 2).map((fmt) => (
                              <span key={fmt} className="px-1.5 py-0.2 rounded bg-canvas-subtle border border-border text-[10px]">
                                {fmt}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bookmark & Actions */}
                      <div className="flex flex-col items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => toggleBookmark(dataset.id, e)}
                          title={isBookmarked ? (language === 'ar' ? 'إزالة الإشارة' : 'Remove bookmark') : (language === 'ar' ? 'إضافة إلى الإشارات' : 'Bookmark dataset')}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isBookmarked
                              ? 'bg-amber-50 border-amber-300 text-amber-600'
                              : 'bg-white border-border text-text-muted hover:text-navy-900'
                          }`}
                        >
                          <BookmarkSimple className="w-4 h-4 fill-current" />
                        </button>

                        <Link
                          to={dataset.slug === 'land-parcels' ? '/catalogue/land-parcels' : `/catalogue/land-parcels?dataset=${dataset.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          title={language === 'ar' ? 'عرض تفاصيل مجموعة البيانات' : 'Open Dataset Details'}
                          className="p-1.5 rounded-lg border border-border bg-canvas hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors text-text-secondary"
                        >
                          <ArrowSquareOut className="w-4 h-4 rtl:rotate-180" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Real Geographic Map */}
        <div className={`flex-1 rounded-2xl border border-border overflow-hidden bg-white shadow-xs relative min-h-[500px] lg:min-h-auto ${viewMode === 'list' ? 'hidden' : 'block'}`}>
          <InteractiveMap
            center={mapCenter}
            zoom={mapZoom}
            geoJsonData={MANGROVE_GEOJSON}
            enableDrawFilter={true}
            onDrawFilterChange={(bounds) => {
              setIsSpatialFilterActive(!!bounds);
            }}
            selectedFeatureId={selectedDatasetId}
            onFeatureClick={(prop) => {
              console.log('Selected feature:', prop);
            }}
          />

          {/* Floating Spatial Selection Helper */}
          {isSpatialFilterActive && (
            <div className="absolute top-16 left-3 rtl:left-auto rtl:right-3 z-[1000] bg-amber-500/90 text-navy-900 font-medium text-xs px-3 py-1.5 rounded-lg backdrop-blur-sm shadow border border-amber-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span>{language === 'ar' ? 'تصفية النطاق الجغرافي نشطة (القرم الشرقي والساحل)' : 'Spatial Bounding Box Filter Active (Eastern Mangroves & Coastline)'}</span>
            </div>
          )}

          {/* Quick Dataset Detail Drawer Link */}
          <div className="absolute bottom-12 left-3 rtl:left-auto rtl:right-3 z-[1000]">
            <Link
              to="/catalogue/land-parcels"
              className="px-3.5 py-2 rounded-xl bg-navy-900/95 hover:bg-navy-800 text-white text-xs font-semibold backdrop-blur-md shadow-lg border border-navy-700 flex items-center gap-2 transition-all"
            >
              <span>{language === 'ar' ? 'معاينة القطع العقارية والمسح العقاري (S03)' : 'Inspect Cadastral Land Parcels (S03)'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold-500 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
