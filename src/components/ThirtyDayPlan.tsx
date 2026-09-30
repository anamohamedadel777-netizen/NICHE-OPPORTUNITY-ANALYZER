import React, { useState } from 'react';
import { CalendarRange, ChevronDown, ChevronUp, CheckCircle, HelpCircle } from 'lucide-react';
import { WeekPlanItem } from '../types/niche';

interface ThirtyDayPlanProps {
  plan: WeekPlanItem[];
}

export const ThirtyDayPlan: React.FC<ThirtyDayPlanProps> = ({ plan }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="section-thirty-day" className="py-8 px-4 max-w-7xl mx-auto">
      <div className="bg-[#23170D]/40 border border-[#4A2F15] rounded-3xl p-6 sm:p-8">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between text-right cursor-pointer"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23170D] border border-[#4A2F15] text-[#FBD052] text-xs font-bold uppercase tracking-wider mb-2">
              <CalendarRange className="w-3.5 h-3.5" />
              <span>30-DAY TEST ROADMAP • خارطة اختبار الـ 30 يوماً (اختياري)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#FCFCFA]">
              خطة الـ 30 يوماً لاختبار النيتش عملياً
            </h3>
            <p className="text-xs sm:text-sm text-[#C8C5BA] mt-1">
              ليس لبناء بزنس متكامل، بل لجمع الأدلة الحاسمة قبل التفرغ. اضغط للتوسيع أو الإغلاق.
            </p>
          </div>

          <div className="w-9 h-9 rounded-xl bg-[#23170D] border border-[#4A2F15] flex items-center justify-center text-[#F5BF1E] shrink-0 mr-4">
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {isOpen && (
          <div className="mt-8 pt-6 border-t border-[#4A2F15] space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {plan.map((week) => (
                <div
                  key={week.week}
                  className="bg-[#040405] border border-[#23170D] rounded-2xl p-5 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-mono font-bold text-[#F5BF1E] block mb-2">
                      الأسبوع 0{week.week}
                    </span>
                    <h4 className="text-sm font-extrabold text-[#FCFCFA] mb-2 leading-snug">
                      {week.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#C8C5BA] leading-relaxed pt-3 border-t border-[#23170D]">
                    {week.focus}
                  </p>
                </div>
              ))}
            </div>

            {/* Critical reflection prompt */}
            <div className="bg-[#040405] border border-[#F5BF1E]/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#F5BF1E] uppercase tracking-wider mb-2">
                <HelpCircle className="w-4 h-4" />
                <span>السؤال الحاسم في نهاية الـ 30 يوماً:</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-[#FCFCFA]">
                "ما هي الأدلة الواقعية التي جمعتها؟ هل استجاب الناس للمشكلة؟ هل حملوا الهدية المجانية؟ هل نقروا على مقارنات الحلول؟"
              </p>
              <p className="text-xs text-[#797979] mt-2">
                إذا كانت الإجابة نعم، فأنت جاهز للتوسع (Scale). وإذا كانت لا، فقد وفرت على نفسك شهوراً من إضاعة الوقت.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
