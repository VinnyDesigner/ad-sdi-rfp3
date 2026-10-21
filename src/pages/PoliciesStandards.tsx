import React from 'react';
import { WorkspaceLayout } from '../components/common/WorkspaceLayout';
import { FileText, ShieldCheck, DownloadSimple } from '@phosphor-icons/react';

export const PoliciesStandards: React.FC = () => {
  const policies = [
    { title: 'AD-SDI Fundamental Geospatial Data Standards (FGDS) v3.2', category: 'Standards', code: 'STD-FGDS-2027', updated: 'Jan 2027', desc: 'Core specifications for geometry validation, coordinate systems (EPSG:32640), topology rules, and mandatory attribute schemas.' },
    { title: 'Abu Dhabi Government Geospatial Data Sharing Policy', category: 'Policy', code: 'POL-DGE-2026-08', updated: 'Nov 2026', desc: 'Rules governing inter-agency clearinghouse participation, custodian stewardship duties, and commercial partner licensing.' },
    { title: 'Spatial Data Residency & Cloud Hosting Directive', category: 'Compliance', code: 'DIR-SEC-2027-01', updated: 'Mar 2027', desc: 'Mandating that all spatial databases, satellite rasters, and twin meshes reside strictly within sovereign UAE data centers.' },
    { title: 'ISO 19115 / ISO 19139 Geospatial Metadata Profile', category: 'Standards', code: 'STD-ISO-19115-AD', updated: 'May 2027', desc: 'Standard metadata schema requirements for catalog registration and automated quality gateway clearance.' },
  ];

  return (
    <WorkspaceLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-text-secondary mb-1">
            <span>GOVERN</span>
            <span>/</span>
            <span className="font-semibold text-navy-900">Policies & Standards</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900 tracking-tight">
            Policies, Technical Standards & Geospatial Directives
          </h1>
          <p className="text-xs text-text-secondary mt-0.5">
            Authoritative regulatory frameworks issued by the Department of Government Enablement (DGE).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {policies.map((p) => (
            <div key={p.code} className="bg-white rounded-2xl border border-border p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="px-2 py-0.5 rounded font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200 text-[10px]">
                    {p.code}
                  </span>
                  <span className="text-text-muted text-[11px]">{p.updated}</span>
                </div>
                <h3 className="text-base font-bold text-navy-900 leading-snug">{p.title}</h3>
                <p className="text-xs text-text-secondary mt-2 leading-relaxed">{p.desc}</p>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                <span className="text-[11px] font-semibold text-navy-900">{p.category}</span>
                <button
                  onClick={() => alert(`Downloading specification: ${p.title} (PDF)...`)}
                  className="text-blue-600 hover:text-navy-900 font-semibold flex items-center gap-1"
                >
                  <DownloadSimple className="w-3.5 h-3.5" />
                  <span>Download Directive</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
};
