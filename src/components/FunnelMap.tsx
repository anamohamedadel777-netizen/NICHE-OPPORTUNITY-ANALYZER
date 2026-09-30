import React from 'react';
import { GitFork, ArrowLeft, CheckCircle2, Lightbulb } from 'lucide-react';
import { FunnelStructure } from '../types/niche';

interface FunnelMapProps {
  funnels: FunnelStructure[];
}

export const FunnelMap: React.FC<FunnelMapProps> = ({ funnels }) => {
  return (
    <section id="section-funnel" className="py-12 px-4 max-w-7xl mx-auto border-t border-[#23170D]">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-bold uppercase tracking-wider mb-2">
          <GitFork className="w-3.5 h-3.5" />
          <span>FUNNEL ARCHITECTURE • هندسة مسارات التحويل</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA]">
          إزاي ممكن يتحول المحتوى لمسار بيع؟
        </h3>
        <p className="text-sm text-[#C8C5BA] mt-1 max-w-2xl">
          التسويق بالعمولة لا يعني رمي الروابط عشوائياً. الفانل هو المسار المحسوب الذي يرفع احتمالية الشراء ببناء الثقة تدريجياً.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {funnels.map((funnel, idx) => (
          <div
            key={idx}
            className="bg-[#040405] border border-[#23170D] hover:border-[#4A2F15] rounded-2xl p-6 flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-[#F5BF1E]">
                  مسار تحويل #{idx + 1}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#23170D] text-[#C8C5BA] border border-[#4A2F15]">
                  {idx === 0 ? 'مسار المحتوى الطويل' : idx === 1 ? 'مسار الترافيك السريع' : 'مسار نية الشراء المباشرة'}
                </span>
              </div>

              <h4 className="text-base font-extrabold text-[#FCFCFA] leading-snug mb-5">
                {funnel.name}
              </h4>

              {/* Step Sequence */}
              <div className="space-y-3 mb-6">
                {funnel.steps.map((step, sIdx) => {
                  const isLast = sIdx === funnel.steps.length - 1;

                  return (
                    <div key={sIdx} className="space-y-1">
                      <div className="bg-[#23170D]/50 border border-[#23170D] rounded-xl p-3 flex items-start gap-3 text-xs">
                        <span className="w-5 h-5 rounded-md bg-[#23170D] border border-[#4A2F15] font-mono text-[11px] font-bold text-[#F5BF1E] flex items-center justify-center shrink-0">
                          {sIdx + 1}
                        </span>
                        <span className="text-[#FCFCFA] font-medium leading-relaxed">
                          {step}
                        </span>
                      </div>
                      {!isLast && (
                        <div className="flex justify-center py-0.5">
                          <span className="text-[10px] text-[#797979]">↓</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[#23170D] bg-[#23170D]/30 p-3.5 rounded-xl border border-[#23170D] text-xs">
              <span className="text-[#FBD052] font-bold block mb-1 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                لماذا ينجح هذا المسار؟
              </span>
              <p className="text-[#C8C5BA] leading-relaxed">
                {funnel.whyItWorks}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
