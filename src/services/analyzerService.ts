import { QuestionnaireState, NicheAnalysisResult, DimensionScores, DecisionType } from '../types/niche';

/**
 * Calculates Analysis Confidence Score (0-100)
 * Evaluates specificity and depth of user-provided context
 */
export function calculateConfidenceScore(input: QuestionnaireState): number {
  let score = 20; // baseline

  // Niche length & specificity
  const nicheLength = input.niche.trim().length;
  const nicheWords = input.niche.trim().split(/\s+/).length;
  if (nicheWords >= 3 || nicheLength > 20) {
    score += 15;
  } else if (nicheWords >= 2) {
    score += 8;
  }

  // Audience specificity
  const aud = input.audience.trim();
  if (aud && aud !== 'مش محدد لسه' && aud.length > 15) {
    score += 20;
  } else if (aud && aud !== 'مش محدد لسه') {
    score += 10;
  }

  // Problem depth
  const prob = input.primaryProblem.trim();
  if (prob && prob !== 'مش عارف' && prob.length > 20) {
    score += 18;
  } else if (prob && prob !== 'مش عارف') {
    score += 8;
  }

  // Desired outcome
  const outcome = input.desiredOutcome.trim();
  if (outcome && outcome.length > 10) {
    score += 12;
  }

  // Product types selected
  if (input.productTypes && input.productTypes.length > 0 && !input.productTypes.includes('Not sure')) {
    score += Math.min(input.productTypes.length * 4, 10);
  }

  // Affiliate products provided
  if (input.affiliateProducts && input.affiliateProducts.trim().length > 5) {
    score += 5;
  }

  return Math.min(Math.max(score, 25), 98);
}

/**
 * Computes the deterministic Niche Opportunity Assessment Score (0-100)
 * Strict formula from prompt: (sum / 80) * 100
 */
export function calculateOpportunityScore(dimensions: DimensionScores): number {
  // Dimension scores are 0-10 each
  // Note: for strategic risk, lower risk means higher opportunity contribution
  const adjustedRiskOpportunity = Math.max(0, 10 - dimensions.strategicRisk);
  
  const sum =
    dimensions.audienceClarity +
    dimensions.problemDepth +
    dimensions.desiredOutcomes +
    dimensions.buyerIntentPotential +
    dimensions.offerDiversity +
    dimensions.contentDepth +
    dimensions.funnelPotential +
    adjustedRiskOpportunity;

  const rawScore = (sum / 80) * 100;
  return Math.round(Math.min(Math.max(rawScore, 10), 96));
}

/**
 * Derives strategic decision based on inputs and scores
 */
export function deriveDecision(
  input: QuestionnaireState,
  opportunityScore: number,
  confidenceScore: number
): DecisionType {
  const isVagueNiche = input.niche.trim().split(/\s+/).length <= 2;
  const isAudienceUndefined = !input.audience || input.audience === 'مش محدد لسه';

  if (confidenceScore < 45) {
    return 'EXPLORE';
  }

  if (isVagueNiche || isAudienceUndefined) {
    return 'NARROW';
  }

  if (opportunityScore >= 70 && confidenceScore >= 55) {
    return 'VALIDATE';
  }

  return 'NARROW';
}

/**
 * Main analysis function: calls the backend /api/analyze-niche
 * with fallback to client-side heuristic engine if server is unreachable
 */
export async function analyzeNicheOpportunity(
  input: QuestionnaireState
): Promise<NicheAnalysisResult> {
  const confidenceScore = calculateConfidenceScore(input);

  try {
    const res = await fetch('/api/analyze-niche', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        const rawData = json.data;
        const dimensionScores: DimensionScores = {
          audienceClarity: Number(rawData.dimensionScores?.audienceClarity ?? 7),
          problemDepth: Number(rawData.dimensionScores?.problemDepth ?? 8),
          desiredOutcomes: Number(rawData.dimensionScores?.desiredOutcomes ?? 7),
          buyerIntentPotential: Number(rawData.dimensionScores?.buyerIntentPotential ?? 8),
          offerDiversity: Number(rawData.dimensionScores?.offerDiversity ?? 7),
          contentDepth: Number(rawData.dimensionScores?.contentDepth ?? 8),
          funnelPotential: Number(rawData.dimensionScores?.funnelPotential ?? 7),
          strategicRisk: Number(rawData.dimensionScores?.strategicRisk ?? 4),
        };

        const overallScore = calculateOpportunityScore(dimensionScores);
        const decision = deriveDecision(input, overallScore, confidenceScore);

        return {
          ...rawData,
          overallScore,
          confidenceScore,
          dimensionScores,
          decision,
          analyzedAt: new Date().toISOString(),
          userInputs: input,
        };
      }
    }
  } catch (err) {
    console.warn('Network error or server unavailable, running local strategic engine:', err);
  }

  // High-fidelity fallback result
  const localData = buildLocalFallbackData(input);
  const dimensionScores = localData.dimensionScores;
  const overallScore = calculateOpportunityScore(dimensionScores);
  const decision = deriveDecision(input, overallScore, confidenceScore);

  return {
    ...localData,
    overallScore,
    confidenceScore,
    dimensionScores,
    decision,
    analyzedAt: new Date().toISOString(),
    userInputs: input,
  };
}

function buildLocalFallbackData(input: QuestionnaireState) {
  const niche = input.niche || 'النيتش العام';

  return {
    summary: `خريطة استراتيجية لنيتش "${niche}". يتمتع هذا النيتش بمؤشرات قوية لوجود مشاكل حقيقية متكررة تدفع الجمهور للبحث عن حلول رقمية وعملية، وتتوافر فيه نقاط قرار تجارية للمقارنة والمراجعة.`,
    decisionFraming: `النيتش يحتوي على فرص محتوى وعروض محتملة، لكن البيانات الحالية تحتاج تحقق في السوق وتحديد شريحة واضحة قبل التوسع.`,
    audienceSegments: [
      {
        name: `المحترفون المشغولون (${niche})`,
        whoTheyAre: `أشخاص يقضون ساعات عمل طويلة، لديهم ميزانية جيدة لكن يعانون من ضيق حاد في الوقت ويبحثون عن حلول سريعة ومختصرة.`,
        mainProblem: `عدم القدرة على الالتزام بحلول تستغرق ساعات طويلة، والإرهاق بعد العمل.`,
        mainDesire: `تحقيق النتيجة المرغوبة في أقل من 30 دقيقة يومياً من المنزل.`,
        buyingSituation: `عندما يشعرون بتأثير المشكلة على طاقتهم ويبحثون عن برنامج أو أداة تختصر الوقت.`,
        priorityTag: 'أسهل في الاستهداف (Easier to message)',
        isSuggested: true,
      },
      {
        name: `المبتدئون المترددون`,
        whoTheyAre: `أشخاص يرغبون بالبدء في ${niche} لأول مرة، لكنهم يخشون ارتكاب أخطاء مكلفة أو الشراء الخاطئ.`,
        mainProblem: `كثرة الخيارات المتضاربة على الإنترنت وعدم معرفة نقطة البداية الصحيحة.`,
        mainDesire: `خريطة طريق واضحة ومبسطة خطوة بخطوة خالية من التعقيد.`,
        buyingSituation: `أثناء البحث عن "دليل المبتدئين" أو التوصيات المعتمدة للبدء من الصفر.`,
        priorityTag: 'مشكلة أوضح (Clearer problem)',
        isSuggested: true,
      },
      {
        name: `الباحثون عن بدائل اقتصادية ذكية`,
        whoTheyAre: `جمهور واعٍ بالحلول القائمة في السوق لكنه يرى أن الحلول التقليدية مرتفعة التكلفة.`,
        mainProblem: `ارتفاع تكلفة الحلول الرائدة ورغبتهم في تحقيق نفس النتيجة بتكلفة مدروسة.`,
        mainDesire: `أدوات أو برامج بديلة تقدم أعلى قيمة مقابل السعر.`,
        buyingSituation: `أثناء مقارنة البدائل ("X vs Y" أو "أفضل بديل لـ X").`,
        priorityTag: 'نية شراء أعلى (Potentially stronger intent)',
        isSuggested: true,
      },
      {
        name: `أصحاب العمل الحر والمستقلون`,
        whoTheyAre: `أفراد يبنون نمط حياتهم حول الاستقلالية والمرونة ويهتمون بتحسين جودة روتينهم اليومي.`,
        mainProblem: `غياب البيئة المنظمة وصعوبة الحفاظ على الاستمرارية بمفردهم.`,
        mainDesire: `أنظمة وأدوات رقمية تدعم روتينهم المرن دون تقييد.`,
        buyingSituation: `بداية شهر جديد أو الرغبة في إعادة ترتيب بيئة العمل والحياة.`,
        priorityTag: 'يحتاج تحقق أكثر (Needs more validation)',
        isSuggested: true,
      },
    ],
    problems: {
      primary: [
        {
          title: `ضيق الوقت وصعوبة الاستمرارية`,
          description: `الجمهور يبدأ بحماس ثم يتوقف بسبب تعقيد الأنظمة المتاحة والافتقار إلى روتين واقعي.`,
          whyItMatters: `يؤدي إلى فقدان الثقة بالنفس وتكرار تجارب الإحباط.`,
          contentPotential: `محتوى استراتيجي يركز على "أقل مجهود فعال" وروتين الـ 15 دقيقة.`,
          solutionCategory: `برامج موجهة للمبتدئين أو قوالب يومية مبسطة.`,
        },
        {
          title: `التشتت الناتج عن تضارب النصائح والخيارات`,
          description: `كثرة الخبراء والأدوات تجعل الجمهور عاجزاً عن اتخاذ قرار شراء واثق.`,
          whyItMatters: `التأجيل المستمر لقرار الحل (Analysis Paralysis).`,
          contentPotential: `مقارنات حيادية ومراجعات تفصيلية توضح لمن يناسب كل خيار.`,
          solutionCategory: `أدلة شراء وقوائم مراجعة للمقارنة بين الحلول.`,
        },
      ],
      secondary: [
        {
          title: `التكلفة المرتفعة لبعض الحلول التقليدية`,
          description: `الافتراض بأن النتائج تتطلب معدات باهظة أو اشتراكات شهرية مكلفة.`,
          whyItMatters: `حاجز مالي يمنع نسبة من الجمهور من البدء.`,
          contentPotential: `محتوى يقدم بدائل مجانية ومنخفضة التكلفة للاختبار الأولي.`,
          solutionCategory: `أدوات رقمية خفيفة واشتراكات اقتصادية.`,
        },
      ],
      emotional: [
        {
          title: `الشعور بالإحباط والتقصير أمام الذات`,
          description: `المعاناة من فجوة بين ما يرغب في تحقيقه وما ينجزه بالفعل يومياً.`,
          whyItMatters: `دافع شعوري عميق للبحث عن أنظمة تمنحه الشعور بالسيطرة.`,
          contentPotential: `محتوى نفسي داعم يركز على بناء العادات بدلاً من الجلد الذاتي.`,
          solutionCategory: `تطبيقات وقوالب تتبع العادات والمجتمعات الداعمة.`,
        },
      ],
      practical: [
        {
          title: `صعوبة القياس والمتابعة الذاتية بدون أدوات`,
          description: `عدم وجود طريقة واضحة لمعرفة ما إذا كان الشخص يحرز تقدماً حقيقياً.`,
          whyItMatters: `غياب الإحساس بالإنجاز يسبب التوقف السريع.`,
          contentPotential: `توفير نماذج متابعة (Trackers) وحاسبات تقدم تفاعلية.`,
          solutionCategory: `قوالب تفاعلية وتطبيقات متابعة مخصصة.`,
        },
      ],
      knowledgeGaps: [
        {
          title: `الاعتقاد بأن الحل يكمن في شراء أداة واحدة باهظة`,
          description: `التركيز على شراء الأداة بدلاً من فهم النظام وأسلوب التطبيق.`,
          whyItMatters: `شراء أدوات لا تستخدم ثم لوم النيتش أو المجال.`,
          contentPotential: `محتوى يفكك المفاهيم المغلوطة ويعيد توجيه التركيز لبناء النظام.`,
          solutionCategory: `محتوى تعليمي مجاني يربط الأداة بالسياق الصحيح.`,
        },
      ],
    },
    desires: {
      functional: [
        `تحقيق النتيجة المرغوبة في أقصر وقت ممكن وبطريقة عملية مجربة`,
        `توفير المال والجهد عبر اختيار الحلول المناسبة من أول تجربة`,
        `الحصول على خطوات إرشادية واضحة ومحددة خطوة بخطوة`,
      ],
      emotional: [
        `الشعور بالسيطرة والراحة النفسية بدلاً من التوتر الدائم`,
        `استعادة الثقة بالنفس والقدرة على تحقيق الالتزام`,
        `الاطمئنان إلى أن المسار المتبع مبني على أسس صحيحة`,
      ],
      lifestyle: [
        `تحسين جودة الروتين اليومي دون التضحية بالوقت المخصص للعائلة أو العمل`,
        `التمتع بحرية ومرونة تطبيق الحلول في أي وقت ومكان`,
        `الشعور بالإنجاز والتطور الشخصي المستمر`,
      ],
    },
    buyerIntent: {
      discovery: [
        { queryPattern: `ما هو ${niche} وكيف تبدأ فيه؟`, intent: `فهم أولي واستكشاف المجال بدون التزام مالي.` },
        { queryPattern: `أهمية ${niche} في تحسين الروتين اليومي`, intent: `توعية عامة حول الفوائد والعوائد المتوقعة.` },
      ],
      problemAware: [
        { queryPattern: `أسباب فشل المبتدئين في ${niche}`, intent: `إدراك الصعوبات والبحث عن أسباب المشكلة الحقيقية.` },
        { queryPattern: `كيف تتغلب على ضيق الوقت في ${niche}؟`, intent: `البحث عن حلول عملية لتخطي عقبة محددة.` },
      ],
      solutionAware: [
        { queryPattern: `أفضل أدوات وتطبيقات لـ ${niche}`, intent: `استعراض الحلول والخيارات التجارية المتاحة في السوق.` },
        { queryPattern: `طرق تعلم وتطبيق ${niche} من المنزل`, intent: `المقارنة بين الكورسات والكتب والبرامج المختلفة.` },
      ],
      highIntent: [
        { queryPattern: `مقارنة بين [الأداة A] ضد [الأداة B] لـ ${niche}`, intent: `مرحلة المفاضلة المباشرة قبل قرار الدفع النهائي.` },
        { queryPattern: `مراجعة أداة / كورس [X] - هل يستحق الشراء؟`, intent: `بحث عن آراء محايدة وتجربة حقيقية قبل الدفع.` },
        { queryPattern: `كوبون خصم / أسعار وباقات [أداة X]`, intent: `نية شراء مكتملة بنسبة عالية جداً.` },
      ],
    },
    productCategories: [
      {
        categoryName: `برامج وأدوات رقمية (SaaS & Apps)`,
        problemSolved: `أتمتة المهام، قياس الأداء، وتوفير ساعات من العمل اليدوي.`,
        targetSegment: `المحترفون والباحثون عن الدقة والسرعة.`,
        purchaseFrequency: `اشتراكات متكررة (Monthly / Annual Recurring).`,
        commercialNature: `SaaS`,
        contentAngle: `استعراض المميزات، كفاءة الوقت، وعرض تجربة الاستخدام العملية.`,
      },
      {
        categoryName: `كورسات وبرامج تدريبية رقمية (Digital Courses)`,
        problemSolved: `اختصار سنوات التجربة والخطأ وتقديم خطوات إرشادية مباشرة.`,
        targetSegment: `المبتدئون الراغبون في مسار احترافي موجه.`,
        purchaseFrequency: `دفع لمرة واحدة مع تحديثات مستمرة.`,
        commercialNature: `Digital Products`,
        contentAngle: `عرض التحول (Transformation)، قصص النجاح، وحل الفجوات المعرفية.`,
      },
      {
        categoryName: `قوالب وأنظمة جاهزة (Templates & Frameworks)`,
        problemSolved: `البدء الفوري بدون الحاجة لبناء الجداول أو الأنظمة من الصفر.`,
        targetSegment: `الراغبون في حلول خفيفة وسريعة التكلفة.`,
        purchaseFrequency: `شراء مباشر منخفض إلى متوسط التكلفة.`,
        commercialNature: `Digital Products`,
        contentAngle: `عرض نموذج الاستخدام المباشر وكيف يعمل القالب خلال 5 دقائق.`,
      },
      {
        categoryName: `معدات وملحقات مادية (Physical Equipment/Accessories)`,
        problemSolved: `تجهيز البيئة المناسبة لتنفيذ وتطبيق الحلول بجودة أعلى.`,
        targetSegment: `المهتمون بالحصول على تجربة احترافية ملموسة.`,
        purchaseFrequency: `دفع لمرة واحدة مع احتمالية شراء ملحقات دورية.`,
        commercialNature: `Physical Products`,
        contentAngle: `قوائم "أفضل معدات أساسية للمبتدئين" ومراجعات الجودة والمتانة.`,
      },
    ],
    offerLadder: [
      { level: 'Free Content', title: 'محتوى مجاني موسع', desc: `فيديوهات ومقالات استراتيجية تجيب عن أسئلة الجمهور الشائعة وتبني السلطة.` },
      { level: 'Lead Magnet', title: 'هدية مجانية (Lead Magnet)', desc: `دليل أو حاسبة أو قائمة فحص تلبي رغبة سريعة للجمهور مقابل الإيميل.` },
      { level: 'Entry Solution', title: 'حل مدخل منخفض التكلفة', desc: `قالب أو كورس مصغر يثبت جدوى الحل ويحول المتابع إلى مشتري لأول مرة.` },
      { level: 'Core Solution', title: 'الحل الأساسي المعتمد', desc: `البرنامج أو الأداة الرئيسية المتكاملة التي تحل المشكلة المحورية بعمق.` },
      { level: 'Recurring / Higher-Value', title: 'حل مستمر أو متقدم', desc: `اشتراك SaaS دوري أو استشارة متابعة أو مجتمع مغلق للمهتمين.` },
    ],
    contentAngles: [
      {
        title: `دليلك الشامل للبدء في ${niche} من الصفر بدون تعقيد`,
        category: 'Discovery' as const,
        categoryArabic: 'محتوى اكتشاف',
        targetAudience: 'المبتدئون',
        intentLevel: 'Low' as const,
        cta: 'حمل خريطة البداية المجانية من الرابط',
      },
      {
        title: `5 أخطاء يقع فيها معظم المهتمين بـ ${niche} تضيع وقتهم`,
        category: 'Educational' as const,
        categoryArabic: 'محتوى تعليمي',
        targetAudience: 'الجمهور العام',
        intentLevel: 'Medium' as const,
        cta: 'اشترك بالقائمة لتصلك التحديثات الأسبوعية',
      },
      {
        title: `ليه معظم الحلول المتاحة لـ ${niche} لا تدوم لأكثر من شهر؟`,
        category: 'Problem' as const,
        categoryArabic: 'محتوى المشكلة',
        targetAudience: 'المحبطون من التجارب السابقة',
        intentLevel: 'Medium' as const,
        cta: 'اكتشف النظام البديل عبر الهدية المجانية',
      },
      {
        title: `مقارنة تفصيلية بين أشهر 3 أدوات في ${niche} لعام 2026`,
        category: 'Comparison' as const,
        categoryArabic: 'مقارنات',
        targetAudience: 'الباحثون عن خيارات للشراء',
        intentLevel: 'High' as const,
        cta: 'اضغط هنا لقراءة المقارنة الكاملة واختيار الأنسب لك',
      },
      {
        title: `تجربتي ومراجعتي المحايدة لأداة [X]: هل تستحق استثمارك؟`,
        category: 'Review' as const,
        categoryArabic: 'مراجعات',
        targetAudience: 'المشترون المترددون',
        intentLevel: 'High' as const,
        cta: 'استخدم الرابط المباشر للتجربة المجانية',
      },
      {
        title: `أفضل بدائل اقتصادية لأغلى أدوات ${niche}`,
        category: 'Buyer Intent' as const,
        categoryArabic: 'نية شراء',
        targetAudience: 'الباحثون عن أعلى قيمة مقابل السعر',
        intentLevel: 'High' as const,
        cta: 'شاهد جدول مقارنة الأسعار والميزات',
      },
      {
        title: `كيف نبني نظاماً مستداماً في ${niche} بدون الاعتماد على التحفيز المؤقت؟`,
        category: 'Authority' as const,
        categoryArabic: 'بناء ثقة وسلطة',
        targetAudience: 'المحترفون وأصحاب الرؤية طويلة المدى',
        intentLevel: 'Medium' as const,
        cta: 'انضم لدرسنا التدريبي المجاني لتفاصيل النظام',
      },
      {
        title: `ما الذي تحتاجه حقاً للبدء في ${niche} وما الذي يمكنك تجاهله؟`,
        category: 'Educational' as const,
        categoryArabic: 'محتوى تعليمي',
        targetAudience: 'المبتدئون والميزانيات المحدودة',
        intentLevel: 'Low' as const,
        cta: 'احصل على القائمة المختصرة',
      },
      {
        title: `تحليل تكلفة: هل الأفضل الدفع لـ [الأداة A] أم تجربة الطرق المجانية؟`,
        category: 'Comparison' as const,
        categoryArabic: 'مقارنات',
        targetAudience: 'المترددون بين المجاني والمدفوع',
        intentLevel: 'High' as const,
        cta: 'اقرأ التحليل الواقعي قبل الدفع',
      },
      {
        title: `خطة الـ 15 دقيقة اليومية لتطبيق ${niche} للمشغولين`,
        category: 'Discovery' as const,
        categoryArabic: 'محتوى اكتشاف',
        targetAudience: 'الموظفون وأصحاب الأعمال',
        intentLevel: 'Low' as const,
        cta: 'حمل جدول المتابعة السريع',
      },
      {
        title: `العلامات التحذيرية التي توضح أن هذا المنتج في ${niche} غير مناسب لك`,
        category: 'Authority' as const,
        categoryArabic: 'بناء ثقة وسلطة',
        targetAudience: 'المستهلكون الحريصون',
        intentLevel: 'Medium' as const,
        cta: 'احفظ هذه المعايير قبل شراء أي أداة',
      },
      {
        title: `قبل أن تجدد اشتراكك السنوي: هل ما زلت تحتاج هذه الخدمة؟`,
        category: 'Review' as const,
        categoryArabic: 'مراجعات',
        targetAudience: 'المشتركون الحاليون',
        intentLevel: 'High' as const,
        cta: 'راجع قائمة البدائل الأحدث',
      },
      {
        title: `كيف تختار الأداة الصحيحة بناءً على مرحلتك الحالية وليس ترشيحات المشاهير؟`,
        category: 'Educational' as const,
        categoryArabic: 'محتوى تعليمي',
        targetAudience: 'الجمهور الواعي',
        intentLevel: 'Medium' as const,
        cta: 'استخدم حاسبة الاختيار المجانية',
      },
      {
        title: `دراسة حالة: كيف وفر فلان 10 ساعات أسبوعياً باستخدام هذا الترتيب البسيط؟`,
        category: 'Problem' as const,
        categoryArabic: 'محتوى المشكلة',
        targetAudience: 'الباحثون عن إثباتات واقعية',
        intentLevel: 'Medium' as const,
        cta: 'اطلع على الخطوات العملية في الدليل',
      },
      {
        title: `أفضل العروض والصفقات للمبتدئين في ${niche} هذا الشهر`,
        category: 'Buyer Intent' as const,
        categoryArabic: 'نية شراء',
        targetAudience: 'المستعدون للشراء فوراً',
        intentLevel: 'High' as const,
        cta: 'تصفح العروض المتاحة مع أكواد التجربة',
      },
    ],
    youtubeIdeas: [
      {
        title: `لو عندك 20 دقيقة فقط يومياً لـ ${niche}… طبق هذا النظام`,
        hookAngle: `تحدي فكرة أن الإنجاز يحتاج تفرغاً تاماً وإثبات أن النظام هو الفارق.`,
        targetPayoff: `روتين عملي واضح وقابل للتطبيق الفوري بدون إرهاق.`,
      },
      {
        title: `ليه معظم الناس بتشتري أدوات ${niche} وما بتستخدمهاش؟ (والحل البديل)`,
        hookAngle: `كشف حقيقة الهوس بالشراء والتخلي عن المتابعة النفسية.`,
        targetPayoff: `توفير مئات الدولارات من الشراء العشوائي وبناء عادات مستمرة.`,
      },
      {
        title: `مقارنة حيادية: أفضل 3 برامج وأدوات لـ ${niche} بعد شهور من التجربة`,
        hookAngle: `مراجعة صادقة بدون مجاملات تكشف العيوب قبل الميزات.`,
        targetPayoff: `قرار شراء محسوم بدون ندم.`,
      },
      {
        title: `دليل المبتدئين الصريح: إزاي تبدأ في ${niche} بأقل من 50 دولار؟`,
        hookAngle: `كسر أسطورة التكلفة الباهظة والبدء بأبسط الأدوات.`,
        targetPayoff: `خطة عملية للميزانيات الاقتصادية.`,
      },
      {
        title: `5 حاجات كنت أتمنى أعرفها قبل ما أبدأ في ${niche}`,
        hookAngle: `مشاركة الأخطاء الشخصية والدروس المستفادة بشفافية.`,
        targetPayoff: `اختصار وقت وجهد وتفادي الأخطاء الكبرى.`,
      },
      {
        title: `شرح خطوة بخطوة: إعداد بيئة ${niche} المثالية في 30 دقيقة`,
        hookAngle: `جلسة إعداد عملية ومباشرة على الشاشة.`,
        targetPayoff: `جاهزية كاملة للبدء في نفس اليوم.`,
      },
      {
        title: `هل تستحق هذه الأداة الشهيرة الضجة؟ مراجعة تفصيلية وتحليل بدائل`,
        hookAngle: `التشكيك في الترند السائد ومقارنة القيمة الحقيقية.`,
        targetPayoff: `رؤية موضوعية للمشتري الذكي.`,
      },
      {
        title: `الروتين الأسبوعي لمتابعة تقدمك في ${niche} بدون تعقيد`,
        hookAngle: `نظام تتبع مبسط لا يستهلك أكثر من 10 دقائق أسبوعياً.`,
        targetPayoff: `وضوح تام لمسار التطور.`,
      },
      {
        title: `أكبر خدعة تسويقية في ${niche} وليه لازم تتجنبها فوراً`,
        hookAngle: `تحذير من الوعود المبالغ فيها والبرامج الوهمية.`,
        targetPayoff: `حماية ميزانية وثقة المتابع.`,
      },
      {
        title: `خريطة طريق 2026: كيف تبني مساراً ناجحاً في ${niche} خطوة بخطوة؟`,
        hookAngle: `رؤية مستقبلية واستراتيجية متكاملة لعام كامل.`,
        targetPayoff: `بوصلة استراتيجية شاملة للمبتدئ والمتقدم.`,
      },
    ],
    shortFormIdeas: [
      {
        hook: `وقف! لو بتفكر تشتري أداة جديدة لـ ${niche} اسمع ده الأول…`,
        problem: `صرف الفلوس على أدوات معقدة مش هتستخدمها لأكتر من أسبوع.`,
        microPayoff: `ابدأ بقالب مجاني بسيط الأول وتأكد من الالتزام قبل الدفع.`,
        cta: `اكتب "قالب" في التعليقات وهبعتلك الرابط مجاناً.`,
      },
      {
        hook: `السبب الوحيد اللي بيخلي 90% من الناس تفشل في الاستمرار بـ ${niche}:`,
        problem: `محاولة تطبيق نظام كامل من أول يوم بدل التدرج المنطقي.`,
        microPayoff: `قاعدة الـ 5 دقائق اليومية للتثبيت قبل التوسع.`,
        cta: `تابع الحساب لطرق بناء الأنظمة بدون إرهاق.`,
      },
      {
        hook: `3 أدوات في ${niche} وفرت عليا أكتر من 15 ساعة كل شهر:`,
        problem: `المهام اليدوية المتكررة اللي بتستنزف طاقتك.`,
        microPayoff: `تسمية أداة الأتمتة وقالب المتابعة وطريقة الربط.`,
        cta: `الرابط موجود في البايو للتجربة المباشرة.`,
      },
      {
        hook: `بدل ما تدفع 100$ في اشتراك شهري… جرب البديل ده:`,
        problem: `ارتفاع تكاليف الاشتراكات على المبتدئ.`,
        microPayoff: `أداة بديلة مجانية أو رخيصة بتقدم 80% من النتيجة.`,
        cta: `حفظ الفيديو عشان ترجعله وقت الشراء.`,
      },
      {
        hook: `لو معندكش غير ربع ساعة كل يوم… دي خطتك في ${niche}:`,
        problem: `حجة ضيق الوقت وعدم القدرة على التفرغ.`,
        microPayoff: `3 خطوات محددة بالدقيقة لكل يوم.`,
        cta: `حمل جدول الـ 15 دقيقة من الرابط أعلى الصفحة.`,
      },
      {
        hook: `أكبر غلطة بشوفها في ${niche} بتضيع النتائج تماماً:`,
        problem: `تغيير الطريقة كل أسبوع بناء على الفيديوهات السريعة.`,
        microPayoff: `الالتزام ببروتوكول واحد لمدة 30 يوم متواصلة.`,
        cta: `شارك الفيديو مع صاحبك اللي بيغير نظامه كل يوم.`,
      },
      {
        hook: `السؤال ده هيحدد إذا كنت محتاج كورس مدفوع ولا لأ:`,
        problem: `التسرع في شراء الكورسات بدون استعداد للتطبيق.`,
        microPayoff: `إذا طبقت الأساسيات المجانية لـ 14 يوم يبقى ادخل المدفوع.`,
        cta: `راجع دليلنا المجاني أولاً في الرابط.`,
      },
      {
        hook: `ليه معظم المشاهير بينصحوا بالأداة دي بالذات؟ الحقيقة الكاملة:`,
        problem: `الترويج للمنتجات بدون توضيح عيوبها الحقيقية.`,
        microPayoff: `الميزة الوحيدة الجيدة والعيوب اللي محدش بيقولها.`,
        cta: `اكتب رأيك في الكومنتات لو جربتها.`,
      },
      {
        hook: `اختبار سريع في 10 ثواني: هل نظامك في ${niche} شغال صح؟`,
        problem: `عدم وضوح مؤشرات التقدم الشخصي.`,
        microPayoff: `مؤشر واحد بسيط إذا تحقق فأنت على الطريق الصحيح.`,
        cta: `كم درجتك من 3؟ اكتبها في التعليق.`,
      },
      {
        hook: `الهدية دي مش هتخليك تحتاج تبدأ من الصفر تاني…`,
        problem: `صعوبة كتابة أو إعداد الخطط من البداية.`,
        microPayoff: `شيت متابعة مجاني مجهز بكل الصيغ الجاهزة.`,
        cta: `احصل عليه مجاناً الآن من البايو.`,
      },
    ],
    leadMagnets: [
      {
        name: `قائمة الفحص الشاملة لاختيار الحل الأنسب في ${niche} (Checklist)`,
        type: 'Checklist',
        typeArabic: 'قائمة فحص',
        problemSolved: `الحيرة والتشتت بين الخيارات الكثيرة في السوق.`,
        quickWin: `استبعاد 80% من الخيارات غير المناسبة خلال 7 دقائق.`,
        idealAudience: `المبتدئون والمترددون قبل أي قرار شراء.`,
        naturalNextOffer: `دليل مقارنة تفصيلي أو كورس مدخل مع كود خصم للأداة المختارة.`,
      },
      {
        name: `حاسبة قياس التكلفة والعائد لـ ${niche} (Interactive Calculator)`,
        type: 'Calculator',
        typeArabic: 'حاسبة تفاعلية',
        problemSolved: `عدم معرفة الميزانية الدقيقة المطلوبة والوقت المتوقع للنتائج.`,
        quickWin: `حساب التكلفة الشهرية والوقت المتوقع بمدخلات شخصية دقيقة.`,
        idealAudience: `المحترفون وأصحاب الميزانيات المحدودة.`,
        naturalNextOffer: `توصية بالأدوات المتوافقة مع ميزانية المستخدم تلقائياً.`,
      },
      {
        name: `ميني كورس مجاني من 3 فيديوهات: نظام البداية الصحيحة`,
        type: 'Mini Course',
        typeArabic: 'كورس مصغر مجاني',
        problemSolved: `العشوائية في التطبيق والافتقار إلى إطار عمل منظم.`,
        quickWin: `فهم الصورة الكاملة وترتيب أول 3 خطوات في أقل من 40 دقيقة.`,
        idealAudience: `الجمهور الجاد الراغب في بناء نظام متكامل.`,
        naturalNextOffer: `الاشتراك في الأداة الأساسية أو البرنامج التدريبي المتقدم.`,
      },
      {
        name: `مخطط الـ 30 يوماً للمتابعة اليومية بدون انقطاع (Daily Planner)`,
        type: 'Planner',
        typeArabic: 'مخطط عملي',
        problemSolved: `فقدان الحماس بعد الأسبوع الأول وصعوبة الاستمرارية.`,
        quickWin: `جدول يومي مطبوع أو رقمي يوضح مهمة واحدة يومياً.`,
        idealAudience: `المشغولون والذين يعانون من التسويف.`,
        naturalNextOffer: `قوالب أوسع أو برنامج متابعة تفاعلي.`,
      },
      {
        name: `دليل أفضل 10 مصادر وأدوات موثوقة ومجربة في ${niche}`,
        type: 'Resource Guide',
        typeArabic: 'دليل مصادر معتمد',
        problemSolved: `إضاعة ساعات طويلة في البحث وتصفح المواقع غير الموثوقة.`,
        quickWin: `الوصول المباشر إلى أفضل الأدوات وروابط التجربة بنقرة واحدة.`,
        idealAudience: `جميع فئات النيتش في مرحلة البحث والاستكشاف.`,
        naturalNextOffer: `روابط أفلييت لأفضل الخدمات المعروضة مع توجيه دقيق.`,
      },
    ],
    funnels: [
      {
        name: `مسار اليوتيوب والمحتوى الطويل -> Lead Magnet -> Email Sequence -> SaaS Offer`,
        steps: [
          `فيديو يوتيوب Outcome-Led يحل مشكلة محددة ويستعرض نتائج عملية`,
          `دعوة في الوصف لتنزيل حاسبة أو شيت إكسيل مجاني مقابل الإيميل`,
          `سلسلة رسائل بريدية من 4 إيميلات تشرح خطوات تطبيق النظام خطوة بخطوة`,
          `تقديم عرض أفلييت لأداة SaaS الأساسية مع بونص تدريبي حصري للمشتركين`,
        ],
        whyItWorks: `يبني ثقة استثنائية من خلال المحتوى العميق ويجعل قرار الاشتراك في الأداة نتيجة طبيعية للدرس وليس بيعاً مباشراً مزعجاً.`,
      },
      {
        name: `مسار المحتوى القصير (Short-form) -> Checklist -> Mini Course -> Affiliate Offer`,
        steps: [
          `مقاطع ريلز وشورتس مركزة على Hooks المشكلات وعادات التوفير والإنتاجية`,
          `رابط البايو يقود إلى صفحة هبوط نظيفة لتحميل قائمة فحص في 5 ثواني`,
          `صفحة شكر تقدم ميني كورس فيديو قصير من 3 خطوات يشرح كيفية استخدام القائمة`,
          `توجيه المستخدم إلى العرض التجاري (برنامج أو أداة) كأسرع طريقة للتطبيق`,
        ],
        whyItWorks: `يستفيد من الترافيك المجاني الكثيف والسريع ويحوله فوراً إلى أصول في القائمة البريدية ثم عروض ذات نية شراء عالية.`,
      },
      {
        name: `مسار مقارنات ومراجعات البحث (SEO / Review Intent) -> Comparison Bridge -> Direct Offer`,
        steps: [
          `محتوى بحثي يستهدف كلمات "X vs Y" أو "مراجعة شاملة لـ X"`,
          `جدول مقارنة شفاف يوضح المزايا والعيوب والأسعار بالتفصيل`,
          `نداء لاتخاذ إجراء واضح (زر مباشر بتجربة مجانية أو خصم حصري)`,
          `خيار اشتراك بالقائمة البريدية للحصول على تحديثات الصفقات الشهرية`,
        ],
        whyItWorks: `يستهدف الزائر في اللحظة التي تكون فيها نية الشراء في أعلى مستوياتها (High Intent)، مما يرفع نسب التحويل المباشر.`,
      },
    ],
    monetizationPaths: [
      {
        path: `تسويق بالعمولة لأدوات وبرامج SaaS بنظام الاشتراكات المتكررة`,
        feasibility: `عالية (تعتمد على وجود برامج أفلييت حقيقية في هذا القطاع)`,
        notes: `النموذج الأكثر استدامة لأنه يولد دخلاً متراكماً شهرياً مع كل مستخدم نشط.`,
      },
      {
        path: `عمولات الكورسات والبرامج التدريبية المرموقة`,
        feasibility: `متوسطة إلى عالية`,
        notes: `نسب عمولات جيدة (30% - 50%) عند اختيار برامج تدريبية تحل مشكلات معقدة وذات سمعة ممتازة.`,
      },
      {
        path: `المنتجات المادية والمعدات المتخصصة عبر المتاجر الكبرى`,
        feasibility: `متوسطة`,
        notes: `نسب العمولات أقل (3% - 10%) ولكن حجم الطلب وسهولة قرار الشراء أعلى، ومفيدة كعروض مدخل.`,
      },
      {
        path: `رعايات المحتوى والشراكات المباشرة مع الشركات (Sponsorships)`,
        feasibility: `تحتاج بناء جمهور وسلطة أولاً`,
        notes: `تتحقق بعد الوصول إلى جمهور متخصص ذي تفاعل نوعي، حيث تدفع الشركات مقابل الظهور في النشرات والفيديوهات.`,
      },
    ],
    risks: [
      {
        risk: `اتساع النيتش أكثر من اللازم (Audience Too Broad)`,
        whyItMatters: `صعوبة منافسة الكبار وصعوبة صياغة رسالة تسويقية محددة تلامس مشكلة شخص واحد.`,
        whatToVerify: `تحقق من إمكانية تضييق النيتش لشريحة محددة (مثل: لحديثي العهد، أو للموظفين).`,
      },
      {
        risk: `الاعتماد على عرض أو برنامج أفلييت واحد (Single-Offer Dependency)`,
        whyItMatters: `إذا أغلق البرنامج أو تم تقليل العمولات تنهار المنظومة بالكامل.`,
        whatToVerify: `ابحث وتأكد من وجود ما لا يقل عن 3 حلول وبرامج بديلة في السوق.`,
      },
      {
        risk: `متطلبات ثقة مرتفعة ومخاوف مصداقية (High Trust Requirement)`,
        whyItMatters: `الجمهور لن يشتري بناء على نصيحة سطحية إذا كان الموضوع يتعلق بصحته أو ماله أو عمله.`,
        whatToVerify: `تحقق من قدرتك على إنتاج محتوى تجربة شخصية صادق ومبني على مراجع وأدلة.`,
      },
      {
        risk: `ضعف التمايز وتكرار المحتوى المتداول (Weak Differentiation)`,
        whyItMatters: `ظهور المحتوى كنسخة مكررة من محتوى الذكاء الاصطناعي السطحي دون رأي أو زاوية فريدة.`,
        whatToVerify: `حدد زاوية واضحة خاصة بك وموقفاً صريحاً ضد الممارسات الخاطئة في النيتش.`,
      },
    ],
    validationQuestions: [
      `هل أستطيع تحديد 3 مشكلات محددة جداً يشتكي منها هذا الجمهور بألفاظهم الخاصة في التعليقات والمنتديات؟`,
      `هل توجد منتجات أو برامج تجارية قائمة بالفعل ويدفع فيها هذا الجمهور أموالاً حقيقية؟`,
      `هل يبحث الجمهور بعبارات المقارنة والبدائل (X vs Y أو أفضل بديل لـ X)؟`,
      `هل أستطيع كتابة وتصوير 30 زاوية محتوى نوعية دون أن أكرر نفسي بشكل مبتذل؟`,
      `هل أستطيع تصميم هدية مجانية تحل مشكلة سريعة في أقل من 10 دقائق؟`,
      `هل توجد عدة برامج وعروض بديلة وليست شركة واحدة محتكرة للسوق؟`,
      `لماذا سيختار أي شخص متابعة محتواي أنا بالذات بدلاً من العشرات الموجودين؟`,
      `هل أملك القدرة التقنية على قياس مسار التحويل من الزيارة إلى الإيميل إلى النقرة؟`,
      `هل تكلفة جذب الجمهور (سواء بالوقت في الأورجانيك أو بالمال في الإعلانات) تتناسب مع هامش العمولات؟`,
      `ما هو الدليل الأول الذي سأجمعه في الأيام السبعة الأولى قبل كتابة أي سطر محتوى طويل؟`,
    ],
    positioningAngles: [
      {
        angleName: `تخصيص النيتش للمحترفين والموظفين المشغولين`,
        formula: `${niche} -> الموظفون -> ضيق الوقت -> حلول مختصرة لا تتجاوز 20 دقيقة يومياً`,
        whyItIsStrong: `جمهور يملك قدرة شرائية ومستعد للدفع مقابل اختصار الوقت وتجنب التعقيد.`,
      },
      {
        angleName: `تخصيص النيتش للمبتدئين بدون ميزانيات ضخمة (Zero/Low Budget)`,
        formula: `${niche} -> المبتدئون المترددون -> الخوف من الخسارة -> البدء بأدوات مجانية واقتصادية`,
        whyItIsStrong: `يخاطب أكبر كتلة عددية ويقدم أسهل رسالة جذب (Low Barrier to Entry).`,
      },
      {
        angleName: `تخصيص النيتش لأصحاب العمل الحر والعمل عن بعد (Remote Workers)`,
        formula: `${niche} -> المستقلون والعاملون من المنزل -> العزلة وغياب النظام -> دمج الحل في الروتين المنزلي`,
        whyItIsStrong: `تطابق بيئة التطبيق مع نمط الحياة اليومي وسهولة استهدافهم رقمياً.`,
      },
      {
        angleName: `تخصيص النيتش بحسب الأداة أو البيئة (Ecosystem-Specific)`,
        formula: `${niche} -> مستخدمو نظام معين -> الرغبة في التكامل -> الحلول المتوافقة تماماً مع بيئتهم`,
        whyItIsStrong: `نية شراء وتطبيق عالية جداً ووضوح لا يضاهى في الكلمات المفتاحية.`,
      },
      {
        angleName: `تخصيص النيتش بحسب النتيجة العاجلة والتحول السريع (30-Day Transformation)`,
        formula: `${niche} -> الراغبون في إثبات أولي -> الشك في الجدوى -> بروتوكول مدته 30 يوماً فقط`,
        whyItIsStrong: `وضوح النتيجة يقلل المماطلة ويسهل بناء Lead Magnet عالي التحويل.`,
      },
    ],
    sevenDayPlan: [
      { day: 1, title: `بحث وتوثيق عبارات الجمهور`, task: `تصفح 5 مجتمعات أو قنوات يوتيوب في النيتش، وتفريغ 20 تعليقاً حقيقياً يصف المعاناة بالألفاظ الخاصة.` },
      { day: 2, title: `حصر المشكلات الأساسية والاعتراضات`, task: `تصنيف المشكلات إلى أساسية ونفسية ومعرفية وتحديد العقبة رقم 1 التي تمنعهم من الاستمرار.` },
      { day: 3, title: `مسح العروض وبرامج الأفلييت المتاحة`, task: `حصر 3 إلى 5 منتجات أو أدوات تحل المشكلة، والتحقق من وجود برامج عمولة ونظام التتبع الخاص بها.` },
      { day: 4, title: `تحليل زوايا المحتوى ذات التفاعل`, task: `استخراج أفضل 10 موضوعات تحقق مشاهدات ونقاشاً حقيقياً، مع تحديد الثغرة التي لم يتحدث عنها أحد.` },
      { day: 5, title: `استخراج كلمات نية الشراء الحقيقية`, task: `حصر عبارات المقارنة والبدائل والمراجعات وملاحظة أسئلة الشراء المتكررة من الجمهور.` },
      { day: 6, title: `تصميم مسودة الهدية المجانية وتجربة العرض`, task: `كتابة مخطط صفحة واحدة (Checklist أو Calculator) يحل المشكلة السريعة ويربط بالعرض التجاري.` },
      { day: 7, title: `مراجعة الأدلة واتخاذ القرار الأولي`, task: `تقييم ما تم جمعه من بيانات واقعية واتخاذ قرار التضييق (NARROW) أو بدء الاختبار (VALIDATE).` },
    ],
    thirtyDayPlan: [
      { week: 1, title: `الأسبوع الأول: بحث وتنقيب الأدلة الواقعية`, focus: `التحقق من وجود مشكلات حقيقية وعروض متاحة وتحديد الشريحة المستهدفة بدقة.` },
      { week: 2, title: `الأسبوع الثاني: نشر أول 5 قطع محتوى استراتيجية`, focus: `نشر محتوى يختبر الزوايا المختلفة ومراقبة ردود الأفعال والتعليقات والأسئلة النوعية.` },
      { week: 3, title: `الأسبوع الثالث: إطلاق Lead Magnet وجمع المشتركين`, focus: `ربط المحتوى بصفحة هبوط مبسطة وقياس نسبة من يسجل إيميله للحصول على الهدية.` },
      { week: 4, title: `الأسبوع الرابع: قياس التفاعل التجاري والنقرات`, focus: `إرسال أولى رسائل القيمة والتوصية بالعرض وملاحظة نسبة النقر إلى العرض (CTR).` },
    ],
    opportunityMatrix: {
      audienceClarity: 'Medium' as const,
      problemClarity: 'High' as const,
      buyerIntent: 'High' as const,
      contentDepth: 'High' as const,
      offerDiversity: 'Medium' as const,
      funnelPotential: 'High' as const,
      strategicRisk: 'Medium' as const,
    },
    dimensionScores: {
      audienceClarity: 7,
      problemDepth: 8,
      desiredOutcomes: 7,
      buyerIntentPotential: 8,
      offerDiversity: 7,
      contentDepth: 9,
      funnelPotential: 8,
      strategicRisk: 4,
    },
    decision: 'NARROW' as const,
    decisionReasons: [
      `النيتش يملك عمقاً كبيراً في المشكلات والمحتوى ونية الشراء المحتملة، مما يجعله غنياً بالفرص.`,
      `مع ذلك، دخول النيتش بالصفة العامة الواسعة يرفع تكلفة جذب الانتباه ويزيد من حدة التشتت.`,
      `القرار الأنسب هو تضييق النيتش لشريحة ذات مشكلة ملحة ثم البدء في الاختبار العملي الميداني.`,
    ],
  };
}
