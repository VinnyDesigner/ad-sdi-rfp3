import React, { useState } from 'react';
import { WorkspaceLayout } from '../components/common/WorkspaceLayout';
import {
  GraduationCap,
  Users,
  ChartPolar,
  Certificate,
  CheckCircle,
  ArrowRight,
  BookOpen,
  CalendarCheck,
  TrendUp,
  Star,
  Medal,
} from '@phosphor-icons/react';

export const S12_GeoMaturity: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pathways' | 'sessions' | 'certifications'>('overview');
  const [selectedSector, setSelectedSector] = useState<string>('Infrastructure & Municipal');
  const [selectedPathway, setSelectedPathway] = useState<string>('Data Stewards');

  const pathways = [
    { title: 'Executives & Decision-Makers', duration: '8 hours', modules: 4, enrolled: 124, completionRate: '94%', target: 'Leadership & Policy' },
    { title: 'Data Stewards', duration: '32 hours', modules: 8, enrolled: 310, completionRate: '88%', target: 'Governance & Validation' },
    { title: 'GIS Specialists & Analysts', duration: '48 hours', modules: 12, enrolled: 480, completionRate: '86%', target: 'Spatial Analysis & OGC' },
    { title: 'Platform Administrators', duration: '24 hours', modules: 6, enrolled: 78, completionRate: '92%', target: 'Security & Infrastructure' },
    { title: 'Developers & Integrators', duration: '40 hours', modules: 10, enrolled: 240, completionRate: '81%', target: 'APIs, SDKs & Web Services' },
    { title: 'GeoAI & Data Science', duration: '36 hours', modules: 9, enrolled: 195, completionRate: '79%', target: 'Machine Learning & Change Detection' },
    { title: 'Twin, Marketplace & Open Data', duration: '20 hours', modules: 5, enrolled: 275, completionRate: '89%', target: '3D Simulation & Monetization' },
    { title: 'Train-the-Trainer', duration: '56 hours', modules: 14, enrolled: 52, completionRate: '96%', target: 'Certified Emirate Mentors' },
  ];

  const sectorMaturity = [
    { sector: 'Infrastructure & Municipal', score: 3.4, entities: 14, delta: '+0.8' },
    { sector: 'Environment', score: 3.2, entities: 8, delta: '+0.7' },
    { sector: 'Health', score: 2.9, entities: 6, delta: '+0.5' },
    { sector: 'Education', score: 2.8, entities: 9, delta: '+0.6' },
    { sector: 'Safety & Security', score: 2.7, entities: 12, delta: '+0.4' },
    { sector: 'Economy', score: 2.5, entities: 15, delta: '+0.4' },
  ];

  const radarDimensions = [
    { dimension: 'Governance', score: 3.2, max: 5, note: 'Policies, DSAs & Mandates' },
    { dimension: 'Data', score: 3.1, max: 5, note: 'FGDS Schema, Lineage & Quality' },
    { dimension: 'Technology', score: 2.9, max: 5, note: 'OGC APIs, Cloud & Twin' },
    { dimension: 'People', score: 2.7, max: 5, note: 'Skills & Professional Capacity' },
    { dimension: 'Use', score: 2.6, max: 5, note: 'Cross-Agency Spatial Decisions' },
  ];

  return (
    <WorkspaceLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-text-secondary mb-1">
              <span>ENABLE</span>
              <span>/</span>
              <span className="font-semibold text-navy-900">GeoMaturity & Capacity Building</span>
            </div>
            <h1 className="text-2xl font-bold text-navy-900 tracking-tight flex items-center gap-2.5">
              <span>Emirate GeoMaturity & Workforce Enablement</span>
              <span className="text-[10px] font-mono uppercase bg-orange-100 text-orange-800 px-2 py-0.5 rounded border border-orange-200">
                Module D
              </span>
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Benchmarking institutional spatial maturity across 64 entities and executing the 8 national learning pathways.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-orange-50 text-orange-800 border border-orange-200 text-xs font-semibold">
              Next Cohort: 05 Oct 2027
            </span>
          </div>
        </div>

        {/* 5 KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div className="bg-white rounded-2xl border border-border p-4 shadow-xs">
            <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
              Entities Assessed
            </div>
            <div className="text-2xl font-extrabold text-navy-900 font-mono mt-1">
              64 / 64
            </div>
            <div className="text-[11px] text-emerald-600 mt-2 font-semibold flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> 100% Emirate Coverage
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-4 shadow-xs">
            <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
              Average GeoMaturity
            </div>
            <div className="text-2xl font-extrabold text-navy-900 font-mono mt-1">
              2.9 / 5
            </div>
            <div className="text-[11px] text-emerald-600 mt-2 font-semibold">
              +0.6 from Baseline (2.3)
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-4 shadow-xs">
            <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
              Learners Trained
            </div>
            <div className="text-2xl font-extrabold text-blue-600 font-mono mt-1">
              1,842
            </div>
            <div className="text-[11px] text-text-muted mt-2">
              Across all government entities
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-4 shadow-xs">
            <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
              Pathway Completions
            </div>
            <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">
              412
            </div>
            <div className="text-[11px] text-text-muted mt-2">
              Certified professionals
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-4 shadow-xs">
            <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
              Internal Trainers
            </div>
            <div className="text-2xl font-extrabold text-orange-600 font-mono mt-1">
              38
            </div>
            <div className="text-[11px] text-text-muted mt-2">
              Certified Entity Mentors
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-border text-xs">
          {[
            { id: 'overview', label: 'GeoMaturity Overview' },
            { id: 'pathways', label: '8 Learning Pathways' },
            { id: 'sessions', label: 'Upcoming Sessions' },
            { id: 'certifications', label: 'Accreditation Framework' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-orange-600 text-orange-700 bg-white'
                  : 'border-transparent text-text-secondary hover:text-navy-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: GeoMaturity Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Radar 5 Dimensions Breakdown (6 Cols) */}
              <div className="lg:col-span-6 bg-white rounded-2xl border border-border p-6 shadow-xs space-y-4">
                <div className="border-b border-border pb-3">
                  <h3 className="text-sm font-bold text-navy-900">
                    Five Dimensional Maturity Assessment
                  </h3>
                  <p className="text-[11px] text-text-secondary">
                    Overall score: 2.9 / 5 across all 64 government entities
                  </p>
                </div>

                <div className="space-y-3.5">
                  {radarDimensions.map((d) => (
                    <div key={d.dimension} className="space-y-1 text-xs">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-bold text-navy-900">{d.dimension}</span>
                          <span className="text-[10px] text-text-muted ml-2">({d.note})</span>
                        </div>
                        <span className="font-mono font-bold text-navy-900">{d.score} / {d.max}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-canvas overflow-hidden">
                        <div
                          className="h-full bg-orange-500 rounded-full"
                          style={{ width: `${(d.score / d.max) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sector Maturity Benchmarking (6 Cols) */}
              <div className="lg:col-span-6 bg-white rounded-2xl border border-border p-6 shadow-xs space-y-4">
                <div className="border-b border-border pb-3">
                  <h3 className="text-sm font-bold text-navy-900">
                    Sector Geospatial Maturity Comparison
                  </h3>
                  <p className="text-[11px] text-text-secondary">
                    Measured against the 2026 Baseline assessment
                  </p>
                </div>

                <div className="divide-y divide-border">
                  {sectorMaturity.map((s) => (
                    <div
                      key={s.sector}
                      onClick={() => setSelectedSector(s.sector)}
                      className={`py-3 flex items-center justify-between text-xs cursor-pointer transition-colors ${
                        selectedSector === s.sector ? 'bg-orange-50/50 px-2 rounded-lg font-semibold' : 'hover:bg-canvas'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-navy-900">{s.sector}</div>
                        <div className="text-[10px] text-text-muted">{s.entities} contributing entities</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-base text-navy-900">{s.score}</span>
                        <span className="text-emerald-600 font-mono text-[11px] font-semibold">{s.delta}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Training Effectiveness Scorecard */}
            <div className="bg-white rounded-2xl border border-border p-6 shadow-xs">
              <h3 className="text-sm font-bold text-navy-900 mb-4">
                Training Impact & Effectiveness Metrics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-xl bg-canvas border border-border">
                  <div className="text-[10px] text-text-muted uppercase font-bold">Learner Satisfaction</div>
                  <div className="text-2xl font-extrabold text-navy-900 font-mono mt-1">4.6 / 5</div>
                  <div className="text-[11px] text-emerald-600 mt-1">⭐⭐⭐⭐⭐</div>
                </div>
                <div className="p-4 rounded-xl bg-canvas border border-border">
                  <div className="text-[10px] text-text-muted uppercase font-bold">Competence Gain</div>
                  <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">+28%</div>
                  <div className="text-[10px] text-text-muted mt-1">Post-course evaluation</div>
                </div>
                <div className="p-4 rounded-xl bg-canvas border border-border">
                  <div className="text-[10px] text-text-muted uppercase font-bold">Applied on the Job</div>
                  <div className="text-2xl font-extrabold text-blue-600 font-mono mt-1">71%</div>
                  <div className="text-[10px] text-text-muted mt-1">6-month impact survey</div>
                </div>
                <div className="p-4 rounded-xl bg-canvas border border-border">
                  <div className="text-[10px] text-text-muted uppercase font-bold">Emirate GeoMaturity Delta</div>
                  <div className="text-2xl font-extrabold text-orange-600 font-mono mt-1">+0.6</div>
                  <div className="text-[10px] text-text-muted mt-1">From 2.3 to 2.9 overall</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: 8 Learning Pathways */}
        {activeTab === 'pathways' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pathways.map((pw) => (
              <div
                key={pw.title}
                className="bg-white rounded-2xl border border-border p-5 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase text-orange-700 mb-1">
                    <span>{pw.target}</span>
                    <span className="font-mono">{pw.duration}</span>
                  </div>
                  <h4 className="text-sm font-bold text-navy-900 leading-snug">{pw.title}</h4>
                  <p className="text-[11px] text-text-secondary mt-1">{pw.modules} core curriculum modules</p>
                </div>

                <div className="pt-3 border-t border-border/80 text-xs">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-text-muted">Enrolled: {pw.enrolled}</span>
                    <span className="font-semibold text-emerald-600">{pw.completionRate} pass</span>
                  </div>
                  <button
                    onClick={() => alert(`Enrolling in ${pw.title} pathway...`)}
                    className="w-full mt-2 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs transition-colors"
                  >
                    View Curriculum
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Upcoming Sessions */}
        {activeTab === 'sessions' && (
          <div className="bg-white rounded-2xl border border-border p-6 shadow-xs space-y-4 text-xs">
            <h3 className="text-base font-bold text-navy-900">Upcoming Live Training Cohorts</h3>
            <div className="divide-y divide-border">
              <div className="py-3 flex justify-between items-center">
                <div>
                  <div className="font-bold text-navy-900">FGDS Spatial Data Stewardship & Quality Gateway</div>
                  <div className="text-[11px] text-text-secondary">Instructor: Khalid M. (DMT) • Live Hybrid (Al Maryah Hall & Online)</div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-navy-900">05 Oct 2027</span>
                  <div className="text-[10px] text-emerald-600 font-semibold">18 Seats Left</div>
                </div>
              </div>

              <div className="py-3 flex justify-between items-center">
                <div>
                  <div className="font-bold text-navy-900">Advanced GeoAI Change Detection & Model Auditing</div>
                  <div className="text-[11px] text-text-secondary">Instructor: Dr. Tariq H. (AD-SDI GeoAI Lead) • Hands-on Lab</div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-navy-900">12 Oct 2027</span>
                  <div className="text-[10px] text-emerald-600 font-semibold">8 Seats Left</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Accreditation Framework */}
        {activeTab === 'certifications' && (
          <div className="bg-white rounded-2xl border border-border p-6 shadow-xs space-y-3 text-xs">
            <h3 className="text-base font-bold text-navy-900">Government Geospatial Certification</h3>
            <p className="text-text-secondary leading-relaxed">
              Formal credentialing recognized by DGE and contributing Abu Dhabi government authorities. Certified Data Stewards and GIS Analysts are accredited to authorize clearinghouse submissions.
            </p>
          </div>
        )}
      </div>
    </WorkspaceLayout>
  );
};
