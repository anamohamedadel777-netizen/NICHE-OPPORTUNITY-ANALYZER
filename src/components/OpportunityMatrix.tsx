import React from 'react';
import { Grid, Info } from 'lucide-react';
import { OpportunityMatrixData, DimensionScores } from '../types/niche';

interface OpportunityMatrixProps {
  matrix: OpportunityMatrixData;
  scores: DimensionScores;
}

export const OpportunityMatrix: React.FC<OpportunityMatrixProps> = ({ matrix, scores }) => {
  const getBadgeStyle = (level: 'Low' | 'Medium' | 'High') => {
    switch (level) {
      case 'High':
        return 'bg-[#F5BF1E]/15 text-[#F5BF1E] border-[#F5BF1E]/40 font-bold';
      case 'Medium':
        return 'bg-[#23170D] text-[#FCFCFA] border-[#4A2F15]';
      case 'Low':
      default:
        return 'bg-[#23170D] text-[#797979] border-[#4A2F15]';
    }
  };

  const getLevelArabic = (level: 'Low' | 'Medium' | 'High') => {
    switch (level) {
      case 'High':
        return 'مرتفع (High)';
      case 'Medium':
        return 'متوسط (Medium)';
      case 'Low':
      default:
        return 'منخفض (Low)';
    }
  };

  const items = [
    {
      key: 'audienceClarity',
      labelAr: 'وضوح شرائح الجمهور',
      labelEn: 'Audience Clarity',
      level: matrix.audienceClarity,
      score: scores.audienceClarity,
      desc: 'إمكانية رسم بروفايل واضح لمن يشتري ويتابع',
    },
    {
      key: 'problemClarity',
      labelAr: 'عمق وإلحاح المشكلات',
      labelEn: 'Problem Depth',
      level: matrix.problemClarity,
      score: scores.problemDepth,
      desc: 'تكرار المعاناة وتأثيرها المباشر على حياة العميل',
    },
    {
      key: 'buyerIntent',
      labelAr: 'فرص نية الشراء',
      labelEn: 'Buyer Intent Potential',
      level: matrix.buyerIntent,
      score: scores.buyerIntentPotential,
      desc: 'توافر لحظات مقارنة ومراجعات وبحث تجاري',
    },
    {
      key: 'contentDepth',
      labelAr: 'عمق وتنوع المحتوى',
      labelEn: 'Content Depth',
      level: matrix.contentDepth,
      score: scores.contentDepth,
      desc: 'القدرة على توليد زوايا متعددة دون تكرار',
    },
    {
      key: 'offerDiversity',
      labelAr: 'تنوع العروض والحلول',
      labelEn: 'Offer Diversity',
      level: matrix.offerDiversity,
      score: scores.offerDiversity,
      desc: 'وجود برامج، كورسات، أدوات واشتراكات بديلة',
    },
    {
      key: 'funnelPotential',
      labelAr: 'إمكانية بناء مسار تحويل',
      labelEn: 'Funnel Potential',
      level: matrix.funnelPotential,
      score: scores.funnelPotential,
      desc: 'سهولة تحويل زائر المحتوى إلى مشترك بقائمة ثم مشتري',
    },
    {
      key: 'strategicRisk',
      labelAr: 'المخاطر الاستراتيجية',
      labelEn: 'Strategic Risk',
      level: matrix.strategicRisk,
      score: scores.strategicRisk,
      desc: 'اتساع السوق، شروط الثقة، أو الاعتماد على عرض واحد',
    },
  ];

  return (
    <section id="section-matrix" className="py-12 px-4 max-w-7xl mx-auto border-t border-[#23170D]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-bold uppercase tracking-wider mb-2">
            <Grid className="w-3.5 h-3.5" />
            <span>OPPORTUNITY MATRIX • مصفوفة الأبعاد الثمانية</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA]">
            مصفوفة تقييم أبعاد فرصة النيتش
          </h3>
          <p className="text-sm text-[#C8C5BA] mt-1 max-w-2xl">
            تقييم حيادي بالألوان الاستراتيجية الهادئة (الرمادي الهادئ، الأبيض الدافئ، والذهب الأصلي) دون إيحاءات تضليلية.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#797979] bg-[#040405] px-3 py-2 rounded-xl border border-[#23170D] shrink-0">
          <Info className="w-3.5 h-3.5 text-[#F5BF1E]" />
          <span>المقياس نسبي من 0 إلى 10 لكل بعد</span>
        </div>
      </div>

      <div className="bg-[#040405] border border-[#23170D] rounded-2xl overflow-hidden">
        <div className="divide-y divide-[#23170D]">
          {items.map((item) => (
            <div
              key={item.key}
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#23170D]/20 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-extrabold text-[#FCFCFA]">
                    {item.labelAr}
                  </h4>
                  <span className="text-xs font-mono text-[#797979]">
                    ({item.labelEn})
                  </span>
                </div>
                <p className="text-xs text-[#C8C5BA]">{item.desc}</p>
              </div>

              <div className="flex items-center gap-4 shrink-0 self-start sm:self-auto">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-[#797979] block">الدرجة التفصيلية:</span>
                  <span className="font-mono text-sm font-bold text-[#F5BF1E]">
                    {item.score} / 10
                  </span>
                </div>

                <span
                  className={`text-xs px-3.5 py-1.5 rounded-xl border ${getBadgeStyle(
                    item.level
                  )}`}
                >
                  {getLevelArabic(item.level)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
