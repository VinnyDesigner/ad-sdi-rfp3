import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
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
} from '@phosphor-icons/react';

export const S09c_ProviderWorkspace: React.FC = () => {
  const navigate = useNavigate();

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
              <Link to="/marketplace" className="hover:text-blue-600">Marketplace</Link>
              <span>/</span>
              <span className="font-semibold text-navy-900">Provider Workspace</span>
            </div>
            <h1 className="text-2xl font-bold text-navy-900 tracking-tight">
              My Products & Distribution Console
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Manage data products published by Department of Municipalities and Transport (DMT).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1.5 rounded-lg bg-white border border-border text-navy-900 font-semibold shadow-xs">
              Publisher: DMT (Khalid M.)
            </span>
            <button
              onClick={() => navigate('/workspace/publishing')}
              className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Submit New Product</span>
            </button>
          </div>
        </div>

        {/* 4-Stage Publishing Workflow Diagram Strip */}
        <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
          <div className="text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-3">
            Marketplace Publication Stages
          </div>
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-canvas border border-border">
              <div className="font-bold text-navy-900">1. Submitted</div>
              <div className="text-[10px] text-text-muted mt-0.5">Metadata & schema package</div>
            </div>
            <div className="p-2.5 rounded-xl bg-canvas border border-border">
              <div className="font-bold text-navy-900">2. Quality Check</div>
              <div className="text-[10px] text-text-muted mt-0.5">Automated validation</div>
            </div>
            <div className="p-2.5 rounded-xl bg-canvas border border-border">
              <div className="font-bold text-navy-900">3. Custodian Approval</div>
              <div className="text-[10px] text-text-muted mt-0.5">Classification & DSA clearance</div>
            </div>
            <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900">
              <div className="font-bold">4. Published</div>
              <div className="text-[10px] text-teal-700 mt-0.5">Active in Marketplace</div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl border border-border shadow-xs overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider">
              DMT Published Data Products (4)
            </h3>
            <span className="text-[11px] text-text-muted">Total active subscribers: 52</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
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

        {/* Analytics: Usage & Revenue-Share Report (Bar Visualizations, No invented financial numbers) */}
        <div className="bg-white rounded-2xl border border-border p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-3 gap-2">
            <div>
              <h3 className="text-sm font-bold text-navy-900">
                Usage & Revenue-Share Governance Report
              </h3>
              <p className="text-[11px] text-text-secondary">
                Audited monthly distribution index under DMT inter-governmental framework
              </p>
            </div>
            <div className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-semibold">
              Per approved revenue-sharing model
            </div>
          </div>

          {/* Monthly Bar Visualization */}
          <div className="space-y-3 pt-2">
            <div className="h-32 w-full flex items-end gap-3 pt-4">
              {[
                { month: 'Apr 2027', calls: '620k calls', height: '45%' },
                { month: 'May 2027', calls: '740k calls', height: '58%' },
                { month: 'Jun 2027', calls: '890k calls', height: '68%' },
                { month: 'Jul 2027', calls: '920k calls', height: '72%' },
                { month: 'Aug 2027', calls: '1.05M calls', height: '84%' },
                { month: 'Sep 2027', calls: '1.16M calls', height: '95%' },
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer">
                  <div className="w-full bg-teal-100 group-hover:bg-teal-600 rounded-t transition-colors relative" style={{ height: bar.height }}>
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-navy-900 text-white text-[10px] py-0.5 px-2 rounded pointer-events-none whitespace-nowrap z-20">
                      {bar.calls}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-text-secondary">{bar.month}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] text-text-muted border-t border-border pt-3">
              <span>Audited under Abu Dhabi Government Financial Circular No. 4/2026</span>
              <span className="font-semibold text-navy-900">Total YTD Consumed Volume: 5.38M Requests</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
