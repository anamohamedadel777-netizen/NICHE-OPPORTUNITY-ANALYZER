import React from 'react';
import { TrendingUp, Search, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { BuyerIntentMapData } from '../types/niche';

interface BuyerIntentMapProps {
  buyerIntent: BuyerIntentMapData;
}

export const BuyerIntentMap: React.FC<BuyerIntentMapProps> = ({ buyerIntent }) => {
  const levels = [
    {
      level: '1',
      titleEn: 'Discovery',
      titleAr: 'مرحلة الاكتشاف والتعريف',
      intentTag: 'نية منخفضة للشراء • فضول استكشافي',
      borderClass: 'border-[#23170D]',
      tagClass: 'bg-[#23170D] text-[#797979] border-[#4A2F15]',
      items: buyerIntent.discovery,
      desc: 'المستخدم يبحث عن مفاهيم عامة لمعرفة طبيعة المجال دون أي رغبة شراء حالية.',
    },
    {
      level: '2',
      titleEn: 'Problem Aware',
      titleAr: 'مرحلة الوعي بالمشكلة',
      intentTag: 'نية متوسطة • بحث عن تشخيص للألم',
      borderClass: 'border-[#23170D]',
      tagClass: 'bg-[#23170D] text-[#C8C5BA] border-[#4A2F15]',
      items: buyerIntent.problemAware,
      desc: 'المستخدم أدرك وجود عائق ويبحث عن أسبابه وكيفية تجاوزه.',
    },
    {
      level: '3',
      titleEn: 'Solution Aware',
      titleAr: 'مرحلة الوعي بالحلول',
      intentTag: 'نية متزايدة • استعراض فئات المنتجات',
      borderClass: 'border-[#4A2F15]',
      tagClass: 'bg-[#4A2F15]/40 text-[#FBD052] border-[#F5BF1E]/30',
      items: buyerIntent.solutionAware,
      desc: 'المستخدم يعرف فئات الحلول (برامج، كورسات) ويجمع أسماء البدائل المتاحة.',
    },
    {
      level: '4',
      titleEn: 'Buyer Intent',
      titleAr: 'مرحلة نية الشراء العالية',
      intentTag: 'أعلى نية تحويل • مقارنات وأسعار ومراجعات',
      borderClass: 'border-[#F5BF1E]',
      tagClass: 'bg-[#F5BF1E]/15 text-[#F5BF1E] border-[#F5BF1E]/40 font-bold',
      items: buyerIntent.highIntent,
      desc: 'المستخدم يقف على حافة الدفع ويقارن بين خيارين محددين (X vs Y) أو يبحث عن كوبون ورأي صادق.',
    },
  ];

  return (
    <section id="section-intent" className="py-12 px-4 max-w-7xl mx-auto border-t border-[#23170D]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-bold uppercase tracking-wider mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>BUYER INTENT MAP • سلم نية الشراء</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA]">
            فين نية الشراء؟
          </h3>
          <p className="text-sm text-[#C8C5BA] mt-1 max-w-2xl">
            الترافيك ليس متساوياً. الترافيك العام يستهلك مجهودك دون مبيعات، بينما عبارات المقارنة والبدائل تملك أعلى قابلية للتحويل.
          </p>
        </div>

        <div className="text-xs text-[#797979] bg-[#040405] px-3 py-2 rounded-xl border border-[#23170D] flex items-center gap-2 shrink-0">
          <AlertTriangle className="w-3.5 h-3.5 text-[#F5BF1E]" />
          <span>أنماط بحث مفهومية • أحجام البحث الفعلية تحتاج تحقق خارجي بأدوات SEO</span>
        </div>
      </div>

      {/* 4 Levels Hierarchy */}
      <div className="space-y-4">
        {levels.map((lvl) => (
          <div
            key={lvl.level}
            className={`bg-[#040405] border rounded-2xl p-5 sm:p-6 transition-all ${lvl.borderClass}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#23170D] border border-[#4A2F15] font-mono font-bold text-sm text-[#F5BF1E] flex items-center justify-center shrink-0">
                  L{lvl.level}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base sm:text-lg font-extrabold text-[#FCFCFA]">
                      {lvl.titleAr}
                    </h4>
                    <span className="text-xs font-mono text-[#797979] uppercase">
                      ({lvl.titleEn})
                    </span>
                  </div>
                  <p className="text-xs text-[#797979] mt-0.5">{lvl.desc}</p>
                </div>
              </div>

              <span className={`text-[11px] px-3 py-1 rounded-lg border self-start sm:self-auto ${lvl.tagClass}`}>
                {lvl.intentTag}
              </span>
            </div>

            {/* Query Patterns list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-[#23170D]">
              {lvl.items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#23170D]/40 rounded-xl p-3 border border-[#23170D] flex items-start gap-2.5"
                >
                  <Search className="w-4 h-4 text-[#F5BF1E] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="text-[#FCFCFA] font-bold block mb-0.5 font-mono">
                      "{item.queryPattern}"
                    </span>
                    <span className="text-[#C8C5BA]">{item.intent}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
