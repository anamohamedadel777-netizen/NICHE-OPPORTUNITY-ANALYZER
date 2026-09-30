import React from 'react';
import { Youtube, PlayCircle, Sparkles, CheckCircle } from 'lucide-react';
import { YouTubeIdea } from '../types/niche';

interface YouTubeIdeasProps {
  ideas: YouTubeIdea[];
  isChannelSelected?: boolean;
}

export const YouTubeIdeas: React.FC<YouTubeIdeasProps> = ({ ideas, isChannelSelected }) => {
  return (
    <section id="section-youtube" className="py-12 px-4 max-w-7xl mx-auto border-t border-[#23170D]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-bold uppercase tracking-wider mb-2">
            <Youtube className="w-3.5 h-3.5" />
            <span>YOUTUBE OPPORTUNITY • صياغة فيديوهات طويلة مبنية على النتائج</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA]">
            10 عناوين يوتيوب بنمط Outcome-Led Packaging
          </h3>
          <p className="text-sm text-[#C8C5BA] mt-1 max-w-2xl">
            عناوين غير تقليدية تتجنب النمطية وتعد بنتيجة واضحة أو تعالج صدمة وحيرة واقعية لدى المشاهد.
          </p>
        </div>

        {isChannelSelected && (
          <span className="text-xs px-3 py-1.5 rounded-lg bg-[#F5BF1E]/10 text-[#F5BF1E] border border-[#F5BF1E]/30 font-bold shrink-0">
            قناتك المختارة: YouTube
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {ideas.map((idea, idx) => (
          <div
            key={idx}
            className="bg-[#040405] border border-[#23170D] hover:border-[#4A2F15] rounded-2xl p-5 flex items-start gap-4 transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-[#23170D] border border-[#4A2F15] font-mono text-sm font-bold text-[#F5BF1E] flex items-center justify-center shrink-0">
              {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
            </div>

            <div className="flex-1 space-y-2">
              <h4 className="text-base font-extrabold text-[#FCFCFA] leading-snug">
                "{idea.title}"
              </h4>

              <div className="space-y-1.5 pt-2 border-t border-[#23170D] text-xs">
                <div>
                  <span className="text-[#797979] font-bold block">زاوية الـHook والجاذبية:</span>
                  <span className="text-[#C8C5BA]">{idea.hookAngle}</span>
                </div>
                <div>
                  <span className="text-[#F5BF1E] font-bold block">الفائدة العائدة على المشاهد (Payoff):</span>
                  <span className="text-[#FCFCFA] font-medium">{idea.targetPayoff}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
