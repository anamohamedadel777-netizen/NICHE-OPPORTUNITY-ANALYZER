import React from 'react';
import { Target, CheckCircle2, AlertCircle, ArrowLeft, HelpCircle } from 'lucide-react';
import { DecisionType } from '../types/niche';
import { BRAND_CONFIG } from '../config/brandConfig';

interface DecisionPanelProps {
  decision: DecisionType;
  reasons: string[];
  overallScore: number;
  confidenceScore: number;
}

export const DecisionPanel: React.FC<DecisionPanelProps> = ({
  decision,
  reasons,
  overallScore,
  confidenceScore,
}) => {
  const currentDecision = BRAND_CONFIG.decisions[decision] || BRAND_CONFIG.decisions.NARROW;

  return (
    <section id="section-decision" className="py-12 px-4 max-w-7xl mx-auto border-t border-[#23170D]">
      <div className="bg-[#23170D]/40 border border-[#4A2F15] rounded-3xl p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-bold uppercase tracking-wider mb-2">
              <Target className="w-3.5 h-3.5" />
              <span>NEXT STEP DECISION • قرار الخطوة القادمة</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA]">
              ماذا تفعل الآن؟ (Strategic Decision)
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#797979]">
            <span>تقييم منهجي • ليس تصريحاً بالربح</span>
          </div>
        </div>

        {/* 3 Decision Cards comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {(['EXPLORE', 'NARROW', 'VALIDATE'] as DecisionType[]).map((dKey) => {
            const meta = BRAND_CONFIG.decisions[dKey];
            const isSelected = decision === dKey;

            return (
              <div
                key={dKey}
                className={`rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#040405] border-[#F5BF1E] shadow-xl shadow-[#F5BF1E]/10 ring-1 ring-[#F5BF1E]/40'
                    : 'bg-[#040405]/50 border-[#23170D] opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-lg border font-bold ${
                        isSelected
                          ? 'bg-[#F5BF1E] text-[#040405] border-[#F5BF1E]'
                          : 'bg-[#23170D] text-[#797979] border-[#4A2F15]'
                      }`}
                    >
                      {meta.labelEn}
                    </span>

                    {isSelected && (
                      <span className="text-[10px] text-[#FBD052] font-bold">
                        القرار الموصى به
                      </span>
                    )}
                  </div>

                  <h4 className="text-xl font-extrabold text-[#FCFCFA] mb-2">
                    {meta.labelAr}
                  </h4>
                  <p className="text-xs text-[#C8C5BA] leading-relaxed mb-4">
                    {meta.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#23170D] text-[11px] text-[#797979]">
                  {dKey === 'EXPLORE' && 'حين تكون البيانات قليلة أو المشكلات غير واضحة'}
                  {dKey === 'NARROW' && 'حين يكون النيتش واسعاً والفرصة تحتاج تضييقاً'}
                  {dKey === 'VALIDATE' && 'حين تكتمل أركان الهيكل وتبدأ الاختبار الحقيقي'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Strategic Justification Box */}
        <div className="bg-[#040405] border border-[#4A2F15] rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4 text-[#F5BF1E] text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>الأسباب الاستراتيجية وراء هذا القرار (Strategic Rationale):</span>
          </div>

          <ul className="space-y-3">
            {reasons.map((reason, i) => (
              <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#FCFCFA] leading-relaxed">
                <span className="w-5 h-5 rounded-md bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
