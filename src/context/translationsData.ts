export type Language = 'en' | 'ar';

export const STANDARD_TRANSLATIONS: Record<string, Record<Language, string>> = {
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

// Comprehensive Direct English -> Arabic dictionary covering all UI strings across the application
export const EXACT_PHRASE_DICTIONARY: Record<string, string> = {
  // Navigation & General UI
  "Data": "البيانات",
  "Maps": "الخرائط",
  "Services": "الخدمات",
  "Marketplace": "سوق البيانات",
  "Open Data": "البيانات المفتوحة",
  "Developers": "المطورون",
  "Developer": "المطور",
  "Workspace": "مساحة العمل",
  "Sign in": "تسجيل الدخول",
  "Sign out": "تسجيل الخروج",
  "Home": "الرئيسية",
  "Public Home": "الرئيسية العامة",
  "Search": "بحث",
  "Search...": "ابحث...",
  "Search catalogue...": "ابحث في الفهرس...",
  "Search datasets, services, publishers...": "ابحث في البيانات، والخدمات، والجهات...",
  "Search datasets, services and maps…": "ابحث في مجموعات البيانات والخدمات والخرائط…",
  "Search 2,480 datasets, services and maps…": "ابحث في 2,480 مجموعة بيانات وخدمة وخريطة…",
  "Search across datasets, services, models, tickets...": "ابحث في مجموعات البيانات، والخدمات، والنماذج، والتذاكر...",
  "Search products by title, provider, or topic...": "ابحث في المنتجات، والمزودين، والتصنيفات...",
  "Search APIs, SDKs, topics, and guides...": "ابحث في واجهات البرمجة، والمكتبات، والأدلة...",
  "Search endpoints, parameters, schemas...": "ابحث في نقاط الاتصال، والمعاملات، والمخططات...",
  "Search by topic, entity, standard, keyword...": "ابحث حسب الموضوع، الجهة، المعيار، الكلمة المفتاحية...",
  "Search 640 open datasets...": "البحث في 640 مجموعة بيانات مفتوحة...",
  "Filter": "تصفية",
  "Filters": "عوامل التصفية",
  "Clear all": "مسح التصفية",
  "Reset all filters": "إعادة ضبط التصفية",
  "Reset all": "إعادة ضبط الكل",
  "Reset": "إعادة تعيين",
  "Apply": "تطبيق",
  "Submit": "إرسال",
  "Cancel": "إلغاء",
  "Confirm": "تأكيد",
  "Approve": "اعتماد",
  "Reject": "رفض",
  "Return": "إرجاع",
  "Save": "حفظ",
  "Save Changes": "حفظ التغييرات",
  "Edit": "تعديل",
  "Delete": "حذف",
  "Copy": "نسخ",
  "Copied!": "تم النسخ!",
  "Copied": "تم النسخ",
  "Copy URL": "نسخ الرابط",
  "Copied URL!": "تم نسخ الرابط!",
  "Copy OGC API URL": "نسخ رابط OGC API",
  "Download": "تحميل",
  "Download GeoJSON": "تنزيل GeoJSON",
  "Download Shapefile": "تحميل Shapefile",
  "Download Sample": "تحميل عينة",
  "Download Data": "تحميل البيانات",
  "Export": "تصدير",
  "Export Report": "تصدير التقرير",
  "Close": "إغلاق",
  "Dismiss": "إغلاق",
  "Next": "التالي",
  "Previous": "السابق",
  "Back": "رجوع",
  "Details": "التفاصيل",
  "Actions": "الإجراءات",
  "Status": "الحالة",
  "Overview": "نظرة عامة",
  "Metadata": "البيانات الوصفية",
  "Lineage": "المصدر والتتبع",
  "Quality": "الجودة",
  "Access": "الصلاحيات والترخيص",
  "Versions": "الإصدارات",
  "Audit Trail": "سجل التدقيق",
  "Help": "مساعدة",
  "Settings": "الإعدادات",
  "Notifications": "الإشعارات",
  "Mark all read": "تحديد الكل كمقروء",
  "Notice:": "تنبيه:",
  "All": "الكل",
  "Datasets": "مجموعات البيانات",
  "APIs": "واجهات البرمجة",
  "AI Models": "نماذج الذكاء الاصطناعي",

  // Government Entities (Full, Short, and Codes)
  "Department of Government Enablement": "دائرة التمكين الحكومي",
  "Department of Government Enablement (DGE)": "دائرة التمكين الحكومي (DGE)",
  "Department of Municipalities and Transport": "دائرة البلديات والنقل",
  "Department of Municipalities and Transport (DMT)": "دائرة البلديات والنقل (DMT)",
  "Department of Municipalities and Transport (ITC)": "دائرة البلديات والنقل (ITC)",
  "Integrated Transport Centre (ITC)": "مركز النقل المتكامل (ITC)",
  "Environment Agency – Abu Dhabi": "هيئة البيئة – أبوظبي",
  "Environment Agency - Abu Dhabi": "هيئة البيئة – أبوظبي",
  "Environment Agency – Abu Dhabi (EAD)": "هيئة البيئة – أبوظبي (EAD)",
  "Environment Agency - Abu Dhabi (EAD)": "هيئة البيئة – أبوظبي (EAD)",
  "Statistics Centre – Abu Dhabi": "مركز الإحصاء – أبوظبي",
  "Statistics Centre - Abu Dhabi": "مركز الإحصاء – أبوظبي",
  "Statistics Centre – Abu Dhabi (SCAD)": "مركز الإحصاء – أبوظبي (SCAD)",
  "Statistics Centre - Abu Dhabi (SCAD)": "مركز الإحصاء – أبوظبي (SCAD)",
  "Abu Dhabi Department of Education and Knowledge": "دائرة التعليم والمعرفة – أبوظبي",
  "Abu Dhabi Department of Education and Knowledge (ADEK)": "دائرة التعليم والمعرفة – أبوظبي (ADEK)",
  "Abu Dhabi Public Health Centre": "مركز أبوظبي للصحة العامة",
  "Abu Dhabi Public Health Centre (ADPHC)": "مركز أبوظبي للصحة العامة (ADPHC)",
  "Department of Health (DoH)": "دائرة الصحة (DoH)",
  "Abu Dhabi Sports Council (ADSC) & DMT": "مجلس أبوظبي الرياضي ودائرة البلديات والنقل",
  "Abu Dhabi Distribution Company": "شركة أبوظبي للتوزيع",
  "Abu Dhabi Distribution Company (ADDC)": "شركة أبوظبي للتوزيع (ADDC)",
  "Al Dar Geospatial Partners Ltd": "شركة الدار للشركاء الجيومكانيين",
  "Approved Partner (CleanEnergy Geospatial)": "شريك معتمد (CleanEnergy)",
  "CleanEnergy Geospatial Partner": "شريك الطاقة النظيفة الجيومكاني",
  "AD-SDI GeoAI Team": "فريق الذكاء الاصطناعي الجغرافي AD-SDI",

  // Themes
  "Boundaries": "الحدود الإدارية",
  "Transport": "النقل والمواصلات",
  "Land & Cadastre": "الأراضي والمسح العقاري",
  "Buildings & 3D": "المباني وثلاثية الأبعاد",
  "Environment": "البيئة والمحميات",
  "Utilities": "شبكات المرافق",
  "Imagery": "الصور الفضائية والجوية",
  "Population": "السكان والتركيبة الديموغرافية",
  "All Themes": "جميع المجالات",
  "All Publishers": "جميع الجهات",
  "Classification": "التصنيف",
  "Audience": "الفئة المستهدفة",

  // Modules & Services
  "Module A": "الوحدة أ",
  "Module B": "الوحدة ب",
  "Module C": "الوحدة ج",
  "Module D": "الوحدة د",
  "Module E": "الوحدة هـ",
  "Module F": "الوحدة و",
  "Clearinghouse & Catalogue": "المستودع الرقمي والفهرس",
  "Data Marketplace": "سوق البيانات المكانية",
  "Capacity Building & GeoMaturity": "بناء القدرات والنضج المكاني",
  "Digital Twin 3D": "التوأم الرقمي ثلاثي الأبعاد",
  "Core SDI": "البنية التحتية الأساسية",
  "AI & Inference": "الذكاء الاصطناعي والاستدلال",
  "Commercial & Shared": "تجاري ومشترك",
  "Training & Maturity": "التدريب والنضج",
  "3D & 4D Simulation": "محاكاة ثلاثية ورباعية الأبعاد",
  "Public Access": "الوصول العام",
  "Six Integrated Geospatial Services": "ست خدمات جيومكانية متكاملة",
  "Architectural Modules": "الوحدات المعمارية للمنصة",
  "Launch module": "تشغيل الوحدة",

  // Workspace Nav Groups
  "DISCOVER": "استكشاف",
  "BUILD": "بناء",
  "GOVERN": "حوكمة",
  "ENABLE": "تمكين",
  "PROGRAMME": "البرنامج",

  // Sidebar Items
  "Map Viewer": "مستعرض الخرائط",
  "APIs & Services": "الخدمات والواجهات",
  "Publishing & Approvals": "النشر والاعتمادات",
  "Quality & SLA": "الجودة ومستوى الخدمة",
  "Security & Access": "الأمن والصلاحيات",
  "Policies & Standards": "السياسات والمعايير",
  "GeoMaturity & Training": "النضج المكاني والتدريب",
  "Command Centre": "مركز العمليات التنفيذي",

  // Map & Controls
  "Split View": "عرض مزدوج",
  "List Only": "قائمة فقط",
  "Map Only": "خريطة فقط",
  "Draw Area": "رسم نطاق",
  "Draw Area Filter": "تصفية بنطاق الخريطة",
  "Clear Spatial Filter": "إلغاء تصفية النطاق",
  "Light": "فاتح",
  "Dark": "داكن",
  "Satellite": "قمر صناعي",
  "AD-SDI Spatial": "نظام AD-SDI المكاني",
  "Reset Abu Dhabi Extent": "إعادة ضبط نطاق إمارة أبوظبي",
  "Zoom": "تقريب",

  // Classifications, Audiences, & Statuses
  "Public": "عام",
  "Open": "بيانات مفتوحة",
  "Shared – Government": "مشترك – حكومي",
  "Shared - Government": "مشترك – حكومي",
  "Shared – Govt": "مشترك حكومي",
  "FGDS – Fundamental": "أساسي FGDS",
  "FGDS - Fundamental": "أساسي FGDS",
  "Restricted": "بيانات مقيدة",
  "Government Only": "جهات حكومية فقط",
  "Approved Partners": "شركاء معتمدون",
  "Internal": "استخدام داخلي",
  "Operational": "يعمل بكفاءة",
  "Passed": "اجتاز بنجاح",
  "Quality Passed": "اجتاز فحص الجودة",
  "Passed Validations": "الفحوصات الناجحة",
  "Returned for Remediation": "المعادة للمعالجة والتصحيح",
  "Warnings": "تنبيهات",
  "Failed": "لم يجتز",
  "Pending": "قيد الانتظار",
  "Pending Checks": "بانتظار الفحص",
  "Under Review": "قيد المراجعة",
  "Approved": "معتمد",
  "Published": "منشور",
  "Withdrawn": "مسحوب",
  "Active": "نشط",
  "Inactive": "غير نشط",
  "High": "مرتفع",
  "Medium": "متوسط",
  "Low": "منخفض",
  "Critical": "حرج",
  "Compliant": "ملتزم",
  "Action Needed": "يتطلب إجراء",

  // Personas
  "Demonstration Personas": "المستخدمون للتجربة",
  "Switch Test Persona": "تبديل المستخدم التجريبي",
  "Current:": "المستخدم الحالي:",
  "Data Steward": "مشرف بيانات",
  "Lead Geospatial Data Steward": "كبير مشرفي البيانات المكانية",
  "Spatial Quality Officer": "مسؤول جودة البيانات المكانية",
  "Quality Officer": "مسؤول جودة البيانات",
  "Approved Partner": "شريك معتمد",
  "Public Visitor": "زائر عام",
  "Full Governance & Publishing Access": "صلاحيات كاملة للحوكمة والنشر",
  "Full Publishing & Approvals": "صلاحيات النشر والاعتماد",
  "Quality Gateway & Validation": "بوابة الجودة والتحقق",
  "Quality & SLA Dashboard": "لوحة الجودة ومستوى الخدمة SLA",
  "Marketplace Buyer & Entitlements": "مشتري في سوق البيانات والتراخيص",
  "Marketplace & Entitlements": "سوق البيانات والاشتراكات",
  "Open Data & Public Catalogue": "البيانات المفتوحة والفهرس العام",
  "Khalid M. (DMT Data Steward)": "خالد م. (مشرف بيانات DMT)",
  "Fatima A. (Spatial Quality Officer)": "فاطمة أ. (مسؤول جودة البيانات المكانية)",
  "Fatima A. (Quality Officer)": "فاطمة أ. (مسؤول جودة البيانات)",
  "Omar R. (Approved Partner)": "عمر ر. (شريك معتمد)",

  // Catalogue & Dataset Detail
  "Land Parcels (Cadastre)": "القطع العقارية (المسح العقاري)",
  "Data currency: On schedule": "حداثة البيانات: منتظمة",
  "Marketplace Eligible": "مؤهل لسوق البيانات",
  "Open in Map Viewer": "فتح في مستعرض الخرائط",
  "Request API Access": "طلب اشتراك الواجهة API",
  "Overview & Map": "نظرة عامة والخريطة",
  "Services & APIs": "الخدمات والواجهات",
  "Quality & Conformance": "الجودة والمطابقة",
  "Access & Licensing": "الصلاحيات والترخيص",
  "No matching datasets found": "لم يتم العثور على مجموعات بيانات مطابقة",
  "Try resetting your search query or loosening applied filters.": "جرّب إعادة تعيين كلمة البحث أو تخفيف معايير التصفية.",
  "Bookmark dataset": "إضافة للإشارات",
  "Remove bookmark": "إزالة من الإشارات",
  "Open Dataset Details": "عرض تفاصيل مجموعة البيانات",
  "Spatial Bounding Box Filter Active (Eastern Mangroves & Coastline)": "تصفية النطاق الجغرافي نشطة (القرم الشرقي والساحل)",
  "Inspect Cadastral Land Parcels (S03)": "معاينة القطع العقارية والمسح العقاري (S03)",
  "Key Technical Facts": "الحقائق الفنية الرئيسية",
  "Coordinate Reference System": "نظام الإسناد الإحداثي",
  "Geographic Extent": "النطاق الجغرافي",
  "Total Features": "إجمالي المعالم",
  "Update Frequency": "دورية التحديث",
  "Last Updated": "آخر تحديث",
  "Next Scheduled Sync": "المزامنة القادمة المجدولة",
  "Lifecycle State": "حالة دورة الحياة",
  "Active Production": "بيئة إنتاج نشطة",
  "ISO 19115 Metadata": "بيانات وصفية ISO 19115",
  "100% Complete": "مكتمل بنسبة 100%",
  "Quality Validation Checks": "فحوصات التحقق من الجودة",
  "Available Spatial Services & APIs": "الخدمات والواجهات المكانية المتاحة",
  "Direct endpoints configured with rate limits and authentication according to your government credentials.": "نقاط اتصال مباشرة مهيأة بحدود الاستخدام والمصادقة وفقاً لصلاحياتك الحكومية.",
  "ISO 19115 Geospatial Metadata Profile": "الملف التعريفي للبيانات الوصفية المكانية ISO 19115",
  "Identification Information": "معلومات التعريف",
  "Spatial Representation": "التمثيل المكاني",
  "Data Lineage & Provenance History": "المصدر وتاريخ تدفق البيانات",
  "Data Sharing & Access Terms": "شروط تبادل واستخدام البيانات",
  "Version History": "سجل الإصدارات",
  "Immutable Audit Trail": "سجل تدقيق غير قابل للتعديل",
  "Selected Parcel Feature": "المعلم العقاري المحدد",
  "Area:": "المساحة:",
  "Steward:": "المشرف:",
  "Surveyed:": "تاريخ المسح:",
  "Automated Publishing Pipeline & Lineage": "خط النشر المؤتمت والمصدر",
  "DMT Source Cadastre": "المسح العقاري المصدر (DMT)",
  "Enterprise GIS DB": "قاعدة بيانات GIS المؤسسية",
  "Topology & CRS Verified": "تم التحقق من الطوبولوجيا ونظام الإسناد",
  "Custodian Approval": "اعتماد المشرف",
  "Khalid M. (DMT)": "خالد م. (DMT)",
  "AD-SDI Clearinghouse": "مستودع AD-SDI الرقمي",
  "23 Downstream Services": "23 خدمة تابعة",

  // Publishing (S04)
  "Publishing Pipeline & Approvals": "خط اعتماد ونشر البيانات المكانية",
  "Review spatial submissions, verify automated quality gateway outputs, and approve release to the clearinghouse.": "مراجعة طلبات نشر البيانات الجيومكانية والتحقق من نتائج بوابات الجودة الآلية واعتمادها للمستودع الرقمي.",
  "Provider Onboarding": "تسجيل المزودين",
  "Submitted": "تم الإرسال",
  "Classification & Audience": "التصنيف والجمهور",
  "Authoritative datasets published in the last 30 days:": "مجموعات البيانات المعتمدة المنشورة خلال آخر 30 يوماً:",
  "Target SLA compliance: 98.4%": "الامتثال لمستوى الخدمة المستهدف: 98.4%",
  "My Queue (5)": "قائمتي بانتظار الاعتماد (5)",
  "Submitted by DMT (14)": "مقدمة من DMT (14)",
  "Published (132)": "منشورة (132)",
  "Withdrawn (2)": "مسحوبة (2)",
  "Pending Submissions Queue": "قائمة الطلبات بانتظار الاعتماد",
  "Select row to open review panel": "اختر صفاً لفتح لوحة المراجعة",
  "Item & Version": "العنصر والإصدار",
  "Entity": "الجهة",
  "Stage": "المرحلة",
  "Waiting": "فترة الانتظار",
  "Review & Approval Console": "لوحة المراجعة والاعتماد",
  "Submitted by:": "مُقدَم من:",
  "Approve for Publication": "اعتماد للنشر",
  "Approve Submission for Publication": "اعتماد نشر مجموعة البيانات",
  "Return Submission with Modification Request": "إرجاع الطلب مع ملاحظات التعديل",
  "Reject Submission": "رفض طلب النشر",
  "A mandatory comment or justification is required.": "يجب إدخال تعليق أو تبرير إلزامي.",

  // Quality Dashboard (S05)
  "Quality & SLA Governance Dashboard": "لوحة قياس جودة البيانات ومستوى الخدمة SLA",
  "Continuous monitoring of SDI automated gateway validations, spatial currency, and entity compliance.": "مراقبة مستمرة للتحقق الآلي من بوابات جودة البيانات، وحداثة المعالم، والتزام الجهات الحكومية.",
  "Quality Gateway — Last 24 Hours": "بوابة الجودة — آخر 24 ساعة",
  "Automated schema, geometry & CRS gateway checks": "فحوصات البوابة الآلية للمخططات والهندسة ونظام الإحداثيات",
  "Documented Return Reasons": "أسباب الإعادة الموثقة",
  "Spatial reference mismatch (non-EPSG:32640)": "عدم تطابق المرجع المكاني (غير EPSG:32640)",
  "Metadata profile incomplete (ISO 19115 gaps)": "ملف البيانات الوصفية غير مكتمل (نقص في معيار ISO 19115)",
  "Topology errors (self-intersections & slivers)": "أخطاء طوبولوجية (تقاطعات ذاتية وتداخلات)",
  "SLA & Availability Trend": "مؤشر مستوى الخدمة والجاهزية",
  "99.95% Target Met": "تم تحقيق المستهدف 99.95%",
  "Themes × Quality Checks Compliance": "امتثال المجالات × فحوصات الجودة",
  "Contributing Entity Compliance Roster": "سجل امتثال الجهات المساهمة",
  "Tracking 64 entities against AD-SDI SLA standards": "متابعة 64 جهة وفق معايير اتفاقيات مستوى الخدمة في AD-SDI",
  "Filter entity:": "تصفية حسب الجهة:",
  "All Entities": "جميع الجهات",
  "All Entities (6)": "جميع الجهات (6)",
  "Contributing Entity": "الجهة المساهمة",
  "Acronym": "الرمز المختصر",
  "Published Datasets": "مجموعات البيانات المنشورة",
  "Compliance Score": "درجة الامتثال",
  "SLA Status": "حالة مستوى الخدمة",

  // GeoAI Studio (S06 & S07)
  "Satellite Change Detection": "كشف التغيرات عبر الأقمار الصناعية",
  "Automated deep-learning verification of satellite and aerial captures against official cadastre and municipal permits.": "التحقق الآلي بنماذج التعلم العميق للصور الفضائية والجوية ومقارنتها بالمسح العقاري والتراخيص البلدية.",
  "Run AI Detection Pipeline": "تشغيل خط كشف التغيرات الذكي",
  "Unpermitted Construction": "أعمال بناء غير مرخصة",
  "Earthworks & Grading": "أعمال ترابية وتسوية",
  "Vegetation Clearing": "إزالة غطاء نباتي",
  "Confidence": "درجة الثقة",
  "High Confidence": "ثقة عالية",
  "Medium Confidence": "ثقة متوسطة",
  "Low Confidence": "ثقة منخفضة",

  // Digital Twin (S10)
  "Abu Dhabi Digital Twin 3D": "التوأم الرقمي ثلاثي الأبعاد لإمارة أبوظبي",
  "Immersive 3D urban environment linking LoD2/LoD3 building meshes, subterranean utility networks, and real-time IoT sensors.": "بيئة حضرية ثلاثية الأبعاد تربط مجسمات المباني LoD2/LoD3 وشبكات المرافق تحت الأرض وحساسات إنترنت الأشياء المباشرة.",
  "Daylight Simulation": "محاكاة حركة ضوء النهار",
  "Flood Risk 4D": "محاكاة مخاطر السيول 4D",
  "Underground Utilities": "المرافق تحت الأرض",
  "Environmental IoT": "حساسات البيئة IoT",

  // Command Centre (S11)
  "Programme Command Centre": "مركز عمليات وقيادة البرنامج",
  "Executive visibility across SDI platform adoption, cross-entity SLAs, data currency, and critical infrastructure readiness.": "لوحة متابعة تنفيذية لاعتماد المنصة عبر الجهات الحكومية، واتفاقيات مستوى الخدمة، وحداثة البيانات والجاهزية للبنية التحتية.",
  "Overall Programme Health": "الحالة العامة للبرنامج",
  "On Schedule": "وفق الخطة الزمنية",
  "Participating Entities": "الجهات المشاركة",
  "Average Data Currency": "متوسط حداثة البيانات",

  // GeoMaturity (S12)
  "GeoMaturity Assessment & Training": "تقييم النضج المكاني والتدريب",
  "Benchmark institutional geospatial readiness, track staff competencies, and access accredited learning pathways.": "قياس الجاهزية الجيومكانية للمؤسسات ومتابعة كفاءات الكوادر الوطنية ومسارات التدريب المعتمدة.",
  "Overall Maturity Index": "مؤشر النضج العام",
  "Learning Pathways": "مسارات التعلم",
  "Certified Personnel": "المختصون المعتمدون",

  // Open Data (S13)
  "Abu Dhabi Open Geospatial Data": "البيانات الجيومكانية المفتوحة لإمارة أبوظبي",
  "Free to use, reuse and build on.": "متاحة مجاناً للاستخدام وإعادة الاستخدام والتطوير.",
  "Every dataset is classified, checked, quality-reviewed and approved before release.": "تخضع جميع مجموعات البيانات للمراجعة والتدقيق والاعتماد المؤسسي قبل نشرها.",
  "Explore Open Datasets": "استكشف البيانات المفتوحة",
  "License: Open Data Abu Dhabi": "الترخيص: رخصة بيانات أبوظبي المفتوحة",
  "Suggest Dataset": "اقتراح مجموعة بيانات",
  "Popular Open Datasets": "مجموعات البيانات الأكثر شيوعاً",
  "Free to download under the Abu Dhabi Open Data Licence": "متاحة للتنزيل المجاني بموجب ترخيص أبوظبي للبيانات المفتوحة",
  "View full catalogue": "عرض الفهرس الكامل",
  "Developer Ecosystem": "منظومة المطورين",
  "Open APIs & Integration Toolkits": "الواجهات المفتوحة وأدوات التكامل",
  "Explore Full Developer Portal": "استكشف بوابة المطورين الكاملة",
  "OpenAPI & Swagger Specs": "مواصفات OpenAPI و Swagger",
  "Open-Source SDKs": "حزم برمجية مفتوحة المصدر (SDKs)",
  "Entity Onboarding Guide": "دليل انضمام الجهات الحكومية",
  "Registrations Open": "التسجيل مفتوح",
  "Abu Dhabi GeoHack 2028": "هاكاثون أبوظبي للبيانات الجيومكانية 2028",
  "Register for GeoHack 2028": "التسجيل في الهاكاثون",

  // Security Console (S14)
  "Security & Access Governance Console": "لوحة حوكمة الأمن والصلاحيات",
  "Unified security command covering UAE sovereign residency, RBAC policy enforcement, active API tokens, and tamper-evident audit logs.": "منظومة أمنية موحدة تطبق متطلبات الإقامة السيادية في الإمارات، وسياسات الصلاحيات RBAC، وإدارة مفاتيح API، وسجلات التدقيق غير القابلة للتعديل.",
  "Sovereign Cloud: Enforced": "السحابة السيادية: مفعّلة ومطبقة",
  "Active API Tokens": "مفاتيح API النشطة",
  "Revoke Token": "إلغاء المفتاح",
  "Generate Token": "إنشاء مفتاح جديد",

  // Developer Portal (S15)
  "Abu Dhabi Geospatial Developer Portal": "بوابة مطوري البيانات المكانية لإمارة أبوظبي",
  "Modern APIs, SDKs, interactive schema explorers, and code examples for building location-intelligent applications.": "واجهات برمجية حديثة، ومكتبات برمجية، ومستعرضات للمخططات، وأمثلة كود جاهزة لبناء تطبيقات ذكية مكانياً.",
  "Interactive API Explorer": "مستكشف واجهات البرمجة التفاعلي",
  "Code Samples": "أمثلة التعليمات البرمجية",
  "API Key Authentication": "المصادقة بمفتاح API",
  "Response Body": "محتوى الاستجابة",
  "Copy Code": "نسخ الكود",
  "Execute Request": "تنفيذ الطلب",

  // Marketplace (S08)
  "Geospatial Marketplace": "سوق البيانات المكانية",
  "Trusted data products, 3D meshes, programmatic APIs, and AI models from government entities and approved private sector partners.": "منتجات بيانات موثوقة، ونماذج ثلاثية الأبعاد، وواجهات برمجية، ونماذج ذكاء اصطناعي من الجهات الحكومية والشركاء المعتمدين.",
  "My Entitlements": "اشتراكاتي وصلاحياتي",
  "Provider Workspace": "مساحة عمل المزود",
  "All Product Types": "جميع أنواع المنتجات",
  "AI outputs": "مخرجات الذكاء الاصطناعي",

  // Sovereign Badges & Footer
  "UAE Sovereign Data Residency": "استضافة سيادية داخل دولة الإمارات",
  "ISO 19115 / FGDS Standard": "معايير FGDS / ISO 19115",
  "Portal Modules": "أقسام البوابة",
  "Governance & Legal": "الحوكمة والسياسات",
  "Privacy Policy": "سياسة الخصوصية",
  "Terms of Service": "شروط الخدمة",
  "Accessibility": "إمكانية الوصول",
  "Open Data Licence": "رخصة البيانات المفتوحة",
  "Contact DGE": "اتصل بنا",

  // Login Screen (S00)
  "Authoritative Geospatial Clearinghouse": "المستودع الجيومكاني المعتمد",
  "Role-Based Secure Access": "وصول آمن مبني على الصلاحيات",
  "Sign in to AD-SDI": "تسجيل الدخول إلى AD-SDI",
  "Enter your government credentials or use UAE PASS single sign-on.": "أدخل بيانات الاعتماد الحكومية أو استخدم الهوية الرقمية UAE PASS.",
  "Sign in with UAE PASS / Government SSO": "الدخول بواسطة UAE PASS / الدخول الموحد",
  "or continue with email": "أو المتابعة بالبريد الإلكتروني",
  "Government Email Address": "البريد الإلكتروني الحكومي",
  "Password": "كلمة المرور",
  "Forgot password?": "نسيت كلمة المرور؟",
  "Remember this government workstation": "تذكر هذا الجهاز الحكومي",
  "Sign in with credentials": "تسجيل الدخول بالبيانات",

  // S03 Dataset Detail Technical Facts & Tabs
  "Abu Dhabi Emirate": "إمارة أبوظبي",
  "412,380 parcels": "412,380 قطعة عقارية",
  "parcels": "قطع عقارية",
  "parcel": "قطعة عقارية",
  "Monthly": "شهرياً",
  "Passed (100%)": "اجتاز بنجاح (100%)",
  "Schema Validation": "التحقق من المخطط",
  "Geometry Integrity": "سلامة المعالم الهندسية",
  "Topology Rules": "قواعد الطوبولوجيا",
  "Attribute Domains": "نطاقات السمات",
  "Spatial Reference": "الإسناد المكاني",
  "Metadata Completeness": "اكتمال البيانات الوصفية",
  "FGDS Cadastre Standard v2.4": "معيار المسح العقاري FGDS v2.4",
  "Zero slivers, zero self-intersections": "خالٍ من المضلعات الضئيلة والتقاطعات الذاتية",
  "Must Not Overlap, Must Not Have Gaps": "عدم التداخل وعدم وجود فجوات",
  "Valid sector & zoning codes": "رموز قطاعات ومناطق صالحة",
  "Strict EPSG:32640 alignment": "مطابقة صارمة لنظام EPSG:32640",
  "All mandatory elements present": "جميع العناصر الإلزامية متوفرة",
  "Representation Type: Vector Polygon": "نوع التمثيل: مضلع شعاعي",
  "Geometric Object Count: 412,380": "عدد الكائنات الهندسية: 412,380",
  "Topological Consistency: Verified by Automated FME Ruleset.": "التناسق الطوبولوجي: تم التحقق بقواعد FME المؤتمتة.",
  "Positional Accuracy: Absolute horizontal accuracy ± 0.05m.": "الدقة الموضعية: دقة أفقية مطلقة ± 0.05 م.",
  "Governing Agreement: Data Sharing Agreement DSA-2027-014": "الاتفاقية الحاكمة: اتفاقية مشاركة البيانات DSA-2027-014",
  "Authorized for official government operations across all 64 contributing Abu Dhabi entities. Approved commercial partners may request subscription access via the AD-SDI Marketplace subject to project verification.": "مصرح للاستخدام في العمليات الحكومية الرسمية لجميع الجهات الـ 64 المساهمة في أبوظبي. يمكن للشركاء التجاريين المعتمدين طلب اشتراك عبر سوق البيانات.",
  "v2027.09 (Current)": "v2027.09 (الحالي)",
  "Monthly cadastral synchronization": "مزامنة شهرية للمسح العقاري",
  "Reem Island parcel boundary adjustment": "تعديل حدود قطع جزيرة الريم",
  "Semi-annual emirate-wide boundary reconciliation": "مطابقة نصف سنوية لحدود الإمارة",
  "Publication Approved": "تم اعتماد النشر",
  "Publication Approved by Khalid M. (DMT Data Steward)": "تم اعتماد النشر بواسطة خالد م. (مشرف بيانات DMT)",
  "Automated Quality Gateway Passed (100%)": "اجتاز بوابة الجودة الآلية (100%)",
  "Geographic Footprint & Interactive Parcel Inspection (Khalifa City)": "النطاق الجغرافي والمعاينة التفاعلية للقطع العقارية (مدينة خليفة)",
  "Click parcel polygon to inspect": "انقر على مضلع القطعة العقارية للمعاينة",
  "Quality Gateway": "بوابة الجودة",

  // S04 Publishing Pipeline
  "Automated Quality Gateway Results": "نتائج بوابة الجودة المؤتمتة",
  "Target Audience": "الجمهور المستهدف",
  "Legal Eligibility": "الأهلية القانونية",
  "DSA Verified": "معتمد بموجب DSA",
  "Confirm Action": "تأكيد الإجراء",
  "Steward Feedback & Modification Notes": "ملاحظات وتعديلات المشرف",
  "Provide specific notes regarding vertex snapping, schema alignment, or justification...": "قدم ملاحظات محددة حول محاذاة النقاط أو مطابقة المخطط أو التبرير...",
  "Upon confirmation, this dataset will be registered into the AD-SDI Clearinghouse with WMS/WFS/OGC endpoints activated for authorized entities.": "عند التأكيد، سيتم تسجيل مجموعة البيانات في مستودع AD-SDI وتفعيل نقاط WMS/WFS/OGC للجهات المصرح لها.",
  "You are performing an action on dataset:": "أنت تقوم بإجراء على مجموعة البيانات:",

  // S05 Quality Dashboard
  "186 Total": "186 الإجمالي",
  "6 cases": "6 حالات",
  "5 cases": "5 حالات",
  "4 cases": "4 حالات",
  "Uptime and p95 latency for OGC Feature and Tile Services": "الجاهزية وزمن استجابة p95 لخدمات معالم وبلاطات OGC",
  "Export SLA CSV": "تصدير تقرير الجودة CSV",
  "Report Downloaded!": "تم تحميل التقرير!",
  "Average Response: 64 ms": "متوسط الاستجابة: 64 مللي ثانية",
  "99.90% SLA Threshold (Red line)": "حد مستوى الخدمة 99.90% (الخط الأحمر)",

  // S06 Change Detection
  "Candidate": "مرشح",
  "Scored": "تم التقييم",
  "In Development": "قيد التطوير",
  "Production": "الإنتاج",
  "Change Detection (Active)": "كشف التغيرات (نشط)",
  "Feature Extraction": "استخراج المعالم",
  "Model Registry": "سجل النماذج",
  "Use Case Pipeline": "مسار حالات الاستخدام",
  "Inference Configuration": "إعدادات الاستنتاج والتحليل",
  "Model Name": "اسم النموذج",
  "Building Change Detection v3.2": "كشف التغيرات العمرانية الإصدار 3.2",
  "Target Use Case": "حالة الاستخدام المستهدفة",
  "New construction monitoring & unpermitted works": "مراقبة الإنشاءات الجديدة والأعمال غير المصرح بها",
  "Study Area": "منطقة الدراسة",
  "Khalifa City – South-West": "مدينة خليفة — الجنوب الغربي",
  "Multi-Temporal Pair": "زوج الصور المتعدد زمنياً",
  "Epoch T1 (Baseline):": "الفترة T1 (خط الأساس):",
  "Epoch T2 (Recent):": "الفترة T2 (الحديثة):",
  "Confidence Cutoff": "حد الثقة الأدنى",
  "Minimum Polygon Area": "الحد الأدنى لمساحة المضلع",
  "Run Change Detection Inference": "تشغيل استنتاج كشف التغيرات",
  "Processing Demonstration Inference...": "جاري معالجة الاستنتاج التجريبي...",
  "Validation Performance": "أداء التحقق والتقييم",
  "Precision": "الدقة (Precision)",
  "Recall": "الاستدعاء (Recall)",
  "F1-Score": "درجة F1",
  "Spatial Comparison View — Khalifa City South-West": "عرض المقارنة المكانية — مدينة خليفة الجنوب الغربي",
  "New (168)": "جديد (168)",
  "Extension (25)": "توسعة (25)",
  "Demolished (21)": "إزالة (21)",
  "New construction": "بناء جديد",
  "Extension": "توسعة",
  "Demolished": "إزالة / هدم",
  "Simulated analysis: 214 changes detected": "التحليل المحاكى: تم رصد 214 تغيراً",
  "Send to Review Queue": "إرسال إلى قائمة المراجعة",
  "Model Card: Building Change Detection v3.2": "بطاقة النموذج: كشف التغيرات العمرانية v3.2",
  "Registry ID": "معرف السجل",
  "Owner": "المالك",
  "Training Samples": "عينات التدريب",
  "14,200 Annotated Tiles": "14,200 بلاطة معلمة",
  "Evaluation Date": "تاريخ التقييم",
  "Governance & Human-in-the-Loop Gate": "الحوكمة وبوابة الإشراف البشري",
  "Drift: Stable. Deployment approved for municipal monitoring. All unpermitted flags require DMT field steward confirmation prior to enforcement actions.": "الانحراف: مستقر. النشر معتمد للمراقبة البلدية. تتطلب جميع الإشارات غير المصرح بها تأكيد مشرف الميدان من DMT قبل اتخاذ إجراءات الإنفاذ.",
  "Close Model Card": "إغلاق بطاقة النموذج",

  // S07 GeoAI Assistant
  "Al Ain Spatial Analysis Legend": "دليل التحليل المكاني لمدينة العين",
  "Identified School Campuses (47)": "المنشآت المدرسية المرصودة (47)",
  "High-Traffic Corridors (>3k veh/hr)": "محاور الحركة الكثيفة (>3 آلاف مركبة/ساعة)",
  "500 m Geographic Buffer Zone": "نطاق الحرم المكاني 500 متر",
  "Ask follow-up spatial question or request export...": "اطرح سؤالاً مكانياً للمتابعة أو اطلب التصدير...",
  "Show schools within 500 m of high-traffic roads in Al Ain and count them by district.": "أظهر المدارس الواقعة ضمن 500 متر من الطرق ذات الكثافة المرورية العالية في العين واعرض أعدادها حسب المناطق.",
  "47 schools in 9 districts are within 500 m of high-traffic roads in Al Ain.": "47 مدرسة في 9 مناطق تقع ضمن مسافة 500 متر من الطرق ذات الحركة المرورية الكثيفة في العين.",
  "Spatial intersection analysis completed against DMT arterial road volumes and ADEK registered educational campuses.": "اكتمل تحليل التقاطع المكاني بناءً على أحجام الطرق الشريانية لـ DMT والمنشآت التعليمية المسجلة لدى ADEK.",
  "Understood natural language intent & spatial bounding box (Al Ain Emirate Sector).": "تم استيعاب الاستعلام اللغوي وتحديد النطاق المكاني لقطاع العين.",
  "Selected authoritative datasets from ADEK and DMT Clearinghouse.": "تم اختيار مجموعات البيانات المعتمدة من مستودع ADEK و DMT.",
  "Generated 500 m geodesic buffer along high-traffic corridors (>3,000 veh/hr).": "تم إنشاء نطاق حرم جغرافي 500 متر حول المحاور الكثيفة (>3,000 مركبة/ساعة).",
  "Point-in-polygon spatial intersection with verified school parcels.": "إجراء تقاطع مكاني للنقاط داخل المضلعات مع قطع المدارس المعتمدة.",
  "Grouped counts and calculated average distance per administrative district.": "تجميع الأعداد وحساب متوسط المسافة لكل منطقة إدارية.",

  // S08 Marketplace
  "All Providers": "جميع المزودين",
  "All Licences": "جميع التراخيص",
  "All Access Models": "جميع نماذج الوصول",
  "Government Entity": "جهة حكومية",
  "Government-only": "حكومي فقط",
  "Commercial": "تجاري",
  "Included": "مشمول ضمن الترخيص",
  "Subscription": "اشتراك",
  "Pay-per-use": "الدفع حسب الاستخدام",
  "View details": "عرض التفاصيل",
  "Product Specification": "مواصفات المنتج",
  "Spatial Product Asset": "أصل منتج مكاني",
  "Inspect": "معاينة",
  "Provider": "الجهة المزودة",
  "Licence Model": "نموذج الترخيص",
  "Coverage": "نطاق التغطية",
  "SLA Commitment": "التزام مستوى الخدمة SLA",
  "Available Access Plans": "باقات الوصول المتاحة",
  "Request Access License": "طلب ترخيص الوصول",
  "Preview Sample Geometry": "معاينة عينة الهندسة المكانية",
  "Zero fees or currency. Access governed by official DSA authorization.": "بدون رسوم مالية. الوصول محكوم باتفاقية مشاركة البيانات الرسمية DSA.",
  "OGC Sample Inspection": "معاينة عينة OGC القياسية",
  "Sample Geometry Preview": "معاينة عينة الهندسة المكانية",
  "Close (Esc)": "إغلاق",
  "Interactive Feature Map": "خريطة المعالم التفاعلية",
  "GeoJSON Payload": "حمولة GeoJSON",
  "Feature Schema": "مخطط المعالم",
  "Copy GeoJSON": "نسخ GeoJSON",
  "Download .geojson": "تحميل .geojson",
  "Selected Polygon Properties": "خصائص المضلع المحدد",
  "Click polygon to inspect properties": "انقر على المضلع لمعاينة الخصائص",
  "Click feature on map to inspect": "انقر على المعلم على الخريطة للمعاينة",

  // S09a Marketplace Request
  "Access Request Application": "طلب الحصول على صلاحية المنتج",
  "Choose Plan": "اختيار الباقة",
  "Purpose & Licence": "الغرض والترخيص",
  "Payment": "طريقة الدفع",
  "Approval": "المراجعة والاعتماد",
  "Step 1: Select Applicable Access Model": "الخطوة 1: اختيار نموذج الوصول المناسب",
  "Select your operational tier. No currency or subscription fees are processed directly online.": "اختر فئة التشغيل. لا يتم تحصيل رسوم مالية أو اشتراكات مباشرة عبر الإنترنت.",
  "Approved Partner Tier": "فئة الشريك المعتمد",
  "Inter-Agency Protocol": "بروتوكول الجهات الحكومية",
  "Step 2: Intended Use & Legal Agreements": "الخطوة 2: الاستخدام المستهدف والاتفاقيات القانونية",
  "Applying Organization": "الجهة المتقدمة بالطلب",
  "Verification Status": "حالة التحقق",
  "Verified Commercial Contractor (AD-SDI Registry)": "مقاول تجاري معتمد (سجل AD-SDI)",
  "Intended Use Classification": "تصنيف الغرض من الاستخدام",
  "Project Description & Scope": "وصف المشروع ونطاق العمل",
  "Expected Monthly Volume": "الحجم الشهري المتوقع للطلبات",
  "I accept the Standard AD-SDI Commercial Spatial Data Licence and agree not to redistribute raw feature geometries.": "أوافق على رخصة البيانات المكانية التجارية الموحدة لـ AD-SDI وأتعهد بعدم إعادة توزيع المعالم الخام.",
  "I acknowledge adherence to Data Sharing Agreement DSA-2027-014 and UAE sovereign data residency provisions.": "أقر بالالتزام باتفاقية مشاركة البيانات DSA-2027-014 وأحكام الإقامة السيادية للبيانات في الإمارات.",
  "Step 3: Verification & Settlement Model": "الخطوة 3: نموذج التحقق والتسوية",
  "Step 4: Custodian Approval Review": "الخطوة 4: مراجعة واعتماد المشرف",
  "Submit Access Application": "إرسال طلب الصلاحية",
  "Application Submitted Successfully!": "تم إرسال الطلب بنجاح!",
  "View In My Entitlements": "عرض في اشتراكاتي",
  "Back to Marketplace": "العودة إلى سوق البيانات",

  // S09b Entitlements
  "My Data Entitlements & API Keys": "اشتراكاتي ومفاتيح واجهات البرمجة API",
  "Active Entitlements": "الاشتراكات النشطة",
  "Pending Approval": "قيد الاعتماد",
  "Monthly Quota Used": "المستهلك من الحصة الشهرية",
  "API Key": "مفتاح API",
  "Usage this month": "الاستهلاك هذا الشهر",
  "Renewal": "التجديد",
  "Copy Key": "نسخ المفتاح",
  "Revoke": "إلغاء",
  "Awaiting Provider Approval": "بانتظار موافقة المزود",
  "Open Access (Perpetual)": "وصول مفتوح (دائم)",

  // S09c Provider Workspace
  "Data Provider Workspace": "مساحة عمل مزود البيانات",
  "Manage published spatial products, monitor API subscriber usage, and configure data licenses.": "إدارة المنتجات المكانية المنشورة، ومتابعة استهلاك المشتركين للواجهات، وتهيئة تراخيص البيانات.",
  "Published Products": "المنتجات المنشورة",
  "Active Subscribers": "المشتركون النشطون",
  "Monthly API Volume": "حجم طلبات API الشهري",
  "New Product Listing": "إدراج منتج جديد",

  // S10 Digital Twin 3D
  "4D Timeline:": "الجدول الزمني 4D:",
  "Shadow Sim": "محاكاة الظلال",
  "Camera View": "زاوية الكاميرا",
  "Isometric 3D": "ثلاثي الأبعاد",
  "Nadir (2D Top)": "مسقط رأسي 2D",
  "Street Level": "مستوى الشارع",
  "Urban Planning": "التخطيط الحضري",
  "Assets & Facilities": "الأصول والمرافق",
  "Mobility & Environment": "التنقل والبيئة",
  "Site Context": "سياق الموقع",
  "Resilience": "المرونة والاستدامة",

  // S11 Command Centre
  "Milestone Delivery": "إنجاز المعالم الرئيسية",
  "Ahead of Baseline": "متقدم عن الخطة",
  "Gates Accepted": "البوابات المعتمدة",
  "Executive Command Centre": "مركز قيادة البرنامج التنفيذي",
  "AD-SDI Implementation Programme 2026–2029": "برنامج تنفيذ البنية التحتية للبيانات المكانية 2026–2029",
  "On Track • Baseline Schedule": "وفق الخطة • الجدول الزمني المعتمد",
  "Gate M2 Review Pack": "حزمة مراجعة البوابة M2",

  // S12 GeoMaturity
  "Emirate GeoMaturity & Workforce Enablement": "النضج الجيومكاني لإمارة أبوظبي وتمكين الكوادر",
  "Entities Assessed": "الجهات المقيمة",
  "100% Emirate Coverage": "تغطية شاملة 100% للإمارة",
  "Average GeoMaturity": "متوسط النضج المكاني",

  // S14 Security Console
  "Security, Classification & Access Governance": "حوكمة الأمان والتصنيف وإدارة الصلاحيات",
  "Pending Requests": "الطلبات المعلقة",
  "Role Matrix": "مصفوفة الأدوار",
  "Data Classification": "تصنيف البيانات",
  "Access Requests Requiring Custodian Action": "طلبات الوصول التي تتطلب إجراء المشرف",
  "Requester": "مقدم الطلب",
  "Purpose": "الغرض",
  "Agreement": "الاتفاقية",
  "Approve Access": "اعتماد الوصول",
  "Deny": "رفض",
  "Audit Log & Immutable Tamper-Evident Ledger": "سجل التدقيق والسجل غير القابل للتعديل",
  "All Events": "جميع الأحداث",
  "Allowed Events": "الأحداث المصرح بها",
  "Blocked Events": "الأحداث المحظورة",
  "User / Identity": "المستخدم / الهوية",
  "Action / Description": "الإجراء / الوصف",
  "Dataset / Resource": "مجموعة البيانات / المورد",
  "Result": "النتيجة",
  "Allowed": "مسموح",
  "Blocked": "محظور",

  // S15 Developer Portal
  "AD-SDI Developer Portal": "بوابة مطوري البيانات المكانية AD-SDI",
  "Interactive API Console": "منصة تجربة الواجهات التفاعلية",
  "Code Snippets": "أمثلة الأكواد البرمجية",
  "API Directory": "دليل واجهات البرمجة",
  "Sandbox Environment": "بيئة الاختبار (Sandbox)",
  "OpenAPI Documentation": "توثيق OpenAPI",
  "All Categories": "جميع الفئات",
  "Vector Features": "المعالم الشعاعية",
  "Map Tiles & Rasters": "بلاطات الخرائط والرواسم",
  "Search & Geocoding": "البحث والعنونة الجغرافية",
  "3D Mesh & BIM": "المجسمات 3D ونماذج BIM",
  "Request Sandbox Key": "طلب مفتاح بيئة الاختبار",
  "Sandbox Key Generated!": "تم إنشاء مفتاح الاختبار بنجاح!",

  // Standalone Map Viewer
  "Hide Layer Panel": "إخفاء لوحة الطبقات",
  "Show Layer Panel": "إظهار لوحة الطبقات",
  "Abu Dhabi Enterprise Map Viewer": "مستعرض الخرائط الجيومكانية المؤسسي لإمارة أبوظبي",
  "Back to Dataset Detail": "العودة إلى تفاصيل البيانات",
  "Map Layers & Catalog": "طبقات الخريطة والفهرس",
  "Global Vector Opacity": "شفافية الطبقات الشعاعية",
  "Feature Inspector": "معاينة خصائص المعلم",
  "Click any feature polygon on the map to inspect properties.": "انقر على أي مضلع معلم على الخريطة لمعاينة خصائصه.",

  // S05 Quality & SLA
  "Quality Gateway - Last 24 Hours": "بوابة الجودة — آخر 24 ساعة",
  "SLA & Availability Trend (Last 90 Days)": "اتجاه مستوى الخدمة والجاهزية (آخر 90 يوماً)",
  "SLA & Availability Trend (Last 30 Days)": "اتجاه مستوى الخدمة والجاهزية (آخر 30 يوماً)",
  "SLA & Availability Trend (Last 7 Days)": "اتجاه مستوى الخدمة والجاهزية (آخر 7 أيام)",
  "Themes x Quality Checks Compliance": "امتثال المجالات × فحوصات الجودة",
  "Cadastre": "الأراضي والمسح العقاري",

  // S06 Change Detection
  "Khalifa City - South-West": "مدينة خليفة — الجنوب الغربي",
  "Jan 2027 (0.5 m)": "يناير 2027 (0.5 م)",
  "Aug 2027 (0.5 m)": "أغسطس 2027 (0.5 م)",
  "Spatial Comparison View - Khalifa City South-West": "عرض المقارنة المكانية — مدينة خليفة الجنوب الغربي",
  "Simulated analysis:": "تحليل محاكاة:",
  "214 changes detected": "214 تغيراً مكتشفاً",
  "Height:": "الارتفاع:",
  "Status:": "الحالة:",
  "Confidence:": "مستوى الثقة:",
  "Model Card (MR-B-007)": "بطاقة النموذج (MR-B-007)",
  "30 Aug 2027": "30 أغسطس 2027",

  // S08 Marketplace
  "Government entity": "جهة حكومية",
  "Approved partner": "شريك معتمد",
  "Interactive Map View": "عرض الخريطة التفاعلية",
  "OGC GeoJSON Payload": "حمولة OGC GeoJSON",
  "Attributes & Schema": "السمات والمخطط الهيكلي",
  "Copy JSON": "نسخ JSON",
  "Click any polygon to inspect spatial attributes": "انقر على أي مضلع لمعاينة السمات المكانية",
  "Feature Schema & Attribute Definitions": "مخطط المعلم وتعريفات السمات",
  "Attribute Name": "اسم السمة",
  "Data Type": "نوع البيانات",
  "FGDS Directives": "توجيهات FGDS",
  "Sample Value": "القيمة النموذجية",
  "Authoritative FGDS Standard": "معيار FGDS المعتمد",
  "Float / Integer": "رقم عشري / صحيح",
  "String / Text": "نص / سلسلة",
  "Selected Feature": "المعلم المحدد",
  "Proceed to Access Request": "المتابعة إلى طلب الوصول",
  "Sample clip adheres to FGDS Spec v2027.09": "تلتزم عينة البيانات بمواصفات FGDS الإصدار v2027.09",
  "Click any polygon on the map to inspect its attributes.": "انقر على أي مضلع على الخريطة لمعاينة سماته.",

  // S09b Entitlements
  "Subscribed Spatial Products & Access Tokens": "المنتجات المكانية المشترك بها ورموز الوصول",
  "Showing 3 licensed products": "عرض 3 منتجات مرخصة",
  "Product & Provider": "المنتج والمزود",
  "Plan Type": "نوع الباقة",
  "API Key Credential": "بيانات اعتماد مفتاح API",
  "Usage this Month": "الاستخدام هذا الشهر",
  "Renews / Validity": "التجديد / الصلاحية",
  "Endpoints": "نقاط الاتصال",
  "Aggregate Monthly API Calls": "إجمالي استدعاءات API الشهرية",
  "Across all subscribed OGC and REST endpoints": "عبر جميع نقاط اتصال OGC و REST المشترك بها",
  "Average Latency (p95)": "متوسط زمن الاستجابة (p95)",
  "Protected by Abu Dhabi Government SLA": "محمي باتفاقية مستوى الخدمة لحكومة أبوظبي",
  "Security Protocol": "بروتوكول الأمان",
  "Encrypted in transit & at rest": "مشفر أثناء النقل وفي حالة السكون",
  "Copy API Token": "نسخ رمز API",
  "Rotate Key": "تدوير المفتاح",
  "1 request awaiting provider approval:": "طلب واحد بانتظار موافقة المزود:",
  "Building Footprints 3D (Department of Municipalities and Transport) is currently under review by Khalid M.": "البصمات ثلاثية الأبعاد للمباني (دائرة البلديات والنقل) قيد المراجعة حالياً من قبل خالد م.",
  "Status: Pending": "الحالة: معلق",

  // Standalone Map Viewer
  "Active Layers (Click to Toggle)": "الطبقات النشطة (انقر للتبديل)",
  "Eastern Mangroves 2027": "أشجار القرم الشرقي 2027",
  "EAD • WFS Vector Layer": "هيئة البيئة (EAD) • طبقة WFS شعاعية",
  "EAD • Marine Sanctuaries": "هيئة البيئة (EAD) • المحميات البحرية",
  "ITC / DMT • GTFS Feeds": "مركز النقل المتكامل / DMT • تغذيات GTFS",
  "DMT • Khalifa City Fabric": "دائرة البلديات والنقل • نسيج مدينة خليفة",
  "Feature Inspection": "معاينة خصائص المعلم",
  "Click any vector feature on the map to inspect its attributes.": "انقر على أي معلم شعاعي على الخريطة لمعاينة خصائصه.",
};

// Common month mappings for dates
const MONTH_MAP: Record<string, string> = {
  'January': 'يناير',
  'February': 'فبراير',
  'March': 'مارس',
  'April': 'أبريل',
  'May': 'مايو',
  'June': 'يونيو',
  'July': 'يوليو',
  'August': 'أغسطس',
  'September': 'سبتمبر',
  'October': 'أكتوبر',
  'November': 'نوفمبر',
  'December': 'ديسمبر',
  'Jan': 'يناير',
  'Feb': 'فبراير',
  'Mar': 'مارس',
  'Apr': 'أبريل',
  'Jun': 'يونيو',
  'Jul': 'يوليو',
  'Aug': 'أغسطس',
  'Sep': 'سبتمبر',
  'Oct': 'أكتوبر',
  'Nov': 'نوفمبر',
  'Dec': 'ديسمبر',
};

// Check if string contains Arabic characters
export const hasArabic = (text: string): boolean => {
  return /[\u0600-\u06FF\u0750-\u077F]/.test(text);
};

// Check if string contains Latin words that need translation
export const hasLatinWords = (text: string): boolean => {
  return /[a-zA-Z]/.test(text);
};

// Normalize dashes and collapse multiple spaces/newlines to single space for resilient matching
const normalizeSpacesAndDashes = (str: string): string => {
  return str.replace(/[\u2013\u2014]/g, '-').replace(/\s+/g, ' ').trim();
};

// Pre-sorted dictionary keys by length in descending order so longer phrases always match first
const SORTED_PHRASES = Object.keys(EXACT_PHRASE_DICTIONARY).sort((a, b) => b.length - a.length);

// Translate any text string using the dictionary, exact patterns, or partial matching
export const translateToAr = (text: string): string => {
  if (!text) return text;
  const trimmed = text.trim();
  if (!trimmed || trimmed.length <= 1) return text;

  // If purely numeric or punctuation/symbols, keep it
  if (/^[0-9\s.,:%/\\()\-–—_#$€+]+$/.test(trimmed)) return text;

  // If already completely in Arabic and has NO Latin words, no need to touch it
  if (!hasLatinWords(trimmed) && hasArabic(trimmed)) return text;

  // 1. Exact phrase lookup
  if (EXACT_PHRASE_DICTIONARY[trimmed]) {
    return text.replace(trimmed, EXACT_PHRASE_DICTIONARY[trimmed]);
  }

  // 2. Dash & whitespace normalized lookup
  const cleanTrimmed = normalizeSpacesAndDashes(trimmed);
  if (EXACT_PHRASE_DICTIONARY[cleanTrimmed]) {
    return text.replace(trimmed, EXACT_PHRASE_DICTIONARY[cleanTrimmed]);
  }

  for (const key of SORTED_PHRASES) {
    if (normalizeSpacesAndDashes(key) === cleanTrimmed) {
      return text.replace(trimmed, EXACT_PHRASE_DICTIONARY[key]);
    }
  }

  // 3. Case-insensitive normalized lookup
  const lowerTrimmed = cleanTrimmed.toLowerCase();
  for (const key of SORTED_PHRASES) {
    if (normalizeSpacesAndDashes(key).toLowerCase() === lowerTrimmed) {
      return text.replace(trimmed, EXACT_PHRASE_DICTIONARY[key]);
    }
  }

  // 4. Dynamic patterns (Dates, time ago, counts)
  let result = trimmed;

  // e.g. "Scenario: 14 September 2027"
  if (result.startsWith('Scenario: ')) {
    const rest = result.replace('Scenario: ', '');
    return text.replace(trimmed, `السيناريو: ${translateToAr(rest)}`);
  }

  // e.g. "Updated 28 Aug 2027" or "تحديث 28 Aug 2027"
  if (/^(?:Updated\s+|تحديث\s+)/i.test(result)) {
    const datePart = result.replace(/^(?:Updated\s+|تحديث\s+)/i, '');
    let arDate = datePart;
    for (const [mEn, mAr] of Object.entries(MONTH_MAP)) {
      arDate = arDate.replace(new RegExp(`\\b${mEn}\\b`, 'gi'), mAr);
    }
    return text.replace(trimmed, `تحديث ${arDate}`);
  }

  // Standalone date e.g. "28 Aug 2027" or "14 September 2027"
  for (const [mEn, mAr] of Object.entries(MONTH_MAP)) {
    const dateRegex1 = new RegExp(`(\\d{1,2}\\s+)${mEn}(\\s+\\d{4})`, 'gi');
    if (dateRegex1.test(result)) {
      result = result.replace(dateRegex1, `$1${mAr}$2`);
    }
    const dateRegex2 = new RegExp(`\\b${mEn}\\b`, 'gi');
    if (dateRegex2.test(result) && /\b\d{4}\b/.test(result)) {
      result = result.replace(dateRegex2, mAr);
    }
  }

  // e.g. "2 hours ago" / "1 day ago"
  if (/^(\d+)\s+hours?\s+ago$/i.test(result)) {
    const match = result.match(/^(\d+)\s+hours?\s+ago$/i);
    const n = match ? match[1] : '1';
    return text.replace(trimmed, n === '1' ? 'منذ ساعة' : n === '2' ? 'منذ ساعتين' : `منذ ${n} ساعات`);
  }
  if (/^(\d+)\s+days?\s+ago$/i.test(result)) {
    const match = result.match(/^(\d+)\s+days?\s+ago$/i);
    const n = match ? match[1] : '1';
    return text.replace(trimmed, n === '1' ? 'منذ يوم واحد' : n === '2' ? 'منذ يومين' : `منذ ${n} أيام`);
  }

  // e.g. "datasets found"
  if (/^datasets found$/i.test(result)) {
    return text.replace(trimmed, 'مجموعة بيانات متوفرة');
  }

  // e.g. "2,480 datasets found" or "12 datasets found"
  if (/(\d[\d,]*)\s+datasets found/i.test(result)) {
    result = result.replace(/(\d[\d,]*)\s+datasets found/i, '$1 مجموعة بيانات متوفرة');
  }

  // e.g. "for \"mangrove\""
  if (/for\s+"([^"]+)"/i.test(result)) {
    result = result.replace(/for\s+"([^"]+)"/i, 'لـ "$1"');
  }

  // e.g. "214 changes detected"
  if (/(\d+)\s+changes detected/i.test(result)) {
    result = result.replace(/(\d+)\s+changes detected/i, '$1 تغيراً مكتشفاً');
  }

  // e.g. "186 Total"
  if (/(\d+)\s+Total/i.test(result)) {
    result = result.replace(/(\d+)\s+Total/i, '$1 إجمالي');
  }

  // e.g. "6 cases" or "5 cases"
  if (/(\d+)\s+cases/i.test(result)) {
    result = result.replace(/(\d+)\s+cases/i, '$1 حالات');
  }

  // e.g. "Zoom 12"
  if (/^Zoom\s+(\d+)$/i.test(result)) {
    return text.replace(trimmed, `مستوى التكبير ${result.replace(/^Zoom\s+/i, '')}`);
  }

  // e.g. "Showing 3 licensed products"
  if (/Showing\s+(\d+)\s+licensed products/i.test(result)) {
    result = result.replace(/Showing\s+(\d+)\s+licensed products/i, 'عرض $1 منتجات مرخصة');
  }

  // 5. Match longer multi-word phrases inside larger sentences
  // We use SORTED_PHRASES so longer specific entity phrases match first before single words!
  for (const enPhrase of SORTED_PHRASES) {
    if (enPhrase.length >= 3 && hasWordMatch(result, enPhrase)) {
      const arPhrase = EXACT_PHRASE_DICTIONARY[enPhrase];
      result = replaceWord(result, enPhrase, arPhrase);
    }
  }

  return text.replace(trimmed, result);
};

const hasWordMatch = (text: string, phrase: string): boolean => {
  // If phrase has punctuation or special chars, do simple includes
  if (/[^a-zA-Z0-9\s]/.test(phrase)) {
    return text.toLowerCase().includes(phrase.toLowerCase());
  }
  // Otherwise match word boundary
  const reg = new RegExp(`\\b${escapeRegExp(phrase)}\\b`, 'i');
  return reg.test(text);
};

const replaceWord = (text: string, phrase: string, replacement: string): string => {
  if (/[^a-zA-Z0-9\s]/.test(phrase)) {
    return text.replace(new RegExp(escapeRegExp(phrase), 'gi'), replacement);
  }
  return text.replace(new RegExp(`\\b${escapeRegExp(phrase)}\\b`, 'gi'), replacement);
};

const escapeRegExp = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
