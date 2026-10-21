import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WorkspaceLayout } from '../components/common/WorkspaceLayout';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { MANGROVE_GEOJSON, KHALIFA_CITY_PARCELS_GEOJSON, ABU_DHABI_CENTER } from '../data/geoData';
import {
  MapTrifold,
  Stack,
  SlidersHorizontal,
  MagnifyingGlass,
  ArrowSquareOut,
  Info,
  CheckCircle,
  Eye,
  EyeSlash,
  MapPin,
  X,
} from '@phosphor-icons/react';

export const StandaloneMapViewer: React.FC = () => {
  const navigate = useNavigate();

  const [activeLayers, setActiveLayers] = useState({
    mangroves: true,
    cadastre: true,
    protectedMarine: false,
    transitStops: false,
  });

  const [layerOpacity, setLayerOpacity] = useState<number>(0.75);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [searchPin, setSearchPin] = useState('');

  const toggleLayer = (key: keyof typeof activeLayers) => {
    setActiveLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <WorkspaceLayout>
      <div className="flex-1 flex flex-col h-[calc(100vh-112px)] overflow-hidden">
        {/* Top Controls Strip */}
        <div className="h-12 bg-white border-b border-border px-4 flex items-center justify-between text-xs shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg border border-border hover:bg-canvas text-navy-900 font-medium flex items-center gap-1.5"
            >
              <Stack className="w-4 h-4 text-blue-600" />
              <span>{sidebarOpen ? 'Hide Layer Panel' : 'Show Layer Panel'}</span>
            </button>

            <div className="flex items-center gap-2 text-text-secondary">
              <span className="font-semibold text-navy-900">Abu Dhabi Enterprise Map Viewer</span>
              <span>•</span>
              <span className="text-[11px] font-mono text-emerald-600">CRS: EPSG:32640 (UTM 40N)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/catalogue/land-parcels"
              className="px-3 py-1 rounded-md bg-canvas hover:bg-canvas-subtle border border-border text-navy-900 font-semibold text-xs flex items-center gap-1"
            >
              <span>Back to Dataset Detail</span>
              <ArrowSquareOut className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Map Canvas and Collapsible Layer Sidebar */}
        <div className="flex-1 relative flex overflow-hidden">
          {/* Collapsible Layer & Legend Panel */}
          {sidebarOpen && (
            <div className="w-72 lg:w-80 bg-white border-r border-border p-4 flex flex-col justify-between overflow-y-auto space-y-4 shrink-0 z-10 shadow-md">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                    Map Layers & Catalog
                  </span>
                  <button onClick={() => setSidebarOpen(false)} className="text-text-muted hover:text-navy-900">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Layer Opacity Slider */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-text-secondary text-[11px]">
                    <span>Global Vector Opacity</span>
                    <span className="font-mono font-bold text-navy-900">{Math.round(layerOpacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="1"
                    step="0.05"
                    value={layerOpacity}
                    onChange={(e) => setLayerOpacity(parseFloat(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                {/* Layer Toggles */}
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                    Active Layers (Click to Toggle)
                  </div>

                  <div
                    onClick={() => toggleLayer('mangroves')}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-colors ${
                      activeLayers.mangroves ? 'bg-blue-50/70 border-blue-300' : 'bg-canvas border-border text-text-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                      <div>
                        <div className="font-semibold text-navy-900">Eastern Mangroves 2027</div>
                        <div className="text-[10px] text-text-secondary">EAD • WFS Vector Layer</div>
                      </div>
                    </div>
                    {activeLayers.mangroves ? <Eye className="w-4 h-4 text-blue-600" /> : <EyeSlash className="w-4 h-4" />}
                  </div>

                  <div
                    onClick={() => toggleLayer('cadastre')}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-colors ${
                      activeLayers.cadastre ? 'bg-blue-50/70 border-blue-300' : 'bg-canvas border-border text-text-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                      <div>
                        <div className="font-semibold text-navy-900">Land Parcels (Cadastre)</div>
                        <div className="text-[10px] text-text-secondary">DMT • Khalifa City Fabric</div>
                      </div>
                    </div>
                    {activeLayers.cadastre ? <Eye className="w-4 h-4 text-blue-600" /> : <EyeSlash className="w-4 h-4" />}
                  </div>

                  <div
                    onClick={() => toggleLayer('protectedMarine')}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-colors ${
                      activeLayers.protectedMarine ? 'bg-blue-50/70 border-blue-300' : 'bg-canvas border-border text-text-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-teal-500"></span>
                      <div>
                        <div className="font-semibold text-navy-900">Coastal Protected Areas</div>
                        <div className="text-[10px] text-text-secondary">EAD • Marine Sanctuaries</div>
                      </div>
                    </div>
                    {activeLayers.protectedMarine ? <Eye className="w-4 h-4 text-blue-600" /> : <EyeSlash className="w-4 h-4" />}
                  </div>

                  <div
                    onClick={() => toggleLayer('transitStops')}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-colors ${
                      activeLayers.transitStops ? 'bg-blue-50/70 border-blue-300' : 'bg-canvas border-border text-text-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-indigo-600"></span>
                      <div>
                        <div className="font-semibold text-navy-900">Bus Stops & Routes</div>
                        <div className="text-[10px] text-text-secondary">ITC / DMT • GTFS Feeds</div>
                      </div>
                    </div>
                    {activeLayers.transitStops ? <Eye className="w-4 h-4 text-blue-600" /> : <EyeSlash className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Feature Information Inspector */}
              <div className="p-3 rounded-xl bg-canvas border border-border text-xs space-y-1">
                <div className="text-[10px] font-bold uppercase text-text-muted">Feature Inspection</div>
                {selectedFeature ? (
                  <div>
                    <div className="font-bold text-navy-900">{selectedFeature.name || selectedFeature.parcelId}</div>
                    <div className="text-[11px] text-text-secondary mt-0.5">{selectedFeature.zoning || selectedFeature.species || selectedFeature.status}</div>
                    {selectedFeature.areaSqm && <div className="text-[10px] font-mono text-blue-700 mt-1">{selectedFeature.areaSqm.toLocaleString()} m²</div>}
                  </div>
                ) : (
                  <p className="text-[11px] text-text-muted italic">Click any vector feature on the map to inspect its attributes.</p>
                )}
              </div>
            </div>
          )}

          {/* Real Interactive Map Canvas */}
          <div className="flex-1 h-full relative overflow-hidden">
            <InteractiveMap
              center={ABU_DHABI_CENTER}
              zoom={12}
              geoJsonData={activeLayers.mangroves ? MANGROVE_GEOJSON : activeLayers.cadastre ? KHALIFA_CITY_PARCELS_GEOJSON : null}
              onFeatureClick={(props) => setSelectedFeature(props)}
            />
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
};
