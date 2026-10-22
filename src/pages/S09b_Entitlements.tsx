import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useLanguage } from '../context/LanguageContext';
import { MY_ENTITLEMENTS } from '../data/mockData';
import { EntitlementItem } from '../types';
import {
  Key,
  Copy,
  Check,
  ArrowsClockwise,
  WarningCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  ChartBar,
  ShieldCheck,
  Plus,
} from '@phosphor-icons/react';

export const S09b_Entitlements: React.FC = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const navigate = useNavigate();
  const [entitlements, setEntitlements] = useState<EntitlementItem[]>(MY_ENTITLEMENTS);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleCopyKey = (key: string, id: string) => {
    navigator.clipboard.writeText(key.replace('••••••', '7c81a2'));
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRotateKey = (id: string) => {
    setEntitlements((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, apiKey: `adsdi_••••••${Math.random().toString(16).substring(2, 6)}` } : e
      )
    );
    setToastMsg(isAr ? 'تم تدوير مفتاح API بنجاح وإنشاء رمز اعتماد جديد.' : 'API Key successfully rotated. New masked credential generated.');
    setTimeout(() => setToastMsg(null), 3000);
  };

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
              <span className="font-semibold text-navy-900">{isAr ? 'اشتراكاتي وصلاحياتي' : 'My Entitlements'}</span>
            </div>
            <h1 className="text-2xl font-bold text-navy-900 tracking-tight">
              {isAr ? 'اشتراكاتي وصلاحيات الوصول ومفاتيح API' : 'My Entitlements & API Credentials'}
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              {isAr ? 'إدارة اشتراكات المنتجات النشطة وحصص الاستخدام ورموز الأمان.' : 'Manage your active product subscriptions, quotas, and security tokens.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/marketplace"
              className="px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{isAr ? 'استعراض سوق البيانات' : 'Browse Marketplace'}</span>
            </Link>
          </div>
        </div>

        {/* Warning / Pending Approval Notification Banner */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-bold">{isAr ? 'طلب واحد بانتظار موافقة المزود:' : '1 request awaiting provider approval:'}</span>{' '}
              <span>{isAr ? 'البصمات ثلاثية الأبعاد للمباني (دائرة البلديات والنقل) قيد المراجعة حالياً من قبل خالد م.' : 'Building Footprints 3D (Department of Municipalities and Transport) is currently under review by Khalid M.'}</span>
            </div>
          </div>
          <span className="text-[11px] font-mono text-amber-800 font-bold shrink-0">
            {isAr ? 'الحالة: معلق' : 'Status: Pending'}
          </span>
        </div>

        {/* Feedback Toast */}
        {toastMsg && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Main Entitlements Table Card */}
        <div className="bg-white rounded-2xl border border-border shadow-xs overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider">
              {isAr ? 'المنتجات المكانية المشترك بها ورموز الوصول' : 'Subscribed Spatial Products & Access Tokens'}
            </h3>
            <span className="text-[11px] text-text-muted">
              {isAr ? 'عرض 3 منتجات مرخصة' : 'Showing 3 licensed products'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-xs">
              <thead className="bg-canvas border-b border-border text-[11px] uppercase tracking-wider text-text-secondary">
                <tr>
                  <th className="p-3.5">{isAr ? 'المنتج والمزود' : 'Product & Provider'}</th>
                  <th className="p-3.5">{isAr ? 'نوع الباقة' : 'Plan Type'}</th>
                  <th className="p-3.5">{isAr ? 'الحالة' : 'Status'}</th>
                  <th className="p-3.5">{isAr ? 'بيانات اعتماد مفتاح API' : 'API Key Credential'}</th>
                  <th className="p-3.5">{isAr ? 'الاستخدام هذا الشهر' : 'Usage this Month'}</th>
                  <th className="p-3.5">{isAr ? 'التجديد / الصلاحية' : 'Renews / Validity'}</th>
                  <th className="p-3.5 text-right rtl:text-left">{isAr ? 'الإجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {entitlements.map((item) => {
                  const percentUsed = Math.min(100, Math.round((item.usageThisMonth / item.usageLimit) * 100));
                  return (
                    <tr key={item.id} className="hover:bg-canvas transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-navy-900">{item.productName}</div>
                        <div className="text-[10px] text-text-secondary">{item.provider}</div>
                      </td>

                      <td className="p-3.5 text-text-secondary">
                        <span className="px-2 py-0.5 rounded bg-canvas-subtle border border-border text-[11px]">
                          {item.plan}
                        </span>
                      </td>

                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : item.status === 'Pending'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                          {isAr ? (item.status === 'Active' ? 'نشط' : item.status === 'Pending' ? 'معلق' : 'منتهي') : item.status}
                        </span>
                      </td>

                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5 font-mono text-[11px] text-navy-900 bg-canvas px-2 py-1 rounded border border-border w-fit" dir="ltr">
                          <Key className="w-3.5 h-3.5 text-text-secondary" />
                          <span>{item.apiKey}</span>
                          <button
                            type="button"
                            onClick={() => handleCopyKey(item.apiKey, item.id)}
                            title={isAr ? 'نسخ رمز API' : 'Copy API Token'}
                            className="p-1 hover:text-blue-600 transition-colors"
                          >
                            {copiedKey === item.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRotateKey(item.id)}
                            title={isAr ? 'تدوير المفتاح' : 'Rotate Key'}
                            className="p-1 hover:text-amber-600 transition-colors"
                          >
                            <ArrowsClockwise className="w-3 h-3" />
                          </button>
                        </div>
                      </td>

                      <td className="p-3.5">
                        <div className="w-36 space-y-1">
                          <div className="flex justify-between text-[10px] font-mono">
                            <span className="font-semibold text-navy-900">{item.usageThisMonth.toLocaleString()}</span>
                            <span className="text-text-muted">/ {item.usageLimit.toLocaleString()}</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-canvas overflow-hidden">
                            <div
                              className={`h-full rounded-full ${percentUsed > 80 ? 'bg-amber-500' : 'bg-teal-500'}`}
                              style={{ width: `${percentUsed}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5 text-text-secondary font-mono text-[11px]">
                        {item.renewsOn}
                      </td>

                      <td className="p-3.5 text-right rtl:text-left">
                        <Link
                          to={`/catalogue/land-parcels`}
                          className="text-teal-700 hover:text-navy-900 font-semibold text-xs inline-flex items-center gap-1"
                        >
                          <span>{isAr ? 'نقاط الاتصال' : 'Endpoints'}</span>
                          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Usage Analytics Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-border shadow-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
              {isAr ? 'إجمالي استدعاءات API الشهرية' : 'Aggregate Monthly API Calls'}
            </div>
            <div className="text-2xl font-extrabold text-navy-900 font-mono mt-1">
              42,650
            </div>
            <div className="text-xs text-text-secondary mt-1">
              {isAr ? 'عبر جميع نقاط اتصال OGC و REST المشترك بها' : 'Across all subscribed OGC and REST endpoints'}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-border shadow-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
              {isAr ? 'متوسط زمن الاستجابة (p95)' : 'Average Latency (p95)'}
            </div>
            <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">
              64 ms
            </div>
            <div className="text-xs text-text-secondary mt-1">
              {isAr ? 'محمي باتفاقية مستوى الخدمة لحكومة أبوظبي' : 'Protected by Abu Dhabi Government SLA'}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-border shadow-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
              {isAr ? 'بروتوكول الأمان' : 'Security Protocol'}
            </div>
            <div className="text-2xl font-extrabold text-navy-900 mt-1 flex items-center gap-1.5 text-base">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span>mTLS & OAuth 2.0</span>
            </div>
            <div className="text-xs text-text-secondary mt-1">
              {isAr ? 'مشفر أثناء النقل وفي حالة السكون' : 'Encrypted in transit & at rest'}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
