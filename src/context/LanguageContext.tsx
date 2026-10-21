import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  direction: 'ltr' | 'rtl';
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation & Branding
  'dge.title': {
    en: 'Department of Government Enablement',
    ar: 'دائرة التمكين الحكومي',
  },
  'portal.title': {
    en: 'AD-SDI Portal',
    ar: 'بوابة البنية التحتية للبيانات المكانية',
  },
  'nav.data': { en: 'Data', ar: 'البيانات' },
  'nav.maps': { en: 'Maps', ar: 'الخرائط' },
  'nav.services': { en: 'Services', ar: 'الخدمات' },
  'nav.marketplace': { en: 'Marketplace', ar: 'سوق البيانات' },
  'nav.opendata': { en: 'Open Data', ar: 'البيانات المفتوحة' },
  'nav.developers': { en: 'Developers', ar: 'المطورون' },
  'nav.signin': { en: 'Sign in', ar: 'تسجيل الدخول' },
  'nav.workspace': { en: 'Workspace', ar: 'مساحة العمل' },
  'nav.signout': { en: 'Sign out', ar: 'تسجيل الخروج' },

  // Home Screen
  'home.hero.title': {
    en: "Abu Dhabi’s spatial data, in one place",
    ar: 'البيانات المكانية لإمارة أبوظبي في منصة واحدة',
  },
  'home.hero.subtitle': {
    en: 'Discover, access and share trusted geospatial data and services across government.',
    ar: 'اكتشف واستخدم وشارك البيانات والخدمات الجيومكانية الموثوقة والمعتمدة عبر الجهات الحكومية.',
  },
  'home.search.placeholder': {
    en: 'Search 2,480 datasets, services and maps…',
    ar: 'ابحث في 2,480 مجموعة بيانات وخدمة وخريطة…',
  },
  'home.stats.datasets': { en: 'Datasets', ar: 'مجموعة بيانات' },
  'home.stats.entities': { en: 'Contributing Entities', ar: 'جهة مساهمة' },
  'home.stats.services': { en: 'OGC Services', ar: 'خدمة OGC مكانية' },
  'home.stats.operational': { en: 'All services operational', ar: 'جميع الخدمات تعمل بكفاءة' },

  // Modules
  'module.a.title': { en: 'Clearinghouse & Catalogue', ar: 'المستودع الرقمي والفهرس' },
  'module.a.desc': {
    en: 'Search authoritative government spatial metadata, inspect schemas, and connect to OGC services.',
    ar: 'فهرس البيانات المكانية المعتمدة للمؤسسات الحكومية ومخططات البيانات وخدمات OGC.',
  },
  'module.b.title': { en: 'GeoAI Studio', ar: 'مختبر الذكاء الاصطناعي الجغرافي' },
  'module.b.desc': {
    en: 'Automated satellite change detection, deep-learning feature extraction, and AI spatial assistance.',
    ar: 'كشف التغيرات الفضائية الآلي ونماذج التعلم العميق والمساعد الجيومكاني الذكي.',
  },
  'module.c.title': { en: 'Data Marketplace', ar: 'سوق البيانات المكانية' },
  'module.c.desc': {
    en: 'Enterprise marketplace for high-value data products, commercial licensing, and API access.',
    ar: 'منصة تبادل البيانات المتميزة ونماذج الترخيص للجهات الحكومية والشركاء المعتمدين.',
  },
  'module.d.title': { en: 'Capacity Building & GeoMaturity', ar: 'بناء القدرات والنضج المكاني' },
  'module.d.desc': {
    en: 'Assess institutional geospatial maturity, enroll in 8 learning pathways, and track competencies.',
    ar: 'تقييم النضج المكاني للمؤسسات ومسارات التدريب التخصصية وبناء الكوادر الوطنية.',
  },
  'module.e.title': { en: 'Digital Twin 3D', ar: 'التوأم الرقمي ثلاثي الأبعاد' },
  'module.e.desc': {
    en: 'Interactive 3D urban environment connecting BIM models, IoT environmental sensors, and 4D planning.',
    ar: 'بيئة حضرية تفاعلية ثلاثية الأبعاد تربط نماذج المباني وأجهزة الاستشعار البيئية والجدول الزمني 4D.',
  },
  'module.f.title': { en: 'Open Data Portal', ar: 'بوابة البيانات المفتوحة' },
  'module.f.desc': {
    en: 'Over 640 curated public geospatial datasets freely available for developers, researchers, and citizens.',
    ar: 'أكثر من 640 مجموعة بيانات مكانية مفتوحة ومتاحة للمطورين والباحثين والمجتمع.',
  },

  // Open Data Portal
  'open.hero.title': { en: 'Abu Dhabi Open Geospatial Data', ar: 'البيانات الجيومكانية المفتوحة لإمارة أبوظبي' },
  'open.hero.subtitle': { en: 'Free to use, reuse and build on.', ar: 'متاحة مجاناً للاستخدام وإعادة الاستخدام والتطوير.' },
  'open.trust': {
    en: 'Every dataset is classified, checked, quality-reviewed and approved before release.',
    ar: 'تخضع جميع مجموعات البيانات للمراجعة والتدقيق والاعتماد المؤسسي قبل نشرها.',
  },

  // Login
  'login.headline': {
    en: 'Abu Dhabi’s spatial data. Trusted. Connected.',
    ar: 'البيانات المكانية لإمارة أبوظبي. موثوقة. متصلة.',
  },
  'login.subtext': {
    en: 'One secure platform to discover, share and use authoritative geospatial data across government.',
    ar: 'منصة رقمية موحدة وآمنة لاكتشاف وتبادل واستخدام البيانات المكانية المعتمدة عبر منظومة العمل الحكومي.',
  },

  // Disclaimer
  'footer.disclaimer': {
    en: 'Illustrative data — conceptual design for AD-SDI Portal. Not production government authority.',
    ar: 'بيانات استرشادية — تصميم مقترح تجريبي لبوابة البنية التحتية للبيانات المكانية AD-SDI.',
  },
  'footer.copyright': {
    en: '© 2027 Department of Government Enablement. All rights reserved.',
    ar: '© 2027 دائرة التمكين الحكومي. جميع الحقوق محفوظة.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('adsdi_lang');
    return (saved === 'ar' || saved === 'en') ? saved : 'en';
  });

  const direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    localStorage.setItem('adsdi_lang', language);
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', language);
  }, [language, direction]);

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
