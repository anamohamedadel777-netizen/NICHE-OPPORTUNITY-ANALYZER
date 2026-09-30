import React from 'react';
import { Package, ArrowDown, Repeat, Layers, CheckCircle } from 'lucide-react';
import { ProductCategory, OfferLadderItem } from '../types/niche';

interface ProductOpportunityMapProps {
  categories: ProductCategory[];
  offerLadder: OfferLadderItem[];
}

export const ProductOpportunityMap: React.FC<ProductOpportunityMapProps> = ({
  categories,
  offerLadder,
}) => {
  return (
    <section id="section-products" className="py-12 px-4 max-w-7xl mx-auto border-t border-[#23170D]">
      {/* Product Categories Section */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-bold uppercase tracking-wider mb-2">
          <Package className="w-3.5 h-3.5" />
          <span>PRODUCT OPPORTUNITY MAP • خريطة فئات المنتجات</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA]">
          إيه أنواع المنتجات اللي ممكن تدخل النيتش؟
        </h3>
        <p className="text-sm text-[#C8C5BA] mt-1 max-w-2xl">
          النيتش القوي لا يعتمد على منتج وحيد. تنوع فئات الحلول (برامج، كورسات، قوالب، اشتراكات) يمنحك مرونة تسويقية واستدامة في الأرباح.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        {categories.map((cat, idx) => (
          <div
            key={cat.categoryName}
            className="bg-[#040405] border border-[#23170D] hover:border-[#4A2F15] rounded-2xl p-6 transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className="text-[10px] font-mono text-[#797979]">الفئة 0{idx + 1}</span>
                <h4 className="text-lg font-extrabold text-[#FCFCFA]">
                  {cat.categoryName}
                </h4>
              </div>
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-[#23170D] text-[#F5BF1E] border border-[#4A2F15] font-semibold">
                {cat.commercialNature}
              </span>
            </div>

            <div className="space-y-2.5 text-xs bg-[#23170D]/40 rounded-xl p-4 border border-[#23170D]">
              <div>
                <span className="text-[#797979] font-bold block mb-0.5">المشكلة التي يحلها:</span>
                <span className="text-[#FCFCFA]">{cat.problemSolved}</span>
              </div>

              <div>
                <span className="text-[#797979] font-bold block mb-0.5">الشريحة المناسبة:</span>
                <span className="text-[#C8C5BA]">{cat.targetSegment}</span>
              </div>

              <div className="flex items-center gap-1.5 text-[#FBD052] pt-1">
                <Repeat className="w-3.5 h-3.5 shrink-0" />
                <span>طبيعة الشراء: {cat.purchaseFrequency}</span>
              </div>

              <div>
                <span className="text-[#F5BF1E] font-bold block mb-0.5">الزاوية التسويقية لتقديمه:</span>
                <span className="text-[#FCFCFA]">{cat.contentAngle}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Offer Ladder Section */}
      <div id="section-offers" className="bg-[#23170D]/30 border border-[#4A2F15] rounded-3xl p-6 sm:p-10">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23170D] border border-[#4A2F15] text-[#FBD052] text-xs font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>CONCEPTUAL OFFER LADDER • سلم العروض المقترح</span>
          </div>
          <h4 className="text-xl sm:text-2xl font-extrabold text-[#FCFCFA]">
            كيف يتدرج العميل من المحتوى المجاني إلى أعلى الحلول قيمة؟
          </h4>
          <p className="text-xs sm:text-sm text-[#C8C5BA] mt-1">
            لا تطلب من الزائر شراء الحل الأغلى في أول لقاء. بناء الثقة يحتاج سلماً منطقياً يقلل مخاطرة التجربة.
          </p>
        </div>

        {/* Step-by-Step Flow */}
        <div className="relative space-y-4">
          {offerLadder.map((step, idx) => {
            const isLast = idx === offerLadder.length - 1;

            return (
              <div key={step.level} className="relative">
                <div className="bg-[#040405] border border-[#23170D] hover:border-[#4A2F15] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#23170D] border border-[#4A2F15] font-mono font-bold text-sm text-[#F5BF1E] flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-base font-extrabold text-[#FCFCFA]">
                          {step.title}
                        </h5>
                        <span className="text-[11px] font-mono text-[#797979]">
                          ({step.level})
                        </span>
                      </div>
                      <p className="text-xs text-[#C8C5BA] mt-0.5">{step.desc}</p>
                    </div>
                  </div>

                  <span className="text-[11px] px-3 py-1 rounded-lg bg-[#23170D] text-[#C8C5BA] border border-[#4A2F15] self-start sm:self-auto shrink-0 font-medium">
                    {idx === 0
                      ? 'بناء ثقة وسلطة'
                      : idx === 1
                      ? 'التقاط الإيميل'
                      : idx === 2
                      ? 'كسر حاجز الدفع الأول'
                      : idx === 3
                      ? 'الحل المحوري الرئيسي'
                      : 'قيمة متراكمة مستمرة'}
                  </span>
                </div>

                {!isLast && (
                  <div className="flex justify-center py-1">
                    <ArrowDown className="w-4 h-4 text-[#F5BF1E]/40" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
