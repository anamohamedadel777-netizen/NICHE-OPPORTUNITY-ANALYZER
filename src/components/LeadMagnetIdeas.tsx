import React from 'react';
import { Gift, Zap, Users, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { LeadMagnetIdea } from '../types/niche';

interface LeadMagnetIdeasProps {
  leadMagnets: LeadMagnetIdea[];
}

export const LeadMagnetIdeas: React.FC<LeadMagnetIdeasProps> = ({ leadMagnets }) => {
  return (
    <section id="section-lead-magnet" className="py-12 px-4 max-w-7xl mx-auto border-t border-[#23170D]">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-bold uppercase tracking-wider mb-2">
          <Gift className="w-3.5 h-3.5" />
          <span>LEAD MAGNET OPPORTUNITIES • بناء القائمة البريدية والأصول</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA]">
          إيه الحاجة المجانية اللي ممكن الجمهور يسيب إيميله عشانها؟
        </h3>
        <p className="text-sm text-[#C8C5BA] mt-1 max-w-2xl">
          الهدية المجانية لا يجب أن تكون كتاباً ضخماً من 100 صفحة. العميل يفضل "المكسب السريع" (Quick Win) الذي يحل عقبة محددة في دقائق.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leadMagnets.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#040405] border border-[#23170D] hover:border-[#4A2F15] rounded-2xl p-6 flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] px-2.5 py-0.5 rounded-md bg-[#23170D] text-[#F5BF1E] border border-[#4A2F15] font-semibold">
                  {item.typeArabic} ({item.type})
                </span>
                <span className="text-xs font-mono text-[#797979]">0{idx + 1}</span>
              </div>

              <h4 className="text-base font-extrabold text-[#FCFCFA] leading-snug mb-3">
                {item.name}
              </h4>
            </div>

            <div className="space-y-2.5 pt-3 border-t border-[#23170D] text-xs bg-[#23170D]/40 p-4 rounded-xl border border-[#23170D]">
              <div>
                <span className="text-[#797979] font-bold block mb-0.5">المشكلة المعالجة:</span>
                <span className="text-[#C8C5BA]">{item.problemSolved}</span>
              </div>

              <div className="flex items-start gap-1.5 text-[#FBD052]">
                <Zap className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">المكسب السريع (Quick Win):</span>
                  <span>{item.quickWin}</span>
                </div>
              </div>

              <div>
                <span className="text-[#797979] font-bold block mb-0.5">الجمهور المثالي للتحميل:</span>
                <span className="text-[#C8C5BA]">{item.idealAudience}</span>
              </div>

              <div className="pt-2 border-t border-[#23170D]">
                <span className="text-[#F5BF1E] font-bold block mb-0.5">العرض التجاري اللاحق الطبيعي:</span>
                <span className="text-[#FCFCFA] font-medium">{item.naturalNextOffer}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
