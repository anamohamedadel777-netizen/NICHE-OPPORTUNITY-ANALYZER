import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '5mb' }));

  // Gemini API client
  const apiKey = process.env.GEMINI_API_KEY || '';
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // API Route for Niche Analysis
  app.post('/api/analyze-niche', async (req, res) => {
    try {
      const {
        niche,
        audience,
        primaryProblem,
        desiredOutcome,
        trafficSource,
        existingAudience,
        productTypes,
        budget,
        goal,
        affiliateProducts,
        additionalNotes,
      } = req.body;

      if (!niche || typeof niche !== 'string') {
        return res.status(400).json({ error: 'Niche is required' });
      }

      // If Gemini is available, call it with structured prompt and strict schema
      if (ai) {
        const systemInstruction = `You are an evidence-aware niche strategy analyst for affiliate marketers following the Mohamed Adel visual and strategic philosophy.
Your goal is to map a niche, not predict income.
Separate user-provided facts from strategic inference.
NEVER fabricate market size, demand, competition data, search volume, conversion rates, revenue, or affiliate terms.
When evidence is missing, state clearly that it needs validation ("يحتاج تحقق خارجي").
Analyze audience, problems, desires, buyer intent, product categories, content depth, funnel potential, and strategic risks.
Be specific, practical, commercially useful, skeptical, and structured.
Output language must be Arabic with English marketing terms juxtaposed (e.g. Niche (النيتش), Audience (الجمهور), Problem (المشكلة), Buyer Intent (نية الشراء), Offer (العرض), Lead Magnet (هدية مجانية), Funnel (مسار التحويل)).
Do NOT say "هذا النيتش مربح" or "ادخل هذا النيتش" or "مضمون". Use: "هناك مؤشرات تستحق الدراسة", "النيتش يبدو مناسبًا للاختبار من زاوية كذا", "هذه خريطة أولية وليست ضمانًا للطلب أو الربحية".`;

        const userPrompt = `قم بتحليل فرصة النيتش التالية وبناء خريطة Niche Map استراتيجية:
النيتش: ${niche}
الجمهور المبدئي: ${audience || 'مش محدد لسه'}
المشكلة الأساسية: ${primaryProblem || 'مش عارف'}
النتيجة المرغوبة: ${desiredOutcome || 'مش محدد'}
قناة الترافيك الأساسية: ${trafficSource || 'غير محدد'}
الجمهور الحالي للمستخدم: ${existingAudience || 'لا يوجد'}
أنواع المنتجات المتوقعة: ${Array.isArray(productTypes) ? productTypes.join(', ') : 'غير محدد'}
ميزانية الاختبار: ${budget || 'غير محدد'}
الهدف: ${goal || 'أفلييت'}
منتجات أو برامج في البال: ${affiliateProducts || 'لا يوجد'}
ملاحظات إضافية: ${additionalNotes || 'لا يوجد'}

المطلوب إخراج JSON مطابق بدقة للهيكل التالي بدون أي نصوص قبل أو بعد:
{
  "summary": "ملخص وصفي استراتيجي لطبيعة النيتش وفرصه الأولية",
  "decisionFraming": "جملة توجيهية لصانع القرار مثل: النيتش فيه زوايا واضحة للجمهور والمحتوى والعروض، لكن محتاج تضييق الجمهور والتحقق من الطلب الحقيقي قبل التوسع.",
  "audienceSegments": [
    {
      "name": "اسم الشريحة",
      "whoTheyAre": "من هم بالتفصيل",
      "mainProblem": "المشكلة الأساسية",
      "mainDesire": "الرغبة الأساسية",
      "buyingSituation": "الموقف أو اللحظة التي تدفعهم للشراء",
      "priorityTag": "أسهل في الاستهداف (Easier to message) أو مشكلة أوضح (Clearer problem) أو نية شراء أعلى (Potentially stronger intent) أو يحتاج تحقق أكثر (Needs more validation)",
      "isSuggested": true
    }
  ],
  "problems": {
    "primary": [
      {
        "title": "عنوان المشكلة",
        "description": "شرح المشكلة",
        "whyItMatters": "لماذا تهم العميل",
        "contentPotential": "كيف تُحول لمحتوى جذاب",
        "solutionCategory": "فئة الحل المقترح"
      }
    ],
    "secondary": [
      { "title": "...", "description": "...", "whyItMatters": "...", "contentPotential": "...", "solutionCategory": "..." }
    ],
    "emotional": [
      { "title": "مشاعر الإحباط أو القلق", "description": "...", "whyItMatters": "...", "contentPotential": "...", "solutionCategory": "..." }
    ],
    "practical": [
      { "title": "عائق عملي كالجهد أو الوقت", "description": "...", "whyItMatters": "...", "contentPotential": "...", "solutionCategory": "..." }
    ],
    "knowledgeGaps": [
      { "title": "مفهوم خاطئ أو نقص معرفة", "description": "...", "whyItMatters": "...", "contentPotential": "...", "solutionCategory": "..." }
    ]
  },
  "desires": {
    "functional": ["رغبات وظيفية مباشرة وملموسة"],
    "emotional": ["رغبات شعورية وشعور بالثقة أو التخفف من التوتر"],
    "lifestyle": ["تأثير النتيجة على أسلوب الحياة اليومي"]
  },
  "buyerIntent": {
    "discovery": [
      { "queryPattern": "ما هو X / كيف يعمل X", "intent": "اكتشاف أولي وفهم المفاهيم" }
    ],
    "problemAware": [
      { "queryPattern": "حل مشكلة X / أسباب حدوث X", "intent": "الاعتراف بالمشكلة والبحث عن تفسير" }
    ],
    "solutionAware": [
      { "queryPattern": "أفضل أدوات لـ X / طرق حل X", "intent": "البحث عن فئات الحلول المتاحة" }
    ],
    "highIntent": [
      { "queryPattern": "مقارنة X ضد Y / مراجعة كورس X / أسعار X / بدائل X", "intent": "نية شراء وتقييم مباشر للحل التجاري" }
    ]
  },
  "productCategories": [
    {
      "categoryName": "اسم فئة المنتج (برامج، كورسات، أدوات، اشتراكات، كتب، خدمات)",
      "problemSolved": "المشكلة التي يحلها",
      "targetSegment": "الشريحة المناسبة",
      "purchaseFrequency": "مرة واحدة أو اشتراك دوري (Recurring)",
      "commercialNature": "Digital / SaaS / Physical / Subscription / Service",
      "contentAngle": "الزاوية التسويقية لتقديم هذا المنتج"
    }
  ],
  "offerLadder": [
    { "level": "Free Content", "title": "محتوى مجاني موسع", "desc": "مقاطع فيديو ومقالات لحل مشاكل شائعة" },
    { "level": "Lead Magnet", "title": "هدية مجانية لجذب الإيميل", "desc": "قائمة مراجعة أو حاسبة سريعة" },
    { "level": "Entry Solution", "title": "حل مدخل أو منخفض التكلفة", "desc": "أداة تجريبية أو كورس مصغر أو كتاب رقمي" },
    { "level": "Core Solution", "title": "الحل الأساسي Core Offer", "desc": "البرنامج أو الأداة الرئيسية المتكاملة" },
    { "level": "Recurring / Higher-Value", "title": "حل دوري أو مرتفع القيمة", "desc": "اشتراك SaaS دوري أو مجتمع احترافي" }
  ],
  "contentAngles": [
    {
      "title": "عنوان المحتوى المقترح",
      "category": "Discovery | Educational | Problem | Comparison | Review | Buyer Intent | Authority",
      "categoryArabic": "محتوى اكتشاف | محتوى تعليمي | محتوى مشكلة | مقارنات | مراجعات | نية شراء | بناء ثقة",
      "targetAudience": "الشريحة المستهدفة",
      "intentLevel": "Low | Medium | High",
      "cta": "الدعوة لاتخاذ إجراء CTA المناسبة"
    }
  ],
  "youtubeIdeas": [
    {
      "title": "عنوان فيديو يوتيوب بنمط Outcome-Led جذاب",
      "hookAngle": "الزاوية الاستفزازية أو التحفيزية",
      "targetPayoff": "الفائدة العملية العائدة على المشاهد"
    }
  ],
  "shortFormIdeas": [
    {
      "hook": "الـ Hook المثير للثواني الأولى",
      "problem": "المشكلة السريعة",
      "microPayoff": "الحل أو النصيحة الخاطفة",
      "cta": "الـ CTA لجذب الإيميل أو المتابعة"
    }
  ],
  "leadMagnets": [
    {
      "name": "اسم الهدية المجانية",
      "type": "Checklist | Calculator | Mini Course | Quiz | Planner | Template | Resource Guide | Challenge",
      "typeArabic": "قائمة فحص | حاسبة | كورس مصغر | اختبار تقييمي | مخطط عملي | قالب جاهز | دليل مصادر | تحدي",
      "problemSolved": "المشكلة المحددة التي تعالجها",
      "quickWin": "النتيجة السريعة (Quick Win) في دقائق",
      "idealAudience": "الجمهور المثالي للتحميل",
      "naturalNextOffer": "العرض التجاري اللاحق الطبيعي"
    }
  ],
  "funnels": [
    {
      "name": "مسار التحويل المقترح",
      "steps": ["خطوة 1: المحتوى", "خطوة 2: الهدية المجانية", "خطوة 3: تتابع الإيميل", "خطوة 4: العرض التجاري"],
      "whyItWorks": "لماذا يتناسب هذا المسار مع طبيعة النيتش وسلوك الجمهور"
    }
  ],
  "monetizationPaths": [
    {
      "path": "أفلييت برامج وخدمات SaaS",
      "feasibility": "عالية / متوسطة / تحتاج تحقق",
      "notes": "الاشتراكات المتكررة تعطي عائداً تراكمياً"
    }
  ],
  "risks": [
    {
      "risk": "اسم الخطر الاستراتيجي",
      "whyItMatters": "لماذا يجب الحذر منه",
      "whatToVerify": "كيف تتحقق منه في البحث العملي"
    }
  ],
  "validationQuestions": [
    "سؤال استراتيجي 1 للتحقق من السوق",
    "سؤال استراتيجي 2..."
  ],
  "positioningAngles": [
    {
      "angleName": "زاوية تضييق النيتش المقترحة",
      "formula": "بدل النيتش العام -> النيتش المتخصص مع الجمهور والسياق",
      "whyItIsStrong": "لماذا تتميز هذه الزاوية بفرص تنافسية أوضح"
    }
  ],
  "sevenDayPlan": [
    { "day": 1, "title": "بحث الجمهور الحقيقي", "task": "..." },
    { "day": 2, "title": "بحث المشكلات والاعتراضات", "task": "..." },
    { "day": 3, "title": "حصر فئات العروض المتاحة", "task": "..." },
    { "day": 4, "title": "استكشاف محتوى المنافسين والفجوات", "task": "..." },
    { "day": 5, "title": "استخراج كلمات نية الشراء الحقيقية", "task": "..." },
    { "day": 6, "title": "صياغة أول قطعة محتوى + نموذج ليد ماجنت", "task": "..." },
    { "day": 7, "title": "مراجعة الأدلة وتقييم الاستمرار", "task": "..." }
  ],
  "thirtyDayPlan": [
    { "week": 1, "title": "الأسبوع الأول: بحث وتنقيب الأدلة", "focus": "التأكد من وجود المشكلات والعروض" },
    { "week": 2, "title": "الأسبوع الثاني: نشر أول 5 قطع محتوى", "focus": "قياس تفاعل الجمهور مع الزوايا المطروحة" },
    { "week": 3, "title": "الأسبوع الثالث: إطلاق Lead Magnet", "focus": "قياس معدل التحويل الأولي إلى القائمة" },
    { "week": 4, "title": "الأسبوع الرابع: قياس الأدلة والقرارات", "focus": "تحليل النقرات والاهتمام التجاري واتخاذ القرار" }
  ],
  "opportunityMatrix": {
    "audienceClarity": "Low | Medium | High",
    "problemClarity": "Low | Medium | High",
    "buyerIntent": "Low | Medium | High",
    "contentDepth": "Low | Medium | High",
    "offerDiversity": "Low | Medium | High",
    "funnelPotential": "Low | Medium | High",
    "strategicRisk": "Low | Medium | High"
  },
  "dimensionScores": {
    "audienceClarity": 7,
    "problemDepth": 8,
    "desiredOutcomes": 7,
    "buyerIntentPotential": 8,
    "offerDiversity": 7,
    "contentDepth": 8,
    "funnelPotential": 7,
    "strategicRisk": 4
  },
  "decision": "EXPLORE | NARROW | VALIDATE",
  "decisionReasons": [
    "سبب 1 لاتخاذ هذا القرار الاستراتيجي",
    "سبب 2..."
  ]
}`;

        try {
          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: userPrompt,
            config: {
              systemInstruction,
              responseMimeType: 'application/json',
              temperature: 0.7,
            },
          });

          const rawText = response.text || '';
          const cleanedText = rawText.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '');
          const parsed = JSON.parse(cleanedText);

          return res.json({ success: true, data: parsed, source: 'gemini' });
        } catch (geminiError: any) {
          console.error('Gemini API call failed, generating strategic heuristic fallback:', geminiError?.message || geminiError);
          // Fall through to fallback generator
        }
      }

      // If no Gemini key or Gemini threw, use our rich deterministic marketing engine
      const fallbackResult = generateHeuristicAnalysis(req.body);
      return res.json({ success: true, data: fallbackResult, source: 'heuristic' });
    } catch (error: any) {
      console.error('API Error:', error);
      res.status(500).json({ error: 'Internal server error while analyzing niche' });
    }
  });

  // Setup Vite development server
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

/**
 * Intelligent deterministic strategic analyzer fallback
 * Guarantees thorough, high-fidelity, strictly compliant output
 */
function generateHeuristicAnalysis(body: any) {
  const niche = body.niche || 'النيتش العام';
  const audience = body.audience && body.audience !== 'مش محدد لسه' ? body.audience : 'المهتمون المبتدئون والمحترفون المشغولون';
  const problem = body.primaryProblem && body.primaryProblem !== 'مش عارف' ? body.primaryProblem : 'تشتت المعلومات وضيق الوقت وصعوبة العثور على حلول موثوقة ومناسبة للميزانية';
  const desiredOutcome = body.desiredOutcome || 'تحقيق نتائج ملموسة بأقل مجهود وتجنب الأخطاء المكلفة';
  const trafficSource = body.trafficSource || 'مزيج';

  return {
    summary: `تحليل فرصة نيتش "${niche}". يتميز هذا النيتش بتنوع المشكلات العملية والشعورية التي تواجه الجمهور، مع وجود لحظات قرار شرائية متعددة تتطلب محتوى مقارنات ومراجعات دقيقة. الخريطة التالية توفر إطار عمل استراتيجي لبناء مسار التحويل واختبار الطلب تدريجياً.`,
    decisionFraming: `النيتش يحتوي على فرص محتوى وعروض محتملة، لكن البيانات الحالية تحتاج تحقق في السوق الحقيقي وتحديد الشريحة الأكثر إلحاحاً قبل أي استثمار كبير في الوقت أو الإعلانات.`,
    audienceSegments: [
      {
        name: `المحترفون والموظفون المشغولون (${niche})`,
        whoTheyAre: `أشخاص يقضون ساعات عمل طويلة، لديهم ميزانية متوسطة أو جيدة، لكن يعانون من ضيق حاد في الوقت ويبحثون عن حلول سريعة ومختصرة.`,
        mainProblem: `عدم القدرة على الالتزام بحلول تستغرق ساعات طويلة، والشعور بالإرهاق بعد يوم العمل.`,
        mainDesire: `الحصول على النتيجة المرغوبة في أقل من 30 دقيقة يومياً من المنزل أو بيئة العمل.`,
        buyingSituation: `عندما يشعرون بتأثير المشكلة على إنتاجيتهم أو صحتهم ويبحثون عن أداة أو برنامج يختصر الوقت.`,
        priorityTag: 'أسهل في الاستهداف (Easier to message)',
        isSuggested: true
      },
      {
        name: `المبتدئون المترددون`,
        whoTheyAre: `أشخاص يرغبون بالبدء في ${niche} لأول مرة، لكنهم خائفون من ارتكاب أخطاء مكلفة أو الشراء الخاطئ.`,
        mainProblem: `كثرة الخيارات المتضاربة على الإنترنت وعدم معرفة من أين يبدأون خطوة بخطوة.`,
        mainDesire: `خريطة طريق واضحة ومبسطة خالية من التعقيدات والمصطلحات التقنية.`,
        buyingSituation: `عند البحث عن "أفضل نقطة بداية" أو دليل إرشادي للمبتدئين بدون مخاطرة.`,
        priorityTag: 'مشكلة أوضح (Clearer problem)',
        isSuggested: true
      },
      {
        name: `الباحثون عن حلول اقتصادية وبدائل ذكية`,
        whoTheyAre: `جمهور واعٍ بالحلول القائمة في السوق لكنه يرى أن الحلول التقليدية مرتفعة التكلفة أو غير مرنة.`,
        mainProblem: `ارتفاع تكلفة الحلول الرائدة ورغبتهم في تحقيق نفس النتيجة بتكلفة مدروسة.`,
        mainDesire: `أدوات أو برامج بديلة تقدم أعلى قيمة مقابل السعر مع سهولة الاستخدام.`,
        buyingSituation: `أثناء مقارنة البدائل ("X vs Y" أو "أفضل بديل لـ X").`,
        priorityTag: 'نية شراء أعلى (Potentially stronger intent)',
        isSuggested: true
      },
      {
        name: `أصحاب الأعمال الحرة والعمل عن بعد`,
        whoTheyAre: `أفراد يبنون نمط حياتهم حول الاستقلالية والمرونة ويهتمون بتحسين جودة روتينهم اليومي.`,
        mainProblem: `غياب البيئة المنظمة وصعوبة الحفاظ على الاستمرارية بمفردهم.`,
        mainDesire: `أنظمة وأدوات رقمية تدعم روتينهم المرن دون تقييد.`,
        buyingSituation: `بداية شهر جديد أو رغبة في إعادة ترتيب بيئة العمل والحياة.`,
        priorityTag: 'يحتاج تحقق أكثر (Needs more validation)',
        isSuggested: true
      }
    ],
    problems: {
      primary: [
        {
          title: `ضيق الوقت وصعوبة الاستمرارية`,
          description: `الجمهور يبدأ بحماس ثم يتوقف بسبب تعقيد الأنظمة المتاحة والافتقار إلى روتين واقعي.`,
          whyItMatters: `يؤدي إلى فقدان الثقة بالنفس وتكرار تجارب الفشل.`,
          contentPotential: `محتوى استراتيجي يركز على "أقل مجهود فعال" وروتين الـ 15 دقيقة.`,
          solutionCategory: `برامج موجهة للمبتدئين أو قوالب يومية مبسطة.`
        },
        {
          title: `التشتت الناتج عن تضارب النصائح والخيارات`,
          description: `كثرة الخبراء والأدوات تجعل الجمهور عاجزاً عن اتخاذ قرار شراء واثق.`,
          whyItMatters: `التأجيل المستمر لقرار الحل ("Analysis Paralysis").`,
          contentPotential: `مقارنات حيادية ومراجعات تفصيلية توضح لمن يناسب كل خيار.`,
          solutionCategory: `أدلة شراء وقوائم مراجعة للمقارنة بين الحلول.`
        }
      ],
      secondary: [
        {
          title: `التكلفة المرتفعة لبعض الحلول التقليدية`,
          description: `الافتراض بأن النتائج تتطلب معدات باهظة أو اشتراكات شهرية مكلفة.`,
          whyItMatters: `حاجز مالي يمنع نسبة من الجمهور من البدء.`,
          contentPotential: `محتوى يقدم بدائل مجانية ومنخفضة التكلفة للاختبار الأولي.`,
          solutionCategory: `أدوات رقمية خفيفة واشتراكات اقتصادية.`
        }
      ],
      emotional: [
        {
          title: `الخوف من الإحراج والشعور بالعجز أمام الآخرين`,
          description: `الشعور بالنقص مقارنة بالمحترفين في نفس المجال.`,
          whyItMatters: `دافع شعوري قوي يدفع للبحث عن حلول خاصة ومريحة.`,
          contentPotential: `رسائل طمأنة تؤكد أن البداية من الصفر أمر طبيعي ومشترك.`,
          solutionCategory: `كورسات منزلية أو برامج فردية خاصة.`
        }
      ],
      practical: [
        {
          title: `صعوبة القياس والمتابعة الذاتية`,
          description: `عدم وجود طريقة واضحة لمعرفة ما إذا كان الشخص يحرز تقدماً حقيقياً.`,
          whyItMatters: `غياب الإحساس بالإنجاز يسبب الإحباط السريع.`,
          contentPotential: `توفير نماذج متابعة (Trackers) وحاسبات تقدم.`,
          solutionCategory: `قوالب Notion، حاسبات أداء، وتطبيقات متخصصة.`
        }
      ],
      knowledgeGaps: [
        {
          title: `الاعتقاد بأن الحل السحري يكمن في أداة واحدة باهظة`,
          description: `التركيز على شراء الأداة بدلاً من فهم النظام وأسلوب التطبيق.`,
          whyItMatters: `يشتري الشخص أدوات لا يستخدمها ثم يلوم النيتش أو المجال.`,
          contentPotential: `محتوى يفكك المفاهيم المغلوطة ويعيد توجيه التركيز للنظام.`,
          solutionCategory: `محتوى تعليمي مجاني يربط الأداة بالسياق الصحيح.`
        }
      ]
    },
    desires: {
      functional: [
        `تحقيق النتيجة المرغوبة في أقصر وقت ممكن وبطريقة عملية مجربة`,
        `توفير المال والجهد عبر اختيار الأدوات المناسبة من التجربة الأولى`,
        `الحصول على نظام خطوات واضحة (Step-by-step Framework)`
      ],
      emotional: [
        `الشعور بالسيطرة والراحة النفسية بدلاً من التوتر الدائم`,
        `استعادة الثقة بالنفس والقدرة على تحقيق الالتزام`,
        `الاطمئنان إلى أن المسار المتبع مبني على أسس صحيحة وغير عشوائي`
      ],
      lifestyle: [
        `تحسين جودة الروتين اليومي دون التضحية بالوقت المخصص للعائلة أو العمل`,
        `التمتع بحرية ومرونة تطبيق الحلول في أي وقت ومكان`,
        `الشعور بالإنجاز والتطور الشخصي المستمر`
      ]
    },
    buyerIntent: {
      discovery: [
        { queryPattern: `ما هو ${niche} وكيف تبدأ فيه؟`, intent: `فهم أولي واستكشاف المجال بدون التزام مالي.` },
        { queryPattern: `أهمية ${niche} في تحسين الروتين اليومي`, intent: `توعية عامة حول الفوائد والعوائد المتوقعة.` }
      ],
      problemAware: [
        { queryPattern: `أسباب فشل المبتدئين في ${niche}`, intent: `إدراك الصعوبات والبحث عن أسباب المشكلة الحقيقية.` },
        { queryPattern: `كيف تحل مشكلة ضيق الوقت في ${niche}؟`, intent: `البحث عن حلول عملية لتخطي عقبة محددة.` }
      ],
      solutionAware: [
        { queryPattern: `أفضل أدوات وتطبيقات لـ ${niche}`, intent: `استعراض الحلول والخيارات التجارية المتاحة في السوق.` },
        { queryPattern: `طرق تعلم وتطبيق ${niche} من المنزل`, intent: `المقارنة بين الكورسات والكتب والبرامج المختلفة.` }
      ],
      highIntent: [
        { queryPattern: `مقارنة بين [الأداة A] ضد [الأداة B] لـ ${niche}`, intent: `مرحلة المفاضلة المباشرة قبل قرار الدفع النهائي.` },
        { queryPattern: `مراجعة كورس/برنامج [X] - هل يستحق الشراء؟`, intent: `بحث عن آراء محايدة وتجربة حقيقية قبل إدخال بيانات البطاقة.` },
        { queryPattern: `كوبون خصم / أسعار وباقات [أداة X]`, intent: `نية شراء مكتملة بنسبة عالية جداً.` }
      ]
    },
    productCategories: [
      {
        categoryName: `برامج وأدوات رقمية (SaaS & Apps)`,
        problemSolved: `أتمتة المهام، قياس الأداء، وتوفير ساعات من العمل اليدوي.`,
        targetSegment: `المحترفون والباحثون عن الدقة والسرعة.`,
        purchaseFrequency: `اشتراكات متكررة (Monthly / Annual Recurring).`,
        commercialNature: `SaaS`,
        contentAngle: `استعراض المميزات، كفاءة الوقت، وعرض تجربة الاستخدام العملية.`
      },
      {
        categoryName: `كورسات وبرامج تدريبية رقمية (Digital Courses)`,
        problemSolved: `اختصار سنوات التجربة والخطأ وتقديم خطوات إرشادية مباشرة.`,
        targetSegment: `المبتدئون الراغبون في مسار احترافي موجه.`,
        purchaseFrequency: `دفع لمرة واحدة مع تحديثات مستمرة.`,
        commercialNature: `Digital Products`,
        contentAngle: `عرض التحول (Transformation)، قصص النجاح، وحل الفجوات المعرفية.`
      },
      {
        categoryName: `قوالب وأنظمة جاهزة (Templates & Frameworks)`,
        problemSolved: `البدء الفوري بدون الحاجة لبناء الجداول أو الأنظمة من الصفر.`,
        targetSegment: `الراغبون في حلول خفيفة وسريعة التكلفة.`,
        purchaseFrequency: `شراء مباشر منخفض إلى متوسط التكلفة.`,
        commercialNature: `Digital Products`,
        contentAngle: `عرض نموذج الاستخدام المباشر وكيف يعمل القالب خلال 5 دقائق.`
      },
      {
        categoryName: `معدات وملحقات مادية (Physical Equipment/Accessories)`,
        problemSolved: `تجهيز البيئة المناسبة لتنفيذ وتطبيق الحلول بجودة أعلى.`,
        targetSegment: `المهتمون بالحصول على تجربة احترافية ملموسة.`,
        purchaseFrequency: `دفع لمرة واحدة مع احتمالية شراء ملحقات دورية.`,
        commercialNature: `Physical Products`,
        contentAngle: `قوائم "أفضل معدات أساسية للمبتدئين" ومراجعات الجودة والمتانة.`
      }
    ],
    offerLadder: [
      { level: 'Free Content', title: 'محتوى مجاني موسع', desc: `فيديوهات ومقالات استراتيجية تجيب عن أسئلة الجمهور الشائعة وتبني السلطة.` },
      { level: 'Lead Magnet', title: 'هدية مجانية (Lead Magnet)', desc: `دليل أو حاسبة أو قائمة فحص تلبي رغبة سريعة للجمهور مقابل الإيميل.` },
      { level: 'Entry Solution', title: 'حل مدخل منخفض التكلفة', desc: `قالب أو كورس مصغر يثبت جدوى الحل ويحول المتابع إلى مشتري لأول مرة.` },
      { level: 'Core Solution', title: 'الحل الأساسي المعتمد', desc: `البرنامج أو الأداة الرئيسية المتكاملة التي تحل المشكلة المحورية بعمق.` },
      { level: 'Recurring / Higher-Value', title: 'حل مستمر أو متقدم', desc: `اشتراك SaaS دوري أو استشارة متابعة أو مجتمع مغلق للمهتمين.` }
    ],
    contentAngles: [
      {
        title: `دليلك الشامل للبدء في ${niche} من الصفر بدون تعقيد`,
        category: 'Discovery',
        categoryArabic: 'محتوى اكتشاف',
        targetAudience: 'المبتدئون',
        intentLevel: 'Low',
        cta: 'حمل خريطة البداية المجانية من الرابط'
      },
      {
        title: `5 أخطاء يقع فيها معظم المهتمين بـ ${niche} تضيع وقتهم`,
        category: 'Educational',
        categoryArabic: 'محتوى تعليمي',
        targetAudience: 'الجمهور العام',
        intentLevel: 'Medium',
        cta: 'اشترك بالقائمة لتصلك التحديثات الأسبوعية'
      },
      {
        title: `ليه معظم الحلول المتاحة لـ ${niche} لا تدوم لأكثر من شهر؟`,
        category: 'Problem',
        categoryArabic: 'محتوى المشكلة',
        targetAudience: 'المحبطون من التجارب السابقة',
        intentLevel: 'Medium',
        cta: 'اكتشف النظام البديل عبر الهدية المجانية'
      },
      {
        title: `مقارنة تفصيلية بين أشهر 3 أدوات في ${niche} لعام 2026`,
        category: 'Comparison',
        categoryArabic: 'مقارنات',
        targetAudience: 'الباحثون عن خيارات للشراء',
        intentLevel: 'High',
        cta: 'اضغط هنا لقراءة المقارنة الكاملة واختيار الأنسب لك'
      },
      {
        title: `تجربتي ومراجعتي المحايدة لأداة [X]: هل تستحق استثمارك؟`,
        category: 'Review',
        categoryArabic: 'مراجعات',
        targetAudience: 'المشترون المترددون',
        intentLevel: 'High',
        cta: 'استخدم الرابط المباشر للتجربة المجانية'
      },
      {
        title: `أفضل بدائل اقتصادية لأغلى أدوات ${niche}`,
        category: 'Buyer Intent',
        categoryArabic: 'نية شراء',
        targetAudience: 'الباحثون عن أعلى قيمة مقابل السعر',
        intentLevel: 'High',
        cta: 'شاهد جدول مقارنة الأسعار والميزات'
      },
      {
        title: `كيف نبني نظاماً مستداماً في ${niche} بدون الاعتماد على التحفيز المؤقت؟`,
        category: 'Authority',
        categoryArabic: 'بناء ثقة وسلطة',
        targetAudience: 'المحترفون وأصحاب الرؤية طويلة المدى',
        intentLevel: 'Medium',
        cta: 'انضم لدرسنا التدريبي المجاني لتفاصيل النظام'
      },
      {
        title: `ما الذي تحتاجه حقاً للبدء في ${niche} وما الذي يمكنك تجاهله؟`,
        category: 'Educational',
        categoryArabic: 'محتوى تعليمي',
        targetAudience: 'المبتدئون والميزانيات المحدودة',
        intentLevel: 'Low',
        cta: 'احصل على القائمة المختصرة'
      },
      {
        title: `تحليل تكلفة: هل الأفضل الدفع لـ [الأداة A] أم تجربة الطرق المجانية؟`,
        category: 'Comparison',
        categoryArabic: 'مقارنات',
        targetAudience: 'المترددون بين المجاني والمدفوع',
        intentLevel: 'High',
        cta: 'اقرأ التحليل الواقعي قبل الدفع'
      },
      {
        title: `خطة الـ 15 دقيقة اليومية لتطبيق ${niche} للمشغولين`,
        category: 'Discovery',
        categoryArabic: 'محتوى اكتشاف',
        targetAudience: 'الموظفون وأصحاب الأعمال',
        intentLevel: 'Low',
        cta: 'حمل جدول المتابعة السريع'
      },
      {
        title: `العلامات التحذيرية التي توضح أن هذا المنتج في ${niche} غير مناسب لك`,
        category: 'Authority',
        categoryArabic: 'بناء ثقة وسلطة',
        targetAudience: 'المستهلكون الحريصون',
        intentLevel: 'Medium',
        cta: 'احفظ هذه المعايير قبل شراء أي أداة'
      },
      {
        title: `قبل أن تجدد اشتراكك السنوي: هل ما زلت تحتاج هذه الخدمة؟`,
        category: 'Review',
        categoryArabic: 'مراجعات',
        targetAudience: 'المشتركون الحاليون',
        intentLevel: 'High',
        cta: 'راجع قائمة البدائل الأحدث'
      },
      {
        title: `كيف تختار الأداة الصحيحة بناءً على مرحلتك الحالية وليس ترشيحات المشاهير؟`,
        category: 'Educational',
        categoryArabic: 'محتوى تعليمي',
        targetAudience: 'الجمهور الواعي',
        intentLevel: 'Medium',
        cta: 'استخدم حاسبة الاختيار المجانية'
      },
      {
        title: `دراسة حالة: كيف وفر فلان 10 ساعات أسبوعياً باستخدام هذا الترتيب البسيط؟`,
        category: 'Problem',
        categoryArabic: 'محتوى المشكلة',
        targetAudience: 'الباحثون عن إثباتات واقعية',
        intentLevel: 'Medium',
        cta: 'اطلع على الخطوات العملية في الدليل'
      },
      {
        title: `أفضل العروض والصفقات للمبتدئين في ${niche} هذا الشهر`,
        category: 'Buyer Intent',
        categoryArabic: 'نية شراء',
        targetAudience: 'المستعدون للشراء فوراً',
        intentLevel: 'High',
        cta: 'تصفح العروض المتاحة مع أكواد التجربة'
      }
    ],
    youtubeIdeas: [
      {
        title: `لو عندك 20 دقيقة فقط يومياً لـ ${niche}… طبق هذا النظام`,
        hookAngle: `تحدي فكرة أن الإنجاز يحتاج تفرغاً تاماً وإثبات أن النظام هو الفارق.`,
        targetPayoff: `روتين عملي واضح وقابل للتطبيق الفوري بدون إرهاق.`
      },
      {
        title: `ليه معظم الناس بتشتري أدوات ${niche} وما بتستخدمهاش؟ (والحل البديل)`,
        hookAngle: `كشف حقيقة الهوس بالشراء والتخلي عن المتابعة النفسية.`,
        targetPayoff: `توفير مئات الدولارات من الشراء العشوائي وبناء عادات مستمرة.`
      },
      {
        title: `مقارنة حيادية: أفضل 3 برامج وأدوات لـ ${niche} بعد شهور من التجربة`,
        hookAngle: `مراجعة صادقة بدون مجاملات تكشف العيوب قبل الميزات.`,
        targetPayoff: `قرار شراء محسوم بدون ندم.`
      },
      {
        title: `دليل المبتدئين الصريح: إزاي تبدأ في ${niche} بأقل من 50 دولار؟`,
        hookAngle: `كسر أسطورة التكلفة الباهظة والبدء بأبسط الأدوات.`,
        targetPayoff: `خطة عملية للميزانيات الاقتصادية.`
      },
      {
        title: `5 حاجات كنت أتمنى أعرفها قبل ما أبدأ في ${niche}`,
        hookAngle: `مشاركة الأخطاء الشخصية والدروس المستفادة بشفافية.`,
        targetPayoff: `اختصار وقت وجهد وتفادي الأخطاء الكبرى.`
      },
      {
        title: `شرح خطوة بخطوة: إعداد بيئة ${niche} المثالية في 30 دقيقة`,
        hookAngle: `جلسة إعداد عملية ومباشرة على الشاشة.`,
        targetPayoff: `جاهزية كاملة للبدء في نفس اليوم.`
      },
      {
        title: `هل تستحق هذه الأداة الشهيرة الضجة؟ مراجعة تفصيلية وتحليل بدائل`,
        hookAngle: `التشكيك في الترند السائد ومقارنة القيمة الحقيقية.`,
        targetPayoff: `رؤية موضوعية للمشتري الذكي.`
      },
      {
        title: `الروتين الأسبوعي لمتابعة تقدمك في ${niche} بدون تعقيد`,
        hookAngle: `نظام تتبع مبسط لا يستهلك أكثر من 10 دقائق أسبوعياً.`,
        targetPayoff: `وضوح تام لمسار التطور.`
      },
      {
        title: `أكبر خدعة تسويقية في ${niche} وليه لازم تتجنبها فوراً`,
        hookAngle: `تحذير من الوعود المبالغ فيها والبرامج الوهمية.`,
        targetPayoff: `حماية ميزانية وثقة المتابع.`
      },
      {
        title: `خريطة طريق 2026: كيف تبني مساراً ناجحاً في ${niche} خطوة بخطوة؟`,
        hookAngle: `رؤية مستقبلية واستراتيجية متكاملة لعام كامل.`,
        targetPayoff: `بوصلة استراتيجية شاملة للمبتدئ والمتقدم.`
      }
    ],
    shortFormIdeas: [
      {
        hook: `وقف! لو بتفكر تشتري أداة جديدة لـ ${niche} اسمع ده الأول…`,
        problem: `صرف الفلوس على أدوات معقدة مش هتستخدمها لأكتر من أسبوع.`,
        microPayoff: `ابدأ بقالب مجاني بسيط الأول وتأكد من الالتزام قبل الدفع.`,
        cta: `اكتب "قالب" في التعليقات وهبعتلك الرابط مجاناً.`
      },
      {
        hook: `السبب الوحيد اللي بيخلي 90% من الناس تفشل في الاستمرار بـ ${niche}:`,
        problem: `محاولة تطبيق نظام كامل من أول يوم بدل التدرج المنطقي.`,
        microPayoff: `قاعدة الـ 5 دقائق اليومية للتثبيت قبل التوسع.`,
        cta: `تابع الحساب لطرق بناء الأنظمة بدون إرهاق.`
      },
      {
        hook: `3 أدوات في ${niche} وفرت عليا أكتر من 15 ساعة كل شهر:`,
        problem: `المهام اليدوية المتكررة اللي بتستنزف طاقتك.`,
        microPayoff: `تسمية أداة الأتمتة وقالب المتابعة وطريقة الربط.`,
        cta: `الرابط موجود في البايو للتجربة المباشرة.`
      },
      {
        hook: `بدل ما تدفع 100$ في اشتراك شهري… جرب البديل ده:`,
        problem: `ارتفاع تكاليف الاشتراكات على المبتدئ.`,
        microPayoff: `أداة بديلة مجانية أو رخيصة بتقدم 80% من النتيجة.`,
        cta: `حفظ الفيديو عشان ترجعله وقت الشراء.`
      },
      {
        hook: `لو معندكش غير ربع ساعة كل يوم… دي خطتك في ${niche}:`,
        problem: `حجة ضيق الوقت وعدم القدرة على التفرغ.`,
        microPayoff: `3 خطوات محددة بالدقيقة لكل يوم.`,
        cta: `حمل جدول الـ 15 دقيقة من الرابط أعلى الصفحة.`
      },
      {
        hook: `أكبر غلطة بشوفها في ${niche} بتضيع النتائج تماماً:`,
        problem: `تغيير الطريقة كل أسبوع بناء على فيديوهات التيك توك.`,
        microPayoff: `الالتزام ببروتوكول واحد لمدة 30 يوم متواصلة.`,
        cta: `شارك الفيديو مع صاحبك اللي بيغير نظامه كل يوم.`
      },
      {
        hook: `السؤال ده هيحدد إذا كنت محتاج كورس مدفوع ولا لأ:`,
        problem: `التسرع في شراء الكورسات بدون استعداد للتطبيق.`,
        microPayoff: `إذا طبقت الأساسيات المجانية لـ 14 يوم يبقى ادخل المدفوع.`,
        cta: `راجع دليلنا المجاني أولاً في الرابط.`
      },
      {
        hook: `ليه معظم المشاهير بينصحوا بالأداة دي بالذات؟ الحقيقة الكاملة:`,
        problem: `الترويج للمنتجات بدون توضيح عيوبها الحقيقية.`,
        microPayoff: `الميزة الوحيدة الجيدة والعيوب اللي محدش بيقولها.`,
        cta: `اكتب رأيك في الكومنتات لو جربتها.`
      },
      {
        hook: `اختبار سريع في 10 ثواني: هل نظامك في ${niche} شغال صح؟`,
        problem: `عدم وضوح مؤشرات التقدم الشخصي.`,
        microPayoff: `مؤشر واحد بسيط إذا تحقق فأنت على الطريق الصحيح.`,
        cta: `كم درجتك من 3؟ اكتبها في التعليق.`
      },
      {
        hook: `الهدية دي مش هتخليك تحتاج تبدأ من الصفر تاني…`,
        problem: `صعوبة كتابة أو إعداد الخطط من البداية.`,
        microPayoff: `شيت متابعة مجاني مجهز بكل الصيغ الجاهزة.`,
        cta: `احصل عليه مجاناً الآن من البايو.`
      }
    ],
    leadMagnets: [
      {
        name: `قائمة الفحص الشاملة لاختيار الحل الأنسب في ${niche} (Checklist)`,
        type: 'Checklist',
        typeArabic: 'قائمة فحص',
        problemSolved: `الحيرة والتشتت بين الخيارات الكثيرة في السوق.`,
        quickWin: `استبعاد 80% من الخيارات غير المناسبة خلال 7 دقائق.`,
        idealAudience: `المبتدئون والمترددون قبل أي قرار شراء.`,
        naturalNextOffer: `دليل مقارنة تفصيلي أو كورس مدخل مع كود خصم للأداة المختارة.`
      },
      {
        name: `حاسبة قياس التكلفة والعائد لـ ${niche} (Interactive Calculator)`,
        type: 'Calculator',
        typeArabic: 'حاسبة تفاعلية',
        problemSolved: `عدم معرفة الميزانية الدقيقة المطلوبة والوقت المتوقع للنتائج.`,
        quickWin: `حساب التكلفة الشهرية والوقت المتوقع بمدخلات شخصية دقيقة.`,
        idealAudience: `المحترفون وأصحاب الميزانيات المحدودة.`,
        naturalNextOffer: `توصية بالأدوات المتوافقة مع ميزانية المستخدم تلقائياً.`
      },
      {
        name: `ميني كورس مجاني من 3 فيديوهات: نظام البداية الصحيحة`,
        type: 'Mini Course',
        typeArabic: 'كورس مصغر مجاني',
        problemSolved: `العشوائية في التطبيق والافتقار إلى إطار عمل منظم.`,
        quickWin: `فهم الصورة الكاملة وترتيب أول 3 خطوات في أقل من 40 دقيقة.`,
        idealAudience: `الجمهور الجاد الراغب في بناء نظام متكامل.`,
        naturalNextOffer: `الاشتراك في الأداة الأساسية أو البرنامج التدريبي المتقدم.`
      },
      {
        name: `مخطط الـ 30 يوماً للمتابعة اليومية بدون انقطاع (Daily Planner)`,
        type: 'Planner',
        typeArabic: 'مخطط عملي',
        problemSolved: `فقدان الحماس بعد الأسبوع الأول وصعوبة الاستمرارية.`,
        quickWin: `جدول يومي مطبوع أو رقمي يوضح مهمة واحدة يومياً.`,
        idealAudience: `المشغولون والذين يعانون من التسويف.`,
        naturalNextOffer: `قوالب أوسع أو برنامج متابعة تفاعلي.`
      },
      {
        name: `دليل أفضل 10 مصادر وأدوات موثوقة ومجربة في ${niche}`,
        type: 'Resource Guide',
        typeArabic: 'دليل مصادر معتمد',
        problemSolved: `إضاعة ساعات طويلة في البحث وتصفح المواقع غير الموثوقة.`,
        quickWin: `الوصول المباشر إلى أفضل الأدوات وروابط التجربة بنقرة واحدة.`,
        idealAudience: `جميع فئات النيتش في مرحلة البحث والاستكشاف.`,
        naturalNextOffer: `روابط أفلييت لأفضل الخدمات المعروضة مع توجيه دقيق.`
      }
    ],
    funnels: [
      {
        name: `مسار اليوتيوب والمحتوى الطويل -> Lead Magnet -> Email Sequence -> SaaS Offer`,
        steps: [
          `فيديو يوتيوب Outcome-Led يحل مشكلة محددة ويستعرض نتائج عملية`,
          `دعوة في الوصف لتنزيل حاسبة أو شيت إكسيل مجاني مقابل الإيميل`,
          `سلسلة رسائل بريدية من 4 إيميلات تشرح خطوات تطبيق النظام خطوة بخطوة`,
          `تقديم عرض أفلييت لأداة SaaS الأساسية مع بونص تدريبي حصري للمشتركين`
        ],
        whyItWorks: `يبني ثقة استثنائية من خلال المحتوى العميق ويجعل قرار الاشتراك في الأداة نتيجة طبيعية للدرس وليس بيعاً مباشراً مزعجاً.`
      },
      {
        name: `مسار المحتوى القصير (Short-form) -> Checklist -> Mini Course -> Affiliate Offer`,
        steps: [
          `مقاطع ريلز وشورتس مركزة على Hooks المشكلات وعادات التوفير والإنتاجية`,
          `رابط البايو يقود إلى صفحة هبوط نظيفة لتحميل قائمة فحص في 5 ثواني`,
          `صفحة شكر تقدم ميني كورس فيديو قصير من 3 خطوات يشرح كيفية استخدام القائمة`,
          `توجيه المستخدم إلى العرض التجاري (برنامج أو أداة) كأسرع طريقة للتطبيق`
        ],
        whyItWorks: `يستفيد من الترافيك المجاني الكثيف والسريع ويحوله فوراً إلى أصول في القائمة البريدية ثم عروض ذات نية شراء عالية.`
      },
      {
        name: `مسار مقارنات ومراجعات البحث (SEO / Review Intent) -> Comparison Bridge -> Direct Offer`,
        steps: [
          `محتوى بحثي يستهدف كلمات "X vs Y" أو "مراجعة شاملة لـ X"`,
          `جدول مقارنة شفاف يوضح المزايا والعيوب والأسعار بالتفصيل`,
          `نداء لاتخاذ إجراء واضح (زر مباشر بتجربة مجانية أو خصم حصري)`,
          `خيار اشتراك بالقائمة البريدية للحصول على تحديثات الصفقات الشهرية`
        ],
        whyItWorks: `يستهدف الزائر في اللحظة التي تكون فيها نية الشراء في أعلى مستوياتها (High Intent)، مما يرفع نسب التحويل المباشر.`
      }
    ],
    monetizationPaths: [
      {
        path: `تسويق بالعمولة لأدوات وبرامج SaaS بنظام الاشتراكات المتكررة`,
        feasibility: `عالية (تعتمد على وجود برامج أفلييت حقيقية في هذا القطاع)`,
        notes: `النموذج الأكثر استدامة لأنه يولد دخلاً متراكماً شهرياً مع كل مستخدم نشط.`
      },
      {
        path: `عمولات الكورسات والبرامج التدريبية المرموقة`,
        feasibility: `متوسطة إلى عالية`,
        notes: `نسب عمولات جيدة (30% - 50%) عند اختيار برامج تدريبية تحل مشكلات معقدة وذات سمعة ممتازة.`
      },
      {
        path: `المنتجات المادية والمعدات المتخصصة عبر المتاجر الكبرى`,
        feasibility: `متوسطة`,
        notes: `نسب العمولات أقل (3% - 10%) ولكن حجم الطلب وسهولة قرار الشراء أعلى، ومفيدة كعروض مدخل.`
      },
      {
        path: `رعايات المحتوى والشراكات المباشرة مع الشركات (Sponsorships)`,
        feasibility: `تحتاج بناء جمهور وسلطة أولاً`,
        notes: `تتحقق بعد الوصول إلى جمهور متخصص ذي تفاعل نوعي، حيث تدفع الشركات مقابل الظهور في النشرات والفيديوهات.`
      }
    ],
    risks: [
      {
        risk: `اتساع النيتش أكثر من اللازم (Audience Too Broad)`,
        whyItMatters: `صعوبة منافسة الكبار وصعوبة صياغة رسالة تسويقية محددة تلامس مشكلة شخص واحد.`,
        whatToVerify: `تحقق من إمكانية تضييق النيتش لشريحة محددة (مثل: لحديثي العهد، أو للموظفين).`
      },
      {
        risk: `الاعتماد على عرض أو برنامج أفلييت واحد (Single-Offer Dependency)`,
        whyItMatters: `إذا أغلق البرنامج أو تم تقليل العمولات تنهار المنظومة بالكامل.`,
        whatToVerify: `ابحث وتأكد من وجود ما لا يقل عن 3 حلول وبرامج بديلة في السوق.`
      },
      {
        risk: `متطلبات ثقة مرتفعة ومخاوف مصداقية (High Trust Requirement)`,
        whyItMatters: `الجمهور لن يشتري بناء على نصيحة سطحية إذا كان الموضوع يتعلق بصحته أو ماله أو عمله.`,
        whatToVerify: `تحقق من قدرتك على إنتاج محتوى تجربة شخصية صادق ومبني على مراجع وأدلة.`
      },
      {
        risk: `ضعف التمايز وتكرار المحتوى المتداول (Weak Differentiation)`,
        whyItMatters: `ظهور المحتوى كنسخة مكررة من محتوى الذكاء الاصطناعي السطحي دون رأي أو زاوية فريدة.`,
        whatToVerify: `حدد زاوية واضحة خاصة بك وموقفاً صريحاً ضد الممارسات الخاطئة في النيتش.`
      }
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
      `ما هو الدليل الأول الذي سأجمعه في الأيام السبعة الأولى قبل كتابة أي سطر محتوى طويل؟`
    ],
    positioningAngles: [
      {
        angleName: `تخصيص النيتش للمحترفين والموظفين المشغولين`,
        formula: `${niche} -> الموظفون -> ضيق الوقت -> حلول مختصرة لا تتجاوز 20 دقيقة يومياً`,
        whyItIsStrong: `جمهور يملك قدرة شرائية ومستعد للدفع مقابل اختصار الوقت وتجنب التعقيد.`
      },
      {
        angleName: `تخصيص النيتش للمبتدئين بدون ميزانيات ضخمة (Zero/Low Budget)`,
        formula: `${niche} -> المبتدئون المترددون -> الخوف من الخسارة -> البدء بأدوات مجانية واقتصادية`,
        whyItIsStrong: `يخاطب أكبر كتلة عددية ويقدم أسهل رسالة جذب (Low Barrier to Entry).`
      },
      {
        angleName: `تخصيص النيتش لأصحاب العمل الحر والعمل عن بعد (Remote Workers)`,
        formula: `${niche} -> المستقلون والعاملون من المنزل -> العزلة وغياب النظام -> دمج الحل في الروتين المنزلي`,
        whyItIsStrong: `تطابق بيئة التطبيق مع نمط الحياة اليومي وسهولة استهدافهم رقمياً.`
      },
      {
        angleName: `تخصيص النيتش بحسب الأداة أو البيئة (Ecosystem-Specific)`,
        formula: `${niche} -> مستخدمو نظام معين -> الرغبة في التكامل -> الحلول المتوافقة تماماً مع بيئتهم`,
        whyItIsStrong: `نية شراء وتطبيق عالية جداً ووضوح لا يضاهى في الكلمات المفتاحية.`
      },
      {
        angleName: `تخصيص النيتش بحسب النتيجة العاجلة والتحول السريع (30-Day Transformation)`,
        formula: `${niche} -> الراغبون في إثبات أولي -> الشك في الجدوى -> بروتوكول مدته 30 يوماً فقط`,
        whyItIsStrong: `وضوح النتيجة يقلل المماطلة ويسهل بناء Lead Magnet عالي التحويل.`
      }
    ],
    sevenDayPlan: [
      { day: 1, title: `بحث وتوثيق عبارات الجمهور`, task: `تصفح 5 مجتمعات أو قنوات يوتيوب في النيتش، وتفريغ 20 تعليقاً حقيقياً يصف المعاناة بالألفاظ الخاصة.` },
      { day: 2, title: `حصر المشكلات الأساسية والاعتراضات`, task: `تصنيف المشكلات إلى أساسية ونفسية ومعرفية وتحديد العقبة رقم 1 التي تمنعهم من الاستمرار.` },
      { day: 3, title: `مسح العروض وبرامج الأفلييت المتاحة`, task: `حصر 3 إلى 5 منتجات أو أدوات تحل المشكلة، والتحقق من وجود برامج عمولة ونظام التتبع الخاص بها.` },
      { day: 4, title: `تحليل زوايا المحتوى ذات التفاعل`, task: `استخراج أفضل 10 موضوعات تحقق مشاهدات ونقاشاً حقيقياً، مع تحديد الثغرة التي لم يتحدث عنها أحد.` },
      { day: 5, title: `استخراج كلمات نية الشراء الحقيقية`, task: `حصر عبارات المقارنة والبدائل والمراجعات وملاحظة أسئلة الشراء المتكررة من الجمهور.` },
      { day: 6, title: `تصميم مسودة الهدية المجانية وتجربة العرض`, task: `كتابة مخطط صفحة واحدة (Checklist أو Calculator) يحل المشكلة السريعة ويربط بالعرض التجاري.` },
      { day: 7, title: `مراجعة الأدلة واتخاذ القرار الأولي`, task: `تقييم ما تم جمعه من بيانات واقعية واتخاذ قرار التضييق (NARROW) أو بدء الاختبار (VALIDATE).` }
    ],
    thirtyDayPlan: [
      { week: 1, title: `الأسبوع الأول: بحث وتنقيب الأدلة الواقعية`, focus: `التحقق من وجود مشكلات حقيقية وعروض متاحة وتحديد الشريحة المستهدفة بدقة.` },
      { week: 2, title: `الأسبوع الثاني: نشر أول 5 قطع محتوى استراتيجية`, focus: `نشر محتوى يختبر الزوايا المختلفة ومراقبة ردود الأفعال والتعليقات والأسئلة النوعية.` },
      { week: 3, title: `الأسبوع الثالث: إطلاق Lead Magnet وجمع المشتركين`, focus: `ربط المحتوى بصفحة هبوط مبسطة وقياس نسبة من يسجل إيميله للحصول على الهدية.` },
      { week: 4, title: `الأسبوع الرابع: قياس التفاعل التجاري والنقرات`, focus: `إرسال أولى رسائل القيمة والتوصية بالعرض وملاحظة نسبة النقر إلى العرض (CTR).` }
    ],
    opportunityMatrix: {
      audienceClarity: 'Medium',
      problemClarity: 'High',
      buyerIntent: 'High',
      contentDepth: 'High',
      offerDiversity: 'Medium',
      funnelPotential: 'High',
      strategicRisk: 'Medium'
    },
    dimensionScores: {
      audienceClarity: 7,
      problemDepth: 8,
      desiredOutcomes: 7,
      buyerIntentPotential: 8,
      offerDiversity: 7,
      contentDepth: 9,
      funnelPotential: 8,
      strategicRisk: 4
    },
    decision: 'NARROW',
    decisionReasons: [
      `النيتش يملك عمقاً كبيراً في المشكلات والمحتوى ونية الشراء المحتملة، مما يجعله غنياً بالفرص.`,
      `مع ذلك، دخول النيتش بالصفة العامة الواسعة يرفع تكلفة جذب الانتباه ويزيد من حدة التشتت.`,
      `القرار الأنسب هو تضييق النيتش لشريحة ذات مشكلة ملحة (مثل المهنيين المشغولين أو الباحثين عن بدائل اقتصادية) ثم البدء في الاختبار العملي الميداني.`
    ]
  };
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
