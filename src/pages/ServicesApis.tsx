import React from 'react';
import { WorkspaceLayout } from '../components/common/WorkspaceLayout';
import { useLanguage } from '../context/LanguageContext';
import { CodeBlock, CheckCircle, Copy, ArrowSquareOut, Lightning } from '@phosphor-icons/react';

export const ServicesApis: React.FC = () => {
  const { language } = useLanguage();
  const ogcServices = [
    { name: 'OGC API – Features (Core Cadastre)', standard: 'OGC API 1.0', endpoint: 'https://gateway.sdi.abudhabi.ae/ogc/features/v1', latency: '54ms', status: 'Operational', auth: 'mTLS / OAuth2' },
    { name: 'Web Map Service (WMS) — Abu Dhabi Basemap', standard: 'WMS 1.3.0', endpoint: 'https://gateway.sdi.abudhabi.ae/wms/basemap', latency: '42ms', status: 'Operational', auth: 'Public / Open' },
    { name: 'Web Feature Service (WFS) — Environmental Habitats', standard: 'WFS 2.0.0', endpoint: 'https://gateway.sdi.abudhabi.ae/wfs/environment', latency: '88ms', status: 'Operational', auth: 'Government DSA' },
    { name: 'Web Map Tile Service (WMTS) — High-Res Aerial 2027', standard: 'WMTS 1.0.0', endpoint: 'https://gateway.sdi.abudhabi.ae/wmts/imagery2027', latency: '36ms', status: 'Operational', auth: 'Government DSA' },
    { name: '3D Tiles Streaming Service — LoD2 City Model', standard: 'OGC 3D Tiles 1.1', endpoint: 'https://gateway.sdi.abudhabi.ae/3dtiles/citywide', latency: '95ms', status: 'Operational', auth: 'Marketplace Partner' },
    { name: 'GeoAI Real-time Feature Inference API', standard: 'REST OpenAPI 3.0', endpoint: 'https://gateway.sdi.abudhabi.ae/ai/v1/inference', latency: '120ms', status: 'Operational', auth: 'Special Clearance' },
  ];

  return (
    <WorkspaceLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-text-secondary mb-1">
            <span>{language === 'ar' ? 'بناء' : 'BUILD'}</span>
            <span>/</span>
            <span className="font-semibold text-navy-900">{language === 'ar' ? 'الخدمات والواجهات البرمجية' : 'APIs & Services'}</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900 tracking-tight">
            {language === 'ar' ? 'الخدمات الجيومكانية المعتمدة وبوابات OGC' : 'Authoritative Geospatial Services & OGC Gateways'}
          </h1>
          <p className="text-xs text-text-secondary mt-0.5">
            {language === 'ar'
              ? '1,150 خدمة ويب مكانية معتمدة وفق معايير OGC ونقاط اتصال OpenAPI لربط البنية التحتية الحكومية.'
              : '1,150 active OGC standard spatial web services and OpenAPI endpoints connecting government infrastructure.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-border shadow-xs overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider">
              {language === 'ar' ? 'دليل بوابات OGC عالية التوفر' : 'High-Availability OGC Gateway Directory'}
            </h3>
            <span className="text-xs font-mono text-emerald-600 font-bold">
              {language === 'ar' ? 'جاهزية المنصة: 99.95%' : 'Platform Uptime: 99.95%'}
            </span>
          </div>

          <div className="divide-y divide-border text-xs">
            {ogcServices.map((svc) => (
              <div key={svc.name} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-canvas transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-navy-900">{svc.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-canvas border border-border text-text-secondary">
                      {svc.standard}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                      {svc.status === 'Operational' ? (language === 'ar' ? 'يعمل بكفاءة' : 'Operational') : svc.status}
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-text-secondary text-left" dir="ltr">{svc.endpoint}</div>
                  <div className="text-[10px] text-text-muted">
                    {language === 'ar' ? 'متطلبات التوثيق:' : 'Auth Requirement:'} {svc.auth}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-[11px] text-text-muted">{svc.latency} p95</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(svc.endpoint);
                      alert(language === 'ar' ? 'تم نسخ رابط نقطة الاتصال.' : 'Copied endpoint URL.');
                    }}
                    className="px-3 py-1.5 rounded-lg border border-border bg-white hover:bg-canvas font-semibold text-xs transition-colors"
                  >
                    {language === 'ar' ? 'نسخ الرابط' : 'Copy URL'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
};
