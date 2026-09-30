import React from 'react';
import { Smartphone, Zap, Flame, MessageSquare } from 'lucide-react';
import { ShortFormIdea } from '../types/niche';

interface ShortFormIdeasProps {
  ideas: ShortFormIdea[];
  isChannelSelected?: boolean;
}

export const ShortFormIdeas: React.FC<ShortFormIdeasProps> = ({ ideas, isChannelSelected }) => {
  return (
    <section id="section-shortform" className="py-12 px-4 max-w-7xl mx-auto border-t border-[#23170D]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-bold uppercase tracking-wider mb-2">
            <Smartphone className="w-3.5 h-3.5" />
            <span>SHORT-FORM HOOKS • صياغات ريلز وتيك توك وشورتس</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA]">
            10 خطافات سريعة (Hook + Problem + Payoff + CTA)
          </h3>
          <p className="text-sm text-[#C8C5BA] mt-1 max-w-2xl">
            هيكلية الـ 45 ثانية: خطاف أول 3 ثواني، تشخيص فوري للمشكلة، نصيحة قابلة للتطبيق، ثم توجيه للـ Lead Magnet.
          </p>
        </div>

        {isChannelSelected && (
          <span className="text-xs px-3 py-1.5 rounded-lg bg-[#F5BF1E]/10 text-[#F5BF1E] border border-[#F5BF1E]/30 font-bold shrink-0">
            قناتك المختارة: محتوى قصير
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ideas.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#040405] border border-[#23170D] hover:border-[#4A2F15] rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-[#F5BF1E] flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  Hook #{idx + 1}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#23170D] text-[#C8C5BA] border border-[#4A2F15]">
                  أول 3 ثوانٍ
                </span>
              </div>

              <blockquote className="text-base font-extrabold text-[#FCFCFA] leading-snug mb-4 pr-3 border-r-2 border-[#F5BF1E]">
                "{item.hook}"
              </blockquote>
            </div>

            <div className="space-y-2 pt-3 border-t border-[#23170D] text-xs bg-[#23170D]/40 p-3.5 rounded-xl border border-[#23170D]">
              <div>
                <span className="text-[#797979] font-bold block mb-0.5">المشكلة السريعة (Problem):</span>
                <span className="text-[#C8C5BA]">{item.problem}</span>
              </div>

              <div>
                <span className="text-[#FBD052] font-bold block mb-0.5">المكسب الخاطف (Micro Payoff):</span>
                <span className="text-[#FCFCFA] font-medium">{item.microPayoff}</span>
              </div>

              <div>
                <span className="text-[#F5BF1E] font-bold block mb-0.5">الدعوة للإجراء (CTA):</span>
                <span className="text-[#FCFCFA] font-bold">{item.cta}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
