export const BRAND_CONFIG = {
  brandName: 'Mohamed Adel',
  appTitleAr: 'محلل فرص النيتش',
  appTitleEn: 'NICHE OPPORTUNITY ANALYZER',
  brandSloganAr: 'التسويق بالعمولة نظام… مش رابط.',
  brandSloganEn: 'Affiliate Marketing Is a System, Not a Link.',
  
  // Centralized URL for the 3-video mini course.
  // If empty, the CTA button is disabled and displays the fallback notice.
  MINI_COURSE_URL: 'https://affiliate-mini-course.mohamdadel.com/waitlist',

  // Example niches for quick exploration
  defaultNicheExamples: [
    { label: 'Home Fitness', ar: 'لياقة منزلية للمشغولين' },
    { label: 'AI Tools', ar: 'أدوات الذكاء الاصطناعي للإنتاجية' },
    { label: 'Dog Training', ar: 'تدريب الكلاب للمبتدئين' },
    { label: 'English Learning', ar: 'تعلم الإنجليزية للمحترفين' },
    { label: 'Personal Finance', ar: 'الإدارة المالية للمستقلين' },
    { label: 'Skincare', ar: 'العناية بالبشرة بدون تعقيد' },
    { label: 'Productivity', ar: 'أنظمة الإنتاجية وإدارة الوقت' },
    { label: 'Remote Work', ar: 'أدوات ونمط العمل عن بعد' },
  ],

  // 8 Dimensions definition
  dimensions: [
    { key: 'audienceClarity', labelAr: 'وضوح الجمهور', labelEn: 'Audience Clarity', desc: 'إمكانية تحديد شرائح محددة وفهم احتياجاتها بوضوح' },
    { key: 'problemDepth', labelAr: 'عمق المشكلات', labelEn: 'Problem Depth', desc: 'وجود مشكلات متكررة وحقيقية تخلق رغبة ملحة للحل' },
    { key: 'desiredOutcomes', labelAr: 'وضوح النتائج المرغوبة', labelEn: 'Desired Outcomes', desc: 'تحديد النتيجة النهائية بدقة وإمكانية ربط العروض بها' },
    { key: 'buyerIntentPotential', labelAr: 'إمكانية نية الشراء', labelEn: 'Buyer Intent Potential', desc: 'وجود لحظات مقارنة ومراجعة طبيعية قبل قرار الشراء' },
    { key: 'offerDiversity', labelAr: 'تنوع العروض المحتملة', labelEn: 'Offer Diversity', desc: 'تعدد فئات الحلول (برامج، كورسات، اشتراكات، قوالب)' },
    { key: 'contentDepth', labelAr: 'عمق المحتوى', labelEn: 'Content Depth', desc: 'قدرة النيتش على توليد 30+ زاوية محتوى تعليمي ومقارنات' },
    { key: 'funnelPotential', labelAr: 'فرص بناء مسار تحويل', labelEn: 'Funnel Potential', desc: 'إمكانية بناء Lead Magnet وتحويل الانتباه لعملاء' },
    { key: 'strategicRisk', labelAr: 'المخاطر الاستراتيجية', labelEn: 'Strategic Risk', desc: 'تقييم اتساع النيتش، صعوبة التمايز، ومتطلبات الثقة' },
  ],

  // Decisions
  decisions: {
    EXPLORE: {
      key: 'EXPLORE',
      labelAr: 'استكشف أكثر',
      labelEn: 'EXPLORE',
      color: '#797979',
      borderClass: 'border-[#797979]',
      bgClass: 'bg-[#797979]/10',
      description: 'المعلومات الحالية قليلة أو عامة للغاية. لا ينصح باستثمار الوقت في إنتاج المحتوى قبل استكشاف السوق وجمع بيانات أعمق.'
    },
    NARROW: {
      key: 'NARROW',
      labelAr: 'ضيّق النيتش',
      labelEn: 'NARROW',
      color: '#F5BF1E',
      borderClass: 'border-[#F5BF1E]',
      bgClass: 'bg-[#F5BF1E]/10',
      description: 'النيتش واسع والفرصة حقيقية لكنها تحتاج إلى تضييق لشريحة محددة ومشكلة مركزة لتسهيل التمايز وتقليل تكلفة جذب الجمهور.'
    },
    VALIDATE: {
      key: 'VALIDATE',
      labelAr: 'اختبر النيتش',
      labelEn: 'VALIDATE',
      color: '#FBD052',
      borderClass: 'border-[#FBD052]',
      bgClass: 'bg-[#FBD052]/15',
      description: 'الهيكل الاستراتيجي واضح (جمهور + مشكلة + نية شراء + عروض). النيتش جاهز للاختبار العملي بنشر محتوى أولي وقياس ردود الأفعال.'
    }
  },

  // R.B.T.L.S Framework
  rbtls: [
    { letter: 'R', wordEn: 'Research', wordAr: 'ابحث', active: true, desc: 'تحليل النيتش ورسم الخريطة وفهم المشكلات (موقع هذه الأداة)' },
    { letter: 'B', wordEn: 'Build', wordAr: 'ابنِ', active: false, desc: 'بناء الـ Lead Magnet ومسار التحويل والصفحات' },
    { letter: 'T', wordEn: 'Traffic', wordAr: 'اجلب الترافيك', active: false, desc: 'إنتاج المحتوى الاستراتيجي وإطلاق قنوات الترافيك' },
    { letter: 'L', wordEn: 'Learn', wordAr: 'تعلم', active: false, desc: 'قراءة الأرقام، نسب التحويل، وملاحظات المشترين' },
    { letter: 'S', wordEn: 'Scale', wordAr: 'وسّع', active: false, desc: 'مضاعفة ما نجح وتوسيع القنوات والعروض التراكمية' }
  ],

  // Colors
  colors: {
    bgPrimary: '#040405',
    warmBlack: '#23170D',
    darkBronze: '#4A2F15',
    goldPrimary: '#F5BF1E',
    goldLight: '#FBD052',
    goldDeep: '#A7690C',
    textPrimary: '#FCFCFA',
    textSecondary: '#C8C5BA',
    textMuted: '#797979'
  }
};
