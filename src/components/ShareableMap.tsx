import React, { useState } from 'react';
import { Share2, Copy, Check, Printer, Compass } from 'lucide-react';
import { NicheAnalysisResult } from '../types/niche';
import { BRAND_CONFIG } from '../config/brandConfig';

interface ShareableMapProps {
  result: NicheAnalysisResult;
}

export const ShareableMap: React.FC<ShareableMapProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const summaryText = `NICHE MAP • خريطة النيتش
-------------------------------------------
النيتش (Niche): ${result.userInputs.niche}
الجمهور الأساسي: ${result.audienceSegments[0]?.name || result.userInputs.audience}
المشكلة المحورية: ${result.problems.primary[0]?.title || result.userInputs.primaryProblem}
النتيجة المرغوبة: ${result.userInputs.desiredOutcome}
إمكانية نية الشراء: ${result.opportunityMatrix.buyerIntent}
عمق المحتوى: ${result.opportunityMatrix.contentDepth}
تنوع العروض: ${result.opportunityMatrix.offerDiversity}
درجة تقييم الفرصة: ${result.overallScore} / 100
درجة الثقة: ${result.confidenceScore}%
القرار الاستراتيجي: ${result.decision}
-------------------------------------------
المصدر: Niche Opportunity Analyzer | ${BRAND_CONFIG.brandName}
* تقييم استراتيجي للفرصة وليس ضماناً للأرباح.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="section-shareable-card" className="py-12 px-4 max-w-4xl mx-auto border-t border-[#23170D]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-bold uppercase tracking-wider mb-2">
            <Share2 className="w-3.5 h-3.5" />
            <span>SHAREABLE SUMMARY • بطاقة ملخص النيتش للمشاركة</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#FCFCFA]">
            بطاقة الـNiche Map الجاهزة للقطات الشاشة
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#23170D] hover:bg-[#4A2F15] text-[#FCFCFA] border border-[#4A2F15] text-xs font-bold transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>تم النسخ!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#F5BF1E]" />
                <span>نسخ كنص</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#23170D] hover:bg-[#4A2F15] text-[#FCFCFA] border border-[#4A2F15] text-xs font-bold transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#F5BF1E]" />
            <span>طباعة / PDF</span>
          </button>
        </div>
      </div>

      {/* The Printable / Screenshot Card */}
      <div className="bg-[#040405] border-2 border-[#4A2F15] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Subtle watermark badge */}
        <div className="flex items-center justify-between border-b border-[#23170D] pb-6 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#A7690C] via-[#F5BF1E] to-[#FBD052] p-[1px]">
              <div className="w-full h-full bg-[#040405] rounded-[7px] flex items-center justify-center">
                <Compass className="w-4 h-4 text-[#F5BF1E]" />
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#F5BF1E] block">
                {BRAND_CONFIG.appTitleEn}
              </span>
              <h4 className="text-sm font-extrabold text-[#FCFCFA]">
                بطاقة تقييم فرصة النيتش الرسمية
              </h4>
            </div>
          </div>

          <span className="text-xs font-bold text-[#C8C5BA] bg-[#23170D] px-3 py-1 rounded-lg border border-[#4A2F15]">
            {BRAND_CONFIG.brandName}
          </span>
        </div>

        {/* Core fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm mb-6">
          <div className="bg-[#23170D]/40 p-4 rounded-xl border border-[#23170D]">
            <span className="text-[#797979] text-xs block mb-1">النيتش (Niche):</span>
            <span className="text-base font-black text-[#FCFCFA]">
              {result.userInputs.niche}
            </span>
          </div>

          <div className="bg-[#23170D]/40 p-4 rounded-xl border border-[#23170D]">
            <span className="text-[#797979] text-xs block mb-1">الجمهور الرئيسي (Audience):</span>
            <span className="text-base font-extrabold text-[#FCFCFA]">
              {result.audienceSegments[0]?.name || result.userInputs.audience}
            </span>
          </div>

          <div className="bg-[#23170D]/40 p-4 rounded-xl border border-[#23170D]">
            <span className="text-[#797979] text-xs block mb-1">المشكلة المحورية (Core Problem):</span>
            <span className="text-xs font-bold text-[#C8C5BA]">
              {result.problems.primary[0]?.title || result.userInputs.primaryProblem}
            </span>
          </div>

          <div className="bg-[#23170D]/40 p-4 rounded-xl border border-[#23170D]">
            <span className="text-[#797979] text-xs block mb-1">النتيجة المرغوبة (Desired Outcome):</span>
            <span className="text-xs font-bold text-[#C8C5BA]">
              {result.userInputs.desiredOutcome}
            </span>
          </div>

          <div className="bg-[#23170D]/40 p-4 rounded-xl border border-[#23170D]">
            <span className="text-[#797979] text-xs block mb-1">إمكانية نية الشراء (Buyer Intent):</span>
            <span className="text-sm font-bold text-[#F5BF1E]">
              {result.opportunityMatrix.buyerIntent}
            </span>
          </div>

          <div className="bg-[#23170D]/40 p-4 rounded-xl border border-[#23170D]">
            <span className="text-[#797979] text-xs block mb-1">عمق المحتوى وتنوع العروض:</span>
            <span className="text-sm font-bold text-[#FCFCFA]">
              محتوى: {result.opportunityMatrix.contentDepth} • عروض: {result.opportunityMatrix.offerDiversity}
            </span>
          </div>
        </div>

        {/* Scores & Decision strip */}
        <div className="bg-[#23170D] border border-[#4A2F15] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-[10px] text-[#797979] block">تقييم فرصة النيتش:</span>
              <span className="text-2xl font-black text-[#F5BF1E] font-mono">
                {result.overallScore} / 100
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#797979] block">درجة الثقة:</span>
              <span className="text-2xl font-black text-[#FCFCFA] font-mono">
                {result.confidenceScore}%
              </span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] text-[#797979] block">القرار الاستراتيجي الموصى به:</span>
            <span className="text-base font-extrabold text-[#FBD052]">
              {result.decision} • {BRAND_CONFIG.decisions[result.decision]?.labelAr}
            </span>
          </div>
        </div>

        {/* Card Footer */}
        <div className="mt-6 pt-4 border-t border-[#23170D] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#797979] gap-2">
          <span>{BRAND_CONFIG.appTitleEn} • {BRAND_CONFIG.brandName}</span>
          <span>تقييم منهجي مبني على مؤشرات السوق • لا يتضمن أي توقع للأرباح</span>
        </div>
      </div>
    </section>
  );
};
