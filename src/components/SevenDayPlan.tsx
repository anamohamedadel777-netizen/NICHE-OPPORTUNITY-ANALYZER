import React from 'react';
import { Calendar, CheckCircle2, ArrowLeft } from 'lucide-react';
import { DayPlanItem } from '../types/niche';

interface SevenDayPlanProps {
  plan: DayPlanItem[];
}

export const SevenDayPlan: React.FC<SevenDayPlanProps> = ({ plan }) => {
  return (
    <section id="section-seven-day" className="py-12 px-4 max-w-7xl mx-auto border-t border-[#23170D]">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23170D] border border-[#4A2F15] text-[#F5BF1E] text-xs font-bold uppercase tracking-wider mb-2">
          <Calendar className="w-3.5 h-3.5" />
          <span>7-DAY ACTION PLAN • خطة التحقق السريعة خلال 7 أيام</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA]">
          خطة الأيام السبعة للتحقق العملي من النيتش
        </h3>
        <p className="text-sm text-[#C8C5BA] mt-1 max-w-2xl">
          مهام يومية مصغرة ومحددة لا تستهلك أكثر من 45 دقيقة يومياً لجمع أدلة السوق الحقيقية قبل أي التزام طويل المدى.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
        {plan.map((item) => (
          <div
            key={item.day}
            className="bg-[#040405] border border-[#23170D] hover:border-[#4A2F15] rounded-2xl p-4 flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-lg bg-[#23170D] border border-[#4A2F15] text-xs font-mono font-bold text-[#F5BF1E] flex items-center justify-center">
                  D{item.day}
                </span>
                <span className="text-[10px] text-[#797979]">اليوم 0{item.day}</span>
              </div>

              <h4 className="text-sm font-extrabold text-[#FCFCFA] mb-2 leading-snug">
                {item.title}
              </h4>
            </div>

            <p className="text-xs text-[#C8C5BA] leading-relaxed pt-2 border-t border-[#23170D]">
              {item.task}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
