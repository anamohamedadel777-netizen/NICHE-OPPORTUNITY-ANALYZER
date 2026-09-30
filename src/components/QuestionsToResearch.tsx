import React from 'react';
import { HelpCircle, Search, Compass, BookOpen } from 'lucide-react';

interface QuestionsToResearchProps {
  questions: string[];
}

export const QuestionsToResearch: React.FC<QuestionsToResearchProps> = ({ questions }) => {
  return (
    <section id="section-research-questions" className="py-12 px-4 max-w-7xl mx-auto border-t border-[#23170D]">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-bold uppercase tracking-wider mb-2">
          <Search className="w-3.5 h-3.5" />
          <span>MARKET RESEARCH QUESTIONS • أسئلة التحقق من السوق</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA]">
          10 أسئلة تبحث عن إجاباتها قبل كتابة سطر محتوى واحد
        </h3>
        <p className="text-sm text-[#C8C5BA] mt-1 max-w-2xl">
          افتح Reddit، تعليقات يوتيوب، ومجموعات فيسبوك المتخصصة واجمع إجابات حقيقية موثقة لهذه الأسئلة العشرة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {questions.map((q, idx) => (
          <div
            key={idx}
            className="bg-[#040405] border border-[#23170D] hover:border-[#4A2F15] rounded-xl p-4.5 flex items-start gap-3.5 transition-all"
          >
            <span className="w-7 h-7 rounded-lg bg-[#23170D] border border-[#4A2F15] text-xs font-mono font-bold text-[#F5BF1E] flex items-center justify-center shrink-0 mt-0.5">
              {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
            </span>
            <p className="text-xs sm:text-sm font-bold text-[#FCFCFA] leading-relaxed">
              {q}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
