import React, { useState } from 'react';
import { WorkspaceLayout } from '../components/common/WorkspaceLayout';
import {
  ShieldCheck,
  Lock,
  UserCheck,
  CheckCircle,
  XCircle,
  WarningCircle,
  Clock,
  Eye,
  Check,
  X,
  FileText,
  Key,
  Info,
} from '@phosphor-icons/react';

export const S14_SecurityConsole: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'requests' | 'roles' | 'classification' | 'audit'>('overview');
  const [selectedAuditFilter, setSelectedAuditFilter] = useState<'all' | 'denied' | 'approved'>('all');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [accessRequests, setAccessRequests] = useState([
    {
      id: 'req-1',
      requester: 'Omar R.',
      entity: 'Al Dar Geospatial Partners Ltd',
      dataset: 'Land Parcels API (Cadastre)',
      classification: 'Shared – Government',
      purpose: 'Master planning simulation for Yas North expansion corridor under DMT permit.',
      approver: 'Khalid M. (DMT)',
      waiting: '1 day',
      agreement: 'DSA-2027-014',
    },
    {
      id: 'req-2',
      requester: 'Sara B.',
      entity: 'Abu Dhabi Public Health Centre (ADPHC)',
      dataset: 'Population Grid 100 m',
      classification: 'Shared – Government',
      purpose: 'Epidemiological hotspot spatial risk modeling and clinic accessibility study.',
      approver: 'Ahmed S. (SCAD)',
      waiting: '3 days',
      agreement: 'DSA-2027-009',
    },
    {
      id: 'req-3',
      requester: 'Tariq N.',
      entity: 'CleanEnergy Geospatial Ltd',
      dataset: 'Underground Water Distribution Pipeline Network',
      classification: 'Restricted',
      purpose: 'Geothermal thermal conductivity study along municipal pipelines.',
      approver: 'Sultan B. (ADDC)',
      waiting: '5 days',
      agreement: 'Pending Security Clearance',
    },
  ]);

  const auditLogEntries = [
    { id: 'aud-1', time: '14 Sep 2027 09:12 GST', user: 'External User (IP: 194.170.x.x)', action: 'Denied — Restricted dataset, no agreement.', dataset: 'Underground Water Distribution Pipeline Network', status: 'Blocked' },
    { id: 'aud-2', time: '14 Sep 2027 08:45 GST', user: 'Khalid M. (DMT Data Steward)', action: 'Approved access request REQ-2027-084', dataset: 'Land Parcels API', status: 'Allowed' },
    { id: 'aud-3', time: '13 Sep 2027 16:30 GST', user: 'Fatima A. (Spatial Quality Officer)', action: 'Automated gateway validation passed (100%)', dataset: 'Bus Stops & Routes v2027.09', status: 'Allowed' },
    { id: 'aud-4', time: '13 Sep 2027 14:15 GST', user: 'System Sentinel', action: 'Failed MFA authentication challenge (3 retries)', dataset: 'Security Console Access', status: 'Blocked' },
    { id: 'aud-5', time: '12 Sep 2027 11:20 GST', user: 'Omar R. (Approved Partner)', action: 'Downloaded GeoJSON Feature Package', dataset: 'Mangrove Habitat Extent 2027', status: 'Allowed' },
  ];

  const handleApprove = (id: string, name: string) => {
    setAccessRequests((prev) => prev.filter((r) => r.id !== id));
    setToastMsg(`Access request for "${name}" approved. Key generated and recorded in audit log.`);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleReject = (id: string, name: string) => {
    setAccessRequests((prev) => prev.filter((r) => r.id !== id));
    setToastMsg(`Access request for "${name}" denied. Reason logged in security register.`);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const filteredAudit = selectedAuditFilter === 'all'
    ? auditLogEntries
    : selectedAuditFilter === 'denied'
    ? auditLogEntries.filter((a) => a.status === 'Blocked')
    : auditLogEntries.filter((a) => a.status === 'Allowed');

  return (
    <WorkspaceLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-text-secondary mb-1">
              <span>GOVERN</span>
              <span>/</span>
              <span className="font-semibold text-navy-900">Security & Access Console</span>
            </div>
            <h1 className="text-2xl font-bold text-navy-900 tracking-tight">
              Security, Classification & Access Governance
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Role-based permission matrices, classification compliance, and real-time security gate audits.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Gate Release: R-2027.09 Approved</span>
            </span>
          </div>
        </div>

        {/* Sovereign Security & Compliance Strip */}
        <div className="p-3.5 rounded-2xl bg-white border border-border shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
          {[
            'UAE Sovereign Data Residency',
            'FedRAMP / DESC Approved Hosting',
            'AES-256 Encrypted (Transit & Rest)',
            '24/7 Security Monitoring (SOC)',
            'Release Gate R-2027.09 Approved',
            'Penetration Test Passed (Jul 2027)',
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-navy-900 font-medium">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* 5 KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div className="bg-white rounded-2xl border border-border p-4 shadow-xs">
            <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Active Users</div>
            <div className="text-2xl font-extrabold text-navy-900 font-mono mt-1">4,820</div>
            <div className="text-[11px] text-text-muted mt-2">Government & Partner</div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-4 shadow-xs">
            <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Datasets Classified</div>
            <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">100%</div>
            <div className="text-[11px] text-text-muted mt-2">Zero unclassified assets</div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-4 shadow-xs">
            <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Pending Requests</div>
            <div className="text-2xl font-extrabold text-amber-600 font-mono mt-1">17</div>
            <div className="text-[11px] text-text-muted mt-2">Awaiting custodian action</div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-4 shadow-xs">
            <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Blocked Attempts (30d)</div>
            <div className="text-2xl font-extrabold text-navy-900 font-mono mt-1">23</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-2">All mitigated by WAF</div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-4 shadow-xs">
            <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">MFA Enforcement</div>
            <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">100%</div>
            <div className="text-[11px] text-text-muted mt-2">Privileged & Partner</div>
          </div>
        </div>

        {/* Feedback Toast */}
        {toastMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">{toastMsg}</span>
            </div>
            <button onClick={() => setToastMsg(null)} className="text-emerald-700 hover:text-emerald-950 font-bold">
              Dismiss
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-border text-xs">
          {[
            { id: 'overview', label: 'Security & Classification Overview' },
            { id: 'requests', label: 'Access Requests Queue (3)' },
            { id: 'roles', label: 'Role-Permission Matrix' },
            { id: 'classification', label: 'Data Classification Rules' },
            { id: 'audit', label: 'Immutable Audit Log' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-700 bg-white'
                  : 'border-transparent text-text-secondary hover:text-navy-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Classification Distribution Card (6 Cols) */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-border p-6 shadow-xs space-y-4">
              <div className="border-b border-border pb-3">
                <h3 className="text-sm font-bold text-navy-900">
                  Emirate Spatial Data Classification Breakdown
                </h3>
                <p className="text-[11px] text-text-secondary">Mandatory categorization under Abu Dhabi Information Security Standards</p>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-emerald-700">Open Public Data (26%)</span>
                    <span className="font-mono font-bold text-navy-900">640 Datasets</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-canvas overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '26%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-blue-700">Shared – Government Inter-Agency (54%)</span>
                    <span className="font-mono font-bold text-navy-900">1,339 Datasets</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-canvas overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '54%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-amber-700">Restricted – Critical Infrastructure (17%)</span>
                    <span className="font-mono font-bold text-navy-900">421 Datasets</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-canvas overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '17%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-red-700">Confidential – National Defense & Security (3%)</span>
                    <span className="font-mono font-bold text-navy-900">80 Datasets</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-canvas overflow-hidden">
                    <div className="h-full bg-red-600 rounded-full" style={{ width: '3%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Gate Release Progress (6 Cols) */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-border p-6 shadow-xs space-y-4">
              <div className="border-b border-border pb-3">
                <h3 className="text-sm font-bold text-navy-900">
                  Release R-2027.09 Security Gate Status
                </h3>
                <p className="text-[11px] text-text-secondary">Mandatory 4-stage cybersecurity pre-release checklist</p>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { name: '1. Architecture & Threat Assessment', date: 'Passed (28 Aug 2027)', desc: 'Zero critical CVEs in container base images' },
                  { name: '2. External Penetration Testing', date: 'Passed (15 Jul 2027)', desc: 'Conducted by accredited UAE cybersecurity vendor' },
                  { name: '3. API IP Whitelisting & Gateway Routing', date: 'Verified (02 Sep 2027)', desc: 'mTLS mutual authentication established' },
                  { name: '4. Executive Security Sign-off', date: 'Approved (10 Sep 2027)', desc: 'Formal release clearance granted by CISO' },
                ].map((stg) => (
                  <div key={stg.name} className="p-3 rounded-xl bg-canvas border border-border flex items-start justify-between">
                    <div>
                      <div className="font-bold text-navy-900">{stg.name}</div>
                      <div className="text-[10px] text-text-secondary mt-0.5">{stg.desc}</div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                      {stg.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Access Requests Queue */}
        {activeTab === 'requests' && (
          <div className="bg-white rounded-2xl border border-border shadow-xs overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                Access Request Review Queue
              </h3>
              <span className="text-[11px] text-text-muted">Review purpose and linked Data Sharing Agreement</span>
            </div>

            <div className="divide-y divide-border">
              {accessRequests.map((req) => (
                <div key={req.id} className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs">
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-navy-900">{req.requester}</span>
                      <span className="text-text-muted">•</span>
                      <span className="text-text-secondary">{req.entity}</span>
                      <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                        req.classification === 'Restricted' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {req.classification}
                      </span>
                    </div>

                    <div className="font-semibold text-navy-900 pt-0.5">
                      Requested Dataset: <span className="text-blue-600">{req.dataset}</span>
                    </div>

                    <p className="text-[11px] text-text-secondary leading-relaxed">
                      <strong>Purpose:</strong> {req.purpose}
                    </p>

                    <div className="text-[10px] text-text-muted flex items-center gap-4 pt-1">
                      <span>Agreement: <strong className="text-navy-900">{req.agreement}</strong></span>
                      <span>Assigned Approver: <strong className="text-navy-900">{req.approver}</strong></span>
                      <span className="font-mono">Waiting: {req.waiting}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleApprove(req.id, req.dataset)}
                      className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve Request</span>
                    </button>
                    <button
                      onClick={() => handleReject(req.id, req.dataset)}
                      className="px-3.5 py-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs flex items-center gap-1 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Role-Permission Matrix */}
        {activeTab === 'roles' && (
          <div className="bg-white rounded-2xl border border-border shadow-xs overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                Role-Based Spatial Access Control Matrix
              </h3>
            </div>
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead className="bg-canvas border-b border-border text-[11px] uppercase tracking-wider text-text-secondary">
                  <tr>
                    <th className="p-3">User Role Category</th>
                    <th className="p-3">Open Data</th>
                    <th className="p-3">Shared – Government</th>
                    <th className="p-3">Restricted</th>
                    <th className="p-3">Publishing Rights</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="p-3 font-bold text-navy-900">Government Data Steward</td>
                    <td className="p-3 text-emerald-600 font-bold">Full Access</td>
                    <td className="p-3 text-emerald-600 font-bold">Full Access</td>
                    <td className="p-3 text-amber-600 font-medium">Subject to DSA</td>
                    <td className="p-3 text-emerald-600 font-bold">Authorized Sign-off</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-navy-900">Approved Commercial Partner</td>
                    <td className="p-3 text-emerald-600 font-bold">Full Access</td>
                    <td className="p-3 text-blue-600 font-medium">Marketplace Subscription</td>
                    <td className="p-3 text-red-600 font-bold">Denied</td>
                    <td className="p-3 text-slate-400">Read-Only</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-navy-900">Public Visitor</td>
                    <td className="p-3 text-emerald-600 font-bold">Full Access</td>
                    <td className="p-3 text-red-600 font-bold">Denied</td>
                    <td className="p-3 text-red-600 font-bold">Denied</td>
                    <td className="p-3 text-slate-400">Read-Only</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Classification Rules */}
        {activeTab === 'classification' && (
          <div className="bg-white rounded-2xl border border-border p-6 shadow-xs space-y-4 text-xs">
            <h3 className="text-base font-bold text-navy-900">Data Classification Taxonomy</h3>
            <p className="text-text-secondary leading-relaxed">
              Every spatial dataset published in the AD-SDI Clearinghouse must be tagged with one of four formal tiers defined by the Abu Dhabi Government Information Security Guidelines.
            </p>
          </div>
        )}

        {/* Tab 5: Immutable Audit Log */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-2xl border border-border shadow-xs overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                Immutable Geospatial Audit Log
              </h3>
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => setSelectedAuditFilter('all')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium ${selectedAuditFilter === 'all' ? 'bg-navy-900 text-white' : 'text-text-secondary'}`}
                >
                  All Logs
                </button>
                <button
                  onClick={() => setSelectedAuditFilter('denied')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium ${selectedAuditFilter === 'denied' ? 'bg-red-600 text-white' : 'text-text-secondary'}`}
                >
                  Blocked Denials
                </button>
              </div>
            </div>

            <div className="divide-y divide-border text-xs">
              {filteredAudit.map((log) => (
                <div key={log.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-canvas transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.status === 'Blocked' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {log.status}
                      </span>
                      <span className="font-bold text-navy-900">{log.action}</span>
                    </div>
                    <div className="text-[11px] text-text-secondary mt-1">
                      User: <strong>{log.user}</strong> • Target: {log.dataset}
                    </div>
                  </div>

                  <span className="font-mono text-text-muted text-[11px] shrink-0">
                    {log.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </WorkspaceLayout>
  );
};
