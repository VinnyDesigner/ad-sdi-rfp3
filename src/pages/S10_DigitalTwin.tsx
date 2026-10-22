import React, { useState } from 'react';
import { WorkspaceLayout } from '../components/common/WorkspaceLayout';
import { useLanguage } from '../context/LanguageContext';
import { DIGITAL_TWIN_ASSETS, DIGITAL_TWIN_SENSORS } from '../data/geoData';
import {
  Cube,
  Eye,
  Sliders,
  Sun,
  Clock,
  Broadcast,
  Tree,
  Lightning,
  Car,
  ArrowsClockwise,
  CheckCircle,
  Buildings,
  ChartLineUp,
  X,
  ShareNetwork,
  Info,
  ShieldCheck,
  DownloadSimple,
  FileText,
  ArrowsOut,
  Compass,
} from '@phosphor-icons/react';

export const S10_DigitalTwin: React.FC = () => {
  const { language } = useLanguage();
  const [selectedUseCase, setSelectedUseCase] = useState<'planning' | 'assets' | 'mobility' | 'context' | 'resilience'>('planning');
  const [timelineYear, setTimelineYear] = useState<number>(2027);
  const [timelineMonth] = useState<string>('Sep');
  const [selectedAsset, setSelectedAsset] = useState<any>(DIGITAL_TWIN_ASSETS[1] || DIGITAL_TWIN_ASSETS[0]); // Burj Mohammed Bin Rashid
  const [selectedSensor, setSelectedSensor] = useState<any>(DIGITAL_TWIN_SENSORS[0]);
  const [shadowSimulation, setShadowSimulation] = useState<boolean>(false);
  const [sunHour, setSunHour] = useState<number>(14); // 2:00 PM GST
  const [cameraView, setCameraView] = useState<'overhead' | 'isometric' | 'street'>('isometric');

  // Interactive Modals & Toast Feedback
  const [isBimModalOpen, setIsBimModalOpen] = useState<boolean>(false);
  const [bimActiveTab, setBimActiveTab] = useState<'arch' | 'mep' | 'sustainability' | 'hierarchy'>('arch');
  const [isScenarioModalOpen, setIsScenarioModalOpen] = useState<boolean>(false);
  const [activeParcel, setActiveParcel] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Layer Visibility Controls
  const [layers, setLayers] = useState({
    buildings3D: true,
    bimModels: true,
    iotSensors: true,
    trafficConditions: true,
    undergroundUtilities: false,
    planningZones: true,
  });

  const toggleLayer = (layerKey: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  // Switch use case and dynamically adjust relevant layers
  const handleUseCaseChange = (uc: 'planning' | 'assets' | 'mobility' | 'context' | 'resilience') => {
    setSelectedUseCase(uc);
    if (uc === 'planning') {
      setLayers({
        buildings3D: true,
        bimModels: true,
        iotSensors: false,
        trafficConditions: false,
        undergroundUtilities: false,
        planningZones: true,
      });
    } else if (uc === 'assets') {
      setLayers({
        buildings3D: true,
        bimModels: true,
        iotSensors: true,
        trafficConditions: false,
        undergroundUtilities: true,
        planningZones: false,
      });
    } else if (uc === 'mobility') {
      setLayers({
        buildings3D: true,
        bimModels: false,
        iotSensors: true,
        trafficConditions: true,
        undergroundUtilities: false,
        planningZones: false,
      });
    } else if (uc === 'context') {
      setLayers({
        buildings3D: true,
        bimModels: false,
        iotSensors: false,
        trafficConditions: true,
        undergroundUtilities: false,
        planningZones: true,
      });
    } else if (uc === 'resilience') {
      setLayers({
        buildings3D: true,
        bimModels: true,
        iotSensors: true,
        trafficConditions: false,
        undergroundUtilities: true,
        planningZones: true,
      });
    }
  };

  // Calculate dynamic lighting styles for shadow simulation
  const getLightingFilter = () => {
    if (!shadowSimulation) return 'none';
    if (sunHour <= 9) {
      return 'brightness(0.92) contrast(1.05) sepia(0.15) hue-rotate(-10deg)'; // Morning soft golden
    } else if (sunHour >= 16) {
      return 'brightness(0.88) contrast(1.15) sepia(0.28) hue-rotate(-15deg)'; // Late afternoon warm sunset
    } else {
      return 'brightness(1.05) contrast(1.1) saturate(1.1)'; // Crisp midday sun
    }
  };

  // 4D timeline timeline text & badge
  const getTimelineEra = () => {
    if (timelineYear < 2024) {
      return {
        label: language === 'ar' ? 'مرحلة الأساس التاريخي' : 'Historical Baseline Phase',
        desc: language === 'ar' ? 'المرحلة 1: استصلاح الكورنيش والبنية التحتية للأبراج الرئيسية' : 'Phase 1: Corniche Reclamation & Core Tower Infrastructure',
        badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
      };
    } else if (timelineYear <= 2028) {
      return {
        label: language === 'ar' ? 'التوأم الرقمي التشغيلي الحالي' : 'Current Operational Twin',
        desc: language === 'ar' ? 'الأساس النشط 2027: مجسمات LoD2 الكاملة وبث إنترنت الأشياء المباشر' : 'Active 2027 Baseline: Full LoD2 Meshes & Live IoT Telemetry',
        badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      };
    } else if (timelineYear <= 2032) {
      return {
        label: language === 'ar' ? 'المخطط الرئيسي المعتمد - المرحلة 2' : 'Planned Master Plan Phase 2',
        desc: language === 'ar' ? 'ممر توسعة الكورنيش والمناطق الذكية عالية الكثافة' : 'Corniche Expansion Corridor & High-Density Smart Zones',
        badgeColor: 'bg-blue-950 text-blue-300 border-blue-800',
      };
    } else {
      return {
        label: language === 'ar' ? 'رؤية أبوظبي 2035' : 'Abu Dhabi Vision 2035',
        desc: language === 'ar' ? 'مسار النقل ذاتي القيادة والمجمع المائي المحايد كربونياً' : 'Autonomous Micro-Transit Loop & Net-Zero Waterfront Enclave',
        badgeColor: 'bg-purple-950 text-purple-300 border-purple-800',
      };
    }
  };

  const timelineEra = getTimelineEra();

  return (
    <WorkspaceLayout>
      <div className="flex-1 flex flex-col h-[calc(100vh-112px)] overflow-hidden bg-canvas text-navy-900 select-none">
        {/* Top Bar: Use Cases & 4D Timeline */}
        <div className="h-14 bg-white border-b border-border px-6 flex items-center justify-between text-xs shrink-0 z-30 shadow-2xs">
          {/* Left: Module Code & Use Case Selector */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 font-bold border border-sky-200">
              <Cube className="w-4 h-4" />
              <span>{language === 'ar' ? 'التوأم الرقمي 3D • الوحدة E' : 'Digital Twin 3D • Module E'}</span>
            </div>

            <div className="hidden md:flex items-center gap-1 bg-canvas p-1 rounded-lg border border-border">
              {[
                { id: 'planning', label: language === 'ar' ? 'التخطيط الحضري' : 'Urban Planning' },
                { id: 'assets', label: language === 'ar' ? 'الأصول والمرافق' : 'Assets & Facilities' },
                { id: 'mobility', label: language === 'ar' ? 'التنقل والبيئة' : 'Mobility & Environment' },
                { id: 'site_context', idVal: 'context', label: language === 'ar' ? 'سياق الموقع' : 'Site Context' },
                { id: 'resilience', label: language === 'ar' ? 'المرونة والاستدامة' : 'Resilience' },
              ].map((uc) => {
                const val = (uc.idVal || uc.id) as any;
                const isSelected = selectedUseCase === val;
                return (
                  <button
                    key={uc.id}
                    onClick={() => handleUseCaseChange(val)}
                    className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-text-secondary hover:text-navy-900 hover:bg-white'
                    }`}
                  >
                    {uc.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center/Right: 4D Temporal Timeline (2020 – 2035) & Sun/Shadow Simulation */}
          <div className="flex items-center gap-3">
            {/* 4D Timeline Dial */}
            <div className="flex items-center gap-2 bg-canvas px-3 py-1 rounded-lg border border-border text-xs">
              <Clock className="w-4 h-4 text-gold-500" />
              <span className="text-text-secondary">{language === 'ar' ? 'الجدول الزمني 4D:' : '4D Timeline:'}</span>
              <span className="font-mono font-bold text-navy-900 text-xs">{timelineMonth} {timelineYear}</span>
              <input
                type="range"
                min="2020"
                max="2035"
                value={timelineYear}
                onChange={(e) => setTimelineYear(parseInt(e.target.value))}
                className="w-24 lg:w-32 accent-amber-500 cursor-pointer"
              />
              <div className="hidden lg:flex items-center gap-1 text-[10px]">
                {[2020, 2027, 2035].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setTimelineYear(yr)}
                    className={`px-1.5 py-0.5 rounded font-mono ${
                      timelineYear === yr ? 'bg-amber-400 text-navy-950 font-bold' : 'text-text-secondary hover:text-navy-900'
                    }`}
                  >
                    {yr === 2027 ? (language === 'ar' ? 'الآن' : 'NOW') : yr}
                  </button>
                ))}
              </div>
            </div>

            {/* Sun / Shadow Simulation button */}
            <button
              onClick={() => setShadowSimulation(!shadowSimulation)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
                shadowSimulation
                  ? 'bg-amber-400 text-navy-900 border-amber-400 font-bold'
                  : 'bg-white border-border text-text-secondary hover:text-navy-900 hover:bg-canvas'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{language === 'ar' ? 'محاكاة الظلال' : 'Shadow Sim'}</span>
            </button>

            {/* Solar Scrubber (visible when shadow simulation active) */}
            {shadowSimulation && (
              <div className="hidden xl:flex items-center gap-2 bg-canvas px-2.5 py-1 rounded-lg border border-amber-300 text-xs animate-in fade-in">
                <span className="text-amber-600 font-mono text-[11px] font-bold">
                  {sunHour.toString().padStart(2, '0')}:00 GST
                </span>
                <input
                  type="range"
                  min="8"
                  max="18"
                  step="1"
                  value={sunHour}
                  onChange={(e) => setSunHour(parseInt(e.target.value))}
                  className="w-20 accent-amber-500 cursor-pointer"
                  title="Sun time of day (08:00 to 18:00 GST)"
                />
              </div>
            )}
          </div>
        </div>

        {/* 3D Scene Viewport with Floating Overlays */}
        <div className="flex-1 relative overflow-hidden flex">
          {/* Main 3D Spatial Canvas */}
          <div className="flex-1 h-full relative overflow-hidden bg-slate-100">
            {/* Viewport Visual Asset (Photorealistic High-Resolution Digital Twin) */}
            <div
              className="absolute inset-0 w-full h-full transition-all duration-500"
              style={{ filter: getLightingFilter() }}
            >
              {cameraView === 'isometric' && (
                <img
                  src="/digital-twin/isometric.jpg"
                  alt="Abu Dhabi 3D Digital Twin Isometric LoD2 Mesh View"
                  className="w-full h-full object-cover object-center animate-in fade-in duration-300 select-none"
                />
              )}
              {cameraView === 'overhead' && (
                <img
                  src="/digital-twin/nadir.jpg"
                  alt="Abu Dhabi Waterfront 2D Nadir Orthographic Engineering CAD/GIS Plan"
                  className="w-full h-full object-cover object-center animate-in fade-in duration-300 select-none"
                />
              )}
              {cameraView === 'street' && (
                <img
                  src="/digital-twin/street.jpg"
                  alt="Abu Dhabi Corniche Street-Level Autonomous Mobility & IoT Perspective"
                  className="w-full h-full object-cover object-center animate-in fade-in duration-300 select-none"
                />
              )}
            </div>

            {/* Dynamic Solar Angle Shadow Overlay (Simulated Sunlight & Shading) */}
            {shadowSimulation && (
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-300 mix-blend-multiply"
                style={{
                  background:
                    sunHour <= 10
                      ? 'linear-gradient(115deg, rgba(245, 158, 11, 0.15) 0%, rgba(15, 23, 42, 0.45) 80%)'
                      : sunHour >= 16
                      ? 'linear-gradient(245deg, rgba(234, 88, 12, 0.22) 0%, rgba(15, 23, 42, 0.5) 85%)'
                      : 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(15, 23, 42, 0.25) 100%)',
                }}
              />
            )}

            {/* Top Camera Angle Switcher (RTL Mirrored) */}
            <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 z-20 flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-xl border border-border shadow-lg text-xs">
              <span className="text-[10px] text-text-secondary font-bold px-2 uppercase tracking-wider">
                {language === 'ar' ? 'زاوية الكاميرا' : 'Camera View'}
              </span>
              <button
                onClick={() => setCameraView('isometric')}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                  cameraView === 'isometric'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-text-secondary hover:text-navy-900 hover:bg-canvas'
                }`}
              >
                {language === 'ar' ? 'ثلاثي الأبعاد' : 'Isometric 3D'}
              </button>
              <button
                onClick={() => setCameraView('overhead')}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                  cameraView === 'overhead'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-text-secondary hover:text-navy-900 hover:bg-canvas'
                }`}
              >
                {language === 'ar' ? 'مسقط رأسي 2D' : 'Nadir (2D Top)'}
              </button>
              <button
                onClick={() => setCameraView('street')}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                  cameraView === 'street'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-text-secondary hover:text-navy-900 hover:bg-canvas'
                }`}
              >
                {language === 'ar' ? 'مستوى الشارع' : 'Street Level'}
              </button>
            </div>

            {/* Top Floating HUD: Active Use Case Telemetry (RTL Mirrored) */}
            <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-20 hidden md:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-border shadow-lg text-xs">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-text-secondary font-medium">
                  {language === 'ar' ? 'وضع الاستخدام:' : 'Use Case Mode:'}
                </span>
                <span className="font-bold text-navy-900 capitalize">
                  {selectedUseCase === 'planning' && (language === 'ar' ? 'التخطيط الحضري (معامل البناء وتخصيص المناطق)' : 'Urban Planning (FAR & Zoning Envelopes)')}
                  {selectedUseCase === 'assets' && (language === 'ar' ? 'الأصول والمرافق (بيانات BIM وتشغيل المباني)' : 'Assets & Facilities (BIM & MEP Telemetry)')}
                  {selectedUseCase === 'mobility' && (language === 'ar' ? 'التنقل والبيئة (النقل ذاتي القيادة وجودة الهواء)' : 'Mobility & Environment (Autonomous Transit & AQI)')}
                  {selectedUseCase === 'context' && (language === 'ar' ? 'سياق الموقع (المخطط العقاري وخط الارتداد الساحلي)' : 'Site Context (Cadastral & Coastal Setbacks)')}
                  {selectedUseCase === 'resilience' && (language === 'ar' ? 'المرونة الحضرية (مستوى ارتفاع البحر والمؤشر الحراري)' : 'Resilience (Coastal Inundation & Heat Index)')}
                </span>
              </div>
            </div>

            {/* 4D Era Banner (RTL Mirrored) */}
            <div className="absolute top-16 left-4 rtl:left-auto rtl:right-4 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-border shadow-md text-[11px]">
              <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] border ${timelineEra.badgeColor}`}>
                {timelineYear} {timelineYear === 2027 ? (language === 'ar' ? 'الحالي' : 'CURRENT') : timelineYear > 2027 ? (language === 'ar' ? 'المستقبل' : 'FUTURE') : (language === 'ar' ? 'الماضي' : 'PAST')}
              </span>
              <span className="text-navy-900 font-medium">{timelineEra.desc}</span>
            </div>

            {/* ========================================================================= */}
            {/* VIEW SPECIFIC INTERACTIVE OVERLAYS */}
            {/* ========================================================================= */}

            {/* ---------------- 1. ISOMETRIC 3D INTERACTIVE OVERLAYS ---------------- */}
            {cameraView === 'isometric' && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Building Hotspots / LoD2 Mesh Inspection Pins */}
                {layers.buildings3D && (
                  <>
                    {/* Burj Mohammed Bin Rashid (381m) */}
                    <div
                      style={{ top: '12%', left: '36%' }}
                      onClick={() => setSelectedAsset(DIGITAL_TWIN_ASSETS[1])}
                      className={`absolute pointer-events-auto cursor-pointer group flex flex-col items-center transition-transform hover:scale-105 ${
                        selectedAsset?.id === 'AD-TWR-BMBR' ? 'scale-105 z-30' : 'z-20'
                      }`}
                    >
                      <div
                        className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border backdrop-blur-md shadow-lg flex items-center gap-1.5 transition-colors ${
                          selectedAsset?.id === 'AD-TWR-BMBR'
                            ? 'bg-amber-400 text-navy-950 border-amber-300 ring-2 ring-amber-400'
                            : 'bg-white/95 text-navy-900 border-border group-hover:border-cyan-500'
                        }`}
                      >
                        <Buildings className="w-3.5 h-3.5" />
                        <span>Burj Mohammed Bin Rashid • 381m</span>
                        <span className="text-[9px] px-1 py-0.2 bg-cyan-50 text-cyan-800 border border-cyan-200 rounded">LoD2</span>
                      </div>
                      <div className="w-0.5 h-6 bg-gradient-to-b from-cyan-500 to-transparent"></div>
                      <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></div>
                    </div>

                    {/* Etihad Towers (305m) */}
                    <div
                      style={{ top: '20%', left: '55%' }}
                      onClick={() => setSelectedAsset(DIGITAL_TWIN_ASSETS[2])}
                      className={`absolute pointer-events-auto cursor-pointer group flex flex-col items-center transition-transform hover:scale-105 ${
                        selectedAsset?.id === 'AD-TWR-ETIHAD' ? 'scale-105 z-30' : 'z-20'
                      }`}
                    >
                      <div
                        className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border backdrop-blur-md shadow-lg flex items-center gap-1.5 transition-colors ${
                          selectedAsset?.id === 'AD-TWR-ETIHAD'
                            ? 'bg-amber-400 text-navy-950 border-amber-300 ring-2 ring-amber-400'
                            : 'bg-white/95 text-navy-900 border-border group-hover:border-amber-500'
                        }`}
                      >
                        <Buildings className="w-3.5 h-3.5" />
                        <span>Etihad Towers (T2) • 305m</span>
                      </div>
                      <div className="w-0.5 h-5 bg-gradient-to-b from-amber-500 to-transparent"></div>
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    </div>

                    {/* Nation Towers (268m) */}
                    <div
                      style={{ top: '27%', left: '66%' }}
                      onClick={() => setSelectedAsset(DIGITAL_TWIN_ASSETS[3])}
                      className={`absolute pointer-events-auto cursor-pointer group flex flex-col items-center transition-transform hover:scale-105 ${
                        selectedAsset?.id === 'AD-TWR-NATION' ? 'scale-105 z-30' : 'z-20'
                      }`}
                    >
                      <div
                        className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border backdrop-blur-md shadow-lg flex items-center gap-1.5 transition-colors ${
                          selectedAsset?.id === 'AD-TWR-NATION'
                            ? 'bg-amber-400 text-navy-950 border-amber-300 ring-2 ring-amber-400'
                            : 'bg-white/95 text-navy-900 border-border group-hover:border-cyan-500'
                        }`}
                      >
                        <Buildings className="w-3.5 h-3.5" />
                        <span>Nation Towers • 268m</span>
                      </div>
                      <div className="w-0.5 h-5 bg-gradient-to-b from-cyan-500 to-transparent"></div>
                      <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                    </div>

                    {/* Al Maryah Capital (AD-BLD-000482) */}
                    <div
                      style={{ top: '45%', left: '22%' }}
                      onClick={() => setSelectedAsset(DIGITAL_TWIN_ASSETS[0])}
                      className={`absolute pointer-events-auto cursor-pointer group flex flex-col items-center transition-transform hover:scale-105 ${
                        selectedAsset?.id === 'AD-BLD-000482' ? 'scale-105 z-30' : 'z-20'
                      }`}
                    >
                      <div
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border backdrop-blur-md shadow-lg flex items-center gap-1 transition-colors ${
                          selectedAsset?.id === 'AD-BLD-000482'
                            ? 'bg-amber-400 text-navy-950 border-amber-300 ring-2 ring-amber-400'
                            : 'bg-white/95 text-navy-900 border-border group-hover:border-emerald-500'
                        }`}
                      >
                        <span>AD-BLD-000482</span>
                      </div>
                    </div>
                  </>
                )}

                {/* 4D Future Expansion Overlay (when timeline >= 2030) */}
                {timelineYear >= 2030 && (
                  <div
                    style={{ top: '65%', left: '42%' }}
                    className="absolute pointer-events-auto bg-purple-50/95 backdrop-blur-md border border-purple-200 p-2.5 rounded-xl shadow-xl text-[10px] max-w-[210px] space-y-1 animate-in zoom-in-95 duration-300"
                  >
                    <div className="flex items-center gap-1.5 text-purple-800 font-bold uppercase tracking-wider">
                      <Tree className="w-3.5 h-3.5" />
                      <span>{timelineYear} Planned Expansion</span>
                    </div>
                    <p className="text-text-secondary">
                      Smart Energy Hub & Coastal Revetment (Net-Zero District)
                    </p>
                    <div className="text-[9px] text-purple-700 font-mono">
                      Permitted GFA: 120,000 m² • Target LEED Zero
                    </div>
                  </div>
                )}

                {/* Live IoT Sensor Pins (AQ-0117, AQ-0118, TR-0492) */}
                {layers.iotSensors && (
                  <>
                    <div
                      style={{ top: '72%', left: '74%' }}
                      onClick={() => setSelectedSensor(DIGITAL_TWIN_SENSORS[0])}
                      className="absolute pointer-events-auto cursor-pointer flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-300 shadow-lg hover:border-emerald-500 transition-all"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      <span className="text-[10px] font-mono font-bold text-emerald-800">
                        AQ-0117 • PM2.5 18 µg/m³
                      </span>
                    </div>

                    <div
                      style={{ top: '80%', left: '48%' }}
                      onClick={() => setSelectedSensor(DIGITAL_TWIN_SENSORS[2])}
                      className="absolute pointer-events-auto cursor-pointer flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-blue-300 shadow-lg hover:border-blue-500 transition-all"
                    >
                      <Car className="w-3 h-3 text-blue-600" />
                      <span className="text-[10px] font-mono font-bold text-blue-800">
                        TR-0492 • 54 km/h
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ---------------- 2. NADIR (2D TOP) CAD/GIS PLAN OVERLAYS ---------------- */}
            {cameraView === 'overhead' && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Engineering Scale & Coordinate Datum HUD */}
                <div className="absolute top-16 right-4 w-72 pointer-events-auto bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-border shadow-xl text-[10px] font-mono space-y-1.5 text-text-secondary">
                  <div className="flex items-center justify-between text-blue-600 font-bold border-b border-border pb-1.5">
                    <span>CAD/GIS Orthographic View</span>
                    <span className="px-1.5 py-0.5 rounded bg-canvas text-navy-900 border border-border font-semibold">1:2500 Scale</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Projection:</span>
                    <span className="text-navy-900">UAE DLTM (WGS84 EPSG:3997)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Center:</span>
                    <span className="text-navy-900">24° 29' 42" N, 54° 22' 14" E</span>
                  </div>
                  <div className="pt-1.5 border-t border-border flex items-center justify-between text-text-muted">
                    <span>Parcels Active: 14</span>
                    <span className="text-emerald-600 font-bold">Zoning: ADM-2026</span>
                  </div>
                  {activeParcel && (
                    <div className="pt-1.5 border-t border-border text-amber-600 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                      <span>Selected: {activeParcel}</span>
                    </div>
                  )}
                </div>

                {/* Clickable Parcel Hotspots on the Map */}
                {layers.planningZones && (
                  <>
                    {/* Parcel C1 - Commercial / ADGM */}
                    <div
                      style={{ top: '48%', left: '58%' }}
                      onClick={() => {
                        setActiveParcel('Plot C1 — Commercial High-Rise');
                        setSelectedAsset(DIGITAL_TWIN_ASSETS[0]);
                      }}
                      className={`absolute pointer-events-auto cursor-pointer px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border backdrop-blur-md shadow-lg transition-transform hover:scale-105 ${
                        activeParcel?.includes('C1')
                          ? 'bg-blue-600 text-white border-blue-300 ring-2 ring-blue-400'
                          : 'bg-white/95 text-blue-700 border-blue-200 hover:border-blue-400'
                      }`}
                    >
                      Plot C1 • Commercial/Office (FAR 5.5)
                    </div>

                    {/* Parcel Y3 - Residential */}
                    <div
                      style={{ top: '32%', left: '5%' }}
                      onClick={() => {
                        setActiveParcel('Plot Y3 — Residential Zone');
                        setSelectedAsset(DIGITAL_TWIN_ASSETS[5] || DIGITAL_TWIN_ASSETS[0]);
                      }}
                      className={`absolute pointer-events-auto cursor-pointer px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border backdrop-blur-md shadow-lg transition-transform hover:scale-105 ${
                        activeParcel?.includes('Y3')
                          ? 'bg-amber-500 text-navy-950 border-amber-300 ring-2 ring-amber-400'
                          : 'bg-white/95 text-amber-700 border-amber-200 hover:border-amber-400'
                      }`}
                    >
                      Plot Y3 • Residential (Y3)
                    </div>

                    {/* Public Park Green Buffer */}
                    <div
                      style={{ top: '48%', left: '80%' }}
                      onClick={() => setActiveParcel('MU-S Public Waterfront Park & Mangroves')}
                      className={`absolute pointer-events-auto cursor-pointer px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border backdrop-blur-md shadow-lg transition-transform hover:scale-105 ${
                        activeParcel?.includes('Public')
                          ? 'bg-emerald-600 text-white border-emerald-300 ring-2 ring-emerald-400'
                          : 'bg-white/95 text-emerald-700 border-emerald-200 hover:border-emerald-400'
                      }`}
                    >
                      Public Park (MU-S)
                    </div>

                    {/* Marina Berths */}
                    <div
                      style={{ top: '70%', left: '72%' }}
                      onClick={() => setActiveParcel('Marina Yacht Berths AB 24.1')}
                      className="absolute pointer-events-auto cursor-pointer px-2 py-0.5 rounded text-[9px] font-mono font-semibold bg-white/95 text-cyan-800 border border-cyan-300 shadow-xs"
                    >
                      Marina Berths • 42 Vessels
                    </div>
                  </>
                )}

                {/* Real-time Traffic Flow overlay tracers along Corniche Road */}
                {layers.trafficConditions && (
                  <div
                    style={{ top: '65%', left: '25%' }}
                    className="absolute pointer-events-auto bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-300 shadow-lg text-[10px] font-mono flex items-center gap-2"
                  >
                    <Car className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Corniche Main Corridor: <strong className="text-emerald-700">54 km/h (Free Flow)</strong></span>
                  </div>
                )}
              </div>
            )}

            {/* ---------------- 3. STREET LEVEL INTERACTIVE OVERLAYS ---------------- */}
            {cameraView === 'street' && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Autonomous Electric Shuttle Overlay (AV-04) */}
                <div
                  style={{ top: '68%', left: '46%' }}
                  onClick={() => setSelectedSensor(DIGITAL_TWIN_SENSORS[4] || DIGITAL_TWIN_SENSORS[0])}
                  className="absolute pointer-events-auto cursor-pointer group flex flex-col items-center transition-transform hover:scale-105"
                >
                  <div className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-white/95 text-cyan-800 border border-cyan-400 shadow-xl flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span>
                    <span>AV-04 Autonomous Pod • 28 km/h</span>
                  </div>
                  <div className="w-0.5 h-4 bg-cyan-500"></div>
                </div>

                {/* Smart Streetlight Luminaire & Environmental Node (LP-08) */}
                <div
                  style={{ top: '38%', left: '86%' }}
                  onClick={() => setSelectedSensor(DIGITAL_TWIN_SENSORS[3] || DIGITAL_TWIN_SENSORS[0])}
                  className="absolute pointer-events-auto cursor-pointer group flex flex-col items-center transition-transform hover:scale-105"
                >
                  <div className="px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-bold bg-white/95 text-navy-900 border border-border shadow-xl space-y-0.5">
                    <div className="flex items-center gap-1 text-navy-900">
                      <Broadcast className="w-3.5 h-3.5 text-amber-500" />
                      <span>Smart Pole #08 (IoT Node)</span>
                    </div>
                    <div className="text-[9px] text-text-secondary">
                      Air: 28°C • Noise: 65 dB • 5G Active
                    </div>
                  </div>
                  <div className="w-0.5 h-4 bg-amber-500"></div>
                </div>

                {/* Skyscraper Facade Telemetry Hotspots */}
                <div
                  style={{ top: '24%', left: '16%' }}
                  onClick={() => setSelectedAsset(DIGITAL_TWIN_ASSETS[1])}
                  className="absolute pointer-events-auto cursor-pointer px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-white/95 text-navy-900 border border-border shadow-lg backdrop-blur-md"
                >
                  <span>Energy Load: 4.2 MW • Solar Glazing 34%</span>
                </div>

                <div
                  style={{ top: '10%', left: '52%' }}
                  onClick={() => setSelectedAsset(DIGITAL_TWIN_ASSETS[2])}
                  className="absolute pointer-events-auto cursor-pointer px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-white/95 text-navy-900 border border-border shadow-lg backdrop-blur-md"
                >
                  <span>Structural Integrity: 98.4% (Normal)</span>
                </div>

                {/* Pedestrian Foot-Traffic Counter HUD */}
                <div
                  style={{ bottom: '20px', right: '20px' }}
                  className="absolute pointer-events-auto bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-border shadow-xl text-[11px] font-mono text-text-secondary flex items-center gap-2.5"
                >
                  <Tree className="w-4 h-4 text-emerald-600" />
                  <div>
                    <span className="text-navy-900 font-bold">Corniche Promenade:</span> 420 ped/hr (Optimal Flow)
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Left: Live IoT Sensor Stream Tooltip Pill (RTL Mirrored) */}
            {selectedSensor && (
              <div className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-border shadow-2xl text-xs max-w-sm space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-emerald-600 font-bold font-mono">
                    <Broadcast className="w-4 h-4 animate-pulse" />
                    {selectedSensor.id} · {selectedSensor.parameter} {selectedSensor.value}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {selectedSensor.status}
                  </span>
                </div>
                <div className="text-[11px] text-text-secondary flex items-center justify-between pt-1 border-t border-border">
                  <span>{language === 'ar' ? 'الجهة المالكة:' : 'Owner:'} <strong className="text-navy-900">{selectedSensor.owner}</strong></span>
                  <span className="text-text-muted font-mono">{selectedSensor.freshness}</span>
                </div>
                {selectedSensor.history && (
                  <div className="flex items-center gap-1 pt-1">
                    <span className="text-[9px] text-text-muted font-mono">{language === 'ar' ? 'المؤشر:' : 'Trend:'}</span>
                    <div className="flex items-end gap-1 h-3 flex-1">
                      {selectedSensor.history.map((val: number, i: number) => (
                        <div
                          key={i}
                          style={{ height: `${Math.min(100, Math.max(20, val * 3))}%` }}
                          className="flex-1 bg-emerald-500 rounded-xs"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Floating Drawer: Layer Controls & Asset Inspection (RTL Mirrored) */}
          <div className="w-80 lg:w-96 bg-white border-l rtl:border-l-0 rtl:border-r border-border p-5 flex flex-col justify-between overflow-y-auto space-y-5 shrink-0 z-20 shadow-xs">
            <div>
              {/* Selected Asset Card */}
              {selectedAsset && (
                <div className="bg-canvas rounded-xl border border-border p-4 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                        {language === 'ar' ? 'الأصل المفحوص' : 'Inspected Asset'}
                      </span>
                      <h3 className="text-sm font-bold text-navy-900 mt-0.5">{selectedAsset.name}</h3>
                    </div>
                    <span className="text-[10px] font-mono text-navy-900 font-bold px-2 py-0.5 rounded bg-white border border-border">
                      {selectedAsset.id}
                    </span>
                  </div>

                  <dl className="space-y-1.5 text-xs">
                    <div className="flex justify-between py-0.5">
                      <dt className="text-text-secondary">{language === 'ar' ? 'الارتفاع المعماري' : 'Architectural Height'}</dt>
                      <dd className="font-mono font-bold text-navy-900">{selectedAsset.height}</dd>
                    </div>
                    <div className="flex justify-between py-0.5">
                      <dt className="text-text-secondary">{language === 'ar' ? 'عدد الطوابق' : 'Floors / Levels'}</dt>
                      <dd className="font-mono text-text-secondary">{selectedAsset.floors} {language === 'ar' ? 'طوابق' : 'Floors'}</dd>
                    </div>
                    <div className="flex justify-between py-0.5">
                      <dt className="text-text-secondary">{language === 'ar' ? 'الاستخدام المخصص' : 'Designated Use'}</dt>
                      <dd className="font-semibold text-navy-900">{selectedAsset.use}</dd>
                    </div>
                    <div className="flex justify-between py-0.5">
                      <dt className="text-text-secondary">{language === 'ar' ? 'مواصفات BIM' : 'BIM Specification'}</dt>
                      <dd className="font-mono text-emerald-700 font-semibold">{selectedAsset.bimModel}</dd>
                    </div>
                    <div className="flex justify-between py-0.5">
                      <dt className="text-text-secondary">{language === 'ar' ? 'استهلاك الطاقة الحي' : 'Live Energy Load'}</dt>
                      <dd className="font-mono font-bold text-amber-600">{selectedAsset.energy}</dd>
                    </div>
                    <div className="flex justify-between py-0.5">
                      <dt className="text-text-secondary">{language === 'ar' ? 'نسبة الإشغال الحالية' : 'Current Occupancy'}</dt>
                      <dd className="font-mono text-navy-900">{selectedAsset.occupancy}</dd>
                    </div>
                  </dl>

                  <div className="pt-2 border-t border-border flex items-center gap-2">
                    <button
                      onClick={() => setIsBimModalOpen(true)}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Cube className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'فتح BIM (IFC-4)' : 'Open BIM (IFC-4)'}</span>
                    </button>
                    <button
                      onClick={() => setIsScenarioModalOpen(true)}
                      className="py-1.5 px-3 rounded-lg bg-white hover:bg-canvas text-navy-900 border border-border font-medium text-xs transition-colors flex items-center gap-1.5 shadow-2xs"
                    >
                      <ChartLineUp className="w-3.5 h-3.5 text-amber-500" />
                      <span>{language === 'ar' ? 'مقارنة السيناريوهات' : 'Compare Scenarios'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Layer Toggles & Opacity Controls */}
              <div className="mt-5 space-y-3">
                <div className="text-[11px] font-bold text-navy-900 uppercase tracking-wider flex items-center justify-between">
                  <span>{language === 'ar' ? 'طبقات التوأم الرقمي 3D' : '3D Digital Twin Layers'}</span>
                  <span className="text-text-muted text-[10px]">{language === 'ar' ? '6 عناصر تحكم نشطة' : '6 Active Controls'}</span>
                </div>

                <div className="space-y-2 text-xs">
                  {[
                    { key: 'buildings3D', label: language === 'ar' ? 'مجسمات المباني ثلاثية الأبعاد (LoD2)' : '3D Building LoD2 Meshes', icon: Buildings },
                    { key: 'bimModels', label: language === 'ar' ? 'نماذج BIM الإنشائية والمعمارية التفصيلية' : 'IFC BIM High Detail LOD', icon: Cube },
                    { key: 'iotSensors', label: language === 'ar' ? 'مستشعرات إنترنت الأشياء البيئية الحية' : 'Live IoT Environmental Sensors', icon: Broadcast },
                    { key: 'trafficConditions', label: language === 'ar' ? 'سرعات الحركة المرورية الحية' : 'Real-Time Traffic Flow Speeds', icon: Car },
                    { key: 'undergroundUtilities', label: language === 'ar' ? 'شبكات المرافق والبنية التحتية تحت الأرض' : 'Underground Wet & Dry Utilities', icon: Lightning },
                    { key: 'planningZones', label: language === 'ar' ? 'مخططات المناطق الحضرية 2030' : '2030 Master Planning Zones', icon: Tree },
                  ].map((layer) => {
                    const IconComp = layer.icon;
                    const isActive = layers[layer.key as keyof typeof layers];
                    return (
                      <div
                        key={layer.key}
                        onClick={() => toggleLayer(layer.key as any)}
                        className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                          isActive
                            ? 'bg-blue-50/70 border-blue-200 text-navy-900 font-semibold'
                            : 'bg-canvas border-border text-text-secondary hover:text-navy-900 hover:bg-canvas-subtle'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <IconComp className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-text-muted'}`} />
                          <span className="font-medium text-[11px]">{layer.label}</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={isActive}
                          onChange={() => {}}
                          className="accent-blue-600 cursor-pointer"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Status strip */}
            <div className="pt-3 border-t border-border text-[10px] text-text-muted flex items-center justify-between font-mono">
              <span>Cesium 3D Tiles v1.1 • WebGL 2.0</span>
              <span className="text-emerald-600 flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                60 FPS Render
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. IFC-4 BIM INSPECTOR MODAL */}
      {/* ========================================================================= */}
      {isBimModalOpen && selectedAsset && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-border rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200 text-text-primary">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-canvas">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
                  <Cube className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-navy-900">{selectedAsset.name}</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-navy-900 border border-border">
                      {selectedAsset.id}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5">
                    BuildingSMART Certified IFC-4 / OpenBIM Specification (LOD 350 - 400)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsBimModalOpen(false)}
                className="p-1.5 rounded-lg text-text-secondary hover:text-navy-900 hover:bg-canvas-subtle transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-2 px-6 border-b border-border bg-canvas-subtle text-xs">
              {[
                { id: 'arch', label: language === 'ar' ? 'العمارة والإنشاء' : 'Architectural & Structure' },
                { id: 'mep', label: language === 'ar' ? 'الميكانيك والكهرباء والمرافق' : 'MEP & Facilities' },
                { id: 'sustainability', label: language === 'ar' ? 'استدامة والكربون' : 'Estidama & Carbon' },
                { id: 'hierarchy', label: language === 'ar' ? 'شجرة التسلسل المكاني' : 'IFC Spatial Tree' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setBimActiveTab(tab.id as any)}
                  className={`py-3 px-3 font-semibold border-b-2 transition-colors ${
                    bimActiveTab === tab.id
                      ? 'border-blue-600 text-navy-900 font-bold'
                      : 'border-transparent text-text-secondary hover:text-navy-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              {bimActiveTab === 'arch' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="bg-canvas p-3 rounded-xl border border-border">
                      <span className="text-[10px] text-text-secondary uppercase">Total Height</span>
                      <p className="text-base font-bold font-mono text-navy-900 mt-1">{selectedAsset.height}</p>
                    </div>
                    <div className="bg-canvas p-3 rounded-xl border border-border">
                      <span className="text-[10px] text-text-secondary uppercase">Levels Above Grade</span>
                      <p className="text-base font-bold font-mono text-navy-900 mt-1">{selectedAsset.floors} Storeys</p>
                    </div>
                    <div className="bg-canvas p-3 rounded-xl border border-border">
                      <span className="text-[10px] text-text-secondary uppercase">Gross Floor Area (GFA)</span>
                      <p className="text-base font-bold font-mono text-navy-900 mt-1">84,500 m²</p>
                    </div>
                  </div>

                  <div className="bg-canvas p-4 rounded-xl border border-border space-y-2">
                    <h4 className="font-bold text-navy-900 text-xs flex items-center gap-1.5">
                      <Buildings className="w-4 h-4 text-blue-600" />
                      Structural System & Envelope
                    </h4>
                    <p className="text-text-secondary leading-relaxed">
                      <strong className="text-navy-900">Core & Outriggers:</strong> {selectedAsset.structure || 'Reinforced concrete shear wall core with high-performance perimeter composite mega-columns.'}
                    </p>
                    <p className="text-text-secondary leading-relaxed">
                      <strong className="text-navy-900">Curtain Facade:</strong> {selectedAsset.facadeType || 'Unitized double-glazed Low-E solar neutral coating with aerodynamic corner chamfers.'}
                    </p>
                    <p className="text-text-secondary leading-relaxed">
                      <strong className="text-navy-900">Civil Defense Rating:</strong> {selectedAsset.fireSafety || 'Abu Dhabi Civil Defense Code 2026 Type A1 Automatic Sprinkler & Pressurized Core.'}
                    </p>
                  </div>
                </div>
              )}

              {bimActiveTab === 'mep' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-canvas p-3 rounded-xl border border-border">
                      <span className="text-[10px] text-text-secondary">Chilled Water Demand (Tons)</span>
                      <p className="text-base font-bold font-mono text-cyan-700 mt-1">2,450 TR</p>
                      <span className="text-[10px] text-text-muted">Tabreed District Cooling Network</span>
                    </div>
                    <div className="bg-canvas p-3 rounded-xl border border-border">
                      <span className="text-[10px] text-text-secondary">Peak Connected Electrical</span>
                      <p className="text-base font-bold font-mono text-amber-600 mt-1">{selectedAsset.energy}</p>
                      <span className="text-[10px] text-text-muted">ADDC 11kV Substation Incomer</span>
                    </div>
                  </div>

                  <div className="bg-canvas p-3.5 rounded-xl border border-border space-y-2">
                    <h4 className="font-bold text-navy-900 text-xs">Live Telemetry Diagnostics</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                      <div className="bg-white p-2 rounded border border-border">
                        <span className="text-text-muted">HVAC Health:</span>
                        <div className="font-bold text-emerald-600">{selectedAsset.hvacHealth || '99.4%'}</div>
                      </div>
                      <div className="bg-white p-2 rounded border border-border">
                        <span className="text-text-muted">Lift Group:</span>
                        <div className="font-bold text-navy-900">8/8 Running</div>
                      </div>
                      <div className="bg-white p-2 rounded border border-border">
                        <span className="text-text-muted">Indoor Temp:</span>
                        <div className="font-bold text-blue-600">22.4°C</div>
                      </div>
                      <div className="bg-white p-2 rounded border border-border">
                        <span className="text-text-muted">CO2 Sensors:</span>
                        <div className="font-bold text-emerald-600">410 ppm</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {bimActiveTab === 'sustainability' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-canvas p-3 rounded-xl border border-border">
                      <span className="text-[10px] text-text-secondary">Estidama Pearl Rating</span>
                      <p className="text-sm font-bold text-emerald-700 mt-1">3 Pearls (Commercial)</p>
                    </div>
                    <div className="bg-canvas p-3 rounded-xl border border-border">
                      <span className="text-[10px] text-text-secondary">Operational Carbon</span>
                      <p className="text-sm font-bold font-mono text-navy-900 mt-1">{selectedAsset.co2Footprint}</p>
                    </div>
                    <div className="bg-canvas p-3 rounded-xl border border-border">
                      <span className="text-[10px] text-text-secondary">Solar PV Rooftop</span>
                      <p className="text-sm font-bold font-mono text-amber-600 mt-1">145 kWp</p>
                    </div>
                  </div>
                  <p className="text-text-secondary leading-relaxed">
                    Complies with Abu Dhabi Department of Municipalities and Transport (DMT) Green Building Regulations.
                    Water recycling efficiency currently offsets 42% of landscape irrigation requirements via graywater treatment plant.
                  </p>
                </div>
              )}

              {bimActiveTab === 'hierarchy' && (
                <div className="bg-canvas p-4 rounded-xl border border-border font-mono text-text-secondary space-y-1.5">
                  <div className="text-blue-700 font-bold">▾ IfcProject: Abu_Dhabi_Corniche_Phase1</div>
                  <div className="pl-4 text-cyan-700">▾ IfcSite: Al_Maryah_Capital_Waterfront</div>
                  <div className="pl-8 text-amber-700">▾ IfcBuilding: {selectedAsset.id} ({selectedAsset.name})</div>
                  <div className="pl-12 text-navy-900 font-semibold">▾ IfcBuildingStorey: Level_38 (Roof & Sky Garden)</div>
                  <div className="pl-16 text-text-muted">• IfcSpace: Executive Penthouse & Lounge</div>
                  <div className="pl-16 text-text-muted">• IfcCurtainWall: Double Glazed Unitized Panel 482-CW-14</div>
                  <div className="pl-12 text-navy-900 font-semibold">▸ IfcBuildingStorey: Level_01 (Grand Lobby & ADGM Pods)</div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-border bg-canvas flex items-center justify-between">
              <span className="text-[11px] text-text-muted font-mono">
                Schema: IFC4 Add2 TC1 (ISO 16739:2013)
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsBimModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white hover:bg-canvas border border-border text-navy-900 text-xs font-semibold transition-colors"
                >
                  {language === 'ar' ? 'إغلاق' : 'Close'}
                </button>
                <button
                  onClick={() => {
                    triggerToast(language === 'ar' ? `جاري تصدير حزمة STEP الهندسية لـ ${selectedAsset.name}...` : `Exporting IFC-4 geometric STEP package (LOD 400) for ${selectedAsset.name}...`);
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <DownloadSimple className="w-4 h-4" />
                  <span>{language === 'ar' ? 'تحميل ملف IFC-4' : 'Download IFC-4 File'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. 4D SCENARIO COMPARISON MATRIX MODAL */}
      {/* ========================================================================= */}
      {isScenarioModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-border rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[88vh] animate-in zoom-in-95 duration-200 text-text-primary">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-canvas">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
                  <ChartLineUp className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-navy-900">
                    {language === 'ar' ? 'مقارنة السيناريوهات 4D: الأساس 2027 مقابل المخطط الشامل 2035' : '4D Scenario Comparison: 2027 Baseline vs. 2035 Master Plan'}
                  </h2>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {language === 'ar' ? 'تحليلات التخطيط المكاني الحضري والتحول نحو الحياد المناخي لإمارة أبوظبي' : 'Abu Dhabi Urban Spatial Planning & Net-Zero Transformation Analytics'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsScenarioModalOpen(false)}
                className="p-1.5 rounded-lg text-text-secondary hover:text-navy-900 hover:bg-canvas-subtle transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comparison Matrix Cards */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 2027 Current State Card */}
                <div className="bg-emerald-50/40 border border-emerald-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                    <span className="font-bold text-emerald-800 text-sm">2027 Operational Baseline</span>
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold">
                      ACTIVE REALITY
                    </span>
                  </div>
                  <ul className="space-y-2 text-text-secondary">
                    <li className="flex justify-between">
                      <span className="text-text-secondary">Total Developed GFA:</span>
                      <span className="font-mono font-bold text-navy-900">1,840,000 m²</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-text-secondary">District Peak Electric Demand:</span>
                      <span className="font-mono font-bold text-navy-900">42.5 MW</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-text-secondary">Rooftop & District Solar Share:</span>
                      <span className="font-mono font-bold text-amber-600">14% Total Supply</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-text-secondary">Average Corridor Traffic Flow:</span>
                      <span className="font-mono font-bold text-navy-900">54 km/h (Normal)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-text-secondary">Autonomous Transit Mode Share:</span>
                      <span className="font-mono font-bold text-blue-600">18% Pilot Loop</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-text-secondary">Carbon Intensity:</span>
                      <span className="font-mono font-bold text-red-600">112 kg CO2e/m²/yr</span>
                    </li>
                  </ul>
                </div>

                {/* 2035 Future Scenario Card */}
                <div className="bg-blue-50/40 border border-blue-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-blue-200 pb-2">
                    <span className="font-bold text-blue-800 text-sm">2035 Master Plan Scenario</span>
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-blue-100 text-blue-800 border border-blue-300 font-semibold">
                      APPROVED VISION
                    </span>
                  </div>
                  <ul className="space-y-2 text-text-secondary">
                    <li className="flex justify-between">
                      <span className="text-text-secondary">Total Developed GFA:</span>
                      <span className="font-mono font-bold text-emerald-700">3,120,000 m² (+69.5%)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-text-secondary">District Peak Electric Demand:</span>
                      <span className="font-mono font-bold text-emerald-700">38.2 MW (-10.1%)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-text-secondary">Rooftop & District Solar Share:</span>
                      <span className="font-mono font-bold text-amber-600">45% Total Supply (+31%)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-text-secondary">Average Corridor Traffic Flow:</span>
                      <span className="font-mono font-bold text-navy-900">58 km/h (AI Signal Mesh)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-text-secondary">Autonomous Transit Mode Share:</span>
                      <span className="font-mono font-bold text-blue-600">85% Dedicated Podways</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-text-secondary">Carbon Intensity:</span>
                      <span className="font-mono font-bold text-emerald-700">48 kg CO2e/m²/yr (-57%)</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Inundation & Climate Resilience Delta */}
              <div className="bg-canvas p-4 rounded-xl border border-border space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-navy-900 text-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Coastal & Climate Resilience Modeling
                  </h4>
                  <span className="text-[10px] text-text-muted font-mono">100-Year Surge Model</span>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  The 2035 Master Plan incorporates a 2.4-meter engineered seawall buffer and 12 hectares of restored mangrove fringe along the Corniche tidal perimeter, effectively reducing coastal surge hazard probability from 4.2% to under 0.1% per annum.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-border bg-canvas flex items-center justify-between">
              <span className="text-[11px] text-text-muted">
                Source: DGE Spatial Analytics Engine & DMT Vision 2035
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsScenarioModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white hover:bg-canvas border border-border text-navy-900 text-xs font-semibold transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    triggerToast('Generating Executive Scenario Report PDF for Abu Dhabi Executive Council...');
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <FileText className="w-4 h-4" />
                  <span>Export Scenario Analysis PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating In-App Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-emerald-300 text-navy-900 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
            <CheckCircle className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-text-secondary hover:text-navy-900 ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </WorkspaceLayout>
  );
};
