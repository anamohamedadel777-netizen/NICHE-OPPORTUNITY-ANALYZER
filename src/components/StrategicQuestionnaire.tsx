import React, { useState } from 'react';
import {
  HelpCircle,
  Users,
  AlertCircle,
  Flag,
  Radio,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  FileText,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import {
  QuestionnaireState,
  TrafficSource,
  ExistingAudience,
  ProductType,
  BudgetOption,
  GoalOption,
} from '../types/niche';

interface StrategicQuestionnaireProps {
  niche: string;
  onSubmit: (state: QuestionnaireState) => void;
  isLoading: boolean;
  onBackToNiche: () => void;
}

export const StrategicQuestionnaire: React.FC<StrategicQuestionnaireProps> = ({
  niche,
  onSubmit,
  isLoading,
  onBackToNiche,
}) => {
  const [audience, setAudience] = useState('');
  const [isAudienceNotSpecified, setIsAudienceNotSpecified] = useState(false);

  const [primaryProblem, setPrimaryProblem] = useState('');
  const [isProblemUnknown, setIsProblemUnknown] = useState(false);

  const [desiredOutcome, setDesiredOutcome] = useState('');

  const [trafficSource, setTrafficSource] = useState<TrafficSource>('Combination');
  const [existingAudience, setExistingAudience] = useState<ExistingAudience>('لا');
  const [productTypes, setProductTypes] = useState<ProductType[]>([
    'Software / SaaS',
    'Digital Products',
  ]);
  const [budget, setBudget] = useState<BudgetOption>('0 — Organic only');
  const [goal, setGoal] = useState<GoalOption>('Affiliate income');

  const [affiliateProducts, setAffiliateProducts] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const handleAudienceNotSpecifiedToggle = () => {
    if (!isAudienceNotSpecified) {
      setAudience('مش محدد لسه');
      setIsAudienceNotSpecified(true);
    } else {
      setAudience('');
      setIsAudienceNotSpecified(false);
    }
  };

  const handleProblemUnknownToggle = () => {
    if (!isProblemUnknown) {
      setPrimaryProblem('مش عارف');
      setIsProblemUnknown(true);
    } else {
      setPrimaryProblem('');
      setIsProblemUnknown(false);
    }
  };

  const toggleProductType = (item: ProductType) => {
    if (item === 'Not sure') {
      setProductTypes(['Not sure']);
      return;
    }
    const filtered = productTypes.filter((p) => p !== 'Not sure');
    if (filtered.includes(item)) {
      const next = filtered.filter((p) => p !== item);
      setProductTypes(next.length > 0 ? next : ['Digital Products']);
    } else {
      setProductTypes([...filtered, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      niche,
      audience: isAudienceNotSpecified ? 'مش محدد لسه' : audience || 'مش محدد لسه',
      primaryProblem: isProblemUnknown ? 'مش عارف' : primaryProblem || 'مش عارف',
      desiredOutcome: desiredOutcome || 'تحقيق نتائج عملية بأفضل طريقة ممكنة',
      trafficSource,
      existingAudience,
      productTypes,
      budget,
      goal,
      affiliateProducts,
      additionalNotes,
    });
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      {/* Niche Header context */}
      <div className="bg-[#23170D] border border-[#4A2F15] rounded-2xl p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#F5BF1E] uppercase tracking-wider block">
            النيتش المختار للتحليل
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#FCFCFA] mt-0.5">
            {niche}
          </h2>
        </div>
        <button
          type="button"
          onClick={onBackToNiche}
          disabled={isLoading}
          className="text-xs text-[#C8C5BA] hover:text-[#FBD052] underline underline-offset-4 self-start sm:self-auto cursor-pointer"
        >
          تغيير النيتش
        </button>
      </div>

      <div className="bg-[#23170D]/40 border border-[#4A2F15] rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="mb-8 border-b border-[#4A2F15]/60 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#23170D] text-[#F5BF1E] text-xs font-bold mb-3 border border-[#4A2F15]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>أسئلة استراتيجية لتشخيص الفرصة</span>
          </div>
          <h3 className="text-2xl font-extrabold text-[#FCFCFA]">
            جاوب على كام سؤال بسيط لرسم خريطة الـNiche
          </h3>
          <p className="text-sm text-[#C8C5BA] mt-1">
            لا توجد إجابات صحيحة وخاطئة. الهدف هو تفكيك النيتش ومعرفة ما هو معروف لديك وما يحتاج إلى اقتراح استراتيجي وتحقق.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Question 1: Audience */}
          <div className="p-5 rounded-2xl bg-[#040405] border border-[#23170D] space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-base font-bold text-[#FCFCFA] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#F5BF1E]" />
                <span>1. مين الجمهور اللي في بالك؟</span>
              </label>
              <button
                type="button"
                onClick={handleAudienceNotSpecifiedToggle}
                className={`text-xs px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                  isAudienceNotSpecified
                    ? 'bg-[#F5BF1E] text-[#040405] font-bold border-[#F5BF1E]'
                    : 'bg-[#23170D] text-[#C8C5BA] border-[#4A2F15] hover:text-[#FCFCFA]'
                }`}
              >
                مش محدد لسه
              </button>
            </div>
            {!isAudienceNotSpecified ? (
              <textarea
                rows={2}
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="مثال: أشخاص بيشتغلوا من البيت وعايزين يخسوا وزن من غير جيم..."
                className="w-full bg-[#23170D]/40 text-[#FCFCFA] placeholder-[#797979] text-sm rounded-xl p-3.5 border border-[#4A2F15] focus:border-[#F5BF1E] focus:outline-none focus:ring-1 focus:ring-[#F5BF1E]"
              />
            ) : (
              <div className="p-3 rounded-xl bg-[#23170D]/60 border border-[#4A2F15] text-xs text-[#FBD052] flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>تم التحديد: ستقترح الأداة شرائح محتملة وتصنفها بوضوح كـ "اقتراحات أولية".</span>
              </div>
            )}
          </div>

          {/* Question 2: Primary Problem */}
          <div className="p-5 rounded-2xl bg-[#040405] border border-[#23170D] space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-base font-bold text-[#FCFCFA] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#F5BF1E]" />
                <span>2. إيه المشكلة الأساسية اللي شايف إن الجمهور ده بيحاول يحلها؟</span>
              </label>
              <button
                type="button"
                onClick={handleProblemUnknownToggle}
                className={`text-xs px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                  isProblemUnknown
                    ? 'bg-[#F5BF1E] text-[#040405] font-bold border-[#F5BF1E]'
                    : 'bg-[#23170D] text-[#C8C5BA] border-[#4A2F15] hover:text-[#FCFCFA]'
                }`}
              >
                مش عارف
              </button>
            </div>
            {!isProblemUnknown ? (
              <textarea
                rows={2}
                value={primaryProblem}
                onChange={(e) => setPrimaryProblem(e.target.value)}
                placeholder="مثال: مفيش وقت كافي بعد يوم الشغل للالتزام بروتين طويل ومكلف..."
                className="w-full bg-[#23170D]/40 text-[#FCFCFA] placeholder-[#797979] text-sm rounded-xl p-3.5 border border-[#4A2F15] focus:border-[#F5BF1E] focus:outline-none focus:ring-1 focus:ring-[#F5BF1E]"
              />
            ) : (
              <div className="p-3 rounded-xl bg-[#23170D]/60 border border-[#4A2F15] text-xs text-[#FBD052] flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>تم التحديد: ستقوم الأداة باستنتاج وتفكيك المشكلات الأساسية والشعورية والعملية.</span>
              </div>
            )}
          </div>

          {/* Question 3: Desired Outcome */}
          <div className="p-5 rounded-2xl bg-[#040405] border border-[#23170D] space-y-3">
            <label className="text-base font-bold text-[#FCFCFA] flex items-center gap-2">
              <Flag className="w-4 h-4 text-[#F5BF1E]" />
              <span>3. إيه النتيجة اللي الجمهور غالبًا عايز يوصل لها؟ (Desired Outcome - النتيجة المرغوبة)</span>
            </label>
            <textarea
              rows={2}
              value={desiredOutcome}
              onChange={(e) => setDesiredOutcome(e.target.value)}
              placeholder="مثال: يرجع يلبس مقاساته القديمة ويحس بالنشاط من البيت بدون حرمان..."
              className="w-full bg-[#23170D]/40 text-[#FCFCFA] placeholder-[#797979] text-sm rounded-xl p-3.5 border border-[#4A2F15] focus:border-[#F5BF1E] focus:outline-none focus:ring-1 focus:ring-[#F5BF1E]"
            />
          </div>

          {/* Question 4: Primary Traffic Channel */}
          <div className="p-5 rounded-2xl bg-[#040405] border border-[#23170D] space-y-3">
            <label className="text-base font-bold text-[#FCFCFA] flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#F5BF1E]" />
              <span>4. إنت ناوي تعتمد أكتر على إيه؟ (قناة الترافيك)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { key: 'YouTube', label: 'YouTube' },
                { key: 'Short-form Content', label: 'محتوى قصير (Shorts/Reels)' },
                { key: 'SEO', label: 'SEO (البحث)' },
                { key: 'Email', label: 'Email (إيميل)' },
                { key: 'Paid Ads', label: 'إعلانات مدفوعة (Paid)' },
                { key: 'Combination', label: 'مزيج (Combination)' },
                { key: 'Not sure', label: 'مش عارف' },
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setTrafficSource(opt.key as TrafficSource)}
                  className={`text-xs p-3 rounded-xl border text-center transition-all cursor-pointer font-medium ${
                    trafficSource === opt.key
                      ? 'bg-[#F5BF1E] text-[#040405] font-bold border-[#F5BF1E] shadow-sm'
                      : 'bg-[#23170D]/50 text-[#C8C5BA] border-[#4A2F15] hover:border-[#F5BF1E]/40 hover:text-[#FCFCFA]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 5: Existing Audience */}
          <div className="p-5 rounded-2xl bg-[#040405] border border-[#23170D] space-y-3">
            <label className="text-base font-bold text-[#FCFCFA] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#F5BF1E]" />
              <span>5. هل عندك جمهور بالفعل؟</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {(['لا', 'أقل من 1,000', '1,000–10,000', '10,000+', 'مش مهم للتحليل'] as ExistingAudience[]).map(
                (opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setExistingAudience(opt)}
                    className={`text-xs p-2.5 rounded-xl border text-center transition-all cursor-pointer font-medium ${
                      existingAudience === opt
                        ? 'bg-[#F5BF1E] text-[#040405] font-bold border-[#F5BF1E]'
                        : 'bg-[#23170D]/50 text-[#C8C5BA] border-[#4A2F15] hover:text-[#FCFCFA]'
                    }`}
                  >
                    {opt}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Question 6: Product Types (Multi-select) */}
          <div className="p-5 rounded-2xl bg-[#040405] border border-[#23170D] space-y-3">
            <label className="text-base font-bold text-[#FCFCFA] flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#F5BF1E]" />
              <span>6. إيه نوع المنتجات اللي تتخيل إن الجمهور ممكن يشتريها؟ (اختر أكثر من خيار)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { key: 'Digital Products', label: 'منتجات رقمية (Digital)' },
                { key: 'Software / SaaS', label: 'برامج (Software / SaaS)' },
                { key: 'Physical Products', label: 'منتجات مادية (Physical)' },
                { key: 'Services', label: 'خدمات (Services)' },
                { key: 'Subscriptions', label: 'اشتراكات (Subscriptions)' },
                { key: 'Courses', label: 'كورسات (Courses)' },
                { key: 'Not sure', label: 'مش عارف' },
              ].map((item) => {
                const isSelected = productTypes.includes(item.key as ProductType);
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => toggleProductType(item.key as ProductType)}
                    className={`text-xs p-3 rounded-xl border text-center transition-all cursor-pointer flex items-center justify-between gap-1 font-medium ${
                      isSelected
                        ? 'bg-[#F5BF1E] text-[#040405] font-bold border-[#F5BF1E]'
                        : 'bg-[#23170D]/50 text-[#C8C5BA] border-[#4A2F15] hover:text-[#FCFCFA]'
                    }`}
                  >
                    <span className="truncate">{item.label}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 7: Budget */}
          <div className="p-5 rounded-2xl bg-[#040405] border border-[#23170D] space-y-3">
            <label className="text-base font-bold text-[#FCFCFA] flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#F5BF1E]" />
              <span>7. ميزانيتك لاختبار النيتش؟</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { key: '0 — Organic only', label: '0 — عضوي فقط (Organic Only)' },
                { key: 'Small', label: 'ميزانية صغيرة (Small)' },
                { key: 'Medium', label: 'متوسطة (Medium)' },
                { key: 'Paid validation available', label: 'ممكن أختبر بإعلانات (Paid Validation)' },
                { key: 'Prefer not to say', label: 'لا أريد تحديدها' },
              ].map((b) => (
                <button
                  key={b.key}
                  type="button"
                  onClick={() => setBudget(b.key as BudgetOption)}
                  className={`text-xs p-3 rounded-xl border text-center transition-all cursor-pointer font-medium ${
                    budget === b.key
                      ? 'bg-[#F5BF1E] text-[#040405] font-bold border-[#F5BF1E]'
                      : 'bg-[#23170D]/50 text-[#C8C5BA] border-[#4A2F15] hover:text-[#FCFCFA]'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 8: Goal */}
          <div className="p-5 rounded-2xl bg-[#040405] border border-[#23170D] space-y-3">
            <label className="text-base font-bold text-[#FCFCFA] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#F5BF1E]" />
              <span>8. هدفك من النيتش؟</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { key: 'Affiliate income', label: 'أفلييت (Affiliate Income)' },
                { key: 'Build an audience', label: 'بناء جمهور (Audience)' },
                { key: 'Content business', label: 'بزنس محتوى (Content Business)' },
                { key: 'Email list', label: 'قائمة بريدية (Email List)' },
                { key: 'Long-term brand', label: 'براند طويل المدى (Brand)' },
                { key: 'Testing only', label: 'اختبار فقط (Testing Only)' },
              ].map((g) => (
                <button
                  key={g.key}
                  type="button"
                  onClick={() => setGoal(g.key as GoalOption)}
                  className={`text-xs p-3 rounded-xl border text-center transition-all cursor-pointer font-medium ${
                    goal === g.key
                      ? 'bg-[#F5BF1E] text-[#040405] font-bold border-[#F5BF1E]'
                      : 'bg-[#23170D]/50 text-[#C8C5BA] border-[#4A2F15] hover:text-[#FCFCFA]'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Question 9: Specific Affiliate Programs */}
          <div className="p-5 rounded-2xl bg-[#040405] border border-[#23170D] space-y-3">
            <label className="text-sm font-bold text-[#C8C5BA] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#797979]" />
              <span>9. (اختياري) هل عندك منتجات أو برامج Affiliate معينة في بالك؟</span>
            </label>
            <input
              type="text"
              value={affiliateProducts}
              onChange={(e) => setAffiliateProducts(e.target.value)}
              placeholder="مثال: ClickFunnels, Notion, برامج لياقة معينة..."
              className="w-full bg-[#23170D]/40 text-[#FCFCFA] placeholder-[#797979] text-sm rounded-xl p-3 border border-[#4A2F15] focus:border-[#F5BF1E] focus:outline-none"
            />
          </div>

          {/* Optional Question 10: Additional Notes */}
          <div className="p-5 rounded-2xl bg-[#040405] border border-[#23170D] space-y-3">
            <label className="text-sm font-bold text-[#C8C5BA] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#797979]" />
              <span>10. (اختياري) اكتب أي ملاحظات إضافية عن السوق أو الجمهور.</span>
            </label>
            <textarea
              rows={2}
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="أي تفاصيل لاحظتها، أسئلة شائعة، أو مخاوف..."
              className="w-full bg-[#23170D]/40 text-[#FCFCFA] placeholder-[#797979] text-sm rounded-xl p-3 border border-[#4A2F15] focus:border-[#F5BF1E] focus:outline-none"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl bg-gradient-to-r from-[#A7690C] via-[#F5BF1E] to-[#FBD052] text-[#040405] font-extrabold text-base shadow-xl shadow-[#F5BF1E]/20 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#040405] border-t-transparent rounded-full animate-spin" />
                  <span>جاري تحليل الفرصة...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>ابني خريطة النيتش (Niche Map)</span>
                </>
              )}
            </button>

            <span className="text-xs text-[#797979] text-center sm:text-right">
              التحليل مجاني وفوري • لا يتطلب إدخال بريد أو هاتف
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};
