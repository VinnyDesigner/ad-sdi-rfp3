import React, { useState } from 'react';
import { WorkspaceLayout } from '../components/common/WorkspaceLayout';
import { useLanguage } from '../context/LanguageContext';
import { PUBLISHING_SUBMISSIONS } from '../data/mockData';
import { PublishingSubmission } from '../types';
import {
  CheckCircle,
  XCircle,
  ArrowCounterClockwise,
  Clock,
  ShieldCheck,
  FileText,
  UserCheck,
  Check,
  X,
  ChatCircleText,
  Info,
} from '@phosphor-icons/react';

export const S04_Publishing: React.FC = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'queue' | 'dmt' | 'published' | 'withdrawn'>('queue');
  const [submissions, setSubmissions] = useState<PublishingSubmission[]>(PUBLISHING_SUBMISSIONS);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string>('sub-1');
  const [actionModal, setActionModal] = useState<{
    open: boolean;
    type: 'approve' | 'return' | 'reject';
    title: string;
  }>({ open: false, type: 'approve', title: '' });
  const [modalComment, setModalComment] = useState('');
  const [commentError, setCommentError] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const selectedSubmission = submissions.find((s) => s.id === selectedSubmissionId) || submissions[0];

  const handleOpenAction = (type: 'approve' | 'return' | 'reject') => {
    setActionModal({
      open: true,
      type,
      title: type === 'approve'
        ? 'Approve Submission for Publication'
        : type === 'return'
        ? 'Return Submission with Modification Request'
        : 'Reject Submission',
    });
    setModalComment('');
    setCommentError('');
  };

  const handleConfirmAction = () => {
    if ((actionModal.type === 'return' || actionModal.type === 'reject') && !modalComment.trim()) {
      setCommentError('A mandatory comment or justification is required.');
      return;
    }

    if (actionModal.type === 'approve') {
      setSubmissions((prev) =>
        prev.map((s) =>
          s.id === selectedSubmission.id ? { ...s, stage: 'Published' as any } : s
        )
      );
      setSuccessToast(`"${selectedSubmission.item}" has been officially approved and published to the AD-SDI Clearinghouse.`);
    } else if (actionModal.type === 'return') {
      setSubmissions((prev) =>
        prev.map((s) =>
          s.id === selectedSubmission.id ? { ...s, stage: 'Quality gateway' as any } : s
        )
      );
      setSuccessToast(`"${selectedSubmission.item}" returned to provider with feedback comments.`);
    } else {
      setSubmissions((prev) =>
        prev.filter((s) => s.id !== selectedSubmission.id)
      );
      setSuccessToast(`"${selectedSubmission.item}" has been rejected.`);
    }

    setActionModal({ open: false, type: 'approve', title: '' });
    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <WorkspaceLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Page Title & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-text-secondary mb-1">
              <span>{isAr ? 'حوكمة' : 'GOVERN'}</span>
              <span>/</span>
              <span className="font-semibold text-navy-900">{isAr ? 'النشر والاعتمادات' : 'Publishing & Approvals'}</span>
            </div>
            <h1 className="text-2xl font-bold text-navy-900 tracking-tight">
              {isAr ? 'خط اعتماد ونشر البيانات المكانية' : 'Publishing Pipeline & Approvals'}
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              {isAr
                ? 'مراجعة طلبات نشر البيانات الجيومكانية والتحقق من نتائج بوابات الجودة الآلية واعتمادها للمستودع الرقمي.'
                : 'Review spatial submissions, verify automated quality gateway outputs, and approve release to the clearinghouse.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1.5 rounded-lg bg-white border border-border text-navy-900 font-semibold shadow-xs">
              {isAr ? 'المستخدم: خالد م. (مشرف بيانات DMT)' : 'Persona: Khalid M. (DMT Data Steward)'}
            </span>
          </div>
        </div>

        {/* Success Feedback Toast */}
        {successToast && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between shadow-xs animate-subtle-pulse">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold">{successToast}</span>
            </div>
            <button onClick={() => setSuccessToast(null)} className="text-emerald-700 hover:text-emerald-950 font-bold">
              {isAr ? 'إغلاق' : 'Dismiss'}
            </button>
          </div>
        )}

        {/* Pipeline Stage Counts Bar (Preserve Source Counts) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: isAr ? 'تسجيل المزودين' : 'Provider Onboarding', count: '12', active: false },
            { label: isAr ? 'تم الإرسال' : 'Submitted', count: '24', active: true },
            { label: isAr ? 'بوابة الجودة' : 'Quality Gateway', count: '6', active: true },
            { label: isAr ? 'التصنيف والجمهور' : 'Classification & Audience', count: '4', active: true },
            { label: isAr ? 'اعتماد المشرف' : 'Custodian Approval', count: '5', active: true, highlight: true },
          ].map((stage) => (
            <div
              key={stage.label}
              className={`p-3.5 rounded-xl border transition-all ${
                stage.highlight
                  ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                  : 'bg-white border-border text-text-primary'
              }`}
            >
              <div className={`text-[10px] font-bold uppercase tracking-wider ${stage.highlight ? 'text-blue-100' : 'text-text-muted'}`}>
                {stage.label}
              </div>
              <div className={`text-xl font-extrabold font-mono mt-1 ${stage.highlight ? 'text-white' : 'text-navy-900'}`}>
                {stage.count}
              </div>
            </div>
          ))}
        </div>

        {/* 30-Day Published Counter Strip */}
        <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white border border-border text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-text-secondary">{isAr ? 'مجموعات البيانات المعتمدة المنشورة خلال آخر 30 يوماً:' : 'Authoritative datasets published in the last 30 days:'}</span>
            <span className="font-mono font-bold text-navy-900">132</span>
          </div>
          <span className="text-[11px] text-text-muted">{isAr ? 'الامتثال لمستوى الخدمة المستهدف: 98.4%' : 'Target SLA compliance: 98.4%'}</span>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-border text-xs">
          {[
            { id: 'queue', label: isAr ? 'قائمتي بانتظار الاعتماد (5)' : 'My Queue (5)' },
            { id: 'dmt', label: isAr ? 'مقدمة من DMT (14)' : 'Submitted by DMT (14)' },
            { id: 'published', label: isAr ? 'منشورة (132)' : 'Published (132)' },
            { id: 'withdrawn', label: isAr ? 'مسحوبة (2)' : 'Withdrawn (2)' },
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

        {/* Main Content: Split Queue Table & Detailed Review Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Queue Table (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-border shadow-xs overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <span className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                {isAr ? 'قائمة الطلبات بانتظار الاعتماد' : 'Pending Submissions Queue'}
              </span>
              <span className="text-[11px] text-text-muted">{isAr ? 'اختر صفاً لفتح لوحة المراجعة' : 'Select row to open review panel'}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xs">
                <thead className="bg-canvas border-b border-border text-[11px] uppercase tracking-wider text-text-secondary">
                  <tr>
                    <th className="p-3">{isAr ? 'العنصر والإصدار' : 'Item & Version'}</th>
                    <th className="p-3">{isAr ? 'الجهة' : 'Entity'}</th>
                    <th className="p-3">{isAr ? 'المرحلة' : 'Stage'}</th>
                    <th className="p-3">{isAr ? 'الجودة' : 'Quality'}</th>
                    <th className="p-3">{isAr ? 'الانتظار' : 'Waiting'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {submissions.map((sub) => {
                    const isSelected = selectedSubmission.id === sub.id;
                    return (
                      <tr
                        key={sub.id}
                        onClick={() => setSelectedSubmissionId(sub.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-blue-50/70 font-medium' : 'hover:bg-canvas'
                        }`}
                      >
                        <td className="p-3">
                          <div className="font-bold text-navy-900">{sub.item}</div>
                          <div className="text-[10px] text-text-secondary">{sub.type}</div>
                        </td>
                        <td className="p-3 text-[11px] text-text-secondary">
                          {sub.entity.replace('Department of Municipalities and Transport', 'DMT').replace('Environment Agency – Abu Dhabi', 'EAD')}
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-800">
                            {isAr ? (
                              sub.stage === 'Custodian approval' ? 'اعتماد المشرف' :
                              sub.stage === 'Quality gateway' ? 'بوابة الجودة' :
                              sub.stage === 'Classification & audience' ? 'التصنيف والجمهور' :
                              sub.stage === 'Submitted' ? 'تم الإرسال' : 'منشور'
                            ) : sub.stage}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                            sub.qualityResult.includes('100%')
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}>
                            {isAr ? sub.qualityResult.replace('Passed', 'اجتاز').replace('Warnings', 'تنبيهات').replace('Pending Checks', 'بانتظار الفحص') : sub.qualityResult}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-[11px] text-text-muted">
                          {sub.waitingDays}{isAr ? ' يوم' : 'd'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Review Panel (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-border p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    {isAr ? 'لوحة المراجعة والاعتماد' : 'Review & Approval Console'}
                  </span>
                  <h3 className="text-base font-bold text-navy-900 mt-0.5">
                    {selectedSubmission.item}
                  </h3>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-canvas border border-border text-text-secondary">
                  v{selectedSubmission.version}
                </span>
              </div>

              {/* Submitter & Summary */}
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-canvas border border-border">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-text-muted">{isAr ? 'مُقدَم من: ' : 'Submitted by: '}<strong className="text-navy-900">{isAr ? 'فاطمة أ.' : selectedSubmission.submittedBy}</strong></span>
                    <span className="text-text-muted">{selectedSubmission.submittedDate}</span>
                  </div>
                  <p className="text-text-secondary leading-relaxed text-[11px]">
                    {selectedSubmission.summary}
                  </p>
                </div>

                {/* Quality Gateway Checks Accordion/List */}
                <div>
                  <h4 className="text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-2">
                    {isAr ? 'نتائج بوابة الجودة المؤتمتة' : 'Automated Quality Gateway Results'}
                  </h4>
                  <div className="space-y-1.5">
                    {selectedSubmission.validationChecks.map((chk) => (
                      <div key={chk.name} className="p-2 rounded-lg bg-canvas-subtle border border-border/80 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5">
                          {chk.status === 'pass' ? (
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                          )}
                          <span className="font-semibold text-navy-900">{chk.name}</span>
                        </div>
                        <span className="text-[10px] text-text-secondary">{chk.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Classification and Target Audience */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg border border-border bg-canvas">
                    <div className="text-[10px] text-text-muted uppercase font-bold">{isAr ? 'الجمهور المستهدف' : 'Target Audience'}</div>
                    <div className="font-semibold text-navy-900 mt-0.5">{isAr ? (selectedSubmission.targetAudience === 'Public' ? 'عام' : selectedSubmission.targetAudience === 'Government Only' ? 'جهات حكومية فقط' : selectedSubmission.targetAudience === 'Internal' ? 'داخلي' : 'شركاء معتمدون') : selectedSubmission.targetAudience}</div>
                  </div>
                  <div className="p-2.5 rounded-lg border border-border bg-canvas">
                    <div className="text-[10px] text-text-muted uppercase font-bold">{isAr ? 'الأهلية القانونية' : 'Legal Eligibility'}</div>
                    <div className="font-semibold text-emerald-700 mt-0.5">{isAr ? 'معتمد بموجب DSA' : 'DSA Verified'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons: Approve, Return, Reject */}
            <div className="pt-4 border-t border-border flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleOpenAction('approve')}
                className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>{isAr ? 'اعتماد للنشر' : 'Approve for Publication'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenAction('return')}
                className="py-2.5 px-3 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold text-xs flex items-center gap-1 transition-colors"
              >
                <ArrowCounterClockwise className="w-4 h-4" />
                <span>{isAr ? 'إرجاع' : 'Return'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenAction('reject')}
                className="py-2.5 px-3 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs flex items-center gap-1 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>{isAr ? 'رفض' : 'Reject'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Confirmation Modal */}
        {actionModal.open && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-border space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="text-base font-bold text-navy-900">
                  {isAr ? (
                    actionModal.type === 'approve' ? 'اعتماد نشر مجموعة البيانات' :
                    actionModal.type === 'return' ? 'إرجاع الطلب مع ملاحظات التعديل' : 'رفض طلب النشر'
                  ) : actionModal.title}
                </h3>
                <button
                  onClick={() => setActionModal({ open: false, type: 'approve', title: '' })}
                  className="p-1 rounded-lg hover:bg-canvas text-text-secondary"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-text-secondary leading-relaxed">
                {isAr ? 'أنت تقوم بإجراء على مجموعة البيانات: ' : 'You are performing an action on dataset: '}<strong className="text-navy-900">{selectedSubmission.item}</strong>.
              </div>

              {(actionModal.type === 'return' || actionModal.type === 'reject') && (
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    {isAr ? 'ملاحظات وتعديلات المشرف' : 'Steward Feedback & Modification Notes'} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={modalComment}
                    onChange={(e) => setModalComment(e.target.value)}
                    placeholder={isAr ? 'قدم ملاحظات محددة حول محاذاة النقاط أو مطابقة المخطط أو التبرير...' : 'Provide specific notes regarding vertex snapping, schema alignment, or justification...'}
                    className="w-full p-2.5 text-xs border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  {commentError && (
                    <div className="text-[11px] text-red-600 mt-1">{isAr ? 'يجب إدخال تعليق أو تبرير إلزامي.' : commentError}</div>
                  )}
                </div>
              )}

              {actionModal.type === 'approve' && (
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 leading-relaxed">
                  {isAr
                    ? 'عند التأكيد، سيتم تسجيل مجموعة البيانات في مستودع AD-SDI وتفعيل نقاط WMS/WFS/OGC للجهات المصرح لها.'
                    : 'Upon confirmation, this dataset will be registered into the AD-SDI Clearinghouse with WMS/WFS/OGC endpoints activated for authorized entities.'}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setActionModal({ open: false, type: 'approve', title: '' })}
                  className="px-4 py-2 rounded-lg border border-border text-xs font-medium text-text-secondary hover:bg-canvas"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAction}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold text-white shadow-xs ${
                    actionModal.type === 'approve'
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : actionModal.type === 'return'
                      ? 'bg-amber-600 hover:bg-amber-700'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {isAr ? 'تأكيد الإجراء' : 'Confirm Action'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </WorkspaceLayout>
  );
};
