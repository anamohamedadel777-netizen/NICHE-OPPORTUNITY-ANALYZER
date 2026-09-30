import React from 'react';
import { Target, CheckCircle2, AlertCircle, Compass, ShieldAlert, Award } from 'lucide-react';
import { NicheAnalysisResult } from '../types/niche';
import { BRAND_CONFIG } from '../config/brandConfig';

interface ResultHeroProps {
  result: NicheAnalysisResult;
}

export const ResultHero: React.FC<ResultHeroProps> = ({ result }) => {
  const decisionMeta = BRAND_CONFIG.decisions[result.decision] || BRAND_CONFIG.decisions.NARROW;

  return (
    <div className="relative bg-gradient-to-b from-[#23170D] to-[#040405] border-y border-[#4A2F15] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb & Disclaimer label */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#040405] border border-[#4A2F15] text-xs text-[#F5BF1E] font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>Niche Opportunity Assessment • تقييم فرصة النيتش</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#797979]">
            <span>خريطة أولية وليست توقعاً للأرباح</span>
          </div>
        </div>

        {/* Niche Title */}
        <div className="mb-8">
          <span className="text-xs sm:text-sm text-[#797979] font-medium block mb-1">
            النيتش قيد الفحص والتقييم:
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#FCFCFA] tracking-tight">
            {result.userInputs.niche}
          </h2>
        </div>

        {/* Scores & Framing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch mb-8">
          {/* Main Opportunity Score Card */}
          <div className="md:col-span-4 bg-[#040405] border border-[#4A2F15] rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#F5BF1E]/5 rounded-bl-full pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between text-xs text-[#C8C5BA] mb-2 font-bold">
                <span className="flex items-center gap-1.5 text-[#FBD052]">
                  <Award className="w-4 h-4" />
                  Niche Opportunity Assessment
                </span>
                <span className="text-[#797979]">مقياس 0 - 100</span>
              </div>
              <p className="text-xs text-[#797979] mb-4">
                تقييم تكامل المحتوى والعروض والجمهور (ليس ربحية)
              </p>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl sm:text-6xl font-black text-[#F5BF1E] font-mono tracking-tighter">
                  {result.overallScore}
                </span>
                <span className="text-lg text-[#797979] font-bold">/ 100</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-[#23170D] overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-[#A7690C] via-[#F5BF1E] to-[#FBD052] rounded-full transition-all duration-1000"
                  style={{ width: `${result.overallScore}%` }}
                />
              </div>
            </div>

            {/* Confidence metric */}
            <div className="pt-4 border-t border-[#23170D] flex items-center justify-between text-xs">
              <span className="text-[#C8C5BA]">درجة الثقة في التحليل (Confidence):</span>
              <span className="font-mono font-bold text-[#FCFCFA] bg-[#23170D] px-2.5 py-1 rounded-md border border-[#4A2F15]">
                {result.confidenceScore}%
              </span>
            </div>
          </div>

          {/* Decision Framing & Strategy Advice */}
          <div className="md:col-span-8 bg-[#040405] border border-[#4A2F15] rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#797979]">
                  التوجيه الاستراتيجي لصانع القرار
                </span>

                {/* Decision Badge */}
                <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-xl border font-bold text-xs sm:text-sm ${decisionMeta.bgClass} ${decisionMeta.borderClass}`} style={{ color: decisionMeta.color }}>
                  <Target className="w-4 h-4" />
                  <span>القرار المقترح: {decisionMeta.labelAr} ({decisionMeta.labelEn})</span>
                </div>
              </div>

              {/* Framing Quote */}
              <blockquote className="text-lg sm:text-xl font-bold text-[#FCFCFA] leading-relaxed mb-4 pr-4 border-r-4 border-[#F5BF1E]">
                "{result.decisionFraming || 'النيتش يحتوي على فرص محتوى وعروض محتملة، لكن البيانات الحالية تحتاج تحقق في السوق الحقيقي وتحديد الشريحة الأكثر إلحاحاً.'}"
              </blockquote>

              <p className="text-sm text-[#C8C5BA] leading-relaxed">
                {result.summary}
              </p>
            </div>

            {/* Legend distinction tags */}
            <div className="pt-6 mt-6 border-t border-[#23170D] flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#797979] ml-1">دليل تصنيف البيانات:</span>
              <span className="px-2 py-0.5 rounded bg-[#23170D] text-[#FCFCFA] border border-[#4A2F15]">
                مذكور من المستخدم
              </span>
              <span className="px-2 py-0.5 rounded bg-[#F5BF1E]/10 text-[#F5BF1E] border border-[#F5BF1E]/30">
                اقتراح استراتيجي
              </span>
              <span className="px-2 py-0.5 rounded bg-[#23170D] text-[#C8C5BA] border border-[#4A2F15]">
                استنتاج
              </span>
              <span className="px-2 py-0.5 rounded bg-[#797979]/20 text-[#C8C5BA] border border-[#797979]/40">
                يحتاج تحقق خارجي
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
