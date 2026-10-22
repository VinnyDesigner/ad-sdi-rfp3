import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ABU_DHABI_CENTER } from '../../data/geoData';

interface InteractiveMapProps {
  center?: [number, number];
  zoom?: number;
  height?: string;
  theme?: 'light' | 'dark';
  geoJsonData?: any;
  markers?: Array<{
    id: string;
    lat: number;
    lng: number;
    title: string;
    description?: string;
    color?: string;
    badge?: string;
  }>;
  onFeatureClick?: (properties: any) => void;
  onMarkerClick?: (marker: any) => void;
  enableDrawFilter?: boolean;
  onDrawFilterChange?: (bounds: L.LatLngBounds | null) => void;
  className?: string;
  selectedFeatureId?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  center = ABU_DHABI_CENTER,
  zoom = 12,
  height = '100%',
  theme = 'light',
  geoJsonData,
  markers = [],
  onFeatureClick,
  onMarkerClick,
  enableDrawFilter = false,
  onDrawFilterChange,
  className = '',
  selectedFeatureId,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const drawLayerRef = useRef<L.Rectangle | null>(null);

  const [currentBasemap, setCurrentBasemap] = useState<'light' | 'dark' | 'satellite'>(
    theme === 'dark' ? 'dark' : 'light'
  );
  const [coordinates, setCoordinates] = useState<string>('24.4539° N, 54.3773° E');
  const [currentZoom, setCurrentZoom] = useState<number>(zoom);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy existing instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: center,
      zoom: zoom,
      zoomControl: false,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Custom Zoom control at top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Scale bar at bottom-left
    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);

    // Coordinate readout
    map.on('mousemove', (e) => {
      setCoordinates(`${e.latlng.lat.toFixed(4)}° N, ${e.latlng.lng.toFixed(4)}° E`);
    });

    map.on('zoomend', () => {
      setCurrentZoom(map.getZoom());
    });

    // ResizeObserver to automatically resize map when container dimensions change
    const resizeObserver = new ResizeObserver(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize({ debounceMoveend: true });
      }
    });

    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    const onWindowResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    };
    window.addEventListener('resize', onWindowResize);

    // Progressive invalidateSize triggers to guarantee all tiles load across full width
    const t1 = setTimeout(() => map.invalidateSize(), 50);
    const t2 = setTimeout(() => map.invalidateSize(), 200);
    const t3 = setTimeout(() => map.invalidateSize(), 500);
    const t4 = setTimeout(() => map.invalidateSize(), 1000);

    // Cleanup
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('resize', onWindowResize);
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Basemap Tiles
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    if (currentBasemap === 'dark') {
      // Esri World Dark Gray Canvas (Base + Labels) - No API Key Required
      const darkBase = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 16,
          attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        }
      );
      const darkLabels = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 16,
        }
      );
      darkBase.addTo(map);
      darkLabels.addTo(map);
    } else if (currentBasemap === 'satellite') {
      // Esri World Imagery (High-Res Aerial + Boundaries & Places) - No API Key Required
      const satBase = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 19,
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics',
        }
      );
      const satLabels = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 19,
        }
      );
      satBase.addTo(map);
      satLabels.addTo(map);
    } else {
      // OpenStreetMap Standard - Clean, Authoritative, No API Key Required
      const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        subdomains: ['a', 'b', 'c'],
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      });
      osmLayer.addTo(map);
    }

    map.invalidateSize();
  }, [currentBasemap]);

  // Center / Zoom change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (map) {
      map.setView(center, zoom, { animate: true });
      map.invalidateSize();
    }
  }, [center[0], center[1], zoom]);

  // Handle GeoJSON Layers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (geoJsonLayerRef.current) {
      map.removeLayer(geoJsonLayerRef.current);
      geoJsonLayerRef.current = null;
    }

    if (geoJsonData) {
      const geoLayer = L.geoJSON(geoJsonData, {
        style: (feature) => {
          const isSelected = selectedFeatureId && (
            feature?.properties?.parcelId === selectedFeatureId ||
            feature?.properties?.changeId === selectedFeatureId ||
            feature?.properties?.id === selectedFeatureId
          );

          const featureColor = feature?.properties?.color || 
            (feature?.properties?.type === 'New construction' ? '#1E9E6A' :
             feature?.properties?.type === 'Extension' ? '#E8A317' :
             feature?.properties?.type === 'Demolition' ? '#D64545' : '#1F5FAD');

          return {
            color: isSelected ? '#FFC20E' : featureColor,
            weight: isSelected ? 3.5 : 2,
            opacity: 0.9,
            fillColor: featureColor,
            fillOpacity: isSelected ? 0.45 : 0.25,
            dashArray: feature?.properties?.dashArray,
          };
        },
        onEachFeature: (feature, layer) => {
          if (feature.properties) {
            const p = feature.properties;
            const title = p.name || p.parcelId || p.changeId || 'Geospatial Feature';
            const detail = p.zoning || p.type || p.canopyCover || p.status || '';
            const popupContent = `
              <div class="p-2 text-xs font-sans">
                <div class="font-bold text-navy-900 border-b border-border pb-1 mb-1">${title}</div>
                ${p.areaSqm ? `<div class="text-text-secondary">Area: <span class="font-semibold text-text-primary">${p.areaSqm.toLocaleString()} m²</span></div>` : ''}
                ${p.confidence ? `<div class="text-text-secondary">Confidence: <span class="font-semibold text-emerald-600">${(p.confidence * 100).toFixed(0)}%</span></div>` : ''}
                ${p.sector ? `<div class="text-text-secondary">Sector: <span class="font-semibold text-text-primary">${p.sector}</span></div>` : ''}
                ${detail ? `<div class="text-blue-600 font-medium mt-1">${detail}</div>` : ''}
              </div>
            `;
            layer.bindPopup(popupContent);
          }

          layer.on('click', () => {
            if (onFeatureClick) {
              onFeatureClick(feature.properties);
            }
          });
        },
      });

      geoLayer.addTo(map);
      geoJsonLayerRef.current = geoLayer;
    }
  }, [geoJsonData, selectedFeatureId, onFeatureClick]);

  // Handle Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (markersLayerRef.current) {
      map.removeLayer(markersLayerRef.current);
      markersLayerRef.current = null;
    }

    if (markers.length > 0) {
      const group = L.layerGroup();
      markers.forEach((m) => {
        const markerColor = m.color || '#1F5FAD';
        const customIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `
            <div style="background-color: ${markerColor}; width: 24px; height: 24px; border-radius: 50%; border: 2.5px solid white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: bold;">
              ${m.badge || '•'}
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        const marker = L.marker([m.lat, m.lng], { icon: customIcon });
        marker.bindPopup(`
          <div class="p-2 text-xs font-sans">
            <div class="font-bold text-navy-900 border-b border-border pb-1 mb-1">${m.title}</div>
            ${m.description ? `<div class="text-text-secondary">${m.description}</div>` : ''}
          </div>
        `);

        marker.on('click', () => {
          if (onMarkerClick) onMarkerClick(m);
        });

        group.addLayer(marker);
      });

      group.addTo(map);
      markersLayerRef.current = group;
    }
  }, [markers, onMarkerClick]);

  // Spatial Draw Bounding Box Filter Simulation
  const handleToggleDraw = () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (isDrawing && drawLayerRef.current) {
      map.removeLayer(drawLayerRef.current);
      drawLayerRef.current = null;
      setIsDrawing(false);
      if (onDrawFilterChange) onDrawFilterChange(null);
    } else {
      setIsDrawing(true);
      // Create a demonstration selection box around the center view
      const centerLatLng = map.getCenter();
      const delta = 0.035;
      const bounds = L.latLngBounds(
        [centerLatLng.lat - delta, centerLatLng.lng - delta],
        [centerLatLng.lat + delta, centerLatLng.lng + delta]
      );

      const rect = L.rectangle(bounds, {
        color: '#FFC20E',
        weight: 2,
        fillColor: '#FFC20E',
        fillOpacity: 0.15,
        dashArray: '4, 4',
      });

      rect.addTo(map);
      drawLayerRef.current = rect;
      if (onDrawFilterChange) onDrawFilterChange(bounds);
    }
  };

  const handleResetExtent = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, zoom, { animate: true });
    }
  };

  return (
    <div
      className={`relative overflow-hidden w-full select-none ${className}`}
      style={{ height: height || '100%', width: '100%', direction: 'ltr' }}
      dir="ltr"
    >
      {/* Map Canvas */}
      <div
        ref={mapContainerRef}
        className="w-full h-full z-0 relative"
        style={{ width: '100%', height: '100%', direction: 'ltr' }}
        dir="ltr"
      />

      {/* Floating Control Bar (Top Left) */}
      <div className="absolute top-3 left-3 z-[1000] flex items-center space-x-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-md border border-border text-xs">
        <span className="font-semibold text-navy-900 tracking-wide flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          AD-SDI Spatial
        </span>
        <span className="text-border">|</span>
        
        {/* Basemap selector */}
        <div className="flex rounded bg-canvas-subtle p-0.5">
          <button
            type="button"
            onClick={() => setCurrentBasemap('light')}
            className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors ${
              currentBasemap === 'light' ? 'bg-white shadow text-navy-900' : 'text-text-secondary hover:text-navy-900'
            }`}
          >
            Light
          </button>
          <button
            type="button"
            onClick={() => setCurrentBasemap('dark')}
            className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors ${
              currentBasemap === 'dark' ? 'bg-navy-900 shadow text-white' : 'text-text-secondary hover:text-navy-900'
            }`}
          >
            Dark
          </button>
          <button
            type="button"
            onClick={() => setCurrentBasemap('satellite')}
            className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors ${
              currentBasemap === 'satellite' ? 'bg-blue-600 shadow text-white' : 'text-text-secondary hover:text-navy-900'
            }`}
          >
            Satellite
          </button>
        </div>

        {/* Draw Area button if enabled */}
        {enableDrawFilter && (
          <>
            <span className="text-border">|</span>
            <button
              type="button"
              onClick={handleToggleDraw}
              className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-all ${
                isDrawing
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-canvas hover:bg-canvas-subtle text-text-primary border border-border'
              }`}
            >
              <span>📐</span>
              {isDrawing ? 'Clear Spatial Filter' : 'Draw Area Filter'}
            </button>
          </>
        )}

        <button
          type="button"
          onClick={handleResetExtent}
          title="Reset Abu Dhabi Extent"
          className="p-1 hover:bg-canvas rounded text-text-secondary hover:text-navy-900 transition-colors ml-1"
        >
          ⟲ Reset
        </button>
      </div>

      {/* Floating Bottom Bar: Scale, Coordinates & Attribution */}
      <div className="absolute bottom-2 right-2 z-[1000] flex items-center gap-3 bg-navy-900/90 text-white/90 text-[11px] font-mono px-3 py-1 rounded-md backdrop-blur-sm border border-navy-700/60 shadow">
        <div className="flex items-center gap-1.5">
          <span className="text-gold-500 font-bold">CRS:</span>
          <span>EPSG:32640 (UTM 40N)</span>
        </div>
        <span className="text-navy-600">•</span>
        <div>{coordinates}</div>
        <span className="text-navy-600">•</span>
        <div>Zoom {currentZoom}</div>
      </div>

      {/* North Arrow Indicator */}
      <div className="absolute top-14 right-3 z-[1000] bg-white/90 backdrop-blur-sm w-7 h-7 rounded-full shadow border border-border flex items-center justify-center pointer-events-none">
        <div className="text-[10px] font-bold text-navy-900 flex flex-col items-center leading-none">
          <span className="text-red-600 font-extrabold text-[8px]">▲</span>
          <span>N</span>
        </div>
      </div>
    </div>
  );
};
