import React, { useState } from 'react';
import { CheckSquare, Square, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

const DEFAULT_CHECKLIST = [
  { id: '1', text: 'هل أستطيع تحديد ما لا يقل عن 3 مشكلات محددة يشتكي منها هذا الجمهور بألفاظهم الخاصة؟' },
  { id: '2', text: 'هل وجدت منتجات أو برامج تجارية قائمة بالفعل تحل تلك المشكلات وتدفع فيها أموال حقيقية؟' },
  { id: '3', text: 'هل يبحث الجمهور بنشاط بعبارات المقارنة والبدائل (X vs Y أو أفضل بديل لـ X)؟' },
  { id: '4', text: 'هل أستطيع كتابة وتصوير 30 زاوية محتوى نوعية دون الوقوع في التكرار والابتذال؟' },
  { id: '5', text: 'هل أستطيع إنشاء هدية مجانية (Lead Magnet) تقدم مكسباً سريعاً في أقل من 10 دقائق؟' },
  { id: '6', text: 'هل حددت موضوعات نية شراء واضحة تستهدف لحظة اتخاذ قرار الدفع؟' },
  { id: '7', text: 'هل توجد عدة برامج وعروض عمولة بديلة في السوق بدلاً من الاعتماد على شركة واحدة؟' },
  { id: '8', text: 'هل أستطيع شرح زاوية تمايزي ولماذا سيختار العميل محتواي وتوصياتي أنا بالذات؟' },
  { id: '9', text: 'هل أملك القدرة التقنية على تتبع المسار الكامل: ترافيك -> نقرات -> ليدز -> مبيعات؟' },
];

export const ValidationChecklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const toggleCheck = (id: string) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter((item) => item !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const progressPercent = Math.round((checkedIds.length / DEFAULT_CHECKLIST.length) * 100);

  return (
    <section id="section-validation" className="py-12 px-4 max-w-7xl mx-auto border-t border-[#23170D]">
      <div className="bg-[#23170D]/40 border border-[#4A2F15] rounded-3xl p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>VALIDATION CHECKLIST • قائمة التحقق الميداني</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA]">
              قبل ما تقرر تدخل النيتش… تحقق من دول
            </h3>
            <p className="text-sm text-[#C8C5BA] mt-1 max-w-2xl">
              لا تنتقل لمرحلة إنتاج المحتوى المكثف حتى تجيب بنعم على أغلب هذه النقاط بأدلة واقعية من السوق.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="bg-[#040405] border border-[#4A2F15] rounded-2xl px-5 py-3 text-center sm:text-right shrink-0">
            <div className="text-xs text-[#797979] font-medium mb-1">نسبة الجاهزية للتحقق:</div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-[#F5BF1E] font-mono">
                {checkedIds.length} / {DEFAULT_CHECKLIST.length}
              </span>
              <div className="w-24 h-2 bg-[#23170D] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F5BF1E] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Checklist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {DEFAULT_CHECKLIST.map((item, idx) => {
            const isChecked = checkedIds.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                  isChecked
                    ? 'bg-[#F5BF1E]/10 border-[#F5BF1E]/40 text-[#FCFCFA]'
                    : 'bg-[#040405] border-[#23170D] hover:border-[#4A2F15] text-[#C8C5BA]'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-[#F5BF1E]" />
                  ) : (
                    <Square className="w-5 h-5 text-[#797979]" />
                  )}
                </div>

                <div className="text-xs sm:text-sm leading-relaxed">
                  <span className="font-mono text-[#797979] text-xs ml-1">#{idx + 1}</span>
                  <span className={isChecked ? 'font-bold text-[#FCFCFA]' : ''}>
                    {item.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {checkedIds.length >= 7 && (
          <div className="mt-6 p-4 rounded-2xl bg-[#040405] border border-[#F5BF1E]/40 text-xs text-[#FBD052] flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#F5BF1E] shrink-0" />
            <span>
              رائع! استيفاؤك لهذه العناصر يؤكد أنك تبني بزنس تسويق بالعمولة على أسس منظومية وليس مجرد ملاحقة تريندات عشوائية.
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
