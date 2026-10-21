import React, { useState, useRef, useEffect } from 'react';
import { WorkspaceLayout } from '../components/common/WorkspaceLayout';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { AL_AIN_ANALYSIS_DATA, AL_AIN_CENTER } from '../data/geoData';
import {
  Sparkle,
  PaperPlaneRight,
  ShieldCheck,
  CheckCircle,
  CaretDown,
  CaretUp,
  MapPin,
  DownloadSimple,
  BookmarkSimple,
  ThumbsUp,
  ThumbsDown,
  Info,
  Database,
  ArrowSquareOut,
  CircleNotch,
} from '@phosphor-icons/react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text?: string;
  computeTime?: string;
  finding?: string;
  subtitle?: string;
  executionSteps?: string[];
  sourceDatasets?: Array<{ name: string; entity: string; iconColor?: string }>;
  districts?: Array<{ name: string; nameAr?: string; count: number; unit?: string }>;
  restrictedExcluded?: number;
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    id: string;
    lat: number;
    lng: number;
    title: string;
    description: string;
    color: string;
    badge?: string;
  }>;
  legend?: {
    title: string;
    items: Array<{ label: string; color: string }>;
  };
  sampleFeature?: any;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'user',
    timestamp: 'Today • 14 Sep 2027',
    text: 'Show schools within 500 m of high-traffic roads in Al Ain and count them by district.',
  },
  {
    id: 'msg-2',
    sender: 'assistant',
    timestamp: 'Today • 14 Sep 2027',
    computeTime: '1.4s',
    finding: '47 schools in 9 districts are within 500 m of high-traffic roads in Al Ain.',
    subtitle: 'Spatial intersection analysis completed against DMT arterial road volumes and ADEK registered educational campuses.',
    executionSteps: [
      'Understood natural language intent & spatial bounding box (Al Ain Emirate Sector).',
      'Selected authoritative datasets from ADEK and DMT Clearinghouse.',
      'Generated 500 m geodesic buffer along high-traffic corridors (>3,000 veh/hr).',
      'Point-in-polygon spatial intersection with verified school parcels.',
      'Grouped counts and calculated average distance per administrative district.',
    ],
    sourceDatasets: [
      { name: 'Schools', entity: 'ADEK', iconColor: 'text-blue-600' },
      { name: 'Road Traffic', entity: 'DMT', iconColor: 'text-indigo-600' },
      { name: 'Districts', entity: 'DMT', iconColor: 'text-teal-600' },
    ],
    districts: AL_AIN_ANALYSIS_DATA.districts.slice(0, 6).map((d) => ({
      name: d.name,
      count: d.schoolsCount,
      unit: 'schools',
    })),
    restrictedExcluded: 1,
    center: AL_AIN_CENTER,
    zoom: 13,
    markers: AL_AIN_ANALYSIS_DATA.schoolsSample.map((s) => ({
      id: s.id,
      lat: s.lat,
      lng: s.lng,
      title: s.name,
      description: `District: ${s.district} • Buffer distance: ${s.distance} • Traffic: ${s.trafficBand}`,
      color: '#7B4FD6',
      badge: '🏫',
    })),
    legend: {
      title: 'Al Ain Spatial Analysis Legend',
      items: [
        { label: 'Identified School Campuses (47)', color: 'bg-purple-600' },
        { label: 'High-Traffic Corridors (>3k veh/hr)', color: 'bg-amber-500' },
        { label: '500 m Geographic Buffer Zone', color: 'bg-amber-200 border border-amber-400' },
      ],
    },
    sampleFeature: AL_AIN_ANALYSIS_DATA.schoolsSample[0],
  },
];

const generateGeoAIResponse = (query: string): ChatMessage => {
  const q = query.toLowerCase();
  const id = `msg-${Date.now()}`;
  const timestamp = 'Today • 14 Sep 2027';

  if (q.includes('mussafah') || q.includes('industrial') || q.includes('substation') || q.includes('vacant')) {
    return {
      id,
      sender: 'assistant',
      timestamp,
      computeTime: '1.2s',
      finding: '14 vacant industrial land parcels with direct 33kV substation access identified in Musaffah Industrial Zone.',
      subtitle: 'DMT cadastral land parcels filtered for vacant status and overlaid with ADDC electrical grid feeder corridors (<200m).',
      executionSteps: [
        'Parsed spatial bounding box for Musaffah Industrial Sectors M10 through M14.',
        'Queried DMT Cadastral Land Parcel Fabric for vacant zoned plots.',
        'Generated 200 m geodesic proximity buffer around ADDC 33kV distribution substations.',
        'Executed spatial intersection isolating unencumbered plots with direct road frontage.',
        'Aggregated total available land capacity: 24,500 m² across 14 commercial-ready sites.',
      ],
      sourceDatasets: [
        { name: 'Cadastre Parcels', entity: 'DMT', iconColor: 'text-blue-600' },
        { name: 'Electrical Grid Substations', entity: 'ADDC', iconColor: 'text-amber-600' },
        { name: 'Industrial Zoning', entity: 'DED', iconColor: 'text-emerald-600' },
      ],
      districts: [
        { name: 'Sector M-10', count: 4, unit: 'plots' },
        { name: 'Sector M-11', count: 3, unit: 'plots' },
        { name: 'Sector M-12', count: 2, unit: 'plots' },
        { name: 'Sector M-14', count: 5, unit: 'plots' },
      ],
      center: [24.3600, 54.4900],
      zoom: 14,
      markers: [
        { id: 'mus-1', lat: 24.3620, lng: 54.4880, title: 'Parcel M-10-049', description: 'Area: 1,850 m² • Substation distance: 95 m • Status: Vacant Commercial', color: '#10B981', badge: '🏭' },
        { id: 'mus-2', lat: 24.3580, lng: 54.4920, title: 'Parcel M-11-102', description: 'Area: 2,400 m² • Substation distance: 130 m • Status: Vacant Light Industrial', color: '#10B981', badge: '🏭' },
        { id: 'mus-3', lat: 24.3650, lng: 54.4850, title: 'Parcel M-14-082', description: 'Area: 3,100 m² • Substation distance: 75 m • Status: Heavy Industrial Ready', color: '#10B981', badge: '🏭' },
        { id: 'mus-4', lat: 24.3550, lng: 54.4950, title: 'Parcel M-14-118', description: 'Area: 2,950 m² • Substation distance: 160 m • Status: Vacant Logistics', color: '#10B981', badge: '🏭' },
      ],
      legend: {
        title: 'Musaffah Industrial Query Legend',
        items: [
          { label: 'Vacant Industrial Parcels (14)', color: 'bg-emerald-600' },
          { label: 'ADDC 33kV Electrical Substations', color: 'bg-amber-500' },
          { label: '200 m Substation Proximity Buffer', color: 'bg-emerald-200 border border-emerald-400' },
        ],
      },
      sampleFeature: {
        name: 'Parcel M-14-082 (Musaffah)',
        district: 'Sector M-14 Industrial',
        distance: '75 m to 33kV Substation S-4',
        trafficBand: 'High heavy vehicle load rating (E-11 access)',
      },
    };
  }

  if (q.includes('flood') || q.includes('clinic') || q.includes('health') || q.includes('island') || q.includes('surge')) {
    return {
      id,
      sender: 'assistant',
      timestamp,
      computeTime: '1.6s',
      finding: '6 healthcare facilities on coastal islands fall within the 1-in-50-year storm surge exposure threshold.',
      subtitle: 'Hydrodynamic inundation modeling combining EAD coastal digital terrain data and ADPHC registered health facilities.',
      executionSteps: [
        'Extracted 2027 hydrodynamic storm surge simulation rasters from Environment Agency – Abu Dhabi.',
        'Queried ADPHC database for all licensed clinics and primary care hospitals on coastal islands.',
        'Zonal intersection calculated ground elevations and distance to seawall revetments.',
        'Filtered facilities situated below 1.8 m coastal datum without secondary flood defenses.',
        'Produced priority vulnerability ranking and emergency evacuation access routing.',
      ],
      sourceDatasets: [
        { name: 'Coastal Storm Surge 2027', entity: 'EAD', iconColor: 'text-cyan-600' },
        { name: 'Licensed Health Clinics', entity: 'ADPHC', iconColor: 'text-rose-600' },
        { name: 'Island Topography DTM', entity: 'DMT', iconColor: 'text-blue-600' },
      ],
      districts: [
        { name: 'Al Reem Island', count: 3, unit: 'clinics' },
        { name: 'Al Maryah Island', count: 1, unit: 'clinics' },
        { name: 'Yas Island', count: 2, unit: 'clinics' },
      ],
      center: [24.4980, 54.3950],
      zoom: 13,
      markers: [
        { id: 'cl-1', lat: 24.5020, lng: 54.3910, title: 'Cleveland Clinic Abu Dhabi (Maryah)', description: 'Elev: 2.1 m • Exposure: Low (Active seawall barrier)', color: '#EF4444', badge: '🏥' },
        { id: 'cl-2', lat: 24.4960, lng: 54.4020, title: 'Reem Island Medical Complex', description: 'Elev: 1.4 m • Exposure: High (Requires secondary sandbar)', color: '#EF4444', badge: '🏥' },
        { id: 'cl-3', lat: 24.4890, lng: 54.3840, title: 'Corniche Primary Care Center', description: 'Elev: 1.6 m • Exposure: Medium (120m to tidal channel)', color: '#EF4444', badge: '🏥' },
        { id: 'cl-4', lat: 24.5200, lng: 54.5950, title: 'Yas Marina Health Clinic', description: 'Elev: 1.5 m • Exposure: High (Channel surge zone)', color: '#EF4444', badge: '🏥' },
      ],
      legend: {
        title: 'Coastal Surge Vulnerability Legend',
        items: [
          { label: 'Identified Coastal Health Clinics (6)', color: 'bg-rose-600' },
          { label: 'Hydrodynamic Surge Zone (<1.8m)', color: 'bg-cyan-500' },
          { label: 'Critical Evacuation Corridors', color: 'bg-amber-400' },
        ],
      },
      sampleFeature: {
        name: 'Reem Island Medical Complex',
        district: 'Al Reem Island Central',
        distance: '1.4 m elevation above MSL',
        trafficBand: 'Critical access via Reem South Bridge',
      },
    };
  }

  // Generic intelligent spatial response for any other user prompt:
  return {
    id,
    sender: 'assistant',
    timestamp,
    computeTime: '1.1s',
    finding: `Spatial analysis complete for query: "${query}". Found 18 authoritative matching spatial features across Abu Dhabi.`,
    subtitle: 'Synthesized using DGE Authoritative Clearinghouse catalog, spatial buffer algorithms, and cross-entity metadata index.',
    executionSteps: [
      `Understood natural language intent and extracted spatial terms for: "${query}".`,
      'Cross-referenced Abu Dhabi Fundamental Geospatial Data Standards (FGDS) catalog.',
      'Applied multi-criteria geometric intersection across active municipal and environmental layers.',
      'Computed spatial proximity metrics, extent boundaries, and classification clearances.',
      'Generated authoritative GeoJSON feature collection with real-time attribute mapping.',
    ],
    sourceDatasets: [
      { name: 'Spatial Clearinghouse', entity: 'DGE', iconColor: 'text-purple-600' },
      { name: 'Municipal Cadastre', entity: 'DMT', iconColor: 'text-blue-600' },
      { name: 'Environment & Terrestrial', entity: 'EAD', iconColor: 'text-teal-600' },
    ],
    districts: [
      { name: 'Abu Dhabi Island', count: 8, unit: 'features' },
      { name: 'Khalifa City', count: 5, unit: 'features' },
      { name: 'Al Ain Sector', count: 3, unit: 'features' },
      { name: 'Al Dhafra', count: 2, unit: 'features' },
    ],
    center: [24.4539, 54.3773],
    zoom: 12,
    markers: [
      { id: 'gen-1', lat: 24.4539, lng: 54.3773, title: 'Central Spatial Feature #1', description: `Matched criteria for "${query}" • DMT Authoritative`, color: '#7B4FD6', badge: '📍' },
      { id: 'gen-2', lat: 24.4750, lng: 54.3550, title: 'Corniche Spatial Feature #2', description: `Matched criteria for "${query}" • Verified Active`, color: '#7B4FD6', badge: '📍' },
      { id: 'gen-3', lat: 24.4200, lng: 54.5800, title: 'Khalifa City Sector Cluster', description: `Matched criteria for "${query}" • Zoned Cadastre`, color: '#7B4FD6', badge: '📍' },
    ],
    legend: {
      title: 'Geospatial Query Legend',
      items: [
        { label: 'Identified Spatial Features (18)', color: 'bg-purple-600' },
        { label: 'Authoritative Clearinghouse Boundary', color: 'bg-blue-500' },
        { label: 'Active Regulatory Zone', color: 'bg-emerald-500' },
      ],
    },
    sampleFeature: {
      name: 'Central Spatial Feature #1 (Abu Dhabi)',
      district: 'Abu Dhabi Island Central',
      distance: 'Within primary municipal boundary',
      trafficBand: 'Full OGC API & Feature Service accessible',
    },
  };
};

export const S07_GeoAIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [queryInput, setQueryInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [expandedStepsMap, setExpandedStepsMap] = useState<Record<string, boolean>>({
    'msg-2': true,
  });
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<any>(AL_AIN_ANALYSIS_DATA.schoolsSample[0]);
  const [feedbackMap, setFeedbackMap] = useState<Record<string, 'up' | 'down' | null>>({});
  const [savedAsMap, setSavedAsMap] = useState(false);

  // Active Map State
  const [mapCenter, setMapCenter] = useState<[number, number]>(AL_AIN_CENTER);
  const [mapZoom, setMapZoom] = useState<number>(13);
  const [mapMarkers, setMapMarkers] = useState(INITIAL_MESSAGES[1].markers || []);
  const [currentLegend, setCurrentLegend] = useState(INITIAL_MESSAGES[1].legend);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const sampleQuestions = [
    "Show schools within 500 m of high-traffic roads in Al Ain and count them by district.",
    "Identify vacant industrial land parcels with electrical substation access in Mussafah.",
    "Calculate flood risk exposure index for health clinics in coastal islands.",
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || queryInput).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      timestamp: 'Today • 14 Sep 2027',
      text: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setQueryInput('');
    setIsThinking(true);

    setTimeout(() => {
      const response = generateGeoAIResponse(text);
      setMessages((prev) => [...prev, response]);
      setExpandedStepsMap((prev) => ({ ...prev, [response.id]: true }));
      setIsThinking(false);

      if (response.center) {
        setMapCenter(response.center);
      }
      if (response.zoom) {
        setMapZoom(response.zoom);
      }
      if (response.markers) {
        setMapMarkers(response.markers);
      }
      if (response.legend) {
        setCurrentLegend(response.legend);
      }
      if (response.sampleFeature) {
        setSelectedSchool(response.sampleFeature);
      }
    }, 750);
  };

  const handleSelectSample = (q: string) => {
    handleSendMessage(q);
  };

  const handleSaveMap = () => {
    setSavedAsMap(true);
    setTimeout(() => setSavedAsMap(false), 3000);
  };

  const toggleSteps = (msgId: string) => {
    setExpandedStepsMap((prev) => ({
      ...prev,
      [msgId]: !prev[msgId],
    }));
  };

  const handleFeedback = (msgId: string, type: 'up' | 'down') => {
    setFeedbackMap((prev) => ({
      ...prev,
      [msgId]: prev[msgId] === type ? null : type,
    }));
  };

  return (
    <WorkspaceLayout>
      <div className="flex-1 flex flex-col h-[calc(100vh-112px)] overflow-hidden">
        {/* Top Mini Breadcrumb */}
        <div className="bg-white border-b border-border px-6 py-2.5 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-2 text-text-secondary">
            <span>BUILD</span>
            <span>/</span>
            <span>GeoAI Studio</span>
            <span>/</span>
            <span className="font-semibold text-navy-900">Conversational Spatial Assistant</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-full border border-purple-200 flex items-center gap-1.5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse"></span>
              GeoAI v3.2 Engine • Active
            </span>
          </div>
        </div>

        {/* Split Screen Container */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left Column: Conversational Assistant Panel (480px width) */}
          <div className="w-full lg:w-[480px] xl:w-[520px] bg-white border-r border-border flex flex-col justify-between shrink-0 shadow-xs z-10">
            {/* Conversation Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Sample Question Chips */}
              <div className="space-y-1.5 pb-2 border-b border-border/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted flex items-center gap-1">
                  <Sparkle className="w-3 h-3 text-purple-600" />
                  Suggested Geospatial Inquiries
                </span>
                <div className="flex flex-col gap-1.5">
                  {sampleQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectSample(q)}
                      disabled={isThinking}
                      className="text-left p-2 rounded-lg bg-canvas hover:bg-purple-50 hover:border-purple-300 hover:text-purple-900 border border-border text-xs text-text-secondary transition-all cursor-pointer disabled:opacity-50"
                    >
                      "{q}"
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Messages Thread */}
              {messages.map((msg) => {
                if (msg.sender === 'user') {
                  return (
                    <div key={msg.id} className="flex justify-end">
                      <div className="bg-navy-900 text-white rounded-2xl rounded-tr-xs p-3.5 max-w-[90%] text-xs shadow-xs">
                        <div className="font-medium leading-relaxed">{msg.text}</div>
                        <div className="text-[10px] text-slate-300 mt-1 text-right">{msg.timestamp}</div>
                      </div>
                    </div>
                  );
                }

                // Assistant Response Card
                const isExpanded = expandedStepsMap[msg.id] ?? true;
                const feedback = feedbackMap[msg.id];

                return (
                  <div key={msg.id} className="bg-canvas border border-border rounded-2xl p-4 text-xs space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-xs">
                          <Sparkle className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-bold text-navy-900">GeoAI Spatial Assistant</span>
                      </div>
                      <span className="text-[10px] font-mono text-text-muted">
                        Computed in {msg.computeTime || '1.2s'}
                      </span>
                    </div>

                    {/* Main Analytical Finding */}
                    <div className="p-3 rounded-xl bg-white border border-border shadow-xs">
                      <div className="text-sm font-bold text-navy-900 leading-snug">
                        {msg.finding}
                      </div>
                      {msg.subtitle && (
                        <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">
                          {msg.subtitle}
                        </p>
                      )}
                    </div>

                    {/* 5-Step Explainability Accordion */}
                    {msg.executionSteps && msg.executionSteps.length > 0 && (
                      <div className="rounded-xl border border-border bg-white overflow-hidden shadow-xs">
                        <button
                          onClick={() => toggleSteps(msg.id)}
                          className="w-full px-3 py-2 bg-canvas-subtle hover:bg-canvas flex items-center justify-between text-[11px] font-bold text-navy-900 transition-colors"
                        >
                          <span className="flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            Analytical Execution Steps (Explainability)
                          </span>
                          {isExpanded ? <CaretUp className="w-3.5 h-3.5" /> : <CaretDown className="w-3.5 h-3.5" />}
                        </button>

                        {isExpanded && (
                          <div className="p-3 space-y-2 text-[11px] border-t border-border bg-white">
                            {msg.executionSteps.map((step, sIdx) => (
                              <div key={sIdx} className="flex items-start gap-2">
                                <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-700 font-bold text-[9px] flex items-center justify-center shrink-0 mt-0.5">
                                  {sIdx + 1}
                                </span>
                                <span className="text-text-primary leading-tight">{step}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Source Datasets Chips */}
                    {msg.sourceDatasets && msg.sourceDatasets.length > 0 && (
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-1">
                          Source Datasets Used
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.sourceDatasets.map((ds, dsIdx) => (
                            <span
                              key={dsIdx}
                              className="px-2 py-0.5 rounded-full bg-white border border-border text-[11px] font-medium text-navy-900 flex items-center gap-1 shadow-2xs"
                            >
                              <Database className={`w-3 h-3 ${ds.iconColor || 'text-purple-600'}`} />
                              <span>{ds.name} — {ds.entity}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* District / Sector Breakdown List */}
                    {msg.districts && msg.districts.length > 0 && (
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-1.5">
                          Distribution Breakdown
                        </div>
                        <div className="grid grid-cols-3 gap-1.5">
                          {msg.districts.map((d) => (
                            <div
                              key={d.name}
                              onClick={() => setSelectedDistrict(d.name)}
                              className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                                selectedDistrict === d.name
                                  ? 'bg-purple-50 border-purple-600 text-purple-900 font-bold shadow-xs'
                                  : 'bg-white border-border text-navy-900 hover:border-slate-300'
                              }`}
                            >
                              <div className="text-[10px] truncate">{d.name}</div>
                              <div className="font-mono font-bold text-xs text-purple-700">
                                {d.count} {d.unit || 'items'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Security Note & Disclaimer */}
                    <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900 space-y-0.5">
                      <div className="font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-700" /> Security & Access Filter Applied
                      </div>
                      <p>
                        {msg.restrictedExcluded || 1} restricted dataset was excluded based on your official access credentials.
                      </p>
                    </div>

                    <div className="text-[10px] text-text-muted italic text-center">
                      AI-generated geospatial inference. Verify before official municipal or policy use.
                    </div>

                    {/* Actions: Save as map, export, feedback */}
                    <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleSaveMap}
                          className="px-2.5 py-1 rounded-md bg-white border border-border hover:bg-canvas text-navy-900 font-medium flex items-center gap-1 shadow-2xs transition-colors"
                        >
                          <BookmarkSimple className="w-3.5 h-3.5 text-purple-600" />
                          <span>{savedAsMap ? 'Saved to Workspace!' : 'Save as Map'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const blob = new Blob([JSON.stringify(msg, null, 2)], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `geoai_query_export_${Date.now()}.json`;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                          }}
                          className="px-2.5 py-1 rounded-md bg-white border border-border hover:bg-canvas text-navy-900 font-medium flex items-center gap-1 shadow-2xs transition-colors"
                        >
                          <DownloadSimple className="w-3.5 h-3.5" />
                          <span>Export</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-1 text-text-muted">
                        <button
                          type="button"
                          onClick={() => handleFeedback(msg.id, 'up')}
                          className={`p-1 rounded hover:bg-canvas transition-colors ${
                            feedback === 'up' ? 'text-emerald-600 bg-emerald-50' : ''
                          }`}
                          title="Accurate spatial response"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleFeedback(msg.id, 'down')}
                          className={`p-1 rounded hover:bg-canvas transition-colors ${
                            feedback === 'down' ? 'text-red-600 bg-red-50' : ''
                          }`}
                          title="Report inaccuracy"
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Thinking Indicator */}
              {isThinking && (
                <div className="flex items-center gap-2.5 p-3.5 bg-purple-50 rounded-2xl border border-purple-200 text-xs text-purple-900 animate-pulse shadow-xs">
                  <CircleNotch className="w-4 h-4 text-purple-600 animate-spin shrink-0" />
                  <div className="flex-1">
                    <div className="font-bold">GeoAI Engine is executing spatial query...</div>
                    <div className="text-[11px] text-purple-700">Evaluating multi-criteria geometries & buffer intersections</div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Field at Bottom */}
            <div className="p-4 border-t border-border bg-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="relative"
              >
                <input
                  type="text"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  placeholder="Ask a spatial question about Abu Dhabi, Al Ain, Al Dhafra..."
                  disabled={isThinking}
                  className="w-full pl-3 pr-10 py-2.5 text-xs bg-canvas border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-600 focus:bg-white text-text-primary placeholder:text-text-muted transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!queryInput.trim() || isThinking}
                  className="absolute right-2 top-2 p-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white transition-colors cursor-pointer disabled:cursor-not-allowed"
                  title="Send Geospatial Inquiry"
                >
                  <PaperPlaneRight className="w-3.5 h-3.5 fill-current" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Geographic Map with Overlays */}
          <div className="flex-1 relative bg-canvas overflow-hidden">
            <InteractiveMap
              center={mapCenter}
              zoom={mapZoom}
              theme="light"
              markers={mapMarkers}
              onMarkerClick={(marker) => {
                setSelectedSchool({
                  name: marker.title,
                  district: marker.description.split('•')[0].replace('District:', '').trim(),
                  distance: marker.description.split('•')[1]?.trim() || 'Authoritative point',
                  trafficBand: marker.description.split('•')[2]?.trim() || 'Verified Active',
                });
              }}
            />

            {/* Floating Map Legend for Analytical Buffer */}
            {currentLegend && (
              <div className="absolute bottom-8 right-3 z-30 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-border shadow-lg text-xs space-y-2 max-w-xs animate-in fade-in duration-200">
                <div className="font-bold text-navy-900 text-[11px] uppercase tracking-wider border-b border-border pb-1">
                  {currentLegend.title}
                </div>
                <div className="space-y-1.5 text-[11px]">
                  {currentLegend.items.map((item, itmIdx) => (
                    <div key={itmIdx} className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                      <span className="text-text-primary">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Feature Info Card (Floating Bottom Left) */}
            {selectedSchool && (
              <div className="absolute bottom-10 left-3 z-[1000] bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-border shadow-lg max-w-sm text-xs">
                <div className="text-[10px] uppercase font-bold text-purple-600">Selected Spatial Feature</div>
                <div className="font-bold text-navy-900 mt-0.5">{selectedSchool.name}</div>
                <div className="text-text-secondary text-[11px] mt-1">
                  Sector/District: <strong className="text-navy-900">{selectedSchool.district}</strong> • Proximity: <strong className="text-purple-700">{selectedSchool.distance}</strong>
                </div>
                <div className="text-[10px] text-text-muted mt-0.5">
                  Parameters: {selectedSchool.trafficBand}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
};
