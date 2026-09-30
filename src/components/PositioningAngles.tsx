import React from 'react';
import { Target, ArrowLeft, Sparkles, Filter } from 'lucide-react';
import { PositioningAngle } from '../types/niche';

interface PositioningAnglesProps {
  angles: PositioningAngle[];
}

export const PositioningAngles: React.FC<PositioningAnglesProps> = ({ angles }) => {
  return (
    <section id="section-positioning" className="py-12 px-4 max-w-7xl mx-auto border-t border-[#23170D]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-bold uppercase tracking-wider mb-2">
            <Filter className="w-3.5 h-3.5" />
            <span>NICHE POSITIONING • زوايا التمركز والتموضع</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA]">
            بدل ما تدخل النيتش واسع… ممكن تدخل من الزوايا دي
          </h3>
          <p className="text-sm text-[#C8C5BA] mt-1 max-w-2xl">
            كلما ضيقت النيتش، قلت تكلفة الحصول على العميل وسهل تقديم عرض لا يستطيع منافسوك العموميون مضاهاته.
          </p>
        </div>

        <span className="text-xs text-[#797979] bg-[#040405] px-3 py-1.5 rounded-lg border border-[#23170D] shrink-0">
          دي زوايا مقترحة للاختبار وليست توصيات نهائية
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {angles.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#040405] border border-[#23170D] hover:border-[#4A2F15] rounded-2xl p-6 flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono text-[#F5BF1E] px-2 py-0.5 rounded bg-[#23170D] border border-[#4A2F15]">
                  زاوية تمركز 0{idx + 1}
                </span>
              </div>

              <h4 className="text-base font-extrabold text-[#FCFCFA] mb-3">
                {item.angleName}
              </h4>

              <div className="bg-[#23170D]/50 border border-[#23170D] rounded-xl p-3 mb-4 text-xs font-mono text-[#FBD052] leading-relaxed">
                {item.formula}
              </div>
            </div>

            <div className="pt-3 border-t border-[#23170D] text-xs">
              <span className="text-[#797979] font-bold block mb-1">
                لماذا تتميز هذه الزاوية؟ (Why it is strong):
              </span>
              <p className="text-[#C8C5BA] leading-relaxed">
                {item.whyItIsStrong}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
