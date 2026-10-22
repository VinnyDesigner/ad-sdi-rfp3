import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useLanguage } from '../context/LanguageContext';
import {
  Storefront,
  Plus,
  Users,
  ChartBar,
  CheckCircle,
  Clock,
  ArrowRight,
  Eye,
  FileText,
  ShieldCheck,
  TrendUp,
  DownloadSimple,
  CalendarBlank,
} from '@phosphor-icons/react';

export const S09c_ProviderWorkspace: React.FC = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const navigate = useNavigate();

  const [selectedMetric, setSelectedMetric] = useState<'volume' | 'index' | 'combined'>('combined');
  const [hoveredIdx, setHoveredIdx] = useState<number>(5); // default to Sep 2027

  const monthlyGovernanceData = [
    {
      month: 'Apr 2027',
      shortMonth: 'Apr',
      calls: 620000,
      callsFormatted: '620k calls',
      revenueScore: 78.4,
      egressTB: '7.8 TB',
      growth: '+12.4%',
      topAgency: 'Abu Dhabi Police (GHQ)',
      compliance: '100% SLA',
      heightPercent: 53,
    },
    {
      month: 'May 2027',
      shortMonth: 'May',
      calls: 740000,
      callsFormatted: '740k calls',
      revenueScore: 82.1,
      egressTB: '9.4 TB',
      growth: '+19.3%',
      topAgency: 'Dept of Energy (DoE)',
      compliance: '100% SLA',
      heightPercent: 63,
    },
    {
      month: 'Jun 2027',
      shortMonth: 'Jun',
      calls: 890000,
      callsFormatted: '890k calls',
      revenueScore: 86.5,
      egressTB: '11.2 TB',
      growth: '+20.2%',
      topAgency: 'DoH Healthcare GIS',
      compliance: '99.9% SLA',
      heightPercent: 76,
    },
    {
      month: 'Jul 2027',
      shortMonth: 'Jul',
      calls: 920000,
      callsFormatted: '920k calls',
      revenueScore: 88.0,
      egressTB: '11.9 TB',
      growth: '+3.4%',
      topAgency: 'Environment Agency (EAD)',
      compliance: '100% SLA',
      heightPercent: 78,
    },
    {
      month: 'Aug 2027',
      shortMonth: 'Aug',
      calls: 1050000,
      callsFormatted: '1.05M calls',
      revenueScore: 91.2,
      egressTB: '13.4 TB',
      growth: '+14.1%',
      topAgency: 'Integrated Transport (ITC)',
      compliance: '100% SLA',
      heightPercent: 89,
    },
    {
      month: 'Sep 2027',
      shortMonth: 'Sep',
      calls: 1160000,
      callsFormatted: '1.16M calls',
      revenueScore: 94.8,
      egressTB: '14.8 TB',
      growth: '+10.5%',
      topAgency: 'Abu Dhabi Civil Defence',
      compliance: '100% SLA',
      heightPercent: 98,
    },
  ];

  const myProviderProducts = [
    {
      id: 'p-1',
      title: 'Building Footprints 3D',
      version: 'v2027.08',
      stage: 'Published',
      subscribers: 18,
      usage30d: '320,400 calls',
      growth: '+14%',
    },
    {
      id: 'p-2',
      title: 'Land Parcels API',
      version: 'v2027.09',
      stage: 'Published',
      subscribers: 34,
      usage30d: '840,120 calls',
      growth: '+22%',
    },
    {
      id: 'p-3',
      title: 'Road Network Speed & Flow Index',
      version: 'v2027.09-beta',
      stage: 'Approval',
      subscribers: 0,
      usage30d: '— (In Review)',
      growth: 'New',
    },
    {
      id: 'p-4',
      title: 'Pedestrian Crossing Calming Zones',
      version: 'v1.0',
      stage: 'Quality check',
      subscribers: 0,
      usage30d: '— (Testing)',
      growth: 'New',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Header />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-6">
        {/* Header Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-text-secondary mb-1">
              <Link to="/marketplace" className="hover:text-blue-600">{isAr ? 'سوق البيانات' : 'Marketplace'}</Link>
              <span>/</span>
              <span className="font-semibold text-navy-900">{isAr ? 'مساحة عمل المزود' : 'Provider Workspace'}</span>
            </div>
            <h1 className="text-2xl font-bold text-navy-900 tracking-tight">
              {isAr ? 'لوحة إدارة المنتجات والتوزيع' : 'My Products & Distribution Console'}
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              {isAr ? 'إدارة ومتابعة منتجات البيانات المنشورة بواسطة دائرة البلديات والنقل (DMT).' : 'Manage data products published by Department of Municipalities and Transport (DMT).'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1.5 rounded-lg bg-white border border-border text-navy-900 font-semibold shadow-xs">
              {isAr ? 'الناشر: دائرة البلديات والنقل (خالد م.)' : 'Publisher: DMT (Khalid M.)'}
            </span>
            <button
              onClick={() => navigate('/workspace/publishing')}
              className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{isAr ? 'إضافة منتج جديد' : 'Submit New Product'}</span>
            </button>
          </div>
        </div>

        {/* 4-Stage Publishing Workflow Diagram Strip */}
        <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
          <div className="text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-3">
            {isAr ? 'مراحل اعتماد ونشر المنتجات' : 'Marketplace Publication Stages'}
          </div>
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-canvas border border-border">
              <div className="font-bold text-navy-900">{isAr ? '1. تم الإرسال' : '1. Submitted'}</div>
              <div className="text-[10px] text-text-muted mt-0.5">{isAr ? 'حزمة البيانات والمخطط' : 'Metadata & schema package'}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-canvas border border-border">
              <div className="font-bold text-navy-900">{isAr ? '2. فحص الجودة' : '2. Quality Check'}</div>
              <div className="text-[10px] text-text-muted mt-0.5">{isAr ? 'التحقق الآلي والمعايير' : 'Automated validation'}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-canvas border border-border">
              <div className="font-bold text-navy-900">{isAr ? '3. الاعتمادات' : '3. Approvals'}</div>
              <div className="text-[10px] text-text-muted mt-0.5">{isAr ? 'موافقة مشرف ومسؤول البيانات' : 'Custodian & legal signoff'}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900">
              <div className="font-bold">{isAr ? '4. تم النشر' : '4. Published'}</div>
              <div className="text-[10px] text-teal-700 mt-0.5">{isAr ? 'متاح ومفعل في السوق' : 'Active in Marketplace'}</div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl border border-border shadow-xs overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider">
              {isAr ? 'منتجات البيانات المنشورة لدائرة البلديات والنقل (4)' : 'DMT Published Data Products (4)'}
            </h3>
            <span className="text-[11px] text-text-muted">
              {isAr ? 'إجمالي المشتركين النشطين: 52' : 'Total active subscribers: 52'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-xs">
              <thead className="bg-canvas border-b border-border text-[11px] uppercase tracking-wider text-text-secondary">
                <tr>
                  <th className="p-3.5">Product Title</th>
                  <th className="p-3.5">Version</th>
                  <th className="p-3.5">Publishing Stage</th>
                  <th className="p-3.5">Subscribers</th>
                  <th className="p-3.5">Usage in 30 Days</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {myProviderProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-canvas transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-navy-900">{p.title}</div>
                      <div className="text-[10px] text-text-secondary">Cadastre & Urban Infrastructure</div>
                    </td>
                    <td className="p-3.5 font-mono text-text-secondary">{p.version}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.stage === 'Published'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : p.stage === 'Approval'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {p.stage}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-navy-900">
                      {p.subscribers > 0 ? `${p.subscribers} entities` : '—'}
                    </td>
                    <td className="p-3.5">
                      <span className="font-mono text-navy-900 font-semibold">{p.usage30d}</span>
                      {p.growth !== 'New' && (
                        <span className="text-emerald-600 text-[10px] font-semibold ml-1.5">{p.growth}</span>
                      )}
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/catalogue/land-parcels`}
                          className="px-2.5 py-1 rounded-md bg-canvas hover:bg-canvas-subtle border border-border text-navy-900 text-[11px] font-medium"
                        >
                          View
                        </Link>
                        <Link
                          to={`/workspace/publishing`}
                          className="px-2.5 py-1 rounded-md bg-white hover:bg-canvas border border-border text-blue-600 text-[11px] font-medium"
                        >
                          Pipeline
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Analytics: Usage & Revenue-Share Report (Interactive High-Fidelity Graph) */}
        <div className="bg-white rounded-2xl border border-border p-6 shadow-xs space-y-6">
          {/* Header with Title and Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-border pb-4 gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-base font-bold text-navy-900">
                  Usage & Revenue-Share Governance Report
                </h3>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-semibold shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Per approved revenue-sharing model
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-1">
                Audited monthly distribution index under DMT inter-governmental framework (H1–H2 2027)
              </p>
            </div>

            {/* Metric Switcher & Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex p-1 bg-canvas rounded-xl border border-border text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedMetric('combined')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    selectedMetric === 'combined'
                      ? 'bg-white text-navy-900 shadow-xs font-bold'
                      : 'text-text-secondary hover:text-navy-900'
                  }`}
                >
                  Combined View
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMetric('volume')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    selectedMetric === 'volume'
                      ? 'bg-white text-navy-900 shadow-xs font-bold'
                      : 'text-text-secondary hover:text-navy-900'
                  }`}
                >
                  API Volume
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMetric('index')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    selectedMetric === 'index'
                      ? 'bg-white text-navy-900 shadow-xs font-bold'
                      : 'text-text-secondary hover:text-navy-900'
                  }`}
                >
                  Governance Index
                </button>
              </div>

              <button
                type="button"
                onClick={() => alert('Exporting DMT Governance & Revenue Settlement Audit Statement (PDF)...')}
                className="px-3.5 py-1.5 rounded-xl border border-border bg-white hover:bg-canvas text-navy-900 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <DownloadSimple className="w-3.5 h-3.5 text-text-secondary" />
                <span>Export Statement</span>
              </button>
            </div>
          </div>

          {/* KPI Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-canvas border border-border">
              <div className="flex items-center justify-between text-[11px] text-text-secondary">
                <span>Total YTD Consumed</span>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] flex items-center gap-0.5">
                  <TrendUp className="w-3 h-3" /> +28.4%
                </span>
              </div>
              <div className="text-lg font-bold text-navy-900 mt-1 font-mono">5.38M Requests</div>
              <div className="text-[10px] text-text-muted mt-0.5">Across 4 published DMT products</div>
            </div>

            <div className="p-3.5 rounded-xl bg-canvas border border-border">
              <div className="flex items-center justify-between text-[11px] text-text-secondary">
                <span>DMT Governance Score</span>
                <span className="text-blue-700 font-semibold bg-blue-50 px-1.5 py-0.5 rounded text-[10px]">
                  Tier 1
                </span>
              </div>
              <div className="text-lg font-bold text-navy-900 mt-1 font-mono">94.8 / 100</div>
              <div className="text-[10px] text-text-muted mt-0.5">Max revenue allocation index</div>
            </div>

            <div className="p-3.5 rounded-xl bg-canvas border border-border">
              <div className="flex items-center justify-between text-[11px] text-text-secondary">
                <span>Data Egress Bandwidth</span>
                <span className="text-teal-700 font-semibold bg-teal-50 px-1.5 py-0.5 rounded text-[10px]">
                  Peak Sep
                </span>
              </div>
              <div className="text-lg font-bold text-navy-900 mt-1 font-mono">68.5 TB</div>
              <div className="text-[10px] text-text-muted mt-0.5">High-speed OGC 3D Tile stream</div>
            </div>

            <div className="p-3.5 rounded-xl bg-canvas border border-border">
              <div className="flex items-center justify-between text-[11px] text-text-secondary">
                <span>Treasury Settlement</span>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                  Audited
                </span>
              </div>
              <div className="text-lg font-bold text-navy-900 mt-1 font-mono">100% Cleared</div>
              <div className="text-[10px] text-text-muted mt-0.5">Circular No. 4/2026 Compliant</div>
            </div>
          </div>

          {/* Interactive Graph Box */}
          <div className="bg-canvas/60 rounded-2xl border border-border/80 p-5 space-y-4">
            {/* Chart Legend & SLA Indicator */}
            <div className="flex flex-wrap items-center justify-between text-xs gap-3">
              <div className="flex flex-wrap items-center gap-4">
                {(selectedMetric === 'combined' || selectedMetric === 'volume') && (
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded bg-gradient-to-t from-teal-600 to-teal-400 inline-block shadow-xs"></span>
                    <span className="text-navy-900 font-medium">Monthly API Volume (Requests)</span>
                  </div>
                )}
                {(selectedMetric === 'combined' || selectedMetric === 'index') && (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-1 rounded-full bg-blue-600 inline-block"></span>
                    <span className="text-navy-900 font-medium">Distribution Governance Score</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="w-4 h-0.5 border-t-2 border-dashed border-amber-500 inline-block"></span>
                  <span className="text-text-secondary font-mono text-[11px]">SLA Baseline: 750k</span>
                </div>
              </div>

              <div className="text-[11px] text-text-muted font-mono flex items-center gap-1.5">
                <CalendarBlank className="w-3.5 h-3.5 text-text-secondary" />
                <span>Audited DMT Billing Cycle (6 Months)</span>
              </div>
            </div>

            {/* Visual Graph with Gridlines, Bars, and Trendline */}
            <div className="relative pt-10 pb-2">
              {/* Y-Axis Gridlines & Labels */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 pr-2 pt-4">
                {[
                  { label: '1.2M', index: '100 pts' },
                  { label: '900k', index: '75 pts' },
                  { label: '600k', index: '50 pts' },
                  { label: '300k', index: '25 pts' },
                  { label: '0', index: '0 pts' },
                ].map((tier, i) => (
                  <div key={i} className="flex items-center gap-2 w-full">
                    <span className="text-[10px] font-mono text-text-muted w-9 text-right shrink-0">
                      {selectedMetric === 'index' ? tier.index : tier.label}
                    </span>
                    <div className="flex-1 border-b border-dashed border-border/70"></div>
                  </div>
                ))}
              </div>

              {/* 750k Baseline SLA reference line */}
              {selectedMetric !== 'index' && (
                <div
                  className="absolute left-11 right-6 border-t-2 border-dashed border-amber-400/80 pointer-events-none z-10 flex items-center justify-end pr-2"
                  style={{ top: '42%' }}
                >
                  <span className="bg-amber-50 border border-amber-300 text-amber-800 text-[9px] font-mono font-semibold px-2 py-0.5 rounded shadow-2xs">
                    750k Target Threshold
                  </span>
                </div>
              )}

              {/* Chart Plot Area */}
              <div className="h-56 w-full flex items-end pl-11 relative">
                {/* SVG Trendline & Area Overlay */}
                {(selectedMetric === 'combined' || selectedMetric === 'index') && (
                  <svg
                    viewBox="0 0 600 224"
                    preserveAspectRatio="none"
                    className="absolute inset-0 w-full h-full pointer-events-none z-20 pl-11"
                  >
                    <defs>
                      <linearGradient id="splineAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#1E40AF" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>

                    {/* Area fill under trend curve */}
                    <path
                      d="M 50,78 C 100,78 100,68 150,68 C 200,68 200,56 250,56 C 300,56 300,52 350,52 C 400,52 400,43 450,43 C 500,43 500,32 550,32 L 550,224 L 50,224 Z"
                      fill="url(#splineAreaGrad)"
                    />

                    {/* Spline curve line */}
                    <path
                      d="M 50,78 C 100,78 100,68 150,68 C 200,68 200,56 250,56 C 300,56 300,52 350,52 C 400,52 400,43 450,43 C 500,43 500,32 550,32"
                      fill="none"
                      stroke="url(#lineGrad)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Interactive Points on Line */}
                    {[
                      { cx: 50, cy: 78, idx: 0 },
                      { cx: 150, cy: 68, idx: 1 },
                      { cx: 250, cy: 56, idx: 2 },
                      { cx: 350, cy: 52, idx: 3 },
                      { cx: 450, cy: 43, idx: 4 },
                      { cx: 550, cy: 32, idx: 5 },
                    ].map((pt) => {
                      const isHovered = hoveredIdx === pt.idx;
                      return (
                        <g key={pt.idx}>
                          {isHovered && (
                            <circle
                              cx={pt.cx}
                              cy={pt.cy}
                              r="10"
                              fill="#3B82F6"
                              fillOpacity="0.25"
                              className="animate-pulse"
                            />
                          )}
                          <circle
                            cx={pt.cx}
                            cy={pt.cy}
                            r={isHovered ? 6 : 4.5}
                            fill="#FFFFFF"
                            stroke="#1E40AF"
                            strokeWidth={isHovered ? 3 : 2.5}
                          />
                        </g>
                      );
                    })}
                  </svg>
                )}

                {/* Bars & Column Tracks */}
                <div className="w-full h-full flex items-end justify-between gap-2 sm:gap-4 relative z-10">
                  {monthlyGovernanceData.map((bar, idx) => {
                    const isHovered = hoveredIdx === idx;
                    return (
                      <div
                        key={idx}
                        className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer group"
                        onMouseEnter={() => setHoveredIdx(idx)}
                      >
                        {/* Bar Track Container with explicit height */}
                        <div className="w-full max-w-[54px] h-full flex items-end justify-center relative">
                          {/* Value Tooltip Badge */}
                          <div
                            className={`absolute -top-9 left-1/2 -translate-x-1/2 bg-navy-900 text-white text-[11px] font-mono py-1 px-2.5 rounded-lg whitespace-nowrap shadow-lg pointer-events-none z-30 transition-all duration-200 ${
                              isHovered
                                ? 'opacity-100 -translate-y-1'
                                : 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'
                            }`}
                          >
                            <span className="font-bold">{bar.callsFormatted}</span>
                            <span className="text-teal-300 ml-1.5 text-[10px]">({bar.revenueScore} pts)</span>
                          </div>

                          {/* The Rendered Bar */}
                          {selectedMetric !== 'index' ? (
                            <div
                              className={`w-full rounded-t-xl transition-all duration-300 relative ${
                                isHovered
                                  ? 'bg-gradient-to-t from-teal-800 via-teal-600 to-teal-400 shadow-md shadow-teal-600/30 scale-x-105'
                                  : 'bg-gradient-to-t from-teal-700 via-teal-600 to-teal-500 shadow-xs hover:from-teal-600 hover:to-teal-400'
                              }`}
                              style={{ height: `${bar.heightPercent}%` }}
                            >
                              <div className="w-full h-1.5 bg-teal-300/40 rounded-t-xl"></div>
                            </div>
                          ) : (
                            /* Alternate Bar for Governance Index Only View */
                            <div
                              className={`w-full rounded-t-xl transition-all duration-300 relative ${
                                isHovered
                                  ? 'bg-gradient-to-t from-blue-800 via-blue-600 to-blue-400 shadow-md shadow-blue-600/30 scale-x-105'
                                  : 'bg-gradient-to-t from-blue-700 via-blue-600 to-blue-500 shadow-xs'
                              }`}
                              style={{ height: `${(bar.revenueScore / 100) * 98}%` }}
                            >
                              <div className="w-full h-1.5 bg-blue-300/50 rounded-t-xl"></div>
                            </div>
                          )}
                        </div>

                        {/* Month Label */}
                        <div className="mt-2 text-center">
                          <div
                            className={`text-xs font-mono transition-colors ${
                              isHovered ? 'text-navy-900 font-bold' : 'text-text-secondary'
                            }`}
                          >
                            {bar.month}
                          </div>
                          <div className="text-[10px] text-text-muted hidden sm:block font-mono">
                            {bar.growth}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Selected Month Deep-Dive Breakdown Card */}
            {hoveredIdx !== null && (
              <div className="mt-4 p-4 rounded-xl bg-white border border-border shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-2.5 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block animate-ping"></span>
                    <span className="text-xs font-bold text-navy-900">
                      Audit Snapshot: {monthlyGovernanceData[hoveredIdx].month}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Settled & Verified
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-text-muted">
                    Inter-Governmental Settlement Clearing ID: #DMT-2027-0{hoveredIdx + 4}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 text-xs">
                  <div>
                    <div className="text-text-secondary text-[11px]">Audited API Volume</div>
                    <div className="font-bold text-navy-900 font-mono text-sm mt-0.5">
                      {monthlyGovernanceData[hoveredIdx].calls.toLocaleString()} calls
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold">
                      MoM Growth: {monthlyGovernanceData[hoveredIdx].growth}
                    </div>
                  </div>

                  <div>
                    <div className="text-text-secondary text-[11px]">DMT Revenue Share Index</div>
                    <div className="font-bold text-navy-900 font-mono text-sm mt-0.5">
                      {monthlyGovernanceData[hoveredIdx].revenueScore} / 100 pts
                    </div>
                    <div className="text-[10px] text-blue-600 font-semibold">Tier-1 Revenue Multiplier</div>
                  </div>

                  <div>
                    <div className="text-text-secondary text-[11px]">Network Egress Volume</div>
                    <div className="font-bold text-navy-900 font-mono text-sm mt-0.5">
                      {monthlyGovernanceData[hoveredIdx].egressTB}
                    </div>
                    <div className="text-[10px] text-text-muted">OGC 3D Tile streaming</div>
                  </div>

                  <div>
                    <div className="text-text-secondary text-[11px]">Top Subscribed Entity</div>
                    <div className="font-bold text-navy-900 text-sm mt-0.5 truncate">
                      {monthlyGovernanceData[hoveredIdx].topAgency}
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold">
                      {monthlyGovernanceData[hoveredIdx].compliance}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Governance Disclaimer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-text-muted border-t border-border/80 pt-3 gap-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Audited under Abu Dhabi Government Financial Circular No. 4/2026</span>
              </div>
              <span className="font-semibold text-navy-900 font-mono">
                Total YTD Consumed Volume: 5.38M Requests
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
