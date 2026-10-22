import React, { useState } from 'react';
import { WorkspaceLayout } from '../components/common/WorkspaceLayout';
import { useLanguage } from '../context/LanguageContext';
import {
  ChartLineUp,
  CheckCircle,
  WarningCircle,
  DownloadSimple,
  CalendarBlank,
  Buildings,
  ShieldCheck,
  TrendUp,
  ArrowsClockwise,
  ArrowRight,
} from '@phosphor-icons/react';

export const S05_QualityDashboard: React.FC = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [timePeriod, setTimePeriod] = useState<'90d' | '30d' | '7d'>('90d');
  const [selectedEntity, setSelectedEntity] = useState<string>('all');
  const [exported, setExported] = useState(false);

  const kpis = [
    { label: isAr ? 'جاهزية المنصة' : 'Platform Availability', value: '99.95%', target: isAr ? 'المستهدف 99.9%' : 'Target 99.9%', trend: '+0.02%', status: 'optimal' },
    { label: isAr ? 'حداثة البيانات' : 'Data Currency', value: '94%', target: isAr ? 'المستهدف 90%' : 'Target 90%', trend: '+3.1%', status: 'optimal' },
    { label: isAr ? 'اجتياز بوابة الجودة' : 'Data Quality Gateway', value: '96%', target: isAr ? 'المستهدف 95%' : 'Target 95%', trend: '+1.4%', status: 'optimal' },
    { label: isAr ? 'سرعة استجابة الدعم' : 'Support Responsiveness', value: '97%', target: isAr ? 'المستهدف 95%' : 'Target 95%', trend: '+2.0%', status: 'optimal' },
    { label: isAr ? 'الجهات النشطة المشاركة' : 'Active Entity Adoption', value: '41 / 64', target: isAr ? 'خط الأساس 32' : 'Baseline 32', trend: isAr ? '+9 جهات' : '+9 Entities', status: 'optimal' },
  ];

  const entityCompliance = [
    { entity: 'Department of Municipalities and Transport (DMT)', code: 'DMT', datasets: 842, compliance: 98.2, status: 'Compliant' },
    { entity: 'Environment Agency – Abu Dhabi (EAD)', code: 'EAD', datasets: 520, compliance: 96.8, status: 'Compliant' },
    { entity: 'Statistics Centre – Abu Dhabi (SCAD)', code: 'SCAD', datasets: 210, compliance: 95.4, status: 'Compliant' },
    { entity: 'Department of Health (DoH)', code: 'DoH', datasets: 185, compliance: 94.0, status: 'Compliant' },
    { entity: 'Abu Dhabi Department of Education and Knowledge (ADEK)', code: 'ADEK', datasets: 142, compliance: 93.5, status: 'Action Needed' },
    { entity: 'Abu Dhabi Public Health Centre (ADPHC)', code: 'ADPHC', datasets: 98, compliance: 92.1, status: 'Action Needed' },
  ];

  const filteredEntities = selectedEntity === 'all'
    ? entityCompliance
    : entityCompliance.filter((e) => e.code === selectedEntity);

  const handleExportReport = () => {
    setExported(true);
    const csvContent = "data:text/csv;charset=utf-8," +
      "Entity,Code,Datasets,Compliance_Score,Status\n" +
      entityCompliance.map(e => `"${e.entity}",${e.code},${e.datasets},${e.compliance}%,${e.status}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AD-SDI_Quality_SLA_Report_${timePeriod}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setExported(false), 3000);
  };

  return (
    <WorkspaceLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-text-secondary mb-1">
              <span>{isAr ? 'حوكمة' : 'GOVERN'}</span>
              <span>/</span>
              <span className="font-semibold text-navy-900">{isAr ? 'الجودة ومستوى الخدمة' : 'Quality & SLA'}</span>
            </div>
            <h1 className="text-2xl font-bold text-navy-900 tracking-tight">
              {isAr ? 'لوحة قياس جودة البيانات ومستوى الخدمة SLA' : 'Quality & SLA Governance Dashboard'}
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              {isAr
                ? 'مراقبة مستمرة للتحقق الآلي من بوابات جودة البيانات، وحداثة المعالم، والتزام الجهات الحكومية.'
                : 'Continuous monitoring of SDI automated gateway validations, spatial currency, and entity compliance.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Period Selector */}
            <div className="flex rounded-lg border border-border bg-white p-0.5 text-xs shadow-xs">
              <button
                type="button"
                onClick={() => setTimePeriod('90d')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  timePeriod === '90d' ? 'bg-navy-900 text-white' : 'text-text-secondary hover:text-navy-900'
                }`}
              >
                {isAr ? 'آخر 90 يوماً' : 'Last 90 days'}
              </button>
              <button
                type="button"
                onClick={() => setTimePeriod('30d')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  timePeriod === '30d' ? 'bg-navy-900 text-white' : 'text-text-secondary hover:text-navy-900'
                }`}
              >
                {isAr ? 'آخر 30 يوماً' : 'Last 30 days'}
              </button>
              <button
                type="button"
                onClick={() => setTimePeriod('7d')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  timePeriod === '7d' ? 'bg-navy-900 text-white' : 'text-text-secondary hover:text-navy-900'
                }`}
              >
                {isAr ? 'آخر 7 أيام' : 'Last 7 days'}
              </button>
            </div>

            {/* Export Report Button */}
            <button
              onClick={handleExportReport}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <DownloadSimple className="w-4 h-4" />
              <span>{exported ? (isAr ? 'تم تحميل التقرير!' : 'Report Downloaded!') : (isAr ? 'تصدير تقرير الجودة CSV' : 'Export SLA CSV')}</span>
            </button>
          </div>
        </div>

        {/* Top 5 KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-2xl border border-border p-4 shadow-xs">
              <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                {kpi.label}
              </div>
              <div className="text-2xl font-extrabold text-navy-900 font-mono mt-1">
                {kpi.value}
              </div>
              <div className="flex items-center justify-between text-[11px] mt-2 pt-2 border-t border-border/60">
                <span className="text-text-muted">{kpi.target}</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                  <TrendUp className="w-3 h-3" /> {kpi.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 2-Column Analytics: Quality Gateway Breakdown & 90-Day Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Quality Gateway 24h Sample (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-border p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="text-sm font-bold text-navy-900">
                  {isAr ? 'بوابة الجودة — آخر 24 ساعة' : 'Quality Gateway — Last 24 Hours'}
                </h3>
                <p className="text-[11px] text-text-secondary">
                  {isAr ? 'فحوصات البوابة الآلية للمخططات والهندسة ونظام الإحداثيات' : 'Automated schema, geometry & CRS gateway checks'}
                </p>
              </div>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                {isAr ? '186 إجمالي' : '186 Total'}
              </span>
            </div>

            {/* Pass vs Returned Breakdown Bars */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> {isAr ? 'الفحوصات الناجحة' : 'Passed Validations'}
                  </span>
                  <span className="font-mono font-bold text-navy-900">171 (91.9%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-canvas overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '91.9%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-amber-700 flex items-center gap-1">
                    <WarningCircle className="w-4 h-4" /> {isAr ? 'المعادة للمعالجة والتصحيح' : 'Returned for Remediation'}
                  </span>
                  <span className="font-mono font-bold text-amber-900">15 (8.1%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-canvas overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '8.1%' }}></div>
                </div>
              </div>
            </div>

            {/* Document Specified Return Reasons */}
            <div className="pt-2">
              <h4 className="text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-2">
                {isAr ? 'أسباب الإعادة الموثقة' : 'Documented Return Reasons'}
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-canvas border border-border flex items-center justify-between">
                  <span className="text-text-primary">{isAr ? 'عدم تطابق المرجع المكاني (غير EPSG:32640)' : 'Spatial reference mismatch (non-EPSG:32640)'}</span>
                  <span className="font-mono font-bold text-navy-900 bg-white px-2 py-0.5 rounded border border-border">{isAr ? '6 حالات' : '6 cases'}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-canvas border border-border flex items-center justify-between">
                  <span className="text-text-primary">{isAr ? 'ملف البيانات الوصفية غير مكتمل (نقص في معيار ISO 19115)' : 'Metadata profile incomplete (ISO 19115 gaps)'}</span>
                  <span className="font-mono font-bold text-navy-900 bg-white px-2 py-0.5 rounded border border-border">{isAr ? '5 حالات' : '5 cases'}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-canvas border border-border flex items-center justify-between">
                  <span className="text-text-primary">{isAr ? 'أخطاء طوبولوجية (تقاطعات ذاتية وتداخلات)' : 'Topology errors (self-intersections & slivers)'}</span>
                  <span className="font-mono font-bold text-navy-900 bg-white px-2 py-0.5 rounded border border-border">{isAr ? '4 حالات' : '4 cases'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 90-Day Trend Chart & SLA Monitor (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-border p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-navy-900">
                    {isAr
                      ? `اتجاه مستوى الخدمة والجاهزية (${timePeriod === '90d' ? 'آخر 90 يوماً' : timePeriod === '30d' ? 'آخر 30 يوماً' : 'آخر 7 أيام'})`
                      : `SLA & Availability Trend (${timePeriod === '90d' ? 'Last 90 Days' : timePeriod === '30d' ? 'Last 30 Days' : 'Last 7 Days'})`}
                  </h3>
                  <p className="text-[11px] text-text-secondary">
                    {isAr ? 'الجاهزية وزمن استجابة p95 لخدمات معالم وبلاطات OGC' : 'Uptime and p95 latency for OGC Feature and Tile Services'}
                  </p>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {isAr ? 'تم تحقيق المستهدف 99.95%' : '99.95% Target Met'}
                </span>
              </div>

              {/* Visual SVG Timeline Bar Representation */}
              <div className="space-y-3">
                <div className="h-32 w-full flex items-end gap-1.5 pt-4">
                  {[
                    { day: 'W1', val: 99.96 }, { day: 'W2', val: 99.94 }, { day: 'W3', val: 99.95 }, { day: 'W4', val: 99.98 },
                    { day: 'W5', val: 99.92 }, { day: 'W6', val: 99.96 }, { day: 'W7', val: 99.95 }, { day: 'W8', val: 99.97 },
                    { day: 'W9', val: 99.93 }, { day: 'W10', val: 99.99 }, { day: 'W11', val: 99.95 }, { day: 'W12', val: 99.95 },
                  ].map((bar, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer">
                      <div className="w-full bg-blue-100 group-hover:bg-blue-600 rounded-t transition-colors relative" style={{ height: `${(bar.val - 99.8) * 450}px` }}>
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-navy-900 text-white text-[10px] py-0.5 px-1.5 rounded pointer-events-none whitespace-nowrap z-20">
                          {bar.val}%
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-text-muted">{bar.day}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] text-text-muted border-t border-border/60 pt-2">
                  <span>{isAr ? 'حد مستوى الخدمة 99.90% (الخط الأحمر)' : '99.90% SLA Threshold (Red line)'}</span>
                  <span className="text-navy-900 font-semibold">{isAr ? 'متوسط الاستجابة: 64 مللي ثانية' : 'Average Response: 64 ms'}</span>
                </div>
              </div>
            </div>

            {/* Themes x Quality Checks Matrix Sample */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-2">
                {isAr ? 'امتثال المجالات × فحوصات الجودة' : 'Themes × Quality Checks Compliance'}
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                <div className="p-2 rounded bg-canvas border border-border">
                  <div className="text-text-secondary font-medium">{isAr ? 'الأراضي والعقارات' : 'Cadastre'}</div>
                  <div className="font-bold text-emerald-600 mt-0.5">99.1%</div>
                </div>
                <div className="p-2 rounded bg-canvas border border-border">
                  <div className="text-text-secondary font-medium">{isAr ? 'البيئة' : 'Environment'}</div>
                  <div className="font-bold text-emerald-600 mt-0.5">97.4%</div>
                </div>
                <div className="p-2 rounded bg-canvas border border-border">
                  <div className="text-text-secondary font-medium">{isAr ? 'النقل' : 'Transport'}</div>
                  <div className="font-bold text-emerald-600 mt-0.5">98.2%</div>
                </div>
                <div className="p-2 rounded bg-canvas border border-border">
                  <div className="text-text-secondary font-medium">{isAr ? 'المرافق' : 'Utilities'}</div>
                  <div className="font-bold text-amber-600 mt-0.5">92.8%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Entity Compliance Table */}
        <div className="bg-white rounded-2xl border border-border shadow-xs overflow-hidden">
          <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-navy-900">
                {isAr ? 'سجل امتثال الجهات المساهمة' : 'Contributing Entity Compliance Roster'}
              </h3>
              <p className="text-[11px] text-text-secondary">
                {isAr ? 'متابعة 64 جهة وفق معايير اتفاقيات مستوى الخدمة في AD-SDI' : 'Tracking 64 entities against AD-SDI SLA standards'}
              </p>
            </div>

            {/* Filter by Entity */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-text-muted">{isAr ? 'تصفية حسب الجهة:' : 'Filter entity:'}</span>
              <select
                value={selectedEntity}
                onChange={(e) => setSelectedEntity(e.target.value)}
                className="p-1.5 bg-canvas border border-border rounded text-text-primary text-xs"
              >
                <option value="all">{isAr ? 'جميع الجهات (6)' : 'All Entities (6)'}</option>
                <option value="DMT">{isAr ? 'دائرة البلديات والنقل (DMT)' : 'DMT (Municipalities & Transport)'}</option>
                <option value="EAD">{isAr ? 'هيئة البيئة (EAD)' : 'EAD (Environment)'}</option>
                <option value="SCAD">{isAr ? 'مركز الإحصاء (SCAD)' : 'SCAD (Statistics)'}</option>
                <option value="DoH">{isAr ? 'دائرة الصحة (DoH)' : 'DoH (Health)'}</option>
                <option value="ADEK">{isAr ? 'دائرة التعليم والمعرفة (ADEK)' : 'ADEK (Education)'}</option>
                <option value="ADPHC">{isAr ? 'مركز أبوظبي للصحة العامة (ADPHC)' : 'ADPHC (Public Health)'}</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-xs">
              <thead className="bg-canvas border-b border-border text-[11px] uppercase tracking-wider text-text-secondary">
                <tr>
                  <th className="p-3">{isAr ? 'الجهة المساهمة' : 'Contributing Entity'}</th>
                  <th className="p-3">{isAr ? 'الرمز' : 'Acronym'}</th>
                  <th className="p-3">{isAr ? 'مجموعات البيانات المنشورة' : 'Published Datasets'}</th>
                  <th className="p-3">{isAr ? 'درجة الامتثال' : 'Compliance Score'}</th>
                  <th className="p-3">{isAr ? 'حالة مستوى الخدمة' : 'SLA Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredEntities.map((ent) => (
                  <tr key={ent.code} className="hover:bg-canvas transition-colors">
                    <td className="p-3 font-semibold text-navy-900">
                      {isAr ? (
                        ent.code === 'DMT' ? 'دائرة البلديات والنقل (DMT)' :
                        ent.code === 'EAD' ? 'هيئة البيئة – أبوظبي (EAD)' :
                        ent.code === 'SCAD' ? 'مركز الإحصاء – أبوظبي (SCAD)' :
                        ent.code === 'DoH' ? 'دائرة الصحة (DoH)' :
                        ent.code === 'ADEK' ? 'دائرة التعليم والمعرفة (ADEK)' :
                        'مركز أبوظبي للصحة العامة (ADPHC)'
                      ) : ent.entity}
                    </td>
                    <td className="p-3 font-mono font-bold text-blue-700">{ent.code}</td>
                    <td className="p-3 font-mono">{ent.datasets}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold">{ent.compliance}%</span>
                        <div className="w-20 h-2 bg-canvas rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${ent.compliance >= 95 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                            style={{ width: `${ent.compliance}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        ent.status === 'Compliant'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {isAr ? (ent.status === 'Compliant' ? 'ملتزم' : 'يتطلب إجراء') : ent.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
};
