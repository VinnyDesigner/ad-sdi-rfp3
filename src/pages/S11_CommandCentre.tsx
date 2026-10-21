import React, { useState } from 'react';
import { WorkspaceLayout } from '../components/common/WorkspaceLayout';
import { PROGRAMME_RISKS, PROGRAMME_ROADMAP_MODULES } from '../data/mockData';
import {
  Gauge,
  CalendarBlank,
  WarningCircle,
  CheckCircle,
  Flag,
  TrendUp,
  DownloadSimple,
  ShieldCheck,
  FileText,
  SlidersHorizontal,
  Info,
} from '@phosphor-icons/react';

export const S11_CommandCentre: React.FC = () => {
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<any>(PROGRAMME_RISKS[1]); // R03
  const [downloadingReport, setDownloadingReport] = useState<boolean>(false);

  const filteredModules = selectedModuleFilter === 'all'
    ? PROGRAMME_ROADMAP_MODULES
    : PROGRAMME_ROADMAP_MODULES.filter((m) => m.id === selectedModuleFilter);

  const handleExportPack = () => {
    setDownloadingReport(true);
    setTimeout(() => {
      setDownloadingReport(false);
      alert('AD-SDI Programme Gate M2 Review Pack & Conformance Report downloaded (PDF).');
    }, 1200);
  };

  return (
    <WorkspaceLayout dark={true}>
      <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-100">
        {/* Top Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F385C] pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>PROGRAMME</span>
              <span>/</span>
              <span className="font-semibold text-white">Executive Command Centre</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <span>AD-SDI Implementation Programme 2026–2029</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                On Track • Baseline Schedule
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Governance: Steering Committee • PMO • Architecture Working Group • Design Authority | Updated 14 Sep 2027, 09:30 GST
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportPack}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <DownloadSimple className="w-4 h-4" />
              <span>{downloadingReport ? 'Generating Pack...' : 'Gate M2 Review Pack'}</span>
            </button>
          </div>
        </div>

        {/* 5 Enterprise Programme KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div className="bg-[#10223D] rounded-2xl border border-[#1F385C] p-4 shadow-xs">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Milestone Delivery
            </div>
            <div className="text-2xl font-extrabold text-white font-mono mt-1">
              92%
            </div>
            <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Ahead of Baseline
            </div>
          </div>

          <div className="bg-[#10223D] rounded-2xl border border-[#1F385C] p-4 shadow-xs">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Gates Accepted
            </div>
            <div className="text-2xl font-extrabold text-white font-mono mt-1">
              1 / 4
            </div>
            <div className="text-[11px] text-slate-400 mt-2">
              Gate M1 Closed (Jul 2027)
            </div>
          </div>

          <div className="bg-[#10223D] rounded-2xl border border-[#1F385C] p-4 shadow-xs">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Deliverables on Track
            </div>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">
              26 / 28
            </div>
            <div className="text-[11px] text-slate-400 mt-2">
              2 Attention Flags
            </div>
          </div>

          <div className="bg-[#10223D] rounded-2xl border border-[#1F385C] p-4 shadow-xs">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Open Risks
            </div>
            <div className="text-2xl font-extrabold text-amber-400 font-mono mt-1">
              10
            </div>
            <div className="text-[11px] text-red-400 mt-2 font-bold">
              3 High Severity
            </div>
          </div>

          <div className="bg-[#10223D] rounded-2xl border border-[#1F385C] p-4 shadow-xs">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Next Gate Review
            </div>
            <div className="text-xl font-extrabold text-gold-400 font-mono mt-1">
              M2 Dec 2027
            </div>
            <div className="text-[11px] text-slate-400 mt-2">
              Steering Committee Gate
            </div>
          </div>
        </div>

        {/* Interactive Programme Roadmap (Aug 2026 → Jun 2029 with Today Marker) */}
        <div className="bg-[#10223D] rounded-2xl border border-[#1F385C] p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F385C] pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">
                Programme Master Roadmap (Aug 2026 – Jun 2029)
              </h3>
              <p className="text-[11px] text-slate-400">
                Phase 1: Foundation • Phase 2: Core Platform • Phase 3: Expansion • Phase 4: Full Emirate Integration
              </p>
            </div>

            {/* Filter by Module */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Filter Lane:</span>
              <select
                value={selectedModuleFilter}
                onChange={(e) => setSelectedModuleFilter(e.target.value)}
                className="p-1.5 bg-[#0A1628] border border-[#1F385C] rounded text-slate-200 text-xs"
              >
                <option value="all">All Modules (A–F)</option>
                <option value="mod-a">Module A: Clearinghouse</option>
                <option value="mod-b">Module B: GeoAI</option>
                <option value="mod-c">Module C: Marketplace</option>
                <option value="mod-d">Module D: Capacity Building</option>
                <option value="mod-e">Module E: Digital Twin</option>
                <option value="mod-f">Module F: Open Data</option>
              </select>
            </div>
          </div>

          {/* Timeline Visual Canvas */}
          <div className="space-y-4 relative pt-4 overflow-x-auto">
            {/* Timeline Header Quarters & Today Marker */}
            <div className="min-w-[700px] flex justify-between text-[11px] font-mono text-slate-400 border-b border-[#1F385C] pb-2 relative">
              <span>Q3 2026</span>
              <span>Q1 2027</span>
              <span className="text-gold-400 font-bold">Today (Sep 2027)</span>
              <span>Q1 2028</span>
              <span>Q3 2028</span>
              <span>Q1 2029</span>
              <span>Q2 2029</span>

              {/* Vertical Today Line */}
              <div
                className="absolute top-0 bottom-[-280px] w-0.5 bg-gold-500 z-20 pointer-events-none"
                style={{ left: '38%' }}
              >
                <div className="absolute -top-4 -translate-x-1/2 bg-gold-500 text-navy-900 font-mono font-bold text-[9px] px-1 rounded">
                  TODAY
                </div>
              </div>
            </div>

            {/* Modules Tracks */}
            <div className="min-w-[700px] space-y-3 pt-2">
              {filteredModules.map((mod) => (
                <div key={mod.id} className="p-3 rounded-xl bg-[#0D1C33] border border-[#1F385C] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: mod.color }}></span>
                      <span className="font-bold text-white">{mod.code}: {mod.name}</span>
                    </div>
                    <span className="font-mono text-slate-300">{mod.progress}% Delivered</span>
                  </div>

                  {/* Deliverables pill ribbon */}
                  <div className="grid grid-cols-4 gap-2 text-[10px]">
                    {mod.deliverables.map((del) => (
                      <div
                        key={del.name}
                        className={`p-2 rounded-lg border flex items-center justify-between ${
                          del.done
                            ? 'bg-[#132A4D] border-[#254A80] text-emerald-300 font-medium'
                            : del.gate
                            ? 'bg-[#261E0E] border-gold-500/50 text-gold-300 font-bold'
                            : 'bg-[#0A1628] border-[#1F385C] text-slate-400'
                        }`}
                      >
                        <span className="truncate">{del.name}</span>
                        {del.done ? (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />
                        ) : del.gate ? (
                          <span className="px-1.5 py-0.2 rounded bg-gold-500 text-navy-900 font-mono font-bold text-[9px]">
                            {del.gate}
                          </span>
                        ) : (
                          <span className="font-mono text-[9px]">{del.date}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Column Split: Top Programme Risks & Design Conformance Roster */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Top Programme Risks (6 Cols) */}
          <div className="lg:col-span-6 bg-[#10223D] rounded-2xl border border-[#1F385C] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#1F385C] pb-3">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Active Programme Risk Register
                </h3>
                <p className="text-[11px] text-slate-400">Mitigation tracking and risk owners</p>
              </div>
              <span className="text-[11px] font-mono text-red-400 font-bold bg-red-950/60 px-2 py-0.5 rounded border border-red-800">
                10 Open Risks
              </span>
            </div>

            <div className="space-y-2.5">
              {PROGRAMME_RISKS.map((r) => {
                const isSelected = selectedRisk.id === r.id;
                return (
                  <div
                    key={r.id}
                    onClick={() => setSelectedRisk(r)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#183158] border-gold-500 ring-1 ring-gold-500/30'
                        : 'bg-[#0A1628] border-[#1F385C] hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-gold-400">{r.code}</span>
                        <span className="font-semibold text-white">{r.title}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.severity === 'High' ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {r.severity}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-300 mt-2 leading-relaxed">
                      <strong>Mitigation:</strong> {r.mitigation}
                    </div>

                    <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                      <span>Owner: {r.owner}</span>
                      <span className="font-mono">Trend: {r.trend}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deliverables Acceptance & Design Conformance (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Deliverable Acceptance Breakdown */}
            <div className="bg-[#10223D] rounded-2xl border border-[#1F385C] p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-white border-b border-[#1F385C] pb-3">
                Deliverable Acceptance Status
              </h3>

              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800">
                  <div className="text-[10px] text-emerald-300 font-bold uppercase">Accepted</div>
                  <div className="text-xl font-extrabold text-white font-mono mt-0.5">38</div>
                </div>
                <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800">
                  <div className="text-[10px] text-blue-300 font-bold uppercase">In Review</div>
                  <div className="text-xl font-extrabold text-white font-mono mt-0.5">9</div>
                </div>
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800">
                  <div className="text-[10px] text-amber-300 font-bold uppercase">Conditional</div>
                  <div className="text-xl font-extrabold text-white font-mono mt-0.5">4</div>
                </div>
                <div className="p-3 rounded-xl bg-red-950/40 border border-red-800">
                  <div className="text-[10px] text-red-300 font-bold uppercase">Rejected</div>
                  <div className="text-xl font-extrabold text-white font-mono mt-0.5">1</div>
                </div>
              </div>
            </div>

            {/* Design Conformance Roster */}
            <div className="bg-[#10223D] rounded-2xl border border-[#1F385C] p-6 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-white border-b border-[#1F385C] pb-3">
                Architecture & Design Conformance Gate
              </h3>

              <dl className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-[#1F385C]/60">
                  <dt className="text-slate-400">Total Architectural Requirements</dt>
                  <dd className="font-mono font-bold text-white">148 Requirements</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1F385C]/60">
                  <dt className="text-slate-400">Requirements Traced & Mapped</dt>
                  <dd className="font-mono font-bold text-emerald-400">148 Traced (100%)</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1F385C]/60">
                  <dt className="text-slate-400">Formally Verified by Design Authority</dt>
                  <dd className="font-mono font-bold text-blue-400">61 Verified</dd>
                </div>
                <div className="flex justify-between py-1">
                  <dt className="text-slate-400">Proposed Deviations Under PMO Review</dt>
                  <dd className="font-mono font-bold text-amber-400">3 Deviations</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
};
