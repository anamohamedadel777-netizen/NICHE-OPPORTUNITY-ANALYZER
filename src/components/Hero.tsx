import React from 'react';
import { Target, AlertTriangle, Layers, ArrowDown } from 'lucide-react';

interface HeroProps {
  onStartClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartClick }) => {
  return (
    <section className="relative pt-12 pb-16 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#F5BF1E]/5 via-[#4A2F15]/10 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Small label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-bold uppercase tracking-widest mb-6">
          <Target className="w-3.5 h-3.5" />
          <span>NICHE OPPORTUNITY ANALYZER</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#FCFCFA] leading-[1.25] tracking-tight mb-6">
          قبل ما تختار Niche…
          <br />
          <span className="gold-gradient-text inline-block relative mt-1">
            افهم الفرصة
            <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#F5BF1E] to-transparent opacity-80" />
          </span>{' '}
          اللي جواه
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg text-[#C8C5BA] max-w-2xl mx-auto leading-relaxed mb-8">
          اكتب النيتش اللي بتفكر فيه، وجاوب على كام سؤال بسيط. الأداة هتبني لك{' '}
          <strong className="text-[#FCFCFA] font-bold">Niche Map (خريطة نيتش)</strong> تساعدك تفهم:
          مين الجمهور، إيه مشكلاته، إيه اللي بيدور عليه، فين نية الشراء، أنواع المنتجات المحتملة، وأفضل زوايا المحتوى والفانل.
        </p>

        {/* Trust Line */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#23170D]/80 border border-[#4A2F15] text-sm text-[#FCFCFA] mb-10 shadow-sm">
          <AlertTriangle className="w-4 h-4 text-[#F5BF1E] shrink-0" />
          <span className="text-[#C8C5BA]">
            مش بنقولك النيتش <strong className="text-[#FBD052] font-semibold">"مربح"</strong>. بنساعدك تفهمه قبل ما تضيع وقتك فيه.
          </span>
        </div>

        {/* Core alignment equation */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#040405] border border-[#23170D] max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs uppercase text-[#797979] tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5 text-[#F5BF1E]" />
            <span>معادلة مواءمة النيتش الاستراتيجي (Niche Alignment Model)</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-xs sm:text-sm font-semibold text-[#FCFCFA]">
            <span className="px-2.5 py-1 rounded-md bg-[#23170D] border border-[#4A2F15] text-[#FBD052]">Audience (الجمهور)</span>
            <span className="text-[#797979]">+</span>
            <span className="px-2.5 py-1 rounded-md bg-[#23170D] border border-[#4A2F15]">Problem (المشكلة)</span>
            <span className="text-[#797979]">+</span>
            <span className="px-2.5 py-1 rounded-md bg-[#23170D] border border-[#4A2F15]">Desire (الرغبة)</span>
            <span className="text-[#797979]">+</span>
            <span className="px-2.5 py-1 rounded-md bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E]">Commercial Intent (نية الشراء)</span>
            <span className="text-[#797979]">+</span>
            <span className="px-2.5 py-1 rounded-md bg-[#23170D] border border-[#4A2F15]">Offers (العروض)</span>
            <span className="text-[#797979]">+</span>
            <span className="px-2.5 py-1 rounded-md bg-[#23170D] border border-[#4A2F15]">Content (المحتوى)</span>
            <span className="text-[#797979]">+</span>
            <span className="px-2.5 py-1 rounded-md bg-[#23170D] border border-[#4A2F15]">Funnel (الفانل)</span>
          </div>
        </div>

        <button
          onClick={onStartClick}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#A7690C] via-[#F5BF1E] to-[#FBD052] text-[#040405] font-extrabold text-base shadow-lg shadow-[#F5BF1E]/20 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>ابدأ بإدخال النيتش</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
