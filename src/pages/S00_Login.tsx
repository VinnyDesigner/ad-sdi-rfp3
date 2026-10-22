import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Eye, EyeSlash, Globe, Key, Lock, UserCheck, ArrowRight } from '@phosphor-icons/react';

export const S00_Login: React.FC = () => {
  const { loginAs } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const [email, setEmail] = useState('khalid.m@dmt.gov.ae');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter your government credentials.');
      return;
    }
    let persona = 'khalid';
    if (email.toLowerCase().includes('fatima')) persona = 'fatima';
    else if (email.toLowerCase().includes('omar')) persona = 'omar';
    loginAs(persona);
    navigate('/');
  };

  const handleSSOLogin = () => {
    loginAs('khalid');
    navigate('/');
  };

  return (
    <div className="h-screen max-h-screen overflow-hidden flex flex-col lg:flex-row bg-white selection:bg-blue-600 selection:text-white font-sans antialiased">
      {/* Left Column: Deep Sovereign Navy Stage */}
      <div
        className="lg:w-1/2 relative text-white flex flex-col justify-between p-6 sm:p-8 lg:p-10 h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-[#13315C]"
        style={{ backgroundColor: '#0B2545' }}
      >
        {/* Authentic Abu Dhabi Coastal & Island Aerial Image with Sovereign Dark Blend */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="/abu-dhabi-aerial-coastal.jpg"
            alt="Abu Dhabi Coastal Spatial Data Infrastructure"
            className="w-full h-full object-cover object-center"
          />
          {/* Refined gradient overlay: solid contrast behind left text/logo while keeping the aerial coastal image clear & vibrant */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B2545]/90 via-[#0B2545]/60 to-[#0B2545]/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/60 via-transparent to-[#0B2545]/40"></div>
        </div>

        {/* Ambient Glowing Waveforms */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-gold-500/10 blur-3xl pointer-events-none"></div>

        {/* Top Header: DGE Brand Emblem & Language Toggle */}
        <div className="relative z-10 shrink-0">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-3 transition-transform hover:scale-[1.02] focus:outline-none"
              title="Department of Government Enablement — Home"
            >
              <img
                src="/dge-logo-white.png"
                alt="Department of Government Enablement | دائرة التمكين الحكومي"
                className="h-9 sm:h-11 w-auto object-contain drop-shadow"
              />
            </Link>

            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0F2B52] hover:bg-[#13315C] border border-[#1A427A] text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>
          </div>
        </div>

        {/* Center: Mission Statements & Value Badges */}
        <div className="relative z-10 my-auto py-2 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/25 border border-blue-400/40 text-blue-300 text-xs font-bold mb-4 shadow-xs backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>
            {language === 'ar' ? 'المستودع الجيومكاني المعتمد' : 'Authoritative Geospatial Clearinghouse'}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-white leading-tight tracking-tight mb-2.5 drop-shadow-sm">
            {t('login.headline')}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 font-normal">
            {t('login.subtext')}
          </p>

          {/* Value Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-[#0F2B52]/80 border border-[#1A427A] flex items-center gap-2.5 shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-slate-100 font-semibold text-xs">{language === 'ar' ? 'الإقامة السيادية للبيانات في الإمارات' : 'UAE Sovereign Data Residency'}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0F2B52]/80 border border-[#1A427A] flex items-center gap-2.5 shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-gold-500/15 border border-gold-500/30 flex items-center justify-center shrink-0">
                <UserCheck className="w-4 h-4 text-gold-400" />
              </div>
              <span className="text-slate-100 font-semibold text-xs">{language === 'ar' ? 'وصول آمن مبني على الصلاحيات' : 'Role-Based Secure Access'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Sign In Form */}
      <div className="lg:w-1/2 flex flex-col justify-between bg-slate-50 h-full overflow-hidden">
        {/* Module Signature Color Strip */}
        <div className="module-bar shrink-0">
          <span></span><span></span><span></span><span></span><span></span><span></span>
        </div>

        <div className="max-w-[420px] w-full mx-auto px-6 sm:px-8 py-2 sm:py-3 my-auto flex-1 flex flex-col justify-center">
          {/* Form Header */}
          <div className="mb-3.5">
            <Link to="/" className="inline-block mb-2 transition-transform hover:scale-105" title="Department of Government Enablement — Home">
              <img
                src="/dge-logo.png"
                alt="Department of Government Enablement | دائرة التمكين الحكومي"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </Link>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2545] tracking-tight">
              {language === 'ar' ? 'تسجيل الدخول إلى AD-SDI' : 'Sign in to AD-SDI'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              {language === 'ar' ? 'أدخل بيانات الاعتماد الحكومية أو استخدم الهوية الرقمية UAE PASS.' : 'Enter your government credentials or use UAE PASS single sign-on.'}
            </p>
          </div>

          {/* Government SSO Button */}
          <button
            type="button"
            onClick={handleSSOLogin}
            className="w-full py-2.5 px-4 rounded-xl bg-[#0B2545] hover:bg-[#13315C] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md active:scale-[0.99] mb-3"
          >
            <div className="w-4 h-4 rounded-md bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400">
              <Key className="w-3 h-3" />
            </div>
            <span>{language === 'ar' ? 'الدخول بواسطة UAE PASS / الدخول الموحد' : 'Sign in with UAE PASS / Government SSO'}</span>
          </button>

          <div className="relative my-3 flex items-center justify-center">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-slate-50 px-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {language === 'ar' ? 'أو المتابعة بالبريد الإلكتروني' : 'or continue with email'}
            </span>
          </div>

          {errorMsg && (
            <div className="p-2 mb-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 font-medium">
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Credentials Form */}
          <form onSubmit={handleSignIn} className="space-y-2.5">
            <div>
              <label className="block text-xs font-bold text-[#0B2545] mb-1">
                {language === 'ar' ? 'البريد الإلكتروني الحكومي' : 'Government Email Address'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-mono shadow-xs text-left"
                dir="ltr"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#0B2545]">
                  {language === 'ar' ? 'كلمة المرور' : 'Password'}
                </label>
                <span className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer">
                  {language === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-text-primary pr-9 rtl:pr-3 rtl:pl-9 transition-all font-mono shadow-xs text-left"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 rtl:right-auto rtl:left-2.5 top-2 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  {showPassword ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-600 w-3.5 h-3.5"
                />
                <span className="text-slate-600 text-xs font-medium">
                  {language === 'ar' ? 'تذكر هذا الجهاز لمدة 30 يوماً' : 'Remember this device for 30 days'}
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.99]"
            >
              <span>{language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </form>

          {/* MFA Notice */}
          <div className="mt-3 p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-2 text-[11px] text-slate-600 leading-relaxed shadow-xs">
            <Lock className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#0B2545]">
                {language === 'ar' ? 'المصادقة متعددة العوامل (MFA): ' : 'Multi-Factor Authentication (MFA): '}
              </span>
              {language === 'ar'
                ? 'تتطلب حسابات المشرفين والشركاء المعتمدين تأكيداً عبر رمز أمان أو تطبيق المصادقة.'
                : 'Privileged data steward and partner accounts require hardware token or authenticator app confirmation.'}
            </div>
          </div>

          {/* Service Operational status */}
          <div className="mt-2.5 flex items-center justify-center gap-2 text-xs text-emerald-700 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>
              {language === 'ar'
                ? 'جميع خدمات بوابة AD-SDI تعمل بكفاءة (99.95%)'
                : 'All AD-SDI gateway services operational (99.95%)'}
            </span>
          </div>
        </div>

        {/* Footer Links */}
        <div className="px-6 sm:px-8 py-3 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between bg-white shrink-0">
          <div className="space-x-3 rtl:space-x-reverse font-medium">
            <span className="hover:text-slate-900 cursor-pointer transition-colors">{language === 'ar' ? 'المساعدة' : 'Help'}</span>
            <span>•</span>
            <span className="hover:text-slate-900 cursor-pointer transition-colors">{language === 'ar' ? 'الخصوصية' : 'Privacy'}</span>
            <span>•</span>
            <span className="hover:text-slate-900 cursor-pointer transition-colors">{language === 'ar' ? 'إمكانية الوصول' : 'Accessibility'}</span>
          </div>
          <Link to="/" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors">
            {language === 'ar' ? 'العودة إلى الصفحة الرئيسية' : 'Return to Public Home'}
          </Link>
        </div>
      </div>
    </div>
  );
};
