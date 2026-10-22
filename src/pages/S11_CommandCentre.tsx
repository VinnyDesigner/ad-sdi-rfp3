import React, { useState } from 'react';
import { WorkspaceLayout } from '../components/common/WorkspaceLayout';
import { useLanguage } from '../context/LanguageContext';
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
  const { language } = useLanguage();
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
    <WorkspaceLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6 text-text-primary">
        {/* Top Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-text-secondary mb-1">
              <span>{language === 'ar' ? 'البرنامج' : 'PROGRAMME'}</span>
              <span>/</span>
              <span className="font-semibold text-navy-900">{language === 'ar' ? 'مركز قيادة البرنامج التنفيذي' : 'Executive Command Centre'}</span>
            </div>
            <h1 className="text-2xl font-bold text-navy-900 tracking-tight flex items-center gap-3">
              <span>{language === 'ar' ? 'برنامج تنفيذ البنية التحتية للبيانات المكانية 2026–2029' : 'AD-SDI Implementation Programme 2026–2029'}</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {language === 'ar' ? 'وفق الخطة • الجدول الزمني المعتمد' : 'On Track • Baseline Schedule'}
              </span>
            </h1>
            <p className="text-xs text-text-secondary mt-1">
              {language === 'ar'
                ? 'الحوكمة: اللجنة التوجيهية • مكتب إدارة المشاريع • فريق العمل المعماري • هيئة التصميم | محدث 14 سبتمبر 2027، 09:30 توقيت الإمارات'
                : 'Governance: Steering Committee • PMO • Architecture Working Group • Design Authority | Updated 14 Sep 2027, 09:30 GST'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportPack}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <DownloadSimple className="w-4 h-4" />
              <span>{downloadingReport ? (language === 'ar' ? 'جاري إنشاء الحزمة...' : 'Generating Pack...') : (language === 'ar' ? 'حزمة مراجعة البوابة M2' : 'Gate M2 Review Pack')}</span>
            </button>
          </div>
        </div>

        {/* 5 Enterprise Programme KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div className="bg-white rounded-2xl border border-border p-4 shadow-xs">
            <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
              {language === 'ar' ? 'إنجاز المعالم الرئيسية' : 'Milestone Delivery'}
            </div>
            <div className="text-2xl font-extrabold text-navy-900 font-mono mt-1">
              92%
            </div>
            <div className="text-[11px] text-emerald-600 mt-2 flex items-center gap-1 font-semibold">
              <CheckCircle className="w-3.5 h-3.5" /> {language === 'ar' ? 'متقدم عن الخطة' : 'Ahead of Baseline'}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-4 shadow-xs">
            <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
              {language === 'ar' ? 'البوابات المعتمدة' : 'Gates Accepted'}
            </div>
            <div className="text-2xl font-extrabold text-navy-900 font-mono mt-1">
              1 / 4
            </div>
            <div className="text-[11px] text-text-secondary mt-2">
              {language === 'ar' ? 'إغلاق البوابة M1 (يوليو 2027)' : 'Gate M1 Closed (Jul 2027)'}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-4 shadow-xs">
            <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
              {language === 'ar' ? 'المخرجات وفق المسار' : 'Deliverables on Track'}
            </div>
            <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">
              26 / 28
            </div>
            <div className="text-[11px] text-text-secondary mt-2">
              {language === 'ar' ? 'تنبيهان بحاجة لمتابعة' : '2 Attention Flags'}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-4 shadow-xs">
            <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
              {language === 'ar' ? 'المخاطر المفتوحة' : 'Open Risks'}
            </div>
            <div className="text-2xl font-extrabold text-amber-600 font-mono mt-1">
              10
            </div>
            <div className="text-[11px] text-red-600 mt-2 font-bold">
              {language === 'ar' ? '3 عالية الخطورة' : '3 High Severity'}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-4 shadow-xs">
            <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
              {language === 'ar' ? 'مراجعة البوابة القادمة' : 'Next Gate Review'}
            </div>
            <div className="text-xl font-extrabold text-blue-700 font-mono mt-1">
              {language === 'ar' ? 'M2 ديسمبر 2027' : 'M2 Dec 2027'}
            </div>
            <div className="text-[11px] text-text-secondary mt-2">
              {language === 'ar' ? 'بوابة اللجنة التوجيهية' : 'Steering Committee Gate'}
            </div>
          </div>
        </div>

        {/* Interactive Programme Roadmap (Aug 2026 → Jun 2029 with Today Marker) */}
        <div className="bg-white rounded-2xl border border-border p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
            <div>
              <h3 className="text-sm font-bold text-navy-900">
                {language === 'ar' ? 'المخطط الزمني الشامل للبرنامج (أغسطس 2026 – يونيو 2029)' : 'Programme Master Roadmap (Aug 2026 – Jun 2029)'}
              </h3>
              <p className="text-[11px] text-text-secondary">
                {language === 'ar'
                  ? 'المرحلة 1: التأسيس • المرحلة 2: المنصة الأساسية • المرحلة 3: التوسع • المرحلة 4: التكامل الشامل للإمارة'
                  : 'Phase 1: Foundation • Phase 2: Core Platform • Phase 3: Expansion • Phase 4: Full Emirate Integration'}
              </p>
            </div>

            {/* Filter by Module */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-text-secondary">{language === 'ar' ? 'تصفية المسار:' : 'Filter Lane:'}</span>
              <select
                value={selectedModuleFilter}
                onChange={(e) => setSelectedModuleFilter(e.target.value)}
                className="p-1.5 bg-canvas border border-border rounded text-navy-900 text-xs focus:outline-none"
              >
                <option value="all">{language === 'ar' ? 'جميع الوحدات (A–F)' : 'All Modules (A–F)'}</option>
                <option value="mod-a">{language === 'ar' ? 'الوحدة A: المستودع والفهرس' : 'Module A: Clearinghouse'}</option>
                <option value="mod-b">{language === 'ar' ? 'الوحدة B: الذكاء الاصطناعي الجغرافي' : 'Module B: GeoAI'}</option>
                <option value="mod-c">{language === 'ar' ? 'الوحدة C: سوق البيانات' : 'Module C: Marketplace'}</option>
                <option value="mod-d">{language === 'ar' ? 'الوحدة D: بناء القدرات' : 'Module D: Capacity Building'}</option>
                <option value="mod-e">{language === 'ar' ? 'الوحدة E: التوأم الرقمي' : 'Module E: Digital Twin'}</option>
                <option value="mod-f">{language === 'ar' ? 'الوحدة F: البيانات المفتوحة' : 'Module F: Open Data'}</option>
              </select>
            </div>
          </div>

          {/* Timeline Visual Canvas (strictly LTR to preserve chronological progress and today marker alignment) */}
          <div className="space-y-4 relative pt-4 overflow-x-auto" dir="ltr">
            {/* Timeline Header Quarters & Today Marker */}
            <div className="min-w-[700px] flex justify-between text-[11px] font-mono text-text-muted border-b border-border pb-2 relative">
              <span>Q3 2026</span>
              <span>Q1 2027</span>
              <span className="text-gold-600 font-bold">Today (Sep 2027)</span>
              <span>Q1 2028</span>
              <span>Q3 2028</span>
              <span>Q1 2029</span>
              <span>Q2 2029</span>

              {/* Vertical Today Line */}
              <div
                className="absolute top-0 bottom-[-280px] w-0.5 bg-gold-500 z-20 pointer-events-none"
                style={{ left: '38%' }}
              >
                <div className="absolute -top-4 -translate-x-1/2 bg-gold-500 text-navy-900 font-mono font-bold text-[9px] px-1 rounded shadow-xs">
                  TODAY
                </div>
              </div>
            </div>

            {/* Modules Tracks */}
            <div className="min-w-[700px] space-y-3 pt-2">
              {filteredModules.map((mod) => (
                <div key={mod.id} className="p-3 rounded-xl bg-canvas border border-border space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: mod.color }}></span>
                      <span className="font-bold text-navy-900">{mod.code}: {mod.name}</span>
                    </div>
                    <span className="font-mono text-text-secondary">{mod.progress}% Delivered</span>
                  </div>

                  {/* Deliverables pill ribbon */}
                  <div className="grid grid-cols-4 gap-2 text-[10px]">
                    {mod.deliverables.map((del) => (
                      <div
                        key={del.name}
                        className={`p-2 rounded-lg border flex items-center justify-between ${
                          del.done
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-medium'
                            : del.gate
                            ? 'bg-gold-50 border-gold-300 text-gold-900 font-bold'
                            : 'bg-white border-border text-text-secondary'
                        }`}
                      >
                        <span className="truncate">{del.name}</span>
                        {del.done ? (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1" />
                        ) : del.gate ? (
                          <span className="px-1.5 py-0.2 rounded bg-gold-500 text-navy-900 font-mono font-bold text-[9px]">
                            {del.gate}
                          </span>
                        ) : (
                          <span className="font-mono text-[9px] text-text-muted">{del.date}</span>
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
          <div className="lg:col-span-6 bg-white rounded-2xl border border-border p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="text-sm font-bold text-navy-900">
                  {language === 'ar' ? 'سجل مخاطر البرنامج النشطة' : 'Active Programme Risk Register'}
                </h3>
                <p className="text-[11px] text-text-secondary">
                  {language === 'ar' ? 'متابعة خطط المعالجة والمسؤولين عن المخاطر' : 'Mitigation tracking and risk owners'}
                </p>
              </div>
              <span className="text-[11px] font-mono text-red-700 font-bold bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                {language === 'ar' ? '10 مخاطر مفتوحة' : '10 Open Risks'}
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
                        ? 'bg-blue-50/70 border-blue-500 ring-1 ring-blue-500/30'
                        : 'bg-canvas border-border hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-gold-600">{r.code}</span>
                        <span className="font-semibold text-navy-900">{r.title}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.severity === 'High' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {r.severity === 'High' ? (language === 'ar' ? 'عالية' : 'High') : (language === 'ar' ? 'متوسطة' : 'Medium')}
                      </span>
                    </div>

                    <div className="text-[11px] text-text-secondary mt-2 leading-relaxed">
                      <strong className="text-navy-900">{language === 'ar' ? 'خطة المعالجة:' : 'Mitigation:'}</strong> {r.mitigation}
                    </div>

                    <div className="text-[10px] text-text-muted mt-1 flex justify-between">
                      <span>{language === 'ar' ? 'المسؤول:' : 'Owner:'} {r.owner}</span>
                      <span className="font-mono">{language === 'ar' ? 'المؤشر:' : 'Trend:'} {r.trend}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deliverables Acceptance & Design Conformance (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Deliverable Acceptance Breakdown */}
            <div className="bg-white rounded-2xl border border-border p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-navy-900 border-b border-border pb-3">
                {language === 'ar' ? 'حالة اعتماد المخرجات التعاقدية' : 'Deliverable Acceptance Status'}
              </h3>

              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="text-[10px] text-emerald-800 font-bold uppercase">{language === 'ar' ? 'معتمد' : 'Accepted'}</div>
                  <div className="text-xl font-extrabold text-emerald-700 font-mono mt-0.5">38</div>
                </div>
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                  <div className="text-[10px] text-blue-800 font-bold uppercase">{language === 'ar' ? 'قيد المراجعة' : 'In Review'}</div>
                  <div className="text-xl font-extrabold text-blue-700 font-mono mt-0.5">9</div>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                  <div className="text-[10px] text-amber-800 font-bold uppercase">{language === 'ar' ? 'مشروط' : 'Conditional'}</div>
                  <div className="text-xl font-extrabold text-amber-700 font-mono mt-0.5">4</div>
                </div>
                <div className="p-3 rounded-xl bg-red-50 border border-red-200">
                  <div className="text-[10px] text-red-800 font-bold uppercase">{language === 'ar' ? 'مرفوض' : 'Rejected'}</div>
                  <div className="text-xl font-extrabold text-red-700 font-mono mt-0.5">1</div>
                </div>
              </div>
            </div>

            {/* Design Conformance Roster */}
            <div className="bg-white rounded-2xl border border-border p-6 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-navy-900 border-b border-border pb-3">
                {language === 'ar' ? 'بوابة مطابقة البنية المعمارية والتصميم' : 'Architecture & Design Conformance Gate'}
              </h3>

              <dl className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-border">
                  <dt className="text-text-secondary">{language === 'ar' ? 'إجمالي المتطلبات المعمارية' : 'Total Architectural Requirements'}</dt>
                  <dd className="font-mono font-bold text-navy-900">148 {language === 'ar' ? 'متطلباً' : 'Requirements'}</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <dt className="text-text-secondary">{language === 'ar' ? 'المتطلبات المحددة والمربوطة' : 'Requirements Traced & Mapped'}</dt>
                  <dd className="font-mono font-bold text-emerald-600">148 {language === 'ar' ? '(100% مكتمل)' : 'Traced (100%)'}</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <dt className="text-text-secondary">{language === 'ar' ? 'المعتمدة رسمياً من هيئة التصميم' : 'Formally Verified by Design Authority'}</dt>
                  <dd className="font-mono font-bold text-blue-600">61 {language === 'ar' ? 'معتمد' : 'Verified'}</dd>
                </div>
                <div className="flex justify-between py-1">
                  <dt className="text-text-secondary">{language === 'ar' ? 'انحرافات مقترحة قيد مراجعة المكتب' : 'Proposed Deviations Under PMO Review'}</dt>
                  <dd className="font-mono font-bold text-amber-600">3 {language === 'ar' ? 'انحرافات' : 'Deviations'}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
};
