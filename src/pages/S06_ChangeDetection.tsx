import React, { useState } from 'react';
import { WorkspaceLayout } from '../components/common/WorkspaceLayout';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { useLanguage } from '../context/LanguageContext';
import { CHANGE_DETECTION_GEOJSON, KHALIFA_CITY_CENTER } from '../data/geoData';
import {
  Brain,
  Play,
  Sliders,
  Sparkle,
  CheckCircle,
  Eye,
  SlidersHorizontal,
  DownloadSimple,
  ArrowsClockwise,
  ArrowRight,
  ShieldCheck,
  FileText,
  Info,
} from '@phosphor-icons/react';

export const S06_ChangeDetection: React.FC = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'change' | 'feature' | 'models' | 'usecases'>('change');
  const [selectedFeature, setSelectedFeature] = useState<any>(CHANGE_DETECTION_GEOJSON.features[0].properties);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisCompleted, setAnalysisCompleted] = useState<boolean>(true);
  const [showModelCard, setShowModelCard] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Configuration State
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(0.80);
  const [minAreaSqm, setMinAreaSqm] = useState<number>(25);
  const [viewCompareMode, setViewCompareMode] = useState<'side' | 'overlay'>('overlay');

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisCompleted(true);
      setToastMsg('Demonstration inference completed: 214 changes refreshed for Khalifa City – South-West.');
      setTimeout(() => setToastMsg(null), 4000);
    }, 1800);
  };

  const handleSendToReview = () => {
    setToastMsg(`Feature ${selectedFeature?.changeId || 'CD-KC-2027-084'} flagged and routed to DMT Steward review queue.`);
    setTimeout(() => setToastMsg(null), 4000);
  };

  return (
    <WorkspaceLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-text-secondary mb-1">
              <span>{isAr ? 'بناء' : 'BUILD'}</span>
              <span>/</span>
              <span>{isAr ? 'مختبر الذكاء الجغرافي' : 'GeoAI Studio'}</span>
              <span>/</span>
              <span className="font-semibold text-navy-900">{isAr ? 'كشف التغيرات الفضائية' : 'Change Detection'}</span>
            </div>
            <h1 className="text-2xl font-bold text-navy-900 tracking-tight flex items-center gap-2.5">
              <span>{isAr ? 'الكشف الآلي عن التغيرات بالصور الفضائية والجوية' : 'Automated Satellite & Aerial Change Detection'}</span>
              <span className="text-[10px] font-mono uppercase bg-purple-100 text-purple-800 px-2 py-0.5 rounded border border-purple-200">
                {isAr ? 'الوحدة B' : 'Module B'}
              </span>
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              {isAr
                ? 'استنتاج وتحديد التغيرات المكانية بالتعلم العميق عبر الصور الجوية والفضائية المتعددة زمنياً.'
                : 'Deep-learning feature change inference across multi-temporal high-resolution imagery.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowModelCard(true)}
              className="px-3.5 py-1.5 rounded-lg border border-border bg-white hover:bg-canvas text-navy-900 font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <FileText className="w-4 h-4 text-purple-600" />
              <span>{isAr ? 'بطاقة النموذج (MR-B-007)' : 'Model Card (MR-B-007)'}</span>
            </button>
          </div>
        </div>

        {/* Feedback Toast */}
        {toastMsg && (
          <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <Sparkle className="w-4 h-4 text-purple-600" />
              <span className="font-semibold">{toastMsg}</span>
            </div>
            <button onClick={() => setToastMsg(null)} className="text-purple-700 hover:text-purple-900 font-bold">
              Dismiss
            </button>
          </div>
        )}

        {/* Pipeline Stage Counts Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: 'Candidate', count: '12' },
            { label: 'Scored', count: '8' },
            { label: 'Approved', count: '5' },
            { label: 'In Development', count: '3' },
            { label: 'Production', count: '2', highlight: true },
          ].map((item) => (
            <div
              key={item.label}
              className={`p-3 rounded-xl border ${
                item.highlight
                  ? 'bg-purple-700 text-white border-purple-800 shadow-sm'
                  : 'bg-white border-border text-text-primary'
              }`}
            >
              <div className={`text-[10px] font-bold uppercase tracking-wider ${item.highlight ? 'text-purple-200' : 'text-text-muted'}`}>
                {item.label}
              </div>
              <div className="text-lg font-extrabold font-mono mt-0.5">{item.count}</div>
            </div>
          ))}
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-1 border-b border-border text-xs">
          {[
            { id: 'change', label: 'Change Detection (Active)' },
            { id: 'feature', label: 'Feature Extraction' },
            { id: 'models', label: 'Model Registry' },
            { id: 'usecases', label: 'Use Case Pipeline' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-purple-600 text-purple-700 bg-white'
                  : 'border-transparent text-text-secondary hover:text-navy-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Configuration & Run Controls (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-border p-5 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider border-b border-border pb-2">
                Inference Configuration
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[11px] text-text-muted font-bold block mb-1">Model Name</label>
                  <div className="font-semibold text-navy-900 p-2 rounded-lg bg-canvas border border-border">
                    Building Change Detection v3.2
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-text-muted font-bold block mb-1">Target Use Case</label>
                  <div className="font-semibold text-navy-900 p-2 rounded-lg bg-canvas border border-border">
                    New construction monitoring & unpermitted works
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-text-muted font-bold block mb-1">Study Area</label>
                  <div className="font-semibold text-navy-900 p-2 rounded-lg bg-canvas border border-border">
                    Khalifa City – South-West
                  </div>
                </div>

                {/* Multi-temporal Imagery Pairs */}
                <div className="p-3 rounded-xl bg-canvas border border-border space-y-2">
                  <div className="text-[10px] uppercase font-bold text-purple-700">Multi-Temporal Pair</div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-text-secondary">Epoch T1 (Baseline):</span>
                    <span className="font-mono font-bold text-navy-900">Jan 2027 (0.5 m)</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-text-secondary">Epoch T2 (Recent):</span>
                    <span className="font-mono font-bold text-navy-900">Aug 2027 (0.5 m)</span>
                  </div>
                </div>

                {/* Threshold Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-text-secondary">Confidence Cutoff</span>
                    <span className="font-mono font-bold text-purple-700">{(confidenceThreshold * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="0.95"
                    step="0.05"
                    value={confidenceThreshold}
                    onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-text-secondary">Minimum Polygon Area</span>
                    <span className="font-mono font-bold text-purple-700">{minAreaSqm} m²</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={minAreaSqm}
                    onChange={(e) => setMinAreaSqm(parseInt(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>
              </div>

              {/* Run Simulated Button */}
              <button
                type="button"
                onClick={handleRunAnalysis}
                disabled={isAnalyzing}
                className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <ArrowsClockwise className="w-4 h-4 animate-spin" />
                    <span>Processing Demonstration Inference...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Run Change Detection Inference</span>
                  </>
                )}
              </button>
            </div>

            {/* Precision / Recall KPI Metrics */}
            <div className="bg-white rounded-2xl border border-border p-5 shadow-xs">
              <div className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-3">
                Validation Performance
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-canvas border border-border">
                  <div className="text-[10px] text-text-muted uppercase">Precision</div>
                  <div className="font-mono font-bold text-base text-navy-900 mt-0.5">0.93</div>
                </div>
                <div className="p-2.5 rounded-xl bg-canvas border border-border">
                  <div className="text-[10px] text-text-muted uppercase">Recall</div>
                  <div className="font-mono font-bold text-base text-navy-900 mt-0.5">0.89</div>
                </div>
                <div className="p-2.5 rounded-xl bg-canvas border border-border">
                  <div className="text-[10px] text-text-muted uppercase">F1-Score</div>
                  <div className="font-mono font-bold text-base text-purple-700 mt-0.5">0.91</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Spatial Comparison Map & Feature Inspector (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Map Canvas with Change Polygons */}
            <div className="bg-white rounded-2xl border border-border p-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                  <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                    Spatial Comparison View — Khalifa City South-West
                  </h3>
                </div>

                {/* Legend badges */}
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1 font-semibold text-emerald-700">
                    <span className="w-3 h-3 rounded bg-emerald-500"></span> New (168)
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-amber-700">
                    <span className="w-3 h-3 rounded bg-amber-500"></span> Extension (25)
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-red-700">
                    <span className="w-3 h-3 rounded bg-red-500"></span> Demolished (21)
                  </span>
                </div>
              </div>

              {/* Map Container */}
              <div className="h-[420px] rounded-xl overflow-hidden border border-border mt-3 relative">
                <InteractiveMap
                  center={KHALIFA_CITY_CENTER}
                  zoom={15}
                  theme="light"
                  geoJsonData={CHANGE_DETECTION_GEOJSON}
                  selectedFeatureId={selectedFeature?.changeId}
                  onFeatureClick={(props) => setSelectedFeature(props)}
                />

                {/* Simulation indicator */}
                <div className="absolute bottom-10 left-3 z-[1000] bg-white/95 px-3 py-1.5 rounded-lg border border-border text-[11px] shadow">
                  <span className="text-text-muted">Simulated analysis: </span>
                  <span className="font-bold text-navy-900">214 changes detected</span>
                </div>
              </div>
            </div>

            {/* Selected Feature Inspector Card */}
            {selectedFeature && (
              <div className="bg-white rounded-2xl border border-border p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono font-bold text-navy-900">{selectedFeature.changeId}</span>
                    <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                      selectedFeature.type === 'New construction' ? 'bg-emerald-100 text-emerald-800' :
                      selectedFeature.type === 'Extension' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedFeature.type}
                    </span>
                    <span className="font-mono text-purple-700 font-semibold text-[11px]">
                      Confidence: {(selectedFeature.confidence * 100).toFixed(0)}%
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-text-secondary pt-1">
                    <div>Area: <strong className="text-navy-900">{selectedFeature.areaSqm} m²</strong></div>
                    <div>Height: <strong className="text-navy-900">{selectedFeature.heightEstimate}</strong></div>
                    <div>Status: <span className="font-semibold text-amber-600">{selectedFeature.reviewStatus}</span></div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSendToReview}
                    className="px-3.5 py-2 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <span>Send to Review Queue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Model Card Modal */}
        {showModelCard && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-border space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <h3 className="text-base font-bold text-navy-900">
                    Model Card: Building Change Detection v3.2
                  </h3>
                </div>
                <button
                  onClick={() => setShowModelCard(false)}
                  className="text-text-muted hover:text-navy-900 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-canvas border border-border">
                  <div className="text-text-muted text-[10px] uppercase font-bold">Registry ID</div>
                  <div className="font-mono font-bold text-navy-900 mt-0.5">MR-B-007</div>
                </div>
                <div className="p-3 rounded-lg bg-canvas border border-border">
                  <div className="text-text-muted text-[10px] uppercase font-bold">Owner</div>
                  <div className="font-bold text-navy-900 mt-0.5">AD-SDI GeoAI Team</div>
                </div>
                <div className="p-3 rounded-lg bg-canvas border border-border">
                  <div className="text-text-muted text-[10px] uppercase font-bold">Training Samples</div>
                  <div className="font-mono font-bold text-navy-900 mt-0.5">14,200 Annotated Tiles</div>
                </div>
                <div className="p-3 rounded-lg bg-canvas border border-border">
                  <div className="text-text-muted text-[10px] uppercase font-bold">Evaluation Date</div>
                  <div className="font-bold text-navy-900 mt-0.5">30 Aug 2027</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 space-y-1">
                <div className="font-bold">Governance & Human-in-the-Loop Gate</div>
                <p className="text-[11px] leading-relaxed">
                  Drift: Stable. Deployment approved for municipal monitoring. All unpermitted flags require DMT field steward confirmation prior to enforcement actions.
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowModelCard(false)}
                  className="px-4 py-2 rounded-lg bg-navy-900 text-white font-semibold text-xs"
                >
                  Close Model Card
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </WorkspaceLayout>
  );
};
