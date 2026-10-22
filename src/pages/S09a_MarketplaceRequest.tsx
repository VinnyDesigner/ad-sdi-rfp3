import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useLanguage } from '../context/LanguageContext';
import {
  CheckCircle,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  LockKey,
  Info,
  Check,
  Buildings,
} from '@phosphor-icons/react';

export const S09a_MarketplaceRequest: React.FC = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form Fields
  const [selectedPlan, setSelectedPlan] = useState('Commercial — subscription');
  const [organization, setOrganization] = useState('Al Dar Geospatial Partners Ltd');
  const [intendedUse, setIntendedUse] = useState('Urban planning');
  const [projectDescription, setProjectDescription] = useState('Integration of 3D building structural geometries into Abu Dhabi municipal master planning simulation for Yas Island and Saadiyat expansion corridors.');
  const [apiVolume, setApiVolume] = useState('50,000 API calls/month');
  const [acceptedLicense, setAcceptedLicense] = useState(true);
  const [acceptedDsa, setAcceptedDsa] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    { number: 1, title: isAr ? 'اختيار الباقة' : 'Choose Plan' },
    { number: 2, title: isAr ? 'الغرض والترخيص' : 'Purpose & Licence' },
    { number: 3, title: isAr ? 'طريقة الدفع' : 'Payment' },
    { number: 4, title: isAr ? 'المراجعة والاعتماد' : 'Approval' },
  ];

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!acceptedLicense || !acceptedDsa) {
        alert('Please review and accept both the licence agreement and Data Sharing Agreement.');
        return;
      }
      // Step 3 is Payment stage (workflow label only per requirements)
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitRequest = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Header />

      {/* Main Container */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex-1">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-text-secondary mb-6">
          <Link to="/marketplace" className="hover:text-blue-600">{isAr ? 'سوق البيانات' : 'Marketplace'}</Link>
          <span>/</span>
          <span className="font-semibold text-navy-900">{isAr ? 'طلب صلاحية منتج' : 'Request Product Access'}</span>
        </div>

        {/* Wizard Container */}
        <div className="bg-white rounded-2xl border border-border shadow-md overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-navy-900 text-white border-b border-navy-700">
            <h1 className="text-xl font-bold">{isAr ? 'طلب الحصول على صلاحية المنتج' : 'Access Request Application'}</h1>
            <p className="text-xs text-slate-300 mt-1">
              {isAr ? 'المجسمات ثلاثية الأبعاد للمباني • الجهة المسؤولة: دائرة البلديات والنقل (DMT)' : 'Building Footprints 3D • Custodian: Department of Municipalities and Transport (DMT)'}
            </p>
          </div>

          {/* Stepper Progress Bar */}
          <div className="p-4 border-b border-border bg-canvas/60">
            <div className="grid grid-cols-4 gap-2">
              {steps.map((st) => (
                <div key={st.number} className="flex flex-col items-center text-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    currentStep === st.number
                      ? 'bg-teal-600 text-white shadow-xs'
                      : currentStep > st.number
                      ? 'bg-emerald-500 text-white'
                      : 'bg-canvas-subtle text-text-muted border border-border'
                  }`}>
                    {currentStep > st.number ? <Check className="w-4 h-4" /> : st.number}
                  </div>
                  <span className={`text-[11px] mt-1 font-medium ${
                    currentStep === st.number ? 'text-navy-900 font-bold' : 'text-text-muted'
                  }`}>
                    {st.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Content Area */}
          <div className="p-6 sm:p-8">
            {!submitted ? (
              <>
                {/* STEP 1: CHOOSE PLAN */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider">
                      Step 1: Select Applicable Access Model
                    </h2>
                    <p className="text-xs text-text-secondary">
                      Select your operational tier. No currency or subscription fees are processed directly online.
                    </p>

                    <div className="space-y-3 pt-2">
                      {[
                        {
                          title: 'Commercial — subscription',
                          badge: 'Approved Partner Tier',
                          desc: 'For vetted enterprise contractors, urban planning firms, and academic research institutions.',
                          volume: 'Up to 50,000 API requests / month with 99.9% uptime SLA.',
                        },
                        {
                          title: 'Government Entity — included',
                          badge: 'Inter-Agency Protocol',
                          desc: 'Full internal access under Dubai/Abu Dhabi Government Inter-Agency Data Sharing Protocol.',
                          volume: 'Unlimited requests for official government mandates.',
                        },
                      ].map((plan) => (
                        <div
                          key={plan.title}
                          onClick={() => setSelectedPlan(plan.title)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer ${
                            selectedPlan === plan.title
                              ? 'border-teal-600 bg-teal-50/40 ring-2 ring-teal-600/20'
                              : 'border-border bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-navy-900 text-sm">{plan.title}</span>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-teal-800 border border-teal-200">
                              {plan.badge}
                            </span>
                          </div>
                          <p className="text-xs text-text-secondary mt-1">{plan.desc}</p>
                          <div className="text-[11px] font-medium text-teal-700 mt-2">{plan.volume}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: PURPOSE & LICENCE */}
                {currentStep === 2 && (
                  <div className="space-y-4 text-xs">
                    <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider">
                      Step 2: Intended Use & Legal Agreements
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-text-muted font-bold mb-1">Applying Organization</label>
                        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-canvas border border-border">
                          <Buildings className="w-4 h-4 text-text-secondary" />
                          <span className="font-semibold text-navy-900">{organization}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-text-muted font-bold mb-1">Verification Status</label>
                        <div className="flex items-center gap-1.5 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>Verified Commercial Contractor (AD-SDI Registry)</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-navy-900 font-semibold mb-1">Intended Use Classification</label>
                      <select
                        value={intendedUse}
                        onChange={(e) => setIntendedUse(e.target.value)}
                        className="w-full p-2 bg-canvas border border-border rounded-lg text-navy-900 font-medium"
                      >
                        <option value="Urban planning">Urban planning & spatial simulation</option>
                        <option value="Environmental impact">Environmental impact & resilience study</option>
                        <option value="Infrastructure engineering">Infrastructure engineering & utilities</option>
                        <option value="Academic research">Academic research & non-profit analysis</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-navy-900 font-semibold mb-1">Project Description & Scope</label>
                      <textarea
                        rows={3}
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        className="w-full p-2.5 bg-canvas border border-border rounded-lg text-text-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
                      />
                    </div>

                    <div>
                      <label className="block text-navy-900 font-semibold mb-1">Expected Monthly Volume</label>
                      <input
                        type="text"
                        value={apiVolume}
                        onChange={(e) => setApiVolume(e.target.value)}
                        className="w-full p-2 bg-canvas border border-border rounded-lg font-mono text-navy-900"
                      />
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-2 pt-2 border-t border-border">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={acceptedLicense}
                          onChange={(e) => setAcceptedLicense(e.target.checked)}
                          className="mt-0.5 rounded border-border text-teal-600 focus:ring-teal-600"
                        />
                        <span className="text-text-secondary leading-relaxed">
                          I accept the <strong>Standard AD-SDI Commercial Spatial Data Licence</strong> and agree not to redistribute raw feature geometries.
                        </span>
                      </label>

                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={acceptedDsa}
                          onChange={(e) => setAcceptedDsa(e.target.checked)}
                          className="mt-0.5 rounded border-border text-teal-600 focus:ring-teal-600"
                        />
                        <span className="text-text-secondary leading-relaxed">
                          I acknowledge adherence to <strong>Data Sharing Agreement DSA-2027-014</strong> and UAE sovereign data residency provisions.
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* STEP 3: PAYMENT WORKFLOW LABEL STAGE */}
                {currentStep === 3 && (
                  <div className="space-y-4 text-xs">
                    <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider">
                      Step 3: Verification & Billing Clearance Stage
                    </h2>
                    
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-sm">
                        <Info className="w-5 h-5 text-blue-600" />
                        <span>Workflow Stage: Government Account Settlement</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">
                        Under the Abu Dhabi Government partner framework, accounts are cleared via inter-agency invoicing and accredited partner frameworks. No credit card or live online transaction is required.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-canvas border border-border space-y-2">
                      <div className="flex justify-between">
                        <span className="text-text-muted">Account Ref</span>
                        <span className="font-mono font-bold text-navy-900">ACC-ALDAR-2027</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Billing Cycle</span>
                        <span className="font-semibold text-navy-900">Per approved revenue-sharing model</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Payment Currency</span>
                        <span className="font-mono text-emerald-700 font-bold">Standard Institutional Account</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: APPROVAL STAGE & REVIEW */}
                {currentStep === 4 && (
                  <div className="space-y-4 text-xs">
                    <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider">
                      Step 4: Custodian Approval Review
                    </h2>

                    <div className="p-4 rounded-xl bg-canvas border border-border space-y-2.5">
                      <div className="font-bold text-navy-900 text-sm border-b border-border pb-1">
                        Application Summary
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Product</span>
                        <span className="font-bold text-navy-900">Building Footprints 3D</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Target Plan</span>
                        <span className="font-semibold text-teal-700">{selectedPlan}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Designated Approver</span>
                        <span className="font-semibold text-navy-900">Khalid M. (DMT Data Custodian)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Intended Use</span>
                        <span className="font-medium text-navy-900">{intendedUse}</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                      Your application will be routed to Khalid M. (DMT Data Steward) for identity and project clearance. You can track progress in <strong>My Entitlements</strong>.
                    </div>
                  </div>
                )}

                {/* Footer Navigation Buttons */}
                <div className="mt-8 pt-4 border-t border-border flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="px-4 py-2 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:bg-canvas disabled:opacity-30 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmitRequest}
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <span>{isSubmitting ? 'Submitting Application...' : 'Submit Request to DMT Steward'}</span>
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </>
            ) : (
              /* Success Submission State */
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-navy-900">
                  Access Request Submitted Successfully
                </h2>
                <p className="text-xs text-text-secondary max-w-md mx-auto leading-relaxed">
                  Your request for <strong>Building Footprints 3D</strong> has been logged under reference <strong>REQ-2027-0842</strong> and dispatched to Khalid M. (DMT Data Steward).
                </p>

                <div className="pt-4 flex items-center justify-center gap-3">
                  <button
                    onClick={() => navigate('/marketplace/entitlements')}
                    className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-colors"
                  >
                    <span>View My Entitlements</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate('/marketplace')}
                    className="px-5 py-2.5 rounded-xl border border-border bg-white hover:bg-canvas text-navy-900 font-semibold text-xs transition-colors"
                  >
                    Return to Marketplace
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
